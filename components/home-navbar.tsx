import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Logo from "./logo";
import CustomUserButton from "./custom-user-button";
import { ModeToggle } from "./mode-toggle";

const HomeNavBar = () => {
    const { userId } = auth();
    return (
        <div className="fixed top-0 bg-background w-full flex justify-between items-center py-2 px-2 sm:px-5 lg:px-10">
            <Logo />
            {userId ? (
                <div className="flex items-center justify-center space-x-2">
                    <Button size="sm" asChild>
                        <Link href="/chat">Chat</Link>
                    </Button>
                    <ModeToggle />
                    <CustomUserButton />
                </div>
            ) : (
                <div className="space-x-2 flex justify-center items-center">
                    <SignUpButton mode="modal" afterSignUpUrl="/chat">
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-sm sm:text-base"
                        >
                            Sign Up
                        </Button>
                    </SignUpButton>
                    <SignInButton mode="modal" afterSignInUrl="/chat">
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-sm sm:text-base"
                        >
                            Sign In
                        </Button>
                    </SignInButton>
                    <ModeToggle />
                </div>
            )}
        </div>
    );
};

export default HomeNavBar;
