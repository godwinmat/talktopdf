import MobileSidebar from "@/components/mobile-sidebar";
import { getThreads } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import NavMenu from "./nav-menu";

import { headers } from "next/headers";

const Navbar = async () => {
    const { userId } = auth();
    const threads = await getThreads(userId as string);

    return (
        <div className="flex items-center justify-between px-4 h-14">
            <MobileSidebar threads={threads} />
            <div className="ml-auto flex justify-center items-center">
                <ModeToggle />
                <NavMenu threads={threads} />
            </div>
        </div>
    );
};

export default Navbar;
