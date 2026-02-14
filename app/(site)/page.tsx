'use client'

import { useState, useEffect } from "react"
import Dashboard from "@/components/Dashboard"
import RateTable from "@/components/RateTable"
import ChartsSection from "@/components/ChartsSection"
import InfoSection from "@/components/InfoSection"
import LatestBlogs from "@/components/LatestBlogs"

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

    return (
        <main>


            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-50 via-white to-slate-50 pt-24 pb-20 text-center border-b border-orange-100/50">
                <div className="container max-w-4xl mx-auto px-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-primary text-xs font-bold tracking-wide uppercase mb-6 shadow-sm border border-orange-200">
                        Live Market Data
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
                        Track Live <span className="text-primary">Gold</span> & <span className="text-slate-600">Silver</span> Prices
                    </h1>

                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Real-time precious metal rates in your currency. Instant conversion
                        for different purities and weights with our advanced tools.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="-mt-12 relative z-10 pb-20">
                <div className="container max-w-6xl mx-auto px-4 space-y-12">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-1 border border-slate-100">
                        <Dashboard data={data} loading={loading} />
                    </div>

                    {!loading && data && (
                        <div className="space-y-16 animate-fade-in-up">
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

        </main>
    )
}
