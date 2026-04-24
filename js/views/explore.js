// ─── Explore: Intent-based discovery ───

const ExploreView = (() => {
  let activeMode = null; // null | 'familiar' | 'social' | 'world'
  let map = null;
  let markers = [];

  // ─── Fake world data for "out there" mode ───
  const worldData = [
    {
      type: 'event', city: 'Copenhagen', country: 'Denmark', flag: '🇩🇰',
      title: 'Contact Impro Spring Jam', host: 'Katrine Holm',
      community: 'CI Copenhagen', practices: ['Contact Improvisation'],
      date: 'May 10, 2026', price: '120 DKK', distance: '3h by train',
      description: 'Weekend CI jam with an open floor, beginner welcome hour, and evening social.',
      beginnerFriendly: true, lat: 55.676, lng: 12.568
    },
    {
      type: 'event', city: 'Berlin', country: 'Germany', flag: '🇩🇪',
      title: 'Ecstatic Dance Festival: Field of Sound',
      host: 'Various DJs', community: 'Ecstatic Dance Berlin',
      practices: ['Ecstatic Dance', 'Somatic Movement'],
      date: 'May 17–19, 2026', price: '€180', distance: '7h by train',
      description: 'Three days of ecstatic dance, breathwork, and somatic movement in a repurposed warehouse.',
      beginnerFriendly: true, lat: 52.520, lng: 13.405
    },
    {
      type: 'community', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱',
      title: 'Circling Amsterdam', host: null,
      community: 'Circling Amsterdam', practices: ['Circling', 'Authentic Relating'],
      date: 'Weekly Thursdays', price: '€15/session', distance: '8h by train',
      description: 'A thriving AR community with weekly circles, monthly intensives, and a practitioner track.',
      beginnerFriendly: true, lat: 52.370, lng: 4.895
    },
    {
      type: 'festival', city: 'Portugal (Alentejo)', country: 'Portugal', flag: '🇵🇹',
      title: 'Contact Festival Alentejo',
      host: 'Various', community: 'European CI Network',
      practices: ['Contact Improvisation', 'Somatic Movement', 'Improvisation'],
      date: 'June 12–18, 2026', price: '€420 (incl. food & camping)', distance: 'Flight or 2-day drive',
      description: 'Week-long outdoor CI festival in the Portuguese countryside. 200 participants, 30 facilitators.',
      beginnerFriendly: false, lat: 38.560, lng: -7.920
    },
    {
      type: 'event', city: 'London', country: 'UK', flag: '🇬🇧',
      title: 'Authentic Relating UK Weekend',
      host: 'ART International', community: 'AR London',
      practices: ['Authentic Relating', 'Circling'],
      date: 'May 24–25, 2026', price: '£180', distance: '2h by flight',
      description: 'Intensive AR weekend facilitated by the Authentic Relating Training team.',
      beginnerFriendly: false, lat: 51.507, lng: -0.127
    },
    {
      type: 'community', city: 'Stockholm', country: 'Sweden', flag: '🇸🇪',
      title: 'Somatic Practitioners Stockholm',
      host: null, community: 'SPN Stockholm',
      practices: ['Somatic Bodywork', 'Movement Therapy'],
      date: 'Monthly peer groups', price: 'Free for members', distance: '4h by train',
      description: 'Peer network for somatic practitioners in Sweden. Monthly supervision groups and study days.',
      beginnerFriendly: false, lat: 59.334, lng: 18.063
    },
    {
      type: 'festival', city: 'Edinburgh', country: 'UK', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      title: 'Embodied Living Festival',
      host: 'Various', community: 'Embodied Scotland',
      practices: ['Ecstatic Dance', 'Circling', 'CI', 'Breathwork'],
      date: 'July 3–6, 2026', price: '£220', distance: 'Flight ~2h',
      description: 'Four-day multi-practice festival bringing together movement, relational practice, and somatic arts.',
      beginnerFriendly: true, lat: 55.953, lng: -3.188
    },
    {
      type: 'event', city: 'Copenhagen', country: 'Denmark', flag: '🇩🇰',
      title: 'Queer Embodiment Day',
      host: 'Queer Body Collective CPH', community: 'Queer Embodiment Copenhagen',
      practices: ['Somatic Movement', 'Embodiment'],
      date: 'May 4, 2026', price: '150 DKK', distance: '3h by train',
      description: 'A full day of queer-centred somatic practice, movement and community gathering.',
      beginnerFriendly: true, lat: 55.682, lng: 12.572
    }
  ];

  // ─── Render ───
  function render() {
    activeMode = null;
    return renderLanding();
  }

  function renderLanding() {
    const persona = DATA.getCurrentPersona();
    const firstName = persona ? persona.name.split(' ')[0] : 'you';
    const hasContext = persona && persona.communities.length > 0;

    return `
      <div style="min-height:calc(100vh - var(--topbar-h))">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#1a2e22 0%,#2a3d2a 60%,#1e3040 100%);padding:52px 40px 44px;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(74,124,89,0.25) 0%,transparent 55%),radial-gradient(ellipse at 80% 30%,rgba(90,188,185,0.15) 0%,transparent 50%);pointer-events:none"></div>
          <div style="position:relative;z-index:1;max-width:680px">
            <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.5);margin-bottom:10px">Explore</div>
            <h1 style="font-size:36px;font-weight:800;letter-spacing:-1px;color:white;line-height:1.1;margin-bottom:12px">What are you exploring today${hasContext ? ', ' + firstName : ''}?</h1>
            <p style="font-size:16px;color:rgba(255,255,255,0.65);line-height:1.5">Choose a direction. Each one opens a different kind of field.</p>
          </div>
        </div>

        <!-- Mode cards -->
        <div style="padding:36px 40px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;max-width:1200px">

          <!-- More of what I like -->
          <div class="explore-mode-card" onclick="ExploreView.setMode('familiar')" style="--mode-color:#4a7c59;--mode-bg:#1a2e22">
            <div class="explore-mode-inner">
              <div class="explore-mode-icon">✦</div>
              <div class="explore-mode-label">More of what I like</div>
              <div class="explore-mode-title">Familiar territory</div>
              <div class="explore-mode-desc">Events, spaces, and people directly connected to your communities and practice. The things you'll recognise and want more of.</div>
              <div class="explore-mode-chips">
                ${hasContext
                  ? DATA.communities.filter(c => persona.communities.includes(c.id)).slice(0,2).map(c =>
                      `<span style="background:${c.color}33;color:${c.color};border:1px solid ${c.color}55;padding:3px 10px;border-radius:var(--radius-full);font-size:12px;font-weight:600">${c.emoji} ${c.shortName}</span>`
                    ).join('')
                  : '<span style="opacity:0.5;font-size:12px">Select a persona to personalise</span>'
                }
              </div>
              <div class="explore-mode-arrow">→</div>
            </div>
          </div>

          <!-- Where my people are -->
          <div class="explore-mode-card" onclick="ExploreView.setMode('social')" style="--mode-color:#7b5ea7;--mode-bg:#1e1a2e">
            <div class="explore-mode-inner">
              <div class="explore-mode-icon">⟡</div>
              <div class="explore-mode-label">Where my people are</div>
              <div class="explore-mode-title">Adjacent worlds</div>
              <div class="explore-mode-desc">Communities, events, and spaces that the people you know and move with also inhabit. Discovery through proximity and trust.</div>
              <div class="explore-mode-chips">
                ${hasContext
                  ? (() => {
                      const myComms = persona.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
                      const adjacentIds = myComms.flatMap(c => c.overlaps.slice(0,1).map(o => o.communityId));
                      return [...new Set(adjacentIds)].slice(0,2).map(id => {
                        const c = DATA.getCommunityById(id);
                        return c ? `<span style="background:${c.color}33;color:${c.color};border:1px solid ${c.color}55;padding:3px 10px;border-radius:var(--radius-full);font-size:12px;font-weight:600">${c.emoji} ${c.shortName}</span>` : '';
                      }).join('');
                    })()
                  : '<span style="opacity:0.5;font-size:12px">Select a persona to personalise</span>'
                }
              </div>
              <div class="explore-mode-arrow">→</div>
            </div>
          </div>

          <!-- What's out there -->
          <div class="explore-mode-card" onclick="ExploreView.setMode('world')" style="--mode-color:#5abcb9;--mode-bg:#1a2a2e">
            <div class="explore-mode-inner">
              <div class="explore-mode-icon">◎</div>
              <div class="explore-mode-label">What's available out there</div>
              <div class="explore-mode-title">The wider field</div>
              <div class="explore-mode-desc">The same practices and communities you love — in other cities, at festivals, in retreat centres. For when you're travelling, or just curious what exists.</div>
              <div class="explore-mode-chips">
                <span style="background:rgba(90,188,185,0.2);color:#5abcb9;border:1px solid rgba(90,188,185,0.3);padding:3px 10px;border-radius:var(--radius-full);font-size:12px;font-weight:600">🌍 Copenhagen</span>
                <span style="background:rgba(90,188,185,0.2);color:#5abcb9;border:1px solid rgba(90,188,185,0.3);padding:3px 10px;border-radius:var(--radius-full);font-size:12px;font-weight:600">🌍 Berlin</span>
                <span style="background:rgba(90,188,185,0.2);color:#5abcb9;border:1px solid rgba(90,188,185,0.3);padding:3px 10px;border-radius:var(--radius-full);font-size:12px;font-weight:600">🌍 Festivals</span>
              </div>
              <div class="explore-mode-arrow">→</div>
            </div>
          </div>

        </div>

        <!-- Aarhus map teaser -->
        <div style="padding:0 40px 40px">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;display:flex;align-items:center;gap:16px;cursor:pointer" onclick="ExploreView.setMode('map')">
            <div style="font-size:24px">🗺</div>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:700">Open map view</div>
              <div style="font-size:13px;color:var(--text-secondary)">See all activity across Aarhus with a time scrubber and community filters.</div>
            </div>
            <span style="color:var(--text-muted);font-size:18px">→</span>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Familiar mode ───
  function renderFamiliar() {
    const persona = DATA.getCurrentPersona();
    const myCommIds = persona ? persona.communities : [];
    const myComms = myCommIds.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const myFacIds = persona ? (persona.followedFacilitators || []) : [];

    const familiarEvents = DATA.events
      .filter(e => e.date >= new Date(2026,3,23) && e.communities.some(c => myCommIds.includes(c)))
      .sort((a,b) => a.date - b.date);

    const myVenueIds = [...new Set(myComms.flatMap(c => c.venues))];
    const myVenues = myVenueIds.map(id => DATA.getVenueById(id)).filter(Boolean);

    const famFacilitators = DATA.facilitators.filter(f =>
      f.communities.some(c => myCommIds.includes(c))
    );

    const hasAny = myCommIds.length > 0;

    return `
      <div>
        ${renderModeHeader('familiar', '✦', 'More of what I like', 'Familiar territory', '#4a7c59', '#1a2e22')}
        <div style="padding:32px 40px;max-width:1100px">

          ${!hasAny ? `
            <div class="empty-state">
              <div class="empty-state-icon">🧭</div>
              <div class="empty-state-title">No communities followed yet</div>
              <p style="color:var(--text-muted);font-size:14px">Follow some communities to see personalised familiar content.</p>
              <button class="btn btn-primary" style="margin-top:16px" onclick="App.navigate('communities')">Browse communities</button>
            </div>
          ` : ''}

          ${hasAny ? `
          <!-- Your upcoming -->
          <div style="margin-bottom:36px">
            <div class="section-header">
              <span class="section-title">Your upcoming events</span>
              <span style="font-size:13px;color:var(--text-muted)">${familiarEvents.length} events across your communities</span>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">These are events from communities you're part of. Things you'll recognise and probably want.</p>
            <div class="card-grid">
              ${familiarEvents.slice(0,6).map(e => Cards.eventCard(e)).join('')}
            </div>
          </div>

          <!-- Your venues -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Spaces you know</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Venues where your communities gather.</p>
            <div class="h-scroll">
              ${myVenues.map(v => `
                <div class="card" style="min-width:240px;flex-shrink:0;cursor:pointer" onclick="App.navigate('venue','${v.id}')">
                  <div style="font-size:13px;font-weight:700;margin-bottom:4px">${v.name}</div>
                  <div style="font-size:12px;color:var(--text-muted)">${v.type}</div>
                  <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">${v.upcoming} upcoming events</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Familiar facilitators -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Facilitators in your communities</span></div>
            <div class="card-grid">
              ${famFacilitators.slice(0,4).map(f => Cards.facilitatorCard(f)).join('')}
            </div>
          </div>

          <!-- Recurring rhythms -->
          <div>
            <div class="section-header"><span class="section-title">Your regular rhythms</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Recurring events that keep showing up — the backbone of continuity.</p>
            <div class="card-grid">
              ${familiarEvents.filter(e => e.recurring).slice(0,4).map(e => Cards.eventCard(e)).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ─── Social mode ───
  function renderSocial() {
    const persona = DATA.getCurrentPersona();
    const myCommIds = persona ? persona.communities : [];
    const myComms = myCommIds.map(id => DATA.getCommunityById(id)).filter(Boolean);

    // Adjacent communities (strong overlap but not followed)
    const adjacentComms = myComms
      .flatMap(c => c.overlaps)
      .filter(ov => !myCommIds.includes(ov.communityId) && ov.strength > 0.4)
      .sort((a,b) => b.strength - a.strength)
      .reduce((acc, ov) => {
        if (!acc.find(x => x.communityId === ov.communityId)) acc.push(ov);
        return acc;
      }, []);

    // Events attended by people who also attend my events
    const myEventIds = DATA.events
      .filter(e => e.communities.some(c => myCommIds.includes(c)))
      .map(e => e.id);

    // Events in adjacent communities with social proof
    const adjacentCommIds = adjacentComms.map(ov => ov.communityId);
    const crossoverEvents = DATA.events
      .filter(e =>
        e.date >= new Date(2026,3,23) &&
        !e.communities.some(c => myCommIds.includes(c)) &&
        e.communities.some(c => adjacentCommIds.includes(c))
      )
      .sort((a,b) => a.date - b.date);

    // Bridging facilitators (belong to both my comms and adjacent comms)
    const bridgingFacilitators = DATA.facilitators.filter(f => {
      const inMyComm = f.communities.some(c => myCommIds.includes(c));
      const inAdjComm = f.communities.some(c => adjacentCommIds.includes(c));
      return inMyComm && inAdjComm;
    });

    const hasAny = myCommIds.length > 0;

    return `
      <div>
        ${renderModeHeader('social', '⟡', 'Where my people are', 'Adjacent worlds', '#7b5ea7', '#1e1a2e')}
        <div style="padding:32px 40px;max-width:1100px">

          ${!hasAny ? `
            <div class="empty-state">
              <div class="empty-state-icon">🤝</div>
              <div class="empty-state-title">Follow a community to see where your people move</div>
              <button class="btn btn-primary" style="margin-top:16px" onclick="App.navigate('communities')">Browse communities</button>
            </div>
          ` : ''}

          ${hasAny ? `
          <!-- Adjacent communities -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Communities your people also move through</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Based on overlapping membership and shared facilitators.</p>
            <div class="card-grid">
              ${adjacentComms.slice(0,4).map(ov => {
                const c = DATA.getCommunityById(ov.communityId);
                if (!c) return '';
                return `
                  <div class="card" style="cursor:pointer;border-left:4px solid ${c.color}" onclick="App.navigate('community','${c.id}')">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                      <span style="font-size:22px">${c.emoji}</span>
                      <div>
                        <div style="font-weight:700;font-size:15px">${c.shortName}</div>
                        <div style="font-size:11px;color:var(--text-muted)">${c.memberCount} members</div>
                      </div>
                    </div>
                    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px">${ov.reason}</div>
                    <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden">
                      <div style="height:100%;width:${Math.round(ov.strength*100)}%;background:${c.color};border-radius:3px"></div>
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${Math.round(ov.strength*100)}% member crossover</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Crossover events with social proof -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Events your people are going to</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">People from your communities attend these too.</p>
            <div class="card-grid">
              ${crossoverEvents.slice(0,6).map(e => {
                const comms = e.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
                const matchingAdj = comms.filter(c => adjacentCommIds.includes(c.id));
                const parentComm = myComms[0];
                const overlap = parentComm ? parentComm.overlaps.find(ov => matchingAdj.find(c => c.id === ov.communityId)) : null;
                const socialProof = overlap
                  ? `People from ${myComms.map(c=>c.shortName).join('/')} also attend ${matchingAdj[0]?.shortName || 'this'}`
                  : 'Adjacent to your communities';
                const eWithLabel = { ...e, relevanceLabels: [socialProof, ...(e.relevanceLabels||[])].slice(0,3) };
                return Cards.eventCard(eWithLabel);
              }).join('')}
            </div>
          </div>

          <!-- Bridging facilitators -->
          ${bridgingFacilitators.length > 0 ? `
          <div>
            <div class="section-header"><span class="section-title">Facilitators who bridge your worlds</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">These people move between your communities and adjacent ones — natural connectors.</p>
            <div class="card-grid">
              ${bridgingFacilitators.slice(0,4).map(f => Cards.facilitatorCard(f)).join('')}
            </div>
          </div>
          ` : ''}
          ` : ''}
        </div>
      </div>
    `;
  }

  // ─── World mode ───
  function renderWorld() {
    const persona = DATA.getCurrentPersona();
    const myCommIds = persona ? persona.communities : [];
    const myPractices = myCommIds.flatMap(id => {
      const c = DATA.getCommunityById(id);
      return c ? c.practices : [];
    });

    const cities = [...new Set(worldData.map(d => d.city))];
    const festivals = worldData.filter(d => d.type === 'festival');
    const nearby = worldData.filter(d => ['Copenhagen', 'Stockholm'].includes(d.city));
    const further = worldData.filter(d => !['Copenhagen', 'Stockholm'].includes(d.city));

    return `
      <div>
        ${renderModeHeader('world', '◎', 'What\'s available out there', 'The wider field', '#5abcb9', '#1a2a2e')}
        <div style="padding:32px 40px;max-width:1100px">

          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;margin-bottom:32px;display:flex;gap:12px;align-items:center">
            <span style="font-size:20px">ℹ</span>
            <div style="font-size:13px;color:var(--text-secondary)">
              Showing communities, events, and festivals with practices similar to those in Aarhus.
              ${myCommIds.length > 0 ? `Filtered based on your communities: ${myCommIds.map(id => { const c = DATA.getCommunityById(id); return c ? c.emoji + ' ' + c.shortName : ''; }).join(', ')}.` : 'Follow communities to personalise these results.'}
            </div>
          </div>

          <!-- Festivals & intensives -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Festivals & intensives</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Multi-day events worth travelling for.</p>
            <div class="card-grid">
              ${festivals.map(d => worldCard(d)).join('')}
            </div>
          </div>

          <!-- Nearby cities -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Within reach — Copenhagen & Stockholm</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">A train away. Same practices, familiar feel.</p>
            <div class="card-grid">
              ${nearby.map(d => worldCard(d)).join('')}
            </div>
          </div>

          <!-- Further afield -->
          <div style="margin-bottom:36px">
            <div class="section-header"><span class="section-title">Further afield</span></div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Communities and events in Amsterdam, Berlin, London — worth knowing about.</p>
            <div class="card-grid">
              ${further.map(d => worldCard(d)).join('')}
            </div>
          </div>

          <!-- Map of the world data -->
          <div style="margin-bottom:20px">
            <div class="section-header"><span class="section-title">On the map</span></div>
          </div>
          <div id="world-map" style="height:320px;border-radius:var(--radius);overflow:hidden;border:1px solid var(--border)"></div>

        </div>
      </div>
    `;
  }

  function worldCard(d) {
    const typeLabel = { event: 'Event', festival: 'Festival', community: 'Community' }[d.type] || d.type;
    const typeColor = { event: 'var(--accent)', festival: 'var(--accent-2)', community: 'var(--c-ci)' }[d.type];
    return `
      <div class="card" style="position:relative">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
          <span class="chip" style="background:${typeColor}22;color:${typeColor};border:none;font-size:11px;font-weight:700">${typeLabel}</span>
          <span style="font-size:13px">${d.flag} ${d.city}</span>
        </div>
        <div style="font-size:16px;font-weight:700;margin-bottom:4px">${d.title}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">${d.description}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:12px;color:var(--text-muted);margin-bottom:10px">
          <span>📅 ${d.date}</span>
          <span>💰 ${d.price}</span>
          <span>🚄 ${d.distance}</span>
        </div>
        <div class="relevance-chips">
          ${d.practices.map(p => `<span class="chip">${p}</span>`).join('')}
          ${d.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
        </div>
      </div>
    `;
  }

  // ─── Map mode (original map view) ───
  function renderMapMode() {
    return `
      <div style="position:relative">
        <div style="position:absolute;top:0;left:0;right:0;z-index:600;background:var(--surface);border-bottom:1px solid var(--border);padding:10px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="ExploreView.goBack()">← Back</button>
          <span style="font-size:14px;font-weight:600">Aarhus · Live map</span>
          <div style="flex:1;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            ${DATA.communities.map(c => `
              <button class="filter-btn" data-community="${c.id}" onclick="ExploreView.toggleFilter('${c.id}')" style="border-left:3px solid ${c.color}">${c.shortName}</button>
            `).join('')}
          </div>
        </div>
        <div id="explore-map-view" style="padding-top:52px">
          <div id="map-container">
            <div id="explore-map"></div>
            <div class="timeline-strip">
              <div class="timeline-label">Scrub through time</div>
              <div class="timeline-scrubber" id="timeline-scrubber">
                ${renderTimelineDays()}
              </div>
            </div>
            <div class="map-overlay-panel" id="map-overlay-panel">
              <div id="map-overlay-content" style="padding:16px"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Shared helpers ───
  function renderModeHeader(mode, icon, label, title, color, bg) {
    return `
      <div style="background:linear-gradient(135deg,${bg} 0%,${bg}cc 100%);padding:28px 40px;display:flex;align-items:center;gap:16px;border-bottom:1px solid rgba(255,255,255,0.08)">
        <button class="btn" style="background:rgba(255,255,255,0.1);color:white;border:1px solid rgba(255,255,255,0.2)" onclick="ExploreView.goBack()">← Back</button>
        <span style="font-size:24px;color:${color}">${icon}</span>
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.5);margin-bottom:2px">${label}</div>
          <div style="font-size:20px;font-weight:800;color:white">${title}</div>
        </div>
      </div>
    `;
  }

  // Map state for map mode
  let currentDay = 0;
  let activeFilters = { communities: new Set() };
  const refDate = new Date(2026, 3, 23);

  function getDate(offset) {
    const d = new Date(refDate);
    d.setDate(d.getDate() + offset);
    return d;
  }

  function renderTimelineDays() {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const d = getDate(i);
      const dayEvents = DATA.events.filter(e => e.date.toDateString() === d.toDateString());
      const dots = dayEvents.slice(0, 5).map(e => {
        const c = DATA.getCommunityById(e.communities[0]);
        return `<div class="timeline-dot" style="background:${c ? c.color : '#aaa'}"></div>`;
      }).join('');
      days.push(`
        <div class="timeline-day ${i === currentDay ? 'active' : ''}" onclick="ExploreView.setDay(${i})">
          <div class="timeline-day-label">${d.toLocaleDateString('en-DK',{weekday:'short'})}</div>
          <div class="timeline-day-date">${d.getDate()}</div>
          <div class="timeline-day-dots">${dots}</div>
        </div>
      `);
    }
    return days.join('');
  }

  function initMap(containerId = 'explore-map', lat = 56.162, lng = 10.203, zoom = 14) {
    if (map) { map.remove(); map = null; }
    const mapEl = document.getElementById(containerId);
    if (!mapEl) return;

    map = L.map(containerId, { center: [lat, lng], zoom, zoomControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd', maxZoom: 20
    }).addTo(map);

    if (containerId === 'explore-map') updateMapMarkers();
    if (containerId === 'world-map') addWorldMarkers();
  }

  function updateMapMarkers() {
    if (!map) return;
    markers.forEach(m => m.remove());
    markers = [];

    const selectedDate = getDate(currentDay);
    const dayEvents = DATA.events.filter(e => e.date.toDateString() === selectedDate.toDateString());

    DATA.communities.forEach(c => {
      if (activeFilters.communities.size > 0 && !activeFilters.communities.has(c.id)) return;
      const circle = L.circle([c.location.lat, c.location.lng], {
        radius: 300 + c.memberCount * 2,
        color: c.color, fillColor: c.color, fillOpacity: 0.08, weight: 1, opacity: 0.3
      }).addTo(map);
      markers.push(circle);
    });

    const byVenue = {};
    dayEvents.forEach(e => {
      if (!byVenue[e.venue]) byVenue[e.venue] = [];
      byVenue[e.venue].push(e);
    });

    Object.entries(byVenue).forEach(([venueId, venueEvents]) => {
      const venue = DATA.getVenueById(venueId);
      if (!venue) return;
      const size = 24 + venueEvents.length * 8;
      const color = DATA.getCommunityById(venueEvents[0].communities[0])?.color || '#4a7c59';
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};opacity:0.85;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:${size<40?11:14}px;font-weight:800;color:white">${venueEvents.length}</div>`,
        iconSize: [size, size], iconAnchor: [size/2, size/2]
      });
      const marker = L.marker([venue.location.lat, venue.location.lng], { icon })
        .addTo(map)
        .on('click', () => showVenuePanel(venue, venueEvents));
      markers.push(marker);
    });
  }

  function addWorldMarkers() {
    if (!map) return;
    worldData.forEach(d => {
      const color = { event: '#4a7c59', festival: '#7b5ea7', community: '#4a90d9' }[d.type] || '#4a7c59';
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:36px;height:36px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer">${d.flag}</div>`,
        iconSize: [36, 36], iconAnchor: [18, 18]
      });
      L.marker([d.lat, d.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${d.title}</strong><br>${d.city} · ${d.date}`);
      markers.push(L.marker([d.lat, d.lng], { icon }));
    });
    // Also show Aarhus
    const aarhusIcon = L.divIcon({
      className: '',
      html: `<div style="width:44px;height:44px;border-radius:50%;background:var(--accent);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white">YOU</div>`,
      iconSize: [44, 44], iconAnchor: [22, 22]
    });
    L.marker([56.162, 10.203], { icon: aarhusIcon }).addTo(map).bindPopup('<strong>Aarhus</strong><br>Your home base');
  }

  function showVenuePanel(venue, venueEvents) {
    const communities = venue.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const panel = document.getElementById('map-overlay-panel');
    const content = document.getElementById('map-overlay-content');
    if (!panel || !content) return;

    content.innerHTML = `
      <div style="margin-bottom:12px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">${venue.type}</div>
        <div style="font-size:18px;font-weight:800">${venue.name}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:2px">📍 ${venue.address}</div>
      </div>
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;font-style:italic">${venue.atmosphere}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
        ${communities.map(c => `<span class="chip" style="border-color:${c.color};color:${c.color}">${c.emoji} ${c.shortName}</span>`).join('')}
      </div>
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">
        ${venueEvents.length > 0 ? `${venueEvents.length} event${venueEvents.length > 1 ? 's' : ''} today` : 'No events today'}
      </div>
      ${venueEvents.map(e => {
        const host = DATA.getFacilitatorById(e.host);
        const comms = e.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
        return `
          <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;margin-bottom:8px;cursor:pointer" onclick="App.navigate('event','${e.id}')">
            <div style="display:flex;gap:4px;margin-bottom:4px">${comms.map(c=>`<span class="community-dot" style="background:${c.color}"></span>`).join('')}</div>
            <div style="font-size:14px;font-weight:700">${e.title}</div>
            <div style="font-size:12px;color:var(--text-secondary)">${DATA.formatTime(e.date)} · ${host ? host.name : ''}</div>
            <div style="font-size:12px;color:${e.price===0?'var(--accent)':'var(--text-muted)'};margin-top:2px">${DATA.formatPrice(e)}</div>
          </div>
        `;
      }).join('')}
      <button class="btn btn-outline btn-sm" style="width:100%;margin-top:8px" onclick="App.navigate('venue','${venue.id}')">View venue page →</button>
    `;
    panel.classList.add('open');
  }

  function setDay(offset) {
    currentDay = offset;
    document.querySelectorAll('.timeline-day').forEach((el, i) => {
      el.classList.toggle('active', i === offset);
    });
    updateMapMarkers();
  }

  function toggleFilter(communityId) {
    if (activeFilters.communities.has(communityId)) {
      activeFilters.communities.delete(communityId);
    } else {
      activeFilters.communities.add(communityId);
    }
    document.querySelectorAll('.filter-btn[data-community]').forEach(btn => {
      btn.classList.toggle('active', activeFilters.communities.has(btn.dataset.community));
    });
    updateMapMarkers();
  }

  function setMode(mode) {
    activeMode = mode;
    const container = document.getElementById('view-container');
    if (mode === 'familiar') container.innerHTML = renderFamiliar();
    else if (mode === 'social') container.innerHTML = renderSocial();
    else if (mode === 'world') {
      container.innerHTML = renderWorld();
      setTimeout(() => initMap('world-map', 54.0, 10.0, 4), 100);
    }
    else if (mode === 'map') {
      container.innerHTML = renderMapMode();
      setTimeout(() => initMap('explore-map'), 100);
    }
    window.scrollTo(0, 0);
  }

  function goBack() {
    activeMode = null;
    if (map) { map.remove(); map = null; }
    document.getElementById('view-container').innerHTML = renderLanding();
    window.scrollTo(0, 0);
  }

  function afterRender() {
    // no-op for landing; map init happens in setMode
  }

  return { render, afterRender, setMode, goBack, setDay, toggleFilter };
})();
