'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    DollarSign,
    LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { text: 'Blogs', icon: FileText, path: '/admin/blogs' },
    { text: 'Users', icon: Users, path: '/admin/users' },
    { text: 'Price Config', icon: DollarSign, path: '/admin/pricing' },
    { text: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={cn("hidden h-screen w-64 flex-col border-r bg-card px-4 py-6 md:flex", className)}>
            <div className="flex h-14 items-center justify-center border-b px-2 mb-4">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">GS</span>Admin
                </Link>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                    const isActive = item.path === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                            {item.text}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@admin" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate">Admin User</span>
                        <span className="text-xs text-muted-foreground truncate">admin@example.com</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
