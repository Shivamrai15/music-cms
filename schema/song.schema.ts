import * as z from "zod";

export const SongSchema = z.object({
    name : z.string().min(1),
    duration : z.number(),
    url : z.string().min(1),
    albumId: z.string().min(1),
    artistIds : z.string().array(),
    image : z.string().min(1)
})