(function () {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (!placeholder) return;

  const html = `<a href="index.html" class="sidebar-logo">
  <span class="logo-icon">📚</span>
  設計手順書 虎の巻
</a>
<div class="search-box">
  <input class="search-input" type="text" placeholder="ページを検索…">
</div>

<div class="sidebar-section">全体ガイド</div>
<nav>
  <a href="index.html"><span class="nav-icon">🏠</span>トップ / 全体目次</a>
  <a href="howto.html"><span class="nav-icon">🗺️</span>全体フロー・HowTo</a>
</nav>

<div class="sidebar-section">基本設計フェーズ</div>
<nav>
  <a href="basic-design.html"><span class="nav-icon">📐</span>基本設計 手順 (STEP0〜8)</a>
  <a href="basic-deliverables.html"><span class="nav-icon">📋</span>基本設計 成果物ガイド</a>
</nav>

<div class="sidebar-section">詳細設計フェーズ</div>
<nav>
  <a href="detailed-design.html"><span class="nav-icon">🔬</span>詳細設計 手順 (STEP0〜9)</a>
  <a href="detailed-deliverables.html"><span class="nav-icon">📋</span>詳細設計 成果物ガイド</a>
  <a href="common-libs.html"><span class="nav-icon">📦</span>共通ライブラリ設計</a>
  <a href="detailed-design-techniques.html"><span class="nav-icon">💡</span>詳細設計技法</a>
</nav>

<div class="sidebar-section">実装・テスト</div>
<nav>
  <a href="implementation.html"><span class="nav-icon">💻</span>実装手順</a>
  <a href="testing.html"><span class="nav-icon">🧪</span>テスト実施手順</a>
  <a href="unit-test-techniques.html"><span class="nav-icon">🎯</span>単体テスト設計技法</a>
</nav>

<div class="sidebar-section">資料・テンプレート</div>
<nav>
  <a href="templates.html"><span class="nav-icon">📝</span>設計書テンプレート</a>
  <a href="adr.html"><span class="nav-icon">🏛️</span>ADRサンプル</a>
  <a href="ai-consult.html"><span class="nav-icon">🤖</span>AI相談テンプレート</a>
</nav>

<div class="sidebar-section">サンプル画面集</div>
<nav>
  <a href="sample-index.html"><span class="nav-icon">🗂️</span>サンプル一覧</a>
  <a href="sample-layout.html"><span class="nav-icon">🏗️</span>レイアウト・ナビ構造</a>
  <a href="sample-ui-components.html"><span class="nav-icon">🧩</span>UIコンポーネント状態</a>
  <a href="sample-responsive.html"><span class="nav-icon">📱</span>レスポンシブデザイン</a>
  <a href="sample-log-viewer.html"><span class="nav-icon">📋</span>ログ出力</a>
  <a href="sample-error-patterns.html"><span class="nav-icon">⚠️</span>エラーハンドリング</a>
  <a href="sample-form-validation.html"><span class="nav-icon">✅</span>バリデーション</a>
  <a href="sample-wizard-form.html"><span class="nav-icon">🧭</span>ステップフォーム</a>
  <a href="sample-data-table.html"><span class="nav-icon">📊</span>テーブル・一覧</a>
  <a href="sample-notifications.html"><span class="nav-icon">🔔</span>通知・フィードバック</a>
  <a href="sample-auth-flow.html"><span class="nav-icon">🔐</span>認証・認可フロー</a>
  <a href="sample-async-states.html"><span class="nav-icon">⏳</span>非同期処理状態</a>
  <a href="sample-file-upload.html"><span class="nav-icon">📁</span>ファイルアップロード</a>
  <a href="sample-datetime-input.html"><span class="nav-icon">📅</span>日付・時刻入力</a>
  <a href="sample-search-ui.html"><span class="nav-icon">🔍</span>検索UI</a>
  <a href="sample-api-response.html"><span class="nav-icon">🔌</span>APIレスポンス設計</a>
  <a href="sample-rbac-display.html"><span class="nav-icon">🛡️</span>権限・ロール別表示</a>
  <a href="sample-audit-log.html"><span class="nav-icon">📜</span>監査ログ・操作履歴</a>
  <a href="sample-dashboard.html"><span class="nav-icon">📈</span>ダッシュボード</a>
  <a href="sample-input-assist.html"><span class="nav-icon">💡</span>入力補助・オートコンプリート</a>
</nav>`;

  placeholder.innerHTML = html;

  const current = location.pathname.split('/').pop() || 'index.html';
  placeholder.querySelectorAll('nav a').forEach(function (a) {
    if (a.getAttribute('href') === current) {
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
