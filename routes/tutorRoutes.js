const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  setFifteenMinFees,
  setThirtyMinutes,
  getPlanAmount,
  setBaseAmount,
  getBaseAmount,
  addTutorDetails,
  getAllTutors,
  loginTutor,
  getAllTutorBooking,
} = require('../controllers/tutorController');

router.post('/loginTutor', loginTutor);
router.post('/setBaseAmount', setBaseAmount);
router.get('/baseAmount/', getBaseAmount);
router.post('/addTutor', addTutorDetails);
router.get('/getAllTutors/', getAllTutors);
router.get('/getAllTutorsBooking/:id', getAllTutorBooking);

module.exports = router;
