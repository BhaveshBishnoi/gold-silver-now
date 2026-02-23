'use client'

import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                                G
                            </span>
                            <span className="text-lg font-bold tracking-tight">
                                GoldSilverNow<span className="text-primary">.in</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            A premier platform for real-time precious metals tracking, financial tools, and market analysis. Stay ahead with precision data.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col space-y-4 text-sm font-medium">
                        <span className="font-bold">Calculators</span>
                        <Link href="/tools/emi-calculator" className="text-muted-foreground hover:text-primary transition-colors">EMI Calculator</Link>
                        <Link href="/tools/sip-calculator" className="text-muted-foreground hover:text-primary transition-colors">SIP Calculator</Link>
                        <Link href="/tools/gold-loan-calculator" className="text-muted-foreground hover:text-primary transition-colors">Gold Loan</Link>
                        <Link href="/tools/gst-calculator" className="text-muted-foreground hover:text-primary transition-colors">GST Tax</Link>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col space-y-4 text-sm font-medium">
                        <span className="font-bold">Resources</span>
                        <Link href="/blogs" className="text-muted-foreground hover:text-primary transition-colors">Market Blog</Link>
                        <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">All Tools</Link>
                        <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Mission</Link>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col space-y-4 text-sm font-medium">
                        <span className="font-bold">Legal</span>
                        <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link>
                        <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} GoldSilverNow. All rights reserved.</p>
                    <div className="flex items-center space-x-4">
                        <Link href="/privacy-policy" className="hover:text-primary">Privacy</Link>
                        <Link href="/disclaimer" className="hover:text-primary">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
