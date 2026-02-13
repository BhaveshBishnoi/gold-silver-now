import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

interface ViewAdminPostProps {
    params: {
        id: string
    }
}

export default async function ViewAdminPost({
    params,
}: ViewAdminPostProps) {
    const session = await auth()

    if (!session) {
        redirect('/api/auth/signin')
    }

    const { id } = params

    const post = await prisma.post.findUnique({
        where: { id },
        select: {
            slug: true,
        },
    })

    if (!post) {
        notFound()
    }

    redirect(`/blogs/${post.slug}`)
}
