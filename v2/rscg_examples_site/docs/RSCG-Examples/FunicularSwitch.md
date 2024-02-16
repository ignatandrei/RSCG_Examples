---
sidebar_position: 1090
title: 109 - FunicularSwitch
description: Generating discriminated unions for C# 9.0 and above.
slug: /FunicularSwitch
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# FunicularSwitch  by bluehands


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/FunicularSwitch.Generators?label=FunicularSwitch.Generators)](https://www.nuget.org/packages/FunicularSwitch.Generators/)[![Nuget](https://img.shields.io/nuget/dt/FunicularSwitch?label=FunicularSwitch)](https://www.nuget.org/packages/FunicularSwitch)
[![GitHub last commit](https://img.shields.io/github/last-commit/bluehands/Funicular-Switch?label=updated)](https://github.com/bluehands/Funicular-Switch)
![GitHub Repo stars](https://img.shields.io/github/stars/bluehands/Funicular-Switch?style=social)

## Details

### Info
:::info

Name: **FunicularSwitch**

Source generator package to have result types like in F# with your custom error type

Author: bluehands

NuGet: 
*https://www.nuget.org/packages/FunicularSwitch.Generators/*   

*https://www.nuget.org/packages/FunicularSwitch*   


You can find more details at https://github.com/bluehands/Funicular-Switch

Source : https://github.com/bluehands/Funicular-Switch

:::

### Original Readme
:::note

# FunicularSwitch

![BuildStatus](https://bluehands.visualstudio.com/bluehands%20Funicular%20Switch/_apis/build/status/bluehandsFunicularSwitch-CI?branchName=develop)
![Try_.NET Enabled](https://img.shields.io/badge/Try_.NET-Enabled-501078.svg)

FunicularSwitch is a lightweight C# port of F# result and option types.

FunicularSwitch helps you to:

- Focus on the 'happy path', but collect all error information.
- Be more explicit in what our methods return.
- Avoid deep nesting.
- Avoid null checks and eventual properties (properties only relevant for a certain state of an object), use Result or Option instead.
- Comfortably write async code pipelines.
- Wrap third party library exceptions / return values into results at the code level were we really understand what is happening.

# Getting Started

### Packages

 - [NuGet: FunicularSwitch](https://www.nuget.org/packages/FunicularSwitch/)
 - [NuGet: FunicularSwitch.Generators](https://www.nuget.org/packages/FunicularSwitch.Generators/)

[**FunicularSwitch**](https://github.com/bluehands/Funicular-Switch#funicularswitch-usage) is a library containing the Result and Option type. Usage and the general idea is described in the following sections. The 'Error' type is always string, which allows natural concatenation and is sufficient in many cases.

[**FunicularSwitch.Generators**](https://github.com/bluehands/Funicular-Switch#funicularswitchgenerators-usage) is a C# source generator package (projects consuming it, will have no runtime dependency to any FunicularSwitch dll). With this source generator you can have a result type with the very same behaviour as FunicularSwitch.Result but a custom error type (instead of string) by just annotating a class with the `ResultType` attribute. That means you are free to represent failures in a way suitable for your needs. A second thing coming with this package are generated F#-like Match methods. They allow for compiler safe switches handling all concrete subtypes of a base class (very useful for union type implementations). As a third thing the same Match methods are also generated for enum types annotated with the `ExtendedEnum` attribute.

# <a name="funicular_usage"></a>FunicularSwitch Usage

*This document is created using [dotnet try](https://github.com/dotnet/try/blob/main/DotNetTryLocal.md). If you have dotnet try global tool installed, just clone the repo, type `dotnet try` on top level and play around with all code samples in your browser while reading.*

This following section mainly focuses on `Result`. `Result` is a union type representing either Ok or the Error case just like F#s Result type. For FunicularSwitch the error type is `String` for sake of simplicity (Using types with multiple generic arguments is quite verbose in C#).

Result should be used in all places, were something can go wrong. Doing so it replaces exceptions and null/default return values.

Creating a `Result` is easy:

``` cs --region resultCreation --source-file Source/DocSamples/ReadmeSamples.cs --project Source/DocSamples/DocSamples.csproj
//Ok result:
var fortyTwo = Result.Ok(42);
//or using implicit cast operator
Result<string> ok = "Ok";

//Error result:
var error = Result.Error<int>("Could not find the answer");
```

Now lets follow the happy path, do something, if everything was ok. `Map`:

``` cs --region map --source-file Source/DocSamples/ReadmeSamples.cs --project Source/DocSamples/DocSamples.csproj --session map
static Result<int> Ask() => 42;

Result<int> answerTransformed = Ask()
    .Map(answer => answer * 2);

Console.WriteLine(answerTransformed);
```

``` console --session map
Ok 84

```

or do something that might fail, if everything was ok. `Bind`:

``` cs --region bind --source-file Source/DocSamples/ReadmeSamples.cs --project Source/DocSamples/DocSamples.csproj --session bind
static Result<int> Ask() => 42;

Result<int> answerTransformed = Ask()
    .Bind(answer => answer == 0 ? Result.Error<int>("Division by zero") : 42 / answer);

Console.WriteLine(answerTransformed);
```

``` console --session bind
Ok 1

```

The lambdas passed to `Map` and `Bind` are only invoked if everything went well so far, otherwise you are on the error track were error information is passed on 'invisibly':
b

``` cs --region errorPropagation --source-file Source/DocSamples/ReadmeSamples.cs --project Source/DocSamples/DocSamples.csproj --session errorPropagation
static Result<int> Transform(Result<int> result) =>
                result
                    .Bind(answer => answer == 0 ? Result.Error<int>("Division by zero") : 42 / answer)
                    .Map(transformed => transformed * 2);

Result<int> firstLevelError = Transform(Result.Error<int>("I don't know"));
Console.WriteLine($"First level: {firstLevelError}");

Result<int> secondLevelError = Transform(Result.Ok(0));
Console.WriteLine($"Second level: {secondLevelError}");
```

``` console --session errorPropagation
First level: Error I don't know
Second level: Error Division by zero

```

Finally you might want to leave the `Result` world, so you have to take care of the error case as well (that's a good thing!). `Match`:

``` cs --region match --source-file Source/DocSamples/ReadmeSamples.cs --project Source/DocSamples/DocSamples.csproj --session match
static Result<int> Ask() => 42;

string whatIsIt =
    Ask().Match(
        answer => $"The answer is: {answer}",
        error => $"Ups: {error}"
    );

Console.WriteLine(whatIsIt);
```

``` console --session match
The answer is: 42

```

Those are basically the four (actually three) main operations on `Result` - `Create`, `Bind`, `Map` and `Match`. There are a lot of overloads and other helpers in FunicularSwitch to avoid repetition of `Result` specific patterns like:

- 'Combine results to Ok if everything is Ok otherwise collect errors' - `Aggregate`, `Map` and `Bind` overloads on collections
- 'Ok if at least one item passes certain validations, otherwise collect info why no one matched' - `FirstOk`
- 'Ok if item from a dictionary was found, otherwise (nice) error' - `TryGetValue` extension on Dictionary
- 'Ok if type T is `as` convertible to T1, error otherwise' - 'As' extension returning Result
- 'Ok if item is valid regarding custom validations, error otherwise' - `Validate`
- 'Async support' - `Map` `Bind` and `Aggregate` overloads with async lambdas and extensions defined on Task<...>
- ...

If you miss functionality it can be added easily by writing your own extension methods. If it is useful for us all don't hesitate to make pull request. Finally a little example demonstrating some of the functionality mentioned above (validation, aggregation, async pipeline). Lets cook:

``` cs --region fruitSalad --source-file Source/DocSamples/ReadmeSamples.cs --project Source/DocSamples/DocSamples.csproj --session fruitSalad
public static async Task FruitSalad()
{
    var stock = ImmutableList.Create(
        new Fruit("Orange", 155),
        new Fruit("Orange", 12),
        new Fruit("Apple", 132),
        new Fruit("Stink fruit", 1));

    var ingredients = ImmutableList.Create("Apple", "Banana", "Pear", "Stink fruit");

    const int cookSkillLevel = 3;

    static IEnumerable<string> CheckFruit(Fruit fruit)
    {
        if (fruit.AgeInDays > 20)
            yield return $"{fruit.Name} is not fresh";

        if (fruit.Name == "Stink fruit")
            yield return "Stink fruit, I do not serve that";
    }

    var salad =
        await ingredients
            .Select(ingredient =>
                stock
                    .Where(fruit => fruit.Name == ingredient)
                    .FirstOk(CheckFruit, onEmpty: () => $"No {ingredient} in stock")
                )
            .Bind(fruits => CutIntoPieces(fruits, cookSkillLevel))
            .Map(Serve);

    Console.WriteLine(salad.Match(ok => "Salad served successfully!", error => $"No salad today:{Environment.NewLine}{error}"));
}

static Result<Salad> CutIntoPieces(IEnumerable<Fruit> fruits, int skillLevel = 5)
{
    try
    {
        return CutFruits(fruits, skillLevel);
    }
    catch (Exception e)
    {
        return Result.Error<Salad>($"Ouch: {e.Message}");
    }
}

static Salad CutFruits(IEnumerable<Fruit> fruits, int skillLevel) => skillLevel > 5 ? new Salad(fruits) : throw new Exception("Cut my fingers");
static Task<Salad> Serve(Salad salad) => Task.FromResult(new Salad(salad.Fruits, true));

class Salad
{
    public IReadOnlyCollection<Fruit> Fruits { get; }
    public bool Served { get; }

    public Salad(IEnumerable<Fruit> fruits, bool served = false)
    {
        Fruits = fruits.ToList();
        Served = served;
    }
}

class Fruit
{
    public string Name { get; }
    public int AgeInDays { get; }

    public Fruit(string name, int ageInDays)
    {
        Name = name;
        AgeInDays = ageInDays;
    }
}
```

``` console --session fruitSalad
No salad today:
Apple is not fresh
No Banana in stock
No Pear in stock
Stink fruit, I do not serve that
```
As you can see, all errors are collected as far as possible. Feel free to play around with the cooks skill level, fruits in stock and the ingredients list to finally get your fruit salad.

# <a name="generators_usage"></a>FunicularSwitch.Generators Usage

*DISCLAIMER*: Right now source generator support in Visual Studio is quite a new feature. Often, especially after adding or updating the generator package intellisense will show errors, even though the code actually compiles. In this cases Visual Studio needs a restart right now (Visual Studio 2022 17.0.5).

## ResultType attribute

After adding the FunicularSwitch.Generators package you can mark a class as result type using the `ResultType` attribute. The class has to be abstract and partial with a single generic argument. Ok and Error cases, Map, Bind, Match and some other methods will be generated so you can use your Result just like the one from the FunicularSwitch package. We recommend using a [UnionType](https://github.com/bluehands/Funicular-Switch#uniontype) as error type but you are free to use any type you want to represent failures.

``` cs
  [FunicularSwitch.Generators.ResultType(ErrorType = typeof(MyCustomError))]
  public abstract partial class Result<T> {}
```

### Exceptions

To turn all exceptions that might happen during your map, bind, validate, etc. calls into error results, write a static conversion method and mark it with the `ExceptionToError` attribute:
``` cs
public static class MyCustomErrorExtension
{
  [FunicularSwitch.Generators.ExceptionToError]
  public static MyCustomError ToGenericError(Exception ex) => ...
}
```
Having the ExceptionToError method, a call like `Ok(42).Map(i => 42 / 0)` will return an error result with an error produced by your custom method instead of throwing a DivisionByZero exception.  

##### Considerations:
Using the `ExceptionToError` attribute is actually a decision that points into a direction that is different from the way Result is implemented in F#, were Result and the correspondind Error type are meant to model expected domain errors (see [fsharpforfunandprofit blog post](https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/)). You will still have to handle exceptions on the highest parts of your system and there is no 'fail fast' because early exceptions always travel through your hole Result chain.

### Combine results

If your errors can be combined, write an attributed extension method or a member method on your error type that combines two errors into one
``` cs
public static class MyCustomErrorExtension
{
  [FunicularSwitch.Generators.MergeError]
  public static MyCustomError Merge(this MyCustomError error, MyCustomError other) => ...
}
```
and a bunch of methods like `Aggregate`, `Validate`, `AllOk`, `FirstOk` and more will appear that make use of the fact that errors can be merged.

##  UnionType attribute

There is another useful generator coming with the package. Adding the `UnionType` attribute to a base record / class or interface makes `Match` extension methods appear for this type. They are also inspired by F# where a match expression has to cover all cases and the compiler helps you with that. Assuming you implemented an error type as a base type and one derived type for every kind of error:

``` cs
[FunicularSwitch.Generators.UnionType]
public abstract class Error{...}

public sealed class NotFound : Error {...}
public sealed class Failure : Error {...}
public sealed class InvalidInput : Error {...}
```

the generator detecting the `[UnionType]` adds Match methods so you can write:

``` cs
static string PrintError(Error error) =>
        error.Match(
                notFound => $"Not found: {notFound.Message}",
                failure => $"Ups, something went wrong: {failure.Message} - {failure.Exception}",
                invalidInput => $"Name was invalid: {invalidInput.Message}"                
            );
```

If you decide to add a case to your Error union all consuming switches break and you never miss a case at runtime!

Match methods are also provided for async case handlers and as extensions on `Task<Error>`.

There are also `Switch` extension methods generated which are the 'void' versions of `Match`, although this is not recommended from a functional point of view :).

``` cs
static void PrintIfNotFound(Error error) =>
        error.Switch(
                notFound => Console.WriteLine($"Not found: {notFound.Message}"),
                failure => { /*ignore*/ },
                invalidInput => { /*ignore*/ }
            );
```

To avoid bad surprises a well defined order of parameters of Match methods is crucial. By default parameters are generated in alphabetical order. This behaviour can be adapted using the `CaseOrder` argument on `UnionType` attribute (FunicularSwitch.Generators namespace omitted):

``` cs
//default
[UnionType(CaseOrder = CaseOrder.Alphabetical)]
public abstract class Error{...}

//useful for union types the define their cases as nested subclasses in a well defined order
[UnionType(CaseOrder = CaseOrder.AsDeclared)]
public abstract class Error{...}

//order defined explicitly. Case sort index with [UnionCase] attribute on derived types is expected (generator warning if missing or ambigous)
[UnionType(CaseOrder = CaseOrder.Explicit)]
public abstract class Error{...}

[UnionCase(index: 0)]
public sealed class NotFound : Error {...}
[UnionCase(index: 20)]
public sealed class Failure : Error {...}
[UnionCase(index: 10)]
public sealed class InvalidInput : Error {...}
```

#### Static factory methods
If your base type is a partial record or class, static factory methods for your derived cases are added: 

``` cs
[UnionType]
public abstract partial record Error;

public record NotFound(int Id, string? Message = "Not found") : Error;
public record InvalidInput(string Message) : Error;

class ExampleConsumer
{
    public static void UseGeneratedFactoryMethods()
    {
        var notFound = Error.NotFound(42); //default value is pulled up to factory methods.
        var invalid = Error.InvalidInput("I don't like it");
    }
}
```

Those factory methods are not generated if they would conflict with an existing field, property or method on the base type. 
So you can always decide to implement them by yourself. Generation of factory methods on a partial base type can be suppressed 
by setting StaticFactoryMethods argument to false: `[UnionType(StaticFactoryMethods=false)]`. Currently default values in 
constructor parameters from namespaces other than System need full qualification.

If you like union types but don't like excessive typing in C# try the [Switchyard](https://github.com/bluehands/Switchyard) Visual Studio extension, which generates the boilerplate code for you. It plays nicely with the FunicularSwitch.Generators package.

## ExtendedEnum attribute

The `ExtendedEnum` attribute works like `UnionType` but for enums:

``` cs
[FunicularSwitch.Generators.ExtendedEnum]
public enum PlatformIdentifier
{
    LinuxDevice,
    DeveloperMachine,
    WindowsDevice
}
```

the generator detecting the `[ExtendedEnum]` adds Match methods so you can write:

``` cs
var isGraphicalLinux = PlatformIdentifier.LinuxDevice
    .Match(
        developerMachine: () => false,
        linuxDevice: () => true,
        windowsDevice: () => true
    );
```

The default case order for `ExtendedEnum` is AsDeclared. To avoid problems with changing case orders, one should always use named parameters in Match and Switch calls!

To generate Match extensions for all types in an assembly use the `ExtendEnums` attribute. Flags enums an enums with duplicate values are omitted:

``` cs
//generate internal Match extension methods for all enums in System (Containing assembly of System.DateTime). 
[assembly: ExtendEnums(typeof(System.DateTime), Accessibility = ExtensionAccessibility.Internal)]

//shortcut to generate Match extension methods for all enums in current assembly
[assembly: ExtendEnums]
```

To generate Match extensions for a specific type in an assembly write:

```
[assembly: ExtendEnum(typeof(DateTimeKind), CaseOrder = EnumCaseOrder.Alphabetic)]
```

### Additional documentation

[Tutorial markdown](https://github.com/bluehands/Funicular-Switch/blob/main/TUTORIAL.md)

[Tutorial source](https://github.com/bluehands/Funicular-Switch/tree/main/Source/Tutorial)

# Contributing

We're looking forward to pull requests.

# Versioning

We use [SemVer](http://semver.org/) for versioning.

# Authors

bluehands.de

# License

[MIT License](https://github.com/bluehands/Funicular-Switch/blob/main/LICENSE)

# Acknowledgments

[F# for fun and profit: Railway Oriented Programming](https://fsharpforfunandprofit.com/rop/)

[F# for fun and profit: Map and Bind and Apply, Oh my!](https://fsharpforfunandprofit.com/series/map-and-bind-and-apply-oh-my.html)



:::

### About
:::note

Generating discriminated unions for C# 9.0 and above.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **FunicularSwitch**
```xml showLineNumbers {19}
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
	  <PackageReference Include="FunicularSwitch" Version="5.0.1" />
	  <PackageReference Include="FunicularSwitch.Generators" Version="3.2.0">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\Program.cs" label="Program.cs" >

  This is the use of **FunicularSwitch** in *Program.cs*

```csharp showLineNumbers 
using Union;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);

Console.WriteLine(data.Match(
    ok => true,
    error => false));
data = SaveToDatabase.Save(1);
Console.WriteLine(data.Match(ok => true, error => false));

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\ResultSave.cs" label="ResultSave.cs" >

  This is the use of **FunicularSwitch** in *ResultSave.cs*

```csharp showLineNumbers 
namespace Union;

[FunicularSwitch.Generators.ResultType(ErrorType = typeof(ErrorDetails))]
public abstract partial class ResultSave<T> { };

public class ErrorDetails
{
    
}



    //[FunicularSwitch.Generators.UnionType]
    //public abstract partial class ResultSave { };

    //public sealed partial record Success(int Value): ResultSave;
    //public sealed partial record ValidationError(string Message):ResultSave;

    ////public sealed partial record Ok(T Value) : ResultSave<T>;

    ////public sealed partial record Error(Exception Exception) : ResultSave<T>;

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\SaveToDatabase.cs" label="SaveToDatabase.cs" >

  This is the use of **FunicularSwitch** in *SaveToDatabase.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Union;
internal class SaveToDatabase
{
    public static ResultSave<int> Save(int i)
    {
        if (i == 0)
        {
            return new ResultSave<int>.Error_(new ErrorDetails());
        }
        return new ResultSave<int>.Ok_(i);
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\obj\GX\FunicularSwitch.Generators\FunicularSwitch.Generators.EnumTypeGenerator\Attributes.g.cs" label="Attributes.g.cs" >


```csharp showLineNumbers 
using System;

// ReSharper disable once CheckNamespace
namespace FunicularSwitch.Generators
{
    [AttributeUsage(AttributeTargets.Enum)]
    sealed class ExtendedEnumAttribute : Attribute
    {
	    public EnumCaseOrder CaseOrder { get; set; } = EnumCaseOrder.AsDeclared;
	    public ExtensionAccessibility Accessibility { get; set; } = ExtensionAccessibility.Public;
    }
    
    enum EnumCaseOrder
    {
        Alphabetic,
        AsDeclared
    }

    /// <summary>
    /// Generate match methods for all enums defined in assembly that contains AssemblySpecifier.
    /// </summary>
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true)]
    class ExtendEnumsAttribute : Attribute
    {
	    public Type AssemblySpecifier { get; }
	    public EnumCaseOrder CaseOrder { get; set; } = EnumCaseOrder.AsDeclared;
	    public ExtensionAccessibility Accessibility { get; set; } = ExtensionAccessibility.Public;

	    public ExtendEnumsAttribute() => AssemblySpecifier = typeof(ExtendEnumsAttribute);

	    public ExtendEnumsAttribute(Type assemblySpecifier)
	    {
		    AssemblySpecifier = assemblySpecifier;
	    }
    }

    /// <summary>
    /// Generate match methods for Type. Must be enum.
    /// </summary>
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true)]
    class ExtendEnumAttribute : Attribute
    {
	    public Type Type { get; }

	    public EnumCaseOrder CaseOrder { get; set; } = EnumCaseOrder.AsDeclared;

	    public ExtensionAccessibility Accessibility { get; set; } = ExtensionAccessibility.Public;

	    public ExtendEnumAttribute(Type type)
	    {
		    Type = type;
	    }
    }

    enum ExtensionAccessibility
    {
	    Internal,
	    Public
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\obj\GX\FunicularSwitch.Generators\FunicularSwitch.Generators.ResultTypeGenerator\Attributes.g.cs" label="Attributes.g.cs" >


```csharp showLineNumbers 
using System;

// ReSharper disable once CheckNamespace
namespace FunicularSwitch.Generators
{
	/// <summary>
	/// Mark an abstract partial type with a single generic argument with the ResultType attribute.
	/// This type from now on has Ok | Error semantics with map and bind operations.
	/// </summary>
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    sealed class ResultTypeAttribute : Attribute
    {
        public ResultTypeAttribute() => ErrorType = typeof(string);
        public ResultTypeAttribute(Type errorType) => ErrorType = errorType;

        public Type ErrorType { get; set; }
    }

    /// <summary>
    /// Mark a static method or a member method or you error type with the MergeErrorAttribute attribute.
    /// Static signature: TError -> TError -> TError. Member signature: TError -> TError
    /// We are now able to collect errors and methods like Validate, Aggregate, FirstOk that are useful to combine results are generated.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    sealed class MergeErrorAttribute : Attribute
    {
    }

    /// <summary>
    /// Mark a static method with the ExceptionToError attribute.
    /// Signature: Exception -> TError
    /// This method is always called, when an exception happens in a bind operation.
    /// So a call like result.Map(i => i/0) will return an Error produced by the factory method instead of throwing the DivisionByZero exception.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    sealed class ExceptionToError : Attribute
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\obj\GX\FunicularSwitch.Generators\FunicularSwitch.Generators.ResultTypeGenerator\Union.ResultSave.g.cs" label="Union.ResultSave.g.cs" >


```csharp showLineNumbers 
#nullable enable
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunicularSwitch;

namespace Union
{
#pragma warning disable 1591
    public abstract partial class ResultSave
    {
        public static ResultSave<T> Error<T>(ErrorDetails details) => new ResultSave<T>.Error_(details);
        public static ResultSave<T> Ok<T>(T value) => new ResultSave<T>.Ok_(value);
        public bool IsError => GetType().GetGenericTypeDefinition() == typeof(ResultSave<>.Error_);
        public bool IsOk => !IsError;
        public abstract ErrorDetails? GetErrorOrDefault();

        public static ResultSave<T> Try<T>(Func<T> action, Func<Exception, ErrorDetails> formatError)
        {
            try
            {
                return action();
            }
            catch (Exception e)
            {
                return Error<T>(formatError(e));
            }
        }

        public static async Task<ResultSave<T>> Try<T>(Func<Task<T>> action, Func<Exception, ErrorDetails> formatError)
        {
            try
            {
                return await action();
            }
            catch (Exception e)
            {
                return Error<T>(formatError(e));
            }
        }
    }

    public abstract partial class ResultSave<T> : ResultSave, IEnumerable<T>
    {
        public static ResultSave<T> Error(ErrorDetails message) => Error<T>(message);
        public static ResultSave<T> Ok(T value) => Ok<T>(value);

        public static implicit operator ResultSave<T>(T value) => ResultSave.Ok(value);

        public static bool operator true(ResultSave<T> result) => result.IsOk;
        public static bool operator false(ResultSave<T> result) => result.IsError;

        public static bool operator !(ResultSave<T> result) => result.IsError;

        //just here to suppress warning, never called because all subtypes (Ok_, Error_) implement Equals and GetHashCode
        bool Equals(ResultSave<T> other) => this switch
        {
            Ok_ ok => ok.Equals((object)other),
            Error_ error => error.Equals((object)other),
            _ => throw new InvalidOperationException($"Unexpected type derived from {nameof(ResultSave<T>)}")
        };

        public override int GetHashCode() => this switch
        {
            Ok_ ok => ok.GetHashCode(),
            Error_ error => error.GetHashCode(),
            _ => throw new InvalidOperationException($"Unexpected type derived from {nameof(ResultSave<T>)}")
        };

        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((ResultSave<T>)obj);
        }

        public static bool operator ==(ResultSave<T>? left, ResultSave<T>? right) => Equals(left, right);

        public static bool operator !=(ResultSave<T>? left, ResultSave<T>? right) => !Equals(left, right);

        public void Match(Action<T> ok, Action<ErrorDetails>? error = null) => Match(
            v =>
            {
                ok.Invoke(v);
                return 42;
            },
            err =>
            {
                error?.Invoke(err);
                return 42;
            });

        public T1 Match<T1>(Func<T, T1> ok, Func<ErrorDetails, T1> error)
        {
            return this switch
            {
                Ok_ okResultSave => ok(okResultSave.Value),
                Error_ errorResultSave => error(errorResultSave.Details),
                _ => throw new InvalidOperationException($"Unexpected derived result type: {GetType()}")
            };
        }

        public async Task<T1> Match<T1>(Func<T, Task<T1>> ok, Func<ErrorDetails, Task<T1>> error)
        {
            return this switch
            {
                Ok_ okResultSave => await ok(okResultSave.Value).ConfigureAwait(false),
                Error_ errorResultSave => await error(errorResultSave.Details).ConfigureAwait(false),
                _ => throw new InvalidOperationException($"Unexpected derived result type: {GetType()}")
            };
        }

        public Task<T1> Match<T1>(Func<T, Task<T1>> ok, Func<ErrorDetails, T1> error) =>
            Match(ok, e => Task.FromResult(error(e)));

        public async Task Match(Func<T, Task> ok)
        {
            if (this is Ok_ okResultSave) await ok(okResultSave.Value).ConfigureAwait(false);
        }

        public T Match(Func<ErrorDetails, T> error) => Match(v => v, error);

        public ResultSave<T1> Bind<T1>(Func<T, ResultSave<T1>> bind)
        {
            switch (this)
            {
                case Ok_ ok:
	                try
	                {
		                return bind(ok.Value);
	                }
	                // ReSharper disable once RedundantCatchClause
#pragma warning disable CS0168 // Variable is declared but never used
	                catch (Exception e)
#pragma warning restore CS0168 // Variable is declared but never used
	                {
		                throw; //createGenericErrorResult
	                }
                case Error_ error:
                    return error.Convert<T1>();
                default:
                    throw new InvalidOperationException($"Unexpected derived result type: {GetType()}");
            }
        }

        public async Task<ResultSave<T1>> Bind<T1>(Func<T, Task<ResultSave<T1>>> bind)
        {
            switch (this)
            {
                case Ok_ ok:
	                try
	                {
		                return await bind(ok.Value).ConfigureAwait(false);
	                }
	                // ReSharper disable once RedundantCatchClause
#pragma warning disable CS0168 // Variable is declared but never used
	                catch (Exception e)
#pragma warning restore CS0168 // Variable is declared but never used
	                {
		                throw; //createGenericErrorResult
	                }
                case Error_ error:
                    return error.Convert<T1>();
                default:
                    throw new InvalidOperationException($"Unexpected derived result type: {GetType()}");
            }
        }

        public ResultSave<T1> Map<T1>(Func<T, T1> map)
            => Bind(value => Ok(map(value)));

        public Task<ResultSave<T1>> Map<T1>(Func<T, Task<T1>> map)
            => Bind(async value => Ok(await map(value).ConfigureAwait(false)));

        public T? GetValueOrDefault()
	        => Match(
		        v => (T?)v,
		        _ => default
	        );

        public T GetValueOrDefault(Func<T> defaultValue)
	        => Match(
		        v => v,
		        _ => defaultValue()
	        );

        public T GetValueOrDefault(T defaultValue)
	        => Match(
		        v => v,
		        _ => defaultValue
	        );

        public T GetValueOrThrow()
            => Match(
                v => v,
                details => throw new InvalidOperationException($"Cannot access error result value. Error: {details}"));

        public IEnumerator<T> GetEnumerator() => Match(ok => new[] { ok }, _ => Enumerable.Empty<T>()).GetEnumerator();

        public override string ToString() => Match(ok => $"Ok {ok?.ToString()}", error => $"Error {error}");
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public sealed partial class Ok_ : ResultSave<T>
        {
            public T Value { get; }

            public Ok_(T value) => Value = value;

            public override ErrorDetails? GetErrorOrDefault() => null;

            public bool Equals(Ok_? other)
            {
                if (ReferenceEquals(null, other)) return false;
                if (ReferenceEquals(this, other)) return true;
                return EqualityComparer<T>.Default.Equals(Value, other.Value);
            }

            public override bool Equals(object? obj)
            {
                if (ReferenceEquals(null, obj)) return false;
                if (ReferenceEquals(this, obj)) return true;
                return obj is Ok_ other && Equals(other);
            }

            public override int GetHashCode() => Value == null ? 0 : EqualityComparer<T>.Default.GetHashCode(Value);

            public static bool operator ==(Ok_ left, Ok_ right) => Equals(left, right);

            public static bool operator !=(Ok_ left, Ok_ right) => !Equals(left, right);
        }

        public sealed partial class Error_ : ResultSave<T>
        {
            public ErrorDetails Details { get; }

            public Error_(ErrorDetails details) => Details = details;

            public ResultSave<T1>.Error_ Convert<T1>() => new ResultSave<T1>.Error_(Details);

            public override ErrorDetails? GetErrorOrDefault() => Details;

            public bool Equals(Error_? other)
            {
                if (ReferenceEquals(null, other)) return false;
                if (ReferenceEquals(this, other)) return true;
                return Equals(Details, other.Details);
            }

            public override bool Equals(object? obj)
            {
                if (ReferenceEquals(null, obj)) return false;
                if (ReferenceEquals(this, obj)) return true;
                return obj is Error_ other && Equals(other);
            }

            public override int GetHashCode() => Details.GetHashCode();

            public static bool operator ==(Error_ left, Error_ right) => Equals(left, right);

            public static bool operator !=(Error_ left, Error_ right) => !Equals(left, right);
        }

    }

    public static partial class ResultSaveExtension
    {
        #region bind

        public static async Task<ResultSave<T1>> Bind<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, ResultSave<T1>> bind)
            => (await result.ConfigureAwait(false)).Bind(bind);

        public static async Task<ResultSave<T1>> Bind<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, Task<ResultSave<T1>>> bind)
            => await (await result.ConfigureAwait(false)).Bind(bind).ConfigureAwait(false);

        #endregion

        #region map

        public static async Task<ResultSave<T1>> Map<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, T1> map)
            => (await result.ConfigureAwait(false)).Map(map);

        public static Task<ResultSave<T1>> Map<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, Task<T1>> bind)
            => Bind(result, async v => ResultSave.Ok(await bind(v).ConfigureAwait(false)));

        public static ResultSave<T> MapError<T>(this ResultSave<T> result, Func<ErrorDetails, ErrorDetails> mapError) =>
            result.Match(ok => ok, error => ResultSave.Error<T>(mapError(error)));

        #endregion

        #region match

        public static async Task<T1> Match<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, Task<T1>> ok,
            Func<ErrorDetails, Task<T1>> error)
            => await (await result.ConfigureAwait(false)).Match(ok, error).ConfigureAwait(false);

        public static async Task<T1> Match<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, Task<T1>> ok,
            Func<ErrorDetails, T1> error)
            => await (await result.ConfigureAwait(false)).Match(ok, error).ConfigureAwait(false);

        public static async Task<T1> Match<T, T1>(
            this Task<ResultSave<T>> result,
            Func<T, T1> ok,
            Func<ErrorDetails, T1> error)
            => (await result.ConfigureAwait(false)).Match(ok, error);

        #endregion

        public static ResultSave<T> Flatten<T>(this ResultSave<ResultSave<T>> result) => result.Bind(r => r);

        public static ResultSave<T1> As<T, T1>(this ResultSave<T> result, Func<ErrorDetails> errorTIsNotT1) =>
            result.Bind(r =>
            {
                if (r is T1 converted)
                    return converted;
                return ResultSave.Error<T1>(errorTIsNotT1());
            });

        public static ResultSave<T1> As<T1>(this ResultSave<object> result, Func<ErrorDetails> errorIsNotT1) =>
            result.As<object, T1>(errorIsNotT1);
        
        #region query-expression pattern
        
        public static ResultSave<T1> Select<T, T1>(this ResultSave<T> result, Func<T, T1> selector) => result.Map(selector);
        public static Task<ResultSave<T1>> Select<T, T1>(this Task<ResultSave<T>> result, Func<T, T1> selector) => result.Map(selector);
        
        public static ResultSave<T2> SelectMany<T, T1, T2>(this ResultSave<T> result, Func<T, ResultSave<T1>> selector, Func<T, T1, T2> resultSelector) => result.Bind(t => selector(t).Map(t1 => resultSelector(t, t1)));
        public static Task<ResultSave<T2>> SelectMany<T, T1, T2>(this Task<ResultSave<T>> result, Func<T, Task<ResultSave<T1>>> selector, Func<T, T1, T2> resultSelector) => result.Bind(t => selector(t).Map(t1 => resultSelector(t, t1)));
        public static Task<ResultSave<T2>> SelectMany<T, T1, T2>(this Task<ResultSave<T>> result, Func<T, ResultSave<T1>> selector, Func<T, T1, T2> resultSelector) => result.Bind(t => selector(t).Map(t1 => resultSelector(t, t1)));
        public static Task<ResultSave<T2>> SelectMany<T, T1, T2>(this ResultSave<T> result, Func<T, Task<ResultSave<T1>>> selector, Func<T, T1, T2> resultSelector) => result.Bind(t => selector(t).Map(t1 => resultSelector(t, t1)));

        #endregion
    }
}

namespace Union.Extensions
{
    public static partial class ResultSaveExtension
    {
        public static IEnumerable<T1> Choose<T, T1>(
            this IEnumerable<T> items,
            Func<T, ResultSave<T1>> choose,
            Action<ErrorDetails> onError)
            => items
                .Select(i => choose(i))
                .Choose(onError);

        public static IEnumerable<T> Choose<T>(
            this IEnumerable<ResultSave<T>> results,
            Action<ErrorDetails> onError)
            => results
                .Where(r =>
                    r.Match(_ => true, error =>
                    {
                        onError(error);
                        return false;
                    }))
                .Select(r => r.GetValueOrThrow());

        public static ResultSave<T> As<T>(this object item, Func<ErrorDetails> error) =>
            !(item is T t) ? ResultSave.Error<T>(error()) : t;

        public static ResultSave<T> NotNull<T>(this T? item, Func<ErrorDetails> error) =>
            item ?? ResultSave.Error<T>(error());

        public static ResultSave<string> NotNullOrEmpty(this string? s, Func<ErrorDetails> error)
            => string.IsNullOrEmpty(s) ? ResultSave.Error<string>(error()) : s!;

        public static ResultSave<string> NotNullOrWhiteSpace(this string? s, Func<ErrorDetails> error)
            => string.IsNullOrWhiteSpace(s) ? ResultSave.Error<string>(error()) : s!;

        public static ResultSave<T> First<T>(this IEnumerable<T> candidates, Func<T, bool> predicate, Func<ErrorDetails> noMatch) =>
            candidates
                .FirstOrDefault(i => predicate(i))
                .NotNull(noMatch);
    }
#pragma warning restore 1591
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FunicularSwitch\src\Union\obj\GX\FunicularSwitch.Generators\FunicularSwitch.Generators.UnionTypeGenerator\Attributes.g.cs" label="Attributes.g.cs" >


```csharp showLineNumbers 
using System;

// ReSharper disable once CheckNamespace
namespace FunicularSwitch.Generators
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, Inherited = false)]
    sealed class UnionTypeAttribute : Attribute
    {
        public CaseOrder CaseOrder { get; set; } = CaseOrder.Alphabetic;
        public bool StaticFactoryMethods { get; set; } = true;
    }

    enum CaseOrder
    {
        Alphabetic,
        AsDeclared,
        Explicit
    }

    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    sealed class UnionCaseAttribute : Attribute
    {
        public UnionCaseAttribute(int index) => Index = index;

        public int Index { get; }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project FunicularSwitch ](/sources/FunicularSwitch.zip)

:::


### Share FunicularSwitch 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFunicularSwitch&quote=FunicularSwitch" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFunicularSwitch&text=FunicularSwitch:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFunicularSwitch" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFunicularSwitch&title=FunicularSwitch" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFunicularSwitch&title=FunicularSwitch&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFunicularSwitch" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/FunicularSwitch

## In the same category (FunctionalProgramming)


### [dunet](/docs/dunet)


### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


### [N.SourceGenerators.UnionTypes](/docs/N.SourceGenerators.UnionTypes)


### [OneOf](/docs/OneOf)


### [PartiallyApplied](/docs/PartiallyApplied)


### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)

