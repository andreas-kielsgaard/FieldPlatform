import type { PlatformDomain } from "../platformDomain";
import type { EventDraftData, EventRecord, Id } from "../types";
export declare class EventManagementService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    create(data: EventDraftData, createdBy: Id): EventRecord;
    update(eventId: Id, patch: Partial<EventRecord>): EventRecord;
    private findEventCollection;
}
