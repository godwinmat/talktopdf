"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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
        <Link
            href={`/chat/${chat.id}`}
            // onClick={() => router.push(`/chat/${chat.id}`)}
            className={cn(
                "text-sm flex p-3 w-full justify-start font-medium cursor-pointer text-default rounded-lg transition ",
                chatId === chat.id
                    ? "bg-primary text-slate-100"
                    : "hover:bg-slate-700/50"
            )}
        >
            <div className="flex items-center flex-1">{chat.fileName}</div>
        </Link>
    );
};

export default SideBarItem;
