const asyncHandler=require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')



// @descripton : Get goals
// @route : GET /api/goals
// @access : Private
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find( { user : req.user.id } )

    res.status(200).json(goals)
})

// @descripton : Set goals
// @route : POST /api/goals
// @access : Private
const setGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){

        res.status(400)
        throw new Error('Please add info')
    }

    const goal=await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @descripton : Update goals
// @route : PUT /api/goals/:id
// @access : Private
const updateGoal=asyncHandler(async(req,res)=>{
      const goal=await Goal.findById(req.params.id)
         if(!goal){
            res.status(400)
            throw new Error('Goal not found')
         }

// .............Token Verification ..........//
     const user = await User.findById(req.user.id)

    //  Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // goal.name = "hello"
    // await goal.save()

//  ---------------------------------------------------

         const updatedGoal= await Goal.findByIdAndUpdate(req.params.id, req.body,{new:true})

    res.status(200).json(updatedGoal)
})

// @descripton : Detete goals
// @route : DELETE /api/goals/:id
// @access : Private
const deleteGoal=asyncHandler(async(req,res)=>{
    // console.log(req.user.id);
    // console.log(req.params.id);
    const goal=await Goal.findById(req.params.id)
    if(!goal){
       res.status(400)
       throw new Error('Goal not found')
    }


// .............Token Verification ..........//
const user = await User.findById(req.user.id)
//  Check for user
if(!user){
    res.status(401)
    throw new Error('User not found')
}
// Make sure the logged in user matches the goal user
if(goal.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
}

//  ---------------------------------------------------

    await goal.remove()

    res.status(200).json({ id:req.params.id})
})


module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}