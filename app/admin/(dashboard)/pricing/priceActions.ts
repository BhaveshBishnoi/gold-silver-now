'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePriceRecord(id: string, formData: FormData) {
    const goldPrice = parseFloat(formData.get("goldPrice") as string);
    const silverPrice = parseFloat(formData.get("silverPrice") as string);

    if (isNaN(goldPrice) || isNaN(silverPrice)) {
        throw new Error("Invalid input values");
    }

    await prisma.priceRecord.update({
        where: { id },
        data: {
            goldPrice,
            silverPrice,
        },
    });

    revalidatePath("/admin/pricing");
}

export async function deletePriceRecord(id: string) {
    await prisma.priceRecord.delete({
        where: { id },
    });

    revalidatePath("/admin/pricing");
}
