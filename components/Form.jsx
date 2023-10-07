import {
    Sheet,
    Typography,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
} from "@mui/joy";
import React from "react";
import Navbar from "@/components/Navbar";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "react-hot-toast";

const Form = ({ formik }) => {
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
                    Create Post
                </Typography>
                <Typography sx={{ fontSize: "1.2rem" }} level="body-sm">
                    Create and share amazing generative AI posts with the world,
                    and let your imagination run wild with any AI-powered
                    platform
                </Typography>
            </div>
            <form
                style={{ maxWidth: "40rem", width: "100%" }}
                onSubmit={formik.handleSubmit}
            >
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
                    }}
                    variant="outlined"
                >
                    <FormControl>
                        <FormLabel sx={{ fontSize: "1.15rem" }}>
                            Prompt Description
                        </FormLabel>
                        <Textarea
                            name="description"
                            minRows={8}
                            placeholder="Write your prompt description"
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            fontSize: "1.15rem",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <FormLabel sx={{ fontSize: "1.15rem" }}>
                            Upload image
                        </FormLabel>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                formik.setFieldValue("imageUrl", res[0].url);
                                toast.success("Upload Completed");
                            }}
                            onUploadError={(error) => {
                                // Do something with the error.
                                toast.error(`ERROR! ${error.message}`);
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{ fontSize: "1.15rem" }}>
                            Category of Prompt{" "}
                            <span>{"(#art, #cinematic, #fantasy, etc.)"}</span>
                        </FormLabel>
                        <Input
                            // html input attribute
                            sx={{ height: "3rem" }}
                            name="tag"
                            placeholder="#Tag"
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <Sheet
                        sx={{
                            width: "100%",
                            display: "flex",
                            gap: 2,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{ mt: 1 /* margin top */ }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
                            Create
                        </Button>
                    </Sheet>
                </Sheet>
            </form>
        </Sheet>
    );
};

export default Form;
