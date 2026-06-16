"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataShareRequest = void 0;
const visibilityGrant_1 = require("./visibilityGrant");
class DataShareRequest {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().queries.getDataShareRequest(this.id);
    }
    accept(acceptedBy) {
        this.platform.dataShares.acceptRequest(this.id, acceptedBy);
        return this;
    }
    revoke(revokedBy) {
        this.platform.dataShares.revokeRequest(this.id, revokedBy);
        return this;
    }
    visibilityGrants() {
        return this.platform.dataShares.grantsCoveringRequest(this.id)
            .map(grant => new visibilityGrant_1.VisibilityGrant(this.platform, grant.id));
    }
}
exports.DataShareRequest = DataShareRequest;
