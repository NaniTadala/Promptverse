"use client";
import { useState, useEffect } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import GoogleIcon from "@/components/GoogleIcon";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { signup_validation } from "@/utils/validate";
import { useRouter } from "next/navigation";

function ColorSchemeToggle({ onClick, ...props }) {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <IconButton size="sm" variant="outlined" color="neutral" disabled />
        );
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...props}
            onClick={(event) => {
                if (mode === "light") {
                    setMode("dark");
                } else {
                    setMode("light");
                }
                onClick?.(event);
            }}
        >
            {mode === "light" ? (
                <DarkModeRoundedIcon />
            ) : (
                <LightModeRoundedIcon />
            )}
        </IconButton>
    );
}

export default function JoySignInSideTemplate() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cPassword: "",
        },
        validate: signup_validation,
        onSubmit,
    });

    async function onSubmit(values) {
        const response = await fetch("api/auth/signup", {
            method: "POST",
            body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
            //Signin
            toast.success(data.message);
            const response = await signIn("credentials", {
                redirect: false,
                email: values.email,
                name: values.name,
                password: values.password,
                callbackUrl: "/",
            });

            if (response.ok) {
                router.push(response.url);
            } else {
                toast.error(data.message);
            }
        }
        // console.log(values);
    }

    function handleGoogleSignin() {
        signIn("google", { callbackUrl: "http://localhost:3000/" });
    }

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ":root": {
                        "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
                        "--Cover-width": "50vw", // must be `vw` only
                        "--Form-maxWidth": "800px",
                        "--Transition-duration": "0.4s", // set to `none` to disable transition
                    },
                }}
            />

            <Box
                sx={(theme) => ({
                    width: "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
                    transition: "width var(--Transition-duration)",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255 255 255 / 0.2)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundColor: "rgba(19 19 24 / 0.4)",
                    },
                })}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100dvh",
                        width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
                        maxWidth: "100%",
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: "flex",
                            alignItems: "left",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                gap: "0.5rem",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Link href="/" style={{ textDecoration: "none" }}>
                                <IconButton>
                                    <Diversity2Icon color="primary" />
                                </IconButton>
                                <Typography level="title-lg">
                                    PromptVerse
                                </Typography>
                            </Link>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: "auto",
                            py: 2,
                            pb: 5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: 400,
                            maxWidth: "100%",
                            mx: "auto",
                            borderRadius: "sm",
                            "& form": {
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: "hidden",
                            },
                        }}
                    >
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography level="h3">Sign up</Typography>
                                <Typography level="body-sm">
                                    Already have an account?{" "}
                                    <Link href="/signin" level="title-sm">
                                        Sign in!
                                    </Link>
                                </Typography>
                            </Stack>

                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                                onClick={handleGoogleSignin}
                            >
                                Continue with Google
                            </Button>
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector("light")]: {
                                    color: {
                                        xs: "#FFF",
                                        md: "text.tertiary",
                                    },
                                    "--Divider-lineColor": {
                                        xs: "#FFF",
                                        md: "var(--joy-palette-divider)",
                                    },
                                },
                            })}
                        >
                            or
                        </Divider>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl required>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="text"
                                        name="name"
                                    />
                                </FormControl>
                                {formik.errors.name && formik.touched.name && (
                                    <Typography sx={{ color: "#f43f5e" }}>
                                        {formik.errors.name}
                                    </Typography>
                                )}
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="email"
                                        name="email"
                                    />
                                </FormControl>
                                {formik.errors.email &&
                                    formik.touched.email && (
                                        <Typography sx={{ color: "#f43f5e" }}>
                                            {formik.errors.email}
                                        </Typography>
                                    )}
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="password"
                                        name="password"
                                    />
                                </FormControl>
                                {formik.errors.password &&
                                    formik.touched.password && (
                                        <Typography sx={{ color: "#f43f5e" }}>
                                            {formik.errors.password}
                                        </Typography>
                                    )}
                                <FormControl required>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                        value={formik.values.cPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="password"
                                        name="cPassword"
                                    />
                                </FormControl>
                                {formik.errors.cPassword &&
                                    formik.touched.cPassword && (
                                        <Typography sx={{ color: "#f43f5e" }}>
                                            {formik.errors.cPassword}
                                        </Typography>
                                    )}
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Checkbox
                                            size="sm"
                                            label="Remember me"
                                            name="persistent"
                                        />
                                    </Box>
                                    <Button type="submit" fullWidth>
                                        Sign up
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © PromptVerse {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: "100%",
                    position: "fixed",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
                    transition:
                        "background-image var(--Transition-duration), left var(--Transition-duration) !important",
                    transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                    backgroundColor: "background.level1",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
                    [theme.getColorSchemeSelector("dark")]: {
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
                    },
                })}
            />
        </CssVarsProvider>
    );
}
