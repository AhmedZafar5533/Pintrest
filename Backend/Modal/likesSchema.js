const likeSchema = new mongoose.Schema(
    {
        picture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Picture",
            required: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);
const Likes = mongoose.model("Like", likeSchema);
module.exports = Likes;
