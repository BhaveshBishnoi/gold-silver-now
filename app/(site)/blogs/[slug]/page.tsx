import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"
import Image from "next/image"
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Tag
} from "lucide-react"
import { format } from "date-fns"

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
        select: {
            title: true,
            excerpt: true,
            metaTitle: true,
            metaDescription: true,
            keywords: true,
            coverImage: true
        },
    })

    if (!post) return

    return {
        title: post.metaTitle || `${post.title} - Gold Silver Now`,
        description: post.metaDescription || post.excerpt || undefined,
        keywords: post.keywords || undefined,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || undefined,
            images: post.coverImage ? [post.coverImage] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || undefined,
            images: post.coverImage ? [post.coverImage] : [],
        }
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
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    }
                }
            }
        })
    } catch (e) {
        console.error("Failed to fetch post:", e)
        error = "Failed to load blog post."
    }

    if (error) {
        return (
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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

    // Fetch related posts
    const relatedPosts = await prisma.post.findMany({
        where: {
            published: true,
            id: { not: post.id },
        },
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            createdAt: true,
        }
    })

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = post.content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://goldsilvernow.in/blogs/${post.slug}`

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
                <div className="container max-w-4xl mx-auto px-4">
                    {/* Back Button */}
                    <Button
                        asChild
                        variant="ghost"
                        className="mb-6 hover:bg-gray-100 -ml-4"
                    >
                        <Link href="/blogs">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blogs
                        </Link>
                    </Button>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#050505] mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-xl text-[#65676B] mb-8 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-[#65676B] mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">{readingTime} min read</span>
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={post.author.image || undefined} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {post.author.name?.[0] || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{post.author.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#65676B] flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Share:
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            asChild
                        >
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            asChild
                        >
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            asChild
                        >
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Cover Image */}
            {post.coverImage && (
                <section className="bg-white py-8">
                    <div className="container max-w-4xl mx-auto px-4">
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <article className="bg-white py-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div
                        className="
                            prose 
                            prose-xl
                            max-w-none
                            
                            /* Headings - Enhanced with better spacing and sizing */
                            prose-headings:text-[#1a1a1a]
                            prose-headings:font-extrabold
                            prose-headings:tracking-tight
                            prose-headings:scroll-mt-20
                            
                            /* H1 Styling */
                            prose-h1:text-5xl
                            prose-h1:mt-16
                            prose-h1:mb-8
                            prose-h1:leading-[1.15]
                            prose-h1:font-black
                            
                            /* H2 Styling - Major sections */
                            prose-h2:text-4xl
                            prose-h2:mt-16
                            prose-h2:mb-8
                            prose-h2:leading-[1.2]
                            prose-h2:pb-4
                            prose-h2:border-b-2
                            prose-h2:border-gray-200
                            prose-h2:font-black
                            
                            /* H3 Styling - Subsections */
                            prose-h3:text-3xl
                            prose-h3:mt-12
                            prose-h3:mb-6
                            prose-h3:leading-[1.3]
                            prose-h3:font-bold
                            
                            /* H4 Styling */
                            prose-h4:text-2xl
                            prose-h4:mt-10
                            prose-h4:mb-5
                            prose-h4:leading-[1.4]
                            prose-h4:font-bold
                            
                            /* H5 & H6 Styling */
                            prose-h5:text-xl
                            prose-h5:mt-8
                            prose-h5:mb-4
                            prose-h5:font-semibold
                            prose-h6:text-lg
                            prose-h6:mt-6
                            prose-h6:mb-3
                            prose-h6:font-semibold
                            prose-h6:text-gray-700
                            
                            /* Paragraphs - Enhanced readability */
                            prose-p:text-[#2d2d2d]
                            prose-p:text-xl
                            prose-p:leading-[1.8]
                            prose-p:mb-8
                            prose-p:font-normal
                            
                            /* First paragraph after heading - special styling */
                            prose-headings:prose-p:first-of-type:text-[1.15em]
                            prose-headings:prose-p:first-of-type:leading-[1.7]
                            
                            /* Links */
                            prose-a:text-primary
                            prose-a:no-underline
                            prose-a:font-semibold
                            prose-a:transition-all
                            prose-a:duration-200
                            hover:prose-a:underline
                            hover:prose-a:text-primary/80
                            hover:prose-a:underline-offset-4
                            
                            /* Strong and Emphasis */
                            prose-strong:text-[#1a1a1a]
                            prose-strong:font-bold
                            prose-strong:font-semibold
                            prose-em:text-[#2d2d2d]
                            prose-em:italic
                            
                            /* Lists - Better spacing and styling */
                            prose-ul:my-10
                            prose-ul:list-disc
                            prose-ul:pl-8
                            prose-ul:space-y-3
                            prose-ol:my-10
                            prose-ol:list-decimal
                            prose-ol:pl-8
                            prose-ol:space-y-3
                            prose-li:text-[#2d2d2d]
                            prose-li:text-xl
                            prose-li:leading-[1.8]
                            prose-li:my-3
                            prose-li:pl-2
                            prose-li:marker:text-primary
                            prose-li:marker:font-bold
                            
                            /* Nested Lists */
                            prose-li>prose-ul:mt-4
                            prose-li>prose-ul:mb-2
                            prose-li>prose-ol:mt-4
                            prose-li>prose-ol:mb-2
                            
                            /* Images - Enhanced presentation */
                            prose-img:rounded-2xl
                            prose-img:shadow-2xl
                            prose-img:my-12
                            prose-img:border
                            prose-img:border-gray-200
                            prose-img:w-full
                            
                            /* Blockquotes - More prominent */
                            prose-blockquote:border-l-[6px]
                            prose-blockquote:border-primary
                            prose-blockquote:bg-gradient-to-r
                            prose-blockquote:from-gray-50
                            prose-blockquote:via-gray-50/50
                            prose-blockquote:to-transparent
                            prose-blockquote:py-6
                            prose-blockquote:px-8
                            prose-blockquote:my-10
                            prose-blockquote:rounded-r-xl
                            prose-blockquote:not-italic
                            prose-blockquote:text-gray-800
                            prose-blockquote:text-xl
                            prose-blockquote:font-medium
                            prose-blockquote:leading-relaxed
                            
                            /* Code - Inline */
                            prose-code:text-primary
                            prose-code:bg-gray-100
                            prose-code:px-2.5
                            prose-code:py-1
                            prose-code:rounded-md
                            prose-code:text-[0.9em]
                            prose-code:font-mono
                            prose-code:font-semibold
                            prose-code:before:content-none
                            prose-code:after:content-none
                            
                            /* Code Blocks - Pre */
                            prose-pre:bg-gray-900
                            prose-pre:text-gray-100
                            prose-pre:rounded-2xl
                            prose-pre:p-8
                            prose-pre:my-10
                            prose-pre:overflow-x-auto
                            prose-pre:shadow-2xl
                            prose-pre:border
                            prose-pre:border-gray-700
                            prose-pre:text-base
                            prose-pre:leading-relaxed
                            
                            /* Tables - Professional styling */
                            prose-table:w-full
                            prose-table:my-10
                            prose-table:border-collapse
                            prose-table:shadow-lg
                            prose-table:rounded-xl
                            prose-table:overflow-hidden
                            prose-table:text-base
                            prose-thead:bg-gray-100
                            prose-thead:border-b-2
                            prose-thead:border-gray-300
                            prose-th:px-6
                            prose-th:py-5
                            prose-th:text-left
                            prose-th:font-bold
                            prose-th:text-[#1a1a1a]
                            prose-th:text-sm
                            prose-th:uppercase
                            prose-th:tracking-wider
                            prose-tbody:bg-white
                            prose-tr:border-b
                            prose-tr:border-gray-200
                            prose-tr:transition-colors
                            hover:prose-tr:bg-gray-50
                            prose-td:px-6
                            prose-td:py-5
                            prose-td:text-[#2d2d2d]
                            prose-td:text-base
                            
                            /* Horizontal Rule */
                            prose-hr:my-16
                            prose-hr:border-gray-300
                            prose-hr:border-t-2
                            
                            /* Figure and Figcaption */
                            prose-figure:my-12
                            prose-figcaption:text-center
                            prose-figcaption:text-base
                            prose-figcaption:text-gray-600
                            prose-figcaption:mt-4
                            prose-figcaption:italic
                            prose-figcaption:font-medium
                        "
                        dangerouslySetInnerHTML={{
                            __html: post.content,
                        }}
                    />
                </div>
            </article>

            {/* Tags Section - Moved to Bottom */}
            {post.keywords && (
                <section className="bg-gradient-to-b from-gray-50 to-white py-10 border-t border-gray-200">
                    <div className="container max-w-4xl mx-auto px-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <Tag className="h-5 w-5 text-primary" />
                                Tags:
                            </span>
                            {post.keywords.split(',').map((keyword: string, index: number) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-white border-2 border-gray-300 text-gray-800 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 px-5 py-2 text-base font-semibold shadow-sm hover:shadow-md"
                                >
                                    {keyword.trim()}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Author Card */}
            {post.author && (
                <section className="bg-gray-50 py-12">
                    <div className="container max-w-4xl mx-auto px-4">
                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-6">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={post.author.image || undefined} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                            {post.author.name?.[0] || 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#050505] mb-2">
                                            About {post.author.name}
                                        </h3>
                                        <p className="text-[#65676B] leading-relaxed">
                                            Content creator and expert in precious metals market analysis.
                                            Passionate about providing valuable insights on gold and silver investments.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="bg-white py-16">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#050505] mb-3">Related Articles</h2>
                            <p className="text-[#65676B] text-lg">Continue reading more insights</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost: any) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blogs/${relatedPost.slug}`}
                                    className="group"
                                >
                                    <Card className="h-full border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        {relatedPost.coverImage && (
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={relatedPost.coverImage}
                                                    alt={relatedPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-bold text-[#050505] mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            {relatedPost.excerpt && (
                                                <p className="text-sm text-[#65676B] mb-4 line-clamp-3">
                                                    {relatedPost.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center text-xs text-[#65676B]">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {format(new Date(relatedPost.createdAt), 'MMM d, yyyy')}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link href="/blogs">
                                    View All Articles
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
