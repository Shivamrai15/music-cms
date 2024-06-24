import { db } from "@/lib/db";
import { UpdateSchema } from "@/schema/update.schema";
import { NextResponse } from "next/server";

export async function POST ( req : Request ) {
    try {
        
        const body = await req.json();
        const validatedData = await UpdateSchema.safeParseAsync(body);
        if ( !validatedData.success ) {
            return new NextResponse("Invalid fields", { status:401 });
        }

        const { id, url } = validatedData.data;

        await db.song.update({
            where : {
                id 
            }, 
            data : {
                url
            }
        });

        return NextResponse.json({ success :true });

    } catch (error) {
        console.error("UPDATE API ERROR", error);
        return new NextResponse("Internal server error", { status:500 });
    }
}