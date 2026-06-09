(function () {
  function createViewModel(platform, copy) {
    const selectedRefs = [
      { type: "event", id: "e_ci_jam" },
      { type: "event", id: "e_harbor_integration" },
      { type: "community", id: "ci" },
      { type: "community", id: "tea" },
      { type: "venue", id: "v_dome" },
      { type: "person", id: "p_casey" }
    ];

    function objectChoices() {
      return selectedRefs.map(ref => objectSummary(ref.type, ref.id)).filter(Boolean);
    }

    function objectSummary(type, id) {
      const record = objectRecord(type, id);
      if (!record) return null;
      return {
        type,
        id,
        label: labelFor(type, id),
        typeLabel: copy.objectTypes[type] || type,
        description: descriptionFor(type, record)
      };
    }

    function objectRecord(type, id) {
      try {
        if (type === "event") return platform.events.get(id).data();
        if (type === "community") return platform.communities.get(id).data();
        if (type === "venue") return platform.venues.get(id).data();
        if (type === "person") return platform.users.get(id).profile();
        if (type === "generatedField") return platform.generatedFields.get(id).data();
      } catch (error) {
        return null;
      }
      if (type === "tag") return { id, name: id };
      return null;
    }

    function labelFor(type, id) {
      const record = objectRecord(type, id);
      if (!record) return id;
      return record.title || record.name || record.id || id;
    }

    function descriptionFor(type, record) {
      if (type === "event") {
        const venue = record.venueId ? labelFor("venue", record.venueId) : "a shared venue";
        return [record.time, venue, record.audience, record.access].filter(Boolean).join(" · ");
      }
      if (type === "community") {
        return [record.description, record.rhythm, record.entryGuidance].filter(Boolean).join(" ");
      }
      if (type === "venue") {
        return [record.type, record.location, record.atmosphere].filter(Boolean).join(" · ");
      }
      if (type === "person") {
        return [record.bio, record.lifeContext].filter(Boolean).join(" ");
      }
      if (type === "generatedField") {
        return record.description;
      }
      return record.name || record.id;
    }

    function relationCards(type, id) {
      return platform.fieldRelations.forObject(type, id).map(relation => relationCard(relation));
    }

    function activeRelationCards(type, id) {
      return relationCards(type, id).filter(card => ["accepted", "refined", "computed"].includes(card.raw.status));
    }

    function relationCard(relation) {
      const raw = relation.data();
      const explanation = relation.explanation() || {};
      const sourceLabel = endpointLabel(explanation.source, raw.sourceType, raw.sourceId);
      const targetLabel = endpointLabel(explanation.target, raw.targetType, raw.targetId);
      const movements = relation.movementOptions();

      return {
        id: raw.id,
        label: `${sourceLabel} -> ${targetLabel}`,
        connectionType: copy.relationKinds[raw.relationKind] || readable(raw.relationKind),
        status: copy.statusLabels[raw.status] || readable(raw.status),
        sourceLabel,
        targetLabel,
        why: explanation.reason || raw.reason || "This connection appears from shared context.",
        evidence: explanation.evidence || raw.evidence || [],
        visibility: copy.visibilityLabels[raw.visibility] || readable(raw.visibility),
        unclear: (explanation.holdTypes || raw.holdTypes || []).map(item => copy.holdLabels[item] || readable(item)),
        movementLabels: movements.map(item => copy.movementLabels[item] || readable(item)),
        movementValues: movements,
        source: copy.provenanceLabels[raw.provenance] || readable(raw.provenance),
        raw,
        explanation
      };
    }

    function endpointLabel(endpoint, type, id) {
      return endpoint?.label || labelFor(type, id);
    }

    function waysInForObject(type, id) {
      const seen = new Set();
      const ways = [];
      activeRelationCards(type, id).forEach(card => {
        card.movementValues.forEach(value => {
          if (seen.has(value)) return;
          seen.add(value);
          ways.push({
            value,
            label: copy.movementLabels[value] || readable(value),
            from: card.connectionType,
            relationId: card.id
          });
        });
      });
      return ways;
    }

    function targetChoices() {
      const items = [];
      platform.communities.list().forEach(item => items.push(choice("community", item.id, item.name())));
      platform.events.list().forEach(item => items.push(choice("event", item.id, item.title())));
      platform.venues.list().forEach(item => items.push(choice("venue", item.id, item.name())));
      platform.users.list().forEach(item => items.push(choice("person", item.id, item.name())));
      platform.generatedFields.generateFields().slice(0, 5).forEach(item => items.push(choice("generatedField", item.id, item.data().name)));

      const tagSet = new Set();
      platform.events.list().forEach(event => event.data().tags.forEach(tag => tagSet.add(tag)));
      platform.communities.list().forEach(community => community.data().tags.forEach(tag => tagSet.add(tag)));
      Array.from(tagSet).slice(0, 12).forEach(tag => items.push(choice("tag", tag, tag)));

      return items.sort((a, b) => a.label.localeCompare(b.label));
    }

    function choice(type, id, label) {
      return {
        type,
        id,
        label,
        typeLabel: copy.objectTypes[type] || type,
        value: `${type}:${id}`
      };
    }

    function pendingForCommunity(communityId) {
      return platform.fieldRelations.pendingForCommunity(communityId).map(relation => relationCard(relation));
    }

    function debugForObject(type, id) {
      return relationCards(type, id).map(card => ({
        id: card.raw.id,
        sourceType: card.raw.sourceType,
        sourceId: card.raw.sourceId,
        targetType: card.raw.targetType,
        targetId: card.raw.targetId,
        relationKind: card.raw.relationKind,
        status: card.raw.status,
        provenance: card.raw.provenance,
        visibility: card.raw.visibility,
        holdTypes: card.raw.holdTypes || [],
        movementUnlocked: card.raw.movementUnlocked || [],
        explanationMovementOptions: card.movementValues
      }));
    }

    function readable(value) {
      return String(value || "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    return {
      objectChoices,
      objectSummary,
      relationCards,
      waysInForObject,
      targetChoices,
      pendingForCommunity,
      debugForObject,
      labelFor
    };
  }

  window.Mockup5ViewModel = { createViewModel };
})();
