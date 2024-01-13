"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

type SideBarItemProps = {
    chat: {
        id: string;
        userId: string;
        fileId: string | null;
        fileName: string;
    };
};

const SideBarItem = ({ chat }: SideBarItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];

    return (
        <Button
            // href={`/chat/${chat.id}`}
            variant="ghost"
            onClick={() => router.push(`/chat/${chat.id}`)}
            className={cn(
                "text-sm flex p-3 w-full justify-start font-medium cursor-pointer text-default rounded-lg transition ",
                chatId === chat.id &&
                    "bg-primary text-slate-100 hover:bg-primary"
            )}
        >
            <div className="flex items-center flex-1 text-sm">
                {chat.fileName}
            </div>
        </Button>
    );
};

export default SideBarItem;
