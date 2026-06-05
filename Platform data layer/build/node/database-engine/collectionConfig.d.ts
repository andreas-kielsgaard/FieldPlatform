export const DEFAULT_STORAGE_KEY: "field_platform_database_v1";
export const collectionNames: string[];
export namespace collectionPrefixes {
    let people: string;
    let groups: string;
    let venues: string;
    let events: string;
    let festivals: string;
    let forumThreads: string;
    let participationEdges: string;
    let groupRelationships: string;
    let fieldRelations: string;
    let relationReviews: string;
    let dataShareRequests: string;
    let visibilityGrants: string;
    let membershipRequests: string;
    let suggestedEventShares: string;
    let createdEvents: string;
    let createdCommunities: string;
    let managedObjects: string;
    let featuredEvents: string;
}
export function assertCollection(collectionName: any): void;
