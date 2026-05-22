#!/usr/bin/env node
/**
 * src/**\/*.md → docs/**\/*.html 変換スクリプト
 * usage: node tools/build.js [--watch]
 */

const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const DOCS_DIR = path.join(ROOT, 'docs');

// =========================================================
// HTMLテンプレート
// =========================================================

// CSS/JS は docs/q3m8wvx5/develop/ を基準に配置されているため、
// destPath から q3m8wvx5/develop/ を除いた残りの深さで相対パスを計算する。
// 例: q3m8wvx5/develop/checklist/api.html → 残り: checklist/api.html → depth=1 → ../
function relativePrefix(destPath) {
  const base = 'q3m8wvx5/develop/';
  const inner = destPath.startsWith(base) ? destPath.slice(base.length) : destPath;
  const depth = inner.split('/').length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function buildHtml(meta, bodyHtml, destRelPath) {
  const prefix = relativePrefix(destRelPath);
  const title = meta.title || 'ドキュメント';
  const phase = meta.phase || '';
  const subtitle = meta.subtitle || '';
  const description = meta.description || '';
  const useMermaid = meta.mermaid === true;
  const extraStyle = meta.style || '';

  const phaseClass = phase ? `phase-${phase}` : '';

  const mermaidScript = useMermaid
    ? `<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>`
    : '';
  const mermaidInit = useMermaid
    ? `<script>mermaid.initialize({ startOnLoad: true, theme: 'default' });</script>`
    : '';

  // サイドバーのsidebar.jsの相対パスを求める
  // sidebar.jsは docs/q3m8wvx5/develop/sidebar.js に存在する
  const sidebarJsDepth = destRelPath.startsWith('q3m8wvx5/develop/')
    ? destRelPath.replace('q3m8wvx5/develop/', '').split('/').length - 1
    : null;

  let sidebarJs = '';
  if (sidebarJsDepth !== null) {
    const sidebarPrefix = sidebarJsDepth === 0 ? './' : '../'.repeat(sidebarJsDepth);
    sidebarJs = `<script src="${sidebarPrefix}sidebar.js"></script>`;
  }

  const pageHeader = (subtitle || description)
    ? `
    <div class="page-header ${phaseClass}">
      ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
      <h1>${title}</h1>
      ${description ? `<p class="description">${description}</p>` : ''}
    </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="${prefix}css/style.css">
  ${mermaidScript}
  ${extraStyle ? `<style>\n${extraStyle}\n  </style>` : ''}
</head>
<body>
<div class="layout">
  <aside class="sidebar" id="sidebar-placeholder"></aside>

  <main class="main">
    ${pageHeader}
    <div class="content">
${bodyHtml}
    </div>
  </main>
</div>

${mermaidInit}
<script src="${prefix}js/main.js"></script>
${sidebarJs}
</body>
</html>
`;
}

// =========================================================
// ファイル変換
// =========================================================

function convertFile(srcPath) {
  const rel = path.relative(SRC_DIR, srcPath).replace(/\\/g, '/');
  const destRel = rel.replace(/\.md$/, '.html');
  const destPath = path.join(DOCS_DIR, destRel);

  const raw = fs.readFileSync(srcPath, 'utf8');
  const { attributes: meta, body } = fm(raw);
  const bodyHtml = marked(body);

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buildHtml(meta, bodyHtml, destRel), 'utf8');
  console.log(`  built: ${destRel}`);
}

// =========================================================
// 全ファイルビルド
// =========================================================

function findMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory()
      ? findMdFiles(path.join(dir, e.name))
      : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []
  );
}

function buildAll() {
  const files = findMdFiles(SRC_DIR);
  if (files.length === 0) {
    console.log('src/ にMarkdownファイルが見つかりません。');
    return;
  }
  console.log(`Building ${files.length} file(s)...`);
  files.forEach(convertFile);
  console.log('Done.');
}

// =========================================================
// watchモード
// =========================================================

function watch() {
  buildAll();
  console.log('\nWatching src/ for changes...');
  fs.watch(SRC_DIR, { recursive: true }, (event, filename) => {
    if (!filename || !filename.endsWith('.md')) return;
    const srcPath = path.join(SRC_DIR, filename);
    if (fs.existsSync(srcPath)) {
      console.log(`\nchanged: ${filename}`);
      try { convertFile(srcPath); } catch (e) { console.error(e.message); }
    }
  });
}

// =========================================================
// エントリポイント
// =========================================================

if (process.argv.includes('--watch')) {
  watch();
} else {
  buildAll();
}
