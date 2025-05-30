const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('task',taskSchema);