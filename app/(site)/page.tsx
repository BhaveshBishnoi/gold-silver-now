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
            <section className="bg-gradient-to-br from-amber-50 to-white pt-24 pb-16 text-center">
                <div className="container max-w-5xl mx-auto px-4">

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent animate-fade-in">
                        Track Live Gold & Silver Prices
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Real-time precious metal rates in your currency. Instant conversion
                        for different purities and weights.
                    </p>

                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container max-w-6xl mx-auto px-4 space-y-16">

                    <Dashboard data={data} loading={loading} />

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
