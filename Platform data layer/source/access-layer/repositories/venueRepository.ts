import { Venue } from "../models/venue";
import type { PlatformDomain } from "../platformDomain";
import type { Id, VenueRecord } from "../types";

export class VenueRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): Venue {
    const record = this.platform.raw().queries.getVenue(id) as VenueRecord | null;
    if (!record) throw new Error(`Venue not found: ${id}`);
    return new Venue(this.platform, id);
  }

  list(): Venue[] {
    return (this.platform.raw().queries.listVenues() as VenueRecord[])
      .map(record => new Venue(this.platform, record.id));
  }
}
