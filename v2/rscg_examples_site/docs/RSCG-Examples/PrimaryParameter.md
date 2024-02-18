---
sidebar_position: 830
title: 83 - PrimaryParameter
description: Generating properties from .NET 8 constructor parameters
slug: /PrimaryParameter
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# PrimaryParameter  by FaustVX


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/FaustVX.PrimaryParameter.SG?label=FaustVX.PrimaryParameter.SG)](https://www.nuget.org/packages/FaustVX.PrimaryParameter.SG)
[![GitHub last commit](https://img.shields.io/github/last-commit/FaustVX/PrimaryParameter?label=updated)](https://github.com/FaustVX/PrimaryParameter)
![GitHub Repo stars](https://img.shields.io/github/stars/FaustVX/PrimaryParameter?style=social)

## Details

### Info
:::info

Name: **PrimaryParameter**

Package Description

Author: FaustVX

NuGet: 
*https://www.nuget.org/packages/FaustVX.PrimaryParameter.SG*   


You can find more details at https://github.com/FaustVX/PrimaryParameter

Source : https://github.com/FaustVX/PrimaryParameter

:::

### Original Readme
:::note

# Primary Parameter
[![NuGet version (FaustVX.PrimaryParameter.SG)](https://img.shields.io/nuget/v/FaustVX.PrimaryParameter.SG.svg)](https://www.nuget.org/packages/FaustVX.PrimaryParameter.SG/)
[![Update NuGet](https://github.com/FaustVX/PrimaryParameter/actions/workflows/pushToNuget.yaml/badge.svg)](https://github.com/FaustVX/PrimaryParameter/actions/workflows/pushToNuget.yaml)

## Description
Using a `Field` or `RefField` or `Property` attribute on parameters.

Automatically generate `private readonly` fields or `private readonly ref readonly` fields or `public` properties.

Forbid the use of primary constructor's parameters.

## Usage

```cs
partial class C([Field(Name = "_a", AssignFormat = "{0}.ToString()", Type = typeof(string)), Field(Name = nameof(C._b)), Field, Property(WithInit = true)]int i) // type must be partial, but can be class / struct
{
# region Generated members
    // private readonly string _a = i.ToString();   // generated field (with type and formated assignment)
    // private readonly int _b = i;                 // generated field (with computed name)
    // private readonly int _i = i;                 // generated field
    // private int { get; init; } = i;              // generated Property
# endregion

    public void M0()
    {
        i++;                    // error on usage of i
        Console.WriteLine(i);   // error on usage of i
    }

    public void M1()
    {
        var i = 0;
        i++;                    // don't error on usage of locals
        Console.WriteLine(_i);  // automaticaly created readonly field
        Console.WriteLine(_a);  // automaticaly created readonly field based on Name property
        Console.WriteLine(I);   // automaticaly created readonly property
    }
}

ref partial struct Ref([RefField(IsReadonlyRef = false, IsRefReadonly = false), RefField(Name = nameof(Ref.I), Scope = "public")]int i)
{
# region Generated members
    private ref int _i = ref i;
    public readonly ref readonly int I = ref i;
# endregion
}
```

To enable the feature, type `[Field]` or `[RefField]` or `[Property]` before the primary parameter you want.

You can type as many attributes as you want on a single parameter.

## Attribute Properties
|Attribute|Property|Comments|Default value|
|---------|--------|--------|-------------|
|`Field`|`Name`|Property to modify the generated field name|`_i` (for a parameter named `i`)|
||`IsReadnoly`|To generate the `readonly` modifier|`true`|
||`Scope`|To change the scope of the generated property|`private`|
||`AssignFormat`|To change the assignment for that field|`{0}`|
||`Type`|To change the type for that field|same type as parameter|
|`RefField`|`Name`|Property to modify the generated field name|`_i` (for a parameter named `i`)|
||`IsReadnolyRef`|To generate the `readonly ref` modifier|`true`|
||`IsRefReadnoly`|To generate the `ref readonly` modifier|`true`|
||`Scope`|To change the scope of the generated property|`private`|
|`Property`|`Name`|Property to modify the generated field name|`I` (for a parameter named `i`)|
||`WithInit`|To generate the `init` accessor along the `get`|`false`|
||`Scope`|To change the scope of the generated property|`public`|
||`AssignFormat`|To change the assignment for that property|`{0}`|
||`Type`|To change the type for that property|same type as parameter|


## `.csproj` properties
|Property|Description|Default value|
|--------|-----------|-------------|
|Fields|||
|`PrimaryParameter_Field_DefaultScope`|The default scope for fields generation|`private`|
|`PrimaryParameter_Field_DefaultReadonly`|Should fields generates with `readonly` modifier|`true`|
|Ref Fields|||
|`PrimaryParameter_RefField_DefaultScope`|The default scope for `ref` field generation|`private`|
|`PrimaryParameter_RefField_DefaultReadonlyRef`|Should `ref` fields generates with `readonly ref` modifier|`true`|
|`PrimaryParameter_RefField_DefaultRefReadonly`|Should `ref` fields generates with `ref readonly` modifier|`true`|
|Properties|||
|`PrimaryParameter_Property_DefaultScope`|The default scope for properties generation|`public`|
|`PrimaryParameter_Property_DefaultWithInit`|Should properties generates with `init` accessor|`true`|



:::

### About
:::note

Generating properties from .NET 8 constructor parameters


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **PrimaryParameter**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<ItemGroup>
	  <PackageReference Include="FaustVX.PrimaryParameter.SG" Version="1.2.0" OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PrimaryParameter\src\ConstructorDemo\Program.cs" label="Program.cs" >

  This is the use of **PrimaryParameter** in *Program.cs*

```csharp showLineNumbers 
using QuickConstructorDemo;

var p = new Person("Andrei", "Ignat");

Console.WriteLine(p.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PrimaryParameter\src\ConstructorDemo\Person.cs" label="Person.cs" >

  This is the use of **PrimaryParameter** in *Person.cs*

```csharp showLineNumbers 
using PrimaryParameter.SG;
namespace QuickConstructorDemo;
internal partial class Person([Property]string FirstName,[Field(Name ="_LastName",Scope ="public")]string? LastName=null)
{
    //private readonly string FirstName;
    //private readonly string? LastName;
    
    public string FullName() => $"{FirstName} {_LastName}";
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PrimaryParameter\src\ConstructorDemo\obj\GX\PrimaryParameter.SG\PrimaryParameter.SG.Generator\FaustVX.PrimaryParameter.SG.g.cs" label="FaustVX.PrimaryParameter.SG.g.cs" >


```csharp showLineNumbers 
namespace QuickConstructorDemo
{
    partial class Person
    {
        public string FirstName { get; init; } = FirstName;
    }
}
namespace QuickConstructorDemo
{
    partial class Person
    {
        public readonly string _LastName = LastName;
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PrimaryParameter\src\ConstructorDemo\obj\GX\PrimaryParameter.SG\PrimaryParameter.SG.Generator\FieldAttribute.g.cs" label="FieldAttribute.g.cs" >


```csharp showLineNumbers 
using global::System;
namespace PrimaryParameter.SG
{
    [AttributeUsage(AttributeTargets.Parameter, Inherited = false, AllowMultiple = true)]
    sealed class FieldAttribute : Attribute
    {
        public string Name { get; init; }
        public string AssignFormat { get; init; }
        public Type Type { get; init; }
        public bool IsReadonly { get; init; }
        public string Scope { get; init; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PrimaryParameter\src\ConstructorDemo\obj\GX\PrimaryParameter.SG\PrimaryParameter.SG.Generator\PropertyAttribute.g.cs" label="PropertyAttribute.g.cs" >


```csharp showLineNumbers 
using global::System;
namespace PrimaryParameter.SG
{
    [AttributeUsage(AttributeTargets.Parameter, Inherited = false, AllowMultiple = true)]
    sealed class PropertyAttribute : Attribute
    {
        public string Name { get; init; }
        public string AssignFormat { get; init; }
        public Type Type { get; init; }
        public bool WithInit { get; init; }
        public string Scope { get; init; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PrimaryParameter\src\ConstructorDemo\obj\GX\PrimaryParameter.SG\PrimaryParameter.SG.Generator\RefFieldAttribute.g.cs" label="RefFieldAttribute.g.cs" >


```csharp showLineNumbers 
using global::System;
namespace PrimaryParameter.SG
{
    [AttributeUsage(AttributeTargets.Parameter, Inherited = false, AllowMultiple = true)]
    sealed class RefFieldAttribute : Attribute
    {
        public string Name { get; init; }
        public string Scope { get; init; }
        public bool IsReadonlyRef { get; init; }
        public bool IsRefReadonly { get; init; }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project PrimaryParameter ](/sources/PrimaryParameter.zip)

:::


### Share PrimaryParameter 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPrimaryParameter&quote=PrimaryParameter" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPrimaryParameter&text=PrimaryParameter:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPrimaryParameter" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPrimaryParameter&title=PrimaryParameter" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPrimaryParameter&title=PrimaryParameter&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPrimaryParameter" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/PrimaryParameter

### In the same category (Constructor) - 5 other generators


#### [AutoConstructor](/docs/AutoConstructor)


#### [AutoCtor](/docs/AutoCtor)


#### [AutoDeconstruct](/docs/AutoDeconstruct)


#### [QuickConstructor](/docs/QuickConstructor)


#### [sourcedepend](/docs/sourcedepend)

