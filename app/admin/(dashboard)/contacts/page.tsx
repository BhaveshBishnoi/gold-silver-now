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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, User, MessageSquare } from 'lucide-react';
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const contacts = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    const stats = {
        total: contacts.length,
        new: contacts.filter((c: any) => c.status === 'new').length,
        read: contacts.filter((c: any) => c.status === 'read').length,
        replied: contacts.filter((c: any) => c.status === 'replied').length,
    };

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#050505] mb-2">Contact Form Submissions</h1>
                <p className="text-[#65676B] text-lg">Manage and respond to user inquiries</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Total</p>
                                <p className="text-3xl font-bold text-[#050505] mt-1">{stats.total}</p>
                            </div>
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">New</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.new}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Read</p>
                                <p className="text-3xl font-bold text-amber-600 mt-1">{stats.read}</p>
                            </div>
                            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#65676B]">Replied</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.replied}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#f7f8fa] border-b border-gray-100">
                                    <TableHead className="font-semibold text-[#65676B]">Name</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Email</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Subject</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Message</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Status</TableHead>
                                    <TableHead className="font-semibold text-[#65676B]">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-[#65676B]">
                                            No contact submissions yet
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    contacts.map((contact: any) => (
                                        <TableRow key={contact.id} className="hover:bg-[#f0f2f5] transition-colors">
                                            <TableCell className="font-medium text-[#050505]">
                                                {contact.name}
                                            </TableCell>
                                            <TableCell className="text-[#65676B]">
                                                {contact.email}
                                            </TableCell>
                                            <TableCell className="text-[#050505]">
                                                {contact.subject || '-'}
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <p className="truncate text-[#65676B]">
                                                    {contact.message}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        contact.status === 'new' ? 'default' :
                                                            contact.status === 'read' ? 'secondary' :
                                                                contact.status === 'replied' ? 'outline' : 'secondary'
                                                    }
                                                    className={
                                                        contact.status === 'new' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                                                            contact.status === 'read' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                                                                contact.status === 'replied' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                                                    'bg-gray-100 text-gray-700'
                                                    }
                                                >
                                                    {contact.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-[#65676B] text-sm">
                                                {format(new Date(contact.createdAt), "MMM d, yyyy")}
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
