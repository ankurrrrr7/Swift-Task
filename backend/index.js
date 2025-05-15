const express = require('express');
const { taskValidation } = require('./type');
const { task } = require('./db');
const app = express();


app.use(express.json());

app.post('/task',async(req, res)=>{
    const parsed = taskValidation.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            msg: "Invalid credentials",
            errors: parsed.error.errors
        });
    };
    try{
        const writeTask = new task({
            title: parsed.data.title,
            description: parsed.data.description,
            due_date:parsed.data.due_date,
            priority:parsed.data.priority,
            status: parsed.data.status,
            category: parsed.data.category
        })
        const saveTask = await writeTask.save()
        
        res.status(201).json({
            msg:"New Task created",
            task: saveTask
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})
app.listen(3000,()=>{
    console.log("Server is running")
})