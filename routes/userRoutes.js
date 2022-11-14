const express=require('express')
const router=express.Router()
const {registerUser,loginUser,getMe ,setavatar, getAllContactUser ,getAllUserForAdmin , setProfilePicture ,getProfilePicture ,updateStatus } = require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.post('/setavatar/:id', protect ,setavatar)
router.get('/allusers/:id', protect ,getAllContactUser)
router.get('/getAlluser',getAllUserForAdmin)
router.post('/addProfilePic',setProfilePicture )
router.get('/getProfilePic/:id', getProfilePicture)
router.patch('/updateStatus/:id', updateStatus)




module.exports=router