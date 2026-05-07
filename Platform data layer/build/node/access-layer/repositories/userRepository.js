"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("../models/user");
class UserRepository {
    constructor(platform) {
        this.platform = platform;
    }
    get(id) {
        const record = this.platform.raw().queries.getPerson(id);
        if (!record)
            throw new Error(`User not found: ${id}`);
        return new user_1.User(this.platform, id);
    }
    list() {
        return this.platform.raw().queries.listPeople()
            .map(record => new user_1.User(this.platform, record.id));
    }
}
exports.UserRepository = UserRepository;
