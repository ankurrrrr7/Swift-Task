const express = require('express');
const bcrypt = require('bcrypt');
const { createRegister } = require('./type');
const { register } = require('./db');

const app = express();
app.use(express.json());

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
            email: req.body.email,
            password: hashedPassword
        });

        const savedRegister = await newRegister.save();

        res.status(201).json({
            msg: "New user registered",
            user: savedRegister
        });

    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
