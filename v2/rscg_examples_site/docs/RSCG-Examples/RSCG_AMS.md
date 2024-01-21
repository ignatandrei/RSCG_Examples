---
sidebar_position: 100
title: 10 - RSCG_AMS
description: Automatically registering the version, ci, commit id
slug: /RSCG_AMS
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_AMS  by Ignat Andrei


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/RSCG_AMS?label=RSCG_AMS)](https://www.nuget.org/packages/RSCG_AMS/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_AMS?label=updated)](https://github.com/ignatandrei/RSCG_AMS)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_AMS?style=social)

## Details

### Info
:::info

Name: **RSCG_AMS**

This package lets you put record the commit , date , and more for your software .

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_AMS/*   


You can find more details at https://github.com/ignatandrei/RSCG_AMS

Source : https://github.com/ignatandrei/RSCG_AMS

:::

### Original Readme
:::note

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

:::

### About
:::note

Automatically registering the version, ci, commit id


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_AMS**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
  <ItemGroup>
    <PackageReference Include="AMS_Base" Version="2023.5.21.1551" />
    <PackageReference Include="RSCG_AMS" Version="2023.5.21.1551" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_AMS** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using AMS_Base;

Console.WriteLine("Hello, World!");

var amsAll = AboutMySoftware.AllDefinitions;
Console.WriteLine("Number definitions:" + amsAll?.Length);
foreach (var amsKV in amsAll)
{
    var ams = amsKV.Value;

    Console.WriteLine($"{amsKV.Key}.{nameof(ams.AssemblyName)} : {ams.AssemblyName}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.DateGenerated)} : {ams.DateGenerated}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.CommitId)} : {ams.CommitId}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.RepoUrl)} : {ams.RepoUrl}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.CISourceControl)} : {ams.CISourceControl}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.Authors)} : {ams.Authors}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.Version)} : {ams.Version}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.User)} : {ams.User}");
    Console.WriteLine("versions" + ams.Versions?.Length);
    if (ams.Versions != null)
        foreach (var item in ams.Versions)
        {
            Console.WriteLine("release:" + item.Name);
            foreach (var merge in item.releaseDatas)
            {
                Console.WriteLine("=>merge:" + merge.Subject);
            }

        }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\globals.cs" label="globals.cs" >

  This is the use of **RSCG_AMS** in *globals.cs*

```csharp showLineNumbers 
[assembly: AMS_Base.VersionReleased(Name = "WithVersioning", ISODateTime = "2022-04-02", recordData = AMS_Base.RecordData.Merges)]
[assembly: AMS_Base.VersionReleased(Name = "FutureRelease", ISODateTime = "9999-04-16", recordData = AMS_Base.RecordData.Merges)]

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\obj\GX\AMS\AMS.AMSVersionIncremental\RSCG_AMSDemo.cs" label="RSCG_AMSDemo.cs" >


```csharp showLineNumbers 
using System;
using AMS_Base;
namespace RSCG_AMSDemo { 
    /// <summary>
    /// this is the About My Software for 828469749970839076110119122
    /// </summary>
    public class XAboutMySoftware_828469749970839076110119122 :AboutMySoftware {
        /// <summary>
        /// starts when this module is loaded and 
        /// add the AMS tot the 
        /// </summary>
        [System.Runtime.CompilerServices.ModuleInitializer]
        public static void Add_AboutMySoftware_828469749970839076110119122(){
            AboutMySoftware.AddDefinition("RSCG_AMSDemo",new  XAboutMySoftware_828469749970839076110119122());      
        }
        /// <summary>
        /// constructor
        /// for AMS 828469749970839076110119122
        /// </summary>
        public XAboutMySoftware_828469749970839076110119122(){
            AssemblyName ="RSCG_AMSDemo" ; 
            DateGenerated = DateTime.ParseExact("20240121073709", "yyyyMMddHHmmss", null); 
            CommitId  = "not in a CI run" ; 
            RepoUrl ="https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md" ; 
            CISourceControl = "not in a CI run" ; 
            SourceCommit = "https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md" ; 
            Authors= "";
            Version= "";    
            EnvironmentVars =";User_TEMP;User_Path;User_TMP;User_OneDrive;User_OneDriveConsumer;User_ChocolateyLastPathUpdate;Process_DriverData;Process_DOTNET_WATCH_ITERATION;Process_Path;Process_LOCALAPPDATA;Process_USERNAME;Process_PUBLIC;Process_PROCESSOR_IDENTIFIER;Process_TEMP;Process_DOTNET_CLI_TELEMETRY_SESSIONID;Process_APPDATA;Process_WT_SESSION;Process_MSBuildExtensionsPath;Process_DOTNET_WATCH;Process_ProgramData;Process_CommonProgramFiles;Process_CommonProgramW6432;Process_MSBUILDUSESERVER;Process_MSBuildLoadMicrosoftTargetsReadOnly;Process_ProgramFiles;Process_HOMEDRIVE;Process_CommonProgramFiles(x86);Process_NUGET_PACKAGES;Process_OneDrive;Process_USERDOMAIN_ROAMINGPROFILE;Process_SystemDrive;Process_windir;Process_PROCESSOR_ARCHITECTURE;Process_NUMBER_OF_PROCESSORS;Process_ProgramW6432;Process_ComSpec;Process_JAVA_HOME;Process_USERPROFILE;Process_ChocolateyInstall;Process_PROCESSOR_REVISION;Process_SystemRoot;Process_PROCESSOR_LEVEL;Process_WT_PROFILE_ID;Process_WSLENV;Process_PATHEXT;Process_OS;Process_DOTNET_LAUNCH_PROFILE;Process_PSModulePath;Process_ProgramFiles(x86);Process_HOMEPATH;Process_COMPUTERNAME;Process_LOGONSERVER;Process_ChocolateyLastPathUpdate;Process_DOTNET_HOST_PATH;Process_USERDOMAIN;Process_SESSIONNAME;Process_MSBuildSDKsPath;Process_OneDriveConsumer;Process_ALLUSERSPROFILE;Process_npm_config_cache;Process_ZES_ENABLE_SYSMAN;Process_POWERSHELL_DISTRIBUTION_CHANNEL;Process_TMP;Machine_PROCESSOR_LEVEL;Machine_ChocolateyInstall;Machine_ComSpec;Machine_NUMBER_OF_PROCESSORS;Machine_JAVA_HOME;Machine_POWERSHELL_DISTRIBUTION_CHANNEL;Machine_Path;Machine_OS;Machine_PROCESSOR_REVISION;Machine_TEMP;Machine_DriverData;Machine_PROCESSOR_ARCHITECTURE;Machine_PSModulePath;Machine_NUGET_PACKAGES;Machine_windir;Machine_ZES_ENABLE_SYSMAN;Machine_npm_config_cache;Machine_PATHEXT;Machine_TMP;Machine_USERNAME;Machine_PROCESSOR_IDENTIFIER";
            User = "ignat";
            IsInCI=false;
            
{ var v=new VersionReleased();
v.Name = "FutureRelease" ;
v.ISODateTime=DateTime.ParseExact("99990416","yyyyMMdd",null); { 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "ce494f74c9044a59eb06477f01fde5be11ed1faa";
rd.Subject = "Merge pull request #176 from ignatandrei/Chorn.EmbeddedResourceAccessGenerator";
rd.ReleaseDate = DateTime.ParseExact("20240120","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "ffbd65d8e5a660b7a0b59f49b7339d416d84a638";
rd.Subject = "Merge pull request #175 from ignatandrei/BuildInfo";
rd.ReleaseDate = DateTime.ParseExact("20240120","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1a75fe4c00afa005ba6a0f87101fbf22ce239420";
rd.Subject = "Merge pull request #174 from ignatandrei/Class2Interface";
rd.ReleaseDate = DateTime.ParseExact("20240119","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "3d0d47ac60c0712f7eaa6047c200219a7b3f5da0";
rd.Subject = "Merge pull request #173 from ignatandrei/funcky-discriminated-union";
rd.ReleaseDate = DateTime.ParseExact("20240119","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1fd1d86e86ea829cb8f822f24b5490485a1634a1";
rd.Subject = "Merge pull request #172 from ignatandrei/DP";
rd.ReleaseDate = DateTime.ParseExact("20240112","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9daa6fb5369a93e04134108244ca6afaa7b0572a";
rd.Subject = "Merge pull request #171 from ignatandrei/HsuSgSync";
rd.ReleaseDate = DateTime.ParseExact("20240112","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "2a784d845d546cdabf677f55f681df2e29e41045";
rd.Subject = "Merge pull request #169 from ignatandrei/CopyCat";
rd.ReleaseDate = DateTime.ParseExact("20240110","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9094531355a654c9812fa42230b1e7aa4cc987cc";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20240108","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "805f583a1d27d80346218343c5a6b33ca98da103";
rd.Subject = "Merge pull request #167 from ignatandrei/mocklis";
rd.ReleaseDate = DateTime.ParseExact("20240103","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "251d56117a79e0c01926a1d303e7308f1397607a";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231230","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9be5ebf1e7101372a426e6bc30af709ea2a57329";
rd.Subject = "Merge pull request #166 from ignatandrei/RSCG_UtilityTypes";
rd.ReleaseDate = DateTime.ParseExact("20231223","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "4a628ea4ce0bacb187a2f9254234781c03adc778";
rd.Subject = "Merge pull request #161 from ignatandrei/160-logtelemetry";
rd.ReleaseDate = DateTime.ParseExact("20231130","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c0a1a456d1fa457bf2a4263b39d3c57d979c71ed";
rd.Subject = "Merge pull request #159 from ignatandrei/158-razor-sdk";
rd.ReleaseDate = DateTime.ParseExact("20231130","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "2cdb15712a72d956792a881de309fb5f3d415835";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231120","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1996f03fe321e48d3737947b24a1736825385f0f";
rd.Subject = "Merge pull request #157 from ignatandrei/ComImport";
rd.ReleaseDate = DateTime.ParseExact("20231118","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c742ddb501960e10859a1445f06e4a0f60c1dbce";
rd.Subject = "Merge pull request #156 from ignatandrei/Microsoft.AspNetCore.Http.RequestDelegateGenerator";
rd.ReleaseDate = DateTime.ParseExact("20231117","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "76e8ca06f133ba1d8d5aa0da1ccc10c614b94f82";
rd.Subject = "Merge pull request #155 from ignatandrei/Microsoft.Extensions.Configuration.Binder.SourceGeneration.ConfigurationBindingGenerator";
rd.ReleaseDate = DateTime.ParseExact("20231117","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "7d8ce2b3c5f535965f84be891cd05f4a615b2a94";
rd.Subject = "Merge pull request #154 from ignatandrei/Microsoft.Extensions.Options.SourceGeneration";
rd.ReleaseDate = DateTime.ParseExact("20231116","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "359f0a6204becf12682b7fc5b2a781335ef4a9bd";
rd.Subject = "Merge pull request #153 from ignatandrei/143-biwenautoclassgen";
rd.ReleaseDate = DateTime.ParseExact("20231115","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "2554ff980c2868116f6d7790ad2f476431b39714";
rd.Subject = "Merge branch 'main' into 143-biwenautoclassgen";
rd.ReleaseDate = DateTime.ParseExact("20231115","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "8fd01a9e0f327e90adb423863573e81e6ac6abe5";
rd.Subject = "Merge pull request #152 from ignatandrei/151-primaryparameter";
rd.ReleaseDate = DateTime.ParseExact("20231115","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "2045f58954e0f2953e2fd06d950a8b208954138d";
rd.Subject = "Merge pull request #150 from ignatandrei/142-json-converter-source-generator";
rd.ReleaseDate = DateTime.ParseExact("20231108","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "30bbb1b56950a4aa35a8090995f120bee7977f63";
rd.Subject = "Merge branch 'main' into 142-json-converter-source-generator";
rd.ReleaseDate = DateTime.ParseExact("20231108","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "cfd13de1b38005d9d8ff82283f87faf0bc4731d0";
rd.Subject = "Merge pull request #149 from ignatandrei/148-nsourcegeneratorsuniontypes";
rd.ReleaseDate = DateTime.ParseExact("20231107","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "61a25a2165d2465fb4bf8388e3192855b5087f61";
rd.Subject = "Merge pull request #147 from ignatandrei/146-autoconstructor";
rd.ReleaseDate = DateTime.ParseExact("20231106","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "0620d74db7edffe52511e0ecfcf5bba463ba43fe";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231106","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "ee7b1ee0a733752d080ef6d00a5e934864a7e6a1";
rd.Subject = "Merge pull request #145 from ignatandrei/144-dudnet";
rd.ReleaseDate = DateTime.ParseExact("20231106","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "b75ea1f3510e4f9a91fe626f5366c086d803f959";
rd.Subject = "Merge pull request #141 from ignatandrei/MinimalApiBuilder";
rd.ReleaseDate = DateTime.ParseExact("20231027","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "333bd76c980360fdf0271c933eb89802ac447531";
rd.Subject = "Merge pull request #140 from ignatandrei/139-dynamicsmapper";
rd.ReleaseDate = DateTime.ParseExact("20231022","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "06a2886c584a1fa4b19101c06afb81fd768b87d1";
rd.Subject = "Merge branch 'main' into 139-dynamicsmapper";
rd.ReleaseDate = DateTime.ParseExact("20231021","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "f685f9230214577474d377136b0cdb268400bbca";
rd.Subject = "Merge pull request #137 from ignatandrei/StaticReflection";
rd.ReleaseDate = DateTime.ParseExact("20231014","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "0533bc9b02cff143d5d0a0726a7253cbe7036293";
rd.Subject = "Merge pull request #136 from ignatandrei/124-credfetoenumerationsourcegeneration";
rd.ReleaseDate = DateTime.ParseExact("20231008","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "366ff79c2d280829a1a02ae5d17eb00f5d5309d4";
rd.Subject = "Merge branch 'main' into 124-credfetoenumerationsourcegeneration";
rd.ReleaseDate = DateTime.ParseExact("20231008","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "49effaeec5a1e501afea460f3a478be30fcd556e";
rd.Subject = "Merge pull request #135 from ignatandrei/134-meziantoupolyfill";
rd.ReleaseDate = DateTime.ParseExact("20231007","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "8e040372bb5de435e80469f0f90969fc2a6a5c9f";
rd.Subject = "Merge pull request #133 from ignatandrei/132-rscg_templating";
rd.ReleaseDate = DateTime.ParseExact("20231007","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "176e11e878398c1d469839c76bd226d56cd0c960";
rd.Subject = "Merge pull request #131 from ignatandrei/130-disposablehelpers";
rd.ReleaseDate = DateTime.ParseExact("20231005","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c554b763db6cf1eef2b89bd227eb00d46756f0cb";
rd.Subject = "Merge pull request #129 from ignatandrei/MagicMap";
rd.ReleaseDate = DateTime.ParseExact("20231005","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "0ba13e28a4c855f70d5ee4376021f19039c39157";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "112ca007e09037bd9afc62d3b8d6e04860cfe96f";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "6638f0690946b5fd83b435bd72a6b5f6f2d86ba9";
rd.Subject = "Merge pull request #120 from ignatandrei/119-idisposablegenerator";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "db6cb6dc5a1490d85ee7a0fba1ecaeff0d71f96c";
rd.Subject = "Merge branch 'main' into 119-idisposablegenerator";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9f051359d0cc2c3e4579f11be935f7f73973d9a0";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "78966396ac03148897fbcb9f8f8b71a11be2b60d";
rd.Subject = "Merge pull request #128 from ignatandrei/127-jsonpolymorphicgenerator";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c7e7a3499cc60366bdeedd17e56635dbc8ab1fac";
rd.Subject = "Merge pull request #126 from ignatandrei/125-mapto";
rd.ReleaseDate = DateTime.ParseExact("20231004","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1f0d8d98566697d985014a16649e3a8e81e74a17";
rd.Subject = "Merge pull request #122 from ignatandrei/BuilderGenerator";
rd.ReleaseDate = DateTime.ParseExact("20231003","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "41cdfc8689dfc449e152982456bc9bd4846d81d2";
rd.Subject = "Merge branch 'main' into BuilderGenerator";
rd.ReleaseDate = DateTime.ParseExact("20231003","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9b8a03bf3b8f5fe8983b85223910fa51b8b2fcf5";
rd.Subject = "Merge pull request #123 from SoftStoneDevelop/updateGedaq";
rd.ReleaseDate = DateTime.ParseExact("20231003","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "a07fb51d95db1ab5bb5163f0a552c3e4b3f4958c";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231002","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "a0e442d95c0a763bda2fa12ad849791b7232b2b7";
rd.Subject = "Merge pull request #121 from ignatandrei/Disposer";
rd.ReleaseDate = DateTime.ParseExact("20231002","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "52a18738361baa9c569d719d6ae3346127d22823";
rd.Subject = "Merge pull request #118 from ignatandrei/117-resxgenerator";
rd.ReleaseDate = DateTime.ParseExact("20231002","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "13920c9ed87c9867508d2179b833cab4b2640da4";
rd.Subject = "Merge pull request #116 from ignatandrei/StringLiteral";
rd.ReleaseDate = DateTime.ParseExact("20231002","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e27daa439b644bfd86ab1ba64c02c3de61fe0989";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20231001","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "734714e52dbcb60b02bc1433dfac2b4c19f332a0";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230924","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "111b45ca9482ef257b7ff4abf2a88727db3ba6b1";
rd.Subject = "Merge pull request #113 from ignatandrei/111-protobuf";
rd.ReleaseDate = DateTime.ParseExact("20230924","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "02f71e7b1627be66a585a1a762369b6bbf796eb3";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into 111-protobuf";
rd.ReleaseDate = DateTime.ParseExact("20230924","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "b697ec81811b3676d46fa4228cd78b74864dbb4e";
rd.Subject = "Merge pull request #110 from ignatandrei/109-saferouting";
rd.ReleaseDate = DateTime.ParseExact("20230923","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "8df9022da6ba2ccc4fed361b28a327fdd423ce88";
rd.Subject = "Merge pull request #107 from ignatandrei/106-sourcegeneratorhelpercopycode";
rd.ReleaseDate = DateTime.ParseExact("20230923","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c17a1d0b0742d811b9fc33401a6e8bdb3a1a8262";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230916","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "d748ebc43de427c9c17e9d0b7dd4fa9ad739f0ad";
rd.Subject = "Merge pull request #104 from ignatandrei/SameCategory";
rd.ReleaseDate = DateTime.ParseExact("20230909","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "3d25a38df8cd0a5412163df7bb9642ad1a583543";
rd.Subject = "Merge pull request #103 from ignatandrei/M31.FluentAPI";
rd.ReleaseDate = DateTime.ParseExact("20230901","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "0430d22da35551e42e383a5c476044441ce3b439";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230826","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "cd770cc9199d8c823441024348d339bd070afa2a";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230809","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e57ea5862ec113c8d06dd9dd813d521efe22e25f";
rd.Subject = "Merge pull request #102 from ignatandrei/101-gobie";
rd.ReleaseDate = DateTime.ParseExact("20230806","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "d282cd345392c1952f7d4caffe7ebe848bb2dc4c";
rd.Subject = "Merge pull request #100 from ignatandrei/99-ridge";
rd.ReleaseDate = DateTime.ParseExact("20230806","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9509375224ed43959ddd6fcfe0056a838a131ce0";
rd.Subject = "Merge pull request #98 from ignatandrei/97-strongly";
rd.ReleaseDate = DateTime.ParseExact("20230805","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "909eb716f89ff9d0f34e0c5f32a6e6097b091845";
rd.Subject = "Merge pull request #96 from ignatandrei/95-propertychangedsourcegenerator";
rd.ReleaseDate = DateTime.ParseExact("20230805","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "0b75c43b38fd4a30f995abc1514f4c41fb967fc6";
rd.Subject = "Merge pull request #94 from ignatandrei/93-injectio";
rd.ReleaseDate = DateTime.ParseExact("20230805","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "88bca8504af28d7868fd39c8844c9b56a97b21bc";
rd.Subject = "Merge pull request #92 from ignatandrei/91-nextgenmapper";
rd.ReleaseDate = DateTime.ParseExact("20230805","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "ee65b76791438c0164fe6b604a31c54e57f7fb37";
rd.Subject = "Merge pull request #90 from ignatandrei/89-syncmethodgenerator";
rd.ReleaseDate = DateTime.ParseExact("20230804","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1e4e918309a87d3579677f2b6e8922c73bfaef33";
rd.Subject = "Merge pull request #88 from ignatandrei/87-spreadcheetah";
rd.ReleaseDate = DateTime.ParseExact("20230803","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "b8667d76734ccd6a682dda08a40839ed90f501b2";
rd.Subject = "Merge pull request #86 from ignatandrei/85-immutype";
rd.ReleaseDate = DateTime.ParseExact("20230803","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "63ad10a3952b16bf1b2aee92a352081157a9cd2d";
rd.Subject = "Merge pull request #84 from ignatandrei/83-generatorequals";
rd.ReleaseDate = DateTime.ParseExact("20230803","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "a49e7763706b0ef60069c54bfb382f3c55b917f4";
rd.Subject = "Merge pull request #82 from ignatandrei/81-fastgenericnew";
rd.ReleaseDate = DateTime.ParseExact("20230803","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "a9ff00fdf0b757365270720a7c93bec2246f42b6";
rd.Subject = "Merge pull request #80 from ignatandrei/79-breezy";
rd.ReleaseDate = DateTime.ParseExact("20230802","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "197414b388b7840d468c2fa7b0792a9a675d2e42";
rd.Subject = "Merge pull request #78 from ignatandrei/77-enumclass";
rd.ReleaseDate = DateTime.ParseExact("20230802","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "72a552210160cd87ec179a323705f146aba68ada";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230801","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e02cf8b4d605687b5c0c4a92f709d4e950338ddb";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230801","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c031123edb667e2af31b9c046b0546584a074793";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230801","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "37f5f448035925d5f26f390da8c8ae359a98ec2d";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230801","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "722a7821f1e12205f1f1741723763c3cb1e09382";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230731","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e269a4919c55bd07a832853e857f23f2f3459154";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230729","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "5de7126c98d4d9f090b5d3d82dcd1eec7535a7c7";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230727","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "91d62dff7142c660fc5046a71c6d1db31a7218ec";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230708","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "0d25e6067e1c49500604d812b0c579344a6f69a6";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230704","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "efd1aa541ad0117edfbb55eda5afc92179debb13";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230521","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e458336035ec3f6c8b2096de21ab6a2a2e4377aa";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230519","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "d4d900aedf110891ff6fd974a4230f3e64fa8fbf";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230519","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "497f016ee38ed84ad46a224af224dcc079b212a3";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230518","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "752c2603c69d068d6f3cc533dea4febb3ffcc490";
rd.Subject = "Merge pull request #60 from ignatandrei/40-httpsgithubcomltrzesniewskirazorblade";
rd.ReleaseDate = DateTime.ParseExact("20230516","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "85c7e47e29fa4aac1f8bc2451ba3f89938a35e6b";
rd.Subject = "Merge pull request #59 from ignatandrei/35-httpsgithubcomdomn1995dunet";
rd.ReleaseDate = DateTime.ParseExact("20230516","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "74e4bc7adaf110c80d328b957ae6c302969b427c";
rd.Subject = "Merge pull request #58 from ignatandrei/36-httpsgithubcomdistantcamautoctor";
rd.ReleaseDate = DateTime.ParseExact("20230516","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e6f03e4eaf45c7edbafd6c888f1cc9eee9295ec7";
rd.Subject = "Merge pull request #57 from ignatandrei/37-httpsgithubcomflavienquickconstructor";
rd.ReleaseDate = DateTime.ParseExact("20230515","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "01c13b88674c19f18f3229b3be0643e454fdfb5b";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230515","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e559ea3ab9adc9cae60dbc942c811eac1dd51e25";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230515","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "201637618cebc273144a4bfb7211a2055c16e80d";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230514","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "a72f3a36c876def2e6c438c3a3c24abe7ba1db0d";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230514","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c0c54da6c25e12bd886698022ac57f7b11fb8c4c";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230513","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "4c6fbf61eda86bcf2d049462913853ec8c52f1b2";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230513","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "56622984f6dddeca95a0f38f8d0809b96470fdff";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230513","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "f0caab198c26eb1a21e8e341d094222f689cd13f";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230512","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "87d3b7833fc8f99d41683fa3fcee088a7adfed85";
rd.Subject = "Merge pull request #54 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20230511","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "f68ad7b997593ded5e2ba60f65bf0ac295ae36f3";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230510","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e5e9d0bbb7428cc1950eda609ce618d1394c9a89";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230509","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "95c1e2325ad41b28848a76c98e3b200aaa908a29";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230509","yyyyMMdd",null);  
v.AddRelease(rd);
} this.AddVersion(v);}
{ var v=new VersionReleased();
v.Name = "WithVersioning" ;
v.ISODateTime=DateTime.ParseExact("20220402","yyyyMMdd",null); { 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c5c219a2a3cb26b8d1a46d632cf2dee54653602c";
rd.Subject = "Merge pull request #23 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20211016","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1b6d21a19e8bc4ec9323d4369b8958d5563b0015";
rd.Subject = "Merge pull request #22 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20211011","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "6d47fdc34ac4dc999f2e13fd828cd9f79f3bd41b";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20211005","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c3778675e5bfbeaa81667ada1fa24a19cf0e1efc";
rd.Subject = "Merge pull request #21 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20211003","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "ea755c59323eefd5c2ff7b2c34220ac5f8dbeaeb";
rd.Subject = "Merge pull request #20 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210901","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1ea5abc7b06c3776fd49a991234d63e141a9d1e4";
rd.Subject = "Merge pull request #19 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210831","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "da6a848014673e96e07f64f00106f050d539142d";
rd.Subject = "Merge pull request #18 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210821","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "5bccff438ec6604d7eb45925a4714276b0b4bf16";
rd.Subject = "Merge pull request #17 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210815","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "17aebf5d69a448572ce4fd831f3dd94d56099956";
rd.Subject = "Merge pull request #16 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210815","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "83e209f09c4511a0e5607925fa730658f0940287";
rd.Subject = "Merge pull request #12 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210807","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "072cfeeda71acb1d84961291e962b4eab90b16a5";
rd.Subject = "Merge pull request #11 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210717","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9172c92711d71da5e5c6aa8929f8ff6a8ac85b9e";
rd.Subject = "Merge pull request #10 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210625","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "918954a5ac28eb47e041faa90990ffd85a4a3499";
rd.Subject = "Merge pull request #7 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210621","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "16d62359fc7d807ed652fd9b4218b4aa04734d43";
rd.Subject = "Merge pull request #5 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210330","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "3b082c0aa0f63effd098a2bad184b03447406ec0";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20210308","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1a998fa87363c6df6b6d4a09dc514503808d380f";
rd.Subject = "Merge pull request #4 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210308","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c5fa74a2ad780af288ece391da7a5ac84b06332e";
rd.Subject = "Merge pull request #3 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210307","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "1bedfd1d4cb00f666b94fdaecdd7bd7da2e6a435";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20210302","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "3223ba3b8e69fc9e72e34735cc135b39881f7b59";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20210218","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "bea2886eb02f17523a34ff16f475654cb4b24ff4";
rd.Subject = "Merge pull request #1 from ignatandrei/whitesource/configure";
rd.ReleaseDate = DateTime.ParseExact("20210217","yyyyMMdd",null);  
v.AddRelease(rd);
} this.AddVersion(v);}
        }
        
    }
        
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_AMS ](/sources/RSCG_AMS.zip)

:::


### Share RSCG_AMS 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&quote=RSCG_AMS" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&text=RSCG_AMS:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&title=RSCG_AMS" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&title=RSCG_AMS&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_AMS

## In the same category (EnhancementProject)


### [BuildInfo](/docs/BuildInfo)


### [Com](/docs/Com)


### [DeeDee](/docs/DeeDee)


### [Matryoshki](/docs/Matryoshki)


### [Mediator](/docs/Mediator)


### [ProxyGen](/docs/ProxyGen)


### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)


### [ThisAssembly](/docs/ThisAssembly)

