---
title: テスト実施手順
subtitle: Phase 4
phase: test
description: 実装完了後のテスト実施フェーズ手順書です。単体テスト〜UAT〜カットオーバーまで、V字モデルに基づいて段階的に品質を確認します。
mermaid: true
style: |
  .v-model-svg { max-width:700px; margin:1.5rem auto; display:block; }
  .test-level-card { background:#fff; border:1px solid var(--gray-200); border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1rem; border-left:4px solid; box-shadow:var(--shadow-sm); }
  .test-level-card.unit   { border-left-color:#1a56db; }
  .test-level-card.integ  { border-left-color:#0e9f6e; }
  .test-level-card.system { border-left-color:#f59e0b; }
  .test-level-card.uat    { border-left-color:#e02424; }
  .test-level-card.release{ border-left-color:#6d28d9; }
  .test-level-card h3 { font-size:1rem; font-weight:700; margin-bottom:.35rem; }
  .test-level-card .meta { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:.5rem; font-size:.8rem; }
---

<div class="callout callout-info" style="margin-top:0">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <b>このページの使い方</b><br>
    1) V字モデルで「どの設計に対するテストか」を確認 → 2) STEP 1 から順に実施し、各STEPの完了基準（Exit Criteria）を満たしたら次へ進む。<br>
    迷ったら「<b>再現手順が書けない不具合</b>」はまず再現条件の特定を優先します（原因調査より先）。
  </div>
</div>

## 📐 V字モデル — 設計とテストの対応

<div class="mermaid-wrap">
  <div class="mermaid-title">設計フェーズとテストフェーズの対応関係</div>
  <svg class="v-model-svg" viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans JP, sans-serif">
    <line x1="50" y1="30" x2="350" y2="250" stroke="#d1d5db" stroke-width="2"/>
    <line x1="350" y1="250" x2="650" y2="30" stroke="#d1d5db" stroke-width="2"/>
    <line x1="300" y1="250" x2="400" y2="250" stroke="#1a56db" stroke-width="2" stroke-dasharray="4"/>
    <rect x="10" y="15" width="120" height="32" rx="6" fill="#6d28d9"/>
    <text x="70" y="35" text-anchor="middle" fill="white" font-size="12" font-weight="bold">要件定義</text>
    <rect x="30" y="65" width="110" height="32" rx="6" fill="#1a56db"/>
    <text x="85" y="85" text-anchor="middle" fill="white" font-size="12" font-weight="bold">基本設計</text>
    <rect x="50" y="115" width="110" height="32" rx="6" fill="#0e9f6e"/>
    <text x="105" y="135" text-anchor="middle" fill="white" font-size="12" font-weight="bold">詳細設計</text>
    <rect x="255" y="235" width="90" height="32" rx="6" fill="#374151"/>
    <text x="300" y="255" text-anchor="middle" fill="white" font-size="11" font-weight="bold">実装</text>
    <rect x="565" y="15" width="120" height="32" rx="6" fill="#e02424"/>
    <text x="625" y="35" text-anchor="middle" fill="white" font-size="12" font-weight="bold">受入テスト(UAT)</text>
    <rect x="555" y="65" width="120" height="32" rx="6" fill="#d97706"/>
    <text x="615" y="85" text-anchor="middle" fill="white" font-size="12" font-weight="bold">システムテスト</text>
    <rect x="545" y="115" width="110" height="32" rx="6" fill="#0e9f6e"/>
    <text x="600" y="135" text-anchor="middle" fill="white" font-size="12" font-weight="bold">結合テスト</text>
    <rect x="355" y="235" width="90" height="32" rx="6" fill="#374151"/>
    <text x="400" y="255" text-anchor="middle" fill="white" font-size="11" font-weight="bold">単体テスト</text>
    <line x1="130" y1="31" x2="565" y2="31" stroke="#e02424" stroke-width="1" stroke-dasharray="6,4"/>
    <line x1="140" y1="81" x2="555" y2="81" stroke="#d97706" stroke-width="1" stroke-dasharray="6,4"/>
    <line x1="160" y1="131" x2="545" y2="131" stroke="#0e9f6e" stroke-width="1" stroke-dasharray="6,4"/>
  </svg>
</div>

## 📋 テストレベルの定義と担当

<div class="test-level-card unit">
  <h3>🔵 STEP 1 — 単体テスト</h3>
  <div class="meta">
    <span class="badge badge-primary">目安: 3〜5日</span>
    <span class="badge badge-gray">主担当: プログラマー</span>
    <span class="badge badge-gray">参照: D-01 詳細機能設計書</span>
  </div>
  <p class="text-sm">関数・クラス単体が仕様どおりに動作するかを検証します。ホワイトボックステストが中心です。</p>
  <div class="table-wrap" style="margin-top:.75rem">
    <table>
      <thead><tr><th>確認項目</th><th>ツール例</th><th>目標</th></tr></thead>
      <tbody>
        <tr><td>正常系・異常系の網羅</td><td>JUnit / Jest / pytest</td><td>命令カバレッジ 80%以上</td></tr>
        <tr><td>境界値・同値分割<br><small class="text-muted">入力値をグループ分けして代表値でテストする（同値分割）＋境界の値（7文字と8文字など）を重点的にテストする（境界値分析）。詳細は <a href="unit-test.html">単体テスト設計技法まとめ</a> を参照</small></td><td>—</td><td>テスト設計書に明記</td></tr>
        <tr><td>モック・スタブの活用<br><small class="text-muted">モック（Mock）＝テスト対象が使う外部依存（DBやメールサーバー等）を偽物で置き換えるオブジェクト。「DBが壊れていると単体テストが落ちる」を防ぎ、テスト対象の関数だけを独立して検証できる</small></td><td>Mockito / Jest mock</td><td>外部依存を分離</td></tr>
      </tbody>
    </table>
  </div>
  <ul class="checklist" style="margin-top:.75rem">
    <li><input type="checkbox" id="t1-1"><label for="t1-1">テスト設計書（テストケース一覧）を作成した</label></li>
    <li><input type="checkbox" id="t1-2"><label for="t1-2">全テストケースを実行し、結果を記録した</label></li>
    <li><input type="checkbox" id="t1-3"><label for="t1-3">カバレッジを計測し、目標値を達成した</label></li>
    <li><input type="checkbox" id="t1-4"><label for="t1-4">バグを記録し、修正・再テストを完了した</label></li>
    <li><input type="checkbox" id="t1-5"><label for="t1-5">単体テスト完了判定基準を満たしていることを確認した</label></li>
  </ul>
</div>

<div class="test-level-card integ">
  <h3>🟢 STEP 2 — 結合テスト</h3>
  <div class="meta">
    <span class="badge badge-success">目安: 5〜8日</span>
    <span class="badge badge-gray">主担当: SE・プログラマー</span>
    <span class="badge badge-gray">参照: D-03 API仕様書、D-06 物理ER図</span>
  </div>
  <p class="text-sm">API〜DB、API〜画面が繋がって正しく動作するかを検証します。</p>
  <div class="table-wrap" style="margin-top:.75rem">
    <table>
      <thead><tr><th>テスト種別</th><th>ツール</th><th>確認内容</th></tr></thead>
      <tbody>
        <tr><td>APIテスト</td><td>Postman / curl / REST Assured</td><td>正常・異常レスポンス、認証</td></tr>
        <tr><td>DB連携テスト</td><td>—</td><td>CRUD操作、トランザクション</td></tr>
        <tr><td>画面→API→DB テスト</td><td>Playwright / Cypress</td><td>エンドツーエンド動作</td></tr>
      </tbody>
    </table>
  </div>
  <ul class="checklist" style="margin-top:.75rem">
    <li><input type="checkbox" id="t2-1"><label for="t2-1">結合テスト計画書を作成した</label></li>
    <li><input type="checkbox" id="t2-2"><label for="t2-2">テストデータを準備した（本番類似データ）</label></li>
    <li><input type="checkbox" id="t2-3"><label for="t2-3">API エンドポイントを全件テストした</label></li>
    <li><input type="checkbox" id="t2-4"><label for="t2-4">エラーレスポンスが仕様どおりに返ることを確認した</label></li>
    <li><input type="checkbox" id="t2-5"><label for="t2-5">バグを記録し、修正・再テストを完了した</label></li>
  </ul>
</div>

<div class="test-level-card system">
  <h3>🟡 STEP 3 — システムテスト</h3>
  <div class="meta">
    <span class="badge badge-warning">目安: 3〜5日</span>
    <span class="badge badge-gray">主担当: SE</span>
    <span class="badge badge-gray">参照: 基本設計書 B-01〜B-19、要件定義書</span>
  </div>
  <p class="text-sm">業務シナリオ全体が要件定義書の要件を満たしているかを検証します。ブラックボックステストが中心です。</p>
  <ul class="checklist" style="margin-top:.75rem">
    <li><input type="checkbox" id="t3-1"><label for="t3-1">業務シナリオテストケースを作成した（要件定義書からトレース）</label></li>
    <li><input type="checkbox" id="t3-2"><label for="t3-2">全シナリオを実行し、結果を記録した</label></li>
    <li><input type="checkbox" id="t3-3"><label for="t3-3">性能テスト（k6 / JMeter等）を実施した<br><small class="text-muted">目標: 非機能要件設計書の数値を満たすこと</small></label></li>
    <li><input type="checkbox" id="t3-4"><label for="t3-4">セキュリティテスト（脆弱性診断）を実施した</label></li>
    <li><input type="checkbox" id="t3-5"><label for="t3-5">バグを重大度分類し、重大・高バグが0件になった</label></li>
  </ul>
</div>

<div class="test-level-card" id="release" style="border-left-color:#1f2937">
  <h3>🔴 STEP 4 — テスト完了判定</h3>
  <div class="meta">
    <span class="badge badge-gray">目安: 1日</span>
    <span class="badge badge-gray">主担当: SE・PL</span>
  </div>
  <div class="callout callout-warning" style="margin-bottom:.75rem">
    <span class="callout-icon">⚖️</span>
    <div class="callout-body">
      <b>バグ重大度分類</b><br>
      🔴 <b>重大 (Sev-1)</b>: 業務継続不可、データ消失<br>
      🟠 <b>高 (Sev-2)</b>: 主要機能が動作しない<br>
      🟡 <b>中 (Sev-3)</b>: 機能は動くが一部動作不良<br>
      🟢 <b>低 (Sev-4)</b>: 軽微な表示崩れ等
    </div>
  </div>
  <ul class="checklist">
    <li><input type="checkbox" id="t4-1"><label for="t4-1">重大(Sev-1)バグが 0件であることを確認した</label></li>
    <li><input type="checkbox" id="t4-2"><label for="t4-2">高(Sev-2)バグが 0件であることを確認した</label></li>
    <li><input type="checkbox" id="t4-3"><label for="t4-3">テスト消化率が目標値（95%以上）を超えていることを確認した</label></li>
    <li><input type="checkbox" id="t4-4"><label for="t4-4">残存バグの受け入れ基準を関係者が合意した</label></li>
    <li><input type="checkbox" id="t4-5"><label for="t4-5">リリース判定会議で承認を得た</label></li>
  </ul>
</div>

<div class="test-level-card uat">
  <h3>🔴 STEP 5 — 受入テスト（UAT）</h3>
  <div class="meta">
    <span class="badge badge-danger">目安: 5〜10日</span>
    <span class="badge badge-gray">主担当: 顧客・SE</span>
  </div>
  <p class="text-sm">顧客・エンドユーザーが実際の業務シナリオで動作確認・承認するテストです。</p>
  <ul class="checklist" style="margin-top:.75rem">
    <li><input type="checkbox" id="t5-1"><label for="t5-1">UATシナリオを顧客と共同で作成した（<a href="../reference/templates.html">T-10テンプレート使用</a>）</label></li>
    <li><input type="checkbox" id="t5-2"><label for="t5-2">UAT環境を準備した（本番データのサブセット）</label></li>
    <li><input type="checkbox" id="t5-3"><label for="t5-3">顧客担当者へのUAT手順説明・操作研修を実施した</label></li>
    <li><input type="checkbox" id="t5-4"><label for="t5-4">全シナリオを顧客が実行し、結果を記録した</label></li>
    <li><input type="checkbox" id="t5-5"><label for="t5-5">UAT完了確認書に顧客の承認署名を取得した</label></li>
  </ul>
</div>

<div class="test-level-card release">
  <h3>🟣 STEP 6 — リリース・カットオーバー</h3>
  <div class="meta">
    <span class="badge badge-purple">目安: 1〜2日（準備含む）</span>
    <span class="badge badge-gray">主担当: SE・インフラ・PL</span>
  </div>
  <div class="table-wrap" style="margin-top:.75rem;margin-bottom:.75rem">
    <table>
      <thead><tr><th>フェーズ</th><th>作業内容</th><th>担当</th></tr></thead>
      <tbody>
        <tr><td>カットオーバー前日</td><td>本番環境最終確認・バックアップ取得</td><td>インフラ担当</td></tr>
        <tr><td>カットオーバー当日（開始）</td><td>旧システム停止・データ移行</td><td>SE・インフラ</td></tr>
        <tr><td>カットオーバー当日（確認）</td><td>スモークテスト実施</td><td>SE</td></tr>
        <tr><td>カットオーバー後</td><td>稼働監視・ヘルプデスク対応</td><td>SE・運用担当</td></tr>
        <tr><td>バックアウト判定（if）</td><td>本番停止・旧システム切替戻し</td><td>PL判断・全員</td></tr>
      </tbody>
    </table>
  </div>
  <ul class="checklist">
    <li><input type="checkbox" id="t6-1"><label for="t6-1">カットオーバー手順書（<a href="../reference/templates.html">T-11テンプレート</a>）を作成した</label></li>
    <li><input type="checkbox" id="t6-2"><label for="t6-2">バックアウト手順と判定基準を合意した</label></li>
    <li><input type="checkbox" id="t6-3"><label for="t6-3">リリース前の本番環境バックアップを取得した</label></li>
    <li><input type="checkbox" id="t6-4"><label for="t6-4">スモークテストを実施し、主要機能の動作を確認した<br><small class="text-muted">スモークテスト（Smoke Test）＝「起動して煙が出ないか」を確認する最低限のテスト。全機能を詳しく検証するのではなく、ログインできるか・主要画面が表示されるか・基本的なCRUDが動くかを素早く確認する。カットオーバー直後に実施し、NGなら即バックアウトを判断する材料になる</small></label></li>
    <li><input type="checkbox" id="t6-5"><label for="t6-5">稼働開始を関係者に周知した</label></li>
  </ul>
</div>

## 📅 作業フロー表

<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>STEP</th><th>作業内容</th><th>目安日数（小規模）</th><th>担当</th></tr></thead>
      <tbody>
        <tr><td>STEP 1</td><td>単体テスト実施</td><td>3〜5日</td><td>プログラマー（SEが確認）</td></tr>
        <tr><td>STEP 2</td><td>結合テスト実施</td><td>5〜8日</td><td>SE・プログラマー</td></tr>
        <tr><td>STEP 3</td><td>システムテスト実施</td><td>3〜5日</td><td>SE</td></tr>
        <tr><td>STEP 4</td><td>テスト完了判定</td><td>1日</td><td>SE・PL</td></tr>
        <tr><td>STEP 5</td><td>受入テスト（UAT）</td><td>5〜10日</td><td>顧客・SE</td></tr>
        <tr><td>STEP 6</td><td>リリース・カットオーバー</td><td>1〜2日</td><td>SE・インフラ・PL</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 🐛 バグ票テンプレート

<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>項目</th><th>記載内容</th></tr></thead>
      <tbody>
        <tr><td>バグID</td><td>BUG-001（連番管理）</td></tr>
        <tr><td>発見日</td><td>YYYY-MM-DD</td></tr>
        <tr><td>発見者</td><td>氏名</td></tr>
        <tr><td>対象STEP</td><td>単体 / 結合 / システム / UAT</td></tr>
        <tr><td>重大度</td><td>Sev-1（重大）/ Sev-2（高）/ Sev-3（中）/ Sev-4（低）</td></tr>
        <tr><td>現象</td><td>実際に起きたこと（スクリーンショット添付）</td></tr>
        <tr><td>再現手順</td><td>①〜③ 番号で記載</td></tr>
        <tr><td>期待結果</td><td>設計書・仕様書の記載内容</td></tr>
        <tr><td>実際の結果</td><td>発生している現象</td></tr>
        <tr><td>原因</td><td>（修正担当が記載）</td></tr>
        <tr><td>修正内容</td><td>（修正担当が記載）</td></tr>
        <tr><td>修正日</td><td>YYYY-MM-DD</td></tr>
        <tr><td>確認日</td><td>YYYY-MM-DD</td></tr>
        <tr><td>ステータス</td><td>未着手 / 対応中 / 確認待ち / クローズ</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 📚 プロジェクトクローズ — 教訓（Lessons Learned）

<div class="callout callout-info">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <b>PMBOKにおける教訓（Lessons Learned）とは</b><br>
    プロジェクトで経験した「うまくいったこと」「うまくいかなかったこと」「次回に活かすべきこと」を記録し、組織の知識資産として残すプロセスです。<br>
    カットオーバー後に必ずチームで振り返りを行い、次のプロジェクトに活かします。「炎上した原因」だけでなく「うまくいった理由」も同様に重要です。
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#dcfce7">📚</span><h2>教訓登録簿テンプレート</h2></div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>No.</th><th>フェーズ</th><th>区分</th><th>事象（何が起きたか）</th><th>原因・背景</th><th>対処・結果</th><th>次回への推奨アクション</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>LL-001</td><td>基本設計</td><td><span class="badge badge-danger">改善</span></td>
          <td>外部IF仕様の確定が2週間遅延し、詳細設計がブロックされた</td>
          <td>連携先担当者との確認会議を設定していなかった</td>
          <td>週次確認MTGを設定して解消。最終的に1週間遅延</td>
          <td>STEP 4完了前に連携先との定例会議を設定する</td>
        </tr>
        <tr>
          <td>LL-002</td><td>実装</td><td><span class="badge badge-success">成功</span></td>
          <td>OpenAPIでモックサーバーを立てたことでFE・BE並行開発ができた</td>
          <td>詳細設計フェーズでD-03を最初に完成させる方針を採用</td>
          <td>FE開発が2週間早く開始できた</td>
          <td>次回もD-03（OpenAPI）を最優先で完成させる</td>
        </tr>
        <tr>
          <td>LL-003</td><td>テスト</td><td><span class="badge badge-danger">改善</span></td>
          <td>結合テスト直前にテスト環境が未整備で3日間テストが開始できなかった</td>
          <td>テスト環境整備をテスト開始直前まで後回しにした</td>
          <td>緊急でインフラ担当が環境を構築。3日遅延</td>
          <td>STEP 8（開発環境整備）でステージング・テスト環境を同時に整備する</td>
        </tr>
        <tr style="opacity:.6">
          <td>LL-XXX</td><td colspan="6">← プロジェクト固有の教訓を追記する</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-success" style="margin-top:1rem">
    <span class="callout-icon">✅</span>
    <div class="callout-body">
      <b>振り返りミーティングの進め方（KPT法）</b><br>
      <b>Keep</b>（続けること）：うまくいったプロセス・取り組みは何か？<br>
      <b>Problem</b>（問題だったこと）：困ったこと・うまくいかなかったことは何か？<br>
      <b>Try</b>（次回試すこと）：Problemへの対策として次回に具体的に何を変えるか？<br><br>
      ミーティングは「責任追及」ではなく「改善」が目的です。非難なしのルール（No-blame culture）で進めます。
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e0e7ff">🏁</span><h2>プロジェクトクローズチェックリスト</h2></div>
  <ul class="checklist">
    <li><input type="checkbox" id="cl-1"><label for="cl-1">カットオーバー後の稼働監視（最低1週間）が完了した</label></li>
    <li><input type="checkbox" id="cl-2"><label for="cl-2">残存バグの対応計画（次期リリースまたはホットフィックス）を顧客と合意した</label></li>
    <li><input type="checkbox" id="cl-3"><label for="cl-3">全成果物（設計書・テスト結果・ソースコード・環境情報）を所定の場所に保管した</label></li>
    <li><input type="checkbox" id="cl-4"><label for="cl-4">運用チームへの引き継ぎ（運用手順書説明・権限移管）が完了した</label></li>
    <li><input type="checkbox" id="cl-5"><label for="cl-5">教訓登録簿（Lessons Learned）を作成し、チーム・組織で共有した</label></li>
    <li><input type="checkbox" id="cl-6"><label for="cl-6">プロジェクトクローズ報告書をPL・顧客に提出し、正式承認を得た</label></li>
    <li><input type="checkbox" id="cl-7"><label for="cl-7">リスク登録簿・変更要求票・課題管理票を最終版としてアーカイブした</label></li>
  </ul>
</div>
