import { db } from "@/lib/db";
import { AdSchema } from "@/schema/ad.schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        const validatedData = await AdSchema.safeParseAsync(body);
        if (!validatedData.success) {
            return new NextResponse("Fields required", {status: 401});
        }

        const data = validatedData.data;

        const ad = await db.ad.create({
            data 
        });
       
        return NextResponse.json(ad);

    } catch (error) {
        return new NextResponse("Internal server error", {status: 500});
    }
}