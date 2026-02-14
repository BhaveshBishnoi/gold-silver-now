
import { prisma } from "@/lib/prisma";
/* @ts-ignore */
import { type Post } from "@prisma/client";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    Edit,
    Eye,
    Trash2,
    Search,
    FileText,
    Upload,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: { select: { name: true, image: true } }
        }
    });

    const stats = {
        total: posts.length,
        published: posts.filter((p: any) => p.published).length,
        drafts: posts.filter((p: any) => !p.published).length,
    };

    async function deletePost(formData: FormData) {
        'use server'
        const id = formData.get('id') as string;
        if (id) {
            await prisma.post.delete({ where: { id } });
            revalidatePath('/admin/blogs');
        }
    }

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#050505]">Blog Management</h1>
                    <p className="text-[#65676B] text-lg mt-1">Create, edit, and publish your blog content</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline" className="border-gray-200">
                        <Link href="/admin/blogs/push">
                            <Upload className="mr-2 h-4 w-4" /> Push JSON
                        </Link>
                    </Button>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/admin/blogs/create">
                            <Plus className="mr-2 h-4 w-4" /> Create Post
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Total Posts</p>
                                <p className="text-3xl font-bold text-[#050505] mt-1">{stats.total}</p>
                            </div>
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Published</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.published}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Drafts</p>
                                <p className="text-3xl font-bold text-amber-600 mt-1">{stats.drafts}</p>
                            </div>
                            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#65676B]" />
                    <Input
                        placeholder="Search posts..."
                        className="pl-9 bg-white border-gray-200 focus:border-primary focus:ring-primary"
                    />
                </div>
            </div>

            {/* Content Card */}
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#f7f8fa] border-b border-gray-100 hover:bg-[#f7f8fa]">
                                    <TableHead className="w-[40%] text-[#65676B] font-semibold pl-6 h-12">Title</TableHead>
                                    <TableHead className="text-[#65676B] font-semibold h-12">Author</TableHead>
                                    <TableHead className="text-[#65676B] font-semibold h-12">Status</TableHead>
                                    <TableHead className="text-[#65676B] font-semibold h-12">Date</TableHead>
                                    <TableHead className="text-[#65676B] font-semibold text-right pr-6 h-12">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-[#65676B]">
                                            No posts found. Create one to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    posts.map((post: any) => (
                                        <TableRow key={post.id} className="hover:bg-[#f0f2f5] border-b border-gray-50 transition-colors">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[#050505] text-[15px]">{post.title}</span>
                                                    <span className="text-xs text-[#65676B] mt-0.5 line-clamp-1 max-w-[300px]">{post.slug}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                        {post.author?.name?.[0] || 'U'}
                                                    </div>
                                                    <span className="text-sm text-[#65676B]">{post.author?.name || 'Unknown'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={`rounded-md px-2.5 py-0.5 font-medium ${post.published
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                                        }`}
                                                >
                                                    {post.published ? "Published" : "Draft"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-[#65676B]">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <div className="flex justify-end gap-1">
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-[#65676B] hover:text-primary hover:bg-primary/10">
                                                        <Link href={`/admin/blogs/${post.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-[#65676B] hover:text-primary hover:bg-primary/10">
                                                        <Link href={`/blogs/${post.slug}`} target="_blank">
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <form action={deletePost} className="inline">
                                                        <input type="hidden" name="id" value={post.id} />
                                                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-[#65676B] hover:text-red-600 hover:bg-red-50">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
