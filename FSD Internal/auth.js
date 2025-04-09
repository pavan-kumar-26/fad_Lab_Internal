const express =require('express')
const bcrypt= require('bcrypt')
const router= express.Router()
const User=require('./models/userSchema');

router.post('/register',async (req,res)=>{
    try{
    const {name,email,password}=req.body;
    user=new User({
        name,
        email,
        password,
    })
    await user.save();
    res.status(201).json({message:'User registered successfully'}

    )    
}
catch(err){
    res.status(400).json({message:err.message})
}

});

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const isMatch = password === user.password;
        if (!isMatch){ res.status(400).json({message:'InValid'})}
        res.status(200).json({message:'Success'});
    }
    catch(err){
        res.status(400).json({message:err.message})
    }    
})
