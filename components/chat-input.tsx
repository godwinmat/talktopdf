"use client";

import { Loader2, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Message } from "@prisma/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ChatInputProps {
    chatId: string;
    setIsThinking?: (value: boolean) => void;
    scrollToBottom: () => void;
    setSavedMessages: (value: Message[]) => void;
    savedMessages: Message[];
}

const ChatInput = ({
    chatId,
    setSavedMessages,
    savedMessages,
}: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.target.value);
    }

    async function onSubmit() {
        try {
            setLoading(true);
            setError(false);

            // const apiMessage = message;
            const res = await fetch(`/api/chat/${chatId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });

            const response = await res.json();

            if (response.message === "success") {
                setMessage("");
                setLoading(false);
                response.data.createdAt = new Date(response.data.createdAt);
                setSavedMessages([...savedMessages, response.data]);

                const newResponse = await fetch(
                    `/api/chat/${chatId}/messages`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const parsedResponse = await newResponse.json();

                parsedResponse.message.createdAt = new Date(
                    parsedResponse.message.createdAt
                );
                setSavedMessages([
                    ...savedMessages,
                    response.data,
                    parsedResponse.message,
                ]);
            }
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        function returnPress(event: KeyboardEvent) {
            if (event.key === "Enter" && !event.shiftKey) {
                if (isDesktop) {
                    onSubmit();
                    event.preventDefault();
                }
            }
        }

        if (textAreaRef.current) {
            textAreaRef.current.addEventListener("keydown", returnPress);
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height =
                textAreaRef.current?.scrollHeight + "px";
        }

        return () => {
            if (textAreaRef.current) {
                textAreaRef.current.removeEventListener("keydown", returnPress);
            }
        };
    }, [message, isDesktop]);

    return (
        <div className="w-full px-3 py-1">
            {error && (
                <p className="text-rose-500 text-xs text-center pb-1">
                    Something went wrong please try again.
                </p>
            )}
            <div className="w-full flex items-center">
                <textarea
                    className="resize-none max-h-36 w-full px-2 pt-2 rounded-md mr-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-sm text-slate-900 dark:text-slate-100 bg-gray-100 dark:bg-gray-900"
                    placeholder="Type a message"
                    onChange={onChange}
                    value={message}
                    disabled={loading}
                    // rows={1}
                    ref={textAreaRef}
                />
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={message.length === 0 || loading}
                    onClick={onSubmit}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <SendHorizonal className="w-5 h-5" />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;
