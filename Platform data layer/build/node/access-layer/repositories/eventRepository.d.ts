import { Event } from "../models/event";
import type { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { EventDraftData, Id } from "../types";
export declare class EventRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): Event;
    list(): Event[];
    create(data: EventDraftData, createdBy: User | Id): Event;
}
