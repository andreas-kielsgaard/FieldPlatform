import { Event } from "../models/event";
import type { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { EventDraftData, EventRecord, Id } from "../types";
import { idOf } from "../utils/domainUtils";

export class EventRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): Event {
    const record = this.platform.raw().queries.getEvent(id) as EventRecord | null;
    if (!record) throw new Error(`Event not found: ${id}`);
    return new Event(this.platform, id);
  }

  list(): Event[] {
    return (this.platform.raw().queries.listEvents() as EventRecord[])
      .map(record => new Event(this.platform, record.id));
  }

  create(data: EventDraftData, createdBy: User | Id): Event {
    const creatorId = idOf(createdBy);
    const record = this.platform.eventManagement.create(data, creatorId);
    return new Event(this.platform, record.id);
  }
}
