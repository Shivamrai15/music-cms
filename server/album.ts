"use server";

import { db } from "@/lib/db";

export const getAllAlbums = async() => {
    try {
        
        const albums = await db.album.findMany({
            orderBy : {
                name : "asc"
            }
        });
        return albums

    } catch (error) {
        return [];
    }
}