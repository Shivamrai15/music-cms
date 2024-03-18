import { db } from "@/lib/db";
import { ArtistSchema } from "@/schema/artist.schema";
import { NextResponse } from "next/server";

export async function POST ( req : Request ) {
    try {
        
        const body = await req.json();
        
        const validatedData = ArtistSchema.safeParse(body);

        if (!validatedData.success) {
            return new NextResponse("Fields are required", {status : 400});
        }

        const data = validatedData.data

        const artist = await db.artist.create({
            data        
        });

        return NextResponse.json({success : true});

    } catch (error) {
        console.error("ARTIST POST API", error);
        return new NextResponse("Intrenal sever error", {status : 500});
    }
}