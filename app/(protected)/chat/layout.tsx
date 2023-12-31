import MainSidebar from "@/components/main-side-bar";
import Navbar from "@/components/navbar";
import { getThreads } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Talk To PDF",
    // description: "Generated by create next app",
};

export default async function ChatIdLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();
    const threads = await getThreads(userId as string);

    if (!userId) {
        redirect("/");
    }

    return (
        <div className="relative h-full">
            <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 border-r">
                <MainSidebar threads={threads} />
            </div>
            <main className="md:pl-80 overflow-scroll h-screen">
                <Navbar />

                <div
                    className={
                        "text-default px-3 py-1 md:px-8 w-full h-[calc(100%_-_56px)] flex flex-col items-start"
                    }
                >
                    {children}
                </div>
            </main>
        </div>
    );
}
