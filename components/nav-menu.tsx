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
import { Chat } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useDownloadFile } from "@/hooks/use-downoad-file-modal";

interface NavMenuProps {
    chats: Chat[];
}

const NavMenu = ({ chats }: NavMenuProps) => {
    const clearMessages = useClearMessages();
    const deleteChat = useDeleteChat();
    const downloadFile = useDownloadFile();
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const newChats = chats.map((chat) => chat.id);
    const chatExist = newChats.includes(chatId);

    return (
        <div className={cn("hidden", chatExist && "block")}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {chats.length > 0 && (
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => clearMessages.setIsOpen(true)}
                        >
                            Clear Messages
                        </DropdownMenuItem>
                    )}
                    {/* <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => downloadFile.setIsOpen(true)}
                    >
                        Download File
                    </DropdownMenuItem> */}
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
