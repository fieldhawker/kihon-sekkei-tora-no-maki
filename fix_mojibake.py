"""
Fix mojibake in 8 corrupted HTML files.
"""
import re

FILES = [
    'docs/q3m8wvx5/reference/books/tech/web-technology-foundations.html',
    'docs/q3m8wvx5/reference/books/tech/git-github-team.html',
    'docs/q3m8wvx5/reference/books/tech/software-testing-intro.html',
    'docs/q3m8wvx5/reference/books/tech/sql-antipatterns.html',
    'docs/q3m8wvx5/reference/books/tech/unix-philosophy.html',
    'docs/q3m8wvx5/reference/books/tech/web-api-design.html',
    'docs/q3m8wvx5/reference/books/management/engineering-org-theory.html',
    'docs/q3m8wvx5/reference/books/management/issue-driven.html',
]

R = '�'  # U+FFFD replacement character

GLOBAL_SUBS = [
    # ── Hiragana ──────────────────────────────────────────────
    ('ぁE', 'い'),   # ぁE → い

    # ── CJK char + E (single-character fixes) ─────────────────
    ('衁E', '術'),   # 衁E → 術
    ('剁E', '則'),   # 剁E → 則
    ('絁E', '約'),   # 絁E → 組  (but let me use actual chars)
]

# Use actual characters for clarity
SUBS = [
    # Hiragana
    ('ぁE', 'い'),

    # CJK single-char corruptions
    ('衁E', '術'),   # 技術、実術
    ('剁E', '則'),   # 原則
    ('紁E', '約'),   # 制約
    ('裁E', '装'),   # 実装
    ('訁E', '計'),   # 設計
    ('琁E', '理'),   # 理解、管理
    ('頁E', '項'),   # 項目
    ('賁E', '書'),   # 本書
    ('忁E', '必'),   # 必要
    ('老E', '考'),   # 考える
    ('騁E', '験'),   # 経験
    ('絁E', '組'),   # 組織
    ('皁E', '静'),   # 静的
    ('刁E', '切'),   # 切れ

    # Ambiguous 征E (得 or 待) — word context
    ('取征E', '取得'),
    ('習征E', '習得'),
    ('所征E', '所得'),
    ('獲征E', '獲得'),
    ('招征E', '招待'),

    # Katakana words (most specific first)
    ('スチE', 'ステ'),
    ('メソチE', 'メソッド'),
    ('リダイレクチE', 'リダイレクト'),
    ('ダイレクチE', 'ダイレクト'),
    ('ハイブリチE', 'ハイブリッド'),
    ('セキュリチE', 'セキュリティ'),
    ('バリチE', 'バリデ'),
    ('コンチE', 'コンテ'),
    ('アーキチE', 'アーキテ'),
    ('キャチE', 'キャッ'),
    ('メチE', 'メデ'),
    ('エンチE', 'エンティ'),
    ('コーチE', 'コード'),
    ('カーチE', 'カード'),
    ('ミニカーチE', 'ミニカード'),
    ('チッチE', 'チップ'),
    ('インチE', 'インデ'),
    ('ガイチE', 'ガイド'),
    ('メンチE', 'メンテ'),
    ('リフレチE', 'リフレッ'),
    ('ハチE', 'ハッ'),
    ('チェチEク', 'チェック'),
    ('ロチEク', 'ロック'),
    ('ブロチEク', 'ブロック'),
    ('セチEション', 'セッション'),
    ('スタチEトレース', 'スタックトレース'),
    ('エチEセンス', 'エッセンス'),
    ('タイムチE', 'タイムデ'),
    ('オンチEマンド', 'オンデマンド'),
    ('コラムグリチEチE', 'コラムグリッド'),
    ('プリフェチEチ', 'プリフェッチ'),

    # 組織論 title (絁E + R + 論)
    ('絁E�論', '組織論'),
]


def apply_regex_fixes(text):
    # Replace U+FFFD + 'E' with ー ONLY between kana/kanji characters
    # This restores the ー (long vowel) corrupted by encoding issues
    text = re.sub(r'(?<=[ぁ-ヾ一-鿿ー])�E(?=[ぁ-ヾ一-鿿ー])', 'ー', text)
    return text


def fix_file(path):
    with open(path, encoding='utf-8', errors='replace') as f:
        text = f.read()

    original = text
    for old, new in SUBS:
        text = text.replace(old, new)
    text = apply_regex_fixes(text)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)

    return text != original


if __name__ == '__main__':
    for path in FILES:
        changed = fix_file(path)
        status = 'CHANGED' if changed else 'no change'
        print(f'  [{status}] {path.split("/")[-1]}')
