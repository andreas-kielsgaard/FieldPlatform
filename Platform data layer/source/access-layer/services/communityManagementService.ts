import type { PlatformDomain } from "../platformDomain";
import type { CommunityDraftData, CommunityRecord, GroupRelationshipRecord, Id } from "../types";
import { addUnique, normalizeCommunityDraft } from "../utils/domainUtils";
import { groupRelationshipId } from "../utils/recordFactories";

export class CommunityManagementService {
  constructor(private readonly platform: PlatformDomain) {}

  create(data: CommunityDraftData, createdBy: Id): CommunityRecord {
    const normalized = normalizeCommunityDraft({
      ...data,
      creatorId: createdBy,
      stewards: addUnique(data.stewards || [], createdBy)
    });
    const community = this.platform.raw().database.create("groups", normalized) as CommunityRecord;

    this.platform.participation.setEdge(createdBy, community.id, {
      relationshipState: "steward",
      accessLevel: "core",
      contributionLevel: 70,
      trustLevel: 70,
      roleModes: ["steward"],
      socialEmbeddedness: "strong",
      normFamiliarity: "carrier",
      visibility: "visibleToStewards",
      decayState: "active"
    });

    return community;
  }

  update(groupId: Id, patch: Partial<CommunityRecord>): CommunityRecord {
    return this.platform.raw().database.update("groups", groupId, patch) as CommunityRecord;
  }

  markRelationshipTo(
    fromGroupId: Id,
    toGroupId: Id,
    type = "markedBySteward",
    note = "",
    markedBy: Id | null = null
  ): GroupRelationshipRecord {
    return this.platform.raw().database.create("groupRelationships", {
      id: groupRelationshipId(fromGroupId, toGroupId, type),
      fromGroupId,
      toGroupId,
      type,
      note,
      markedBy,
      source: "managed-access-layer"
    }) as GroupRelationshipRecord;
  }
}
