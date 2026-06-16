import type { PlatformDomain } from "../platformDomain";
import type { GeneratedFieldRecord, Id } from "../types";
import { Community } from "./community";
import { Event } from "./event";
export declare class GeneratedField {
    private readonly platform;
    private readonly record;
    constructor(platform: PlatformDomain, record: GeneratedFieldRecord);
    get id(): Id;
    data(): GeneratedFieldRecord;
    communities(): Community[];
    bridgeEvents(): Event[];
    deeperEvents(): Event[];
    bridgePeople(): unknown;
}
