import { DataShareRequest } from "../models/dataShareRequest";
import type { PlatformDomain } from "../platformDomain";
import type { DataShareRequestDraft, DataShareRequestRecord, Id, ObjectType } from "../types";

export class DataShareRequestRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): DataShareRequest {
    const record = this.platform.raw().queries.getDataShareRequest(id) as DataShareRequestRecord | null;
    if (!record) throw new Error(`DataShareRequest not found: ${id}`);
    return new DataShareRequest(this.platform, id);
  }

  list(): DataShareRequest[] {
    return (this.platform.raw().queries.listDataShareRequests() as DataShareRequestRecord[])
      .map(record => new DataShareRequest(this.platform, record.id));
  }

  forSubject(subjectType: ObjectType, subjectId: Id): DataShareRequest[] {
    return (this.platform.raw().queries.getDataShareRequestsForSubject(subjectType, subjectId) as DataShareRequestRecord[])
      .map(record => new DataShareRequest(this.platform, record.id));
  }

  forContext(contextType: ObjectType, contextId: Id): DataShareRequest[] {
    return (this.platform.raw().queries.getDataShareRequestsForContext(contextType, contextId) as DataShareRequestRecord[])
      .map(record => new DataShareRequest(this.platform, record.id));
  }

  create(data: DataShareRequestDraft): DataShareRequest {
    const record = this.platform.dataShares.createRequest(data);
    return new DataShareRequest(this.platform, record.id);
  }

  accept(id: Id, acceptedBy?: Id): DataShareRequest {
    const { request } = this.platform.dataShares.acceptRequest(id, acceptedBy);
    return new DataShareRequest(this.platform, request.id);
  }

  revoke(id: Id, revokedBy?: Id): DataShareRequest {
    const request = this.platform.dataShares.revokeRequest(id, revokedBy);
    return new DataShareRequest(this.platform, request.id);
  }
}
