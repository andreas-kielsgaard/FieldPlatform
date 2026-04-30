// ─── Side panel / drawer ───

const Panel = (() => {
  function open(html) {
    document.getElementById('side-panel-content').innerHTML = html;
    document.getElementById('side-panel').classList.remove('hidden');
    document.getElementById('side-panel-overlay').classList.remove('hidden');
  }

  function close() {
    document.getElementById('side-panel').classList.add('hidden');
    document.getElementById('side-panel-overlay').classList.add('hidden');
  }

  function init() {
    document.getElementById('side-panel-close').addEventListener('click', close);
    document.getElementById('side-panel-overlay').addEventListener('click', close);
  }

  return { open, close, init };
})();
