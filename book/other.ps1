$others=  Get-Content -Raw -Path other.txt | ConvertFrom-Json
$data = $others.data
#Write-Host $data
$i = 1;
$data | %{
	$repo= $_.repository
 Write-Host "processing" $repo
 $api = $repo.Replace("https://github.com","https://api.github.com")
 Write-Host "processing" $api
 
 $apiResponse = (curl  $repo)
 Write-Host "processing" $apiResponse.Content.FullName
 break;
 	
}