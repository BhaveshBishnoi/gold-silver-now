'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSettings } from "@/components/layout/SettingsContext"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu, X } from "lucide-react"

const Header = () => {
    const { currency, setCurrency, exchangeRates } = useSettings()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Blogs", path: "/blogs" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ]

    const isActive = (path: string) => pathname === path

    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">

            <div className="container max-w-6xl mx-auto px-4">

                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-extrabold tracking-tight flex items-center"
                    >
                        Gold
                        <span className="text-amber-600">Silver</span>
                        Now
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">

                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-sm font-medium transition-colors ${isActive(item.path)
                                    ? "text-amber-600 font-semibold"
                                    : "text-muted-foreground hover:text-amber-600"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Currency Select */}
                        <Select
                            value={currency}
                            onValueChange={(val) => setCurrency(val as any)}
                        >
                            <SelectTrigger className="w-[120px] h-9 font-semibold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(exchangeRates).map((curr) => (
                                    <SelectItem key={curr} value={curr}>
                                        {curr} (
                                        {
                                            exchangeRates[
                                                curr as keyof typeof exchangeRates
                                            ].symbol
                                        }
                                        )
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>

                    {/* Mobile Nav */}
                    <div className="flex md:hidden items-center gap-3">

                        {/* Currency Select (Mobile) */}
                        <Select
                            value={currency}
                            onValueChange={(val) => setCurrency(val as any)}
                        >
                            <SelectTrigger className="w-[90px] h-9 font-semibold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(exchangeRates).map((curr) => (
                                    <SelectItem key={curr} value={curr}>
                                        {curr}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Mobile Menu */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu size={20} />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-64">

                                <div className="flex justify-end mb-6">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setOpen(false)}
                                    >
                                        <X size={20} />
                                    </Button>
                                </div>

                                <nav className="flex flex-col gap-6">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            onClick={() => setOpen(false)}
                                            className={`text-base font-medium ${isActive(item.path)
                                                ? "text-amber-600 font-semibold"
                                                : "text-muted-foreground hover:text-amber-600"
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
