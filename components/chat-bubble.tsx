import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import { Volume2, VolumeX } from "lucide-react";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import { Button } from "./ui/button";

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const time = message.createdAt?.toLocaleTimeString("en-US", {
        timeStyle: "short",
        hour12: true, // Use 12-hour format
    });

    function onSpeak() {
        speak({ text: message.content, voice: voices[49] });
    }

    return (
        <div
            className={cn(
                "rounded-lg p-2 max-w-[80%] w-fit shadow-md",
                message.role === "user"
                    ? "ml-auto bg-primary text-slate-100"
                    : "bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-slate-100"
            )}
        >
            <p className="text-[13px] sm:text-sm whitespace-pre-line">
                {message.content}
            </p>
            <div className="flex justify-between items-center">
                {time && <p className="text-[12px] pt-1">{time}</p>}
                {message.role !== "user" && supported && (
                    <Button
                        variant="ghost"
                        className="rounded-full"
                        size="icon"
                        onClick={speaking ? cancel : onSpeak}
                    >
                        {!speaking ? (
                            <VolumeX className="h-5 w-5" />
                        ) : (
                            <Volume2 className="h-5 w-5" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ChatBubble;
