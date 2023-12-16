import { cn } from "@/lib/utils";
import {
    MessageContentText,
    ThreadMessage,
} from "openai/resources/beta/threads/messages/messages.mjs";

interface ChatBubbleProps {
    message: ThreadMessage;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    if (message.content[0].type === "image_file") return null;

    return (
        <div
            className={cn(
                "bg-blue-500 text-white rounded-lg p-3 max-w-[80%] w-fit",
                message.role === "user" && "ml-auto"
            )}
        >
            <p className="text-sm">{message.content[0]?.text.value}</p>
            <p className="text-xs pt-1">12:02 PM</p>
        </div>
    );
};

export default ChatBubble;
