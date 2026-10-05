Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile('c:\Dev_Projects\shadii\assets\family-portrait.png')
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

$bgR = 231; $bgG = 184; $bgB = 165

Write-Host "--- Scanning top-right ---"
for ($y = 0; $y -lt 250; $y += 20) {
    for ($x = 800; $x -lt $bmp.Width; $x += 40) {
        $p = $bmp.GetPixel($x, $y)
        $dist = [Math]::Sqrt([Math]::Pow($p.R - $bgR, 2) + [Math]::Pow($p.G - $bgG, 2) + [Math]::Pow($p.B - $bgB, 2))
        if ($dist -gt 35) {
            Write-Host "Pixel ($x, $y) diff=$([int]$dist)"
        }
    }
}

Write-Host "--- Scanning bottom-left ---"
for ($y = 450; $y -lt $bmp.Height; $y += 20) {
    for ($x = 0; $x -lt 150; $x += 25) {
        $p = $bmp.GetPixel($x, $y)
        $dist = [Math]::Sqrt([Math]::Pow($p.R - $bgR, 2) + [Math]::Pow($p.G - $bgG, 2) + [Math]::Pow($p.B - $bgB, 2))
        if ($dist -gt 35) {
            Write-Host "Pixel ($x, $y) diff=$([int]$dist)"
        }
    }
}

$bmp.Dispose()
