const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // fixed variable name
const app = express();
app.use(express.urlencoded({ extended: true })); // fixed typo: "endoded" → "extended"
app.use(express.json());


// Allow multiple origins
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser()); // fixed variable name

const authRoute = require('./auth.js');
const taskRoute = require('./task.js');

app.use('/api/auth', authRoute);
app.use('/api/task', taskRoute);

const port = 3000;
const db_url = "mongodb://localhost:27017/tododb";

mongoose.connect(db_url).then(() => {
    console.log('Connected to db');
    app.listen(port, () => {
        console.log("server running at port 3000");
    });
}).catch((err) => {
    console.log(err);
});
