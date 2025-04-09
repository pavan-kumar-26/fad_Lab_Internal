const express= require('express');
const router = express.Router();
const Task = require('./models/taskSchema');
const middle=require('./middleware/authenticate')
router.use(middle)

router.post('/', async (requestAnimationFrame,res)=>{
    try{
    const {title,description,status,dueDate} =requestAnimationFrame.body;
    const task = new Task({
        title,
        description,
        status,
        dueDate
    })
    await task.save()
    res.status(200).json({message:"Success"})
    }
    catch(err){
        res.status(400).json({message:err})
    }
})


router.get('/',async(req,res)=>{
    try{
        const task = await Task.find({assignedTo:req.user.id})
        res.status(200).jason(task)
    }
    catch(err){
        res.status(400).json({message:err})
    }
})


router,get