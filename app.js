const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.json());


const {Queue, delay} = require('bullmq');
const Redis = require('ioredis');

const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379
})

const myQueue = new Queue("taskQueue", {connection: redisConnection});

app.post("/add-job", async(req, res) => {
    const {name, email} = req.body;
    await myQueue.add("task", {name, email}, {delay:0});
    res.json({success:true, message:"Job added for", name});
})

const userRoutes = require('./src/routes/userRoutes');
app.use('/user', userRoutes);

const empRoutes = require('./src/routes/employeeRoutes');
app.use('/emp', empRoutes);

const roleRoutes = require('./src/routes/roleRoutes');
app.use('/role', roleRoutes);

const uploadRoutes = require('./src/routes/uploadRoutes');
app.use('/upload', uploadRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/mern-morning-node").then(() => {
    console.log("Database is connected.");
}).catch((err) => {
    console.log("Error");
    console.log(err);
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is Running on PORT : 3000");
})