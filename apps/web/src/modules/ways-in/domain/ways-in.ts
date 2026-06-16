import { type WaysInItem, waysInBlockSchema } from "../contracts/ways-in.view";

export function validateWaysInItems(items: readonly WaysInItem[]) {
  return waysInBlockSchema.parse({ items: [...items] }).items;
}
