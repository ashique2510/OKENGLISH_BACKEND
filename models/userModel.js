const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please add a name']
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
        isAvatarImageSet:{
            type:Boolean,
            default:false,
        },
        avatarImage:{
            type:String,
            default:"",
        },
        profilePicUrl:{
            type:String,
        },
        isActive:{
            type:Boolean,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
       
    },{timestamps:true}
)

module.exports=mongoose.model('User',userSchema)