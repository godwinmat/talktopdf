"use client";

import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useUploadModal } from "@/hooks/use-upload-modal";

const UploadModal = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const uploadModal = useUploadModal();
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLoading(true);
        try {
            const file = event.target.files?.[0];

            // Validate file type
            if (!file || !file.type.includes("pdf")) {
                toast({ description: "Please select a PDF file." });
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
                toast({ description: "PDF Uploaded Successfully" });
                uploadModal.onClose();
            }
        } catch (error) {
            console.log("[UPLOAD FUNCTION]" + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={uploadModal.isOpen} onOpenChange={uploadModal.onClose}>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle>Upload PDF</DialogTitle>
                </DialogHeader>

                <DialogDescription className="w-full flex flex-col justify-center items-center my-5">
                    <p className="text-center text-base pb-2">
                        {loading ? "Uploading..." : "Upload PDF to Chat With"}
                    </p>
                    {loading ? (
                        <Loader2 className="animate-spin w-10 h-10 text-white" />
                    ) : (
                        <Button
                            variant="secondary"
                            id="uploadpdf"
                            onClick={() => fileRef?.current?.click()}
                        >
                            <Upload className="w-4 h-4 mr-1" />
                            Upload
                            <Input
                                type="file"
                                ref={fileRef}
                                accept=".pdf"
                                onChange={handleFileUpload}
                                id="uploadpdf"
                                className="hidden"
                            />
                        </Button>
                    )}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default UploadModal;
