import { db } from "@/lib/db";

export const getGenre = async()=> {
    const genre = db.genre.findMany({});
    return genre;
}