import { z } from "zod";

export const waysInItemSchema = z.object({
  audience: z.string().trim().min(1),
  threshold: z.string().trim().min(1),
  access: z.string().trim().min(1),
  priceText: z.string().trim().optional(),
  experienceLevel: z.string().trim().min(1),
  entrySuggestion: z.string().trim().min(1),
});

export const waysInBlockSchema = z.object({
  items: z.array(waysInItemSchema).min(1),
});

export type WaysInItem = z.infer<typeof waysInItemSchema>;
export type WaysInBlock = z.infer<typeof waysInBlockSchema>;
