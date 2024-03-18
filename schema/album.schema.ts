import * as z from "zod";

export const AlbumSchema = z.object({
    name : z.string().min(1),
    image : z.string().min(1),
    color : z.string().min(1),
    release : z.date(),
});