import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const SECRET_KEY = "PROMPTAPI";

export const POST = async (req) => {
    const { email, name, password } = await req.json();
    // console.log(email, password);
    // return new Response(JSON.stringify({ message: "Hey mann" }), { status: 200 })
    try {
        await connectToDB();
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "User already exists" }),
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            name: name,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
            },
            SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );
        return new Response(
            JSON.stringify({
                message: "User created successfully",
                user: user,
                token: token,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ message: "Something went wrong" })
        );
    }
};
