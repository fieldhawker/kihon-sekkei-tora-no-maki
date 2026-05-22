---
title: 基本設計 成果物ガイド
subtitle: Phase 1 — 成果物ガイド
phase: basic
description: 基本設計フェーズで作成する B-01〜B-19 の成果物について、使うツール・作り方・注意点をまとめています。
---

<div class="callout callout-info" style="margin-top:0">
  <span class="callout-icon">🧩</span>
  <div class="callout-body">
    <b>初心者向け：まず押さえる「必須」成果物</b><br>
    最低限ここが揃うと、関係者と合意しやすく手戻りが減ります：<b>B-01（構成）</b>、<b>B-02（ADR）</b>、<b>B-03/04（機能・画面一覧）</b>、<b>B-07（API概要）</b>、<b>B-09/10（ER・テーブル）</b>、<b>B-14/15（セキュリティ・権限）</b>、<b>B-18（総括）</b>。
  </div>
</div>

## 作成のおすすめ順（迷ったときの道順）

<div class="card">
  <ol style="padding-left:1.5rem;font-size:.875rem;line-height:2">
    <li><b>B-01</b> システム構成図（論理→物理）</li>
    <li><b>B-02</b> 技術スタック選定書（ADR）</li>
    <li><b>B-03〜B-07</b> 機能・画面・遷移・APIの骨格（「何を作るか」を固める）</li>
    <li><b>B-09〜B-11</b> データ設計（主要機能が固まってから）</li>
    <li><b>B-12〜B-17</b> 外部IF / 非機能 / セキュリティ / 運用・移行</li>
    <li><b>B-18〜B-19</b> 取りまとめ（総括・トレーサビリティ）</li>
  </ol>
</div>

## 成果物一覧（B-01〜B-19）

<div class="deliverable-grid">
  <a class="deliverable-item" href="#b01"><span class="deliverable-code">B-01</span>システム構成図</a>
  <a class="deliverable-item" href="#b02"><span class="deliverable-code">B-02</span>技術スタック選定書（ADR）</a>
  <a class="deliverable-item" href="#b03"><span class="deliverable-code">B-03</span>機能一覧</a>
  <a class="deliverable-item" href="#b04"><span class="deliverable-code">B-04</span>画面一覧</a>
  <a class="deliverable-item" href="#b05"><span class="deliverable-code">B-05</span>画面レイアウト定義書</a>
  <a class="deliverable-item" href="#b06"><span class="deliverable-code">B-06</span>画面遷移図</a>
  <a class="deliverable-item" href="#b07"><span class="deliverable-code">B-07</span>API一覧（概要版）</a>
  <a class="deliverable-item" href="#b08"><span class="deliverable-code">B-08</span>バッチ一覧</a>
  <a class="deliverable-item" href="#b09"><span class="deliverable-code">B-09</span>ER図（概念・論理）</a>
  <a class="deliverable-item" href="#b10"><span class="deliverable-code">B-10</span>テーブル定義書</a>
  <a class="deliverable-item" href="#b11"><span class="deliverable-code">B-11</span>マスタデータ定義書</a>
  <a class="deliverable-item" href="#b12"><span class="deliverable-code">B-12</span>外部IF設計書</a>
  <a class="deliverable-item" href="#b13"><span class="deliverable-code">B-13</span>非機能要件設計書</a>
  <a class="deliverable-item" href="#b14"><span class="deliverable-code">B-14</span>セキュリティ設計書</a>
  <a class="deliverable-item" href="#b15"><span class="deliverable-code">B-15</span>権限マトリクス</a>
  <a class="deliverable-item" href="#b16"><span class="deliverable-code">B-16</span>運用設計書</a>
  <a class="deliverable-item" href="#b17"><span class="deliverable-code">B-17</span>移行設計書</a>
  <a class="deliverable-item" href="#b18"><span class="deliverable-code">B-18</span>基本設計書（総括）</a>
  <a class="deliverable-item" href="#b19"><span class="deliverable-code">B-19</span>トレーサビリティマトリクス</a>
</div>

## 各成果物の詳細（B-01〜B-19）

<div class="card" id="b01">
  <div class="card-header"><span class="card-icon" style="background:#dbeafe">🧩</span><h2>B-01 システム構成図</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: システムの全体像（何が・どこに・どう繋がるか）を関係者で合意する。</li>
    <li><b>記載する内容（最低限）</b>: 利用者/外部システム、フロント/バック/DB/インフラ、ネットワーク境界、主要通信（HTTP/S、MQ、バッチ等）、環境（本番/検証）差分。</li>
    <li><b>作り方のコツ</b>: まず論理構成（役割）→ 次に物理配置（クラウド/オンプレ、AZ/リージョン）に落とす。凡例（アイコンの意味）を付ける。</li>
    <li><b>レビュー観点</b>: 単一障害点、外部接続の出口/入口、監視対象、データの保管場所が説明できる。</li>
    <li><b>成果物形式</b>: 図（PNG/PDF）＋編集元（drawio/Figmaファイル）をセットで保管。</li>
  </ul>
</div>

<div class="card" id="b02">
  <div class="card-header"><span class="card-icon" style="background:#dcfce7">🧠</span><h2>B-02 技術スタック選定書（ADR）</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 「なぜその技術を採用したか」を後から説明できる状態にする（属人化防止）。</li>
    <li><b>記載する内容</b>: 背景/課題、意思決定（採用/不採用）、代替案、判断基準（性能・コスト・運用・人材・制約）、影響範囲、未決事項（TBD）。</li>
    <li><b>対象例</b>: クラウド/オンプレ、DB、言語/フレームワーク、CI/CD、認証方式、ログ/監視、メッセージング。</li>
    <li><b>レビュー観点</b>: 要件（特に非機能）と矛盾がない／採用理由が「好み」になっていない。</li>
    <li><b>成果物形式</b>: Markdown（ADR形式）推奨。1意思決定=1ファイル。</li>
  </ul>
</div>

<div class="card" id="b03">
  <div class="card-header"><span class="card-icon" style="background:#fef9c3">🧩</span><h2>B-03 機能一覧</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 作る/作らないの境界と、全体の機能スコープを確定する。</li>
    <li><b>推奨カラム</b>: 機能ID、機能名、概要、対象ユーザー/ロール、優先度（Must/Should/Could）、リリース区分、関連画面ID、関連API、備考/TBD。</li>
    <li><b>粒度の目安</b>: 1機能=「ユーザーが達成したい目的」単位（CRUDの羅列になりすぎない）。</li>
    <li><b>レビュー観点</b>: 要件の抜け漏れ、重複、権限により機能が分岐する点の明確化。</li>
  </ul>
</div>

<div class="card" id="b04">
  <div class="card-header"><span class="card-icon" style="background:#e0e7ff">🖥️</span><h2>B-04 画面一覧</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 画面単位でのスコープと、ユーザー導線の棚卸しを行う。</li>
    <li><b>推奨カラム</b>: 画面ID、画面名、概要、URL/ルート、対象ロール、主要機能ID、遷移元/遷移先、備考。</li>
    <li><b>レビュー観点</b>: 画面IDと遷移図の整合、権限差による表示/操作差、ログイン前後の導線。</li>
    <li><b>成果物形式</b>: Excel/スプレッドシート推奨（フィルタ・ソート前提）。</li>
  </ul>
</div>

<div class="card" id="b05">
  <div class="card-header"><span class="card-icon" style="background:#fae8ff">🧱</span><h2>B-05 画面レイアウト定義書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 各画面の「項目・配置・操作」を合意し、実装/テストの基準にする。</li>
    <li><b>記載する内容</b>: ワイヤーフレーム、各UI要素（項目ID、ラベル、型、必須/任意、バリデーション、初期値、活性条件、表示条件）、エラーメッセージ方針、一覧の検索/ソート/ページング。</li>
    <li><b>レビュー観点</b>: 画面から発生する操作（登録/更新/承認など）とAPI・権限の整合、業務ルールの抜け。</li>
    <li><b>成果物形式</b>: Figma等の図＋（必要に応じて）Excelで項目定義を補完。</li>
  </ul>
</div>

<div class="card" id="b06">
  <div class="card-header"><span class="card-icon" style="background:#cffafe">🧭</span><h2>B-06 画面遷移図</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: ユーザーの操作導線と状態遷移（戻り/分岐/例外）を可視化する。</li>
    <li><b>記載する内容</b>: 画面ID、遷移の向き、遷移条件（ボタン/リンク/状態）、ログイン要否、例外導線（権限なし/エラー時）。</li>
    <li><b>レビュー観点</b>: 行き止まりがない／同じ画面への複数経路がある場合の条件が明確／権限で遷移が変わる箇所の明記。</li>
  </ul>
</div>

<div class="card" id="b07">
  <div class="card-header"><span class="card-icon" style="background:#fff7ed">🔌</span><h2>B-07 API一覧（概要版）</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 画面/機能が必要とするAPIの輪郭をそろえ、抜け漏れと責務分割を早期に潰す。</li>
    <li><b>推奨カラム</b>: API ID、エンドポイント、HTTPメソッド、概要、認証要否、対象ロール、主なリクエスト項目、主なレスポンス項目、エラー/例外、呼び出し元画面ID。</li>
    <li><b>レビュー観点</b>: 一覧/詳細/登録/更新/削除の基本パターンが揃う、権限・監査ログ・入力バリデーション方針と矛盾しない。</li>
    <li><b>詳細設計フェーズでの方針</b>: このAPI一覧を土台に OpenAPI（完全版）へ拡張する。</li>
  </ul>
</div>

<div class="card" id="b08">
  <div class="card-header"><span class="card-icon" style="background:#f1f5f9">⏱️</span><h2>B-08 バッチ一覧</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 人手作業/定期処理/連携処理を棚卸しし、運用・監視・再実行の方針を決める。</li>
    <li><b>推奨カラム</b>: バッチID、名称、目的、起動方式（手動/スケジュール/API）、頻度、入力/出力、対象データ、想定処理時間、失敗時の扱い（リトライ/再実行/補正）、ログ/通知。</li>
    <li><b>レビュー観点</b>: 二重起動防止、再実行しても壊れない（冪等性）、締め時間や業務都合の制約を反映。<br><small class="text-muted" style="color:var(--gray-500)">💡 冪等性（べきとうせい）とは：何度実行しても同じ結果になること。バッチを再実行したとき、データが二重登録されない・二重送信されないように設計することが求められます</small></li>
  </ul>
</div>

<div class="card" id="b09">
  <div class="card-header"><span class="card-icon" style="background:#fef9c3">🗄️</span><h2>B-09 ER図（概念・論理）</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 業務データの構造と関連（1:N、N:M、必須/任意）を合意する。</li>
    <li><b>記載する内容</b>: エンティティ、主キー、主要属性、リレーション、カーディナリティ、参照整合性の方針。</li>
    <li><b>レビュー観点</b>: 正規化、履歴の持ち方、削除方針（論理削除/物理削除）、マスタ/トランの切り分け。</li>
  </ul>
</div>

<div class="card" id="b10">
  <div class="card-header"><span class="card-icon" style="background:#fffbeb">📚</span><h2>B-10 テーブル定義書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 実装・移行・テストで参照するデータ項目の単一の正とする。</li>
    <li><b>推奨項目</b>: テーブル物理名/論理名、カラム物理名/論理名、型（目安で可）、必須、主キー/外部キー、制約、デフォルト、備考。</li>
    <li><b>レビュー観点</b>: 命名規約の統一、NULL許容の妥当性、ユニーク制約、監査項目（作成/更新者・日時）の方針。</li>
  </ul>
</div>

<div class="card" id="b11">
  <div class="card-header"><span class="card-icon" style="background:#ecfccb">🏷️</span><h2>B-11 マスタデータ定義書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 区分値/コード値の一覧化と、初期投入・変更運用の前提を揃える。</li>
    <li><b>推奨カラム</b>: マスタID、名称、コード、表示名、並び順、有効フラグ、説明、初期値、変更権限/運用ルール。</li>
    <li><b>レビュー観点</b>: 多言語/表示ラベル変更の可能性、廃止時の扱い、外部連携コードとの整合。</li>
  </ul>
</div>

<div class="card" id="b12">
  <div class="card-header"><span class="card-icon" style="background:#e5e7eb">🔁</span><h2>B-12 外部IF設計書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 外部システム連携の「契約」を明文化し、双方の責任分界を合意する。</li>
    <li><b>記載する内容</b>: 連携先、方向（送信/受信）、方式（API/CSV/SFTP/MQ等）、認証、頻度、タイムアウト/リトライ、データ項目定義、例外時の扱い、連携試験の観点。</li>
    <li><b>レビュー観点</b>: 文字コード/改行/タイムゾーン、冪等性（何度送っても同じ結果になるか）、再送/重複、個人情報の扱い（暗号化・マスキング）。</li>
  </ul>
</div>

<div class="card" id="b13">
  <div class="card-header"><span class="card-icon" style="background:#fee2e2">⚙️</span><h2>B-13 非機能要件設計書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 性能・可用性・保守性などの「やり方」を設計し、実装の指針にする。</li>
    <li><b>章立て例</b>: 性能（応答/スループット/同時数）、可用性（冗長化/復旧目標）、運用監視（ログ/メトリクス/アラート）、バックアップ/DR、拡張性、制約（コスト上限等）。</li>
    <li><b>レビュー観点</b>: 数値目標がある／根拠がある／測定方法（負荷試験・監視指標）が書かれている。</li>
  </ul>
</div>

<div class="card" id="b14">
  <div class="card-header"><span class="card-icon" style="background:#dbeafe">🛡️</span><h2>B-14 セキュリティ設計書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: セキュリティ要件を、実装・運用に落ちる設計にする。</li>
    <li><b>記載する内容</b>: 認証（方式/多要素）、認可（RBAC/ABAC）、入力検証、暗号化（保存/通信）、ログ/監査、脆弱性対策（OWASP等）、秘密情報管理、権限運用。<br><small class="text-muted" style="color:var(--gray-500)">💡 RBAC（ロールベースアクセス制御）＝ロール（役割）単位で権限を定義。ABAC（属性ベースアクセス制御）＝ロールだけでなく部署・職位などユーザーの属性に基づいてアクセスを制御する方式。多くのWebシステムはRBACで十分です</small></li>
    <li><b>レビュー観点</b>: 個人情報/機密情報の流れ、権限の最小化、監査ログの保存期間、インシデント対応（検知〜封じ込め）。</li>
  </ul>
</div>

<div class="card" id="b15">
  <div class="card-header"><span class="card-icon" style="background:#cffafe">🔐</span><h2>B-15 権限マトリクス</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 「誰が何をできるか」を表で合意し、漏れによる手戻りを防ぐ。</li>
    <li><b>書き方</b>: 行=機能/画面/操作、列=ロール、セル=可否（✅/❌）＋条件（自分のみ/部署内等）を明記。</li>
    <li><b>レビュー観点</b>: 管理系操作（ユーザー/マスタ/権限変更）、例外運用（代理承認等）、監査ログの要否。</li>
  </ul>
</div>

<div class="card" id="b16">
  <div class="card-header"><span class="card-icon" style="background:#f1f5f9">🧰</span><h2>B-16 運用設計書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 稼働後の運用手順・監視・問い合わせ対応を標準化する。</li>
    <li><b>章立て例</b>: 監視（メトリクス/アラート）、ログ（収集/保管/検索）、障害対応（切り分け/復旧）、定常作業（マスタ更新、バッチ運用）、権限申請、SLA/受付窓口。</li>
    <li><b>レビュー観点</b>: 誰が・何を・どの手順で・どの時間帯に対応するかが具体的。</li>
  </ul>
</div>

<div class="card" id="b17">
  <div class="card-header"><span class="card-icon" style="background:#ffedd5">🚚</span><h2>B-17 移行設計書</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 旧→新へのデータ/業務移行の方針と手順を合意し、切替時の事故を防ぐ。</li>
    <li><b>記載する内容</b>: 対象データ、移行方式（全量/差分）、移行元/移行先、マッピング、検証方法、リハーサル計画、切替手順、ロールバック。</li>
    <li><b>レビュー観点</b>: 移行時の停止許容時間、移行データ品質（欠損/重複）、責任分界（誰が抽出/投入）。</li>
  </ul>
</div>

<div class="card" id="b18">
  <div class="card-header"><span class="card-icon" style="background:#dcfce7">📘</span><h2>B-18 基本設計書（総括）</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: B-01〜B-17の内容を「1冊のストーリー」にまとめ、レビュー・承認を通す。</li>
    <li><b>含めるべきもの</b>: 目的/背景、前提/制約、全体構成、主要な判断（B-02参照）、設計方針、残課題（TBD）と解決計画。</li>
    <li><b>レビュー観点</b>: 各成果物への参照が揃っている／矛盾がない／未決が放置されていない。</li>
  </ul>
</div>

<div class="card" id="b19">
  <div class="card-header"><span class="card-icon" style="background:#e0e7ff">🔗</span><h2>B-19 トレーサビリティマトリクス</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.8">
    <li><b>目的</b>: 要件→設計→（将来）テストまでの対応関係を可視化し、抜け漏れを検出する。</li>
    <li><b>推奨カラム</b>: 要件ID、要件文、機能ID、画面ID、API ID、データ（テーブル/項目）、非機能項目、備考。</li>
    <li><b>レビュー観点</b>: 要件が未対応の行がない／設計が要件なしで増えていない（スコープ逸脱検知）。</li>
  </ul>
</div>

## ツール選定まとめ

<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>成果物</th><th>推奨ツール</th><th>代替ツール</th><th>ポイント</th></tr></thead>
      <tbody>
        <tr><td>B-01 システム構成図</td><td>Draw.io (diagrams.net)</td><td>Lucidchart、Mermaid</td><td>無料・Gitで管理可能なXML形式</td></tr>
        <tr><td>B-02 技術スタック選定書</td><td>Markdown + Git (ADR形式)</td><td>Confluence</td><td>コードと同じリポジトリで管理</td></tr>
        <tr><td>B-03〜B-04 機能・画面一覧</td><td>Excel</td><td>Notion、Google Sheets</td><td>フィルタ・ソートが便利</td></tr>
        <tr id="api"><td>B-05〜B-06 画面設計</td><td>Figma</td><td>Adobe XD、Balsamiq</td><td>コメント機能・共有が便利</td></tr>
        <tr><td>B-07 API一覧</td><td>OpenAPI (YAML) + Swagger UI</td><td>Excel</td><td>詳細設計でOpenAPI完全版に発展</td></tr>
        <tr id="data"><td>B-09 ER図</td><td>dbdiagram.io</td><td>A5:SQL Mk-2、ERD Plus</td><td>ブラウザ完結・無料・共有URL生成</td></tr>
        <tr><td>B-10 テーブル定義書</td><td>A5:SQL Mk-2（Excel出力）</td><td>Excel手動作成</td><td>ER図→Excel出力の自動化が便利</td></tr>
        <tr id="security"><td>B-14 セキュリティ設計書</td><td>Excel / Markdown</td><td>Confluence</td><td>OWASP対策チェックリスト形式推奨</td></tr>
        <tr><td>B-15 権限マトリクス</td><td>Excel</td><td>Google Sheets</td><td>行=機能、列=ロール の表形式</td></tr>
        <tr><td>B-19 トレーサビリティ</td><td>Excel</td><td>Jira、Notion</td><td>要件ID → 設計書の対応を管理</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 成果物別の作成ガイド（詳細）

<div class="callout callout-info" style="margin-top:.5rem">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    ここでは各成果物について、<b>テンプレ（章立て/カラム）</b>と<b>具体例</b>を用意しています。迷ったら「例の粒度」まで書けば、レビューで詰まりにくくなります。
  </div>
</div>

<h2 class="section-title" id="b01-guide"><span class="title-icon">🧩</span> B-01 システム構成図（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#dbeafe">🧩</span><h2>構成図の"型"（論理→物理）</h2></div>
  <ol style="padding-left:1.5rem;font-size:.875rem;line-height:2">
    <li><b>論理構成</b>: 「役割」を描く（例：Web、API、DB、バッチ、外部IF、監視、認証）。</li>
    <li><b>通信経路</b>: 矢印に「プロトコル/ポート/方向」を書く（例：HTTPS 443、SFTP 22）。</li>
    <li><b>境界</b>: インターネット/社内/クラウドVPC、FW/SG、VPN/閉域などを枠で表現。</li>
    <li><b>物理構成</b>: リージョン/AZ、冗長化（Active-Active等）、スケール方式を落とす。</li>
    <li><b>運用要素</b>: ログ収集、監視、バックアップ、ジョブ管理を「別枠」で必ず入れる。</li>
  </ol>
  <div class="table-wrap" style="margin-top:1rem">
    <table>
      <thead><tr><th>図の種類</th><th>何が分かるか</th><th>最低限の要素</th></tr></thead>
      <tbody>
        <tr><td>論理構成図</td><td>責務分割・連携関係</td><td>役割、外部IF、主要データの流れ</td></tr>
        <tr><td>物理構成図</td><td>配置・冗長化・障害影響</td><td>リージョン/AZ、LB、冗長化、ネットワーク境界</td></tr>
        <tr><td>ネットワーク概略</td><td>境界/出口/入口</td><td>公開/非公開、VPN、FW/SG、到達性</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b02-guide"><span class="title-icon">🧠</span> B-02 技術スタック選定書（ADR）（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#dcfce7">🧠</span><h2>ADRテンプレ（1意思決定=1枚）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>項目</th><th>書く内容</th><th>例</th></tr></thead>
      <tbody>
        <tr><td>Context</td><td>背景/制約/課題</td><td>ピーク同時接続、運用体制、既存資産</td></tr>
        <tr><td>Decision</td><td>採用/不採用</td><td>DBはPostgreSQLを採用</td></tr>
        <tr><td>Alternatives</td><td>比較対象</td><td>MySQL、SQL Server、Aurora等</td></tr>
        <tr><td>Consequences</td><td>影響/トレードオフ</td><td>運用負荷、コスト、学習コスト</td></tr>
        <tr><td>Open Issues</td><td>未決事項</td><td>DR方針、監視基盤の最終選定</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning" style="margin-top:.75rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">ADRに「採用理由」を書かないと、後から"好み"に見えます。<b>判断基準（数値/制約/運用体制）</b>を必ず明記します。</div>
  </div>
</div>

<h2 class="section-title" id="b03-guide"><span class="title-icon">🧩</span> B-03 機能一覧（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fef9c3">🧩</span><h2>機能一覧テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>機能ID</th><th>機能名</th><th>概要</th><th>対象ロール</th><th>優先度</th><th>関連（画面/API）</th></tr></thead>
      <tbody>
        <tr><td>F-001</td><td>申請の作成</td><td>ユーザーが申請を作成し下書き保存できる</td><td>一般</td><td>Must</td><td>SCR-010 / API-020</td></tr>
        <tr><td>F-002</td><td>申請の承認</td><td>承認者が承認・差戻しを行う</td><td>マネージャー</td><td>Must</td><td>SCR-020 / API-030</td></tr>
        <tr><td>F-003</td><td>マスタ管理</td><td>区分値を追加/無効化する</td><td>管理者</td><td>Should</td><td>SCR-900 / API-910</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info" style="margin-top:.75rem">
    <span class="callout-icon">📌</span>
    <div class="callout-body">粒度が荒すぎる/細かすぎる場合は、<b>「ユーザーの目的」</b>で区切り直すと整理しやすいです（CRUDの羅列だけにしない）。</div>
  </div>
</div>

<h2 class="section-title" id="b04-guide"><span class="title-icon">🖥️</span> B-04 画面一覧（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e0e7ff">🖥️</span><h2>画面一覧テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>画面ID</th><th>画面名</th><th>URL</th><th>対象ロール</th><th>主な操作</th><th>遷移元/遷移先</th></tr></thead>
      <tbody>
        <tr><td>SCR-010</td><td>申請作成</td><td>/requests/new</td><td>一般</td><td>作成/保存/提出</td><td>SCR-001 → SCR-020</td></tr>
        <tr><td>SCR-020</td><td>申請詳細</td><td>/requests/:id</td><td>一般/承認者</td><td>参照/差戻し</td><td>SCR-010 ↔ SCR-020</td></tr>
        <tr><td>SCR-900</td><td>マスタ管理</td><td>/admin/master</td><td>管理者</td><td>追加/無効化</td><td>SCR-800 → SCR-900</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b05-guide"><span class="title-icon">🧱</span> B-05 画面レイアウト定義書（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fae8ff">🧱</span><h2>項目定義（例：入力フォーム）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>項目ID</th><th>ラベル</th><th>型</th><th>必須</th><th>バリデーション</th><th>備考</th></tr></thead>
      <tbody>
        <tr><td>REQ-001</td><td>申請タイトル</td><td>text</td><td>必須</td><td>1〜100文字</td><td>全角/半角を許容</td></tr>
        <tr><td>REQ-002</td><td>申請種別</td><td>select</td><td>必須</td><td>マスタ参照</td><td>種別により後続項目の表示が変わる</td></tr>
        <tr><td>REQ-003</td><td>添付ファイル</td><td>file</td><td>任意</td><td>最大10MB、拡張子制限</td><td>ウイルススキャン方針をB-14に記載</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info" style="margin-top:.75rem">
    <span class="callout-icon">✅</span>
    <div class="callout-body">レビューで詰まりやすいのは <b>「活性条件/表示条件」</b> と <b>「エラー文言」</b> です。基本設計の段階で必ず明文化します。</div>
  </div>
</div>

<h2 class="section-title" id="b06-guide"><span class="title-icon">🧭</span> B-06 画面遷移図（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#cffafe">🧭</span><h2>遷移図に必ず入れる情報</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.9">
    <li><b>遷移のトリガー</b>: ボタン名/リンク名（例：［提出］押下）。</li>
    <li><b>条件分岐</b>: 状態/権限による遷移先の違い（例：承認権限なし→403画面）。</li>
    <li><b>例外導線</b>: バリデーションエラー、通信失敗、タイムアウト時の戻り。</li>
    <li><b>ログイン境界</b>: 未ログイン時に到達可能か（ログインへリダイレクト等）。</li>
  </ul>
  <div class="callout callout-warning" style="margin-top:.75rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">遷移図が「正常系だけ」だと手戻りになります。<b>権限NG・入力NG・通信NG</b>の導線を最低限追加します。</div>
  </div>
</div>

<h2 class="section-title" id="b07-guide"><span class="title-icon">🔌</span> B-07 API一覧（概要版）（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fff7ed">🔌</span><h2>API一覧テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>API ID</th><th>Method</th><th>Path</th><th>概要</th><th>認証</th><th>主なI/O</th><th>呼び出し元</th></tr></thead>
      <tbody>
        <tr><td>API-020</td><td>POST</td><td>/api/requests</td><td>申請作成</td><td>要</td><td>title, type → id</td><td>SCR-010</td></tr>
        <tr><td>API-030</td><td>POST</td><td>/api/requests/{id}/approve</td><td>承認</td><td>要</td><td>comment → status</td><td>SCR-020</td></tr>
        <tr><td>API-040</td><td>GET</td><td>/api/requests</td><td>一覧</td><td>要</td><td>filters → list</td><td>SCR-001</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info" style="margin-top:.75rem">
    <span class="callout-icon">🧩</span>
    <div class="callout-body">基本設計は"概要版"でOKですが、<b>認証要否・権限・主要エラー</b>だけは必ず埋めます（B-14/B-15と整合）。</div>
  </div>
</div>

<h2 class="section-title" id="b08-guide"><span class="title-icon">⏱️</span> B-08 バッチ一覧（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#f1f5f9">⏱️</span><h2>バッチ一覧テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>バッチID</th><th>名称</th><th>起動</th><th>頻度</th><th>入出力</th><th>失敗時</th></tr></thead>
      <tbody>
        <tr><td>JOB-001</td><td>日次集計</td><td>スケジュール</td><td>毎日 02:00</td><td>DB → 集計テーブル</td><td>通知→手動再実行</td></tr>
        <tr><td>JOB-002</td><td>外部CSV取込</td><td>手動</td><td>必要時</td><td>SFTP → DB</td><td>リトライ（最大3回）</td></tr>
      </tbody>
    </table>
  </div>
</div>

## データ設計（B-09〜B-11）詳細

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fef9c3">🗄️</span><h2>A5:SQL Mk-2 を使ったER図作成手順（DB接続なし）</h2></div>
  <ol style="padding-left:1.5rem;font-size:.875rem;line-height:2">
    <li>A5:SQL Mk-2 を起動 → [ファイル] → [新しいER図]</li>
    <li>[テーブル追加] ボタンでエンティティを作成</li>
    <li>各テーブルの列（カラム名・型・必須）を入力</li>
    <li>テーブル間を線でつなぎリレーションを設定（1:N / N:M）</li>
    <li>[出力] → [Excel/Word 出力] でテーブル定義書を自動生成</li>
  </ol>
  <div class="callout callout-info" style="margin-top:.75rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">基本設計時点では「論理名・型の目安」で可。物理的な桁数・インデックスは詳細設計（D-06〜D-09）で確定させます。</div>
  </div>
</div>

<div class="card" style="margin-top:1rem" id="b10-template">
  <div class="card-header"><span class="card-icon" style="background:#fffbeb">📚</span><h2>B-10 テーブル定義書テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>テーブル</th><th>カラム</th><th>論理名</th><th>型</th><th>必須</th><th>キー/制約</th><th>備考</th></tr></thead>
      <tbody>
        <tr><td>request</td><td>id</td><td>申請ID</td><td>UUID</td><td>必須</td><td>PK</td><td>採番方式は詳細設計で確定</td></tr>
        <tr><td>request</td><td>status</td><td>状態</td><td>varchar</td><td>必須</td><td>INDEX</td><td>マスタ（B-11）参照</td></tr>
        <tr><td>request</td><td>created_at</td><td>作成日時</td><td>timestamp</td><td>必須</td><td>-</td><td>タイムゾーン方針を明記</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="card" style="margin-top:1rem" id="b11-template">
  <div class="card-header"><span class="card-icon" style="background:#ecfccb">🏷️</span><h2>B-11 マスタデータ定義書テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>マスタ</th><th>コード</th><th>表示名</th><th>並び</th><th>有効</th><th>説明</th></tr></thead>
      <tbody>
        <tr><td>request_status</td><td>DRAFT</td><td>下書き</td><td>10</td><td>✅</td><td>提出前</td></tr>
        <tr><td>request_status</td><td>SUBMITTED</td><td>提出済み</td><td>20</td><td>✅</td><td>承認待ち</td></tr>
        <tr><td>request_status</td><td>REJECTED</td><td>差し戻し</td><td>30</td><td>✅</td><td>再編集が必要</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b12-guide"><span class="title-icon">🔁</span> B-12 外部IF設計書（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e5e7eb">🔁</span><h2>外部IFテンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>項目</th><th>例</th></tr></thead>
      <tbody>
        <tr><td>連携先</td><td>給与システム</td></tr>
        <tr><td>方向</td><td>送信（本システム→外部）</td></tr>
        <tr><td>方式</td><td>REST API（JSON）</td></tr>
        <tr><td>認証</td><td>mTLS / OAuth2 Client Credentials</td></tr>
        <tr><td>頻度</td><td>申請承認時に即時送信（失敗時は再送キュー）</td></tr>
        <tr><td>タイムアウト/リトライ</td><td>10秒 / 最大3回（指数バックオフ）</td></tr>
        <tr><td>エラー時</td><td>運用通知＋再送（冪等キー付き）</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b13-guide"><span class="title-icon">⚙️</span> B-13 非機能要件設計書（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fee2e2">⚙️</span><h2>"数値＋測り方"テンプレ</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>カテゴリ</th><th>目標（例）</th><th>測定/確認方法</th><th>備考</th></tr></thead>
      <tbody>
        <tr><td>性能（応答）</td><td>主要画面API p95 1.0秒以内</td><td>負荷試験、APM</td><td>対象APIを明記</td></tr>
        <tr><td>可用性</td><td>月間稼働率 99.9%</td><td>監視実績</td><td>計算方法も記載</td></tr>
        <tr><td>復旧</td><td>RTO 4時間 / RPO 24時間</td><td>DR手順、演習</td><td>制約がある場合は明記</td></tr>
        <tr><td>運用監視</td><td>重大障害は10分以内に検知</td><td>アラート設計</td><td>通知先・当番体制</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b14-guide"><span class="title-icon">🛡️</span> B-14 セキュリティ設計書（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#dbeafe">🛡️</span><h2>最低限のセキュリティ設計チェック</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>領域</th><th>書くこと（例）</th><th>判断材料</th></tr></thead>
      <tbody>
        <tr><td>認証</td><td>方式、MFA、セッション、パスワードポリシー</td><td>利用者属性、運用体制</td></tr>
        <tr><td>認可</td><td>RBAC/ABAC、権限粒度、管理者操作の制限</td><td>B-15と整合</td></tr>
        <tr><td>入力検証</td><td>サーバー側検証、ファイルアップロード制限</td><td>OWASP観点</td></tr>
        <tr><td>暗号化</td><td>通信TLS、保存暗号化、鍵管理</td><td>個人情報/機密区分</td></tr>
        <tr><td>監査ログ</td><td>誰が/いつ/何を、保存期間、参照権限</td><td>監査要件</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b15-example"><span class="title-icon">🔐</span> 権限マトリクス（B-15）の書き方</h2>
<div class="card">
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>機能 / 画面</th><th>一般ユーザー</th><th>マネージャー</th><th>管理者</th><th>システム管理者</th></tr>
      </thead>
      <tbody>
        <tr><td>ダッシュボード参照</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
        <tr><td>申請書 作成・提出</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
        <tr><td>申請書 承認・差し戻し</td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr>
        <tr><td>マスタデータ編集</td><td>❌</td><td>❌</td><td>✅</td><td>✅</td></tr>
        <tr><td>ユーザー管理</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td></tr>
        <tr><td>全データ参照</td><td>自分のみ</td><td>部署内</td><td>全件</td><td>全件</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning" style="margin-top:.75rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">権限マトリクスは必ず顧客と合意を取ること。後から「実はこのロールにはこの操作も必要だった」が最もよくある手戻りパターンです。</div>
  </div>
</div>

<h2 class="section-title" id="b16-guide"><span class="title-icon">🧰</span> B-16 運用設計書（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#f1f5f9">🧰</span><h2>運用手順（最低限の章立て）</h2></div>
  <ol style="padding-left:1.5rem;font-size:.875rem;line-height:2">
    <li><b>監視</b>: 何を監視し、閾値と通知先はどこか（障害の定義）。</li>
    <li><b>障害対応</b>: 受付→切り分け→復旧→報告のフロー（役割分担つき）。</li>
    <li><b>定常作業</b>: マスタ更新、バッチ実行、ユーザー/権限申請の手順。</li>
    <li><b>ログ運用</b>: 収集先、検索方法、保管期間、個人情報のマスキング。</li>
    <li><b>バックアップ</b>: 方式、頻度、復元手順、復元演習の計画。</li>
  </ol>
</div>

<h2 class="section-title" id="b17-guide"><span class="title-icon">🚚</span> B-17 移行設計書（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#ffedd5">🚚</span><h2>移行計画テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>項目</th><th>例</th></tr></thead>
      <tbody>
        <tr><td>対象</td><td>ユーザー、申請、マスタ（区分値）</td></tr>
        <tr><td>方式</td><td>初回全量＋切替前差分</td></tr>
        <tr><td>マッピング</td><td>旧コード→新コード（変換ルール）</td></tr>
        <tr><td>検証</td><td>件数一致、サンプル突合、業務観点の受入</td></tr>
        <tr><td>切替</td><td>停止時間、手順、ロールバック条件</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2 class="section-title" id="b18-guide"><span class="title-icon">📘</span> B-18 基本設計書（総括）（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#dcfce7">📘</span><h2>"1冊で通る"総括の作り方</h2></div>
  <ul style="padding-left:1.2rem;font-size:.875rem;line-height:1.9">
    <li><b>冒頭</b>: 目的/背景、前提/制約、用語、全体構成（どこに何が書いてあるか）。</li>
    <li><b>設計方針</b>: 重要な判断は B-02（ADR）へリンクし、総括側は"結論"に寄せる。</li>
    <li><b>整合性</b>: 画面（B-04/05/06）↔ API（B-07）↔ データ（B-09〜11）↔ 権限（B-15）が矛盾しないこと。</li>
    <li><b>残課題</b>: TBDは一覧化し「誰が/いつまでに/決めること」を書く。</li>
  </ul>
</div>

<h2 class="section-title" id="b19-guide"><span class="title-icon">🔗</span> B-19 トレーサビリティマトリクス（詳細）</h2>
<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e0e7ff">🔗</span><h2>トレーサビリティ表テンプレ（例）</h2></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>要件ID</th><th>要件</th><th>機能ID</th><th>画面ID</th><th>API ID</th><th>データ</th><th>備考</th></tr></thead>
      <tbody>
        <tr><td>R-010</td><td>申請を作成できる</td><td>F-001</td><td>SCR-010</td><td>API-020</td><td>request</td><td>-</td></tr>
        <tr><td>R-020</td><td>承認できる</td><td>F-002</td><td>SCR-020</td><td>API-030</td><td>request, approval</td><td>監査ログ必須</td></tr>
      </tbody>
    </table>
  </div>
</div>
