import { create } from "zustand";

interface useUploadModalStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const useUploadModal = create<useUploadModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));
