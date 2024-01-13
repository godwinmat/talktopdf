"use client";

import { Download, Loader2 } from "lucide-react";
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
import { useExportChat } from "@/hooks/use-export-chat-modal";
import db from "@/lib/db";
import { exportChat } from "@/actions/export-chat";

const ExportChatModal = () => {
    const [loading, setLoading] = useState(false);
    const { isOpen, setIsOpen, filename } = useExportChat();
    const pathname = usePathname();
    const chatId = pathname.split("/")[2];
    const router = useRouter();
    const [error, setError] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");

    async function onExportChat() {
        try {
            setLoading(true);
            setError(false);

            const chatData = await exportChat(chatId);

            const formattedChat = chatData
                .map(({ content, role }) => `${role.toUpperCase()}: ${content}`)
                .join("\n");

            // Create a Blob (Binary Large Object) from the formatted string
            const blob = new Blob([formattedChat], { type: "text/plain" });

            // Create a link element and trigger a download
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${filename.split(".")[0]}.txt`;
            link.click();
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
                        <DialogTitle>Export Chat</DialogTitle>
                        <DialogDescription className="text-center sm:text-left">
                            The chat will be exported as
                            <b className="text-bold text-white">{` ${
                                filename.split(".")[0]
                            }.txt`}</b>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-y-2">
                        {error && (
                            <p className="text-rose-500 text-sm pt-2 text-center">
                                Something went wrong please try again.
                            </p>
                        )}
                        <Button onClick={onExportChat} disabled={loading}>
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-1" />
                                    Export
                                </>
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
                    <DrawerTitle>Export Chat</DrawerTitle>
                    <DrawerDescription>
                        The chat will be exported as
                        <b className="text-bold text-white">{` ${
                            filename.split(".")[0]
                        }.txt`}</b>
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
                        <Button onClick={onExportChat} disabled={loading}>
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-1" />
                                    Export
                                </>
                            )}
                        </Button>
                    </>
                    {/* </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ExportChatModal;
