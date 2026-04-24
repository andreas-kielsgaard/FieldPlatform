// ─── Home: Living windows into the field ───

const HomeView = (() => {

  function render() {
    const persona = DATA.getCurrentPersona();
    const role = DATA.currentRole;
    const firstName = persona ? persona.name.split(' ')[0] : null;

    return `
      <div style="min-height:calc(100vh - var(--topbar-h));background:#080c08">
        ${renderHero(persona, firstName)}
        ${renderTodayFieldStrip(persona)}
        <div class="home-window-grid">
          ${renderAlreadyHereWindow(persona)}
          ${renderRhythmWindow()}
          ${renderTasteWindow(persona)}
          ${renderDeepenWindow(persona)}
          ${renderCreateWindow(persona, role)}
          ${renderMakeSpaceWindow(persona)}
        </div>
      </div>
    `;
  }

  // ── Hero ──
  function renderHero(persona, firstName) {
    return `
      <div class="orientation-hero" style="padding:48px 48px 40px">
        <div style="position:relative;z-index:1;max-width:620px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.35);margin-bottom:10px">Field · Aarhus</div>
          <h1 class="orientation-hero-title" style="font-size:32px;margin-bottom:10px">
            ${firstName ? `Welcome back into the field, ${firstName}.` : 'Welcome into the field.'}
          </h1>
          <p class="orientation-hero-sub">Here are a few ways the field is already moving around you.</p>
        </div>
      </div>
    `;
  }

  // ── Today field strip ──
  function renderTodayFieldStrip(persona) {
    const myIds = persona ? persona.communities : [];
    const myAttending = persona ? (persona.attendingEvents || []) : [];
    const activeComms = myIds.length;

    // Find a morning event today
    const today = new Date(2026, 3, 23);
    const todayDow = (today.getDay() + 6) % 7;
    const morningEvent = DATA.events.find(e => {
      const dow = (e.date.getDay() + 6) % 7;
      return dow === todayDow && e.date.getHours() < 12 && myIds.some(cId => e.communities.includes(cId));
    });

    const commitments = myAttending.length;
    const urgentText = commitments === 0
      ? '0 urgent commitments today'
      : `${commitments} upcoming commitment${commitments !== 1 ? 's' : ''}`;

    return `
      <div class="today-strip">
        <span class="today-strip-label">Your field today</span>
        ${morningEvent ? `<span class="today-strip-item">☀ ${morningEvent.title}</span><span class="today-strip-sep">·</span>` : ''}
        ${activeComms > 0 ? `<span class="today-strip-item">${activeComms} ${activeComms === 1 ? 'community' : 'communities'} active</span><span class="today-strip-sep">·</span>` : ''}
        <span class="today-strip-item muted">${urgentText}</span>
      </div>
    `;
  }

  // ── Window A: Already Here ──
  function renderAlreadyHereWindow(persona) {
    const myIds = persona ? persona.communities : [];
    const myFacIds = persona ? (persona.followedFacilitators || []) : [];
    const myComms = myIds.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const myFacs = myFacIds.slice(0, 2).map(id => DATA.getFacilitatorById(id)).filter(Boolean);

    // Next upcoming commitment
    const attending = (persona?.attendingEvents || []).map(id => DATA.getEventById(id)).filter(Boolean)
      .filter(e => e.date >= new Date(2026, 3, 23))
      .sort((a, b) => a.date - b.date);
    const nextEvent = attending[0];

    // Familiar venues from followed communities
    const familiarVenues = DATA.venues.filter(v =>
      v.communities && v.communities.some(cId => myIds.includes(cId))
    ).slice(0, 2);

    const hasContent = myComms.length > 0;

    return `
      <div class="hwin hwin-already" onclick="App.navigate('explore-familiar')" role="button">
        <div class="hwin-eyebrow" style="color:#4a7c59">↩ Already here</div>
        <div class="hwin-title">Threads that hold you</div>
        <div class="hwin-subcopy">Communities, rhythms, and people already part of your field.</div>

        <div class="hwin-preview" style="flex:1;display:flex;flex-direction:column;gap:8px;margin-top:8px">
          ${hasContent ? `
            <!-- Community constellation -->
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              ${myComms.map(c => `
                <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:${c.color}20;border:1px solid ${c.color}40;border-radius:20px">
                  <span style="width:7px;height:7px;border-radius:50%;background:${c.color};display:inline-block"></span>
                  <span style="font-size:12px;font-weight:600;color:${c.color}">${c.shortName}</span>
                </span>
              `).join('')}
            </div>

            ${nextEvent ? `
              <div style="font-size:12px;color:rgba(255,255,255,0.5)">
                <span style="color:rgba(255,255,255,0.25)">Next:</span>
                <span style="color:rgba(255,255,255,0.7);font-weight:600"> ${nextEvent.title}</span>
                <span style="color:rgba(255,255,255,0.35)"> · ${DATA.formatDate(nextEvent.date)}</span>
              </div>
            ` : ''}

            ${familiarVenues.length > 0 ? `
              <div style="font-size:12px;color:rgba(255,255,255,0.4)">
                📍 ${familiarVenues.map(v => v.name).join('  ·  ')}
              </div>
            ` : ''}

            ${myFacs.length > 0 ? `
              <div style="display:flex;align-items:center;gap:6px">
                ${myFacs.map(f => `
                  <div style="display:flex;align-items:center;gap:5px">
                    <div style="width:22px;height:22px;border-radius:50%;background:${f.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white">${f.initials}</div>
                    <span style="font-size:11px;color:rgba(255,255,255,0.4)">${f.name.split(' ')[0]}</span>
                  </div>
                `).join('<span style="color:rgba(255,255,255,0.15);font-size:11px">·</span>')}
              </div>
            ` : ''}
          ` : `
            <div style="font-size:13px;color:rgba(255,255,255,0.25);font-style:italic">Follow communities to see your threads.</div>
          `}
        </div>

        <div class="hwin-cta" style="color:#4a7c59">Return <span class="hwin-arrow">→</span></div>
      </div>
    `;
  }

  // ── Window B: Rhythm of the Field ──
  function renderRhythmWindow() {
    return `
      <div class="hwin hwin-rhythm" onclick="App.navigate('rhythm')" role="button">
        <div class="hwin-eyebrow" style="color:#5abcb9">◎ Sense</div>
        <div class="hwin-title">Explore the rhythm of the field</div>
        <div class="hwin-subcopy">See when places, communities, and practices come alive.</div>

        <div class="hwin-preview" style="flex:1;display:flex;flex-direction:column;gap:12px;margin-top:10px">
          <!-- Mini week-wheel -->
          <div style="display:flex;align-items:center;gap:16px">
            ${renderMiniWeekWheel()}
            <div style="display:flex;flex-direction:column;gap:6px">
              <div style="font-size:12px;color:rgba(255,255,255,0.55);line-height:1.6">
                Thursday evenings<br>and Fridays are<br>particularly alive.
              </div>
            </div>
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,0.3)">
            Godsbanen glows on Friday evenings.
          </div>
        </div>

        <div class="hwin-cta" style="color:#5abcb9">Explore rhythm <span class="hwin-arrow">→</span></div>
      </div>
    `;
  }

  // ── Mini week-wheel SVG for home ──
  function renderMiniWeekWheel() {
    const cx = 50, cy = 50, r = 34;
    const days = ['M','T','W','T','F','S','S'];
    let svg = `<svg viewBox="0 0 100 100" width="100" height="100" style="flex-shrink:0">`;

    // Outer ring
    svg += `<circle cx="${cx}" cy="${cy}" r="${r + 8}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="3 4"/>`;

    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * 2 * Math.PI - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const intensity = FieldVizEngine.getDayIntensity(i);
      const normInt = Math.min(1, intensity / 8);
      const color = FieldVizEngine.getDayColor(i);
      const nodeR = 3.5 + normInt * 7;

      // Glow
      svg += `<circle cx="${x}" cy="${y}" r="${nodeR * 1.9}" fill="${color}" opacity="${0.12 + normInt * 0.18}"/>`;
      // Node
      svg += `<circle cx="${x}" cy="${y}" r="${nodeR}" fill="${color}" opacity="${0.55 + normInt * 0.45}"/>`;
      // Day label
      svg += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="6.5"
        fill="rgba(255,255,255,${normInt > 0.5 ? 0.85 : 0.45})" font-family="var(--font)" font-weight="${normInt > 0.5 ? 700 : 500}">${days[i]}</text>`;
    }

    // Center dot
    svg += `<circle cx="${cx}" cy="${cy}" r="5" fill="rgba(255,255,255,0.06)"/>`;
    svg += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-size="5.5" fill="rgba(255,255,255,0.3)" font-family="var(--font)">week</text>`;

    svg += '</svg>';
    return svg;
  }

  // ── Window C: Taste New Connections ──
  function renderTasteWindow(persona) {
    const myIds = persona ? persona.communities : [];
    const myComms = myIds.map(id => DATA.getCommunityById(id)).filter(Boolean);

    // Top 2 adjacent communities
    const adj = myComms
      .flatMap(c => c.overlaps)
      .filter(ov => !myIds.includes(ov.communityId))
      .sort((a, b) => b.strength - a.strength)
      .reduce((acc, ov) => acc.find(x => x.communityId === ov.communityId) ? acc : [...acc, ov], [])
      .slice(0, 2);

    // Next event bridging source + adjacent
    const adjIds = adj.map(a => a.communityId);
    const bridgeEvent = DATA.events.filter(e =>
      e.communities.some(cId => myIds.includes(cId)) && e.communities.some(cId => adjIds.includes(cId))
    ).sort((a, b) => a.date - b.date)[0];

    return `
      <div class="hwin hwin-taste" onclick="App.navigate('explore-adjacent')" role="button">
        <div class="hwin-eyebrow" style="color:#7b5ea7">⟡ Discover</div>
        <div class="hwin-title">Taste new connections</div>
        <div class="hwin-subcopy">Adjacent worlds close enough to enter.</div>

        <div class="hwin-preview" style="flex:1;display:flex;flex-direction:column;gap:8px;margin-top:10px">
          ${adj.length > 0 ? `
            <!-- Branching trail visualization -->
            ${renderBranchTrail(myComms[0], adj)}

            ${bridgeEvent ? `
              <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px">
                <span style="color:rgba(255,255,255,0.25)">Next door:</span>
                <span style="color:rgba(255,255,255,0.7);font-weight:600"> ${bridgeEvent.title}</span>
              </div>
            ` : ''}
          ` : `
            <div style="font-size:12px;color:rgba(255,255,255,0.25);font-style:italic">Follow communities to discover adjacent worlds.</div>
          `}
        </div>

        <div class="hwin-cta" style="color:#7b5ea7">Explore adjacent <span class="hwin-arrow">→</span></div>
      </div>
    `;
  }

  function renderBranchTrail(sourceComm, adj) {
    if (!sourceComm) return '';
    const sc = sourceComm;
    const a1 = adj[0] ? DATA.getCommunityById(adj[0].communityId) : null;
    const a2 = adj[1] ? DATA.getCommunityById(adj[1].communityId) : null;

    return `
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <!-- Source -->
        <div style="display:flex;align-items:center;gap:5px">
          <span style="width:10px;height:10px;border-radius:50%;background:${sc.color};display:inline-block;box-shadow:0 0 6px ${sc.color}66"></span>
          <span style="font-size:12px;font-weight:600;color:${sc.color}">${sc.shortName}</span>
        </div>
        <!-- Traces + targets -->
        <div style="display:flex;flex-direction:column;gap:5px">
          ${a1 ? `
            <div style="display:flex;align-items:center;gap:5px">
              <div style="width:22px;height:1px;background:linear-gradient(to right,${sc.color}66,${a1.color}66);border-top:1px dashed rgba(255,255,255,0.2)"></div>
              <span style="width:8px;height:8px;border-radius:50%;background:${a1.color};display:inline-block"></span>
              <span style="font-size:11px;color:rgba(255,255,255,0.6)">${a1.shortName}</span>
              <span style="font-size:10px;color:rgba(255,255,255,0.3)">${Math.round(adj[0].strength * 100)}% overlap</span>
            </div>
          ` : ''}
          ${a2 ? `
            <div style="display:flex;align-items:center;gap:5px">
              <div style="width:22px;height:1px;background:linear-gradient(to right,${sc.color}55,${a2.color}55);border-top:1px dashed rgba(255,255,255,0.15)"></div>
              <span style="width:7px;height:7px;border-radius:50%;background:${a2.color};display:inline-block;opacity:0.8"></span>
              <span style="font-size:11px;color:rgba(255,255,255,0.5)">${a2.shortName}</span>
              <span style="font-size:10px;color:rgba(255,255,255,0.25)">${Math.round(adj[1].strength * 100)}% overlap</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ── Window D: Deepen ──
  function renderDeepenWindow(persona) {
    const myIds = persona ? persona.communities : [];
    const myComms = myIds.map(id => DATA.getCommunityById(id)).filter(Boolean);

    // Find recurring events in followed communities — these are "deeper paths"
    const recurringOptions = DATA.events
      .filter(e => e.recurring && e.communities.some(cId => myIds.includes(cId)))
      .slice(0, 3);

    return `
      <div class="hwin hwin-deepen" onclick="App.navigate('communities')" role="button">
        <div class="hwin-eyebrow" style="color:#3aaa7a">↓ Deepen</div>
        <div class="hwin-title">Deepen what already matters</div>
        <div class="hwin-subcopy">Not more. More meaningful.</div>

        <div class="hwin-preview" style="flex:1;display:flex;flex-direction:column;gap:7px;margin-top:10px">
          ${recurringOptions.length > 0 ? recurringOptions.map(e => {
            const comm = DATA.getCommunityById(e.communities[0]);
            const color = comm ? comm.color : '#3aaa7a';
            return `
              <div style="display:flex;align-items:center;gap:7px">
                <span style="width:6px;height:6px;border-radius:50%;background:${color};flex-shrink:0"></span>
                <span style="font-size:12px;color:rgba(255,255,255,0.65)">${comm ? comm.shortName : ''}</span>
                <span style="font-size:11px;color:rgba(255,255,255,0.3)">·</span>
                <span style="font-size:12px;color:rgba(255,255,255,0.5)">${e.title}</span>
              </div>
            `;
          }).join('') : `
            <div style="font-size:12px;color:rgba(255,255,255,0.35);font-style:italic;line-height:1.6">
              Practice groups<br>Recurring labs<br>Volunteer &amp; steward
            </div>
          `}
        </div>

        <div class="hwin-cta" style="color:#3aaa7a">Find deeper paths <span class="hwin-arrow">→</span></div>
      </div>
    `;
  }

  // ── Window E: Create / Nurture ──
  function renderCreateWindow(persona, role) {
    const suggestedCount = persona?.stewardFor
      ? (DATA.suggestedEventsQueue[persona.stewardFor] || []).length
      : 0;

    const content = role === 'participant' ? `
      <div style="font-size:12px;color:rgba(255,255,255,0.55);line-height:1.6">Switch to facilitator<br>or steward mode</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:6px">Create an event · Suggest to a community</div>
    ` : role === 'facilitator' ? `
      <div style="font-size:12px;color:rgba(255,255,255,0.65);font-weight:600">+ New event</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:5px">2 community invitations waiting</div>
    ` : `
      ${suggestedCount > 0 ? `<div style="font-size:12px;color:rgba(255,255,255,0.65)"><span style="font-weight:700">${suggestedCount}</span> suggested events to review</div>` : ''}
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:5px">Community pulse dashboard</div>
    `;

    const onclickAction = role === 'participant'
      ? "App.setRole('facilitator')"
      : role === 'facilitator'
        ? "App.navigate('facilitator-dashboard')"
        : "App.navigate('steward-dashboard')";

    return `
      <div class="hwin hwin-create" onclick="${onclickAction}" role="button">
        <div class="hwin-eyebrow" style="color:#f0a500">✦ Offer</div>
        <div class="hwin-title">Create, share, or nurture</div>
        <div class="hwin-subcopy">Bring something into the field.</div>
        <div class="hwin-preview" style="flex:1;margin-top:10px">${content}</div>
        <div class="hwin-cta" style="color:#f0a500">Open creator space <span class="hwin-arrow">→</span></div>
      </div>
    `;
  }

  // ── Window F: Make Space ──
  function renderMakeSpaceWindow(persona) {
    const saved = persona ? persona.savedEvents.length : 0;
    const attending = persona ? (persona.attendingEvents || []).length : 0;
    const calmNote = attending === 0 ? 'Nothing urgent today.' : `${attending} commitment${attending !== 1 ? 's' : ''} this week.`;

    return `
      <div class="hwin hwin-space" onclick="App.navigate('saved')" role="button">
        <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
          <div>
            <div class="hwin-eyebrow" style="color:#8c8a86;margin-bottom:4px">○ Rest</div>
            <div class="hwin-title" style="font-size:16px">Make space</div>
            <div class="hwin-subcopy" style="font-size:12px">Review, simplify, or rest.</div>
          </div>
          <div style="display:flex;gap:20px;flex-wrap:wrap">
            <div style="font-size:13px;color:rgba(255,255,255,0.5)">${saved} saved event${saved !== 1 ? 's' : ''}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.5)">${attending} upcoming commitment${attending !== 1 ? 's' : ''}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.3);font-style:italic">${calmNote}</div>
          </div>
          <div class="hwin-cta" style="color:#8c8a86;margin-left:auto">Review <span class="hwin-arrow">→</span></div>
        </div>
      </div>
    `;
  }

  return { render };
})();
