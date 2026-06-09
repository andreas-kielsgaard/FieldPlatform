"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
class Venue {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().queries.getVenue(this.id);
    }
    name() {
        return this.data().name;
    }
    communities() {
        return this.platform.communities.list()
            .filter(community => community.data().venues.includes(this.id));
    }
    events() {
        return this.platform.events.list()
            .filter(event => event.data().venueId === this.id);
    }
}
exports.Venue = Venue;
