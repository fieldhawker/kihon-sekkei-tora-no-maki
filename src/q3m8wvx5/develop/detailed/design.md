---
title: 詳細設計 手順書
subtitle: Phase 2
phase: detail
description: 基本設計書（承認済み）をインプットとして、実装に直結する詳細な設計を行うフェーズです。STEP 0〜9 に従って進めてください。
mermaid: true
---

<!-- 進捗バー -->
<div class="card" style="margin-top:0">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem">
    <span class="font-bold">全体進捗</span>
    <span class="text-sm text-muted progress-label">0 / 0 完了</span>
  </div>
  <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
</div>

<div class="callout callout-info" style="margin-top:1rem">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <b>このページの使い方</b><br>
    1) STEP 0 で「基本設計が承認済みで揃っているか」を確認 → 2) まず <b>STEP 先行（共通ライブラリ）</b> を固める → 3) STEP 1〜9 を順に埋めながらチェックを付ける。<br>
    実装者が迷うポイント（入力の細かい条件・例外時の挙動・エラーコード・型/桁数）を、文章だけでなく<b>図（シーケンス等）と表</b>で残すとレビューが通りやすくなります。
  </div>
</div>

## 🔄 作業フロー

<div class="mermaid-wrap">
  <div class="mermaid">
flowchart LR
  S0["STEP 0\nインプット確認"]:::easy
  SL["STEP 先行\n共通ライブラリ設計\n★★☆"]:::lib
  S1["STEP 1\n詳細機能設計\n★★★"]:::hard
  S2["STEP 2\n詳細画面設計\n★★☆"]:::mid
  S3["STEP 3\n詳細API設計\n★★☆"]:::mid
  S4["STEP 4\n詳細データ設計\n★★☆"]:::mid
  S5["STEP 5-6\n外部IF・セキュリティ\n★★☆"]:::mid
  S7["STEP 7\nテスト設計\n★★☆"]:::mid
  S8["STEP 8\n開発環境・規約\n★☆☆"]:::easy
  S9["STEP 9\nレビュー・承認"]:::mid

  S0 --> SL --> S1 --> S2 --> S3 --> S4 --> S5 --> S7 --> S8 --> S9

  classDef easy fill:#d1fae5,color:#065f46,stroke:#10b981
  classDef mid  fill:#fef9c3,color:#713f12,stroke:#d97706
  classDef hard fill:#fee2e2,color:#991b1b,stroke:#dc2626
  classDef lib  fill:#ede9fe,color:#4c1d95,stroke:#6d28d9
  </div>
</div>

★は難易度目安です（★☆☆: 軽い / ★★☆: 普通 / ★★★: 重い・影響大）。迷ったら先に「共通ライブラリ（認証・エラー・レスポンス）」を確定します。

<div class="callout callout-info">
  <span class="callout-icon">📌</span>
  <div class="callout-body">
    <b>詳細設計で決めること（基本設計では決めなかったこと）</b><br>
    DB項目の正確な型・桁数・制約 / 関数・クラスの設計 / 詳細バリデーションルール / 具体的な処理ロジック（擬似コード）/ インデックス設計 / エラーコードの完全な仕様
  </div>
</div>

## STEP 0 — インプット確認 {#step0}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d0-1"><label for="d0-1">基本設計書（正式承認済み）を受け取った</label></li>
    <li><input type="checkbox" id="d0-2"><label for="d0-2">B-01〜B-19 の全成果物が揃っていることを確認した</label></li>
    <li><input type="checkbox" id="d0-3"><label for="d0-3">基本設計書の未解決コメント・TBD項目がないことを確認した</label></li>
    <li><input type="checkbox" id="d0-4"><label for="d0-4">詳細設計フェーズのスケジュール・担当分担が確定した</label></li>
    <li><input type="checkbox" id="d0-5"><label for="d0-5">開発環境（PC・ツール・アクセス権）の準備を開始した</label></li>
  </ul>
</div>

## STEP 先行 — 共通ライブラリ設計・実装（最優先） {#step-lib}

<div class="callout callout-danger">
  <span class="callout-icon">🚀</span>
  <div class="callout-body">
    <b>機能実装の前に必ず先行して行うこと。</b>共通ライブラリが後から変わると、すでに実装した機能コードをすべて修正することになります。
  </div>
</div>

<div class="card">
  <div class="deliverable-grid">
    <div class="deliverable-item"><span class="deliverable-code">C-01</span>認証・認可</div>
    <div class="deliverable-item"><span class="deliverable-code">C-02</span>エラーハンドリング</div>
    <div class="deliverable-item"><span class="deliverable-code">C-03</span>バリデーション</div>
    <div class="deliverable-item"><span class="deliverable-code">C-04</span>ログ出力</div>
    <div class="deliverable-item"><span class="deliverable-code">C-05</span>レスポンス統一フォーマット</div>
    <div class="deliverable-item"><span class="deliverable-code">C-06</span>ページネーション</div>
    <div class="deliverable-item"><span class="deliverable-code">C-07</span>ファイル操作</div>
    <div class="deliverable-item"><span class="deliverable-code">C-08</span>メール送信</div>
    <div class="deliverable-item"><span class="deliverable-code">C-09</span>外部APIクライアント</div>
    <div class="deliverable-item"><span class="deliverable-code">C-10</span>キャッシュ</div>
    <div class="deliverable-item"><span class="deliverable-code">C-11</span>日付・時刻処理</div>
    <div class="deliverable-item"><span class="deliverable-code">C-12</span>DB共通処理</div>
  </div>
  <a href="common-libs.html" class="callout callout-info" style="display:block;text-decoration:none;margin-top:1rem">
    <span class="callout-icon">📦</span>
    <div class="callout-body">詳細は <b>共通ライブラリ設計ページ</b> を参照してください →</div>
  </a>
</div>

## STEP 1 — 詳細機能設計 ★★★ {#step1}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d1-1"><label for="d1-1">各機能の処理フロー図（フローチャートまたはシーケンス図）を作成した<br><small class="text-muted">フローチャートは単一機能の処理順序を表す。シーケンス図は複数コンポーネント（画面・API・DB・外部システム）をまたぐ処理の時系列を表す。複数コンポーネントをまたぐ場合はシーケンス図が分かりやすい</small></label></li>
    <li><input type="checkbox" id="d1-2"><label for="d1-2">主要な業務ロジックを擬似コード（または詳細な処理手順）で記述した<br><small class="text-muted">擬似コード（pseudocode）＝特定の言語に依存しない、処理の流れを自然言語とコード的な書き方で混在させた記述。「if 申請ステータスが下書き then 提出可能 else エラーを返す」のように書くと、実装担当者に意図が正確に伝わる</small></label></li>
    <li><input type="checkbox" id="d1-3"><label for="d1-3">条件分岐・例外処理のロジックを明確にした<br><small class="text-muted">正常系だけでなく「バリデーションエラー時」「DB接続失敗時」「権限不足時」の処理も必ず設計書に記載する。例外系の記述が曖昧だと実装者が都度判断することになり、品質にばらつきが出る</small></label></li>
    <li><input type="checkbox" id="d1-4"><label for="d1-4">バッチ処理がある場合、処理フローと実行制御を詳細化した<br><small class="text-muted">二重起動防止（ロックファイル/DB排他）・途中失敗時のリカバリ（どこから再実行するか）・処理件数ログの出力方針を必ず明記する</small></label></li>
    <li><input type="checkbox" id="d1-5"><label for="d1-5">帳票がある場合、出力レイアウト・データソースを詳細化した<br><small class="text-muted">帳票の各項目が「どのテーブルのどのカラムから取得するか」のマッピングを明記する。この対応表がないと実装者がデータソースを推測することになる</small></label></li>
  </ul>
</div>

## STEP 2 — 詳細画面設計 {#step2}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d2-1"><label for="d2-1">全画面の詳細レイアウト（Figma/XD）を作成した</label></li>
    <li><input type="checkbox" id="d2-2"><label for="d2-2">全入力項目の詳細定義（型・最大文字数・必須/任意）を作成した</label></li>
    <li><input type="checkbox" id="d2-3"><label for="d2-3">全バリデーションルールとエラーメッセージを定義した</label></li>
    <li><input type="checkbox" id="d2-4"><label for="d2-4">初期表示値・デフォルト値を定義した</label></li>
    <li><input type="checkbox" id="d2-5"><label for="d2-5">ボタン操作（押下時の挙動・非活性条件）を定義した</label></li>
    <li><input type="checkbox" id="d2-6"><label for="d2-6">画面→API呼び出しのマッピングを明確にした<br><small class="text-muted">「このボタンを押したらどのAPIが呼ばれ、レスポンスのどのフィールドを画面のどこに表示するか」を対応表で明記する。この対応表がないとフロントエンドとバックエンドで齟齬が生じやすい</small></label></li>
    <li><input type="checkbox" id="d2-7"><label for="d2-7">レスポンシブ対応が必要な場合、ブレークポイントを定義した<br><small class="text-muted">ブレークポイント＝画面幅のしきい値。例：768px以下はスマホレイアウト、1024px以上はPC用。Tailwind CSSなら sm（640px）/ md（768px）/ lg（1024px）が一般的な基準</small></label></li>
  </ul>
</div>

## STEP 3 — 詳細API設計（OpenAPI完全版） {#step3}

<div class="card">
  <div class="callout callout-info" style="margin-bottom:1rem">
    <span class="callout-icon">📄</span>
    <div class="callout-body">OpenAPI 3.0仕様書（YAML/JSON）をリポジトリで管理し、Swagger UIで参照・確認できるようにすることを推奨します。</div>
  </div>
  <ul class="checklist">
    <li><input type="checkbox" id="d3-1"><label for="d3-1">全APIエンドポイントのOpenAPI仕様を作成した（path・method・summary）</label></li>
    <li><input type="checkbox" id="d3-2"><label for="d3-2">リクエスト（パラメータ・ボディ）のスキーマを完全定義した</label></li>
    <li><input type="checkbox" id="d3-3"><label for="d3-3">レスポンスのスキーマ（正常・エラー全パターン）を定義した</label></li>
    <li><input type="checkbox" id="d3-4"><label for="d3-4">HTTPステータスコードの使い分けを定義した（200/201/400/401/403/404/500等）<br><small class="text-muted">代表的な使い分け：200=成功（更新・参照）/ 201=作成成功 / 400=リクエスト不正（バリデーションエラー）/ 401=未認証（ログインが必要）/ 403=認証済みだが権限なし / 404=リソースが存在しない / 409=競合（重複登録）/ 500=サーバー内部エラー</small></label></li>
    <li><input type="checkbox" id="d3-5"><label for="d3-5">認証方式（Bearer Token等）をOpenAPIに記述した<br><small class="text-muted">Bearer Token＝JWTなどのトークンをHTTPヘッダー「Authorization: Bearer {token}」で送る方式。OpenAPIでは securitySchemes に bearerAuth を定義し、各エンドポイントに security: [bearerAuth: []] を付けて認証要否を明示する</small></label></li>
    <li><input type="checkbox" id="d3-6"><label for="d3-6">バリデーションルール（minLength・pattern等）をスキーマに記述した</label></li>
    <li><input type="checkbox" id="d3-7"><label for="d3-7">Prism等でモックサーバーを立ち上げてフロントとのインタフェース疎通確認をした<br><small class="text-muted">モックサーバー＝APIが実際に実装される前に、OpenAPIの仕様書をもとにダミーレスポンスを返す仮のサーバー。これを使うとバックエンドの実装完了を待たずにフロントエンド開発を並行して進められる</small></label></li>
  </ul>
</div>

## STEP 4 — 詳細データ設計（物理設計） {#step4}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d4-1"><label for="d4-1">物理ER図（実際のカラム名・型・桁数・デフォルト値）を確定した</label></li>
    <li><input type="checkbox" id="d4-2"><label for="d4-2">DDL（CREATE TABLE文）を作成した</label></li>
    <li><input type="checkbox" id="d4-3"><label for="d4-3">インデックス設計（検索条件・カーディナリティを考慮）をした<br><small class="text-muted">カーディナリティ＝カラムの値の多様性。性別（男/女/その他）は低カーディナリティ、ユーザーIDは高カーディナリティ。検索条件に使うカラムで高カーディナリティなものにインデックスを貼ると効果が高い</small></label></li>
    <li><input type="checkbox" id="d4-4"><label for="d4-4">主要なクエリ（SELECT・UPDATE）のSQL設計をした<br><small class="text-muted">N+1問題（ループの中で毎回DBを呼ぶ）や不要な全件取得が発生していないかを設計段階で確認する。JOINで一度に取得できるものはJOINを使う</small></label></li>
    <li><input type="checkbox" id="d4-5"><label for="d4-5">マイグレーションスクリプト（Flyway・Liquibase）の管理方針を決定した<br><small class="text-muted">マイグレーションツール＝DBの変更履歴（テーブル作成・カラム追加等）をファイルで管理し、自動で順番に適用するツール。手動でALTER文を流すと「誰が・いつ・何を変更したか」が管理できなくなるため、チーム開発では必須</small></label></li>
    <li><input type="checkbox" id="d4-6"><label for="d4-6">パーティショニング・アーカイブ方針（大量データがある場合）を定義した</label></li>
  </ul>
</div>

## STEP 5-6 — 詳細外部IF・セキュリティ設計 {#step5}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d5-1"><label for="d5-1">連携シーケンス図（Mermaid）を作成した</label></li>
    <li><input type="checkbox" id="d5-2"><label for="d5-2">エラー処理・リトライ・タイムアウトの詳細仕様を定義した</label></li>
    <li><input type="checkbox" id="d5-3"><label for="d5-3">OWASP Top 10 の各対策の実装方法を設計書に記述した</label></li>
    <li><input type="checkbox" id="d5-4"><label for="d5-4">SQLインジェクション対策（プリペアドステートメント）を確認した<br><small class="text-muted">SQLインジェクション＝入力値に悪意のあるSQL文を混ぜてDBを不正操作する攻撃。対策はプリペアドステートメント（SQL文と値を分離して渡す仕組み）を必ず使うこと。ORMを使っている場合も生SQL（nativeQuery）を書く箇所は特に注意する</small></label></li>
    <li><input type="checkbox" id="d5-5"><label for="d5-5">XSS対策（エスケープ・CSP）を確認した<br><small class="text-muted">XSS（Cross-Site Scripting）＝ユーザー入力をHTMLに埋め込む際にエスケープしないと、悪意あるスクリプトが他ユーザーのブラウザで実行される攻撃。対策は①HTMLへの出力時にエスケープする ②CSP（Content Security Policy）ヘッダーを設定して不正スクリプトの実行をブラウザに禁止させる</small></label></li>
    <li><input type="checkbox" id="d5-6"><label for="d5-6">CSRF対策（トークン・SameSite Cookie）を確認した<br><small class="text-muted">CSRF（Cross-Site Request Forgery）＝ログイン済みのユーザーを騙して、悪意あるサイトから本物サイトへリクエストを送らせる攻撃。対策は①CSRFトークン（フォームごとに一意のトークンを発行し、サーバー側で検証） ②SameSite=LaxまたはStrictをCookieに設定して他サイトからのリクエストでCookieが送信されないようにする</small></label></li>
  </ul>
</div>

## STEP 7 — テスト設計 {#step7}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d7-1"><label for="d7-1">単体テスト設計書を作成した（テストクラス・テストメソッド一覧）</label></li>
    <li><input type="checkbox" id="d7-2"><label for="d7-2">各テストケースの入力値・期待値を明記した</label></li>
    <li><input type="checkbox" id="d7-3"><label for="d7-3">境界値・異常系テストケースを網羅した</label></li>
    <li><input type="checkbox" id="d7-4"><label for="d7-4">結合テスト設計方針書を作成した（テストシナリオ・テストデータ方針）</label></li>
    <li><input type="checkbox" id="d7-5"><label for="d7-5">カバレッジ目標値（命令カバレッジ80%以上等）を設定した<br><small class="text-muted">命令カバレッジ（C0）＝全コード行のうち、テストで実行した行の割合。80%は「全体的に広くテストできている」の目安。C1（分岐カバレッジ：if文の真/偽を両方通ったか）まで求める場合もある。100%を目指すより「重要なロジックを必ず通す」方が現実的</small></label></li>
  </ul>
</div>

## STEP 8 — 開発環境・コーディング規約 {#step8}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d8-1"><label for="d8-1">開発環境構築手順書を作成した（Docker Composeを推奨）<br><small class="text-muted">「自分のPCでは動くけど他の人のPCでは動かない」を防ぐためにDocker Composeで環境を統一する。手順書は新規参加者が1人でゼロから環境を作れるレベルまで書く。「〜をインストールする」だけでなくバージョン指定まで記載する</small></label></li>
    <li><input type="checkbox" id="d8-2"><label for="d8-2">コーディング規約書を作成・合意した<br><small class="text-muted">命名規則・フォーマッタ（Prettier/ESLint/Checkstyle）・コメントルール等。規約は「作るだけ」では意味がなく、フォーマッタをCIに組み込んで自動チェックすることが重要。規約に違反していたらCIが失敗する設定にするとレビューの指摘が激減する</small></label></li>
    <li><input type="checkbox" id="d8-3"><label for="d8-3">CI/CDパイプライン設定（GitHub Actions等）を作成した<br><small class="text-muted">CI（継続的インテグレーション）＝コードをプッシュするたびに自動でビルド・テスト・Lintを実行する仕組み。CD（継続的デリバリー）＝自動でステージング環境へデプロイする仕組み。CIが通らないとマージできないルールにすることで品質を守る</small></label></li>
    <li><input type="checkbox" id="d8-4"><label for="d8-4">静的解析ツールの設定を完了した<br><small class="text-muted">静的解析＝プログラムを実行せずにコードの問題（型エラー・未使用変数・セキュリティリスク等）を自動検出するツール。Java: Checkstyle・SpotBugs、JavaScript/TypeScript: ESLint、Python: flake8/mypy など。設定をリポジトリに含めてCIで自動実行する</small></label></li>
    <li><input type="checkbox" id="d8-5"><label for="d8-5">全開発メンバーが環境を構築できることを確認した<br><small class="text-muted">作成した手順書で実際に別のメンバーが環境を構築してみる（ドッグフーディング）。作成者は手順が自明に見えてしまうため、第三者に試してもらうことで「これはどこからインストールするのか」という抜け漏れが発見できる</small></label></li>
  </ul>
</div>

## STEP 9 — 取りまとめ・レビュー・承認 {#step9}

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="d9-1"><label for="d9-1">詳細設計書（総括）を作成した</label></li>
    <li><input type="checkbox" id="d9-2"><label for="d9-2">トレーサビリティマトリクス（要件→基本設計→詳細設計の対応表）を更新した</label></li>
    <li><input type="checkbox" id="d9-3"><label for="d9-3">内部レビューを実施し、指摘事項を対応した</label></li>
    <li><input type="checkbox" id="d9-4"><label for="d9-4">顧客レビューを実施し、承認を得た</label></li>
    <li><input type="checkbox" id="d9-5"><label for="d9-5">実装フェーズ移行判定チェックリストを確認した</label></li>
  </ul>
</div>

<div class="callout callout-success">
  <span class="callout-icon">✅</span>
  <div class="callout-body">詳細設計書の正式承認が取れたら <a href="../impl/implementation.html">実装フェーズ</a> へ進みます。</div>
</div>
