"use client";

import { useSettings } from "@/hooks/use-settings-modal";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useClerk } from "@clerk/nextjs";

const SettingsModal = () => {
    const { isOpen, setIsOpen } = useSettings();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(false);
    const { signOut } = useClerk();

    async function deleteAccount() {
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/chat/`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.message) {
                toast("Account Deleted");
                setIsOpen(false);
                await signOut();
            }
        } catch (error) {
            console.log("DELETE_ACCOUNT_MODAL", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>

                <DialogFooter className="gap-y-2">
                    {error && (
                        <p className="text-rose-500 text-sm pt-2 text-center">
                            Something went wrong please try again.
                        </p>
                    )}
                    <Button
                        variant="destructive"
                        onClick={deleteAccount}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Delete Account"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
