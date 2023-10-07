import React from "react";
import PostCard from "./PostCard";

const CardLayout = ({ posts, handleDelete }) => {
    return (
        <div className="prompt-layout space-y-6">
            {posts !== undefined &&
                posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
        </div>
    );
};

export default CardLayout;
