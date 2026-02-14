'use client';

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { addPriceRecord } from "./actions";
import { toast } from "sonner";
import { useRef } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Saving..." : "Save Prices"}
        </Button>
    );
}

export default function PriceInputForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function clientAction(formData: FormData) {
        try {
            await addPriceRecord(formData);
            toast.success("Prices updated successfully!");
            formRef.current?.reset();
        } catch (error) {
            toast.error("Failed to update prices.");
        }
    }

    return (
        <Card className="border-none shadow-sm bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    <span className="w-2 h-6 bg-primary rounded-full"></span>
                    Update Market Rates
                </CardTitle>
                <CardDescription>
                    Enter the current market rates. These will be timestamped automatically.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form ref={formRef} action={clientAction} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="goldPrice" className="text-slate-600 font-semibold">Gold Price (INR / 10g)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                                <Input
                                    id="goldPrice"
                                    name="goldPrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 72000"
                                    className="pl-8 font-medium focus-visible:ring-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="silverPrice" className="text-slate-600 font-semibold">Silver Price (INR / 1kg)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                                <Input
                                    id="silverPrice"
                                    name="silverPrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 85000"
                                    className="pl-8 font-medium focus-visible:ring-primary"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                            <Label htmlFor="inrToUsd" className="text-slate-600 font-semibold">INR to USD Rate</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                                <Input
                                    id="inrToUsd"
                                    name="inrToUsd"
                                    type="number"
                                    step="0.0001"
                                    placeholder="e.g. 0.012"
                                    className="pl-8 font-medium focus-visible:ring-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="inrToEur" className="text-slate-600 font-semibold">INR to EUR Rate</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">€</span>
                                <Input
                                    id="inrToEur"
                                    name="inrToEur"
                                    type="number"
                                    step="0.0001"
                                    placeholder="e.g. 0.011"
                                    className="pl-8 font-medium focus-visible:ring-primary"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
