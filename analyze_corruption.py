import re
from collections import Counter

files = [
    'docs/q3m8wvx5/reference/books/tech/web-technology-foundations.html',
    'docs/q3m8wvx5/reference/books/tech/git-github-team.html',
    'docs/q3m8wvx5/reference/books/tech/software-testing-intro.html',
    'docs/q3m8wvx5/reference/books/tech/sql-antipatterns.html',
    'docs/q3m8wvx5/reference/books/tech/unix-philosophy.html',
    'docs/q3m8wvx5/reference/books/tech/web-api-design.html',
    'docs/q3m8wvx5/reference/books/management/engineering-org-theory.html',
    'docs/q3m8wvx5/reference/books/management/issue-driven.html',
]

# Collect all unique ChE-prefixed words (5 chars before ChE)
all_contexts = Counter()

for f in files:
    with open(f, encoding='utf-8', errors='replace') as fp:
        text = fp.read()
    # Find all occurrences of チE (chi + E) with surrounding context
    idx = 0
    while True:
        pos = text.find('チE', idx)
        if pos < 0:
            break
        ctx = text[max(0,pos-5):pos+10]
        all_contexts[ctx.replace('\n',' ')] += 1
        idx = pos + 2

print("=== チE contexts (most common) ===")
for ctx, n in all_contexts.most_common(50):
    print(f"  {n:3d}x  |{ctx}|")

# Also find ぁE contexts
print("\n=== ぁE contexts (sample) ===")
aecount = Counter()
for f in files:
    with open(f, encoding='utf-8', errors='replace') as fp:
        text = fp.read()
    idx = 0
    while True:
        pos = text.find('ぁE', idx)
        if pos < 0:
            break
        ctx = text[max(0,pos-3):pos+5]
        aecount[ctx.replace('\n',' ')] += 1
        idx = pos + 2
for ctx, n in aecount.most_common(30):
    print(f"  {n:3d}x  |{ctx}|")

# Find other XE patterns (non-katakana/hiragana preceding E)
print("\n=== Other XE patterns ===")
other = Counter()
for f in files:
    with open(f, encoding='utf-8', errors='replace') as fp:
        text = fp.read()
    # Match: CJK char (not チ or ぁ) followed by E
    for m in re.finditer(r'[一-鿿�][E]', text):
        ctx = text[max(0,m.start()-3):m.end()+3]
        other[ctx.replace('\n',' ')] += 1
for ctx, n in other.most_common(40):
    print(f"  {n:3d}x  |{ctx}|")
