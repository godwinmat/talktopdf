"use client";

import { Loader2, SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatInputProps {
    threadId: string;
}

const ChatInput = ({ threadId }: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(false);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            setLoading(true);
            setError(false);
            event.preventDefault();

            // const apiMessage = message;
            await fetch(`/api/thread/${threadId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });

            router.refresh();
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setMessage("");
            setLoading(false);
        }
    }
    return (
        <form className="w-full px-3 py-1 md:px-8" onSubmit={onSubmit}>
            {error && (
                <p className="text-rose-500 text-xs text-center pb-1">
                    Something went wrong please try again.
                </p>
            )}
            <div className="w-full flex">
                <Input
                    className="flex-1 mr-1 border-0 bg-input outline-none focus-visible:ring-0 focus-visible:ring-transparent font-medium text-sm text-default text-[13px] sm:text-sm text-slate-900 dark:text-slate-100 bg-gray-100 dark:bg-gray-900"
                    placeholder="Type a message"
                    onChange={onChange}
                    value={message}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={message.length === 0 || loading}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <SendHorizonal className="w-5 h-5" />
                    )}
                </Button>
            </div>
        </form>
    );
};

export default ChatInput;
