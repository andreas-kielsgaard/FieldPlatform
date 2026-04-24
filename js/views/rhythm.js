// ─── Rhythm of the Field ───
// Map modes: rhythm (default), live, familiar, adjacent, wider

const RhythmView = (() => {
  let map = null;
  let layers = { fields: [], anchors: [], kernels: [], traces: [] };
  let selectedDay = 3;    // 0=Mon…6=Sun
  let selectedPeriod = 2; // 0=morning 1=afternoon 2=evening
  let currentMode = 'rhythm';
  let liveDayOffset = 0;  // for live mode: days from reference

  const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const PERIODS = ['Morning','Afternoon','Evening'];
  const MODES = [
    { id: 'rhythm',   icon: '◎', label: 'Rhythm of the Field' },
    { id: 'live',     icon: '⬤', label: 'Open / Live' },
    { id: 'familiar', icon: '↩', label: 'Familiar Territory' },
    { id: 'adjacent', icon: '⟡', label: 'Adjacent Worlds' },
    { id: 'wider',    icon: '⊙', label: 'Wider Field' },
  ];

  // ── SVG time wheel ──
  function buildWheel() {
    const cx = 130, cy = 130, size = 260;
    const rings = [[46,80],[83,117],[120,154]];
    const sectorDeg = 360 / 7;
    const gap = 3.5;

    function polar(r, angleDeg) {
      const rad = (angleDeg - 90) * Math.PI / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    }

    function arc(r1, r2, a1, a2) {
      const large = (a2 - a1) > 180 ? 1 : 0;
      const [x1, y1] = polar(r1, a1), [x2, y2] = polar(r1, a2);
      const [x3, y3] = polar(r2, a2), [x4, y4] = polar(r2, a1);
      return `M${x1} ${y1} A${r1} ${r1} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r2} ${r2} 0 ${large} 0 ${x4} ${y4}Z`;
    }

    let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block">`;
    svg += `<circle cx="${cx}" cy="${cy}" r="158" fill="#080c08" opacity="0.7"/>`;

    for (let d = 0; d < 7; d++) {
      const a1 = -90 + d * sectorDeg + gap / 2;
      const a2 = -90 + (d + 1) * sectorDeg - gap / 2;
      const midA = -90 + (d + 0.5) * sectorDeg;

      for (let p = 0; p < 3; p++) {
        const [r1, r2] = rings[p];
        const isSelected = d === selectedDay && p === selectedPeriod;

        const totalIntensity = DATA.venues.reduce((sum, v) => {
          return sum + (FieldVizEngine.getSlotData(v.id, d, p)?.intensity || 0);
        }, 0);
        const normIntensity = Math.min(1, totalIntensity / 3);

        const allComms = {};
        DATA.venues.forEach(v => {
          const slot = FieldVizEngine.getSlotData(v.id, d, p);
          if (!slot) return;
          Object.entries(slot.communities || {}).forEach(([cId, cnt]) => {
            allComms[cId] = (allComms[cId] || 0) + cnt;
          });
        });
        const slotColor = FieldVizEngine.blendColors(allComms);

        const opacity = isSelected ? 1 : 0.15 + normIntensity * 0.55;
        svg += `<path d="${arc(r1 + 1, r2 - 1, a1, a2)}"
          fill="${slotColor}" opacity="${opacity}"
          stroke="${isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)'}"
          stroke-width="${isSelected ? 1.5 : 0.5}"
          style="cursor:pointer;transition:opacity 0.25s"
          onclick="RhythmView.selectSlot(${d},${p})">
          <title>${DAYS[d]} ${PERIODS[p]}</title>
        </path>`;

        if (isSelected) {
          svg += `<path d="${arc(r1 + 1, r2 - 1, a1, a2)}" fill="none" stroke="${slotColor}" stroke-width="2" opacity="0.6"/>`;
        }
      }

      const [lx, ly] = polar(170, midA);
      const active = d === selectedDay;
      svg += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle"
        font-size="${active ? 11 : 10}" font-weight="${active ? '700' : '500'}"
        fill="${active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)'}"
        style="pointer-events:none;font-family:var(--font)">${DAYS[d]}</text>`;
    }

    const periodLabels = ['AM','PM','Eve'];
    rings.forEach(([r1, r2], p) => {
      const midR = (r1 + r2) / 2;
      svg += `<text x="${cx - midR - 4}" y="${cy}"
        text-anchor="end" dominant-baseline="middle" font-size="8" fill="rgba(255,255,255,0.22)"
        style="pointer-events:none;font-family:var(--font)">${periodLabels[p]}</text>`;
    });

    svg += `<circle cx="${cx}" cy="${cy}" r="43" fill="#080c08" opacity="0.85"/>`;
    svg += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="9" font-weight="700"
      fill="rgba(255,255,255,0.5)" style="font-family:var(--font);text-transform:uppercase;letter-spacing:0.06em">Rhythm</text>`;
    svg += `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="9"
      fill="rgba(255,255,255,0.28)" style="font-family:var(--font)">of the field</text>`;
    svg += '</svg>';
    return svg;
  }

  // ── Live mode date scrubber ──
  function buildLiveScrubber() {
    const labels = ['Today','Tomorrow','This weekend','Next 7 days','Next 30 days'];
    const offsets = [0, 1, 5, 4, 15];
    return `
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px 16px">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.35)">Showing:</span>
        ${labels.map((l, i) => `
          <button onclick="RhythmView.setLiveDayOffset(${offsets[i]})"
            style="padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font);
              background:${liveDayOffset === offsets[i] ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'};
              border:1px solid rgba(255,255,255,${liveDayOffset === offsets[i] ? 0.35 : 0.1});
              color:rgba(255,255,255,${liveDayOffset === offsets[i] ? 0.9 : 0.45})">${l}</button>
        `).join('')}
      </div>`;
  }

  // ── Wider field scale selector ──
  function buildWiderFieldControl() {
    return `
      <div style="display:flex;align-items:center;gap:8px;justify-content:center;padding:10px 16px">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.35)">Scale:</span>
        ${['Scandinavia','North Europe','Europe'].map((l, i) => `
          <button style="padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font);
            background:${i === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'};
            border:1px solid rgba(255,255,255,${i === 0 ? 0.35 : 0.1});
            color:rgba(255,255,255,${i === 0 ? 0.9 : 0.45})">${l}</button>
        `).join('')}
      </div>`;
  }

  // ── Render shell ──
  function render() {
    return `
      <div id="rhythm-shell" style="position:relative;height:calc(100vh - var(--topbar-h));display:flex;flex-direction:column;background:#080c08;overflow:hidden">

        <!-- Top bar -->
        <div style="position:absolute;top:12px;left:12px;z-index:700;display:flex;align-items:center;gap:10px">
          <button class="btn btn-sm" style="background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.15);font-family:var(--font)" onclick="App.navigate('home')">← Home</button>
          <div style="background:rgba(8,12,8,0.75);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius);padding:6px 14px;backdrop-filter:blur(8px)">
            <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.8)" id="rhythm-mode-title">◎ Explore the rhythm of the field</span>
          </div>
        </div>

        <!-- Mode selector (left) -->
        <div id="rhythm-mode-panel" style="position:absolute;top:64px;left:12px;z-index:700;display:flex;flex-direction:column;gap:3px">
          ${MODES.map(m => `
            <button onclick="RhythmView.setMapMode('${m.id}')"
              class="rhythm-mode-btn ${m.id === currentMode ? 'active' : ''}" id="rmode-${m.id}">
              <span style="font-size:13px;width:18px;text-align:center">${m.icon}</span>
              <span>${m.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Map -->
        <div id="rhythm-map" style="flex:1;width:100%;position:relative"></div>

        <!-- Right panel -->
        <div id="rhythm-panel" class="rhythm-panel">
          <div id="rhythm-panel-content">
            <div class="rhythm-panel-empty">Click a venue or community area<br>to see the pattern and<br>doors into participation.</div>
          </div>
        </div>

        <!-- Bottom: time control (swapped per mode) -->
        <div id="rhythm-bottom" style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);z-index:700;pointer-events:auto">
          <div id="rhythm-time-control">
            ${buildTimeControl()}
          </div>
        </div>

      </div>
    `;
  }

  function buildTimeControl() {
    if (currentMode === 'rhythm' || currentMode === 'familiar') {
      return `
        <div style="filter:drop-shadow(0 4px 24px rgba(0,0,0,0.6))">
          <div id="wheel-svg-wrap">${buildWheel()}</div>
          <div style="text-align:center;margin-top:4px">
            <span id="wheel-label" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.4)">${DAYS[selectedDay]} · ${PERIODS[selectedPeriod]}</span>
          </div>
        </div>`;
    }
    if (currentMode === 'live') return buildLiveScrubber();
    if (currentMode === 'wider') return buildWiderFieldControl();
    // adjacent: no time control
    return `<div style="font-size:11px;color:rgba(255,255,255,0.25);text-align:center;padding:8px">Showing adjacency from your followed communities</div>`;
  }

  // ── Init map ──
  function afterRender() {
    setTimeout(() => {
      initMap();
      redraw();
    }, 80);
  }

  function initMap() {
    if (map) return;
    const el = document.getElementById('rhythm-map');
    if (!el) return;

    map = L.map('rhythm-map', { center: [56.162, 10.203], zoom: 14, zoomControl: false, attributionControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd', maxZoom: 20
    }).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);
  }

  // ── Re-render layers for the current mode ──
  function redraw() {
    if (!map) return;
    FieldVizEngine.clearLayers(layers);

    const persona = DATA.getCurrentPersona();

    if (currentMode === 'rhythm') {
      FieldVizEngine.renderRhythmMap(map, selectedDay, selectedPeriod, layers, openPanel);
    } else if (currentMode === 'live') {
      FieldVizEngine.renderLiveMap(map, liveDayOffset, layers, openPanel);
    } else if (currentMode === 'familiar') {
      FieldVizEngine.renderFamiliarMap(map, persona, selectedDay, selectedPeriod, layers, openPanel);
    } else if (currentMode === 'adjacent') {
      FieldVizEngine.renderAdjacentMap(map, persona, layers);
    } else if (currentMode === 'wider') {
      // Zoom out
      if (map) map.setView([54.5, 10.0], 5);
      FieldVizEngine.renderWiderFieldMap(map, layers);
    }
  }

  // ── Right panel: Pattern + Doors ──
  function openPanel(venue, slot, day, period) {
    const panel = document.getElementById('rhythm-panel');
    const content = document.getElementById('rhythm-panel-content');
    if (!panel || !content) return;

    const comms = (venue.communities || []).map(id => DATA.getCommunityById(id)).filter(Boolean);
    const events = (slot?.events || []).map(id => DATA.getEventById(id)).filter(Boolean);
    const regularity = slot?.regularity || 0;

    const regularityEdge = regularity > 0.8
      ? 'Stable, recurring rhythm — dependable.'
      : regularity > 0.5
        ? 'Fairly regular presence.'
        : 'Occasional or emerging — soft edge.';

    const commsInSlot = comms.filter(c => slot?.communities?.[c.id]);

    content.innerHTML = `
      <div style="padding:20px 18px">

        <div style="margin-bottom:18px">
          <div class="rhythm-panel-section-title">Location</div>
          <div class="rhythm-panel-venue-name">${venue.name}</div>
          <div class="rhythm-panel-slot">${venue.type} · ${venue.address || ''}</div>
        </div>

        <div style="margin-bottom:22px">
          <div class="rhythm-panel-section-title">▲ Pattern</div>
          ${slot && slot.intensity > 0 ? `
            <div class="rhythm-pattern-text">
              <strong style="color:rgba(255,255,255,0.88)">${DAYS[day]} ${PERIODS[period].toLowerCase()}</strong>
              is ${slot.intensity > 0.65 ? 'particularly active' : slot.intensity > 0.35 ? 'moderately active' : 'lightly active'} here.
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
              ${commsInSlot.map(c => `
                <span style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;
                  background:${c.color}22;border:1px solid ${c.color}44;color:${c.color};display:inline-flex;align-items:center;gap:5px">
                  ${c.emoji} ${c.shortName}
                </span>`).join('')}
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.35);font-style:italic">${regularityEdge}</div>
          ` : `
            <div style="font-size:13px;color:rgba(255,255,255,0.3);font-style:italic">
              This venue tends to be quiet ${DAYS[day]} ${PERIODS[period].toLowerCase()}. Try another slot.
            </div>
          `}
        </div>

        <div>
          <div class="rhythm-panel-section-title">⬡ Doors into participation</div>
          ${events.length > 0 ? events.map(e => {
            const host = DATA.getFacilitatorById(e.host);
            const ec = e.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
            return `
              <div class="rhythm-door-event" onclick="App.navigate('event','${e.id}')">
                <div style="display:flex;gap:4px;margin-bottom:5px">
                  ${ec.map(c => `<span style="width:7px;height:7px;border-radius:50%;background:${c.color};display:inline-block"></span>`).join('')}
                </div>
                <div class="rhythm-door-event-title">${e.title}</div>
                <div class="rhythm-door-event-meta">${host ? host.name : ''} · ${DATA.formatDate(e.date)}</div>
                <div style="font-size:12px;color:${e.price === 0 ? '#5abcb9' : 'rgba(255,255,255,0.35)'};margin-top:3px">${DATA.formatPrice(e)}</div>
              </div>`;
          }).join('') : `<div style="font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:12px">No concrete events in this slot — but the rhythm is here.</div>`}

          <div style="margin-top:12px;display:flex;flex-direction:column;gap:6px">
            ${comms.map(c => `
              <button class="rhythm-door-btn" onclick="App.navigate('community','${c.id}')">
                ${c.emoji} ${c.name} →
              </button>`).join('')}
            <button class="rhythm-door-btn" onclick="App.navigate('venue','${venue.id}')">
              📍 View venue page →
            </button>
          </div>
        </div>
      </div>
    `;

    panel.style.display = 'block';
  }

  // ── Interactions ──
  function selectSlot(day, period) {
    selectedDay = day;
    selectedPeriod = period;
    const wrap = document.getElementById('wheel-svg-wrap');
    if (wrap) wrap.innerHTML = buildWheel();
    const label = document.getElementById('wheel-label');
    if (label) label.textContent = `${DAYS[day]} · ${PERIODS[period]}`;
    redraw();
  }

  function setLiveDayOffset(offset) {
    liveDayOffset = offset;
    const ctrl = document.getElementById('rhythm-time-control');
    if (ctrl) ctrl.innerHTML = buildLiveScrubber();
    redraw();
  }

  function setMapMode(mode) {
    currentMode = mode;

    // Update button states
    document.querySelectorAll('.rhythm-mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`rmode-${mode}`)?.classList.add('active');

    // Update title
    const titleEl = document.getElementById('rhythm-mode-title');
    if (titleEl) {
      const m = MODES.find(x => x.id === mode);
      titleEl.textContent = `${m.icon} ${m.label}`;
    }

    // Swap tile layer
    if (map) {
      map.eachLayer(l => { if (l._url) map.removeLayer(l); });
      const tileUrl = mode === 'live'
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      L.tileLayer(tileUrl, { subdomains: 'abcd', maxZoom: 20 }).addTo(map);

      // Reset view for non-wider modes
      if (mode !== 'wider') map.setView([56.162, 10.203], 14);
    }

    // Swap time control
    const ctrl = document.getElementById('rhythm-time-control');
    if (ctrl) ctrl.innerHTML = buildTimeControl();

    redraw();
  }

  function destroy() {
    if (map) { map.remove(); map = null; }
    layers = { fields: [], anchors: [], kernels: [], traces: [] };
    currentMode = 'rhythm';
  }

  return { render, afterRender, selectSlot, setMapMode, setLiveDayOffset, openPanel, destroy };
})();
