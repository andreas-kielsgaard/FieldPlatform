import type { PlatformDomain } from "../platformDomain";
import type { CommunityDraftData, EventDraftData, Id, MembershipRequestRecord, PersonRecord } from "../types";
import type { Community } from "./community";
import type { DataShareRequest } from "./dataShareRequest";
import type { Event } from "./event";
import { ParticipationEdge } from "./participationEdge";
import { UserCommunityAccess } from "./userCommunityAccess";
import { UserEventAccess } from "./userEventAccess";
import type { VisibilityGrant } from "./visibilityGrant";
export declare class User {
    private readonly platform;
    readonly id: Id;
    readonly events: UserEventAccess;
    readonly communities: UserCommunityAccess;
    constructor(platform: PlatformDomain, id: Id);
    profile(): PersonRecord;
    name(): string;
    tags(): string[];
    participationEdges(): ParticipationEdge[];
    edgeTo(community: Community | Id): ParticipationEdge | null;
    followCommunity(community: Community | Id): ParticipationEdge;
    requestMembership(community: Community | Id, note?: string): MembershipRequestRecord;
    createEvent(data: EventDraftData): Event;
    createCommunity(data: CommunityDraftData): Community;
    canManageEvent(event: Event | Id): boolean;
    canManageCommunity(community: Community | Id): boolean;
    dataShareRequests(): DataShareRequest[];
    visibilityGrants(): VisibilityGrant[];
}
