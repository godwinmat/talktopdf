"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./side-bar";
import { Chat } from "@prisma/client";

interface MobileSideBarProps {
    chats: Chat[];
}

const MobileSidebar = ({ chats }: MobileSideBarProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
                <Sidebar chats={chats} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
