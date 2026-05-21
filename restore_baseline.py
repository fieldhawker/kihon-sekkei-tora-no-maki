import subprocess, os

base = r'd:\avtigravity\基本設計虎の巻'
# Files that exist in f26f5bc at the books/ subfolders (already reorganized)
file_map = [
    ('f26f5bc:docs/q3m8wvx5/reference/books/tech/web-technology-foundations.html',
     'docs/q3m8wvx5/reference/books/tech/web-technology-foundations.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/tech/git-github-team.html',
     'docs/q3m8wvx5/reference/books/tech/git-github-team.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/tech/software-testing-intro.html',
     'docs/q3m8wvx5/reference/books/tech/software-testing-intro.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/tech/sql-antipatterns.html',
     'docs/q3m8wvx5/reference/books/tech/sql-antipatterns.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/tech/unix-philosophy.html',
     'docs/q3m8wvx5/reference/books/tech/unix-philosophy.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/tech/web-api-design.html',
     'docs/q3m8wvx5/reference/books/tech/web-api-design.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/management/engineering-org-theory.html',
     'docs/q3m8wvx5/reference/books/management/engineering-org-theory.html'),
    ('f26f5bc:docs/q3m8wvx5/reference/books/management/issue-driven.html',
     'docs/q3m8wvx5/reference/books/management/issue-driven.html'),
]

for git_path, rel_path in file_map:
    r = subprocess.run(['git', '-C', base, 'show', git_path], capture_output=True)
    if r.returncode != 0:
        print('ERROR for ' + git_path + ': ' + r.stderr.decode(errors='replace'))
        continue
    content = r.stdout.decode('utf-8', errors='replace')
    full_path = os.path.join(base, rel_path)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    name = rel_path.split('/')[-1]
    print('Restored ' + name + ' (' + str(len(content)) + ' chars)')
