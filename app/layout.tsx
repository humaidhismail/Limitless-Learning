import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import {NextFont} from "next/dist/compiled/@next/font";
import {ReactNode} from "react";

const hankenGrotesk = Hanken_Grotesk({ variable: '--font-hanken-grotesk',subsets: ['latin']})

export const metadata: Metadata = {
    title: "Limitless Learning",
    description: "The limitless learning website",
};

export default function RootLayout({
   children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${hankenGrotesk.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}