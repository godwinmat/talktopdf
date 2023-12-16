import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useDeleteChat } from "@/hooks/use-delete-chat-modal";

const DeleteChatModal = () => {
    const { isOpen, onClose } = useDeleteChat();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle>Upload PDF</DialogTitle>
                </DialogHeader>

                <DialogDescription className="w-full flex flex-col justify-center items-center my-5"></DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteChatModal;
