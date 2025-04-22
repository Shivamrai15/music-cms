import * as z from "zod";

export const QuerySchema = z.object({
    limit : z.coerce.number().default(10).optional(),
    page : z.coerce.number().default(1).optional(),
    search : z.string().optional()
});