# Install-Module FormatMarkdownTable
$others=  Get-Content -Raw -Path other.txt | ConvertFrom-Json
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
	Write-Host "nr " $allData.Count

 break;
 	
}

Write-Host "!1nr " 

#$mark = $allData | Format-MarkdownTableListStyle full_name, url
#Write-Host $mark