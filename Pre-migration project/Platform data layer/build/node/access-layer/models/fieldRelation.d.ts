import type { PlatformDomain } from "../platformDomain";
import type { FieldRelationRecord, Id, MovementType } from "../types";
export declare class FieldRelation {
    private readonly platform;
    readonly id: Id;
    constructor(platform: PlatformDomain, id: Id);
    data(): FieldRelationRecord;
    source(): unknown;
    target(): unknown;
    isPending(): boolean;
    isAccepted(): boolean;
    isVisibleTo(visibilityContext?: string | {
        visibility?: string;
    }): boolean;
    explanation(): unknown;
    movementOptions(): MovementType[];
    reviews(): unknown[];
}
