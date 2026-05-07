"use strict";
const FieldPlatformCalculationApi = (() => {
    function createCalculationApi(database, queries, calculations) {
        const { getSnapshot, get } = database;
        return {
            engagementStrength: edgeOrId => {
                const edge = typeof edgeOrId === "string" ? get("participationEdges", edgeOrId) : edgeOrId;
                return edge ? calculations.computeEngagementStrength(edge) : 0;
            },
            bondingScore: groupId => calculations.computeBondingScore(getSnapshot(), groupId),
            bridgingScore: groupId => calculations.computeBridgingScore(getSnapshot(), groupId),
            groupOverlap: (groupAId, groupBId) => calculations.computeGroupOverlap(getSnapshot(), groupAId, groupBId),
            generatedFields: () => calculations.generateEmergentFields(getSnapshot()),
            recommendGroupsForPerson: personId => calculations.recommendGroupsForParticipant(getSnapshot(), personId),
            recommendEventsForPerson: personId => calculations.recommendEventsForParticipant(getSnapshot(), personId),
            recommendGroupsForEvent: draftEvent => calculations.recommendGroupsForEvent(getSnapshot(), draftEvent),
            personalGroupMetrics: (personId, groupId) => calculations.computePersonalGroupMetrics(getSnapshot(), personId, groupId),
            creatorGroupSignal: (creatorId, groupId, draftEvent = null) => calculations.computeCreatorGroupSignal(getSnapshot(), creatorId, groupId, draftEvent),
            dormantParticipants: groupId => calculations.detectDormantParticipants(getSnapshot(), groupId),
            newcomerDropoff: groupId => calculations.detectNewcomerDropoff(getSnapshot(), groupId),
            bridgePeople: groupOrFieldId => calculations.detectBridgePeople(getSnapshot(), groupOrFieldId),
            summarizeGroup: groupId => calculations.summarizeGroup(getSnapshot(), groupId),
            eventInterest: (personId, eventId) => {
                const event = queries.getEvent(eventId);
                return event ? calculations.eventRelevanceCalculation(getSnapshot(), event, personId) : null;
            },
            eventInterestForRecord: (personId, event) => calculations.eventRelevanceCalculation(getSnapshot(), event, personId)
        };
    }
    return { createCalculationApi };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformCalculationApi = FieldPlatformCalculationApi;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformCalculationApi;
}
