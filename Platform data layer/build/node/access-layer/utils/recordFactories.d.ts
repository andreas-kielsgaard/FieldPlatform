import type { Id, ParticipationEdgeRecord } from "../types";
export declare function edgeId(personId: Id, groupId: Id): Id;
export declare function managedObjectId(personId: Id, objectType: "event" | "group" | string, objectId: Id, roles: string[]): Id;
export declare function groupRelationshipId(fromGroupId: Id, toGroupId: Id, type: string): Id;
export declare function defaultParticipationEdge(personId: Id, groupId: Id): ParticipationEdgeRecord;
