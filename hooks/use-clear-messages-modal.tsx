import { create } from "zustand";

interface useClearMessagesModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useClearMessages = create<useClearMessagesModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
