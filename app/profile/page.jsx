"use client";
import { Sheet, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CardLayout from "@/components/CardLayout";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const Profile = () => {
    const { data: session } = useSession();

    if (!session) {
        redirect("/signin");
    }

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();

            setMyPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                const response = await fetch(
                    `/api/posts/${post._id.toString()}`,
                    {
                        method: "DELETE",
                    }
                );

                const filteredPosts = myPosts.filter(
                    (item) => item._id !== post._id
                );

                setMyPosts(filteredPosts);

                if (response.ok) {
                    toast.success("Post deleted");
                }
            } catch (error) {
                toast.error("Failed to delete post");
                console.log(error);
            }
        }
    };

    return (
        <Sheet
            sx={{
                position: "relataive",
                zIndex: 10,
                display: "flex",
                maxWidth: "80rem",
                margin: "auto",
                justifyContent: "flex-start",
                flexDirection: "column",
                paddingX: "2.75rem",
            }}
        >
            <Navbar />

            <div style={{ maxWidth: "40rem", width: "100%" }}>
                <Typography
                    sx={{
                        fontSize: "3rem",
                        "@media (min-width: 640px)": {
                            fontSize: "3.75rem",
                        },
                        fontWeight: 800,
                    }}
                    component="h1"
                    color="primary"
                >
                    {session?.user.name
                        ? `${session?.user.name}'s Profile`
                        : `${session?.user.email.split("@")[0]} Profile`}
                </Typography>
                <Typography sx={{ fontSize: "1.2rem" }} level="body-sm">
                    Welcome to your profile page. Keep Sharing your exceptional
                    posts and inspire others with the power of your imagination
                </Typography>
            </div>

            <CardLayout posts={myPosts} handleDelete={handleDelete} />
        </Sheet>
    );
};

export default Profile;
