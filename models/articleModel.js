const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(

    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        likes:{
            type:Array,
        },
        likes: [{username: String, userId: String}]

    },{timestamps:true}

    )

    module.exports=mongoose.model('Article',articleSchema)