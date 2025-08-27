---
sidebar_position: 130
title: 13 - QuickConstructor
description: Fast add constructors that are read only FIELDS
slug: /QuickConstructor
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveConstructor.mdx';

# QuickConstructor  by Flavien Charlon


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/QuickConstructor?label=QuickConstructor)](https://www.nuget.org/packages/QuickConstructor)
[![GitHub last commit](https://img.shields.io/github/last-commit/flavien/QuickConstructor?label=updated)](https://github.com/flavien/QuickConstructor)
![GitHub Repo stars](https://img.shields.io/github/stars/flavien/QuickConstructor?style=social)

## Details

### Info
:::info

Name: **QuickConstructor**

Source generator that automatically creates a constructor from the fields and properties of a class.

Author: Flavien Charlon

NuGet: 
*https://www.nuget.org/packages/QuickConstructor*   


You can find more details at https://github.com/flavien/QuickConstructor

Source: https://github.com/flavien/QuickConstructor

:::

### Original Readme
:::note

# QuickConstructor
[![QuickConstructor](https://img.shields.io/nuget/v/QuickConstructor.svg?style=flat-square&color=blue&logo=nuget)](https://www.nuget.org/packages/QuickConstructor/)

QuickConstructor is a reliable and feature-rich source generator that can automatically emit a constructor from the fields and properties of a class. 

## Features

- Decorate any class with the `[QuickConstructor]` attribute to automatically generate a constructor for that class.
- The constructor updates in real-time as the class is modified.
- Customize which fields and properties are initialized in the constructor.
- Generate null checks automatically based on nullable annotations.
- Works with nested classes and generic classes.
- Supports derived classes.
- Supports classes, records and structs.
- Ability to place attributes on the parameters of the generated constructor.
- No traces left after compilation, no runtime reference necessary.
- Generate XML documentation automatically for the constructor.
- Lightning fast thanks to the .NET 6.0 incremental source generator system.

## Example

Code without QuickConstructor:

```csharp
public class Car
{
    private readonly string _registration;
    private readonly string _model;
    private readonly string _make;
    private readonly string _color;
    private readonly int _year;

    public Car(string registration, string model, string make, string color, int year)
    {
        _registration = registration;
        _model = model;
        _make = make;
        _color = color;
        _year = year;
    }
}
```

With QuickConstructor, this becomes:

```csharp
[QuickConstructor]
public partial class Car
{
    private readonly string _registration;
    private readonly string _model;
    private readonly string _make;
    private readonly string _color;
    private readonly int _year;
}
```

The constructor is automatically generated from the field definitions.

## Installation

The requirements to use the QuickConstructor package are the following:

- Visual Studio 17.0+
- .NET SDK 6.0.100+

Install the NuGet package:

```
dotnet add package QuickConstructor
```

## Usage

QuickConstructor is very easy to use. By simply decorating a class with the `[QuickConstructor]` attribute and making the class `partial`, the source generator will automatically create a constructor based on fields and properties declared in the class. The constructor will automatically update to reflect any change made to the class.

QuickConstructor offers options to customize various aspects of the constructors being generated.

### Fields selection

Quick constructors will always initialize read-only fields as the constructor would otherwise cause a compilation error. However mutable fields can either be included or excluded from the constructor. This is controlled via the `Fields` property of the `[QuickConstructor]` attribute. The possible values are:

| Value                          | Description |
| ------------------------------ | ----------- |
| `IncludeFields.ReadOnlyFields` | **(default)** Only read-only fields are initialized in the constructor. |
| `IncludeFields.AllFields` | All fields are initialized in the constructor. |

Fields with an initializer are never included as part of the constructor.

### Properties selection

It is possible to control which property is initialized in the constructor via the `Properties` property of the `[QuickConstructor]` attribute. The possible values are:

| Value                    | Description |
| ------------------------ | ----------- |
| `IncludeProperties.None` | No property is initialized in the constructor. |
| `IncludeProperties.ReadOnlyProperties` | **(default)** Only read-only auto-implemented properties are initialized in the constructor. |
| `IncludeProperties.AllProperties` | All settable properties are initialized in the constructor. |

Properties with an initializer are never included as part of the constructor.

### Null checks

QuickConstructor has the ability to generate null checks for reference parameters. This is controlled via the `NullCheck` property of the `[QuickConstructor]` attribute. The possible values are:

| Value               | Description |
| ------------------- | ----------- |
| `NullChecks.Always` | Null checks are generated for any field or property whose type is a reference type. |
| `NullChecks.Never` | Null checks are not generated for this constructor. |
| `NullChecks.NonNullableReferencesOnly` | **(default)** When null-state analysis is enabled (C# 8.0 and later), a null check will be generated only if a type is marked as non-nullable. When null-state analysis is disabled, no null check is generated. |

For example, with null-state analysis enabled:

```csharp
[QuickConstructor]
public partial class Name
{
    private readonly string _firstName;
    private readonly string? _middleName;
    private readonly string _lastName;
}
```

This code will result in the following constructor being generated:

```csharp
public Name(string firstName, string? middleName, string lastName)
{
    if (firstName == null)
        throw new ArgumentNullException(nameof(firstName));

    if (lastName == null)
        throw new ArgumentNullException(nameof(lastName));

    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
}
```

### Explicitely include a field or property

It is possible to explicitely include a field or property by decorating it with the `[QuickConstructorParameter]`.

For example:

```csharp
[QuickConstructor]
public partial class Vehicle
{
    [QuickConstructorParameter]
    private int _mileage;

    private int _speed;
}
```

will result in this constructor:

```csharp
public Vehicle(int mileage)
{
    this._mileage = mileage;
}
```

While both `_mileage` and `_speed` are mutable fields, and therefore are exluded by default, `_mileage` does get initialized in the constructor because it is decorated with `[QuickConstructorParameter]`.

### Overriding the name of a parameter

It is possible to override the name of a parameter in the constructor using the `Name` property of the `[QuickConstructorParameter]` attribute.

This class:

```csharp
[QuickConstructor]
public partial class Vehicle
{
    [QuickConstructorParameter(Name = "startingMileage")]
    private int _mileage;

    private int _speed;
}
```

will result in this constructor:

```csharp
public Vehicle(int startingMileage)
{
    this._mileage = startingMileage;
}
```

### Derived classes

It is possible to generate a constructor for a class inheriting from a base class, however the base class must either itself be decorated with `[QuickConstructor]`, or it must have a parameterless constructor.

For example:

```csharp
[QuickConstructor(Fields = IncludeFields.AllFields)]
public partial class Vehicle
{
    private int _mileage;
    private int _speed;
}

[QuickConstructor]
public partial class Bus : Vehicle
{
    private readonly int _capacity;
}
```

In that situation, a constructor will be generated for the `Bus` class, with the following implementation:

```csharp
public Bus(int mileage, int speed, int capacity)
    : base(mileage, speed)
{
    this._capacity = capacity;
}
```

### Constructor accessibility

It is possible to customize the accessibility level of the auto-generated constructor. This is controlled via the `ConstructorAccessibility` property of the `[QuickConstructor]` attribute.

## License

Copyright 2022 Flavien Charlon

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.


:::

### About
:::note

Fast add constructors that are read only FIELDS


Has multiple other features


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **QuickConstructor**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="QuickConstructor" Version="1.0.5" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\QuickConstructor\src\QuickConstructorDemo\Program.cs" label="Program.cs" >

  This is the use of **QuickConstructor** in *Program.cs*

```csharp showLineNumbers 
using QuickConstructorDemo;

var p = new Person("Andrei", "Ignat");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\QuickConstructor\src\QuickConstructorDemo\Person.cs" label="Person.cs" >

  This is the use of **QuickConstructor** in *Person.cs*

```csharp showLineNumbers 
using QuickConstructor.Attributes;

namespace QuickConstructorDemo;

[QuickConstructor]
internal partial class Person
{
    private readonly string FirstName;
    private readonly string? LastName;

    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\QuickConstructor\src\QuickConstructorDemo\obj\GX\QuickConstructor.Generator\QuickConstructor.Generator.QuickConstructorGenerator\Person.cs" label="Person.cs" >


```csharp showLineNumbers 
/// <auto-generated>
/// This code was generated by the QuickConstructor source generator.
/// </auto-generated>

#nullable enable

namespace QuickConstructorDemo
{
    partial class Person
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Person" /> class.
        /// </summary>
        public Person(string @firstName, string? @lastName)
        {
            if (@firstName == null)
                throw new global::System.ArgumentNullException(nameof(@firstName));

            this.@FirstName = @firstName;
            this.@LastName = @lastName;
        }
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project QuickConstructor ](/sources/QuickConstructor.zip)

:::


### Share QuickConstructor 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&quote=QuickConstructor" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&text=QuickConstructor:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&title=QuickConstructor" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor&title=QuickConstructor&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FQuickConstructor" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/QuickConstructor

aaa
<SameCategory />

