"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataShareService = void 0;
class DataShareService {
    constructor(platform) {
        this.platform = platform;
    }
    createRequest(data) {
        const now = this.now();
        return this.platform.raw().database.create("dataShareRequests", {
            ...data,
            status: data.status || "pending",
            requirementLevel: data.requirementLevel || "optional_before_action",
            recipientIds: data.recipientIds || [],
            createdAt: data.createdAt || now,
            updatedAt: now
        });
    }
    acceptRequest(id, acceptedBy) {
        const current = this.getRequestRecord(id);
        if (current.status === "revoked")
            throw new Error(`Cannot accept revoked DataShareRequest: ${id}`);
        const now = this.now();
        const request = this.platform.raw().database.update("dataShareRequests", id, {
            status: "accepted",
            acceptedBy,
            acceptedAt: current.acceptedAt || now,
            updatedAt: now
        });
        const existingGrant = this.activeSourceGrant(request.id);
        const grantPatch = this.grantFromRequest(request, existingGrant === null || existingGrant === void 0 ? void 0 : existingGrant.id);
        const grant = existingGrant
            ? this.platform.raw().database.update("visibilityGrants", existingGrant.id, {
                ...grantPatch,
                status: "active",
                updatedAt: now
            })
            : this.platform.raw().database.create("visibilityGrants", grantPatch);
        return { request, grant };
    }
    revokeRequest(id, revokedBy) {
        const current = this.getRequestRecord(id);
        const now = this.now();
        const request = this.platform.raw().database.update("dataShareRequests", id, {
            status: "revoked",
            revokedBy,
            revokedAt: current.revokedAt || now,
            updatedAt: now
        });
        this.platform.raw().queries.listVisibilityGrants()
            .filter((grant) => grant.sourceRequestId === id && grant.status === "active")
            .forEach((grant) => {
            this.revokeGrant(grant.id, revokedBy);
        });
        return request;
    }
    createGrant(data) {
        const now = this.now();
        return this.platform.raw().database.create("visibilityGrants", {
            ...data,
            status: data.status || "active",
            recipientIds: data.recipientIds || [],
            createdAt: data.createdAt || now,
            updatedAt: now
        });
    }
    revokeGrant(id, revokedBy) {
        const current = this.getGrantRecord(id);
        const now = this.now();
        return this.platform.raw().database.update("visibilityGrants", id, {
            status: "revoked",
            revokedBy,
            revokedAt: current.revokedAt || now,
            updatedAt: now
        });
    }
    grantsCoveringRequest(requestId) {
        const request = this.getRequestRecord(requestId);
        return this.platform.raw().queries.listVisibilityGrants()
            .filter(grant => this.grantCoversRequest(grant, request));
    }
    coverageForRequest(requestId) {
        const request = this.getRequestRecord(requestId);
        const grants = this.grantsCoveringRequest(request.id);
        return {
            request,
            grants,
            isCovered: grants.length > 0
        };
    }
    coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel) {
        return this.platform.raw().queries.getDataShareRequestsForContext(contextType, contextId)
            .filter(request => request.subjectType === subjectType && request.subjectId === subjectId)
            .filter(request => !requirementLevel || request.requirementLevel === requirementLevel)
            .map(request => this.coverageForRequest(request.id));
    }
    missingRequestsForContext(contextType, contextId, subjectType, subjectId, requirementLevel) {
        return this.coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel)
            .filter(coverage => !coverage.isCovered)
            .map(coverage => coverage.request);
    }
    canSee(query) {
        return this.platform.raw().queries.listVisibilityGrants()
            .some(grant => this.grantCoversQuery(grant, query));
    }
    getRequestRecord(id) {
        const request = this.platform.raw().queries.getDataShareRequest(id);
        if (!request)
            throw new Error(`DataShareRequest not found: ${id}`);
        return request;
    }
    getGrantRecord(id) {
        const grant = this.platform.raw().queries.getVisibilityGrant(id);
        if (!grant)
            throw new Error(`VisibilityGrant not found: ${id}`);
        return grant;
    }
    activeSourceGrant(requestId) {
        return this.platform.raw().queries.listVisibilityGrants()
            .find(grant => grant.sourceRequestId === requestId && grant.status === "active") || null;
    }
    grantFromRequest(request, id) {
        return {
            id,
            sourceRequestId: request.id,
            subjectType: request.subjectType,
            subjectId: request.subjectId,
            contextType: request.contextType,
            contextId: request.contextId,
            facets: [...request.facets],
            recipientScope: request.recipientScope,
            recipientIds: [...(request.recipientIds || [])],
            purpose: request.purpose,
            status: "active",
            source: "accepted_data_share_request",
            audienceBehavior: request.materialChangeBehavior || "requires_update_on_change",
            createdAt: request.acceptedAt || this.now(),
            updatedAt: this.now(),
            expiresAt: request.expiresAt
        };
    }
    grantCoversRequest(grant, request) {
        if (!this.isActiveGrant(grant))
            return false;
        if (grant.subjectType !== request.subjectType || grant.subjectId !== request.subjectId)
            return false;
        if (grant.purpose !== request.purpose)
            return false;
        if (grant.recipientScope !== request.recipientScope && grant.recipientScope !== "public")
            return false;
        if (!this.contextCovers(grant.contextType, grant.contextId, request.contextType, request.contextId))
            return false;
        if (!this.facetsInclude(grant.facets, request.facets))
            return false;
        return this.recipientIdsCover(grant.recipientIds || [], request.recipientIds || []);
    }
    grantCoversQuery(grant, query) {
        if (!this.isActiveGrant(grant, query.at))
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
        return this.contextCovers(grant.contextType, grant.contextId, query.contextType, query.contextId);
    }
    isActiveGrant(grant, at = new Date()) {
        if (grant.status !== "active")
            return false;
        if (!grant.expiresAt)
            return true;
        const timestamp = typeof at === "string" ? new Date(at).getTime() : at.getTime();
        return new Date(grant.expiresAt).getTime() > timestamp;
    }
    contextCovers(grantType, grantId, requestedType, requestedId) {
        if (!grantType && !grantId)
            return true;
        return grantType === requestedType && grantId === requestedId;
    }
    facetsInclude(grantFacets, requestedFacets) {
        return requestedFacets.every(facet => grantFacets.includes(facet));
    }
    recipientIdsCover(grantRecipientIds, requestedRecipientIds) {
        if (requestedRecipientIds.length === 0)
            return true;
        if (grantRecipientIds.length === 0)
            return true;
        return requestedRecipientIds.every(id => grantRecipientIds.includes(id));
    }
    now() {
        return new Date().toISOString();
    }
}
exports.DataShareService = DataShareService;
