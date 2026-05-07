// ─── Facilitators list view ───

const FacilitatorsView = (() => {
  function render() {
    return `
      <div class="page">
        <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:6px">Facilitators</h1>
        <p style="color:var(--text-secondary);font-size:15px;margin-bottom:28px">Facilitators are carriers of practices, lineages, and intentions — not just event creators.</p>
        <div class="card-grid">
          ${DATA.facilitators.map(f => Cards.facilitatorCard(f)).join('')}
        </div>
      </div>
    `;
  }
  return { render };
})();
