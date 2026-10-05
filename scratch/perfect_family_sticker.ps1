Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Dev_Projects\shadii\assets\family-portrait.png"
$dstPath = "c:\Dev_Projects\shadii\assets\family-sticker.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

$outBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color sample from top center:
$bgPixel = $bmp.GetPixel([int]($width / 2), 30)
$bgR = $bgPixel.R
$bgG = $bgPixel.G
$bgB = $bgPixel.B

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$srcData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $outBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$stride = [Math]::Abs($srcData.Stride)
$bytes = $stride * $height
$srcBuffer = New-Object byte[] $bytes
$dstBuffer = New-Object byte[] $bytes

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBuffer, 0, $bytes)

$tolerance = 32

for ($y = 0; $y -lt $height; $y++) {
    $rowOffset = $y * $stride
    for ($x = 0; $x -lt $width; $x++) {
        $idx = $rowOffset + ($x * 4)

        # 1. Sky above all heads (y < 168)
        # 2. Floor below all seated children & dresses (y > 525)
        # 3. Stray leaves at bottom left below leftmost man (x < 100 and y > 375)
        if ($y -lt 168 -or $y -gt 525 -or ($x -lt 100 -and $y -gt 375)) {
            $dstBuffer[$idx] = 0
            $dstBuffer[$idx + 1] = 0
            $dstBuffer[$idx + 2] = 0
            $dstBuffer[$idx + 3] = 0
            continue
        }

        $b = $srcBuffer[$idx]
        $g = $srcBuffer[$idx + 1]
        $r = $srcBuffer[$idx + 2]

        $dist = [Math]::Sqrt([Math]::Pow($r - $bgR, 2) + [Math]::Pow($g - $bgG, 2) + [Math]::Pow($b - $bgB, 2))

        if ($dist -lt $tolerance) {
            # Fully transparent background
            $dstBuffer[$idx] = 0
            $dstBuffer[$idx + 1] = 0
            $dstBuffer[$idx + 2] = 0
            $dstBuffer[$idx + 3] = 0
        } elseif ($dist -lt ($tolerance + 15)) {
            # Smooth feathered anti-aliased edge
            $alphaRatio = ($dist - $tolerance) / 15.0
            $newA = [byte]([Math]::Min(255, [Math]::Max(0, [int]($alphaRatio * 255))))
            $dstBuffer[$idx] = $b
            $dstBuffer[$idx + 1] = $g
            $dstBuffer[$idx + 2] = $r
            $dstBuffer[$idx + 3] = $newA
        } else {
            # Keep original pixel completely solid
            $dstBuffer[$idx] = $b
            $dstBuffer[$idx + 1] = $g
            $dstBuffer[$idx + 2] = $r
            $dstBuffer[$idx + 3] = 255
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($dstBuffer, 0, $dstData.Scan0, $bytes)

$bmp.UnlockBits($srcData)
$outBmp.UnlockBits($dstData)
$bmp.Dispose()

# Find bounding box of all family members
$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

for ($y = 0; $y -lt $height; $y++) {
    $rowOffset = $y * $stride
    for ($x = 0; $x -lt $width; $x++) {
        $idx = $rowOffset + ($x * 4) + 3
        if ($dstBuffer[$idx] -gt 25) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Pad by 6px
$pad = 6
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($height - $cropY, ($maxY - $minY) + ($pad * 2))

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $outBmp.Clone($cropRect, $outBmp.PixelFormat)

$croppedBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)

$croppedBmp.Dispose()
$outBmp.Dispose()

Write-Host "Done! Saved family sticker to $dstPath ($cropW x $cropH)"
