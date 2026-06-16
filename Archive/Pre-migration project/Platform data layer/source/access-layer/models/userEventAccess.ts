import type { EventRecommendation } from "../services/recommendationService";
import type { PlatformDomain } from "../platformDomain";
import { Event } from "./event";
import type { User } from "./user";

export class UserEventAccess {
  constructor(private readonly platform: PlatformDomain, private readonly user: User) {}

  attending(): Event[] {
    return this.platform.events.list()
      .filter(event => event.data().attendance.attending.includes(this.user.id));
  }

  interested(): Event[] {
    return this.platform.events.list()
      .filter(event => event.data().attendance.interested.includes(this.user.id));
  }

  managed(): Event[] {
    return this.platform.events.list().filter(event => event.canBeManagedBy(this.user));
  }

  recommended(): EventRecommendation[] {
    return this.platform.recommendations.eventsForUser(this.user);
  }
}
