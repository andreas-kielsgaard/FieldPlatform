export function relationsForObject(snapshot: any, objectType: any, objectId: any): any;
export function acceptedRelationsForObject(snapshot: any, objectType: any, objectId: any): any;
export function activeRelationsForObject(snapshot: any, objectType: any, objectId: any): any;
export function pendingRelationsForReviewAuthority(snapshot: any, authorityType: any, authorityId: any): any;
export function movementOptionsForRelation(snapshot: any, relationId: any): any[];
export function relationExplanation(snapshot: any, relationId: any): {
    relationId: any;
    status: any;
    provenance: any;
    relationKind: any;
    source: {
        objectType: any;
        objectId: any;
        label: any;
    };
    target: {
        objectType: any;
        objectId: any;
        label: any;
    };
    reason: any;
    evidence: any;
    holdTypes: any;
    movementOptions: any[];
} | null;
export function holdSignalsForObject(snapshot: any, objectType: any, objectId: any): {
    holdType: string;
    count: any;
}[];
