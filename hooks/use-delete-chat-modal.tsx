import { create } from "zustand";

interface useDeleteChatModalStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const useDeleteChat = create<useDeleteChatModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));
