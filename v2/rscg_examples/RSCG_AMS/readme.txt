# RSCG_AMS
a Roslyn Source Code Generator for About My Software

You will obtain

![RSCG_AMS](https://ignatandrei.github.io/RSCG_AMS/result.png "RSCG_AMS Generated")

( See online at https://netcoreblockly.herokuapp.com/ams )

[![AMS_BASE](https://img.shields.io/nuget/v/AMS_Base?label=AMS_Base)](https://www.nuget.org/packages/AMS_Base/)
[![RSCG_AMS](https://img.shields.io/nuget/v/RSCG_AMS?label=RSCG_AMS)](https://www.nuget.org/packages/RSCG_AMS/)
[![AMSWebAPI](https://img.shields.io/nuget/v/AMSWebAPI?label=AMSWebAPI)](https://www.nuget.org/packages/AMSWebAPI/)
 

[![BuildAndTest](https://github.com/ignatandrei/RSCG_AMS/actions/workflows/dotnet.yml/badge.svg)](https://github.com/ignatandrei/RSCG_AMS/actions/workflows/dotnet.yml)
## How to use
### For Console or DLL 

Add to the csproj 2023.5.21.1551
```xml 
<ItemGroup>
    <PackageReference Include="AMS_Base" Version="2023.5.21.1551" />
    <PackageReference Include="RSCG_AMS" Version="2023.5.21.1551" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
  </ItemGroup>
```

And access like this:
```csharp
 var amsAll = AboutMySoftware.AllDefinitions;
foreach (var amsKV in amsAll)
{
    var ams = amsKV.Value;

    Console.WriteLine($"{amsKV.Key}.{nameof(ams.AssemblyName)} : {ams.AssemblyName}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.DateGenerated)} : {ams.DateGenerated}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.CommitId)} : {ams.CommitId}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.RepoUrl)} : {ams.RepoUrl}");
}
```

### For  Web applications

Add to the csproj
```xml 
    <PackageReference Include="AMSWebAPI" Version="2023.5.21.1551" />
    <PackageReference Include="AMS_Base" Version="2023.5.21.1551" />
    <PackageReference Include="RSCG_AMS" Version="2023.5.21.1551" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />

```

And in the Startup.cs put 

```csharp
//above the namespace : using AMSWebAPI;
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.UseAMS();
});
```

The access /ams/all ( for json)  or /ams/index ( for html)

## Adding releases on date

For adding releases between dates  use the following codes:

```csharp
using AMS_Base;
[assembly:VersionReleased(Name="PreviousReleases",ISODateTime ="2022-03-31",recordData = RecordData.Merges)]
[assembly: VersionReleased(Name = "WithVersioning", ISODateTime = "2022-04-02", recordData = RecordData.Merges)]
[assembly: AMS_Base.VersionReleased(Name = "FutureRelease", ISODateTime = "9999-04-16", recordData = AMS_Base.RecordData.Merges)]

```
## Detecting that you are in a CI build

Put into the .csproj
```xml
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
```

In the obj folder see the GeneratedX folder, then AMS folder, than AMS.AMSVersion folder, then edit the .cs file with notepad

you will see something like
```csharp
public class XAboutMySoftware_digits
```
Please see what are the digits

In your code put someething like this
```csharp
bool IsInCI = new XAboutMySoftware_digits().IsInCI;

builder.Services.AddDbContextFactory<ApplicationDBContext>(
    options =>
    {
        if (IsInCI)
        {
            var cn = builder.Configuration.GetConnectionString("DefaultConnection");
            options.UseSqlServer(cn);
        }

        else
        {
            var cn = "Data Source=Tilt.db";
            options.UseSqlite(cn);
        }
    }
     )
   ;

```
## Modifying the subject
Add to the csproj the following
```xml
<ItemGroup>
    <CompilerVisibleProperty Include="AMSMerge" />
  </ItemGroup>
  <PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>
		<AMSMerge>AMSInterpreter.MergeAnalyzer</AMSMerge>
	</PropertyGroup>
  
```

and add the following code to a class
```csharp
public static string MergeAnalyzer(string RepoUrl,string CommitId, string Author,    DateTime ReleaseDate, string Subject)
        {
            try
            {
                /*{
                    //modify the subject 
                    string regex = @"^Merge\ pull\ request\ \#(?<issueID>\d+)\ from\ (?<branch>.+?)$";

                    RegexOptions options = RegexOptions.Multiline;
                    string input = Subject;

                    MatchCollection matches = Regex.Matches(input, regex, options);
                    foreach (Match match in matches)
                    {
                        return $"Issue ID: {RepoUrl}/issues/{match.Groups["issueID"].Value} branch: {match.Groups["branch"].Value}"; ; 
                    }
                    return Subject;
                }*/
            }
            catch (Exception ex)
            {
                return $"{CommitId} {ex.Message}";
            }
            
        }
```
## Diagnostics

//TODO: Add more explanations here

```xml
  <ItemGroup>
    <ProjectReference Include="..\AMS\AMS.csproj" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
    <ProjectReference Include="..\AMS_Base\AMS_Base.csproj" />
	<CompilerVisibleProperty Include="AMSMerge" />
	  <CompilerVisibleProperty Include="FakeWarningForDiagnostics" />
	  

  </ItemGroup>
	<PropertyGroup>
		<FakeWarningForDiagnostics>true</FakeWarningForDiagnostics>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)GeneratedX</CompilerGeneratedFilesOutputPath>
		<AMSMerge>AMSInterpreter.MergeAnalyzer</AMSMerge>
	</PropertyGroup>

```	
## CI settings
For GitLab:

For GitHub actions:
```yaml
 steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
```
## How it is built

The AMS_Base project / nuget is containing the definition

The RSCG_AMS project / nuget generates the code for having , in CI , the C# class with the commit / Repo / date / other details.

The AMSWebAPI project / nuget generates the code for endpoints  :  /ams/index.html and /ams/all ( for json )

See more at http://msprogrammer.serviciipeweb.ro/category/ams/

## TBD:

More about https://github.com/ignatandrei/RSCG_AMS/issues/27 
```xml
<AMSGitArgs>log --merges --pretty='%an|%ai|%H|%s</AMSGitArgs>
```

More about Angular - to display ams - see src/Angular




# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)