import MobileSidebar from "@/components/mobile-sidebar";
import { SignOutButton, UserButton, auth } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import NavMenu from "./nav-menu";

import db from "@/lib/db";
import Heading from "./heading";

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
            <Heading chats={chats} />
            <div className="ml-auto flex justify-center items-center px-1">
                <ModeToggle />
                <NavMenu chats={chats} />
            </div>
        </div>
    );
};

export default Navbar;
