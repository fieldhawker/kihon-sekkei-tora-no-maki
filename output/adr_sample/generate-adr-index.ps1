# generate-adr-index.ps1
# docs/adr/ フォルダにあるADRファイルを読み取り、README.md を自動生成する
#
# 前提: ADRファイルの書き方
#   1行目  → # ADR-NNN: タイトル
#   ステータス行 → "採用（2024-11-01）" の形式

$adrDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$outFile = Join-Path $adrDir "README.md"

$lines = @()
$lines += "# アーキテクチャ決定記録（ADR）一覧"
$lines += ""
$lines += "> このファイルは generate-adr-index.bat を実行すると自動更新されます。直接編集しないでください。"
$lines += ""
$lines += "| No. | タイトル | ステータス | 決定日 |"
$lines += "|----|--------|---------|------|"

Get-ChildItem -Path $adrDir -Filter "ADR-*.md" | Sort-Object Name | ForEach-Object {
    $file    = $_
    $content = Get-Content $file.FullName -Encoding UTF8

    # 1行目から「# ADR-NNN: タイトル」を取得
    $titleLine = $content | Where-Object { $_ -match "^# ADR-\d+" } | Select-Object -First 1
    $title     = ($titleLine -replace "^# ADR-\d+[:\s]+", "").Trim()
    $no        = ($file.BaseName -replace "^(ADR-\d+).*", '$1')

    # "## ステータス" の次の行を取得
    $statusIdx = -1
    for ($i = 0; $i -lt $content.Count; $i++) {
        if ($content[$i] -match "^## ステータス") { $statusIdx = $i + 1; break }
    }
    $statusRaw = if ($statusIdx -ge 0) { $content[$statusIdx].Trim() } else { "-" }

    # ステータス名と日付を分離（例: "採用（2024-11-01）"）
    $date       = if ($statusRaw -match "（(\d{4}-\d{2}-\d{2})）") { $Matches[1] } else { "-" }
    $statusText = ($statusRaw -replace "（\d{4}-\d{2}-\d{2}）", "").Trim()

    $lines += "| [$no]($($file.Name)) | $title | $statusText | $date |"
}

$lines | Set-Content -Path $outFile -Encoding UTF8
Write-Host "✔ README.md を更新しました: $outFile"
