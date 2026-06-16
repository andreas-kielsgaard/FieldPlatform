export type ProfileId = string;

export function getProfileView(handle: string) {
  return {
    handle,
    displayName: `@${handle}`,
    summary: "Profile visibility is app-owned and separate from authentication account data.",
  };
}

export * from "./contracts/profile.view";
export * from "./domain/profile-visibility";
