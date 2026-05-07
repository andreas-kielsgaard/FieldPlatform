"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEventAccess = void 0;
class UserEventAccess {
    constructor(platform, user) {
        this.platform = platform;
        this.user = user;
    }
    attending() {
        return this.platform.events.list()
            .filter(event => event.data().attendance.attending.includes(this.user.id));
    }
    interested() {
        return this.platform.events.list()
            .filter(event => event.data().attendance.interested.includes(this.user.id));
    }
    managed() {
        return this.platform.events.list().filter(event => event.canBeManagedBy(this.user));
    }
    recommended() {
        return this.platform.recommendations.eventsForUser(this.user);
    }
}
exports.UserEventAccess = UserEventAccess;
