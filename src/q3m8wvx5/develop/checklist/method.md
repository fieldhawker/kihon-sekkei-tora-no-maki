---
title: メソッド作成チェックリスト
subtitle: チェックリスト
phase: impl
description: メソッド・関数を新規作成・レビューする際に確認すべき項目のチェックリストです。責務・命名・引数・戻り値・エラー処理・テスト容易性の観点を網羅しています。
---

<div class="callout callout-info" style="margin-top:0">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <b>このチェックリストの使い方</b><br>
    1) 実装前に「1. 責務・設計」を確認 → 2) 実装中に「3. 引数・戻り値」「4. エラー処理」を意識 → 3) 完成後に「6. テスト容易性」を確認。<br>
    迷ったら、<b>単一責任・命名の明確さ・エラーの明示</b>を最優先にします（保守性と読みやすさに直結）。
  </div>
</div>

<div class="callout callout-warning" style="margin-top:1rem">
  <span class="callout-icon">📌</span>
  <div class="callout-body">
    <b>初心者がハマりやすい3点</b><br>
    ① メソッドが「なんでもやる」長大な処理になる（→ 単一責任を徹底し、20〜30行を超えたら分割を検討）<br>
    ② 引数が多すぎて呼び出し側が混乱する（→ 引数が4つを超えたらオブジェクトでまとめる）<br>
    ③ nullを返してしまい呼び出し側でNullPointerExceptionが発生する（→ Optional/例外を使う）
  </div>
</div>

## 1. 責務・設計

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="m1-1"><label for="m1-1">メソッドが単一の責務を持っている（複数のことをやっていない）</label></li>
    <li><input type="checkbox" id="m1-2"><label for="m1-2">メソッドの処理が20〜30行以内に収まっている（超える場合は分割を検討）</label></li>
    <li><input type="checkbox" id="m1-3"><label for="m1-3">副作用（外部状態の変更・I/O）が最小化されている</label></li>
    <li><input type="checkbox" id="m1-4"><label for="m1-4">同じロジックが他の箇所にコピーされていない（DRY原則）</label></li>
    <li><input type="checkbox" id="m1-5"><label for="m1-5">publicメソッドとprivateメソッドのアクセス修飾子が適切に設定されている</label></li>
  </ul>
  <div class="table-wrap" style="margin-top:1.5rem">
    <table>
      <thead><tr><th>項目</th><th>良い例 ✅</th><th>悪い例 ❌ / 理由</th></tr></thead>
      <tbody>
        <tr><td>単一責任</td><td><code>validateEmail(email)</code>はメールアドレスの形式チェックのみ行う</td><td><code>processUser()</code>がバリデーション・DB保存・メール送信を一括でやる（変更理由が複数存在する）</td></tr>
        <tr><td>副作用の最小化</td><td>引数を受け取り、結果を戻り値で返す純粋関数として設計する</td><td>グローバル変数やフィールドを内部で書き換える（呼び出し順序への依存が生まれる）</td></tr>
        <tr><td>DRY原則</td><td>日付フォーマットのロジックを <code>formatDate(date, pattern)</code> としてまとめ、全箇所で呼び出す</td><td>同じフォーマット処理を3か所にコピー（バグ修正時に3か所直す必要が生じる）</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 2. 命名

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="m2-1"><label for="m2-1">メソッド名が動詞（または動詞+目的語）で始まっている</label></li>
    <li><input type="checkbox" id="m2-2"><label for="m2-2">名前を読むだけで何をするメソッドか分かる</label></li>
    <li><input type="checkbox" id="m2-3"><label for="m2-3">プロジェクトの命名規則（camelCase / snake_caseなど）に従っている</label></li>
    <li><input type="checkbox" id="m2-4"><label for="m2-4">boolean を返すメソッドは <code>is</code>/<code>has</code>/<code>can</code> などの接頭辞を使っている</label></li>
    <li><input type="checkbox" id="m2-5"><label for="m2-5">略語・意味不明な単語（<code>tmp</code>・<code>proc</code>・<code>data2</code>など）を使っていない</label></li>
  </ul>
  <div class="table-wrap" style="margin-top:1.5rem">
    <table>
      <thead><tr><th>操作種別</th><th>良い命名例 ✅</th><th>悪い命名例 ❌</th></tr></thead>
      <tbody>
        <tr><td>取得</td><td><code>getUserById(id)</code><br><code>findActiveOrders()</code></td><td><code>get(id)</code>・<code>data()</code>（何を取得するか不明）</td></tr>
        <tr><td>保存・更新</td><td><code>saveUserProfile(profile)</code><br><code>updateOrderStatus(orderId, status)</code></td><td><code>doUpdate()</code>・<code>proc()</code></td></tr>
        <tr><td>検証</td><td><code>isValidEmail(email)</code><br><code>hasPermission(user, resource)</code></td><td><code>checkMail()</code>・<code>validate()</code>（何を検証するか不明）</td></tr>
        <tr><td>変換</td><td><code>convertToDto(entity)</code><br><code>formatCurrency(amount, currency)</code></td><td><code>convert()</code>・<code>change(x)</code></td></tr>
        <tr><td>削除</td><td><code>deleteExpiredSessions()</code><br><code>removeItemFromCart(cartId, itemId)</code></td><td><code>del()</code>・<code>clean()</code></td></tr>
      </tbody>
    </table>
  </div>
</div>

## 3. 引数・戻り値

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="m3-1"><label for="m3-1">引数の数が4つ以内である（多い場合はオブジェクト・構造体にまとめる）</label></li>
    <li><input type="checkbox" id="m3-2"><label for="m3-2">引数の型が明確に定義されている（型ヒント・型注釈あり）</label></li>
    <li><input type="checkbox" id="m3-3"><label for="m3-3">nullを引数として受け取る設計になっていない</label></li>
    <li><input type="checkbox" id="m3-4"><label for="m3-4">戻り値の型が明確に定義されている</label></li>
    <li><input type="checkbox" id="m3-5"><label for="m3-5">nullを返すことがない（Optional・例外・空コレクションを代わりに使う）</label></li>
    <li><input type="checkbox" id="m3-6"><label for="m3-6">引数の順序に一貫性がある（例: 主対象が最初）</label></li>
  </ul>
  <div class="callout callout-warning" style="margin-top:1.5rem">
    <span class="callout-icon">⚠️</span>
    <div class="callout-body">
      <b>nullを返してはいけない理由</b>: 呼び出し元でnullチェックを強制し、チェック漏れがNullPointerExceptionを引き起こします。<br>
      ❌ <code>return null;</code>（ユーザーが見つからない場合）<br>
      ✅ <code>return Optional.empty();</code> または <code>throw new UserNotFoundException(id);</code>
    </div>
  </div>
  <div class="table-wrap" style="margin-top:1rem">
    <table>
      <thead><tr><th>項目</th><th>具体例・考え方</th></tr></thead>
      <tbody>
        <tr><td>引数が多い場合</td><td>❌ <code>createOrder(userId, productId, quantity, price, couponCode, note)</code><br>✅ <code>createOrder(OrderRequest request)</code>（OrderRequestオブジェクトにまとめる）</td></tr>
        <tr><td>Optional の使い方</td><td><code>Optional&lt;User&gt; findById(Long id)</code> → 呼び出し側: <code>user.orElseThrow(() -&gt; new NotFoundException(id))</code></td></tr>
        <tr><td>空コレクションを返す</td><td>一覧取得で0件の場合は <code>null</code> でなく <code>Collections.emptyList()</code> を返す → 呼び出し側でnullチェック不要</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 4. エラー処理

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="m4-1"><label for="m4-1">想定外の引数・状態に対して適切な例外をスローしている</label></li>
    <li><input type="checkbox" id="m4-2"><label for="m4-2">例外メッセージに「何が・どの値が・なぜ」問題かが含まれている</label></li>
    <li><input type="checkbox" id="m4-3"><label for="m4-3">例外を握りつぶしていない（空のcatch節がない）</label></li>
    <li><input type="checkbox" id="m4-4"><label for="m4-4">チェック例外とアンチェック例外の使い分けが適切である</label></li>
    <li><input type="checkbox" id="m4-5"><label for="m4-5">リソース（ファイル・DB接続など）を使用する場合は必ずクローズしている（try-with-resources等）</label></li>
  </ul>
  <div class="table-wrap" style="margin-top:1.5rem">
    <table>
      <thead><tr><th>項目</th><th>良い例 ✅</th><th>悪い例 ❌</th></tr></thead>
      <tbody>
        <tr><td>例外メッセージ</td><td><code>throw new IllegalArgumentException("userId は正の整数である必要があります: " + userId);</code></td><td><code>throw new Exception("エラー");</code>（何が問題か分からない）</td></tr>
        <tr><td>例外の握りつぶし</td><td>catchして処理できない場合はログを残してリスロー: <code>log.error("処理失敗", e); throw e;</code></td><td><code>} catch (Exception e) { }</code>（エラーが発生しても何も起きないように見える）</td></tr>
        <tr><td>リソース解放</td><td><code>try (var conn = dataSource.getConnection()) { ... }</code>（try-with-resources）</td><td>finallyでクローズを忘れ、コネクションリークが発生する</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 5. コードの可読性

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="m5-1"><label for="m5-1">ネストが深くなっていない（原則3段まで）</label></li>
    <li><input type="checkbox" id="m5-2"><label for="m5-2">マジックナンバー・マジック文字列を使っていない（定数・enumを使う）</label></li>
    <li><input type="checkbox" id="m5-3"><label for="m5-3">早期リターン（ガード節）を使ってネストを浅くしている</label></li>
    <li><input type="checkbox" id="m5-4"><label for="m5-4">非自明なロジックにのみコメントを付けている（コードで分かることは書かない）</label></li>
    <li><input type="checkbox" id="m5-5"><label for="m5-5">条件式が複雑な場合は変数に意味のある名前を付けて分解している</label></li>
  </ul>
  <div class="table-wrap" style="margin-top:1.5rem">
    <table>
      <thead><tr><th>項目</th><th>良い例 ✅</th><th>悪い例 ❌</th></tr></thead>
      <tbody>
        <tr>
          <td>ガード節（早期リターン）</td>
          <td><pre style="font-size:.8rem;margin:0">if (user == null) throw new NotFoundException();
if (!user.isActive()) throw new ForbiddenException();
// ここから正常系処理</pre></td>
          <td><pre style="font-size:.8rem;margin:0">if (user != null) {
  if (user.isActive()) {
    // 正常系処理（ネストが深い）
  }
}</pre></td>
        </tr>
        <tr><td>マジックナンバー排除</td><td><code>if (age &gt;= ADULT_AGE_THRESHOLD)</code>（定数で意味を明示）</td><td><code>if (age &gt;= 18)</code>（なぜ18なのかコードだけでは分からない）</td></tr>
        <tr><td>複雑な条件式の分解</td><td><code>boolean isEligibleForDiscount = isVipMember &amp;&amp; purchaseAmount &gt;= MIN_DISCOUNT_AMOUNT;</code></td><td><code>if (user.type == 2 &amp;&amp; amount &gt;= 10000)</code>（2や10000の意味が不明）</td></tr>
      </tbody>
    </table>
  </div>
</div>

## 6. テスト容易性

<div class="card">
  <ul class="checklist">
    <li><input type="checkbox" id="m6-1"><label for="m6-1">メソッドが外部依存（DB・API・現在時刻）を直接参照していない（依存性注入を使う）</label></li>
    <li><input type="checkbox" id="m6-2"><label for="m6-2">同じ引数に対して常に同じ結果を返す（純粋関数に近い設計）</label></li>
    <li><input type="checkbox" id="m6-3"><label for="m6-3">テストすべきロジックがprivateに隠蔽されすぎていない</label></li>
    <li><input type="checkbox" id="m6-4"><label for="m6-4">正常系・異常系・境界値のテストケースが網羅できる設計になっている</label></li>
    <li><input type="checkbox" id="m6-5"><label for="m6-5">単体テストが既に作成されている、またはレビュー前に作成される予定がある</label></li>
  </ul>
  <div class="callout callout-info" style="margin-top:1.5rem">
    <span class="callout-icon">💡</span>
    <div class="callout-body">
      <b>現在時刻への依存をテスト可能にする方法</b>: <code>LocalDateTime.now()</code> を直接呼ぶと、テスト時に時刻を固定できません。<br>
      ✅ <code>Clock clock</code> をコンストラクタで受け取り、<code>LocalDateTime.now(clock)</code> を使う → テスト時は <code>Clock.fixed(...)</code> を渡す
    </div>
  </div>
</div>
