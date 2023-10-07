import mongoose from "mongoose";

const userModel = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    password: { type: String, required: true },
    image: { type: String }
})

const User = mongoose.models.User || mongoose.model('User', userModel);

export default User;