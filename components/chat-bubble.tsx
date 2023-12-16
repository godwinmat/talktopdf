import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    return (
        <div
            className={cn(
                "bg-blue-500 text-white rounded-lg p-3 max-w-[80%] w-fit",
                message.role === "user" && "ml-auto"
            )}
        >
            <p className="text-sm">{message.content}</p>
            <p className="text-xs pt-1">12:02 PM</p>
        </div>
    );
};

export default ChatBubble;
