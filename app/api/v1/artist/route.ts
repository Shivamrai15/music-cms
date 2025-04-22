import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/embeddings";
import { qdarnt } from "@/lib/qdrant";
import { ArtistSchema } from "@/schema/artist.schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST ( req : Request ) {
    try {
        
        const body = await req.json();
        
        const validatedData = ArtistSchema.safeParse(body);

        if (!validatedData.success) {
            return new NextResponse("Fields are required", {status : 400});
        }

        const { name, ...data} = validatedData.data

        const artist = await db.artist.create({
            data : {
                name : name.trim(),
                ...data
            }
        });

        const vector = await generateEmbeddings(artist.name.toLowerCase());
        const vectorArtist = {
            id: uuidv4(),
            vector,
            payload: {
                id: artist.id,
                name: artist.name,
                songs: artist.songIds,
                image: artist.image
            }
        };
        await qdarnt.upsert("artist", { points: [vectorArtist] });

        return NextResponse.json({success : true});

    } catch (error) {
        console.error("ARTIST POST API", error);
        return new NextResponse("Intrenal sever error", {status : 500});
    }
}