import NoConversation from "@/components/no-conversation";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Chat = async () => {
    const { userId } = auth();

    let chats = await db.chat.findMany({
        where: {
            userId: userId as string,
        },
    });
    chats = chats.reverse();

    if (chats.length !== 0) {
        redirect(`/chat/${chats[0].id}`);
    }
    return <NoConversation />;
};

export default Chat;
