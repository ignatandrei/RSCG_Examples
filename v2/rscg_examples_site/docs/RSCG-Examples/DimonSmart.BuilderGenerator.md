---
sidebar_position: 1980
title: 198 - DimonSmart.BuilderGenerator
description: Generating builder pattern code for classes
slug: /DimonSmart.BuilderGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBuilder.mdx';

# DimonSmart.BuilderGenerator  by Dmitry Dorogoy


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/DimonSmart.BuilderGenerator?label=DimonSmart.BuilderGenerator)](https://www.nuget.org/packages/DimonSmart.BuilderGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DimonSmart/BuilderGenerator?label=updated)](https://github.com/DimonSmart/BuilderGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/DimonSmart/BuilderGenerator?style=social)

## Details

### Info
:::info

Name: **DimonSmart.BuilderGenerator**

Generate builder classes via source generation. Simplifies object creation with Builder pattern.

Author: Dmitry Dorogoy

NuGet: 
*https://www.nuget.org/packages/DimonSmart.BuilderGenerator/*   


You can find more details at https://github.com/DimonSmart/BuilderGenerator

Source: https://github.com/DimonSmart/BuilderGenerator

:::

### Original Readme
:::note

# BuilderGenerator

**BuilderGenerator** is a Roslyn Source Generator that creates Builder classes at compile time. It�s especially helpful for classes with many properties, giving you a clear, explicit way to see what�s being initialized. You can even generate builders for third-party classes, and a simple hierarchy is supported, including links from child objects back to their parent. If you need something more specialized, take the generated code and adapt it to fit your own needs.

---

## Installation

Install via NuGet:

```
dotnet add package BuilderGenerator
```

Or use your preferred IDE�s NuGet package manager interface.

---

## How It Works

The **BuilderGenerator** uses two main approaches to specify which class to generate a builder for:

1. **Attribute directly on the class.**  
2. **Attribute on a �container� class** where you specify `TargetType` in `[GenerateBuilder(TargetType = typeof(YourClass))]`.

Below are some examples.

---

## Examples

### 1. Simple Scenario: Attribute on the Class

In this example, we have a `Person` class and an `Address` class. We annotate them directly:

```
csharp
using BuilderGenerator.Runtime;

namespace BuilderGenerator.Sample
{
    public interface IPerson
    { }

    [GenerateBuilder] // Directly on the Person class
    public class Person : IPerson
    {
        public string? Name { get; set; }
        public int Age { get; set; }
        public Address? Address { get; set; }
    }

    [GenerateBuilder] // Directly on the Address class
    public class Address
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public IPerson? Person { get; set; }
    }
}
```

Thanks to these attributes, the Source Generator will create:

- `PersonBuilder` (with fluent methods `Name(...)`, `Age(...)`, `Address(...)`)
- `AddressBuilder` (with fluent methods `Street(...)`, `City(...)`, `Person(...)`)

**Usage** might look like:

```
csharp
var person = PersonBuilder.Create()
    .Name("John")
    .Age(30)
    // Here we invoke a nested Address builder
    .Address(addr => addr
        .Street("Main St.")
        .City("Metropolis")
    )
    .Build();
```

After building, `person` becomes an instance of the `Person` class populated with those property values.

---

### 2. Container Approach: Attribute on Another Class

Sometimes you might not want to mark the target class directly with `[GenerateBuilder]`.  
Instead, you can create a separate "container" class (or file) and specify which type it should generate a builder for:

```
csharp
using BuilderGenerator.Runtime;

namespace BuilderGenerator.OtherSamples
{
    [GenerateBuilder(TargetType = typeof(Person))]
    [GenerateBuilder(TargetType = typeof(Address))]
    public class PersonBuilderContainer
    {
        // Could be empty
    }

    // Meanwhile, Person and Address themselves have no direct attribute:
    public class Person
    {
        public string? Name { get; set; }
        public int Age { get; set; }
        public Address? Address { get; set; }
    }

    public class Address
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public IPerson? Person { get; set; }
    }
}
```

The generator will now produce `PersonBuilderContainerBuilder.g.cs` and `AddressBuilderContainerBuilder.g.cs` (or very similarly named files) that act as your fluent builder classes.

**Usage** is the same pattern:

```
csharp
var person = PersonBuilderContainer.Create()
    .Name("Alice")
    .Age(25)
    .Address(addr => addr
        .Street("Baker St.")
        .City("London")
    )
    .Build();
```

---

### 3. Hierarchical Builder Example

The above code already shows how you can nest calls, for example:

```
csharp
var person = PersonBuilder.Create()
    .Name("Bruce")
    .Age(42)
    .Address(a => a
        .Street("Gotham Rd.")
        .City("Gotham")
    )
    .Build();
```

When `Address(...)` is called, the generator automatically creates a nested builder for `Address`.

---

### 4. Setting a Reference to the Parent

In some scenarios, you may want an object to reference its �parent.� For instance, an `Address` might have a property `Person Person { get; set; }`. In your example, `IPerson? Person { get; set; }` is a reference back to the parent. The Source Generator includes a helper method called:

```
csharp
public TParent BuildAndSetParent<TProperty>(
    Expression<Func<TheChildClass, TProperty>> parentSelector
) where TProperty : class
{
    // ...
}
```

This method allows you to set the parent reference in the child builder. Here�s a conceptual usage snippet (the code is somewhat simplified to illustrate the idea):

```
csharp
var personBuilder = PersonBuilder.Create();
var addressBuilder = AddressBuilder.Create();

// Suppose you want address.Person to be the person you are building
// and want the final personBuilder to keep track of the newly built Address:

addressBuilder
    .Street("Parent Av.")
    .City("Capital City")
    .BuildAndSetParent(a => a.Person); 
    // "a => a.Person" indicates that the child Person property should refer back to the parent
```

---

## License

**0BSD License**:  
You�re free to use, copy, modify, distribute, and do pretty much anything else with BuilderGenerator.  
See the [0BSD text](https://opensource.org/licenses/0BSD) for details.

---

## Contributing

If you encounter bugs or have feature requests, feel free to open an issue or submit a pull request on [GitHub](https://github.com/DimonSmart/BuilderGenerator).
```

:::

### About
:::note

Generating builder pattern code for classes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DimonSmart.BuilderGenerator**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="DimonSmart.BuilderGenerator" Version="1.25310.2229" />
	  </ItemGroup>

	  
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DimonSmart.BuilderGenerator\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **DimonSmart.BuilderGenerator** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person();
pOld.FirstName = "Andrei";
pOld.LastName = "Ignat";
pOld.MiddleName = "G";
var build = new PersonBuilder()
    .FirstName(pOld.FirstName)
    .MiddleName("")
    .LastName(pOld.LastName)
    ;

var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DimonSmart.BuilderGenerator\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **DimonSmart.BuilderGenerator** in *Person.cs*

```csharp showLineNumbers 
namespace Builder;
[DimonSmart.BuilderGenerator.Runtime.GenerateBuilder]
public class Person
{
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DimonSmart.BuilderGenerator\src\Builder\obj\GX\DimonSmart.BuilderGenerator.Source\BuilderGenerator.Source.BuilderIncrementalGenerator\GenerateBuilderAttribute.g.cs" label="GenerateBuilderAttribute.g.cs" >


```csharp showLineNumbers 

using System;
namespace DimonSmart.BuilderGenerator.Runtime
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    public sealed class GenerateBuilderAttribute : Attribute
    {
        public Type TargetType { get; set; }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DimonSmart.BuilderGenerator\src\Builder\obj\GX\DimonSmart.BuilderGenerator.Source\BuilderGenerator.Source.BuilderIncrementalGenerator\PersonBuilder.g.cs" label="PersonBuilder.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
using System;
using System.Reflection;
using System.Linq.Expressions;
namespace Builder
{
    public class PersonBuilder
    {
        private readonly Builder.Person _instance = new Builder.Person();
        public static PersonBuilder Create()
        {
            return new PersonBuilder();
        }
        public PersonBuilder FirstName(string value)
        {
            _instance.FirstName = value;
            return this;
        }
        public PersonBuilder MiddleName(string? value)
        {
            _instance.MiddleName = value;
            return this;
        }
        public PersonBuilder LastName(string value)
        {
            _instance.LastName = value;
            return this;
        }
        public Builder.Person Build()
        {
            return _instance;
        }
        public static implicit operator Builder.Person(PersonBuilder builder)
        {
            return builder.Build();
        }
    }
    public class PersonBuilder<TParent>
    {
        private readonly Builder.Person _instance = new Builder.Person();
        private readonly TParent _parent;
        public PersonBuilder(TParent parent)
        {
            _parent = parent;
        }
        public PersonBuilder<TParent> FirstName(string value)
        {
            _instance.FirstName = value;
            return this;
        }
        public PersonBuilder<TParent> MiddleName(string? value)
        {
            _instance.MiddleName = value;
            return this;
        }
        public PersonBuilder<TParent> LastName(string value)
        {
            _instance.LastName = value;
            return this;
        }
        public TParent BuildAndSetParent<TProperty>(Expression<Func<Builder.Person, TProperty>> parentSelector) where TProperty : class
        {
            var memberExpr = (MemberExpression)parentSelector.Body;
            var propertyInfo = memberExpr.Member as PropertyInfo;
            if (propertyInfo == null)
            {
                var interfaceType = memberExpr.Member.DeclaringType;
                propertyInfo = interfaceType.GetProperty(memberExpr.Member.Name);
            }
            propertyInfo.SetValue(_instance, _parent);
            return _parent;
        }
        public Builder.Person Build()
        {
            return _instance;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DimonSmart.BuilderGenerator\src\Builder\obj\GX\DimonSmart.BuilderGenerator.Source\BuilderGenerator.Source.BuilderIncrementalGenerator\PersonBuilderBuilder.g.cs" label="PersonBuilderBuilder.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
using System;
using System.Reflection;
using System.Linq.Expressions;
namespace Builder
{
    public class PersonBuilderBuilder
    {
        private readonly Builder.Person _instance = new Builder.Person();
        public static PersonBuilderBuilder Create()
        {
            return new PersonBuilderBuilder();
        }
        public PersonBuilderBuilder FirstName(string value)
        {
            _instance.FirstName = value;
            return this;
        }
        public PersonBuilderBuilder MiddleName(string? value)
        {
            _instance.MiddleName = value;
            return this;
        }
        public PersonBuilderBuilder LastName(string value)
        {
            _instance.LastName = value;
            return this;
        }
        public Builder.Person Build()
        {
            return _instance;
        }
        public static implicit operator Builder.Person(PersonBuilderBuilder builder)
        {
            return builder.Build();
        }
    }
    public class PersonBuilderBuilder<TParent>
    {
        private readonly Builder.Person _instance = new Builder.Person();
        private readonly TParent _parent;
        public PersonBuilderBuilder(TParent parent)
        {
            _parent = parent;
        }
        public PersonBuilderBuilder<TParent> FirstName(string value)
        {
            _instance.FirstName = value;
            return this;
        }
        public PersonBuilderBuilder<TParent> MiddleName(string? value)
        {
            _instance.MiddleName = value;
            return this;
        }
        public PersonBuilderBuilder<TParent> LastName(string value)
        {
            _instance.LastName = value;
            return this;
        }
        public TParent BuildAndSetParent<TProperty>(Expression<Func<Builder.Person, TProperty>> parentSelector) where TProperty : class
        {
            var memberExpr = (MemberExpression)parentSelector.Body;
            var propertyInfo = memberExpr.Member as PropertyInfo;
            if (propertyInfo == null)
            {
                var interfaceType = memberExpr.Member.DeclaringType;
                propertyInfo = interfaceType.GetProperty(memberExpr.Member.Name);
            }
            propertyInfo.SetValue(_instance, _parent);
            return _parent;
        }
        public Builder.Person Build()
        {
            return _instance;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DimonSmart.BuilderGenerator\src\Builder\obj\GX\DimonSmart.BuilderGenerator.Source\BuilderGenerator.Source.BuilderIncrementalGenerator\PersonBuilderContainerBuilder.g.cs" label="PersonBuilderContainerBuilder.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
using System;
using System.Reflection;
using System.Linq.Expressions;
namespace Builder
{
    public class PersonBuilderContainerBuilder
    {
        private readonly Builder.Person _instance = new Builder.Person();
        public static PersonBuilderContainerBuilder Create()
        {
            return new PersonBuilderContainerBuilder();
        }
        public PersonBuilderContainerBuilder FirstName(string value)
        {
            _instance.FirstName = value;
            return this;
        }
        public PersonBuilderContainerBuilder MiddleName(string? value)
        {
            _instance.MiddleName = value;
            return this;
        }
        public PersonBuilderContainerBuilder LastName(string value)
        {
            _instance.LastName = value;
            return this;
        }
        public Builder.Person Build()
        {
            return _instance;
        }
        public static implicit operator Builder.Person(PersonBuilderContainerBuilder builder)
        {
            return builder.Build();
        }
    }
    public class PersonBuilderContainerBuilder<TParent>
    {
        private readonly Builder.Person _instance = new Builder.Person();
        private readonly TParent _parent;
        public PersonBuilderContainerBuilder(TParent parent)
        {
            _parent = parent;
        }
        public PersonBuilderContainerBuilder<TParent> FirstName(string value)
        {
            _instance.FirstName = value;
            return this;
        }
        public PersonBuilderContainerBuilder<TParent> MiddleName(string? value)
        {
            _instance.MiddleName = value;
            return this;
        }
        public PersonBuilderContainerBuilder<TParent> LastName(string value)
        {
            _instance.LastName = value;
            return this;
        }
        public TParent BuildAndSetParent<TProperty>(Expression<Func<Builder.Person, TProperty>> parentSelector) where TProperty : class
        {
            var memberExpr = (MemberExpression)parentSelector.Body;
            var propertyInfo = memberExpr.Member as PropertyInfo;
            if (propertyInfo == null)
            {
                var interfaceType = memberExpr.Member.DeclaringType;
                propertyInfo = interfaceType.GetProperty(memberExpr.Member.Name);
            }
            propertyInfo.SetValue(_instance, _parent);
            return _parent;
        }
        public Builder.Person Build()
        {
            return _instance;
        }
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project DimonSmart.BuilderGenerator ](/sources/DimonSmart.BuilderGenerator.zip)

:::


### Share DimonSmart.BuilderGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDimonSmart.BuilderGenerator&quote=DimonSmart.BuilderGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDimonSmart.BuilderGenerator&text=DimonSmart.BuilderGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDimonSmart.BuilderGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDimonSmart.BuilderGenerator&title=DimonSmart.BuilderGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDimonSmart.BuilderGenerator&title=DimonSmart.BuilderGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDimonSmart.BuilderGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DimonSmart.BuilderGenerator

aaa
<SameCategory />

