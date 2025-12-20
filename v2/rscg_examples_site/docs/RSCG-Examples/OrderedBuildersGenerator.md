---
sidebar_position: 2510
title: 251 - OrderedBuildersGenerator
description: Generating builder classes with enforced property setting order
slug: /OrderedBuildersGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBuilder.mdx';

# OrderedBuildersGenerator  by Georgiy Petrov


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/OrderedBuildersGenerator?label=OrderedBuildersGenerator)](https://www.nuget.org/packages/OrderedBuildersGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Georgiy-Petrov/OrderedBuildersGenerator?label=updated)](https://github.com/Georgiy-Petrov/OrderedBuildersGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Georgiy-Petrov/OrderedBuildersGenerator?style=social)

## Details

### Info
:::info

Name: **OrderedBuildersGenerator**

Fluent, compile-safe step builders from simple annotated classes — powered by a Roslyn incremental source generator.

Author: Georgiy Petrov

NuGet: 
*https://www.nuget.org/packages/OrderedBuildersGenerator/*   


You can find more details at https://github.com/Georgiy-Petrov/OrderedBuildersGenerator

Source: https://github.com/Georgiy-Petrov/OrderedBuildersGenerator

:::

### Author
:::note
Georgiy Petrov 
![Alt text](https://github.com/Georgiy-Petrov.png)
:::

### Original Readme
:::note

# OrderedBuildersGenerator

Fluent, compile-safe step builders from simple annotated classes — powered by a Roslyn incremental source generator.

[![NuGet](https://img.shields.io/nuget/v/OrderedBuildersGenerator.svg?logo=nuget)](https://www.nuget.org/packages/OrderedBuildersGenerator)

---

## 📜 Table of Contents

* [Overview](#-overview)
* [Quick Start](#-quick-start)
* [Key Features](#-key-features)
* [Examples](#-examples)
* [FAQ](#-faq)
* [Constraints](#-constraints-and-considerations)

---

## ✨ Overview

`OrderedBuildersGenerator` lets you declare a small “configuration” class with annotated methods, and it will generate a
**fluent, compile-time guided builder** that:

* Enforces **ordered steps** (e.g., `WithCustomer` → `WithItems` → `Build`).
* Exposes **unordered steps** that are callable at any time.
* Preserves **generics** and **constraints** on method signatures.
* Mirrors your original class **constructors** so you can pass state/dependencies.
* Is **debug-friendly** — the generated classes are thin **decorators** that forward to your code, so normal breakpoints
  and step-through debugging work great.
* Builder classes are generated instantly as you type — no runtime reflection, no build scripts. Just annotate your
  class and the fluent API appears in IntelliSense.

---

## 🚀 Quick Start

1. **Install the NuGet package**

```xml
<ItemGroup>
  <PackageReference Include="OrderedBuildersGenerator" Version="x.y.z" PrivateAssets="all" OutputItemType="Analyzer" />
</ItemGroup>
```

2. **Create a configuration class**

```csharp
using System;
using System.Collections.Generic;
using OrderedBuildersGenerator;

public record Order(Guid CustomerId, IReadOnlyList<OrderItem> Items, string? Note);
public record OrderItem(string Sku, int Qty);

[StepBuilder("OrderBuilder")]
public class OrderConfig
{
    private Guid _customerId;
    private readonly List<OrderItem> _items = new();
    private string? _note;
    
    [UnorderedStep]
    public void WithNote(string? note) => _note = note;

    [OrderedStep(StepOrder.One)]
    public void WithCustomer(Guid id) => _customerId = id;

    [OrderedStep(StepOrder.Two)]
    public void AddItem(string sku, int qty) => _items.Add(new OrderItem(sku, qty));

    [BuildStep]
    public Order Build() => new(_customerId, _items, _note);
}
```

3. **Use the generated fluent API**

```csharp
var order =
    new OrderBuilder()
        .WithNote("Leave at reception")     // unordered → returns current step
        .WithCustomer(Guid.NewGuid())       // order One → moves to order Two
        .AddItem("SKU-001", 2)              // order Two -> moves to Build
        .Build();                           // terminal step returns Order
```

---

## 🛠️ Key Features

* **Compile-time ordering** via step interfaces (`…StepOne`, `…StepTwo`, `…StepBuild`).
* **Unordered steps everywhere**: `[UnorderedStep]` methods appear on every step interface, including the terminal one.
* **Decorator-style generation (debug-friendly)**: Generated types hold a private instance of your config class and
  forward calls. Breakpoints, locals, and stepping all behave predictably.
* **Constructor mirroring**: All constructors of your config class are mirrored to the generated builder. If none exist,
  a parameterless one is emitted.
* **Signature preservation**: Generic parameters and `where` constraints on your methods are preserved in the generated
  API.
* **Namespace & usings**: The generated file uses the same namespace and copies `using` directives from your source
  file.

---

## Configuration Api Summary

### Attributes

| Attribute                               | Target | Behavior                                                                                                                                                                                                                              |
|-----------------------------------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `StepBuilder([string resultClassName])` | Class  | Marks a class as the template for code generation. If `resultClassName` is omitted, the generated class name is `<YourClassName>Generated`.                                                                                           |
| `UnorderedStep`                         | Method | Callable at any point in the flow. Appears on every step interface (including terminal). **Return type is ignored** — wrapper returns the current step interface for chaining.                                                        |
| `OrderedStep(StepOrder order)`          | Method | Belongs to a specific ordered position. Multiple methods can share the same order; the fluent API enforces that **exactly one** is called before advancing. **Return type is ignored** — wrapper returns the **next** step interface. |
| `BuildStep`                             | Method | Marks terminal method(s). The original return type is **preserved** in the generated API.                                                                                                                                             |

### Enum

* `StepOrder`
  Positions available: `One`, `...`,`Sixteen`.

---

## 📚 Examples

### Constructors

You can declare constructors in your builder class. The generator mirrors your constructors onto the generated builder.

**Configuration class with constructors**

```csharp
[StepBuilder("EmailBuilder")]
public class EmailConfig
{
    private readonly string _defaultFrom;
    private string? _from = null;
    private string _to = "";
    private string _body = "";

    public EmailConfig() : this("noreply@example.com") \{ }

    public EmailConfig(string defaultFrom)
    {
        _defaultFrom = defaultFrom;
        _from = defaultFrom;
    }

    [UnorderedStep] public void From(string address) => _from = address;
    [OrderedStep(StepOrder.One)] public void To(string address) => _to = address;
    [OrderedStep(StepOrder.Two)] public void Body(string body) => _body = body;

    [BuildStep] public Email Build() => new(_from ?? _defaultFrom, _to, _body);
}

public record Email(string From, string To, string Body);
```

**Call site**

```csharp
var email1 = new EmailBuilder()                  // mirrors EmailConfig()
    .To("user@example.com")
    .Body("Hello!")
    .Build();

var email2 = new EmailBuilder("alerts@system")   // mirrors EmailConfig(string)
    .To("ops@example.com")
    .Body("System up")
    .Build();
```

---

### Skipping orders (gapped sequence)

You can declare only `One` and `Three`. The generator still enforces the flow **One → Three → Build** (no `Two` step is
created).

```csharp
[StepBuilder("GappedBuilder")]
public class GappedConfig
{
    [OrderedStep(StepOrder.One)]   public void A() \{ }
    [OrderedStep(StepOrder.Three)] public void C() \{ }

    [BuildStep] public string Build() => "ok";
}
```

**Usage**

```csharp
var result = new GappedBuilder()
    .A()      // Step One
    .C()      // Step Three (next)
    .Build();
```

---

### Generics & constraints preserved

You can declare generic parameters with constraints in your configuration class, and the generated builder will preserve
them.

```csharp
[StepBuilder]
public class BuilderWithGenerics<TInput> where TInput : struct
{
    [OrderedStep(StepOrder.One)]
    public void WithStep<TStage>(TStage stage)
    {
        /* ... */
    }

    [BuildStep]
    public TInput Build() => new();
}
```

**Usage**

```csharp
var genericsResult = 
    new BuilderWithGenericsGenerated<int>()
        .WithStep<string>("")
        .Build();
````

---

### Multiple build methods

You can declare more than one `[BuildStep]` method. Each will appear as a terminal option in the fluent API.  
Custom names are preserved, so you’re not limited to `Build()`.

```csharp
[StepBuilder("ReportBuilder")]
public class ReportConfig
{
    private string _title = "";
    private string _content = "";

    [OrderedStep(StepOrder.One)]
    public void Title(string title) => _title = title;

    [OrderedStep(StepOrder.Two)]
    public void Content(string text) => _content = text;

    [BuildStep] public Report Build() => new(_title, _content);

    [BuildStep] public string Preview() => $"[PREVIEW] {_title}\n{_content}";
}

public record Report(string Title, string Content);
```

**Usage**

```csharp
// Choose which terminal method to call:
var report = new ReportBuilder()
    .Title("Q3 Results")
    .Content("Revenue up 25%")
    .Build();

var preview = new ReportBuilder()
    .Title("Draft")
    .Content("Pending final numbers")
    .Preview();
```

---

## ❓ FAQ

**Can my ordered/unordered methods return values?**
Yes. **Any** return type is allowed, but it is **ignored** in the generated API. The wrappers return step interfaces for
chaining. Only `[BuildStep]` methods surface their original return type.

**How do I change the generated class name?**
Use `[StepBuilder("MyNiceName")]`. Without it, the generator uses `<YourClassName>Generated`.

**Can I have multiple methods in the same order?**
Yes. They’re alternatives at that position. The fluent API enforces that you call **one** of them before moving on.

**Do I need ordered steps?**
No. If you only use `[UnorderedStep]` + `[BuildStep]`, the entry class itself is terminal.

**Where does the generated file live?**
Named `<GeneratedClassName>.g.cs` under the same namespace. `using` directives from the source file are copied over.

**Why is this debug-friendly?**
Generated classes **decorate** your config class: each generated method forwards to your implementation (e.g.,
`_builder.WithAmount(amount);`). Set breakpoints in your config methods; stepping shows clean, predictable calls.

---

## ⚠️ Constraints and Considerations

* **Attributes placement**

    * `[StepBuilder]` → **class**
    * `[UnorderedStep]`, `[OrderedStep]`, `[BuildStep]` → **methods** of that class
* **Ordered depth**: Up to **16** (`One` … `Sixteen`).
* **Gapped orders**: Declaring `One` and `Three` only results in a flow **One → Three** (no intermediate step
  generated).
* **Method signatures**

    * Generics and `where` constraints are preserved on generated method signatures.
    * Parameter lists (names/order) are preserved and forwarded.
    * **Return types** of unordered/ordered source methods are **ignored** by the generated API; wrappers return step
      interfaces.
    * **Build** methods preserve and return your final type.
* **Fluent chaining**

    * Unordered methods return the **current** step interface.
    * Ordered methods return the **next** step interface.
    * Build methods return **your** result type.
* **Attribute names**: Both short names and `*Attribute` suffixed names are recognized (e.g., `OrderedStep` or
  `OrderedStepAttribute`).
* **Construction**

    * Constructors of the config class are mirrored on the generated builder and forward to your class.
    * If none exist, a parameterless constructor is emitted.

---

## 📄 License

This project is licensed under the **MIT License**. See `LICENSE` for details.

---

Questions or ideas? Open an issue — happy to help!


:::

### About
:::note

Generating builder classes with enforced property setting order


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **OrderedBuildersGenerator**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
	  <Nullable>enable</Nullable>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="OrderedBuildersGenerator" Version="1.0.0" PrivateAssets="all" OutputItemType="Analyzer"  />
	  </ItemGroup>

	  
	 

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OrderedBuildersGenerator\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **OrderedBuildersGenerator** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var p = new PersonBuilder()
    .WithLastName("Ignat")
    .WithFirstName("Andrei")
    .Build();
    ;
  
Console.WriteLine(p.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OrderedBuildersGenerator\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **OrderedBuildersGenerator** in *Person.cs*

```csharp showLineNumbers 
using OrderedBuildersGenerator;
using System;
using System.Xml.Linq;

namespace Builder;

[StepBuilder("PersonBuilder")]
public partial class PersonConfig
{
    private string? firstName;
    
    private string lastName = string.Empty;

    [OrderedStep(StepOrder.One)]
    public void WithLastName(string name)
    {
        this.lastName = name;
        
    }
    [OrderedStep(StepOrder.Two)]
    public void WithFirstName(string name)
    {
        this.firstName = name;
    }
    [BuildStep]
    public Person Build() => new(firstName??"",lastName);

}

public record Person(string firstName, string lastName)
{
    public string FullName() => $"{firstName} {lastName}";
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OrderedBuildersGenerator\src\Builder\obj\GX\OrderedBuildersGenerator\OrderedBuildersGenerator.OrderedBuildersGenerator\OrderBuilder.g.cs" label="OrderBuilder.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using OrderedBuildersGenerator;
using System;
using System.Xml.Linq;

namespace Builder;

public interface IOrderBuilder_UnorderedSteps<TStep>
{
}

public interface IOrderBuilder_StepOne : IOrderBuilder_UnorderedSteps<IOrderBuilder_StepOne>
{
    public IOrderBuilder_StepTwo WithLastName(string lastName);

}

public interface IOrderBuilder_StepTwo : IOrderBuilder_UnorderedSteps<IOrderBuilder_StepTwo>
{
    public IOrderBuilder_StepBuild WithFirstName(string name);

}

public interface IOrderBuilder_StepBuild : IOrderBuilder_UnorderedSteps<IOrderBuilder_StepBuild>
{
    public Person Build();

}

public class OrderBuilder : IOrderBuilder_StepOne
{
    private readonly PersonBuilder _builder;

    public OrderBuilder()
    {
        _builder = new PersonBuilder();
    }

    public IOrderBuilder_StepTwo WithLastName(string lastName)
    {
        _builder.WithLastName(lastName);
        return new OrderBuilderStepTwo(_builder);
    }

    private class OrderBuilderStepTwo : IOrderBuilder_StepTwo
    {
        private readonly PersonBuilder _builder;

        public OrderBuilderStepTwo(PersonBuilder builder)
        {
            _builder = builder;
        }

        public IOrderBuilder_StepBuild WithFirstName(string name)
        {
            _builder.WithFirstName(name);
            return new OrderBuilderStepBuild(_builder);
        }

    }

    private class OrderBuilderStepBuild : IOrderBuilder_StepBuild
    {
        private readonly PersonBuilder _builder;

        public OrderBuilderStepBuild(PersonBuilder builder)
        {
            _builder = builder;
        }

        public Person Build()
        {
            return _builder.Build();
        }

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OrderedBuildersGenerator\src\Builder\obj\GX\OrderedBuildersGenerator\OrderedBuildersGenerator.OrderedBuildersGenerator\PersonBuilder.g.cs" label="PersonBuilder.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using OrderedBuildersGenerator;
using System;
using System.Xml.Linq;

namespace Builder;

public interface IPersonBuilder_UnorderedSteps<TStep>
{
}

public interface IPersonBuilder_StepOne : IPersonBuilder_UnorderedSteps<IPersonBuilder_StepOne>
{
    public IPersonBuilder_StepTwo WithLastName(string name);

}

public interface IPersonBuilder_StepTwo : IPersonBuilder_UnorderedSteps<IPersonBuilder_StepTwo>
{
    public IPersonBuilder_StepBuild WithFirstName(string name);

}

public interface IPersonBuilder_StepBuild : IPersonBuilder_UnorderedSteps<IPersonBuilder_StepBuild>
{
    public Person Build();

}

public class PersonBuilder : IPersonBuilder_StepOne
{
    private readonly PersonConfig _builder;

    public PersonBuilder()
    {
        _builder = new PersonConfig();
    }

    public IPersonBuilder_StepTwo WithLastName(string name)
    {
        _builder.WithLastName(name);
        return new PersonBuilderStepTwo(_builder);
    }

    private class PersonBuilderStepTwo : IPersonBuilder_StepTwo
    {
        private readonly PersonConfig _builder;

        public PersonBuilderStepTwo(PersonConfig builder)
        {
            _builder = builder;
        }

        public IPersonBuilder_StepBuild WithFirstName(string name)
        {
            _builder.WithFirstName(name);
            return new PersonBuilderStepBuild(_builder);
        }

    }

    private class PersonBuilderStepBuild : IPersonBuilder_StepBuild
    {
        private readonly PersonConfig _builder;

        public PersonBuilderStepBuild(PersonConfig builder)
        {
            _builder = builder;
        }

        public Person Build()
        {
            return _builder.Build();
        }

    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project OrderedBuildersGenerator ](/sources/OrderedBuildersGenerator.zip)

:::


### Share OrderedBuildersGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOrderedBuildersGenerator&quote=OrderedBuildersGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOrderedBuildersGenerator&text=OrderedBuildersGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOrderedBuildersGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOrderedBuildersGenerator&title=OrderedBuildersGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOrderedBuildersGenerator&title=OrderedBuildersGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOrderedBuildersGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/OrderedBuildersGenerator

<SameCategory />

