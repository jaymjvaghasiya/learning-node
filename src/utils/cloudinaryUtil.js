const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const uploadToCloudinary = async (path) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(path);
    return cloudinaryResponse;
}

module.exports = uploadToCloudinary;