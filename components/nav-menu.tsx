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

const NavMenu = () => {
    const { onOpen } = useClearMessages();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuItem onClick={onOpen}>
                    Clear Messages
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-rose-500" onClick={() => {}}>
                    Delete Chat
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavMenu;
