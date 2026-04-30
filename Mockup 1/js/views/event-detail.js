// ─── Event detail page ───

const EventDetailView = (() => {
  function render(eventId) {
    const event = DATA.getEventById(eventId);
    if (!event) return '<div class="page">Event not found.</div>';

    const host = DATA.getFacilitatorById(event.host);
    const venue = DATA.getVenueById(event.venue);
    const communities = event.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const persona = DATA.getCurrentPersona();
    const isSaved = persona && persona.savedEvents.includes(eventId);
    const isAttending = persona && persona.attendingEvents && persona.attendingEvents.includes(eventId);

    // Fake attending avatars
    const attendingPersonas = (event.attending || []).slice(0, 5).map(pid => {
      const colors = ['#4a7c59','#7b5ea7','#e8742a','#3aaa7a','#d94a7a','#5abcb9','#f0a500','#a07850'];
      const color = colors[Math.abs(pid.charCodeAt(1)) % colors.length];
      return `<div class="attending-avatar" style="background:${color}">${pid[0].toUpperCase()}</div>`;
    }).join('');

    const gradientColors = communities.length > 0
      ? `linear-gradient(135deg, ${communities[0].color}cc 0%, ${communities[communities.length-1].color}99 100%)`
      : 'linear-gradient(135deg, #1a2e22 0%, #2a4535 100%)';

    return `
      <div class="event-page">
        <div class="breadcrumb">
          <a onclick="App.navigate('events')">Events</a>
          <span class="breadcrumb-sep">›</span>
          <span>${event.title}</span>
        </div>

        <div class="event-hero">
          <div class="event-hero-bg" style="background:${gradientColors}"></div>
          <div class="event-hero-content">
            <div class="event-hero-title">${event.title}</div>
            <div class="event-hero-sub">${host ? `Hosted by ${host.name}` : ''} ${event.recurring ? '· Recurring event' : ''}</div>
          </div>
        </div>

        <!-- Community context bar -->
        <div class="community-context-bar">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex:1">
            ${communities.map(c => `
              <div style="display:flex;align-items:center;gap:6px;cursor:pointer" onclick="App.navigate('community','${c.id}')">
                <span>${c.emoji}</span>
                <span style="font-size:13px;font-weight:600;color:${c.color}">${c.name}</span>
              </div>
            `).join('<span style="color:var(--border)">·</span>')}
          </div>
          ${event.attending && event.attending.length > 0 ? `
            <div style="display:flex;align-items:center;gap:6px">
              <div class="attending-avatars">${attendingPersonas}</div>
              <span style="font-size:12px;color:var(--text-secondary)">${event.attending.length} going</span>
            </div>
          ` : ''}
        </div>

        <!-- Meta bar -->
        <div class="event-meta-bar">
          <div class="event-meta-item">📅 <strong>${DATA.formatDate(event.date)}</strong></div>
          <div class="event-meta-item">🕐 <strong>${DATA.formatTime(event.date)}</strong> · ${event.duration}</div>
          ${venue ? `<div class="event-meta-item" style="cursor:pointer" onclick="App.navigate('venue','${venue.id}')">📍 <strong>${venue.name}</strong></div>` : ''}
          <div class="event-meta-item" style="color:${event.price===0?'var(--accent)':'var(--text-primary)'}">💰 <strong>${DATA.formatPrice(event)}</strong></div>
          ${event.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
        </div>

        <!-- Actions -->
        <div class="event-actions">
          <button class="btn btn-primary" onclick="App.attendEvent('${eventId}',this)">${isAttending ? '✓ Attending' : 'Attend / Interested'}</button>
          <button class="btn btn-secondary" onclick="App.saveEvent('${eventId}',this)">${isSaved ? '✓ Saved' : '☆ Save'}</button>
          <button class="btn btn-outline" onclick="App.suggestEvent('${eventId}')">↗ Suggest to community</button>
        </div>

        <!-- Relevance chips -->
        ${event.relevanceLabels && event.relevanceLabels.length > 0 ? `
          <div style="margin-bottom:20px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Why this might be for you</div>
            <div class="relevance-chips">
              ${event.relevanceLabels.map(l => `<span class="chip green">✦ ${l}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Description -->
        <div style="margin-bottom:24px">
          <p style="font-size:15px;line-height:1.7;color:var(--text-secondary)">${event.description}</p>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px">
          <div>
            <div class="section-block-title">Who this is for</div>
            <p style="font-size:14px;color:var(--text-secondary)">${event.whoFor}</p>
          </div>
          <div>
            <div class="section-block-title">What to expect</div>
            <p style="font-size:14px;color:var(--text-secondary)">${event.whatToExpect}</p>
          </div>
        </div>

        ${host ? `
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:24px;display:flex;gap:14px;align-items:flex-start;cursor:pointer" onclick="App.navigate('facilitator','${host.id}')">
          <div style="width:48px;height:48px;border-radius:50%;background:${host.color};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:white;flex-shrink:0">${host.initials}</div>
          <div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px">Facilitator</div>
            <div style="font-size:15px;font-weight:700">${host.name}</div>
            <div style="font-size:13px;color:var(--text-secondary);margin-top:2px">${host.practices.slice(0,2).join(' · ')}</div>
            <div style="font-size:13px;color:var(--text-secondary);margin-top:4px;font-style:italic">"${host.values}"</div>
          </div>
          <button class="btn btn-outline btn-sm" style="margin-left:auto;flex-shrink:0">View profile →</button>
        </div>
        ` : ''}

        ${venue ? `
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:24px;cursor:pointer" onclick="App.navigate('venue','${venue.id}')">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px">Venue</div>
          <div style="font-size:15px;font-weight:700">${venue.name}</div>
          <div style="font-size:13px;color:var(--text-secondary)">${venue.type} · ${venue.address}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${venue.accessibility}</div>
        </div>
        ` : ''}

        <!-- Related events -->
        <div style="margin-top:32px">
          <div class="section-header"><span class="section-title">Related offerings</span></div>
          <div class="h-scroll">
            ${DATA.events
              .filter(e => e.id !== eventId && e.communities.some(c => event.communities.includes(c)))
              .slice(0, 4)
              .map(e => `<div style="min-width:260px;flex-shrink:0">${Cards.eventCard(e)}</div>`)
              .join('')}
          </div>
        </div>
      </div>
    `;
  }
  return { render };
})();
