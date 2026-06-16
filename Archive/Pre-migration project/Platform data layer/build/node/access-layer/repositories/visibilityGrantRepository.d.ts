import { VisibilityGrant } from "../models/visibilityGrant";
import type { PlatformDomain } from "../platformDomain";
import type { Id, ObjectType, VisibilityGrantDraft, VisibilityQuery } from "../types";
export declare class VisibilityGrantRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): VisibilityGrant;
    list(): VisibilityGrant[];
    forSubject(subjectType: ObjectType, subjectId: Id): VisibilityGrant[];
    forContext(contextType: ObjectType, contextId: Id): VisibilityGrant[];
    create(data: VisibilityGrantDraft): VisibilityGrant;
    revoke(id: Id, revokedBy?: Id): VisibilityGrant;
    canSee(query: VisibilityQuery): boolean;
}
