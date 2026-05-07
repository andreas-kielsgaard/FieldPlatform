import type { PlatformDomain } from "../platformDomain";
import type { EventRecord, Id } from "../types";
export declare class EventRegistrationService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    register(personId: Id, eventId: Id): EventRecord;
    markInterested(personId: Id, eventId: Id): EventRecord;
    private updateAttendance;
    private findEventCollection;
}
