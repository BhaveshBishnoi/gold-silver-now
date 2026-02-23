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
        { name: "Tools", path: "/tools" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ]

    const isActive = (path: string) => pathname === path

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 transition-opacity hover:opacity-90"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                        G
                    </span>
                    <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
                        GoldSilverNow<span className="text-primary">.in</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`transition-colors hover:text-primary ${isActive(item.path)
                                ? "text-foreground"
                                : "text-muted-foreground"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions / Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <div className="md:hidden">
                        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="pr-0">
                                <Link
                                    href="/"
                                    className="flex items-center space-x-2"
                                    onClick={() => setSheetOpen(false)}
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                                        G
                                    </span>
                                    <span className="text-xl font-bold tracking-tight">
                                        GoldSilverNow
                                    </span>
                                </Link>
                                <nav className="flex flex-col space-y-4 mt-8">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            onClick={() => setSheetOpen(false)}
                                            className={`text-lg font-medium transition-colors hover:text-primary ${isActive(item.path)
                                                ? "text-foreground"
                                                : "text-muted-foreground"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header
