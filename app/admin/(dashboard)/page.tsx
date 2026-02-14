


import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    CheckCircle,
    File,
    Plus,
    Users,
    ArrowUpRight,
    Search
} from 'lucide-react';

export const dynamic = 'force-dynamic';

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
            bg: "bg-blue-100 dark:bg-blue-900/20",
        },
        {
            title: "Published",
            value: publishedPosts,
            description: "Live on the site",
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/20",
        },
        {
            title: "Drafts",
            value: draftPosts,
            description: "Work in progress",
            icon: File,
            color: "text-amber-600",
            bg: "bg-amber-100 dark:bg-amber-900/20",
        },
    ];

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your blog content and performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/admin/blogs/create">
                            <Plus className="mr-2 h-4 w-4" /> New Post
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-full ${stat.bg}`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Posts Table */}
                <Card className="col-span-4 lg:col-span-5">
                    <CardHeader>
                        <CardTitle>Recent Posts</CardTitle>
                        <CardDescription>
                            Latest blog posts created in the system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {latestPosts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                            No posts found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    latestPosts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col">
                                                    <span>{post.title}</span>
                                                    <span className="text-xs text-muted-foreground">by {post.author?.name || 'Unknown'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-600 hover:bg-green-700" : ""}>
                                                    {post.published ? "Published" : "Draft"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right text-muted-foreground text-xs">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Quick Actions / Side Panel */}
                <Card className="col-span-4 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks and shortcuts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/admin/blogs/create">
                                <Plus className="mr-2 h-4 w-4" /> Create New Post
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/admin/users">
                                <Users className="mr-2 h-4 w-4" /> Manage Users
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/blogs" target="_blank">
                                <ArrowUpRight className="mr-2 h-4 w-4" /> View Live Site
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
