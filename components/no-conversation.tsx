"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useUploadModal } from "@/hooks/use-upload-modal";

const NoConversation = () => {
    const { setIsOpen } = useUploadModal();

    return (
        <div className="flex flex-col justify-center items-center w-full h-full text-lg">
            <Image
                src="/conversation.png"
                width={400}
                height={400}
                alt="no conversation"
            />
            Upload a PDF file to start a conversation
            <Button className="mt-2" onClick={() => setIsOpen(true)}>
                Upload PDF file
            </Button>
        </div>
    );
};

export default NoConversation;
