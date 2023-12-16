import { create } from "zustand";

interface useDeleteChatModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useDeleteChat = create<useDeleteChatModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
