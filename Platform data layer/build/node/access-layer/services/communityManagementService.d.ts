import type { PlatformDomain } from "../platformDomain";
import type { CommunityDraftData, CommunityRecord, GroupRelationshipRecord, Id } from "../types";
export declare class CommunityManagementService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    create(data: CommunityDraftData, createdBy: Id): CommunityRecord;
    update(groupId: Id, patch: Partial<CommunityRecord>): CommunityRecord;
    markRelationshipTo(fromGroupId: Id, toGroupId: Id, type?: string, note?: string, markedBy?: Id | null): GroupRelationshipRecord;
}
