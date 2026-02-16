'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Coins, Calculator, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function GoldLoanCalculator() {
    // State variables
    const [goldWeight, setGoldWeight] = useState(10);
    const [purity, setPurity] = useState(22);
    const [loanToValue, setLoanToValue] = useState(75); // Standard LTV limit
    const [goldRate, setGoldRate] = useState(6500); // Default per gram rate for 22k
    const [interestRate, setInterestRate] = useState(12);

    // Derived calculations
    const goldValue = goldWeight * goldRate;
    const maxLoanAmount = (goldValue * loanToValue) / 100;
    const monthlyInterest = (maxLoanAmount * (interestRate / 100)) / 12;

    const handleGoldRateChange = (purityVal: number) => {
        // Simple logic to adjust rate based on purity selection
        // In a real app, this would fetch live rates
        setPurity(purityVal);
        const baseRate24k = 7200; // Simulated
        const newRate = Math.round(baseRate24k * (purityVal / 24));
        setGoldRate(newRate);
    };

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
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <Coins className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Gold Loan Calculator</h1>
                    </div>
                    <p className="text-slate-600 max-w-2xl">
                        Estimate how much loan you can get against your gold jewelry. Adjust the weight, purity, and LTV ratio to see your potential loan amount.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Section */}
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardHeader>
                            <CardTitle>Loan Parameters</CardTitle>
                            <CardDescription>Enter your gold details below.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">

                            {/* Gold Purity */}
                            <div className="space-y-4">
                                <Label htmlFor="purity">Gold Purity (Karats)</Label>
                                <Select
                                    value={purity.toString()}
                                    onValueChange={(val) => handleGoldRateChange(Number(val))}
                                >
                                    <SelectTrigger id="purity" className="h-12 border-slate-200">
                                        <SelectValue placeholder="Select Purity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="24">24 Karat (99.9% Pure)</SelectItem>
                                        <SelectItem value="22">22 Karat (91.6% Jewellery)</SelectItem>
                                        <SelectItem value="20">20 Karat (83.3%)</SelectItem>
                                        <SelectItem value="18">18 Karat (75.0%)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Gold Weight */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label htmlFor="weight">Gold Weight (Grams)</Label>
                                    <span className="text-sm font-bold text-orange-600">{goldWeight}g</span>
                                </div>
                                <Slider
                                    id="weight"
                                    min={1}
                                    max={500}
                                    step={1}
                                    value={[goldWeight]}
                                    onValueChange={(val) => setGoldWeight(val[0])}
                                    className="py-4"
                                />
                                <div className="grid grid-cols-4 gap-2">
                                    {[5, 10, 20, 50].map((val) => (
                                        <Button
                                            key={val}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setGoldWeight(val)}
                                            className={goldWeight === val ? 'border-orange-200 bg-orange-50 text-orange-700' : ''}
                                        >
                                            {val}g
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Gold Rate Input (Editable) */}
                            <div className="space-y-4">
                                <Label htmlFor="rate">Current Market Rate (per gram)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-500 font-semibold">₹</span>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={goldRate}
                                        onChange={(e) => setGoldRate(Number(e.target.value))}
                                        className="pl-8 h-12 border-slate-200"
                                    />
                                </div>
                                <p className="text-xs text-slate-500">
                                    * Default rate is estimated based on selected purity. You can edit this for accuracy.
                                </p>
                            </div>

                            {/* LTV Limit */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label htmlFor="ltv">Loan to Value (LTV) Ratio</Label>
                                    <span className="text-sm font-bold text-slate-900">{loanToValue}%</span>
                                </div>
                                <Slider
                                    id="ltv"
                                    min={50}
                                    max={90}
                                    step={1}
                                    value={[loanToValue]}
                                    onValueChange={(val) => setLoanToValue(val[0])}
                                    className="py-4"
                                />
                                <p className="text-xs text-slate-500">
                                    * Most banks offer up to 75% LTV. Some NBFCs may offer higher.
                                </p>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <div className="space-y-6">
                        <Card className="bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <CardHeader className="pb-2">
                                <CardDescription className="text-slate-400">Maximum Loan Amount</CardDescription>
                                <CardTitle className="text-4xl font-bold text-white tracking-tight">
                                    ₹{maxLoanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4 relative z-10">
                                <Separator className="bg-slate-700/50" />

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Total Gold Value</span>
                                        <span className="font-semibold">₹{goldValue.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Applied LTV</span>
                                        <span className="font-semibold text-orange-400">{loanToValue}%</span>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calculator className="w-4 h-4 text-orange-400" />
                                        <span className="text-sm font-medium text-orange-100">Monthly Interest Est.</span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-2xl font-bold">₹{Math.round(monthlyInterest).toLocaleString('en-IN')}</span>
                                        <span className="text-xs text-slate-400">@ {interestRate}% p.a.</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                                    Contact Lenders
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Eligibility Requirements</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    "Age must be between 18 to 75 years",
                                    "Provide minimal KYC documents",
                                    "Gold provided as collateral",
                                    "Purity should be atleast 18 Karat"
                                ].map((req, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{req}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
