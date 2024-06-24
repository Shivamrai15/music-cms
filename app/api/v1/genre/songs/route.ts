import { db } from "@/lib/db";
import { GenreSongSchema } from "@/schema/genre-song.schema";
import { NextResponse } from "next/server";

export async function POST ( req : Request ) {
    try {
        
        const body = await req.json();
        const isValidated = await GenreSongSchema.safeParseAsync(body);

        if (!isValidated.success) {
            return new NextResponse("Invalid fields", { status:404 });
        }

        const { genreId, songId } = isValidated.data;

        await db.genreSong.create({
            data : {
                genreId,
                songId
            }
        });

        return NextResponse.json({ success : true });

    } catch (error) {
        console.error("GENRE SONG POST API ERROR", error);
        return new NextResponse("Internal server error", { status:500 });
    }
}