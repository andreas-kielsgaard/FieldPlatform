import type { PlatformDomain } from "../platformDomain";
import type { Id, ParticipationEdgeRecord } from "../types";
import { Community } from "./community";
import { User } from "./user";
export declare class ParticipationEdge {
    private readonly platform;
    readonly id: Id;
    constructor(platform: PlatformDomain, id: Id);
    data(): ParticipationEdgeRecord;
    user(): User;
    community(): Community;
    strength(): number;
    makeDormant(): ParticipationEdge;
    reactivate(): ParticipationEdge;
    update(patch: Partial<ParticipationEdgeRecord>): ParticipationEdge;
}
