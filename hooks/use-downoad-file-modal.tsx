import { create } from "zustand";

interface useDownloadFileModalStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const useDownloadFile = create<useDownloadFileModalStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));
