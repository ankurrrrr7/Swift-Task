const { taskValidation } = require('../type');
const { task: Task } = require('../database/db'); // ✅ Correct import and alias
const express = require('express');
const router = express.Router();

// Create task
router.post('/task', async (req, res) => {
    const parsed = taskValidation.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid task data",
            errors: parsed.error.errors
        });
    }

    try {
        const newTask = new Task(parsed.data);
        const savedTask = await newTask.save();
        res.status(201).json({
            msg: "New Task created",
            task: savedTask
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all tasks
router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update task
router.put('/task/:id', async (req, res) => {
    const parsed = taskValidation.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid task data",
            errors: parsed.error.errors
        });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: parsed.data },
            { new: true }
        );
        res.status(200).json({ msg: "Task updated", task: updatedTask });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete task
router.delete('/task/:id', async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Task not found" });

        res.status(200).json({ msg: "Task deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
