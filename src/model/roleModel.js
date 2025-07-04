const mongoose = require('mongoose');
const schema = mongoose.Schema;

const roleSchema = new schema({
    name:{
        type: String
    }
});

module.exports = mongoose.model("roles", roleSchema);