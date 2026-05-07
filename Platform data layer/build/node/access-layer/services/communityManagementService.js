"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityManagementService = void 0;
const domainUtils_1 = require("../utils/domainUtils");
const recordFactories_1 = require("../utils/recordFactories");
class CommunityManagementService {
    constructor(platform) {
        this.platform = platform;
    }
    create(data, createdBy) {
        const normalized = (0, domainUtils_1.normalizeCommunityDraft)({
            ...data,
            creatorId: createdBy,
            stewards: (0, domainUtils_1.addUnique)(data.stewards || [], createdBy)
        });
        const community = this.platform.raw().database.create("groups", normalized);
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
    update(groupId, patch) {
        return this.platform.raw().database.update("groups", groupId, patch);
    }
    markRelationshipTo(fromGroupId, toGroupId, type = "markedBySteward", note = "", markedBy = null) {
        return this.platform.raw().database.create("groupRelationships", {
            id: (0, recordFactories_1.groupRelationshipId)(fromGroupId, toGroupId, type),
            fromGroupId,
            toGroupId,
            type,
            note,
            markedBy,
            source: "managed-access-layer"
        });
    }
}
exports.CommunityManagementService = CommunityManagementService;
