import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users as UsersIcon, Shield, Mail } from 'lucide-react';
import { CreateUserDialog, EditUserDialog, DeleteUserDialog } from "./UserDialogs";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            createdAt: true,
            _count: {
                select: {
                    posts: true,
                }
            }
        }
    });

    const stats = {
        total: users.length,
        admins: users.filter((u: any) => u.role === 'admin').length,
        editors: users.filter((u: any) => u.role === 'editor').length,
    };

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#050505]">Users Management</h1>
                    <p className="text-[#65676B] text-lg mt-1">Manage user accounts and permissions</p>
                </div>
                <CreateUserDialog />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Total Users</p>
                                <p className="text-3xl font-bold text-[#050505] mt-1">{stats.total}</p>
                            </div>
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <UsersIcon className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Admins</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.admins}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Editors</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.editors}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Mail className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#f7f8fa] border-b border-gray-100">
                                    <TableHead className="font-semibold text-[#65676B]">User</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Role</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Posts</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Joined</TableHead>
                                    <TableHead className="text-right font-semibold text-[#65676B]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user: any) => (
                                    <TableRow key={user.id} className="hover:bg-[#f0f2f5] transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                    <AvatarImage src={user.image || undefined} alt={user.name || ""} />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-[#050505]">{user.name}</span>
                                                    <span className="text-sm text-[#65676B]">{user.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    user.role === 'admin'
                                                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                        : user.role === 'editor'
                                                            ? 'bg-green-100 text-green-700 border-green-200'
                                                            : 'bg-gray-100 text-gray-700 border-gray-200'
                                                }
                                            >
                                                <Shield className="h-3 w-3 mr-1" />
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-[#65676B] font-medium">
                                            {user._count.posts}
                                        </TableCell>
                                        <TableCell className="text-[#65676B] text-sm">
                                            {format(new Date(user.createdAt), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <EditUserDialog user={user} />
                                                <DeleteUserDialog userId={user.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
