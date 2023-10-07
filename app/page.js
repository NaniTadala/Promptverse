import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Feed } from "@/components/Feed";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          position: "relataive",
          zIndex: 10,
          display: "flex",
          maxWidth: "80rem",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingX: "2.75rem",
        }}
      >
        <Navbar />
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              marginTop: "1.25rem",
              fontSize: "3rem",
              "@media (min-width: 640px)": {
                fontSize: "3.75rem",
              },
              fontWeight: 800,
              lineHeight: 1.15,
              textAlign: "center",
            }}
            level="h1"
          >
            Explore AI Creativity
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "3rem",
              "@media (min-width: 640px)": {
                fontSize: "3.75rem",
              },
              fontWeight: 800,
              lineHeight: 1.15,
              textAlign: "center",
            }}
            level="h2"
            color="primary"
          >
            Unlock the Power of Imagination
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "1.2rem",
              lineHeight: 1.75,
              maxWidth: "42rem",
            }}
            level="body-md"
          >
            Promptverse is your gateway to generating stunning
            generative AI images using cutting-edge AI tools.
            Unleash the power your imagination.
          </Typography>
          <Feed />
        </Sheet>
      </Sheet>
    </CssVarsProvider>
  );
}
