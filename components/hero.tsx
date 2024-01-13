import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, auth } from "@clerk/nextjs";

const Hero = () => {
    const { userId } = auth();

    return (
        <section className="max-w-4xl flex flex-col items-center justify-center text-center px-6 py-20 space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                Unlock the power of conversation with your PDFs
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                Chat, and transform the way you work with PDF files. This app
                brings real-time communication to your documents, making
                collaboration effortless and efficient. Elevate your
                productivity - start chatting with your PDFs today.
            </p>
            {userId ? (
                <div className="flex items-center justify-center space-x-5">
                    <Button size="sm" asChild>
                        <Link href="/chat">Chat</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-x-5">
                    <SignUpButton mode="modal" afterSignUpUrl="/chat">
                        <Button className="text-sm sm:text-base">
                            Sign Up
                        </Button>
                    </SignUpButton>
                    <SignInButton mode="modal" afterSignInUrl="/chat">
                        <Button className="text-sm sm:text-base">
                            Sign In
                        </Button>
                    </SignInButton>
                </div>
            )}
        </section>
    );
};

export default Hero;
