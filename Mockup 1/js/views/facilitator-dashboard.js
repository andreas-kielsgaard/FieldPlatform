// ─── Facilitator dashboard (facilitator mode) ───

const FacilitatorDashboardView = (() => {
  function render() {
    const persona = DATA.getCurrentPersona();
    const facilitator = persona && persona.facilitatorId ? DATA.getFacilitatorById(persona.facilitatorId) : DATA.facilitators[0];
    if (!facilitator) return '<div class="page">No facilitator profile found.</div>';

    const myEvents = facilitator.upcomingEvents.map(id => DATA.getEventById(id)).filter(Boolean);
    const communities = facilitator.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);

    return `
      <div class="page">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px">
          <div style="width:56px;height:56px;border-radius:50%;background:${facilitator.color};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:white">${facilitator.initials}</div>
          <div>
            <div style="font-size:22px;font-weight:800">${facilitator.name}</div>
            <div style="font-size:14px;color:var(--text-secondary)">${facilitator.practices.slice(0,2).join(' · ')}</div>
          </div>
          <button class="btn btn-primary" style="margin-left:auto" onclick="App.navigate('event-creation')">+ New event</button>
        </div>

        <!-- Stats -->
        <div class="stat-row">
          <div class="stat-card"><div class="stat-value">${myEvents.length}</div><div class="stat-label">Upcoming events</div></div>
          <div class="stat-card"><div class="stat-value">${myEvents.reduce((s,e)=>(s+(e.attending||[]).length),0)}</div><div class="stat-label">People interested</div></div>
          <div class="stat-card"><div class="stat-value">${communities.length}</div><div class="stat-label">Communities</div></div>
          <div class="stat-card"><div class="stat-value" style="color:var(--accent)">↑ 23%</div><div class="stat-label">Interest this month</div></div>
        </div>

        <!-- Opportunity cards -->
        <div style="margin-bottom:28px">
          <div class="section-block-title">Opportunities</div>
          <div class="dashboard-grid">
            <div class="opportunity-card info">
              <div class="opportunity-label">Crossover signal</div>
              <div class="opportunity-text">Somatic Network members are saving your events</div>
              <div class="opportunity-sub">12 saves from SP community in the last 2 weeks</div>
            </div>
            <div class="opportunity-card">
              <div class="opportunity-label">Invitation</div>
              <div class="opportunity-text">Circling Aarhus wants to feature your next event</div>
              <div class="opportunity-sub">Community steward Magnus sent a request</div>
            </div>
            <div class="opportunity-card warning">
              <div class="opportunity-label">Gap detected</div>
              <div class="opportunity-text">No events scheduled in next 3 weeks</div>
              <div class="opportunity-sub">Your followers' engagement may drop</div>
            </div>
          </div>
        </div>

        <!-- Upcoming events -->
        <div style="margin-bottom:28px">
          <div class="section-header">
            <span class="section-title">Your upcoming events</span>
            <button class="btn btn-outline btn-sm" onclick="App.navigate('event-creation')">+ Create</button>
          </div>
          ${myEvents.length > 0
            ? `<div class="card-grid">${myEvents.map(e => Cards.eventCard(e)).join('')}</div>`
            : `<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-title">No upcoming events</div><button class="btn btn-primary" onclick="App.navigate('event-creation')">Create your first event</button></div>`}
        </div>

        <!-- Your communities -->
        <div>
          <div class="section-header"><span class="section-title">Your communities</span></div>
          <div class="card-grid">
            ${communities.map(c => Cards.communityCard(c)).join('')}
          </div>
        </div>
      </div>
    `;
  }
  return { render };
})();
