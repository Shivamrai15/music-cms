import * as z from "zod";

export const VideoSchema = z.object({
    genreId : z.string().min(1),
    image : z.string().min(1),
    url : z.string().min(1),
})