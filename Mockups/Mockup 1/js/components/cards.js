// ─── Reusable card renderers ───

const Cards = (() => {

  function eventCard(event, opts = {}) {
    const host = DATA.getFacilitatorById(event.host);
    const venue = DATA.getVenueById(event.venue);
    const communities = event.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const persona = DATA.getCurrentPersona();
    const isSaved = persona && persona.savedEvents.includes(event.id);

    const communityDots = communities.map(c =>
      `<span class="community-dot" style="background:${c.color}" title="${c.name}"></span>`
    ).join('');

    const relevanceChips = (event.relevanceLabels || []).slice(0, 2).map(label =>
      `<span class="chip green">${label}</span>`
    ).join('');

    const priceColor = event.price === 0 ? 'green' : event.price < 100 ? '' : event.price > 300 ? 'purple' : '';

    return `
      <div class="card event-card" data-event-id="${event.id}" onclick="App.navigate('event', '${event.id}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
          <div style="display:flex;gap:4px;align-items:center">${communityDots}</div>
          <span style="font-size:11px;font-weight:600;color:${event.price===0?'var(--accent)':'var(--text-muted)'}">${DATA.formatPrice(event)}</span>
        </div>
        <div class="card-title">${event.title}</div>
        <div class="card-subtitle">${host ? host.name : ''}</div>
        <div class="card-meta">
          <span class="card-meta-item">📅 ${DATA.formatDate(event.date)}</span>
          <span class="card-meta-item">🕐 ${DATA.formatTime(event.date)}</span>
          ${venue ? `<span class="card-meta-item">📍 ${venue.name}</span>` : ''}
        </div>
        ${event.beginnerFriendly ? '<span class="chip green" style="margin-right:4px">Beginner friendly</span>' : ''}
        ${event.recurring ? '<span class="chip">Recurring</span>' : ''}
        <div class="relevance-chips">${relevanceChips}</div>
      </div>
    `;
  }

  function communityCard(community, opts = {}) {
    const persona = DATA.getCurrentPersona();
    const isFollowing = persona && persona.communities.includes(community.id);
    const upcomingCount = DATA.getEventsForCommunity(community.id).length;

    return `
      <div class="card community-card" onclick="App.navigate('community', '${community.id}')">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:${community.color};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${community.emoji}</div>
          <div>
            <div class="card-title" style="margin:0">${community.shortName}</div>
            <div style="font-size:12px;color:var(--text-muted)">${community.memberCount} members</div>
          </div>
          ${isFollowing ? '<span class="chip green" style="margin-left:auto">Following</span>' : ''}
        </div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;line-height:1.5">${community.tagline}</div>
        <div class="relevance-chips">
          ${community.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
          <span class="chip">${upcomingCount} upcoming events</span>
          ${community.practices.slice(0,2).map(p => `<span class="chip">${p}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function facilitatorCard(facilitator, opts = {}) {
    const persona = DATA.getCurrentPersona();
    const isFollowing = persona && persona.followedFacilitators.includes(facilitator.id);
    const communities = facilitator.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);

    return `
      <div class="card facilitator-card" onclick="App.navigate('facilitator', '${facilitator.id}')">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <div style="width:44px;height:44px;border-radius:50%;background:${facilitator.color};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:white;flex-shrink:0">${facilitator.initials}</div>
          <div>
            <div class="card-title" style="margin:0;font-size:15px">${facilitator.name}</div>
            <div style="font-size:12px;color:var(--text-muted)">${facilitator.practices.slice(0,2).join(' · ')}</div>
          </div>
          ${isFollowing ? '<span class="chip green" style="margin-left:auto">Following</span>' : ''}
        </div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;line-height:1.5">${facilitator.values}</div>
        <div class="relevance-chips">
          ${communities.map(c => `<span class="chip" style="border-color:${c.color};color:${c.color}">${c.shortName}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function venueCard(venue) {
    const communities = venue.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    return `
      <div class="card venue-card" onclick="App.navigate('venue', '${venue.id}')">
        <div class="card-title">${venue.name}</div>
        <div class="card-subtitle">${venue.type} · ${venue.address}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px">${venue.atmosphere}</div>
        <div class="relevance-chips">
          <span class="chip">${venue.upcoming} upcoming events</span>
          ${communities.slice(0,2).map(c => `<span class="chip" style="border-color:${c.color};color:${c.color}">${c.shortName}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function eventListRow(event) {
    const host = DATA.getFacilitatorById(event.host);
    const venue = DATA.getVenueById(event.venue);
    const communities = event.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const communityDots = communities.map(c =>
      `<span class="community-dot" style="background:${c.color}" title="${c.name}"></span>`
    ).join('');

    return `
      <div class="card" style="display:flex;gap:16px;align-items:flex-start;padding:14px 18px;margin-bottom:8px" onclick="App.navigate('event', '${event.id}')">
        <div style="flex-shrink:0;text-align:center;min-width:48px">
          <div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase">${DATA.formatDate(event.date).split(' ')[0]}</div>
          <div style="font-size:20px;font-weight:800;line-height:1">${event.date.getDate()}</div>
          <div style="font-size:11px;color:var(--text-muted)">${DATA.formatTime(event.date)}</div>
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">${communityDots}</div>
          <div style="font-size:15px;font-weight:700">${event.title}</div>
          <div style="font-size:13px;color:var(--text-secondary)">${host ? host.name : ''} · ${venue ? venue.name : ''}</div>
          <div class="relevance-chips" style="margin-top:6px">
            ${(event.relevanceLabels||[]).slice(0,1).map(l=>`<span class="chip green">${l}</span>`).join('')}
            ${event.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
          </div>
        </div>
        <div style="flex-shrink:0;text-align:right">
          <div style="font-size:13px;font-weight:600;color:${event.price===0?'var(--accent)':'var(--text-primary)'}">${DATA.formatPrice(event)}</div>
        </div>
      </div>
    `;
  }

  return { eventCard, communityCard, facilitatorCard, venueCard, eventListRow };
})();
