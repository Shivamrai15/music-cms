"use server";

import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/embeddings";
import { qdarnt } from "@/lib/qdrant";

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

export async function searchArtist (text: string){
    try {
        
        const embedding = await generateEmbeddings(text);
        const result = await qdarnt.search("artist", {
            vector : embedding,
            limit : 1
        });
        return result;
    } catch (error) {
        console.log("Search song error", error);
        return null;
    }
}