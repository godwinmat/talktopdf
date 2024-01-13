import { create } from "zustand";

interface useSettingsModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const useSettings = create<useSettingsModal>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));
