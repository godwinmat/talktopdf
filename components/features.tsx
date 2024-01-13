import Image from "next/image";

const Features = () => {
    return (
        <section className="max-w-5xl flex flex-col items-center md:justify-center text-center md:text-left px-6 py-20 space-y-10 md:space-y-1">
            <h1 className="text-4xl font-semibold">Features</h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-5 pb-5 md:pb-1">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 pb-2">
                        Export Chat
                    </h2>
                    <p className="text-muted-foreground">
                        Effortlessly capture and save conversations in a TXT
                        file format with the Export Chat feature. Perfect for
                        record-keeping or sharing insights, ensuring your
                        discussions are easily accessible and compatible for
                        various purposes.
                    </p>
                </div>
                <Image
                    src="/export.png"
                    width={300}
                    height={300}
                    alt="export"
                />
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-center items-center space-x-5">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100  pb-2">
                        Toggle Light and Dark mode
                    </h2>
                    <p className="text-muted-foreground">
                        Elevate your visual experience with Dark and Light mode.
                        Seamlessly switch between modes for reduced eye strain
                        and personalized aesthetics, easing reading at different
                        times of the day.
                    </p>
                </div>
                <Image
                    src="/dark-mode.png"
                    width={300}
                    height={300}
                    alt="export"
                />
            </div>
        </section>
    );
};

export default Features;
