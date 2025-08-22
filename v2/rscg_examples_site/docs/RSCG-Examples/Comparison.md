---
sidebar_position: 1950
title: 195 - Comparison
description: If you want to generate comparison operators for your classes, startin with IComparable
slug: /Comparison
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Comparison  by Fons Sonnemans


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ReflectionIT.ComparisonOperatorsGenerator?label=ReflectionIT.ComparisonOperatorsGenerator)](https://www.nuget.org/packages/ReflectionIT.ComparisonOperatorsGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator?label=updated)](https://github.com/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator?style=social)

## Details

### Info
:::info

Name: **Comparison**

A Source Generator package that generates the `>`, `>=`, `<`, `<=` operators for a `partial` type (`class`, `struct` or `record`) which implements`IComparable<T>`.

Author: Fons Sonnemans

NuGet: 
*https://www.nuget.org/packages/ReflectionIT.ComparisonOperatorsGenerator/*   


You can find more details at https://github.com/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator

Source: https://github.com/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator

:::

### Original Readme
:::note

# ReflectionIT.ComparisonOperatorsGenerator

A Source Generator package that generates the `>`, `>=`, `<`, `<=` operators for a `partial` type (`class`, `struct` or `record`) which implements
`IComparable<T>`.

Generating these additional operators is as simple as adding the `ComparisonOperators` attribute to your type. Make sure this type is `partial` and implements `System.IComparable<T>`

# NuGet packages

| Package | Version |
| ------ | ------ |
| ReflectionIT.ComparisonOperatorsGenerator | [![NuGet](https://img.shields.io/nuget/v/ReflectionIT.ComparisonOperatorsGenerator)](https://www.nuget.org/packages/ReflectionIT.ComparisonOperatorsGenerator/) |         

## Example

Add the NuGet package and write the following code:

```cs
using ReflectionIT.ComparisonOperatorsGenerator.Attributes;

[ComparisonOperators]
partial class Point : IComparable<Point> {

    public double X { get; }
    public double Y { get; }

    public Point(double x, double y) {
        this.X = x;
        this.Y = y;
    }

    public void Swap() => new Point(this.Y, this.X);

    public double Dist => Math.Sqrt((X * X) + (Y * Y));

    public override string ToString() => $"({X},{Y})";

    public int CompareTo(Point? other) {
        return Comparer<double?>.Default.Compare(this.Dist, other?.Dist);
    }
}
```

This will generate the following partial class with the 4 comparison operators.

```cs
partial class Point : System.Numerics.IComparisonOperators<Point,Point,bool> 
{
    public static bool operator <(Point left, Point right) => left.CompareTo(right) < 0;
        
    public static bool operator <=(Point left, Point right) => left.CompareTo(right) <= 0;
        
    public static bool operator >(Point left, Point right) => left.CompareTo(right) > 0;
        
    public static bool operator >=(Point left, Point right) => left.CompareTo(right) >= 0;       
}
```

## Implement IComparisonOperators\<TSelf,TOther,TResult\> interface

You can automatically implement the `IComparisonOperators<TSelf,TOther,TResult>` interface using the `ImplementIComparisonOperatorsInterface` property of the `ComparisonOperators` attribute.


```cs
using ReflectionIT.ComparisonOperatorsGenerator.Attributes;

[ComparisonOperators(ImplementIComparisonOperatorsInterface = true)]
readonly partial record struct Time : IComparable<Time> {

    public readonly int TotalMinutes; 

    public int Hours => TotalMinutes / 60;
    public int Minutes => TotalMinutes % 60;
    public Time(int totalMinutes) {
        ArgumentOutOfRangeException.ThrowIfNegative(totalMinutes);
        TotalMinutes = totalMinutes;
    }

    public Time(int hours, int minutes) : this(hours * 60 + minutes) {
    }

    public override string ToString() => $"{this.Hours}:{this.Minutes:00}";

    public int CompareTo(Time other) => this.TotalMinutes.CompareTo(other.TotalMinutes);
}
```

This will generate the following partial record struct with the 4 comparison operators and the `IComparisonOperators<TSelf,TOther,TResult>` interface implementation

```cs
partial record struct Time : global::System.Numerics.IComparisonOperators<Time,Time,bool> 
{
    public static bool operator <(Time left, Time right) => left.CompareTo(right) < 0;
        
    public static bool operator <=(Time left, Time right) => left.CompareTo(right) <= 0;
        
    public static bool operator >(Time left, Time right) => left.CompareTo(right) > 0;
        
    public static bool operator >=(Time left, Time right) => left.CompareTo(right) >= 0;
        
}
```





:::

### About
:::note

If you want to generate comparison operators for your classes, startin with IComparable


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Comparison**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>

		<PackageReference Include="ReflectionIT.ComparisonOperatorsGenerator" Version="0.1.2-preview" />
		
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Comparison\src\ComparisonDemo\Program.cs" label="Program.cs" >

  This is the use of **Comparison** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using ComparisonDemo;

Console.WriteLine("Hello, World!");
var room = new Room
{
    Height = 10,
    Width = 20,
    Length = 30
};
var room2 = new Room
{
    Height = 15,
    Width = 25,
    Length = 35
};
Console.WriteLine($"Room Volume: {room.Volume}");
Console.WriteLine($"Room Comparison: {room.CompareTo(room2)}");
Console.WriteLine($"Room Comparison: {room < room2}");


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Comparison\src\ComparisonDemo\Room.cs" label="Room.cs" >

  This is the use of **Comparison** in *Room.cs*

```csharp showLineNumbers 
using ReflectionIT.ComparisonOperatorsGenerator.Attributes;


namespace ComparisonDemo;
//https://github.com/sonnemaf/ReflectionIT.ComparisonOperatorsGenerator
[ComparisonOperators]
internal partial class Room : IComparable<Room>
{

    public int Height { get; set; }
    public int Width { get; set; }
    public int Length { get; set; }
    public int Volume => Height * Width * Length;

    public int CompareTo(Room? other)
    {
        return other is null ? 1 : Volume.CompareTo(other.Volume);
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Comparison\src\ComparisonDemo\obj\GX\ReflectionIT.ComparisonOperatorsGenerator\ReflectionIT.ComparisonOperatorsGenerator.DisposableGenerator\ComparisonDemo.Room.g.cs" label="ComparisonDemo.Room.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the ReflectionIT.ComparisonOperatorsGenerator source generator
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ComparisonDemo
{
    partial class Room
    {
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.ComparisonOperatorsGenerator", "0.1.2.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        /// <summary>Compares two values to determine which is less.</summary>
        /// <param name="left">The value to compare with <paramref name="right" />.</param>
        /// <param name="right">The value to compare with <paramref name="left" />.</param>
        /// <returns><c>true</c> if <paramref name="left" /> is less than <paramref name="right" />; otherwise, <c>false</c>.</returns>
        public static bool operator <(Room left, Room right) => left.CompareTo(right) < 0;
        
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.ComparisonOperatorsGenerator", "0.1.2.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        /// <summary>Compares two values to determine which is less or equal.</summary>
        /// <param name="left">The value to compare with <paramref name="right" />.</param>
        /// <param name="right">The value to compare with <paramref name="left" />.</param>
        /// <returns><c>true</c> if <paramref name="left" /> is less than or equal to <paramref name="right" />; otherwise, <c>false</c>.</returns>
        public static bool operator <=(Room left, Room right) => left.CompareTo(right) <= 0;
        
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.ComparisonOperatorsGenerator", "0.1.2.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        /// <summary>Compares two values to determine which is greater.</summary>
        /// <param name="left">The value to compare with <paramref name="right" />.</param>
        /// <param name="right">The value to compare with <paramref name="left" />.</param>
        /// <returns><c>true</c> if <paramref name="left" /> is greater than <paramref name="right" />; otherwise, <c>false</c>.</returns>
        public static bool operator >(Room left, Room right) => left.CompareTo(right) > 0;
        
        [global::System.CodeDom.Compiler.GeneratedCode("ReflectionIT.ComparisonOperatorsGenerator", "0.1.2.0")]
        [global::System.Diagnostics.DebuggerNonUserCode]
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        /// <summary>Compares two values to determine which is greater or equal.</summary>
        /// <param name="left">The value to compare with <paramref name="right" />.</param>
        /// <param name="right">The value to compare with <paramref name="left" />.</param>
        /// <returns><c>true</c> if <paramref name="left" /> is greater than or equal to <paramref name="right" />; otherwise, <c>false</c>.</returns>
        public static bool operator >=(Room left, Room right) => left.CompareTo(right) >= 0;
        
    }
    
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Comparison\src\ComparisonDemo\obj\GX\ReflectionIT.ComparisonOperatorsGenerator\ReflectionIT.ComparisonOperatorsGenerator.DisposableGenerator\ComparisonOperatorsGenerator.Attributes.g.cs" label="ComparisonOperatorsGenerator.Attributes.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the ReflectionIT.ComparisonOperatorsGenerator source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable
#if COMPARISON_OPERATORS_GENERATOR_EMBED_ATTRIBUTES

/// <summary>
/// An attribute to indicate that comparison operators should be generated for the target class, struct or record
/// <para>
/// This only works if the <see cref="System.IComparable{T}"/> interface is implemented
/// </para>
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = false, Inherited = false)]
public class ComparisonOperatorsAttribute : Attribute {

    /// <summary>
    /// Gets or sets a value indicating whether the <see cref="System.Numerics.IComparisonOperators{TSelf,TOther,TResult}" /> interface should be implemented.
    /// </summary>
    public bool ImplementIComparisonOperatorsInterface { get; set; }
}
#endif
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project Comparison ](/sources/Comparison.zip)

:::


### Share Comparison 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FComparison&quote=Comparison" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FComparison&text=Comparison:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FComparison" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FComparison&title=Comparison" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FComparison&title=Comparison&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FComparison" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Comparison

### In the same category (EnhancementClass) - 27 other generators


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


#### [MemberAccessor](/docs/MemberAccessor)


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

