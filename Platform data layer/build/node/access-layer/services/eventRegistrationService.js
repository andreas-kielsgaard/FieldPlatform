"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistrationService = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class EventRegistrationService {
    constructor(platform) {
        this.platform = platform;
    }
    register(personId, eventId) {
        return this.updateAttendance(eventId, attendance => ({
            interested: attendance.interested.filter(id => id !== personId),
            attending: (0, domainUtils_1.addUnique)(attendance.attending, personId)
        }));
    }
    markInterested(personId, eventId) {
        return this.updateAttendance(eventId, attendance => ({
            ...attendance,
            interested: (0, domainUtils_1.addUnique)(attendance.interested, personId)
        }));
    }
    updateAttendance(eventId, update) {
        const collectionName = this.findEventCollection(eventId);
        return this.platform.raw().database.update(collectionName, eventId, (event) => ({
            attendance: update(event.attendance || { interested: [], attending: [] })
        }));
    }
    findEventCollection(eventId) {
        if (this.platform.raw().database.get("events", eventId))
            return "events";
        if (this.platform.raw().database.get("createdEvents", eventId))
            return "createdEvents";
        throw new Error(`Event not found: ${eventId}`);
    }
}
exports.EventRegistrationService = EventRegistrationService;
