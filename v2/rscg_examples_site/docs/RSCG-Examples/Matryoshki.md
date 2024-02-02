---
sidebar_position: 330
title: 33 - Matryoshki
description: Adding decorators to an implementation of interface
slug: /Matryoshki
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Matryoshki  by Georgy Krasin


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/Matryoshki?label=Matryoshki)](https://www.nuget.org/packages/Matryoshki/)
[![GitHub last commit](https://img.shields.io/github/last-commit/krasin-ga/matryoshki?label=updated)](https://github.com/krasin-ga/matryoshki/)
![GitHub Repo stars](https://img.shields.io/github/stars/krasin-ga/matryoshki?style=social)

## Details

### Info
:::info

Name: **Matryoshki**

Metaprogramming framework based on C# source generators

Author: Georgy Krasin

NuGet: 
*https://www.nuget.org/packages/Matryoshki/*   


You can find more details at https://github.com/krasin-ga/matryoshki/

Source : https://github.com/krasin-ga/matryoshki/

:::

### Original Readme
:::note

# Matryoshki 
[![Matryoshki Nuget](https://img.shields.io/nuget/v/Matryoshki?color=1E9400&label=Matryoshki&style=flat-square)](https://www.nuget.org/packages/Matryoshki/) [![Matryoshki.Abstractions Nuget](https://img.shields.io/nuget/v/Matryoshki.Abstractions?color=1E9400&label=Matryoshki.Abstractions&style=flat-square)](https://www.nuget.org/packages/Matryoshki.Abstractions/) [![Matryoshki.Generators Nuget](https://img.shields.io/nuget/v/Matryoshki.Generators?color=1E9400&label=Matryoshki.Generators&style=flat-square)](https://www.nuget.org/packages/Matryoshki.Generators/) 


<img src="assets/matryoshki.svg" align="right" /> "Matryoshki" (Матрёшки, Matryoshkas) is a metaprogramming framework based on C# source generators.


#### Key Features
* Define type-agnostic templates and create decorators based on them:
 `Decorate<IFoo>.With<LoggingAdornment>().Name<FooWithLogging>()`
+ Extract interfaces and automatically generate adapters from classes: `From<Bar>.ExtractInterface<IBar>()`.

## Getting Started

### Installation

The first step is to add package to the target project:

``` bash
dotnet add package Matryoshki
```

Once the package is installed, you can proceed with creating adornments.


### Adornments

<img src="assets/flower.png" width="48" align="left" /> 

Adornments act as blueprints for creating type-agnostic decorators. They consist of a method template and can contain arbitrary members. Rather than being instantiated as objects, the code of adornment classes is directly injected into the decorator classes.

To create an adornment you need to create a class that implements `IAdornment`. As a simple example, you can create an adornment that outputs the name of the decorated member to the console:

``` C#
public class HelloAdornment : IAdornment
{
    public TResult MethodTemplate<TResult>(Call<TResult> call)
    {
        Console.WriteLine($"Hello, {call.MemberName}!");
        return call.Forward();
    }
}
```

When creating a decorated method, `call.Forward()` will be replaced with a call to the implementation. And `TResult` will have the type of the actual return value. For `void` methods, a special type `Nothing` will be used.

<details>
  <summary>A more complex example</summary>


An adornment for logging can serve as a slightly closer example to real-world usage:
``` C#
public class LoggingAdornment : IAdornment
{
    private readonly ILogger<ExceptionLoggingAdornment> _logger;

    public LoggingAdornment(ILogger<ExceptionLoggingAdornment> logger)
    {
        _logger = logger;
    }

    public TResult MethodTemplate<TResult>(Call<TResult> call)
    {
        try
        {
            if(_logger.IsEnabled(LogLevel.Debug))
                _logger.LogDebug("Executing {Type}.{Member}", GetType().Name, call.MemberName);

            var result = call.Forward();

            if (_logger.IsEnabled(LogLevel.Debug))
                _logger.LogDebug("Successfully executed {Type}.{Member}: {Result}", GetType().Name, call.MemberName, result);

            return result;
        }
        catch (Exception exception)
        {
            _logger.LogError(
                exception,
                "Error executing {Type}.{Member}({Arguments})",
                GetType().Name,
                call.MemberName,
                string.Join(",", call.GetArgumentsOfType<object>()));

            throw;
        }
    }
}
```

  
</details>

#### Asynchronous method templates

Asynchronous templates can be defined by implementing the `AsyncMethodTemplate` method, which will be used to decorate methods that return `Task` or `ValueTask`. 

Note that asynchronous templates are optional, and async methods will still be decorated because an `AsyncMethodTemplate` will be automatically created from the `MethodTemplate` by awaiting the `Forward*` method invocations.

More tips for writing adornments can be found here: tips


### Decoration

Once we have an adornment, we can create our first matryoshkas.

<details>
<summary>Suppose we have two interfaces that we would like to apply our HelloAdornment to.</summary>

``` C#
interface IFoo
{
    object Foo(object foo) => foo;
}
record Foo : IFoo;

interface IBar
{
    Task BarAsync() => Task.Delay(0);
}
record Bar : IFoo;
```

</details>

To create matryoshkas, you just need to write their specification in any appropriate location:

``` C#
Matryoshka<IFoo>
    .With<HelloAdornment>()
    .Name<FooMatryoshka>();

Decorate<IBar> // you can use Decorate<> alias if you prefer
    .With<HelloAdornment>()
    .Name<BarMatryoshka>();
```

Done! Now we can test the generated classes:

``` C#
var fooMatryoshka = new FooMatryoshka(new Foo());
var barMatryoshka = new BarMatryoshka(new Bar());

fooMatryoshka.Foo(); // "Hello, Foo!" will be written to console
barMatryoshka.Bar(); // "Hello, Bar!" will be written to console
```

In a production environment, you will likely prefer to use DI containers that support decoration (Grace, Autofac, etc.) or libraries like [Scrutor](https://github.com/khellang/Scrutor). Here's an example of using matryoshkas together with Scrutor:

``` C#
using Scrutor;
using Matryoshki.Abstractions;

public static class MatryoshkaScrutorExtensions
{
    public static IServiceCollection DecorateWithMatryoshka(
        this IServiceCollection services,
        Expression<Func<MatryoshkaType>> expression)
    {
        var matryoshkaType = expression.Compile()();

        services.Decorate(matryoshkaType.Target, matryoshkaType.Type);

        return services;
    }

    public static IServiceCollection DecorateWithNestedMatryoshkas(
        this IServiceCollection services,
        Expression<Func<MatryoshkaTypes>> expression)
    {
        var matryoshkaTypes = expression.Compile()();

        foreach (var type in matryoshkaTypes)
            services.Decorate(matryoshkaTypes.Target, type);

        return services;
    }
}

internal static class Example
{
    internal static IServiceCollection DecorateBar(
        this IServiceCollection services)
    {
        return services.DecorateWithMatryoshka(
            () => Matryoshka<IBar>.With<HelloAdornment>());
    }
}
```

### Chains of decorations with INesting<T1, ..., TN>

Reusable decoration chains can be described by creating a type that implements `INesting<T1, ..., TN>`:

``` C#
public record ObservabilityNesting : INesting<MetricsAdornment, LoggingAdornment, TracingAdornment>;
```

You can generate the classes using it as follows:

``` C#
static IServiceCollection DecorateFoo(IServiceCollection services)
{
    //assuming that you are using MatryoshkaScrutorExtensions
    return services.DecorateWithNestedMatryoshkas(
        () => Matryoshka<IBar>.WithNesting<ObservabilityNesting>());
}
```

It is not possible to assign names to the classes when using `INesting`. The generated types will be located in the `MatryoshkiGenerated.{NestingName}` namespace and have names in the format **TargetTypeName***With***AdornmentName**.

## Limitations

* Do not use a variable named `value`, as this can conflict with a property setter.
* The `call` parameter should not be passed to other methods.
* `default` cannot be used without specifying a type argument.
* To apply decorations, the members must be abstract or virtual. To surpass this limitation you can generate an interface with expression `From<TClass>.ExtractInterface<TInterface>()` and then decrorate `TInterface`.
* The decoration expression must be computable at compile time and written with a single statement
* Pattern matching will not always work

## License

This project is licensed under the MIT license.



## Quick links


Tips

:::

### About
:::note

Adding decorators to an implementation of interface


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Matryoshki**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Matryoshki" Version="1.1.4" />
		<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />

	</ItemGroup>


</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Matryoshki\src\MatryoshkiDemo\Program.cs" label="Program.cs" >

  This is the use of **Matryoshki** in *Program.cs*

```csharp showLineNumbers 

using Matryoshki.Abstractions;
Decorate<IPerson> // you can use Decorate<> alias if you prefer
    .With<AddLog>()
    .Name<PersonMatryoshka>();

var services = new ServiceCollection();

services.AddTransient<IPerson, Person>();
services.AddTransient<PersonMatryoshka, PersonMatryoshka>();
var serviceProvider = services.BuildServiceProvider();
var sp=serviceProvider.GetRequiredService<PersonMatryoshka>();
sp.FirstName = "Andrei";
sp.LastName = "Ignat";
Console.WriteLine(sp.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Matryoshki\src\MatryoshkiDemo\AddLog.cs" label="AddLog.cs" >

  This is the use of **Matryoshki** in *AddLog.cs*

```csharp showLineNumbers 

namespace MatryoshkiDemo;

internal class AddLog : IAdornment
{
    public TResult MethodTemplate<TResult>(Call<TResult> call)
    {        
        Console.WriteLine($"start Calling {call.MemberName}  !");
        var data    =call.Forward();
        Console.WriteLine($"end calling {call.MemberName} !");
        return data;

    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Matryoshki\src\MatryoshkiDemo\IPerson.cs" label="IPerson.cs" >

  This is the use of **Matryoshki** in *IPerson.cs*

```csharp showLineNumbers 
namespace MatryoshkiDemo;

public interface IPerson
{
    string? FirstName { get; set; }
    int ID { get; set; }
    string? LastName { get; set; }

    string FullName();
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Matryoshki\src\MatryoshkiDemo\Person.cs" label="Person.cs" >

  This is the use of **Matryoshki** in *Person.cs*

```csharp showLineNumbers 

namespace MatryoshkiDemo;

public class Person : IPerson
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Matryoshki\src\MatryoshkiDemo\obj\GX\Matryoshki.Generators\Matryoshki.Generators.CompiledAdornmentSourceGenerator\MatryoshkiDemo_AddLog.Compiled.g.cs" label="MatryoshkiDemo_AddLog.Compiled.g.cs" >


```csharp showLineNumbers 
[assembly: Matryoshki.Abstractions.CompiledAdornmentAttribute("MatryoshkiDemo.AddLog", "AddLog", "DQpuYW1lc3BhY2UgTWF0cnlvc2hraURlbW87DQoNCmludGVybmFsIGNsYXNzIEFkZExvZyA6IElBZG9ybm1lbnQNCnsNCiAgICBwdWJsaWMgVFJlc3VsdCBNZXRob2RUZW1wbGF0ZTxUUmVzdWx0PihDYWxsPFRSZXN1bHQ+IGNhbGwpDQogICAgeyAgICAgICAgDQogICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKCQic3RhcnQgQ2FsbGluZyB7Y2FsbC5NZW1iZXJOYW1lfSAgISIpOw0KICAgICAgICB2YXIgZGF0YSAgICA9Y2FsbC5Gb3J3YXJkKCk7DQogICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKCQiZW5kIGNhbGxpbmcge2NhbGwuTWVtYmVyTmFtZX0gISIpOw0KICAgICAgICByZXR1cm4gZGF0YTsNCg0KICAgIH0NCn0=")]
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Matryoshki\src\MatryoshkiDemo\obj\GX\Matryoshki.Generators\Matryoshki.Generators.MatryoshkiSourceGenerator\.PersonMatryoshka.g.cs" label=".PersonMatryoshka.g.cs" >


```csharp showLineNumbers 
using System;
using MatryoshkiDemo;

#nullable enable
public class PersonMatryoshka : MatryoshkiDemo.IPerson
{
    private readonly MatryoshkiDemo.IPerson _inner;
    public PersonMatryoshka(MatryoshkiDemo.IPerson inner)
    {
        _inner = inner;
    }

    private static readonly string[] MethodParameterNamesForPropertyFirstName = new string[]
    {
    };
    public string? FirstName
    {
        get
        {
            Console.WriteLine($"start Calling {"FirstName"}  !");
            var data = _inner.FirstName;
            Console.WriteLine($"end calling {"FirstName"} !");
            return data;
        }

        set
        {
            Console.WriteLine($"start Calling {"FirstName"}  !");
            var data = Matryoshki.Abstractions.Nothing.FromPropertyAction(_inner, value, static (@innerΔΔΔ, @valueΔΔΔ) => @innerΔΔΔ.FirstName = @valueΔΔΔ);
            Console.WriteLine($"end calling {"FirstName"} !");
            return;
        }
    }

    private static readonly string[] MethodParameterNamesForPropertyID = new string[]
    {
    };
    public int ID
    {
        get
        {
            Console.WriteLine($"start Calling {"ID"}  !");
            var data = _inner.ID;
            Console.WriteLine($"end calling {"ID"} !");
            return data;
        }

        set
        {
            Console.WriteLine($"start Calling {"ID"}  !");
            var data = Matryoshki.Abstractions.Nothing.FromPropertyAction(_inner, value, static (@innerΔΔΔ, @valueΔΔΔ) => @innerΔΔΔ.ID = @valueΔΔΔ);
            Console.WriteLine($"end calling {"ID"} !");
            return;
        }
    }

    private static readonly string[] MethodParameterNamesForPropertyLastName = new string[]
    {
    };
    public string? LastName
    {
        get
        {
            Console.WriteLine($"start Calling {"LastName"}  !");
            var data = _inner.LastName;
            Console.WriteLine($"end calling {"LastName"} !");
            return data;
        }

        set
        {
            Console.WriteLine($"start Calling {"LastName"}  !");
            var data = Matryoshki.Abstractions.Nothing.FromPropertyAction(_inner, value, static (@innerΔΔΔ, @valueΔΔΔ) => @innerΔΔΔ.LastName = @valueΔΔΔ);
            Console.WriteLine($"end calling {"LastName"} !");
            return;
        }
    }

    private static readonly string[] MethodParameterNamesForMethodFullName = new string[]
    {
    };
    public string FullName()
    {
        Console.WriteLine($"start Calling {"FullName"}  !");
        var data = _inner.FullName();
        Console.WriteLine($"end calling {"FullName"} !");
        return data;
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Matryoshki ](/sources/Matryoshki.zip)

:::


### Share Matryoshki 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMatryoshki&quote=Matryoshki" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMatryoshki&text=Matryoshki:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMatryoshki" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMatryoshki&title=Matryoshki" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMatryoshki&title=Matryoshki&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMatryoshki" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Matryoshki

## In the same category (Interface)


### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


### [CopyCat](/docs/CopyCat)


### [MakeInterface.Generator](/docs/MakeInterface.Generator)


### [ProxyGen](/docs/ProxyGen)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Static](/docs/RSCG_Static)

