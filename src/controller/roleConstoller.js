const roleModel = require("../model/roleModel");

const createRole = async(req, res) => {
    try {
        const newRole = await roleModel.create(req.body);
        if(newRole) {
            res.status(201).json({
                message: "role created successfully",
                data: newRole
            })
        } else {
            res.status(400).json({
                message: "error while creating role"
            })
        }
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            err: err
        })
    }
}

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleModel.find();
        res.status(200).json({
            messge: "Data fetched successfully",
            data: roles
        })
    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            err: err
        })
    }
}

module.exports = { createRole, getAllRoles }