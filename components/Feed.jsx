"use client";
import React, { useEffect, useState } from "react";
import { FormControl, Input, Sheet } from "@mui/joy";
import CardLayout from "./CardLayout";

export const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/posts");
            const data = await response.json();

            setAllPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Sheet
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginTop: "4rem",
                    marginX: "auto",
                    width: "100%",
                    maxWidth: "36rem",
                }}
            >
                <FormControl
                    sx={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "lg",
                    }}
                >
                    <Input
                        sx={{ width: "100%", height: 40 }}
                        type="text"
                        placeholder="Search for a tag or username"
                        required
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </FormControl>
                {searchText ? (
                    <CardLayout posts={searchedResults} />
                ) : (
                    <CardLayout posts={allPosts} />
                )}
            </Sheet>
        </>
    );
};
