'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, PiggyBank, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function InflationCalculator() {
    const [amount, setAmount] = useState(100000);
    const [inflationRate, setInflationRate] = useState(6);
    const [years, setYears] = useState(10);

    const calculateInflation = () => {
        const futureValue = amount * Math.pow(1 + inflationRate / 100, years);
        const purchasingPower = amount / Math.pow(1 + inflationRate / 100, years);

        return {
            futureValue: Math.round(futureValue),
            purchasingPower: Math.round(purchasingPower),
            totalIncrease: Math.round(futureValue - amount),
        };
    };

    const results = calculateInflation();

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-orange-600 mb-4" asChild>
                        <Link href="/tools">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Tools
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <PiggyBank className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Inflation Calculator</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardContent className="space-y-8 pt-6">
                            {/* Current Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="amount">Current Amount</Label>
                                    <div className="w-40 relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                        <Input
                                            id="amount"
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="pl-8 h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={1000}
                                    max={10000000}
                                    step={1000}
                                    value={[amount]}
                                    onValueChange={(val) => setAmount(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Inflation Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="rate">Expected Inflation Rate (% p.a)</Label>
                                    <div className="w-24 relative">
                                        <Input
                                            id="rate"
                                            type="number"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={1}
                                    max={20}
                                    step={0.1}
                                    value={[inflationRate]}
                                    onValueChange={(val) => setInflationRate(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Years */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="years">Time Period (Years)</Label>
                                    <div className="w-24 relative">
                                        <Input
                                            id="years"
                                            type="number"
                                            value={years}
                                            onChange={(e) => setYears(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={1}
                                    max={50}
                                    step={1}
                                    value={[years]}
                                    onValueChange={(val) => setYears(val[0])}
                                    className="py-4"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl h-fit">
                        <CardHeader className="bg-slate-800/50 border-b border-slate-700/50">
                            <CardTitle className="text-slate-300 text-lg font-medium">Future Value</CardTitle>
                            <div className="text-4xl font-bold mt-2">
                                ₹ {results.futureValue.toLocaleString('en-IN')}
                            </div>
                            <CardDescription className="text-slate-400 mt-2">
                                Amount needed in {years} years to match today's spending power.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Buying Power Today</span>
                                    <span className="font-semibold">₹ {amount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Total Price Increase</span>
                                    <span className="font-semibold text-orange-400">₹ {results.totalIncrease.toLocaleString('en-IN')}</span>
                                </div>
                                <Separator className="bg-slate-700" />
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-slate-400">Purchasing Power<br /><span className="text-[10px]">(Adjusted to today)</span></span>
                                    <span className="font-semibold text-red-400">₹ {results.purchasingPower.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-4 text-center text-xs text-slate-400 leading-relaxed">
                                * This shows how much today's money will be worth in the future, or how much more you'll need to buy the same things.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Educational Content Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="prose prose-slate lg:prose-lg mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">What is Inflation?</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Inflation is the rate at which the general level of prices for goods and services is rising and, consequently, the purchasing power of currency is falling. Central banks attempt to limit inflation, and avoid deflation, in order to keep the economy running smoothly.
                        </p>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Why Inflation Matters to You?</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Reduced Buying Power", desc: "The same amount of money buys fewer goods and services over time." },
                                    { title: "Savings Devaluation", desc: "If your savings interest is lower than inflation, you are losing money in real terms." },
                                    { title: "Cost of Living", desc: "Basic necessities like food, fuel, and housing become more expensive every year." },
                                    { title: "Investment Planning", desc: "You must earn returns higher than inflation to grow your actual wealth." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 text-red-600 font-bold">!</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-sm text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Historical Inflation in India</h3>
                        <p className="text-slate-600 mb-6">
                            India has historically seen an average inflation rate of around 6-7%. This means that prices of goods roughly double every 10-12 years. Planning your retirement and investments without considering inflation is one of the biggest financial mistakes.
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
                            <h4 className="font-bold text-amber-900 mb-2">Rule of 72 for Inflation</h4>
                            <p className="text-sm text-amber-800">
                                To find out how many years it will take for prices to double, divide 72 by the inflation rate. At 6% inflation, prices double every 12 years (72/6 = 12).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
