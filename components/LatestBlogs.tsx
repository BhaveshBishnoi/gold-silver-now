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
        <section className="py-20 relative z-10">
            <div className="container max-w-6xl mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                            Market Analysis & Insights
                        </h2>
                        <p className="text-slate-500">
                            Stay ahead with expert news and gold rate updates.
                        </p>
                    </div>

                    <Button
                        asChild
                        variant="link"
                        className="text-primary font-bold hover:text-primary/80 p-0 h-auto gap-1"
                    >
                        <Link href="/blogs">
                            View All Articles <ArrowRight size={16} />
                        </Link>
                    </Button>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Card
                            key={blog.id}
                            className="group h-full flex flex-col overflow-hidden rounded-2xl border-none shadow-sm bg-white hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Section */}
                            <div className="relative h-56 bg-slate-100 overflow-hidden">
                                {blog.coverImage ? (
                                    <img
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                        <span className="text-4xl font-black opacity-20 tracking-tighter">
                                            GSUpdate
                                        </span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                    {format(new Date(blog.createdAt), "MMM d, yyyy")}
                                </div>
                            </div>

                            {/* Content */}
                            <CardContent className="flex flex-col flex-grow p-6">
                                <h3 className="text-xl font-bold leading-tight mb-3 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                    <Link href={`/blogs/${blog.slug}`} className="focus:outline-none">
                                        {blog.title}
                                    </Link>
                                </h3>

                                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4">
                                    {blog.excerpt || "Read the full article to learn more about this topic..."}
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-sm font-semibold text-primary">
                                    Read Article <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LatestBlogs
