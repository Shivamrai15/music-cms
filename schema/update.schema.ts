import * as z from "zod";

export const UpdateSchema = z.object({
    id : z.string().min(1),
    url : z.string().min(1)
})