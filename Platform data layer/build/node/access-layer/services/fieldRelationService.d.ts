import type { PlatformDomain } from "../platformDomain";
import type { FieldRelationDraft, FieldRelationRecord, Id } from "../types";
export declare class FieldRelationService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    suggest(data: FieldRelationDraft, suggestedBy: Id): FieldRelationRecord;
    accept(id: Id, reviewerId: Id, note?: string): FieldRelationRecord;
    refine(id: Id, reviewerId: Id, patch: Partial<FieldRelationRecord>, note?: string): FieldRelationRecord;
    decline(id: Id, reviewerId: Id, note?: string): FieldRelationRecord;
    redirect(id: Id, reviewerId: Id, targetType: string, targetId: Id, note?: string): FieldRelationRecord;
    private reviewAndUpdate;
}
