"use client";

import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useClearMessages } from "@/hooks/use-clear-messages-modal";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "./ui/use-toast";

const ClearMessagesModal = () => {
    const [loading, setLoading] = useState(false);
    const { isOpen, onClose } = useClearMessages();
    const pathname = usePathname();
    const threadId = pathname.split("/")[2];
    const router = useRouter();

    async function clearMessages() {
        try {
            setLoading(true);
            const res = await fetch(`/api/thread/${threadId}/messages`, {
                method: "PATCH",
            });

            const data = await res.json();
            if (data) {
                router.refresh();
                toast({ description: "Messages Cleared" });
                onClose();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle>Clear Messages</DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-center sm:text-left">
                    Are you sure you want to clear all the messages in this
                    chat?
                </DialogDescription>
                <DialogFooter className="gap-y-2">
                    <Button
                        variant="destructive"
                        onClick={clearMessages}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Clear"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ClearMessagesModal;
