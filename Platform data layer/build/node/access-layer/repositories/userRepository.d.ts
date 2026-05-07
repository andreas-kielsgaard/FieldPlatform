import { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { Id } from "../types";
export declare class UserRepository {
    private readonly platform;
    constructor(platform: PlatformDomain);
    get(id: Id): User;
    list(): User[];
}
