import { db } from "@/lib/db";
import { VideoSchema } from "@/schema/video.schema";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {

        const body = await req.json();
        const validatedData = await VideoSchema.safeParseAsync(body);
        if (!validatedData.success) {
            return new NextResponse("Fields are required", {status: 401});
        }

        const data = await db.video.create({
            data : validatedData.data
        });

        return NextResponse.json(data);

    } catch (error) {
        console.log("VIDEO API ERROR", error);
        return new NextResponse("Internal server error", {status: 500});
    }
}


export async function PATCH (req: Request) {
    try {

                const body = await req.json();
                const validatedData = await VideoSchema.safeParseAsync(body);
                if (!validatedData.success) {
                    return new NextResponse("Fields are required", {status: 401});
                }
        
                const data = await db.video.update({
                    where : {
                        genreId : validatedData.data.genreId
                    },
                    data : {
                        image : validatedData.data.image
                    }
                });
        
                return NextResponse.json(data);
        
            } catch (error) {
                console.log("VIDEO API ERROR", error);
                return new NextResponse("Internal server error", {status: 500});
            }
}