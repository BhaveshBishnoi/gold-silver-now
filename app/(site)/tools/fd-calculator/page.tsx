'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function FDCalculator() {
    const [investment, setInvestment] = useState(100000);
    const [interestRate, setInterestRate] = useState(7);
    const [tenure, setTenure] = useState(5); // in years
    const [compounding, setCompounding] = useState('quarterly');

    const calculateFD = () => {
        const p = investment;
        const r = interestRate / 100;
        const t = tenure;
        let n = 4; // default quarterly

        if (compounding === 'monthly') n = 12;
        else if (compounding === 'quarterly') n = 4;
        else if (compounding === 'half-yearly') n = 2;
        else if (compounding === 'yearly') n = 1;

        const maturityAmount = p * Math.pow(1 + r / n, n * t);
        const totalInterest = maturityAmount - p;

        return {
            maturityAmount: Math.round(maturityAmount),
            totalInterest: Math.round(totalInterest),
        };
    };

    const results = calculateFD();

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
                            <Landmark className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Fixed Deposit (FD) Calculator</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardContent className="space-y-8 pt-6">
                            {/* Investment Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="investment">Total Investment</Label>
                                    <div className="w-40 relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                        <Input
                                            id="investment"
                                            type="number"
                                            value={investment}
                                            onChange={(e) => setInvestment(Number(e.target.value))}
                                            className="pl-8 h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={5000}
                                    max={10000000}
                                    step={5000}
                                    value={[investment]}
                                    onValueChange={(val) => setInvestment(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="rate">Rate of Interest (% p.a)</Label>
                                    <div className="w-24 relative">
                                        <Input
                                            id="rate"
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={1}
                                    max={15}
                                    step={0.1}
                                    value={[interestRate]}
                                    onValueChange={(val) => setInterestRate(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Tenure */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="tenure">Tenure (Years)</Label>
                                    <div className="w-24 relative">
                                        <Input
                                            id="tenure"
                                            type="number"
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                            className="h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={1}
                                    max={25}
                                    step={1}
                                    value={[tenure]}
                                    onValueChange={(val) => setTenure(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Compounding Frequency */}
                            <div className="space-y-4">
                                <Label htmlFor="compounding">Compounding Frequency</Label>
                                <Select value={compounding} onValueChange={setCompounding}>
                                    <SelectTrigger className="w-full h-10 border-slate-200 bg-slate-50">
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                        <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl h-fit">
                        <CardHeader className="bg-slate-800/50 border-b border-slate-700/50">
                            <CardTitle className="text-slate-300 text-lg font-medium">Maturity Value</CardTitle>
                            <div className="text-4xl font-bold mt-2">
                                ₹ {results.maturityAmount.toLocaleString('en-IN')}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Invested Amount</span>
                                    <span className="font-semibold">₹ {investment.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Total Interest</span>
                                    <span className="font-semibold text-orange-400">₹ {results.totalInterest.toLocaleString('en-IN')}</span>
                                </div>
                                <Separator className="bg-slate-700" />
                                <div className="flex justify-between text-base font-bold">
                                    <span>Total Value</span>
                                    <span>₹ {results.maturityAmount.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-4 text-center text-xs text-slate-400 leading-relaxed">
                                * Fixed Deposit returns are subject to TDS as per Income Tax rules.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Educational Content Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="prose prose-slate lg:prose-lg mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">What is a Fixed Deposit?</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            A Fixed Deposit (FD) is a financial instrument provided by banks or NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date. It may or may not require the creation of a separate account.
                        </p>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Benefits of Investing in FD</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Guaranteed Returns", desc: "Unlike market-linked investments, FDs offer a fixed, pre-determined interest rate." },
                                    { title: "Flexible Tenure", desc: "Choose a tenure ranging from 7 days to 10 years based on your needs." },
                                    { title: "High Liquidity", desc: "Most banks allow premature withdrawal with a small penalty." },
                                    { title: "Loan Against FD", desc: "Get a loan or overdraft facility up to 90-95% of your FD value." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600 font-bold">✓</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-sm text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Types of Fixed Deposits</h3>
                        <div className="space-y-6 mb-12">
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-2">Standard Fixed Deposits</h4>
                                <p className="text-sm text-slate-600">The most common type where you deposit money for a fixed period at a fixed interest rate.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-2">Tax-Saving FDs</h4>
                                <p className="text-sm text-slate-600">These have a lock-in period of 5 years and offer tax deductions under Section 80C.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-2">Senior Citizen FDs</h4>
                                <p className="text-sm text-slate-600">Special FDs for people above 60, offering higher interest rates (usually 0.50% extra).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
