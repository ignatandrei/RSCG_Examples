---
sidebar_position: 150
title: 15 - dunet
description: Add union types to C#  - similar with F#/TS discriminated unions
slug: /dunet
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# dunet  by Domn Werner


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/dunet?label=dunet)](https://www.nuget.org/packages/dunet/)
[![GitHub last commit](https://img.shields.io/github/last-commit/domn1995/dunet?label=updated)](https://github.com/domn1995/dunet)
![GitHub Repo stars](https://img.shields.io/github/stars/domn1995/dunet?style=social)

## Details

### Info
:::info

Name: **dunet**

A simple source generator for discriminated unions in C#.

Author: Domn Werner

NuGet: 
*https://www.nuget.org/packages/dunet/*   


You can find more details at https://github.com/domn1995/dunet

Source : https://github.com/domn1995/dunet

:::

### Original Readme
:::note

# Dunet

[![Build](https://img.shields.io/github/actions/workflow/status/domn1995/dunet/main.yml?branch=main)](https://github.com/domn1995/dunet/actions)
[![Package](https://img.shields.io/nuget/v/dunet.svg)](https://nuget.org/packages/dunet)

**Dunet** is a simple source generator for [discriminated unions](https://en.wikipedia.org/wiki/Tagged_union) in C#.

## Install

- [NuGet](https://www.nuget.org/packages/Dunet/): `dotnet add package dunet`

## Usage

```cs
// 1. Import the namespace.
using Dunet;

// 2. Add the `Union` attribute to a partial record.
[Union]
partial record Shape
{
    // 3. Define the union variants as inner partial records.
    partial record Circle(double Radius);
    partial record Rectangle(double Length, double Width);
    partial record Triangle(double Base, double Height);
}
```

```cs
// 4. Use the union variants.
var shape = new Shape.Rectangle(3, 4);
var area = shape.Match(
    circle => 3.14 * circle.Radius * circle.Radius,
    rectangle => rectangle.Length * rectangle.Width,
    triangle => triangle.Base * triangle.Height / 2
);
Console.WriteLine(area); // "12"
```

## Generics

Use generics for more advanced union types. For example, an option monad:

```cs
// 1. Import the namespace.
using Dunet;
// Optional: use static import for more terse code.
using static Option<int>;

// 2. Add the `Union` attribute to a partial record.
// 3. Add one or more type arguments to the union record.
[Union]
partial record Option<T>
{
    partial record Some(T Value);
    partial record None();
}
```

```cs
// 4. Use the union variants.
Option<int> ParseInt(string? value) =>
    int.TryParse(value, out var number)
        ? new Some(number)
        : new None();

string GetOutput(Option<int> number) =>
    number.Match(
        some => some.Value.ToString(),
        none => "Invalid input!"
    );

var input = Console.ReadLine(); // User inputs "not a number".
var result = ParseInt(input);
var output = GetOutput(result);
Console.WriteLine(output); // "Invalid input!"

input = Console.ReadLine(); // User inputs "12345".
result = ParseInt(input);
output = GetOutput(result);
Console.WriteLine(output); // "12345".
```

## Implicit Conversions

Dunet generates implicit conversions between union variants and the union type if your union meets all of the following conditions:

- The union has no required properties.
- All variants contain a single property.
- Each variant's property is unique within the union.
- No variant's property is an interface type.

For example, consider a `Result` union type that represents success as a `double` and failure as an `Exception`:

```cs
// 1. Import the namespace.
using Dunet;

// 2. Define a union type with a single unique variant property:
[Union]
partial record Result
{
    partial record Success(double Value);
    partial record Failure(Exception Error);
}
```

```cs
// 3. Return union variants directly.
Result Divide(double numerator, double denominator)
{
    if (denominator is 0d)
    {
        // No need for `new Result.Failure(new InvalidOperationException("..."));`
        return new InvalidOperationException("Cannot divide by zero!");
    }

    // No need for `new Result.Success(...);`
    return numerator / denominator;
}

var result = Divide(42, 0);
var output = result.Match(
    success => success.Value.ToString(),
    failure => failure.Error.Message
);

Console.WriteLine(output); // "Cannot divide by zero!"
```

## Async Match

Dunet generates a `MatchAsync()` extension method for all `Task<T>` and `ValueTask<T>` where `T` is a union type. For example:

```cs
// Choice.cs

using Dunet;

namespace Core;

// 1. Define a union type within a namespace.
[Union]
partial record Choice
{
    partial record Yes;
    partial record No(string Reason);
}
```

```cs
// Program.cs

using Core;
using static Core.Choice;

// 2. Define async methods like you would for any other type.
static async Task<Choice> AskAsync()
{
    // Simulating network call.
    await Task.Delay(1000);

    // 3. Return unions from async methods like any other type.
    return new No("because I don't wanna!");
}

// 4. Asynchronously match any union `Task` or `ValueTask`.
var response = await AskAsync()
    .MatchAsync(
        yes => "Yes!!!",
        no => $"No, {no.Reason}"
    );

// Prints "No, because I don't wanna!" after 1 second.
Console.WriteLine(response);
```

> **Note**:
> `MatchAsync()` can only be generated for namespaced unions.

## Specific Match

Dunet generates specific match methods for each union variant. This is useful when unwrapping a union and you only care about transforming a single variant. For example:

```cs
[Union]
partial record Shape
{
    partial record Point(int X, int Y);
    partial record Line(double Length);
    partial record Rectangle(double Length, double Width);
    partial record Sphere(double Radius);
}
```

```cs
public static bool IsZeroDimensional(this Shape shape) =>
    shape.MatchPoint(
        point => true,
        () => false
    );

public static bool IsOneDimensional(this Shape shape) =>
    shape.MatchLine(
        line => true,
        () => false
    );

public static bool IsTwoDimensional(this Shape shape) =>
    shape.MatchRectangle(
        rectangle => true,
        () => false
    );

public static bool IsThreeDimensional(this Shape shape) =>
    shape.MatchSphere(
        sphere => true,
        () => false
    );
```

## Pretty Print

To control how union variants are printed with their `ToString()` methods, override and seal the union declaration's `ToString()` method. For example:

```cs
[Union]
public partial record QueryResult<T>
{
    public partial record Ok(T Value);
    public partial record NotFound;
    public partial record Unauthorized;

    public sealed override string ToString() =>
        Match(
            ok => ok.Value.ToString(),
            notFound => "Not found.",
            unauthorized => "Unauthorized access."
        );
}
```

> **Note**:
> You must seal the `ToString()` override to prevent the compiler from synthesizing a custom `ToString()` method for each variant.
>
> More info: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#built-in-formatting-for-display

## Shared Properties

To create a property shared by all variants, add it to the union declaration. For example, the following code requires all union variants to initialize the `StatusCode` property. This makes `StatusCode` available to anyone with a reference to `HttpResponse` without having to match.

```cs
[Union]
public partial record HttpResponse
{
    public partial record Success;
    public partial record Error(string Message);
    // 1. All variants shall have a status code.
    public required int StatusCode { get; init; }
}
```

```cs
using var client = new HttpClient();
var response = await CreateUserAsync(client, "John", "Smith");

// 2. The `StatusCode` property is available at the union level.
var statusCode = response.StatusCode;

public static async Task<HttpResponse> CreateUserAsync(
    HttpClient client, string firstName, string lastName
)
{
    using var response = await client.PostJsonAsync(
        "/users",
        new { firstName, lastName }
    );

    var content = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
    {
        return new HttpResponse.Error(content)
        {
            StatusCode = (int)response.StatusCode,
        };
    }

    return new HttpResponse.Success()
    {
        StatusCode = (int)response.StatusCode,
    };
}
```

## Stateful Matching

To reduce memory allocations, use the `Match` overload that accepts a generic state parameter as its first argument. This allows your match parameter lambdas to be `static` but still flow state through:

```cs
using Dunet;
using static Expression;

var environment = new Dictionary<string, int>()
{
    ["a"] = 1,
    ["b"] = 2,
    ["c"] = 3,
};

var expression = new Add(new Variable("a"), new Multiply(new Number(2), new Variable("b")));
var result = Evaluate(environment, expression);

Console.WriteLine(result); // "5"

static int Evaluate(Dictionary<string, int> env, Expression exp) =>
    exp.Match(
        // 1. Pass your state "container" as the first parameter.
        state: env,
        // 2. Use static lambdas for each variant's match method.
        static (_, number) => number.Value,
        // 3. Reference the state as the first argument of each lambda.
        static (state, add) => Evaluate(state, add.Left) + Evaluate(state, add.Right),
        static (state, mul) => Evaluate(state, mul.Left) * Evaluate(state, mul.Right),
        static (state, var) => state[var.Value]
    );

[Union]
public partial record Expression
{
    public partial record Number(int Value);
    public partial record Add(Expression Left, Expression Right);
    public partial record Multiply(Expression Left, Expression Right);
    public partial record Variable(string Value);
}
```

## Nest Unions

To declare a union nested within a class or record, the class or record must be `partial`. For example:

```cs
// This type declaration must be partial.
public partial class Parent1
{
    // So must this one.
    public partial class Parent2
    {
        // Unions must always be partial.
        [Union]
        public partial record Nested
        {
            public partial record Variant1;
            public partial record Variant2;
        }
    }
}
```

```cs
// Access variants like any other nested type.
var variant1 = new Parent1.Parent2.Nested.Variant1();
```


:::

### About
:::note

Add union types to C#  - similar with F#/TS discriminated unions


Check his examples-  awesome


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **dunet**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Dunet" Version="1.8.0">
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

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\Program.cs" label="Program.cs" >

  This is the use of **dunet** in *Program.cs*

```csharp showLineNumbers 
// See https://github.com/domn1995/dunet for more examples
using duneDemo;
Console.WriteLine(WhatIsTheString.FromString("1"));

Console.WriteLine(WhatIsTheString.FromString("Andrei"));

Console.WriteLine(WhatIsTheString.FromString("1970-04-16"));

Console.WriteLine("Enter something - 1, 1970-04-16 or Andrei !");
var readLine = Console.ReadLine();
var opt= WhatIsTheString.FromString(readLine);
Console.WriteLine(opt);
//if if it long
opt.MatchIsLong(
    l => Console.WriteLine("is long " + l.value),
    () => Console.WriteLine("is not long")
    ) ;
//C# switch
var x=opt switch
{
    WhatIsTheString.IsLong l => "is long " +l.value,
    WhatIsTheString.IsDate d=> "is date "+ d.value,
    WhatIsTheString.IsString s=>"is string "+ s.value,
    WhatIsTheString.IsNullWhiteSpace w=>"no data",
    _ => throw new NotImplementedException()

};
Console.WriteLine(x);





```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\Recognize.cs" label="Recognize.cs" >

  This is the use of **dunet** in *Recognize.cs*

```csharp showLineNumbers 
using Dunet;
namespace duneDemo;

[Union]
partial record WhatIsTheString
{
    partial record IsString(string value);
    partial record IsLong(long value);
    partial record IsDate(DateTime value);

    partial record IsNullWhiteSpace();

    public static WhatIsTheString FromString(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return new IsNullWhiteSpace();

        if(long.TryParse(value, out var longValue))
        {
            return new IsLong(longValue);
        }
        if(DateTime.TryParse(value, out var dateTimeValue))
        {
            return new IsDate(dateTimeValue);
        }
        return new IsString(value);
    }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\obj\GX\Dunet\Dunet.UnionAttributeGeneration.UnionAttributeGenerator\UnionAttribute.g.cs" label="UnionAttribute.g.cs" >


```csharp showLineNumbers 
using System;

namespace Dunet;

/// <summary>
/// Enables dunet union source generation for the decorated partial record.
/// </summary>
[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class UnionAttribute : Attribute {}
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\obj\GX\Dunet\Dunet.UnionGeneration.UnionGenerator\duneDemo.WhatIsTheString.g.cs" label="duneDemo.WhatIsTheString.g.cs" >


```csharp showLineNumbers 
#pragma warning disable 1591
namespace duneDemo;
abstract partial record WhatIsTheString
{
    private WhatIsTheString() {}

    public abstract TMatchOutput Match<TMatchOutput>(
        System.Func<IsString, TMatchOutput> @isString,
        System.Func<IsLong, TMatchOutput> @isLong,
        System.Func<IsDate, TMatchOutput> @isDate,
        System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    );
    public abstract void Match(
        System.Action<IsString> @isString,
        System.Action<IsLong> @isLong,
        System.Action<IsDate> @isDate,
        System.Action<IsNullWhiteSpace> @isNullWhiteSpace
    );

    public abstract TMatchOutput Match<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsString, TMatchOutput> @isString,
        System.Func<TState, IsLong, TMatchOutput> @isLong,
        System.Func<TState, IsDate, TMatchOutput> @isDate,
        System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    );
    public abstract void Match<TState>(
        TState state,
        System.Action<TState, IsString> @isString,
        System.Action<TState, IsLong> @isLong,
        System.Action<TState, IsDate> @isDate,
        System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
    );

    public abstract TMatchOutput MatchIsString<TMatchOutput>(
        System.Func<IsString, TMatchOutput> @isString,
        System.Func<TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsLong<TMatchOutput>(
        System.Func<IsLong, TMatchOutput> @isLong,
        System.Func<TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsDate<TMatchOutput>(
        System.Func<IsDate, TMatchOutput> @isDate,
        System.Func<TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
        System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TMatchOutput> @else
    );

    public abstract void MatchIsString(
        System.Action<IsString> @isString,
        System.Action @else
    );
    public abstract void MatchIsLong(
        System.Action<IsLong> @isLong,
        System.Action @else
    );
    public abstract void MatchIsDate(
        System.Action<IsDate> @isDate,
        System.Action @else
    );
    public abstract void MatchIsNullWhiteSpace(
        System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action @else
    );

    public abstract TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsString, TMatchOutput> @isString,
        System.Func<TState, TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsLong, TMatchOutput> @isLong,
        System.Func<TState, TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsDate, TMatchOutput> @isDate,
        System.Func<TState, TMatchOutput> @else
    );
    public abstract TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
        System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TState, TMatchOutput> @else
    );

    public abstract void MatchIsString<TState>(
        TState state,
        System.Action<TState, IsString> @isString,
        System.Action<TState> @else
    );
    public abstract void MatchIsLong<TState>(
        TState state,
        System.Action<TState, IsLong> @isLong,
        System.Action<TState> @else
    );
    public abstract void MatchIsDate<TState>(
        TState state,
        System.Action<TState, IsDate> @isDate,
        System.Action<TState> @else
    );
    public abstract void MatchIsNullWhiteSpace<TState>(
        TState state,
        System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action<TState> @else
    );

    public sealed partial record IsString : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isString(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isString(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isString(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isString(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @isString(this);
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @isString(this);
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @else();
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @else();
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @else();
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @isString(state, this);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @isString(state, this);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @else(state);
    }

    public sealed partial record IsLong : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isLong(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isLong(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isLong(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isLong(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @isLong(this);
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @else();
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @isLong(this);
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @else();
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @else();
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @isLong(state, this);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @isLong(state, this);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @else(state);
    }

    public sealed partial record IsDate : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isDate(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isDate(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isDate(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isDate(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @isDate(this);
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @else();
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @else();
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @isDate(this);
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @else();
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @isDate(state, this);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @isDate(state, this);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @else(state);
    }

    public sealed partial record IsNullWhiteSpace : WhatIsTheString
    {
        public override TMatchOutput Match<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isNullWhiteSpace(this);
        public override void Match(
            System.Action<IsString> @isString,
            System.Action<IsLong> @isLong,
            System.Action<IsDate> @isDate,
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isNullWhiteSpace(this);
        public override TMatchOutput Match<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
        ) => @isNullWhiteSpace(state, this);
        public override void Match<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace
        ) => @isNullWhiteSpace(state, this);
        public override TMatchOutput MatchIsString<TMatchOutput>(
            System.Func<IsString, TMatchOutput> @isString,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsLong<TMatchOutput>(
            System.Func<IsLong, TMatchOutput> @isLong,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsDate<TMatchOutput>(
            System.Func<IsDate, TMatchOutput> @isDate,
            System.Func<TMatchOutput> @else
        ) => @else();
        public override TMatchOutput MatchIsNullWhiteSpace<TMatchOutput>(
            System.Func<IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TMatchOutput> @else
        ) => @isNullWhiteSpace(this);
        public override void MatchIsString(
            System.Action<IsString> @isString,
            System.Action @else
        ) => @else();
        public override void MatchIsLong(
            System.Action<IsLong> @isLong,
            System.Action @else
        ) => @else();
        public override void MatchIsDate(
            System.Action<IsDate> @isDate,
            System.Action @else
        ) => @else();
        public override void MatchIsNullWhiteSpace(
            System.Action<IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action @else
        ) => @isNullWhiteSpace(this);
        public override TMatchOutput MatchIsString<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsString, TMatchOutput> @isString,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsLong<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsLong, TMatchOutput> @isLong,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsDate<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsDate, TMatchOutput> @isDate,
            System.Func<TState, TMatchOutput> @else
        ) => @else(state);
        public override TMatchOutput MatchIsNullWhiteSpace<TState, TMatchOutput>(
        TState state,
            System.Func<TState, IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
            System.Func<TState, TMatchOutput> @else
        ) => @isNullWhiteSpace(state, this);
        public override void MatchIsString<TState>(
        TState state,
            System.Action<TState, IsString> @isString,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsLong<TState>(
        TState state,
            System.Action<TState, IsLong> @isLong,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsDate<TState>(
        TState state,
            System.Action<TState, IsDate> @isDate,
            System.Action<TState> @else
        ) => @else(state);
        public override void MatchIsNullWhiteSpace<TState>(
        TState state,
            System.Action<TState, IsNullWhiteSpace> @isNullWhiteSpace,
            System.Action<TState> @else
        ) => @isNullWhiteSpace(state, this);
    }

}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\dunet\src\duneDemo\obj\GX\Dunet\Dunet.UnionGeneration.UnionGenerator\duneDemo.WhatIsTheStringMatchExtensions.g.cs" label="duneDemo.WhatIsTheStringMatchExtensions.g.cs" >


```csharp showLineNumbers 
#pragma warning disable 1591

namespace duneDemo;

internal static class WhatIsTheStringMatchExtensions
{
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.Task MatchAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.ValueTask MatchAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace
    )
    => (await unionTask.ConfigureAwait(false)).Match(
            @isString,
            @isLong,
            @isDate,
            @isNullWhiteSpace
        );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsStringAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsLongAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsDateAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.Task<TMatchOutput> MatchIsNullWhiteSpaceAsync<TMatchOutput>(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsStringAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsString, TMatchOutput> @isString,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsLongAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsLong, TMatchOutput> @isLong,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsDateAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsDate, TMatchOutput> @isDate,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask<TMatchOutput> MatchIsNullWhiteSpaceAsync<TMatchOutput>(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Func<WhatIsTheString.IsNullWhiteSpace, TMatchOutput> @isNullWhiteSpace,
        System.Func<TMatchOutput> @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsStringAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsLongAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsDateAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.Task MatchIsNullWhiteSpaceAsync(
        this System.Threading.Tasks.Task<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsStringAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsString> @isString,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsString(
                    @isString,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsLongAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsLong> @isLong,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsLong(
                    @isLong,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsDateAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsDate> @isDate,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsDate(
                    @isDate,
                    @else
                );
    public static async System.Threading.Tasks.ValueTask MatchIsNullWhiteSpaceAsync(
        this System.Threading.Tasks.ValueTask<WhatIsTheString> unionTask,
        System.Action<WhatIsTheString.IsNullWhiteSpace> @isNullWhiteSpace,
        System.Action @else
    )
        =>
            (await unionTask.ConfigureAwait(false))
                .MatchIsNullWhiteSpace(
                    @isNullWhiteSpace,
                    @else
                );
}
#pragma warning restore 1591

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project dunet ](/sources/dunet.zip)

:::

### Download PDF

[Download PDF dunet ](/pdfs/dunet.pdf)

### Share dunet 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&quote=dunet" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&text=dunet:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&title=dunet" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet&title=dunet&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fdunet" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/dunet
