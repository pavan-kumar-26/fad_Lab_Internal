const jwt=require('jsonwebtoken');

const autenticate =(req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token){return res.status(401).json({message:'Access denied'})}
    
    const decode=jwt.verify(token,'your_jwt_sk');
    req.user=decode;
    next();
    }
    catch(err){
        return res.status(400).json()
    }  
};


module.exports=autenticate;