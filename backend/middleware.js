require('dotenv').config(); // to access process.env
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY; // ✅ get secret key from .env

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.split(' ')[1];
    if (!token) return res.sendStatus(401); // better to use 401 (unauthorized)

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // forbidden
        req.user = user;
        next();
    });
};

module.exports = {
    verifyToken
};
