'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPriceRecord(formData: FormData) {
    const goldPrice = parseFloat(formData.get("goldPrice") as string);
    const silverPrice = parseFloat(formData.get("silverPrice") as string);
    const inrToUsd = parseFloat(formData.get("inrToUsd") as string);
    const inrToEur = parseFloat(formData.get("inrToEur") as string);

    if (isNaN(goldPrice) || isNaN(silverPrice) || isNaN(inrToUsd) || isNaN(inrToEur)) {
        throw new Error("Invalid input values");
    }

    await prisma.priceRecord.create({
        data: {
            goldPrice,
            silverPrice,
            inrToUsd,
            inrToEur,
        },
    });

    revalidatePath("/admin/pricing");
}
