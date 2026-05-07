import { Venue } from "../models/venue";
import type { PlatformDomain } from "../platformDomain";
import type { Id } from "../types";
export declare class VenueRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): Venue;
    list(): Venue[];
}
