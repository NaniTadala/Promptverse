import UserData from "@/models/userData";
import { connectToDB } from "@/utils/database";


export const POST = async (req) => {
    const { email, username, image } = await req.json();

    try {
        await connectToDB();
        const existingUser = await UserData.findOne({ email: email });

        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "UserData already exists" }));
        }

        await UserData.create({
            email: email,
            username: username,
            image: image,
        });

        return new Response(
            JSON.stringify({
                message: "UserData created successfully",
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
