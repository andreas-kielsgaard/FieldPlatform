"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const event_1 = require("../models/event");
const domainUtils_1 = require("../utils/domainUtils");
class EventRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getEvent(id);
        if (!record)
            throw new Error(`Event not found: ${id}`);
        return new event_1.Event(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listEvents()
            .map(record => new event_1.Event(this.platform, record.id));
    }
    create(data, createdBy) {
        const creatorId = (0, domainUtils_1.idOf)(createdBy);
        const record = this.platform.eventManagement.create(data, creatorId);
        return new event_1.Event(this.platform, record.id);
    }
}
exports.EventRepository = EventRepository;
