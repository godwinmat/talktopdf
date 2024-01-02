"use client";

import Image from "next/image";
import ChatBubble from "./chat-bubble";
import { Message } from "@prisma/client";
import { UIEvent, useEffect, useRef, useState } from "react";
import Scroller from "./scroller";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useClearMessages } from "@/hooks/use-clear-messages-modal";

interface ChatMessagesProps {
    messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const [showScroller, setShowScroller] = useState(false);

    // const [messages, setMessages] = useState<ThreadMessage[]>([]);

    // async function getMessages(threadId: strng) {
    //     try {
    //         let res = await fetch(`/api/thread/${threadId}/messages`, {
    //             method: "GET",
    //         });
    //         const data = await res.json();
    //         console.log(data.messages.length);
    //         setMessages(data.messages.reverse());
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getMessages(threadId);
    // }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function scrollToBottom() {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({
                behavior: "smooth",
                top: messagesRef.current.scrollHeight,
            });
            setShowScroller(false);
        }
    }

    function onScroll(event: UIEvent<HTMLElement>) {
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollTop = event.currentTarget.scrollTop;
        const screenHeight = event.currentTarget.clientHeight;

        const contentHeightBelowViewport =
            scrollHeight - (scrollTop + screenHeight);

        if (contentHeightBelowViewport > 200) {
            setShowScroller(true);
        } else {
            setShowScroller(false);
        }
    }

    return (
        <div
            className="flex-1 max-w-4xl flex flex-col h-full space-y-4 overflow-y-scroll px-3 py-1 md:px-8"
            ref={messagesRef}
            onScroll={onScroll}
        >
            {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
            ))}
            {messages.length === 0 && (
                <div className="flex flex-col items-center text-xl font-medium h-full">
                    <Image
                        src="/conversation.png"
                        width={400}
                        height={400}
                        alt="no conversation"
                    />
                    No message
                </div>
            )}
            {showScroller && <Scroller onClick={scrollToBottom} />}
        </div>
    );
};

export default ChatMessages;
