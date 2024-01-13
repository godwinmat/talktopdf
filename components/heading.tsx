"use client";

import { Chat } from "@prisma/client";
import { usePathname } from "next/navigation";

interface HeadingProps {
    chats: Chat[];
}

const Heading = ({ chats }: HeadingProps) => {
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const chat = chats.find((chat) => chat.id === chatId);

    return <div className="line-clamp-1 pl-2">{chat?.fileName}</div>;
};

export default Heading;
