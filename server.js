const userRoute = require('./routes/userRoute');
const connectDb = require('./config/db');
const express = require('express');
const dotenv= require('dotenv');

//Database
dotenv.config()
connectDb();

//Server Port
const app = express();
const PORT = 3005;

//MiddleWare
app.use(express.json())
app.use('/',userRoute)


app.listen(PORT,()=>{
    console.log('Server is Running on PORT '+ PORT );
})