"use server";

import { db } from "@/lib/db";


export const getLabel = async() => {
    try {
        
        const labels = await db.label.findMany({
            orderBy : {
                name : "asc"
            }
        });

        return labels;

    } catch (error) {
        return [];
    }
}