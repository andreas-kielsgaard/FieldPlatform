"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityGrantRepository = void 0;
const visibilityGrant_1 = require("../models/visibilityGrant");
class VisibilityGrantRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getVisibilityGrant(id);
        if (!record)
            throw new Error(`VisibilityGrant not found: ${id}`);
        return new visibilityGrant_1.VisibilityGrant(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listVisibilityGrants()
            .map(record => new visibilityGrant_1.VisibilityGrant(this.platform, record.id));
    }
    forSubject(subjectType, subjectId) {
        return this.platform.raw().queries.getVisibilityGrantsForSubject(subjectType, subjectId)
            .map(record => new visibilityGrant_1.VisibilityGrant(this.platform, record.id));
    }
    forContext(contextType, contextId) {
        return this.platform.raw().queries.getVisibilityGrantsForContext(contextType, contextId)
            .map(record => new visibilityGrant_1.VisibilityGrant(this.platform, record.id));
    }
    create(data) {
        const record = this.platform.dataShares.createGrant(data);
        return new visibilityGrant_1.VisibilityGrant(this.platform, record.id);
    }
    revoke(id, revokedBy) {
        const record = this.platform.dataShares.revokeGrant(id, revokedBy);
        return new visibilityGrant_1.VisibilityGrant(this.platform, record.id);
    }
    canSee(query) {
        return this.platform.dataShares.canSee(query);
    }
}
exports.VisibilityGrantRepository = VisibilityGrantRepository;
