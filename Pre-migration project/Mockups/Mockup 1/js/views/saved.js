// ─── Saved / My Activity ───

const SavedView = (() => {
  function render() {
    const persona = DATA.getCurrentPersona();
    if (!persona) return '<div class="page"><div class="empty-state"><div class="empty-state-icon">👤</div><div class="empty-state-title">Select a persona to see saved items</div></div></div>';

    const savedEvents = (persona.savedEvents || []).map(id => DATA.getEventById(id)).filter(Boolean);
    const attending = (persona.attendingEvents || []).map(id => DATA.getEventById(id)).filter(Boolean);
    const followedComms = (persona.communities || []).map(id => DATA.getCommunityById(id)).filter(Boolean);
    const followedFacs = (persona.followedFacilitators || []).map(id => DATA.getFacilitatorById(id)).filter(Boolean);
    const history = (persona.participationHistory || []).map(id => DATA.getEventById(id)).filter(Boolean);

    return `
      <div class="page">
        <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px">My Activity</h1>
        <p style="color:var(--text-secondary);font-size:14px;margin-bottom:32px">Viewing as ${persona.name} · ${persona.role}</p>

        <div class="tabs">
          <button class="tab-btn active" onclick="App.switchTab(this,'saved-events-tab')">Saved (${savedEvents.length})</button>
          <button class="tab-btn" onclick="App.switchTab(this,'attending-tab')">Attending (${attending.length})</button>
          <button class="tab-btn" onclick="App.switchTab(this,'communities-tab')">Communities (${followedComms.length})</button>
          <button class="tab-btn" onclick="App.switchTab(this,'facilitators-tab')">Facilitators (${followedFacs.length})</button>
          <button class="tab-btn" onclick="App.switchTab(this,'history-tab')">History</button>
        </div>

        <div id="saved-events-tab">
          ${savedEvents.length > 0
            ? `<div class="card-grid">${savedEvents.map(e => Cards.eventCard(e)).join('')}</div>`
            : `<div class="empty-state"><div class="empty-state-icon">☆</div><div class="empty-state-title">No saved events yet</div><p style="color:var(--text-muted);font-size:14px">Browse events and click Save to build your list.</p></div>`}
        </div>

        <div id="attending-tab" style="display:none">
          ${attending.length > 0
            ? `<div class="card-grid">${attending.map(e => Cards.eventCard(e)).join('')}</div>`
            : `<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-title">No upcoming events marked attending</div></div>`}
        </div>

        <div id="communities-tab" style="display:none">
          ${followedComms.length > 0
            ? `<div class="card-grid">${followedComms.map(c => Cards.communityCard(c)).join('')}</div>`
            : `<div class="empty-state"><div class="empty-state-icon">🌀</div><div class="empty-state-title">Not following any communities yet</div></div>`}
        </div>

        <div id="facilitators-tab" style="display:none">
          ${followedFacs.length > 0
            ? `<div class="card-grid">${followedFacs.map(f => Cards.facilitatorCard(f)).join('')}</div>`
            : `<div class="empty-state"><div class="empty-state-icon">👤</div><div class="empty-state-title">Not following any facilitators yet</div></div>`}
        </div>

        <div id="history-tab" style="display:none">
          <div style="margin-bottom:20px">
            <p style="font-size:13px;color:var(--text-secondary)">Based on participation, here are adjacent suggestions:</p>
          </div>
          ${history.length > 0
            ? history.map(e => Cards.eventListRow(e)).join('')
            : `<div class="empty-state"><div class="empty-state-icon">📖</div><div class="empty-state-title">No participation history</div></div>`}
          ${history.length > 0 ? `
            <div style="margin-top:32px">
              <div class="section-header"><span class="section-title">Because you've been going to these</span></div>
              <div class="card-grid">
                ${DATA.getRelevantEventsForPersona(persona, 4).map(e => Cards.eventCard(e)).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
  return { render };
})();
