const asyncHandler = require('express-async-handler')
const Tutor = require('../models/tutorModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')



//  Tutor Login

// @descripton : Authenticate a Totor (Login)
// @route : POST /api/admin/tutorLogin
// @access : Public
const loginTutor=asyncHandler(async(req,res)=>{

    const {email,password}=req.body
    
  // Check for user Email  
  
  const tutor=await Tutor.findOne({email})
  if(tutor && (await bcrypt.compare(password, tutor.password))){
     res.json({
         _id:tutor.id,
         name:tutor.name,
         email:tutor.email,
         token:generateToken(tutor._id)
  
     })
  }else{
     res.status(400)
     throw new Error('Invalid credentials')
  }
  
  })
  
  
  // Generate JWT
  const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
  }



// @descripton : Set fifteenMinFees
// @route : POST /api/tutor/fifteenMinFees
// @access : Private
const setBaseAmount = asyncHandler(async(req,res)=>{
    const { baseAmount } = req.body
    console.log('from bbbbbbbbbbbback',req.body);
    if(!baseAmount){
        res.status(400)
        throw new Error('Please add info')
    }
    const fees = await Tutor.create({
        baseAmount
    })
    console.log('from back end',fees);
    res.status(200).json(fees)
})

const getBaseAmount = asyncHandler(async (req,res) =>{

    console.log('from baxk');

    const fetchBaseAmount = await Tutor.findOne({}, {baseAmount : 1})
    console.log('fetch amoutn', fetchBaseAmount);
    res.status(200).json(fetchBaseAmount)


})




// @descripton : Set fifteenMinFees
// @route : POST /api/tutor/fifteenMinFees
// @access : Private
const setFifteenMinFees = asyncHandler(async(req,res)=>{
    const { fifteenMinutes } = req.body
    console.log('from bbbbbbbbbbbback',req.body);
    if(!fifteenMinutes){
        res.status(400)
        throw new Error('Please add info')
    }
    const fees = await Tutor.create({
        fifteenMinutes:fifteenMinutes
    })
    console.log('from back end',fees);
    res.status(200).json(fees)
})



// @descripton : Set fifteenMinFees
// @route : POST /api/tutor/thirtyMinutes
// @access : Private
const setThirtyMinutes = asyncHandler(async(req,res)=>{
    const { thirtyMinutes } = req.body
    
    if(!req.body.thirtyMinutes){
        res.status(400)
        throw new Error('Please add info')
    }
    const fees = await Tutor.create({
        thirtyMinutes:thirtyMinutes
    })
    // const fees = await Tutor.updateOne({},{$push:{time:{amount}}})
    // console.log('from back end',fees);
    res.status(200).json(fees)
})


// @descripton : Get PlanAmount
// @route : GET /api/goals
// @access : Public
const getPlanAmount=asyncHandler(async(req,res)=>{
    console.log('from back end',req.params);
    const duration = req.params.time
    if(duration == 'thirtyMinutes'){

    const amount = await Tutor.findOne( {})
    res.status(200).json(amount)
    console.log('from if',amount);
    }
    
    if(duration == 'fifteenMinutes'){

        const Amount = await Tutor.findOne( {}, {fifteenMinutes:1} )
        res.status(200).json(Amount)
        console.log('from else',Amount);

    }

})


// Add Tutor Details

const addTutorDetails = asyncHandler(async(req,res) =>{

    // console.log('req.body',req.body);

    const { name,place, phoneNumber, email, address,education, experience, passwordOne } =req.body.details
    const   URL   = req.body.url

    // Hash password
   const salt=await bcrypt.genSalt(10)
   const hashedPassword=await bcrypt.hash(passwordOne, salt) 

  // creat
  
  const createTutor = await Tutor.create({
            name,
            place, 
            phoneNumber, 
            email, 
            address,
            education,
            experience,
            password:hashedPassword,
            trainerImgUrl:URL,
            isTutor:true

  })
          if(createTutor){
              res.status(200).json(createTutor)
          }else{
            res.status(400)
            throw new Error('Invalid user data')
          }

})


const getAllTutors = asyncHandler(async(req,res) => {


    const getTutors = await Tutor.find({isTutor:true})

    if(getTutors){
        res.status(200).json(getTutors)
    }else{
        res.status(400).json('not found')
    }
})

// Get all booking for tutor

const getAllTutorBooking = async(req,res) => {

 console.log('req.params',req.params);
  
    try{
        const getBooking = await Tutor.findOne({_id:req.params.id},{bookingArray:1})
            
        res.status(200).json(getBooking)
        
    }catch(err){
      res.status(500).json(err)
    }
    console.log('finsh from booking');
  }



module.exports = {
    setFifteenMinFees,
    setThirtyMinutes,
    getPlanAmount,
    setBaseAmount,
    getBaseAmount,
    addTutorDetails,
    getAllTutors,
    loginTutor,
    getAllTutorBooking
}
