const zod = require('zod');

const createRegister = zod.object({
    userName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6) // Add validation rules as needed
});

const taskValidation = zod.object({
    title: zod.string(),
    description: zod.string() ,
    due_date: zod.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }),
    priority: zod.string(),
    status: zod.string(),
    category: zod.string()
})
module.exports = {
    createRegister,
    taskValidation
};
