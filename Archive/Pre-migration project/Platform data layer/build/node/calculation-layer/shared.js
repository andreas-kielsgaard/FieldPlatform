"use strict";
const FieldPlatformCalculationShared = (() => {
    const stateWeight = {
        observing: 4,
        curious: 12,
        occasional: 28,
        recurring: 48,
        contributor: 65,
        facilitator: 72,
        steward: 78,
        dormant: -10,
        alumnus: 18
    };
    const accessWeight = {
        public: 0,
        known: 5,
        requested: 3,
        member: 8,
        trusted: 12,
        core: 16
    };
    const embeddednessWeight = {
        none: 0,
        light: 8,
        moderate: 16,
        strong: 24
    };
    const normWeight = {
        new: 0,
        familiar: 8,
        carrier: 16
    };
    const decayWeight = {
        active: 8,
        fading: -8,
        dormant: -18,
        reactivating: 4
    };
    function clamp(value, min = 0, max = 100) {
        return Math.max(min, Math.min(max, value));
    }
    function average(values) {
        if (!values.length)
            return 0;
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }
    function unique(items) {
        return Array.from(new Set(items));
    }
    function getGroup(data, groupId) {
        return data.groups.find(group => group.id === groupId);
    }
    function getPerson(data, personId) {
        return data.people.find(person => person.id === personId);
    }
    function getVenue(data, venueId) {
        return data.venues.find(venue => venue.id === venueId);
    }
    function getEdgesForGroup(data, groupId) {
        return data.participationEdges.filter(edge => edge.groupId === groupId);
    }
    function getEdgesForPerson(data, personId) {
        return data.participationEdges.filter(edge => edge.personId === personId);
    }
    function computeEngagementStrength(edge) {
        const roleScore = Math.min(18, edge.roleModes.length * 4);
        const base = (edge.recency * 0.22) +
            (edge.frequency * 0.24) +
            (edge.contributionLevel * 0.16) +
            (edge.trustLevel * 0.12) +
            stateWeight[edge.relationshipState] +
            accessWeight[edge.accessLevel] +
            embeddednessWeight[edge.socialEmbeddedness] +
            normWeight[edge.normFamiliarity] +
            decayWeight[edge.decayState] +
            roleScore;
        return Math.round(clamp(base / 2.3));
    }
    return {
        clamp,
        average,
        unique,
        getGroup,
        getPerson,
        getVenue,
        getEdgesForGroup,
        getEdgesForPerson,
        computeEngagementStrength
    };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformCalculationShared = FieldPlatformCalculationShared;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformCalculationShared;
}
