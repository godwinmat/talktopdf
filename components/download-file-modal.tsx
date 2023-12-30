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
import { useDownloadFile } from "@/hooks/use-downoad-file-modal";
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

const DownloadFileModal = () => {
    const [loading, setLoading] = useState(false);
    const { isOpen, setIsOpen } = useDownloadFile();
    const pathname = usePathname();
    const threadId = pathname.split("/")[2];
    const router = useRouter();
    const [error, setError] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");

    async function downloadFile() {
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/thread/${threadId}`, {
                method: "GET",
            });

            const data = await res.json();
            console.log(data);
            // if (data) {
            //     toast("Messages Cleared");
            //     router.refresh();
            //     setIsOpen(false);
            // }
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
                        <DialogTitle>Download File</DialogTitle>
                        <DialogDescription className="text-center sm:text-left">
                            Are you sure you want to download this file?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-y-2">
                        {error && (
                            <p className="text-rose-500 text-sm pt-2 text-center">
                                Something went wrong please try again.
                            </p>
                        )}
                        <Button onClick={downloadFile} disabled={loading}>
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
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
                    <DrawerTitle>Download File</DrawerTitle>
                    <DrawerDescription>
                        Are you sure you want to download this file?
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
                        <Button onClick={downloadFile} disabled={loading}>
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
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

export default DownloadFileModal;
