import type { PlatformDomain } from "../platformDomain";
import type {
  FieldRelationDraft,
  FieldRelationRecord,
  Id,
  RelationReviewAction,
  RelationReviewRecord,
  RelationStatus
} from "../types";

export class FieldRelationService {
  constructor(private readonly platform: PlatformDomain) {}

  suggest(data: FieldRelationDraft, suggestedBy: Id): FieldRelationRecord {
    const now = timestamp();
    return this.platform.raw().database.create("fieldRelations", {
      relationStrength: 0,
      status: "suggested",
      provenance: "user_suggested",
      visibility: "visible_to_stewards",
      evidence: [],
      holdTypes: [],
      movementUnlocked: [],
      ...data,
      suggestedBy,
      createdAt: data.createdAt || now,
      updatedAt: now
    }) as FieldRelationRecord;
  }

  accept(id: Id, reviewerId: Id, note = ""): FieldRelationRecord {
    return this.reviewAndUpdate(id, reviewerId, "accept", { status: "accepted" }, note);
  }

  refine(id: Id, reviewerId: Id, patch: Partial<FieldRelationRecord>, note = ""): FieldRelationRecord {
    const { id: _ignoredId, ...safePatch } = patch;
    return this.reviewAndUpdate(id, reviewerId, "refine", { ...safePatch, status: "refined" }, note);
  }

  decline(id: Id, reviewerId: Id, note = ""): FieldRelationRecord {
    return this.reviewAndUpdate(id, reviewerId, "decline", { status: "declined", movementUnlocked: ["remain_observing"] }, note);
  }

  redirect(id: Id, reviewerId: Id, targetType: string, targetId: Id, note = ""): FieldRelationRecord {
    return this.reviewAndUpdate(id, reviewerId, "redirect", {
      targetType,
      targetId,
      status: "refined"
    }, note);
  }

  private reviewAndUpdate(
    id: Id,
    reviewerId: Id,
    action: RelationReviewAction,
    patch: Partial<FieldRelationRecord>,
    note = ""
  ): FieldRelationRecord {
    const current = this.platform.raw().queries.getFieldRelation(id) as FieldRelationRecord | null;
    if (!current) throw new Error(`FieldRelation not found: ${id}`);
    const previousStatus = current.status;
    const nextStatus = (patch.status || current.status) as RelationStatus;
    const updated = this.platform.raw().database.update("fieldRelations", id, {
      ...patch,
      reviewedBy: reviewerId,
      updatedAt: timestamp()
    }) as FieldRelationRecord;

    this.platform.raw().database.create("relationReviews", {
      fieldRelationId: id,
      reviewerId,
      action,
      previousStatus,
      nextStatus,
      note,
      refinedRelationKind: action === "refine" ? updated.relationKind : undefined,
      redirectedTargetType: action === "redirect" ? updated.targetType : undefined,
      redirectedTargetId: action === "redirect" ? updated.targetId : undefined,
      createdAt: timestamp()
    } as RelationReviewRecord);

    return updated;
  }
}

function timestamp(): string {
  return new Date().toISOString();
}
