"use client";

import { useEffect, useState } from "react";
import UploadModal from "../upload-modal";
import DeleteChatModal from "../delete-chat-modal";
import ClearMessagesModal from "../clear-messages-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <UploadModal />
            <DeleteChatModal />
            <ClearMessagesModal />
        </>
    );
};
