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


<TOCInline toc={toc} />

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\Program.cs" label="Program.cs" >

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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\globals.cs" label="globals.cs" >

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


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\obj\GX\AboutMySoftware.cs" label="AboutMySoftware.cs" >


```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Linq;

namespace AMS_Base
{
    public class AboutMySoftware
    {
        private  static Dictionary<string, AboutMySoftware> AllDefinitionsDict = new Dictionary<string, AboutMySoftware>();
        public static DateTime[] Dates
        {
            get
            {
                return AllDefinitions.Select(it => it.Value.DateGenerated.Date).OrderByDescending(it=>it).ToArray();
            }
        }
        
        public static KeyValuePair<string,AboutMySoftware>[] AllDefinitions
        {
            get
            {
                return AllDefinitionsDict.OrderByDescending(it=>it.Value.DateGenerated).ToArray();
            }
        }
        public static void AddDefinition(string name , AboutMySoftware soft)
        {
            lock (AllDefinitionsDict)
            {
                AllDefinitionsDict[name] = soft;
            }
        }
        private List<VersionReleased> backup;
        public VersionReleased[] Versions
        {
            get
            {
                return backup.ToArray();
            }
            set
            {
                backup =  new List<VersionReleased>(value);
            }
        }
        public AboutMySoftware AddVersion(VersionReleased v)
        {
            this.backup.Add(v);
            return this;
        }
        public string EnvironmentVars { get; set; }
        public const string NotFoundLink = "https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md";
        public AboutMySoftware()
        {
            backup = new List<VersionReleased>();
            CommitId = "not in a CI run";
            CISourceControl = "not in a CI run";
            var strEnv = "";
            foreach (var item in Environment.GetEnvironmentVariables(EnvironmentVariableTarget.User).Keys)
            {
                strEnv += ";User_"+item?.ToString();
            }
            foreach (var item in Environment.GetEnvironmentVariables(EnvironmentVariableTarget.Process).Keys)
            {
                strEnv += ";Process_" + item?.ToString();
            }
            foreach (var item in Environment.GetEnvironmentVariables(EnvironmentVariableTarget.Machine).Keys)
            {
                strEnv += ";Machine_" + item?.ToString();
            }
            EnvironmentVars = strEnv;
            RepoUrl = NotFoundLink;
            SourceCommit = NotFoundLink;
            User = Environment.UserName;
            DateGenerated = DateTime.UtcNow;
            IsInCI = false;
        }
        public string User { get; set; }
        public string Version { get; set; }
        public string Authors { get; set; }
        public bool IsInCI { get; set; }
        public string SourceCommit { get; set; }
        public string CISourceControl { get; set; }
        public string AssemblyName { get; set; }
        public DateTime DateGenerated { get; set; }
        public string CommitId { get; set; }
        public string RepoUrl { get; set; }
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

### Download PDF

[Download PDF RSCG_AMS ](/pdfs/RSCG_AMS.pdf)

### Share RSCG_AMS 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&quote=RSCG_AMS" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&text=RSCG_AMS:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&title=RSCG_AMS" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&title=RSCG_AMS&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_AMS
