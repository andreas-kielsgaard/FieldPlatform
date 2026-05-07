import type { PlatformDomain } from "../platformDomain";
import type { Id, ParticipationEdgeRecord } from "../types";
import { defaultParticipationEdge } from "../utils/recordFactories";

export class ParticipationService {
  constructor(private readonly platform: PlatformDomain) {}

  setEdge(personId: Id, groupId: Id, patch: Partial<ParticipationEdgeRecord>): ParticipationEdgeRecord {
    const existing = this.platform.raw().queries.getParticipationEdge(personId, groupId) as ParticipationEdgeRecord | null;
    if (existing) {
      return this.platform.raw().database.update("participationEdges", existing.id, patch) as ParticipationEdgeRecord;
    }

    return this.platform.raw().database.create("participationEdges", {
      ...defaultParticipationEdge(personId, groupId),
      ...patch,
      personId,
      groupId
    }) as ParticipationEdgeRecord;
  }

  followGroup(personId: Id, groupId: Id): ParticipationEdgeRecord {
    return this.setEdge(personId, groupId, {
      relationshipState: "curious",
      accessLevel: "known",
      recency: 35,
      frequency: 10,
      visibility: "visibleToStewards",
      decayState: "active"
    });
  }

  makeDormant(personId: Id, groupId: Id): ParticipationEdgeRecord {
    return this.setEdge(personId, groupId, {
      relationshipState: "dormant",
      decayState: "dormant",
      recency: 0
    });
  }

  reactivate(personId: Id, groupId: Id): ParticipationEdgeRecord {
    return this.setEdge(personId, groupId, {
      relationshipState: "curious",
      decayState: "reactivating",
      recency: 25,
      visibility: "visibleToStewards"
    });
  }
}
