"use client";

import { useFormik } from "formik";
import "@uploadthing/react/styles.css";
import { toast } from "react-hot-toast";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();
    console.log(session);

    if (!session) {
        redirect("/signin");
    }

    const formik = useFormik({
        initialValues: {
            description: "",
            imageUrl: "",
            tag: "",
        },

        onSubmit,
    });

    async function onSubmit(values) {
        const response = await fetch("/api/posts/new", {
            method: "POST",
            body: JSON.stringify({
                userId: session?.user.id,
                description: values.description,
                imageUrl: values.imageUrl,
                tag: values.tag,
            }),
        });

        if (response.ok) {
            toast.success("Post created");
            router.push("/");
        } else {
            toast.error("Error creating post");
        }
    }

    return <Form formik={formik} />;
};

export default CreatePost;
