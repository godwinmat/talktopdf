"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignInComponent = () => {
    const { theme, systemTheme } = useTheme();

    return (
        <SignIn
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
            afterSignInUrl="/chat"
        />
    );
};

export default SignInComponent;
