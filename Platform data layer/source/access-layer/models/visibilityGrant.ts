import type { PlatformDomain } from "../platformDomain";
import type { Id, VisibilityGrantRecord, VisibilityQuery } from "../types";

export class VisibilityGrant {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): VisibilityGrantRecord {
    return this.platform.raw().queries.getVisibilityGrant(this.id) as VisibilityGrantRecord;
  }

  isActive(): boolean {
    return this.data().status === "active";
  }

  revoke(revokedBy?: Id): VisibilityGrant {
    this.platform.dataShares.revokeGrant(this.id, revokedBy);
    return this;
  }

  covers(query: VisibilityQuery): boolean {
    const grant = this.data();
    if (grant.status !== "active") return false;
    if (grant.subjectType !== query.subjectType || grant.subjectId !== query.subjectId) return false;
    if (!grant.facets.includes(query.facet)) return false;
    if (query.purpose && grant.purpose !== query.purpose) return false;
    if (query.recipientScope && grant.recipientScope !== query.recipientScope && grant.recipientScope !== "public") return false;
    if (query.recipientId && (grant.recipientIds || []).length > 0 && !(grant.recipientIds || []).includes(query.recipientId)) return false;
    if (grant.contextType || grant.contextId) return grant.contextType === query.contextType && grant.contextId === query.contextId;
    return true;
  }
}
