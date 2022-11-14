const Admin = require('../models/admin')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')


//  Admin Login

// @descripton : Authenticate a Admin (Login)
// @route : POST /api/admin/adminLogin
// @access : Public
const loginAdmin=asyncHandler(async(req,res)=>{

  const {email,password}=req.body
  
// Check for user Email  

const user=await Admin.findOne({email})
if(user && (await bcrypt.compare(password, user.password))){
   res.json({
       _id:user.id,
       name:user.name,
       email:user.email,
       token:generateToken(user._id)

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


// need recheck !!!!!!

const addAnnouncement = async(req,res) => {

    console.log('from backe eeend',req.body);

    try{
            await Admin.findOne({},{announcementArray:1},
          
          function(err,announce){

           if(err){
            return done(err);
          }
        if(announce){ 

          const updated = async() =>{
              
                 await Admin.updateOne({$push:{announcementArray:[{announcement:req.body.announcement,date:new Date}
                    ]}})

                  }
                  updated()
                  console.log('updated');
                  res.status(200).json('new announce updated')


        }else{

           const create = async() =>{

               await Admin.create({announcementArray:[{announcement:req.body.announcement, date:new Date }]})
            }
            create()
               res.status(200).json('new announce created')
          console.log('new announce created');
        }
      })



    }catch(err){
      // res.status(500).json(err)
    }
    console.log('finsh');
}




const getAnnouncement = async(req,res) => {

    console.log('from backe eeend');


    try{
        const getAnnounce = await Admin.aggregate([ {$unwind:'$announcementArray'},{$sort:{'announcementArray.date':-1}} ])
            
        res.status(200).json(getAnnounce)

    }catch(err){
      res.status(500).json(err)
    }
    console.log('finsh');
}

// Get all booking

const getAllBooking = async(req,res) => {

  console.log('from backe eeend');


  try{
      const getBooking = await Admin.findOne({},{bookingArray:1})
          
      res.status(200).json(getBooking)

  }catch(err){
    res.status(500).json(err)
  }
  console.log('finsh from booking');
}






module.exports={
    addAnnouncement,
    getAnnouncement,
    getAllBooking,
    loginAdmin

}