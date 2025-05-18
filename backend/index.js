const express = require('express');
const { taskValidation } = require('./type');
const { task } = require('./db');
const app = express();
const mongoose = require('mongoose');

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
app.put('/task/:id', async (req, res) => {
    const parsed = taskValidation.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            msg: "Invalid credentials",
            errors: parsed.error.errors
        });
    }
    try{
        const changeTask = await task.findByIdAndUpdate(req.params.id,
            {
                $set:{
                    title: parsed.data.title,
                    description: parsed.data.description,
                    due_date:parsed.data.due_date,
                    priority:parsed.data.priority,
                    status: parsed.data.status,
                    category: parsed.data.category
                }
            },{new: true})
        res.status(201).json({
            msg: "Task updated",
            task: changeTask
        })
    }
    catch(err){
        res.status(500).json({error:"Internal server error"})
        console.log(err)
    }
});
app.delete('/task/:id', async(req, res)=>{
        try{
            const deleteTask = await task.findByIdAndDelete(req.params.id)
            if(!deleteTask){
                console.log("Internal error")
            }
            else{
                res.status(201).json({
                    msg:"Task deleted"
                })
            }
        }catch(err){
            res.status(201).json({
                error:"Internal server error"
            })
            console.log(err)
        }
})

app.listen(3000,()=>{
    console.log("Server is running")
})