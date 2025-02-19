const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        profilePic: {
            type: String,
            default: "https://api.dicebear.com/7.x/thumbs/svg?seed=SarahParker",
        },
        password: {
            type: String,
            required: true,
        },
        followers: {
            type: Number,
            default: 0,
            min: 0,
        },
        following: {
            type: Number,
            default: 0,
            min: 0,
        },
        likes: {
            type: Number,
            default: 0,
            min: 0,
        },
        country: {
            type: String,
            default: "Pakistan",
            trim: true,
        },
        city: {
            type: String,
            default: "Mirpur",
            trim: true,
        },
        bio: {
            type: String,
            default: "Hello",
            trim: true,
        },
        handle: {
            type: String,
            default: "user",
            trim: true,
            lowercase: true,
        },
        savedImages: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
