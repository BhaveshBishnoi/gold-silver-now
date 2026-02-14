'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Scale, Factory, TrendingUp } from "lucide-react"

const InfoSection = () => {
    const items = [
        {
            title: "About Gold Standards",
            desc: "Gold purity is measured in Karats (K). 24K gold is 99.9% pure and is primarily used for investment in coins and bars. 22K gold (91.6% pure) is the global standard for jewelry making, offering the perfect balance of purity and durability.",
            icon: Scale,
            color: "#d36700",
            bg: "bg-orange-50",
            border: "border-orange-100"
        },
        {
            title: "Industrial & Investment",
            desc: "Silver has massive industrial applications including electronics, solar panels, and medical instruments. This dual demand makes silver prices more volatile but offers a unique investment opportunity distinct from gold.",
            icon: Factory,
            color: "#475569",
            bg: "bg-slate-50",
            border: "border-slate-100"
        },
        {
            title: "Smart Tracking",
            desc: "Precious metal prices fluctuate throughout the day based on global trading. Our platform provides real-time data, helping you identify the best moments to buy the dips and sell at peaks with confidence.",
            icon: TrendingUp,
            color: "#0f172a",
            bg: "bg-slate-100",
            border: "border-slate-200"
        },
    ]

    return (
        <section className="py-20 bg-slate-50/50">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Why Track With Us?</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Accurate data, industrial insights, and investment grade standards at your fingertips.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <Card
                                key={index}
                                className={`h-full flex flex-col p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border ${item.border}`}
                            >
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="mb-6">
                                        <div
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} mb-6`}
                                            style={{ color: item.color }}
                                        >
                                            <Icon size={28} strokeWidth={1.5} />
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default InfoSection;