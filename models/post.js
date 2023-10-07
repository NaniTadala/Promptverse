import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
    },
    description: {
        type: String,
        required: [true, "Descrption is required."],
    },
    imageUrl: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required: [true, "Tag is required."],
    },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
