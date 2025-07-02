const employeeModel = require('../model/employeeModel');

const msg = "Internal Server Error!";

const getAll = async (req, res) => {
    try {
        const allEmps = await employeeModel.find();
        res.status(200).json({
            message: "Data fetched successfully.",
            data: allEmps
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await employeeModel.findById(id);
        res.status(200).json({
            message: "Data ftched successfully",
            data: user
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const createUser = async (req, res) => {
    try {
        const newdata = req.body;
        const newuser = await employeeModel.create(newdata);
        res.status(201).json({
            message: "User created successfully",
            data: newuser
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await employeeModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedUser = await employeeModel.findByIdAndUpdate(id, updatedData, {new: true});
        res.status(200).json({
            message: "User updated successfully.",
            data: updatedUser
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

module.exports = {getAll, getById, createUser, deleteUser, updateUser}