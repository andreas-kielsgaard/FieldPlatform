"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformDomain = exports.createPlatformDomain = exports.database = exports.calculations = exports.createInitialPlatformSnapshot = void 0;
exports.createPlatformDataLayer = createPlatformDataLayer;
const seed = require("./database-definition/seed");
const calculations = require("./calculation-layer/calculations");
exports.calculations = calculations;
const database = require("./database-engine/database");
exports.database = database;
function createPlatformDataLayer(options = {}) {
    return database.createDataLayer({
        seedFactory: seed.createInitialPlatformSnapshot,
        calculations,
        ...options
    });
}
exports.createInitialPlatformSnapshot = seed.createInitialPlatformSnapshot;
var domain_1 = require("./access-layer/domain");
Object.defineProperty(exports, "createPlatformDomain", { enumerable: true, get: function () { return domain_1.createPlatformDomain; } });
Object.defineProperty(exports, "PlatformDomain", { enumerable: true, get: function () { return domain_1.PlatformDomain; } });
__exportStar(require("./access-layer/domain"), exports);
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        createPlatformDataLayer,
        createInitialPlatformSnapshot: seed.createInitialPlatformSnapshot,
        calculations,
        database,
        get domain() {
            return require("./access-layer/domain");
        }
    };
}
