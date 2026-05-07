(function () {
  const storageKey = "field_platform_dev_tool_database_v1";
  const platform = FieldPlatformDomain.createPlatformDomain({ storageKey });
  const tests = window.PlatformDataLayerDevTests || [];

  const state = {
    section: "tests",
    table: "people",
    record: null,
    relationType: "user",
    relationId: "",
    functionId: "eventInterest"
  };

  const functionSpecs = [
    {
      id: "eventInterest",
      name: "eventInterest(person, event)",
      group: "Calculation API",
      params: [
        { name: "personId", type: "person" },
        { name: "eventId", type: "event" }
      ],
      run: values => platform.raw().calculations.eventInterest(values.personId, values.eventId)
    },
    {
      id: "engagementStrength",
      name: "engagementStrength(edge)",
      group: "Calculation API",
      params: [{ name: "edgeId", type: "edge" }],
      run: values => platform.raw().calculations.engagementStrength(values.edgeId)
    },
    {
      id: "bondingScore",
      name: "bondingScore(community)",
      group: "Calculation API",
      params: [{ name: "groupId", type: "group" }],
      run: values => platform.raw().calculations.bondingScore(values.groupId)
    },
    {
      id: "bridgingScore",
      name: "bridgingScore(community)",
      group: "Calculation API",
      params: [{ name: "groupId", type: "group" }],
      run: values => platform.raw().calculations.bridgingScore(values.groupId)
    },
    {
      id: "groupOverlap",
      name: "groupOverlap(community, community)",
      group: "Calculation API",
      params: [
        { name: "groupAId", type: "group" },
        { name: "groupBId", type: "group" }
      ],
      run: values => platform.raw().calculations.groupOverlap(values.groupAId, values.groupBId)
    },
    {
      id: "generatedFields",
      name: "generatedFields()",
      group: "Calculation API",
      params: [],
      run: () => platform.raw().calculations.generatedFields()
    },
    {
      id: "recommendEventsForPerson",
      name: "recommendEventsForPerson(person)",
      group: "Calculation API",
      params: [{ name: "personId", type: "person" }],
      run: values => platform.raw().calculations.recommendEventsForPerson(values.personId)
    },
    {
      id: "recommendGroupsForPerson",
      name: "recommendGroupsForPerson(person)",
      group: "Calculation API",
      params: [{ name: "personId", type: "person" }],
      run: values => platform.raw().calculations.recommendGroupsForPerson(values.personId)
    },
    {
      id: "recommendGroupsForEvent",
      name: "recommendGroupsForEvent(draft)",
      group: "Calculation API",
      params: [
        { name: "hostId", type: "person" },
        { name: "venueId", type: "venue" },
        { name: "tags", type: "text", defaultValue: "movement, beginner-friendly" },
        { name: "beginnerFriendly", type: "boolean", defaultValue: "true" }
      ],
      run: values => platform.raw().calculations.recommendGroupsForEvent({
        title: "Dev tool draft event",
        hostId: values.hostId,
        venueId: values.venueId,
        tags: splitTags(values.tags),
        beginnerFriendly: values.beginnerFriendly === "true",
        linkedGroups: [],
        relevantGroups: [],
        access: "public",
        attendance: { interested: [], attending: [] }
      })
    },
    {
      id: "personalGroupMetrics",
      name: "personalGroupMetrics(person, community)",
      group: "Calculation API",
      params: [
        { name: "personId", type: "person" },
        { name: "groupId", type: "group" }
      ],
      run: values => platform.raw().calculations.personalGroupMetrics(values.personId, values.groupId)
    },
    {
      id: "creatorGroupSignal",
      name: "creatorGroupSignal(person, community)",
      group: "Calculation API",
      params: [
        { name: "creatorId", type: "person" },
        { name: "groupId", type: "group" }
      ],
      run: values => platform.raw().calculations.creatorGroupSignal(values.creatorId, values.groupId)
    },
    {
      id: "summarizeGroup",
      name: "summarizeGroup(community)",
      group: "Calculation API",
      params: [{ name: "groupId", type: "group" }],
      run: values => platform.raw().calculations.summarizeGroup(values.groupId)
    },
    {
      id: "bridgePeople",
      name: "bridgePeople(community or field)",
      group: "Calculation API",
      params: [{ name: "groupOrFieldId", type: "groupOrField" }],
      run: values => platform.raw().calculations.bridgePeople(values.groupOrFieldId)
    },
    {
      id: "userEventsRecommended",
      name: "user.events.recommended()",
      group: "Managed Access",
      params: [{ name: "personId", type: "person" }],
      run: values => platform.users.get(values.personId).events.recommended()
    },
    {
      id: "userCommunitiesMember",
      name: "user.communities.member()",
      group: "Managed Access",
      params: [{ name: "personId", type: "person" }],
      run: values => platform.users.get(values.personId).communities.member()
    },
    {
      id: "communityHealth",
      name: "community.health()",
      group: "Managed Access",
      params: [{ name: "groupId", type: "group" }],
      run: values => platform.communities.get(values.groupId).health()
    },
    {
      id: "eventRelevanceFor",
      name: "event.relevanceFor(user)",
      group: "Managed Access",
      params: [
        { name: "eventId", type: "event" },
        { name: "personId", type: "person" }
      ],
      run: values => platform.events.get(values.eventId).relevanceFor(platform.users.get(values.personId))
    }
  ];

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    bindNavigation();
    bindUtilities();
    renderAll();
    platform.raw().database.subscribe(() => renderAll());
    setLastAction("Ready");
  }

  function cacheElements() {
    [
      "sectionTitle",
      "recordCount",
      "lastAction",
      "personaSelect",
      "resetDatabaseButton",
      "testList",
      "testOutput",
      "runAllTestsButton",
      "tableFilter",
      "tableList",
      "tableTitle",
      "tableRowCount",
      "tableContent",
      "recordPreview",
      "relationType",
      "relationObject",
      "relationMap",
      "relationDetails",
      "functionList",
      "functionInputs",
      "functionOutput",
      "runFunctionButton"
    ].forEach(id => {
      els[id] = document.getElementById(id);
    });
  }

  function bindNavigation() {
    document.querySelectorAll(".nav-button").forEach(button => {
      button.addEventListener("click", () => {
        state.section = button.dataset.section;
        document.querySelectorAll(".nav-button").forEach(item => item.classList.toggle("is-active", item === button));
        document.querySelectorAll(".section").forEach(section => section.classList.toggle("is-active", section.id === state.section));
        els.sectionTitle.textContent = button.textContent;
      });
    });
  }

  function bindUtilities() {
    els.resetDatabaseButton.addEventListener("click", () => {
      platform.resetDatabase();
      setLastAction("Database reset to seed snapshot");
    });

    els.personaSelect.addEventListener("change", () => {
      const snapshot = platform.snapshot();
      snapshot.appState = snapshot.appState || {};
      snapshot.appState.currentPersonId = els.personaSelect.value;
      platform.raw().database.replaceSnapshot(snapshot);
      setLastAction(`Persona set to ${els.personaSelect.value}`);
    });

    els.runAllTestsButton.addEventListener("click", runAllTests);
    els.tableFilter.addEventListener("input", renderTableList);
    els.relationType.addEventListener("change", () => {
      state.relationType = els.relationType.value;
      state.relationId = "";
      renderRelationObjectHelp();
      renderRelations();
    });
    els.relationObject.addEventListener("change", () => {
      state.relationId = els.relationObject.value;
      renderRelations();
    });
    els.runFunctionButton.addEventListener("click", executeSelectedFunction);
  }

  function renderAll() {
    renderPersonaHelp();
    renderRecordCount();
    renderTests();
    renderTableList();
    renderCurrentTable();
    renderRelationTypeHelp();
    renderRelationObjectHelp();
    renderRelations();
    renderFunctionList();
    renderFunctionInputs();
  }

  function renderPersonaHelp() {
    const current = platform.snapshot().appState?.currentPersonId || "p_casey";
    els.personaSelect.innerHTML = optionsFor(records("people"), current, item => `${item.name} (${item.id})`);
  }

  function renderRecordCount() {
    const snapshot = platform.snapshot();
    const total = platform.raw().database.collectionNames()
      .reduce((sum, collectionName) => sum + (Array.isArray(snapshot[collectionName]) ? snapshot[collectionName].length : 0), 0);
    els.recordCount.textContent = `${total} records`;
  }

  function renderTests() {
    els.testList.innerHTML = tests.map(test => `
      <button class="row-button" data-test-id="${escapeHtml(test.id)}">
        <span class="row-title">${escapeHtml(test.objectName)}</span>
        <span class="row-meta">${escapeHtml(test.description)}</span>
      </button>
    `).join("");

    els.testList.querySelectorAll("[data-test-id]").forEach(button => {
      button.addEventListener("click", () => runTest(button.dataset.testId));
    });
  }

  function runTest(testId) {
    const test = tests.find(item => item.id === testId);
    if (!test) return null;
    const before = platform.snapshot();
    const startedAt = performance.now();
    try {
      const result = test.run(platform);
      const duration = Math.round(performance.now() - startedAt);
      platform.raw().database.replaceSnapshot(before);
      const report = {
        status: "passed",
        object: test.objectName,
        durationMs: duration,
        rollback: "database snapshot restored after execution",
        result: toPlain(result)
      };
      els.testOutput.textContent = stringify(report);
      setLastAction(`${test.objectName} test passed`);
      return report;
    } catch (error) {
      platform.raw().database.replaceSnapshot(before);
      const report = {
        status: "failed",
        object: test.objectName,
        rollback: "database snapshot restored after failure",
        error: error.message
      };
      els.testOutput.textContent = stringify(report);
      setLastAction(`${test.objectName} test failed`);
      return report;
    }
  }

  function runAllTests() {
    const reports = tests.map(test => runTest(test.id));
    els.testOutput.textContent = stringify({
      status: reports.every(report => report.status === "passed") ? "passed" : "failed",
      rollback: "each script restored the snapshot independently",
      results: reports
    });
    setLastAction("All access-layer tests executed");
  }

  function renderTableList() {
    const filter = els.tableFilter.value.trim().toLowerCase();
    const names = platform.raw().database.collectionNames()
      .filter(name => !filter || name.toLowerCase().includes(filter));

    els.tableList.innerHTML = names.map(name => {
      const count = records(name).length;
      return `
        <button class="row-button ${state.table === name ? "is-active" : ""}" data-table="${escapeHtml(name)}">
          <span class="row-title">${escapeHtml(name)}</span>
          <span class="row-meta">${count} rows</span>
        </button>
      `;
    }).join("");

    els.tableList.querySelectorAll("[data-table]").forEach(button => {
      button.addEventListener("click", () => {
        state.table = button.dataset.table;
        state.record = null;
        renderTableList();
        renderCurrentTable();
      });
    });
  }

  function renderCurrentTable() {
    const rows = records(state.table);
    els.tableTitle.textContent = state.table;
    els.tableRowCount.textContent = `${rows.length} rows`;
    els.recordPreview.textContent = state.record ? stringify(state.record) : "";

    if (!rows.length) {
      els.tableContent.innerHTML = `<div class="empty">No rows</div>`;
      return;
    }

    const columns = tableColumns(rows);
    els.tableContent.innerHTML = `
      <table>
        <thead><tr>${columns.map(column => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row, index) => `
            <tr data-row-index="${index}">
              ${columns.map(column => `<td>${escapeHtml(cellValue(row, column))}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    els.tableContent.querySelectorAll("[data-row-index]").forEach(row => {
      row.addEventListener("click", () => {
        state.record = rows[Number(row.dataset.rowIndex)];
        els.recordPreview.textContent = stringify(state.record);
      });
    });
  }

  function renderRelationTypeHelp() {
    const types = [
      ["user", "User"],
      ["event", "Event"],
      ["community", "Community"],
      ["venue", "Venue"],
      ["field", "Generated Field"]
    ];
    els.relationType.innerHTML = types.map(([value, label]) => (
      `<option value="${value}" ${state.relationType === value ? "selected" : ""}>${label}</option>`
    )).join("");
  }

  function renderRelationObjectHelp() {
    const options = relationOptions(state.relationType);
    if (!state.relationId && options[0]) state.relationId = options[0].id;
    els.relationObject.innerHTML = optionsFor(options, state.relationId, option => option.label);
  }

  function renderRelations() {
    const relation = buildRelation(state.relationType, state.relationId);
    els.relationDetails.textContent = stringify(relation.details || {});
    els.relationMap.innerHTML = relation.groups.map(group => `
      <div class="relation-group">
        <div class="relation-heading">${escapeHtml(group.title)}</div>
        <div class="relation-items">
          ${group.items.length ? group.items.map(item => `
            <div class="relation-item">
              <span>${escapeHtml(item.label)}</span>
              <span class="meta">${escapeHtml(item.meta || "")}</span>
            </div>
          `).join("") : `<div class="relation-item"><span>None</span><span></span></div>`}
        </div>
      </div>
    `).join("");
  }

  function renderFunctionList() {
    els.functionList.innerHTML = functionSpecs.map(spec => `
      <button class="row-button ${state.functionId === spec.id ? "is-active" : ""}" data-function-id="${escapeHtml(spec.id)}">
        <span class="row-title">${escapeHtml(spec.name)}</span>
        <span class="row-meta">${escapeHtml(spec.group)}</span>
      </button>
    `).join("");

    els.functionList.querySelectorAll("[data-function-id]").forEach(button => {
      button.addEventListener("click", () => {
        state.functionId = button.dataset.functionId;
        renderFunctionList();
        renderFunctionInputs();
      });
    });
  }

  function renderFunctionInputs() {
    const spec = selectedFunction();
    els.functionInputs.innerHTML = spec.params.length ? spec.params.map(param => `
      <div class="input-row">
        <label for="function_${escapeHtml(param.name)}">${escapeHtml(param.name)}</label>
        ${inputForParam(param)}
      </div>
    `).join("") : `<p class="meta">No inputs required.</p>`;
  }

  function executeSelectedFunction() {
    const spec = selectedFunction();
    const values = {};
    spec.params.forEach(param => {
      values[param.name] = document.getElementById(`function_${param.name}`).value;
    });

    try {
      const result = spec.run(values);
      els.functionOutput.textContent = stringify({
        function: spec.name,
        inputs: values,
        result: toPlain(result)
      });
      setLastAction(`${spec.name} executed`);
    } catch (error) {
      els.functionOutput.textContent = stringify({
        function: spec.name,
        inputs: values,
        error: error.message
      });
      setLastAction(`${spec.name} failed`);
    }
  }

  function selectedFunction() {
    return functionSpecs.find(spec => spec.id === state.functionId) || functionSpecs[0];
  }

  function inputForParam(param) {
    const id = `function_${param.name}`;
    if (param.type === "text") {
      return `<input id="${escapeHtml(id)}" value="${escapeHtml(param.defaultValue || "")}">`;
    }
    if (param.type === "boolean") {
      return `
        <select id="${escapeHtml(id)}">
          <option value="true" ${param.defaultValue !== "false" ? "selected" : ""}>true</option>
          <option value="false" ${param.defaultValue === "false" ? "selected" : ""}>false</option>
        </select>
      `;
    }
    return `<select id="${escapeHtml(id)}">${optionsFor(valueHelp(param.type), "", option => option.label)}</select>`;
  }

  function valueHelp(type) {
    if (type === "person") return records("people").map(item => ({ id: item.id, label: `${item.name} (${item.id})` }));
    if (type === "event") return platform.raw().queries.listEvents().map(item => ({ id: item.id, label: `${item.title} (${item.id})` }));
    if (type === "group") return records("groups").map(item => ({ id: item.id, label: `${item.name} (${item.id})` }));
    if (type === "venue") return records("venues").map(item => ({ id: item.id, label: `${item.name} (${item.id})` }));
    if (type === "edge") return records("participationEdges").map(item => ({ id: item.id, label: `${item.personId} to ${item.groupId} (${item.id})` }));
    if (type === "field") return platform.generatedFields.generateFields().map(item => ({ id: item.id, label: `${item.data().name} (${item.id})` }));
    if (type === "groupOrField") return [
      ...valueHelp("group"),
      ...valueHelp("field")
    ];
    return [];
  }

  function relationOptions(type) {
    if (type === "user") return valueHelp("person");
    if (type === "event") return valueHelp("event");
    if (type === "community") return valueHelp("group");
    if (type === "venue") return valueHelp("venue");
    if (type === "field") return valueHelp("field");
    return [];
  }

  function buildRelation(type, id) {
    if (!id) return { groups: [], details: {} };
    if (type === "user") return userRelation(id);
    if (type === "event") return eventRelation(id);
    if (type === "community") return communityRelation(id);
    if (type === "venue") return venueRelation(id);
    if (type === "field") return fieldRelation(id);
    return { groups: [], details: {} };
  }

  function userRelation(personId) {
    const user = platform.users.get(personId);
    const edges = user.participationEdges();
    return {
      details: user.profile(),
      groups: [
        relationGroup("Participation Edges", edges.map(edge => ({
          label: edge.community().name(),
          meta: `${edge.data().relationshipState}, ${edge.data().accessLevel}`
        }))),
        relationGroup("Events Attending", user.events.attending().map(eventItem)),
        relationGroup("Events Interested", user.events.interested().map(eventItem)),
        relationGroup("Managed Events", user.events.managed().map(eventItem)),
        relationGroup("Managed Communities", user.communities.managed().map(communityItem))
      ]
    };
  }

  function eventRelation(eventId) {
    const event = platform.events.get(eventId);
    const data = event.data();
    return {
      details: data,
      groups: [
        relationGroup("Venue", [venueItem(event.venue())]),
        relationGroup("Linked Communities", event.linkedCommunities().map(communityItem)),
        relationGroup("Relevant Communities", event.relevantCommunities().map(communityItem)),
        relationGroup("Interested People", data.attendance.interested.map(personItemById)),
        relationGroup("Attending People", data.attendance.attending.map(personItemById)),
        relationGroup("Suggested Shares", records("suggestedEventShares").filter(share => share.eventId === eventId).map(share => ({
          label: `${share.groupId} via ${share.suggestedBy}`,
          meta: share.status
        }))),
        relationGroup("Managers", records("managedObjects").filter(item => item.objectType === "event" && item.objectId === eventId).map(managerItem))
      ]
    };
  }

  function communityRelation(groupId) {
    const community = platform.communities.get(groupId);
    return {
      details: community.data(),
      groups: [
        relationGroup("Stewards", community.data().stewards.map(personItemById)),
        relationGroup("Venues", community.data().venues.map(venueItemById)),
        relationGroup("Events", community.events().map(eventItem)),
        relationGroup("Participation Edges", community.participationEdges().map(edge => ({
          label: edge.user().name(),
          meta: `${edge.data().relationshipState}, ${edge.data().accessLevel}`
        }))),
        relationGroup("Membership Requests", records("membershipRequests").filter(request => request.groupId === groupId).map(request => ({
          label: request.personId,
          meta: request.status
        }))),
        relationGroup("Suggested Event Shares", records("suggestedEventShares").filter(share => share.groupId === groupId).map(share => ({
          label: share.eventId,
          meta: share.status
        }))),
        relationGroup("Group Relationships", records("groupRelationships").filter(rel => rel.fromGroupId === groupId || rel.toGroupId === groupId).map(rel => ({
          label: rel.fromGroupId === groupId ? rel.toGroupId : rel.fromGroupId,
          meta: rel.type
        }))),
        relationGroup("Generated Fields", community.generatedFields().map(field => ({
          label: field.data().name,
          meta: field.id
        })))
      ]
    };
  }

  function venueRelation(venueId) {
    const venue = platform.venues.get(venueId);
    return {
      details: venue.data(),
      groups: [
        relationGroup("Communities", venue.communities().map(communityItem)),
        relationGroup("Events", venue.events().map(eventItem))
      ]
    };
  }

  function fieldRelation(fieldId) {
    const field = platform.generatedFields.get(fieldId);
    return {
      details: field.data(),
      groups: [
        relationGroup("Communities", field.communities().map(communityItem)),
        relationGroup("Bridge Events", field.bridgeEvents().map(eventItem)),
        relationGroup("Deeper Events", field.deeperEvents().map(eventItem)),
        relationGroup("Bridge People", field.bridgePeople().map(item => ({
          label: item.person?.name || item.person?.id || "Unknown",
          meta: `score ${item.bridgeScore}`
        })))
      ]
    };
  }

  function relationGroup(title, items) {
    return { title, items: items.filter(Boolean) };
  }

  function records(collectionName) {
    return platform.raw().database.list(collectionName);
  }

  function tableColumns(rows) {
    const columns = [];
    rows.forEach(row => {
      Object.keys(row || {}).forEach(key => {
        if (!columns.includes(key)) columns.push(key);
      });
    });
    return columns.slice(0, 10);
  }

  function cellValue(row, column) {
    const value = row ? row[column] : "";
    if (Array.isArray(value)) return value.join(", ");
    if (value && typeof value === "object") return JSON.stringify(value);
    return value === undefined || value === null ? "" : String(value);
  }

  function optionsFor(items, selectedId, labelFor) {
    return items.map(item => {
      const id = item.id;
      const selected = selectedId === id ? "selected" : "";
      return `<option value="${escapeHtml(id)}" ${selected}>${escapeHtml(labelFor(item))}</option>`;
    }).join("");
  }

  function personItemById(personId) {
    const person = platform.raw().queries.getPerson(personId);
    return person ? { label: person.name, meta: person.id } : { label: personId, meta: "missing person" };
  }

  function venueItemById(venueId) {
    const venue = platform.venues.get(venueId);
    return venueItem(venue);
  }

  function eventItem(event) {
    return { label: event.title(), meta: event.id };
  }

  function communityItem(community) {
    return { label: community.name(), meta: community.id };
  }

  function venueItem(venue) {
    return { label: venue.name(), meta: venue.id };
  }

  function managerItem(record) {
    const person = platform.raw().queries.getPerson(record.personId);
    return {
      label: person ? person.name : record.personId,
      meta: record.roles.join(", ")
    };
  }

  function splitTags(value) {
    return value.split(",").map(item => item.trim()).filter(Boolean);
  }

  function toPlain(value) {
    if (value === null || value === undefined) return value;
    if (Array.isArray(value)) return value.map(toPlain);
    if (typeof value !== "object") return value;
    if (typeof value.data === "function") return toPlain(value.data());
    const output = {};
    Object.keys(value).forEach(key => {
      const item = value[key];
      if (typeof item !== "function") output[key] = toPlain(item);
    });
    return output;
  }

  function stringify(value) {
    return JSON.stringify(toPlain(value), null, 2);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setLastAction(message) {
    els.lastAction.textContent = message;
  }
})();
