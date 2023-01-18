const express = require('express');
const router = express.Router();

const {
  getMessages,
  addMessage,
} = require('../controllers/messagesController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addmsg/', protect, addMessage);
router.post('/getmsg/', protect, getMessages);

module.exports = router;
