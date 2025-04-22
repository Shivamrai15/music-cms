import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/embeddings";
import { qdarnt } from "@/lib/qdrant";
import { SongSchema } from "@/schema/song.schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST ( req: Request ) {
    try {

        const body = await req.json();
        const validatedData = SongSchema.safeParse(body);

        if (!validatedData.success) {
            return new NextResponse("Invalid Fields", {status : 401});
        }

        const { artistIds, name, ...songData } = validatedData.data;

        const song = await db.song.create({
            data : {
                ...songData,
                name : name.trim(),
                artists : {
                    connect : artistIds.map(id => ({ id }))
                }
            }
        });

        const vector = await generateEmbeddings(song.name.toLowerCase());
        const vectorSong = {
            id: uuidv4(),
            vector,
            payload: { 
                id: song.id,
                name: song.name,
                artists: song.artistIds,
                album: song.albumId
            }
        };
        await qdarnt.upsert("song", { points: [vectorSong] });

        return NextResponse.json(song);

    } catch (error) {
        console.error("ARTIST POST API", error);
        return new NextResponse("Intrenal sever error", {status : 500});
    }
}