"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import Nav from "./components/nav/Nav";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchBar, setSearchBar] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState(false);

  return (
    <html data-theme={`${backgroundMode ? "luxury" : "customLight"}`} lang="en">
      <body className={inter.className}>
        <Nav
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          backgroundMode={backgroundMode}
          setBackgroundMode={setBackgroundMode}
        />
        <div
          className={`mt-[10vh] transition-transform duration-50 w-full ${
            searchBar
              ? "transform translate-y-0"
              : "transform translate-y-[-10vh]"
          }`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
