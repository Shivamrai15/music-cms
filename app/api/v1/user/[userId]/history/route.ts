import { db } from "@/lib/db";
import { UserHistory } from "@/types";
import { NextResponse } from "next/server";


const BATCH = 10;

export async function GET(
    req: Request,
    { params } : { params : { userId : string } }
) {
    try {
        
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        
        let history : UserHistory[] = [];

        if (cursor) {
            history = await db.history.findMany({
                where : {
                    userId : params.userId,
                },
                include : {
                    song : true
                },
                cursor : {
                    id : cursor
                },
                skip : 1,
                take : BATCH,
                orderBy : {
                    createdAt : "desc"
                }
            });
        } else {
            history = await db.history.findMany({
                where : {
                    userId : params.userId,
                },
                include : {
                    song : true
                },
                take : BATCH,
                orderBy : {
                    createdAt : "desc"
                }
            });
        }

        let nextCursor = null;

        if(history.length === BATCH){
            nextCursor = history[BATCH-1].id
        }

        return NextResponse.json({
            items : history,
            nextCursor
        });


    } catch (error) {
        console.log("Error fetching user history", error);
        return new NextResponse("Internal Error", { status : 500 });
    }
}