(function () {
  const placeholder = document.getElementById('sidebar-placeholder');
  if (!placeholder) return;

  const p = location.pathname;
  let base = '';
  if (p.includes('/sample/ui/')
   || p.includes('/sample/form/')
   || p.includes('/sample/data/')
   || p.includes('/sample/system/')) {
    base = '../../';
  } else if (p.includes('/basic/')
   || p.includes('/detailed/')
   || p.includes('/impl/')
   || p.includes('/reference/')
   || p.includes('/checklist/')
   || p.includes('/sample/')) {
    base = '../';
  }

  const html = `<a href="${base}index.html" class="sidebar-logo">
  <span class="logo-icon">📚</span>
  設計手順書 虎の巻
</a>
<div class="search-box">
  <input class="search-input" type="text" placeholder="ページを検索…">
</div>

<div class="sidebar-section">全体ガイド</div>
<nav>
  <a href="${base}index.html"><span class="nav-icon">🏠</span>トップ / 全体目次</a>
  <a href="${base}howto.html"><span class="nav-icon">🗺️</span>全体フロー・HowTo</a>
</nav>

<div class="sidebar-section">基本設計フェーズ</div>
<nav>
  <a href="${base}basic/design.html"><span class="nav-icon">📐</span>基本設計 手順 (STEP0〜8)</a>
  <a href="${base}basic/deliverables.html"><span class="nav-icon">📋</span>基本設計 成果物ガイド</a>
</nav>

<div class="sidebar-section">詳細設計フェーズ</div>
<nav>
  <a href="${base}detailed/design.html"><span class="nav-icon">🔬</span>詳細設計 手順 (STEP0〜9)</a>
  <a href="${base}detailed/deliverables.html"><span class="nav-icon">📋</span>詳細設計 成果物ガイド</a>
  <a href="${base}detailed/common-libs.html"><span class="nav-icon">📦</span>共通ライブラリ設計</a>
  <a href="${base}detailed/techniques.html"><span class="nav-icon">💡</span>詳細設計技法</a>
</nav>

<div class="sidebar-section">実装・テスト</div>
<nav>
  <a href="${base}impl/implementation.html"><span class="nav-icon">💻</span>実装手順</a>
  <a href="${base}impl/testing.html"><span class="nav-icon">🧪</span>テスト実施手順</a>
  <a href="${base}impl/unit-test.html"><span class="nav-icon">🎯</span>単体テスト設計技法</a>
</nav>

<div class="sidebar-section">資料・テンプレート</div>
<nav>
  <a href="${base}reference/templates.html"><span class="nav-icon">📝</span>設計書テンプレート</a>
  <a href="${base}reference/adr.html"><span class="nav-icon">🏛️</span>ADRサンプル</a>
  <a href="${base}reference/ai-consult.html"><span class="nav-icon">🤖</span>AI相談テンプレート</a>
  <a href="${base}reference/readable-naming.html"><span class="nav-icon">📖</span>命名規則ガイド</a>
  <a href="${base}reference/legacy-code.html"><span class="nav-icon">🏚️</span>レガシーコードからの脱却</a>
  <a href="${base}reference/pragmatic-programmer.html"><span class="nav-icon">🧙</span>達人プログラマー</a>
  <a href="${base}reference/engineer-growth.html"><span class="nav-icon">🌱</span>エンジニアの持続的成長</a>
  <a href="${base}reference/pmbok8.html"><span class="nav-icon">📘</span>PMBOK 第8版</a>
</nav>

<div class="sidebar-section">チェックリスト</div>
<nav>
  <a href="${base}checklist/batch.html"><span class="nav-icon">⚙️</span>バッチ作成チェックリスト</a>
  <a href="${base}checklist/screen.html"><span class="nav-icon">🖥️</span>画面作成チェックリスト</a>
  <a href="${base}checklist/api.html"><span class="nav-icon">🔌</span>API作成チェックリスト</a>
</nav>

<div class="sidebar-section">サンプル画面集</div>
<nav>
  <a href="${base}sample/index.html"><span class="nav-icon">🗂️</span>サンプル一覧</a>
</nav>
<details class="sidebar-group">
  <summary><span class="nav-icon">🏗️</span>UI基本</summary>
  <nav>
    <a href="${base}sample/ui/layout.html">レイアウト・ナビ構造</a>
    <a href="${base}sample/ui/responsive.html">レスポンシブデザイン</a>
    <a href="${base}sample/ui/ui-components.html">UIコンポーネント状態</a>
  </nav>
</details>
<details class="sidebar-group">
  <summary><span class="nav-icon">📝</span>フォーム・入力</summary>
  <nav>
    <a href="${base}sample/form/form-validation.html">バリデーション</a>
    <a href="${base}sample/form/wizard-form.html">ステップフォーム</a>
    <a href="${base}sample/form/datetime-input.html">日付・時刻入力</a>
    <a href="${base}sample/form/file-upload.html">ファイルアップロード</a>
    <a href="${base}sample/form/input-assist.html">入力補助・オートコンプリート</a>
    <a href="${base}sample/form/search-ui.html">検索UI</a>
    <a href="${base}sample/form/registration-complete.html">登録完了</a>
  </nav>
</details>
<details class="sidebar-group">
  <summary><span class="nav-icon">📊</span>データ表示</summary>
  <nav>
    <a href="${base}sample/data/data-table.html">テーブル・一覧</a>
    <a href="${base}sample/data/dashboard.html">ダッシュボード</a>
    <a href="${base}sample/data/log-viewer.html">ログ出力</a>
    <a href="${base}sample/data/audit-log.html">監査ログ・操作履歴</a>
  </nav>
</details>
<details class="sidebar-group">
  <summary><span class="nav-icon">⚙️</span>システム</summary>
  <nav>
    <a href="${base}sample/system/auth-flow.html">認証・認可フロー</a>
    <a href="${base}sample/system/rbac-display.html">権限・ロール別表示</a>
    <a href="${base}sample/system/async-states.html">非同期処理状態</a>
    <a href="${base}sample/system/error-patterns.html">エラーハンドリング</a>
    <a href="${base}sample/system/notifications.html">通知・フィードバック</a>
    <a href="${base}sample/system/api-response.html">APIレスポンス設計</a>
  </nav>
</details>`;

  placeholder.innerHTML = html;

  // 現在ページのリンクをアクティブに & 該当グループを開く
  const current = p.split('/').pop() || 'index.html';
  const currentDir = p.split('/').slice(-2, -1)[0] || '';
  placeholder.querySelectorAll('nav a').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    if (href.endsWith('/' + currentDir + '/' + current) || href.endsWith('/' + current)) {
      a.classList.add('active');
      const details = a.closest('details');
      if (details) details.open = true;
    }
  });

  const searchInput = placeholder.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      placeholder.querySelectorAll('details.sidebar-group').forEach(function (d) {
        let hasMatch = false;
        d.querySelectorAll('nav a').forEach(function (a) {
          const match = a.textContent.toLowerCase().includes(q);
          a.style.display = match ? '' : 'none';
          if (match) hasMatch = true;
        });
        d.style.display = (q === '' || hasMatch) ? '' : 'none';
        if (q !== '' && hasMatch) d.open = true;
      });
      placeholder.querySelectorAll('nav:not(details nav) a').forEach(function (a) {
        a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
})();
