# Install-Module FormatMarkdownTable
$others=  Get-Content -Raw -Path other.txt | ConvertFrom-Json
$data = $others.data
#Write-Host $data
[System.Collections.ArrayList]$allData = @()
$i=0
$data | %{
 
 $i=$i+1
 $repo= $_.repository
 Write-Host "processing" $repo
 $api = $repo.Replace("https://github.com","https://api.github.com/repos")
 Write-Host "processing" $api
 
 $apiResponse = (curl  $api) | ConvertFrom-Json
 #Write-Host "processing" $apiResponse
 Write-Host "processing" $apiResponse.full_name	
 $apiResponse| add-member -Name "Nr" -value $i -MemberType NoteProperty
 
 $allData.Add($apiResponse)
	
 
 	
}
Write-Host "nr " $allData.Count
#| Select full_name,html_url
$allData  | Format-MarkdownTableTableStyle Nr,full_name,html_url,description -ShowMarkdown  

Write-Host 
