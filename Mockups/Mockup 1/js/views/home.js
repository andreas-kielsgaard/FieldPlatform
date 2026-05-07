// ─── Home / "What's alive for you" ───

const HomeView = (() => {

  function render() {
    const persona = DATA.getCurrentPersona();
    const relevantEvents = DATA.getRelevantEventsForPersona(persona, 6);
    const allCommunities = DATA.communities;
    const followedCommunities = persona
      ? allCommunities.filter(c => persona.communities.includes(c.id))
      : [];
    const discoveryCommunities = allCommunities
      .filter(c => !persona || !persona.communities.includes(c.id))
      .slice(0, 4);

    const isNewcomer = persona && persona.communities.length === 0;

    return `
      <div class="hero">
        <div class="hero-content">
          <div class="hero-label">Aarhus · ${new Date(2026,3,23).toLocaleDateString('en-DK', {weekday:'long', month:'long', day:'numeric'})}</div>
          <div class="hero-title">${isNewcomer ? 'Welcome to the field.' : `What's alive for you, ${persona ? persona.name.split(' ')[0] : 'you'}.`}</div>
          <div class="hero-sub">${isNewcomer ? 'Aarhus has a living ecosystem of communities. Explore below to find where you might fit.' : 'Here\'s what\'s happening across your communities and what\'s adjacent.'}</div>
        </div>
      </div>

      <div class="home-grid">
        <div class="home-main">

          <!-- Mini map -->
          <div class="mini-map-placeholder" onclick="App.navigate('explore')">
            <div class="mini-map-hotspots">
              <div class="hotspot" style="width:60px;height:60px;background:var(--c-ci);top:35%;left:30%"></div>
              <div class="hotspot" style="width:80px;height:80px;background:var(--c-ed);top:45%;left:55%;animation-delay:0.5s"></div>
              <div class="hotspot" style="width:45px;height:45px;background:var(--c-cr);top:20%;left:45%;animation-delay:1s"></div>
              <div class="hotspot" style="width:40px;height:40px;background:var(--c-mc);top:15%;left:20%;animation-delay:1.5s"></div>
              <div class="hotspot" style="width:35px;height:35px;background:var(--c-qe);top:60%;left:70%;animation-delay:0.7s"></div>
            </div>
            <span class="mini-map-label">Activity this week · 7 active venues</span>
            <button class="mini-map-cta">Open map →</button>
          </div>

          <!-- Timeline strip preview -->
          <div style="margin-bottom:28px">
            <div class="section-header">
              <span class="section-title">This week</span>
              <span class="section-link" onclick="App.navigate('explore')">Timeline view →</span>
            </div>
            <div class="h-scroll">
              ${renderTimelinePreview()}
            </div>
          </div>

          <!-- Relevant events -->
          <div style="margin-bottom:32px">
            <div class="section-header">
              <span class="section-title">${isNewcomer ? 'Happening nearby' : 'Relevant to you'}</span>
              <span class="section-link" onclick="App.navigate('events')">See all →</span>
            </div>
            <div class="card-grid">
              ${relevantEvents.map(e => Cards.eventCard(e)).join('')}
            </div>
          </div>

          ${followedCommunities.length > 0 ? `
          <!-- Continue what works -->
          <div style="margin-bottom:32px">
            <div class="section-header">
              <span class="section-title">Continue what already works</span>
            </div>
            <div class="h-scroll">
              ${followedCommunities.map(c => `
                <div class="card" style="min-width:220px;flex-shrink:0" onclick="App.navigate('community','${c.id}')">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="font-size:20px">${c.emoji}</span>
                    <span style="font-weight:700;font-size:14px">${c.shortName}</span>
                  </div>
                  <div style="font-size:12px;color:var(--text-secondary)">${DATA.getEventsForCommunity(c.id).length} upcoming · ${c.rhythm[0]?.day || ''} rhythm</div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          <!-- Discovery -->
          <div style="margin-bottom:32px">
            <div class="section-header">
              <span class="section-title">Adjacent possibilities</span>
              <span class="section-link" onclick="App.navigate('communities')">All communities →</span>
            </div>
            <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Communities nearby that might fit where you are now.</div>
            <div class="card-grid">
              ${discoveryCommunities.map(c => Cards.communityCard(c)).join('')}
            </div>
          </div>

        </div>

        <div class="home-sidebar">
          <div style="margin-bottom:28px">
            <div class="section-block-title">Today's activity</div>
            ${renderTodayActivity()}
          </div>

          <div style="margin-bottom:28px">
            <div class="section-block-title">Active facilitators</div>
            ${DATA.facilitators.slice(0, 4).map(f => `
              <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="App.navigate('facilitator','${f.id}')">
                <div style="width:32px;height:32px;border-radius:50%;background:${f.color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;flex-shrink:0">${f.initials}</div>
                <div>
                  <div style="font-size:13px;font-weight:600">${f.name}</div>
                  <div style="font-size:11px;color:var(--text-muted)">${f.practices[0]}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div>
            <div class="section-block-title">Community overlap</div>
            ${renderOverlapSummary()}
          </div>
        </div>
      </div>
    `;
  }

  function renderTimelinePreview() {
    const days = [];
    const refDate = new Date(2026, 3, 23);
    for (let i = 0; i < 7; i++) {
      const d = new Date(refDate);
      d.setDate(d.getDate() + i);
      const dayEvents = DATA.events.filter(e => e.date.toDateString() === d.toDateString());
      const dots = dayEvents.slice(0, 4).map(e => {
        const comms = e.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
        const color = comms[0] ? comms[0].color : 'var(--accent)';
        return `<div class="timeline-dot" style="background:${color};opacity:0.8"></div>`;
      }).join('');
      days.push(`
        <div class="card" style="min-width:72px;text-align:center;padding:12px 8px;flex-shrink:0;background:${i===0?'var(--accent-light)':'var(--surface)'}">
          <div style="font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase">${d.toLocaleDateString('en-DK',{weekday:'short'})}</div>
          <div style="font-size:20px;font-weight:800;color:${i===0?'var(--accent)':'var(--text-primary)'}">${d.getDate()}</div>
          <div style="font-size:11px;color:var(--text-muted)">${dayEvents.length} events</div>
          <div style="display:flex;justify-content:center;gap:2px;margin-top:4px">${dots}</div>
        </div>
      `);
    }
    return days.join('');
  }

  function renderTodayActivity() {
    const today = new Date(2026, 3, 23);
    const todayEvents = DATA.events.filter(e => e.date.toDateString() === today.toDateString())
      .sort((a,b) => a.date - b.date);

    if (todayEvents.length === 0) {
      return '<div style="color:var(--text-muted);font-size:13px">Nothing happening today — good time for rest.</div>';
    }

    return todayEvents.map(e => {
      const communities = e.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
      const dot = communities[0] ? communities[0].color : 'var(--accent)';
      return `
        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="App.navigate('event','${e.id}')">
          <div style="width:8px;height:8px;border-radius:50%;background:${dot};flex-shrink:0"></div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600">${e.title}</div>
            <div style="font-size:11px;color:var(--text-muted)">${DATA.formatTime(e.date)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderOverlapSummary() {
    const persona = DATA.getCurrentPersona();
    if (!persona || persona.communities.length === 0) {
      return `<div style="font-size:13px;color:var(--text-muted)">Follow communities to see their overlap.</div>`;
    }

    const myCommunity = DATA.getCommunityById(persona.communities[0]);
    if (!myCommunity) return '';

    return myCommunity.overlaps.slice(0,4).map(ov => {
      const other = DATA.getCommunityById(ov.communityId);
      if (!other) return '';
      const pct = Math.round(ov.strength * 100);
      return `
        <div class="overlap-community" onclick="App.navigate('community','${other.id}')">
          <span style="font-size:16px">${other.emoji}</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600">${other.shortName}</div>
            <div class="overlap-bar" style="background:linear-gradient(to right, ${other.color} ${pct}%, var(--border) ${pct}%);margin-top:3px"></div>
          </div>
          <span style="font-size:11px;color:var(--text-muted)">${pct}%</span>
        </div>
      `;
    }).join('');
  }

  return { render };
})();
