---
sidebar_position: 2850
title: 285 - PropertyResolvers
description: Generating code for switch for property in C#
slug: /PropertyResolvers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementProject.mdx';

# PropertyResolvers  by Tom Biddulph


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/PropertyResolvers?label=PropertyResolvers)](https://www.nuget.org/packages/PropertyResolvers/)
[![GitHub last commit](https://img.shields.io/github/last-commit/tombiddulph/PropertyResolvers?label=updated)](https://github.com/tombiddulph/PropertyResolvers)
![GitHub Repo stars](https://img.shields.io/github/stars/tombiddulph/PropertyResolvers?style=social)

## Details

### Info
:::info

Name: **PropertyResolvers**

A source generator that creates property resolver classes for types with
            matching properties. Use assembly-level attributes to generate resolvers that can
            retrieve property values from objects at runtime.

Author: Tom Biddulph

NuGet: 
*https://www.nuget.org/packages/PropertyResolvers/*   


You can find more details at https://github.com/tombiddulph/PropertyResolvers

Source: https://github.com/tombiddulph/PropertyResolvers

:::

### Author
:::note
Tom Biddulph 
![Alt text](https://github.com/tombiddulph.png)
:::

## Original Readme
:::note

# PropertyResolvers

A C# source generator that creates type-safe property resolver classes. Instead of using reflection at runtime to extract property values from objects, PropertyResolvers generates compile-time switch expressions that efficiently resolve property values across multiple types.

## Installation

```bash
dotnet add package PropertyResolvers
```

## Quick Start

1. Add assembly-level attributes to specify which properties you want resolvers for:

```csharp
using PropertyResolvers.Attributes;

[assembly: GeneratePropertyResolver("AccountId")]
[assembly: GeneratePropertyResolver("TenantId")]
```

2. The generator automatically finds all types with matching properties and generates resolver classes:

```csharp
// Generated code (AccountIdResolver.g.cs)
public static class AccountIdResolver
{
    public static string? GetAccountId(object? obj) => obj switch
    {
        global::MyApp.Order x => x.AccountId.ToString(),
        global::MyApp.Customer x => x.AccountId.ToString(),
        global::MyApp.Invoice x => x.AccountId.ToString(),
        _ => null
    };
}
```

3. Use the generated resolvers in your code:

```csharp
var order = new Order \{ AccountId = "ACC-123" };
var customer = new Customer \{ AccountId = "ACC-456" };
var product = new Product \{ Name = "Widget" }; // No AccountId property

var id1 = AccountIdResolver.GetAccountId(order);    // "ACC-123"
var id2 = AccountIdResolver.GetAccountId(customer); // "ACC-456"
var id3 = AccountIdResolver.GetAccountId(product);  // null
```

## Use Cases

- **Multi-tenant applications**: Extract `TenantId` from any entity without reflection
- **Audit logging**: Consistently retrieve identifier properties across different entity types
- **Event sourcing**: Extract aggregate IDs from various event types
- **API responses**: Normalize property access across different DTO types

## Configuration Options

### Basic Usage

```csharp
[assembly: GeneratePropertyResolver("AccountId")]
```

### Namespace Filtering

Include only specific namespaces:

```csharp
[assembly: GeneratePropertyResolver("AccountId", IncludeNamespaces = new[] \{ "MyApp.Domain", "MyApp.Entities" })]
```

Exclude specific namespaces:

```csharp
[assembly: GeneratePropertyResolver("AccountId", ExcludeNamespaces = new[] \{ "System", "Microsoft" })]
```

### Multiple Resolvers

You can generate resolvers for multiple properties:

```csharp
[assembly: GeneratePropertyResolver("AccountId", ExcludeNamespaces = new[] \{ "System", "Microsoft" })]
[assembly: GeneratePropertyResolver("TenantId", ExcludeNamespaces = new[] \{ "System", "Microsoft" })]
[assembly: GeneratePropertyResolver("EntityId", ExcludeNamespaces = new[] \{ "System", "Microsoft" })]
```

## Attribute Reference

### `GeneratePropertyResolverAttribute`

| Parameter | Type | Description |
|-----------|------|-------------|
| `propertyName` | `string` | **(Required)** The name of the property to generate a resolver for. Case-insensitive matching. |
| `IncludeNamespaces` | `string[]?` | Only include types from these namespaces (prefix match). |
| `ExcludeNamespaces` | `string[]?` | Exclude types from these namespaces (prefix match). |

## Analyzer

The package includes an analyzer that detects duplicate property resolver definitions:

```csharp
// PR001: Property resolver for 'AccountId' is already defined
[assembly: GeneratePropertyResolver("AccountId")]
[assembly: GeneratePropertyResolver("AccountId")]  // Error: duplicate
```

Duplicate detection is case-insensitive, so `"AccountId"` and `"accountid"` are considered duplicates.

## How It Works

1. The generator scans all assembly-level `GeneratePropertyResolver` attributes
2. For each attribute, it finds all classes and structs with a matching property name
3. It generates a static resolver class with a switch expression that pattern-matches on the object type
4. The generated code uses `global::` prefixes to avoid namespace conflicts

## Generated Code Location

The generated resolver classes are placed in a namespace matching your assembly name. For example, if your assembly is `MyApp`, the resolvers will be in the `MyApp` namespace.

## Requirements

- .NET Standard 2.0 compatible (works with .NET Framework 4.7.2+ and .NET Core 2.0+)
- C# 9.0 or later (for switch expressions in generated code)
- Visual Studio 2022 17.0+ or compatible IDE with Roslyn 4.0+ support

## License

MIT


:::

### About
:::note

Generating code for switch for property in C#


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **PropertyResolvers**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="PropertyResolvers" Version="0.0.9">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="PropertyResolvers.Attributes" Version="0.0.9" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropertyResolvers\src\PropSwitch\Data.cs" label="Data.cs" >

  This is the use of **PropertyResolvers** in *Data.cs*

```csharp showLineNumbers 
using PropertyResolvers.Attributes;
[assembly: GeneratePropertyResolver("Name",IncludeNamespaces = ["PropSwitch"])]

namespace PropSwitch;

public class Person
{
    public int Id \{ get; set; }
    public string Name \{ get; set; \} = string.Empty;
}

public class College
{
    public int Id \{ get; set; }
    public string Name \{ get; set; \} = string.Empty;
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropertyResolvers\src\PropSwitch\Program.cs" label="Program.cs" >

  This is the use of **PropertyResolvers** in *Program.cs*

```csharp showLineNumbers 

using PropSwitch;

Person p=new() \{ Id = 1, Name = "Andrei" };
College c = new() \{ Id = 1, Name = "Mathematics" };
Console.WriteLine(NameResolver.GetName(p));
Console.WriteLine(NameResolver.GetName(c));
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropertyResolvers\src\PropSwitch\obj\GX\PropertyResolvers.Generators\PropertyResolvers.Generators.PropertyResolverGenerator\NameResolver.g.cs" label="NameResolver.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace PropSwitch;

public static class NameResolver
{
    public static string? GetName(object? obj) => obj switch
    {
        global::PropSwitch.Person x => x.Name.ToString(),
        global::PropSwitch.College x => x.Name.ToString(),
        _ => null
    };

}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PropertyResolvers\src\PropSwitch\obj\GX\PropertyResolvers.Generators\PropertyResolvers.Generators.PropertyResolverGenerator\PropertyResolverRegistration.g.cs" label="PropertyResolverRegistration.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using System.Runtime.CompilerServices;

namespace PropSwitch;

[CompilerGenerated]
internal static class PropertyResolverModuleInitializer
{
    [ModuleInitializer]
    internal static void Initialize()
    {
            global::PropertyResolvers.Attributes.PropertyResolverRegistry.Register("Name", global::PropSwitch.NameResolver.GetName);
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project PropertyResolvers ](/sources/PropertyResolvers.zip)

:::


### Share PropertyResolvers 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyResolvers&quote=PropertyResolvers" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyResolvers&text=PropertyResolvers:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyResolvers" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyResolvers&title=PropertyResolvers" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyResolvers&title=PropertyResolvers&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPropertyResolvers" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/PropertyResolvers

<SameCategory />

