"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRelation = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class FieldRelation {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().queries.getFieldRelation(this.id);
    }
    source() {
        const record = this.data();
        return objectFor(this.platform, record.sourceType, record.sourceId);
    }
    target() {
        const record = this.data();
        return objectFor(this.platform, record.targetType, record.targetId);
    }
    isPending() {
        return this.data().status === "suggested";
    }
    isAccepted() {
        return ["accepted", "refined"].includes(this.data().status);
    }
    // This is a simple visibility-context check, not full user-aware access control.
    isVisibleTo(visibilityContext = "public") {
        const relation = this.data();
        if (relation.visibility === "public")
            return true;
        const context = typeof visibilityContext === "string" ? visibilityContext : visibilityContext.visibility || "private";
        if (relation.visibility === "private")
            return context === "private";
        if (relation.visibility === "visible_to_stewards")
            return ["private", "visible_to_stewards"].includes(context);
        if (relation.visibility === "visible_to_members")
            return ["private", "visible_to_stewards", "visible_to_members"].includes(context);
        return false;
    }
    explanation() {
        return this.platform.raw().calculations.relationExplanation(this.id);
    }
    movementOptions() {
        return this.platform.raw().calculations.movementOptionsForRelation(this.id);
    }
    reviews() {
        return (0, domainUtils_1.clone)(this.platform.raw().queries.getRelationReviewsForRelation(this.id) || []);
    }
}
exports.FieldRelation = FieldRelation;
function objectFor(platform, objectType, objectId) {
    if (objectType === "person")
        return platform.users.get(objectId);
    if (objectType === "community")
        return platform.communities.get(objectId);
    if (objectType === "event")
        return platform.events.get(objectId);
    if (objectType === "venue")
        return platform.venues.get(objectId);
    if (objectType === "generatedField")
        return platform.generatedFields.get(objectId);
    if (objectType === "festival") {
        return platform.raw().queries.getFestival(objectId);
    }
    if (objectType === "practice" || objectType === "tag")
        return { id: objectId, objectType };
    return { id: objectId, objectType };
}
