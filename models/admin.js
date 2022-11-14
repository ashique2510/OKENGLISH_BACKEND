const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(

    {
        name:{
            type:String,
            required:[true,'Please add a name'],
        },
        email:{
            type:String,
            required:[true,'Please add a email'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'Please add a password'],
            min:4,
        },


        announcementArray: [
                            
                                {
                                    announcement: String,
                                    date:Date,
                                }
                          
                           ],
        bookingArray: [
                            
                            {
                                name: String,
                                email: String,
                                ProfilePic:String,
                                radioMonth: String,
                                radioMinutes: String,
                                radioDays: String,
                                totalAmount: String,
                                startDate: Date,
                                date:Date,
                            }
                      
                       ],
        
       
    }

    )

    module.exports=mongoose.model('admin',adminSchema)