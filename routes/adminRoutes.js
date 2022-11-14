const express = require('express')
const router = express.Router()
const { addAnnouncement ,getAnnouncement ,getAllBooking ,loginAdmin} = require('../controllers/adminController')

router.post('/adminLogin',loginAdmin)
router.post('/createAnnouncement',addAnnouncement)
router.get('/getAllAnnouncement',getAnnouncement)
router.get('/getAllbooking',getAllBooking)



module.exports=router