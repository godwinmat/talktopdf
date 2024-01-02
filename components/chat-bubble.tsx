import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    const time = message.createdAt.toLocaleTimeString([], {
        timeStyle: "short",
    });
    return (
        <div
            className={cn(
                "rounded-lg p-2 max-w-[80%] w-fit shadow-sm",
                message.role === "user"
                    ? "ml-auto bg-purple-700 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-slate-100"
            )}
        >
            <p className="text-[13px] sm:text-sm">{message.content}</p>
            <p className="text-[10px] pt-1">{time}</p>
        </div>
    );
};

export default ChatBubble;
