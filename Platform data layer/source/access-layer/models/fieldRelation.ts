import type { PlatformDomain } from "../platformDomain";
import type { FieldRelationRecord, Id, MovementType, ObjectType } from "../types";
import { clone } from "../utils/domainUtils";

export class FieldRelation {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): FieldRelationRecord {
    return this.platform.raw().queries.getFieldRelation(this.id) as FieldRelationRecord;
  }

  source(): unknown {
    const record = this.data();
    return objectFor(this.platform, record.sourceType, record.sourceId);
  }

  target(): unknown {
    const record = this.data();
    return objectFor(this.platform, record.targetType, record.targetId);
  }

  isPending(): boolean {
    return this.data().status === "suggested";
  }

  isAccepted(): boolean {
    return ["accepted", "refined"].includes(this.data().status);
  }

  // This is a simple visibility-context check, not full user-aware access control.
  isVisibleTo(visibilityContext: string | { visibility?: string } = "public"): boolean {
    const relation = this.data();
    if (relation.visibility === "public") return true;
    const context = typeof visibilityContext === "string" ? visibilityContext : visibilityContext.visibility || "private";
    if (relation.visibility === "private") return context === "private";
    if (relation.visibility === "visible_to_stewards") return ["private", "visible_to_stewards"].includes(context);
    if (relation.visibility === "visible_to_members") return ["private", "visible_to_stewards", "visible_to_members"].includes(context);
    return false;
  }

  explanation(): unknown {
    return this.platform.raw().calculations.relationExplanation(this.id);
  }

  movementOptions(): MovementType[] {
    return this.platform.raw().calculations.movementOptionsForRelation(this.id) as MovementType[];
  }

  reviews(): unknown[] {
    return clone(this.platform.raw().queries.getRelationReviewsForRelation(this.id) || []);
  }
}

function objectFor(platform: PlatformDomain, objectType: ObjectType, objectId: Id): unknown {
  if (objectType === "person") return platform.users.get(objectId);
  if (objectType === "community") return platform.communities.get(objectId);
  if (objectType === "event") return platform.events.get(objectId);
  if (objectType === "venue") return platform.venues.get(objectId);
  if (objectType === "generatedField") return platform.generatedFields.get(objectId);
  if (objectType === "festival") {
    return platform.raw().queries.getFestival(objectId);
  }
  if (objectType === "practice" || objectType === "tag") return { id: objectId, objectType };
  return { id: objectId, objectType };
}
