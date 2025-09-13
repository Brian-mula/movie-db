import { ConvexClientProvider } from "@/components/convex-client-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "400", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Movie DB",
  description: "A movie database built with Next.js and The Movie Database API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConvexClientProvider>
        <Toaster
          toastOptions={{
            style: {
              fontSize: "10px",
            },
            duration: 1200,
          }}
          position="top-right"
        />
        {children}

        </ConvexClientProvider>
      </body>
    </html>
  );
}
