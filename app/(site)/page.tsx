'use client'

import { useState, useEffect, useMemo } from "react"
import Dashboard from "@/components/Dashboard"
import RateTable from "@/components/RateTable"
import ChartsSection from "@/components/ChartsSection"
import ChartComponent from "@/components/Charts" // Added ChartComponent import
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
    Percent,
    LineChart
} from "lucide-react"
import Link from "next/link"

export default function Home() {
    const [data, setData] = useState<any>(null)
    const [blogData, setBlogData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [heroChartType, setHeroChartType] = useState<'gold' | 'silver'>('gold')

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

    // Process data for Hero Chart
    const heroChartData = useMemo(() => {
        if (!data || !data.history) return null;

        const currency = 'INR'; // Default to INR for Hero
        const historyData = data.history[currency] || [];
        const sortedHistory = [...historyData].sort((a, b) => a.timestamp - b.timestamp);

        const labels = sortedHistory.map(item => {
            const d = new Date(item.timestamp * 1000);
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });

        const ozToGram = 31.1034768;
        const unit = 10; // 10g for Hero chart normally

        return {
            labels,
            data: sortedHistory.map(h => (h[heroChartType] / ozToGram) * unit)
        };
    }, [data, heroChartType]);

    const features = [
        // ... (features logic remains same)
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
            <section className="relative pt-24 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-slate-100">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-50 to-transparent opacity-50 pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col gap-12 lg:gap-20 items-center">

                        {/* Hero Header & Taglines */}
                        <div className="max-w-4xl text-center relative px-4">
                            <div className="inline-flex items-center rounded-full border border-orange-100 bg-orange-50/70 backdrop-blur-md px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-orange-800 mb-8 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2.5 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                Market Intelligence Engine
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                                Precision Data for <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 relative inline-block">
                                    Smart Investors
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                Access real-time gold and silver prices with deep historical insights. <br className="hidden md:block" />
                                The gold standard for market tracking and precision analysis.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                                <Button
                                    size="lg"
                                    className="h-16 md:h-20 px-10 md:px-12 text-lg md:text-xl bg-slate-950 hover:bg-slate-800 text-white rounded-full transition-all shadow-xl hover:shadow-slate-950/20 hover:-translate-y-1 font-black group"
                                    asChild
                                >
                                    <a href="#market-data">
                                        Monitor Live Rates
                                        <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 md:h-20 px-10 md:px-12 text-lg md:text-xl border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:text-orange-600 hover:border-orange-200 text-slate-700 rounded-full transition-all duration-300 font-bold"
                                    asChild
                                >
                                    <Link href="/tools">
                                        Financial Tools
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Hero Graph Section */}
                        <div className="w-full relative group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                            {/* Inner Glow Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-orange-200/5 via-slate-200/5 to-blue-200/5 blur-[100px] rounded-full opacity-40 pointer-events-none transition-opacity duration-1000" />

                            <Card className="relative bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
                                <div className="grid lg:grid-cols-12 max-h-[700px]">
                                    {/* Snapshot Stats Side */}
                                    <div className="lg:col-span-4 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200/60 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-10">
                                                <Badge variant="outline" className="bg-emerald-50/80 backdrop-blur-sm text-emerald-700 border-emerald-200 px-4 py-1.5 shadow-sm rounded-full font-black text-[9px] uppercase tracking-widest">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                                    System Live
                                                </Badge>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setHeroChartType('gold')}
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all text-sm font-bold ${heroChartType === 'gold' ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                                    >
                                                        Au
                                                    </button>
                                                    <button
                                                        onClick={() => setHeroChartType('silver')}
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all text-sm font-bold ${heroChartType === 'silver' ? 'bg-slate-600 text-white shadow-lg shadow-slate-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                                    >
                                                        Ag
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <Dashboard data={data} loading={loading} />
                                            </div>
                                        </div>

                                        <div className="mt-12 pt-6 border-t border-slate-200/60 flex items-center gap-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                                            <LineChart className="w-4 h-4 text-orange-500" />
                                            <span>Real-time Volatility Tracking Active</span>
                                        </div>
                                    </div>

                                    {/* Main Large Graph */}
                                    <div className="lg:col-span-8 p-8 lg:p-12 bg-slate-50/20">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                                Performance Stream
                                                <span className="text-[10px] font-bold text-slate-400 lowercase tracking-normal bg-white/80 border border-slate-200 px-2.5 py-1 rounded-lg">live 1d</span>
                                            </h3>
                                            <div className="text-[9px] font-black uppercase tracking-tighter text-slate-400">
                                                Updated {new Date().toLocaleTimeString()}
                                            </div>
                                        </div>

                                        <div className="h-[350px] lg:h-[400px]">
                                            {!loading && heroChartData ? (
                                                <ChartComponent
                                                    data={heroChartData.data}
                                                    labels={heroChartData.labels}
                                                    type={heroChartType}
                                                    range="1D"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100/50 rounded-[2rem] animate-pulse flex items-center justify-center text-slate-300 font-bold">
                                                    Calibrating Engine...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted/Features Strip */}
            <section className="py-24 bg-white border-b border-slate-100 relative">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Reliability counts</span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built for Precision Investing</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border border-slate-100 shadow-none hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-500 bg-slate-50/30 hover:bg-white group overflow-hidden relative rounded-3xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <CardContent className="p-8 lg:p-10 flex flex-col items-center text-center">
                                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-2.5">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Financial Tools Highlights */}
            <section className="py-24 bg-slate-50/50">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div className="max-w-xl text-center md:text-left">
                            <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-3 block">Financial Suite</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Powerful Planning Tools</h2>
                            <p className="text-base text-slate-600 font-medium">Free, precise calculators to help you plan your investments and loans.</p>
                        </div>
                        <Button size="lg" className="rounded-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-8 h-12 font-bold" asChild>
                            <Link href="/tools">
                                Explore All Tools
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {quickTools.map((tool, index) => (
                            <Link key={index} href={tool.href}>
                                <Card className="border border-slate-100 bg-white hover:border-orange-200 hover:shadow-xl transition-all duration-500 rounded-[2rem] group cursor-pointer overflow-hidden p-6 lg:p-8">
                                    <div className="flex items-center gap-5 lg:gap-6">
                                        <div className={`h-14 w-14 lg:h-16 lg:w-16 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-500`}>
                                            <tool.icon className="h-7 w-7 lg:h-8 lg:w-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg lg:text-xl text-slate-900 mb-0.5 lg:mb-1">{tool.title}</h3>
                                            <p className="text-xs lg:text-sm text-slate-500 font-medium">{tool.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Data Deep Dive */}
            <section id="market-data" className="py-24 md:py-32 bg-white relative">
                <div className="absolute inset-0 bg-slate-50/30 -skew-y-3 pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-6 space-y-24 md:space-y-32 relative z-10">

                    {/* Rate Tables */}
                    <div className="space-y-10 md:space-y-12">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-4 block">Market transparency</span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">Live Rate Breakdown</h2>
                            <p className="text-base md:text-lg text-slate-600 font-medium">Comprehensive pricing across all standard karats and purities.</p>
                        </div>

                        {!loading && data ? (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                <RateTable data={data} />
                            </div>
                        ) : (
                            <div className="h-[500px] md:h-[600px] w-full bg-slate-100/50 rounded-[2.5rem] border border-slate-100 animate-pulse" />
                        )}
                    </div>

                    <Separator className="bg-slate-200/40" />

                    {/* Charts */}
                    <div className="space-y-10 md:space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
                            <div className="max-w-xl">
                                <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-3 block">Historical Trends</span>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Market Performance</h2>
                                <p className="text-base md:text-lg text-slate-600 font-medium">Visualize movement and volatility over time.</p>
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
                            <div className="h-[400px] md:h-[500px] w-full bg-slate-100/50 rounded-[2.5rem] border border-slate-100 animate-pulse" />
                        )}
                    </div>
                </div>
            </section>

            {/* Insights / Blog Section */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/20 skew-x-12 translate-x-1/4 pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
                        <div>
                            <span className="text-orange-600 font-black tracking-[0.2em] uppercase text-[10px] mb-3 block">Market Intelligence</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Latest Analysis</h2>
                        </div>
                        <Button variant="ghost" className="text-slate-600 hover:text-orange-600 font-bold group px-6 h-12" asChild>
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
            <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-orange-500/10 via-transparent to-transparent pointer-events-none" />

                <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black tracking-[0.2em] uppercase mb-8 border border-orange-500/20">
                        Join our community
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                        Ready to invest <span className="text-orange-500">smarter</span>?
                    </h2>
                    <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Access the most accurate market data platform for precious metals. Precision tracking for precision investors.
                    </p>
                    <Button
                        size="lg"
                        className="h-16 md:h-20 px-10 md:px-12 text-lg md:text-xl bg-white text-slate-950 hover:bg-slate-50 rounded-full shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all font-black"
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
