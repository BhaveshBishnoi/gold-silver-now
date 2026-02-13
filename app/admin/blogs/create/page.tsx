
import BlogForm from '@/components/admin/BlogForm';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function CreateBlogPage() {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <BlogForm />
    );
}
