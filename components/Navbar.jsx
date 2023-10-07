"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Sheet, Typography, Button, Card, Divider } from "@mui/joy";
import { IconButton } from "@mui/joy";
import {
    DarkModeRounded,
    LightModeRounded,
    Person2Rounded,
} from "@mui/icons-material";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Link from "next/link";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { Menu } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <IconButton
            variant="soft"
            onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
            }}
        >
            {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
        </IconButton>
    );
}

export default function Navbar() {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();

    function handleSignOut() {
        signOut({ callbackUrl: "/" });
    }

    return (
        <CssVarsProvider>
            <Sheet
                sx={{
                    pt: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "4rem",
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                        textDecoration: "none",
                    }}
                >
                    <Diversity2Icon color="primary" />
                    <Typography component="h3">PromptVerse</Typography>
                </Link>
                <Sheet
                    sx={{
                        "@media (min-width: 640px)": { display: "flex" },
                        display: "none",
                    }}
                >
                    <Sheet
                        sx={{
                            display: "flex",
                            gap: "1.25rem",
                            alignItems: "center",
                        }}
                    >
                        {session ? (
                            <>
                                <ModeToggle />
                                <Button
                                    onClick={() => router.push("/create-post")}
                                >
                                    Create Post
                                </Button>
                                <Button
                                    onClick={handleSignOut}
                                    variant="outlined"
                                >
                                    Sign Out
                                </Button>
                                <Link href="/profile">
                                    {session?.user.image ? (
                                        <Image
                                            src={session?.user.image}
                                            width={37}
                                            height={37}
                                            style={{ borderRadius: "100%" }}
                                            alt="profile"
                                        />
                                    ) : (
                                        <Person2Rounded />
                                    )}
                                </Link>
                            </>
                        ) : (
                            <>
                                <ModeToggle />
                                <Button onClick={() => router.push("/signin")}>
                                    Sign in
                                </Button>
                            </>
                        )}
                    </Sheet>
                </Sheet>

                {/* Mobile Navigation */}
                <Sheet
                    sx={{
                        "@media (min-width: 640px)": { display: "none" },
                        display: "flex",
                        gap: "0.5rem",
                    }}
                >
                    <ModeToggle />

                    <IconButton
                        variant="outlined"
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                    >
                        {toggleDropdown ? <CloseIcon /> : <Menu />}
                    </IconButton>

                    {toggleDropdown && (
                        <Card
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: "100%",
                                marginTop: "0.75rem",
                                display: "flex",
                                width: "100%",
                                minWidth: 210,
                                flexDirection: "column",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                gap: "0.5rem",
                                borderRadius: "0.5rem",
                                boxShadow: "md",
                                zIndex: 10,
                            }}
                        >
                            {session ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        <Typography>My Profile</Typography>
                                    </Link>

                                    <Divider />
                                    <Link
                                        href="/create-post"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        <Typography>Create Prompt</Typography>
                                    </Link>

                                    <Divider />
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                        variant="solid"
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    variant="solid"
                                >
                                    Sign in
                                </Button>
                            )}
                        </Card>
                    )}
                </Sheet>
            </Sheet>
        </CssVarsProvider>
    );
}
