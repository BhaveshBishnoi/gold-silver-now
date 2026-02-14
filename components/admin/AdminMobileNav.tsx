'use client';

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import Link from "next/link";

export default function AdminMobileNav() {
    return (
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-50">
            <Link href="/admin" className="font-bold text-lg text-slate-800">
                <span className="text-primary">GSN</span> Admin
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-600">
                        <Menu size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-white w-[280px]">
                    <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                    <AdminSidebar className="flex w-full h-full border-none static shadow-none pt-0" />
                </SheetContent>
            </Sheet>
        </div>
    );
}
