const express = require("express");
const Student = require("../models/students")
//1: create a new Router
const router = new express.Router();

//2: define the Router
router.get("/swaroop",(req,res) => {
    res.send("Hello this is Swaroop");
});


// inserting the student details
router.post("/add",async(req,res) =>{
   
    try {
        const user = new Student(req.body);
        const createUser = await user.save()
        res.status(201).send(createUser)
        
    } catch (e) {res.status(400).send(e)}
})

//displaying the student details 

router.get("/students", async (req,res)=>{
    try {
        const name = req.query.name;
        var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
        const studentsData = await Student.find(condition);
        res.send(studentsData)
    } catch (e) {
        res.send(e);
    }
})

//Finding the student my his ID
router.get("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
            console.log(studentData);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
        
    } catch (e) {
        res.status(500).send(e);
    }
})

//deleting the student by his ID
router.delete("/students/:id",async (req,res) =>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!deleteStudent){
            return res.status(404).send();
        }
        else{
            res.send(deleteStudent);
        }
    }catch(e){
        res.status(500).send(e);
    }
})



router.patch("/students/:id" , async(req,res) =>{
    try{
        const _id = req.params.id;
        const updateStudnets=await Student.findByIdAndUpdate(_id,req.body);
        res.send(updateStudnets);
    }catch(e){
        res.status(404).send(updateStudnets);
    }
})

module.exports = router;
