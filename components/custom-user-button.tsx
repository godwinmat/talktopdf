"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const CustomUserButton = () => {
    const { theme, systemTheme } = useTheme();

    return (
        <UserButton
            afterSignOutUrl="/"
            appearance={{
                baseTheme:
                    theme === "system"
                        ? systemTheme === "dark"
                            ? dark
                            : undefined
                        : theme === "dark"
                        ? dark
                        : undefined,
            }}
        />
    );
};

export default CustomUserButton;
