---
sidebar_position: 540
title: 54 - AutoDTO
description: Generate DTO classes from business/ef classes
slug: /AutoDTO
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# AutoDTO  by Ohorodnikov


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/AutoDTO?label=AutoDTO)](https://www.nuget.org/packages/AutoDTO/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Ohorodnikov/AutoDto?label=updated)](https://github.com/Ohorodnikov/AutoDto)
![GitHub Repo stars](https://img.shields.io/github/stars/Ohorodnikov/AutoDto?style=social)

## Details

### Info
:::info

Name: **AutoDTO**

Auto copy properties from bl mode to dto

Author: Ohorodnikov

NuGet: 
*https://www.nuget.org/packages/AutoDTO/*   


You can find more details at https://github.com/Ohorodnikov/AutoDto

Source : https://github.com/Ohorodnikov/AutoDto

:::

### Original Readme
:::note

# AutoDto

This tool allows to auto create DTO model from BL model in compile time.

It supports different strategies for relations, such as ReplaceToIdProperty, AddIdProperty and ReplaceToDtoProperty

## Setup

To use AutoDto, first install the [NuGet package](https://www.nuget.org/packages/AutoDto):
```shell
dotnet add package AutoDto
```

- Declare partial DTO type like `public partial SomeDto {}`
- Add attribute `[DtoFrom(typeof(SomeBlType))]`
- Build project

Full simple setup:

```csharp
[DtoFrom(typeof(SomeBlType))]
public partial SomeDto {}
```
 
AutoDto tool will generate partial SomeDto class with all public properties from SomeBlType.

## Relation Strategies

Relation strategy means what to do with relation property during generating DTO.

Supported strategies:
- None
- ReplaceToIdProperty
- AddIdProperty
- ReplaceToDtoProperty

### Usage

Set strategy in `[DtoFrom]` attribute after BL type.

```csharp
[DtoFrom(typeof(SomeBlType), RelationStrategy.AddIdProperty)]
public partial SomeDto {}
```

> If not specified - RelationStrategy.None will be used

### None
DTO will have property on BL type

### ReplaceToIdProperty
If BL relation property has `Id` property:
DTO will have only RelationPropName**Id** property of BL relation Id prop type.
If BlType has relation with array or enumerable - generated name will be RelationPropName**Ids**

> :exclamation: If no `Id` found in relation entity - result will be same as with None strategy

### AddIdProperty
DTO will have relation type property and `Id` property is found

### ReplaceToDtoProperty
Try find DTO, generated for RelationType and replace to RelationTypeDto.

> :exclamation: If many DTOs exists for RelationType - use `[MainDto]` attribute to mark which one should be used in `ReplaceToDtoProperty`


## Ignore properties

To avoid some properties from BlType, use `[DtoIgnore]` attribute:

```csharp
[DtoFrom(typeof(SomeBlType), RelationStrategy.AddIdProperty)]
[DtoIgnore(nameof(SomeBlType.PropName1), nameof(SomeBlType.PropName2))]
public partial SomeDto {}
```

## Options

Options can be set only in `.editorconfig`.

> :exclamation: All options are applied once, after first generator running (mostly after open project).

### Generator running

Generator is based on `IIncrementalGenerator`. Generator is running on every class declaration change event (on every change that affects class structure).
To avoid performance issues, it is used debouncer for collecting all events to regenerate classes. By default debounce time is 500 ms. After some time debouncer will collect execution statistic and rebalance timer.

Any user can turn off debouncer, set initial time ets by setting options in `.editorconfig`.

Supported options:
- auto_dto.debounce.enabled - true/false - use debounce or always run generation for every event
- auto_dto.debounce.interval - int - in milliseconds - set initial debounce interval
- auto_dto.debounce.auto_rebalance_enabled - true/false - allow auto timer change or not.

Default values:
- auto_dto.debounce.enabled = true
- auto_dto.debounce.interval = 500
- auto_dto.debounce.auto_rebalance_enabled = true

> :warning: Debouncer can be turned off and switched to every request generating.

### Logging
Logger is disabled by default. If any issues with generator - enable logger, set folder path for logs and set logging level.

Supported options:
- auto_dto.logger.folder_path - string - path to folder where logs will be generated
- auto_dto.logger.enabled - true/false
- auto_dto.logger.log_level - Serilog log levels. See [LogEventLevel](https://github.com/serilog/serilog/blob/main/src/Serilog/Events/LogEventLevel.cs)

Default values:
- auto_dto.logger.folder_path = Try get value from `build_property.projectdir`. If cannot - `Path.Combine(Environment.CurrentDirectory, "Logs")` is using
- auto_dto.logger.enabled = false
- auto_dto.logger.log_level = Warning







:::

### About
:::note

Generate DTO classes from business/ef classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AutoDTO**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoDto" Version="2.1.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\AutoDTO\src\AutoDTODemo\Program.cs" label="Program.cs" >

  This is the use of **AutoDTO** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using AutoDTODemo;

var d = new Department();
d.Name = "IT";
d.ID = 1;
d.Employees=new Employee[] { new Employee() };

var dto= new DepartmentDTO();
//it will be beneficial if it will have also a constructor
//for transfer properties
dto.Name = d.Name;
dto.ID = d.ID;
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\AutoDTO\src\AutoDTODemo\Department.cs" label="Department.cs" >

  This is the use of **AutoDTO** in *Department.cs*

```csharp showLineNumbers 
namespace AutoDTODemo;
public class Department
{
    public int ID { get; set; }
    public string? Name { get; set; }
    public Employee[]? Employees { get; set; }
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\AutoDTO\src\AutoDTODemo\DepartmentDTO.cs" label="DepartmentDTO.cs" >

  This is the use of **AutoDTO** in *DepartmentDTO.cs*

```csharp showLineNumbers 
using AutoDto.Setup;

namespace AutoDTODemo;

[DtoFrom(typeof(Department))]
[DtoIgnore(nameof(Department.Employees))]
public partial class DepartmentDTO { 
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\AutoDTO\src\AutoDTODemo\obj\GX\AutoDto.SourceGen\AutoDto.SourceGen.DtoFromBlGenerator\DepartmentDTO.g.cs" label="DepartmentDTO.g.cs" >


```csharp showLineNumbers 
namespace AutoDTODemo;

public partial class DepartmentDTO
{
public System.Int32 ID { get; set; }
public System.String Name { get; set; }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project AutoDTO ](/sources/AutoDTO.zip)

:::


### Share AutoDTO 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDTO&quote=AutoDTO" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDTO&text=AutoDTO:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDTO" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDTO&title=AutoDTO" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDTO&title=AutoDTO&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoDTO" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoDTO
