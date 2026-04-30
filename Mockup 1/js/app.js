// ─── App core: routing, persona, role switching ───

const App = (() => {
  let navStack = [];

  // ─── Navigation ───
  let currentViewId = null;
  let previousView = null;

  function navigate(view, id) {
    previousView = DATA.currentView;
    navStack.push({ view: DATA.currentView, id: currentViewId });
    DATA.currentView = view;
    currentViewId = id;
    render();
    window.scrollTo(0, 0);
    Panel.close();
    updateNav(view);
  }

  function updateNav(view) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === view);
    });
  }

  function render() {
    const container = document.getElementById('view-container');
    const view = DATA.currentView;
    const id = currentViewId;
    const role = DATA.currentRole;

    // Role-based routing
    if (role === 'facilitator' && view === 'home') {
      container.innerHTML = FacilitatorDashboardView.render();
      return;
    }
    if (role === 'steward' && view === 'home') {
      container.innerHTML = StewardDashboardView.render();
      return;
    }

    // Destroy rhythm map when navigating away from it
    if (previousView === 'rhythm' && view !== 'rhythm' && typeof RhythmView !== 'undefined') {
      RhythmView.destroy();
    }

    switch (view) {
      case 'home':         container.innerHTML = HomeView.render(); break;
      case 'explore':      container.innerHTML = ExploreView.render(); ExploreView.afterRender(); break;
      case 'explore-familiar': ExploreView.render(); ExploreView.setMode('familiar'); break;
      case 'explore-adjacent': ExploreView.render(); ExploreView.setMode('social'); break;
      case 'rhythm':       container.innerHTML = RhythmView.render(); RhythmView.afterRender(); break;
      case 'communities':  container.innerHTML = CommunitiesView.render(); break;
      case 'community':    container.innerHTML = CommunityDetailView.render(id); break;
      case 'events':       container.innerHTML = EventsView.render(); break;
      case 'event':        container.innerHTML = EventDetailView.render(id); break;
      case 'facilitators': container.innerHTML = FacilitatorsView.render(); break;
      case 'facilitator':  container.innerHTML = FacilitatorDetailView.render(id); break;
      case 'saved':        container.innerHTML = SavedView.render(); break;
      case 'venue':        container.innerHTML = VenueDetailView.render(id); break;
      case 'facilitator-dashboard': container.innerHTML = FacilitatorDashboardView.render(); break;
      case 'event-creation': container.innerHTML = EventCreationView.render(); break;
      case 'steward-dashboard': container.innerHTML = StewardDashboardView.render(); break;
      case 'suggested-events': container.innerHTML = SuggestedEventsView.render(); break;
      default: container.innerHTML = HomeView.render();
    }
  }

  // ─── Role switching ───
  function setRole(role) {
    DATA.currentRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });

    // Update nav visibility for role
    const savedLink = document.querySelector('.nav-link[data-view="saved"]');
    if (savedLink) {
      savedLink.textContent = role === 'participant' ? 'Saved' : role === 'facilitator' ? 'Dashboard' : 'Dashboard';
    }

    // Navigate to appropriate home
    navigate('home');
    toast(`Switched to ${role} mode`);
  }

  // ─── Persona switcher ───
  function initPersonaSwitcher() {
    const btn = document.getElementById('persona-btn');
    const dropdown = document.getElementById('persona-dropdown');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => dropdown.classList.remove('open'));

    // Populate options
    DATA.personas.forEach(persona => {
      const el = document.createElement('div');
      el.className = `persona-option ${persona.id === DATA.currentPersonaId ? 'active' : ''}`;
      el.dataset.personaId = persona.id;
      el.innerHTML = `
        <div class="persona-option-avatar" style="background:${persona.color}">${persona.initials}</div>
        <div class="persona-option-info">
          <div class="persona-option-name">${persona.name}</div>
          <div class="persona-option-role">${persona.role}</div>
        </div>
      `;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        switchPersona(persona.id);
        dropdown.classList.remove('open');
      });
      dropdown.appendChild(el);
    });

    updatePersonaDisplay();
  }

  function switchPersona(personaId) {
    DATA.currentPersonaId = personaId;
    const persona = DATA.getCurrentPersona();

    // Auto-set role based on persona default
    if (persona && persona.defaultRole) {
      DATA.currentRole = persona.defaultRole;
      document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.role === persona.defaultRole);
      });
    }

    updatePersonaDisplay();
    document.querySelectorAll('.persona-option').forEach(el => {
      el.classList.toggle('active', el.dataset.personaId === personaId);
    });

    navigate('home');
    toast(`Switched to ${persona ? persona.name : 'persona'}`);
  }

  function updatePersonaDisplay() {
    const persona = DATA.getCurrentPersona();
    if (!persona) return;
    document.getElementById('persona-avatar').textContent = persona.initials;
    document.getElementById('persona-avatar').style.background = persona.color;
    document.getElementById('persona-name-label').textContent = persona.name.split(' ')[0];
  }

  // ─── Tab switching ───
  function switchTab(btn, targetId) {
    // Find sibling tab content: all IDs that match any sibling tab buttons' targets
    const tabBtns = btn.closest('.tabs')?.querySelectorAll('.tab-btn') || [];
    const siblingIds = Array.from(tabBtns).map(b => {
      const match = b.getAttribute('onclick')?.match(/'([^']+)'\)$/);
      return match ? match[1] : null;
    }).filter(Boolean);

    siblingIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = document.getElementById(targetId);
    if (target) target.style.display = 'block';
  }

  // ─── Event interactions ───
  function saveEvent(eventId, btn) {
    const persona = DATA.getCurrentPersona();
    if (!persona) return;
    const idx = persona.savedEvents.indexOf(eventId);
    if (idx >= 0) {
      persona.savedEvents.splice(idx, 1);
      if (btn) btn.textContent = '☆ Save';
      toast('Removed from saved');
    } else {
      persona.savedEvents.push(eventId);
      if (btn) btn.textContent = '✓ Saved';
      toast('Saved!');
    }
  }

  function attendEvent(eventId, btn) {
    const persona = DATA.getCurrentPersona();
    if (!persona) return;
    if (!persona.attendingEvents) persona.attendingEvents = [];
    const idx = persona.attendingEvents.indexOf(eventId);
    if (idx >= 0) {
      persona.attendingEvents.splice(idx, 1);
      if (btn) btn.textContent = 'Attend / Interested';
      toast('Removed from attending');
    } else {
      persona.attendingEvents.push(eventId);
      if (btn) btn.textContent = '✓ Attending';
      toast('You\'re attending! ✓');
    }
  }

  function followCommunity(communityId) {
    const persona = DATA.getCurrentPersona();
    if (!persona) return;
    if (!persona.communities.includes(communityId)) {
      persona.communities.push(communityId);
      toast('Following community!');
      render(); // re-render to reflect new state
    }
  }

  function unfollowCommunity(communityId) {
    const persona = DATA.getCurrentPersona();
    if (!persona) return;
    const idx = persona.communities.indexOf(communityId);
    if (idx >= 0) {
      persona.communities.splice(idx, 1);
      toast('Unfollowed community');
      render();
    }
  }

  function toggleFollowFacilitator(facilitatorId, btn) {
    const persona = DATA.getCurrentPersona();
    if (!persona) return;
    if (!persona.followedFacilitators) persona.followedFacilitators = [];
    const idx = persona.followedFacilitators.indexOf(facilitatorId);
    if (idx >= 0) {
      persona.followedFacilitators.splice(idx, 1);
      if (btn) { btn.className = 'btn btn-primary'; btn.textContent = '+ Follow'; }
      toast('Unfollowed facilitator');
    } else {
      persona.followedFacilitators.push(facilitatorId);
      if (btn) { btn.className = 'btn btn-secondary'; btn.textContent = '✓ Following'; }
      toast('Following facilitator!');
    }
  }

  function suggestEvent(eventId) {
    const event = DATA.getEventById(eventId);
    const persona = DATA.getCurrentPersona();
    const communityOptions = (persona && persona.communities.length > 0)
      ? persona.communities
      : DATA.communities.slice(0,3).map(c => c.id);

    const communityChoices = communityOptions.map(id => {
      const c = DATA.getCommunityById(id);
      return c ? `<option value="${id}">${c.name}</option>` : '';
    }).join('');

    Panel.open(`
      <div style="padding:20px">
        <h2 style="font-size:18px;font-weight:800;margin-bottom:6px">Suggest to a community</h2>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px">Suggest "${event ? event.title : 'this event'}" as relevant to one of your communities.</p>
        <div class="form-group">
          <label class="form-label">Choose a community</label>
          <select class="form-select" id="suggest-community">${communityChoices}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Add a note (optional)</label>
          <textarea class="form-textarea" id="suggest-note" placeholder="Why might this be relevant to your community?" style="min-height:80px"></textarea>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:8px" onclick="App.submitSuggestion('${eventId}')">Send suggestion →</button>
      </div>
    `);
  }

  function submitSuggestion(eventId) {
    const communityId = document.getElementById('suggest-community')?.value;
    const note = document.getElementById('suggest-note')?.value;
    if (communityId) {
      if (!DATA.suggestedEventsQueue[communityId]) DATA.suggestedEventsQueue[communityId] = [];
      DATA.suggestedEventsQueue[communityId].push({
        eventId,
        suggestedBy: DATA.getCurrentPersona()?.personId || 'p1',
        note: note || 'No note added.',
        timestamp: new Date(2026, 3, 23)
      });
    }
    Panel.close();
    toast('✦ Suggestion sent to community steward!');
  }

  // ─── Toast ───
  function toast(message) {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  // ─── Init ───
  function init() {
    Panel.init();
    initPersonaSwitcher();

    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        if (view === 'saved' && DATA.currentRole !== 'participant') {
          navigate(DATA.currentRole === 'facilitator' ? 'facilitator-dashboard' : 'steward-dashboard');
        } else {
          navigate(view);
        }
      });
    });

    // Role buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', () => setRole(btn.dataset.role));
    });

    // Initial render
    navigate('home');
  }

  return {
    navigate, render, setRole, switchPersona, switchTab,
    saveEvent, attendEvent, followCommunity, unfollowCommunity,
    toggleFollowFacilitator, suggestEvent, submitSuggestion,
    toast, init
  };
})();

// ─── Bootstrap ───
document.addEventListener('DOMContentLoaded', () => App.init());
