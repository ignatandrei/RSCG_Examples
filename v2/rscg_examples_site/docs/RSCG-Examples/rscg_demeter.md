---
sidebar_position: 1910
title: 191 - rscg_demeter
description: Generating diagnostics about Law of Demeter violations
slug: /rscg_demeter
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# rscg_demeter  by Andrei Ignat


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/rscg_demeter?label=rscg_demeter)](https://www.nuget.org/packages/rscg_demeter/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/rscg_demeter?label=updated)](https://github.com/ignatandrei/rscg_demeter/)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/rscg_demeter?style=social)

## Details

### Info
:::info

Name: **rscg_demeter**

Interface to null object - common

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/rscg_demeter/*   


You can find more details at https://github.com/ignatandrei/rscg_demeter/

Source: https://github.com/ignatandrei/rscg_demeter/

:::

### Original Readme
:::note

# RSCG_Demeter
Demeter Law : http://haacked.com/archive/2009/07/14/law-of-demeter-dot-counting.aspx/


# Usage

Add the package RSCG_Demeter to the csproj

```xml
	<ItemGroup>
    <PackageReference Include="RSCG_Demeter" Version="2026.328.706" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
  </ItemGroup>
```

Then build the project - the analyzer will run and show the errors in the error list.

## Export 

Add this to the csproj

```xml
	<ItemGroup>
		<CompilerVisibleProperty Include="RSCG_Demeter_GenerateFile" />
	</ItemGroup>
	<PropertyGroup>
		<RSCG_Demeter_GenerateFile>../YourProjectName.csproj.txt</RSCG_Demeter_GenerateFile>
	</PropertyGroup>

```

And the file YourProjectName.csproj.txt will be generated with the errors.


:::

### About
:::note

Generating diagnostics about Law of Demeter violations


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **rscg_demeter**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net9.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
		<IsPackable>false</IsPackable>
		<TreatWarningsAsErrors>true</TreatWarningsAsErrors>
		<WarningsNotAsErrors>CS0436,NU1903</WarningsNotAsErrors>

	</PropertyGroup>

	<ItemGroup>
		<CompilerVisibleProperty Include="RSCG_Demeter_GenerateFile" />
	</ItemGroup>

	<PropertyGroup>
		<RSCG_Demeter_GenerateFile>obj/gx/RSCG_Console.csproj.txt</RSCG_Demeter_GenerateFile>
	</PropertyGroup>


<ItemGroup>
    <PackageReference Include="Microsoft.Bcl.AsyncInterfaces" Version="9.0.3" />
    <PackageReference Include="RSCG_Demeter" Version="2026.328.706" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
  </ItemGroup>



	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_demeter\src\RSCG_Console\Program.cs" label="Program.cs" >

  This is the use of **rscg_demeter** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using RSCG_Console;

Console.WriteLine("Hello, World!");
var dep = new Department();
dep.Employees.Add(new Employee());

foreach (var emp in dep.Employees)
{
    dep.EmployeeNames.Add(emp.Name);
}
var empAll = dep.Employees;
var empWithA = empAll.Where(it => it.Name.StartsWith("a"));
await Task.Run(dep.GetEmployees);
var asda = new List<int>(empAll.Select(it => it.ID).Distinct().OrderBy(it => it));
Console.WriteLine(asda.Count);
List<string> data = [];
var d = AppDomain.CurrentDomain.GetAssemblies()
    .Where(it => data.Any(a => !(it.FullName?.StartsWith(a) ?? false)))
    .Distinct()
    .ToArray();

var builder = new EmpBuilder().SetName("Ignat").SetId(1).SetName("Andrei");
var emp1 =builder.BuildEmployee();
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\rscg_demeter\src\RSCG_Console\obj\GX\RSCG_Console.csproj.txt" label="RSCG_Console.csproj.txt" >


```csharp showLineNumbers 
{
  "dateGenerator": "20250329050839",
  "nameGenerator": "Gerhart Hauptmann is feeling agreeable in Porto-Novo",
  "maxDemeterDots": 3,
  "locationsFound": 5,
  "DemeterLocations": [
    {
      "id": 1,
      "startLine": 5,
      "nrDots": 2,
      "endLine": 5,
      "filePath": "D:\\eu\\GitHub\\RSCG_Examples\\v2\\rscg_examples\\rscg_demeter\\src\\RSCG_Console\\Program.cs",
      "text": "dep.Employees.Add(new Employee())"
    },
    {
      "id": 2,
      "startLine": 9,
      "nrDots": 2,
      "endLine": 9,
      "filePath": "D:\\eu\\GitHub\\RSCG_Examples\\v2\\rscg_examples\\rscg_demeter\\src\\RSCG_Console\\Program.cs",
      "text": "    dep.EmployeeNames.Add(emp.Name)"
    },
    {
      "id": 3,
      "startLine": 12,
      "nrDots": 2,
      "endLine": 12,
      "filePath": "D:\\eu\\GitHub\\RSCG_Examples\\v2\\rscg_examples\\rscg_demeter\\src\\RSCG_Console\\Program.cs",
      "text": "it.Name.StartsWith(\u0022a\u0022)"
    },
    {
      "id": 4,
      "startLine": 14,
      "nrDots": 2,
      "endLine": 14,
      "filePath": "D:\\eu\\GitHub\\RSCG_Examples\\v2\\rscg_examples\\rscg_demeter\\src\\RSCG_Console\\Program.cs",
      "text": "empAll.Select(it =\u003E it.ID).Distinct().OrderBy(it =\u003E it)"
    },
    {
      "id": 5,
      "startLine": 17,
      "nrDots": 3,
      "endLine": 20,
      "filePath": "D:\\eu\\GitHub\\RSCG_Examples\\v2\\rscg_examples\\rscg_demeter\\src\\RSCG_Console\\Program.cs",
      "text": "AppDomain.CurrentDomain.GetAssemblies()\r\n    .Where(it =\u003E data.Any(a =\u003E !(it.FullName?.StartsWith(a) ?? false)))\r\n    .Distinct()\r\n    .ToArray()"
    }
  ]
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project rscg_demeter ](/sources/rscg_demeter.zip)

:::


### Share rscg_demeter 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_demeter&quote=rscg_demeter" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_demeter&text=rscg_demeter:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_demeter" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_demeter&title=rscg_demeter" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_demeter&title=rscg_demeter&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Frscg_demeter" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/rscg_demeter

### In the same category (FunctionalProgramming) - 15 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Dusharp](/docs/Dusharp)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [polytype](/docs/polytype)


#### [rscg_queryables](/docs/rscg_queryables)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [Sera.Union](/docs/Sera.Union)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionGen](/docs/UnionGen)


#### [UnionsGenerator](/docs/UnionsGenerator)

