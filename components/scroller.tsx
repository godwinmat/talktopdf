import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

interface ScrollerProps {
    onClick: () => void;
}

const Scroller = ({ onClick }: ScrollerProps) => {
    return (
        <div className="absolute bottom-20 left-0 w-full flex justify-center">
            <Button
                size="sm"
                variant="ghost"
                className="p-0 w-8 h-8 rounded-full bg-white group shadow-lg"
                onClick={onClick}
            >
                {/* <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center"> */}
                <ArrowDown className="w-5 h-5 text-slate-900" />
                {/* </div> */}
            </Button>
        </div>
    );
};

export default Scroller;
