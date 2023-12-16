import db from "@/lib/db";
import { openai } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

const assisstantId = process.env.OPENAI_ASSISTANT_ID as string;

export async function POST(
    request: NextRequest,
    { params }: { params: { threadId: string } }
) {
    try {
        const { userId } = auth();
        const threadId = params.threadId;

        // Check if user is logged in
        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const message = await request.json();

        const thread = await db.thread.findUnique({
            where: {
                id: threadId,
            },
            select: {
                fileId: true,
            },
        });

        if (!thread) {
            return new NextResponse("Thread Not Found", { status: 404 });
        }

        // Create the message
        await openai.beta.threads.messages.create(threadId, {
            content: message,
            role: "user",
            file_ids: [thread.fileId],
        });

        // Create a run
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assisstantId,
        });
        let runStatus = await openai.beta.threads.runs.retrieve(
            threadId,
            run.id
        );

        // Polling mechanism to see if status is completed
        while (runStatus.status !== "completed") {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            runStatus = await openai.beta.threads.runs.retrieve(
                threadId,
                run.id
            );

            if (
                runStatus.status === "failed" ||
                runStatus.status === "cancelled"
            ) {
                throw new Error("Run status failed or cancelled");
            }
        }
        return NextResponse.json({ data: "Message sent" });
    } catch (error) {
        console.log("[SEND_MESSAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
