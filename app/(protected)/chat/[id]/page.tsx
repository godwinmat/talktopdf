import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface ChatIdProps {
    params: {
        id: string;
    };
}

const Chat = async ({ params }: ChatIdProps) => {
    const thread = await db.thread.findUnique({
        where: {
            id: params?.id,
        },
    });

    if (!thread) {
        redirect("/chat");
    }

    const messages = await db.message.findMany({
        where: {
            threadId: params?.id,
        },
    });
    return (
        <div className="w-full h-full flex flex-col relative">
            <ChatMessages messages={messages} />
            <ChatInput threadId={params?.id} />
        </div>
    );
};

export default Chat;
