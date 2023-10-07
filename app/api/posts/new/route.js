import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
    try {
        const { userId, description, imageUrl, tag } = await req.json();

        await connectToDB();
        const newPost = new Post({
            creator: userId,
            description: description,
            imageUrl: imageUrl,
            tag: tag
        });

        const savedPost = await newPost.save();

        return new Response(JSON.stringify(savedPost), { status: 200 });
    } catch (error) {
        console.error("Error creating post:", error);
        return new Response("Failed to create a new post", { status: 500 });
    }
};