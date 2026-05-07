import type { PlatformDomain } from "../platformDomain";
import type { CommunityDraftData, EventDraftData, Id, MembershipRequestRecord, ParticipationEdgeRecord, PersonRecord } from "../types";
import { idOf } from "../utils/domainUtils";
import type { Community } from "./community";
import type { Event } from "./event";
import { ParticipationEdge } from "./participationEdge";
import { UserCommunityAccess } from "./userCommunityAccess";
import { UserEventAccess } from "./userEventAccess";

export class User {
  public readonly events: UserEventAccess;
  public readonly communities: UserCommunityAccess;

  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {
    this.events = new UserEventAccess(platform, this);
    this.communities = new UserCommunityAccess(platform, this);
  }

  profile(): PersonRecord {
    return this.platform.raw().queries.getPerson(this.id) as PersonRecord;
  }

  name(): string {
    return this.profile().name;
  }

  tags(): string[] {
    return [...this.profile().tags];
  }

  participationEdges(): ParticipationEdge[] {
    return (this.platform.raw().queries.getEdgesForPerson(this.id) as ParticipationEdgeRecord[])
      .map(record => new ParticipationEdge(this.platform, record.id));
  }

  edgeTo(community: Community | Id): ParticipationEdge | null {
    const record = this.platform.raw().queries.getParticipationEdge(this.id, idOf(community)) as ParticipationEdgeRecord | null;
    return record ? new ParticipationEdge(this.platform, record.id) : null;
  }

  followCommunity(community: Community | Id): ParticipationEdge {
    const record = this.platform.participation.followGroup(this.id, idOf(community));
    return new ParticipationEdge(this.platform, record.id);
  }

  requestMembership(community: Community | Id, note = ""): MembershipRequestRecord {
    return this.platform.memberships.request(this.id, idOf(community), note);
  }

  createEvent(data: EventDraftData): Event {
    return this.platform.events.create(data, this);
  }

  createCommunity(data: CommunityDraftData): Community {
    return this.platform.communities.create(data, this);
  }

  canManageEvent(event: Event | Id): boolean {
    return Boolean(this.platform.raw().queries.canManageEvent(this.id, idOf(event)));
  }

  canManageCommunity(community: Community | Id): boolean {
    return Boolean(this.platform.raw().queries.canManageCommunity(this.id, idOf(community)));
  }
}
