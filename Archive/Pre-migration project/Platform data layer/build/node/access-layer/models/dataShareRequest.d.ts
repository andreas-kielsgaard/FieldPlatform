import type { PlatformDomain } from "../platformDomain";
import type { DataShareRequestRecord, Id } from "../types";
import { VisibilityGrant } from "./visibilityGrant";
export declare class DataShareRequest {
    private readonly platform;
    readonly id: Id;
    constructor(platform: PlatformDomain, id: Id);
    data(): DataShareRequestRecord;
    accept(acceptedBy?: Id): DataShareRequest;
    revoke(revokedBy?: Id): DataShareRequest;
    visibilityGrants(): VisibilityGrant[];
}
