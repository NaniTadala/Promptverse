"use client";
import { useEffect, useState } from "react";
import { Sheet, Typography, FormControl, FormLabel, Card } from "@mui/joy";
import Navbar from "@/components/Navbar";

const Posts = ({ params }) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${params.id}`);
            const data = await response.json();

            setPost(data);
        };

        fetchPost();
    });

    return (
        <Sheet
            sx={{
                position: "relataive",
                zIndex: 10,
                display: "flex",
                maxWidth: "80rem",
                margin: "auto",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                paddingX: "2.75rem",
            }}
        >
            <Navbar />
            <div style={{ maxWidth: "40rem", width: "100%" }}>
                <Typography
                    sx={{ fontSize: "3.75rem", fontWeight: 800 }}
                    component="h1"
                    color="primary"
                >
                    {`${post.creator?.username}'s Post`}
                </Typography>
            </div>
            <Sheet
                sx={{
                    my: 4, // margin top & bottom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    borderRadius: "sm",
                    boxShadow: "lg",
                    maxWidth: "50rem",
                    width: "100%",
                }}
                variant="outlined"
            >
                <FormControl>
                    <FormLabel sx={{ fontSize: "1.15rem" }}>Post</FormLabel>
                    <img
                        style={{ width: "100%", borderRadius: 10 }}
                        src={post.imageUrl}
                        alt={post.tag}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel sx={{ fontSize: "1.15rem" }}>
                        Prompt Description
                    </FormLabel>
                    <Card>{post.description}</Card>
                </FormControl>
                <FormControl>
                    <FormLabel sx={{ fontSize: "1.15rem" }}>
                        Category of Prompt{" "}
                        <span>{"(#art, #cinematic, #fantasy, etc.)"}</span>
                    </FormLabel>
                    <Card>#{post.tag}</Card>
                </FormControl>
            </Sheet>
        </Sheet>
    );
};

export default Posts;
