import type { PlatformDomain } from "../platformDomain";
import type { Id, MembershipRequestRecord, ParticipationEdgeRecord } from "../types";
export declare class MembershipService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    request(personId: Id, groupId: Id, note?: string): MembershipRequestRecord;
    approve(requestId: Id, approverId: Id): ParticipationEdgeRecord;
}
