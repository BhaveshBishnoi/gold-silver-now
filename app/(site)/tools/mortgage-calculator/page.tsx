'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Home, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function MortgageCalculator() {
    const [price, setPrice] = useState(5000000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20); // in years
    const [propertyTax, setPropertyTax] = useState(5000); // monthly
    const [insurance, setInsurance] = useState(2000); // monthly

    const calculateMortgage = () => {
        const principal = price - downPayment;
        const r = interestRate / 100 / 12;
        const n = tenure * 12;

        const monthlyPI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalMonthly = monthlyPI + propertyTax + insurance;
        const totalPayment = totalMonthly * n;
        const totalInterest = monthlyPI * n - principal;

        return {
            loanAmount: principal,
            monthlyPI: Math.round(monthlyPI),
            totalMonthly: Math.round(totalMonthly),
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalInterest),
        };
    };

    const results = calculateMortgage();

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
                            <Home className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Mortgage Calculator</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-slate-200">
                        <CardContent className="space-y-8 pt-6">
                            {/* Property Price */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="price">Property Price</Label>
                                    <div className="w-40 relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                            className="pl-8 h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={1000000}
                                    max={100000000}
                                    step={100000}
                                    value={[price]}
                                    onValueChange={(val) => setPrice(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Down Payment */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="downPayment">Down Payment</Label>
                                    <div className="w-40 relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₹</span>
                                        <Input
                                            id="downPayment"
                                            type="number"
                                            value={downPayment}
                                            onChange={(e) => setDownPayment(Number(e.target.value))}
                                            className="pl-8 h-10 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>
                                <Slider
                                    min={0}
                                    max={price}
                                    step={100000}
                                    value={[downPayment]}
                                    onValueChange={(val) => setDownPayment(val[0])}
                                    className="py-4"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Interest Rate */}
                                <div className="space-y-4">
                                    <Label htmlFor="rate">Interest Rate (%)</Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="h-10 border-slate-200 bg-slate-50"
                                    />
                                </div>

                                {/* Tenure */}
                                <div className="space-y-4">
                                    <Label htmlFor="tenure">Tenure (Years)</Label>
                                    <Input
                                        id="tenure"
                                        type="number"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="h-10 border-slate-200 bg-slate-50"
                                    />
                                </div>

                                {/* Property Tax */}
                                <div className="space-y-4">
                                    <Label htmlFor="tax">Property Tax (Monthly)</Label>
                                    <Input
                                        id="tax"
                                        type="number"
                                        value={propertyTax}
                                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                                        className="h-10 border-slate-200 bg-slate-50"
                                    />
                                </div>

                                {/* Insurance */}
                                <div className="space-y-4">
                                    <Label htmlFor="insurance">Home Insurance (Monthly)</Label>
                                    <Input
                                        id="insurance"
                                        type="number"
                                        value={insurance}
                                        onChange={(e) => setInsurance(Number(e.target.value))}
                                        className="h-10 border-slate-200 bg-slate-50"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl h-fit">
                        <CardHeader className="bg-slate-800/50 border-b border-slate-700/50">
                            <CardTitle className="text-slate-300 text-lg font-medium">Monthly Payment</CardTitle>
                            <div className="text-4xl font-bold mt-2">
                                ₹ {results.totalMonthly.toLocaleString('en-IN')}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Principal & Interest</span>
                                    <span className="font-semibold">₹ {results.monthlyPI.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Property Tax</span>
                                    <span className="font-semibold">₹ {propertyTax.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Home Insurance</span>
                                    <span className="font-semibold">₹ {insurance.toLocaleString('en-IN')}</span>
                                </div>
                                <Separator className="bg-slate-700" />
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Loan Amount</span>
                                        <span className="font-semibold">₹ {results.loanAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Total Interest</span>
                                        <span className="font-semibold text-orange-400">₹ {results.totalInterest.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-4 text-center text-xs text-slate-400 leading-relaxed">
                                * Your actual monthly payment may vary depending on property location and credit score.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Educational Content Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="prose prose-slate lg:prose-lg mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Home Buying Guide</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            A mortgage is a loan specifically used to purchase a home. The property serves as collateral, meaning if you fail to make payments, the lender can take possession of the home. Mortgages usually have long tenures, often 15 to 30 years.
                        </p>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Tips for a Better Mortgage</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Increase Down Payment", desc: "Paying more upfront reduces your loan amount and monthly EMI significantly." },
                                    { title: "Improve Credit Score", desc: "A score above 750 can get you much lower interest rates from banks." },
                                    { title: "Compare Lenders", desc: "Interest rates and processing fees vary between public and private banks." },
                                    { title: "Check Pre-closure rules", desc: "Ensure there are no heavy penalties for paying off the loan early." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 font-bold">{i + 1}</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-sm text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Fixed vs. Floating Interest</h3>
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="p-6 bg-slate-50 rounded-xl">
                                <h4 className="font-bold text-slate-900 mb-2">Fixed Rate</h4>
                                <p className="text-sm text-slate-600">The interest rate remains the same throughout the tenure. Good for certainty and when rates are expected to rise.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl">
                                <h4 className="font-bold text-slate-900 mb-2">Floating Rate</h4>
                                <p className="text-sm text-slate-600">The rate changes based on market benchmarks (MCLR/RLLR). Usually lower than fixed rates initially.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
