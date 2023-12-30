"use client";

import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "./ui/drawer";

const UploadModal = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const uploadModal = useUploadModal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLoading(true);
        setError(false);
        try {
            const file = event.target.files?.[0];

            // Validate file type
            if (!file || !file.type.includes("pdf")) {
                toast("Please select a PDF file.");
                return;
            }
            // Upload file to server
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/thread", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.thread.id) {
                router.replace(`/chat/${data.thread.id}`);
                router.refresh();
                toast("PDF Uploaded Successfully");
                uploadModal.setIsOpen(false);
            }
        } catch (error) {
            console.log("[UPLOAD FUNCTION]" + error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (isDesktop) {
        return (
            <Dialog
                open={uploadModal.isOpen}
                onOpenChange={uploadModal.setIsOpen}
            >
                <DialogContent className="rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Upload PDF</DialogTitle>
                        <DialogDescription className="text-center sm:text-left">
                            {loading
                                ? "Uploading..."
                                : "Upload PDF to Chat With"}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-y-2 bg-red-500">
                        <Button
                            id="uploadpdf"
                            onClick={() => fileRef?.current?.click()}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-1" />
                                    Upload
                                </>
                            )}
                            <Input
                                type="file"
                                ref={fileRef}
                                accept=".pdf"
                                onChange={handleFileUpload}
                                id="uploadpdf"
                                className="hidden"
                            />
                        </Button>

                        {error && (
                            <p className="text-rose-500 text-sm pt-1">
                                Something went wrong please try again.
                            </p>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={uploadModal.isOpen} onOpenChange={uploadModal.setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Upload PDF</DrawerTitle>
                    <DrawerDescription>
                        {loading ? "Uploading..." : "Upload PDF to Chat With"}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-1">
                    <Button
                        id="uploadpdf"
                        onClick={() => fileRef?.current?.click()}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-1" />
                                Upload
                            </>
                        )}
                        <Input
                            type="file"
                            ref={fileRef}
                            accept=".pdf"
                            onChange={handleFileUpload}
                            id="uploadpdf"
                            className="hidden"
                        />
                    </Button>

                    {error && (
                        <p className="text-rose-500 text-sm pt-1">
                            Something went wrong please try again.
                        </p>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default UploadModal;
