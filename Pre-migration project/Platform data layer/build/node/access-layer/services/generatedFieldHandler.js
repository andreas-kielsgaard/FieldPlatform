"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedFieldHandler = void 0;
const generatedField_1 = require("../models/generatedField");
const domainUtils_1 = require("../utils/domainUtils");
class GeneratedFieldHandler {
    constructor(platform) {
        this.platform = platform;
    }
    generateFields() {
        return this.platform.raw().calculations.generatedFields()
            .map(record => new generatedField_1.GeneratedField(this.platform, record));
    }
    generateFieldsFromCommunities(communities) {
        const groupIds = communities.map(domainUtils_1.idOf);
        return this.generateFields().filter(field => {
            const fieldGroupIds = field.data().groups;
            return fieldGroupIds.some(groupId => groupIds.includes(groupId));
        });
    }
    get(id) {
        const field = this.generateFields().find(item => item.id === id);
        if (!field)
            throw new Error(`Generated field not found: ${id}`);
        return field;
    }
}
exports.GeneratedFieldHandler = GeneratedFieldHandler;
