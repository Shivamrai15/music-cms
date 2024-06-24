import { db } from "@/lib/db";
import { AlbumSchema } from "@/schema/album.schema";
import { NextResponse } from "next/server";

export async function POST ( req: Request ) {
    try {
        
        const { name, image, color, release } : { name : string, image : string, color : string, release : string } = await req.json();
        

        const album  = await db.album.create({
            data : {
                name : name.trim(),
                image,
                color,
                release : new Date(release)
            }
        });

        return NextResponse.json(album);

    } catch (error) {
        console.error("ALBUM POST API", error);
        return new NextResponse("Internal server error", { status : 500 });
    }
}