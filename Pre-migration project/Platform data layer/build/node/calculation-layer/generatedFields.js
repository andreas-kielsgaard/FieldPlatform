"use strict";
const FieldPlatformGeneratedFieldCalculations = (() => {
    const shared = getShared();
    const { average, clamp, getEdgesForGroup } = shared;
    const { computeGroupOverlap } = getOverlap();
    function generateEmergentFields(data) {
        const tagFields = buildTagFields(data);
        const venueFields = buildVenueFields(data);
        const overlapField = buildOverlapFields(data);
        return [...tagFields, ...venueFields, ...overlapField]
            .sort((a, b) => b.strength - a.strength)
            .slice(0, 8);
    }
    function buildTagFields(data) {
        const tagCounts = {};
        data.groups.forEach(group => {
            group.tags.forEach(tag => {
                if (!tagCounts[tag])
                    tagCounts[tag] = { groups: [], people: new Set() };
                tagCounts[tag].groups.push(group.id);
                getEdgesForGroup(data, group.id).forEach(edge => tagCounts[tag].people.add(edge.personId));
            });
        });
        return Object.entries(tagCounts)
            .filter(([, value]) => value.groups.length >= 2)
            .map(([tag, value]) => ({
            id: `field_tag_${tag.replaceAll(" ", "_")}`,
            name: `${titleCase(tag)} Field`,
            generatedFrom: "tags",
            groups: value.groups,
            peopleCount: value.people.size,
            tags: [tag],
            strength: clamp(value.groups.length * 18 + value.people.size * 3),
            clarity: value.groups.length >= 3 ? "clear" : "forming",
            description: `Generated because ${value.groups.length} named groups share the practice tag "${tag}".`
        }));
    }
    function buildVenueFields(data) {
        return data.venues
            .filter(venue => venue.associatedGroups.length >= 2)
            .map(venue => {
            const people = new Set(venue.associatedGroups.flatMap(groupId => getEdgesForGroup(data, groupId).map(edge => edge.personId)));
            return {
                id: `field_venue_${venue.id}`,
                name: `${venue.name} Practice Cluster`,
                generatedFrom: "venues",
                groups: venue.associatedGroups,
                peopleCount: people.size,
                tags: ["venue overlap", venue.type],
                strength: clamp(venue.associatedGroups.length * 16 + people.size * 2),
                clarity: venue.associatedGroups.length >= 3 ? "clear" : "forming",
                description: `Generated from repeated use of ${venue.name} by multiple groups.`
            };
        });
    }
    function buildOverlapFields(data) {
        const movementGroups = ["ci", "ecstatic", "acro", "queer"];
        const relationalGroups = ["circling", "tea", "meditation", "somatic"];
        return [
            customField(data, "field_movement_bridge", "Movement and Consent Bridge", "participation overlap", movementGroups, ["movement", "consent", "body literacy"]),
            customField(data, "field_relational_landing", "Relational Landing Field", "rhythm", relationalGroups, ["presence", "tea", "integration"])
        ];
    }
    function customField(data, id, name, generatedFrom, groups, tags) {
        const people = new Set(groups.flatMap(groupId => getEdgesForGroup(data, groupId).map(edge => edge.personId)));
        const averageOverlap = average(pairGroups(groups).map(([a, b]) => computeGroupOverlap(data, a, b).score));
        return {
            id,
            name,
            generatedFrom,
            groups,
            peopleCount: people.size,
            tags,
            strength: Math.round(clamp(averageOverlap + groups.length * 8)),
            clarity: averageOverlap > 45 ? "clear" : "emerging",
            description: `Generated from repeated overlaps across ${groups.length} groups, not created as a formal group.`
        };
    }
    function pairGroups(groups) {
        const pairs = [];
        groups.forEach((groupId, index) => {
            groups.slice(index + 1).forEach(otherId => pairs.push([groupId, otherId]));
        });
        return pairs;
    }
    function titleCase(text) {
        return text.replace(/\b\w/g, letter => letter.toUpperCase());
    }
    function getShared() {
        if (typeof require === "function")
            return require("./shared");
        return window.FieldPlatformCalculationShared;
    }
    function getOverlap() {
        if (typeof require === "function")
            return require("./overlap");
        return window.FieldPlatformOverlapCalculations;
    }
    return { generateEmergentFields };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformGeneratedFieldCalculations = FieldPlatformGeneratedFieldCalculations;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformGeneratedFieldCalculations;
}
