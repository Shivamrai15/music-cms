import * as z from "zod";

export const EmbeddingsSchema = z.object({
  embeddings: z.string().min(1),
  songId : z.string().min(1),
});