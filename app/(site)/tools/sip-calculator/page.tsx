'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import {
    Calculator,
    TrendingUp,
    ArrowLeft,
    Info,
    PieChart as PieChartIcon,
    DollarSign,
    Calendar,
    LineChart as LineChartIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
} from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
)

export default function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
    const [expectedReturnRate, setExpectedReturnRate] = useState(12)
    const [timePeriod, setTimePeriod] = useState(10)

    const calculations = useMemo(() => {
        const P = monthlyInvestment
        const i = expectedReturnRate / 12 / 100
        const n = timePeriod * 12

        // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
        const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
        const investedAmount = P * n
        const estimatedReturns = totalValue - investedAmount

        return {
            totalValue: Math.round(totalValue),
            investedAmount: Math.round(investedAmount),
            estimatedReturns: Math.round(estimatedReturns)
        }
    }, [monthlyInvestment, expectedReturnRate, timePeriod])

    const pieData = {
        labels: ['Invested Amount', 'Est. Returns'],
        datasets: [
            {
                data: [calculations.investedAmount, calculations.estimatedReturns],
                backgroundColor: ['#e2e8f0', '#f97316'],
                hoverBackgroundColor: ['#cbd5e1', '#ea580c'],
                borderWidth: 0,
            },
        ],
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 md:py-20">
            <div className="container max-w-5xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/tools" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Tools
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                            SIP <span className="text-primary">Calculator</span>
                        </h1>
                        <p className="text-muted-foreground mt-2">Plan your future wealth with our Systematic Investment Plan calculator.</p>
                    </div>
                    <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Input Section */}
                    <Card className="lg:col-span-7 border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="border-b bg-slate-50/50">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" />
                                Investment Parameters
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-10">

                            {/* Monthly Investment */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Monthly Investment</Label>
                                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                        <span className="text-slate-400 pl-2">₹</span>
                                        <Input
                                            type="number"
                                            value={monthlyInvestment}
                                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                            className="w-24 border-none bg-transparent focus-visible:ring-0 h-8 font-black text-right pr-2"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    max={1000000}
                                    min={500}
                                    step={500}
                                    value={[monthlyInvestment]}
                                    onValueChange={(val) => setMonthlyInvestment(val[0])}
                                    className="py-4"
                                />
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>₹500</span>
                                    <span>₹10L</span>
                                </div>
                            </div>

                            {/* Expected Return Rate */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Expected Return Rate (p.a)</Label>
                                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                        <Input
                                            type="number"
                                            value={expectedReturnRate}
                                            onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                                            className="w-16 border-none bg-transparent focus-visible:ring-0 h-8 font-black text-right pr-1"
                                        />
                                        <span className="text-slate-400 pr-2">%</span>
                                    </div>
                                </div>
                                <Slider
                                    max={30}
                                    min={1}
                                    step={0.5}
                                    value={[expectedReturnRate]}
                                    onValueChange={(val) => setExpectedReturnRate(val[0])}
                                    className="py-4"
                                />
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>1%</span>
                                    <span>30%</span>
                                </div>
                            </div>

                            {/* Time Period */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Time Period (Years)</Label>
                                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                        <Input
                                            type="number"
                                            value={timePeriod}
                                            onChange={(e) => setTimePeriod(Number(e.target.value))}
                                            className="w-16 border-none bg-transparent focus-visible:ring-0 h-8 font-black text-right pr-1"
                                        />
                                        <span className="text-slate-400 pr-2">Yr</span>
                                    </div>
                                </div>
                                <Slider
                                    max={40}
                                    min={1}
                                    step={1}
                                    value={[timePeriod]}
                                    onValueChange={(val) => setTimePeriod(val[0])}
                                    className="py-4"
                                />
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                    <span>1 Yr</span>
                                    <span>40 Yr</span>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                            <CardHeader className="border-b bg-slate-50/50">
                                <CardTitle className="text-lg font-bold">Calculation Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 flex flex-col items-center">

                                {/* Values Display */}
                                <div className="w-full space-y-6 mb-10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 font-medium">Invested Amount</span>
                                        <span className="font-bold text-slate-900">{formatCurrency(calculations.investedAmount)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500 font-medium">Est. Returns</span>
                                        <span className="font-bold text-orange-600">{formatCurrency(calculations.estimatedReturns)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <span className="text-base text-slate-900 font-black">Total Value</span>
                                        <span className="text-xl font-black text-primary">{formatCurrency(calculations.totalValue)}</span>
                                    </div>
                                </div>

                                {/* Pie Chart */}
                                <div className="w-48 h-48 relative">
                                    <Pie
                                        data={pieData}
                                        options={{
                                            plugins: {
                                                legend: { display: false }
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-white rounded-full p-2 shadow-sm">
                                            <TrendingUp className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        {/* Info Card */}
                        <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Info className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-lg">Power of Compounding</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                            The longer you stay invested, the more your wealth grows due to compound interest. Over long periods, even small monthly amounts can create significant wealth.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                {/* Educational Content */}
                <div className="mt-20 space-y-12">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-6 underline decoration-primary decoration-4 underline-offset-8">Understanding SIP</h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-600 font-medium mb-6">
                                A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you contribute a fixed amount at regular intervals (usually monthly).
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl flex items-center gap-2">
                                        <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">01</div>
                                        Disciplined Saving
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        SIP enforces a regular savings habit, ensuring you stay committed to your financial goals regardless of market conditions.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl flex items-center gap-2">
                                        <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">02</div>
                                        Rupee Cost Averaging
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        By investing fixed amounts regularly, you buy more units when prices are low and fewer when prices are high, averaging out the cost over time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Separator() {
    return <div className="h-px w-full bg-slate-100" />
}
