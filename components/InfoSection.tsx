'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Scale, Factory, TrendingUp } from "lucide-react"

export default function InfoSection() {
    const items = [
        {
            title: "About Gold Standards",
            desc: "Gold purity is measured in Karats (K). 24K gold is 99.9% pure and is primarily used for investment in the form of coins and bars. 22K gold (91.6% pure) is the standard for jewelry making as it is more durable.",
            icon: Scale,
            color: "#d97706",
            bg: "bg-amber-100",
        },
        {
            title: "Industrial Use of Silver",
            desc: "Unlike gold, silver has massive industrial applications including in electronics, solar panels, and medical instruments. This industrial demand makes silver prices more volatile compared to gold.",
            icon: Factory,
            color: "#64748b",
            bg: "bg-slate-100",
        },
        {
            title: "Why Track Live Prices?",
            desc: "Precious metal prices fluctuate throughout the day based on global market trading. Tracking live rates helps investors buy the dips and sell at peaks. Our platform provides real-time data.",
            icon: TrendingUp,
            color: "#1e293b",
            bg: "bg-slate-200",
        },
    ]

    return (
        <section className="py-16 bg-background">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <Card
                                key={index}
                                className="h-full flex flex-col p-6 rounded-xl bg-card shadow-sm"
                            >
                                <CardContent className="p-0 flex flex-col h-full">

                                    {/* Header */}
                                    <div className="flex items-center mb-4">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${item.bg}`}
                                            style={{ color: item.color }}
                                        >
                                            <Icon size={20} />
                                        </div>

                                        <h3 className="text-lg font-bold text-foreground">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-7">
                                        {item.desc}
                                    </p>

                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
