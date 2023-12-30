"use client";

import { Message } from "@prisma/client";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { useState } from "react";

interface ChatProps {
    threadId: string;
    messages: Message[];
}

const Chat = ({ messages, threadId }: ChatProps) => {
    const [stateMessages, setStateMessages] = useState(messages);

    return (
        <div className="w-full h-full flex flex-col">
            <ChatMessages messages={stateMessages} />
            <ChatInput
                threadId={threadId}
                setMessages={setStateMessages}
                messages={stateMessages}
            />
        </div>
    );
};

export default Chat;
