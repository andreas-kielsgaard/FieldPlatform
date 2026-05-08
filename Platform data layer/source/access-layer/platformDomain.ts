import { loadLowLevelModule } from "./infrastructure/loadLowLevelModule";
import { CommunityRepository } from "./repositories/communityRepository";
import { EventRepository } from "./repositories/eventRepository";
import { FieldRelationRepository } from "./repositories/fieldRelationRepository";
import { UserRepository } from "./repositories/userRepository";
import { VenueRepository } from "./repositories/venueRepository";
import { CommunityHealthService } from "./services/communityHealthService";
import { CommunityManagementService } from "./services/communityManagementService";
import { EventManagementService } from "./services/eventManagementService";
import { EventRegistrationService } from "./services/eventRegistrationService";
import { EventSuggestionService } from "./services/eventSuggestionService";
import { FieldRelationService } from "./services/fieldRelationService";
import { GeneratedFieldHandler } from "./services/generatedFieldHandler";
import { MembershipService } from "./services/membershipService";
import { ParticipationService } from "./services/participationService";
import { RecommendationService } from "./services/recommendationService";
import type { DomainOptions, LowLevelPlatform } from "./types";

const lowLevelModule = loadLowLevelModule();

export class PlatformDomain {
  public readonly users: UserRepository;
  public readonly events: EventRepository;
  public readonly communities: CommunityRepository;
  public readonly venues: VenueRepository;
  public readonly fieldRelations: FieldRelationRepository;
  public readonly generatedFields: GeneratedFieldHandler;
  public readonly recommendations: RecommendationService;
  public readonly communityHealth: CommunityHealthService;
  public readonly participation: ParticipationService;
  public readonly memberships: MembershipService;
  public readonly eventRegistration: EventRegistrationService;
  public readonly eventSuggestions: EventSuggestionService;
  public readonly fieldRelationService: FieldRelationService;
  public readonly eventManagement: EventManagementService;
  public readonly communityManagement: CommunityManagementService;

  private readonly lowLevel: LowLevelPlatform;

  constructor(options: DomainOptions = {}) {
    if (!options.lowLevelPlatform && !lowLevelModule) {
      throw new Error("PlatformDomain requires a low-level platform module.");
    }

    this.lowLevel = options.lowLevelPlatform || lowLevelModule.createPlatformDataLayer({
      adapter: options.adapter,
      storageKey: options.storageKey
    });
    this.participation = new ParticipationService(this);
    this.memberships = new MembershipService(this);
    this.eventRegistration = new EventRegistrationService(this);
    this.fieldRelationService = new FieldRelationService(this);
    this.eventSuggestions = new EventSuggestionService(this);
    this.eventManagement = new EventManagementService(this);
    this.communityManagement = new CommunityManagementService(this);
    this.users = new UserRepository(this);
    this.events = new EventRepository(this);
    this.communities = new CommunityRepository(this);
    this.venues = new VenueRepository(this);
    this.fieldRelations = new FieldRelationRepository(this);
    this.generatedFields = new GeneratedFieldHandler(this);
    this.recommendations = new RecommendationService(this);
    this.communityHealth = new CommunityHealthService(this);
  }

  static create(options: DomainOptions = {}): PlatformDomain {
    return new PlatformDomain(options);
  }

  resetDatabase(): void {
    this.lowLevel.resetDatabase();
  }

  snapshot(): unknown {
    return this.lowLevel.getSnapshot();
  }

  raw(): LowLevelPlatform {
    return this.lowLevel;
  }
}

export function createPlatformDomain(options: DomainOptions = {}): PlatformDomain {
  return new PlatformDomain(options);
}
