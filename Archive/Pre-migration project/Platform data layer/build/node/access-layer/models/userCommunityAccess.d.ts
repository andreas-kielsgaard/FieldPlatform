import type { PlatformDomain } from "../platformDomain";
import { Community } from "./community";
import type { User } from "./user";
export declare class UserCommunityAccess {
    private readonly platform;
    private readonly user;
    constructor(platform: PlatformDomain, user: User);
    followed(): Community[];
    member(): Community[];
    committed(): Community[];
    dormant(): Community[];
    managed(): Community[];
    private edgesByState;
}
