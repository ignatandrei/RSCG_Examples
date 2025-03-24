---
sidebar_position: 1890
title: 189 - MemberAccessor
description: Generate getter and setter for class members.
slug: /MemberAccessor
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# MemberAccessor  by Yamaokuno


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/BunnyTail.MemberAccessor?label=BunnyTail.MemberAccessor)](https://www.nuget.org/packages/BunnyTail.MemberAccessor/)
[![GitHub last commit](https://img.shields.io/github/last-commit/usausa/member-accessor-generator?label=updated)](https://github.com/usausa/member-accessor-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/usausa/member-accessor-generator?style=social)

## Details

### Info
:::info

Name: **MemberAccessor**

Member accessor code generator.

Author: Yamaokuno

NuGet: 
*https://www.nuget.org/packages/BunnyTail.MemberAccessor/*   


You can find more details at https://github.com/usausa/member-accessor-generator

Source : https://github.com/usausa/member-accessor-generator

:::

### Original Readme
:::note

# BunnyTail.MemberAccessor

[![NuGet](https://img.shields.io/nuget/v/BunnyTail.MemberAccessor.svg)](https://www.nuget.org/packages/BunnyTail.MemberAccessor)

## Reference

Add reference to BunnyTail.MemberAccessor to csproj.

```xml
  <ItemGroup>
    <PackageReference Include="BunnyTail.MemberAccessor" Version="1.2.0" />
  </ItemGroup>
```

## MemberAccessor

### Source

```csharp
using BunnyTail.MemberAccessor;

[GenerateAccessor]
public partial class Data
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;
}
```

```csharp
using BunnyTail.MemberAccessor;

var accessorFactory = AccessorRegistry.FindFactory<Data>();
var getter = accessorFactory.CreateGetter<int>(nameof(Data.Id));
var setter = accessorFactory.CreateSetter<int>(nameof(Data.Id));

var data = new Data();
setter(data, 123);
var id = getter(data);
```

## Benchmark

```
BenchmarkDotNet v0.14.0, Windows 11 (10.0.26100.2894)
AMD Ryzen 9 5900X, 1 CPU, 24 logical and 12 physical cores
.NET SDK 9.0.102
  [Host]     : .NET 9.0.1 (9.0.124.61010), X64 RyuJIT AVX2
  DefaultJob : .NET 9.0.1 (9.0.124.61010), X64 RyuJIT AVX2
```
| Method           | Mean      | Error     | StdDev    | Min       | Max       | P90       | Code Size | Allocated |
|----------------- |----------:|----------:|----------:|----------:|----------:|----------:|----------:|----------:|
| DirectGetter     | 0.2180 ns | 0.0033 ns | 0.0027 ns | 0.2144 ns | 0.2231 ns | 0.2222 ns |      10 B |         - |
| ExpressionGetter | 1.0868 ns | 0.0143 ns | 0.0134 ns | 1.0737 ns | 1.1127 ns | 1.1095 ns |      54 B |         - |
| GeneratorGetter  | 0.2244 ns | 0.0020 ns | 0.0019 ns | 0.2219 ns | 0.2283 ns | 0.2269 ns |      72 B |         - |
| DirectSetter     | 0.2155 ns | 0.0009 ns | 0.0008 ns | 0.2138 ns | 0.2167 ns | 0.2165 ns |      28 B |         - |
| ExpressionSetter | 1.0956 ns | 0.0219 ns | 0.0225 ns | 1.0716 ns | 1.1393 ns | 1.1260 ns |      57 B |         - |
| GeneratorSetter  | 0.4306 ns | 0.0014 ns | 0.0012 ns | 0.4284 ns | 0.4328 ns | 0.4323 ns |      80 B |         - |


:::

### About
:::note

Generate getter and setter for class members.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MemberAccessor**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="BunnyTail.MemberAccessor" Version="1.2.0" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MemberAccessor\src\DemoMember\Program.cs" label="Program.cs" >

  This is the use of **MemberAccessor** in *Program.cs*

```csharp showLineNumbers 
using BunnyTail.MemberAccessor;
using DemoMember;

var accessorFactory = AccessorRegistry.FindFactory<Person>();
ArgumentNullException.ThrowIfNull(accessorFactory);
var getter = accessorFactory.CreateGetter<string>(nameof(Person.FirstName));
var setter = accessorFactory.CreateSetter<string>(nameof(Person.FirstName));
ArgumentNullException.ThrowIfNull(getter);
ArgumentNullException.ThrowIfNull(setter);
var p= new Person();
setter(p, "andrei");
Console.WriteLine(getter(p));
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MemberAccessor\src\DemoMember\Person.cs" label="Person.cs" >

  This is the use of **MemberAccessor** in *Person.cs*

```csharp showLineNumbers 
using BunnyTail.MemberAccessor;

namespace DemoMember;
[GenerateAccessor]
internal class Person
{
    public string FirstName { get; set; }=string.Empty;
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MemberAccessor\src\DemoMember\obj\GX\BunnyTail.MemberAccessor.Generator\BunnyTail.MemberAccessor.Generator.TemplateGenerator\AccessorInitializer.g.cs" label="AccessorInitializer.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

internal static class AccessorFactoryInitializer
{
    [global::System.Runtime.CompilerServices.ModuleInitializer]
    public static void Initialize()
    {
        global::BunnyTail.MemberAccessor.AccessorRegistry.RegisterFactory(typeof(global::DemoMember.Person), typeof(global::DemoMember.Person_AccessorFactory));
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MemberAccessor\src\DemoMember\obj\GX\BunnyTail.MemberAccessor.Generator\BunnyTail.MemberAccessor.Generator.TemplateGenerator\DemoMember_Person_Accessor.g.cs" label="DemoMember_Person_Accessor.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace DemoMember;

internal sealed class Person_AccessorFactory : global::BunnyTail.MemberAccessor.IAccessorFactory<global::DemoMember.Person>
{
    private static readonly global::System.Func<object, object?> ObjectFirstNameGetter = static x => ((global::DemoMember.Person)x).FirstName!;

    private static readonly global::System.Action<object, object?> ObjectFirstNameSetter = static (x, v) => ((global::DemoMember.Person)x).FirstName = (string)v!;

    private static readonly global::System.Func<global::DemoMember.Person, string> TypedFirstNameGetter = static x => x.FirstName;

    private static readonly global::System.Action<global::DemoMember.Person, string> TypedFirstNameSetter = static (x, v) => x.FirstName = v;

    public global::System.Func<object, object?>? CreateGetter(string name)
    {
        if (name == "FirstName") return ObjectFirstNameGetter;
        return null;
    }

    public global::System.Action<object, object?>? CreateSetter(string name)
    {
        if (name == "FirstName") return ObjectFirstNameSetter;
        return null;
    }

    public global::System.Func<global::DemoMember.Person, TProperty>? CreateGetter<TProperty>(string name)
    {
        if (name == "FirstName") return (global::System.Func<global::DemoMember.Person, TProperty>)(object)TypedFirstNameGetter;
        return null;
    }

    public global::System.Action<global::DemoMember.Person, TProperty>? CreateSetter<TProperty>(string name)
    {
        if (name == "FirstName") return (global::System.Action<global::DemoMember.Person, TProperty>)(object)TypedFirstNameSetter;
        return null;
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project MemberAccessor ](/sources/MemberAccessor.zip)

:::


### Share MemberAccessor 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMemberAccessor&quote=MemberAccessor" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMemberAccessor&text=MemberAccessor:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMemberAccessor" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMemberAccessor&title=MemberAccessor" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMemberAccessor&title=MemberAccessor&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMemberAccessor" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MemberAccessor

### In the same category (EnhancementClass) - 26 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [DudNet](/docs/DudNet)


#### [Enhanced.GetTypes](/docs/Enhanced.GetTypes)


#### [FastGenericNew](/docs/FastGenericNew)


#### [HsuSgSync](/docs/HsuSgSync)


#### [Immutype](/docs/Immutype)


#### [Ling.Audit](/docs/Ling.Audit)


#### [Lombok.NET](/docs/Lombok.NET)


#### [M31.FluentAPI](/docs/M31.FluentAPI)


#### [MemoryPack](/docs/MemoryPack)


#### [Meziantou.Polyfill](/docs/Meziantou.Polyfill)


#### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


#### [Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator](/docs/Microsoft.Extensions.Options.Generators.OptionsValidatorGenerator)


#### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


#### [OptionToStringGenerator](/docs/OptionToStringGenerator)


#### [QueryStringGenerator](/docs/QueryStringGenerator)


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)


#### [ThisClass](/docs/ThisClass)

