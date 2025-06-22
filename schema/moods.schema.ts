import * as z from "zod";

export const MoodSchema = z.object({
    id  : z.string().min(5),
    image : z.string().url(),
    color : z.string().min(6, "Color is required"),
});