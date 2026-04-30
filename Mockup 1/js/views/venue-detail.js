// ─── Venue detail page ───

const VenueDetailView = (() => {
  function render(venueId) {
    const venue = DATA.getVenueById(venueId);
    if (!venue) return '<div class="page">Venue not found.</div>';

    const communities = venue.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const events = DATA.events.filter(e => e.venue === venueId)
      .sort((a,b) => a.date - b.date).slice(0, 8);

    return `
      <div class="page" style="max-width:800px">
        <div class="breadcrumb">
          <a onclick="App.navigate('explore')">Explore</a>
          <span class="breadcrumb-sep">›</span>
          <span>${venue.name}</span>
        </div>

        <div style="height:180px;background:linear-gradient(135deg,#1e2e1e,#2a3d2a);border-radius:var(--radius);margin-bottom:24px;display:flex;align-items:flex-end;padding:20px;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 50%,rgba(74,124,89,0.4) 0%,transparent 60%)"></div>
          <div style="position:relative;color:white">
            <div style="font-size:11px;opacity:0.6;font-weight:600;text-transform:uppercase;margin-bottom:4px">${venue.type}</div>
            <div style="font-size:24px;font-weight:800">${venue.name}</div>
            <div style="font-size:13px;opacity:0.75;margin-top:4px">📍 ${venue.address}</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 280px;gap:24px;margin-bottom:32px">
          <div>
            <div class="section-block-title">Atmosphere</div>
            <p style="font-size:15px;color:var(--text-secondary);line-height:1.6">${venue.atmosphere}</p>

            <div class="section-block-title" style="margin-top:20px">Type of events it suits</div>
            <p style="font-size:14px;color:var(--text-secondary)">${venue.type}. Used by ${communities.map(c=>c.name).join(', ')}.</p>

            <div class="section-block-title" style="margin-top:20px">Accessibility</div>
            <p style="font-size:14px;color:var(--text-secondary)">${venue.accessibility}</p>
          </div>
          <div>
            <div class="section-block-title">Communities here</div>
            ${communities.map(c => `
              <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="App.navigate('community','${c.id}')">
                <span>${c.emoji}</span>
                <span style="font-size:14px;font-weight:600;color:${c.color}">${c.shortName}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section-header"><span class="section-title">Upcoming events here</span></div>
        ${events.length > 0
          ? events.map(e => Cards.eventListRow(e)).join('')
          : '<div style="color:var(--text-muted);font-size:14px">No upcoming events at this venue.</div>'}
      </div>
    `;
  }
  return { render };
})();
