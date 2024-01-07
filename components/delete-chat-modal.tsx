import { Loader2 } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useDeleteChat } from "@/hooks/use-delete-chat-modal";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

const DeleteChatModal = () => {
    const { isOpen, setIsOpen } = useDeleteChat();
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const router = useRouter();
    const [error, setError] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    async function deleteChat() {
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/chat/${chatId}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (data) {
                router.replace("/chat");
                toast("Chat Deleted", {
                    duration: 100,
                });
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
                        <DialogTitle>Delete Chat</DialogTitle>
                    </DialogHeader>

                    <DialogDescription className="text-center sm:text-left">
                        Are you sure you want to delete this chat? Please note
                        that all messages and file related to this chat will be
                        deleted. This process is not reversible
                    </DialogDescription>
                    <DialogFooter className="gap-y-2">
                        {error && (
                            <p className="text-rose-500 text-sm pt-2 text-center">
                                Something went wrong please try again.
                            </p>
                        )}
                        <Button
                            variant="destructive"
                            onClick={deleteChat}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Delete"
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
                    <DrawerTitle>
                        Are you sure you want to delete this chat?
                    </DrawerTitle>
                    <DrawerDescription>
                        Please note that all messages and file related to this
                        chat will be deleted. This process is not reversible
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
                            onClick={deleteChat}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </>
                    {/* </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DeleteChatModal;
