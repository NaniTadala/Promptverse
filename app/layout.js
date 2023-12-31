import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Sheet, CssVarsProvider } from "@mui/joy";
import { Toaster } from "react-hot-toast";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Promptverse",
  description: "Promptverse is your gateway to generating stunning generative AI images using cutting-edge AI tools. Unleash the power your imagination.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>

        <Provider>
          <CssVarsProvider>
            <Sheet
              sx={{
                width: "100vw",
                minHeight: '100vh',
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                padding: "120px 24px 160px 24px",
                pointerEvents: 'none'
              }}
            />

            {children}
            <Toaster position="top-center" />
          </CssVarsProvider>
        </Provider>
      </body>
    </html>
  );
}


