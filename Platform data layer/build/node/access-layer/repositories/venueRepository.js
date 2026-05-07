"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueRepository = void 0;
const venue_1 = require("../models/venue");
class VenueRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getVenue(id);
        if (!record)
            throw new Error(`Venue not found: ${id}`);
        return new venue_1.Venue(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listVenues()
            .map(record => new venue_1.Venue(this.platform, record.id));
    }
}
exports.VenueRepository = VenueRepository;
