import type { ProfileDataVisibility } from "../contracts/profile.view";

export type ProfileField = "email" | "participation" | "stewardships";

export function canShowProfileField(settings: ProfileDataVisibility, field: ProfileField) {
  if (field === "email") {
    return settings.showEmail;
  }

  if (field === "participation") {
    return settings.showParticipation;
  }

  return settings.showStewardships;
}
