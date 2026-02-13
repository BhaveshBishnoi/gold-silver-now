
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await req.json();
        const { title, slug, content, excerpt, coverImage, published, metaTitle, metaDescription, keywords } = body;

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                excerpt,
                coverImage,
                published,
                metaTitle,
                metaDescription,
                keywords,
            }
        });
        return NextResponse.json(post);
    } catch (error) {
        console.error("Failed to update post", error);
        return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
    }
}
