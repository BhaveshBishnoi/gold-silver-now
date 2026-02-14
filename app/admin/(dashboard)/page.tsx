
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
    Plus,
    Users,
    ArrowUpRight,
    LayoutDashboard,
    FileText,
    CheckCircle,
    File
} from 'lucide-react';
import { formatDistanceToNow } from "date-fns";

export const dynamic = 'force-dynamic';

interface DashboardPost {
    id: string;
    title: string;
    published: boolean;
    createdAt: Date;
    author: {
        name: string | null;
    } | null;
}

export default async function AdminDashboard() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const [totalPosts, publishedPosts, latestPosts] = await Promise.all([
        prisma.post.count(),
        prisma.post.count({ where: { published: true } }),
        prisma.post.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                published: true,
                createdAt: true,
                author: {
                    select: { name: true }
                }
            }
        })
    ]);

    const draftPosts = totalPosts - publishedPosts;

    const stats = [
        {
            title: "Total Posts",
            value: totalPosts,
            description: "All time blog posts",
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-50",
            borderColor: "border-blue-100"
        },
        {
            title: "Published",
            value: publishedPosts,
            description: "Live on the site",
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-50",
            borderColor: "border-green-100"
        },
        {
            title: "Drafts",
            value: draftPosts,
            description: "Work in progress",
            icon: File,
            color: "text-amber-600",
            bg: "bg-amber-50",
            borderColor: "border-amber-100"
        },
    ];

    return (
        <div className="container mx-auto py-8 max-w-7xl space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#050505] flex items-center gap-2">
                        <LayoutDashboard className="w-8 h-8 text-primary" />
                        Dashboard
                    </h1>
                    <p className="text-[#65676B] text-lg font-medium mt-1">
                        Welcome back, {session.user?.name || 'Admin'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/blogs/create"
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-bold shadow-sm flex items-center gap-2 transition-all"
                    >
                        <Plus className="h-5 w-5" />
                        Create Post
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[#65676B] font-semibold text-sm uppercase tracking-wide">
                                    {stat.title}
                                </h3>
                                <div className={`p-2.5 rounded-full ${stat.bg} ${stat.borderColor} border`}>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-[#050505]">{stat.value}</span>
                                <span className="text-sm text-[#65676B] font-medium">{stat.description}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {/* Recent Posts Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#050505]">Recent Posts</h2>
                        <Link href="/admin/blogs" className="text-primary hover:bg-primary/5 px-3 py-1 rounded-md text-sm font-semibold transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f7f8fa] text-[#65676B] text-xs uppercase tracking-wider font-semibold">
                                    <th className="p-4 border-b border-gray-100 w-1/2">Title</th>
                                    <th className="p-4 border-b border-gray-100">Status</th>
                                    <th className="p-4 border-b border-gray-100 text-right">Published</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {latestPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-[#65676B] font-medium">
                                            No posts found. Start writing!
                                        </td>
                                    </tr>
                                ) : (
                                    latestPosts.map((post: DashboardPost) => (
                                        <tr key={post.id} className="hover:bg-[#f0f2f5] transition-colors group">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[#050505] line-clamp-1">{post.title}</span>
                                                    <span className="text-xs text-[#65676B] group-hover:text-[#050505] transition-colors">
                                                        by {post.author?.name || 'Unknown'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${post.published
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600 color-gray-500"
                                                    }`}>
                                                    {post.published ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right text-[#65676B] text-sm font-medium">
                                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Side Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-[#050505]">Quick Actions</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <Link
                                href="/admin/blogs/create"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f2f5] transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <Plus className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="block font-semibold text-[#050505]">Write New Post</span>
                                    <span className="text-xs text-[#65676B]">Add content to your blog</span>
                                </div>
                            </Link>

                            <Link
                                href="/admin/users"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f2f5] transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="block font-semibold text-[#050505]">Manage Users</span>
                                    <span className="text-xs text-[#65676B]">View and edit user accounts</span>
                                </div>
                            </Link>

                            <a
                                href="/blogs"
                                target="_blank"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f2f5] transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                    <ArrowUpRight className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="block font-semibold text-[#050505]">View Live Site</span>
                                    <span className="text-xs text-[#65676B]">See how it looks publicly</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
