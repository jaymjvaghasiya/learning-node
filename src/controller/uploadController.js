const multer = require('multer');
const uploadToCloudinary = require('../utils/cloudinaryUtil');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            cb(null, true)
        } else {
            cb(new Error("Only images are allowed"), false);
        }
    }
}).any("file");

const uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
        if(err) {
            res.status(500).json({
                message: "Error while uploading file",
                err: err.message
            })
        } else {
            console.log("req : ", req.files);
            req.files.forEach(file => {
                // const cloudinaryResponse = await uploadToCloudinary(file.path);
                try {
                    res.status(201).json({
                        message: "File uploaded successfully",
                        data: file,
                        cloudinaryResponse: cloudinaryResponse
                    })
                } catch(err) {
                    res.status(500).json({
                        message: "Error in File upload.",
                        data: file,
                        err: err.message
                    })
                }
            });
        }
    })
}

module.exports = {
    uploadFile
}