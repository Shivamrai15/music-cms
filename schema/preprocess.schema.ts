import * as z from "zod";

export const PreProcessSchema = z.object({
    id : z.string().min(1),
    audio : z.instanceof(File, { message: "Audio file is required" })
    .refine((file) => file.type.startsWith('audio/'), { 
        message: "File must be an audio file",
    }),
});