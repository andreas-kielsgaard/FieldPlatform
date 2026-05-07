export function createInitialPlatformSnapshot(): {
    currentView: string;
    currentPersonId: string;
    stewardGroupId: string;
    focus: {
        type: string;
        id: string;
    };
    people: {
        id: string;
        name: string;
        bio: string;
        tags: string[];
        visibleAttributes: string[];
        lifeContext: string;
    }[];
    groups: {
        id: string;
        name: string;
        description: string;
        state: string;
        color: string;
        tags: string[];
        norms: string[];
        rhythm: string;
        venues: string[];
        stewards: string[];
        accessRules: string;
        entryGuidance: string;
    }[];
    venues: {
        id: string;
        name: string;
        type: string;
        location: string;
        atmosphere: string;
        associatedGroups: string[];
    }[];
    events: ({
        id: string;
        title: string;
        hostId: string;
        linkedGroups: string[];
        relevantGroups: string[];
        venueId: string;
        time: string;
        tags: string[];
        audience: string;
        access: string;
        price: string;
        attendance: {
            interested: string[];
            attending: string[];
        };
        cohostIds?: undefined;
        volunteerIds?: undefined;
    } | {
        id: string;
        title: string;
        hostId: string;
        cohostIds: string[];
        volunteerIds: string[];
        linkedGroups: string[];
        relevantGroups: string[];
        venueId: string;
        time: string;
        tags: string[];
        audience: string;
        access: string;
        price: string;
        attendance: {
            interested: string[];
            attending: string[];
        };
    })[];
    festivals: {
        id: string;
        title: string;
        summary: string;
        hostGroupIds: string[];
        venueIds: string[];
        time: string;
        tags: string[];
        attendance: {
            interested: string[];
            attending: string[];
        };
        subEvents: {
            id: string;
            title: string;
            time: string;
            venueId: string;
            hostGroupIds: string[];
            tags: string[];
            participationMode: string;
            note: string;
        }[];
    }[];
    forumThreads: {
        id: string;
        scopeType: string;
        scopeId: string;
        title: string;
        authorId: string;
        lastActivity: string;
        replies: number;
        tags: string[];
    }[];
    participationEdges: {
        personId: any;
        groupId: any;
        relationshipState: any;
        accessLevel: any;
        engagementStrength: any;
        recency: any;
        frequency: any;
        contributionLevel: any;
        trustLevel: any;
        roleModes: any;
        socialEmbeddedness: any;
        normFamiliarity: any;
        identitySalience: any;
        visibility: any;
        decayState: any;
    }[];
    groupRelationships: {
        fromGroupId: string;
        toGroupId: string;
        type: string;
        note: string;
    }[];
    personas: string[];
    createdEvents: never[];
    featuredEvents: never[];
    membershipRequests: {
        id: string;
        personId: string;
        groupId: string;
        status: string;
        note: string;
    }[];
    suggestedEventShares: {
        id: string;
        eventId: string;
        groupId: string;
        suggestedBy: string;
        status: string;
        note: string;
    }[];
    lastChange: null;
};
