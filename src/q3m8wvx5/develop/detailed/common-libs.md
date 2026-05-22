---
title: 共通ライブラリ設計
subtitle: Phase 2 — 先行作業
phase: libs
description: 機能実装の前に設計・実装しておく共通処理ライブラリの設計書です。C-01〜C-05が最優先で、機能実装開始前に完成させてください。
style: |
  .lib-card { background:#fff; border:1px solid var(--gray-200); border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1rem; box-shadow:var(--shadow-sm); }
  .lib-header { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
  .lib-code { font-size:.8rem; font-weight:700; background:var(--primary); color:#fff; border-radius:6px; padding:.2rem .5rem; flex-shrink:0; }
  .lib-title { font-size:1rem; font-weight:700; color:var(--gray-800); }
  .lib-priority { margin-left:auto; }
  .priority-high  { background:#fee2e2; color:#991b1b; }
  .priority-mid   { background:#fef9c3; color:#713f12; }
  .priority-low   { background:#f3f4f6; color:#6b7280; }
  .table-wrap a { text-decoration: none; color: inherit; }
---

<div class="callout callout-danger">
  <span class="callout-icon">🚀</span>
  <div class="callout-body">
    <b>なぜ先行させるのか？</b><br>
    共通ライブラリが後から変わると、すでに実装した全機能コードを修正することになります。特に認証・エラーハンドリング・レスポンス形式は、すべてのAPIが依存するため最初に確定させることが重要です。
  </div>
</div>

<div class="callout callout-info" style="margin-top:1rem">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <b>このページの使い方（初心者向け）</b><br>
    1) まず C-05（レスポンス形式）と C-02（エラーコード体系）を確定 → 2) 次に C-01（認証・認可） → 3) C-03（バリデーション）と C-04（ログ）を揃える。<br>
    技術選定や方針変更が起きたら、決定理由を <b>ADR</b>（設計判断メモ）として残します（例：<code>../reference/adr.html</code>）。
  </div>
</div>

## 📊 ライブラリ一覧と優先度

<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>コード</th><th>名称</th><th>優先度</th><th>タイミング</th></tr></thead>
      <tbody>
        <tr><td><a href="#c01"><span class="badge badge-danger">C-01</span></a></td><td>認証・認可</td><td><span class="badge priority-high">最優先</span></td><td>詳細設計STEP開始前</td></tr>
        <tr><td><a href="#c02"><span class="badge badge-danger">C-02</span></a></td><td>エラーハンドリング</td><td><span class="badge priority-high">最優先</span></td><td>詳細設計STEP開始前</td></tr>
        <tr><td><a href="#c03"><span class="badge badge-danger">C-03</span></a></td><td>バリデーション</td><td><span class="badge priority-high">最優先</span></td><td>詳細設計STEP開始前</td></tr>
        <tr><td><a href="#c04"><span class="badge badge-danger">C-04</span></a></td><td>ログ出力</td><td><span class="badge priority-high">最優先</span></td><td>詳細設計STEP開始前</td></tr>
        <tr><td><a href="#c05"><span class="badge badge-danger">C-05</span></a></td><td>レスポンス統一フォーマット</td><td><span class="badge priority-high">最優先</span></td><td>詳細設計STEP開始前</td></tr>
        <tr><td><a href="#c06"><span class="badge badge-warning">C-06</span></a></td><td>ページネーション</td><td><span class="badge priority-mid">高</span></td><td>一覧API実装前</td></tr>
        <tr><td><a href="#c07"><span class="badge badge-warning">C-07</span></a></td><td>ファイル操作</td><td><span class="badge priority-mid">高</span></td><td>ファイル機能実装前</td></tr>
        <tr><td><a href="#c08"><span class="badge badge-warning">C-08</span></a></td><td>メール送信</td><td><span class="badge priority-mid">高</span></td><td>通知機能実装前</td></tr>
        <tr><td><a href="#c09"><span class="badge badge-gray">C-09</span></a></td><td>外部APIクライアント</td><td><span class="badge priority-low">中</span></td><td>外部連携機能実装前</td></tr>
        <tr><td><a href="#c10"><span class="badge badge-gray">C-10</span></a></td><td>キャッシュ</td><td><span class="badge priority-low">中</span></td><td>性能改善時</td></tr>
        <tr><td><a href="#c11"><span class="badge badge-gray">C-11</span></a></td><td>日付・時刻処理</td><td><span class="badge priority-low">中</span></td><td>日付計算が必要な機能前</td></tr>
        <tr><td><a href="#c12"><span class="badge badge-gray">C-12</span></a></td><td>DB共通処理</td><td><span class="badge priority-low">中</span></td><td>DB設計確定後</td></tr>
        <tr><td><a href="#c13"><span class="badge badge-gray">C-13</span></a></td><td>コードマスタ管理</td><td><span class="badge priority-low">低</span></td><td>マスタ参照機能前</td></tr>
        <tr><td><a href="#c14"><span class="badge badge-gray">C-14</span></a></td><td>ID生成</td><td><span class="badge priority-low">低</span></td><td>エンティティ生成前</td></tr>
        <tr><td><a href="#c15"><span class="badge badge-gray">C-15</span></a></td><td>文字列ユーティリティ</td><td><span class="badge priority-low">低</span></td><td>随時</td></tr>
        <tr><td><a href="#c16"><span class="badge badge-gray">C-16</span></a></td><td>通知・アラート</td><td><span class="badge priority-low">低</span></td><td>運用機能前</td></tr>
        <tr><td><a href="#c17"><span class="badge badge-gray">C-17</span></a></td><td>設定管理</td><td><span class="badge priority-low">低</span></td><td>環境設定確定後</td></tr>
      </tbody>
    </table>
  </div>
</div>

## ⭐ 最優先ライブラリ（C-01〜C-05）詳細

<div class="lib-card" id="c01">
  <div class="lib-header">
    <span class="lib-code">C-01</span>
    <span class="lib-title">認証・認可ライブラリ</span>
    <span class="badge priority-high lib-priority">最優先</span>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>内容</th></tr></thead>
      <tbody>
        <tr><td>認証方式</td><td>ADR-003で決定した方式（セッション / JWT）を実装</td></tr>
        <tr><td>提供する機能</td><td>ログイン処理・ログアウト処理・現在ユーザー取得・トークン検証</td></tr>
        <tr><td>認可チェック</td><td>アノテーション or ミドルウェアで権限チェック（ROLE_ADMIN等）</td></tr>
        <tr><td>パスワード管理</td><td>bcrypt でハッシュ化（ソルト付き）。平文保存は絶対禁止</td></tr>
      </tbody>
    </table>
  </div>

```java
// Java + Spring Security の例
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> adminOnly() { ... }

// SecurityContextHolder 経由でリクエストスコープのユーザー情報を注入
@AuthenticationPrincipal UserDetails currentUser = ...;
```
</div>

<div class="lib-card" id="c02">
  <div class="lib-header">
    <span class="lib-code">C-02</span>
    <span class="lib-title">エラーハンドリングライブラリ</span>
    <span class="badge priority-high lib-priority">最優先</span>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>エラー種別</th><th>HTTPステータス</th><th>対応</th></tr></thead>
      <tbody>
        <tr><td>バリデーションエラー</td><td>400 Bad Request</td><td>フィールドエラー詳細を返す</td></tr>
        <tr><td>認証エラー</td><td>401 Unauthorized</td><td>ログイン画面へリダイレクト</td></tr>
        <tr><td>権限エラー</td><td>403 Forbidden</td><td>アクセス拒否ページへ</td></tr>
        <tr><td>リソース未存在</td><td>404 Not Found</td><td>エラーメッセージ返却</td></tr>
        <tr><td>サーバーエラー</td><td>500 Internal Server Error</td><td>ログ出力・ユーザーに詳細非表示</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info" style="margin-top:.75rem">
    <span class="callout-icon">📌</span>
    <div class="callout-body">例外は "握りつぶさず" <b>エラーコード + メッセージ + トレースID</b> を返し、詳細はログへ出します。</div>
  </div>

```json
{
  "success": false,
  "data": null,
  "message": "入力値に誤りがあります",
  "code": "VALIDATION_ERROR",
  "errors": [{ "field": "email", "message": "形式が正しくありません" }],
  "traceId": "...",
  "timestamp": "YYYY-MM-DDThh:mm:ssZ"
}
```
</div>

<div class="lib-card" id="c03">
  <div class="lib-header">
    <span class="lib-code">C-03</span>
    <span class="lib-title">バリデーションライブラリ</span>
    <span class="badge priority-high lib-priority">最優先</span>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>内容</th></tr></thead>
      <tbody>
        <tr><td>ルール定義場所</td><td>DTO（入力モデル）に集約し、API仕様（D-03）と1対1で対応させる</td></tr>
        <tr><td>エラー形式</td><td>C-02のエラーコード体系に従い、フィールド別エラー配列で返す</td></tr>
        <tr><td>境界値</td><td>文字数/数値/日付範囲の境界（min/max）を明記</td></tr>
        <tr><td>業務ルール</td><td>単項目はアノテーション、相関チェックはカスタムバリデータに分離</td></tr>
      </tbody>
    </table>
  </div>

```java
// Java + Bean Validation の例（単項目）
public class ExpenseCreateRequest {
  @NotBlank @Size(max=100)
  public String title;

  @Min(1)
  public Integer amount;
}
```

  <div class="callout callout-warning" style="margin-top:.75rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">フロント側バリデーションは補助です。<b>必ずサーバー側で検証</b>し、メッセージは利用者に分かる文言に統一します。</div>
  </div>
</div>

<div class="lib-card" id="c04">
  <div class="lib-header">
    <span class="lib-code">C-04</span>
    <span class="lib-title">ログ出力ライブラリ</span>
    <span class="badge priority-high lib-priority">最優先</span>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>内容</th></tr></thead>
      <tbody>
        <tr><td>ログ形式</td><td>JSON（構造化ログ）を推奨：traceId/userId/endpoint/latency を必須項目にする</td></tr>
        <tr><td>相関ID</td><td>リクエストごとに traceId を採番し、全ログ/エラーレスポンスに付与（C-02/C-05と連携）</td></tr>
        <tr><td>PII対策</td><td>個人情報/秘密情報はマスキング（メール/電話/トークン等）</td></tr>
        <tr><td>監査ログ</td><td>重要操作（権限変更/承認/削除）は別カテゴリで永続化（改ざん耐性）</td></tr>
      </tbody>
    </table>
  </div>

```json
{ "level":"INFO", "traceId":"...", "userId":"u-001", "path":"/api/v1/expenses", "status":201, "latencyMs":123 }
```
</div>

<div class="lib-card" id="c05">
  <div class="lib-header">
    <span class="lib-code">C-05</span>
    <span class="lib-title">レスポンス統一フォーマット</span>
    <span class="badge priority-high lib-priority">最優先</span>
  </div>
  <p class="text-sm" style="margin-bottom:.75rem">全APIのレスポンスを統一フォーマットで返すことで、フロントエンドのエラー処理コードを共通化できます。</p>

```json
// 正常レスポンス
{
  "success": true,
  "data": { /* 実際のデータ */ },
  "message": null,
  "timestamp": "YYYY-MM-DDThh:mm:ssZ"
}

// エラーレスポンス
{
  "success": false,
  "data": null,
  "message": "入力値に誤りがあります",
  "errors": [
    { "field": "email", "message": "メールアドレスの形式が正しくありません" }
  ],
  "timestamp": "YYYY-MM-DDThh:mm:ssZ"
}
```
</div>

## 📚 その他ライブラリ（C-06〜C-17）詳細

<div class="lib-card" id="c06">
  <div class="lib-header"><span class="lib-code">C-06</span><span class="lib-title">ページネーション</span><span class="badge priority-mid lib-priority">高</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>方式</td><td>基本は offset/limit、必要なら cursor（キーセット）方式に拡張</td></tr>
        <tr><td>レスポンス</td><td><code>items</code> + <code>page</code>（page/size/total）をC-05のdataに格納</td></tr>
        <tr><td>ソート</td><td>並び順の既定値を決め、許可するソートキーをホワイトリスト化</td></tr>
      </tbody>
    </table>
  </div>

```json
{ "items":[...], "page": { "page":1, "size":20, "total":123 } }
```
</div>

<div class="lib-card" id="c07">
  <div class="lib-header"><span class="lib-code">C-07</span><span class="lib-title">ファイル操作</span><span class="badge priority-mid lib-priority">高</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>保存先</td><td>ローカル直書き禁止。オブジェクトストレージ/共有ストレージ等を前提にする</td></tr>
        <tr><td>制限</td><td>拡張子/Content-Type/サイズ上限、ウイルススキャン方針（D-12と整合）</td></tr>
        <tr><td>権限</td><td>アップロード/ダウンロード/削除の権限を明確化</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c08">
  <div class="lib-header"><span class="lib-code">C-08</span><span class="lib-title">メール送信</span><span class="badge priority-mid lib-priority">高</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>送信方式</td><td>非同期（キュー/ジョブ）推奨。タイムアウトでAPI応答を遅くしない</td></tr>
        <tr><td>テンプレ</td><td>テンプレID＋変数で管理（文面の差分をGit管理）</td></tr>
        <tr><td>再送</td><td>リトライ回数、恒久失敗時の通知（C-16）</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c09">
  <div class="lib-header"><span class="lib-code">C-09</span><span class="lib-title">外部APIクライアント</span><span class="badge priority-low lib-priority">中</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>責務</td><td>リトライ/タイムアウト/サーキットブレーカをクライアント側に集約</td></tr>
        <tr><td>エラー変換</td><td>外部エラー→自システムのエラーコード（C-02）へマッピング</td></tr>
        <tr><td>監視</td><td>外部呼出の成功率/遅延をメトリクス化（C-04/C-16）</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c10">
  <div class="lib-header"><span class="lib-code">C-10</span><span class="lib-title">キャッシュ</span><span class="badge priority-low lib-priority">中</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>対象</td><td>参照頻度が高く更新頻度が低いデータ（例：マスタ）</td></tr>
        <tr><td>TTL</td><td>TTL/無効化条件を明記し、整合性を優先（誤キャッシュを避ける）</td></tr>
        <tr><td>キー設計</td><td>環境/テナント/ユーザーでキー衝突しない設計</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c11">
  <div class="lib-header"><span class="lib-code">C-11</span><span class="lib-title">日付・時刻処理</span><span class="badge priority-low lib-priority">中</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>タイムゾーン</td><td>DB/APIの基準（UTC or JST）を統一し、変換箇所を限定</td></tr>
        <tr><td>フォーマット</td><td>APIはISO-8601、日付は <code>YYYY-MM-DD</code> を標準</td></tr>
        <tr><td>注意</td><td>夏時間の影響がある地域を扱う場合はIANA TZを採用</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c12">
  <div class="lib-header"><span class="lib-code">C-12</span><span class="lib-title">DB共通処理</span><span class="badge priority-low lib-priority">中</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>トランザクション</td><td>境界（どこで開始/コミット/ロールバック）を統一</td></tr>
        <tr><td>排他制御</td><td>楽観/悲観、ロック戦略を機能別に決める</td></tr>
        <tr><td>エラー</td><td>一意制約違反などをC-02のエラーコードに変換</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c13">
  <div class="lib-header"><span class="lib-code">C-13</span><span class="lib-title">コードマスタ管理</span><span class="badge priority-low lib-priority">低</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>参照方法</td><td>DB/定義ファイルのどちらを正とするかを決める（B-11/D-06と整合）</td></tr>
        <tr><td>無効化</td><td>削除ではなく無効フラグ、参照側は表示/選択制御</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c14">
  <div class="lib-header"><span class="lib-code">C-14</span><span class="lib-title">ID生成</span><span class="badge priority-low lib-priority">低</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>方式</td><td>UUID/連番/雪花IDなど。DBや外部連携要件に合わせる</td></tr>
        <tr><td>露出</td><td>外部にIDを出す場合は推測耐性・情報漏えいに注意</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c15">
  <div class="lib-header"><span class="lib-code">C-15</span><span class="lib-title">文字列ユーティリティ</span><span class="badge priority-low lib-priority">低</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>用途</td><td>正規化（トリム/全角半角/改行）、マスキングなどの共通関数</td></tr>
        <tr><td>注意</td><td>ドメインロジックを入れない（汎用に保つ）</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c16">
  <div class="lib-header"><span class="lib-code">C-16</span><span class="lib-title">通知・アラート</span><span class="badge priority-low lib-priority">低</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>通知先</td><td>Slack/メール/運用ツール等。重大度に応じて振り分け</td></tr>
        <tr><td>重複抑止</td><td>同一障害の連投を抑える（抑止期間、集約）</td></tr>
        <tr><td>監査</td><td>通知発行の履歴（いつ/何を）を残す</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="lib-card" id="c17">
  <div class="lib-header"><span class="lib-code">C-17</span><span class="lib-title">設定管理</span><span class="badge priority-low lib-priority">低</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>設計項目</th><th>方針</th></tr></thead>
      <tbody>
        <tr><td>設定の所在</td><td>環境変数/設定ファイル/Secret管理の役割分担を明記</td></tr>
        <tr><td>検証</td><td>起動時に必須設定を検証し、欠落なら即エラー（フェイルファスト）</td></tr>
        <tr><td>秘密情報</td><td>Gitに置かない。権限とローテーション方針を決める</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 📁 推奨ディレクトリ構成

<div class="card">

```
src/
├── common/                    ← 共通ライブラリ置き場
│   ├── auth/
│   │   ├── AuthService.java   (C-01)
│   │   └── SecurityConfig.java
│   ├── error/
│   │   ├── GlobalExceptionHandler.java  (C-02)
│   │   └── ErrorCode.java
│   ├── validation/            (C-03)
│   ├── logging/               (C-04)
│   ├── response/
│   │   └── ApiResponse.java   (C-05)
│   ├── pagination/            (C-06)
│   └── util/                  (C-11, C-15)
└── feature/                   ← 機能別コード
    ├── user/
    ├── order/
    └── report/
```
</div>

## 📏 変更管理ルール

<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>変更内容</th><th>必要な手順</th></tr></thead>
      <tbody>
        <tr><td>軽微なバグ修正（インタフェース変更なし）</td><td>通常のPRフロー</td></tr>
        <tr><td>インタフェース変更（引数・戻り値の変更）</td><td>変更レビュー + 全呼び出し元への影響確認 + 設計書更新</td></tr>
        <tr><td>新しいライブラリ追加</td><td>技術リードの承認 + 設計書追記</td></tr>
        <tr><td>既存ライブラリの廃止</td><td>移行計画の作成 + 全呼び出し元の移行完了確認</td></tr>
      </tbody>
    </table>
  </div>
</div>
