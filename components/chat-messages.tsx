"use client";

import { Message } from "@prisma/client";
import Image from "next/image";
import { UIEvent, useEffect, useRef, useState } from "react";
import ChatBubble from "./chat-bubble";
import Scroller from "./scroller";
import ChatInput from "./chat-input";
import ThinkingBubble from "./thinking-bubble";

interface ChatMessagesProps {
    messages: Message[];
    chatId: string;
}

const ChatMessages = ({ messages = [], chatId }: ChatMessagesProps) => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const [showScroller, setShowScroller] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    const [savedMessages, setSavedMessages] = useState<Message[]>(messages);

    useEffect(() => {
        scrollToBottom();
    }, [savedMessages]);

    useEffect(() => {
        setSavedMessages(messages);
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
        <>
            <div
                className="flex-1 flex flex-col h-full space-y-4 overflow-y-scroll px-3 py-1"
                ref={messagesRef}
                onScroll={onScroll}
            >
                {savedMessages?.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                ))}
                {savedMessages?.length === 0 && (
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
                {/* {isThinking && <ThinkingBubble />} */}
            </div>
            <ChatInput
                chatId={chatId}
                // setIsThinking={setIsThinking}
                setSavedMessages={setSavedMessages}
                savedMessages={savedMessages!}
                scrollToBottom={scrollToBottom}
            />
        </>
    );
};

export default ChatMessages;
