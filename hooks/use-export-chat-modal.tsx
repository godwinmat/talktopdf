import { create } from "zustand";

interface useExportChatModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    filename: string;
    setFilename: (value: string) => void;
}

export const useExportChat = create<useExportChatModal>((set) => ({
    isOpen: false,
    filename: "",
    setIsOpen: (value) => set({ isOpen: value }),
    setFilename: (value) => set({ filename: value }),
}));
