"use server";

import { db } from "@/lib/db";

export const getSongs = async () => {
    const songs = await db.song.findMany({
        // where : {
        //     name : {
        //         startsWith : "M"
        //     }
        // },
        orderBy : {
            name : "asc"
        }
    });

    return songs;

}
