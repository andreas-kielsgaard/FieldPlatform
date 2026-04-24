// ─── Rhythm of the Field ───
// Map ontology: communities = ambient fields, venues = anchors, events = bounded kernels

const RhythmView = (() => {
  let map = null;
  let layers = { fields: [], anchors: [], kernels: [], traces: [] };
  let selectedDay = 3;   // 0=Mon … 6=Sun, default Thursday (most active)
  let selectedPeriod = 2; // 0=morning, 1=afternoon, 2=evening
  let panelOpen = false;

  const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const PERIODS = ['Morning','Afternoon','Evening'];
  const PERIOD_HOURS = [[7,12],[12,17],[17,23]]; // hour ranges

  // ─── Field state generation from events data ───
  function buildFieldStates() {
    // fieldStates[venueId][day][period] = { intensity, communities: {id: count}, events: [], regularity }
    const fs = {};
    DATA.venues.forEach(v => {
      fs[v.id] = Array.from({length:7}, () => Array.from({length:3}, () => ({
        intensity: 0, communities: {}, events: [], regularity: 0
      })));
    });

    DATA.events.forEach(e => {
      const v = DATA.getVenueById(e.venue);
      if (!v || !fs[e.venue]) return;
      const dow = (e.date.getDay() + 6) % 7; // JS: 0=Sun, we want 0=Mon
      const h = e.date.getHours();
      const period = h < 12 ? 0 : h < 17 ? 1 : 2;
      const slot = fs[e.venue][dow][period];
      slot.intensity = Math.min(1, slot.intensity + (e.recurring ? 0.45 : 0.25));
      slot.events.push(e.id);
      e.communities.forEach(cId => { slot.communities[cId] = (slot.communities[cId] || 0) + 1; });
      slot.regularity = Math.max(slot.regularity, e.recurring ? 0.9 : 0.4);
    });
    return fs;
  }

  const fieldStates = buildFieldStates();

  // ─── Blend community colors weighted by count ───
  function blendColors(commWeights) {
    const entries = Object.entries(commWeights);
    if (entries.length === 0) return '#4a7c59';
    if (entries.length === 1) {
      const c = DATA.getCommunityById(entries[0][0]);
      return c ? c.color : '#4a7c59';
    }
    const total = entries.reduce((s, [,v]) => s + v, 0);
    // Weighted average of RGB
    let r = 0, g = 0, b = 0;
    entries.forEach(([id, count]) => {
      const comm = DATA.getCommunityById(id);
      if (!comm) return;
      const hex = comm.color.replace('#','');
      r += parseInt(hex.slice(0,2),16) * count / total;
      g += parseInt(hex.slice(2,4),16) * count / total;
      b += parseInt(hex.slice(4,6),16) * count / total;
    });
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  }

  // ─── SVG time wheel ───
  function buildWheel() {
    const cx = 130, cy = 130, size = 260;
    const rings = [[46,80],[83,117],[120,154]]; // [r1,r2] per period
    const sectorDeg = 360 / 7;
    const gap = 3.5;

    function polar(r, angleDeg) {
      const rad = (angleDeg - 90) * Math.PI / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    }

    function arc(r1, r2, a1, a2) {
      const large = (a2 - a1) > 180 ? 1 : 0;
      const [x1,y1] = polar(r1, a1), [x2,y2] = polar(r1, a2);
      const [x3,y3] = polar(r2, a2), [x4,y4] = polar(r2, a1);
      return `M${x1} ${y1} A${r1} ${r1} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r2} ${r2} 0 ${large} 0 ${x4} ${y4}Z`;
    }

    let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block">`;

    // Background disc
    svg += `<circle cx="${cx}" cy="${cy}" r="155" fill="#0a0f0a" opacity="0.6"/>`;

    // Ring label arcs (background rings)
    rings.forEach(([r1,r2], p) => {
      const mid = (r1+r2)/2;
      const labelAngle = -90 + (p - 1) * 22;
      const [lx,ly] = polar(mid, -92);
      // faint ring band
      svg += `<path d="${arc(r1,r2,-90+gap/2, 270-gap/2)}" fill="rgba(255,255,255,0.03)" stroke="none"/>`;
    });

    // Sectors
    for (let d = 0; d < 7; d++) {
      const a1 = -90 + d * sectorDeg + gap/2;
      const a2 = -90 + (d+1) * sectorDeg - gap/2;
      const midA = -90 + (d + 0.5) * sectorDeg;

      for (let p = 0; p < 3; p++) {
        const [r1, r2] = rings[p];
        const isSelected = d === selectedDay && p === selectedPeriod;
        const slot = fieldStates;
        // Sum intensity across all venues for this slot
        const totalIntensity = DATA.venues.reduce((sum, v) => {
          return sum + (fieldStates[v.id]?.[d]?.[p]?.intensity || 0);
        }, 0);
        const normIntensity = Math.min(1, totalIntensity / 3);

        // Dominant community color for this slot
        const allComms = {};
        DATA.venues.forEach(v => {
          const slot = fieldStates[v.id]?.[d]?.[p];
          if (!slot) return;
          Object.entries(slot.communities).forEach(([cId, cnt]) => {
            allComms[cId] = (allComms[cId] || 0) + cnt;
          });
        });
        const slotColor = blendColors(allComms) || '#4a7c59';

        const baseOpacity = 0.15 + normIntensity * 0.55;
        const opacity = isSelected ? 1 : baseOpacity;
        const fillColor = isSelected ? slotColor : slotColor;
        const strokeColor = isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)';

        svg += `<path
          d="${arc(r1+1, r2-1, a1, a2)}"
          fill="${fillColor}"
          opacity="${opacity}"
          stroke="${strokeColor}"
          stroke-width="${isSelected ? 1.5 : 0.5}"
          style="cursor:pointer;transition:opacity 0.25s"
          onclick="RhythmView.selectSlot(${d},${p})"
        >
          <title>${DAYS[d]} ${PERIODS[p]}</title>
        </path>`;

        // Pulse ring on selected
        if (isSelected) {
          svg += `<path d="${arc(r1+1, r2-1, a1, a2)}" fill="none" stroke="${slotColor}" stroke-width="2" opacity="0.5"/>`;
        }
      }

      // Day label
      const labelR = 168;
      const [lx, ly] = polar(labelR, midA);
      const isActiveDay = d === selectedDay;
      svg += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle"
        font-size="${isActiveDay ? 11 : 10}" font-weight="${isActiveDay ? '700' : '500'}"
        fill="${isActiveDay ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)'}"
        style="pointer-events:none;font-family:var(--font)">${DAYS[d]}</text>`;
    }

    // Period labels (inner)
    const periodLabels = ['AM','PM','Eve'];
    rings.forEach(([r1,r2], p) => {
      const midR = (r1+r2)/2;
      const [lx, ly] = polar(midR, -90 - sectorDeg*0.5 + gap);
      svg += `<text x="${cx - midR - 4}" y="${cy}"
        text-anchor="end" dominant-baseline="middle"
        font-size="8" fill="rgba(255,255,255,0.25)"
        style="pointer-events:none;font-family:var(--font)">${periodLabels[p]}</text>`;
    });

    // Center label
    svg += `<circle cx="${cx}" cy="${cy}" r="42" fill="#0a0f0a" opacity="0.8"/>`;
    svg += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="9" font-weight="700"
      fill="rgba(255,255,255,0.5)" style="font-family:var(--font);text-transform:uppercase;letter-spacing:0.06em">Rhythm</text>`;
    svg += `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="9"
      fill="rgba(255,255,255,0.3)" style="font-family:var(--font)">of the field</text>`;

    svg += `</svg>`;
    return svg;
  }

  // ─── Render ───
  function render() {
    return `
      <div id="rhythm-shell" style="position:relative;height:calc(100vh - var(--topbar-h));display:flex;flex-direction:column;background:#0a0d0a;overflow:hidden">

        <!-- Back + title bar -->
        <div style="position:absolute;top:12px;left:12px;z-index:600;display:flex;align-items:center;gap:10px">
          <button class="btn btn-sm" style="background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.15)" onclick="App.navigate('home')">← Home</button>
          <div style="background:rgba(10,13,10,0.7);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius);padding:6px 14px;backdrop-filter:blur(8px)">
            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.5)">◎ </span>
            <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.85)">Explore the rhythm of the field</span>
          </div>
        </div>

        <!-- Map modes (left) -->
        <div id="rhythm-mode-panel" style="position:absolute;top:64px;left:12px;z-index:600;display:flex;flex-direction:column;gap:4px">
          ${[
            ['rhythm','◎','Rhythm', true],
            ['live','⬤','Open / Live', false],
            ['familiar','↩','Familiar', false],
            ['adjacent','⟡','Adjacent', false],
          ].map(([mode, icon, label, active]) => `
            <button onclick="RhythmView.setMapMode('${mode}')"
              class="rhythm-mode-btn ${active ? 'active' : ''}" id="rmode-${mode}">
              <span style="font-size:13px">${icon}</span>
              <span>${label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Map -->
        <div id="rhythm-map" style="flex:1;width:100%"></div>

        <!-- Right interpretation panel -->
        <div id="rhythm-panel" class="rhythm-panel">
          <div id="rhythm-panel-content"></div>
        </div>

        <!-- Time wheel (bottom center) -->
        <div id="wheel-container" style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);z-index:600;pointer-events:auto">
          <div id="wheel-svg-wrap" style="filter:drop-shadow(0 4px 24px rgba(0,0,0,0.6))">
            ${buildWheel()}
          </div>
          <div style="text-align:center;margin-top:4px">
            <span id="wheel-label" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.45)">${DAYS[selectedDay]} · ${PERIODS[selectedPeriod]}</span>
          </div>
        </div>

      </div>
    `;
  }

  // ─── After render: init map ───
  function afterRender() {
    setTimeout(() => {
      initMap();
      updateMapForSlot();
    }, 80);
  }

  function initMap() {
    const el = document.getElementById('rhythm-map');
    if (!el || map) return;

    map = L.map('rhythm-map', {
      center: [56.162, 10.203],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd', maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);
  }

  function clearLayers() {
    Object.values(layers).flat().forEach(l => { try { l.remove(); } catch(e) {} });
    layers = { fields: [], anchors: [], kernels: [], traces: [] };
  }

  // ─── Map rendering with ontology ───
  function updateMapForSlot() {
    if (!map) return;
    clearLayers();

    const day = selectedDay;
    const period = selectedPeriod;

    // 1. Community presence fields — ambient, large, very soft
    DATA.communities.forEach(c => {
      const relevantVenues = DATA.venues.filter(v => v.communities.includes(c.id));
      const totalActivity = relevantVenues.reduce((sum, v) => {
        return sum + (fieldStates[v.id]?.[day]?.[period]?.intensity || 0);
      }, 0) / Math.max(relevantVenues.length, 1);

      const radius = 450 + c.memberCount * 3;
      const opacity = 0.05 + totalActivity * 0.12;

      const field = L.circle([c.location.lat, c.location.lng], {
        radius,
        color: c.color,
        fillColor: c.color,
        fillOpacity: opacity,
        weight: 0,
        className: 'community-field'
      }).addTo(map);

      // Soft outer glow ring
      const glow = L.circle([c.location.lat, c.location.lng], {
        radius: radius * 1.4,
        color: c.color,
        fillColor: c.color,
        fillOpacity: opacity * 0.4,
        weight: 0
      }).addTo(map);

      layers.fields.push(field, glow);
    });

    // 2. Venue anchors — stable, always visible, size reflects activity
    DATA.venues.forEach(v => {
      const slot = fieldStates[v.id]?.[day]?.[period];
      const intensity = slot?.intensity || 0;
      const regularity = slot?.regularity || 0;
      const hasEvents = (slot?.events || []).length > 0;

      const dominantComm = Object.keys(slot?.communities || {})
        .sort((a,b) => (slot.communities[b]||0) - (slot.communities[a]||0))[0];
      const color = dominantComm
        ? (DATA.getCommunityById(dominantComm)?.color || '#5a6a58')
        : '#3a4a3a';

      // Venue anchor: diamond-like square marker
      const anchorSize = hasEvents ? 14 + Math.round(intensity * 10) : 8;
      const glowSize = anchorSize * 2.5;

      const icon = L.divIcon({
        className: '',
        html: `<div style="position:relative;width:${glowSize}px;height:${glowSize}px;display:flex;align-items:center;justify-content:center">
          ${hasEvents ? `<div style="position:absolute;width:${glowSize}px;height:${glowSize}px;border-radius:50%;background:${color};opacity:${0.15 + intensity*0.2};animation:${regularity > 0.7 ? 'pulse 2.5s ease-in-out infinite' : 'none'}"></div>` : ''}
          <div style="
            width:${anchorSize}px;height:${anchorSize}px;
            background:${hasEvents ? color : '#2a3a2a'};
            border:${hasEvents ? '2px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.15)'};
            border-radius:${regularity > 0.7 ? '3px' : '50%'};
            transform:${regularity > 0.7 ? 'rotate(45deg)' : 'none'};
            opacity:${hasEvents ? 0.9 : 0.4};
            cursor:pointer;
            box-shadow:${hasEvents ? '0 0 8px ' + color + '66' : 'none'}
          "></div>
        </div>`,
        iconSize: [glowSize, glowSize],
        iconAnchor: [glowSize/2, glowSize/2]
      });

      const anchor = L.marker([v.location.lat, v.location.lng], { icon })
        .addTo(map)
        .on('click', () => openPanel(v, slot, day, period));

      layers.anchors.push(anchor);
    });

    // 3. Event kernels — bounded, concrete, clickable
    DATA.venues.forEach(v => {
      const slot = fieldStates[v.id]?.[day]?.[period];
      if (!slot || slot.events.length === 0) return;

      slot.events.forEach((eId, idx) => {
        const event = DATA.getEventById(eId);
        if (!event) return;
        const comm = DATA.getCommunityById(event.communities[0]);
        const color = comm ? comm.color : '#4a7c59';

        // Offset kernels slightly so multiple events at same venue don't overlap
        const offsetAngle = (idx / Math.max(slot.events.length, 1)) * Math.PI * 2;
        const offsetDist = idx > 0 ? 0.0004 : 0;
        const lat = v.location.lat + Math.sin(offsetAngle) * offsetDist;
        const lng = v.location.lng + Math.cos(offsetAngle) * offsetDist;

        const kernel = L.circleMarker([lat, lng], {
          radius: 9 + (event.attending || []).length * 0.3,
          color: 'rgba(255,255,255,0.7)',
          fillColor: color,
          fillOpacity: 0.85,
          weight: 1.5,
          className: 'event-kernel'
        })
          .addTo(map)
          .on('click', () => App.navigate('event', event.id));

        layers.kernels.push(kernel);
      });
    });

    // 4. Adjacency traces — subtle lines between overlapping communities that are both active
    DATA.communities.forEach(c => {
      const cActive = DATA.venues
        .filter(v => v.communities.includes(c.id))
        .some(v => (fieldStates[v.id]?.[day]?.[period]?.intensity || 0) > 0.2);

      if (!cActive) return;

      c.overlaps.forEach(ov => {
        if (ov.strength < 0.5) return;
        const other = DATA.getCommunityById(ov.communityId);
        if (!other) return;
        const otherActive = DATA.venues
          .filter(v => v.communities.includes(other.id))
          .some(v => (fieldStates[v.id]?.[day]?.[period]?.intensity || 0) > 0.2);

        if (!otherActive) return;

        // Only draw each pair once
        if (c.id > other.id) return;

        const trace = L.polyline(
          [[c.location.lat, c.location.lng], [other.location.lat, other.location.lng]],
          {
            color: c.color,
            weight: 1,
            opacity: 0.2 + ov.strength * 0.25,
            dashArray: '4 8',
            className: 'adjacency-trace'
          }
        ).addTo(map);

        layers.traces.push(trace);
      });
    });
  }

  // ─── Right panel: Pattern + Doors ───
  function openPanel(venue, slot, day, period) {
    const panel = document.getElementById('rhythm-panel');
    const content = document.getElementById('rhythm-panel-content');
    if (!panel || !content) return;

    const comms = venue.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const events = (slot?.events || []).map(id => DATA.getEventById(id)).filter(Boolean);
    const regularity = slot?.regularity || 0;

    const regularityDesc = regularity > 0.8
      ? 'Stable, recurring rhythm here.'
      : regularity > 0.5
      ? 'Fairly regular presence.'
      : 'Occasional or one-off activity.';

    const regularityEdge = regularity > 0.8
      ? 'Crisp rhythm — this is dependable.'
      : regularity > 0.5
      ? 'Moderately stable.'
      : 'Soft edge — looser presence.';

    content.innerHTML = `
      <div style="padding:20px 18px">

        <div style="margin-bottom:18px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-bottom:6px">Location</div>
          <div style="font-size:16px;font-weight:800;color:rgba(255,255,255,0.9)">${venue.name}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px">${venue.type} · ${venue.address}</div>
        </div>

        <div style="margin-bottom:20px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-bottom:10px">▲ Pattern</div>
          ${slot && slot.intensity > 0 ? `
            <div style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:10px">
              <strong style="color:rgba(255,255,255,0.9)">${DAYS[day]} ${PERIODS[period].toLowerCase()}</strong> is
              ${slot.intensity > 0.6 ? 'particularly active' : 'moderately active'} here.
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
              ${comms.filter(c => slot.communities[c.id]).map(c => `
                <div style="display:flex;align-items:center;gap:5px;padding:4px 10px;background:${c.color}22;border:1px solid ${c.color}44;border-radius:20px">
                  <span style="font-size:12px">${c.emoji}</span>
                  <span style="font-size:12px;font-weight:600;color:${c.color}">${c.shortName}</span>
                </div>
              `).join('')}
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);font-style:italic">${regularityEdge}</div>
          ` : `
            <div style="font-size:13px;color:rgba(255,255,255,0.35);font-style:italic">
              This venue tends to be quiet on ${DAYS[day]} ${PERIODS[period].toLowerCase()}s. Try another time slot.
            </div>
          `}
        </div>

        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);margin-bottom:10px">⬡ Doors into participation</div>
          ${events.length > 0 ? `
            ${events.map(e => {
              const host = DATA.getFacilitatorById(e.host);
              const ec = e.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
              return `
                <div style="border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px;margin-bottom:8px;cursor:pointer;background:rgba(255,255,255,0.04)"
                  onclick="App.navigate('event','${e.id}')">
                  <div style="display:flex;gap:4px;margin-bottom:5px">
                    ${ec.map(c=>`<div style="width:7px;height:7px;border-radius:50%;background:${c.color}"></div>`).join('')}
                  </div>
                  <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.9)">${e.title}</div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px">${host ? host.name : ''} · ${DATA.formatDate(e.date)}</div>
                  <div style="font-size:12px;color:${e.price===0?'#5abcb9':'rgba(255,255,255,0.4)'};margin-top:2px">${DATA.formatPrice(e)}</div>
                </div>
              `;
            }).join('')}
          ` : '<div style="font-size:13px;color:rgba(255,255,255,0.3)">No concrete events in this slot — but the rhythm is here.</div>'}

          <div style="margin-top:14px;display:flex;flex-direction:column;gap:6px">
            ${comms.map(c => `
              <button style="text-align:left;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;color:rgba(255,255,255,0.7);font-size:13px"
                onclick="App.navigate('community','${c.id}')">
                ${c.emoji} ${c.name} →
              </button>
            `).join('')}
            <button style="text-align:left;padding:8px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;color:rgba(255,255,255,0.7);font-size:13px"
              onclick="App.navigate('venue','${venue.id}')">
              📍 View venue page →
            </button>
          </div>
        </div>
      </div>
    `;

    panel.classList.add('open');
    panelOpen = true;
  }

  // ─── Interactions ───
  function selectSlot(day, period) {
    selectedDay = day;
    selectedPeriod = period;

    // Rebuild wheel SVG
    const wrap = document.getElementById('wheel-svg-wrap');
    if (wrap) wrap.innerHTML = buildWheel();

    // Update label
    const label = document.getElementById('wheel-label');
    if (label) label.textContent = `${DAYS[day]} · ${PERIODS[period]}`;

    updateMapForSlot();
  }

  function setMapMode(mode) {
    document.querySelectorAll('.rhythm-mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`rmode-${mode}`)?.classList.add('active');

    if (mode === 'live') {
      // Switch to lighter tile layer for live mode
      if (map) {
        map.eachLayer(l => { if (l._url) map.removeLayer(l); });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd', maxZoom: 20
        }).addTo(map);
      }
    } else {
      if (map) {
        map.eachLayer(l => { if (l._url) map.removeLayer(l); });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd', maxZoom: 20
        }).addTo(map);
      }
    }
    updateMapForSlot();
  }

  function destroy() {
    if (map) { map.remove(); map = null; }
    layers = { fields: [], anchors: [], kernels: [], traces: [] };
    panelOpen = false;
  }

  return { render, afterRender, selectSlot, setMapMode, destroy };
})();
