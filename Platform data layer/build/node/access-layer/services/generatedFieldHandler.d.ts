import { GeneratedField } from "../models/generatedField";
import type { Community } from "../models/community";
import type { PlatformDomain } from "../platformDomain";
import type { Id } from "../types";
export declare class GeneratedFieldHandler {
    private readonly platform;
    constructor(platform: PlatformDomain);
    generateFields(): GeneratedField[];
    generateFieldsFromCommunities(communities: Array<Community | Id>): GeneratedField[];
    get(id: Id): GeneratedField;
}
