import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(
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

        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_API_KEY,
                "Content-Type": "application/json",
            },
        };

        const data = {
            sources: [chat.fileId],
        };

        await axios.post(
            "https://api.chatpdf.com/v1/sources/delete",
            data,
            config
        );

        await db.chat.delete({
            where: {
                id: params?.chatId,
                userId,
            },
        });

        return NextResponse.json({ data: "Chat Deleted" });
    } catch (error) {
        console.log("[DELETE_MESSAGES_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
