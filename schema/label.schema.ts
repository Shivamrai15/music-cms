import * as z from "zod";

export const LabelSchema = z.object({
    "name" : z.string().min(1, {
        message : "Name is required"
    }),
    "image" : z.string().optional(),
    "color" : z.string().min(1, {
        message : "Color is required"
    })
});