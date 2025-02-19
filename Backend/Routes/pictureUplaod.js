const express = require("express");
const cloudinary = require("../Utils/Cloudinary");
const Picture = require("../Modal/pictures");
const isLoggedIn = require("../Middlewars/authentication");

const router = express.Router();

router.post("/upload/picture", isLoggedIn, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User Not Logged In" });
        }
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: "No image provided" });
        }

        const response = await cloudinary.uploader.upload(image);
        const newPicture = new Picture({
            imageUrl: response.secure_url,
            publicId: response.public_id,
            user: req.user._id,
        });

        await newPicture.save();
        console.log(newPicture);
        res.status(200).json({
            message: "Image uploaded successfully",
        });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

module.exports = router;
