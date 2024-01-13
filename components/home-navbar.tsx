import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import Logo from "./logo";
import CustomUserButton from "./custom-user-button";

const HomeNavBar = () => {
    const { userId } = auth();
    return (
        <div className="w-full flex justify-between items-center py-2 px-2 sm:px-5 lg:px-10">
            <Logo />
            {userId ? (
                <div className="flex items-center justify-center space-x-5">
                    <Button size="sm" asChild>
                        <Link href="/chat">Chat</Link>
                    </Button>
                    <CustomUserButton />
                </div>
            ) : (
                <div className="space-x-2">
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
                </div>
            )}
        </div>
    );
};

export default HomeNavBar;
