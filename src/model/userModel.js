const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "O+", "O-", "AB+"]
    },
    hobbies: [{
        type: String
    }]
})

module.exports = mongoose.model("users", userSchema);