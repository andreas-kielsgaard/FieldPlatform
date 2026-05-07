export function recommendGroupsForParticipant(data: any, personId: any): any;
export function recommendEventsForParticipant(data: any, personId: any): any;
export function recommendGroupsForEvent(data: any, draftEvent: any): any;
export function computePersonalGroupMetrics(data: any, personId: any, groupId: any): {
    participationScore: any;
    exposureScore: number;
    sharedCommunities: any;
    sharedEventTags: any;
    sharedEventsCount: any;
    strongestOverlap: any;
};
export function computeCreatorGroupSignal(data: any, creatorId: any, groupId: any, draftEvent?: null): {
    participantOverlapScore: number;
    sharedParticipantsCount: any;
    creatorAudienceCount: any;
    tagOverlap: any;
    hasHostedOrMarkedRelevant: boolean;
    relevantCreatorEventsCount: any;
    relevanceFrequency: number;
    proportionalRelevance: number;
};
export function eventRelevanceCalculation(data: any, event: any, personId: any): {
    eventId: any;
    personId: any;
    groupSignal: any;
    tagSignal: any;
    accessSignal: number;
    score: number;
    formula: string;
};
