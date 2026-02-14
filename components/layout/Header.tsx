'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"

import { Menu } from "lucide-react"


const Header = () => {
    const pathname = usePathname()
    const [sheetOpen, setSheetOpen] = useState(false)

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Blogs", path: "/blogs" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ]

    const isActive = (path: string) => pathname === path

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight flex items-center gap-1 text-slate-900 hover:opacity-90 transition-opacity"
                    >
                        <span className="text-primary">GoldSilverNow</span>.in
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-[15px] font-medium transition-all duration-200 relative py-1 ${isActive(item.path)
                                    ? "text-primary font-bold"
                                    : "text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Nav */}
                    <div className="flex md:hidden items-center gap-3">
                        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-slate-50">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] border-l-slate-200 bg-white">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <div className="flex flex-col gap-8 mt-8">
                                    <Link href="/" onClick={() => setSheetOpen(false)} className="text-2xl font-bold tracking-tight text-slate-800">
                                        <span className="text-primary">GoldSilverNow</span>.in
                                    </Link>
                                    <nav className="flex flex-col gap-2">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.path}
                                                onClick={() => setSheetOpen(false)}
                                                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(item.path)
                                                    ? "bg-primary/10 text-primary font-bold"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
