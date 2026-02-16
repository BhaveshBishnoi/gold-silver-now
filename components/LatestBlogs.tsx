'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
                <Link
                    href={`/blogs/${blog.slug}`}
                    key={blog.id}
                    className="group block h-full focus:outline-none"
                >
                    <Card
                        className="h-full flex flex-col overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Image Section */}
                        <div className="relative h-56 bg-slate-100 overflow-hidden">
                            {blog.coverImage ? (
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                            <h3 className="text-xl font-bold leading-tight mb-3 text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4 flex-grow">
                                {blog.excerpt || "Read the full article to learn more about this topic..."}
                            </p>

                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm font-bold text-orange-600 group-hover:text-orange-700">
                                Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default LatestBlogs
