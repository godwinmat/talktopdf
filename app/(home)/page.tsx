import Hero from "@/components/hero";
import HomeNavBar from "@/components/home-navbar";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <HomeNavBar />
            <Hero />
        </div>
    );
}
