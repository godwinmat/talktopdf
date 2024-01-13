import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, auth } from "@clerk/nextjs";
import Image from "next/image";

const Hero = () => {
    const { userId } = auth();

    return (
        <section className="max-w-5xl h-dvh flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-20 space-y-8">
            <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
                    Unlock the power of{" "}
                    <span className="text-primary">Conversations</span> with
                    your PDFs
                </h2>
                <p className="text-gray-600 dark:text-gray-400 py-5">
                    Transform the way you engage with PDF files using our
                    cutting-edge app. Experience the seamless integration of
                    real-time communication within your PDFs, enhancing
                    efficiency for a more dynamic interaction. Elevate your
                    productivity and start a conversation with your PDFs today
                </p>
                {userId ? (
                    <div className="space-x-5">
                        <Button asChild>
                            <Link href="/chat">Start a Conversation</Link>
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
            </div>
            <div className="md:w-1/2 hidden md:flex justify-center items-center">
                <Image
                    src="/chat-bot.png"
                    alt="chat-bot"
                    width={320}
                    height={320}
                />
            </div>
        </section>
    );
};

export default Hero;
