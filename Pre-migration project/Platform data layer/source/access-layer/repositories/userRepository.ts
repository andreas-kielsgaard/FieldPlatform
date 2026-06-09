import { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { Id, PersonRecord } from "../types";

export class UserRepository {
  constructor(private readonly platform: PlatformDomain) {}

  get(id: Id): User {
    const record = this.platform.raw().queries.getPerson(id) as PersonRecord | null;
    if (!record) throw new Error(`User not found: ${id}`);
    return new User(this.platform, id);
  }

  list(): User[] {
    return (this.platform.raw().queries.listPeople() as PersonRecord[])
      .map(record => new User(this.platform, record.id));
  }
}
