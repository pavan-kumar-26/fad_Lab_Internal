const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type :String,
        required: true,

    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
         type:String,
         required:true
    },
    createdAt:{
        type:Date,
        defautl:Date.now
    }
})


module.exports =mongoose.model('user',userSchema);