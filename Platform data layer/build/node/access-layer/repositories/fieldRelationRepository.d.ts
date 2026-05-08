import { FieldRelation } from "../models/fieldRelation";
import type { PlatformDomain } from "../platformDomain";
import type { FieldRelationRecord, Id, ObjectType, PartialFieldRelationDraft } from "../types";
export declare class FieldRelationRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): FieldRelation;
    list(): FieldRelation[];
    forObject(type: ObjectType, id: Id): FieldRelation[];
    between(sourceType: ObjectType, sourceId: Id, targetType: ObjectType, targetId: Id): FieldRelation[];
    suggest(data: PartialFieldRelationDraft, suggestedBy: Id): FieldRelation;
    accept(id: Id, reviewerId: Id, note?: string): FieldRelation;
    refine(id: Id, reviewerId: Id, patch: Partial<FieldRelationRecord>, note?: string): FieldRelation;
    decline(id: Id, reviewerId: Id, note?: string): FieldRelation;
    forReviewAuthority(type: ObjectType, id: Id): FieldRelation[];
    pendingForCommunity(communityId: Id): FieldRelation[];
}
