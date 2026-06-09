import type {
  DataFacet,
  DataShareRequestDraft,
  DataShareRequestRecord,
  DataShareRequirementLevel,
  Id,
  ObjectType,
  VisibilityGrantDraft,
  VisibilityGrantRecord,
  VisibilityQuery
} from "../types";
import type { PlatformDomain } from "../platformDomain";

export interface DataShareAcceptance {
  request: DataShareRequestRecord;
  grant: VisibilityGrantRecord;
}

export interface DataShareCoverage {
  request: DataShareRequestRecord;
  grants: VisibilityGrantRecord[];
  isCovered: boolean;
}

export class DataShareService {
  constructor(private readonly platform: PlatformDomain) {}

  createRequest(data: DataShareRequestDraft): DataShareRequestRecord {
    const now = this.now();
    return this.platform.raw().database.create("dataShareRequests", {
      ...data,
      status: data.status || "pending",
      requirementLevel: data.requirementLevel || "optional_before_action",
      recipientIds: data.recipientIds || [],
      createdAt: data.createdAt || now,
      updatedAt: now
    }) as DataShareRequestRecord;
  }

  acceptRequest(id: Id, acceptedBy?: Id): DataShareAcceptance {
    const current = this.getRequestRecord(id);
    if (current.status === "revoked") throw new Error(`Cannot accept revoked DataShareRequest: ${id}`);

    const now = this.now();
    const request = this.platform.raw().database.update("dataShareRequests", id, {
      status: "accepted",
      acceptedBy,
      acceptedAt: current.acceptedAt || now,
      updatedAt: now
    }) as DataShareRequestRecord;

    const existingGrant = this.activeSourceGrant(request.id);
    const grantPatch = this.grantFromRequest(request, existingGrant?.id);
    const grant = existingGrant
      ? this.platform.raw().database.update("visibilityGrants", existingGrant.id, {
        ...grantPatch,
        status: "active",
        updatedAt: now
      }) as VisibilityGrantRecord
      : this.platform.raw().database.create("visibilityGrants", grantPatch) as VisibilityGrantRecord;

    return { request, grant };
  }

  revokeRequest(id: Id, revokedBy?: Id): DataShareRequestRecord {
    const current = this.getRequestRecord(id);
    const now = this.now();
    const request = this.platform.raw().database.update("dataShareRequests", id, {
      status: "revoked",
      revokedBy,
      revokedAt: current.revokedAt || now,
      updatedAt: now
    }) as DataShareRequestRecord;

    this.platform.raw().queries.listVisibilityGrants()
      .filter((grant: VisibilityGrantRecord) => grant.sourceRequestId === id && grant.status === "active")
      .forEach((grant: VisibilityGrantRecord) => {
        this.revokeGrant(grant.id, revokedBy);
      });

    return request;
  }

  createGrant(data: VisibilityGrantDraft): VisibilityGrantRecord {
    const now = this.now();
    return this.platform.raw().database.create("visibilityGrants", {
      ...data,
      status: data.status || "active",
      recipientIds: data.recipientIds || [],
      createdAt: data.createdAt || now,
      updatedAt: now
    }) as VisibilityGrantRecord;
  }

  revokeGrant(id: Id, revokedBy?: Id): VisibilityGrantRecord {
    const current = this.getGrantRecord(id);
    const now = this.now();
    return this.platform.raw().database.update("visibilityGrants", id, {
      status: "revoked",
      revokedBy,
      revokedAt: current.revokedAt || now,
      updatedAt: now
    }) as VisibilityGrantRecord;
  }

  grantsCoveringRequest(requestId: Id): VisibilityGrantRecord[] {
    const request = this.getRequestRecord(requestId);
    return (this.platform.raw().queries.listVisibilityGrants() as VisibilityGrantRecord[])
      .filter(grant => this.grantCoversRequest(grant, request));
  }

  coverageForRequest(requestId: Id): DataShareCoverage {
    const request = this.getRequestRecord(requestId);
    const grants = this.grantsCoveringRequest(request.id);
    return {
      request,
      grants,
      isCovered: grants.length > 0
    };
  }

  coverageForContext(
    contextType: ObjectType,
    contextId: Id,
    subjectType: ObjectType,
    subjectId: Id,
    requirementLevel?: DataShareRequirementLevel
  ): DataShareCoverage[] {
    return (this.platform.raw().queries.getDataShareRequestsForContext(contextType, contextId) as DataShareRequestRecord[])
      .filter(request => request.subjectType === subjectType && request.subjectId === subjectId)
      .filter(request => !requirementLevel || request.requirementLevel === requirementLevel)
      .map(request => this.coverageForRequest(request.id));
  }

  missingRequestsForContext(
    contextType: ObjectType,
    contextId: Id,
    subjectType: ObjectType,
    subjectId: Id,
    requirementLevel?: DataShareRequirementLevel
  ): DataShareRequestRecord[] {
    return this.coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel)
      .filter(coverage => !coverage.isCovered)
      .map(coverage => coverage.request);
  }

  canSee(query: VisibilityQuery): boolean {
    return (this.platform.raw().queries.listVisibilityGrants() as VisibilityGrantRecord[])
      .some(grant => this.grantCoversQuery(grant, query));
  }

  private getRequestRecord(id: Id): DataShareRequestRecord {
    const request = this.platform.raw().queries.getDataShareRequest(id) as DataShareRequestRecord | null;
    if (!request) throw new Error(`DataShareRequest not found: ${id}`);
    return request;
  }

  private getGrantRecord(id: Id): VisibilityGrantRecord {
    const grant = this.platform.raw().queries.getVisibilityGrant(id) as VisibilityGrantRecord | null;
    if (!grant) throw new Error(`VisibilityGrant not found: ${id}`);
    return grant;
  }

  private activeSourceGrant(requestId: Id): VisibilityGrantRecord | null {
    return (this.platform.raw().queries.listVisibilityGrants() as VisibilityGrantRecord[])
      .find(grant => grant.sourceRequestId === requestId && grant.status === "active") || null;
  }

  private grantFromRequest(request: DataShareRequestRecord, id?: Id): VisibilityGrantDraft {
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

  private grantCoversRequest(grant: VisibilityGrantRecord, request: DataShareRequestRecord): boolean {
    if (!this.isActiveGrant(grant)) return false;
    if (grant.subjectType !== request.subjectType || grant.subjectId !== request.subjectId) return false;
    if (grant.purpose !== request.purpose) return false;
    if (grant.recipientScope !== request.recipientScope && grant.recipientScope !== "public") return false;
    if (!this.contextCovers(grant.contextType, grant.contextId, request.contextType, request.contextId)) return false;
    if (!this.facetsInclude(grant.facets, request.facets)) return false;
    return this.recipientIdsCover(grant.recipientIds || [], request.recipientIds || []);
  }

  private grantCoversQuery(grant: VisibilityGrantRecord, query: VisibilityQuery): boolean {
    if (!this.isActiveGrant(grant, query.at)) return false;
    if (grant.subjectType !== query.subjectType || grant.subjectId !== query.subjectId) return false;
    if (!grant.facets.includes(query.facet)) return false;
    if (query.purpose && grant.purpose !== query.purpose) return false;
    if (query.recipientScope && grant.recipientScope !== query.recipientScope && grant.recipientScope !== "public") return false;
    if (query.recipientId && (grant.recipientIds || []).length > 0 && !(grant.recipientIds || []).includes(query.recipientId)) return false;
    return this.contextCovers(grant.contextType, grant.contextId, query.contextType, query.contextId);
  }

  private isActiveGrant(grant: VisibilityGrantRecord, at: string | Date = new Date()): boolean {
    if (grant.status !== "active") return false;
    if (!grant.expiresAt) return true;
    const timestamp = typeof at === "string" ? new Date(at).getTime() : at.getTime();
    return new Date(grant.expiresAt).getTime() > timestamp;
  }

  private contextCovers(
    grantType: string | undefined,
    grantId: Id | undefined,
    requestedType: string | undefined,
    requestedId: Id | undefined
  ): boolean {
    if (!grantType && !grantId) return true;
    return grantType === requestedType && grantId === requestedId;
  }

  private facetsInclude(grantFacets: DataFacet[], requestedFacets: DataFacet[]): boolean {
    return requestedFacets.every(facet => grantFacets.includes(facet));
  }

  private recipientIdsCover(grantRecipientIds: Id[], requestedRecipientIds: Id[]): boolean {
    if (requestedRecipientIds.length === 0) return true;
    if (grantRecipientIds.length === 0) return true;
    return requestedRecipientIds.every(id => grantRecipientIds.includes(id));
  }

  private now(): string {
    return new Date().toISOString();
  }
}
