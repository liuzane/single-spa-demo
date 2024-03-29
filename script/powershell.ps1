#set window title
$host.ui.RawUI.WindowTitle = $args

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

Write-Color -Text "Project: ",$args -Color Blue,Green
Write-Color -Text "Path: ",$projectPath -Color Blue,Green
Write-Output ""
Write-Color -Text "To Develop:" -Color Blue
Write-Color -Text "npm run dev" -Color DarkRed
Write-Output ""
Write-Color -Text "To Build:" -Color Blue
Write-Color -Text "npm run build" -Color DarkRed
Write-Output ""

npm run dev
