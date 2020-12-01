const express = require('express');
require('./db/conn');
const Student = require("./models/students");
const studentRouter = require("./routers/student")
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
const port = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//3: Register the router
app.use(studentRouter);

// app.post("/Students",(req,res) =>{   
    
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// })



app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});