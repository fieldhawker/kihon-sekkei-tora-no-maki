/* ===================================================
   システム開発 設計手順書 — メインスクリプト
   =================================================== */

// ===== Scroll-top button =====
(function () {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.innerHTML = '↑';
  btn.title = 'ページトップへ';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// sidebar active links and search are handled by sidebar.js

// ===== Tab navigation =====
document.querySelectorAll('.tab-nav').forEach(nav => {
  nav.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const container = btn.closest('.tab-container');
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = container.querySelector(`[data-pane="${target}"]`);
      if (pane) pane.classList.add('active');
    });
  });
});

// ===== Checklist persistence =====
document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
  const key = `chk-${location.pathname}-${cb.id || cb.dataset.key}`;
  if (localStorage.getItem(key) === '1') {
    cb.checked = true;
    cb.closest('li').classList.add('done');
  }

  cb.addEventListener('change', () => {
    localStorage.setItem(key, cb.checked ? '1' : '0');
    cb.closest('li').classList.toggle('done', cb.checked);
    updateProgress();
  });
});

function updateProgress() {
  const all = document.querySelectorAll('.checklist input[type="checkbox"]');
  const done = [...all].filter(c => c.checked).length;
  const bar = document.querySelector('.progress-fill');
  const label = document.querySelector('.progress-label');
  if (bar) bar.style.width = all.length ? `${(done / all.length) * 100}%` : '0%';
  if (label) label.textContent = `${done} / ${all.length} 完了`;
}
updateProgress();

