import type { EventRecommendation } from "../services/recommendationService";
import type { PlatformDomain } from "../platformDomain";
import { Event } from "./event";
import type { User } from "./user";
export declare class UserEventAccess {
    private readonly platform;
    private readonly user;
    constructor(platform: PlatformDomain, user: User);
    attending(): Event[];
    interested(): Event[];
    managed(): Event[];
    recommended(): EventRecommendation[];
}
