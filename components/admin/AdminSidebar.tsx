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
    Mail
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { text: 'Blogs', icon: FileText, path: '/admin/blogs' },
    { text: 'Users', icon: Users, path: '/admin/users' },
    { text: 'Contact Forms', icon: Mail, path: '/admin/contacts' },
    { text: 'Price Config', icon: DollarSign, path: '/admin/pricing' },
    { text: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={cn("hidden h-screen w-[280px] flex-col bg-white border-r border-slate-200 px-4 py-6 md:flex shadow-sm sticky top-0", className)}>
            <div className="flex h-14 items-center px-4 mb-6">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-slate-800">
                    <span className="text-primary">GS</span>Admin
                </Link>
            </div>

            <nav className="flex-1 space-y-1.5 px-2">
                {menuItems.map((item) => {
                    const isActive = item.path === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex items-center justify-start gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("h-[20px] w-[20px]", isActive ? "text-primary fill-primary/20" : "text-slate-500")} />
                            {item.text}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 px-2 border-t border-slate-100">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:border-slate-200 transition-colors">
                        <AvatarImage src="/avatars/01.png" alt="@admin" />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-slate-800 truncate">Admin User</span>
                        <span className="text-xs text-slate-500 truncate">admin@example.com</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
