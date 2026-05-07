import type { CommunityRecord, EventDraftData, EventRecord, Id } from "../types";
export declare function idOf(value: {
    id: Id;
} | Id): Id;
export declare function addUnique(items: string[], item: string): string[];
export declare function normalizeEventDraft(data: EventDraftData, creatorId?: Id): EventDraftData & Partial<EventRecord>;
export declare function normalizeCommunityDraft<T extends Partial<CommunityRecord>>(data: T): T;
export declare function touchesCommunity(event: EventRecord, communityId: Id): boolean;
export declare function isBridgeEvent(event: EventRecord): boolean;
export declare function clone<T>(value: T): T;
