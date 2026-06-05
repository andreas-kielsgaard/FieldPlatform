"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityGrant = void 0;
class VisibilityGrant {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().queries.getVisibilityGrant(this.id);
    }
    isActive() {
        return this.data().status === "active";
    }
    revoke(revokedBy) {
        this.platform.dataShares.revokeGrant(this.id, revokedBy);
        return this;
    }
    covers(query) {
        const grant = this.data();
        if (grant.status !== "active")
            return false;
        if (grant.subjectType !== query.subjectType || grant.subjectId !== query.subjectId)
            return false;
        if (!grant.facets.includes(query.facet))
            return false;
        if (query.purpose && grant.purpose !== query.purpose)
            return false;
        if (query.recipientScope && grant.recipientScope !== query.recipientScope && grant.recipientScope !== "public")
            return false;
        if (query.recipientId && (grant.recipientIds || []).length > 0 && !(grant.recipientIds || []).includes(query.recipientId))
            return false;
        if (grant.contextType || grant.contextId)
            return grant.contextType === query.contextType && grant.contextId === query.contextId;
        return true;
    }
}
exports.VisibilityGrant = VisibilityGrant;
