import * as z from "zod";

export const GenreSchema = z.object({
    name : z.string().min(1),
    image : z.string().min(1)
})