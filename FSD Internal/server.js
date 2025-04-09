const express= require('express');
const mongoose=require('mongoose');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json())
app.use(cors())
app.use(cookieParser())


const authRoute=require('./auth.js');
const taskRoute=require('./task.js');


app.use('/api/auth',authRoute);
app.use('/api/task',taskRoute);

const port=3000;
const db_url='mongodb://localhost:27017/';

mongoose.connet(db_url,{useNewUrlParser:true}).then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
})


