import type { PlatformDomain } from "../platformDomain";
import type { EventDraftData, EventRecord, Id } from "../types";
import { normalizeEventDraft } from "../utils/domainUtils";

export class EventManagementService {
  constructor(private readonly platform: PlatformDomain) {}

  create(data: EventDraftData, createdBy: Id): EventRecord {
    const normalized = normalizeEventDraft(data, createdBy);
    return this.platform.raw().database.create("events", normalized) as EventRecord;
  }

  update(eventId: Id, patch: Partial<EventRecord>): EventRecord {
    const collectionName = this.findEventCollection(eventId);
    return this.platform.raw().database.update(collectionName, eventId, patch) as EventRecord;
  }

  private findEventCollection(eventId: Id): "events" | "createdEvents" {
    if (this.platform.raw().database.get("events", eventId)) return "events";
    if (this.platform.raw().database.get("createdEvents", eventId)) return "createdEvents";
    throw new Error(`Event not found: ${eventId}`);
  }
}
