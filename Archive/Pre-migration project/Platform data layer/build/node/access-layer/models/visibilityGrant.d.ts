import type { PlatformDomain } from "../platformDomain";
import type { Id, VisibilityGrantRecord, VisibilityQuery } from "../types";
export declare class VisibilityGrant {
    private readonly platform;
    readonly id: Id;
    constructor(platform: PlatformDomain, id: Id);
    data(): VisibilityGrantRecord;
    isActive(): boolean;
    revoke(revokedBy?: Id): VisibilityGrant;
    covers(query: VisibilityQuery): boolean;
}
