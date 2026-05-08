export type Id = string;

export type AccessLevel =
  | "public"
  | "known"
  | "requested"
  | "member"
  | "trusted"
  | "core"
  | "visible-but-member-signup-only"
  | string;

export type RelationshipState =
  | "observing"
  | "curious"
  | "occasional"
  | "recurring"
  | "contributor"
  | "facilitator"
  | "steward"
  | "dormant"
  | "alumnus"
  | string;

export type ObjectType =
  | "person"
  | "community"
  | "event"
  | "venue"
  | "generatedField"
  | "festival"
  | "practice"
  | "tag"
  | string;

export type RelationKind =
  | "belongs_with"
  | "relevant_to"
  | "hosted_at"
  | "facilitated_by"
  | "stewarded_by"
  | "overlaps_with"
  | "bridges_to"
  | "shares_practice"
  | "shares_venue"
  | "shares_participants"
  | "good_first_step_for"
  | "deeper_pathway_into"
  | "soft_landing_after"
  | "generated_from"
  | string;

export type RelationStatus =
  | "suggested"
  | "accepted"
  | "refined"
  | "declined"
  | "computed"
  | "dormant"
  | string;

export type RelationProvenance =
  | "user_suggested"
  | "steward_marked"
  | "creator_marked"
  | "calculated"
  | "imported"
  | string;

export type RelationVisibility =
  | "private"
  | "visible_to_stewards"
  | "visible_to_members"
  | "public"
  | string;

export type HoldType =
  | "visibility"
  | "context"
  | "trust"
  | "threshold"
  | "boundary"
  | "stewardship"
  | "capacity"
  | "language"
  | string;

export type MovementType =
  | "follow"
  | "attend"
  | "mark_interested"
  | "request_access"
  | "ask_steward"
  | "volunteer"
  | "join_recurring"
  | "create_bridge_event"
  | "suggest_connection"
  | "reactivate"
  | "remain_observing"
  | string;

export type RelationReviewAction =
  | "accept"
  | "refine"
  | "decline"
  | "redirect"
  | "mark_computed_only"
  | string;

export interface RelationEvidence {
  type: string;
  label?: string;
  objectType?: ObjectType;
  objectId?: Id;
  value?: string | number | boolean;
  weight?: number;
}

export interface PersonRecord {
  id: Id;
  name: string;
  bio?: string;
  tags: string[];
  visibleAttributes?: string[];
  lifeContext?: string;
}

export interface CommunityRecord {
  id: Id;
  name: string;
  description?: string;
  state?: string;
  color?: string;
  tags: string[];
  norms: string[];
  rhythm?: string;
  venues: Id[];
  stewards: Id[];
  accessRules?: string;
  entryGuidance?: string;
  creatorId?: Id;
}

export interface VenueRecord {
  id: Id;
  name: string;
  type?: string;
  location?: string;
  atmosphere?: string;
  associatedGroups: Id[];
}

export interface EventRecord {
  id: Id;
  title: string;
  hostId?: Id;
  creatorId?: Id;
  cohostIds?: Id[];
  volunteerIds?: Id[];
  linkedGroups: Id[];
  relevantGroups: Id[];
  venueId: Id;
  time?: string;
  tags: string[];
  audience?: string;
  access: AccessLevel;
  price?: string;
  beginnerFriendly?: boolean;
  attendance: {
    interested: Id[];
    attending: Id[];
  };
}

export interface ParticipationEdgeRecord {
  id: Id;
  personId: Id;
  groupId: Id;
  relationshipState: RelationshipState;
  accessLevel: AccessLevel;
  engagementStrength?: number;
  recency: number;
  frequency: number;
  contributionLevel: number;
  trustLevel: number;
  roleModes: string[];
  socialEmbeddedness: string;
  normFamiliarity: string;
  identitySalience: string;
  visibility: string;
  decayState: string;
}

export interface GeneratedFieldRecord {
  id: Id;
  name: string;
  generatedFrom: string;
  groups: Id[];
  peopleCount: number;
  tags: string[];
  strength: number;
  clarity: string;
  description: string;
}

export interface MembershipRequestRecord {
  id: Id;
  personId: Id;
  groupId: Id;
  status: string;
  note?: string;
}

export interface SuggestedEventShareRecord {
  id: Id;
  eventId: Id;
  groupId: Id;
  suggestedBy: Id;
  status: string;
  note?: string;
}

export interface FieldRelationRecord {
  id: Id;
  sourceType: ObjectType;
  sourceId: Id;
  targetType: ObjectType;
  targetId: Id;
  relationKind: RelationKind;
  relationStrength?: number;
  status: RelationStatus;
  provenance: RelationProvenance;
  suggestedBy?: Id;
  reviewedBy?: Id;
  reviewAuthorityType?: ObjectType;
  reviewAuthorityId?: Id;
  visibility: RelationVisibility;
  reason?: string;
  evidence?: RelationEvidence[];
  holdTypes?: HoldType[];
  movementUnlocked?: MovementType[];
  createdAt?: string;
  updatedAt?: string;
}

export type FieldRelationDraft = Omit<FieldRelationRecord, "id" | "status" | "provenance" | "visibility"> & {
  id?: Id;
  status?: RelationStatus;
  provenance?: RelationProvenance;
  visibility?: RelationVisibility;
};

export type PartialFieldRelationDraft = FieldRelationDraft;

export interface RelationReviewRecord {
  id: Id;
  fieldRelationId: Id;
  reviewerId: Id;
  action: RelationReviewAction;
  previousStatus: RelationStatus;
  nextStatus: RelationStatus;
  note?: string;
  refinedRelationKind?: RelationKind;
  redirectedTargetType?: ObjectType;
  redirectedTargetId?: Id;
  createdAt?: string;
}

export interface GroupRelationshipRecord {
  id: Id;
  fromGroupId: Id;
  toGroupId: Id;
  type: string;
  note?: string;
  markedBy?: Id | null;
  source?: string;
}

export interface ManagedObjectRecord {
  id: Id;
  personId: Id;
  objectType: "event" | "group" | string;
  objectId: Id;
  roles: string[];
  source?: string;
}

export interface EventDraftData {
  title: string;
  hostId?: Id;
  creatorId?: Id;
  venueId: Id;
  access?: AccessLevel;
  price?: string;
  tags?: string[];
  audience?: string;
  beginnerFriendly?: boolean;
  linkedGroups?: Id[];
  relevantGroups?: Id[];
  cohostIds?: Id[];
  volunteerIds?: Id[];
  time?: string;
}

export interface CommunityDraftData {
  name: string;
  description?: string;
  state?: string;
  color?: string;
  tags?: string[];
  norms?: string[];
  rhythm?: string;
  venues?: Id[];
  stewards?: Id[];
  accessRules?: string;
  entryGuidance?: string;
}

export interface LowLevelPlatform {
  database: any;
  queries: any;
  calculations: any;
  resetDatabase(): unknown;
  getSnapshot(): unknown;
}

export interface DomainOptions {
  adapter?: unknown;
  storageKey?: string;
  lowLevelPlatform?: LowLevelPlatform;
}
