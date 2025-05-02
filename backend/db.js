require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.DATABASE_URL;

mongoose.connect(db)
.then(() => console.log("Working"))
.catch(err => console.log("Not working", err));

const registerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const register = mongoose.model('Register', registerSchema);

module.exports = {
    register
};
