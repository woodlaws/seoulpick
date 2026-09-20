$ErrorActionPreference = 'Stop'
$headers = @{ 'User-Agent' = 'SeoulPickContent/1.0 (https://seoulpick.vercel.app)' }
$sets = [ordered]@{
  bukhansan = @('Baegundae Terrace of Bukhansan in Spring in Korea.jpg','Bukhansan Spring in Korea.jpg','Bukhansan Summer in Korea.jpg','Bukhansan Winter in Korea.jpg','Insubong Peak of Bukhansan in spring in Korea.jpg','Insubong Peak of Bukhansan in winter in Korea.jpg')
  inwangsan = @('Inwangsan Mountain 20161102 02 (30609967422).jpg','Korea-Seoul-Inwangsan-01.jpg','Korea-Seoul-Inwangsan-02.jpg','Korea-Seoul-Inwangsan-04.jpg','Korea-Seoul-Inwangsan-06.jpg','Korea-Seoul-Inwangsan-10.jpg')
  namsan = @('Namsan Mountain and City View, Seoul (48660804148).jpg','Namsan Mountain and City View, Seoul (48661305897).jpg','Namsan Mountain and Seoul Tower (48661160696).jpg','Namsan Mountain and Seoul Tower (48661272477).jpg','Namsan Mountain and Seoul Tower (48661304357).jpg','Namsan Mountain and Seoul Tower (48661307912).jpg')
  naksan = @('02025 Naksan park.jpg','02025 Park Naksan, Seoul.jpg','20240601 144028 Naksan Park sign - Seoul 03.jpg','Naksan Park, Seoul, South Korea 01.jpg','Naksan Park, Seoul, South Korea 02.jpg','Naksan Park, Seoul, South Korea 03.jpg')
  dobongsan = @('DoBongSan (Mt. DoBongSan) in Spring.jpg','Dobongsan Seoul South Korea Landscape Photography (251858911).jpeg','Dobongsan Station Bus stop.JPG','Trail leading to peak of Dobongsan.JPG','Korail-113-Dobongsan-station-entrance-1-20181122-125116.jpg','Korail-113-Dobongsan-station-entrance-1-20181122-125140.jpg')
  bugaksan = @('Bugaksan 20161116 01 (30900886042).jpg','Bugaksan 20161116 02 (31043091885).jpg','Bugaksan 20161116 03 (30900867212).jpg','Bugaksan 20161116 04 (31043079055).jpg','Bugaksan 20161116 05 (30929019051).jpg','Bugaksan 20161116 06 (30929006441).jpg')
  gwanaksan = @('Gwanaksan station S411.jpg','Seoul-Gwanaksan-Mountain-Observatory-01.jpg','Gwanaksan Mountain 01 (16741408044).jpg','Gwanaksan Mountain 02 (17361990442).jpg','Gwanaksan Mountain 03 (17177695739).jpg','Gwanaksan Mountain 04 (17363904545).jpg')
  achasan = @('Achasan Entrance.jpg','Achasan marker at the entrance.jpg','Achasan Pavillion.jpg','Achasan scenery.jpg','Goguryeojeong (1).jpg','View from Achasan (1).jpg')
  ansan = @('1 ansan mountain night 2018.jpg','2012FallSketch07 (8146968307).jpg','KOCIS Korea First Snowfall in Seoul 01 (10922183896).jpg','KOCIS Korea First Snowfall in Seoul 02 (10922408963).jpg','Seoul-Ansan-cityscape-01.jpg','The view from Ansan Mountain (14146359256).jpg')
  eungbongsan = @('Eungbongsan Mountain Spring 01 (25558972543).jpg','Eungbongsan Mountain Spring 02 (26161622505).jpg','Eungbongsan Mountain Spring 03 (25556848274).jpg','Eungbongsan Mountain Spring 04 (25556846804).jpg','Eungbongsan Mountain Spring 05 (26135666756).jpg','View from Eungbongsan.jpg')
}

$root = Join-Path $PSScriptRoot '..\public\mountains'
New-Item -ItemType Directory -Force -Path $root | Out-Null
$credits = @()
foreach ($entry in $sets.GetEnumerator()) {
  $slug = $entry.Key
  $target = Join-Path $root $slug
  New-Item -ItemType Directory -Force -Path $target | Out-Null
  for ($i = 0; $i -lt $entry.Value.Count; $i++) {
    $title = 'File:' + $entry.Value[$i]
    $api = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + [uri]::EscapeDataString($title) + '&prop=imageinfo&iiprop=url%7Cextmetadata%7Cmime%7Csize&iiurlwidth=1400&format=json&maxlag=5'
    $response = Invoke-RestMethod -Uri $api -Headers $headers
    $page = $response.query.pages.PSObject.Properties.Value | Select-Object -First 1
    if (-not $page.imageinfo) { Write-Warning "No image info for $title"; continue }
    $info = $page.imageinfo[0]
    if (-not $info.thumburl) { Write-Warning "No thumbnail URL for $title"; continue }
    $fileName = '{0:00}.jpg' -f ($i + 1)
    $out = Join-Path $target $fileName
    if (-not (Test-Path $out)) { Invoke-WebRequest -Uri $info.thumburl -Headers $headers -OutFile $out }
    $meta = $info.extmetadata
    $credits += [ordered]@{
      slug = $slug
      file = "/mountains/$slug/$fileName"
      title = $page.title
      creator = ($meta.Artist.value -replace '<[^>]+>', '' -replace '&[^;]+;', ' ').Trim()
      license = $meta.LicenseShortName.value
      licenseUrl = $meta.LicenseUrl.value
      source = $info.descriptionurl
    }
    Start-Sleep -Milliseconds 700
  }
}
$json = $credits | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText((Join-Path $root 'credits.json'), $json, (New-Object Text.UTF8Encoding($false)))
Write-Output "Downloaded $($credits.Count) licensed mountain photos."
