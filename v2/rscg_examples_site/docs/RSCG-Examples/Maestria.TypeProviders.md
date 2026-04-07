---
sidebar_position: 2670
title: 267 - Maestria.TypeProviders
description: Generating strong typed code from Excel.
slug: /Maestria.TypeProviders
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFilesToCode.mdx';

# Maestria.TypeProviders  by Fábio Monteiro Naspolini


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Maestria.TypeProviders?label=Maestria.TypeProviders)](https://www.nuget.org/packages/Maestria.TypeProviders/)
[![GitHub last commit](https://img.shields.io/github/last-commit/MaestriaNet/TypeProviders?label=updated)](https://github.com/MaestriaNet/TypeProviders)
![GitHub Repo stars](https://img.shields.io/github/stars/MaestriaNet/TypeProviders?style=social)

## Details

### Info
:::info

Name: **Maestria.TypeProviders**

.NET 5 C# Source TypeProviders.

Author: Fábio Monteiro Naspolini

NuGet: 
*https://www.nuget.org/packages/Maestria.TypeProviders/*   


You can find more details at https://github.com/MaestriaNet/TypeProviders

Source: https://github.com/MaestriaNet/TypeProviders

:::

### Author
:::note
Fábio Monteiro Naspolini 
![Alt text](https://github.com/MaestriaNet.png)
:::

## Original Readme
:::note

### Maestria.TypeProviders

[![NuGet Version](https://img.shields.io/nuget/v/Maestria.TypeProviders)](https://www.nuget.org/packages/Maestria.TypeProviders/)
[![NuGet Downloads](https://img.shields.io/nuget/dt/Maestria.TypeProviders)](https://www.nuget.org/packages/Maestria.TypeProviders/)
[![Apimundo](https://img.shields.io/badge/Maestria.TypeProviders%20API-Apimundo-728199.svg)](https://apimundo.com/organizations/nuget-org/nuget-feeds/public/packages/Maestria.TypeProviders/versions/latest?tab=types)

---

[![buy-me-a-coffee](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/buy-me-a-coffee.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)
[![smile.png](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/smile.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)

If my contributions helped you, please help me buy a coffee :D

[![donate](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/btn_donate.gif)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)

---

###### What is Maestria.Type.Providers?

Source Generator pack to increase productivity and improve source code writing.

###### How install and configure package?

First, install [Maestria.Type.Providers](https://www.nuget.org/packages/Maestria.TypeProviders/) from the dotnet cli command line:

```bash
dotnet add package Maestria.TypeProviders
dotnet add package ClosedXML
```

###### Providers x Dependencies

This package does not include dependencies references when installed on your project, its only generate source code files.  
You need install thirds dependencies to compile your project according to the features used, bellow instructions of source generator providers:

- [ExcelProvider](#excelprovider): Generated strong data sctruct and factory class to load xls/xlsx data.
- [OpenApiProvider](#openapiprovider): Generate HTTP client from OpenApi / Swagger specification.

###### ExcelProvider

Generate strong data struct and class factory to load excel data from xls/xlsx template.  

**Attribute: [ExcelProvider](https://github.com/MaestriaNet/TypeProviders/src/Excel/ExcelProviderAttribute.cs)**

**Dependencies**
- [ClosedXML](https://github.com/ClosedXML/ClosedXML): v0.105.0+

**Dependencies install**

```bash
dotnet add package ClosedXML
```
**[Source code sample](https://github.com/MaestriaNet/TypeProviders/samples/ExcelSample/Program.cs#L12)**

**Use case sample**

```csharp
// The relative path is based at the source code file location.
// In this example the first page was used as none were explicitly entered.
[ExcelProvider(TemplatePath = @"../../resources/Excel.xlsx")]
public partial class MyExcelData
{
}

var data = MyExcelDataFactory.Load(filePath);
foreach (var item in data)
  // Access strong typing by "item.<field-name>"
```

**Use case sample two**

```csharp
// The relative path is based at the source code file location.
// Loadind data struct from second page
[ExcelProvider(TemplatePath = @"../../resources/Excel.xlsx", SheetName = "Plan2")]
public partial class MyExcelData
{
}

var data = MyExcelDataFactory.Load(filePath, "Plan2");
foreach (var item in data)
  // Access strong typing by "item.<field-name>"
```

**Generator engine:**

- `Nullable types`: To create a nullable property, seed excel template file with one row cell empty, and another not empty.
- `Decimal types`: To create decimal property, seed one row of cell with floating point value.

**Good practices:** Don't use big file by template, this file is used always you need recreated source code. Big file impact is slow build time.  

----

###### OpenApiProvider

Provider to generate source code HTTP client from OpenApi / Swagger specification.

It's planned used [NSwagStudio](https://github.com/RicoSuter/NSwag) engine with .NET 5 source generator.  
[This package](https://github.com/RicoSuter/NSwag/wiki/CSharpClientGenerator) allows automatized generation code.

...As soon as possible

----

###### Troubleshooting

**Optional configuration in VS Code:** To view the automatically generated codes it is necessary to indicate to write it to disk with the configuration in the .`csproj` file.  
On `CompilerGeneratedFilesOutputPath` property its configured with `/../generated/$(MSBuildProjectName)`. This folder is one level above of file project on this sample.  
This mode allow see generated files, but not works `go to navigation` feature of VS Code.

```xml
<!-- Enable source disk file write to correct IDE's works -->
<PropertyGroup>
    <CompilerGeneratedFilesOutputPath>$(MSBuildProjectDirectory)/../generated/$(MSBuildProjectName)</CompilerGeneratedFilesOutputPath>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>
```

**Optional configuration in VS Code:** To allow `go to navigation` feature you need write files at solution level.  
> Problem's: The source code generated will be used on next build, to solve problems of duplicated classes,
it's need removed generated files before build.  
On next build, if there was no change on yout source code used by generators, the files has no generated. You need force a rebuild with `dotnet build --no-incremental <args>` to regenerate files.

```xml
<!-- Enable source disk file write to correct IDE's works -->
<PropertyGroup>
    <CompilerGeneratedFilesOutputPath>$(MSBuildProjectDirectory)/generated/$(MSBuildProjectName)</CompilerGeneratedFilesOutputPath>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>

<!-- Remove files on build start to solve recreate bug message "alwaready exists" -->
<Target Name="ExcludeGenerated" BeforeTargets="AssignTargetPaths">
    <ItemGroup>
        <Generated Include="/generated/**/*.cs" />
        <Compile Remove="@(Generated)" />
    </ItemGroup>
    <Delete Files="@(Generated)" />
</Target>
```

---
###### 4 devs

Restart build server to validate clean source generator build. 

`dotnet build-server shutdown` 

---
[Sample of .csproj file](https://github.com/MaestriaNet/TypeProviders/samples/ExcelSample/ExcelSample.csproj#L4)

---

[![buy-me-a-coffee](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/buy-me-a-coffee.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)
[![smile.png](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/smile.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)

If my contributions helped you, please help me buy a coffee :D

[![donate](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/btn_donate.gif)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)


:::

### About
:::note

Generating strong typed code from Excel.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Maestria.TypeProviders**
```xml showLineNumbers {13}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="ClosedXML" Version="0.105.0" />
    <PackageReference Include="Maestria.Extensions" Version="3.7.2.0" />
    <PackageReference Include="Maestria.TypeProviders" Version="1.3.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <None Update="MyExcel.xlsx">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\Program.cs" label="Program.cs" >

  This is the use of **Maestria.TypeProviders** in *Program.cs*

```csharp showLineNumbers 
using DemoExcel;

Console.WriteLine("Hello, World!");
var persons = MyExcelPersonFactory.Load("MyExcel.xlsx").ToArray();

foreach (var person in persons)
{
    Console.WriteLine(person.ID + person.FullName());
    
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\MyExcelPerson.cs" label="MyExcelPerson.cs" >

  This is the use of **Maestria.TypeProviders** in *MyExcelPerson.cs*

```csharp showLineNumbers 
namespace DemoExcel;

public partial class MyExcelPerson
{
    public string FullName() => $"{FirstName} {LastName}";
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\Person.cs" label="Person.cs" >

  This is the use of **Maestria.TypeProviders** in *Person.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoExcel;

[ExcelProvider(TemplatePath = @"MyExcel.xlsx")]
public partial class MyExcelPerson
{
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\obj\GX\Maestria.TypeProviders\Maestria.TypeProviders.Excel.ExcelGenerator\DemoExcel.MyExcelPerson.g.cs" label="DemoExcel.MyExcelPerson.g.cs" >
```csharp showLineNumbers 
//----------------------
// <auto-generated>
//     Generated using Maestria.TypeProviders (https://github.com/MaestriaNet/TypeProviders)
// </auto-generated>
//----------------------

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using ClosedXML.Excel;
using Maestria.TypeProviders.Excel;

namespace DemoExcel
{
    public partial class MyExcelPerson
    {
        public int ID \{ get; set; }
        public string FirstName \{ get; set; }
        public string LastName \{ get; set; }
    }

    public static partial class MyExcelPersonFactory
    {
        public static IEnumerable<MyExcelPerson> Load(Stream input, int sheetPosition = 1)
        {
            using var workbook = new XLWorkbook(input);
            return Load(workbook, sheetPosition, null);
        }

        public static IEnumerable<MyExcelPerson> Load(Stream input, string sheetName)
        {
            using var workbook = new XLWorkbook(input);
            return Load(workbook, 0, sheetName);
        }

        public static IEnumerable<MyExcelPerson> Load(string filePath, int sheetPosition = 1)
        {
            using var workbook = ExcelExtensions.OpenWorkbook(filePath);
            return Load(workbook, sheetPosition, null);
        }

        public static IEnumerable<MyExcelPerson> Load(string filePath, string sheetName)
        {
            using var workbook = ExcelExtensions.OpenWorkbook(filePath);
            return Load(workbook, 0, sheetName);
        }

        public static IEnumerable<MyExcelPerson> Load(XLWorkbook workbook, int sheetPosition = 1, string sheetName = "")
        {
            var result = new List<MyExcelPerson>();
            var sheet = string.IsNullOrEmpty(sheetName) ? workbook.Worksheet(sheetPosition) : workbook.Worksheet(sheetName);
            var indexOfID = sheet.ColumnByName(@"ID");
            var indexOfFirstName = sheet.ColumnByName(@"FirstName");
            var indexOfLastName = sheet.ColumnByName(@"LastName");
            foreach (var row in sheet.Rows(2, sheet.RowUsedCount()))
            {
                var iDValue = row.Cell(indexOfID);
                var firstNameValue = row.Cell(indexOfFirstName);
                var lastNameValue = row.Cell(indexOfLastName);
                result.Add(new MyExcelPerson
                {
                    ID = iDValue.GetValue<int>(),
                    FirstName = firstNameValue.GetValue<string>(),
                    LastName = lastNameValue.GetValue<string>(),
                });
            }
            return result;
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\obj\GX\Maestria.TypeProviders\Maestria.TypeProviders.Excel.ExcelGenerator\ExcelExtensions.g.cs" label="ExcelExtensions.g.cs" >
```csharp showLineNumbers 
//----------------------
// <auto-generated>
//     Generated using Maestria.TypeProviders (https://github.com/MaestriaNet/TypeProviders)
// </auto-generated>
//----------------------

using System;
using System.IO;
using ClosedXML.Excel;

namespace Maestria.TypeProviders.Excel;

public static class ExcelExtensions
{
    /// <summary>
    /// Number of last user column
    /// </summary>
    /// <param name="sheet"></param>
    /// <returns></returns>
    public static int ColumnUsedCount(this IXLWorksheet sheet) => sheet.LastColumnUsed().ColumnNumber();

    /// <summary>
    /// Number of last used row
    /// </summary>
    /// <param name="sheet"></param>
    /// <returns></returns>
    public static int RowUsedCount(this IXLWorksheet sheet) => sheet.LastRowUsed().RowNumber();

    /// <summary>
    /// Retrieve column position by name in first row.
    /// </summary>
    /// <param name="sheet">Page to find column</param>
    /// <param name="columnName">Name to find column in first row</param>
    /// <returns>Position of column name or 0 when not found</returns>
    /// <exception cref="ArgumentNullException">When <paramref name="columnName"/> is null o whitespace</exception>
    public static int ColumnByName(this IXLWorksheet sheet, string columnName)
    {
        if (string.IsNullOrWhiteSpace(columnName)) throw new ExcelArgumentNullException(nameof(columnName), "Enter the column name to get position.");
        if (sheet.RowCount() <= 0)
            return 0;
        for (var i = 1; i <= sheet.ColumnUsedCount(); i++)
            if (sheet.Row(1).Cell(i).Value.ToString()?.ToUpper() == columnName.ToUpper()) return i;
        return 0;
    }

    /// <summary>
    /// Open file with treatment for file in use by another process
    /// </summary>
    /// <param name="filePath"></param>
    /// <returns></returns>
    public static FileStream OpenFile(string filePath)
    {
        try
        {
            return new FileStream(filePath, FileMode.Open, FileAccess.Read);
        }
        catch
        {
            // Need more access permissions to the file already in use by the operating system
            return new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        }
    }

    /// <summary>
    /// Open file with treatment for file in use by another process and return XLWorkbook
    /// </summary>
    /// <param name="filePath"></param>
    /// <returns></returns>
    public static XLWorkbook OpenWorkbook(string filePath)
    {
        using var fileStream = OpenFile(filePath);
        return new XLWorkbook(fileStream);
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\obj\GX\Maestria.TypeProviders\Maestria.TypeProviders.Excel.ExcelGenerator\ExcelGeneratorException.g.cs" label="ExcelGeneratorException.g.cs" >
```csharp showLineNumbers 
using System;

namespace Maestria.TypeProviders.Excel;

internal class ExcelGeneratorException : Exception
{
    public ExcelGeneratorException()
    {
    }

    public ExcelGeneratorException(string message) : base(message)
    {
    }

    public ExcelGeneratorException(string message, Exception innerException) : base(message, innerException)
    {
    }
}

internal class ExcelArgumentOutOfRangeException : ArgumentOutOfRangeException
{
    public ExcelArgumentOutOfRangeException()
    {
    }
    
    public ExcelArgumentOutOfRangeException(string paramName) : base(paramName)
    {
    }

    public ExcelArgumentOutOfRangeException(string message, Exception innerException) : base(message, innerException)
    {
    }

    public ExcelArgumentOutOfRangeException(string paramName, object actualValue, string message) : base(paramName, actualValue, message)
    {
    }

    public ExcelArgumentOutOfRangeException(string paramName, string message) : base(paramName, message)
    {
    }
}

internal class ExcelArgumentNullException : ArgumentNullException
{
    public ExcelArgumentNullException()
    {
    }

    public ExcelArgumentNullException(string paramName) : base(paramName)
    {
    }

    public ExcelArgumentNullException(string message, Exception innerException) : base(message, innerException)
    {
    }

    public ExcelArgumentNullException(string paramName, string message) : base(paramName, message)
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Maestria.TypeProviders\src\DemoExcel\obj\GX\Maestria.TypeProviders\Maestria.TypeProviders.Excel.ExcelGenerator\ExcelProviderAttribute.g.cs" label="ExcelProviderAttribute.g.cs" >
```csharp showLineNumbers 
//----------------------
// <auto-generated>
//     Generated using Maestria.TypeProviders (https://github.com/MaestriaNet/TypeProviders)
// </auto-generated>
//----------------------

using System;

/// <summary>
/// Map excel file and auto generate DTO and Factory classes
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class ExcelProviderAttribute : Attribute
{
    public const string TypeFullName = "ExcelProviderAttribute";

    /// <summary>
    ///     <para>
    ///         File path to load Excel template and generate source code.
    ///     </para>
    ///     <para>
    ///         It's supported relative path with format "..\..\folder\file.xlsx".
    ///         The relative path is based at the source code file location.
    ///     </para>
    /// </summary>
    public string TemplatePath \{ get; set; }

    /// <summary>
    /// Sheet position to build classes. Stated from 1.
    /// </summary>
    public int SheetPosition \{ get; set; \} = 1;

    /// <summary>
    /// Sheet name to build classes.
    /// </summary>
    public string SheetName \{ get; set; }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Maestria.TypeProviders ](/sources/Maestria.TypeProviders.zip)

:::


### Share Maestria.TypeProviders 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMaestria.TypeProviders&quote=Maestria.TypeProviders" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMaestria.TypeProviders&text=Maestria.TypeProviders:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMaestria.TypeProviders" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMaestria.TypeProviders&title=Maestria.TypeProviders" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMaestria.TypeProviders&title=Maestria.TypeProviders&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMaestria.TypeProviders" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Maestria.TypeProviders

<SameCategory />

