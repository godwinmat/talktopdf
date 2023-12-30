import { create } from "zustand";

interface useClearMessagesModalStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const useClearMessages = create<useClearMessagesModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));
