import type { PlatformDomain } from "../platformDomain";
import type { AccessLevel, EventRecord, Id, SuggestedEventShareRecord } from "../types";
import { addUnique, idOf } from "../utils/domainUtils";
import type { Community } from "./community";
import type { User } from "./user";
import type { Venue } from "./venue";

export class Event {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): EventRecord {
    return this.platform.raw().queries.getEvent(this.id) as EventRecord;
  }

  title(): string {
    return this.data().title;
  }

  changeName(name: string): Event {
    this.platform.eventManagement.update(this.id, { title: name });
    return this;
  }

  addTag(tag: string): Event {
    const tags = addUnique(this.data().tags, tag);
    this.platform.eventManagement.update(this.id, { tags });
    return this;
  }

  removeTag(tag: string): Event {
    const tags = this.data().tags.filter(existing => existing !== tag);
    this.platform.eventManagement.update(this.id, { tags });
    return this;
  }

  setVenue(venue: Venue | Id): Event {
    this.platform.eventManagement.update(this.id, { venueId: idOf(venue) });
    return this;
  }

  setAccess(access: AccessLevel): Event {
    this.platform.eventManagement.update(this.id, { access });
    return this;
  }

  registerUser(user: User | Id): Event {
    this.platform.eventRegistration.register(idOf(user), this.id);
    return this;
  }

  markUserInterested(user: User | Id): Event {
    this.platform.eventRegistration.markInterested(idOf(user), this.id);
    return this;
  }

  suggestToCommunity(community: Community | Id, suggestedBy: User | Id, note = ""): SuggestedEventShareRecord {
    return this.platform.eventSuggestions.suggest(this.id, idOf(community), idOf(suggestedBy), note);
  }

  relevanceFor(user: User | Id): unknown {
    return this.platform.raw().calculations.eventInterest(idOf(user), this.id);
  }

  linkedCommunities(): Community[] {
    return this.data().linkedGroups.map(groupId => this.platform.communities.get(groupId));
  }

  relevantCommunities(): Community[] {
    return this.data().relevantGroups.map(groupId => this.platform.communities.get(groupId));
  }

  venue(): Venue {
    return this.platform.venues.get(this.data().venueId);
  }

  canBeManagedBy(user: User | Id): boolean {
    return Boolean(this.platform.raw().queries.canManageEvent(idOf(user), this.id));
  }
}
