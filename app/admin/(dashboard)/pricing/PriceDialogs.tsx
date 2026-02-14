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
import { Edit, Trash2 } from "lucide-react";
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
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Price Record</DialogTitle>
                        <DialogDescription>
                            Update the gold and silver prices for this record.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-goldPrice">Gold Price (10g) ₹</Label>
                            <Input
                                id="edit-goldPrice"
                                name="goldPrice"
                                type="number"
                                step="0.01"
                                defaultValue={record.goldPrice}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-silverPrice">Silver Price (1kg) ₹</Label>
                            <Input
                                id="edit-silverPrice"
                                name="silverPrice"
                                type="number"
                                step="0.01"
                                defaultValue={record.silverPrice}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Price Record</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this price record? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
