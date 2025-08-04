import { db } from "@/lib/db";
import { QuerySchema } from "@/schema/query.schema";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        
        const { searchParams } = new URL(request.url);
        const validatedQuery = await QuerySchema.safeParseAsync(Object.fromEntries(searchParams.entries()));
        if (!validatedQuery.success) {
            return new NextResponse("Invalid query parameters", { status: 400 });
        }

        const users = await db.user.findMany({
            orderBy : {
                createdAt : "desc",
            },
            include : {
                accounts : {
                    select : {
                        provider : true
                    }
                }
            },
            take : validatedQuery.data.limit,
            skip : (validatedQuery.data.page??1-1)*(validatedQuery.data.limit??1),
        });

        return NextResponse.json({
            users : users,
            page : validatedQuery.data.page,
            limit : validatedQuery.data.limit,
            hasNextPage : users.length === validatedQuery.data.limit,
        });
        

    } catch (error) {
        console.error("Error in User GET request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}