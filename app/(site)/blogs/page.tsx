import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata = {
    title: "Blogs - Gold Silver Now",
    description:
        "Latest updates and news about Gold and Silver markets.",
}

export const dynamic = "force-dynamic"

export default async function BlogsPage() {
    let posts: any[] = []
    let error: string | null = null

    try {
        posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
        })
    } catch (e) {
        console.error("Failed to fetch posts:", e)
        error =
            "Unable to connect to the database. Please check your configuration."
    }

    return (
        <section className="py-20">
            <div className="container max-w-6xl mx-auto px-4">

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent tracking-tight">
                    Latest Market Insights
                </h1>

                {/* Error State */}
                {error && (
                    <Alert variant="destructive" className="mb-8">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Empty State */}
                {!error && posts.length === 0 && (
                    <p className="text-center text-muted-foreground text-lg">
                        No blogs available at the moment. Please check back later.
                    </p>
                )}

                {/* Blog Grid */}
                {!error && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Card
                                key={post.id}
                                className="group h-full flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="flex flex-col flex-grow"
                                >
                                    {/* Image */}
                                    {post.coverImage && (
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <CardContent className="flex flex-col flex-grow p-6">
                                        <h2 className="text-xl font-bold leading-snug mb-2">
                                            {post.title}
                                        </h2>

                                        <span className="text-xs text-muted-foreground mb-3">
                                            {new Date(post.createdAt).toLocaleDateString(
                                                undefined,
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}
                                        </span>

                                        <p className="text-sm text-muted-foreground line-clamp-3 leading-6">
                                            {post.excerpt ||
                                                (post.content
                                                    ? post.content
                                                        .replace(/<[^>]*>?/gm, "")
                                                        .substring(0, 120) + "..."
                                                    : "")}
                                        </p>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}
