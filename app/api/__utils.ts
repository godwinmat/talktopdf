import { openai } from "@/lib/openai";
import { Roles } from "@prisma/client";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";

export const getAllMessagesAndAddToDB = async (
    threadId: string,
    prompt: string
) => {
    const { data } = await openai.beta.threads.messages.list(threadId);
    const promptIndex = data?.findIndex(
        (message: any) => message.content[0].text.value === prompt
    );
    const newMessages = data?.slice(0, promptIndex + 1);
    const prismaMessages = newMessages.map((message: any) => ({
        id: message.id,
        role: message.role as Roles,
        content: message.content[0].text.value as string,
        threadId,
    }));

    return prismaMessages;
};
