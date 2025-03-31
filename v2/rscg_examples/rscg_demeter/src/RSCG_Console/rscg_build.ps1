while($true)
{

    cls
    Write-Host "delete obj and bin"
    gci obj -recurse | foreach{ri $_.FullName -recurse -force }
    gci bin -recurse | foreach{ri $_.FullName -recurse -force }
    dotnet clean
    dotnet restore
    dotnet build /p:EmitCompilerGeneratedFiles=true --disable-build-servers --force
    dotnet run
    Read-Host -Prompt "Press Enter to continue"

}
