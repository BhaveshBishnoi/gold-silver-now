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
    MoveRight
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

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                <div className="container max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                        {/* Hero Content */}
                        <div className="max-w-2xl relative">
                            <div className="inline-flex items-center rounded-full border border-orange-100 bg-orange-50/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-orange-800 mb-8 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></span>
                                Live Market System Active
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                                The Gold Standard for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 relative">
                                    Market Data
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
                                Access real-time gold and silver prices, historical trends, and premium market insights. Precision data for smart investors.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
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
                                    className="h-14 px-8 text-base border-slate-200 hover:bg-white hover:text-orange-600 hover:border-orange-200 text-slate-700 rounded-full transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/blogs">
                                        Market Insights
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 text-sm font-medium text-slate-500 border-t border-slate-100 pt-8 w-max">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1 bg-green-100 rounded-full text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>Instant Updates</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1 bg-green-100 rounded-full text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span>24/7 Monitoring</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Dashboard / Floating Cards */}
                        <div className="relative lg:pl-10">
                            {/* Glow Effect behind dashboard */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-200/30 via-slate-200/30 to-blue-200/30 blur-3xl rounded-full opacity-60 pointer-events-none" />

                            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6 lg:p-8 ">
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Live Snapshot</h3>
                                        <p className="text-xs text-slate-500 font-medium mt-1">Real-time across all exchanges</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                        Connected
                                    </Badge>
                                </div>
                                <Dashboard data={data} loading={loading} />
                                <div className="mt-6 pt-4 border-t border-slate-200/60 text-center flex justify-between items-center text-xs font-medium text-slate-400">
                                    <span>Prices exclude GST and local taxes</span>
                                    <span>Updated: {new Date().toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted/Features Strip */}
            <section className="py-20 bg-white border-b border-slate-100 relative">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-orange-600 font-semibold tracking-wider uppercase text-xs mb-3 block">Why Choose Us</span>
                        <h2 className="text-3xl font-bold text-slate-900">Built for Precision Investing</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-none shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-slate-50/50 hover:bg-white group overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                <CardContent className="p-8 flex flex-col items-center text-center">
                                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Data Deep Dive */}
            <section id="market-data" className="py-24 bg-slate-50/50">
                <div className="container max-w-7xl mx-auto px-4 space-y-20">

                    {/* Rate Tables */}
                    <div className="space-y-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Rate Tables</h2>
                            <p className="text-lg text-slate-600">Detailed price breakdown across different purities and karats.</p>
                        </div>

                        {!loading && data ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <RateTable data={data} />
                            </div>
                        ) : (
                            <div className="h-96 w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-pulse" />
                        )}
                    </div>

                    <Separator className="bg-slate-200/60" />

                    {/* Charts */}
                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Market Trends</h2>
                                <p className="text-slate-600">Visualize price movements over time.</p>
                            </div>
                        </div>

                        {!loading && data ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                                <ChartsSection
                                    history={data.history}
                                    goldPrices={data.gold}
                                    silverPrices={data.silver}
                                />
                            </div>
                        ) : (
                            <div className="h-96 w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-pulse" />
                        )}
                    </div>
                </div>
            </section>

            {/* Insights / Blog Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/30 skew-x-12 pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">Market Intelligence</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Latest Updates & Analysis</h2>
                        </div>
                        <Button variant="ghost" className="text-slate-600 hover:text-orange-600 group" asChild>
                            <Link href="/blogs">
                                View All Articles
                                <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>

                    <LatestBlogs blogs={blogData} />
                </div>
            </section>

            {/* Info Section - kept distinct */}
            <InfoSection />

            {/* Final CTA */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-orange-500/10 to-transparent pointer-events-none" />

                <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Ready to make <span className="text-orange-500">smarter</span> decisions?
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of investors who trust Gold Silver Now for their daily market data.
                    </p>
                    <Button
                        size="lg"
                        className="h-16 px-10 text-lg bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-2xl hover:shadow-white/10 transition-all font-bold"
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
