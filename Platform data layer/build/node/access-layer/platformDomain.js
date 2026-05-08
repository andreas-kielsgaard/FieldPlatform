"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformDomain = void 0;
exports.createPlatformDomain = createPlatformDomain;
const loadLowLevelModule_1 = require("./infrastructure/loadLowLevelModule");
const communityRepository_1 = require("./repositories/communityRepository");
const eventRepository_1 = require("./repositories/eventRepository");
const fieldRelationRepository_1 = require("./repositories/fieldRelationRepository");
const userRepository_1 = require("./repositories/userRepository");
const venueRepository_1 = require("./repositories/venueRepository");
const communityHealthService_1 = require("./services/communityHealthService");
const communityManagementService_1 = require("./services/communityManagementService");
const eventManagementService_1 = require("./services/eventManagementService");
const eventRegistrationService_1 = require("./services/eventRegistrationService");
const eventSuggestionService_1 = require("./services/eventSuggestionService");
const fieldRelationService_1 = require("./services/fieldRelationService");
const generatedFieldHandler_1 = require("./services/generatedFieldHandler");
const membershipService_1 = require("./services/membershipService");
const participationService_1 = require("./services/participationService");
const recommendationService_1 = require("./services/recommendationService");
const lowLevelModule = (0, loadLowLevelModule_1.loadLowLevelModule)();
class PlatformDomain {
    constructor(options = {}) {
        if (!options.lowLevelPlatform && !lowLevelModule) {
            throw new Error("PlatformDomain requires a low-level platform module.");
        }
        this.lowLevel = options.lowLevelPlatform || lowLevelModule.createPlatformDataLayer({
            adapter: options.adapter,
            storageKey: options.storageKey
        });
        this.participation = new participationService_1.ParticipationService(this);
        this.memberships = new membershipService_1.MembershipService(this);
        this.eventRegistration = new eventRegistrationService_1.EventRegistrationService(this);
        this.fieldRelationService = new fieldRelationService_1.FieldRelationService(this);
        this.eventSuggestions = new eventSuggestionService_1.EventSuggestionService(this);
        this.eventManagement = new eventManagementService_1.EventManagementService(this);
        this.communityManagement = new communityManagementService_1.CommunityManagementService(this);
        this.users = new userRepository_1.UserRepository(this);
        this.events = new eventRepository_1.EventRepository(this);
        this.communities = new communityRepository_1.CommunityRepository(this);
        this.venues = new venueRepository_1.VenueRepository(this);
        this.fieldRelations = new fieldRelationRepository_1.FieldRelationRepository(this);
        this.generatedFields = new generatedFieldHandler_1.GeneratedFieldHandler(this);
        this.recommendations = new recommendationService_1.RecommendationService(this);
        this.communityHealth = new communityHealthService_1.CommunityHealthService(this);
    }
    static create(options = {}) {
        return new PlatformDomain(options);
    }
    resetDatabase() {
        this.lowLevel.resetDatabase();
    }
    snapshot() {
        return this.lowLevel.getSnapshot();
    }
    raw() {
        return this.lowLevel;
    }
}
exports.PlatformDomain = PlatformDomain;
function createPlatformDomain(options = {}) {
    return new PlatformDomain(options);
}
