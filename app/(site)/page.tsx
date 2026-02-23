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

        const interval = setInterval(fetchPrices, 60000)
        return () => clearInterval(interval)
    }, [])

    const heroChartData = useMemo(() => {
        if (!data || !data.history) return null;
        const currency = 'INR';
        const historyData = data.history[currency] || [];
        const sortedHistory = [...historyData].sort((a, b) => a.timestamp - b.timestamp);
        const labels = sortedHistory.map(item => {
            const d = new Date(item.timestamp * 1000);
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
        const ozToGram = 31.1034768;
        const unit = 10;
        return {
            labels,
            data: sortedHistory.map(h => (h[heroChartType] / ozToGram) * unit)
        };
    }, [data, heroChartType]);

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
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <Badge variant="secondary" className="w-fit">Live Market Data</Badge>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Precision Data for <span className="text-primary">Smart Investors</span>
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Access real-time gold and silver prices with deep historical insights. The standard for market tracking and precision analysis.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" asChild>
                                    <a href="#market-data">Monitor Live Rates</a>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/tools">Financial Tools</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-[600px]">
                            <Card className="overflow-hidden border-2 shadow-sm">
                                <div className="p-6 bg-muted/30 border-b flex justify-between items-center">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        Market Snapshot
                                    </h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => setHeroChartType('gold')} className={`px-2 py-1 text-xs font-bold rounded ${heroChartType === 'gold' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>Gold</button>
                                        <button onClick={() => setHeroChartType('silver')} className={`px-2 py-1 text-xs font-bold rounded ${heroChartType === 'silver' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>Silver</button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <Dashboard data={data} loading={loading} />
                                    <div className="h-[200px] w-full">
                                        {!loading && heroChartData ? (
                                            <ChartComponent data={heroChartData.data} labels={heroChartData.labels} type={heroChartType} range="1D" />
                                        ) : (
                                            <div className="w-full h-full bg-muted animate-pulse rounded flex items-center justify-center text-xs text-muted-foreground">Loading Chart...</div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Built for Professionals</h2>
                        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                            Our platform provides the tools you need to stay informed and make confident investment decisions.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Data Section */}
            <section id="market-data" className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="space-y-12">
                        <div className="space-y-4 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Live Rate Breakdown</h2>
                            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">Comprehensive pricing across all standard karats and purities.</p>
                        </div>
                        {!loading && data ? <RateTable data={data} /> : <div className="h-[400px] w-full bg-muted animate-pulse rounded-xl" />}
                        <Separator />
                        <div className="space-y-4 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Market Trends</h2>
                            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">Visualize movement and volatility over time.</p>
                        </div>
                        {!loading && data ? <ChartsSection history={data.history} goldPrices={data.gold} silverPrices={data.silver} /> : <div className="h-[400px] w-full bg-muted animate-pulse rounded-xl" />}
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 border-y">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Financial Suite</h2>
                            <p className="text-muted-foreground md:text-xl">Powerful, precise calculators for all your financial needs.</p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/tools">Explore All Tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/tools/emi-calculator" className="group">
                            <Card className="p-6 transition-all hover:border-primary">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Calculator className="h-6 w-6" /></div>
                                    <h3 className="font-bold group-hover:text-primary transition-colors">EMI Calculator</h3>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/tools/sip-calculator" className="group">
                            <Card className="p-6 transition-all hover:border-primary">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600"><LineChart className="h-6 w-6" /></div>
                                    <h3 className="font-bold group-hover:text-primary transition-colors">SIP Calculator</h3>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/tools/gold-loan-calculator" className="group">
                            <Card className="p-6 transition-all hover:border-primary">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Coins className="h-6 w-6" /></div>
                                    <h3 className="font-bold group-hover:text-primary transition-colors">Gold Loan</h3>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest Analysis</h2>
                            <p className="text-muted-foreground md:text-xl">Expert insights into the precious metals market.</p>
                        </div>
                        <Button variant="ghost" asChild>
                            <Link href="/blogs">View All Articles <MoveRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                    <LatestBlogs blogs={blogData} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to invest smarter?</h2>
                    <p className="max-w-[600px] mx-auto text-primary-foreground/80 md:text-xl">
                        Join thousands of investors who rely on our data for their market decisions.
                    </p>
                    <Button size="lg" variant="secondary" asChild className="rounded-full">
                        <a href="#market-data">Start Tracking Now</a>
                    </Button>
                </div>
            </section>
        </div>
    )
}
