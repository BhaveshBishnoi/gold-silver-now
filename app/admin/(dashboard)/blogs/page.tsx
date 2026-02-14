
import { prisma } from "@/lib/prisma";
/* @ts-ignore */
import { type Post } from "@prisma/client";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function AdminBlogsPage() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
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
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">All Blogs</h1>
                <Button asChild>
                    <Link href="/admin/blogs/create">
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post: any) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.slug}</TableCell>
                                    <TableCell>
                                        <Badge variant={post.published ? "default" : "secondary"}>
                                            {post.published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <Button asChild variant="outline" size="icon">
                                            <Link href={`/admin/blogs/${post.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/blogs/${post.slug}`} target="_blank">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={deletePost}>
                                            <input type="hidden" name="id" value={post.id} />
                                            <Button type="submit" variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
