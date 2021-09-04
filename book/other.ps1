# Install-Module FormatMarkdownTable
$others=  Get-Content -Raw -Path other.txt1 | ConvertFrom-Json
$data = $others.data
#Write-Host $data
[System.Collections.ArrayList]$allData = @()

$data | %{
	$repo= $_.repository
 Write-Host "processing" $repo
 $api = $repo.Replace("https://github.com","https://api.github.com/repos")
 Write-Host "processing" $api
 
 $apiResponse = (curl  $api) | ConvertFrom-Json
 #Write-Host "processing" $apiResponse
 Write-Host "processing" $apiResponse.full_name	
 $allData.Add($apiResponse)
	
 
 	
}
Write-Host "nr " $allData.Count
#| Select full_name,html_url
$allData  | Format-MarkdownTableTableStyle full_name,html_url,description -ShowMarkdown  

Write-Host 
