const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (replace with your credentials)
const cloudinaryUpload = cloudinary.config({
    cloud_name: "dfj6wczcq",
    api_key: "671654975815636",
    api_secret: "VCvjHFLigWFpxGmj9nNqkFMSKxc",
});
module.exports = cloudinary;
