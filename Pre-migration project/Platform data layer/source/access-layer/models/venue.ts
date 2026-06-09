import type { PlatformDomain } from "../platformDomain";
import type { Id, VenueRecord } from "../types";
import { Community } from "./community";
import { Event } from "./event";

export class Venue {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): VenueRecord {
    return this.platform.raw().queries.getVenue(this.id) as VenueRecord;
  }

  name(): string {
    return this.data().name;
  }

  communities(): Community[] {
    return this.platform.communities.list()
      .filter(community => community.data().venues.includes(this.id));
  }

  events(): Event[] {
    return this.platform.events.list()
      .filter(event => event.data().venueId === this.id);
  }
}
