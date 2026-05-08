import { FieldRelation } from "../models/fieldRelation";
import type { PlatformDomain } from "../platformDomain";
import type { FieldRelationRecord, Id, ObjectType, PartialFieldRelationDraft } from "../types";

export class FieldRelationRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): FieldRelation {
    const record = this.platform.raw().queries.getFieldRelation(id) as FieldRelationRecord | null;
    if (!record) throw new Error(`FieldRelation not found: ${id}`);
    return new FieldRelation(this.platform, id);
  }

  list(): FieldRelation[] {
    return (this.platform.raw().queries.listFieldRelations() as FieldRelationRecord[])
      .map(record => new FieldRelation(this.platform, record.id));
  }

  forObject(type: ObjectType, id: Id): FieldRelation[] {
    return (this.platform.raw().queries.getFieldRelationsForObject(type, id) as FieldRelationRecord[])
      .map(record => new FieldRelation(this.platform, record.id));
  }

  between(sourceType: ObjectType, sourceId: Id, targetType: ObjectType, targetId: Id): FieldRelation[] {
    return (this.platform.raw().queries.getFieldRelationsBetween(sourceType, sourceId, targetType, targetId) as FieldRelationRecord[])
      .map(record => new FieldRelation(this.platform, record.id));
  }

  suggest(data: PartialFieldRelationDraft, suggestedBy: Id): FieldRelation {
    const record = this.platform.fieldRelationService.suggest(data, suggestedBy);
    return new FieldRelation(this.platform, record.id);
  }

  accept(id: Id, reviewerId: Id, note = ""): FieldRelation {
    const record = this.platform.fieldRelationService.accept(id, reviewerId, note);
    return new FieldRelation(this.platform, record.id);
  }

  refine(id: Id, reviewerId: Id, patch: Partial<FieldRelationRecord>, note = ""): FieldRelation {
    const record = this.platform.fieldRelationService.refine(id, reviewerId, patch, note);
    return new FieldRelation(this.platform, record.id);
  }

  decline(id: Id, reviewerId: Id, note = ""): FieldRelation {
    const record = this.platform.fieldRelationService.decline(id, reviewerId, note);
    return new FieldRelation(this.platform, record.id);
  }

  redirect(id: Id, reviewerId: Id, targetType: ObjectType, targetId: Id, note = ""): FieldRelation {
    const record = this.platform.fieldRelationService.redirect(id, reviewerId, targetType, targetId, note);
    return new FieldRelation(this.platform, record.id);
  }

  markComputedOnly(id: Id, reviewerId: Id, note = ""): FieldRelation {
    const record = this.platform.fieldRelationService.markComputedOnly(id, reviewerId, note);
    return new FieldRelation(this.platform, record.id);
  }

  forReviewAuthority(type: ObjectType, id: Id): FieldRelation[] {
    return (this.platform.raw().queries.getFieldRelationsForReviewAuthority(type, id) as FieldRelationRecord[])
      .map(record => new FieldRelation(this.platform, record.id));
  }

  pendingForCommunity(communityId: Id): FieldRelation[] {
    return (this.platform.raw().queries.getPendingFieldRelationsForReviewAuthority("community", communityId) as FieldRelationRecord[])
      .map(record => new FieldRelation(this.platform, record.id));
  }
}
