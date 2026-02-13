

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, File } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await auth();
    if (!session) return <div className="p-8 text-center text-muted-foreground">Access Denied</div>;

    const totalPosts = await prisma.post.count();
    const publishedPosts = await prisma.post.count({ where: { published: true } });
    const draftPosts = totalPosts - publishedPosts;

    const stats = [
        {
            title: "Total Posts",
            value: totalPosts,
            color: "bg-blue-600",
            icon: FileText
        },
        {
            title: "Published",
            value: publishedPosts,
            color: "bg-green-600",
            icon: CheckCircle
        },
        {
            title: "Drafts",
            value: draftPosts,
            color: "bg-amber-600",
            icon: File
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className={`${stat.color} text-white border-none shadow-lg h-[140px]`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-white/80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
