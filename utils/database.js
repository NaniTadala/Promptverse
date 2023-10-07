import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017", {
            dbName: "promptverse",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
};
