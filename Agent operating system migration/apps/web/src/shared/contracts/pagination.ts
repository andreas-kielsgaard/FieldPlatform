import { z } from "zod";

export const paginationInputSchema = z.object({
  cursor: z.string().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const paginationResultSchema = z.object({
  nextCursor: z.string().min(1).optional(),
});

export type PaginationInput = z.infer<typeof paginationInputSchema>;
export type PaginationResult = z.infer<typeof paginationResultSchema>;
