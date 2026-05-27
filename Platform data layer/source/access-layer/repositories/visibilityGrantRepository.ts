import { VisibilityGrant } from "../models/visibilityGrant";
import type { PlatformDomain } from "../platformDomain";
import type { Id, ObjectType, VisibilityGrantDraft, VisibilityGrantRecord, VisibilityQuery } from "../types";

export class VisibilityGrantRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): VisibilityGrant {
    const record = this.platform.raw().queries.getVisibilityGrant(id) as VisibilityGrantRecord | null;
    if (!record) throw new Error(`VisibilityGrant not found: ${id}`);
    return new VisibilityGrant(this.platform, id);
  }

  list(): VisibilityGrant[] {
    return (this.platform.raw().queries.listVisibilityGrants() as VisibilityGrantRecord[])
      .map(record => new VisibilityGrant(this.platform, record.id));
  }

  forSubject(subjectType: ObjectType, subjectId: Id): VisibilityGrant[] {
    return (this.platform.raw().queries.getVisibilityGrantsForSubject(subjectType, subjectId) as VisibilityGrantRecord[])
      .map(record => new VisibilityGrant(this.platform, record.id));
  }

  forContext(contextType: ObjectType, contextId: Id): VisibilityGrant[] {
    return (this.platform.raw().queries.getVisibilityGrantsForContext(contextType, contextId) as VisibilityGrantRecord[])
      .map(record => new VisibilityGrant(this.platform, record.id));
  }

  create(data: VisibilityGrantDraft): VisibilityGrant {
    const record = this.platform.dataShares.createGrant(data);
    return new VisibilityGrant(this.platform, record.id);
  }

  revoke(id: Id, revokedBy?: Id): VisibilityGrant {
    const record = this.platform.dataShares.revokeGrant(id, revokedBy);
    return new VisibilityGrant(this.platform, record.id);
  }

  canSee(query: VisibilityQuery): boolean {
    return this.platform.dataShares.canSee(query);
  }
}
