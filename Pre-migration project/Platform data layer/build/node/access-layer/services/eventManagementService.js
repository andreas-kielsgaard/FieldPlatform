"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManagementService = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class EventManagementService {
    constructor(platform) {
        this.platform = platform;
    }
    create(data, createdBy) {
        const normalized = (0, domainUtils_1.normalizeEventDraft)(data, createdBy);
        return this.platform.raw().database.create("events", normalized);
    }
    update(eventId, patch) {
        const collectionName = this.findEventCollection(eventId);
        return this.platform.raw().database.update(collectionName, eventId, patch);
    }
    findEventCollection(eventId) {
        if (this.platform.raw().database.get("events", eventId))
            return "events";
        if (this.platform.raw().database.get("createdEvents", eventId))
            return "createdEvents";
        throw new Error(`Event not found: ${eventId}`);
    }
}
exports.EventManagementService = EventManagementService;
