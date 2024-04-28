$title = $args[0]
$script = $args[1]

if (!$script) {
  $script = "dev"
}

#set window title
$host.ui.RawUI.WindowTitle = $title

#set window background color
#$host.ui.RawUI.BackgroundColor = "Blue"

cls

#$a = Import-Csv -Path $PSScriptRoot\cmd-history.csv
#Add-History -InputObject $a

function Write-Color([String[]]$Text, [ConsoleColor[]]$Color) {
  for ($i = 0; $i -lt $Text.Length; $i++) {
    Write-Host $Text[$i] -Foreground $Color[$i] -NoNewLine
  }
  Write-Host
}

$projectPath = (Get-Location).Path

Write-Color -Text "Project: ", $title -Color Blue, Green
Write-Color -Text "Path: ", $projectPath -Color Blue, Green
Write-Output ""
Write-Color -Text "To Develop: ", "npm run dev" -Color Blue, DarkRed
Write-Output ""
Write-Color -Text "To Build: ", "npm run build" -Color Blue, DarkRed
Write-Output ""

Write-Output "npm run $script"
npm run $script
