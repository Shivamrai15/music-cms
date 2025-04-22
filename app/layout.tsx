import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { QueryProvider } from "@/providers/query.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Admin Panel for Safari Music",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>
                    <EdgeStoreProvider>
                        <Toaster position="top-right" />
                        {children}
                    </EdgeStoreProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
