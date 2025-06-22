import { db } from "@/lib/db";
import { MoodSchema } from "@/schema/moods.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        
        const body = await request.json();
        const validatedData = await MoodSchema.safeParseAsync(body);
        if (!validatedData.success) {
            return new Response(JSON.stringify(validatedData.error), { status: 400 });
        }

        const { id, image, color } = validatedData.data;
        const updatedMood = await db.mood.update({
            where:{
                id
            },
            data:{
                image,
                color
            }
        });

        return NextResponse.json({
            message : "Mood updated successfully",
            mood : updatedMood
        });

    } catch (error) {
        console.error("Error in POST /api/v1/mood:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}