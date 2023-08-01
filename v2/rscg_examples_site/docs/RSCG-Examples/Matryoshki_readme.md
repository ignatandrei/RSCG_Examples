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