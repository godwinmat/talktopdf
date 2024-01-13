"use client";

import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import { MoreVertical, Sparkles, Upload } from "lucide-react";

// import Logo from "@/components/logo";
import { Chat } from "@prisma/client";
import SideBarItem from "./side-bar-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SheetClose } from "./ui/sheet";
import { useUploadModal } from "@/hooks/use-upload-modal";
import Logo from "./logo";

interface SideBarProps {
    chats: Chat[];
}

const Sidebar = ({ chats }: SideBarProps) => {
    const { user } = useUser();
    const { setIsOpen } = useUploadModal();
    const { signOut } = useClerk();

    return (
        <div className="space-y-4 flex flex-col h-full text-white relative ">
            <div className="px-3 py-2 flex-1 flex flex-col overflow-y-scroll">
                {/* <Logo classes="flex items-center pl-3 mb-14 text-default" /> */}
                <div className="mt-7 w-full flex justify-center">
                    <Logo />
                </div>
                <Button
                    variant="secondary"
                    className="my-2 py-3"
                    onClick={() => setIsOpen(true)}
                >
                    <Upload className="w-5 h-5 mr-1" /> Upload PDF
                </Button>
                <div className="space-y-1 mt-5 h-full overflow-y-scroll pb-40 pt-2">
                    {chats.map((chat) => (
                        <SheetClose key={chat.id} className="w-full">
                            <SideBarItem chat={chat} />
                        </SheetClose>
                    ))}
                </div>
                <Card className="p-3 absolute bottom-1">
                    <div className="flex items-center">
                        <Avatar className="bg-red-500">
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback>
                                {user?.firstName?.substring(0, 1)}
                                {user?.lastName?.substring(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                        <CardContent className="pl-2 py-1">
                            <p className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-[175px] text-lg">
                                {user?.fullName}
                            </p>
                            <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap w-[175px]">
                                {user?.emailAddresses[0].emailAddress}
                            </p>
                        </CardContent>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <MoreVertical className="cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" side="top">
                                <DropdownMenuItem asChild className="w-full">
                                    <SignOutButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* <Button
                        // variant="ghost"
                        className="w-full mt-2 text-slate-100"
                    >
                        <Sparkles className="h-5 w-5 mr-2" /> Subscribe
                    </Button> */}
                </Card>
            </div>
        </div>
    );
};

export default Sidebar;
