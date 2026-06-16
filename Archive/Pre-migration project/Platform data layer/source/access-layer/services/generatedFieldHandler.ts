import { GeneratedField } from "../models/generatedField";
import type { Community } from "../models/community";
import type { PlatformDomain } from "../platformDomain";
import type { GeneratedFieldRecord, Id } from "../types";
import { idOf } from "../utils/domainUtils";

export class GeneratedFieldHandler {
  constructor(private readonly platform: PlatformDomain) {}

  generateFields(): GeneratedField[] {
    return (this.platform.raw().calculations.generatedFields() as GeneratedFieldRecord[])
      .map(record => new GeneratedField(this.platform, record));
  }

  generateFieldsFromCommunities(communities: Array<Community | Id>): GeneratedField[] {
    const groupIds = communities.map(idOf);
    return this.generateFields().filter(field => {
      const fieldGroupIds = field.data().groups;
      return fieldGroupIds.some(groupId => groupIds.includes(groupId));
    });
  }

  get(id: Id): GeneratedField {
    const field = this.generateFields().find(item => item.id === id);
    if (!field) throw new Error(`Generated field not found: ${id}`);
    return field;
  }
}
