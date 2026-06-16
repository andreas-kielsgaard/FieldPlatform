import type { DataShareRequestDraft, DataShareRequestRecord, DataShareRequirementLevel, Id, ObjectType, VisibilityGrantDraft, VisibilityGrantRecord, VisibilityQuery } from "../types";
import type { PlatformDomain } from "../platformDomain";
export interface DataShareAcceptance {
    request: DataShareRequestRecord;
    grant: VisibilityGrantRecord;
}
export interface DataShareCoverage {
    request: DataShareRequestRecord;
    grants: VisibilityGrantRecord[];
    isCovered: boolean;
}
export declare class DataShareService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    createRequest(data: DataShareRequestDraft): DataShareRequestRecord;
    acceptRequest(id: Id, acceptedBy?: Id): DataShareAcceptance;
    revokeRequest(id: Id, revokedBy?: Id): DataShareRequestRecord;
    createGrant(data: VisibilityGrantDraft): VisibilityGrantRecord;
    revokeGrant(id: Id, revokedBy?: Id): VisibilityGrantRecord;
    grantsCoveringRequest(requestId: Id): VisibilityGrantRecord[];
    coverageForRequest(requestId: Id): DataShareCoverage;
    coverageForContext(contextType: ObjectType, contextId: Id, subjectType: ObjectType, subjectId: Id, requirementLevel?: DataShareRequirementLevel): DataShareCoverage[];
    missingRequestsForContext(contextType: ObjectType, contextId: Id, subjectType: ObjectType, subjectId: Id, requirementLevel?: DataShareRequirementLevel): DataShareRequestRecord[];
    canSee(query: VisibilityQuery): boolean;
    private getRequestRecord;
    private getGrantRecord;
    private activeSourceGrant;
    private grantFromRequest;
    private grantCoversRequest;
    private grantCoversQuery;
    private isActiveGrant;
    private contextCovers;
    private facetsInclude;
    private recipientIdsCover;
    private now;
}
