"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataShareRequestRepository = void 0;
const dataShareRequest_1 = require("../models/dataShareRequest");
class DataShareRequestRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getDataShareRequest(id);
        if (!record)
            throw new Error(`DataShareRequest not found: ${id}`);
        return new dataShareRequest_1.DataShareRequest(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listDataShareRequests()
            .map(record => new dataShareRequest_1.DataShareRequest(this.platform, record.id));
    }
    forSubject(subjectType, subjectId) {
        return this.platform.raw().queries.getDataShareRequestsForSubject(subjectType, subjectId)
            .map(record => new dataShareRequest_1.DataShareRequest(this.platform, record.id));
    }
    forContext(contextType, contextId) {
        return this.platform.raw().queries.getDataShareRequestsForContext(contextType, contextId)
            .map(record => new dataShareRequest_1.DataShareRequest(this.platform, record.id));
    }
    create(data) {
        const record = this.platform.dataShares.createRequest(data);
        return new dataShareRequest_1.DataShareRequest(this.platform, record.id);
    }
    accept(id, acceptedBy) {
        const { request } = this.platform.dataShares.acceptRequest(id, acceptedBy);
        return new dataShareRequest_1.DataShareRequest(this.platform, request.id);
    }
    revoke(id, revokedBy) {
        const request = this.platform.dataShares.revokeRequest(id, revokedBy);
        return new dataShareRequest_1.DataShareRequest(this.platform, request.id);
    }
}
exports.DataShareRequestRepository = DataShareRequestRepository;
