export function createCalculationApi(database: any, queries: any, calculations: any): {
    engagementStrength: (edgeOrId: any) => any;
    bondingScore: (groupId: any) => any;
    bridgingScore: (groupId: any) => any;
    groupOverlap: (groupAId: any, groupBId: any) => any;
    generatedFields: () => any;
    recommendGroupsForPerson: (personId: any) => any;
    recommendEventsForPerson: (personId: any) => any;
    recommendGroupsForEvent: (draftEvent: any) => any;
    personalGroupMetrics: (personId: any, groupId: any) => any;
    creatorGroupSignal: (creatorId: any, groupId: any, draftEvent?: null) => any;
    dormantParticipants: (groupId: any) => any;
    newcomerDropoff: (groupId: any) => any;
    bridgePeople: (groupOrFieldId: any) => any;
    summarizeGroup: (groupId: any) => any;
    eventInterest: (personId: any, eventId: any) => any;
    eventInterestForRecord: (personId: any, event: any) => any;
};
