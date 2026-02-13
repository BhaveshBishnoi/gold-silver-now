
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import { auth } from '@/lib/auth';

export default async function ViewAdminPost({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }

    const { id } = await params;

    // Redirect to public view
    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    redirect(`/blogs/${post.slug}`);
}
