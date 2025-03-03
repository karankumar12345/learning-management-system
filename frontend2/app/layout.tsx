/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
// import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";


// import Header from "./_components/Header";

import RouterWrapper from "./RouterWrapper"; // New component
import { ThemeProvider } from "@/utils/ThemeProvider";
import Header from "./_components/Heading";
import AppProvider from "./Provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const josefinSans = Josefin_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefinSans.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <SessionProvider>
<AppProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header activeItem={0} setActiveItem={function (item: number): void {
                throw new Error("Function not implemented.");
              } } />
              <RouterWrapper>{children}</RouterWrapper>
              <Toaster position="top-center" />
            </ThemeProvider>
            </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}