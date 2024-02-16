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

