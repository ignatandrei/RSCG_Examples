# Install-Module FormatMarkdownTable
#Install-Module EPS
Import-Module EPS

$generate = $false
$dataMK= (Get-Content 'E:\ignatandrei\RSCG_Examples\book\data.txt' | Out-String | ConvertFrom-Json)
Write-Host $dataMK.Count
if($generate){
remove-item "data.txt"
$others=  Get-Content -Raw -Path "E:\ignatandrei\RSCG_Examples\book\other.txt" | ConvertFrom-Json
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

Write-Host "nr loaded " $allData.Count
##| Select full_name,html_url
$dataMK = $allData  | Select Nr, full_name,html_url,description #Format-MarkdownTableTableStyle Nr,full_name,html_url,description -ShowMarkdown  

$dataMK | ConvertTo-Json | Out-File "data.txt"
#$row =""

}

Write-Host "number to display " $dataMK.Count

#$name = "Dave"

#Invoke-EpsTemplate -Template 'Hello <%= $name %>!'


$template = @'
# Roslyn Source Code Generator (RSCG ) - others <%= $name %>

There are more awesome RSCG that you could use - here is a list of <%= $dataMK.Count %> RSCG that you may want  to look at:

<table>
<tr>
<th>Nr</th>
<th>Name</th>
<th>Description </th>
</tr>  
<% $dataMK | Each { -%>
<tr>
<td>
<%= $Index + 1 %> </td><td> <a href="<%=$_.html_url %>" target="_blank"><%=$_.full_name%> </a> </td><td> <%= $_.description %>
</td>
</tr>
<% } -%>
</table>
'@

Invoke-EpsTemplate -Template $template
