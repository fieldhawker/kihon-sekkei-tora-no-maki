---
title: エンジニアのためのGit・GitHubチーム実践
subtitle: 書籍まとめ / 技術
phase: adr
description: 個人でのバージョン管理にとどまらず、チームで安全・効率的に開発を進めるためのGit・GitHub活用術をまとめた一冊。「なぜそう使うのか」を丁寧に解説しており、初心者が現場でつまずきやすいポイントを網羅しています。
---

<div class="callout callout-info" style="margin-top:0">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <b>このページの使い方（初心者向け）</b><br>
    「コマンドは覚えたけど、チームでの使い方がわからない」——そんな方向けのまとめです。<b>「Gitの基本思想」→「ブランチ戦略」→「プルリクエスト」</b>の順に読むと、現場の流れが自然に理解できます。
  </div>
</div>

## 📖 本の構成

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:var(--primary-lt)">🗂️</span><h2>5つのテーマでGit・GitHubを理解する</h2></div>
  <table class="comparison-table" style="margin-top:0.75rem">
    <thead><tr><th>章</th><th>テーマ</th><th>主な問い</th></tr></thead>
    <tbody>
      <tr><td>第1章</td><td><strong>Gitの基本思想</strong></td><td>なぜGitはこう動くのか</td></tr>
      <tr><td>第2章</td><td><strong>ブランチ戦略</strong></td><td>チームでどうブランチを切るか</td></tr>
      <tr><td>第3章</td><td><strong>コミットの作り方</strong></td><td>良いコミットとは何か</td></tr>
      <tr><td>第4章</td><td><strong>プルリクエストとコードレビュー</strong></td><td>PRをどう活用するか</td></tr>
      <tr><td>第5章</td><td><strong>CI/CDとの連携・チーム運用</strong></td><td>GitHubを中心にした開発フローとは</td></tr>
    </tbody>
  </table>
</div>

## 🌳 第1章：Gitの基本思想

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8f4e8">🔍</span><h2>「なぜGitを使うのか」から始める</h2></div>
  <p>Gitはただのバックアップツールではありません。<strong>「いつ・誰が・なぜ・何を変えたか」を記録し、チーム全員が安全に並行して作業できる仕組み</strong>を提供するツールです。</p>

  <div style="display:grid; gap:0.75rem; margin-top:1rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント① Gitは「変更の歴史」を管理する</h3>
      <p style="margin:0">ファイルをそのまま保存するのではなく、<b>変更の差分（diff）と時系列</b>を記録します。これにより「いつの状態にも戻れる」安心感がチームの開発速度を支えます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント② ローカルとリモートの関係を理解する</h3>
      <p style="margin:0">自分のPC上の変更（ローカルリポジトリ）とGitHub上の変更（リモートリポジトリ）は別物です。<code>push</code>で送り出し、<code>pull</code>で取り込む——この双方向の流れを意識することがチーム開発の第一歩です。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント③ ステージングエリアの役割</h3>
      <p style="margin:0">変更したファイルは即コミットにならず、一度「ステージ（<code>git add</code>）」する必要があります。これは「今回のコミットに含める内容を選ぶ」作業です。意味のある単位でコミットするための大切な仕組みです。</p>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">
      <b>よくある誤解：</b>「<code>git add .</code>で全部まとめてコミットすればよい」——これは悪習慣です。関係のないファイルが混入したり、後からコミット履歴を読みにくくなります。必要なファイルだけを選んでステージしましょう。
    </div>
  </div>
</div>

## 🌿 第2章：ブランチ戦略

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fef3cd">🗺️</span><h2>ブランチは「並行作業の仕切り」</h2></div>
  <p>チーム開発では複数人が同時に異なる機能・修正を進めます。<strong>ブランチは「互いの作業が干渉しないよう仕切る壁」</strong>です。どのように切るかをチームで統一することが重要です。</p>

  <h3 style="margin-top:1.25rem; color:var(--primary)">代表的なブランチ戦略の比較</h3>
  <table class="comparison-table" style="margin-top:0.5rem">
    <thead><tr><th>戦略</th><th>概要</th><th>向いている現場</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>GitHub Flow</strong></td>
        <td><code>main</code>から機能ブランチを切り、PRでマージ</td>
        <td>小〜中規模、継続的デプロイが多い現場</td>
      </tr>
      <tr>
        <td><strong>Git Flow</strong></td>
        <td><code>main</code>/<code>develop</code>/<code>feature</code>/<code>release</code>/<code>hotfix</code>の5種を使い分ける</td>
        <td>リリース管理が厳密な中〜大規模の現場</td>
      </tr>
      <tr>
        <td><strong>Trunk-Based</strong></td>
        <td>全員が<code>main</code>に短命のブランチを頻繁にマージ</td>
        <td>CI/CDが整備された上級者チーム</td>
      </tr>
    </tbody>
  </table>

  <div style="display:grid; gap:0.75rem; margin-top:1.25rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント① ブランチ名に意味を持たせる</h3>
      <p style="margin:0"><code>feature/user-login</code>、<code>fix/null-pointer-crash</code>など、「種類/内容」の形式にするとチームメンバーが一目でわかります。曖昧な<code>test</code>や<code>work</code>は避けましょう。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント② ブランチは短命に保つ</h3>
      <p style="margin:0">長期間マージせずにいると、<code>main</code>との差分が広がり、コンフリクト（競合）が増えます。<b>数日〜1週間以内にマージできる粒度</b>でブランチを切ることが理想です。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント③ マージ前に<code>main</code>を取り込む</h3>
      <p style="margin:0">PRを出す前に<code>git fetch && git merge origin/main</code>（または<code>rebase</code>）を実行し、自分のブランチを最新の<code>main</code>に追いつかせましょう。コンフリクトを早期に解消できます。</p>
    </div>
  </div>
</div>

## ✍️ 第3章：コミットの作り方

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8eaf6">📝</span><h2>コミットは「チームへの手紙」</h2></div>
  <p>コミットは将来の自分やチームメンバーが読む記録です。<strong>「何を変えたか」はdiffを見れば分かる——コミットメッセージには「なぜ変えたか」を書く</strong>のが原則です。</p>

  <div style="display:grid; gap:0.75rem; margin-top:1rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント① 1コミット1つの目的</h3>
      <p style="margin:0">「ログイン機能の追加」と「不要ファイルの削除」を同じコミットに混ぜないようにしましょう。後からバグを追う際や、特定の変更だけを元に戻す（<code>revert</code>）際に困ります。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント② Conventional Commits形式を使う</h3>
      <p style="margin:0">コミットメッセージの先頭に種別を付ける形式です：</p>
      <table class="comparison-table" style="margin-top:0.5rem; font-size:0.85rem">
        <thead><tr><th>プレフィックス</th><th>意味</th><th>例</th></tr></thead>
        <tbody>
          <tr><td><code>feat:</code></td><td>新機能追加</td><td><code>feat: ログイン画面を追加</code></td></tr>
          <tr><td><code>fix:</code></td><td>バグ修正</td><td><code>fix: パスワードがnullで落ちる問題を修正</code></td></tr>
          <tr><td><code>docs:</code></td><td>ドキュメント変更</td><td><code>docs: READMEにセットアップ手順を追記</code></td></tr>
          <tr><td><code>refactor:</code></td><td>リファクタリング</td><td><code>refactor: 認証ロジックをサービスクラスに分離</code></td></tr>
          <tr><td><code>test:</code></td><td>テスト追加・修正</td><td><code>test: ユーザー登録のバリデーションテストを追加</code></td></tr>
          <tr><td><code>chore:</code></td><td>雑務・設定変更</td><td><code>chore: .gitignoreにIDEファイルを追加</code></td></tr>
        </tbody>
      </table>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント③ 作業途中の「WIPコミット」は整理してから出す</h3>
      <p style="margin:0">ブランチ上では<code>WIP: 途中</code>などのコミットをして保存しても構いません。ただしPRを出す前に<code>git rebase -i</code>でコミットを整理（squash）し、意味のある単位にまとめましょう。</p>
    </div>
  </div>

  <div class="callout callout-warn" style="margin-top:1rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">
      <b>pushした後のコミットは書き換えない</b><br>
      <code>git commit --amend</code>や<code>git rebase</code>は便利ですが、<b>すでにリモートにpushしたコミット</b>に適用すると、チームメンバーの履歴と食い違い、大混乱を招きます。push前に限って使いましょう。
    </div>
  </div>
</div>

## 🔍 第4章：プルリクエストとコードレビュー

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8f4e8">👥</span><h2>PRはコードを「チームに渡す」儀式</h2></div>
  <p>プルリクエスト（PR）はコードをマージするだけでなく、<strong>チームで品質を確認し・知識を共有し・議論する場</strong>です。出す側も受ける側も、PR文化を大切にすることでチーム全体の品質が上がります。</p>

  <div style="display:grid; gap:0.75rem; margin-top:1rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント① PRの説明文に「何を・なぜ・どうテストしたか」を書く</h3>
      <p style="margin:0">レビュアーがコードを読む前にコンテキストを理解できるよう、変更の目的・背景・確認方法を書きましょう。スクリーンショットがあると視覚的に伝わりやすいです。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント② PRは小さく出す</h3>
      <p style="margin:0">変更行数が多いPRはレビューが難しく、マージまでの時間も長くなります。<b>目安は200〜400行以内</b>。大きな機能は複数のPRに分割してください。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント③ レビューコメントの書き方</h3>
      <p style="margin:0">コメントには「必須修正」と「提案・質問」を区別すると親切です。例：<b>[Must]</b> バグになるため修正必須 / <b>[Nit]</b> 好みの問題なので任意 / <b>[Question]</b> 意図を教えてほしい。感情的にならず、コードの改善を目的にしましょう。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント④ Draftプルリクエストを活用する</h3>
      <p style="margin:0">「まだレビュー不要だが進捗を共有したい」「方向性を早めに確認したい」場合は、<b>Draft PR</b>として出すことができます。チームメンバーが早期にフィードバックでき、大きな手戻りを防げます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント⑤ レビューコメントへの対応を明示する</h3>
      <p style="margin:0">コメントを受けたら「修正しました」「別の方法で対応しました（理由：〇〇）」「意図的にこうしました（理由：〇〇）」と返信しましょう。レビュアーが再確認しやすくなります。</p>
    </div>
  </div>

  <div class="callout callout-success" style="margin-top:1rem">
    <span class="callout-icon">✅</span>
    <div class="callout-body">
      <b>初心者向けPRチェックリスト：</b>
      <ul style="margin:0.5rem 0 0; padding-left:1.5rem">
        <li>PRの説明文に変更の目的を書いた</li>
        <li>セルフレビュー（自分でdiffを読んだ）を実施した</li>
        <li>変更行数が多すぎないか確認した</li>
        <li>テスト・動作確認の方法を記載した</li>
        <li>不要なコメントアウトやデバッグコードを削除した</li>
      </ul>
    </div>
  </div>
</div>

## ⚙️ 第5章：CI/CDとの連携・チーム運用

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fde8e8">🚀</span><h2>GitHubを「自動化の中心」にする</h2></div>
  <p>GitHubはコードを置くだけでなく、<strong>テスト・ビルド・デプロイを自動化する土台</strong>にもなります。CI/CDと連携することでレビューの信頼性が上がり、リリースの心理的負担が下がります。</p>

  <div style="display:grid; gap:0.75rem; margin-top:1rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント① GitHub ActionsでCIを自動実行する</h3>
      <p style="margin:0">PRを出したタイミングで自動的にテストやリントが走るよう設定することで、<b>「レビュー前に機械がチェックする」</b>状態を作れます。人間は本質的なロジックのレビューに集中できます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント② ブランチ保護ルールで品質を守る</h3>
      <p style="margin:0">GitHubのリポジトリ設定で<b>「CIが通らないとマージできない」「レビュー承認が必須」</b>などのルールを設定できます。うっかりミスをシステムで防ぐ仕組みが、チームの安心感を高めます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント③ Issue・PRをプロジェクト管理に活用する</h3>
      <p style="margin:0">GitHubのIssueはタスク管理にも使えます。<b>PRとIssueをリンク</b>（<code>Closes #123</code>とPRに書く）することで、マージ時に自動でIssueが閉じられ、開発の進捗が可視化されます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント④ <code>.gitignore</code>を最初に整備する</h3>
      <p style="margin:0">IDEの設定ファイル・ビルド成果物・シークレット情報（<code>.env</code>）などはリポジトリに含めるべきではありません。プロジェクト開始時に<code>.gitignore</code>を整備しておくことで、誤コミットを防げます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ポイント⑤ コンフリクト（競合）の解消を恐れない</h3>
      <p style="margin:0">コンフリクトはチーム開発では日常です。<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>・<code>=======</code>・<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>の記号が何を意味するかを理解し、「自分の変更」「相手の変更」「両方必要か」を冷静に判断して解消しましょう。</p>
    </div>
  </div>
</div>

## 🛠️ よく使うGitコマンド早見表

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fef3cd">⌨️</span><h2>場面別コマンドリファレンス</h2></div>
  <table class="comparison-table" style="margin-top:0.75rem">
    <thead><tr><th>場面</th><th>コマンド</th><th>説明</th></tr></thead>
    <tbody>
      <tr><td><strong>現在の状態確認</strong></td><td><code>git status</code></td><td>変更ファイルの一覧を表示</td></tr>
      <tr><td><strong>差分確認</strong></td><td><code>git diff</code></td><td>ステージ前の変更内容を表示</td></tr>
      <tr><td><strong>ブランチ作成</strong></td><td><code>git switch -c feature/xxx</code></td><td>新しいブランチを作成して切り替え</td></tr>
      <tr><td><strong>変更をステージ</strong></td><td><code>git add ファイル名</code></td><td>特定ファイルをコミット対象に追加</td></tr>
      <tr><td><strong>コミット</strong></td><td><code>git commit -m "feat: 〇〇を追加"</code></td><td>変更を履歴に記録</td></tr>
      <tr><td><strong>リモートへ送信</strong></td><td><code>git push origin ブランチ名</code></td><td>ローカルの変更をGitHubに反映</td></tr>
      <tr><td><strong>最新を取得</strong></td><td><code>git fetch && git merge origin/main</code></td><td>リモートの最新変更を取り込む</td></tr>
      <tr><td><strong>履歴確認</strong></td><td><code>git log --oneline</code></td><td>コミット履歴を1行ずつ表示</td></tr>
      <tr><td><strong>変更を一時退避</strong></td><td><code>git stash</code></td><td>未コミットの変更を一時的に保存</td></tr>
      <tr><td><strong>退避を戻す</strong></td><td><code>git stash pop</code></td><td>stashした変更を戻す</td></tr>
    </tbody>
  </table>
</div>

## 📌 まとめ：チームGit運用の3原則

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:var(--primary-lt)">🎓</span><h2>本書のエッセンス</h2></div>
  <table class="comparison-table" style="margin-top:0.75rem">
    <thead><tr><th>#</th><th>原則</th><th>キーワード</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>コミットは「小さく・意味ある単位」で。メッセージには「なぜ」を書く</td><td><strong>コミットの質</strong></td></tr>
      <tr><td>2</td><td>ブランチは短命に保ち、チームで命名規則を統一する</td><td><strong>ブランチ管理</strong></td></tr>
      <tr><td>3</td><td>PRとレビューを品質と知識共有の場として積極的に活用する</td><td><strong>チームレビュー文化</strong></td></tr>
    </tbody>
  </table>
  <div class="callout callout-success" style="margin-top:1rem">
    <span class="callout-icon">📖</span>
    <div class="callout-body">
      <b>次のステップ：</b>次にコミットするとき、メッセージの先頭に<code>feat:</code>や<code>fix:</code>を付けてみましょう。小さな習慣が積み重なり、チーム全体の開発効率を底上げします。
    </div>
  </div>
</div>
