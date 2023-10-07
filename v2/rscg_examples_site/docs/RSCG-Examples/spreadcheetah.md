---
sidebar_position: 430
title: 43 - spreadcheetah
description: generating Excel from objects
slug: /spreadcheetah
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# spreadcheetah  by Sveinung


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/spreadcheetah?label=spreadcheetah)](https://www.nuget.org/packages/spreadcheetah/)
[![GitHub last commit](https://img.shields.io/github/last-commit/sveinungf/spreadcheetah?label=updated)](https://github.com/sveinungf/spreadcheetah)
![GitHub Repo stars](https://img.shields.io/github/stars/sveinungf/spreadcheetah?style=social)

## Details

### Info
:::info

Name: **spreadcheetah**

SpreadCheetah is a high-performance .NET library for generating spreadsheet (Microsoft Excel XLSX) files.

Author: Sveinung

NuGet: 
*https://www.nuget.org/packages/spreadcheetah/*   


You can find more details at https://github.com/sveinungf/spreadcheetah

Source : https://github.com/sveinungf/spreadcheetah

:::

### Original Readme
:::note

# SpreadCheetah

[![Nuget](https://img.shields.io/nuget/v/SpreadCheetah)](https://www.nuget.org/packages/SpreadCheetah)

SpreadCheetah is a high-performance .NET library for generating spreadsheet (Microsoft Excel XLSX) files.

## Features
- Performance (see benchmarks below)
- Low memory allocation (see benchmarks below)
- Async APIs
- No dependency to Microsoft Excel
- Targeting .NET Standard 2.0 (for .NET Framework 4.6.1 and later)
- Free and open source!

SpreadCheetah is designed to create spreadsheet files in a forward-only manner.
That means worksheets from left to right, rows from top to bottom, and row cells from left to right.
This allows for creating spreadsheet files in a streaming manner, while also keeping a low memory footprint.

Most basic spreadsheet functionality is supported, such as cells with different data types, basic styling, and formulas. More advanced functionality is planned for future releases.

## How to install
SpreadCheetah is available as a [NuGet package](https://www.nuget.org/packages/SpreadCheetah). The NuGet package targets .NET Standard 2.0 as well as newer versions of .NET. The .NET Standard 2.0 version is just intended for backwards compatibility (.NET Framework and earlier versions of .NET Core). More optimizations are enabled when targeting newer versions of .NET.

## Basic usage
```cs
using (var spreadsheet = await Spreadsheet.CreateNewAsync(stream))
{
    // A spreadsheet must contain at least one worksheet.
    await spreadsheet.StartWorksheetAsync("Sheet 1");

    // Cells are inserted row by row.
    var row = new List<Cell>();
    row.Add(new Cell("Answer to the ultimate question:"));
    row.Add(new Cell(42));

    // Rows are inserted from top to bottom.
    await spreadsheet.AddRowAsync(row);

    // Remember to call Finish before disposing.
    // This is important to properly finalize the XLSX file.
    await spreadsheet.FinishAsync();
}
```

### Other examples
- [Writing to a file](https://github.com/sveinungf/spreadcheetah-samples/blob/main/SpreadCheetahSamples/WriteToFile.cs)
- [Styling basics](https://github.com/sveinungf/spreadcheetah-samples/blob/main/SpreadCheetahSamples/StylingBasics.cs)
- [Formula basics](https://github.com/sveinungf/spreadcheetah-samples/blob/main/SpreadCheetahSamples/FormulaBasics.cs)
- [DateTime and formatting](https://github.com/sveinungf/spreadcheetah-samples/blob/main/SpreadCheetahSamples/DateTimeAndFormatting.cs)
- [Data Validations](https://github.com/sveinungf/spreadcheetah-samples/blob/main/SpreadCheetahSamples/DataValidations.cs)
- [Performance tips](https://github.com/sveinungf/spreadcheetah-samples/blob/main/SpreadCheetahSamples/PerformanceTips.cs)

## Using the Source Generator
[Source Generators](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators) is a newly released feature in the C# compiler. SpreadCheetah includes a source generator that makes it easier to create rows from objects. It is used in a similar way to the [`System.Text.Json` source generator](https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-source-generator/):
```cs
namespace MyNamespace;

// A plain old C# class which we want to add as a row in a worksheet.
// The source generator will pick the properties with public getters.
// The order of the properties will decide the order of the cells.
public class MyObject
{
    public string Question { get; set; }
    public int Answer { get; set; }
}
```

The source generator will be instructed to generate code by defining a partial class like this:
```cs
using SpreadCheetah.SourceGeneration;

namespace MyNamespace;

[WorksheetRow(typeof(MyObject))]
public partial class MyObjectRowContext : WorksheetRowContext
{
}
```

During build, the type will be analyzed and an implementation of the context class will be created. We can then create a row from an object by calling `AddAsRowAsync` with the object and the context type as parameters:
```cs
await using var spreadsheet = await Spreadsheet.CreateNewAsync(stream);
await spreadsheet.StartWorksheetAsync("Sheet 1");

var myObj = new MyObject { Question = "How many Rings of Power were there?", Answer = 20 };

await spreadsheet.AddAsRowAsync(myObj, MyObjectRowContext.Default.MyObject);

await spreadsheet.FinishAsync();
```

Here is a peek at part of the code that was generated for this example:
```cs
// <auto-generated />
private static async ValueTask AddAsRowInternalAsync(Spreadsheet spreadsheet, MyObject obj, CancellationToken token)
{
    var cells = ArrayPool<DataCell>.Shared.Rent(2);
    try
    {
        cells[0] = new DataCell(obj.Question);
        cells[1] = new DataCell(obj.Answer);
        await spreadsheet.AddRowAsync(cells.AsMemory(0, 2), token).ConfigureAwait(false);
    }
    finally
    {
        ArrayPool<DataCell>.Shared.Return(cells, true);
    }
}
```

The source generator can generate rows from classes, records, and structs. It can be used in all supported .NET versions, including .NET Framework, however the C# version must be 8.0 or greater.


## Benchmarks
The benchmark results here have been collected using [Benchmark.NET](https://github.com/dotnet/benchmarkdotnet) with the following system configuration:

``` ini
BenchmarkDotNet=v0.13.2, OS=Windows 10 (10.0.19043.2251/21H1/May2021Update)
Intel Core i5-8600K CPU 3.60GHz (Coffee Lake), 1 CPU, 6 logical and 6 physical cores
.NET SDK=7.0.100
  [Host]             : .NET 7.0.0 (7.0.22.51805), X64 RyuJIT AVX2
  .NET 6.0           : .NET 6.0.11 (6.0.1122.52304), X64 RyuJIT AVX2
  .NET 7.0           : .NET 7.0.0 (7.0.22.51805), X64 RyuJIT AVX2
  .NET Framework 4.8 : .NET Framework 4.8 (4.8.4515.0), X64 RyuJIT VectorSize=256

InvocationCount=1  UnrollFactor=1
```

The code executed in the benchmark creates a worksheet of 20 000 rows and 10 columns filled with string values. The same use case has been implemented in other spreadsheet libraries for comparison.
Some of these libraries have multiple ways of achieving the same result, but to make this a fair comparison the idea is to use the most efficient approach for each library. The code is available [here](https://github.com/sveinungf/spreadcheetah/blob/main/SpreadCheetah.Benchmark/Benchmarks/StringCells.cs).


### .NET Framework 4.8

|                    Library |         Mean |        Error |       StdDev |     Allocated |
|----------------------------|-------------:|-------------:|-------------:|--------------:|
|          **SpreadCheetah** | **68.67 ms** | **0.283 ms** | **0.251 ms** | **152.23 KB** |
|    Open XML (SAX approach) |    438.22 ms |     1.161 ms |     1.086 ms |  43 317.24 KB |
|                  EPPlus v4 |    609.98 ms |     6.626 ms |     5.874 ms | 286 142.58 KB |
|    Open XML (DOM approach) |  1,098.52 ms |     9.419 ms |     8.811 ms | 161 123.16 KB |
|                  ClosedXML |  1,618.57 ms |     7.088 ms |     6.630 ms | 565 074.91 KB |


### .NET 6

|                    Library |         Mean |        Error |       StdDev |     Allocated |
|----------------------------|-------------:|-------------:|-------------:|--------------:|
|          **SpreadCheetah** | **28.53 ms** | **0.079 ms** | **0.070 ms** |   **6.48 KB** |
|    Open XML (SAX approach) |    250.65 ms |     0.541 ms |     0.480 ms |  66 049.91 KB |
|                  EPPlus v4 |    405.90 ms |     1.782 ms |     1.579 ms | 195 790.25 KB |
|    Open XML (DOM approach) |    775.74 ms |    14.404 ms |    14.147 ms | 182 926.06 KB |
|                  ClosedXML |  1,262.92 ms |    19.825 ms |    18.544 ms | 524 913.50 KB |


### .NET 7

|                    Library |         Mean |        Error |       StdDev |     Allocated |
|----------------------------|-------------:|-------------:|-------------:|--------------:|
|          **SpreadCheetah** | **25.14 ms** | **0.148 ms** | **0.138 ms** |   **6.48 KB** |
|    Open XML (SAX approach) |    239.72 ms |     0.231 ms |     0.216 ms |  66 046.48 KB |
|                  EPPlus v4 |    406.69 ms |     1.852 ms |     1.642 ms | 195 792.41 KB |
|    Open XML (DOM approach) |    831.68 ms |    10.446 ms |     9.771 ms | 182 926.04 KB |
|                  ClosedXML |  1,171.07 ms |     8.106 ms |     7.186 ms | 524 846.85 KB |


:::

### About
:::note

generating Excel from objects


does not work with DateTime


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **spreadcheetah**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="SpreadCheetah" Version="1.10.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\spreadcheetah\src\spreadcheetahDemo\Program.cs" label="Program.cs" >

  This is the use of **spreadcheetah** in *Program.cs*

```csharp showLineNumbers 
using SpreadCheetah;
using spreadcheetahDemo;

using var stream = File.Create("a.xlsx");
using var spreadsheet = await Spreadsheet.CreateNewAsync(stream);

// A spreadsheet must contain at least one worksheet.
await spreadsheet.StartWorksheetAsync("Sheet 1");

// Cells are inserted row by row.
var row = new List<Cell>();
row.Add(new Cell("Answer to the ultimate question:"));
row.Add(new Cell(42));

// Rows are inserted from top to bottom.
await spreadsheet.AddRowAsync(row);
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
await spreadsheet.AddAsRowAsync(p, PersonRowContext.Default.Person);

// Remember to call Finish before disposing.
// This is important to properly finalize the XLSX file.
await spreadsheet.FinishAsync();
Console.WriteLine("see a.xlsx");

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\spreadcheetah\src\spreadcheetahDemo\Person.cs" label="Person.cs" >

  This is the use of **spreadcheetah** in *Person.cs*

```csharp showLineNumbers 
using SpreadCheetah.SourceGeneration;

namespace spreadcheetahDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

[WorksheetRow(typeof(Person))]
public partial class PersonRowContext : WorksheetRowContext
{
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\spreadcheetah\src\spreadcheetahDemo\obj\GX\SpreadCheetah.SourceGenerator\SpreadCheetah.SourceGenerators.WorksheetRowGenerator\spreadcheetahDemo.PersonRowContext.g.cs" label="spreadcheetahDemo.PersonRowContext.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using SpreadCheetah;
using SpreadCheetah.SourceGeneration;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace spreadcheetahDemo
{
    public partial class PersonRowContext
    {
        private static PersonRowContext? _default;
        public static PersonRowContext Default => _default ??= new PersonRowContext();

        public PersonRowContext()
        {
        }

        private WorksheetRowTypeInfo<spreadcheetahDemo.Person>? _Person;
        public WorksheetRowTypeInfo<spreadcheetahDemo.Person> Person => _Person ??= WorksheetRowMetadataServices.CreateObjectInfo<spreadcheetahDemo.Person>(AddAsRowAsync, AddRangeAsRowsAsync);

        private static ValueTask AddAsRowAsync(SpreadCheetah.Spreadsheet spreadsheet, spreadcheetahDemo.Person? obj, CancellationToken token)
        {
            if (spreadsheet is null)
                throw new ArgumentNullException(nameof(spreadsheet));
            if (obj is null)
                return spreadsheet.AddRowAsync(ReadOnlyMemory<DataCell>.Empty, token);
            return AddAsRowInternalAsync(spreadsheet, obj, token);
        }

        private static ValueTask AddRangeAsRowsAsync(SpreadCheetah.Spreadsheet spreadsheet, IEnumerable<spreadcheetahDemo.Person?> objs, CancellationToken token)
        {
            if (spreadsheet is null)
                throw new ArgumentNullException(nameof(spreadsheet));
            if (objs is null)
                throw new ArgumentNullException(nameof(objs));
            return AddRangeAsRowsInternalAsync(spreadsheet, objs, token);
        }

        private static async ValueTask AddAsRowInternalAsync(SpreadCheetah.Spreadsheet spreadsheet, spreadcheetahDemo.Person obj, CancellationToken token)
        {
            var cells = ArrayPool<DataCell>.Shared.Rent(2);
            try
            {
                await AddCellsAsRowAsync(spreadsheet, obj, cells, token).ConfigureAwait(false);
            }
            finally
            {
                ArrayPool<DataCell>.Shared.Return(cells, true);
            }
        }

        private static async ValueTask AddRangeAsRowsInternalAsync(SpreadCheetah.Spreadsheet spreadsheet, IEnumerable<spreadcheetahDemo.Person?> objs, CancellationToken token)
        {
            var cells = ArrayPool<DataCell>.Shared.Rent(2);
            try
            {
                await AddEnumerableAsRowsAsync(spreadsheet, objs, cells, token).ConfigureAwait(false);
            }
            finally
            {
                ArrayPool<DataCell>.Shared.Return(cells, true);
            }
        }

        private static async ValueTask AddEnumerableAsRowsAsync(SpreadCheetah.Spreadsheet spreadsheet, IEnumerable<spreadcheetahDemo.Person?> objs, DataCell[] cells, CancellationToken token)
        {
            foreach (var obj in objs)
            {
                await AddCellsAsRowAsync(spreadsheet, obj, cells, token).ConfigureAwait(false);
            }
        }

        private static ValueTask AddCellsAsRowAsync(SpreadCheetah.Spreadsheet spreadsheet, spreadcheetahDemo.Person? obj, DataCell[] cells, CancellationToken token)
        {
            if (obj is null)
                return spreadsheet.AddRowAsync(ReadOnlyMemory<DataCell>.Empty, token);

            cells[0] = new DataCell(obj.FirstName);
            cells[1] = new DataCell(obj.LastName);
            return spreadsheet.AddRowAsync(cells.AsMemory(0, 2), token);
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project spreadcheetah ](/sources/spreadcheetah.zip)

:::


### Share spreadcheetah 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fspreadcheetah&quote=spreadcheetah" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fspreadcheetah&text=spreadcheetah:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fspreadcheetah" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fspreadcheetah&title=spreadcheetah" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fspreadcheetah&title=spreadcheetah&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fspreadcheetah" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/spreadcheetah

## In the same category (Templating)


### [Gobie](/docs/Gobie)


### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


### [MorrisMoxy](/docs/MorrisMoxy)


### [RazorBlade](/docs/RazorBlade)


### [RSCG_Templating](/docs/RSCG_Templating)

