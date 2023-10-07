import mongoose from "mongoose";

const userData = mongoose.Schema({
    email: { type: String },
    username: { type: String },
    image: { type: String }
})

const UserData = mongoose.models.UserData || mongoose.model('UserData', userData);

export default UserData;