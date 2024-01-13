"use client";

import { MoreVertical } from "lucide-react";

import { useClearMessages } from "@/hooks/use-clear-messages-modal";
import { useDeleteChat } from "@/hooks/use-delete-chat-modal";
import { useExportChat } from "@/hooks/use-export-chat-modal";
import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavMenuProps {
    chats: Chat[];
}

const NavMenu = ({ chats }: NavMenuProps) => {
    const clearMessages = useClearMessages();
    const deleteChat = useDeleteChat();
    const exportChat = useExportChat();
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const newChats = chats.map((chat) => chat.id);
    const chatExist = newChats.includes(chatId);
    const chat = chats.find((chat) => chat.id === chatId);

    return (
        <div className={cn("hidden", chatExist && "block")}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="focus-visible:ring-transparent"
                    >
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
                        className="cursor-pointer"
                        onClick={() => {
                            exportChat.setIsOpen(true);
                            if (chat) {
                                exportChat.setFilename(chat.fileName);
                            }
                        }}
                    >
                        Export Chat
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
