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
import {
    TrendingUp,
    Shield,
    Zap,
    BarChart3,
    ArrowRight,
    Sparkles,
    Clock,
    Globe
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

        const interval = setInterval(fetchPrices, 60000)
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: Clock,
            title: "Real-Time Updates",
            description: "Live market data updated every minute for accurate pricing"
        },
        {
            icon: BarChart3,
            title: "Historical Charts",
            description: "Track price trends with interactive charts and analytics"
        },
        {
            icon: Globe,
            title: "Multi-Currency",
            description: "Instant conversion to your preferred currency"
        },
        {
            icon: Shield,
            title: "Reliable Data",
            description: "Trusted sources for accurate precious metal rates"
        }
    ]

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-32 pb-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

                <div className="container max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-none px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Live Market Data
                        </Badge>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Track Live{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                Gold
                            </span>
                            {" "}&{" "}
                            <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                                Silver
                            </span>
                            {" "}Prices
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Real-time precious metal rates with instant conversion for different purities and weights.
                            Your trusted source for accurate market data.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6"
                                asChild
                            >
                                <a href="#dashboard">
                                    View Live Rates
                                    <TrendingUp className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-slate-300 hover:border-slate-400 text-lg px-8 py-6"
                                asChild
                            >
                                <Link href="/blogs">
                                    Read Insights
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="border-slate-200 hover:shadow-lg transition-shadow duration-300 group"
                            >
                                <CardContent className="p-6">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Dashboard Section */}
            <section id="dashboard" className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="container max-w-7xl mx-auto px-4 space-y-16">
                    {/* Dashboard Card */}
                    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 p-1 border border-slate-100 overflow-hidden">
                        <Dashboard data={data} loading={loading} />
                    </div>

                    {!loading && data && (
                        <div className="space-y-20 animate-fade-in-up">
                            <RateTable data={data} />

                            <ChartsSection
                                history={data.history}
                                goldPrices={data.gold}
                                silverPrices={data.silver}
                            />

                            <LatestBlogs blogs={blogData} />
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <InfoSection />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                <div className="container max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Stay Updated with Market Trends
                    </h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                        Get the latest insights, analysis, and news about precious metals market
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white text-orange-600 hover:bg-slate-50 shadow-xl text-lg px-8 py-6"
                        asChild
                    >
                        <Link href="/blogs">
                            Explore Our Blog
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    )
}
