import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChatIdProps {
    params: {
        id: string;
    };
}

const Chat = async ({ params }: ChatIdProps) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const thread = await db.chat.findUnique({
        where: {
            id: params?.id,
            userId: userId,
        },
    });

    if (!thread) {
        redirect("/chat");
    }

    const messages = await db.message.findMany({
        where: {
            chatId: params?.id,
        },
    });

    console.log(messages);
    return (
        <div className="h-full w-full max-w-2xl flex flex-col relative md">
            <ChatMessages messages={messages} chatId={params.id} />
        </div>
    );
};

export default Chat;
