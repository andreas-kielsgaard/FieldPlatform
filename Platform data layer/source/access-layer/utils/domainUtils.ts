import type { CommunityRecord, EventDraftData, EventRecord, Id } from "../types";

export function idOf(value: { id: Id } | Id): Id {
  return typeof value === "string" ? value : value.id;
}

export function addUnique(items: string[], item: string): string[] {
  return items.includes(item) ? [...items] : [...items, item];
}

export function normalizeEventDraft(data: EventDraftData, creatorId?: Id): EventDraftData & Partial<EventRecord> {
  return {
    access: "public",
    tags: [],
    linkedGroups: [],
    relevantGroups: [],
    attendance: { interested: [], attending: [] },
    ...data,
    creatorId: data.creatorId || creatorId,
    hostId: data.hostId || creatorId
  } as EventDraftData & Partial<EventRecord>;
}

export function normalizeCommunityDraft<T extends Partial<CommunityRecord>>(data: T): T {
  return {
    state: "draft",
    tags: [],
    norms: [],
    venues: [],
    stewards: [],
    ...data
  };
}

export function touchesCommunity(event: EventRecord, communityId: Id): boolean {
  return [...event.linkedGroups, ...event.relevantGroups].includes(communityId);
}

export function isBridgeEvent(event: EventRecord): boolean {
  return event.access === "public" ||
    event.tags.includes("beginner-friendly") ||
    event.tags.includes("low-threshold") ||
    event.tags.includes("drop-in");
}

export function clone<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}
