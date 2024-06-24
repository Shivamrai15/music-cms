import { db } from "@/lib/db";
import { GenreSchema } from "@/schema/genre.schema";
import { NextResponse } from "next/server";

export async function POST ( req : Request ) {
    try {
        
        const body = await req.json();
        const validatedData = GenreSchema.safeParse(body);

        if (!validatedData.success) {
            return new NextResponse("Invalid fields", {status: 401});
        }

        const genre = await db.genre.create({
            data : validatedData.data
        });

        return NextResponse.json(genre);

    } catch (error) {
        return new NextResponse("Internal server error", {status: 500})
    }
}