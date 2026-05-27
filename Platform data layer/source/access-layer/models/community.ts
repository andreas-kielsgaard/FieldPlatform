import type { PlatformDomain } from "../platformDomain";
import type { CommunityRecord, Id, MembershipRequestRecord, ParticipationEdgeRecord } from "../types";
import { addUnique, idOf, isBridgeEvent, touchesCommunity } from "../utils/domainUtils";
import type { User } from "./user";
import type { Venue } from "./venue";
import type { DataShareRequest } from "./dataShareRequest";
import { Event } from "./event";
import { GeneratedField } from "./generatedField";
import { ParticipationEdge } from "./participationEdge";

export class Community {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): CommunityRecord {
    return this.platform.raw().queries.getGroup(this.id) as CommunityRecord;
  }

  name(): string {
    return this.data().name;
  }

  changeName(name: string): Community {
    this.platform.communityManagement.update(this.id, { name });
    return this;
  }

  addTag(tag: string): Community {
    const tags = addUnique(this.data().tags, tag);
    this.platform.communityManagement.update(this.id, { tags });
    return this;
  }

  removeTag(tag: string): Community {
    const tags = this.data().tags.filter(existing => existing !== tag);
    this.platform.communityManagement.update(this.id, { tags });
    return this;
  }

  addVenue(venue: Venue | Id): Community {
    const venues = addUnique(this.data().venues, idOf(venue));
    this.platform.communityManagement.update(this.id, { venues });
    return this;
  }

  removeVenue(venue: Venue | Id): Community {
    const venueId = idOf(venue);
    const venues = this.data().venues.filter(existing => existing !== venueId);
    this.platform.communityManagement.update(this.id, { venues });
    return this;
  }

  updateEntryGuidance(entryGuidance: string): Community {
    this.platform.communityManagement.update(this.id, { entryGuidance });
    return this;
  }

  updateAccessRules(accessRules: string): Community {
    this.platform.communityManagement.update(this.id, { accessRules });
    return this;
  }

  followedBy(user: User | Id): ParticipationEdge {
    const record = this.platform.participation.followGroup(idOf(user), this.id);
    return new ParticipationEdge(this.platform, record.id);
  }

  requestMembership(user: User | Id, note = ""): MembershipRequestRecord {
    return this.platform.memberships.request(idOf(user), this.id, note);
  }

  approveMembershipRequest(requestId: Id, approver: User | Id): ParticipationEdge {
    const record = this.platform.memberships.approve(requestId, idOf(approver));
    return new ParticipationEdge(this.platform, record.id);
  }

  markRelationshipTo(otherCommunity: Community | Id, type = "markedBySteward", note = "", markedBy?: User | Id): unknown {
    return this.platform.communityManagement.markRelationshipTo(this.id, idOf(otherCommunity), type, note, markedBy ? idOf(markedBy) : null);
  }

  events(): Event[] {
    return this.platform.events.list()
      .filter(event => touchesCommunity(event.data(), this.id));
  }

  bridgeEvents(): Event[] {
    return this.events().filter(event => isBridgeEvent(event.data()));
  }

  deeperEvents(): Event[] {
    return this.events().filter(event => !isBridgeEvent(event.data()));
  }

  participationEdges(): ParticipationEdge[] {
    return (this.platform.raw().queries.getEdgesForGroup(this.id) as ParticipationEdgeRecord[])
      .map(record => new ParticipationEdge(this.platform, record.id));
  }

  personalMetricsFor(user: User | Id): unknown {
    return this.platform.raw().calculations.personalGroupMetrics(idOf(user), this.id);
  }

  health(): unknown {
    return this.platform.communityHealth.summarize(this);
  }

  generatedFields(): GeneratedField[] {
    return this.platform.generatedFields.generateFieldsFromCommunities([this]);
  }

  canBeManagedBy(user: User | Id): boolean {
    return Boolean(this.platform.raw().queries.canManageCommunity(idOf(user), this.id));
  }

  dataShareRequests(): DataShareRequest[] {
    return this.platform.dataShareRequests.forContext("community", this.id);
  }
}
