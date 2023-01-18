const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema(
  {
    baseAmount: {
      type: Number,
    },

    name: { type: String, require: true },
    place: { type: String, require: true },
    phoneNumber: { type: Number, require: true },
    email: { type: String, require: true },
    address: { type: String, require: true },
    education: { type: String, require: true },
    experience: { type: String, require: true },
    password: { type: String, require: true },
    trainerImgUrl: { type: String, require: true },
    isTutor: { type: Boolean, require: true },

    bookingArray: [
      {
        name: String,
        email: String,
        ProfilePic: String,
        radioMonth: String,
        radioMinutes: String,
        radioDays: String,
        totalAmount: String,
        startDate: Date,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tutor', tutorSchema);
