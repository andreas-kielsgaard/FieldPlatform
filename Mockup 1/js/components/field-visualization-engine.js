// ─── Field Visualization Engine ───
// Transforms seeded data into mode-specific visual render models.
// Distinct renderers per map mode; organic blob shapes via L.polygon.

const FieldVizEngine = (() => {

  // ── Seeded random (LCG) ──
  function seededRandom(seed) {
    const x = Math.sin(seed + 1) * 43758.5453123;
    return x - Math.floor(x);
  }

  // ── Blend community colors by weight ──
  function blendColors(commWeights) {
    const entries = Object.entries(commWeights).filter(([, v]) => v > 0);
    if (entries.length === 0) return '#3a4a3a';
    if (entries.length === 1) {
      const c = DATA.getCommunityById(entries[0][0]);
      return c ? c.color : '#3a4a3a';
    }
    const total = entries.reduce((s, [, v]) => s + v, 0);
    let r = 0, g = 0, b = 0;
    entries.forEach(([id, count]) => {
      const comm = DATA.getCommunityById(id);
      if (!comm) return;
      const hex = comm.color.replace('#', '');
      r += parseInt(hex.slice(0, 2), 16) * count / total;
      g += parseInt(hex.slice(2, 4), 16) * count / total;
      b += parseInt(hex.slice(4, 6), 16) * count / total;
    });
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  }

  // ── Organic blob: polar points with noise → L.polygon lat/lng array ──
  function generateBlobLatLngs(centerLat, centerLng, radiusM, irregularity, seed, numPts = 20) {
    const pts = [];
    const latPerM = 1 / 111320;
    const lngPerM = 1 / (111320 * Math.cos(centerLat * Math.PI / 180));
    for (let i = 0; i < numPts; i++) {
      const angle = (2 * Math.PI * i) / numPts;
      const noise = 1 + (seededRandom(seed + i * 7.37) - 0.5) * irregularity;
      const r = radiusM * Math.max(0.5, noise);
      pts.push([
        centerLat + Math.sin(angle) * r * latPerM,
        centerLng + Math.cos(angle) * r * lngPerM
      ]);
    }
    return pts;
  }

  // Compute weighted centroid of a community's active venues
  function communityCenter(communityId) {
    const venues = DATA.venues.filter(v => v.communities && v.communities.includes(communityId));
    if (venues.length === 0) {
      const c = DATA.getCommunityById(communityId);
      return c ? { lat: c.location.lat, lng: c.location.lng } : null;
    }
    return {
      lat: venues.reduce((s, v) => s + v.location.lat, 0) / venues.length,
      lng: venues.reduce((s, v) => s + v.location.lng, 0) / venues.length
    };
  }

  // ── Field state computation ──
  function buildFieldStates() {
    const fs = {};
    DATA.venues.forEach(v => {
      fs[v.id] = Array.from({ length: 7 }, () => Array.from({ length: 3 }, () => ({
        intensity: 0, communities: {}, events: [], regularity: 0
      })));
    });

    DATA.events.forEach(e => {
      if (!fs[e.venue]) return;
      const dow = (e.date.getDay() + 6) % 7; // 0=Mon
      const h = e.date.getHours();
      const period = h < 12 ? 0 : h < 17 ? 1 : 2;
      const slot = fs[e.venue][dow][period];
      const weight = e.recurring ? 0.5 : 0.28;
      slot.intensity = Math.min(1, slot.intensity + weight);
      slot.events.push(e.id);
      e.communities.forEach(cId => {
        slot.communities[cId] = (slot.communities[cId] || 0) + (e.recurring ? 2 : 1);
      });
      slot.regularity = Math.max(slot.regularity, e.recurring ? 0.9 : 0.4);
    });

    // Ambient venue community presence (faint background even with no events)
    DATA.venues.forEach(v => {
      if (!v.communities) return;
      v.communities.forEach(cId => {
        for (let d = 0; d < 7; d++) for (let p = 0; p < 3; p++) {
          if (!fs[v.id][d][p].communities[cId]) {
            fs[v.id][d][p].communities[cId] = 0; // zero but registered
          }
        }
      });
    });

    return fs;
  }

  const fieldStates = buildFieldStates();

  // ── Layer group clearing ──
  function clearLayers(groups) {
    Object.values(groups).flat().forEach(l => { try { l.remove(); } catch (_) {} });
    Object.keys(groups).forEach(k => { groups[k] = []; });
  }

  // ── Venue anchor icon ──
  function venueAnchorIcon(v, day, period, mode) {
    const slot = fieldStates[v.id]?.[day]?.[period];
    const intensity = slot?.intensity || 0;
    const regularity = slot?.regularity || 0;
    const hasEvents = (slot?.events || []).length > 0;

    const dominantCId = slot ? Object.keys(slot.communities || {})
      .sort((a, b) => (slot.communities[b] || 0) - (slot.communities[a] || 0))[0] : null;
    const color = dominantCId ? (DATA.getCommunityById(dominantCId)?.color || '#3a4a3a') : '#3a4a3a';

    const anchorSize = hasEvents ? 10 + Math.round(intensity * 8) : (mode === 'live' ? 5 : 5);
    const glowSize = anchorSize * 2.8;
    const isDiamond = regularity > 0.65;
    const pulse = isDiamond && hasEvents;

    return L.divIcon({
      className: '',
      html: `<div style="position:relative;width:${glowSize}px;height:${glowSize}px;display:flex;align-items:center;justify-content:center">
        ${hasEvents ? `<div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:${0.1 + intensity * 0.2};${pulse ? 'animation:pulse 2.5s ease-in-out infinite' : ''}"></div>` : ''}
        <div style="
          width:${anchorSize}px;height:${anchorSize}px;
          background:${hasEvents ? color : 'rgba(255,255,255,0.06)'};
          border:${hasEvents ? '1.5px solid rgba(255,255,255,0.55)' : '1px solid rgba(255,255,255,0.12)'};
          border-radius:${isDiamond ? '2px' : '50%'};
          transform:${isDiamond ? 'rotate(45deg)' : 'none'};
          opacity:${hasEvents ? 0.9 : 0.3};
          cursor:pointer;
          box-shadow:${hasEvents ? `0 0 6px ${color}55` : 'none'}
        "></div>
      </div>`,
      iconSize: [glowSize, glowSize],
      iconAnchor: [glowSize / 2, glowSize / 2]
    });
  }

  // ── Shared: venue anchors ──
  function renderVenueAnchors(map, day, period, groups, mode, clickHandler) {
    DATA.venues.forEach(v => {
      const slot = fieldStates[v.id]?.[day]?.[period];
      const intensity = slot?.intensity || 0;
      if (mode === 'adjacent' && intensity < 0.05) return;

      const icon = venueAnchorIcon(v, day, period, mode);
      const marker = L.marker([v.location.lat, v.location.lng], { icon })
        .addTo(map)
        .on('click', () => clickHandler ? clickHandler(v, slot, day, period) : App.navigate('venue', v.id));
      groups.anchors.push(marker);
    });
  }

  // ── Shared: event kernels for a day/period ──
  function renderEventKernels(map, day, period, groups, filterFn) {
    DATA.venues.forEach(v => {
      const slot = fieldStates[v.id]?.[day]?.[period];
      if (!slot || slot.events.length === 0) return;
      slot.events.forEach((eId, idx) => {
        const event = DATA.getEventById(eId);
        if (!event || (filterFn && !filterFn(event))) return;
        const comm = DATA.getCommunityById(event.communities[0]);
        const color = comm ? comm.color : '#4a7c59';
        const offsetAngle = (idx / Math.max(slot.events.length, 1)) * Math.PI * 2;
        const offsetDist = idx > 0 ? 0.0005 : 0;
        const lat = v.location.lat + Math.sin(offsetAngle) * offsetDist;
        const lng = v.location.lng + Math.cos(offsetAngle) * offsetDist;

        const isRestricted = event.beginnerFriendly === false;
        const kernel = L.circleMarker([lat, lng], {
          radius: 8 + (event.attending || []).length * 0.25,
          color: isRestricted ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.7)',
          fillColor: color,
          fillOpacity: isRestricted ? 0.72 : 0.88,
          weight: 1.5,
          dashArray: isRestricted ? '4 3' : null
        }).addTo(map).on('click', () => App.navigate('event', event.id));
        groups.kernels.push(kernel);
      });
    });
  }

  // ── Shared: adjacency traces between active communities ──
  function renderAdjacencyTraces(map, day, period, groups) {
    const drawn = new Set();
    DATA.communities.forEach(c => {
      const cVenues = DATA.venues.filter(v => v.communities && v.communities.includes(c.id));
      const cActive = cVenues.some(v => (fieldStates[v.id]?.[day]?.[period]?.intensity || 0) > 0.12);
      if (!cActive) return;
      const cCtr = communityCenter(c.id);
      if (!cCtr) return;

      c.overlaps.forEach(ov => {
        if (ov.strength < 0.45) return;
        const key = [c.id, ov.communityId].sort().join(':');
        if (drawn.has(key)) return;
        drawn.add(key);

        const other = DATA.getCommunityById(ov.communityId);
        if (!other) return;
        const oCtr = communityCenter(other.id);
        if (!oCtr) return;
        const oActive = DATA.venues.filter(v => v.communities && v.communities.includes(other.id))
          .some(v => (fieldStates[v.id]?.[day]?.[period]?.intensity || 0) > 0.12);
        if (!oActive) return;

        const trace = L.polyline(
          [[cCtr.lat, cCtr.lng], [oCtr.lat, oCtr.lng]],
          { color: c.color, weight: 1, opacity: 0.12 + ov.strength * 0.18, dashArray: '4 8', interactive: false }
        ).addTo(map);
        groups.traces.push(trace);
      });
    });
  }

  // ────────────────────────────────────────────────
  // MODE A — Rhythm of the Field
  // Ambient blobs → venue anchors → recurring kernels → faint traces
  // ────────────────────────────────────────────────
  function renderRhythmMap(map, day, period, groups, clickHandler) {
    // 1. Community ambient blobs (organic, soft)
    DATA.communities.forEach((c, idx) => {
      const ctr = communityCenter(c.id);
      if (!ctr) return;
      const relevantVenues = DATA.venues.filter(v => v.communities && v.communities.includes(c.id));
      const activitySum = relevantVenues.reduce((s, v) =>
        s + (fieldStates[v.id]?.[day]?.[period]?.intensity || 0), 0);
      const normActivity = Math.min(1, activitySum / Math.max(relevantVenues.length, 1));

      const baseRadius = 320 + c.memberCount * 2.2;
      const radius = baseRadius * (0.55 + normActivity * 0.65);
      const opacity = 0.035 + normActivity * 0.13;
      const irregularity = 0.48 - normActivity * 0.18;

      // Outer glow
      const outerPts = generateBlobLatLngs(ctr.lat, ctr.lng, radius * 1.55, irregularity + 0.12, idx * 113 + 1);
      groups.fields.push(L.polygon(outerPts, {
        color: 'transparent', fillColor: c.color, fillOpacity: opacity * 0.35, weight: 0, interactive: false
      }).addTo(map));

      // Inner blob
      const innerPts = generateBlobLatLngs(ctr.lat, ctr.lng, radius, irregularity, idx * 113 + 2);
      groups.fields.push(L.polygon(innerPts, {
        color: c.color, fillColor: c.color,
        fillOpacity: opacity, weight: 0.5, opacity: opacity * 0.7, interactive: false
      }).addTo(map));
    });

    // 2. Venue anchors
    renderVenueAnchors(map, day, period, groups, 'rhythm', clickHandler);

    // 3. Event kernels (recurring first)
    renderEventKernels(map, day, period, groups, null);

    // 4. Adjacency traces (faint, only between mutually-active communities)
    renderAdjacencyTraces(map, day, period, groups);
  }

  // ────────────────────────────────────────────────
  // MODE B — Open / Live
  // Event kernels are dominant; community fields very faint
  // ────────────────────────────────────────────────
  function renderLiveMap(map, dayOffset, groups, clickHandler) {
    const targetDate = new Date(2026, 3, 23);
    targetDate.setDate(targetDate.getDate() + dayOffset);
    const targetDow = (targetDate.getDay() + 6) % 7;

    // Very faint community presence
    DATA.communities.forEach((c, idx) => {
      const ctr = communityCenter(c.id);
      if (!ctr) return;
      const pts = generateBlobLatLngs(ctr.lat, ctr.lng, 220, 0.3, idx * 71);
      groups.fields.push(L.polygon(pts, {
        color: 'transparent', fillColor: c.color, fillOpacity: 0.04, weight: 0, interactive: false
      }).addTo(map));
    });

    // Venue anchors for all three periods of the target day
    [0, 1, 2].forEach(p => renderVenueAnchors(map, targetDow, p, groups, 'live', clickHandler));

    // Prominent event kernels for the target day
    const dayEvents = DATA.events.filter(e => (e.date.getDay() + 6) % 7 === targetDow);
    dayEvents.forEach(e => {
      const venue = DATA.getVenueById(e.venue);
      if (!venue) return;
      const comm = DATA.getCommunityById(e.communities[0]);
      const color = comm ? comm.color : '#4a7c59';
      const h = e.date.getHours();
      const period = h < 12 ? 0 : h < 17 ? 1 : 2;
      const isEvening = period === 2;

      const isRestricted = e.beginnerFriendly === false;
      const kernel = L.circleMarker([venue.location.lat, venue.location.lng], {
        radius: 10 + (e.attending || []).length * 0.35,
        color: isRestricted ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)',
        fillColor: color,
        fillOpacity: isRestricted ? 0.75 : 0.92,
        weight: 2,
        dashArray: isRestricted ? '5 3' : null
      }).addTo(map).on('click', () => App.navigate('event', e.id));
      groups.kernels.push(kernel);
    });
  }

  // ────────────────────────────────────────────────
  // MODE C — Familiar Territory
  // Followed communities clear → dim everything else
  // ────────────────────────────────────────────────
  function renderFamiliarMap(map, persona, day, period, groups, clickHandler) {
    const myIds = persona ? persona.communities : [];
    const mySaved = new Set(persona ? (persona.savedEvents || []) : []);
    const myAttending = new Set(persona ? (persona.attendingEvents || []) : []);

    DATA.communities.forEach((c, idx) => {
      const isMine = myIds.includes(c.id);
      const ctr = communityCenter(c.id);
      if (!ctr) return;

      const radius = isMine ? 480 : 180;
      const opacity = isMine ? 0.20 : 0.03;
      const irregularity = isMine ? 0.22 : 0.42;

      const pts = generateBlobLatLngs(ctr.lat, ctr.lng, radius, irregularity, idx * 89 + 3);
      groups.fields.push(L.polygon(pts, {
        color: isMine ? c.color : 'transparent',
        fillColor: c.color, fillOpacity: opacity,
        weight: isMine ? 1 : 0, opacity: isMine ? 0.5 : 0, interactive: false
      }).addTo(map));
    });

    // Venues — highlight familiar
    DATA.venues.forEach(v => {
      const isFamiliar = v.communities && v.communities.some(cId => myIds.includes(cId));
      const slot = fieldStates[v.id]?.[day]?.[period];
      const intensity = slot?.intensity || 0;
      const hasEvents = (slot?.events || []).length > 0;
      const dominantMyCId = myIds.find(cId => v.communities && v.communities.includes(cId));
      const color = dominantMyCId ? (DATA.getCommunityById(dominantMyCId)?.color || '#3a4a3a') : '#3a4a3a';

      const anchorSize = isFamiliar ? (hasEvents ? 14 : 9) : 4;
      const glowSize = anchorSize * 2.8;

      const icon = L.divIcon({
        className: '',
        html: `<div style="position:relative;width:${glowSize}px;height:${glowSize}px;display:flex;align-items:center;justify-content:center">
          ${isFamiliar && hasEvents ? `<div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.22;animation:pulse 2.5s ease-in-out infinite"></div>` : ''}
          <div style="width:${anchorSize}px;height:${anchorSize}px;
            background:${isFamiliar ? color : 'rgba(255,255,255,0.04)'};
            border:${isFamiliar ? '2px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.08)'};
            border-radius:${isFamiliar ? '3px' : '50%'};
            transform:${isFamiliar ? 'rotate(45deg)' : 'none'};
            opacity:${isFamiliar ? 0.9 : 0.2};cursor:pointer"></div>
        </div>`,
        iconSize: [glowSize, glowSize], iconAnchor: [glowSize / 2, glowSize / 2]
      });
      groups.anchors.push(L.marker([v.location.lat, v.location.lng], { icon })
        .addTo(map).on('click', () => clickHandler ? clickHandler(v, slot, day, period) : App.navigate('venue', v.id)));
    });

    // Saved / attending events — prominent kernels
    DATA.events.filter(e => mySaved.has(e.id) || myAttending.has(e.id)).forEach(e => {
      const venue = DATA.getVenueById(e.venue);
      if (!venue) return;
      const comm = DATA.getCommunityById(e.communities[0]);
      const color = comm ? comm.color : '#4a7c59';
      groups.kernels.push(L.circleMarker([venue.location.lat, venue.location.lng], {
        radius: 11, color: myAttending.has(e.id) ? 'white' : 'rgba(255,255,255,0.55)',
        fillColor: color, fillOpacity: 0.9,
        weight: myAttending.has(e.id) ? 2.5 : 1.5
      }).addTo(map).on('click', () => App.navigate('event', e.id)));
    });
  }

  // ────────────────────────────────────────────────
  // MODE D — Adjacent Worlds
  // Source community → overlap traces → adjacent events highlighted
  // ────────────────────────────────────────────────
  function renderAdjacentMap(map, persona, groups) {
    const myIds = persona ? persona.communities : [];

    if (myIds.length === 0) {
      // No persona context — show all communities faintly
      DATA.communities.forEach((c, idx) => {
        const ctr = communityCenter(c.id);
        if (!ctr) return;
        const pts = generateBlobLatLngs(ctr.lat, ctr.lng, 280, 0.38, idx * 41);
        groups.fields.push(L.polygon(pts, {
          color: c.color, fillColor: c.color, fillOpacity: 0.08, weight: 0.5, opacity: 0.3, interactive: false
        }).addTo(map));
      });
      return;
    }

    // Source communities — clear
    myIds.forEach((cId, idx) => {
      const c = DATA.getCommunityById(cId);
      if (!c) return;
      const ctr = communityCenter(cId);
      if (!ctr) return;
      const radius = 420 + c.memberCount * 2;
      const pts = generateBlobLatLngs(ctr.lat, ctr.lng, radius, 0.22, idx * 33 + 5);
      groups.fields.push(L.polygon(pts, {
        color: c.color, fillColor: c.color, fillOpacity: 0.20, weight: 1.5, opacity: 0.55, interactive: false
      }).addTo(map));
    });

    // Adjacent communities — lighter
    const adjIds = new Set();
    myIds.forEach(cId => {
      const c = DATA.getCommunityById(cId);
      if (!c) return;
      c.overlaps.forEach(ov => { if (!myIds.includes(ov.communityId)) adjIds.add(ov.communityId); });
    });

    [...adjIds].forEach((cId, idx) => {
      const c = DATA.getCommunityById(cId);
      if (!c) return;
      const ctr = communityCenter(cId);
      if (!ctr) return;
      const pts = generateBlobLatLngs(ctr.lat, ctr.lng, 260, 0.42, idx * 59 + 8);
      groups.fields.push(L.polygon(pts, {
        color: c.color, fillColor: c.color, fillOpacity: 0.09, weight: 0.5, opacity: 0.25, interactive: false
      }).addTo(map));
    });

    // Traces from source to adjacent (thickness = strength)
    myIds.forEach(cId => {
      const c = DATA.getCommunityById(cId);
      if (!c) return;
      const srcCtr = communityCenter(cId);
      if (!srcCtr) return;
      c.overlaps.filter(ov => !myIds.includes(ov.communityId) && ov.strength >= 0.38).forEach(ov => {
        const dstCtr = communityCenter(ov.communityId);
        if (!dstCtr) return;
        groups.traces.push(L.polyline(
          [[srcCtr.lat, srcCtr.lng], [dstCtr.lat, dstCtr.lng]],
          { color: c.color, weight: 1 + ov.strength * 3.5, opacity: 0.2 + ov.strength * 0.45, dashArray: ov.strength > 0.6 ? null : '6 10' }
        ).addTo(map));
      });
    });

    // Events bridging source ↔ adjacent — highlight bridge events
    const adjArr = [...adjIds];
    DATA.events.forEach(e => {
      const touchesMine = e.communities.some(cId => myIds.includes(cId));
      const touchesAdj = e.communities.some(cId => adjArr.includes(cId));
      if (!touchesMine && !touchesAdj) return;
      const venue = DATA.getVenueById(e.venue);
      if (!venue) return;
      const comm = DATA.getCommunityById(e.communities[0]);
      const color = comm ? comm.color : '#4a7c59';
      const isBridge = touchesMine && touchesAdj;
      groups.kernels.push(L.circleMarker([venue.location.lat, venue.location.lng], {
        radius: isBridge ? 11 : 7,
        color: 'rgba(255,255,255,0.75)', fillColor: color,
        fillOpacity: isBridge ? 0.92 : 0.62, weight: isBridge ? 2 : 1
      }).addTo(map).on('click', () => App.navigate('event', e.id)));
    });

    // Faint venue anchors for orientation
    renderVenueAnchors(map, 3, 2, groups, 'adjacent', null);
  }

  // ────────────────────────────────────────────────
  // MODE E — Wider Field
  // City nodes + exchange connections
  // ────────────────────────────────────────────────
  const CITIES = [
    { id: 'aarhus',    name: 'Aarhus',            lat: 56.162, lng: 10.203, size: 1.0, color: '#4a90d9',  activity: 0.90, practices: 'CI · Circling · Dance' },
    { id: 'cph',       name: 'Copenhagen',         lat: 55.676, lng: 12.568, size: 1.2, color: '#e8742a',  activity: 1.0,  practices: 'CI · AR · Breathwork' },
    { id: 'malmo',     name: 'Malmö',              lat: 55.605, lng: 13.003, size: 0.65,color: '#5abcb9',  activity: 0.50, practices: 'Somatic · Dance' },
    { id: 'berlin',    name: 'Berlin',             lat: 52.520, lng: 13.405, size: 1.2, color: '#7b5ea7',  activity: 1.0,  practices: 'CI · Tantra · ED · AR' },
    { id: 'amsterdam', name: 'Amsterdam',          lat: 52.370, lng:  4.900, size: 0.8, color: '#3aaa7a',  activity: 0.70, practices: 'AR · Ecstatic Dance' },
    { id: 'portugal',  name: 'Portugal / Alentejo',lat: 38.700, lng: -7.800, size: 0.9, color: '#f0a500',  activity: 0.80, practices: 'Festivals · Retreats' },
    { id: 'edinburgh', name: 'Edinburgh',          lat: 55.953, lng: -3.189, size: 0.55,color: '#d94a7a',  activity: 0.45, practices: 'CI · Somatic' },
    { id: 'stockholm', name: 'Stockholm',          lat: 59.334, lng: 18.063, size: 0.7, color: '#4a7c59',  activity: 0.60, practices: 'AR · Breathwork' },
  ];
  const CONNECTIONS = [
    { a: 'aarhus',    b: 'cph',       strength: 0.85, color: '#4a90d9' },
    { a: 'cph',       b: 'malmo',     strength: 0.70, color: '#e8742a' },
    { a: 'cph',       b: 'berlin',    strength: 0.75, color: '#e8742a' },
    { a: 'aarhus',    b: 'berlin',    strength: 0.50, color: '#4a90d9' },
    { a: 'berlin',    b: 'amsterdam', strength: 0.55, color: '#7b5ea7' },
    { a: 'aarhus',    b: 'portugal',  strength: 0.40, color: '#f0a500' },
    { a: 'cph',       b: 'edinburgh', strength: 0.35, color: '#d94a7a' },
    { a: 'aarhus',    b: 'stockholm', strength: 0.42, color: '#4a7c59' },
    { a: 'stockholm', b: 'berlin',    strength: 0.44, color: '#4a7c59' },
  ];

  function renderWiderFieldMap(map, groups) {
    // Connection arcs first
    CONNECTIONS.forEach(conn => {
      const from = CITIES.find(c => c.id === conn.a);
      const to = CITIES.find(c => c.id === conn.b);
      if (!from || !to) return;
      groups.traces.push(L.polyline(
        [[from.lat, from.lng], [to.lat, to.lng]],
        { color: conn.color, weight: 1 + conn.strength * 2.5, opacity: 0.14 + conn.strength * 0.3, dashArray: conn.strength > 0.6 ? null : '6 10' }
      ).addTo(map));
    });

    // City nodes
    CITIES.forEach(city => {
      const r = Math.round(10 * city.size);
      const glowR = r * 2.6;
      const isHome = city.id === 'aarhus';

      const nodeIcon = L.divIcon({
        className: '',
        html: `<div style="position:relative;width:${glowR * 2}px;height:${glowR * 2}px;display:flex;align-items:center;justify-content:center">
          <div style="position:absolute;inset:0;border-radius:50%;background:${city.color};opacity:${0.1 + city.activity * 0.14}"></div>
          <div style="width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:${city.color};
            border:${isHome ? '2.5px solid white' : '1.5px solid rgba(255,255,255,0.45)'};opacity:0.92;cursor:pointer;
            display:flex;align-items:center;justify-content:center;
            font-size:${r * 0.6}px;font-weight:700;color:white;text-shadow:0 1px 3px rgba(0,0,0,0.6)">
            ${isHome ? '◉' : ''}
          </div>
        </div>`,
        iconSize: [glowR * 2, glowR * 2], iconAnchor: [glowR, glowR]
      });

      const labelIcon = L.divIcon({
        className: '',
        html: `<div style="white-space:nowrap;font-size:${isHome ? 12 : 11}px;font-weight:${isHome ? 700 : 500};
          color:rgba(255,255,255,${isHome ? 0.9 : 0.5});text-shadow:0 1px 3px rgba(0,0,0,0.9);pointer-events:none">
          ${city.name}</div>
          <div style="font-size:9px;color:rgba(255,255,255,0.3);pointer-events:none">${city.practices}</div>`,
        iconSize: [150, 32], iconAnchor: [-r - 4, -4]
      });

      groups.anchors.push(
        L.marker([city.lat, city.lng], { icon: nodeIcon }).addTo(map),
        L.marker([city.lat, city.lng], { icon: labelIcon, interactive: false }).addTo(map)
      );
    });
  }

  // ── Day/period summary accessors (used by home + wheel) ──
  function getDayIntensity(day) {
    return DATA.venues.reduce((sum, v) => {
      const slots = fieldStates[v.id]?.[day] || [];
      return sum + slots.reduce((s, slot) => s + (slot.intensity || 0), 0);
    }, 0);
  }

  function getDayColor(day) {
    const allComms = {};
    DATA.venues.forEach(v => {
      (fieldStates[v.id]?.[day] || []).forEach(slot => {
        Object.entries(slot.communities || {}).forEach(([cId, cnt]) => {
          allComms[cId] = (allComms[cId] || 0) + cnt;
        });
      });
    });
    return blendColors(allComms);
  }

  function getSlotData(venueId, day, period) {
    return fieldStates[venueId]?.[day]?.[period] || null;
  }

  return {
    blendColors, getDayIntensity, getDayColor, getSlotData,
    renderRhythmMap, renderLiveMap, renderFamiliarMap, renderAdjacentMap, renderWiderFieldMap,
    clearLayers, CITIES
  };
})();
