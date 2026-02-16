'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Calculator,
    Coins,
    Percent,
    Landmark,
    TrendingUp,
    PiggyBank,
    ArrowRight
} from 'lucide-react';

export default function ToolsPage() {
    const tools = [
        {
            title: "EMI Calculator",
            description: "Calculate your monthly EMI for home, car, or personal loans with visual breakdown.",
            icon: Calculator,
            href: "/tools/emi-calculator",
            status: "New"
        },
        {
            title: "SIP Calculator",
            description: "Plan your wealth creation journey. Calculate returns on your systematic investment plans.",
            icon: TrendingUp,
            href: "/tools/sip-calculator",
            status: "Popular"
        },
        {
            title: "Gold Loan Calculator",
            description: "Estimate the loan amount you can get against your gold jewelry based on current market rates.",
            icon: Coins,
            href: "/tools/gold-loan-calculator",
            status: "Exclusive"
        },
        {
            title: "GST Calculator",
            description: "Quickly calculate Goods and Service Tax (GST) for different tax slabs.",
            icon: Percent,
            href: "/tools/gst-calculator",
            status: "Essential"
        },
        {
            title: "FD Calculator",
            description: "Calculate maturity amount and interest earned on your Fixed Deposits.",
            icon: Landmark,
            href: "/tools/fd-calculator",
            status: "Coming Soon"
        },
        {
            title: "Inflation Calculator",
            description: "Understand the future value of your money adjusted for inflation.",
            icon: PiggyBank,
            href: "/tools/inflation-calculator",
            status: "Coming Soon"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Financial Tools</h1>
                    <p className="text-lg text-slate-600">
                        Powerful calculators to help you plan your investments, loans, and taxes with precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        const isComingSoon = tool.status === "Coming Soon";

                        return (
                            <Link
                                key={index}
                                href={isComingSoon ? '#' : tool.href}
                                className={isComingSoon ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                            >
                                <Card className="h-full border-slate-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group relative overflow-hidden bg-white">
                                    <div className="absolute top-0 right-0 p-4">
                                        <Badge variant={tool.status === 'Coming Soon' ? 'secondary' : 'default'} className={
                                            tool.status === 'New' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                                tool.status === 'Popular' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' :
                                                    tool.status === 'Exclusive' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                                                        tool.status === 'Essential' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                                                            'bg-slate-100 text-slate-500 hover:bg-slate-100'
                                        }>
                                            {tool.status}
                                        </Badge>
                                    </div>

                                    <CardHeader className="pt-8">
                                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                            {tool.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-slate-500 mb-6 line-clamp-2">
                                            {tool.description}
                                        </CardDescription>

                                        {!isComingSoon && (
                                            <div className="flex items-center text-sm font-semibold text-orange-600 mt-auto">
                                                Use Calculator
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Educational Content Section - Added at Bottom */}
                <div className="mt-24 max-w-4xl mx-auto border-t border-slate-200 pt-16">
                    <div className="prose prose-slate lg:prose-lg mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Use Our Financial Calculators?</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Financial planning shouldn't be complicated. Our suite of free, easy-to-use tools helps you make informed decisions about your money, whether you're planning a loan, investing for the future, or calculating taxes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Precision</h3>
                            <p className="text-slate-500 text-sm">Accurate calculations based on the latest financial formulas and tax regimes.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Planning</h3>
                            <p className="text-slate-500 text-sm">Visualize your wealth growth and loan repayments to plan your budget better.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                                <Coins className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Free to Use</h3>
                            <p className="text-slate-500 text-sm">Unlimited access to all premium calculators without any login or subscription.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
