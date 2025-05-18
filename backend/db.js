require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.DATABASE_URL;

mongoose.connect(db)
.then(() => console.log("Working"))
.catch(err => console.log("Not working", err));

const registerSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const register = mongoose.model('Register', registerSchema);

//Task schema 
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    due_date:{type: Date, required: true},
    priority:{type: String, required: true},
    status: {type: String, required: true},
    category: {type: String, required: true}
})
const task = mongoose.model('Task', taskSchema);
module.exports = {
    register,
    task
};
