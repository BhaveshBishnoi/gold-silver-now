'use client'

import { useState, useEffect } from "react"
import Dashboard from "@/components/Dashboard"
import RateTable from "@/components/RateTable"
import ChartsSection from "@/components/ChartsSection"
import InfoSection from "@/components/InfoSection"
import LatestBlogs from "@/components/LatestBlogs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    TrendingUp,
    ShieldCheck,
    Zap,
    BarChart4,
    ArrowRight,
    Globe2,
    CheckCircle2,
    MoveRight,
    Calculator,
    Coins,
    Percent
} from "lucide-react"
import Link from "next/link"

export default function Home() {
    const [data, setData] = useState<any>(null)
    const [blogData, setBlogData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchPrices = async () => {
        try {
            const res = await fetch("/api/prices")
            const result = await res.json()

            if (result.status === "success") {
                setData(result.data)
            }
        } catch (error) {
            console.error("Failed to fetch prices", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs/latest")
            const result = await res.json()

            if (result.status === "success") {
                setBlogData(result.data)
            }
        } catch (error) {
            console.error("Failed to fetch blogs", error)
        }
    }

    useEffect(() => {
        fetchPrices()
        fetchBlogs()

        // Refresh prices every minute
        const interval = setInterval(fetchPrices, 60000)
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: Zap,
            title: "Live Updates",
            description: "Real-time market data refreshed every minute."
        },
        {
            icon: BarChart4,
            title: "Advanced Analytics",
            description: "Historical charts and trend analysis tools."
        },
        {
            icon: Globe2,
            title: "Global Standards",
            description: "International market rates converted instantly."
        },
        {
            icon: ShieldCheck,
            title: "Verified Data",
            description: "Trusted sources ensuring 100% accuracy."
        }
    ]

    const quickTools = [
        {
            title: "EMI Calculator",
            description: "Plan your loans with precision.",
            icon: Calculator,
            href: "/tools/emi-calculator",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Gold Loan",
            description: "Estimate loan against your gold.",
            icon: Coins,
            href: "/tools/gold-loan-calculator",
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "GST Calc",
            description: "Instant tax calculations.",
            icon: Percent,
            href: "/tools/gst-calculator",
            color: "text-green-600",
            bg: "bg-green-50"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-50 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-orange-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                <div className="container max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Hero Content */}
                        <div className="max-w-2xl relative">
                            <div className="inline-flex items-center rounded-full border border-orange-100 bg-orange-50/50 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-orange-800 mb-8 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></span>
                                Live Market System Active
                            </div>

                            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.95]">
                                The Gold Standard for <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 relative">
                                    Market Data
                                    <svg className="absolute w-full h-4 -bottom-2 left-0 text-orange-200/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-lg font-medium opacity-90">
                                Access real-time gold and silver prices, historical trends, and premium market insights. Precision data for smart investors.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 mb-14">
                                <Button
                                    size="lg"
                                    className="h-16 px-10 text-lg bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 ring-offset-2 focus:ring-2 focus:ring-slate-900"
                                    asChild
                                >
                                    <a href="#market-data">
                                        View Live Rates
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 px-10 text-lg border-slate-200 bg-white hover:bg-slate-50 hover:text-orange-600 hover:border-orange-200 text-slate-700 rounded-full transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/blogs">
                                        Market Insights
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-10 text-sm font-bold text-slate-400 border-t border-slate-100 pt-10 w-max">
                                <div className="flex items-center gap-3">
                                    <div className="p-1 bgColor-green-50 rounded-full text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>Instant Updates</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-1 bgColor-green-50 rounded-full text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>24/7 Monitoring</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Dashboard / Floating Cards */}
                        <div className="relative lg:pl-10 group">
                            {/* Glow Effect behind dashboard */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-tr from-orange-200/20 via-slate-200/20 to-blue-200/20 blur-3xl rounded-full opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-700" />

                            <div className="relative bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-8 lg:p-10 ">
                                <div className="mb-10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Live Snapshot</h3>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1.5 opacity-70">Global Exchange Rates</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-50/80 backdrop-blur-sm text-emerald-700 border-emerald-200 px-4 py-1.5 shadow-sm rounded-full font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 animate-pulse"></span>
                                        Connected
                                    </Badge>
                                </div>
                                <Dashboard data={data} loading={loading} />
                                <div className="mt-8 pt-6 border-t border-slate-200/60 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Prices exclude GST</span>
                                    <span>Refreshed: {new Date().toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted/Features Strip */}
            <section className="py-24 bg-white border-b border-slate-100 relative">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-xs mb-4 block">Reliability counts</span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built for Precision Investing</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border border-slate-100 shadow-none hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 bg-slate-50/30 hover:bg-white group overflow-hidden relative rounded-3xl">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <CardContent className="p-10 flex flex-col items-center text-center">
                                    <div className="h-16 w-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Financial Tools Highlights */}
            <section className="py-24 bg-slate-50/50">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                        <div className="max-w-xl text-center md:text-left">
                            <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-xs mb-3 block">Financial Suite</span>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Powerful Planning Tools</h2>
                            <p className="text-lg text-slate-600 font-medium">Free, precise calculators to help you plan your investments and loans.</p>
                        </div>
                        <Button size="lg" className="rounded-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-8 h-14 font-bold" asChild>
                            <Link href="/tools">
                                Explore All Tools
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {quickTools.map((tool, index) => (
                            <Link key={index} href={tool.href}>
                                <Card className="border border-slate-100 bg-white hover:border-orange-200 hover:shadow-xl transition-all duration-500 rounded-[2rem] group cursor-pointer overflow-hidden p-8">
                                    <div className="flex items-center gap-6">
                                        <div className={`h-16 w-16 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-500`}>
                                            <tool.icon className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-slate-900 mb-1">{tool.title}</h3>
                                            <p className="text-sm text-slate-500 font-medium">{tool.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Data Deep Dive */}
            <section id="market-data" className="py-32 bg-white relative">
                <div className="absolute inset-0 bg-slate-50/30 -skew-y-3 pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-4 space-y-32 relative z-10">

                    {/* Rate Tables */}
                    <div className="space-y-12">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Market transparency</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Live Rate Breakdown</h2>
                            <p className="text-lg text-slate-600 font-medium">Comprehensive pricing across all standard karats and purities.</p>
                        </div>

                        {!loading && data ? (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                <RateTable data={data} />
                            </div>
                        ) : (
                            <div className="h-[600px] w-full bg-slate-100/50 rounded-[2.5rem] border border-slate-100 animate-pulse" />
                        )}
                    </div>

                    <Separator className="bg-slate-200/40" />

                    {/* Charts */}
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
                            <div>
                                <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-3 block">Historical Trends</span>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Market Performance</h2>
                                <p className="text-lg text-slate-600 font-medium">Visualize movement and volatility over time.</p>
                            </div>
                        </div>

                        {!loading && data ? (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                <ChartsSection
                                    history={data.history}
                                    goldPrices={data.gold}
                                    silverPrices={data.silver}
                                />
                            </div>
                        ) : (
                            <div className="h-[500px] w-full bg-slate-100/50 rounded-[2.5rem] border border-slate-100 animate-pulse" />
                        )}
                    </div>
                </div>
            </section>

            {/* Insights / Blog Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/20 skew-x-12 translate-x-1/4 pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-3 block">Market Intelligence</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Latest Analysis</h2>
                        </div>
                        <Button variant="ghost" className="text-slate-600 hover:text-orange-600 font-bold group px-6" asChild>
                            <Link href="/blogs">
                                View Articles
                                <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </Button>
                    </div>

                    <LatestBlogs blogs={blogData} />
                </div>
            </section>

            {/* Info Section - kept distinct */}
            <InfoSection />

            {/* Final CTA */}
            <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-orange-500/10 via-transparent to-transparent pointer-events-none" />

                <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-xs font-black tracking-widest uppercase mb-8 border border-orange-500/20">
                        Join our community
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                        Ready to invest <span className="text-orange-500">smarter</span>?
                    </h2>
                    <p className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
                        Access the most accurate market data platform for precious metals. Precision tracking for precision investors.
                    </p>
                    <Button
                        size="lg"
                        className="h-20 px-12 text-xl bg-white text-slate-950 hover:bg-slate-100 rounded-full shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all font-black"
                        asChild
                    >
                        <a href="#market-data">
                            Start Tracking Now
                        </a>
                    </Button>
                </div>
            </section>
        </div>
    )
}
