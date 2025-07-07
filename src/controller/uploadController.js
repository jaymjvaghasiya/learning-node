const multer = require('multer');

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: storage
}).single("file");

const uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.status(500).json({
                message: "Error while uploading file",
                err: err
            })
        } else {
            res.status(201).json({
                message: "File uploaded successfully",
                data: req.file
            })
        }
    })
}

module.exports = {
    uploadFile
}