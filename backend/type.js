const zod = require('zod');

const createRegister = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6) // Add validation rules as needed
});

module.exports = {
    createRegister
};
