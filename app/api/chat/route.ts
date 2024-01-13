import db from "@/lib/db";
import axios from "axios";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = auth();

        // Check if user is logged in
        if (!userId) return new NextResponse("Unauthorised", { status: 401 });

        const chats = await db.chat.findMany({
            where: {
                userId,
            },
        });

        if (chats.length > 0) {
            await db.chat.deleteMany({
                where: {
                    userId,
                },
            });
        }
        await clerkClient.users.deleteUser(userId);

        return NextResponse.json({ message: "Success" });
    } catch (error) {
        console.log("[DELETE_ACCOUNT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

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

        const options = {
            headers: {
                "x-api-key": process.env.CHATPDF_API_KEY,
            },
        };

        const response = await axios.post(
            "https://api.chatpdf.com/v1/sources/add-file",
            data,
            options
        );

        const sourceId = response.data.sourceId;

        if (sourceId) {
            const chat = await db.chat.create({
                data: {
                    fileId: sourceId,
                    userId,
                    fileName: file.name,
                },
            });
            return NextResponse.json({
                chat,
            });
        }
    } catch (error) {
        console.log("[UPLOAD_CHAT_PDF_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
