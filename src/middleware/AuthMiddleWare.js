const JWTToken = require('jsonwebtoken');
const userController = require('../controller/userController');
require('dotenv').config();

const authMiddleWare = async (req, res, next) => {
    var token = req.headers.authorization;
    if(token) {
        token = token.split(" ")[1];
        try {
            const user_id = JWTToken.verify(token, process.env.ACCESS_KEY);
            let isUserExists = await userController.getUserById2(user_id.id);
            if(isUserExists && isUserExists.roleId.name == 'ADMIN') {
                next();
            } else {
                res.status(401).json({
                    message: "Unauthorize",
                    err: err
                })
            }
        } catch(err) {
            res.status(401).json({
                message: "Unauthorize",
                err: err
            })
        }
    } else {
        res.status(401).json({
            message: "Token is not present."
        })
    }
}

module.exports = authMiddleWare;