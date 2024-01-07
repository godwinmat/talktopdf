import MobileSidebar from "@/components/mobile-sidebar";
import { auth } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import NavMenu from "./nav-menu";

import { headers } from "next/headers";
import db from "@/lib/db";

const Navbar = async () => {
    const { userId } = auth();

    let chats = await db.chat.findMany({
        where: {
            userId: userId as string,
        },
    });
    chats = chats.reverse();

    return (
        <div className="flex items-center justify-between px-4 h-12">
            <MobileSidebar chats={chats} />
            <div className="ml-auto flex justify-center items-center">
                <ModeToggle />
                <NavMenu chats={chats} />
            </div>
        </div>
    );
};

export default Navbar;
