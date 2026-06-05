import { DataShareRequest } from "../models/dataShareRequest";
import type { PlatformDomain } from "../platformDomain";
import type { DataShareRequestDraft, Id, ObjectType } from "../types";
export declare class DataShareRequestRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): DataShareRequest;
    list(): DataShareRequest[];
    forSubject(subjectType: ObjectType, subjectId: Id): DataShareRequest[];
    forContext(contextType: ObjectType, contextId: Id): DataShareRequest[];
    create(data: DataShareRequestDraft): DataShareRequest;
    accept(id: Id, acceptedBy?: Id): DataShareRequest;
    revoke(id: Id, revokedBy?: Id): DataShareRequest;
}
