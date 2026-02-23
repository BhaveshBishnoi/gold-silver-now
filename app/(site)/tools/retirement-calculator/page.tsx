'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpense, setMonthlyExpense] = useState(50000);
    const [inflation, setInflation] = useState(6);
    const [returns, setReturns] = useState(12);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);

    const calculateRetirement = () => {
        const yearsToRetire = retirementAge - currentAge;
        const retirementYears = lifeExpectancy - retirementAge;

        // Future monthly expense at retirement age
        const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
        const futureAnnualExpense = futureMonthlyExpense * 12;

        // Core Corpus Needed (Simplified SWP model)
        // Rate after inflation (Real rate of return)
        const realRate = ((1 + returns / 100) / (1 + inflation / 100)) - 1;
        const corpusNeeded = futureAnnualExpense * ((1 - Math.pow(1 + realRate, -retirementYears)) / realRate);

        // Monthly savings needed (assuming starting from zero)
        const r = returns / 100 / 12;
        const n = yearsToRetire * 12;
        const monthlySavings = corpusNeeded * (r / (Math.pow(1 + r, n) - 1));

        return {
            futureMonthlyExpense: Math.round(futureMonthlyExpense),
            corpusNeeded: Math.round(corpusNeeded),
            monthlySavings: Math.round(monthlySavings),
            yearsToRetire
        };
    };

    const results = calculateRetirement();

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
                            <Target className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Retirement Calculator</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardContent className="space-y-8 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label htmlFor="currentAge">Current Age</Label>
                                    <Input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                                    <Slider min={18} max={60} step={1} value={[currentAge]} onValueChange={(val) => setCurrentAge(val[0])} />
                                </div>
                                <div className="space-y-4">
                                    <Label htmlFor="retirementAge">Retirement Age</Label>
                                    <Input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
                                    <Slider min={currentAge + 1} max={75} step={1} value={[retirementAge]} onValueChange={(val) => setRetirementAge(val[0])} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="expense">Current Monthly Expenses</Label>
                                    <div className="w-40 relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                        <Input id="expense" type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value))} className="pl-8" />
                                    </div>
                                </div>
                                <Slider min={10000} max={500000} step={5000} value={[monthlyExpense]} onValueChange={(val) => setMonthlyExpense(val[0])} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label htmlFor="inflation">Expected Inflation (%)</Label>
                                    <Input id="inflation" type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
                                </div>
                                <div className="space-y-4">
                                    <Label htmlFor="returns">Expected Returns (%)</Label>
                                    <Input id="returns" type="number" value={returns} onChange={(e) => setReturns(Number(e.target.value))} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl h-fit">
                        <CardHeader className="bg-slate-800/50 border-b border-slate-700/50">
                            <CardTitle className="text-slate-300 text-lg font-medium">Corpus Needed</CardTitle>
                            <div className="text-4xl font-bold mt-2">
                                ₹ {(results.corpusNeeded / 10000000).toFixed(2)} Cr
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Monthly Expense at retirement</span>
                                    <span className="font-semibold">₹ {results.futureMonthlyExpense.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-orange-400 font-bold border-t border-slate-800 pt-4">
                                    <span>Investment Needed / Month</span>
                                    <span>₹ {results.monthlySavings.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-4 text-center text-xs text-slate-400">
                                This assumes you start with ₹0 savings today and invest for {results.yearsToRetire} years.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-20 max-w-4xl mx-auto prose prose-slate">
                    <h2>Retirement Planning Strategy</h2>
                    <p>Financial freedom is not about being rich; it's about having enough passive income to cover your living expenses without having to work.</p>

                    <div className="grid md:grid-cols-2 gap-6 my-10">
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold mb-2">Power of Compounding</h4>
                            <p className="text-sm">Starting 5 years early can reduce your required monthly investment by almost 40%.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold mb-2">Inflation - The Silent Killer</h4>
                            <p className="text-sm">At 6% inflation, ₹50,000 today will be equivalent to over ₹2.8 Lakhs after 30 years.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
