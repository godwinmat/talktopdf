import db from "@/lib/db";
import { openai } from "@/lib/openai";
import { Message, Roles } from "@prisma/client";

export const AddAllCurrentMessagesToDB = async (
    threadId: string,
    prompt: string
) => {
    try {
        // List all the messages from the thread
        const { data } = await openai.beta.threads.messages.list(threadId);

        // Find the index of the first prompt
        const promptIndex = data?.findIndex(
            (message: any) => message.content[0].text.value === prompt
        );

        // Slice out the messages from the first promt till the end
        const newMessages = data?.slice(0, promptIndex + 1);

        // Prepare them to save in prisma
        const prismaMessages = newMessages
            .map((message: any) => ({
                id: message.id,
                role: message.role as Roles,
                content: message.content[0].text.value as string,
                thread: {
                    connect: {
                        id: message.thread_id,
                    },
                },
            }))
            .reverse();

        // Save to prisma
        for (const message of prismaMessages) {
            await db.message.create({
                data: message,
            });
        }

        return prismaMessages;
    } catch (error) {
        throw new Error("[ADD_ALL_CURRENT_MESSAGES_TO_DB_ERROR]" + error);
    }
};
