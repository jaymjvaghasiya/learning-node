const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employeeSchema = new schema({
    name: {
        type: String
    },
    salary: {
        type: Number
    },
    dsgn: {
        type: String
    },
    department: [{
        type: String
    }]
})

module.exports = mongoose.model("employees", employeeSchema);