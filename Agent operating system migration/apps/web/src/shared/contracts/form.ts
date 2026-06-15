import { z } from "zod";

export const nonEmptyFormStringSchema = z.string().trim().min(1);

export const optionalFormStringSchema = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().optional());

export function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}
