import { db } from "@/lib/db";
import { qdarnt } from "@/lib/qdrant";
import { EmbeddingsSchema } from "@/schema/embeddings.schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
 
export async function POST ( req: Request ) {
    try {
        
        const body = await req.json();
        const validatedData = await EmbeddingsSchema.safeParseAsync(body);
        if (!validatedData.success) {
            return new NextResponse("Invalid data", { status: 400 });
        }

        const { songId, embeddings } = validatedData.data;
        const embddingsJson = JSON.parse(embeddings);

        const id = uuidv4();

        const embedding =  await db.embedding.create({
            data : {
                songId,
                vector: embddingsJson as number[],
                pointId : id,
            },
            include : {
                song : {
                    select : {
                        name: true,
                        metadata : {
                            select : {
                                moods : true,
                                genre : true,
                                language: true
                            }
                        }
                    }
                }
            }
        });

        const qdrantEmbedding = {
            id,
            vector : embddingsJson as number[],
            payload : {
                songId: songId,
                name : embedding.song.name,
                genre: embedding.song.metadata?.genre || "",
                moods: embedding.song.metadata?.moods.map(mood => mood.name) || [],
                language: embedding.song.metadata?.language || ""
            }
        }

        await qdarnt.upsert("songMetaData", { points: [qdrantEmbedding]});

        return NextResponse.json(embedding);

    } catch (error) {
        console.log("EMBEDDING POST API ERROR", error);
        return new NextResponse("Internal server error", { status: 500 });
    }   

}