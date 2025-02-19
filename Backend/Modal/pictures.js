const mongoose = require("mongoose");
const pictureSchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        publicId: {
            type: String,
            required: true,
        },
        likes: {
            amount: {
                type: Number,
                default: 0,
            },
        },
    },
    { timestamps: true }
);
const Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;
