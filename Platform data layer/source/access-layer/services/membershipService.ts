import type { PlatformDomain } from "../platformDomain";
import type { Id, MembershipRequestRecord, ParticipationEdgeRecord } from "../types";

export class MembershipService {
  constructor(private readonly platform: PlatformDomain) {}

  request(personId: Id, groupId: Id, note = ""): MembershipRequestRecord {
    const request = this.platform.raw().database.create("membershipRequests", {
      personId,
      groupId,
      status: "pending",
      note
    }) as MembershipRequestRecord;

    this.platform.participation.setEdge(personId, groupId, {
      relationshipState: "curious",
      accessLevel: "requested",
      visibility: "visibleToStewards",
      recency: 45,
      decayState: "active"
    });

    return request;
  }

  approve(requestId: Id, approverId: Id): ParticipationEdgeRecord {
    const request = this.platform.raw().database.get("membershipRequests", requestId) as MembershipRequestRecord | null;
    if (!request) throw new Error(`Membership request not found: ${requestId}`);

    this.platform.raw().database.update("membershipRequests", requestId, {
      status: "approved",
      approvedBy: approverId
    });

    return this.platform.participation.setEdge(request.personId, request.groupId, {
      relationshipState: "recurring",
      accessLevel: "member",
      visibility: "visibleToStewards",
      recency: 60,
      frequency: 35,
      trustLevel: 35,
      normFamiliarity: "familiar",
      socialEmbeddedness: "light",
      decayState: "active"
    });
  }
}
