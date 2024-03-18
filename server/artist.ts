"use server";

import { db } from "@/lib/db";

export const getAllArtist = async() => {
    try {
        
        const artists = await db.artist.findMany({
            orderBy : {
                name : "asc"
            }
        });
        return artists

    } catch (error) {
        return [];
    }
}

export const getArtist  = async()=>{
    try {
        
        const data = await db.artist.findUnique({
            where : {
                id : "65f598c4abe4057a547021cc"
            },
            include : {
                songs : true
            }
        })

        return data;

    } catch (error) {
        return null;
    }
}