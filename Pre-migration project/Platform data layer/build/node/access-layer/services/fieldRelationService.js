"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRelationService = void 0;
class FieldRelationService {
    constructor(platform) {
        this.platform = platform;
    }
    suggest(data, suggestedBy) {
        const now = timestamp();
        return this.platform.raw().database.create("fieldRelations", {
            relationStrength: 0,
            visibility: "visible_to_stewards",
            evidence: [],
            holdTypes: [],
            movementUnlocked: [],
            ...data,
            status: "suggested",
            provenance: "user_suggested",
            suggestedBy,
            createdAt: data.createdAt || now,
            updatedAt: now
        });
    }
    accept(id, reviewerId, note = "") {
        return this.reviewAndUpdate(id, reviewerId, "accept", { status: "accepted" }, note);
    }
    refine(id, reviewerId, patch, note = "") {
        const { id: _ignoredId, ...safePatch } = patch;
        return this.reviewAndUpdate(id, reviewerId, "refine", { ...safePatch, status: "refined" }, note);
    }
    decline(id, reviewerId, note = "") {
        return this.reviewAndUpdate(id, reviewerId, "decline", { status: "declined", movementUnlocked: ["remain_observing"] }, note);
    }
    redirect(id, reviewerId, targetType, targetId, note = "") {
        return this.reviewAndUpdate(id, reviewerId, "redirect", {
            targetType,
            targetId,
            status: "refined"
        }, note);
    }
    markComputedOnly(id, reviewerId, note = "") {
        return this.reviewAndUpdate(id, reviewerId, "mark_computed_only", {
            status: "computed",
            provenance: "calculated"
        }, note);
    }
    reviewAndUpdate(id, reviewerId, action, patch, note = "") {
        const current = this.platform.raw().queries.getFieldRelation(id);
        if (!current)
            throw new Error(`FieldRelation not found: ${id}`);
        const previousStatus = current.status;
        const nextStatus = (patch.status || current.status);
        const updated = this.platform.raw().database.update("fieldRelations", id, {
            ...patch,
            reviewedBy: reviewerId,
            updatedAt: timestamp()
        });
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
        });
        return updated;
    }
}
exports.FieldRelationService = FieldRelationService;
function timestamp() {
    return new Date().toISOString();
}
