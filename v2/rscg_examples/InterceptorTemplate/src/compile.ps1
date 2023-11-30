cls
Write-Host "delete obj and bin"
gci obj -recurse | foreach{ri $_.FullName -recurse -force }
gci bin -recurse | foreach{ri $_.FullName -recurse -force }
#for windows batch file 
#setx InterceptMethods "FullName"
#echo Environment variable InterceptMethods has been set to %InterceptMethods%
$env:InterceptMethods = "FullName;Test;PersonsLoaded;TestFullNameWithArguments;ShowRandomPersonNumber;Connect;SavePerson;InsertPerson"
Write-Host "Environment variable  $env:InterceptMethods  has been set to " $env:InterceptMethods
dotnet clean
dotnet restore
dotnet build /p:EmitCompilerGeneratedFiles=true --disable-build-servers --force
dotnet run --project RSCG_InterceptorTemplateConsole/RSCG_InterceptorTemplateConsole.csproj
