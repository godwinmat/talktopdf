"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignUpComponent = () => {
    const { theme, systemTheme } = useTheme();

    return (
        <SignUp
            afterSignUpUrl="/chat"
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

export default SignUpComponent;
