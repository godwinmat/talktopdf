"use server";

import db from "@/lib/db";

export async function exportChat(chatId: string) {
    try {
        const chat = await db.chat.findUnique({
            where: {
                id: chatId,
            },
        });

        if (!chat) {
            throw new Error("Chat does not exist");
        }
        const chatData = await db.message.findMany({
            where: {
                chatId,
            },
            select: {
                content: true,
                role: true,
            },
        });

        return chatData;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}
