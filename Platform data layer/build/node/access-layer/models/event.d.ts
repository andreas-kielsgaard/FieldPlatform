import type { PlatformDomain } from "../platformDomain";
import type { AccessLevel, EventRecord, Id, SuggestedEventShareRecord } from "../types";
import type { Community } from "./community";
import type { User } from "./user";
import type { Venue } from "./venue";
export declare class Event {
    private readonly platform;
    readonly id: Id;
    constructor(platform: PlatformDomain, id: Id);
    data(): EventRecord;
    title(): string;
    changeName(name: string): Event;
    addTag(tag: string): Event;
    removeTag(tag: string): Event;
    setVenue(venue: Venue | Id): Event;
    setAccess(access: AccessLevel): Event;
    registerUser(user: User | Id): Event;
    markUserInterested(user: User | Id): Event;
    suggestToCommunity(community: Community | Id, suggestedBy: User | Id, note?: string): SuggestedEventShareRecord;
    relevanceFor(user: User | Id): unknown;
    linkedCommunities(): Community[];
    relevantCommunities(): Community[];
    venue(): Venue;
    canBeManagedBy(user: User | Id): boolean;
}
