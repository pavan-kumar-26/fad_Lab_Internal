const express=require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


const User= require('./models/userSchema')


router.post('/register',async (req,res)=>{
    try{
        console.log("inside reg")
    const {name,email,password} =req.body;
    let user= await User.findOne({email})
    if(user){return res.status(400).json({message:'user already exists'})}

    user=new User({
        name,
        email,
        password
    })
     await user.save()
    return  res.status(200).json({message:"Created user"})

}
     catch(err){return console.log(err)}

})


router.post('/login', async (req,res)=>{
    try{
    const{email,password}=req.body;

    const user = await(User.findOne({email}))

    if(!user){return res.status(400).json( {message:"Enter details"})}

    const match = password===user.password;

    if(!match){res.status(400).json({message:'invalid'})}

    const sk='your_jwt_sk'
    const payload={
        id:user._id,
        email:user.email
    }

    const token=jwt.sign(payload,sk,{expiresIn:'1h'})

 
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        sameSite: 'lax' // or 'none' if you're testing on different domains
    });
    res.status(200).json({message:"login success",token})
    return
}

catch(err){console.log(err)}
})

module.exports=router;