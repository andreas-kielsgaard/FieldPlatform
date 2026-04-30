// ─── Community Steward Dashboard ───

const StewardDashboardView = (() => {
  function render() {
    const persona = DATA.getCurrentPersona();
    const communityId = persona && persona.stewardFor ? persona.stewardFor : 'cr';
    const community = DATA.getCommunityById(communityId);
    if (!community) return '<div class="page">No community found.</div>';

    const analytics = DATA.communityAnalytics[communityId] || {};
    const events = DATA.getEventsForCommunity(communityId).slice(0, 4);
    const suggestedCount = (DATA.suggestedEventsQueue[communityId] || []).length;

    return `
      <div class="page">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px">
          <div style="width:48px;height:48px;border-radius:50%;background:${community.color};display:flex;align-items:center;justify-content:center;font-size:22px">${community.emoji}</div>
          <div>
            <div style="font-size:22px;font-weight:800">${community.name}</div>
            <div style="font-size:13px;color:var(--text-secondary)">Community Steward view</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:8px">
            <button class="btn btn-secondary btn-sm" onclick="App.navigate('community','${communityId}')">View public page →</button>
            <button class="btn btn-primary btn-sm" onclick="App.navigate('suggested-events')">Suggested queue ${suggestedCount > 0 ? `<span style="background:var(--accent-2);color:white;border-radius:var(--radius-full);padding:1px 7px;font-size:11px;margin-left:4px">${suggestedCount}</span>` : ''}</button>
          </div>
        </div>

        <!-- Stats -->
        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-value">${community.memberCount}</div>
            <div class="stat-label">Members</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${events.length}</div>
            <div class="stat-label">Upcoming events</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color:var(--accent)">${analytics.newVsReturning ? analytics.newVsReturning.returning : 70}%</div>
            <div class="stat-label">Returning participants</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${suggestedCount}</div>
            <div class="stat-label">Suggested events</div>
          </div>
        </div>

        <!-- Participation trend -->
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:24px">
          <div class="section-block-title">Participation trend (last 7 events)</div>
          <div style="display:flex;gap:6px;align-items:flex-end;height:60px;margin-top:12px">
            ${(analytics.participationTrend || [12,14,11,16,15,18,20]).map(v => {
              const h = Math.round((v / 25) * 100);
              return `<div style="flex:1;background:${community.color};opacity:0.7;border-radius:3px 3px 0 0;height:${h}%;position:relative" title="${v} people">
                <div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--text-muted)">${v}</div>
              </div>`;
            }).join('')}
          </div>
          <div style="display:flex;gap:6px;margin-top:6px">
            ${['4w ago','3w ago','2w ago','10d ago','6d ago','3d ago','Next'].map(l => `<div style="flex:1;font-size:10px;text-align:center;color:var(--text-muted)">${l}</div>`).join('')}
          </div>
        </div>

        <!-- Opportunities -->
        <div style="margin-bottom:28px">
          <div class="section-header">
            <span class="section-title">Opportunities</span>
            <span style="font-size:12px;color:var(--text-muted)">What the community can do next</span>
          </div>
          <div class="dashboard-grid">
            ${(analytics.opportunities || []).map(op => `
              <div class="opportunity-card ${op.variant || ''}">
                <div class="opportunity-label">${op.type}</div>
                <div class="opportunity-text">${op.text}</div>
                <div class="opportunity-sub">${op.detail}</div>
                ${op.type === 'suggestion' ? `<button class="btn btn-outline btn-sm" style="margin-top:10px" onclick="App.navigate('suggested-events')">Review queue →</button>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Crossover -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:18px">
            <div class="section-block-title">Strongest adjacent communities</div>
            ${(analytics.crossoverStrength || []).map(cs => {
              const other = DATA.getCommunityById(cs.communityId);
              if (!other) return '';
              return `
                <div class="overlap-community" onclick="App.navigate('community','${other.id}')">
                  <span>${other.emoji}</span>
                  <div style="flex:1">
                    <div style="font-size:13px;font-weight:600">${other.shortName}</div>
                    <div style="height:4px;background:linear-gradient(to right,${other.color} ${cs.percent}%,var(--border) ${cs.percent}%);border-radius:2px;margin-top:4px"></div>
                  </div>
                  <span style="font-size:12px;color:var(--text-muted)">${cs.percent}%</span>
                </div>
              `;
            }).join('')}
          </div>

          <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:18px">
            <div class="section-block-title">New vs returning</div>
            <div style="display:flex;gap:12px;margin-top:12px">
              <div style="text-align:center;flex:1">
                <div style="font-size:32px;font-weight:800;color:var(--accent)">${analytics.newVsReturning ? analytics.newVsReturning.returning : 70}%</div>
                <div style="font-size:12px;color:var(--text-muted)">Returning</div>
              </div>
              <div style="text-align:center;flex:1">
                <div style="font-size:32px;font-weight:800;color:var(--accent-2)">${analytics.newVsReturning ? analytics.newVsReturning.new : 30}%</div>
                <div style="font-size:12px;color:var(--text-muted)">New</div>
              </div>
            </div>
            <div style="margin-top:12px;font-size:12px;color:var(--text-secondary)">
              ${analytics.underservedSlots ? `Underserved: ${analytics.underservedSlots.join(', ')}` : ''}
            </div>
          </div>
        </div>

        <!-- Upcoming events -->
        <div>
          <div class="section-header">
            <span class="section-title">Upcoming events</span>
            <a class="section-link" onclick="App.navigate('community','${communityId}')">Full community page →</a>
          </div>
          <div class="card-grid">
            ${events.map(e => Cards.eventCard(e)).join('')}
          </div>
        </div>
      </div>
    `;
  }
  return { render };
})();
