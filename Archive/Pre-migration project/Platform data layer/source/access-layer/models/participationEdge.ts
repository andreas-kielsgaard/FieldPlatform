import type { PlatformDomain } from "../platformDomain";
import type { Id, ParticipationEdgeRecord } from "../types";
import { Community } from "./community";
import { User } from "./user";

export class ParticipationEdge {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): ParticipationEdgeRecord {
    return this.platform.raw().database.get("participationEdges", this.id) as ParticipationEdgeRecord;
  }

  user(): User {
    return this.platform.users.get(this.data().personId);
  }

  community(): Community {
    return this.platform.communities.get(this.data().groupId);
  }

  strength(): number {
    return Number(this.platform.raw().calculations.engagementStrength(this.id));
  }

  makeDormant(): ParticipationEdge {
    const record = this.platform.participation.makeDormant(this.data().personId, this.data().groupId);
    return new ParticipationEdge(this.platform, record.id);
  }

  reactivate(): ParticipationEdge {
    const record = this.platform.participation.reactivate(this.data().personId, this.data().groupId);
    return new ParticipationEdge(this.platform, record.id);
  }

  update(patch: Partial<ParticipationEdgeRecord>): ParticipationEdge {
    this.platform.participation.setEdge(this.data().personId, this.data().groupId, patch);
    return this;
  }
}
