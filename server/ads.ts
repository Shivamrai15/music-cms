"use server";

import { db } from "@/lib/db";

export async function getAds () {
    try {
        
        const ads = await db.ad.findMany()
        return ads;

    } catch (error) {
        console.log("Error fetching ads:", error);
        return []
    }
}