"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipService = void 0;
class MembershipService {
    constructor(platform) {
        this.platform = platform;
    }
    request(personId, groupId, note = "") {
        const request = this.platform.raw().database.create("membershipRequests", {
            personId,
            groupId,
            status: "pending",
            note
        });
        this.platform.participation.setEdge(personId, groupId, {
            relationshipState: "curious",
            accessLevel: "requested",
            visibility: "visibleToStewards",
            recency: 45,
            decayState: "active"
        });
        return request;
    }
    approve(requestId, approverId) {
        const request = this.platform.raw().database.get("membershipRequests", requestId);
        if (!request)
            throw new Error(`Membership request not found: ${requestId}`);
        this.platform.raw().database.update("membershipRequests", requestId, {
            status: "approved",
            approvedBy: approverId
        });
        return this.platform.participation.setEdge(request.personId, request.groupId, {
            relationshipState: "recurring",
            accessLevel: "member",
            visibility: "visibleToStewards",
            recency: 60,
            frequency: 35,
            trustLevel: 35,
            normFamiliarity: "familiar",
            socialEmbeddedness: "light",
            decayState: "active"
        });
    }
}
exports.MembershipService = MembershipService;
