import NoConversation from "@/components/no-conversation";
import { getThreads } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Chat = async () => {
    const { userId } = auth();
    const threads = await getThreads(userId as string);

    if (threads.length !== 0) {
        redirect(`/chat/${threads[0].id}`);
    }
    return <NoConversation />;
};

export default Chat;
