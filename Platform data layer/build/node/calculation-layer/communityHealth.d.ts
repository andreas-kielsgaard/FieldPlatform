export function computeBondingScore(data: any, groupId: any): number;
export function computeBridgingScore(data: any, groupId: any): number;
export function detectDormantParticipants(data: any, groupId: any): any;
export function detectNewcomerDropoff(data: any, groupId: any): {
    newcomerCount: any;
    recurringCount: any;
    fadingCount: any;
    rate: number;
    message: string;
};
export function detectBridgePeople(data: any, groupOrFieldId: any): any;
export function summarizeGroup(data: any, groupId: any): {
    group: any;
    edges: any;
    distribution: {};
    bondingScore: number;
    bridgingScore: number;
    dropoff: {
        newcomerCount: any;
        recurringCount: any;
        fadingCount: any;
        rate: number;
        message: string;
    };
    dormant: any;
    bridges: any;
    overlaps: any;
};
