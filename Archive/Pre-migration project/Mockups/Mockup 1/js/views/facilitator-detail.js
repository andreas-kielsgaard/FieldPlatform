// ─── Facilitator profile page ───

const FacilitatorDetailView = (() => {
  function render(facilitatorId) {
    const f = DATA.getFacilitatorById(facilitatorId);
    if (!f) return '<div class="page">Facilitator not found.</div>';

    const persona = DATA.getCurrentPersona();
    const isFollowing = persona && persona.followedFacilitators.includes(facilitatorId);
    const communities = f.communities.map(id => DATA.getCommunityById(id)).filter(Boolean);
    const upcomingEvents = f.upcomingEvents.map(id => DATA.getEventById(id)).filter(Boolean);
    const coHosts = (f.coHosts || []).map(id => DATA.getFacilitatorById(id)).filter(Boolean);

    return `
      <div class="facilitator-page">
        <div class="breadcrumb">
          <a onclick="App.navigate('facilitators')">Facilitators</a>
          <span class="breadcrumb-sep">›</span>
          <span>${f.name}</span>
        </div>

        <div class="facilitator-header">
          <div class="facilitator-avatar" style="background:${f.color}">${f.initials}</div>
          <div style="flex:1">
            <div class="facilitator-title">${f.name}</div>
            <div class="facilitator-tagline">${f.practices.join(' · ')}</div>
            <div class="relevance-chips">
              ${communities.map(c => `<span class="chip" style="border-color:${c.color};color:${c.color}">${c.emoji} ${c.shortName}</span>`).join('')}
            </div>
          </div>
          <div>
            <button class="btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}" onclick="App.toggleFollowFacilitator('${facilitatorId}',this)">
              ${isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          </div>
        </div>

        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:28px">
          <div style="font-size:15px;color:var(--text-secondary);line-height:1.7;margin-bottom:12px">${f.bio}</div>
          <div style="font-size:14px;font-style:italic;color:var(--text-primary);border-left:3px solid ${f.color};padding-left:12px">"${f.values}"</div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px">
          <div>
            <div class="section-block-title">Background & lineages</div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:6px">
              ${f.lineages.map(l => `<li style="font-size:14px;color:var(--text-secondary)">→ ${l}</li>`).join('')}
            </ul>
          </div>
          <div>
            <div class="section-block-title">Who they work with</div>
            <p style="font-size:14px;color:var(--text-secondary)">${f.intendedFor}</p>
          </div>
        </div>

        ${f.accessibilityNotes ? `
        <div style="margin-bottom:28px">
          <div class="section-block-title">Accessibility</div>
          <p style="font-size:14px;color:var(--text-secondary)">${f.accessibilityNotes}</p>
        </div>
        ` : ''}

        ${coHosts.length > 0 ? `
        <div style="margin-bottom:28px">
          <div class="section-block-title">Often co-hosts with</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            ${coHosts.map(co => `
              <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--border);border-radius:var(--radius);cursor:pointer" onclick="App.navigate('facilitator','${co.id}')">
                <div style="width:28px;height:28px;border-radius:50%;background:${co.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white">${co.initials}</div>
                <span style="font-size:13px;font-weight:600">${co.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <div style="margin-bottom:28px">
          <div class="section-header"><span class="section-title">Upcoming offerings</span></div>
          ${upcomingEvents.length > 0
            ? `<div class="card-grid">${upcomingEvents.map(e => Cards.eventCard(e)).join('')}</div>`
            : '<div style="color:var(--text-muted);font-size:14px">No upcoming events currently.</div>'
          }
        </div>

        <div>
          <div class="section-header"><span class="section-title">Communities</span></div>
          <div class="card-grid">
            ${communities.map(c => Cards.communityCard(c)).join('')}
          </div>
        </div>
      </div>
    `;
  }
  return { render };
})();
