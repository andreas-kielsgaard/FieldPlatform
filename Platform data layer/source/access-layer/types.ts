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
