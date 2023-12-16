import db from "@/lib/db";
import Image from "next/image";
import ChatBubble from "./chat-bubble";

interface ChatMessagesProps {
    threadId: string;
}

const ChatMessages = async ({ threadId }: ChatMessagesProps) => {
    const messages = await db.message.findMany({
        where: {
            threadId,
        },
    });
    // const [messages, setMessages] = useState<ThreadMessage[]>([]);

    // async function getMessages(threadId: string) {
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

    return (
        <div className="flex-1 flex flex-col h-full space-y-4 overflow-y-scroll">
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
        </div>
    );
};

export default ChatMessages;
