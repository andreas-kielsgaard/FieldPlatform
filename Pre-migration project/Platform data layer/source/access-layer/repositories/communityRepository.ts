import { Community } from "../models/community";
import type { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { CommunityDraftData, CommunityRecord, Id } from "../types";
import { idOf } from "../utils/domainUtils";

export class CommunityRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): Community {
    const record = this.platform.raw().queries.getGroup(id) as CommunityRecord | null;
    if (!record) throw new Error(`Community not found: ${id}`);
    return new Community(this.platform, id);
  }

  list(): Community[] {
    return (this.platform.raw().queries.listGroups() as CommunityRecord[])
      .map(record => new Community(this.platform, record.id));
  }

  create(data: CommunityDraftData, createdBy: User | Id): Community {
    const creatorId = idOf(createdBy);
    const record = this.platform.communityManagement.create(data, creatorId);
    return new Community(this.platform, record.id);
  }
}
