import { z } from "zod";

export const accountIdSchema = z.uuid().brand<"AccountId">();
export const authUserIdSchema = z.uuid().brand<"AuthUserId">();
export const profileIdSchema = z.uuid().brand<"ProfileId">();
export const representationIdSchema = z.uuid().brand<"RepresentationId">();
export const relationClaimIdSchema = z.uuid().brand<"RelationClaimId">();

export type AccountId = z.infer<typeof accountIdSchema>;
export type AuthUserId = z.infer<typeof authUserIdSchema>;
export type ProfileId = z.infer<typeof profileIdSchema>;
export type RepresentationId = z.infer<typeof representationIdSchema>;
export type RelationClaimId = z.infer<typeof relationClaimIdSchema>;
