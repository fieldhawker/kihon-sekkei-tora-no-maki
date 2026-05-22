---
title: 達人プログラマー
subtitle: 書籍まとめ / 技術
phase: adr
description: David Thomas・Andrew Hunt著。「ただコードを書く人」から「考えて問題を解決できるプロフェッショナル」へ成長するための哲学とプラクティスを集めた名著。初版から20年以上読み継がれ、世界中のエンジニアに影響を与えています。
---

<div class="callout callout-info" style="margin-top:0">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <b>このページの使い方（初心者向け）</b><br>
    達人プログラマーは「こうすれば動く」ではなく、<b>「どう考えるか・どう成長するか」</b>を教えてくれる本です。最初から全部を実践する必要はありません。<b>「達人の姿勢」→「実践的なアプローチ」→「チームと道具」</b>の順に読み進めると、エンジニアとしての土台が整います。
  </div>
</div>

## 🌟 達人プログラマーとは何者か

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8f4e8">🎯</span><h2>「達人」＝ただの熟練者ではない</h2></div>
  <p>本書で言う「達人プログラマー」とは、ただ長く経験を積んだ人ではありません。<strong>自分のキャリア・スキル・仕事に対して主体的に責任を持ち、常に成長し続ける人</strong>のことです。</p>

  <div class="grid-2col">
    <div style="border:2px solid #dc3545; border-radius:8px; padding:1rem; background:#fff5f5">
      <h3 style="margin:0 0 0.5rem; color:#dc3545">😰 普通のプログラマー</h3>
      <ul style="margin:0; padding-left:1.25rem">
        <li>「言われたことをやる」</li>
        <li>ツールや言語を受け身で使う</li>
        <li>問題が起きたら誰かのせいにする</li>
        <li>同じミスを繰り返す</li>
        <li>技術の流行に乗り遅れる</li>
      </ul>
    </div>
    <div style="border:2px solid #28a745; border-radius:8px; padding:1rem; background:#f5fff5">
      <h3 style="margin:0 0 0.5rem; color:#28a745">😊 達人プログラマー</h3>
      <ul style="margin:0; padding-left:1.25rem">
        <li>「問題を解決する」を目標にする</li>
        <li>道具を使いこなし、自分で磨く</li>
        <li>自分の作業に責任を持つ</li>
        <li>振り返りで学び続ける</li>
        <li>知識のポートフォリオを管理する</li>
      </ul>
    </div>
  </div>
</div>

## 🪟 割れ窓を放置するな

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fde8e8">🏘️</span><h2>小さな劣化が全体を腐らせる</h2></div>
  <p>犯罪学の「割れ窓理論」をソフトウェアに応用した考え方です。建物の窓が一枚割れて放置されると、やがて全部の窓が割られる——コードも同じです。</p>
  <div class="callout callout-warn" style="margin-top:1rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">
      <b>割れ窓の例：</b>「この変数名、わかりにくいけどまあいいか」「このTODOコメント、ずっと残ってるな」——こういった小さな妥協が積み重なると、チーム全体の「まあいいか」文化ができあがり、コードベースは急速に劣化します。
    </div>
  </div>
  <div style="border:2px solid #28a745; border-radius:8px; padding:1rem; background:#f5fff5; margin-top:1rem">
    <h3 style="margin:0 0 0.5rem; color:#28a745">実践：割れ窓を見つけたら</h3>
    <ol style="margin:0; padding-left:1.25rem">
      <li>今すぐ直せるなら直す（Boy Scout Rule：来たときより綺麗にして去る）</li>
      <li>今は直せないなら、タスクとして記録して忘れないようにする</li>
      <li>「自分が直さなくていい」とは思わない——コードはチームの共有資産</li>
    </ol>
  </div>
</div>

## ♻️ DRY原則：繰り返しを避けよ

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fef3cd">📋</span><h2>Don't Repeat Yourself（同じことを2度書くな）</h2></div>
  <p>DRYは本書が広めた最も有名な原則のひとつです。<strong>「あらゆる知識は、システムの中に単一の・明確な・権威ある表現を持たなければならない」</strong>と定義されています。</p>

  <div class="grid-2col">
    <div style="border:2px solid #dc3545; border-radius:8px; padding:1rem; background:#fff5f5">
      <h3 style="margin:0 0 0.5rem; color:#dc3545; font-size:0.9rem">😰 DRY違反の例（WET）</h3>
      <pre style="margin:0; font-size:0.8rem; background:#f8f9fa; padding:0.75rem; border-radius:4px; overflow-x:auto">// 注文画面でも
if (price > 10000) {
  discount = price * 0.1;
}

// 請求画面でも同じ計算
if (price > 10000) {
  discount = price * 0.1;
}
// → 割引率を変更するときに2箇所直す必要がある</pre>
    </div>
    <div style="border:2px solid #28a745; border-radius:8px; padding:1rem; background:#f5fff5">
      <h3 style="margin:0 0 0.5rem; color:#28a745; font-size:0.9rem">😊 DRYな例</h3>
      <pre style="margin:0; font-size:0.8rem; background:#f8f9fa; padding:0.75rem; border-radius:4px; overflow-x:auto">// 一箇所にまとめる
function calcDiscount(price) {
  if (price > 10000) {
    return price * 0.1;
  }
  return 0;
}

// どこからでも呼び出す
discount = calcDiscount(price);
// → 変更は1箇所だけ</pre>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">
      <b>DRYはコードだけじゃない：</b>ドキュメント、データベース定義、テスト、設定ファイルにも当てはまります。「同じことが2箇所に書かれている」と感じたら、それはDRY違反のサインです。
    </div>
  </div>
</div>

## 📐 直交性：影響の範囲を小さくせよ

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8f0fe">🔲</span><h2>変更がほかに影響しない設計を目指す</h2></div>
  <p>数学の「直交」（x軸を変えてもy軸が変わらない）から来ています。ソフトウェアでは<strong>「あるモジュールの変更が、別のモジュールに影響しないこと」</strong>を指します。</p>

  <div style="display:grid; gap:0.75rem; margin-top:0.75rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">直交性が低い（悪い例）</h3>
      <p style="margin:0">「データベースの種類を変えたら、画面の表示ロジックも修正が必要になった」——DBとUIが結合しているため、変更の影響が予測できない状態。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">直交性が高い（良い例）</h3>
      <p style="margin:0">「データベースを変えても、画面のコードは一切触らなくてよい」——DB層・ビジネスロジック層・UI層が独立しているため、変更が局所的に収まる。</p>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">
      <b>初心者への一言：</b>「この関数を変えたら、関係ないところが壊れた」という経験をしたことはありませんか？それが直交性の低さです。関数・クラス・モジュールを小さく保ち、役割をひとつに絞ることで直交性が上がります。
    </div>
  </div>
</div>

## 🔦 曳光弾：動くものを早く作る

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fff3cd">🎯</span><h2>「完璧なもの」より「動くもの」を早く届ける</h2></div>
  <p>機関銃の「曳光弾（軌道が光るトレーサー弾）」から来たメタファーです。暗闇の中で完璧に狙いを定めて一発で当てようとするより、<strong>光る弾で軌道を確認しながら少しずつ修正する</strong>方が確実に当たります。</p>

  <div style="border:1px solid var(--border); border-radius:8px; padding:1rem; margin-top:0.75rem">
    <h3 style="margin:0 0 0.75rem; color:var(--primary)">曳光弾開発の進め方</h3>
    <ol style="margin:0; padding-left:1.25rem; display:grid; gap:0.5rem">
      <li><strong>まずエンドツーエンドで動くスケルトンを作る</strong>（UIから画面表示まで最短経路を繋ぐ）</li>
      <li>ユーザーやチームに見せてフィードバックをもらう</li>
      <li>方向を微調整しながら肉付けしていく</li>
    </ol>
  </div>

  <div class="grid-2col">
    <div style="border:2px solid #dc3545; border-radius:8px; padding:1rem; background:#fff5f5">
      <h3 style="margin:0 0 0.5rem; color:#dc3545">プロトタイプとの違いは？</h3>
      <p style="margin:0; font-size:0.9rem"><strong>プロトタイプ</strong>は「使い捨て」で、検証後に破棄します。確認したいひとつの問いに集中します。</p>
    </div>
    <div style="border:2px solid #28a745; border-radius:8px; padding:1rem; background:#f5fff5">
      <h3 style="margin:0 0 0.5rem; color:#28a745">曳光弾の特徴</h3>
      <p style="margin:0; font-size:0.9rem"><strong>曳光弾</strong>は「本番コード」として残り続けます。最初は機能が少ないが、本物の土台を作ります。</p>
    </div>
  </div>
</div>

## 📚 知識のポートフォリオを管理せよ

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8f4e8">💼</span><h2>エンジニアの最大の資産は「知識」</h2></div>
  <p>投資家が資産ポートフォリオを管理するように、エンジニアも<strong>自分の知識を意図的に管理・投資すべき</strong>だと本書は言います。技術は陳腐化します。学び続けなければ価値は下がります。</p>

  <table class="comparison-table" style="margin-top:0.75rem">
    <thead><tr><th>投資の考え方</th><th>知識への応用</th></tr></thead>
    <tbody>
      <tr><td>定期的に投資する</td><td>毎日少しずつ学ぶ習慣を作る</td></tr>
      <tr><td>分散投資でリスクを減らす</td><td>1つの言語・技術に依存しすぎない</td></tr>
      <tr><td>リターンを最大化する</td><td>今後需要が伸びる技術に先行投資する</td></tr>
      <tr><td>定期的に見直す</td><td>学んだことが今も使えるか定期的に確認する</td></tr>
    </tbody>
  </table>

  <div class="callout callout-info" style="margin-top:1rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">
      <b>毎年「1つの新しい言語」を学ぼう：</b>本書のアドバイスは「毎年少なくとも1つの新しい言語を学ぶ」こと。目的は「その言語を使えるようになる」ではなく、<b>「異なるものの考え方を身につける」</b>ことです。新しい言語に触れると、今まで使ってきた言語の特徴も改めて見えてきます。
    </div>
  </div>
</div>

## ⚙️ エンジニアの道具を磨け

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#f3e8ff">🛠️</span><h2>道具を使いこなすことが生産性を左右する</h2></div>
  <p>大工が自分の道具を大切にするように、エンジニアも<strong>エディタ・シェル・バージョン管理などの道具を使いこなし、自分に合うよう設定する</strong>べきです。</p>

  <div style="display:grid; gap:0.75rem; margin-top:0.75rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">エディタを本当に使いこなす</h3>
      <p style="margin:0">マウスなしで操作できていますか？ショートカット・マクロ・プラグインを活用していますか？「ちょっと不便だな」と感じたら設定を改善しましょう。積み重ねが大きな差になります。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">コマンドラインを活用する</h3>
      <p style="margin:0">GUIで「何となく」やっていることを、コマンドラインで自動化できないか考えましょう。繰り返し作業をスクリプト化すると、ミスが減り時間も節約できます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">バージョン管理はすべてに使う</h3>
      <p style="margin:0">コードだけでなく、設定ファイル・ドキュメント・スクリプトもバージョン管理対象にしましょう。「あのとき何を変えたか」が追跡できることが、安心して作業できる土台になります。</p>
    </div>
  </div>
</div>

## 🐛 デバッグのアプローチ

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fde8e8">🔍</span><h2>バグを責めるのではなく、なぜ起きたかを考える</h2></div>
  <p>本書はデバッグを「問題解決のパズル」として捉えます。感情的にならず、<strong>科学的なアプローチ（観察→仮説→検証）</strong>で向き合うことを推奨しています。</p>

  <div style="display:grid; gap:0.75rem; margin-top:0.75rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">① 責任を取る（他人のせいにしない）</h3>
      <p style="margin:0">「ライブラリのバグだ」「仕様が悪い」と決めつける前に、まず自分のコードを疑いましょう。本当にライブラリ側の問題だったとしても、それを確認する証拠を集めることが大切です。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">② 再現させる</h3>
      <p style="margin:0">「たまに起きる」バグは最も危険です。まずバグを確実に再現させる手順を見つけましょう。再現できれば、修正を確認することもできます。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">③ 根本原因を直す</h3>
      <p style="margin:0">症状だけを抑える応急処置（「ここでnullチェックすれば動く」）ではなく、なぜそこでnullになるのかを追いましょう。根本から直すと、同種のバグが再発しません。</p>
    </div>
  </div>

  <div class="callout callout-warn" style="margin-top:1rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">
      <b>ゴムのアヒルデバッグ：</b>誰かに「このバグなんですけど…」と説明しようとした瞬間、自分で答えに気づいた経験はありませんか？これが「ラバーダック・デバッグ」です。人でなく、ぬいぐるみや紙でも効果があります。説明を声に出すことで、思考が整理されます。
    </div>
  </div>
</div>

## 📝 契約による設計（DbC）

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#e8f0fe">🤝</span><h2>関数には「約束」がある</h2></div>
  <p>Design by Contract（契約による設計）は、関数を「呼び出す側」と「実装する側」の間の契約として捉える考え方です。</p>

  <table class="comparison-table" style="margin-top:0.75rem">
    <thead><tr><th>契約の種類</th><th>意味</th><th>例</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>事前条件</strong><br>（Precondition）</td>
        <td>関数を呼ぶ前に<br>満たすべき条件</td>
        <td>「引数は正の数でなければならない」</td>
      </tr>
      <tr>
        <td><strong>事後条件</strong><br>（Postcondition）</td>
        <td>関数が終わった後に<br>保証される状態</td>
        <td>「戻り値は必ず空でないリストである」</td>
      </tr>
      <tr>
        <td><strong>クラス不変条件</strong><br>（Invariant）</td>
        <td>常に成り立つ<br>オブジェクトの状態</td>
        <td>「残高は常に0以上である」</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-info" style="margin-top:1rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">
      <b>初心者への一言：</b>難しく考えなくてOKです。「この関数は何を期待して、何を返すか」をコメントや変数名で明示するだけでも、契約による設計の精神に沿っています。バリデーション処理も事前条件の一種です。
    </div>
  </div>
</div>

## 💬 コミュニケーション：エンジニアも伝える力が必要

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:#fef3cd">🗣️</span><h2>技術力と伝える力はセットである</h2></div>
  <p>優れたアイデアも、相手に伝わらなければ意味がありません。本書はコミュニケーション能力をエンジニアの必須スキルとして位置づけています。</p>

  <div style="display:grid; gap:0.75rem; margin-top:0.75rem">
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">聴衆を知る（WISDOM頭字語）</h3>
      <p style="margin:0">伝える相手は誰か？技術者か、非技術者か？何を知りたいのか？どれくらいの詳細度が適切か？伝える前に相手のことを考えることで、メッセージの効果が大きく変わります。</p>
    </div>
    <div style="border:1px solid var(--border); border-radius:8px; padding:1rem">
      <h3 style="margin:0 0 0.5rem; color:var(--primary)">ドキュメントはコードと一緒に育てる</h3>
      <p style="margin:0">コードとドキュメントを別物として扱うと、すぐに乖離します。コードに近い場所（コメント・テスト・README）にドキュメントを置き、コードを変えたときに一緒に更新する習慣を持ちましょう。</p>
    </div>
  </div>
</div>

## 🎓 達人への道：明日からできること

<div class="card">
  <div class="card-header"><span class="card-icon" style="background:var(--primary-lt)">🚀</span><h2>達人プログラマーになるためのファーストステップ</h2></div>

  <table class="comparison-table" style="margin-top:0.75rem">
    <thead><tr><th>#</th><th>今日からできること</th><th>目的</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>コードを見て「割れ窓」を1つ直す</td><td>小さな改善の習慣をつける</td></tr>
      <tr><td>2</td><td>コピペしているコードを関数にまとめる</td><td>DRY原則を実践する</td></tr>
      <tr><td>3</td><td>エディタのショートカットを1つ覚える</td><td>道具を磨く</td></tr>
      <tr><td>4</td><td>バグの根本原因を書き残す</td><td>振り返りと学習</td></tr>
      <tr><td>5</td><td>気になった技術書・記事を1つ読み始める</td><td>知識のポートフォリオ投資</td></tr>
    </tbody>
  </table>

  <div class="callout callout-info" style="margin-top:1rem">
    <span class="callout-icon">🌱</span>
    <div class="callout-body">
      <b>一番大切なメッセージ：</b>達人プログラマーは「天才」ではありません。<strong>毎日少しずつ、意識的に改善し続ける人</strong>のことです。完璧を目指す必要はなく、昨日の自分より少しだけ良いコードを書くことを目標にしましょう。その積み重ねが、数年後に大きな差を生みます。
    </div>
  </div>
</div>
