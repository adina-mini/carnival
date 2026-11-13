$templatesPath = 'c:\Dev_Projects\shadii\src\templates'
$files = Get-ChildItem $templatesPath -Filter *.jsx
$map = @()
foreach ($f in $files) {
    $old = $f.BaseName
    if ($old -like '*Template') {
        $new = $old -replace 'Template$',''
        $map += [pscustomobject]@{Old=$old; New=$new}
    }
}
# Rename files and adjust component export name
foreach ($item in $map) {
    $oldPath = Join-Path $templatesPath ($item.Old + '.jsx')
    $newPath = Join-Path $templatesPath ($item.New + '.jsx')
    $content = Get-Content $oldPath -Raw
    $content = $content -replace "export default function $($item.Old)", "export default function $($item.New)"
    Set-Content $newPath $content
    Remove-Item $oldPath
}
# Update imports and references across project files
$allFiles = Get-ChildItem 'c:\Dev_Projects\shadii' -Recurse -Include *.js,*.jsx,*.json
foreach ($file in $allFiles) {
    $text = Get-Content $file.FullName -Raw
    foreach ($item in $map) {
        # import path like ./OldName (without extension)
        $text = $text -replace "(\.\/)$($item.Old)(?=')", "`$1$($item.New)"
        # component name usage
        $text = $text -replace "\b$($item.Old)\b", $item.New
    }
    Set-Content $file.FullName $text
}
# Simplify names in customTemplates.json by replacing old tokens with new ones
$jsonPath = 'c:\Dev_Projects\shadii\src\data\customTemplates.json'
if (Test-Path $jsonPath) {
    $json = Get-Content $jsonPath -Raw
    foreach ($item in $map) {
        $json = $json -replace $item.Old, $item.New
    }
    Set-Content $jsonPath $json
}
# Remove any lingering phrase "Celestial Midnight Gold Gala"
$phrase = 'Celestial Midnight Gold Gala'
$allFiles = Get-ChildItem 'c:\Dev_Projects\shadii' -Recurse -Include *.js,*.jsx,*.json
foreach ($file in $allFiles) {
    $text = Get-Content $file.FullName -Raw
    $text = $text -replace $phrase, ''
    Set-Content $file.FullName $text
}

