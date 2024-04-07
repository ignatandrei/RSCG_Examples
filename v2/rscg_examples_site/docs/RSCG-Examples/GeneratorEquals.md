---
sidebar_position: 410
title: 41 - GeneratorEquals
description: Generating Equals from properties
slug: /GeneratorEquals
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# GeneratorEquals  by Diego Frato


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Generator.Equals?label=Generator.Equals)](https://www.nuget.org/packages/Generator.Equals/)
[![GitHub last commit](https://img.shields.io/github/last-commit/diegofrata/Generator.Equals?label=updated)](https://github.com/diegofrata/Generator.Equals)
![GitHub Repo stars](https://img.shields.io/github/stars/diegofrata/Generator.Equals?style=social)

## Details

### Info
:::info

Name: **GeneratorEquals**

A source code generator for automatically implementing IEquatable using only attributes.

Author: Diego Frato

NuGet: 
*https://www.nuget.org/packages/Generator.Equals/*   


You can find more details at https://github.com/diegofrata/Generator.Equals

Source : https://github.com/diegofrata/Generator.Equals

:::

### Original Readme
:::note

[![Nuget](https://img.shields.io/nuget/v/Generator.Equals)](https://www.nuget.org/packages/Generator.Equals/)
# Generator.Equals
A source code generator for automatically implementing IEquatable&lt;T&gt; using only attributes.

----------------
## Requirements

In order to use this library, you must:
* Use a target framework that supports .NET Standard >= 2.0
* Set your project's C# ```LangVersion``` property to 9.0 or higher.

## Installation

Simply add the package `Generator.Equals` to your project. Keep reading to learn how to add the attributes to your types.

## Migrating from version 2

Migrating to version 3 is very straightforward.

1. Ensure projects are targeting C# 9.0 or latter using the MSBuild property `LangVersion`.
2. Be aware that `IEquatable<T>` for classes is now implemented explicitly in order to support deep equality. As a result, the method `Equals(T)` method is no longer marked as public. Most code should still work, requiring only to be recompiled as the ABI has changed.

If you have an existing project using `Generator.Equals` and don't need any of the new features, you can still use version 2.x. The differences are minimal between both major versions.

## Usage

The below sample shows how to use Generator.Equals to override the default equality implementation for a C# record, enhancing it with the ability to determine the equality between the array contents of the record.

```c#
using Generator.Equals;

[Equatable]
partial record MyRecord(
    [property: OrderedEquality] string[] Fruits
);

class Program
{
    static void Main(string[] args)
    {
        var record1 = new MyRecord(new[] {"banana", "apple"});
        var record2 = new MyRecord(new[] {"banana", "apple"});

        Console.WriteLine(record1 == record2);
    }
}
```
Need more than records? Generator.Equals supports properties (and fields) also across classes, structs and record structs.

```c#
using Generator.Equals;

[Equatable]
partial class MyClass
{
    [DefaultEquality] 
    private int _secretNumber = 42;

    [OrderedEquality] 
    public string[] Fruits { get; set; }
}

[Equatable]
partial struct MyStruct
{
    [OrderedEquality] 
    public string[] Fruits { get; set; }
}

[Equatable]
partial record struct MyRecordStruct(
    [property: OrderedEquality] string[] Fruits
);
```

## Supported Comparers

Below is a list of all supported comparers. Would you like something else added? Let me know by raising an issue or sending a PR!

### Default

This is the comparer that's used when a property has no attributes indicating otherwise. The generated code will use 
```EqualityComparer<T>.Default``` for both equals and hashing operation.

> _Fields are not used in comparison unless explicitly annotated. To enable the default comparison for a field, annotate it with the `DefaultEquality` attribute._

### IgnoreEquality

```c#
[IgnoreEquality] 
public string Name { get; set; }
```

As the name implies, the property is ignored during Equals and GetHashCode calls!


### OrderedEquality

```c#
[OrderedEquality] 
public string[] Fruits { get; set; } // Fruits have to be in the same order for the array to be considered equal.
```

This equality comparer will compare properties as a sequence instead of a reference. This works just like ```Enumerable.SequenceEqual```, which assumes both lists are of the same size and same sort.

Bear in mind that the property has to implement IEnumerable and the that the items themselves implement equality (you can use Generator.Equals in the items too!).

### UnorderedEquality

```c#
[UnorderedEquality] 
public string[] Fruits { get; set; } // Does not care about the order of the fruits!

[UnorderedEquality] 
public IDictionary<string, object> Properties { get; set; } // Works with dictionaries too!
```

This equality comparer will compare properties as an unordered sequence instead of a reference. This works just like ```Enumerable.SequenceEqual```, but it does not care about the order as long as the all values (including the repetitions) are present.

As with OrderedEquality, bear in mind that the property (or key and values if using a dictionary) has to implement IEnumerable and the that the items themselves implement equality (you can use Generator.Equals in the items too!).

### SetEquality

```c#
[SetEquality] 
public HashSet<string> Fruits { get; set; } // Fruits can be in any order and it can be repeated
```

This equality comparer will do a set comparison, using ```SetEquals``` whenever the underlying collection implements `ISet<T>`, otherwise falling back to  manually comparing both collections, which can be expensive for large collections.

Hashing always returns 0 for this type of equality,
### ReferenceEquality

```c#
[ReferenceEquality] 
public string Name { get; set; } // Will only return true if strings are the same reference (eg. when used with string.Intern)
```

This will ignore whatever equality is implemented for a particular object and compare references instead.

### CustomEquality

```c#
class LengthEqualityComparer : IEqualityComparer<string>
{
    public static readonly LengthEqualityComparer Default = new();

    public bool Equals(string? x, string? y) => x?.Length == y?.Length;

    public int GetHashCode(string obj) => obj.Length.GetHashCode();
}

class NameEqualityComparer 
{
    public static readonly IEqualityComparer<string> Default = new SomeCustomComparer();
}


[CustomEquality(typeof(LengthEqualityComparer))] 
public string Name1 { get; set; } // Will use LengthEqualityComparer to compare the values of Name1.

[CustomEquality(typeof(NameEqualityComparer))] 
public string Name2 { get; set; } // Will use NameEqualityComparer.Default to compare values of Name2.

[CustomEquality(typeof(StringComparer), nameof(StringComparer.OrdinalIgnoreCase))] 
public string Name2 { get; set; } // Will use StringComparer.OrdinalIgnoreCase to compare values of Name2.
```

This attribute allows you to specify a custom comparer for a particular property. For it to work, the type passed as an
argument to CustomEqualityAttribute should fulfill AT LEAST one of the following:

* Have a static field/property named Default returning a valid IEqualityComparer instance for the target type;
* Have a static field/property with the same name passed to the CustomComparerAttribute returning a valid IEqualityComparer instance for the target type;
* Implement IEqualityComparer and expose a parameterless constructor.

## Advanced Options

### Explicit Mode

The generator allows you to explicitly specify which properties are used to generate the `IEquatable`.  

To do this, set the `Explicit` property of `EquatableAttribute` to `true` and specify the required properties using `DefaultEqualityAttribute` or other attributes.
```cs
using Generator.Equals;

[Equatable(Explicit = true)]
partial class MyClass
{
    // Only this property will be used for equality!
    [DefaultEquality] 
    public string Name { get; set; } = "Konstantin"; 
    
    public string Description { get; set; } = "";
}
```


### Ignore Inherited Members

You can also choose to ignore members from parent classes/record by setting `IgnoreInheritedMembers` to true.

```cs
using Generator.Equals;

class Person 
{
    public string Name { get; set; }
}

[Equatable(IgnoreInheritedMembers = true)]
partial class Doctor : Person
{
    // Only members in the Doctor class will be used for comparison.
    public string Id { get; set; }
    public string Specialization { get; set; }
}
```


:::

### About
:::note

Generating Equals from properties


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **GeneratorEquals**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Generator.Equals" Version="3.0.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GeneratorEquals\src\GeneratorEqualsDemo\Program.cs" label="Program.cs" >

  This is the use of **GeneratorEquals** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using GeneratorEqualsDemo;
var p1 = new Person()
{
    ID = 1,
    FirstName = "Andrei",
    LastName = "Ignat"
};
var p2= new Person()
{
    ID = 2,
    FirstName = "Andrei",
    LastName = "Ignat"
};
Console.WriteLine(p1==p2);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GeneratorEquals\src\GeneratorEqualsDemo\Person.cs" label="Person.cs" >

  This is the use of **GeneratorEquals** in *Person.cs*

```csharp showLineNumbers 
using Generator.Equals;

namespace GeneratorEqualsDemo;

[Equatable]
partial class Person
{
    [IgnoreEquality]
    public int ID { get; set; }
    [DefaultEquality]
    public string? FirstName { get; set; }
    [DefaultEquality] 
    public string? LastName { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GeneratorEquals\src\GeneratorEqualsDemo\obj\GX\Generator.Equals\Generator.Equals.EqualsGenerator\GeneratorEqualsDemo.Person.Generator.Equals.g.cs" label="GeneratorEqualsDemo.Person.Generator.Equals.g.cs" >


```csharp showLineNumbers 

#nullable enable
#pragma warning disable CS0612,CS0618
#pragma warning disable CS0436

namespace GeneratorEqualsDemo
{
    partial class Person : global::System.IEquatable<Person>
    {
        /// <summary>
        /// Indicates whether the object on the left is equal to the object on the right.
        /// </summary>
        /// <param name="left">The left object</param>
        /// <param name="right">The right object</param>
        /// <returns>true if the objects are equal; otherwise, false.</returns>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Generator.Equals", "1.0.0.0")]
        public static bool operator ==(
            global::GeneratorEqualsDemo.Person? left,
            global::GeneratorEqualsDemo.Person? right) =>
            global::Generator.Equals.DefaultEqualityComparer<global::GeneratorEqualsDemo.Person?>.Default
                .Equals(left, right);
        
        /// <summary>
        /// Indicates whether the object on the left is not equal to the object on the right.
        /// </summary>
        /// <param name="left">The left object</param>
        /// <param name="right">The right object</param>
        /// <returns>true if the objects are not equal; otherwise, false.</returns>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Generator.Equals", "1.0.0.0")]
        public static bool operator !=(global::GeneratorEqualsDemo.Person? left, global::GeneratorEqualsDemo.Person? right) =>
            !(left == right);
        
        /// <inheritdoc/>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Generator.Equals", "1.0.0.0")]
        public override bool Equals(object? obj) =>
            Equals(obj as global::GeneratorEqualsDemo.Person);
        
        /// <inheritdoc/>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Generator.Equals", "1.0.0.0")]
        bool global::System.IEquatable<global::GeneratorEqualsDemo.Person>.Equals(global::GeneratorEqualsDemo.Person? obj) => Equals((object?) obj);
        
        /// <inheritdoc/>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Generator.Equals", "1.0.0.0")]
        protected bool Equals(global::GeneratorEqualsDemo.Person? other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            
            return other.GetType() == this.GetType()
                && global::Generator.Equals.DefaultEqualityComparer<global::System.String?>.Default.Equals(this.FirstName!, other.FirstName!)
                && global::Generator.Equals.DefaultEqualityComparer<global::System.String?>.Default.Equals(this.LastName!, other.LastName!)
                ;
        }
        
        /// <inheritdoc/>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Generator.Equals", "1.0.0.0")]
        public override int GetHashCode()
        {
            var hashCode = new global::System.HashCode();
            
            hashCode.Add(this.GetType());
            hashCode.Add(
                this.FirstName!,
                global::Generator.Equals.DefaultEqualityComparer<global::System.String?>.Default);
            hashCode.Add(
                this.LastName!,
                global::Generator.Equals.DefaultEqualityComparer<global::System.String?>.Default);
            
            return hashCode.ToHashCode();
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project GeneratorEquals ](/sources/GeneratorEquals.zip)

:::


### Share GeneratorEquals 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGeneratorEquals&quote=GeneratorEquals" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGeneratorEquals&text=GeneratorEquals:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGeneratorEquals" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGeneratorEquals&title=GeneratorEquals" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGeneratorEquals&title=GeneratorEquals&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGeneratorEquals" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/GeneratorEquals

### In the same category (EnhancementClass) - 24 other generators


#### [ApparatusAOT](/docs/ApparatusAOT)


#### [AspectGenerator](/docs/AspectGenerator)


#### [CommonCodeGenerator](/docs/CommonCodeGenerator)


#### [CopyTo](/docs/CopyTo)


#### [DudNet](/docs/DudNet)


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


#### [RSCG_Decorator](/docs/RSCG_Decorator)


#### [RSCG_UtilityTypes](/docs/RSCG_UtilityTypes)


#### [StaticReflection](/docs/StaticReflection)


#### [SyncMethodGenerator](/docs/SyncMethodGenerator)


#### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


#### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)


#### [TelemetryLogging](/docs/TelemetryLogging)

