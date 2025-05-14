import { generateSyntheticData } from "@/lib/agent";
import { db } from "@/lib/db";
import { generateEmbeddings } from "@/lib/embeddings";
import { qdarnt } from "@/lib/qdrant";
import { SongSchema } from "@/schema/song.schema";
import { searchArtist } from "@/server/artist";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST ( req: Request ) {
    try {

        const body = await req.json();
        const validatedData = SongSchema.safeParse(body);

        if (!validatedData.success) {
            return new NextResponse("Invalid Fields", {status : 401});
        }

        const { artistIds, name, ...songData } = validatedData.data;
        
        const song = await db.song.create({
            data : {
                ...songData,
                name : name.trim(),
                artists : {
                    connect : artistIds.map(id => ({ id }))
                }
            },
            include : {
                album : {
                    select : {
                        name : true,
                        release : true,
                    }
                },
                artists : {
                    select : {
                        name : true
                    }
                }
            }
        });
        
        const generatedData = await generateSyntheticData({
            albumName : song.album.name,
            songName : song.name,
            artists : song.artists.map(artist=>artist.name),
            releaseYear : song.album.release.getFullYear()
        });

        let embeddingText = song.name.toLocaleLowerCase();

        if (generatedData) {

            const director = await searchArtist(generatedData.director);
            let directorId = null;
            
            if (director && director[0] && director[0].payload && director[0].score >0.95) {
                directorId = director[0].payload.id;
            } else {
                const newDirector = await db.artist.create({
                    data : {
                        name : generatedData.director,
                        image : "https://res.cloudinary.com/dkaj1swfy/image/upload/v1722023476/uqq2aj7mbyx9huecj2ps.avif",
                        about : " ",
                    }
                });
                directorId = newDirector.id;
            }


            const metadata = await db.metadata.create({
                data : {
                    description : generatedData.description,
                    explicit : generatedData.explicit,
                    genre : generatedData.genre,
                    instrumentation : generatedData.instrumentation,
                    language : generatedData.language,
                    mood : generatedData.mood,
                    tempo : generatedData.tempo,
                    lyricist : generatedData.lyricist,
                    directorId : directorId as string,
                    songId : song.id
                }
            });

            const uniqueGenres = new Set([metadata.genre, ...metadata.mood]);
            const genreAndMood = Array.from(uniqueGenres).join(" ");
            embeddingText = `${song.name.toLocaleLowerCase()} ${genreAndMood}`.trim();

        }

        const vector = await generateEmbeddings(embeddingText);
        const vectorSong = {
            id: uuidv4(),
            vector,
            payload: { 
                id: song.id,
                name: song.name,
                artists: song.artistIds,
                album: song.albumId
            }
        };
        await qdarnt.upsert("song", { points: [vectorSong] });

        return NextResponse.json(song);

    } catch (error) {
        console.error("ARTIST POST API", error);
        return new NextResponse("Intrenal sever error", {status : 500});
    }
}