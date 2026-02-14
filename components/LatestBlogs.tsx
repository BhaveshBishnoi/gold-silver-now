'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { format } from "date-fns"

interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string | null
    coverImage: string | null
    createdAt: string
}

interface LatestBlogsProps {
    blogs: BlogPost[]
}

const LatestBlogs = ({ blogs }: LatestBlogsProps) => {
    if (!blogs || blogs.length === 0) return null

    return (
        <section className="py-20">

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight">
                    Latest Updates
                </h2>

                <Button
                    asChild
                    variant="ghost"
                    className="font-semibold flex items-center gap-2"
                >
                    <Link href="/blogs">
                        View All
                        <ArrowRight size={18} />
                    </Link>
                </Button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Card
                        key={blog.id}
                        className="h-full flex flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        {/* Image Section */}
                        <div className="relative h-52 bg-muted">
                            {blog.coverImage ? (
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <span className="text-5xl font-bold opacity-20">
                                        GSN
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <CardContent className="flex flex-col flex-grow p-6">

                            {/* Date */}
                            <span className="text-xs font-bold text-primary mb-2 block">
                                {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                            </span>

                            {/* Title */}
                            <h3 className="text-lg font-bold leading-snug mb-2">
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="hover:underline"
                                >
                                    {blog.title}
                                </Link>
                            </h3>

                            {/* Excerpt */}
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {blog.excerpt || "Read the full article to learn more..."}
                            </p>

                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default LatestBlogs
