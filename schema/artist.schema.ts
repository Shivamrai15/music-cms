import * as z from "zod";

export const ArtistSchema = z.object({
    name : z.string().min(1),
    image : z.string().min(1),
    thumbnail : z.string().optional(),
    about : z.string().min(1),
})