(function () {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (!placeholder) return;

  const p = location.pathname;
  const current = p.split('/').pop() || 'index.html';

  const html = `<a href="index.html" class="sidebar-logo">
  <span class="logo-icon">🎣</span>
  釣り 虎の巻
</a>
<div class="search-box">
  <input class="search-input" type="text" placeholder="ページを検索…">
</div>

<div class="sidebar-section">トップ</div>
<nav>
  <a href="index.html"><span class="nav-icon">🏠</span>トップ / 魚種一覧</a>
</nav>

<div class="sidebar-section">アジ釣り</div>
<nav>
  <a href="aji.html"><span class="nav-icon">🐟</span>アジ釣り 虎の巻</a>
  <a href="aji.html#weekend-plan"><span class="nav-icon">🗓️</span>今週末の釣行プラン</a>
  <a href="aji.html#spots"><span class="nav-icon">📍</span>釣り場ガイド</a>
  <a href="aji.html#conditions"><span class="nav-icon">🌤️</span>釣行判断ガイド</a>
  <a href="aji.html#rigs"><span class="nav-icon">🪝</span>仕掛け・タックルガイド</a>
</nav>

<div class="sidebar-section">イカ釣り</div>
<nav>
  <a href="ika.html"><span class="nav-icon">🦑</span>イカ釣り 虎の巻</a>
  <a href="ika.html#weekend-plan"><span class="nav-icon">🗓️</span>今週末の釣行プラン</a>
  <a href="ika.html#spots"><span class="nav-icon">📍</span>釣り場ガイド</a>
  <a href="ika.html#conditions"><span class="nav-icon">🌤️</span>釣行判断ガイド</a>
  <a href="ika.html#rigs"><span class="nav-icon">🪝</span>仕掛け・タックルガイド</a>
</nav>

<div class="sidebar-section">近日追加予定</div>
<nav>
  <a style="opacity:.45; pointer-events:none;"><span class="nav-icon">🐠</span>キス釣り</a>
  <a style="opacity:.45; pointer-events:none;"><span class="nav-icon">🐡</span>サバ釣り</a>
</nav>`;

  placeholder.innerHTML = html;

  placeholder.querySelectorAll('nav a[href]').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    const hrefPage = href.split('#')[0];
    if (hrefPage === current || hrefPage.endsWith('/' + current)) {
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
