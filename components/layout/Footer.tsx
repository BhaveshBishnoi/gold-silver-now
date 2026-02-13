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
        <footer className="bg-slate-900 text-slate-100 mt-auto">

            <div className="container max-w-6xl mx-auto px-4 py-16">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Gold
                            <span className="text-amber-400">Silver</span>
                            Now
                        </h3>
                        <p className="text-sm text-slate-400">
                            Tracking precious metals since 2026.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-6 md:justify-end justify-center">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-10 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-slate-500">
                        © 2026 Gold Silver Now. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}
