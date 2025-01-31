import * as z from "zod";

export const AdSchema = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    color: z.string().min(1),
    url: z.string().min(1),
    duration: z.number().min(0)
});