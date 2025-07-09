const userModel = require('../model/userModel');
const sendMail = require('../utils/sendMail');
const bcrypt = require('bcrypt');

const msg = "Internal server err";

let user = {
    id: 1,
    name: "Ram",
    age: 24
}

let allUsers = [
    {
        id: 1,
        name: "Ram",
        age: 24
    },
    {
        id: 2,
        name: "Shyam",
        age: 23
    },
    {
        id: 3,
        name: "Shiv",
        age: 22
    },
    {
        id: 4,
        name: "Krishna",
        age: 25
    },
    {
        id: 5,
        name: "Maruti",
        age: 23
    },
    {
        id: 6,
        name: "Ram",
        age: 26
    },
    {
        id: 7,
        name: "Ram",
        age: 29
    },
    {
        id: 8,
        name: "Ram",
        age: 28
    }
]

const getUsers = (req, res) => {
    res.json({
        message:"User data",
        users: user
    })
}

const getAllUsers = (req, res) => {
    res.json({
        message: "User fetched successfully.",
        users: allUsers
    })
}

const findUserById = (req, res) => {
    let id = req.params.id;
    let foundUser = allUsers.find((user)=>user.id == id);
    if(foundUser) {
        res.json({
            message: "User found Successfully.",
            user: foundUser
        })
    } else {
        res.json({
            message: "User is not Found"
        })
    }
}

const searchUser = (req, res) => {
    let name = req.params.name;
    let foundUser = allUsers.filter((user)=>user.name.toLowerCase() == name);
    if(foundUser.length > 0) {
        res.json({
            message:"Use fetched by name successfully.",
            users: foundUser
        })
    } else {
        res.json({
            message:"No user of this name"
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUsers = await userModel.find().populate('roleId');
        res.status(200).json({
            message: "User fetched successfully",
            data: allUsers
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        res.status(200).json({
            message: "User fetch successfully.",
            data: user
        })
    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const createNewUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newuser = await userModel.create(req.body)
        await sendMail(newuser.email, "WELCOME", newuser.name);
        res.status(201).json({
            message: "User created successfully",
            data: newuser
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: msg,
            err: err
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted Sucessfully",
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
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({
            messag: "User update successfully",
            data: updatedUser
        })
    } catch(err) {
        res.status(500).jsoin({
            message: msg,
            err: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const dbuser = await userModel.findOne({email:email});
        if(dbuser) {
            const isAuthenticate = bcrypt.compareSync(password, dbuser.password);
            if(isAuthenticate) {
                res.status(200).json({
                    message: "Login successfull.",
                    data: dbuser
                })
            } else {
                res.status(403).json({
                    message: "Invalide Credentials."
                })
            }
        } else {
            res.status(500).json({
                message: "User not found"
            })    
        }

    } catch(err) {
        res.status(500).json({
            message: msg,
            err: err.message
        })
    }
}

module.exports = { getUsers, getAllUsers, findUserById, searchUser, getAllUser, getUserById, createNewUser, deleteUser, 
                    updateUser, loginUser }