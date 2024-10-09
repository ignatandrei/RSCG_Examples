
function ProcessCsproj {
  param (
      [string]$project
  )

$version = "2024.904.427"
$folderOutput= "D:\gth\PackageAnalyzer\src\documentation1_Temp"
$newNode = [xml]@"
<MainData>
<ItemGroup>
  <CompilerVisibleProperty Include="RSCG_ExportDiagram_OutputFolder" />
  <CompilerVisibleProperty Include="RSCG_ExportDiagram_Exclude" />
</ItemGroup>

<PropertyGroup>
  <RSCG_ExportDiagram_OutputFolder>$folderOutput</RSCG_ExportDiagram_OutputFolder>
  <RSCG_ExportDiagram_Exclude></RSCG_ExportDiagram_Exclude>
</PropertyGroup>
</MainData>
"@




# Write-Host $newNode.MainData.InnerXml
$backFile =$project + ".bak"
Copy-Item $project $backFile 
dotnet add $project package RSCG_ExportDiagram -v $version 
dotnet add $project package Microsoft.CodeAnalysis.Metrics --version 3.3.4

$proj = [xml](Get-Content $project)

$foundNode = $proj.Project
#Write-Host $proj.Project.InnerXml

$ItemGroup = $proj.ImportNode($newNode.DocumentElement.ItemGroup,$true)
$proj.Project.PrependChild($ItemGroup) 
$proj.DocumentElement.AppendChild($ItemGroup )


$PropertyGroup = $proj.ImportNode($newNode.DocumentElement.PropertyGroup,$true)
$proj.Project.PrependChild($PropertyGroup) 
$proj.DocumentElement.AppendChild($PropertyGroup)
$proj.Save($project) 
#dotnet build
# pause
#Copy-Item $backFile  $project -Force
#Remove-Item $backFile  -Force
return $proj
}

$solution  = gci *.sln | %{ $_.FullName}
$folderSolution = Split-Path $solution
# Write-Host $folderSolution
$csprojProcessed=@()
Get-Content $solution |
  Select-String 'Project\(' |
    ForEach-Object {
      $projectParts = $_ -Split '[,=]' | ForEach-Object { $_.Trim('[ "{}]') };
      # New-Object PSObject -Property @{
      #   Name = $projectParts[1];
      #   File = $projectParts[2];
      #   Guid = $projectParts[3]
      # }
      if ($projectParts[2] -match '.csproj$'){	
        $fileProject =Join-Path  $folderSolution $projectParts[2]
        $csprojProcessed+= $fileProject
        Write-Host $fileProject
        ProcessCsproj -project $fileProject -folderOutput $folderSolution
      }
    }

$csprojProcessed


dotnet build $solution   

dotnet build $solution /t:Metrics
$csprojProcessed | ForEach-Object {
  #Write-Host "metrics " $_
  $metricsFullFileName =$_.Replace(".csproj" , ".Metrics.xml")
  $metricsFileName = Split-Path $metricsFullFileName -leaf
  #Write-Host $metricsFileName
  $newMetricsFileName =Join-Path  "D:\gth\PackageAnalyzer\src\documentation1_Temp" $metricsFileName
  # $newMetricsFileName= Resolve-Path $newMetricsFileName
  # $newMetricsFileName = $newMetricsFileName.Path
  Write-Host "move $metricsFullFileName to  $newMetricsFileName"
  Move-Item $metricsFullFileName  $newMetricsFileName -Force
}
# pause
# Output the contents of the $csprojProcessed array
$csprojProcessed | ForEach-Object { 
  Write-Host $_ 
  $backFile =$_ + ".bak"
  Copy-Item $backFile  $_ -Force
  Remove-Item $backFile  -Force

}