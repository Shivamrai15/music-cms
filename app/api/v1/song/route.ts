import { db } from "@/lib/db";
import { SongSchema } from "@/schema/song.schema";
import { NextResponse } from "next/server";

export async function POST ( req: Request ) {
    try {

        const body = await req.json();
        const validatedData = SongSchema.safeParse(body);

        if (!validatedData.success) {
            return new NextResponse("Invalid Fields", {status : 401});
        }

        const { artistIds, ...songData } = validatedData.data;

        const song = await db.song.create({
            data : {
                ...songData,
                artists : {
                    connect : artistIds.map(id => ({ id }))
                }
            }
        });

        return NextResponse.json(song);

    } catch (error) {
        console.error("ARTIST POST API", error);
        return new NextResponse("Intrenal sever error", {status : 500});
    }
}