import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/components/providers/modal-provider";

const nunito = Nunito({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
    title: "Talk To PDF",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${nunito.className} w-full h-full`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ModalProvider />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
