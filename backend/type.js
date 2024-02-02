const zod = require('zod');

const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
});
const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
});

const updateUserSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

module.exports = { signUpSchema, signInSchema, updateUserSchema };