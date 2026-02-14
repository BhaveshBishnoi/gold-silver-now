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
    SheetTitle,
} from "@/components/ui/sheet"

import { Menu, X } from "lucide-react"


const Header = () => {
    const { currency, setCurrency, exchangeRates } = useSettings()
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

                        <div className="h-6 w-px bg-slate-200 mx-2" />

                        {/* Currency Select */}
                        <Select
                            value={currency}
                            onValueChange={(val: any) => setCurrency(val)}
                        >
                            <SelectTrigger className="w-[110px] h-9 font-medium bg-slate-50 border-slate-200 focus:ring-primary focus:border-primary shadow-sm hover:bg-slate-100 transition-colors">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border text-slate-700 border-slate-100 shadow-xl z-[60]">
                                {Object.keys(exchangeRates).map((curr) => (
                                    <SelectItem key={curr} value={curr} className="cursor-pointer focus:bg-slate-50 focus:text-primary">
                                        <span className="font-bold">{curr}</span> <span className="text-slate-400 text-xs ml-1">({exchangeRates[curr as keyof typeof exchangeRates].symbol})</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </nav>

                    {/* Mobile Nav */}
                    <div className="flex md:hidden items-center gap-3">
                        <Select
                            value={currency}
                            onValueChange={(val: any) => setCurrency(val)}
                        >
                            <SelectTrigger className="w-[85px] h-9 text-xs font-bold bg-slate-50 border-slate-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-slate-100 shadow-xl z-[60]">
                                {Object.keys(exchangeRates).map((curr) => (
                                    <SelectItem key={curr} value={curr}>
                                        {curr}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

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
