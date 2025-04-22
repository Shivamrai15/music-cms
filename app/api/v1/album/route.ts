import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/embeddings";
import { qdarnt } from "@/lib/qdrant";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


export async function POST ( req: Request ) {
    try {
        
        const { name, image, color, release } : { name : string, image : string, color : string, release : string } = await req.json();
        

        const album  = await db.album.create({
            data : {
                name : name.trim(),
                image,
                color,
                release : new Date(release)
            },
            include : {
                songs : true
            }
        });

        const vector = await generateEmbeddings(album.name.toLowerCase());
        const vectorAlbum = {
            id: uuidv4(),
            vector,
            payload: {
                id: album.id,
                name: album.name,
                songs: album.songs.map(song => song.id),
                release: album.release,
                image: album.image,
                color : album.color
            }
        };
        await qdarnt.upsert("album", { points: [vectorAlbum] });

        return NextResponse.json(album);

    } catch (error) {
        console.error("ALBUM POST API", error);
        return new NextResponse("Internal server error", { status : 500 });
    }
}