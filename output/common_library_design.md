# 共通ライブラリ設計書

> **このファイルの目的**: 一般的なWebシステムで複数機能にまたがって使われる共通処理を、詳細設計フェーズで事前にライブラリ化するための設計指針をまとめます。
> **なぜ事前に共通化するか**: 各機能担当が個別に実装すると、同じ処理が微妙に異なる実装で乱立し、バグの温床・品質のばらつき・テスト工数の増大を招きます。詳細設計フェーズで先行して設計・実装しておくことで、機能開発の品質と速度が向上します。

---

## 共通ライブラリ 一覧

| No. | ライブラリ名 | 概要 | 優先度 |
|----|-----------|-----|------|
| C-01 | [認証・認可](#c-01-認証認可ライブラリ) | ログイン・JWTトークン・権限チェック | ★★★ 最優先 |
| C-02 | [エラーハンドリング](#c-02-エラーハンドリングライブラリ) | 例外の統一処理・エラーレスポンス形式 | ★★★ 最優先 |
| C-03 | [バリデーション](#c-03-バリデーションライブラリ) | 入力チェックルールの共通化 | ★★★ 最優先 |
| C-04 | [ログ出力](#c-04-ログ出力ライブラリ) | アクセスログ・監査ログ・アプリログの統一 | ★★★ 最優先 |
| C-05 | [レスポンス統一フォーマット](#c-05-レスポンス統一フォーマット) | APIレスポンスのラッパー構造 | ★★★ 最優先 |
| C-06 | [ページネーション](#c-06-ページネーションライブラリ) | 一覧取得の共通ページング処理 | ★★☆ 高 |
| C-07 | [ファイル操作](#c-07-ファイル操作ライブラリ) | アップロード・ダウンロード・ストレージ抽象化 | ★★☆ 高 |
| C-08 | [メール送信](#c-08-メール送信ライブラリ) | テンプレートメール送信の共通化 | ★★☆ 高 |
| C-09 | [外部APIクライアント](#c-09-外部apiクライアントライブラリ) | HTTPリクエストのリトライ・タイムアウト共通化 | ★★☆ 高 |
| C-10 | [キャッシュ](#c-10-キャッシュライブラリ) | キャッシュ操作の抽象化 | ★★☆ 高 |
| C-11 | [日付・時刻処理](#c-11-日付時刻処理ライブラリ) | タイムゾーン・フォーマット統一 | ★★☆ 高 |
| C-12 | [DB共通処理](#c-12-db共通処理ライブラリ) | 論理削除・監査カラム・共通リポジトリ | ★★☆ 高 |
| C-13 | [コードマスタ管理](#c-13-コードマスタ管理ライブラリ) | マスタデータの取得・キャッシュ | ★★☆ 高 |
| C-14 | [ID生成](#c-14-id生成ライブラリ) | UUID・採番の統一 | ★☆☆ 中 |
| C-15 | [文字列ユーティリティ](#c-15-文字列ユーティリティ) | 全角半角変換・マスキング・サニタイズ | ★☆☆ 中 |
| C-16 | [通知・アラート](#c-16-通知アラートライブラリ) | Slack・メール等への障害通知 | ★☆☆ 中 |
| C-17 | [設定管理](#c-17-設定管理ライブラリ) | 環境変数の型安全な読み込み | ★☆☆ 中 |

> **優先度の基準**: 最初の機能を実装し始める前に「最優先」を完成させてください。「高」は2〜3機能目に入る前までに用意します。「中」は必要になってから追加しても間に合います。

---

## C-01. 認証・認可ライブラリ

### 概要
ログイン・ログアウト・JWTトークンの生成と検証・権限チェックを共通化します。各APIで個別に認証コードを書くと、抜け漏れや実装差異がセキュリティホールになります。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| パスワードハッシュ化 | bcrypt等でのハッシュ生成・照合 |
| JWTアクセストークン生成 | ペイロード（ユーザーID・ロール・有効期限）を含むトークン生成 |
| JWTリフレッシュトークン生成 | 長期有効な再発行用トークン |
| トークン検証 | 署名検証・有効期限チェック |
| トークンからユーザー情報取得 | ペイロードの安全なデコード |
| ロールチェック | 指定ロールを持つか検証するアノテーション/デコレーター |
| 現在ログインユーザー取得 | リクエストコンテキストからユーザー情報を取り出す |

### インタフェース設計例（Java / Spring Boot）

```java
// パスワードサービス
public interface PasswordService {
    String hash(String rawPassword);
    boolean matches(String rawPassword, String hashedPassword);
}

// JWTサービス
public interface JwtService {
    String generateAccessToken(Long userId, String role);   // 有効期限: 15分
    String generateRefreshToken(Long userId);               // 有効期限: 7日
    Claims parseToken(String token);                        // 無効なら例外をスロー
    Long extractUserId(String token);
    String extractRole(String token);
}

// 現在ユーザー取得（SecurityContextから）
public interface CurrentUserProvider {
    Long getCurrentUserId();
    String getCurrentUserRole();
    boolean hasRole(String role);
}
```

```java
// 認可アノテーション（コントローラーに付与して使う）
@RequireRole("ADMIN")
@GetMapping("/admin/users")
public ResponseEntity<?> listUsers() { ... }
```

### インタフェース設計例（TypeScript / Node.js）

```typescript
// jwt.service.ts
export interface TokenPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

export interface JwtService {
  generateAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string;
  generateRefreshToken(userId: number): string;
  verify(token: string): TokenPayload;   // 無効なら例外をスロー
}

// current-user.decorator.ts（Expressのミドルウェアで req.user にセット済みの想定）
export function getCurrentUser(req: Request): TokenPayload {
  if (!req.user) throw new UnauthorizedException();
  return req.user as TokenPayload;
}
```

### 注意点
- JWTの秘密鍵は環境変数で管理し、絶対にコードに埋め込まない
- アクセストークンの有効期限は短く（15〜30分）、リフレッシュトークンで再発行する設計にする
- トークンの失効（ログアウト時のブラックリスト化）が必要か要件を確認する

---

## C-02. エラーハンドリングライブラリ

### 概要
アプリケーション全体で発生する例外を一か所で捕捉し、統一されたエラーレスポンスを返す仕組みです。各APIで個別に `try-catch` を書くと、エラーレスポンスの形式がバラバラになります。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| グローバル例外ハンドラー | 未捕捉の例外を一か所で処理するフィルター/ミドルウェア |
| アプリケーション例外クラス | ビジネスエラーを表す基底例外クラス（エラーコード付き） |
| エラーレスポンス生成 | 統一フォーマットのエラーJSONを生成 |
| バリデーションエラー変換 | フレームワークのバリデーション例外を統一フォーマットに変換 |
| エラーコード体系 | システム全体のエラーコード定義 |

### エラーレスポンス統一フォーマット

```json
{
  "status": 400,
  "errorCode": "VALIDATION_ERROR",
  "message": "入力値に誤りがあります",
  "errors": [
    {
      "field": "amount",
      "message": "金額は1以上9,999,999以下で入力してください"
    },
    {
      "field": "title",
      "message": "申請タイトルを入力してください"
    }
  ],
  "timestamp": "2024-11-01T10:30:00+09:00",
  "path": "/api/expenses"
}
```

### エラーコード体系の設計例

```
[カテゴリ2文字][サブカテゴリ2文字][連番3桁]

例:
AUTH_001  : 認証失敗（メール/パスワード不一致）
AUTH_002  : トークン有効期限切れ
AUTH_003  : 権限不足
VALID_001 : 必須項目未入力
VALID_002 : 文字数超過
VALID_003 : 形式不正
BIZ_001   : 申請が存在しない
BIZ_002   : 既に承認済みの申請は差し戻せない
SYS_001   : データベース接続エラー
SYS_002   : 外部API呼び出しタイムアウト
```

### インタフェース設計例（Java / Spring Boot）

```java
// アプリケーション例外の基底クラス
public class AppException extends RuntimeException {
    private final String errorCode;
    private final int httpStatus;

    public AppException(String errorCode, String message, int httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
}

// 具体的なビジネス例外
public class ResourceNotFoundException extends AppException {
    public ResourceNotFoundException(String resource, Long id) {
        super("BIZ_001", resource + " が見つかりません (id=" + id + ")", 404);
    }
}

public class ForbiddenException extends AppException {
    public ForbiddenException() {
        super("AUTH_003", "この操作を行う権限がありません", 403);
    }
}

// グローバル例外ハンドラー（@RestControllerAdvice）
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException e) { ... }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(...) { ... }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedException(Exception e) { ... }
}
```

### 注意点
- 本番環境では `SYS_001` 系のエラーに内部スタックトレースを含めない（情報漏洩リスク）
- ログには詳細なスタックトレースを出力し、レスポンスには最小限のメッセージだけを返す

---

## C-03. バリデーションライブラリ

### 概要
入力値の正当性チェックルールを共通化します。「メールアドレス形式チェック」「電話番号チェック」「日付範囲チェック」などを各機能で書き直すことを防ぎます。

### 共通化すべきバリデーションルール

| ルール名 | 内容 |
|--------|------|
| 必須チェック | null・空文字・空白のみを拒否 |
| 文字数チェック | 最小・最大文字数の検証 |
| 数値範囲チェック | 最小値・最大値の検証 |
| メールアドレス形式 | RFC準拠のメール形式検証 |
| 電話番号形式 | 国内電話番号形式（ハイフンあり/なし両対応） |
| 日付形式 | 指定フォーマットの日付文字列かどうか |
| 日付範囲 | 開始日 ≦ 終了日の検証 |
| 過去日チェック | 今日以降の日付かどうか |
| 半角英数字のみ | パスワードや識別子等に使用 |
| 禁止文字チェック | SQLインジェクション・スクリプト注入の疑いがある文字列を弾く |
| ファイル形式チェック | 許可するMIMEタイプか検証 |
| ファイルサイズチェック | 上限サイズを超えていないか検証 |

### インタフェース設計例（Java / Bean Validation アノテーション）

```java
// カスタムアノテーションの例
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateRangeValidator.class)
public @interface ValidDateRange {
    String message() default "開始日は終了日以前の日付を入力してください";
    String startField();
    String endField();
}

// 使用例（リクエストDTOに付与）
@ValidDateRange(startField = "startDate", endField = "endDate")
public class SearchRequest {
    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;
}
```

### インタフェース設計例（TypeScript / Zod）

```typescript
// common-validators.ts
import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('メールアドレスの形式が正しくありません');

export const phoneSchema = z
  .string()
  .regex(/^0\d{1,4}-\d{1,4}-\d{4}$/, '電話番号の形式が正しくありません（例: 03-1234-5678）');

export const dateRangeSchema = z
  .object({ startDate: z.string().date(), endDate: z.string().date() })
  .refine(({ startDate, endDate }) => startDate <= endDate, {
    message: '開始日は終了日以前の日付を入力してください',
    path: ['startDate'],
  });

// 使用例（APIのリクエストスキーマ）
export const createExpenseSchema = z.object({
  title:     z.string().min(1, '申請タイトルを入力してください').max(100),
  amount:    z.number().int().min(1).max(9_999_999),
  startDate: z.string().date(),
  endDate:   z.string().date(),
}).and(dateRangeSchema);
```

### 注意点
- バリデーションは必ずサーバーサイドで実施する（フロントエンドのチェックは補助）
- エラーメッセージはC-02のエラーレスポンス形式と合わせて返す

---

## C-04. ログ出力ライブラリ

### 概要
アクセスログ・アプリケーションログ・監査ログを統一されたフォーマットで出力する仕組みです。ログの形式がバラバラだと、障害発生時の調査や監視ツールへの取り込みが困難になります。

### ログの種類と用途

| ログ種別 | 用途 | 出力タイミング |
|--------|------|------------|
| アクセスログ | どのAPIが呼ばれたか・レスポンスタイム | 全APIリクエスト/レスポンス時 |
| アプリケーションログ | デバッグ情報・処理の進捗 | 開発者が必要な箇所に手動で埋め込む |
| エラーログ | 例外・スタックトレース | 例外発生時（C-02のグローバルハンドラーで出力） |
| 監査ログ | 誰が・いつ・何をしたか（セキュリティ証跡） | 重要操作（ログイン・データ変更・権限操作）時 |
| バッチログ | バッチの開始・終了・件数・エラー | バッチ処理の要所 |

### ログフォーマット（JSON構造化ログ推奨）

```json
// アクセスログの例
{
  "type": "ACCESS",
  "timestamp": "2024-11-01T10:30:00.123+09:00",
  "traceId": "abc-123-def-456",
  "userId": 42,
  "method": "POST",
  "path": "/api/expenses",
  "statusCode": 201,
  "durationMs": 145,
  "userAgent": "Mozilla/5.0 ...",
  "ip": "192.168.1.10"
}

// 監査ログの例
{
  "type": "AUDIT",
  "timestamp": "2024-11-01T10:30:00.123+09:00",
  "traceId": "abc-123-def-456",
  "userId": 42,
  "action": "EXPENSE_SUBMIT",
  "targetId": 1001,
  "targetType": "Expense",
  "before": null,
  "after": { "status": "submitted", "amount": 5000 }
}
```

> **JSON構造化ログを使う理由**: テキストログより機械が読みやすく、DatadogやCloudWatch LogsでのJSONフィルタリング・集計が容易になります。

### インタフェース設計例

```java
// 監査ログサービス
public interface AuditLogger {
    void log(AuditAction action, String targetType, Long targetId,
             Object before, Object after);
}

public enum AuditAction {
    LOGIN, LOGOUT, EXPENSE_CREATE, EXPENSE_SUBMIT,
    EXPENSE_APPROVE, EXPENSE_REJECT, USER_CREATE, USER_ROLE_CHANGE
}

// 使用例
auditLogger.log(AuditAction.EXPENSE_APPROVE, "Expense", expenseId, before, after);
```

```java
// トレースID（リクエストを横断的に追跡するID）の伝播
// MDCを使ってスレッドローカルに保持し、全ログに自動付与する
public class TraceIdFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ...) {
        String traceId = UUID.randomUUID().toString();
        MDC.put("traceId", traceId);
        try { chain.doFilter(req, res); }
        finally { MDC.clear(); }
    }
}
```

### ログに含めてはいけない情報
- パスワード・PINコード
- クレジットカード番号・CVV
- JWTトークン全文
- APIキー・シークレットキー

---

## C-05. レスポンス統一フォーマット

### 概要
全APIの成功レスポンスを統一したJSONフォーマットで返す仕組みです。フロントエンドがレスポンスを処理するコードを統一できます。

### 成功レスポンスのフォーマット

```json
// 単一リソース取得の場合
{
  "data": {
    "id": 1,
    "title": "11月交通費",
    "amount": 3200
  },
  "meta": {
    "timestamp": "2024-11-01T10:30:00+09:00"
  }
}

// 一覧取得（ページネーション付き）の場合
{
  "data": [ { "id": 1, ... }, { "id": 2, ... } ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "totalCount": 150,
    "totalPages": 8,
    "timestamp": "2024-11-01T10:30:00+09:00"
  }
}
```

### インタフェース設計例（Java）

```java
// レスポンスラッパークラス
@Getter
public class ApiResponse<T> {
    private final T data;
    private final Meta meta;

    public static <T> ApiResponse<T> of(T data) {
        return new ApiResponse<>(data, Meta.now());
    }

    public static <T> ApiResponse<PageResult<T>> ofPage(PageResult<T> page) {
        return new ApiResponse<>(page, Meta.now());
    }
}

// 使用例（コントローラー）
@GetMapping("/{id}")
public ResponseEntity<ApiResponse<ExpenseDto>> getExpense(@PathVariable Long id) {
    ExpenseDto dto = expenseService.findById(id);
    return ResponseEntity.ok(ApiResponse.of(dto));
}
```

### インタフェース設計例（TypeScript）

```typescript
// response.util.ts
export interface ApiResponse<T> {
  data: T;
  meta: { timestamp: string };
}

export interface PageResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
    timestamp: string;
  };
}

export const ok = <T>(data: T): ApiResponse<T> => ({
  data,
  meta: { timestamp: new Date().toISOString() },
});
```

---

## C-06. ページネーションライブラリ

### 概要
一覧取得APIで必要なページネーション処理（ページ番号・件数・ソート）を共通化します。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| ページネーションパラメータの受け取り | `page`・`perPage` のデフォルト値・上限値チェック |
| ソートパラメータの受け取り | `sort=created_at:desc` 形式の解析 |
| オフセット計算 | `offset = (page - 1) * perPage` |
| 総ページ数計算 | `totalPages = ceil(totalCount / perPage)` |
| ページ結果クラス | データリスト＋ページング情報を持つオブジェクト |

### インタフェース設計例

```java
// ページネーションリクエスト
@Getter
public class PageRequest {
    private final int page;     // 1始まり
    private final int perPage;  // デフォルト20・最大100
    private final String sortBy;
    private final String sortDir;  // "asc" or "desc"

    public int getOffset() { return (page - 1) * perPage; }

    public static PageRequest of(Integer page, Integer perPage, String sort) {
        // デフォルト値・上限値の適用はここで行う
    }
}

// ページ結果
@Getter
public class PageResult<T> {
    private final List<T> items;
    private final long totalCount;
    private final int page;
    private final int perPage;

    public int getTotalPages() {
        return (int) Math.ceil((double) totalCount / perPage);
    }
}
```

### 注意点
- `perPage` の上限（例: 最大100件）を必ず設ける。無制限に返すと性能問題になる
- ソート可能なカラムをホワイトリストで管理する（SQLインジェクション対策）

---

## C-07. ファイル操作ライブラリ

### 概要
ファイルアップロード・ダウンロード・削除処理を共通化します。ストレージの実体（AWS S3・ローカルディスク）を抽象化し、アプリケーションコードが保存先の違いを意識しなくてよくします。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| ファイルバリデーション | MIME型・拡張子・ファイルサイズのチェック |
| ファイル名のサニタイズ | パストラバーサル攻撃対策（`../` 等の除去） |
| ストレージへの保存 | S3/ローカル切り替えを抽象化 |
| 署名付きURLの生成 | S3のPresigned URL等、期限付きダウンロードURLの生成 |
| ファイルの削除 | ストレージからの削除 |

### インタフェース設計例

```java
// ストレージの抽象化（インタフェース）
public interface StorageService {
    /**
     * ファイルを保存し、保存先パスを返す
     * @param file アップロードされたファイル
     * @param directory 保存先ディレクトリ（例: "receipts/2024/11"）
     * @return 保存されたファイルのパス（例: "receipts/2024/11/uuid.jpg"）
     */
    String save(MultipartFile file, String directory);

    /** ダウンロード用の署名付きURL（有効期限: 秒単位）を返す */
    String getDownloadUrl(String filePath, int expiresInSeconds);

    void delete(String filePath);
}

// ファイルバリデーション
public class FileValidator {
    private static final Set<String> ALLOWED_IMAGE_TYPES =
        Set.of("image/jpeg", "image/png", "image/gif");
    private static final long MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

    public void validateImage(MultipartFile file) {
        if (file.getSize() > MAX_SIZE_BYTES)
            throw new AppException("VALID_FILE_001", "ファイルサイズは10MB以内にしてください", 400);
        if (!ALLOWED_IMAGE_TYPES.contains(file.getContentType()))
            throw new AppException("VALID_FILE_002", "JPEG・PNG・GIF形式のみアップロードできます", 400);
    }
}
```

### 注意点
- ファイル名はユーザー入力値をそのまま使わず、UUID等に変換して保存する
- MIMEタイプはHTTPヘッダーだけでなく、ファイルの先頭バイト（マジックバイト）でも検証する

---

## C-08. メール送信ライブラリ

### 概要
メール送信処理を共通化します。テンプレートの管理・送信先の切り替え（本番/開発）・非同期送信を一元化します。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| テンプレートメール送信 | テンプレートファイルに変数を埋め込んで送信 |
| HTMLメール / テキストメール | マルチパートメール（両方同梱）の送信 |
| 宛先のサニタイズ | 開発/ステージング環境では実際のアドレスに送らない |
| 非同期送信 | メール送信をキューに入れてAPIのレスポンスを遅らせない |
| 再送・失敗ログ | 送信失敗時のリトライと記録 |

### インタフェース設計例

```java
// メールサービスインタフェース
public interface MailService {
    /**
     * テンプレートメールを送信する
     * @param to      宛先
     * @param template テンプレート名（例: "expense_approved"）
     * @param vars    テンプレート変数
     */
    void send(String to, String template, Map<String, Object> vars);
}

// 使用例
mailService.send(
    applicant.getEmail(),
    "expense_approved",
    Map.of(
        "applicantName", applicant.getName(),
        "expenseTitle",  expense.getTitle(),
        "approvedAt",    LocalDateTime.now()
    )
);
```

**テンプレートファイル例（`resources/mail/expense_approved.html`）**
```html
<p>{{ applicantName }} 様</p>
<p>経費申請「{{ expenseTitle }}」が承認されました。</p>
<p>承認日時: {{ approvedAt }}</p>
```

### 開発環境での対策（実アドレスへの誤送信防止）

```yaml
# application-dev.yml
mail:
  redirect-to: dev-team@example.com   # 開発環境では全メールをこのアドレスにリダイレクト
  enabled: true
```

---

## C-09. 外部APIクライアントライブラリ

### 概要
外部システムへのHTTPリクエストを共通化します。タイムアウト・リトライ・エラーハンドリングを各機能で個別実装するのを防ぎます。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| タイムアウト設定 | 接続タイムアウト・読み取りタイムアウトの共通値 |
| リトライ処理 | 一時的な障害（5xx・タイムアウト）時の自動リトライ |
| サーキットブレーカー | 外部APIが連続失敗したら一時停止して過負荷を防ぐ |
| レスポンスのエラーハンドリング | HTTPエラーをAppExceptionに変換 |
| リクエスト/レスポンスログ | 外部連携のログを統一フォーマットで出力 |
| 認証ヘッダーの付与 | APIキー・Bearerトークンの自動付与 |

### インタフェース設計例（Java / Spring WebClient）

```java
// 外部APIクライアントの基底クラス
public abstract class BaseApiClient {
    protected final WebClient webClient;

    protected BaseApiClient(WebClient.Builder builder, String baseUrl) {
        this.webClient = builder
            .baseUrl(baseUrl)
            .defaultHeader("Content-Type", "application/json")
            .build();
    }

    protected <T> T get(String path, Class<T> responseType) {
        return webClient.get().uri(path)
            .retrieve()
            .onStatus(HttpStatus::is5xxServerError, res ->
                Mono.error(new AppException("SYS_002", "外部APIエラー", 502)))
            .bodyToMono(responseType)
            .timeout(Duration.ofSeconds(10))
            .retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
                .filter(e -> e instanceof TimeoutException))
            .block();
    }
}

// 具体的なクライアント実装
@Component
public class AccountingApiClient extends BaseApiClient {
    public AccountingApiClient(WebClient.Builder builder,
                               @Value("${external.accounting.url}") String url) {
        super(builder, url);
    }

    public void submitExpense(ExpensePayload payload) {
        post("/expenses", payload, Void.class);
    }
}
```

---

## C-10. キャッシュライブラリ

### 概要
頻繁に読み取られるがほとんど変わらないデータ（マスタデータ・設定値等）のキャッシュ処理を共通化します。キャッシュの実体（Redis・インメモリ）を抽象化します。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| キャッシュの取得/保存/削除 | 実装（Redis/インメモリ）を意識しないインタフェース |
| キャッシュキー設計 | プレフィックス・バージョンを含む命名規則 |
| 有効期限の管理 | TTL（生存時間）の統一した設定方法 |
| キャッシュの無効化 | 特定データが更新されたときにキャッシュを削除 |

### キャッシュキー命名規則

```
[アプリ名]:[エンティティ名]:[ID or パラメータ]:[バージョン]

例:
expense-app:expense:1001:v1         → 申請ID=1001のキャッシュ
expense-app:code-master:all:v1      → 全コードマスタのキャッシュ
expense-app:user:42:v1              → ユーザーID=42のキャッシュ
```

### インタフェース設計例

```java
public interface CacheService {
    <T> Optional<T> get(String key, Class<T> type);
    <T> void set(String key, T value, Duration ttl);
    void delete(String key);
    void deleteByPrefix(String prefix);  // 特定エンティティの全キャッシュ削除
}
```

```java
// 使用例（マスタデータのキャッシュ）
public List<CodeMaster> findAll() {
    String key = "expense-app:code-master:all:v1";
    return cacheService.get(key, List.class)
        .orElseGet(() -> {
            List<CodeMaster> data = repository.findAll();
            cacheService.set(key, data, Duration.ofHours(1));
            return data;
        });
}
```

---

## C-11. 日付・時刻処理ライブラリ

### 概要
タイムゾーン変換・日付フォーマット・相対日付計算を共通化します。システム全体でタイムゾーンの扱いが統一されていないと、日をまたぐデータで集計ズレが発生します。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| タイムゾーンの統一方針 | DB保存はUTC、表示はJSTに変換するルールを共通化 |
| 日付フォーマット変換 | `yyyy-MM-dd`・`yyyy/MM/dd`・`M月d日` 等 |
| 月初・月末の取得 | 指定月の1日・末日を返す |
| 営業日計算 | 土日・祝日を除いた営業日数の加算 |
| 相対日付 | 「n日後」「n営業日後」の計算 |

### インタフェース設計例

```java
public class DateUtils {
    public static final ZoneId JST = ZoneId.of("Asia/Tokyo");
    public static final ZoneId UTC = ZoneId.of("UTC");

    /** 現在のJST日時を返す */
    public static ZonedDateTime nowJst() {
        return ZonedDateTime.now(JST);
    }

    /** UTCのInstantをJST表記文字列に変換する */
    public static String toJstString(Instant instant, String pattern) {
        return DateTimeFormatter.ofPattern(pattern)
            .withZone(JST)
            .format(instant);
    }

    /** 指定月の月初日（1日）を返す */
    public static LocalDate firstDayOfMonth(YearMonth month) {
        return month.atDay(1);
    }

    /** 指定月の月末日を返す */
    public static LocalDate lastDayOfMonth(YearMonth month) {
        return month.atEndOfMonth();
    }
}
```

### 注意点
- DBにはすべてUTCで保存し、表示時にJSTに変換するルールを徹底する
- `LocalDateTime`（タイムゾーン情報なし）の使用は混乱の原因になるため、`ZonedDateTime` または `Instant` を使う

---

## C-12. DB共通処理ライブラリ

### 概要
全テーブルに共通して使われるDB操作パターン（論理削除・監査カラム自動更新・共通リポジトリ）を共通化します。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| 監査カラムの自動設定 | `created_at`・`updated_at`・`created_by`・`updated_by` を自動更新 |
| 論理削除の共通化 | `deleted_at` カラムによるソフトデリートの共通実装 |
| 共通エンティティ基底クラス | 全エンティティが継承する基底クラス |

### インタフェース設計例（Java / JPA）

```java
// 全エンティティが継承する基底クラス
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseEntity {
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Long createdBy;

    @LastModifiedBy
    @Column(nullable = false)
    private Long updatedBy;
}

// 論理削除対応の基底クラス
@MappedSuperclass
@Getter
public abstract class SoftDeleteEntity extends BaseEntity {
    @Column
    private Instant deletedAt;

    public boolean isDeleted() { return deletedAt != null; }

    public void delete() { this.deletedAt = Instant.now(); }
}

// 論理削除を考慮したリポジトリ
@NoRepositoryBean
public interface SoftDeleteRepository<T extends SoftDeleteEntity, ID>
    extends JpaRepository<T, ID> {

    @Query("SELECT e FROM #{#entityName} e WHERE e.deletedAt IS NULL")
    List<T> findAllActive();

    @Query("SELECT e FROM #{#entityName} e WHERE e.id = :id AND e.deletedAt IS NULL")
    Optional<T> findActiveById(ID id);
}
```

---

## C-13. コードマスタ管理ライブラリ

### 概要
都道府県・性別区分・申請ステータスなどのコード値を管理し、コード値→表示名の変換を共通化します。

### 共通化すべき処理

| 処理 | 説明 |
|-----|------|
| コード一覧の取得 | 指定コード種別のコード値一覧を返す |
| コード値から名称への変換 | `"01"` → `"男性"` のような変換 |
| 有効なコード値かどうかの検証 | バリデーションで使用 |
| キャッシュ | 取得結果をキャッシュして都度DBアクセスしない |

### インタフェース設計例

```java
public interface CodeMasterService {
    /** 指定コード種別のコードリストを返す */
    List<CodeItem> getCodeList(String codeType);

    /** コード値から表示名を返す。存在しない場合は例外 */
    String getName(String codeType, String codeValue);

    /** コード値が存在するか検証 */
    boolean isValidCode(String codeType, String codeValue);
}

@Getter
@AllArgsConstructor
public class CodeItem {
    private String value;      // コード値 例: "01"
    private String name;       // 表示名   例: "承認待ち"
    private int sortOrder;     // 表示順
    private boolean active;    // 有効/無効
}
```

```java
// 使用例
List<CodeItem> statusList = codeMasterService.getCodeList("EXPENSE_STATUS");
// → [{value:"draft", name:"下書き"}, {value:"submitted", name:"申請中"}, ...]

String statusName = codeMasterService.getName("EXPENSE_STATUS", "approved");
// → "承認済み"
```

---

## C-14. ID生成ライブラリ

### 概要
エンティティの識別子（ID）の生成方式を統一します。

### 生成方式の比較

| 方式 | メリット | デメリット | 推奨用途 |
|-----|--------|---------|--------|
| **DB自動採番（AUTO INCREMENT）** | シンプル・値が小さい | 分散DBで使いにくい・IDから件数が推測できる | 社内システムの主キー |
| **UUID v4** | 完全ランダム・推測不可能 | 長い・インデックス効率がやや低い | 外部公開リソース・ファイル名 |
| **ULID** | ソート可能・タイムスタンプ含む・UUID互換 | ライブラリが必要 | 大量データのID管理 |
| **採番テーブル** | 業務IDなど連番が必要な場合 | 競合に注意が必要 | 申請番号・受付番号等 |

### インタフェース設計例

```java
public class IdGenerator {
    /** UUID v4 を生成する（外部公開IDや一時トークン用） */
    public static String uuid() {
        return UUID.randomUUID().toString();
    }

    /** ULID を生成する（ソート可能なID用） */
    public static String ulid() {
        return UlidCreator.getUlid().toString();
    }
}
```

---

## C-15. 文字列ユーティリティ

### 概要
日本語処理（全角・半角変換）・マスキング・サニタイズ等を共通化します。

### 共通化すべき処理

| 処理 | 説明 | 使用例 |
|-----|------|------|
| 全角→半角変換 | 全角数字・英字を半角に変換 | 郵便番号・電話番号の正規化 |
| 半角→全角変換 | 半角カタカナを全角に変換 | 氏名のカナ正規化 |
| 個人情報マスキング | 氏名・メール等を部分的に隠す | ログ出力・画面表示 |
| HTMLエスケープ | `<`・`>` 等を文字参照に変換 | XSS対策 |
| 改行・タブの除去 | 入力値の前処理 | ヘッダーインジェクション対策 |
| 空白のトリミング | 全角スペース含む両端空白の除去 | 入力値の正規化 |

### インタフェース設計例

```java
public class StringUtils {
    /** メールアドレスをマスキング（例: ta***@example.com） */
    public static String maskEmail(String email) {
        int at = email.indexOf('@');
        if (at <= 2) return "***" + email.substring(at);
        return email.substring(0, 2) + "***" + email.substring(at);
    }

    /** 電話番号をマスキング（例: 03-****-5678） */
    public static String maskPhone(String phone) {
        return phone.replaceAll("(\\d{2,4})-(\\d{4})-(\\d{4})", "$1-****-$3");
    }

    /** 前後の空白（全角スペース含む）を除去する */
    public static String trimAll(String s) {
        if (s == null) return null;
        return s.replaceAll("^[\\s　]+|[\\s　]+$", "");
    }
}
```

---

## C-16. 通知・アラートライブラリ

### 概要
システム障害・バッチエラー・重要イベントの通知先（Slack・メール等）を共通化します。

### インタフェース設計例

```java
// 通知サービスインタフェース
public interface AlertService {
    /** 開発・運用チームへ障害通知を送る */
    void sendAlert(AlertLevel level, String title, String message, Exception cause);
}

public enum AlertLevel { INFO, WARNING, ERROR, CRITICAL }

// Slack実装例
@Component
public class SlackAlertService implements AlertService {
    @Override
    public void sendAlert(AlertLevel level, String title, String message, Exception cause) {
        String text = String.format("[%s] %s\n%s\n%s",
            level, title, message,
            cause != null ? cause.getMessage() : "");
        // Slack Incoming Webhookに送信
        slackWebhookClient.send(webhookUrl, text);
    }
}
```

---

## C-17. 設定管理ライブラリ

### 概要
環境変数・設定ファイルの値を型安全に取得する仕組みを共通化します。設定値を `System.getenv("XXX")` で直接取得するコードを機能ごとに書くと、設定ミスの発見が遅れます。

### インタフェース設計例（TypeScript）

```typescript
// config.ts（型安全な設定値の一元管理）
import { z } from 'zod';

const configSchema = z.object({
  PORT:               z.string().default('3000').transform(Number),
  DATABASE_URL:       z.string().url(),
  JWT_SECRET:         z.string().min(32),
  JWT_EXPIRES_IN:     z.string().default('15m'),
  AWS_BUCKET_NAME:    z.string(),
  MAIL_FROM:          z.string().email(),
  SLACK_WEBHOOK_URL:  z.string().url().optional(),
});

// 起動時に一度だけ検証する。未設定の必須項目があれば即座にエラー終了
export const config = configSchema.parse(process.env);

// 使用例（設定値は config.JWT_SECRET のように型安全にアクセスできる）
```

### インタフェース設計例（Java / Spring Boot）

```java
// @ConfigurationPropertiesで設定値をクラスにバインドする
@ConfigurationProperties(prefix = "app")
@Validated
@Getter
public class AppProperties {
    @NotBlank
    private String jwtSecret;

    @Positive
    private int jwtExpiresMinutes = 15;

    @NotBlank
    private String awsBucketName;
}
```

---

## 共通ライブラリの開発・管理方針

### ディレクトリ構成例

```
src/
└── main/
    └── java/com/example/
        ├── common/                   ← 共通ライブラリパッケージ
        │   ├── auth/                 ← C-01 認証・認可
        │   ├── error/                ← C-02 エラーハンドリング
        │   ├── validation/           ← C-03 バリデーション
        │   ├── logging/              ← C-04 ログ出力
        │   ├── response/             ← C-05 レスポンスフォーマット
        │   ├── pagination/           ← C-06 ページネーション
        │   ├── storage/              ← C-07 ファイル操作
        │   ├── mail/                 ← C-08 メール送信
        │   ├── http/                 ← C-09 外部APIクライアント
        │   ├── cache/                ← C-10 キャッシュ
        │   ├── datetime/             ← C-11 日付・時刻
        │   ├── db/                   ← C-12 DB共通処理
        │   ├── master/               ← C-13 コードマスタ管理
        │   ├── id/                   ← C-14 ID生成
        │   ├── string/               ← C-15 文字列ユーティリティ
        │   ├── alert/                ← C-16 通知・アラート
        │   └── config/               ← C-17 設定管理
        └── feature/                  ← 各機能のコード
            ├── expense/
            └── user/
```

### 単体テストの必須化

共通ライブラリは全機能から使われるため、**バグの影響範囲が最も大きい**です。以下のルールを設けます。

- 全共通クラスに単体テストを作成する（カバレッジ目標: 90%以上）
- エッジケース（nullの扱い・境界値・例外パス）を重点的にテストする
- 破壊的変更（既存の動作を変える修正）はチーム全員のレビューを必須とする

### 変更管理ルール

| ルール | 内容 |
|------|------|
| インタフェースは慎重に変更する | 全機能が依存するため、メソッドの削除・引数変更は原則禁止 |
| 追加は自由 | 新メソッドの追加はいつでも可能（既存コードへの影響がない） |
| 変更時は変更ログを残す | `CHANGELOG.md` または Confluenceに変更内容・理由を記録する |
| バージョン番号を付ける | `1.0.0` → `1.1.0`（機能追加）/ `2.0.0`（破壊的変更）の区別 |
