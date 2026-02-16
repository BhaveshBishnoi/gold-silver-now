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
        <main className="min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/50 via-slate-50/20 to-transparent pointer-events-none" />
                
                <div className="container max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        
                        {/* Hero Content */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600 mb-8 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                Live Market System Active
                            </div>
                            
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                                The Gold Standard for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Market Data</span>
                            </h1>
                            
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                                Access real-time gold and silver prices, historical trends, and premium market insights. Precision data for smart investors.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
                                    className="h-14 px-8 text-base border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full"
                                    asChild
                                >
                                    <Link href="/blogs">
                                        Market Insights
                                    </Link>
                                </Button>
                            </div>

                            <div className="mt-12 flex items-center gap-6 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-orange-600" />
                                    <span>Instant Updates</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-orange-600" />
                                    <span>24/7 Monitoring</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-orange-600" />
                                    <span>Global Coverage</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Dashboard / Floating Cards */}
                        <div className="relative lg:pl-10">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-100 to-slate-100 rounded-2xl blur-2xl opacity-50" />
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-2xl p-6 lg:p-8">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Live Snapshot</h3>
                                    <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                                        Usually responds in &lt;100ms
                                    </Badge>
                                </div>
                                <Dashboard data={data} loading={loading} />
                                <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
                                    Prices exclude GST and other local taxes.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted/Features Strip */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-4 hover:bg-slate-50 rounded-xl transition-colors duration-300">
                                <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                                <p className="text-sm text-slate-500">{feature.description}</p>
                            </div>
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
        </main>
    )
}
