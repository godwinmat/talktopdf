import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const HomeNavBar = () => {
    const { userId } = auth();
    return (
        <div className="flex justify-between py-2 px-10">
            <p>TalkToPDF</p>
            {userId ? (
                <div className="flex items-center justify-center space-x-5">
                    <Button asChild>
                        <Link href="/chat">Chat</Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            ) : (
                <div className="space-x-5">
                    <SignUpButton mode="modal" afterSignUpUrl="/chat">
                        Sign Up
                    </SignUpButton>
                    <SignInButton mode="modal" afterSignInUrl="/chat">
                        Sign In
                    </SignInButton>
                </div>
            )}
        </div>
    );
};

export default HomeNavBar;
