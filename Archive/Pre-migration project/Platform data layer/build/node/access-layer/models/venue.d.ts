import type { PlatformDomain } from "../platformDomain";
import type { Id, VenueRecord } from "../types";
import { Community } from "./community";
import { Event } from "./event";
export declare class Venue {
    private readonly platform;
    readonly id: Id;
    constructor(platform: PlatformDomain, id: Id);
    data(): VenueRecord;
    name(): string;
    communities(): Community[];
    events(): Event[];
}
