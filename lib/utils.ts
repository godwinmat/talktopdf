import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getThreads = async (userId: string) => {
    const threads = await db.thread.findMany({
        where: {
            userId,
        },
    });

    return threads.reverse();
};
