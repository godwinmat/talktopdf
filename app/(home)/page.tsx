import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HomeNavBar from "@/components/home-navbar";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <HomeNavBar />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
}
