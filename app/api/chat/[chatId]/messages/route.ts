import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
    request: NextRequest,
    { params }: { params: { chatId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const chat = await db.chat.findUnique({
            where: {
                id: params?.chatId,
                userId,
            },
        });

        if (!chat) return new NextResponse("Not Found", { status: 404 });

        const messages = await db.message.findMany({
            where: {
                chatId: chat.id,
            },
            orderBy: {
                createdAt: "asc",
            },
            select: {
                role: true,
                content: true,
            },
        });

        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_API_KEY,
                "Content-Type": "application/json",
            },
        };

        const data = {
            referenceSources: true,
            sourceId: chat.fileId,
            messages: messages.slice(-10),
        };

        const response = await axios.post(
            "https://api.chatpdf.com/v1/chats/message",
            data,
            config
        );
        const message = await db.message.create({
            data: {
                content: response.data.content,
                role: "assistant",
                chatId: chat.id,
            },
        });

        return NextResponse.json({ message });
    } catch (error) {
        console.log("[SEND_MESSAGES_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { chatId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const chat = await db.chat.findUnique({
            where: {
                id: params?.chatId,
                userId,
            },
        });

        if (!chat) return new NextResponse("Not Found", { status: 404 });

        const message = await request.json();

        const newMessage = await db.message.create({
            data: {
                content: message,
                role: "user",
                chatId: chat.id,
            },
        });

        return NextResponse.json(
            { message: "success", data: newMessage },
            { status: 200 }
        );
    } catch (error) {
        console.log("[SEND_MESSAGES_POST_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { chatId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const chat = await db.chat.findUnique({
            where: {
                id: params?.chatId,
                userId,
            },
        });

        if (!chat) return new NextResponse("Not Found", { status: 404 });

        await db.message.deleteMany({
            where: {
                chatId: params?.chatId,
            },
        });

        return NextResponse.json("Deleted");
    } catch (error) {
        console.log("[CLEAR_MESSAGES_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
