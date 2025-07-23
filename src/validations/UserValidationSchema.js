const zod = require('zod');
const { email } = require('zod/v4');

const userValidationSchema = zod.object({
    name:zod.string().min(2).max(10).transform(nm=>nm.trim()),
    age:zod.number().optional(),
    gender:zod.string().default("male"),
    bloodGroup:zod.enum(["A+", "B+", "O+", "O-", "AB+"]),
    hobbies:zod.array(zod.string()),
    roleId:zod.string(),
    email:zod.string(),
    password:zod.string(),
    token:zod.string()
}).strict();

module.exports = userValidationSchema;