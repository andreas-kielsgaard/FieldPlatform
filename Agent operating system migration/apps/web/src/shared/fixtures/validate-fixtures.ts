import { communityOrientationViewSchema } from "~/modules/communities";
import { waysInBlockSchema } from "~/modules/ways-in";

import { communityFixtures, waysInFixtures } from "./field-platform-fixtures";

export function validateFieldPlatformFixtures() {
  return {
    communities: communityOrientationViewSchema.array().parse(communityFixtures),
    waysIn: waysInBlockSchema.parse({ items: waysInFixtures }).items,
  };
}
