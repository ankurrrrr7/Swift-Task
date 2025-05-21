require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express(); // ✅ FIXED
const db = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

// Ensure these are actual Express routers
app.use(userRouter);
app.use(authRouter);

mongoose.connect(db)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch(err => {
        console.log("Database connection error:", err);
    });
