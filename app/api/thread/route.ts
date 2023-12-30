import db from "@/lib/db";
import { openai } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { AddAllCurrentMessagesToDB } from "../__utils";

const firstPrompt = "Give me a short overview of the file";
const assistantId = process.env.OPENAI_ASSISTANT_ID as string;

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();

        // Check if user is logged in
        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const data = await request.formData();
        const file: File | null = data.get("file") as File;

        if (!file) {
            return new NextResponse("PDF does not exist", { status: 404 });
        }

        // Upload PDF file
        const uploadedFile = await openai.files.create({
            file,
            purpose: "assistants",
        });

        // Link file to assistant
        await openai.beta.assistants.files.create(assistantId, {
            file_id: uploadedFile.id,
        });

        const filename = uploadedFile.filename;

        // Create thread and run
        const { thread_id, id } = await openai.beta.threads.createAndRun({
            assistant_id: process.env.OPENAI_ASSISTANT_ID as string,
            thread: {
                messages: [
                    {
                        role: "user",
                        content: firstPrompt,
                        file_ids: [uploadedFile.id],
                    },
                ],
            },
        });

        let runStatus = await openai.beta.threads.runs.retrieve(thread_id, id);

        // Polling mechanism to see if status is completed
        while (runStatus.status !== "completed") {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            runStatus = await openai.beta.threads.runs.retrieve(thread_id, id);

            if (
                runStatus.status === "failed" ||
                runStatus.status === "cancelled"
            ) {
                throw new Error("Run status failed or cancelled");
            }
        }

        const thread = await db.thread.create({
            data: {
                id: thread_id,
                fileId: uploadedFile.id,
                userId,
                fileName: filename,
            },
        });

        await AddAllCurrentMessagesToDB(thread.id, firstPrompt);

        return NextResponse.json({
            thread,
        });
    } catch (error) {
        console.log("[UPLOAD_PDF_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
