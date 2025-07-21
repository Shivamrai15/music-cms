import { db } from "@/lib/db";
import { LyricsSchema } from "@/schema/lyrics.schema";
import { NextResponse } from "next/server";

export async function POST ( req : Request ) {
    try {

        const body = await req.json();
        const isValidated = await LyricsSchema.safeParseAsync(body);

        if (!isValidated.success) {
            return new NextResponse("Invalid inputs",  { status:400 });
        }

        const data = isValidated.data;

        await db.lyrics.create({
            data : {
                songId : data.songId,
                lyrics : JSON.parse(data.lyrics),
                synced : data.synced,
            }
        });

        return NextResponse.json({success : true}, { status:201 });
        
    } catch (error) {
        console.log("LYRICS POST API ERROR", error);
        return new NextResponse("Internal server error", { status:500 })
    }
}


export async function PATCH ( req : Request ) {
    try {

        const body = await req.json();
        const isValidated = await LyricsSchema.safeParseAsync(body);

        if (!isValidated.success) {
            return new NextResponse("Invalid inputs",  { status:400 });
        }

        const data = isValidated.data;

        await db.lyrics.update({
            where : {
                songId : data.songId
            },
            data : {
                lyrics : JSON.parse(data.lyrics),
                synced : true,
            }
        });

        return NextResponse.json({success : true}, { status:200 });
        
    } catch (error) {
        console.log("LYRICS PATCH API ERROR", error);
        return new NextResponse("Internal server error", { status:500 })
    }
}   