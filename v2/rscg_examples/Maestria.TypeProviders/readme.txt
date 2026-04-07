# Maestria.TypeProviders

[![NuGet Version](https://img.shields.io/nuget/v/Maestria.TypeProviders)](https://www.nuget.org/packages/Maestria.TypeProviders/)
[![NuGet Downloads](https://img.shields.io/nuget/dt/Maestria.TypeProviders)](https://www.nuget.org/packages/Maestria.TypeProviders/)
[![Apimundo](https://img.shields.io/badge/Maestria.TypeProviders%20API-Apimundo-728199.svg)](https://apimundo.com/organizations/nuget-org/nuget-feeds/public/packages/Maestria.TypeProviders/versions/latest?tab=types)

---

[![buy-me-a-coffee](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/buy-me-a-coffee.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)
[![smile.png](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/smile.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)

If my contributions helped you, please help me buy a coffee :D

[![donate](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/btn_donate.gif)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)

---

## What is Maestria.Type.Providers?

Source Generator pack to increase productivity and improve source code writing.

## How install and configure package?

First, install [Maestria.Type.Providers](https://www.nuget.org/packages/Maestria.TypeProviders/) from the dotnet cli command line:

```bash
dotnet add package Maestria.TypeProviders
dotnet add package ClosedXML
```

## Providers x Dependencies

This package does not include dependencies references when installed on your project, its only generate source code files.  
You need install thirds dependencies to compile your project according to the features used, bellow instructions of source generator providers:

- [ExcelProvider](#excelprovider): Generated strong data sctruct and factory class to load xls/xlsx data.
- [OpenApiProvider](#openapiprovider): Generate HTTP client from OpenApi / Swagger specification.

## ExcelProvider

Generate strong data struct and class factory to load excel data from xls/xlsx template.  

**Attribute: [ExcelProvider](src/Excel/ExcelProviderAttribute.cs)**

**Dependencies**
- [ClosedXML](https://github.com/ClosedXML/ClosedXML): v0.105.0+

**Dependencies install**

```bash
dotnet add package ClosedXML
```
**[Source code sample](samples/ExcelSample/Program.cs#L12)**

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

## OpenApiProvider

Provider to generate source code HTTP client from OpenApi / Swagger specification.

It's planned used [NSwagStudio](https://github.com/RicoSuter/NSwag) engine with .NET 5 source generator.  
[This package](https://github.com/RicoSuter/NSwag/wiki/CSharpClientGenerator) allows automatized generation code.

...As soon as possible

----

## Troubleshooting

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
## 4 devs

Restart build server to validate clean source generator build. 

`dotnet build-server shutdown` 

---
[Sample of .csproj file](samples/ExcelSample/ExcelSample.csproj#L4)

---

[![buy-me-a-coffee](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/buy-me-a-coffee.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)
[![smile.png](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/smile.png)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)

If my contributions helped you, please help me buy a coffee :D

[![donate](https://raw.githubusercontent.com/MaestriaNet/TypeProviders/master/resources/btn_donate.gif)](https://www.paypal.com/donate?hosted_button_id=8RSES6GAYH9BL)
