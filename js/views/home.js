// ─── Home: Orientation tiles ───

const HomeView = (() => {

  function render() {
    const persona = DATA.getCurrentPersona();
    const firstName = persona ? persona.name.split(' ')[0] : null;
    const role = DATA.currentRole;

    return `
      <div style="min-height:calc(100vh - var(--topbar-h))">

        <!-- Hero -->
        <div class="orientation-hero">
          <div style="position:relative;z-index:1;max-width:580px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.4);margin-bottom:12px">Field · Aarhus</div>
            <h1 class="orientation-hero-title">How would you like to be with the field today${firstName ? ',&thinsp;' + firstName : ''}?</h1>
            <p class="orientation-hero-sub">Several nourishing ways to relate with what is alive around you. Choose what serves now.</p>
          </div>
        </div>

        <!-- Orientation grid -->
        <div class="orientation-grid">

          <!-- A. Continue -->
          <div class="orientation-tile" style="--tc:#4a7c59;--tbg:#0d1710" onclick="App.navigate('explore-familiar')">
            <div class="tile-eyebrow">↩ Return</div>
            <div class="tile-phrase">Continue what already supports you</div>
            <div class="tile-desc">The nourishing threads already here. Recurring practices, familiar spaces, known faces.</div>
            <div class="tile-glimpses">${glimpseContinue(persona)}</div>
            <div class="tile-cta">Enter <span class="tile-arrow">→</span></div>
          </div>

          <!-- B. Taste -->
          <div class="orientation-tile" style="--tc:#7b5ea7;--tbg:#120d1a" onclick="App.navigate('explore-adjacent')">
            <div class="tile-eyebrow">⟡ Discover</div>
            <div class="tile-phrase">Taste new connections</div>
            <div class="tile-desc">Adjacent worlds your people also move through. Close enough to feel familiar, new enough to open something.</div>
            <div class="tile-glimpses">${glimpseTaste(persona)}</div>
            <div class="tile-cta">Explore <span class="tile-arrow">→</span></div>
          </div>

          <!-- C. Rhythm — featured tile -->
          <div class="orientation-tile tile-featured" style="--tc:#5abcb9;--tbg:#0d191f" onclick="App.navigate('rhythm')">
            <div class="tile-eyebrow">◎ Sense</div>
            <div class="tile-phrase">Explore the rhythm of the field</div>
            <div class="tile-desc">Feel how the field moves through time. Where things come alive, when they pulse, what recurs and what is occasional.</div>
            <div class="tile-glimpses">${glimpseRhythm()}</div>
            <div class="tile-cta">Feel it <span class="tile-arrow">→</span></div>
          </div>

          <!-- D. Deepen -->
          <div class="orientation-tile" style="--tc:#d94a7a;--tbg:#1a0d11" onclick="App.navigate('communities')">
            <div class="tile-eyebrow">↓ Go deeper</div>
            <div class="tile-phrase">Deepen what already matters</div>
            <div class="tile-desc">Practice groups, recurring labs, ways to participate more meaningfully in the communities already here.</div>
            <div class="tile-glimpses">${glimpseDeepen(persona)}</div>
            <div class="tile-cta">Go deeper <span class="tile-arrow">→</span></div>
          </div>

          <!-- E. Create -->
          <div class="orientation-tile" style="--tc:#f0a500;--tbg:#1a1400"
            onclick="${role === 'participant' ? "App.setRole('facilitator')" : role === 'facilitator' ? "App.navigate('facilitator-dashboard')" : "App.navigate('steward-dashboard')"}">
            <div class="tile-eyebrow">✦ Offer</div>
            <div class="tile-phrase">Create, share, or nurture</div>
            <div class="tile-desc">Offer something. Suggest an event to your community. Steward a space that matters.</div>
            <div class="tile-glimpses">${glimpseCreate(persona, role)}</div>
            <div class="tile-cta">Start <span class="tile-arrow">→</span></div>
          </div>

          <!-- F. Make space -->
          <div class="orientation-tile" style="--tc:#8c8a86;--tbg:#111111" onclick="App.navigate('saved')">
            <div class="tile-eyebrow">○ Rest</div>
            <div class="tile-phrase">Make space</div>
            <div class="tile-desc">Review what is already saved. Nothing urgent requires you. Permission to simplify.</div>
            <div class="tile-glimpses">${glimpseMakeSpace(persona)}</div>
            <div class="tile-cta">Review <span class="tile-arrow">→</span></div>
          </div>

        </div>
      </div>
    `;
  }

  // ─── Glimpse renderers — small, tasteful, not overwhelming ───

  function glimpseContinue(persona) {
    if (!persona || persona.communities.length === 0) {
      return `<div class="tile-empty">Follow communities to see your threads.</div>`;
    }
    const comms = persona.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const next = DATA.events
      .filter(e => e.date >= new Date(2026,3,23) && e.communities.some(c => persona.communities.includes(c)) && e.recurring)
      .sort((a,b) => a.date - b.date)[0];
    return `
      <div class="tile-glimpse-row">
        ${comms.map(c => `<span class="tile-dot" style="background:${c.color}"></span>`).join('')}
        <span class="tile-glimpse-label">${comms.map(c => c.shortName).join('  ·  ')}</span>
      </div>
      ${next ? `<div class="tile-glimpse-row muted">Next: ${next.title} · ${DATA.formatDate(next.date)}</div>` : ''}
    `;
  }

  function glimpseTaste(persona) {
    const myIds = persona ? persona.communities : [];
    const myComms = myIds.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const adj = myComms
      .flatMap(c => c.overlaps)
      .filter(ov => !myIds.includes(ov.communityId))
      .sort((a,b) => b.strength - a.strength)
      .reduce((acc, ov) => acc.find(x => x.communityId === ov.communityId) ? acc : [...acc, ov], [])
      .slice(0, 3);

    if (adj.length === 0) return `<div class="tile-empty">Follow communities to discover adjacent worlds.</div>`;

    return adj.map(ov => {
      const c = DATA.getCommunityById(ov.communityId);
      if (!c) return '';
      return `<div class="tile-glimpse-row">
        <span class="tile-dot" style="background:${c.color}"></span>
        <span class="tile-glimpse-label">${c.shortName}</span>
        <span class="tile-glimpse-sub">${Math.round(ov.strength * 100)}% overlap</span>
      </div>`;
    }).join('');
  }

  function glimpseRhythm() {
    // Fake activity per day — Thursday and Friday most alive
    const days = ['M','T','W','T','F','S','S'];
    const intensity = [0.25, 0.45, 0.75, 0.6, 0.9, 0.65, 0.35];
    return `
      <div class="tile-rhythm-bars">
        ${days.map((d, i) => `
          <div class="tile-rhythm-col">
            <div class="tile-rhythm-bar" style="height:${Math.round(intensity[i] * 32)}px;opacity:${0.35 + intensity[i] * 0.65}"></div>
            <div class="tile-rhythm-day">${d}</div>
          </div>
        `).join('')}
      </div>
      <div class="tile-glimpse-row muted" style="margin-top:6px">Thursday evenings and Fridays are particularly alive.</div>
    `;
  }

  function glimpseDeepen(persona) {
    const options = ['Practice groups', 'Recurring labs', 'Volunteer & steward', 'Integration spaces'];
    return options.map(opt => `
      <div class="tile-glimpse-row">
        <span style="color:var(--tc);font-size:10px;opacity:0.7">●</span>
        <span class="tile-glimpse-label">${opt}</span>
      </div>
    `).join('');
  }

  function glimpseCreate(persona, role) {
    if (role === 'participant') return `
      <div class="tile-glimpse-row"><span class="tile-glimpse-label">Switch to facilitator or steward mode</span></div>
      <div class="tile-glimpse-row muted">Create an event · Suggest to community</div>
    `;
    if (role === 'facilitator') return `
      <div class="tile-glimpse-row"><span class="tile-glimpse-label">+ New event</span></div>
      <div class="tile-glimpse-row muted">2 community invitations waiting</div>
    `;
    return `
      <div class="tile-glimpse-row"><span class="tile-glimpse-label">3 suggested events to review</span></div>
      <div class="tile-glimpse-row muted">Community pulse dashboard</div>
    `;
  }

  function glimpseMakeSpace(persona) {
    const saved = persona ? persona.savedEvents.length : 0;
    const attending = persona ? (persona.attendingEvents || []).length : 0;
    return `
      <div class="tile-glimpse-row"><span class="tile-glimpse-label">${saved} saved event${saved !== 1 ? 's' : ''}</span></div>
      <div class="tile-glimpse-row"><span class="tile-glimpse-label">${attending} upcoming commitment${attending !== 1 ? 's' : ''}</span></div>
      <div class="tile-glimpse-row muted" style="margin-top:6px;font-style:italic">Nothing urgent today.</div>
    `;
  }

  return { render };
})();
