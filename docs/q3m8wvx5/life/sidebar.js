(function () {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (!placeholder) return;

  const p = location.pathname;

  const html = `<a href="index.html" class="sidebar-logo">
  <span class="logo-icon">🌿</span>
  生活改善 虎の巻
</a>
<div class="search-box">
  <input class="search-input" type="text" placeholder="ページを検索…">
</div>

<div class="sidebar-section">トップ</div>
<nav>
  <a href="index.html"><span class="nav-icon">🏠</span>トップ / 全体目次</a>
</nav>

<div class="sidebar-section">書籍まとめ</div>
<nav>
  <a href="healthy-habits.html"><span class="nav-icon">🏃</span>体を動かす習慣・休める習慣</a>
</nav>`;

  placeholder.innerHTML = html;

  // 現在ページのリンクをアクティブに
  const current = p.split('/').pop() || 'index.html';
  placeholder.querySelectorAll('nav a').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    if (href === current || href.endsWith('/' + current)) {
      a.classList.add('active');
    }
  });

  const searchInput = placeholder.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      placeholder.querySelectorAll('nav a').forEach(function (a) {
        a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
})();
