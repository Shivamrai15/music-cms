import * as z from "zod";

export const GenreSongSchema = z.object({
    genreId : z.string().min(1),
    songId : z.string().min(1)
})