'use client';

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPriceRecord } from "./actions";
import { toast } from "sonner";
import { useRef } from "react";
import { Tags, Save } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 rounded-md transition-all shadow-sm"
        >
            {pending ? (
                <span className="flex items-center gap-2">Saving...</span>
            ) : (
                <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Publish Rates
                </span>
            )}
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
        <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 h-full">
            <div className="p-5 border-b border-gray-100 bg-white">
                <h2 className="text-xl font-bold text-[#050505] flex items-center gap-2">
                    <Tags className="w-5 h-5 text-primary" />
                    Update Rates
                </h2>
                <p className="text-[#65676B] text-sm mt-1">
                    Enter new market rates below.
                </p>
            </div>

            <div className="p-5">
                <form ref={formRef} action={clientAction} className="space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="goldPrice" className="text-[#65676B] font-semibold text-sm">Gold (10g)</Label>
                            <div className="relative group">
                                <span className="absolute left-3 top-3 text-[#65676B] font-bold transition-colors group-focus-within:text-primary">₹</span>
                                <Input
                                    id="goldPrice"
                                    name="goldPrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-8 bg-[#F0F2F5] border-none focus:ring-2 focus:ring-primary/20 text-[#050505] font-bold h-12 rounded-lg transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="silverPrice" className="text-[#65676B] font-semibold text-sm">Silver (1kg)</Label>
                            <div className="relative group">
                                <span className="absolute left-3 top-3 text-[#65676B] font-bold transition-colors group-focus-within:text-primary">₹</span>
                                <Input
                                    id="silverPrice"
                                    name="silverPrice"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-8 bg-[#F0F2F5] border-none focus:ring-2 focus:ring-primary/20 text-[#050505] font-bold h-12 rounded-lg transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="inrToUsd" className="text-[#65676B] font-semibold text-sm">USD Rate</Label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-3 text-[#65676B] font-bold transition-colors group-focus-within:text-primary">$</span>
                                    <Input
                                        id="inrToUsd"
                                        name="inrToUsd"
                                        type="number"
                                        step="0.0001"
                                        placeholder="0.00"
                                        className="pl-8 bg-[#F0F2F5] border-none focus:ring-2 focus:ring-primary/20 text-[#050505] font-bold h-12 rounded-lg transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="inrToEur" className="text-[#65676B] font-semibold text-sm">EUR Rate</Label>
                                <div className="relative group">
                                    <span className="absolute left-3 top-3 text-[#65676B] font-bold transition-colors group-focus-within:text-primary">€</span>
                                    <Input
                                        id="inrToEur"
                                        name="inrToEur"
                                        type="number"
                                        step="0.0001"
                                        placeholder="0.00"
                                        className="pl-8 bg-[#F0F2F5] border-none focus:ring-2 focus:ring-primary/20 text-[#050505] font-bold h-12 rounded-lg transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
