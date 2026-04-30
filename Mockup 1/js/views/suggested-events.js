// ─── Suggested events queue (steward mode) ───

const SuggestedEventsView = (() => {
  const approved = new Set();
  const ignored = new Set();

  function render() {
    const persona = DATA.getCurrentPersona();
    const communityId = persona && persona.stewardFor ? persona.stewardFor : 'cr';
    const community = DATA.getCommunityById(communityId);
    const queue = DATA.suggestedEventsQueue[communityId] || [];

    return `
      <div class="page" style="max-width:800px">
        <div class="breadcrumb">
          <a onclick="App.navigate('steward-dashboard')">Dashboard</a>
          <span class="breadcrumb-sep">›</span>
          <span>Suggested events queue</span>
        </div>

        <div style="margin-bottom:24px">
          <h1 style="font-size:24px;font-weight:800;margin-bottom:4px">Suggested events for ${community ? community.shortName : 'your community'}</h1>
          <p style="font-size:14px;color:var(--text-secondary)">Members have flagged these events as potentially relevant to your community. Review and decide.</p>
        </div>

        <div id="suggestion-list">
          ${queue.map((s, idx) => renderSuggestionCard(s, idx, communityId)).join('')}
        </div>

        ${queue.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">✉️</div>
            <div class="empty-state-title">No suggestions waiting</div>
            <p style="color:var(--text-muted);font-size:14px">When members suggest events, they'll appear here.</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderSuggestionCard(suggestion, idx, communityId) {
    const event = DATA.getEventById(suggestion.eventId);
    if (!event) return '';

    const host = DATA.getFacilitatorById(event.host);
    const communities = event.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const isApproved = approved.has(suggestion.eventId);
    const isIgnored = ignored.has(suggestion.eventId);

    const daysAgo = Math.round((new Date(2026,3,23) - suggestion.timestamp) / 86400000);

    return `
      <div class="suggestion-card ${isApproved ? 'approved' : ''} ${isIgnored ? 'ignored' : ''}" id="suggestion-${idx}"
           style="${isIgnored ? 'opacity:0.4' : ''}">
        <div class="suggestion-header">
          <div>
            <div class="suggestion-who">Suggested by a community member · ${daysAgo === 0 ? 'today' : daysAgo + 'd ago'}</div>
          </div>
          ${isApproved ? '<span class="chip green">✓ Approved</span>' : ''}
        </div>

        <div class="suggestion-note">"${suggestion.note}"</div>

        <!-- Event preview -->
        <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;margin-bottom:14px;cursor:pointer" onclick="App.navigate('event','${event.id}')">
          <div style="display:flex;gap:6px;margin-bottom:6px">
            ${communities.map(c=>`<span class="community-dot" style="background:${c.color}"></span>`).join('')}
          </div>
          <div style="font-size:16px;font-weight:700">${event.title}</div>
          <div style="font-size:13px;color:var(--text-secondary);margin-top:2px">${host ? host.name : ''} · ${DATA.formatDate(event.date)}</div>
          <div style="font-size:13px;color:var(--text-secondary);margin-top:4px">${event.description.slice(0, 100)}…</div>
          <div class="relevance-chips" style="margin-top:8px">
            ${event.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
            <span class="chip">${DATA.formatPrice(event)}</span>
            ${communities.map(c=>`<span class="chip" style="border-color:${c.color};color:${c.color}">${c.shortName}</span>`).join('')}
          </div>
        </div>

        <div class="suggestion-actions">
          <button class="btn btn-primary btn-sm" onclick="SuggestedEventsView.approve(${idx},'${suggestion.eventId}')">
            ${isApproved ? '✓ Approved' : '✓ Approve as relevant'}
          </button>
          <button class="btn btn-secondary btn-sm" onclick="SuggestedEventsView.feature(${idx},'${suggestion.eventId}')">⭐ Feature</button>
          <button class="btn btn-secondary btn-sm" onclick="SuggestedEventsView.ignore(${idx},'${suggestion.eventId}')">✕ Ignore</button>
        </div>
      </div>
    `;
  }

  function approve(idx, eventId) {
    approved.add(eventId);
    ignored.delete(eventId);
    const card = document.getElementById(`suggestion-${idx}`);
    if (card) {
      card.style.opacity = '1';
      card.querySelector('.suggestion-actions').innerHTML = `<span class="chip green">✓ Approved — event is now marked as relevant to your community</span>`;
    }
    App.toast('Event approved and added to your community\'s relevant events.');
  }

  function feature(idx, eventId) {
    App.toast('⭐ Event featured — it will be highlighted in your community page.');
  }

  function ignore(idx, eventId) {
    ignored.add(eventId);
    const card = document.getElementById(`suggestion-${idx}`);
    if (card) card.style.opacity = '0.35';
    App.toast('Event ignored and removed from queue.');
  }

  return { render, approve, feature, ignore };
})();
