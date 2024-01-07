"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useClearMessages } from "@/hooks/use-clear-messages-modal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

const ClearMessagesModal = () => {
    const [loading, setLoading] = useState(false);
    const { isOpen, setIsOpen } = useClearMessages();
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const router = useRouter();
    const [error, setError] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    async function clearMessages() {
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/chat/${chatId}/messages`, {
                method: "PATCH",
            });

            const data = await res.json();
            if (data) {
                toast("Messages Cleared");
                router.refresh();
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Clear Messages</DialogTitle>
                        <DialogDescription className="text-center sm:text-left">
                            Are you sure you want to clear all the messages in
                            this chat?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-y-2">
                        {error && (
                            <p className="text-rose-500 text-sm pt-2 text-center">
                                Something went wrong please try again.
                            </p>
                        )}
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
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Clear Messages</DrawerTitle>
                    <DrawerDescription>
                        Are you sure you want to clear all the messages in this
                        chat?
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-1">
                    {/* <DrawerClose asChild> */}
                    <>
                        {error && (
                            <p className="text-rose-500 text-sm text-center">
                                Something went wrong please try again.
                            </p>
                        )}
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
                    </>
                    {/* </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ClearMessagesModal;
