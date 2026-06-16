"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedField = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class GeneratedField {
    constructor(platform, record) {
        this.platform = platform;
        this.record = record;
    }
    get id() {
        return this.record.id;
    }
    data() {
        return (0, domainUtils_1.clone)(this.record);
    }
    communities() {
        return this.record.groups.map(groupId => this.platform.communities.get(groupId));
    }
    bridgeEvents() {
        return eventsForField(this.platform, this.record).filter(event => (0, domainUtils_1.isBridgeEvent)(event.data()));
    }
    deeperEvents() {
        return eventsForField(this.platform, this.record).filter(event => !(0, domainUtils_1.isBridgeEvent)(event.data()));
    }
    bridgePeople() {
        return this.platform.raw().calculations.bridgePeople(this.record.id);
    }
}
exports.GeneratedField = GeneratedField;
function eventsForField(platform, field) {
    return platform.events.list().filter(event => {
        const record = event.data();
        return [...record.linkedGroups, ...record.relevantGroups].some(groupId => field.groups.includes(groupId));
    });
}
