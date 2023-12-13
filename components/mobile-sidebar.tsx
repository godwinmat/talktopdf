"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./side-bar";
import { Thread } from "@prisma/client";

interface MobileSideBarProps {
    threads: Thread[];
}

const MobileSidebar = ({ threads }: MobileSideBarProps) => {
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
                <Sidebar threads={threads} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
