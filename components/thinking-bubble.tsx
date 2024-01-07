import { ThreeDots } from "react-loader-spinner";

const ThinkingBubble = () => {
    return (
        <div className="rounded-lg p-2 max-w-[80%] w-fit shadow-md bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-slate-100">
            <ThreeDots
                visible={true}
                height="30"
                width="50"
                color="#7e22ce"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="text-slate-900 dark:text-slate-100"
            />
        </div>
    );
};

export default ThinkingBubble;
