'use client'

import Link from "next/link"

export default function Footer() {
    const links = [
        { label: "Blogs", href: "/blogs" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Contact Us", href: "/contact" },
    ]


    return (
        <footer className="bg-slate-950 text-slate-200 mt-auto border-t border-slate-900">
            <div className="container max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">
                                <span className="text-primary">GS</span>Update
                            </h3>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
                            Your trusted source for real-time gold and silver updates. Track live prices and market trends in your local currency.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end justify-center">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-slate-400 hover:text-primary transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-slate-900 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <p>
                        © {new Date().getFullYear()} GSUpdate. All rights reserved.
                    </p>
                    <p className="flex gap-4">
                        <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}
