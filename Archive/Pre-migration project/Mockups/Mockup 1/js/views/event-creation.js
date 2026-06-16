// ─── Event creation flow ───

const EventCreationView = (() => {
  let step = 1;
  const totalSteps = 5;
  const draft = {
    title: '', description: '', longDescription: '',
    date: '', duration: '', venue: '', price: '',
    tags: [], communities: [], beginnerFriendly: false,
    whoFor: '', whatToExpect: '', accessibility: ''
  };

  function render() {
    step = 1;
    return renderStep();
  }

  function renderStep() {
    return `
      <div class="form-page">
        <div class="breadcrumb">
          <a onclick="App.navigate('facilitator-dashboard')">Dashboard</a>
          <span class="breadcrumb-sep">›</span>
          <span>New event</span>
        </div>

        <!-- Progress -->
        <div style="margin-bottom:28px">
          <div style="display:flex;gap:4px;margin-bottom:8px">
            ${Array.from({length:totalSteps},(_,i) => `
              <div style="flex:1;height:4px;border-radius:2px;background:${i<step?'var(--accent)':'var(--border)'}"></div>
            `).join('')}
          </div>
          <div style="font-size:12px;color:var(--text-muted)">Step ${step} of ${totalSteps}</div>
        </div>

        <div id="form-step-content">
          ${renderStepContent()}
        </div>

        <div style="display:flex;justify-content:space-between;margin-top:28px">
          ${step > 1
            ? `<button class="btn btn-secondary" onclick="EventCreationView.prevStep()">← Back</button>`
            : '<div></div>'
          }
          ${step < totalSteps
            ? `<button class="btn btn-primary" onclick="EventCreationView.nextStep()">Continue →</button>`
            : `<button class="btn btn-primary" onclick="EventCreationView.publish()">✓ Publish event</button>`
          }
        </div>
      </div>
    `;
  }

  function renderStepContent() {
    if (step === 1) return `
      <div class="form-section">
        <div class="form-section-title">Basic details</div>
        <div class="form-group">
          <label class="form-label">Event title</label>
          <input class="form-input" placeholder="e.g. Friday CI Jam, Breathwork Journey…" value="${draft.title}" oninput="EventCreationView.save('title',this.value)" />
        </div>
        <div class="form-group">
          <label class="form-label">Short description</label>
          <input class="form-input" placeholder="One-sentence invitation…" value="${draft.description}" oninput="EventCreationView.save('description',this.value)" />
          <div class="form-hint">This appears in cards and lists.</div>
        </div>
        <div class="form-group">
          <label class="form-label">Full description</label>
          <textarea class="form-textarea" placeholder="Describe the event in more detail…" oninput="EventCreationView.save('longDescription',this.value)">${draft.longDescription}</textarea>
        </div>
      </div>
    `;

    if (step === 2) return `
      <div class="form-section">
        <div class="form-section-title">Venue & time</div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input class="form-input" type="date" value="${draft.date}" oninput="EventCreationView.save('date',this.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">Duration</label>
            <select class="form-select" onchange="EventCreationView.save('duration',this.value)">
              <option>1h</option><option>1.5h</option><option>2h</option><option selected>2.5h</option><option>3h</option><option>4h</option><option>5h</option><option>Full day</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Venue</label>
          <select class="form-select" onchange="EventCreationView.save('venue',this.value)">
            <option value="">Select a venue…</option>
            ${DATA.venues.map(v => `<option value="${v.id}">${v.name} (${v.type})</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Price (DKK)</label>
            <input class="form-input" type="number" placeholder="0 = free / donation" value="${draft.price}" oninput="EventCreationView.save('price',this.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">Price label</label>
            <input class="form-input" placeholder="e.g. Sliding scale 80–150" />
          </div>
        </div>
      </div>
    `;

    if (step === 3) return `
      <div class="form-section">
        <div class="form-section-title">Who it's for</div>
        <div class="form-group">
          <label class="form-label">Who is this for?</label>
          <textarea class="form-textarea" placeholder="Describe who the event is designed for…" style="min-height:80px" oninput="EventCreationView.save('whoFor',this.value)">${draft.whoFor}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">What to expect</label>
          <textarea class="form-textarea" placeholder="Brief structure or flow description…" style="min-height:80px" oninput="EventCreationView.save('whatToExpect',this.value)">${draft.whatToExpect}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label" style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" ${draft.beginnerFriendly?'checked':''} onchange="EventCreationView.save('beginnerFriendly',this.checked)" />
            Beginner friendly
          </label>
        </div>
        <div class="form-group">
          <label class="form-label">Accessibility notes</label>
          <input class="form-input" placeholder="e.g. All mobility levels welcome, step at entrance…" value="${draft.accessibility}" oninput="EventCreationView.save('accessibility',this.value)" />
        </div>
      </div>
    `;

    if (step === 4) return `
      <div class="form-section">
        <div class="form-section-title">Linked communities</div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">
          Select communities this event belongs to or is relevant to. It may be co-hosted, or simply relevant. This is the key to broader discovery.
        </p>
        <div class="community-checkbox-group">
          ${DATA.communities.map(c => `
            <label class="community-checkbox ${draft.communities.includes(c.id)?'checked':''}" onclick="EventCreationView.toggleCommunity('${c.id}',this)">
              <input type="checkbox" ${draft.communities.includes(c.id)?'checked':''} />
              <span style="font-size:18px">${c.emoji}</span>
              <div style="flex:1">
                <div style="font-size:14px;font-weight:600">${c.name}</div>
                <div style="font-size:12px;color:var(--text-muted)">${c.memberCount} members · ${c.practices[0]}</div>
              </div>
              ${draft.communities.includes(c.id) ? '<span style="color:var(--accent)">✓</span>' : ''}
            </label>
          `).join('')}
        </div>
        <div class="form-hint" style="margin-top:12px">Selecting a community suggests the event to their steward for review. You can also publish without linking.</div>
      </div>
    `;

    if (step === 5) return `
      <div class="form-section">
        <div class="form-section-title">Preview & publish</div>
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:20px">
          <div style="font-size:18px;font-weight:800;margin-bottom:6px">${draft.title || 'Untitled event'}</div>
          <div style="font-size:14px;color:var(--text-secondary);margin-bottom:12px">${draft.description || 'No description yet'}</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--text-secondary)">
            ${draft.date ? `<span>📅 ${draft.date}</span>` : ''}
            ${draft.duration ? `<span>⏱ ${draft.duration}</span>` : ''}
            ${draft.price ? `<span>💰 ${draft.price} DKK</span>` : '<span>💰 Free</span>'}
          </div>
          <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap">
            ${draft.beginnerFriendly ? '<span class="chip green">Beginner friendly</span>' : ''}
            ${draft.communities.map(id => {
              const c = DATA.getCommunityById(id);
              return c ? `<span class="chip" style="border-color:${c.color};color:${c.color}">${c.emoji} ${c.shortName}</span>` : '';
            }).join('')}
          </div>
        </div>
        <p style="font-size:14px;color:var(--text-secondary)">
          When you publish, this event will appear on your profile, in the community explore feeds, and in the suggested events queue for linked communities.
        </p>
        ${draft.communities.length > 0 ? `
          <div style="background:var(--accent-light);border-radius:var(--radius-sm);padding:12px;margin-top:12px;font-size:13px;color:var(--accent)">
            ✦ This event will be suggested to ${draft.communities.length} communit${draft.communities.length > 1 ? 'ies' : 'y'} for review.
          </div>
        ` : ''}
      </div>
    `;
  }

  function nextStep() {
    if (step < totalSteps) {
      step++;
      document.getElementById('form-step-content').innerHTML = renderStepContent();
      document.querySelectorAll('[style*="background:var(--accent)"]').forEach((el, i) => {
        // Progress bars re-render via full update
      });
      // Refresh progress
      const progressBars = document.querySelectorAll('[style*="height:4px"]');
      progressBars.forEach((bar, i) => {
        bar.style.background = i < step ? 'var(--accent)' : 'var(--border)';
      });
      document.querySelector('[style*="Step "]').textContent = `Step ${step} of ${totalSteps}`;
    }
  }

  function prevStep() {
    if (step > 1) {
      step--;
      document.getElementById('form-step-content').innerHTML = renderStepContent();
      document.querySelector('[style*="Step "]').textContent = `Step ${step} of ${totalSteps}`;
    }
  }

  function save(field, value) {
    draft[field] = value;
  }

  function toggleCommunity(id, el) {
    const idx = draft.communities.indexOf(id);
    if (idx >= 0) {
      draft.communities.splice(idx, 1);
      el.classList.remove('checked');
    } else {
      draft.communities.push(id);
      el.classList.add('checked');
    }
  }

  function publish() {
    App.toast('🎉 Event published! It\'s now live on your profile and in community feeds.');
    setTimeout(() => App.navigate('facilitator-dashboard'), 1500);
  }

  return { render, nextStep, prevStep, save, toggleCommunity, publish };
})();
