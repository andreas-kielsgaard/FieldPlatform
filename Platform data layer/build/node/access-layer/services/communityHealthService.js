"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityHealthService = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class CommunityHealthService {
    constructor(platform) {
        this.platform = platform;
    }
    summarize(community) {
        return this.platform.raw().calculations.summarizeGroup((0, domainUtils_1.idOf)(community));
    }
    bondingScore(community) {
        return Number(this.platform.raw().calculations.bondingScore((0, domainUtils_1.idOf)(community)));
    }
    bridgingScore(community) {
        return Number(this.platform.raw().calculations.bridgingScore((0, domainUtils_1.idOf)(community)));
    }
    newcomerDropoff(community) {
        return this.platform.raw().calculations.newcomerDropoff((0, domainUtils_1.idOf)(community));
    }
    dormantParticipants(community) {
        return this.platform.raw().calculations.dormantParticipants((0, domainUtils_1.idOf)(community));
    }
}
exports.CommunityHealthService = CommunityHealthService;
