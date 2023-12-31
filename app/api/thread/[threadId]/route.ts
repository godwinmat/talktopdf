import db from "@/lib/db";
import { openai } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const assistantId = process.env.OPENAI_ASSISTANT_ID as string;

export async function DELETE(
    request: NextRequest,
    { params }: { params: { threadId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const thread = await db.thread.findUnique({
            where: {
                id: params?.threadId,
                userId,
            },
        });

        if (!thread) return new NextResponse("Not Found", { status: 404 });

        await openai.beta.assistants.files.del(assistantId, thread.fileId!);
        await openai.files.del(thread.fileId!);

        await openai.beta.threads.del(params.threadId);

        await db.thread.delete({
            where: {
                id: params?.threadId,
                userId,
            },
        });

        return NextResponse.json({ data: "Thread Deleted" });
    } catch (error) {
        console.log("[DELETE_MESSAGES_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { threadId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const thread = await db.thread.findUnique({
            where: {
                id: params?.threadId,
                userId,
            },
        });

        if (!thread) return new NextResponse("Not Found", { status: 404 });

        const file = await openai.files.content(thread.fileId!);

        console.log(file.formData);

        return NextResponse.json({ data: "Hiiii" });
    } catch (error) {
        console.log("[GET_FILE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
