const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @descripton : Register new User
// @route : POST /api/users
// @access : Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isActive: true,
    role: 'Normal User',
    date: new Date(),
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @descripton : Authenticate a User (Login)
// @route : POST /api/users/login
// @access : Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user Email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @descripton : Get user data
// @route : GET /api/users/me
// @access : Private (Want to protect)
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
  res.json({ message: 'User data display' });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// setavatar Profile images
const setavatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    // console.log('userId', userId);
    // console.log('avatarImage', req.body.image);

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

// get All contact user
const getAllContactUser = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      '_id',
      'name',
      'email',
      'avatarImage',
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

// @descripton : Get All User data (For Admin)
// @route : GET /api/users/me
// @access : Private (Want to protect)
const getAllUserForAdmin = asyncHandler(async (req, res) => {
  console.log('reacheddd');
  const allUser = await User.find().sort({ createdAt: -1 });
  res.status(200).json(allUser);
});

// set Profile picture
const setProfilePicture = async (req, res, next) => {
  try {
    const userId = req.body.UserId;
    const profilePicUrl = req.body.image;
    // console.log('userId', userId);
    // console.log('profileImage', req.body.image);

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        profilePicUrl,
      },
      { new: true }
    );
    return res.json(userData);
  } catch (ex) {
    next(ex);
  }
};

// get Profile picture
const getProfilePicture = async (req, res, next) => {
  console.log('trigered from getProfilePic');
  console.log('req.bodddy', req.body);
  try {
    const userId = req.params.id;

    const userData = await User.findOne({ _id: userId }, { profilePicUrl: 1 });
    return res.json(userData);
  } catch (ex) {
    next(ex);
  }
};

// update status
const updateStatus = async (req, res, next) => {
  console.log('req.params', req.params);
  console.log('req.body', req.body);

  try {
    const userId = req.params.id;
    const { role, isActive } = req.body;

    await User.findByIdAndUpdate(userId, { role, isActive }, { new: true });
    return res.status(200).json({ success: true, result: { _id: userId } });
  } catch (ex) {
    next(ex);
  }
};

// add telegram userName
const telegramUserName = async (req, res, next) => {
  console.log('from telgram username backend', req.body);

  const UserId = req.body.UserId;
  const telegramUserName = req.body.userName;

  try {
    const userName = await User.findByIdAndUpdate(
      UserId,
      { telegramUserName },
      { new: true }
    );
    return res.status(200).json(userName);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  setavatar,
  getAllContactUser,
  getAllUserForAdmin,
  setProfilePicture,
  getProfilePicture,
  updateStatus,
  telegramUserName,
};
