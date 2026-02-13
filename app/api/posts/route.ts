
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, slug, content, excerpt, coverImage, published, metaTitle, metaDescription, keywords } = body;

        let slugValue = slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        if (!slugValue) slugValue = `post-${Date.now()}`;

        // Check for duplicate slug
        const existing = await prisma.post.findUnique({
            where: { slug: slugValue }
        });

        if (existing) {
            return NextResponse.json({ message: "Slug already exists" }, { status: 400 });
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug: slugValue,
                content,
                excerpt,
                coverImage,
                published,
                metaTitle,
                metaDescription,
                keywords,
                // author: { connect: { email: session.user?.email! } } 
                // Omitting author connection for now if user doesn't exist in DB to avoid FK constraint error on first try without seed
            }
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Failed to create post", error);
        return NextResponse.json({ message: "Failed to create post. " + error }, { status: 500 });
    }
}
