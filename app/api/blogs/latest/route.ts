
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                coverImage: true,
                createdAt: true,
            }
        });

        return NextResponse.json({ status: 'success', data: posts });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}
