import type { PlatformDomain } from "../platformDomain";
import type { EventRecord, Id } from "../types";
import { addUnique } from "../utils/domainUtils";

export class EventRegistrationService {
  constructor(private readonly platform: PlatformDomain) {}

  register(personId: Id, eventId: Id): EventRecord {
    return this.updateAttendance(eventId, attendance => ({
      interested: attendance.interested.filter(id => id !== personId),
      attending: addUnique(attendance.attending, personId)
    }));
  }

  markInterested(personId: Id, eventId: Id): EventRecord {
    return this.updateAttendance(eventId, attendance => ({
      ...attendance,
      interested: addUnique(attendance.interested, personId)
    }));
  }

  private updateAttendance(
    eventId: Id,
    update: (attendance: EventRecord["attendance"]) => EventRecord["attendance"]
  ): EventRecord {
    const collectionName = this.findEventCollection(eventId);
    return this.platform.raw().database.update(collectionName, eventId, (event: EventRecord) => ({
      attendance: update(event.attendance || { interested: [], attending: [] })
    })) as EventRecord;
  }

  private findEventCollection(eventId: Id): "events" | "createdEvents" {
    if (this.platform.raw().database.get("events", eventId)) return "events";
    if (this.platform.raw().database.get("createdEvents", eventId)) return "createdEvents";
    throw new Error(`Event not found: ${eventId}`);
  }
}
