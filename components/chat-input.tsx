"use client";

import { useState } from "react";
import { Loader2, SendHorizonal } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import db from "@/lib/db";
import { useRouter } from "next/navigation";

interface ChatInputProps {
    threadId: string;
}

const ChatInput = ({ threadId }: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            setLoading(true);
            event.preventDefault();
            setMessage("");
            let response = await fetch(`/api/thread/${threadId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });
            response = await response.json();
            console.log(response);

            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <form className="flex py-2 w-full  justify-center" onSubmit={onSubmit}>
            <Input
                className="flex-1 mr-1 border-0 bg-input outline-none focus-visible:ring-0 focus-visible:ring-transparent font-medium text-sm text-default"
                placeholder="Type a message"
                onChange={onChange}
                value={message}
            />
            <Button type="submit" disabled={message.length === 0}>
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <SendHorizonal className="w-5 h-5" />
                )}
            </Button>
        </form>
    );
};

export default ChatInput;
