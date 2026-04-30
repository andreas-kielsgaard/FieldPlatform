// ─── Communities list view ───

const CommunitiesView = (() => {
  function render() {
    const persona = DATA.getCurrentPersona();
    const followed = persona ? DATA.communities.filter(c => persona.communities.includes(c.id)) : [];
    const discover = DATA.communities.filter(c => !persona || !persona.communities.includes(c.id));

    return `
      <div class="page">
        <div style="margin-bottom:32px">
          <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:6px">Communities in Aarhus</h1>
          <p style="color:var(--text-secondary);font-size:15px">These communities overlap, cross-reference, and share people. They are not isolated groups.</p>
        </div>

        ${followed.length > 0 ? `
        <div style="margin-bottom:36px">
          <div class="section-header"><span class="section-title">Your communities</span></div>
          <div class="card-grid">${followed.map(c => Cards.communityCard(c)).join('')}</div>
        </div>
        ` : ''}

        <div style="margin-bottom:20px">
          <div class="section-header">
            <span class="section-title">${followed.length > 0 ? 'Discover more' : 'All communities'}</span>
          </div>
        </div>

        <!-- Overlap map graphic -->
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:28px">
          <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:16px">Community overlap in Aarhus</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
            ${DATA.communities.map(c => `
              <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:${c.color}18;border:1px solid ${c.color}44;border-radius:var(--radius-full);cursor:pointer" onclick="App.navigate('community','${c.id}')">
                <span>${c.emoji}</span>
                <span style="font-size:13px;font-weight:600;color:${c.color}">${c.shortName}</span>
                <span style="font-size:11px;color:var(--text-muted)">${c.memberCount}</span>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:16px;font-size:12px;color:var(--text-muted)">Click any community to see its overlap with others.</div>
        </div>

        <div class="card-grid">
          ${discover.map(c => Cards.communityCard(c)).join('')}
        </div>
      </div>
    `;
  }
  return { render };
})();
