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

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/RSCG_AMS?label=RSCG_AMS)](https://www.nuget.org/packages/RSCG_AMS/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_AMS?label=updated)](https://github.com/ignatandrei/RSCG_AMS)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_AMS?style=social)

## Details

### Info
:::info

Name: **RSCG_AMS**

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_AMS/*   


You can find more details at https://github.com/ignatandrei/RSCG_AMS

Source : https://github.com/ignatandrei/RSCG_AMS
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
