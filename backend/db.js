require('dotenv').config()
const mongoose = require('mongoose')

const db = process.env.DATABASE_URL
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Working"))
.catch((err => console.log("Not working",err)))

const registerSchema = mongoose.Schema({
    username: String,
    password: String
})
const register = mongoose.model('Register', registerSchema);