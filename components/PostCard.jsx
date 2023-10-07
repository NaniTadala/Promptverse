import React from "react";
import { Card, Sheet, Typography } from "@mui/joy";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Delete, Person2Rounded } from "@mui/icons-material";

const PostCard = ({ post, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    return (
        <>
            <Card
                sx={{
                    boxShadow: "md",
                    padding: 0,
                    gap: "0.3rem",
                }}
                className="prompt-card"
            >
                <img
                    src={post.imageUrl}
                    alt="test"
                    style={{
                        width: "100%",
                        borderRadius: "inherit",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push(`/posts/${post._id}`)}
                />
                <Sheet
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1.25rem",
                        paddingLeft: 1,
                        margin: 0,
                    }}
                >
                    <Sheet
                        sx={{
                            flex: "1 1 0%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "0.75rem",
                        }}
                    >
                        {post.creator?.image ? (
                            <Image
                                src={post.creator?.image}
                                alt="user_image"
                                width={40}
                                height={40}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <Person2Rounded />
                        )}

                        <Sheet
                            sx={{ display: "flex", flexDirection: "column" }}
                        >
                            <Typography
                                level="h6"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {post.creator?.username
                                    ? `${post.creator?.username}`
                                    : `${post.creator?.email.split("@")[0]}`}
                            </Typography>
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 600,
                                    color: "rgb(107 114 128 / 1)",
                                }}
                            >
                                {post.creator?.email}
                            </Typography>
                        </Sheet>
                    </Sheet>
                </Sheet>
                <Typography
                    sx={{ paddingLeft: 1, paddingBottom: 1, margin: 0 }}
                    level="body-sm"
                >
                    #{post.tag}
                </Typography>
                {session?.user.id === post.creator?._id &&
                    pathName === "/profile" && (
                        <Sheet
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingBottom: 1,
                            }}
                        >
                            <Delete sx={{ height: 18, cursor: "pointer" }} />
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Typography>
                        </Sheet>
                    )}
            </Card>
        </>
    );
};

export default PostCard;
