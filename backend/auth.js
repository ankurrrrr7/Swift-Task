require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { createRegister } = require('./type'); 
const { register } = require('./db'); 
const jwt = require("jsonwebtoken");
const { verifyToken } = require('./middleware');
const path = require('path')
const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY; 

//  Register Route
app.post('/register', async (req, res) => {
    const parsed = createRegister.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid inputs",
            errors: parsed.error.errors
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newRegister = new register({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });

        const savedRegister = await newRegister.save();

        res.status(201).json({
            msg: "New user registered",
            user: savedRegister
        });

    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

//  LOGIN Route (with fixes)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await register.findOne({ email }); 

    if (!user || !(await bcrypt.compare(password, user.password))) { 
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });


    res.json({ token });
});

app.get('/home', verifyToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}` });
});
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/register',(req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend','login.html'))
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
