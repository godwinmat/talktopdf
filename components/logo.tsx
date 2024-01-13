import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="logo" width={45} height={20} />
            <p className="text-default ml-[1px] mt-1 font-bold text-base md:text-lg">
                Talk To PDF
            </p>
        </Link>
    );
};

export default Logo;
