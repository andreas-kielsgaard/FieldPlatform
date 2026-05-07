import { Community } from "../models/community";
import type { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { CommunityDraftData, Id } from "../types";
export declare class CommunityRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): Community;
    list(): Community[];
    create(data: CommunityDraftData, createdBy: User | Id): Community;
}
