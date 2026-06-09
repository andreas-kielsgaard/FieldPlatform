// ─── Community detail page ───

const CommunityDetailView = (() => {
  function render(communityId) {
    const community = DATA.getCommunityById(communityId);
    if (!community) return '<div class="page">Community not found.</div>';

    const persona = DATA.getCurrentPersona();
    const isFollowing = persona && persona.communities.includes(communityId);
    const events = DATA.getEventsForCommunity(communityId)
      .sort((a,b) => a.date - b.date).slice(0, 6);
    const facilitators = community.facilitators.map(id => DATA.getFacilitatorById(id)).filter(Boolean);
    const venues = community.venues.map(id => DATA.getVenueById(id)).filter(Boolean);

    return `
      <div class="community-header">
        <div class="breadcrumb">
          <a onclick="App.navigate('communities')">Communities</a>
          <span class="breadcrumb-sep">›</span>
          <span>${community.name}</span>
        </div>
        <div style="display:flex;align-items:flex-start;gap:16px">
          <div style="width:56px;height:56px;border-radius:50%;background:${community.color};display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">${community.emoji}</div>
          <div style="flex:1">
            <div class="community-title">${community.name}</div>
            <div class="community-tagline">${community.tagline}</div>
            <div class="community-tags">
              ${community.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
              <span class="chip">${community.memberCount} members</span>
              ${community.tags.slice(0,3).map(t => `<span class="chip">${t}</span>`).join('')}
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0">
            ${isFollowing
              ? `<button class="btn btn-secondary" onclick="App.unfollowCommunity('${communityId}')">✓ Following</button>`
              : `<button class="btn btn-primary" onclick="App.followCommunity('${communityId}')">+ Follow</button>`
            }
          </div>
        </div>
      </div>

      <div class="community-body">
        <div class="community-main">
          <div class="tabs">
            <button class="tab-btn active" onclick="App.switchTab(this,'tab-about')">About</button>
            <button class="tab-btn" onclick="App.switchTab(this,'tab-upcoming')">Upcoming (${events.length})</button>
            <button class="tab-btn" onclick="App.switchTab(this,'tab-people')">People & Facilitators</button>
            <button class="tab-btn" onclick="App.switchTab(this,'tab-adjacent')">Adjacent communities</button>
          </div>

          <!-- About tab -->
          <div id="tab-about">
            <div class="section-block">
              <div class="section-block-title">About this community</div>
              <p style="font-size:15px;line-height:1.7;color:var(--text-secondary)">${community.description}</p>
            </div>

            <div class="section-block">
              <div class="section-block-title">Who it's for</div>
              <p style="font-size:15px;color:var(--text-secondary)">${community.whoFor}</p>
            </div>

            <div class="section-block">
              <div class="section-block-title">Tone & values</div>
              <p style="font-size:15px;color:var(--text-secondary)">${community.tone}</p>
            </div>

            <div class="section-block">
              <div class="section-block-title">Community guidelines</div>
              <ul style="list-style:none;display:flex;flex-direction:column;gap:8px">
                ${community.norms.map(n => `
                  <li style="display:flex;gap:10px;align-items:flex-start">
                    <span style="color:var(--accent);flex-shrink:0">●</span>
                    <span style="font-size:14px;color:var(--text-secondary)">${n}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <div class="section-block">
              <div class="section-block-title">Practices</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                ${community.practices.map(p => `<span class="chip">${p}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Upcoming tab -->
          <div id="tab-upcoming" style="display:none">
            <div style="margin-bottom:24px">
              <div class="section-block-title">Rhythm</div>
              ${community.rhythm.map(r => `
                <div class="rhythm-row">
                  <span class="rhythm-day">${r.day}</span>
                  <span class="rhythm-time">${r.time}</span>
                  <span class="rhythm-event">${r.name}</span>
                  <span class="rhythm-recurring">${r.type}</span>
                </div>
              `).join('')}
            </div>
            <div class="section-block-title">Next events</div>
            ${events.map(e => Cards.eventCard(e)).join('') || '<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-title">No upcoming events</div></div>'}
          </div>

          <!-- People tab -->
          <div id="tab-people" style="display:none">
            <div class="section-block">
              <div class="section-block-title">Facilitators</div>
              <div class="card-grid">
                ${facilitators.map(f => Cards.facilitatorCard(f)).join('')}
              </div>
            </div>
            <div class="section-block">
              <div class="section-block-title">Venues this community uses</div>
              <div class="card-grid">
                ${venues.map(v => Cards.venueCard(v)).join('')}
              </div>
            </div>
          </div>

          <!-- Adjacent communities tab -->
          <div id="tab-adjacent" style="display:none">
            <p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">
              These communities share members, facilitators, or venues with ${community.shortName}. Crossover is natural and encouraged.
            </p>
            ${community.overlaps.map(ov => {
              const other = DATA.getCommunityById(ov.communityId);
              if (!other) return '';
              const pct = Math.round(ov.strength * 100);
              return `
                <div class="card" style="margin-bottom:12px;cursor:pointer" onclick="App.navigate('community','${other.id}')">
                  <div style="display:flex;align-items:center;gap:12px">
                    <span style="font-size:24px">${other.emoji}</span>
                    <div style="flex:1">
                      <div style="font-size:15px;font-weight:700">${other.name}</div>
                      <div style="font-size:13px;color:var(--text-secondary);margin-top:2px">${ov.reason}</div>
                      <div style="margin-top:8px;height:6px;background:var(--border);border-radius:var(--radius-full);overflow:hidden">
                        <div style="height:100%;width:${pct}%;background:${other.color};border-radius:var(--radius-full)"></div>
                      </div>
                      <div style="font-size:11px;color:var(--text-muted);margin-top:3px">${pct}% member crossover</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sidebar -->
        <div class="community-sidebar">
          <div class="section-block">
            <div class="section-block-title">How to engage</div>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.6">${community.howToEngage}</p>
          </div>

          <div class="section-block">
            <div class="section-block-title">Channels</div>
            ${community.channels.map(ch => `
              <div style="padding:6px 0;font-size:14px;color:var(--text-secondary);border-bottom:1px solid var(--border)">💬 ${ch}</div>
            `).join('')}
          </div>

          <div class="section-block">
            <div class="section-block-title">Next event</div>
            ${events[0] ? `
              <div class="card" style="cursor:pointer" onclick="App.navigate('event','${events[0].id}')">
                <div style="font-size:13px;font-weight:700">${events[0].title}</div>
                <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">${DATA.formatDate(events[0].date)} · ${DATA.formatTime(events[0].date)}</div>
                <div style="font-size:12px;color:${events[0].price===0?'var(--accent)':'var(--text-secondary)'};margin-top:2px">${DATA.formatPrice(events[0])}</div>
              </div>
            ` : '<div style="color:var(--text-muted);font-size:13px">No upcoming events.</div>'}
          </div>

          <div class="section-block">
            <div class="section-block-title">Overlap with</div>
            ${community.overlaps.slice(0,3).map(ov => {
              const other = DATA.getCommunityById(ov.communityId);
              if (!other) return '';
              return `
                <div class="overlap-community" onclick="App.navigate('community','${other.id}')">
                  <span style="font-size:16px">${other.emoji}</span>
                  <span style="font-size:13px;font-weight:600;flex:1">${other.shortName}</span>
                  <div class="overlap-bar" style="background:linear-gradient(to right,${other.color} ${Math.round(ov.strength*100)}%,var(--border) ${Math.round(ov.strength*100)}%);width:60px"></div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
  return { render };
})();
