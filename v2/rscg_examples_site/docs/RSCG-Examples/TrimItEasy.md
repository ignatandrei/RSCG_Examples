---
sidebar_position: 2870
title: 287 - TrimItEasy
description: trimming eacg string from a class properties
slug: /TrimItEasy
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementClass.mdx';

# TrimItEasy  by Phong Nguyen


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/TrimItEasy?label=TrimItEasy)](https://www.nuget.org/packages/TrimItEasy/)
[![GitHub last commit](https://img.shields.io/github/last-commit/phongnguyend/TrimItEasy?label=updated)](https://github.com/phongnguyend/TrimItEasy)
![GitHub Repo stars](https://img.shields.io/github/stars/phongnguyend/TrimItEasy?style=social)

## Details

### Info
:::info

Name: **TrimItEasy**

Package Description

Author: Phong Nguyen

NuGet: 
*https://www.nuget.org/packages/TrimItEasy/*   


You can find more details at https://github.com/phongnguyend/TrimItEasy

Source: https://github.com/phongnguyend/TrimItEasy

:::

### Author
:::note
Phong Nguyen 
![Alt text](https://github.com/phongnguyend.png)
:::

## Original Readme
:::note

# TrimItEasy

A simple and efficient .NET library for automatically trimming string properties in complex objects.

## Installation

Install the package from NuGet:

```bash
dotnet add package TrimItEasy
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package TrimItEasy
```

## Usage

### Basic Usage

Simply call the `TrimStrings()` extension method on any complex object:

```csharp
using TrimItEasy;

public class Person
{
    public string Name \{ get; set; }

    public string Email \{ get; set; }

    public Address HomeAddress \{ get; set; }
}

var person = new Person 
{
    Name = "  John Doe  ",
    Email = "  john@example.com  ",
    HomeAddress = new Address 
    {
        Street = "  123 Main St  ",
        City = "  New York  "
    }
};

// Trim all string properties
person.TrimStrings();
```

### Skip Trimming Specific Properties

Use the `[NotTrimmed]` attribute to prevent trimming of specific properties:

```csharp
public class Address
{
    [NotTrimmed]
    public string Street \{ get; set; \}  // This property will not be trimmed
    
    public string City \{ get; set; \}    // This property will be trimmed
}

var address = new Address 
{
    Street = "  123 Main St, Apt 4B  ",  // Will remain unchanged
    City = "  New York  "                 // Will be trimmed to "New York"
};

address.TrimStrings();
```

### Recursive Trimming

By default, the library recursively trims all string properties in nested objects up to a maximum depth of 64 levels. You can customize this behavior using `TrimmingOptions`:

```csharp
// Only trim top-level string properties (disable recursion)
person.TrimStrings(new TrimmingOptions \{ Recursive = false });

// Limit recursion to 2 levels of nested objects
person.TrimStrings(new TrimmingOptions \{ MaxDepth = 2 });

// Only trim the top-level object's string properties (no nested objects)
person.TrimStrings(new TrimmingOptions \{ MaxDepth = 0 });
```

| Option      | Type   | Default | Description                                                                                          |
|-------------|--------|---------|------------------------------------------------------------------------------------------------------|
| `Recursive` | `bool` | `true`  | Whether to trim strings in nested objects. When `false`, only top-level string properties are trimmed.|
| `MaxDepth`  | `int`  | `64`    | Maximum depth for recursive trimming. `0` trims only top-level properties, `1` includes one level of nested objects, and so on. |

### Supported Types

The library works with:
- Complex objects with string properties
- Collections (Lists, Arrays, etc.)
- Nested objects
- Properties marked with `[NotTrimmed]` will be skipped

### Limitations

The library will throw an `ArgumentException` if you try to use it on:
- String types (use `string.Trim()` instead)
- Primitive types
- Enum types

## Examples

### Working with Collections

```csharp
public class Company
{
    public string Name \{ get; set; }

    public List<Employee> Employees \{ get; set; }
}

public class Employee
{
    public string Name \{ get; set; }

    [NotTrimmed]
    public string EmployeeId \{ get; set; }
}

var company = new Company
{
    Name = "  Acme Corp  ",
    Employees = new List<Employee>
    {
        new Employee \{ Name = "  John Doe  ", EmployeeId = "  E001  " },
        new Employee \{ Name = "  Jane Smith  ", EmployeeId = "  E002  " }
    }
};

company.TrimStrings();
// Result:
// - company.Name = "Acme Corp"
// - company.Employees[0].Name = "John Doe"
// - company.Employees[0].EmployeeId = "  E001  " (not trimmed due to [NotTrimmed])
```

### Working with Nested Objects

```csharp
public class Order
{
    public string OrderNumber \{ get; set; }

    public Customer Customer \{ get; set; }

    public List<OrderItem> Items \{ get; set; }
}

public class Customer
{
    public string Name \{ get; set; }

    [NotTrimmed]
    public string PhoneNumber \{ get; set; }
}

var order = new Order
{
    OrderNumber = "  ORD-001  ",
    Customer = new Customer
    {
        Name = "  John Doe  ",
        PhoneNumber = "  +1 (555) 123-4567  "
    },
    Items = new List<OrderItem>
    {
        new OrderItem \{ Description = "  Product A  " }
    }
};

order.TrimStrings();
// All string properties will be trimmed except Customer.PhoneNumber
```

### Source Generator (Zero Reflection)

For maximum performance, TrimItEasy includes a source generator that produces optimized trimming code at compile time � no reflection at runtime.

#### Installation

Install both the core library and the source generator package:

```bash
dotnet add package TrimItEasy
dotnet add package TrimItEasy.Generators
```

Or using the NuGet Package Manager in Visual Studio:
```
Install-Package TrimItEasy
Install-Package TrimItEasy.Generators
```

> **Note:** The `TrimItEasy.Generators` package must be referenced as an analyzer. If you are referencing the project directly, use:
> ```xml
> <ProjectReference Include="..\TrimItEasy.Generators\TrimItEasy.Generators.csproj"
>                   OutputItemType="Analyzer"
>                   ReferenceOutputAssembly="false" />
> ```

#### Usage

1. **Define a `static partial` extension method** that takes your target type as a `this` parameter and returns `void`.
2. **Annotate it with `[GeneratedTrimming]`**.

The source generator will implement the method body automatically.

```csharp
using TrimItEasy;

public class Person
{
    public string Name \{ get; set; }
    public string Email \{ get; set; }
    public Address HomeAddress \{ get; set; }
    public List<Phone> Phones \{ get; set; }
}

public class Address
{
    public string Street \{ get; set; }
    public string City \{ get; set; }
}

public class Phone
{
    public string Type \{ get; set; }
    public string Number \{ get; set; }
}

// Define the partial method � the source generator fills in the implementation
public static partial class PersonExtensions
{
    [GeneratedTrimming]
    public static partial void FastTrimStrings(this Person person);
	
    [GeneratedTrimming]
    public static partial void FastTrimStringsWithOptions(this Person person, TrimmingOptions? options = null);
}
```

Then simply call the generated method:

```csharp
var person = new Person
{
    Name = "  John Doe  ",
    Email = "  john@example.com  ",
    HomeAddress = new Address
    {
        Street = "  123 Main St  ",
        City = "  New York  "
    },
    Phones = new List<Phone>
    {
        new Phone \{ Type = "  Mobile  ", Number = " 123-456-7890 " }
    }
};

person.FastTrimStrings();
// All string properties are trimmed, including nested objects and collections
```

#### How It Works

- The source generator analyzes the target type's property graph at compile time.
- It generates a dedicated trimming method that directly accesses each string property � no reflection involved.
- Nested objects and collections (`List<T>`, arrays, etc.) are handled recursively.
- Properties marked with `[NotTrimmed]` are respected and skipped.
- Circular references are detected and handled safely using a visited set.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

:::

### About
:::note

trimming eacg string from a class properties


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TrimItEasy**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="TrimItEasy" Version="1.0.0" />
    <PackageReference Include="TrimItEasy.Generators" Version="1.0.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TrimItEasy\src\TrimDemo\Program.cs" label="Program.cs" >

  This is the use of **TrimItEasy** in *Program.cs*

```csharp showLineNumbers 
using TrimDemo;

Person p = new();
p.FirstName = " Andrei ";
p.LastName = " Ignat ";
p.FastTrimStrings();
Console.WriteLine(p.FirstName + " " + p.LastName);
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TrimItEasy\src\TrimDemo\obj\GX\TrimItEasy.Generators\TrimItEasy.Generators.TrimmerSourceGenerator\PersonExtensions_FastTrimStrings.g.cs" label="PersonExtensions_FastTrimStrings.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using System.Collections;
using System.Collections.Generic;

namespace TrimDemo;

public static partial class PersonExtensions
{
    public static partial void FastTrimStrings(this global::TrimDemo.Person person)
    {
        var visited = new HashSet<object>(ReferenceEqualityComparer.Instance);
        TrimProperties_TrimDemo_Person(person, visited);
    }

    private static void TrimProperties_TrimDemo_Person(global::TrimDemo.Person obj, HashSet<object> visited)
    {
        if (obj == null || !visited.Add(obj))
        {
            return;
        }

        if (obj.FirstName != null)
        {
            obj.FirstName = obj.FirstName.Trim();
        }

        if (obj.LastName != null)
        {
            obj.LastName = obj.LastName.Trim();
        }

    }

    private static void TrimRecursive(object? obj, HashSet<object> visited)
    {
        if (obj == null || obj is string)
        {
            return;
        }

        var type = obj.GetType();
        if (type.IsPrimitive || type.IsEnum || type == typeof(decimal) || type == typeof(System.DateTime) || type == typeof(System.DateTimeOffset))
        {
            return;
        }

        if (!type.IsValueType && !visited.Add(obj))
        {
            return;
        }

        if (obj is global::TrimDemo.Person typed_TrimDemo_Person)
        {
            TrimProperties_TrimDemo_Person(typed_TrimDemo_Person, visited);
            return;
        }

        if (obj is IList list)
        {
            for (int i = 0; i < list.Count; i++)
            {
                if (list[i] is string s)
                {
                    list[i] = s.Trim();
                }
                else
                {
                    TrimRecursive(list[i], visited);
                }
            }
            return;
        }

        if (obj is IEnumerable enumerable)
        {
            foreach (var item in enumerable)
            {
                if (item is not string)
                {
                    TrimRecursive(item, visited);
                }
            }
            return;
        }
    }

}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project TrimItEasy ](/sources/TrimItEasy.zip)

:::


### Share TrimItEasy 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTrimItEasy&quote=TrimItEasy" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTrimItEasy&text=TrimItEasy:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTrimItEasy" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTrimItEasy&title=TrimItEasy" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTrimItEasy&title=TrimItEasy&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTrimItEasy" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TrimItEasy

<SameCategory />

