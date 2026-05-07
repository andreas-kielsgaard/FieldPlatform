import type { PlatformDomain } from "../platformDomain";
import type { GeneratedFieldRecord, Id } from "../types";
import { clone, isBridgeEvent } from "../utils/domainUtils";
import { Community } from "./community";
import { Event } from "./event";

export class GeneratedField {
  constructor(private readonly platform: PlatformDomain, private readonly record: GeneratedFieldRecord) {}

  get id(): Id {
    return this.record.id;
  }

  data(): GeneratedFieldRecord {
    return clone(this.record);
  }

  communities(): Community[] {
    return this.record.groups.map(groupId => this.platform.communities.get(groupId));
  }

  bridgeEvents(): Event[] {
    return eventsForField(this.platform, this.record).filter(event => isBridgeEvent(event.data()));
  }

  deeperEvents(): Event[] {
    return eventsForField(this.platform, this.record).filter(event => !isBridgeEvent(event.data()));
  }

  bridgePeople(): unknown {
    return this.platform.raw().calculations.bridgePeople(this.record.id);
  }
}

function eventsForField(platform: PlatformDomain, field: GeneratedFieldRecord): Event[] {
  return platform.events.list().filter(event => {
    const record = event.data();
    return [...record.linkedGroups, ...record.relevantGroups].some(groupId => field.groups.includes(groupId));
  });
}
