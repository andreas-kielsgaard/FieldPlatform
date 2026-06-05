import type { PlatformDomain } from "../platformDomain";
import type { DataShareRequestRecord, Id, VisibilityGrantRecord } from "../types";
import { VisibilityGrant } from "./visibilityGrant";

export class DataShareRequest {
  constructor(private readonly platform: PlatformDomain, public readonly id: Id) {}

  data(): DataShareRequestRecord {
    return this.platform.raw().queries.getDataShareRequest(this.id) as DataShareRequestRecord;
  }

  accept(acceptedBy?: Id): DataShareRequest {
    this.platform.dataShares.acceptRequest(this.id, acceptedBy);
    return this;
  }

  revoke(revokedBy?: Id): DataShareRequest {
    this.platform.dataShares.revokeRequest(this.id, revokedBy);
    return this;
  }

  visibilityGrants(): VisibilityGrant[] {
    return (this.platform.dataShares.grantsCoveringRequest(this.id) as VisibilityGrantRecord[])
      .map(grant => new VisibilityGrant(this.platform, grant.id));
  }
}
