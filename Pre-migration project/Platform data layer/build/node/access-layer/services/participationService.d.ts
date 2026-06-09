import type { PlatformDomain } from "../platformDomain";
import type { Id, ParticipationEdgeRecord } from "../types";
export declare class ParticipationService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    setEdge(personId: Id, groupId: Id, patch: Partial<ParticipationEdgeRecord>): ParticipationEdgeRecord;
    followGroup(personId: Id, groupId: Id): ParticipationEdgeRecord;
    makeDormant(personId: Id, groupId: Id): ParticipationEdgeRecord;
    reactivate(personId: Id, groupId: Id): ParticipationEdgeRecord;
}
