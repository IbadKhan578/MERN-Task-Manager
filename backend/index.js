const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db.js');
const taskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
port = process.env.PORT  || 8080;
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send("server is running")
})

app.use('/task',taskRouter)


// app.get('/ping',(req,res)=>{
//     res.send("pong")
// })

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`);
})