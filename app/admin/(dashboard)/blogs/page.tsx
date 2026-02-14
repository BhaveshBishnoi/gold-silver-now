
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    Filter,
    MoreHorizontal,
    FileText
} from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminBlogsPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: { select: { name: true, image: true } }
        }
    });

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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">All Blogs</h1>
                    <p className="text-slate-500 mt-1">Manage and publish your blog content.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm">
                    <Link href="/admin/blogs/create">
                        <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Link>
                </Button>
            </div>

            {/* Filters & Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search posts..."
                        className="pl-9 bg-white border-slate-200 focus:border-primary focus:ring-primary rounded-lg"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Content Card */}
            <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden">
                <div className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-100">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[40%] text-slate-600 font-semibold pl-6 h-12">Title</TableHead>
                                <TableHead className="text-slate-600 font-semibold h-12">Author</TableHead>
                                <TableHead className="text-slate-600 font-semibold h-12">Status</TableHead>
                                <TableHead className="text-slate-600 font-semibold h-12">Date</TableHead>
                                <TableHead className="text-slate-600 font-semibold text-right pr-6 h-12">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                        No posts found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post: any) => (
                                    <TableRow key={post.id} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors">
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 text-[15px]">{post.title}</span>
                                                <span className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-[300px]">{post.slug}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                    {post.author?.name?.[0] || 'U'}
                                                </div>
                                                <span className="text-sm text-slate-600">{post.author?.name || 'Unknown'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`rounded-md px-2.5 py-0.5 font-medium ${post.published
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                            >
                                                {post.published ? "Published" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-600">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <div className="flex justify-end gap-1">
                                                <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg">
                                                    <Link href={`/admin/blogs/${post.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg">
                                                    <Link href={`/blogs/${post.slug}`} target="_blank">
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg border border-slate-100">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild className="hover:bg-slate-50 focus:bg-slate-50 cursor-pointer">
                                                            <Link href={`/admin/blogs/${post.id}/edit`} className="flex items-center w-full">
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <form action={deletePost} className="w-full">
                                                            <input type="hidden" name="id" value={post.id} />
                                                            <DropdownMenuItem asChild className="hover:bg-red-50 focus:bg-red-50 cursor-pointer">
                                                                <button type="submit" className="w-full text-red-600 focus:text-red-600 flex items-center">
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                                </button>
                                                            </DropdownMenuItem>
                                                        </form>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
