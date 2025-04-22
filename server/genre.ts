import { db } from "@/lib/db";

export const getGenre = async()=> {
    const genre = db.genre.findMany({});
    return genre;
}

export const getGenreWithoutVideo = async () =>{
    const genre = db.genre.findMany({
        where: {
            video : {
                is : null
            },
        },
    });
    return genre;
}