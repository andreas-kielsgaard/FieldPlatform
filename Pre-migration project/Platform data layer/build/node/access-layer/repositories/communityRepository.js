"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityRepository = void 0;
const community_1 = require("../models/community");
const domainUtils_1 = require("../utils/domainUtils");
class CommunityRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getGroup(id);
        if (!record)
            throw new Error(`Community not found: ${id}`);
        return new community_1.Community(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listGroups()
            .map(record => new community_1.Community(this.platform, record.id));
    }
    create(data, createdBy) {
        const creatorId = (0, domainUtils_1.idOf)(createdBy);
        const record = this.platform.communityManagement.create(data, creatorId);
        return new community_1.Community(this.platform, record.id);
    }
}
exports.CommunityRepository = CommunityRepository;
