import { z } from "zod";

export const slugParamSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const handleParamSchema = z.object({
  handle: z
    .string()
    .min(2)
    .max(40)
    .regex(/^[a-zA-Z0-9_]+$/),
});

export type SlugParam = z.infer<typeof slugParamSchema>;
export type HandleParam = z.infer<typeof handleParamSchema>;
