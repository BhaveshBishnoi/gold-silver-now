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
    Home,
    Target,
    Wallet,
    ArrowRight
} from 'lucide-react';

export default function ToolsPage() {
    const tools = [
        {
            title: "EMI Calculator",
            description: "Calculate your monthly EMI for home, car, or personal loans with visual breakdown.",
            icon: Calculator,
            href: "/tools/emi-calculator",
            status: "Popular",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "SIP Calculator",
            description: "Plan your wealth creation journey. Calculate returns on your systematic investment plans.",
            icon: TrendingUp,
            href: "/tools/sip-calculator",
            status: "Popular",
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Gold Loan",
            description: "Estimate the loan amount you can get against your gold jewelry.",
            icon: Coins,
            href: "/tools/gold-loan-calculator",
            status: "Exclusive",
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "GST Calculator",
            description: "Quickly calculate Goods and Service Tax (GST) for different tax slabs.",
            icon: Percent,
            href: "/tools/gst-calculator",
            status: "Essential",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "FD Calculator",
            description: "Calculate maturity amount and interest earned on your Fixed Deposits.",
            icon: Landmark,
            href: "/tools/fd-calculator",
            status: "New",
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Inflation Calc",
            description: "Understand the future value of your money adjusted for inflation.",
            icon: PiggyBank,
            href: "/tools/inflation-calculator",
            status: "New",
            color: "text-rose-600",
            bg: "bg-rose-50"
        },
        {
            title: "Retirement",
            description: "Plan your retirement corpus and monthly savings needed for freedom.",
            icon: Target,
            href: "/tools/retirement-calculator",
            status: "Important",
            color: "text-cyan-600",
            bg: "bg-cyan-50"
        },
        {
            title: "Mortgage",
            description: "Calculate mortgage payments, inclusive of taxes and insurance.",
            icon: Home,
            href: "/tools/mortgage-calculator",
            status: "New",
            color: "text-slate-700",
            bg: "bg-slate-100"
        },
        {
            title: "Budget Planner",
            description: "Organize your expenses and savings with our advanced planning tool.",
            icon: Wallet,
            href: "/tools/budget-planner",
            status: "New",
            color: "text-orange-600",
            bg: "bg-orange-50"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 md:py-24">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
                        Financial Intelligence
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                        Financial <span className="text-primary">Toolbox</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Powerful, precise calculators built for the modern investor. Plan your loans, track your growth, and master your taxes.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {tools.map((tool, index) => (
                        <Link key={index} href={tool.href} className="group">
                            <Card className="h-full border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden p-8 lg:p-10 flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`h-16 w-16 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm`}>
                                        <tool.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <Badge variant="outline" className={`border-none ${tool.bg} ${tool.color} px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider`}>
                                        {tool.status}
                                    </Badge>
                                </div>
                                <div className="space-y-4 flex-grow">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-primary">
                                        {tool.title}
                                    </h2>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        {tool.description}
                                    </p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center text-sm font-black text-slate-900 uppercase tracking-tighter transition-all group-hover:text-primary">
                                    Launch Tool
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Feature highlights */}
                <div className="mt-32 grid md:grid-cols-3 gap-8 border-t border-slate-200 pt-20">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                            <Calculator className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">Scientific Precision</h3>
                        <p className="text-sm text-slate-500 font-medium">Calculations based on standard financial models and the latest tax regulations.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">Goal Focused</h3>
                        <p className="text-sm text-slate-500 font-medium">Visual breakdowns helping you see exactly how your money works over time.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                            <Coins className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">100% Free</h3>
                        <p className="text-sm text-slate-500 font-medium">No sign-up, no hidden costs. Professional tools available to everyone.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
