"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SideBarItemProps = {
    thread: {
        id: string;
        userId: string;
        fileId: string | null;
        fileName: string;
    };
};

const SideBarItem = ({ thread }: SideBarItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const threadId = pathname.split("/")[2];

    return (
        <Link
            href={`/chat/${thread.id}`}
            // onClick={() => router.push(`/chat/${thread.id}`)}
            className={cn(
                "text-sm flex p-3 w-full justify-start font-medium cursor-pointer text-default rounded-lg transition ",
                threadId === thread.id
                    ? "bg-primary text-white dark:text-slate-950"
                    : "hover:bg-slate-700/50"
            )}
        >
            <div className="flex items-center flex-1">{thread.fileName}</div>
        </Link>
    );
};

export default SideBarItem;
