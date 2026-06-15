import { describe, expect, it } from "vitest";

import { canShowProfileField } from "./profile-visibility";

describe("canShowProfileField", () => {
  it("keeps private and public profile fields separate", () => {
    const settings = {
      showEmail: false,
      showParticipation: false,
      showStewardships: true,
    };

    expect(canShowProfileField(settings, "email")).toBe(false);
    expect(canShowProfileField(settings, "participation")).toBe(false);
    expect(canShowProfileField(settings, "stewardships")).toBe(true);
  });
});
