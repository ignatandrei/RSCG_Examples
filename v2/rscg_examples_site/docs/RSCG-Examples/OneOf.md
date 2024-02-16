---
sidebar_position: 510
title: 51 - OneOf
description: Functional discriminated unions
slug: /OneOf
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# OneOf  by Harry McIntyre


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/OneOf.SourceGenerator?label=OneOf.SourceGenerator)](https://www.nuget.org/packages/OneOf.SourceGenerator)[![Nuget](https://img.shields.io/nuget/dt/OneOf?label=OneOf)](https://www.nuget.org/packages/OneOf/)
[![GitHub last commit](https://img.shields.io/github/last-commit/mcintyre321/OneOf?label=updated)](https://github.com/mcintyre321/OneOf)
![GitHub Repo stars](https://img.shields.io/github/stars/mcintyre321/OneOf?style=social)

## Details

### Info
:::info

Name: **OneOf**

This source generator automaticly implements OneOfBase hierarchies

Author: Harry McIntyre

NuGet: 
*https://www.nuget.org/packages/OneOf.SourceGenerator*   

*https://www.nuget.org/packages/OneOf/*   


You can find more details at https://github.com/mcintyre321/OneOf

Source : https://github.com/mcintyre321/OneOf

:::

### Original Readme
:::note

# OneOf [![NuGet](https://img.shields.io/nuget/v/OneOf?logo=nuget)](https://www.nuget.org/packages/OneOf/) 

> "Ah! It's like a compile time checked switch statement!" - Mike Giorgaras

## Getting Started

> `install-package OneOf`

This library provides F# style ~discriminated~ unions for C#, using a custom type `OneOf<T0, ... Tn>`. An instance of this type holds a single value, which is one of the types in its generic argument list.

I can't encourage you enough to give it a try! Due to exhaustive matching DUs provide an alternative to polymorphism when you want to have a method with guaranteed behaviour-per-type (i.e. adding an abstract method on a base type, and then implementing that method in each type). It's a really powerful tool, ask any f#/Scala dev! :)

PS If you like OneOf, you might want to check out [ValueOf](https://github.com/mcintyre321/valueof), for one-line Value Object Type definitions.

## Use cases

### As a method return value

The most frequent use case is as a return value, when you need to return different results from a method. Here's how you might use it in an MVC controller action:

```csharp
public OneOf<User, InvalidName, NameTaken> CreateUser(string username)
{
    if (!IsValid(username)) return new InvalidName();
    var user = _repo.FindByUsername(username);
    if(user != null) return new NameTaken();
    var user = new User(username);
    _repo.Save(user);
    return user;
}

[HttpPost]
public IActionResult Register(string username)
{
    OneOf<User, InvalidName, NameTaken> createUserResult = CreateUser(username);
    return createUserResult.Match(
        user => new RedirectResult("/dashboard"),
        invalidName => {
            ModelState.AddModelError(nameof(username), $"Sorry, that is not a valid username.");
            return View("Register");
        },
        nameTaken => {
            ModelState.AddModelError(nameof(username), "Sorry, that name is already in use.");
            return View("Register");
        }
    );
}
```

#### As an 'Option' Type

It's simple to use OneOf as an `Option` type - just declare a `OneOf<Something, None>`. OneOf comes with a variety of useful Types in the `OneOf.Types` namespace, including  `Yes`, `No`, `Maybe`, `Unknown`, `True`, `False`, `All`, `Some`, and `None`.

#### Benefits

- True strongly typed method signature
  - No need to return a custom result base type e.g `IActionResult`, or even worse, a non-descriptive type (e.g. object)
  - The method signature accurately describes all the potential outcomes, making it easier for consumers to understand the code
  - Method consumer HAS to handle all cases (see 'Matching', below)
- You can avoid using ["Exceptions for control flow"](http://softwareengineering.stackexchange.com/questions/189222/are-exceptions-as-control-flow-considered-a-serious-antipattern-if-so-why) antipattern by returning custom Typed error objects
  
### As a method parameter value

You can use also use `OneOf` as a parameter type, allowing a caller to pass different types without requiring additional overloads. This might not seem that useful for a single parameter, but if you have multiple parameters, the number of overloads required increases rapidly.

```csharp
public void SetBackground(OneOf<string, ColorName, Color> backgroundColor) { ... }

//The method above can be called with either a string, a ColorName enum value or a Color instance.
```

## Matching

You use the `TOut Match(Func<T0, TOut> f0, ... Func<Tn,TOut> fn)` method to get a value out. Note how the number of handlers matches the number of generic arguments.

### Advantages over `switch` or `if` or `exception` based control flow:

This has a major advantage over a switch statement, as it

- requires every parameter to be handled
- No fallback - if you add another generic parameter, you HAVE to update all the calling code to handle your changes.

    In brown-field code-bases this is incredibly useful, as the default handler is often a runtime `throw NotImplementedException`, or behaviour that wouldn't suit the new result type.

E.g.

```csharp
OneOf<string, ColorName, Color> backgroundColor = ...;
Color c = backgroundColor.Match(
    str => CssHelper.GetColorFromString(str),
    name => new Color(name),
    col => col
);
_window.BackgroundColor = c;
```

There is also a .Switch method, for when you aren't returning a value:

```csharp
OneOf<string, DateTime> dateValue = ...;
dateValue.Switch(
    str => AddEntry(DateTime.Parse(str), foo),
    int => AddEntry(int, foo)
);
```

### TryPick𝑥 method

As an alternative to `.Switch` or `.Match` you can use the `.TryPick𝑥` methods.

```csharp
//TryPick𝑥 methods for OneOf<T0, T1, T2>
public bool TryPickT0(out T0 value, out OneOf<T1, T2> remainder) { ... }
public bool TryPickT1(out T1 value, out OneOf<T0, T2> remainder) { ... }
public bool TryPickT2(out T2 value, out OneOf<T0, T1> remainder) { ... }
```

The return value indicates if the OneOf contains a T𝑥 or not. If so, then `value` will be set to the inner value from the OneOf. If not, then the remainder will be a OneOf of the remaining generic types. You can use them like this:

```csharp
IActionResult Get(string id)
{
    OneOf<Thing, NotFound, Error> thingOrNotFoundOrError = GetThingFromDb(string id);

    if (thingOrNotFoundOrError.TryPickT1(out NotFound notFound, out var thingOrError)) //thingOrError is a OneOf<Thing, Error>
      return StatusCode(404);

    if (thingOrError.TryPickT1(out var error, out var thing)) //note that thing is a Thing rather than a OneOf<Thing>
    {
      _logger.LogError(error.Message);
      return StatusCode(500);
    }

    return Ok(thing);
}
```

### Reusable OneOf Types using OneOfBase

You can declare a OneOf as a type, either for reuse of the type, or to provide additional members, by inheriting from `OneOfBase`. The derived class will inherit the `.Match`, `.Switch`, and `.TryPick𝑥` methods.

```csharp
public class StringOrNumber : OneOfBase<string, int>
{
    StringOrNumber(OneOf<string, int> _) : base(_) { }

    // optionally, define implicit conversions
    // you could also make the constructor public
    public static implicit operator StringOrNumber(string _) => new StringOrNumber(_);
    public static implicit operator StringOrNumber(int _) => new StringOrNumber(_);

    public (bool isNumber, int number) TryGetNumber() =>
        Match(
            s => (int.TryParse(s, out var n), n),
            i => (true, i)
        );
}

StringOrNumber x = 5;
Console.WriteLine(x.TryGetNumber().number);
// prints 5

x = "5";
Console.WriteLine(x.TryGetNumber().number);
// prints 5

x = "abcd";
Console.WriteLine(x.TryGetNumber().isNumber);
// prints False
```

### OneOfBase Source Generation 

You can automatically generate `OneOfBase` hierarchies using `GenerateOneOfAttribute` and partial class that extends `OneOfBase` using
a Source Generator (thanks to @romfir for the contribution :D). Install it via

> Install-Package OneOf.SourceGenerator

and then define a stub like so:

```csharp
[GenerateOneOf]
public partial class StringOrNumber : OneOfBase<string, int> { }
```

During compilation the source generator will produce a class implementing the OneOfBase boiler plate code for you. e.g.

```csharp
public partial class StringOrNumber
{
	public StringOrNumber(OneOf.OneOf<System.String, System.Int32> _) : base(_) { }

	public static implicit operator StringOrNumber(System.String _) => new StringOrNumber(_);
	public static explicit operator System.String(StringOrNumber _) => _.AsT0;

	public static implicit operator StringOrNumber(System.Int32 _) => new StringOrNumber(_);
	public static explicit operator System.Int32(StringOrNumber _) => _.AsT1;
}
```


:::

### About
:::note

Functional discriminated unions


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **OneOf**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="OneOf" Version="3.0.255" />
    <PackageReference Include="OneOf.SourceGenerator" Version="3.0.255" />
  </ItemGroup>
 <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OneOf\src\OneOfDemo\Program.cs" label="Program.cs" >

  This is the use of **OneOf** in *Program.cs*

```csharp showLineNumbers 
using OneOfDemo;

Console.WriteLine("Please enter data - string or number");

var data= Console.ReadLine();
//you can experiment with
StringOrNumber nr1 = 5;
var nr = new StringOrNumber(data);
var dataNumber = nr.TryGetNumber();
Console.WriteLine($"{dataNumber.isNumber} {dataNumber.number}");
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OneOf\src\OneOfDemo\StringOrNumber.cs" label="StringOrNumber.cs" >

  This is the use of **OneOf** in *StringOrNumber.cs*

```csharp showLineNumbers 
using OneOf;
namespace OneOfDemo;

[GenerateOneOf]
public partial class StringOrNumber : OneOfBase<string, int> {
    public (bool isNumber, int number) TryGetNumber() =>
           Match( //this match function is auto generated
               s => (int.TryParse(s, out var n), n),
               i => (true, i)
           );
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OneOf\src\OneOfDemo\obj\GX\OneOf.SourceGenerator\OneOf.SourceGenerator.OneOfGenerator\GenerateOneOfAttribute.g.cs" label="GenerateOneOfAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
using System;

#pragma warning disable 1591

namespace OneOf
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal sealed class GenerateOneOfAttribute : Attribute
    {
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\OneOf\src\OneOfDemo\obj\GX\OneOf.SourceGenerator\OneOf.SourceGenerator.OneOfGenerator\OneOfDemo_StringOrNumber.g.cs" label="OneOfDemo_StringOrNumber.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#pragma warning disable 1591

namespace OneOfDemo
{
    partial class StringOrNumber
    {
        public StringOrNumber(OneOf.OneOf<string, int> _) : base(_) { }

        public static implicit operator StringOrNumber(string _) => new StringOrNumber(_);
        public static explicit operator string(StringOrNumber _) => _.AsT0;

        public static implicit operator StringOrNumber(int _) => new StringOrNumber(_);
        public static explicit operator int(StringOrNumber _) => _.AsT1;
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project OneOf ](/sources/OneOf.zip)

:::


### Share OneOf 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOneOf&quote=OneOf" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOneOf&text=OneOf:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOneOf" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOneOf&title=OneOf" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOneOf&title=OneOf&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FOneOf" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/OneOf

## In the same category (FunctionalProgramming)


### [dunet](/docs/dunet)


### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


### [FunicularSwitch](/docs/FunicularSwitch)


### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


### [PartiallyApplied](/docs/PartiallyApplied)


### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)

