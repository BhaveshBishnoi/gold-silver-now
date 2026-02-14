import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
    title: "About Us - Gold Silver Now",
    description:
        "Learn about our mission to provide real-time precious metal tracking, accurate conversions, and multi-currency support.",
}

export default function AboutPage() {
    return (
        <section className="py-20">
            <div className="container max-w-6xl mx-auto px-4">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                        About Gold Silver Now
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Empowering investors, traders, jewelers, and enthusiasts with
                        accurate real-time precious metal pricing and conversion tools.
                    </p>
                </div>

                {/* Mission + Why Choose Us */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

                    {/* Mission Card */}
                    <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[320px]">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,#d97706_0%,transparent_50%)]" />

                        <div className="relative p-8 flex flex-col justify-center h-full">
                            <h2 className="text-2xl font-bold mb-4">
                                Our Mission
                            </h2>
                            <p className="leading-8 text-white/90">
                                At Gold Silver Now, we believe access to transparent financial
                                information should be simple and universal. Whether you're
                                tracking gold for jewelry purchases or monitoring silver for
                                industrial demand, our mission is to deliver precise and
                                up-to-date data in your preferred currency and weight unit.
                            </p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <Card className="rounded-3xl border shadow-sm">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-semibold text-primary mb-6">
                                Why Choose Us?
                            </h3>

                            <ul className="space-y-6">
                                <li>
                                    <h4 className="font-semibold mb-1">
                                        Real-Time Market Updates
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Our pricing engine reflects live global commodity market
                                        movements with minimal latency.
                                    </p>
                                </li>

                                <li>
                                    <h4 className="font-semibold mb-1">
                                        Multi-Currency Support
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Switch between USD, INR, EUR, and more to see localized
                                        pricing instantly.
                                    </p>
                                </li>

                                <li>
                                    <h4 className="font-semibold mb-1">
                                        Accurate Purity Conversions
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Instant calculation for 24K, 22K, 21K, 18K gold and
                                        sterling silver in grams or kilograms.
                                    </p>
                                </li>

                                <li>
                                    <h4 className="font-semibold mb-1">
                                        Investor-Friendly Interface
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Clean dashboards, simplified tables, and fast load times
                                        built for serious decision-making.
                                    </p>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Vision Section */}
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <Badge variant="secondary" className="mb-4">
                        Our Vision
                    </Badge>
                    <h2 className="text-3xl font-bold mb-6">
                        Building Transparency in Precious Metal Markets
                    </h2>
                    <p className="text-muted-foreground leading-8">
                        We envision a future where every investor — from small retail buyers
                        to institutional participants — has seamless access to accurate,
                        real-time precious metal information without complexity or hidden
                        markups.
                    </p>
                </div>

                {/* Data Transparency Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <Card className="rounded-2xl border shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-3">
                                Global Market Data
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Our system aggregates international commodity exchange data
                                to ensure consistent and accurate base pricing.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-3">
                                Real-Time Exchange Rates
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Currency conversions are powered by updated forex feeds,
                                ensuring fair and precise localization.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-3">
                                Transparent Calculations
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                All purity and weight adjustments are clearly defined,
                                mathematically consistent, and instantly computed.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="text-center py-16 bg-muted/40 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Join a growing global community that relies on Gold Silver Now
                        for daily market insights and accurate precious metal tracking.
                    </p>
                </div>

            </div>
        </section>
    )
}
