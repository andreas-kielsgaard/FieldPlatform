"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRelationRepository = void 0;
const fieldRelation_1 = require("../models/fieldRelation");
class FieldRelationRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getFieldRelation(id);
        if (!record)
            throw new Error(`FieldRelation not found: ${id}`);
        return new fieldRelation_1.FieldRelation(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listFieldRelations()
            .map(record => new fieldRelation_1.FieldRelation(this.platform, record.id));
    }
    forObject(type, id) {
        return this.platform.raw().queries.getFieldRelationsForObject(type, id)
            .map(record => new fieldRelation_1.FieldRelation(this.platform, record.id));
    }
    between(sourceType, sourceId, targetType, targetId) {
        return this.platform.raw().queries.getFieldRelationsBetween(sourceType, sourceId, targetType, targetId)
            .map(record => new fieldRelation_1.FieldRelation(this.platform, record.id));
    }
    suggest(data, suggestedBy) {
        const record = this.platform.fieldRelationService.suggest(data, suggestedBy);
        return new fieldRelation_1.FieldRelation(this.platform, record.id);
    }
    accept(id, reviewerId, note = "") {
        const record = this.platform.fieldRelationService.accept(id, reviewerId, note);
        return new fieldRelation_1.FieldRelation(this.platform, record.id);
    }
    refine(id, reviewerId, patch, note = "") {
        const record = this.platform.fieldRelationService.refine(id, reviewerId, patch, note);
        return new fieldRelation_1.FieldRelation(this.platform, record.id);
    }
    decline(id, reviewerId, note = "") {
        const record = this.platform.fieldRelationService.decline(id, reviewerId, note);
        return new fieldRelation_1.FieldRelation(this.platform, record.id);
    }
    redirect(id, reviewerId, targetType, targetId, note = "") {
        const record = this.platform.fieldRelationService.redirect(id, reviewerId, targetType, targetId, note);
        return new fieldRelation_1.FieldRelation(this.platform, record.id);
    }
    markComputedOnly(id, reviewerId, note = "") {
        const record = this.platform.fieldRelationService.markComputedOnly(id, reviewerId, note);
        return new fieldRelation_1.FieldRelation(this.platform, record.id);
    }
    forReviewAuthority(type, id) {
        return this.platform.raw().queries.getFieldRelationsForReviewAuthority(type, id)
            .map(record => new fieldRelation_1.FieldRelation(this.platform, record.id));
    }
    pendingForCommunity(communityId) {
        return this.platform.raw().queries.getPendingFieldRelationsForReviewAuthority("community", communityId)
            .map(record => new fieldRelation_1.FieldRelation(this.platform, record.id));
    }
}
exports.FieldRelationRepository = FieldRelationRepository;
