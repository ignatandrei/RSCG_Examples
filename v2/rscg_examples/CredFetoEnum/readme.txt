# credfeto-enum-source-generation

C# Source generator for enums

## Using

Add a reference to the ``Credfeto.Enumeration.Source.Generation`` package in each project you need the code generation to run.

```xml
<ItemGroup>
  <PackageReference 
            Include="Credfeto.Enumeration.Source.Generation" 
            Version="1.0.0.11" 
            PrivateAssets="All" ExcludeAssets="runtime" />
</ItemGroup>
```

For each enum in the project, generates a class with the following extension methods:

* public static string GetName(this MyEnum value)
* public static string GetDescription(this MyEnum value)

Given an the example enum defined below:

```csharp
public enum ExampleEnumValues
{
    ZERO = 0,

    [Description("One \"1\"")]
    ONE = 1,

    SAME_AS_ONE = ONE,
}
```

To get the name and value of the enum values. In release mode this can be practically instant.

```csharp
ExampleEnumValues value = ExampleEnumValues.ONE;
 string name = value.GetName(); // ONE
 string description = value.GetDescription(); // One "1"
 bool isDefined = value.IsDefine(); // true
 bool isNotDefined = ((ExampleEnumValues)42).IsDefine(); // false
```

## Enums in other assemblies

Reference the following package in the project that contains the enum extensions class to generate.

```xml
<ItemGroup>
    <PackageReference
            Include="Credfeto.Enumeration.Source.Generation.Attributes"
            Version="0.0.2.3"
            PrivateAssets="All" ExcludeAssets="runtime" />
</ItemGroup>
```

Add an ``EnumText`` attribute to a partial static extension class for each enum you want to expose.

```csharp
[EnumText(typeof(System.Net.HttpStatusCode))]
[EnumText(typeof(ThirdParty.ExampleEnum))]
public static partial class EnumExtensions
{
}
```

Will generate the same extension methods, but for the types nominated in the attributes.

## Benchmarks

Benchmarks are in the Benchmark.net project ``Credfeto.Enumeration.Source.Generation.Benchmarks``, with a summary of a
run below.

|                         Method |          Mean |      Error |     StdDev |        Median | Allocated |
|------------------------------- |--------------:|-----------:|-----------:|--------------:|----------:|
|                GetNameToString |    25.5162 ns |  0.4146 ns |  0.3675 ns |    25.5322 ns |      24 B |
|              GetNameReflection |    37.8875 ns |  0.3971 ns |  0.3520 ns |    37.8542 ns |      24 B |
|        GetNameCachedReflection |    21.6571 ns |  0.4514 ns |  0.3770 ns |    21.6841 ns |      24 B |
|           GetNameCodeGenerated |     0.0009 ns |  0.0039 ns |  0.0036 ns |     0.0000 ns |         - |
|       GetDescriptionReflection | 1,380.4979 ns | 15.1089 ns | 13.3937 ns | 1,382.9476 ns |     264 B |
| GetDescriptionCachedReflection |    22.8844 ns |  0.3856 ns |  0.3607 ns |    22.8364 ns |      24 B |
|    GetDescriptionCodeGenerated |     0.0035 ns |  0.0057 ns |  0.0053 ns |     0.0000 ns |         - |
|        IsDefinedCodeReflection |    48.7961 ns |  0.9675 ns |  1.0352 ns |    48.5573 ns |      24 B |
|  IsDefinedCodeReflectionCached |    21.4452 ns |  0.3169 ns |  0.2965 ns |    21.3938 ns |      24 B |
|         IsDefinedCodeGenerated |     0.0012 ns |  0.0041 ns |  0.0037 ns |     0.0000 ns |         - |


```
// * Warnings *
ZeroMeasurement
  EnumBench.GetNameCodeGenerated: Default        -> The method duration is indistinguishable from the empty method duration
  EnumBench.GetDescriptionCodeGenerated: Default -> The method duration is indistinguishable from the empty method duration
  EnumBench.IsDefinedCodeGenerated: Default      -> The method duration is indistinguishable from the empty method duration

// * Legends *
  Mean      : Arithmetic mean of all measurements
  Error     : Half of 99.9% confidence interval
  StdDev    : Standard deviation of all measurements
  Median    : Value separating the higher half of all measurements (50th percentile)
  Allocated : Allocated memory per single operation (managed only, inclusive, 1KB = 1024B)
  1 ns      : 1 Nanosecond (0.000000001 sec)
```

## Viewing Compiler Generated files

Add the following to the csproj file:

```xml
  <PropertyGroup>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
  </PropertyGroup>
  <ItemGroup>
    <!-- Don't include the output from a previous source generator execution into future runs; the */** trick here ensures that there's
    at least one subdirectory, which is our key that it's coming from a source generator as opposed to something that is coming from
    some other tool. -->
    <Compile Remove="$(CompilerGeneratedFilesOutputPath)/*/**/*.cs" />
  </ItemGroup>
```

## Build Status

| Branch  | Status                                                                                                                                                                                                                                                              |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| main    | [![Build: Pre-Release](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-pre-release.yml/badge.svg)](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-pre-release.yml) |
| release | [![Build: Release](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-release.yml/badge.svg)](https://github.com/credfeto/credfeto-enum-source-generation/actions/workflows/build-and-publish-release.yml)             |

## Changelog

View [changelog](CHANGELOG.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->