import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Metadata } from "next"
import Image from "next/image"

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata | undefined> {
    const { slug } = await params

    const post = await prisma.post.findUnique({
        where: { slug },
        select: { title: true, excerpt: true },
    })

    if (!post) return

    return {
        title: `${post.title} - Gold Silver Now`,
        description: post.excerpt ?? undefined,
    }
}

export const dynamic = "force-dynamic"

export default async function BlogPostPage({
    params,
}: PageProps) {
    const { slug } = await params

    let post: any = null
    let error: string | null = null

    try {
        post = await prisma.post.findUnique({
            where: { slug },
        })
    } catch (e) {
        console.error("Failed to fetch post:", e)
        error = "Failed to load blog post."
    }

    if (error) {
        return (
            <section className="py-20">
                <div className="container max-w-3xl mx-auto px-4">
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>

                    <Button asChild>
                        <Link href="/blogs">Back to Blogs</Link>
                    </Button>
                </div>
            </section>
        )
    }

    if (!post || !post.published) {
        notFound()
    }

    return (
        <article className="py-20">
            <div className="container max-w-3xl mx-auto px-4">

                {/* Back Button */}
                <Button
                    asChild
                    variant="ghost"
                    className="mb-8"
                >
                    <Link href="/blogs">← Back to Blogs</Link>
                </Button>

                {/* Title */}
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                    {post.title}
                </h1>

                {/* Date */}
                <p className="text-muted-foreground mb-8">
                    Published on{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="
            prose 
            prose-lg 
            dark:prose-invert 
            max-w-none
            prose-headings:font-bold
            prose-h2:mt-10
            prose-h3:mt-6
            prose-a:text-primary
            prose-img:rounded-xl
          "
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                />

            </div>
        </article>
    )
}
