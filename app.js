const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
app.use('/user', userRoutes);

const empRoutes = require('./src/routes/employeeRoutes');
app.use('/emp', empRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/mern-morning-node").then(() => {
    console.log("Database is connected.");
}).catch((err) => {
    console.log("Error");
    console.log(err);
})

app.listen(3000, () => {
    console.log("Server is Running on PORT : 3000");
})