"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommunityAccess = void 0;
class UserCommunityAccess {
    constructor(platform, user) {
        this.platform = platform;
        this.user = user;
    }
    followed() {
        return this.edgesByState(["observing", "curious", "occasional"]);
    }
    member() {
        return this.user.participationEdges()
            .filter(edge => ["member", "trusted", "core", "requested"].includes(edge.data().accessLevel))
            .map(edge => edge.community());
    }
    committed() {
        return this.edgesByState(["recurring", "contributor", "facilitator", "steward"]);
    }
    dormant() {
        return this.user.participationEdges()
            .filter(edge => edge.data().relationshipState === "dormant" || edge.data().decayState === "dormant" || edge.data().decayState === "fading")
            .map(edge => edge.community());
    }
    managed() {
        return this.platform.communities.list().filter(community => community.canBeManagedBy(this.user));
    }
    edgesByState(states) {
        return this.user.participationEdges()
            .filter(edge => states.includes(edge.data().relationshipState))
            .map(edge => edge.community());
    }
}
exports.UserCommunityAccess = UserCommunityAccess;
