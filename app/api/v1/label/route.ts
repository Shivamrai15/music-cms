import { db } from "@/lib/db";
import { LabelSchema } from "@/schema/label.schema";
import { NextResponse } from "next/server";

export async function POST ( req: Request ) {
    try {
        
        const body = await req.json();
        const validatedDate = await LabelSchema.safeParseAsync(body);

        if ( !validatedDate.success ) {
            return new NextResponse("Fields are required", { status: 400 });
        }

        await db.label.create({
            data : validatedDate.data
        });

        return NextResponse.json({success: true});

    } catch (error) {
        console.error("LABEL API ERROR", error);
        return new NextResponse("Internal server error", { status:500 });
    }
}