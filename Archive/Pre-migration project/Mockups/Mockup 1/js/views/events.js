// ─── Events list view ───

const EventsView = (() => {
  let sortBy = 'soonest';
  let filterComm = null;

  function render() {
    const events = getSortedEvents();

    return `
      <div class="page-wide">
        <div style="padding:0 0 20px">
          <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:16px">Events in Aarhus</h1>
          <div class="filter-bar">
            <span class="filter-label">Sort:</span>
            <button class="filter-btn ${sortBy==='soonest'?'active':''}" onclick="EventsView.setSort('soonest')">Soonest</button>
            <button class="filter-btn ${sortBy==='relevance'?'active':''}" onclick="EventsView.setSort('relevance')">Relevant to me</button>
            <button class="filter-btn ${sortBy==='price'?'active':''}" onclick="EventsView.setSort('price')">Price ↑</button>
            <span class="filter-label" style="margin-left:8px">Community:</span>
            <button class="filter-btn ${!filterComm?'active':''}" onclick="EventsView.setFilter(null)">All</button>
            ${DATA.communities.map(c => `<button class="filter-btn ${filterComm===c.id?'active':''}" onclick="EventsView.setFilter('${c.id}')" style="border-left:3px solid ${c.color}">${c.shortName}</button>`).join('')}
          </div>
        </div>
        <div id="events-list">
          ${events.map(e => Cards.eventListRow(e)).join('')}
        </div>
      </div>
    `;
  }

  function getSortedEvents() {
    let evts = DATA.events.filter(e => e.date >= new Date(2026,3,23));
    if (filterComm) evts = evts.filter(e => e.communities.includes(filterComm));
    if (sortBy === 'soonest') evts.sort((a,b) => a.date - b.date);
    else if (sortBy === 'price') evts.sort((a,b) => a.price - b.price);
    else {
      const persona = DATA.getCurrentPersona();
      evts = DATA.getRelevantEventsForPersona(persona, 999);
    }
    return evts;
  }

  function setSort(s) {
    sortBy = s;
    document.getElementById('events-list').innerHTML = getSortedEvents().map(e => Cards.eventListRow(e)).join('');
    document.querySelectorAll('.filter-btn').forEach(b => {
      if (['Soonest','Relevant to me','Price ↑'].includes(b.textContent)) {
        b.classList.toggle('active', b.textContent.replace(' ↑','').toLowerCase().replace(' ','-') === s ||
          (b.textContent==='Soonest'&&s==='soonest') ||
          (b.textContent==='Relevant to me'&&s==='relevance') ||
          (b.textContent==='Price ↑'&&s==='price'));
      }
    });
  }

  function setFilter(commId) {
    filterComm = commId;
    document.getElementById('events-list').innerHTML = getSortedEvents().map(e => Cards.eventListRow(e)).join('');
  }

  return { render, setSort, setFilter };
})();
