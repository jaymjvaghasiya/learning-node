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
    }],
    roleId: {
        ref: "roles",
        type: schema.Types.ObjectId
    },
    email: {
        type:String
    },
    password: {
        type:String
    },
    token: {
        type:String
    }
})

module.exports = mongoose.model("users", userSchema);