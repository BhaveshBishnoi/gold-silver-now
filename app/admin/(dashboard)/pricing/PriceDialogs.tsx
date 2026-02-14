'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePriceRecord, deletePriceRecord } from "./priceActions";
import { Edit, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface PriceRecord {
    id: string;
    goldPrice: number;
    silverPrice: number;
    createdAt: Date;
}

export function EditPriceDialog({ record }: { record: PriceRecord }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            await updatePriceRecord(record.id, formData);
            toast.success("Price record updated successfully");
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to update price record");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white border-gray-200 shadow-xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="border-b border-gray-100 pb-4">
                        <DialogTitle className="text-xl font-bold text-[#050505]">Edit Price Record</DialogTitle>
                        <DialogDescription className="text-[#65676B]">
                            Update the gold and silver prices for this record.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-goldPrice" className="text-sm font-semibold text-[#050505]">Gold Price (10g) ₹</Label>
                            <Input
                                id="edit-goldPrice"
                                name="goldPrice"
                                type="number"
                                step="0.01"
                                defaultValue={record.goldPrice}
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-silverPrice" className="text-sm font-semibold text-[#050505]">Silver Price (1kg) ₹</Label>
                            <Input
                                id="edit-silverPrice"
                                name="silverPrice"
                                type="number"
                                step="0.01"
                                defaultValue={record.silverPrice}
                                required
                                className="bg-[#f7f8fa] border-gray-200 focus:border-primary focus:ring-primary"
                            />
                        </div>
                    </div>
                    <DialogFooter className="border-t border-gray-100 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-gray-200">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                            {loading ? "Updating..." : "Update Price"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function DeletePriceDialog({ recordId }: { recordId: string }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            await deletePriceRecord(recordId);
            toast.success("Price record deleted successfully");
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to delete price record");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] bg-white border-gray-200 shadow-xl">
                <DialogHeader className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-[#050505]">Delete Price Record</DialogTitle>
                            <DialogDescription className="text-[#65676B] mt-1">
                                This action cannot be undone
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="py-6">
                    <p className="text-[#050505] leading-relaxed">
                        Are you sure you want to delete this price record? This will permanently remove it from the system.
                    </p>
                </div>
                <DialogFooter className="border-t border-gray-100 pt-4">
                    <Button variant="outline" onClick={() => setOpen(false)} className="border-gray-200">
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? "Deleting..." : "Delete Record"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
