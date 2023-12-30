"use client";

import { MoreVertical } from "lucide-react";

import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useClearMessages } from "@/hooks/use-clear-messages-modal";
import { useDeleteChat } from "@/hooks/use-delete-chat-modal";
import { usePathname } from "next/navigation";
import { Thread } from "@prisma/client";
import { cn } from "@/lib/utils";

interface NavMenuProps {
    threads: Thread[];
}

const NavMenu = ({ threads }: NavMenuProps) => {
    const clearMessages = useClearMessages();
    const deleteChat = useDeleteChat();
    const pathname = usePathname();
    const threadId = pathname.split("/")[2];
    const newThreads = threads.map((thread) => thread.id);
    const threadExist = newThreads.includes(threadId);

    return (
        <div className={cn("hidden", threadExist && "block")}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => clearMessages.setIsOpen(true)}
                    >
                        Clear Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {}}
                    >
                        Download File
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-rose-500 cursor-pointer"
                        onClick={() => deleteChat.setIsOpen(true)}
                    >
                        Delete Chat
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default NavMenu;
