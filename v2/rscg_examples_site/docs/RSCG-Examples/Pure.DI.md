---
sidebar_position: 1800
title: 180 - Pure.DI
description: Constructing injecting container
slug: /Pure.DI
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Pure.DI  by Nikolay Pianikov


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Pure.DI?label=Pure.DI)](https://www.nuget.org/packages/Pure.DI/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DevTeam/Pure.DI?label=updated)](https://github.com/DevTeam/Pure.DI)
![GitHub Repo stars](https://img.shields.io/github/stars/DevTeam/Pure.DI?style=social)

## Details

### Info
:::info

Name: **Pure.DI**



Author: Nikolay Pianikov

NuGet: 
*https://www.nuget.org/packages/Pure.DI/*   


You can find more details at https://github.com/DevTeam/Pure.DI

Source : https://github.com/DevTeam/Pure.DI

:::

### Original Readme
:::note

# Pure DI for .NET

<a href="https://t.me/pure_di"><img src="https://github.com/DevTeam/Pure.DI/blob/master/readme/telegram.png" align="left" height="20" width="20" /></a>
[![NuGet](https://img.shields.io/nuget/v/Pure.DI)](https://www.nuget.org/packages/Pure.DI)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/DevTeam/Pure.DI/LICENSE)
[![Build](https://teamcity.jetbrains.com/app/rest/builds/buildType:(id:OpenSourceProjects_DevTeam_PureDi_BuildAndTestBuildType)/statusIcon)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_DevTeam_PureDi_BuildAndTestBuildType&guest=1)
[![Performance Build](https://teamcity.jetbrains.com/app/rest/builds/buildType:(id:OpenSourceProjects_DevTeam_PureDi_PerformanceTests)/statusIcon)](https://teamcity.jetbrains.com/viewType.html?buildTypeId=OpenSourceProjects_DevTeam_PureDi_PerformanceTests&guest=1)
![GitHub Build](https://github.com/DevTeam/Pure.DI/actions/workflows/main.yml/badge.svg)

![](https://github.com/DevTeam/Pure.DI/readme/di.gif)

_Supports .NET starting with [.NET Framework 2.0](https://www.microsoft.com/en-us/download/details.aspx?id=6041), released 2005-10-27, and all newer versions._

## Usage requirements

- [.NET SDK 6.0.4](https://dotnet.microsoft.com/download/dotnet/6.0) or later is installed. At the same time, you can develop .NET projects even for older versions like .NET Framework 2.0

- [C# 8](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history#c-version-80) or later. This requirement only needs to be met for projects that reference the _Pure.DI_ source code generator, other projects can use any version of C#.

## Key features

Pure.DI is not a framework or library, but a source code generator for creating object graphs. To make them accurate, the developer uses a set of intuitive hints from the Pure.DI API. During the compilation phase, Pure.DI determines the optimal graph structure, checks its correctness, and generates partial class code to create object graphs in the Pure DI paradigm using only basic language constructs. The resulting generated code is robust, works everywhere, throws no exceptions, does not depend on .NET library calls or .NET reflections, is efficient in terms of performance and memory consumption, and is subject to all optimizations. This code can be easily integrated into an application because it does not use unnecessary delegates, additional calls to any methods, type conversions, boxing/unboxing, etc.

- [X] DI without any IoC/DI containers, frameworks, dependencies and hence no performance impact or side effects. 
  >_Pure.DI_ is actually a [.NET code generator](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview). It uses basic language constructs to create simple code as well as if you were doing it yourself: de facto it's just a bunch of nested constructor calls. This code can be viewed, analyzed at any time, and debugged.
- [X] A predictable and verified dependency graph is built and validated on the fly while writing code.
  >All logic for analyzing the graph of objects, constructors and methods takes place at compile time. _Pure.DI_ notifies the developer at compile time of missing or cyclic dependencies, cases when some dependencies are not suitable for injection, etc. The developer has no chance to get a program that will crash at runtime because of some exception related to incorrect object graph construction. All this magic happens at the same time as the code is written, so you have instant feedback between the fact that you have made changes to your code and the fact that your code is already tested and ready to use.
- [X] Does not add any dependencies to other assemblies.
  >When using pure DI, no dependencies are added to assemblies because only basic language constructs and nothing more are used.
- [X] Highest performance, including compiler and JIT optimization and minimal memory consumption.
  >All generated code runs as fast as your own, in pure DI style, including compile-time and run-time optimization. As mentioned above, graph analysis is done at compile time, and at runtime there are only a bunch of nested constructors, and that's it. Memory is spent only on the object graph being created.
- [X] It works everywhere.
  >Since the pure DI approach does not use any dependencies or [.NET reflection](https://docs.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/reflection) at runtime, it does not prevent the code from running as expected on any platform: Full .NET Framework 2.0+, .NET Core, .NET, UWP/XBOX, .NET IoT, Xamarin, Native AOT, etc.
- [X] Ease of Use.
  >The _Pure.DI_ API is very similar to the API of most IoC/DI libraries. And this was a conscious decision: the main reason is that programmers don't need to learn a new API.
- [X] Superfine customization of generic types.
  >In _Pure.DI_ it is proposed to use special marker types instead of using open generic types. This allows you to build the object graph more accurately and take full advantage of generic types.
- [X] Supports the major .NET BCL types out of the box.
  >_Pure.DI_ already [supports](#base-class-library) many of [BCL types](https://docs.microsoft.com/en-us/dotnet/standard/framework-libraries#base-class-libraries) like `Array`, `IEnumerable<T>`, `IList<T>`, `IReadOnlyCollection<T>`, `IReadOnlyList<T>`, `ISet<T>`, `IProducerConsumerCollection<T>`, `ConcurrentBag<T>`, `Func<T>`, `ThreadLocal`, `ValueTask<T>`, `Task<T>`, `MemoryPool<T>`, `ArrayPool<T>`, `ReadOnlyMemory<T>`, `Memory<T>`, `ReadOnlySpan<T>`, `Span<T>`, `IComparer<T>`, `IEqualityComparer<T>` and etc. without any extra effort.
- [X] Good for building libraries or frameworks where resource consumption is particularly critical.
  >Its high performance, zero memory consumption/preparation overhead, and lack of dependencies make it ideal for building libraries and frameworks.
![](https://github.com/DevTeam/Pure.DI/di.gif)

## Schrödinger's cat will demonstrate how it all works [![CSharp](https://img.shields.io/badge/C%23-code-blue.svg)](https://github.com/DevTeam/Pure.DI/samples/ShroedingersCat)

### The reality is

![Cat](https://github.com/DevTeam/Pure.DI/readme/cat.png?raw=true)

### Let's create an abstraction

```c#
interface IBox<out T>
{
    T Content { get; }
}

interface ICat
{
    State State { get; }
}

enum State { Alive, Dead }
```

### Here's our implementation

```c#
record CardboardBox<T>(T Content): IBox<T>;

class ShroedingersCat(Lazy<State> superposition): ICat
{
    // The decoherence of the superposition
    // at the time of observation via an irreversible process
    public State State => superposition.Value;
}
```

> [!IMPORTANT]
> Our abstraction and implementation knows nothing about the magic of DI or any frameworks.

### Let's glue it all together

Add the _Pure.DI_ package to your project:

[![NuGet](https://img.shields.io/nuget/v/Pure.DI)](https://www.nuget.org/packages/Pure.DI)

Let's bind the abstractions to their implementations and set up the creation of the object graph:

```c#
DI.Setup(nameof(Composition))
    // Models a random subatomic event that may or may not occur
    .Bind().As(Singleton).To<Random>()
    // Quantum superposition of two states: Alive or Dead
    .Bind().To((Random random) => (State)random.Next(2))
    .Bind().To<ShroedingersCat>()
    // Cardboard box with any contents
    .Bind().To<CardboardBox<TT>>()
    // Composition Root
    .Root<Program>("Root");
```

> [!NOTE]
> In fact, the `Bind().As(Singleton).To<Random>()` binding is unnecessary since _Pure.DI_ supports many .NET BCL types out of the box, including [Random](https://github.com/DevTeam/Pure.DI/blob/27a1ccd604b2fdd55f6bfec01c24c86428ddfdcb/src/Pure.DI.Core/Features/Default.g.cs#L289). It was added just for the example of using the _Singleton_ lifetime.

The above code specifies the generation of a partial class named *__Composition__*, this name is defined in the `DI.Setup(nameof(Composition))` call. This class contains a *__Root__* property that returns a graph of objects with an object of type *__Program__* as the root. The type and name of the property is defined by calling `Root<Program>("Root")`. The code of the generated class looks as follows:

```c#
partial class Composition
{
    private Lock _lock = new Lock();
    private Random? _random;
    
    public Program Root
    {
      [MethodImpl(MethodImplOptions.AggressiveInlining)]
      get
      {
        var stateFunc = new Func<State>(() => {
              if (_random is null)
                using (_lock.EnterScope())
                  if (_random is null)
                    _random = new Random();

              return (State)_random.Next(2)
            });

        return new Program(
          new CardboardBox<ICat>(
            new ShroedingersCat(
              new Lazy<State>(
                stateFunc))));    
      }
    }

    public T Resolve<T>() { ... }

    public object Resolve(Type type) { ... }
}
```

Obviously, this code does not depend on other libraries, does not use type reflection or any other tricks that can negatively affect performance and memory consumption. It looks like an efficient code written by hand. At any given time, you can study it and understand how it works.

The `public Program Root { get; }` property here is a [*__Composition Root__*](https://blog.ploeh.dk/2011/07/28/CompositionRoot/), the only place in the application where the composition of the object graph for the application takes place. Each instance is created by only basic language constructs, which compiles with all optimizations with minimal impact on performance and memory consumption. In general, applications may have multiple composition roots and thus such properties. Each composition root must have its own unique name, which is defined when the `Root<T>(string name)` method is called, as shown in the above code.

### Time to open boxes!

```c#
class Program(IBox<ICat> box)
{
  // Composition Root, a single place in an application
  // where the composition of the object graphs
  // for an application take place
  static void Main() => new Composition().Root.Run();

  private void Run() => Console.WriteLine(box);
}
```

_Pure.DI_ creates efficient code in a pure DI paradigm, using only basic language constructs as if you were writing code by hand. This allows you to take full advantage of Dependency Injection everywhere and always, without any compromise!

The full analog of this application with top-level statements can be found [here](https://github.com/DevTeam/Pure.DI/samples/ShroedingersCatTopLevelStatements).

<details>
<summary>Just try creating a project from scratch!</summary>

Install the [projects template](https://www.nuget.org/packages/Pure.DI.Templates)

```shell
dotnet new install Pure.DI.Templates
```

In some directory, create a console application

```shell
dotnet new di
```

And run it

```shell
dotnet run
```

</details>


## Examples

### Basics
- [Auto-bindings](https://github.com/DevTeam/Pure.DI/readme/auto-bindings.md)
- [Injections of abstractions](https://github.com/DevTeam/Pure.DI/readme/injections-of-abstractions.md)
- [Composition roots](https://github.com/DevTeam/Pure.DI/readme/composition-roots.md)
- [Resolve methods](https://github.com/DevTeam/Pure.DI/readme/resolve-methods.md)
- [Simplified binding](https://github.com/DevTeam/Pure.DI/readme/simplified-binding.md)
- [Factory](https://github.com/DevTeam/Pure.DI/readme/factory.md)
- [Simplified factory](https://github.com/DevTeam/Pure.DI/readme/simplified-factory.md)
- [Class arguments](https://github.com/DevTeam/Pure.DI/readme/class-arguments.md)
- [Root arguments](https://github.com/DevTeam/Pure.DI/readme/root-arguments.md)
- [Tags](https://github.com/DevTeam/Pure.DI/readme/tags.md)
- [Smart tags](https://github.com/DevTeam/Pure.DI/readme/smart-tags.md)
- [Build up of an existing object](https://github.com/DevTeam/Pure.DI/readme/build-up-of-an-existing-object.md)
- [Field injection](https://github.com/DevTeam/Pure.DI/readme/field-injection.md)
- [Method injection](https://github.com/DevTeam/Pure.DI/readme/method-injection.md)
- [Property injection](https://github.com/DevTeam/Pure.DI/readme/property-injection.md)
- [Default values](https://github.com/DevTeam/Pure.DI/readme/default-values.md)
- [Required properties or fields](https://github.com/DevTeam/Pure.DI/readme/required-properties-or-fields.md)
- [Root binding](https://github.com/DevTeam/Pure.DI/readme/root-binding.md)
- [Async Root](https://github.com/DevTeam/Pure.DI/readme/async-root.md)
- [Consumer types](https://github.com/DevTeam/Pure.DI/readme/consumer-types.md)
### Lifetimes
- [Transient](https://github.com/DevTeam/Pure.DI/readme/transient.md)
- [Singleton](https://github.com/DevTeam/Pure.DI/readme/singleton.md)
- [PerResolve](https://github.com/DevTeam/Pure.DI/readme/perresolve.md)
- [PerBlock](https://github.com/DevTeam/Pure.DI/readme/perblock.md)
- [Scope](https://github.com/DevTeam/Pure.DI/readme/scope.md)
- [Auto scoped](https://github.com/DevTeam/Pure.DI/readme/auto-scoped.md)
- [Default lifetime](https://github.com/DevTeam/Pure.DI/readme/default-lifetime.md)
- [Default lifetime for a type](https://github.com/DevTeam/Pure.DI/readme/default-lifetime-for-a-type.md)
- [Default lifetime for a type and a tag](https://github.com/DevTeam/Pure.DI/readme/default-lifetime-for-a-type-and-a-tag.md)
- [Disposable singleton](https://github.com/DevTeam/Pure.DI/readme/disposable-singleton.md)
- [Async disposable singleton](https://github.com/DevTeam/Pure.DI/readme/async-disposable-singleton.md)
- [Async disposable scope](https://github.com/DevTeam/Pure.DI/readme/async-disposable-scope.md)
### Base Class Library
- [Func](https://github.com/DevTeam/Pure.DI/readme/func.md)
- [Enumerable](https://github.com/DevTeam/Pure.DI/readme/enumerable.md)
- [Enumerable generics](https://github.com/DevTeam/Pure.DI/readme/enumerable-generics.md)
- [Array](https://github.com/DevTeam/Pure.DI/readme/array.md)
- [Lazy](https://github.com/DevTeam/Pure.DI/readme/lazy.md)
- [Task](https://github.com/DevTeam/Pure.DI/readme/task.md)
- [ValueTask](https://github.com/DevTeam/Pure.DI/readme/valuetask.md)
- [Manually started tasks](https://github.com/DevTeam/Pure.DI/readme/manually-started-tasks.md)
- [Span and ReadOnlySpan](https://github.com/DevTeam/Pure.DI/readme/span-and-readonlyspan.md)
- [Tuple](https://github.com/DevTeam/Pure.DI/readme/tuple.md)
- [Weak Reference](https://github.com/DevTeam/Pure.DI/readme/weak-reference.md)
- [Async Enumerable](https://github.com/DevTeam/Pure.DI/readme/async-enumerable.md)
- [Service collection](https://github.com/DevTeam/Pure.DI/readme/service-collection.md)
- [Func with arguments](https://github.com/DevTeam/Pure.DI/readme/func-with-arguments.md)
- [Func with tag](https://github.com/DevTeam/Pure.DI/readme/func-with-tag.md)
- [Keyed service provider](https://github.com/DevTeam/Pure.DI/readme/keyed-service-provider.md)
- [Service provider](https://github.com/DevTeam/Pure.DI/readme/service-provider.md)
- [Service provider with scope](https://github.com/DevTeam/Pure.DI/readme/service-provider-with-scope.md)
- [Overriding the BCL binding](https://github.com/DevTeam/Pure.DI/readme/overriding-the-bcl-binding.md)
### Generics
- [Generics](https://github.com/DevTeam/Pure.DI/readme/generics.md)
- [Generic composition roots](https://github.com/DevTeam/Pure.DI/readme/generic-composition-roots.md)
- [Complex generics](https://github.com/DevTeam/Pure.DI/readme/complex-generics.md)
- [Generic composition roots with constraints](https://github.com/DevTeam/Pure.DI/readme/generic-composition-roots-with-constraints.md)
- [Generic async composition roots with constraints](https://github.com/DevTeam/Pure.DI/readme/generic-async-composition-roots-with-constraints.md)
- [Custom generic argument](https://github.com/DevTeam/Pure.DI/readme/custom-generic-argument.md)
- [Build up of an existing generic object](https://github.com/DevTeam/Pure.DI/readme/build-up-of-an-existing-generic-object.md)
- [Generic root arguments](https://github.com/DevTeam/Pure.DI/readme/generic-root-arguments.md)
### Attributes
- [Constructor ordinal attribute](https://github.com/DevTeam/Pure.DI/readme/constructor-ordinal-attribute.md)
- [Member ordinal attribute](https://github.com/DevTeam/Pure.DI/readme/member-ordinal-attribute.md)
- [Tag attribute](https://github.com/DevTeam/Pure.DI/readme/tag-attribute.md)
- [Type attribute](https://github.com/DevTeam/Pure.DI/readme/type-attribute.md)
- [Inject attribute](https://github.com/DevTeam/Pure.DI/readme/inject-attribute.md)
- [Custom attributes](https://github.com/DevTeam/Pure.DI/readme/custom-attributes.md)
- [Custom universal attribute](https://github.com/DevTeam/Pure.DI/readme/custom-universal-attribute.md)
- [Custom generic argument attribute](https://github.com/DevTeam/Pure.DI/readme/custom-generic-argument-attribute.md)
- [Bind attribute](https://github.com/DevTeam/Pure.DI/readme/bind-attribute.md)
- [Bind attribute with lifetime and tag](https://github.com/DevTeam/Pure.DI/readme/bind-attribute-with-lifetime-and-tag.md)
- [Bind attribute for a generic type](https://github.com/DevTeam/Pure.DI/readme/bind-attribute-for-a-generic-type.md)
### Interception
- [Decorator](https://github.com/DevTeam/Pure.DI/readme/decorator.md)
- [Interception](https://github.com/DevTeam/Pure.DI/readme/interception.md)
- [Advanced interception](https://github.com/DevTeam/Pure.DI/readme/advanced-interception.md)
### Hints
- [Resolve hint](https://github.com/DevTeam/Pure.DI/readme/resolve-hint.md)
- [ThreadSafe hint](https://github.com/DevTeam/Pure.DI/readme/threadsafe-hint.md)
- [OnDependencyInjection hint](https://github.com/DevTeam/Pure.DI/readme/ondependencyinjection-hint.md)
- [OnCannotResolve hint](https://github.com/DevTeam/Pure.DI/readme/oncannotresolve-hint.md)
- [OnNewInstance hint](https://github.com/DevTeam/Pure.DI/readme/onnewinstance-hint.md)
- [ToString hint](https://github.com/DevTeam/Pure.DI/readme/tostring-hint.md)
- [Check for a root](https://github.com/DevTeam/Pure.DI/readme/check-for-a-root.md)
### Advanced
- [Composition root kinds](https://github.com/DevTeam/Pure.DI/readme/composition-root-kinds.md)
- [Tag Type](https://github.com/DevTeam/Pure.DI/readme/tag-type.md)
- [Tag Unique](https://github.com/DevTeam/Pure.DI/readme/tag-unique.md)
- [Tag on injection site](https://github.com/DevTeam/Pure.DI/readme/tag-on-injection-site.md)
- [Tag on a constructor argument](https://github.com/DevTeam/Pure.DI/readme/tag-on-a-constructor-argument.md)
- [Tag on a member](https://github.com/DevTeam/Pure.DI/readme/tag-on-a-member.md)
- [Tag on a method argument](https://github.com/DevTeam/Pure.DI/readme/tag-on-a-method-argument.md)
- [Tag on injection site with wildcards](https://github.com/DevTeam/Pure.DI/readme/tag-on-injection-site-with-wildcards.md)
- [Dependent compositions](https://github.com/DevTeam/Pure.DI/readme/dependent-compositions.md)
- [Accumulators](https://github.com/DevTeam/Pure.DI/readme/accumulators.md)
- [Global compositions](https://github.com/DevTeam/Pure.DI/readme/global-compositions.md)
- [Partial class](https://github.com/DevTeam/Pure.DI/readme/partial-class.md)
- [A few partial classes](https://github.com/DevTeam/Pure.DI/readme/a-few-partial-classes.md)
- [Tracking disposable instances per a composition root](https://github.com/DevTeam/Pure.DI/readme/tracking-disposable-instances-per-a-composition-root.md)
- [Tracking disposable instances in delegates](https://github.com/DevTeam/Pure.DI/readme/tracking-disposable-instances-in-delegates.md)
- [Tracking disposable instances using pre-built classes](https://github.com/DevTeam/Pure.DI/readme/tracking-disposable-instances-using-pre-built-classes.md)
- [Tracking disposable instances with different lifetimes](https://github.com/DevTeam/Pure.DI/readme/tracking-disposable-instances-with-different-lifetimes.md)
- [Tracking async disposable instances per a composition root](https://github.com/DevTeam/Pure.DI/readme/tracking-async-disposable-instances-per-a-composition-root.md)
- [Tracking async disposable instances in delegates](https://github.com/DevTeam/Pure.DI/readme/tracking-async-disposable-instances-in-delegates.md)
- [Exposed roots](https://github.com/DevTeam/Pure.DI/readme/exposed-roots.md)
- [Exposed roots with tags](https://github.com/DevTeam/Pure.DI/readme/exposed-roots-with-tags.md)
- [Exposed roots via arg](https://github.com/DevTeam/Pure.DI/readme/exposed-roots-via-arg.md)
- [Exposed roots via root arg](https://github.com/DevTeam/Pure.DI/readme/exposed-roots-via-root-arg.md)
- [Exposed generic roots](https://github.com/DevTeam/Pure.DI/readme/exposed-generic-roots.md)
- [Exposed generic roots with args](https://github.com/DevTeam/Pure.DI/readme/exposed-generic-roots-with-args.md)
- [DI tracing via serilog](https://github.com/DevTeam/Pure.DI/readme/di-tracing-via-serilog.md)
### Applications
- Console
  - [Schrödinger's cat](https://github.com/DevTeam/Pure.DI/readme/Console.md)
  - [Top level statements](https://github.com/DevTeam/Pure.DI/readme/ConsoleTopLevelStatements.md)
  - [Native AOT](https://github.com/DevTeam/Pure.DI/readme/ConsoleNativeAOT.md)
- UI
  - [MAUI](https://github.com/DevTeam/Pure.DI/readme/Maui.md)
  - [WPF](https://github.com/DevTeam/Pure.DI/readme/Wpf.md)
  - [Avalonia](https://github.com/DevTeam/Pure.DI/readme/Avalonia.md)
  - [Win Forms Net Core](https://github.com/DevTeam/Pure.DI/readme/WinFormsAppNetCore.md)
  - [Win Forms](https://github.com/DevTeam/Pure.DI/readme/WinFormsApp.md)
- Web
  - [Web](https://github.com/DevTeam/Pure.DI/readme/WebApp.md)
  - [Minimal Web API](https://github.com/DevTeam/Pure.DI/readme/MinimalWebAPI.md)
  - [Web API](https://github.com/DevTeam/Pure.DI/readme/WebAPI.md)
  - [gRPC service](https://github.com/DevTeam/Pure.DI/readme/GrpcService.md)
  - [Blazor Server](https://github.com/DevTeam/Pure.DI/readme/BlazorServerApp.md)
  - [Blazor WebAssembly](https://github.com/DevTeam/Pure.DI/readme/BlazorWebAssemblyApp.md)
    - [https://devteam.github.io/Pure.DI/](https://devteam.github.io/Pure.DI/)
- Git repo with examples
  - [Schrödinger's cat](https://github.com/DevTeam/Pure.DI.Example) 
  - [How to use Pure.DI to create and test libraries](https://github.com/DevTeam/Pure.DI.Solution) 
## Generated Code

Each generated class, hereafter called a _composition_, must be customized. Setup starts with a call to the `Setup(string compositionTypeName)` method:

```c#
DI.Setup("Composition")
    .Bind<IDependency>().To<Dependency>()
    .Bind<IService>().To<Service>()
    .Root<IService>("Root");
```

<details>
<summary>The following class will be generated</summary>

```c#
partial class Composition
{
    // Default constructor
    public Composition() { }

    // Scope constructor
    internal Composition(Composition parentScope) { }

    // Composition root
    public IService Root
    {
        get
        {
            return new Service(new Dependency());
        }
    }

    public T Resolve<T>()  { ... }

    public T Resolve<T>(object? tag)  { ... }

    public object Resolve(Type type) { ... }

    public object Resolve(Type type, object? tag) { ... }
}
```

The _compositionTypeName_ parameter can be omitted

- if the setup is performed inside a partial class, then the composition will be created for this partial class
- for the case of a class with composition kind `CompositionKind.Global`, see [this example](https://github.com/DevTeam/Pure.DI/readme/global-compositions.md)

</details>

<details>
<summary>Setup arguments</summary>

The first parameter is used to specify the name of the composition class. All sets with the same name will be combined to create one composition class. Alternatively, this name may contain a namespace, e.g. a composition class is generated for `Sample.Composition`:

```c#
namespace Sample
{
    partial class Composition
    {
        ...
    }
}
```

The second optional parameter may have multiple values to determine the kind of composition.

### CompositionKind.Public

This value is used by default. If this value is specified, a normal composition class will be created.

### CompositionKind.Internal

If you specify this value, the class will not be generated, but this setup can be used by others as a base setup. For example:

```c#
DI.Setup("BaseComposition", CompositionKind.Internal)
    .Bind().To<Dependency>();

DI.Setup("Composition").DependsOn("BaseComposition")
    .Bind().To<Service>();    
```

If the _CompositionKind.Public_ flag is set in the composition setup, it can also be the base for other compositions, as in the example above.

### CompositionKind.Global

No composition class will be created when this value is specified, but this setup is the base setup for all setups in the current project, and `DependsOn(...)` is not required.

</details>

<details>
<summary>Constructors</summary>

### Default constructor

It's quite trivial, this constructor simply initializes the internal state.

### Parameterized constructor

It replaces the default constructor and is only created if at least one argument is specified. For example:

```c#
DI.Setup("Composition")
    .Arg<string>("name")
    .Arg<int>("id")
    ...
```

In this case, the constructor with arguments is as follows:

```c#
public Composition(string name, int id) { ... }
```

and there is no default constructor. It is important to remember that only those arguments that are used in the object graph will appear in the constructor. Arguments that are not involved cannot be defined, as they are omitted from the constructor parameters to save resources.

### Scope constructor

This constructor creates a composition instance for the new scope. This allows ``Lifetime.Scoped`` to be applied. See [this](https://github.com/DevTeam/Pure.DI/readme/scope.md) example for details.

</details>

<details>
<summary>Composition Roots</summary>

### Public Composition Roots

To create an object graph quickly and conveniently, a set of properties (or a methods) is formed. These properties/methods are here called roots of compositions. The type of a property/method is the type of the root object created by the composition. Accordingly, each invocation of a property/method leads to the creation of a composition with a root element of this type.

```c#
DI.Setup("Composition")
    .Bind<IService>().To<Service>()
    .Root<IService>("MyService");
```

In this case, the property for the _IService_ type will be named _MyService_ and will be available for direct use. The result of its use will be the creation of a composition of objects with the root of _IService_ type:

```c#
public IService MyService
{
    get
    { 
        ...
        return new Service(...);
    }
}
```

This is [recommended way](https://blog.ploeh.dk/2011/07/28/CompositionRoot/) to create a composition root. A composition class can contain any number of roots.

### Private Composition Roots

If the root name is empty, a private composition root with a random name is created:

```c#
private IService RootM07D16di_0001
{
    get { ... }
}
```

This root is available in _Resolve_ methods in the same way as public roots. For example:

```c#
DI.Setup("Composition")
    .Bind<IService>().To<Service>()
    .Root<IService>();
```

These properties have an arbitrary name and access modifier _private_ and cannot be used directly from the code. Do not attempt to use them, as their names are arbitrarily changed. Private composition roots can be resolved by _Resolve_ methods.

</details>

<details>
<summary>Methods "Resolve"</summary>

### Methods "Resolve"

By default, a set of four _Resolve_ methods is generated:

```c#
public T Resolve<T>() { ... }

public T Resolve<T>(object? tag) { ... }

public object Resolve(Type type) { ... }

public object Resolve(Type type, object? tag) { ... }
```

These methods can resolve both public and private composition roots that do not depend on any arguments of the composition roots. They are useful when using the [Service Locator](https://martinfowler.com/articles/injection.html) approach, where the code resolves composition roots in place:

```c#
var composition = new Composition();

composition.Resolve<IService>();
```

This is a [not recommended](https://blog.ploeh.dk/2010/02/03/ServiceLocatorisanAnti-Pattern/) way to create composition roots because _Resolve_ methods have a number of disadvantages:
- They provide access to an unlimited set of dependencies.
- Their use can potentially lead to runtime exceptions, for example, when the corresponding root has not been defined.
- Lead to performance degradation because they search for the root of a composition based on its type.

To control the generation of these methods, see the [Resolve](#resolve-hint) hint.

### Dispose and DisposeAsync

Provides a mechanism to release unmanaged resources. These methods are generated only if the composition contains at least one singleton/scoped instance that implements either the [IDisposable](https://learn.microsoft.com/en-us/dotnet/api/system.idisposable) and/or [DisposeAsync](https://learn.microsoft.com/en-us/dotnet/api/system.iasyncdisposable.disposeasync) interface. The `Dispose()` or `DisposeAsync()` method of the composition should be called to dispose of all created singleton/scoped objects:

```c#
using var composition = new Composition();
```

or

```c#
await using var composition = new Composition();
```

To dispose objects of other lifetimes please see [this](https://github.com/DevTeam/Pure.DI/readme/tracking-disposable-instances-per-a-composition-root.md) or [this](https://github.com/DevTeam/Pure.DI/readme/tracking-disposable-instances-in-delegates.md) examples.

</details>

<details>
<summary>Setup hints</summary>

## Setup hints

Hints are used to fine-tune code generation. Setup hints can be used as shown in the following example:

```c#
DI.Setup("Composition")
    .Hint(Hint.Resolve, "Off")
    .Hint(Hint.ThreadSafe, "Off")
    .Hint(Hint.ToString, "On")
    ...
```

In addition, setup hints can be commented out before the _Setup_ method as `hint = value`. For example:

```c#
// Resolve = Off
// ThreadSafe = Off
DI.Setup("Composition")
    ...
```

Both approaches can be mixed:

```c#
// Resolve = Off
DI.Setup("Composition")
    .Hint(Hint.ThreadSafe, "Off")
    ...
```

| Hint                                                                                                                               | Values                                     | C# version | Default   |
|------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|------------|-----------|
| [Resolve](#resolve-hint)                                                                                                           | _On_ or _Off_                              |            | _On_      |
| [OnNewInstance](#onnewinstance-hint)                                                                                               | _On_ or _Off_                              | 9.0        | _Off_     |
| [OnNewInstancePartial](#onnewinstance-hint)                                                                                        | _On_ or _Off_                              |         | _On_      |
| [OnNewInstanceImplementationTypeNameRegularExpression](#onnewinstanceimplementationtypenameregularexpression-hint)                 | Regular expression                         |            | .+        |
| [OnNewInstanceTagRegularExpression](#onnewinstancetagregularexpression-hint)                                                       | Regular expression                         |            | .+        |
| [OnNewInstanceLifetimeRegularExpression](#onnewinstancelifetimeregularexpression-hint)                                             | Regular expression                         |            | .+        |
| [OnDependencyInjection](#ondependencyinjection-hint)                                                                               | _On_ or _Off_                              | 9.0        | _Off_     | 
| [OnDependencyInjectionPartial](#ondependencyinjectionpartial-hint)                                                                 | _On_ or _Off_                              |         | _On_      |
| [OnDependencyInjectionImplementationTypeNameRegularExpression](#OnDependencyInjectionImplementationTypeNameRegularExpression-Hint) | Regular expression                         |            | .+        |
| [OnDependencyInjectionContractTypeNameRegularExpression](#ondependencyinjectioncontracttypenameregularexpression-hint)             | Regular expression                         |            | .+        |
| [OnDependencyInjectionTagRegularExpression](#ondependencyinjectiontagregularexpression-hint)                                       | Regular expression                         |            | .+        |
| [OnDependencyInjectionLifetimeRegularExpression](#ondependencyinjectionlifetimeregularexpression-hint)                             | Regular expression                         |            | .+        |
| [OnCannotResolve](#oncannotresolve-hint)                                                                                           | _On_ or _Off_                              | 9.0        | _Off_     |
| [OnCannotResolvePartial](#oncannotresolvepartial-hint)                                                                             | _On_ or _Off_                              |         | _On_      |
| [OnCannotResolveContractTypeNameRegularExpression](#oncannotresolvecontracttypenameregularexpression-hint)                         | Regular expression                         |            | .+        |
| [OnCannotResolveTagRegularExpression](#oncannotresolvetagregularexpression-hint)                                                   | Regular expression                         |            | .+        |
| [OnCannotResolveLifetimeRegularExpression](#oncannotresolvelifetimeregularexpression-hint)                                         | Regular expression                         |            | .+        |
| [OnNewRoot](#onnewroot-hint)                                                                                                       | _On_ or _Off_                              |            | _Off_     |
| [OnNewRootPartial](#onnewrootpartial-hint)                                                                                         | _On_ or _Off_                              |            | _On_      |
| [ToString](#tostring-hint)                                                                                                         | _On_ or _Off_                              |            | _Off_     |
| [ThreadSafe](#threadsafe-hint)                                                                                                     | _On_ or _Off_                              |            | _On_      |
| [ResolveMethodModifiers](#resolvemethodmodifiers-hint)                                                                             | Method modifier                            |            | _public_  |
| [ResolveMethodName](#resolvemethodname-hint)                                                                                       | Method name                                |            | _Resolve_ |
| [ResolveByTagMethodModifiers](#resolvebytagmethodmodifiers-hint)                                                                   | Method modifier                            |            | _public_  |
| [ResolveByTagMethodName](#resolvebytagmethodname-hint)                                                                             | Method name                                |            | _Resolve_ |
| [ObjectResolveMethodModifiers](#objectresolvemethodmodifiers-hint)                                                                 | Method modifier                            |            | _public_  |
| [ObjectResolveMethodName](#objectresolvemethodname-hint)                                                                           | Method name                                |            | _Resolve_ |
| [ObjectResolveByTagMethodModifiers](#objectresolvebytagmethodmodifiers-hint)                                                       | Method modifier                            |            | _public_  |
| [ObjectResolveByTagMethodName](#objectresolvebytagmethodname-hint)                                                                 | Method name                                |            | _Resolve_ |
| [DisposeMethodModifiers](#disposemethodmodifiers-hint)                                                                             | Method modifier                            |            | _public_  |
| [DisposeAsyncMethodModifiers](#disposeasyncmethodmodifiers-hint)                                                                   | Method modifier                            |            | _public_  |
| [FormatCode](#formatcode-hint)                                                                                                     | _On_ or _Off_                              |            | _Off_     |
| [SeverityOfNotImplementedContract](#severityofnotimplementedcontract-hint)                                                         | _Error_ or _Warning_ or _Info_ or _Hidden_ |            | _Error_   |
| [Comments](#comments-hint)                                                                                                         | _On_ or _Off_                              |            | _On_     |

The list of hints will be gradually expanded to meet the needs and desires for fine-tuning code generation. Please feel free to add your ideas.

### Resolve Hint

Determines whether to generate [_Resolve_ methods](#resolve). By default, a set of four _Resolve_ methods are generated. Set this hint to _Off_ to disable the generation of resolve methods. This will reduce the generation time of the class composition, and in this case no [private composition roots](#private-composition-roots) will be generated. The class composition will be smaller and will only have [public roots](#public-composition-roots). When the _Resolve_ hint is disabled, only the public roots properties are available, so be sure to explicitly define them using the `Root<T>(string name)` method with an explicit composition root name.

### OnNewInstance Hint

Determines whether to use the _OnNewInstance_ partial method. By default, this partial method is not generated. This can be useful, for example, for logging purposes:

```c#
internal partial class Composition
{
    partial void OnNewInstance<T>(ref T value, object? tag, object lifetime) =>
        Console.WriteLine($"'{typeof(T)}'('{tag}') created.");
}
```

You can also replace the created instance with a `T` type, where `T` is the actual type of the created instance. To minimize performance loss when calling _OnNewInstance_, use the three hints below.

### OnNewInstancePartial Hint

Determines whether to generate the _OnNewInstance_ partial method. By default, this partial method is generated when the _OnNewInstance_ hint is ```On```.

### OnNewInstanceImplementationTypeNameRegularExpression Hint

This is a regular expression for filtering by instance type name. This hint is useful when _OnNewInstance_ is in _On_ state and it is necessary to limit the set of types for which the _OnNewInstance_ method will be called.

### OnNewInstanceTagRegularExpression Hint

This is a regular expression for filtering by _tag_. This hint is also useful when _OnNewInstance_ is in _On_ state and it is necessary to limit the set of _tags_ for which the _OnNewInstance_ method will be called.

### OnNewInstanceLifetimeRegularExpression Hint

This is a regular expression for filtering by _lifetime_. This hint is also useful when _OnNewInstance_ is in _On_ state and it is necessary to restrict the set of _life_ times for which the _OnNewInstance_ method will be called.

### OnDependencyInjection Hint

Determines whether to use the _OnDependencyInjection_ partial method when the _OnDependencyInjection_ hint is ```On``` to control dependency injection. By default it is ```On```.

```c#
// OnDependencyInjection = On
// OnDependencyInjectionPartial = Off
// OnDependencyInjectionContractTypeNameRegularExpression = ICalculator[\d]{1}
// OnDependencyInjectionTagRegularExpression = Abc
DI.Setup("Composition")
    ...
```

### OnDependencyInjectionPartial Hint

Determines whether to generate the _OnDependencyInjection_ partial method to control dependency injection. By default, this partial method is not generated. It cannot have an empty body because of the return value. It must be overridden when it is generated. This may be useful, for example, for [Interception Scenario](https://github.com/DevTeam/Pure.DI/readme/interception.md).

```c#
// OnDependencyInjection = On
// OnDependencyInjectionContractTypeNameRegularExpression = ICalculator[\d]{1}
// OnDependencyInjectionTagRegularExpression = Abc
DI.Setup("Composition")
    ...
```

To minimize performance loss when calling _OnDependencyInjection_, use the three tips below.

### OnDependencyInjectionImplementationTypeNameRegularExpression Hint

This is a regular expression for filtering by instance type name. This hint is useful when _OnDependencyInjection_ is in _On_ state and it is necessary to restrict the set of types for which the _OnDependencyInjection_ method will be called.

### OnDependencyInjectionContractTypeNameRegularExpression Hint

This is a regular expression for filtering by the name of the resolving type. This hint is also useful when _OnDependencyInjection_ is in _On_ state and it is necessary to limit the set of permissive types for which the _OnDependencyInjection_ method will be called.

### OnDependencyInjectionTagRegularExpression Hint

This is a regular expression for filtering by _tag_. This hint is also useful when _OnDependencyInjection_ is in the _On_ state and you want to limit the set of _tags_ for which the _OnDependencyInjection_ method will be called.

### OnDependencyInjectionLifetimeRegularExpression Hint

This is a regular expression for filtering by _lifetime_. This hint is also useful when _OnDependencyInjection_ is in _On_ state and it is necessary to restrict the set of _lifetime_ for which the _OnDependencyInjection_ method will be called.

### OnCannotResolve Hint

Determines whether to use the `OnCannotResolve<T>(...)` partial method to handle a scenario in which an instance cannot be resolved. By default, this partial method is not generated. Because of the return value, it cannot have an empty body and must be overridden at creation.

```c#
// OnCannotResolve = On
// OnCannotResolveContractTypeNameRegularExpression = string|DateTime
// OnDependencyInjectionTagRegularExpression = null
DI.Setup("Composition")
    ...
```

To avoid missing failed bindings by mistake, use the two relevant hints below.

### OnCannotResolvePartial Hint

Determines whether to generate the `OnCannotResolve<T>(...)` partial method when the _OnCannotResolve_ hint is <c>On</c> to handle a scenario in which an instance cannot be resolved. By default it is ```On```.

```c#
// OnCannotResolve = On
// OnCannotResolvePartial = Off
// OnCannotResolveContractTypeNameRegularExpression = string|DateTime
// OnDependencyInjectionTagRegularExpression = null
DI.Setup("Composition")
    ...
```

To avoid missing failed bindings by mistake, use the two relevant hints below.

### OnNewRoot Hint

Determines whether to use a static partial method `OnNewRoot<TContract, T>(...)` to handle the new composition root registration event.

```c#
// OnNewRoot = On
DI.Setup("Composition")
    ...
```

Be careful, this hint disables checks for the ability to resolve dependencies!

### OnNewRootPartial Hint

Determines whether to generate a static partial method `OnNewRoot<TContract, T>(...)` when the _OnNewRoot_ hint is ```On``` to handle the new composition root registration event.

```c#
// OnNewRootPartial = Off
DI.Setup("Composition")
    ...
```

### OnCannotResolveContractTypeNameRegularExpression Hint

This is a regular expression for filtering by the name of the resolving type. This hint is also useful when _OnCannotResolve_ is in _On_ state and it is necessary to limit the set of resolving types for which the _OnCannotResolve_ method will be called.

### OnCannotResolveTagRegularExpression Hint

This is a regular expression for filtering by _tag_. This hint is also useful when _OnCannotResolve_ is in _On_ state and it is necessary to limit the set of _tags_ for which the _OnCannotResolve_ method will be called.

### OnCannotResolveLifetimeRegularExpression Hint

This is a regular expression for filtering by _lifetime_. This hint is also useful when _OnCannotResolve_ is in the _On_ state and it is necessary to restrict the set of _lives_ for which the _OnCannotResolve_ method will be called.

### ToString Hint

Determines whether to generate the _ToString()_ method. This method provides a class diagram in [mermaid](https://mermaid.js.org/) format. To see this diagram, just call the ToString method and copy the text to [this site](https://mermaid.live/).

```c#
// ToString = On
DI.Setup("Composition")
    .Bind<IService>().To<Service>()
    .Root<IService>("MyService");
    
var composition = new Composition();
string classDiagram = composition.ToString(); 
```

### ThreadSafe Hint

This hint determines whether the composition of objects will be created in a thread-safe way. The default value of this hint is _On_. It is a good practice not to use threads when creating an object graph, in this case the hint can be disabled, which will result in a small performance gain. For example:

```c#
// ThreadSafe = Off
DI.Setup("Composition")
    .Bind<IService>().To<Service>()
    .Root<IService>("MyService");
```

### ResolveMethodModifiers Hint

Overrides the modifiers of the `public T Resolve<T>()` method.

### ResolveMethodName Hint

Overrides the method name for `public T Resolve<T>()`.

### ResolveByTagMethodModifiers Hint

Overrides the modifiers of the `public T Resolve<T>(object? tag)` method.

### ResolveByTagMethodName Hint

Overrides the method name for `public T Resolve<T>(object? tag)`.

### ObjectResolveMethodModifiers Hint

Overrides the modifiers of the `public object Resolve(Type type)` method.

### ObjectResolveMethodName Hint

Overrides the method name for `public object Resolve(Type type)`.

### ObjectResolveByTagMethodModifiers Hint

Overrides the modifiers of the `public object Resolve(Type type, object? tag)` method.

### ObjectResolveByTagMethodName Hint

Overrides the method name for `public object Resolve(Type type, object? tag)`.

### DisposeMethodModifiers Hint

Overrides the modifiers of the `public void Dispose()` method.

### DisposeAsyncMethodModifiers Hint

Overrides the modifiers of the `public ValueTask DisposeAsync()` method.

### FormatCode Hint

Specifies whether the generated code should be formatted. This option consumes a lot of CPU resources. This hint may be useful when studying the generated code or, for example, when making presentations.

### SeverityOfNotImplementedContract Hint

Indicates the severity level of the situation when, in the binding, an implementation does not implement a contract. Possible values:

- _"Error"_, it is default value.
- _"Warning"_ - something suspicious but allowed.
- _"Info"_ - information that does not indicate a problem.
- _"Hidden"_ - what's not a problem.

### Comments Hint

Specifies whether the generated code should be commented.

```c#
// Represents the composition class
DI.Setup(nameof(Composition))
    .Bind<IService>().To<Service>()
    // Provides a composition root of my service
    .Root<IService>("MyService");
```

Appropriate comments will be added to the generated ```Composition``` class and the documentation for the class, depending on the IDE used, will look something like this:

![ReadmeDocumentation1.png](https://github.com/DevTeam/Pure.DI/readme/ReadmeDocumentation1.png)

Then documentation for the composition root:

![ReadmeDocumentation2.png](https://github.com/DevTeam/Pure.DI/readme/ReadmeDocumentation2.png)

</details>


## NuGet packages

|                      |                                                                                                                     |                                                            |
|----------------------|---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|
| Pure.DI              | [![NuGet](https://img.shields.io/nuget/v/Pure.DI)](https://www.nuget.org/packages/Pure.DI)                           | DI Source code generator                                   |
| Pure.DI.Abstractions | [![NuGet](https://img.shields.io/nuget/v/Pure.DI.Abstractions)](https://www.nuget.org/packages/Pure.DI.Abstractions) | Abstractions for Pure.DI                                   |
| Pure.DI.Templates    | [![NuGet](https://img.shields.io/nuget/v/Pure.DI.Templates)](https://www.nuget.org/packages/Pure.DI.Templates)       | Template Package you can call from the shell/command line. |
| Pure.DI.MS           | [![NuGet](https://img.shields.io/nuget/v/Pure.DI.MS)](https://www.nuget.org/packages/Pure.DI.MS)                     | Tools for working with Microsoft DI                        |

## Project template

Install the DI template [Pure.DI.Templates](https://www.nuget.org/packages/Pure.DI.Templates)

```shell
dotnet new install Pure.DI.Templates
```

Create a "Sample" console application from the template *__di__*

```shell
dotnet new di -o ./Sample
```

And run it

```shell
dotnet run --project Sample
```

For more information about the template, please see [this page](https://github.com/DevTeam/Pure.DI/wiki/Project-templates).

## Troubleshooting

<details>
<summary>Version update</summary>

When updating the version, it is possible that the previous version of the code generator remains active and is used by compilation services. In this case, the old and new versions of the generator may conflict. For a project where the code generator is used, it is recommended to do the following:
- After updating the version, close the IDE if it is open
- Delete the _obj_ and _bin_ directories
- Execute the following commands one by one

```shell
dotnet build-server shutdown
```

```shell
dotnet restore
```

```shell
dotnet build
```

</details>

<details>
<summary>Disabling API generation</summary>

_Pure.DI_ automatically generates its API. If an assembly already has the _Pure.DI_ API, for example, from another assembly, it is sometimes necessary to disable its automatic generation to avoid ambiguity. To do this, you need to add a _DefineConstants_ element to the project files of these modules. For example:

```xml
<PropertyGroup>
    <DefineConstants>$(DefineConstants);PUREDI_API_SUPPRESSION</DefineConstants>
</PropertyGroup>
```

</details>

<details>
<summary>Display generated files</summary>

You can set project properties to save generated files and control their storage location. In the project file, add the `<EmitCompilerGeneratedFiles>` element to the `<PropertyGroup>` group and set its value to `true`. Build the project again. The generated files are now created in the _obj/Debug/netX.X/generated/Pure.DI/Pure.DI/Pure.DI.SourceGenerator_ directory. The path components correspond to the build configuration, the target framework, the source generator project name, and the full name of the generator type. You can choose a more convenient output folder by adding the `<CompilerGeneratedFilesOutputPath>` element to the application project file. For example:

```xml
<Project Sdk="Microsoft.NET.Sdk">
    
    <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)Generated</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>
    
</Project>
```

</details>

## Contribution

Thank you for your interest in contributing to the _Pure.DI_ project! First of all, if you are going to make a big change or feature, please open a problem first. That way, we can coordinate and understand if the change you're going to work on fits with current priorities and if we can commit to reviewing and merging it within a reasonable timeframe. We don't want you to waste a lot of your valuable time on something that may not align with what we want for _Pure.DI_.

Contribution prerequisites: [.NET SDK 9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0) or later is installed.

The entire build logic is a regular [console .NET application](https://github.com/DevTeam/Pure.DI/build). You can use the [build.cmd](https://github.com/DevTeam/Pure.DI/build.cmd) and [build.sh](https://github.com/DevTeam/Pure.DI/build.sh) files with the appropriate command in the parameters to perform all basic actions on the project, e.g:

| Command        | Description                                                       |
|----------------|-------------------------------------------------------------------|
| g, generator   | Builds and tests generator                                        |
| l, libs        | Builds and tests libraries                                        |
| c, check       | Compatibility checks                                              |
| p, pack        | Creates NuGet packages                                            |
| r, readme      | Generates README.md                                               |
| benchmarks, bm | Runs benchmarks                                                   |
| deploy, dp     | Deploys packages                                                  |
| t, template    | Creates and deploys templates                                     |
| u, upgrade     | Upgrading the internal version of DI to the latest public version |

For example:

```
./build.sh pack
./build.cmd benchmarks
```

If you are using the Rider IDE, it already has a set of configurations to run these commands. This project uses [C# interactive](https://github.com/DevTeam/csharp-interactive) build automation system for .NET. This tool helps to make .NET builds more efficient.

![](https://raw.githubusercontent.com/DevTeam/csharp-interactive/master/docs/CSharpInteractive.gif)

### Additional resources

Examples of how to set up a composition
- [Pure.DI](https://github.com/DevTeam/Pure.DI/blob/master/src/Pure.DI.Core/Generator.cs)
- [C# interactive](https://github.com/DevTeam/csharp-interactive/blob/master/CSharpInteractive/Composition.cs)
- [Immutype](https://github.com/DevTeam/Immutype/blob/master/Immutype/Composition.cs)
- [MSBuild logger](https://github.com/JetBrains/teamcity-msbuild-logger/blob/master/TeamCity.MSBuild.Logger/Composition.cs)

Articles
- [RU New in Pure.DI](https://habr.com/ru/articles/808297/)
- [RU Pure.DI v2.1](https://habr.com/ru/articles/795809/)
- [RU Pure.DI next step](https://habr.com/ru/articles/554236/)
- [RU Pure.DI for .NET](https://habr.com/ru/articles/552858/)

RU DotNext video

<a href="http://www.youtube.com/watch?feature=player_embedded&v=nrp9SH-gLqg" target="_blank"><img src="http://img.youtube.com/vi/nrp9SH-gLqg/0.jpg"
alt="DotNext Pure.DI" width="640" border="10" /></a>



<details>
<summary>Benchmarks environment</summary>

<pre><code>
BenchmarkDotNet v0.14.0, Windows 10 (10.0.19045.4894/22H2/2022Update)
AMD Ryzen 9 5900X, 1 CPU, 24 logical and 12 physical cores
.NET SDK 9.0.100
  [Host]     : .NET 9.0.0 (9.0.24.52809), X64 RyuJIT AVX2
  DefaultJob : .NET 9.0.0 (9.0.24.52809), X64 RyuJIT AVX2
</code></pre>

</details>


:::

### About
:::note

Constructing injecting container


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Pure.DI**
```xml showLineNumbers {14}
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
	  <PackageReference Include="Pure.DI" Version="2.1.44">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\Program.cs" label="Program.cs" >

  This is the use of **Pure.DI** in *Program.cs*

```csharp showLineNumbers 
using InjectDemo;
using Pure.DI;


DI.Setup("Composition")
    .Bind<IDatabase>().To<DatabaseCon>()
    .Bind<Database>().To<Database>()
    .Root<Database>();
    ;

var c = new Composition();
var con = c.Resolve<Database>();
con.Open();





```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **Pure.DI** in *DatabaseCon.cs*

```csharp showLineNumbers 

namespace InjectDemo;

public partial class DatabaseCon:IDatabase
{
    public string? Connection { get; set; }
    public void Open()
    {
        Console.WriteLine("open from database con" );
    }
}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\Database.cs" label="Database.cs" >

  This is the use of **Pure.DI** in *Database.cs*

```csharp showLineNumbers 
namespace InjectDemo;

partial class Database : IDatabase
{
    private readonly IDatabase con;

    public Database(IDatabase con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open from database");
        con.Open();
    }

}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\IDatabase.cs" label="IDatabase.cs" >

  This is the use of **Pure.DI** in *IDatabase.cs*

```csharp showLineNumbers 
namespace InjectDemo
{
    internal interface IDatabase
    {
        public void Open();
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\obj\GX\Pure.DI\Pure.DI.SourceGenerator\Composition.g.cs" label="Composition.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
// by Pure.DI 2.1.44+4da6876f3ecd7c34771553d8409b829e287d3041
#nullable enable annotations

using Pure.DI;
using System;
using System.Buffers;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

/// <summary>
/// <para>
/// <b>Composition roots:</b><br/>
/// <list type="bullet">
/// <item>
/// <term>
/// Private composition root of type <see cref="InjectDemo.Database"/>. It can be resolved by <see cref="Resolve{T}()"/> method: <c>Resolve&lt;global::InjectDemo.Database&gt;()</c>
/// </term>
/// <description>
/// Provides a composition root of type <see cref="InjectDemo.Database"/>.
/// </description>
/// </item>
/// </list>
/// </para>
/// <br/>
/// <br/>This class was created by <a href="https://github.com/DevTeam/Pure.DI">Pure.DI</a> source code generator.
/// </summary>
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
partial class Composition
{
	private readonly Composition _rootM01D21di;
	
	/// <summary>
	/// This constructor creates a new instance of <see cref="Composition"/>.
	/// </summary>
	[global::Pure.DI.OrdinalAttribute(256)]
	public Composition()
	{
		_rootM01D21di = this;
	}
	
	/// <summary>
	/// This constructor creates a new instance of <see cref="Composition"/> scope based on <paramref name="parentScope"/>. This allows the <see cref="Lifetime.Scoped"/> life time to be applied.
	/// </summary>
	/// <param name="parentScope">Scope parent.</param>
	internal Composition(Composition parentScope)
	{
		_rootM01D21di = (parentScope ?? throw new global::System.ArgumentNullException(nameof(parentScope)))._rootM01D21di;
	}
	
	#region Roots
	/// <summary>
	/// <para>
	/// Provides a composition root of type <see cref="InjectDemo.Database"/>.
	/// </para>
	/// </summary>
	private global::InjectDemo.Database RootM01D21di1
	{
		[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
		get
		{
			return new global::InjectDemo.Database(new global::InjectDemo.DatabaseCon());
		}
	}
	#endregion
	
	#region API
	/// <summary>
	/// Resolves the composition root.
	/// </summary>
	/// <typeparam name="T">The type of the composition root.</typeparam>
	/// <returns>A composition root.</returns>
	#if NETSTANDARD2_0_OR_GREATER || NETCOREAPP || NET40_OR_GREATER || NET
	[global::System.Diagnostics.Contracts.Pure]
	#endif
	[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
	public T Resolve<T>()
	{
		return ResolverM01D21di<T>.Value.Resolve(this);
	}
	
	/// <summary>
	/// Resolves the composition root by tag.
	/// </summary>
	/// <typeparam name="T">The type of the composition root.</typeparam>
	/// <param name="tag">The tag of a composition root.</param>
	/// <returns>A composition root.</returns>
	#if NETSTANDARD2_0_OR_GREATER || NETCOREAPP || NET40_OR_GREATER || NET
	[global::System.Diagnostics.Contracts.Pure]
	#endif
	[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
	public T Resolve<T>(object? tag)
	{
		return ResolverM01D21di<T>.Value.ResolveByTag(this, tag);
	}
	
	/// <summary>
	/// Resolves the composition root.
	/// </summary>
	/// <param name="type">The type of the composition root.</param>
	/// <returns>A composition root.</returns>
	#if NETSTANDARD2_0_OR_GREATER || NETCOREAPP || NET40_OR_GREATER || NET
	[global::System.Diagnostics.Contracts.Pure]
	#endif
	[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
	public object Resolve(global::System.Type type)
	{
		var index = (int)(_bucketSizeM01D21di * ((uint)global::System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(type) % 1));
		ref var pair = ref _bucketsM01D21di[index];
		return pair.Key == type ? pair.Value.Resolve(this) : ResolveM01D21di(type, index);
	}
	
	[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
	private object ResolveM01D21di(global::System.Type type, int index)
	{
		var finish = index + _bucketSizeM01D21di;
		while (++index < finish)
		{
			ref var pair = ref _bucketsM01D21di[index];
			if (pair.Key == type)
			{
				return pair.Value.Resolve(this);
			}
		}
		
		throw new global::System.InvalidOperationException($"{CannotResolveMessageM01D21di} {OfTypeMessageM01D21di} {type}.");
	}
	
	/// <summary>
	/// Resolves the composition root by tag.
	/// </summary>
	/// <param name="type">The type of the composition root.</param>
	/// <param name="tag">The tag of a composition root.</param>
	/// <returns>A composition root.</returns>
	#if NETSTANDARD2_0_OR_GREATER || NETCOREAPP || NET40_OR_GREATER || NET
	[global::System.Diagnostics.Contracts.Pure]
	#endif
	[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
	public object Resolve(global::System.Type type, object? tag)
	{
		var index = (int)(_bucketSizeM01D21di * ((uint)global::System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(type) % 1));
		ref var pair = ref _bucketsM01D21di[index];
		return pair.Key == type ? pair.Value.ResolveByTag(this, tag) : ResolveM01D21di(type, tag, index);
	}
	
	[global::System.Runtime.CompilerServices.MethodImpl(global::System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
	private object ResolveM01D21di(global::System.Type type, object? tag, int index)
	{
		var finish = index + _bucketSizeM01D21di;
		while (++index < finish)
		{
			ref var pair = ref _bucketsM01D21di[index];
			if (pair.Key == type)
			{
				return pair.Value.ResolveByTag(this, tag);
			}
		}
		
		throw new global::System.InvalidOperationException($"{CannotResolveMessageM01D21di} \"{tag}\" {OfTypeMessageM01D21di} {type}.");
	}
	#endregion
	
	private readonly static int _bucketSizeM01D21di;
	private readonly static global::Pure.DI.Pair<global::System.Type, global::Pure.DI.IResolver<Composition, object>>[] _bucketsM01D21di;
	
	static Composition()
	{
		var valResolverM01D21di_0000 = new ResolverM01D21di_0000();
		ResolverM01D21di<global::InjectDemo.Database>.Value = valResolverM01D21di_0000;
		_bucketsM01D21di = global::Pure.DI.Buckets<global::System.Type, global::Pure.DI.IResolver<Composition, object>>.Create(
			1,
			out _bucketSizeM01D21di,
			new global::Pure.DI.Pair<global::System.Type, global::Pure.DI.IResolver<Composition, object>>[1]
			{
				 new global::Pure.DI.Pair<global::System.Type, global::Pure.DI.IResolver<Composition, object>>(typeof(InjectDemo.Database), valResolverM01D21di_0000)
			});
	}
	
	#region Resolvers
	private const string CannotResolveMessageM01D21di = "Cannot resolve composition root ";
	private const string OfTypeMessageM01D21di = "of type ";
	
	private class ResolverM01D21di<T>: global::Pure.DI.IResolver<Composition, T>
	{
		public static global::Pure.DI.IResolver<Composition, T> Value = new ResolverM01D21di<T>();
		
		public virtual T Resolve(Composition composite)
		{
			throw new global::System.InvalidOperationException($"{CannotResolveMessageM01D21di}{OfTypeMessageM01D21di}{typeof(T)}.");
		}
		
		public virtual T ResolveByTag(Composition composite, object tag)
		{
			throw new global::System.InvalidOperationException($"{CannotResolveMessageM01D21di}\"{tag}\" {OfTypeMessageM01D21di}{typeof(T)}.");
		}
	}
	
	private sealed class ResolverM01D21di_0000: ResolverM01D21di<InjectDemo.Database>
	{
		public override InjectDemo.Database Resolve(Composition composition)
		{
			return composition.RootM01D21di1;
		}
		
		public override InjectDemo.Database ResolveByTag(Composition composition, object tag)
		{
			switch (tag)
			{
				case null:
					return composition.RootM01D21di1;
				
				default:
					return base.ResolveByTag(composition, tag);
			}
		}
	}
	#endregion
	
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\obj\GX\Pure.DI\Pure.DI.SourceGenerator\Pure.DI.Components.Api.g.cs" label="Pure.DI.Components.Api.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#if !PUREDI_API_SUPPRESSION || PUREDI_API_V2
#pragma warning disable

#if !PUREDI_API_FUNC_SUPPRESSION
namespace System
{
#if NET20
    internal delegate TResult Func<out TResult>();
#endif
#if NET20 || NET35
    internal delegate TResult Func<in T, out TResult>(T arg);
    internal delegate TResult Func<in T1, in T2, out TResult>(T1 arg1, T2 arg2);
    internal delegate TResult Func<in T1, in T2, in T3, out TResult>(T1 arg1, T2 arg2, T3 arg3);
    internal delegate TResult Func<in T1, in T2, in T3, in T4, out TResult>(T1 arg1, T2 arg2, T3 arg3, T4 arg4);
    internal delegate TResult Func<in T1, in T2, in T3, in T4, in T5, out TResult>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5);
    internal delegate TResult Func<in T1, in T2, in T3, in T4, in T5, in T6, out TResult>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6);
    internal delegate TResult Func<in T1, in T2, in T3, in T4, in T5, in T6, in T7, out TResult>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7);
    internal delegate TResult Func<in T1, in T2, in T3, in T4, in T5, in T6, in T7, in T8, out TResult>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7, T8 arg8);
#endif
}
#endif

namespace Pure.DI
{
    using System;

    /// <summary>
    /// Binding lifetimes.
    /// <example>
    /// <code>
    /// DI.Setup("Composition")
    ///     .Bind&lt;IDependency&gt;().As(Lifetime.Singleton).To&lt;Dependency&gt;();
    /// </code>
    /// </example>
    /// </summary>
    /// <seealso cref="Pure.DI.DI.Setup"/>
    /// <seealso cref="IBinding.As"/>
    /// <seealso cref="IConfiguration.DefaultLifetime"/>
    internal enum Lifetime
    {
        /// <summary>
        /// Specifies to create a new dependency instance each time. This is the default value and can be omitted.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().As(Lifetime.Transient).To&lt;Dependency&gt;();
        /// </code>
        /// This is the default lifetime, it can be omitted, for example:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        Transient,

        /// <summary>
        /// Ensures that there will be a single instance of the dependency for each composition.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().As(Lifetime.Singleton).To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        Singleton,

        /// <summary>
        /// Guarantees that there will be a single instance of the dependency for each root of the composition.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().As(Lifetime.PerResolve).To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        PerResolve,
        
        /// <summary>
        /// Does not guarantee that there will be a single instance of the dependency for each root of the composition, but is useful to reduce the number of instances of type.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().As(Lifetime.PerBlock).To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        PerBlock,
        
        /// <summary>
        /// Ensures that there will be a single instance of the dependency for each scope.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().As(Lifetime.Singleton).To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        Scoped
    }
    
    /// <summary>
    /// Hints for the code generator and can be used to fine tune code generation.
    /// <example>
    /// <code>
    /// // Resolve = Off
    /// DI.Setup("Composition")
    ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
    /// </code>
    /// or using the API call <see cref="IConfiguration.Hint"/>:
    /// <code>
    /// DI.Setup("Composition")
    ///     .Hint(Hint.Resolve, "Off")
    ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
    /// </code>
    /// </example>
    /// </summary>
    /// <seealso cref="IConfiguration.Hint"/>
    internal enum Hint
    {
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to generate <c>Resolve</c> methods. <c>On</c> by default.
        /// <example>
        /// <code>
        /// // Resolve = Off
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.Resolve, "Off")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        Resolve,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to use partial <c>OnNewInstance</c> method. <c>Off</c> by default.
        /// <example>
        /// <code>
        /// // OnNewInstance = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewInstance, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewInstance,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to generate partial <c>OnNewInstance</c> method when the _OnNewInstance_ hint is <c>On</c>. <c>On</c> by default.
        /// <example>
        /// <code>
        /// // OnNewInstancePartial = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewInstancePartial, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewInstancePartial,
        
        /// <summary>
        /// The regular expression to filter OnNewInstance by the instance type name. ".+" by default.
        /// <example>
        /// <code>
        /// // OnNewInstanceImplementationTypeNameRegularExpression = Dependency
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewInstanceImplementationTypeNameRegularExpression, "Dependency")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewInstanceImplementationTypeNameRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnNewInstance by the tag. ".+" by default.
        /// <example>
        /// <code>
        /// // OnNewInstanceTagRegularExpression = IDependency
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewInstanceTagRegularExpression, "IDependency")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewInstanceTagRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnNewInstance by the lifetime. ".+" by default.
        /// <example>
        /// <code>
        /// // OnNewInstanceLifetimeRegularExpression = Singleton
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewInstanceLifetimeRegularExpression, "Singleton")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewInstanceLifetimeRegularExpression,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to use partial <c>OnDependencyInjection</c> method to control of dependency injection. <c>Off</c> by default.
        /// <example>
        /// <code>
        /// // OnDependencyInjection = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnDependencyInjection, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnDependencyInjection,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to generate partial <c>OnDependencyInjection</c> method when the _OnDependencyInjection_ hint is <c>On</c> to control of dependency injection. <c>On</c> by default.
        /// <example>
        /// <code>
        /// // OnDependencyInjectionPartial = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnDependencyInjectionPartial, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnDependencyInjectionPartial,
        
        /// <summary>
        /// The regular expression to filter OnDependencyInjection by the instance type name. ".+" by default.
        /// <example>
        /// <code>
        /// // OnDependencyInjectionImplementationTypeNameRegularExpression = Dependency
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnDependencyInjectionImplementationTypeNameRegularExpression, "Dependency")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnDependencyInjectionImplementationTypeNameRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnDependencyInjection by the resolving type name. ".+" by default.
        /// <example>
        /// <code>
        /// // OnDependencyInjectionContractTypeNameRegularExpression = IDependency
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnDependencyInjectionContractTypeNameRegularExpression, "IDependency")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnDependencyInjectionContractTypeNameRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnDependencyInjection by the tag. ".+" by default.
        /// <example>
        /// <code>
        /// // OnDependencyInjectionTagRegularExpression = MyTag
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;("MyTag").To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnDependencyInjectionTagRegularExpression, "MyTag")
        ///     .Bind&lt;IDependency&gt;("MyTag").To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnDependencyInjectionTagRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnDependencyInjection by the lifetime. ".+" by default.
        /// <example>
        /// <code>
        /// // OnDependencyInjectionLifetimeRegularExpression = Singleton
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnDependencyInjectionLifetimeRegularExpression, "Singleton")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnDependencyInjectionLifetimeRegularExpression,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to use a partial <c>OnCannotResolve&lt;T&gt;(...)</c> method to handle a scenario in which the dependency cannot be resolved. <c>Off</c> by default.
        /// <example>
        /// <code>
        /// // OnCannotResolve = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnCannotResolve, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnCannotResolve,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to generate a partial <c>OnCannotResolve&lt;T&gt;(...)</c> method when the <c>OnCannotResolve</c> hint is <c>On</c> to handle a scenario in which the dependency cannot be resolved. <c>On</c> by default.
        /// <example>
        /// <code>
        /// // OnCannotResolvePartial = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnCannotResolvePartial, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnCannotResolvePartial,
        
        /// <summary>
        /// The regular expression to filter OnCannotResolve by the resolving type name. ".+" by default.
        /// <example>
        /// <code>
        /// // OnCannotResolveContractTypeNameRegularExpression = OtherType
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnCannotResolveContractTypeNameRegularExpression, "OtherType")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnCannotResolveContractTypeNameRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnCannotResolve by the tag. ".+" by default.
        /// <example>
        /// <code>
        /// // OnCannotResolveTagRegularExpression = MyTag
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnCannotResolveTagRegularExpression, "MyTag")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnCannotResolveTagRegularExpression,
        
        /// <summary>
        /// The regular expression to filter OnCannotResolve by the lifetime. ".+" by default.
        /// <example>
        /// <code>
        /// // OnCannotResolveLifetimeRegularExpression = Singleton
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnCannotResolveLifetimeRegularExpression, "Singleton")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnCannotResolveLifetimeRegularExpression,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to use a static partial <c>OnNewRoot&lt;T&gt;(...)</c> method to handle the new Composition root registration event. <c>Off</c> by default.
        /// <example>
        /// <code>
        /// // OnNewRoot = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewRoot, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewRoot,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determines whether to generate a static partial <c>OnNewRoot&lt;T&gt;(...)</c> method when the <c>OnNewRoot</c> hint is <c>On</c> to handle the new Composition root registration event. <c>On</c> by default.
        /// <example>
        /// <code>
        /// // OnNewRootPartial = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.OnNewRootPartial, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        OnNewRootPartial,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Determine if the <c>ToString()</c> method should be generated. This method provides a text-based class diagram in the format mermaid. <c>Off</c> by default. 
        /// <example>
        /// <code>
        /// // ToString = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ToString, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ToString,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. This hint determines whether object Composition will be created in a thread-safe manner. <c>On</c> by default. 
        /// <example>
        /// <code>
        /// // ThreadSafe = Off
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ThreadSafe, "Off")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ThreadSafe,
        
        /// <summary>
        /// Overrides modifiers of the method <c>public T Resolve&lt;T&gt;()</c>. "public" by default.
        /// <example>
        /// <code>
        /// // ResolveMethodModifiers = internal
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ResolveMethodModifiers, "internal")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ResolveMethodModifiers,
        
        /// <summary>
        /// Overrides name of the method <c>public T Resolve&lt;T&gt;()</c>. "Resolve" by default.
        /// <example>
        /// <code>
        /// // ResolveMethodName = GetService
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ResolveMethodName, "GetService")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ResolveMethodName,
        
        /// <summary>
        /// Overrides modifiers of the method <c>public T Resolve&lt;T&gt;(object? tag)</c>. "public" by default.
        /// <example>
        /// <code>
        /// // ResolveByTagMethodModifiers = internal
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ResolveByTagMethodModifiers, "internal")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ResolveByTagMethodModifiers,
        
        /// <summary>
        /// Overrides name of the method <c>public T Resolve&lt;T&gt;(object? tag)</c>. "Resolve" by default.
        /// <example>
        /// For example:
        /// <code>
        /// // ResolveByTagMethodName = GetService
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ResolveByTagMethodName, "GetService")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ResolveByTagMethodName,
        
        /// <summary>
        /// Overrides modifiers of the method <c>public object Resolve(Type type)</c>. "public" by default.
        /// <example>
        /// <code>
        /// // ObjectResolveMethodModifiers = internal
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ObjectResolveMethodModifiers, "internal")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ObjectResolveMethodModifiers,
        
        /// <summary>
        /// Overrides name of the method <c>public object Resolve(Type type)</c>. "Resolve" by default.
        /// <example>
        /// <code>
        /// // ObjectResolveMethodName = GetService
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ObjectResolveMethodName, "GetService")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ObjectResolveMethodName,
        
        /// <summary>
        /// Overrides modifiers of the method <c>public object Resolve(Type type, object? tag)</c>. "public" by default.
        /// <example>
        /// <code>
        /// // ObjectResolveByTagMethodModifiers = internal
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ObjectResolveByTagMethodModifiers, "internal")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ObjectResolveByTagMethodModifiers,
        
        /// <summary>
        /// Overrides name of the method <c>public object Resolve(Type type, object? tag)</c>. "Resolve" by default.
        /// <example>
        /// <code>
        /// // ObjectResolveByTagMethodName = GetService
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.ObjectResolveByTagMethodName, "GetService")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        ObjectResolveByTagMethodName,
        
        /// <summary>
        /// Overrides modifiers of the method <c>public void Dispose()</c>. "public" by default.
        /// <example>
        /// <code>
        /// // DisposeMethodModifiers = internal
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.DisposeMethodModifiers, "internal")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        DisposeMethodModifiers,
        
        /// <summary>
        /// Overrides modifiers of the method <c>public <see cref="ValueTask"/> DisposeAsyncMethodModifiers()</c>. "public" by default.
        /// <example>
        /// <code>
        /// // DisposeAsyncMethodModifiers = internal
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.DisposeAsyncMethodModifiers, "internal")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        DisposeAsyncMethodModifiers,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Specifies whether the generated code should be formatted. This option consumes a lot of CPU resources. <c>Off</c> by default.
        /// <example>
        /// <code>
        /// // FormatCode = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.FormatCode, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        FormatCode,
        
        /// <summary>
        /// <c>Error</c> or <c>Warning</c> or <c>Info</c> or <c>Hidden</c>. Indicates the severity level of the situation when, in the binding, an implementation does not implement a contract. <c>Error</c> by default.
        /// <example>
        /// <code>
        /// // FormatCode = On
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.SeverityOfNotImplementedContracts, "On")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        SeverityOfNotImplementedContract,
        
        /// <summary>
        /// <c>On</c> or <c>Off</c>. Specifies whether the generated code should be commented. <c>On</c> by default.
        /// <example>
        /// <code>
        /// // Comments = Off
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// <br/>
        /// or using the API call <see cref="IConfiguration.Hint"/>:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Hint.Comments, "Off")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Hint"/>
        Comments
    }

    /// <summary>
    /// Represents a generic type argument attribute. It allows you to create custom generic type argument such as <see cref="TTS"/>, <see cref="TTDictionary{TKey,TValue}"/>, etc. 
    /// <example>
    /// <code>
    /// [GenericTypeArgument]
    /// internal interface TTMy: IMy { }
    /// </code>
    /// </example>
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Interface | global::System.AttributeTargets.Struct | global::System.AttributeTargets.Enum)]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal sealed class GenericTypeArgumentAttribute : global::System.Attribute { }
    
    /// <summary>
    /// Represents an ordinal attribute.
    /// This attribute is part of the API, but you can use your own attribute at any time, and this allows you to define them in the assembly and namespace you want.
    /// <example>
    /// For constructors, it defines the sequence of attempts to use a particular constructor to create an object:
    /// <code>
    /// class Service : IService
    /// {
    ///     private readonly string _name;
    /// 
    ///
    ///     [Ordinal(1)]
    ///     public Service(IDependency dependency) =&gt;
    ///         _name = "with dependency";
    /// 
    ///
    ///     [Ordinal(0)]
    ///     public Service(string name) =&gt; _name = name;
    /// }
    /// </code>
    /// <br/>
    /// For fields, properties and methods, it specifies to perform dependency injection and defines the sequence:
    /// <code>
    /// class Person : IPerson
    /// {
    ///     private readonly string _name = "";
    /// 
    ///     [Ordinal(0)]
    ///     public int Id;
    ///
    /// 
    ///     [Ordinal(1)]
    ///     public string FirstName
    ///     {
    ///         set
    ///         {
    ///             _name = value;
    ///         }
    ///     }
    /// 
    ///
    ///     public IDependency? Dependency { get; private set; }
    /// 
    ///
    ///     [Ordinal(2)]
    ///     public void SetDependency(IDependency dependency) =&gt;
    ///         Dependency = dependency;
    /// }
    /// </code>
    /// </example>
    /// </summary>
    /// <seealso cref="TagAttribute"/>
    /// <seealso cref="TypeAttribute"/>
    [global::System.AttributeUsage(global::System.AttributeTargets.Constructor | global::System.AttributeTargets.Method | global::System.AttributeTargets.Property | global::System.AttributeTargets.Field, AllowMultiple = false)]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal class OrdinalAttribute : global::System.Attribute
    {
        /// <summary>
        /// Creates an attribute instance.
        /// </summary>
        /// <param name="ordinal">The injection ordinal.</param>
        public OrdinalAttribute(int ordinal) { }
    }

    /// <summary>
    /// Represents a tag attribute overriding an injection tag. The tag can be a constant, a type, or a value of an enumerated type.
    /// This attribute is part of the API, but you can use your own attribute at any time, and this allows you to define them in the assembly and namespace you want.
    /// <example>
    /// Sometimes it's important to take control of building a dependency graph. For example, when there are multiple implementations of the same contract. In this case, tags will help:
    /// <code>
    /// interface IDependency { }
    /// 
    ///
    /// class AbcDependency : IDependency { }
    /// 
    ///
    /// class XyzDependency : IDependency { }
    /// 
    ///
    /// class Dependency : IDependency { }
    /// 
    ///
    /// interface IService
    /// {
    ///     IDependency Dependency1 { get; }
    /// 
    ///
    ///     IDependency Dependency2 { get; }
    /// }
    ///
    /// 
    /// class Service : IService
    /// {
    ///     public Service(
    ///         [Tag("Abc")] IDependency dependency1,
    ///         [Tag("Xyz")] IDependency dependency2)
    ///     {
    ///         Dependency1 = dependency1;
    ///         Dependency2 = dependency2;
    ///     }
    ///
    ///     public IDependency Dependency1 { get; }
    ///
    /// 
    ///     public IDependency Dependency2 { get; }
    /// }
    ///
    /// 
    /// DI.Setup("Composition")
    ///     .Bind&lt;IDependency&gt;("Abc").To&lt;AbcDependency&gt;()
    ///     .Bind&lt;IDependency&gt;("Xyz").To&lt;XyzDependency&gt;()
    ///     .Bind&lt;IService&gt;().To&lt;Service&gt;().Root&lt;IService&gt;("Root");
    /// </code>
    /// </example>
    /// </summary>
    /// <seealso cref="OrdinalAttribute"/>
    /// <seealso cref="TypeAttribute"/>
    [global::System.AttributeUsage(global::System.AttributeTargets.Parameter | global::System.AttributeTargets.Property | global::System.AttributeTargets.Field, AllowMultiple = false)]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal class TagAttribute : global::System.Attribute
    {
        /// <summary>
        /// Creates an attribute instance.
        /// </summary>
        /// <param name="tag">The injection tag. See also <see cref="IBinding.Tags"/></param>.
        public TagAttribute(object tag) { }
    }

    /// <summary>
    /// The injection type can be defined manually using the <c>Type</c> attribute.This attribute explicitly overrides an injected type, otherwise it would be determined automatically based on the type of the constructor/method, property, or field parameter.
    /// This attribute is part of the API, but you can use your own attribute at any time, and this allows you to define them in the assembly and namespace you want.
    /// <example>
    /// <code>
    /// interface IDependency { }
    /// 
    ///
    /// class AbcDependency : IDependency { }
    ///
    ///
    /// class XyzDependency : IDependency { }
    ///
    ///
    /// interface IService
    /// {
    ///     IDependency Dependency1 { get; }
    ///
    ///     IDependency Dependency2 { get; }
    /// }
    ///
    ///
    /// class Service : IService
    /// {
    ///     public Service(
    ///         [Type(typeof(AbcDependency))] IDependency dependency1,
    ///         [Type(typeof(XyzDependency))] IDependency dependency2)
    ///     {
    ///         Dependency1 = dependency1;
    ///         Dependency2 = dependency2;
    ///     }
    ///
    ///
    ///     public IDependency Dependency1 { get; }
    ///
    ///
    ///     public IDependency Dependency2 { get; }
    /// }
    ///
    ///
    /// DI.Setup("Composition")
    ///     .Bind&lt;IService&gt;().To&lt;Service&gt;().Root&lt;IService&gt;("Root");
    /// </code>
    /// </example>
    /// </summary>
    /// <seealso cref="TagAttribute"/>
    /// <seealso cref="OrdinalAttribute"/>
    [global::System.AttributeUsage(global::System.AttributeTargets.Parameter | global::System.AttributeTargets.Property | global::System.AttributeTargets.Field, AllowMultiple = false)]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal class TypeAttribute : global::System.Attribute
    {
        /// <summary>
        /// Creates an attribute instance.
        /// </summary>
        /// <param name="type">The injection type. See also <see cref="IConfiguration.Bind{T}"/> and <see cref="IBinding.Bind{T}"/>.</param>
        public TypeAttribute(global::System.Type type) { }
    }
    
    /// <summary>
    /// Indicates that a property or method can be automatically added as a binding.
    /// <example>
    /// <code>
    /// internal class DependencyProvider
    /// {
    ///     [Bind()]
    ///     public Dependency Dep => new Dependency();
    /// }
    /// </code>
    /// <code>
    /// internal class DependencyProvider
    /// {
    ///     [Bind(typeof(IDependency&lt;TT&gt;), Lifetime.Singleton)]
    ///     public Dependency GetDep&lt;T&gt;() =&gt; new Dependency();
    /// }
    /// </code>
    /// <code>
    /// internal class DependencyProvider
    /// {
    ///     [Bind(typeof(IDependency), Lifetime.PerResolve, "some tag")]
    ///     public Dependency GetDep(int id) => new Dependency(id);
    /// }
    /// </code>
    /// </example>
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Property | global::System.AttributeTargets.Method | global::System.AttributeTargets.Field)]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal class BindAttribute : global::System.Attribute
    {
        /// <summary>
        /// Creates an attribute instance.
        /// </summary>
        public BindAttribute(global::System.Type type = default(global::System.Type), Lifetime lifetime = Lifetime.Transient, params object[] tags) { }
    }

    /// <summary>
    /// Determines how the partial class will be generated. The <see cref="DI.Setup"/> method has an additional argument <c>kind</c>, which defines the type of composition:
    /// <example>
    /// <code>
    /// DI.Setup("BaseComposition", CompositionKind.Internal);
    /// </code>
    /// </example>
    /// </summary>
    /// <seealso cref="DI.Setup"/>
    internal enum CompositionKind
    {
        /// <summary>
        /// This value is used by default. If this value is specified, a normal partial class will be generated.
        /// </summary>
        Public,
        
        /// <summary>
        /// If this value is specified, the class will not be generated, but this setting can be used by other users as a baseline. The API call <see cref="IConfiguration.DependsOn"/> is mandatory.
        /// </summary>
        Internal,
        
        /// <summary>
        /// No partial classes will be created when this value is specified, but this setting is the baseline for all installations in the current project, and the API call <see cref="IConfiguration.DependsOn"/> is not required.
        /// </summary>
        Global
    }

    /// <summary>
    /// Determines a kind of root of the composition.
    /// </summary>
    /// <seealso cref="IConfiguration.Root{T}"/>
    [global::System.Flags]
    internal enum RootKinds
    {
        /// <summary>
        /// Specifies to use the default composition root kind.
        /// </summary>
        Default = RootKinds.Public | RootKinds.Property,
        
        /// <summary>
        /// Specifies to use a <c>public</c> access modifier for the root of the composition.
        /// </summary>
        Public = 1,
        
        /// <summary>
        /// Specifies to use a <c>internal</c> access modifier for the root of the composition.
        /// </summary>
        Internal = 1 << 1,
        
        /// <summary>
        /// Specifies to use a <c>private</c> access modifier for the root of the composition.
        /// </summary>
        Private = 1 << 2,
        
        /// <summary>
        /// Specifies to create a composition root as a property.
        /// </summary>
        Property = 1 << 3,
        
        /// <summary>
        /// Specifies to create a composition root as a method.
        /// </summary>
        Method = 1 << 4,
        
        /// <summary>
        /// Specifies to create a static root of the composition.
        /// </summary>
        Static = 1 << 5,
        
        /// <summary>
        /// Specifies to create a partial root of the composition.
        /// </summary>
        Partial = 1 << 6,
        
        /// <summary>
        /// Specifies to create a exposed root of the composition.
        /// </summary>
        Exposed = 1 << 7,
        
        /// <summary>
        /// Specifies to use a <c>protected</c> access modifier for the root of the composition.
        /// </summary>
        Protected = 1 << 8,
    }
    
    /// <summary>
    /// Represents well known tags.
    /// </summary>
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal partial class Tag
    {
        private static readonly Tag Shared = new Tag();

        /// <summary>
        /// Unique tag.
        /// Begins the definition of the binding.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;(Tag.Unique).To&lt;Service1&gt;()
        ///     .Bind&lt;IService&gt;(Tag.Unique).To&lt;Service1&gt;()
        ///     .Root&lt;IEnumerable&lt;IService&gt;&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        public static readonly Tag Unique = Shared;

        /// <summary>
        /// Tag of target implementation type.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;(Tag.Type).To&lt;Service&gt;()
        ///     .Root&lt;IService&gt;("Root", typeof(Service));
        /// </code>
        /// </example>
        /// </summary>
        public static readonly Tag Type = Shared;
        
        /// <summary>
        /// This tag allows you to determine which binding will be used for explicit injection for a particular injection site.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind(Tag.On("MyNamespace.Service.Service:dep"))
        ///         .To&lt;Dependency&gt;()
        ///     .Bind().To&lt;Service&gt;()
        ///     .Root&lt;IService&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="injectionSites">Set of labels for inection each, must be specified in a special format: &lt;namespace&gt;.&lt;type&gt;.&lt;member&gt;[:argument]. The argument is specified only for the constructor and methods. The wildcards &apos;*&apos; and &apos;?&apos; are supported. All names are case-sensitive. The global namespace prefix &apos;global::&apos; must be omitted.</param>
        public static Tag On(params string[] injectionSites) => Shared;
        
        /// <summary>
        /// This tag allows you to determine which binding will be used for explicit injection for a particular constructor argument.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind(Tag.OnConstructorArg&lt;Service&gt;("dep"))
        ///         .To&lt;Dependency&gt;()
        ///     .Bind().To&lt;Service&gt;()
        ///     .Root&lt;IService&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="argName">The name of the constructor argument.</param>
        public static Tag OnConstructorArg<T>(string argName) => Shared;
        
        /// <summary>
        /// This tag allows you to define which binding will be used for explicit injection for property or field of the type.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind(Tag.OnMember&lt;Service&gt;("DepProperty"))
        ///         .To&lt;Dependency&gt;()
        ///     .Bind().To&lt;Service&gt;()
        ///     .Root&lt;IService&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="memberName">The name of the type member.</param>
        public static Tag OnMember<T>(string memberName) => Shared;
        
        /// <summary>
        /// This tag allows you to determine which binding will be used for explicit injection for a particular method argument.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind(Tag.OnMethodArg&lt;Service&gt;("DoSomething", "state"))
        ///         .To&lt;Dependency&gt;()
        ///     .Bind().To&lt;Service&gt;()
        ///     .Root&lt;IService&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="methodName">The name of the type method.</param>
        /// <param name="argName">The name of the method argument.</param>
        public static Tag OnMethodArg<T>(string methodName, string argName) => Shared;
    }

    /// <summary>
    /// This abstraction allows a disposable object to be disposed of.
    /// </summary>
    internal interface IOwned
        : global::System.IDisposable
#if NETCOREAPP3_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        , global::System.IAsyncDisposable
#endif
    {
    }

    /// <summary>
    /// Performs accumulation and disposal of disposable objects.
    /// </summary>
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal sealed partial class Owned: global::System.Collections.Generic.List<object>, global::Pure.DI.IOwned
    {
        private volatile bool _isDisposed;

        /// <inheritdoc />
        public void Dispose()
        {
            if (_isDisposed)
            {
                return;
            }

            _isDisposed = true;
            try
            {
                for (var i = Count - 1; i >= 0; i--)
                {
                    switch (this[i])
                    {
                        case global::Pure.DI.IOwned _:
                            break;

                        case global::System.IDisposable disposableInstance:
                            try
                            {
                                disposableInstance.Dispose();
                            }
                            catch (global::System.Exception exception)
                            {
                                OnDisposeException(disposableInstance, exception);
                            }

                            break;

#if NETCOREAPP3_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
                    case global::System.IAsyncDisposable asyncDisposableInstance:
                        try
                        {
                            var valueTask = asyncDisposableInstance.DisposeAsync();
                            if (!valueTask.IsCompleted)
                            {
                                valueTask.AsTask().Wait();
                            }
                        }
                        catch (global::System.Exception exception)
                        {
                            OnDisposeAsyncException(asyncDisposableInstance, exception);
                        }
                        break;
#endif
                    }
                }
            }
            finally
            {
                Clear();
            }
        }

#if NETCOREAPP3_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        /// <inheritdoc />
        public async global::System.Threading.Tasks.ValueTask DisposeAsync()
        {
            if (_isDisposed)
            {
                return;
            }

            _isDisposed = true;
            try
            {
                for (var i = Count - 1; i >= 0; i--)
                {
                    switch (this[i])
                    {
                        case global::Pure.DI.IOwned _:
                            break;

                        case global::System.IAsyncDisposable asyncDisposableInstance:
                            try
                            {
                                await asyncDisposableInstance.DisposeAsync();
                            }
                            catch (global::System.Exception exception)
                            {
                                OnDisposeAsyncException(asyncDisposableInstance, exception);
                            }
                            break;

                        case global::System.IDisposable disposableInstance:
                            try
                            {
                                disposableInstance.Dispose();
                            }
                            catch (global::System.Exception exception)
                            {
                                OnDisposeException(disposableInstance, exception);
                            }
                            break;
                    }
                }
            }
            finally
            {
                Clear();
            }
        }
#endif


        /// <summary>
        /// Implement this partial method to handle the exception on disposing.
        /// </summary>
        /// <param name="disposableInstance">The disposable instance.</param>
        /// <param name="exception">Exception occurring during disposal.</param>
        /// <typeparam name="T">The actual type of instance being disposed of.</typeparam>
        partial void OnDisposeException<T>(T disposableInstance, global::System.Exception exception)
            where T : global::System.IDisposable;
        
#if NETCOREAPP3_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER        
        /// <summary>
        /// Implement this partial method to handle the exception on disposing.
        /// </summary>
        /// <param name="asyncDisposableInstance">The disposable instance.</param>
        /// <param name="exception">Exception occurring during disposal.</param>
        /// <typeparam name="T">The actual type of instance being disposed of.</typeparam>
        partial void OnDisposeAsyncException<T>(T asyncDisposableInstance, global::System.Exception exception)
            where T : global::System.IAsyncDisposable;
#endif
    }
    
    /// <summary>
    /// Contains a value and gives the ability to dispose of that value.
    /// </summary>
    /// <typeparam name="T">Type of value owned.</typeparam>
    [global::System.Diagnostics.DebuggerDisplay("{Value}")]
    [global::System.Diagnostics.DebuggerTypeProxy(typeof(global::Pure.DI.Owned<>.DebugView))]
    internal readonly struct Owned<T>: global::Pure.DI.IOwned
    {
        /// <summary>
        /// Own value.
        /// </summary>
        public readonly T Value;
        private readonly global::Pure.DI.IOwned _owned;

        /// <summary>
        /// Creates a new instance.
        /// </summary>
        /// <param name="value">Own value.</param>
        /// <param name="owned">The abstraction allows a disposable object to be disposed of.</param>
        public Owned(T value, global::Pure.DI.IOwned owned)
        {
            Value = value;
            _owned = owned;
        }
        
        /// <inheritdoc />
        public void Dispose()
        {
            _owned.Dispose();
        }
        
#if NETCOREAPP3_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        /// <inheritdoc />
        public global::System.Threading.Tasks.ValueTask DisposeAsync()
        {
            return _owned.DisposeAsync();
        }
#endif

#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
        private class DebugView
        {
            private readonly global::Pure.DI.Owned<T> _owned;

            public DebugView(global::Pure.DI.Owned<T> owned)
            {
                _owned = owned;
            }
            
            public T Value
            {
                get { return _owned.Value; }
            }
                
            [global::System.Diagnostics.DebuggerBrowsable(global::System.Diagnostics.DebuggerBrowsableState.Collapsed)]
            public global::Pure.DI.IOwned Owned
            {
                get { return _owned._owned; }
            }
        }
    }

    /// <summary>
    /// An API for a Dependency Injection setup.
    /// </summary>
    /// <seealso cref="DI.Setup"/>
    internal interface IConfiguration
    {
        /// <summary>
        /// Begins the binding definition for the implementation type itself, and if the implementation is not an abstract class or structure, for all abstract but NOT special types that are directly implemented.
        /// Special types include:
        /// <list type="bullet">
        /// <item>System.Object</item>
        /// <item>System.Enum</item>
        /// <item>System.MulticastDelegate</item>
        /// <item>System.Delegate</item>
        /// <item>System.Collections.IEnumerable</item>
        /// <item>System.Collections.Generic.IEnumerable&lt;T&gt;</item>
        /// <item>System.Collections.Generic.IList&lt;T&gt;</item>
        /// <item>System.Collections.Generic.ICollection&lt;T&gt;</item>
        /// <item>System.Collections.IEnumerator</item>
        /// <item>System.Collections.Generic.IEnumerator&lt;T&gt;</item>
        /// <item>System.Collections.Generic.IIReadOnlyList&lt;T&gt;</item>
        /// <item>System.Collections.Generic.IReadOnlyCollection&lt;T&gt;</item>
        /// <item>System.IDisposable</item>
        /// <item>System.IAsyncResult</item>
        /// <item>System.AsyncCallback</item>
        /// </list>
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind().To&lt;Service&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind(params object[] tags);
        
        /// <summary>
        /// Begins the definition of the binding.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;().To&lt;Service&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <typeparam name="T">The type of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/> 
        IBinding Bind<T>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 4 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 4 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 4 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <typeparam name="T6">The type 6 of dependency to be bound.</typeparam> 
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5, T6>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 4 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <typeparam name="T6">The type 6 of dependency to be bound.</typeparam>
        /// <typeparam name="T7">The type 7 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5, T6, T7>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 4 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <typeparam name="T6">The type 6 of dependency to be bound.</typeparam>
        /// <typeparam name="T7">The type 7 of dependency to be bound.</typeparam>
        /// <typeparam name="T8">The type 8 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5, T6, T7, T8>(params object[] tags);

        /// <summary>
        /// Begins the definition of the binding with <see cref="Root{T}"/> applied.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .RootBind&lt;IService&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <typeparam name="T">The type of dependency to be bound.</typeparam>
        /// <param name="name">Specifies the unique name of the root of the composition. If the value is empty, a private root will be created, which can be used when calling <c>Resolve</c> methods.</param>
        /// <param name="kind">The Optional argument specifying the kind for the root of the Composition.</param>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding. If is is not empty, the first tag is used for the root.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding RootBind<T>(string name = "", RootKinds kind = RootKinds.Default, params object[] tags);

        /// <summary>
        /// Indicates the use of some single or multiple setups as base setups by name.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .DependsOn(nameof(CompositionBase));
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="setupNames">A set of names for the basic setups on which this one depends.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="DI.Setup"/>
        IConfiguration DependsOn(params string[] setupNames);
        
        /// <summary>
        /// Specifies a custom generic type argument attribute.
        /// <example>
        /// <code>
        /// [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class | AttributeTargets.Struct)]
        /// class MyGenericTypeArgumentAttribute : Attribute;
        ///  
        /// [MyGenericTypeArgument]
        /// interface TTMy; 
        ///  
        /// DI.Setup("Composition")
        ///     .GenericTypeAttribute&lt;MyGenericTypeArgumentAttribute&gt;()
        ///     .Bind&lt;IDependency&lt;TTMy&gt;&gt;().To&lt;Dependency&lt;TTMy&gt;&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <typeparam name="T">The attribute type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="GenericTypeArgumentAttribute"/>
        IConfiguration GenericTypeArgumentAttribute<T>() where T : global::System.Attribute;

        /// <summary>
        /// Specifies a custom attribute that overrides the injection type.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .TypeAttribute&lt;MyTypeAttribute&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="typeArgumentPosition">The optional parameter that specifies the position of the type parameter in the attribute constructor. 0 by default. See predefined attribute <see cref="TypeAttribute{T}"/>.</param>
        /// <typeparam name="T">The attribute type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Pure.DI.TypeAttribute"/>
        IConfiguration TypeAttribute<T>(int typeArgumentPosition = 0) where T : global::System.Attribute;

        /// <summary>
        /// Specifies a tag attribute that overrides the injected tag.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .TagAttribute&lt;MyTagAttribute&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="tagArgumentPosition">The optional parameter that specifies the position of the tag parameter in the attribute constructor. 0 by default. See the predefined <see cref="TagAttribute{T}"/> attribute.</param>
        /// <typeparam name="T">The attribute type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Pure.DI.TagAttribute"/>
        IConfiguration TagAttribute<T>(int tagArgumentPosition = 0) where T : global::System.Attribute;

        /// <summary>
        /// Specifies a custom attribute that overrides the injection ordinal.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .OrdinalAttribute&lt;MyOrdinalAttribute&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="ordinalArgumentPosition">The optional parameter that specifies the position of the ordinal parameter in the attribute constructor. 0 by default. See the predefined <see cref="OrdinalAttribute{T}"/> attribute.</param>
        /// <typeparam name="T">The attribute type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Pure.DI.OrdinalAttribute"/>
        IConfiguration OrdinalAttribute<T>(int ordinalArgumentPosition = 0) where T : global::System.Attribute;

        /// <summary>
        /// Overrides the default <see cref="Lifetime"/> for all bindings further down the chain. If not specified, the <see cref="Lifetime.Transient"/> lifetime is used.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .DefaultLifetime(Lifetime.Singleton);
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="lifetime">The default lifetime.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Lifetime"/>
        /// <seealso cref="IBinding.As"/>
        IConfiguration DefaultLifetime(Pure.DI.Lifetime lifetime);
        
        /// <summary>
        /// Overrides the default <see cref="Lifetime"/> for all bindings can be casted to type <typeparamref name="T"/> further down the chain.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .DefaultLifetime&lt;IMySingleton&gt;(Lifetime.Singleton);
        /// </code>
        /// <code>
        /// DI.Setup("Composition")
        ///     .DefaultLifetime&lt;IMySingleton&gt;(Lifetime.Singleton, "my tag");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="lifetime">The default lifetime.</param>
        /// <param name="tags">Optional argument specifying the binding tags for which it will set the default lifetime. If not specified, the default lifetime will be set for any tags.</param>
        /// <typeparam name="T">The default lifetime will be applied to bindings if the implementation class can be cast to type <typeparamref name="T"/>.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Lifetime"/>
        /// <seealso cref="IBinding.As"/>
        IConfiguration DefaultLifetime<T>(Pure.DI.Lifetime lifetime, params object[] tags);
        
        /// <summary>
        /// Adds a partial class argument and replaces the default constructor by adding this argument as a parameter. It is only created if this argument is actually used. 
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Arg&lt;int&gt;("id");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="name">The argument name.</param>
        /// <param name="tags">The optional argument that specifies the tags for the argument.</param>
        /// <typeparam name="T">The argument type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        IConfiguration Arg<T>(string name, params object[] tags);
        
        /// <summary>
        /// Adds a root argument to use as a root parameter. 
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .RootArg&lt;int&gt;("id");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="name">The argument name.</param>
        /// <param name="tags">The optional argument that specifies the tags for the argument.</param>
        /// <typeparam name="T">The argument type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        IConfiguration RootArg<T>(string name, params object[] tags);
        
        /// <summary>
        /// Specifying the root of the Composition.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Root&lt;Service&gt;("MyService");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="name">Specifies the unique name of the root of the composition. If the value is empty, a private root will be created, which can be used when calling <c>Resolve</c> methods.</param>
        /// <param name="tag">Optional argument specifying the tag for the root of the Composition.</param>
        /// <typeparam name="T">The Composition root type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        IConfiguration Root<T>(string name = "", object tag = null, RootKinds kind = RootKinds.Default);

        /// <summary>
        /// Defines a hint for fine-tuning code generation.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Hint(Resolve, "Off");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="hint">The hint type.</param>
        /// <param name="value">The hint value.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Pure.DI.Hint"/>
        IConfiguration Hint(Hint hint, string value);

        /// <summary>
        /// Registers an accumulator for instances.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Accumulate&lt;IDisposable, MyAccumulator&gt;(Lifetime.Transient);
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="lifetimes"><see cref="Lifetime"/> of the instances to be accumulated. Instances with lifetime <see cref="Lifetime.Singleton"/>, <see cref="Lifetime.Scoped"/>, or <see cref="Lifetime.PerResolve"/> only accumulate in an accumulator that is NOT lazily created.</param>
        /// <typeparam name="T">The type of instance. All instances that can be cast to this type will be aacumulated.</typeparam>
        /// <typeparam name="TAccumulator">The type of accumulator. It must have a public constructor without parameters and a <c>Add</c> method with a single argument that allows you to add an instance of type <typeparamref name="T"/>.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="Pure.DI.Hint"/>
        /// <seealso cref="Pure.DI.Lifetime"/>
        IConfiguration Accumulate<T, TAccumulator>(params Lifetime[] lifetimes)
            where TAccumulator: new();
        
        /// <summary>
        /// Specifies a custom generic type argument.
        /// <example>
        /// <code>
        /// interface TTMy;
        ///  
        /// DI.Setup("Composition")
        ///     .GenericTypeArgument&lt;TTMy&gt;()
        ///     .Bind&lt;IDependency&lt;TTMy&gt;&gt;().To&lt;Dependency&lt;TTMy&gt;&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <typeparam name="T">The generic type marker.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        IConfiguration GenericTypeArgument<T>();
    }

    /// <summary>
    /// An API for a binding setup.
    /// </summary>
    internal interface IBinding
    {
        /// <summary>
        /// Begins the binding definition for the implementation type itself, and if the implementation is not an abstract class or structure, for all abstract but NOT special types that are directly implemented.
        /// Special types include:
        /// <list type="bullet">
        /// <item>System.Object</item>
        /// <item>System.Enum</item>
        /// <item>System.MulticastDelegate</item>
        /// <item>System.Delegate</item>
        /// <item>System.Collections.IEnumerable</item>
        /// <item>System.Collections.Generic.IEnumerable&lt;T&gt;</item>
        /// <item>System.Collections.Generic.IList&lt;T&gt;</item>
        /// <item>System.Collections.Generic.ICollection&lt;T&gt;</item>
        /// <item>System.Collections.IEnumerator</item>
        /// <item>System.Collections.Generic.IEnumerator&lt;T&gt;</item>
        /// <item>System.Collections.Generic.IIReadOnlyList&lt;T&gt;</item>
        /// <item>System.Collections.Generic.IReadOnlyCollection&lt;T&gt;</item>
        /// <item>System.IDisposable</item>
        /// <item>System.IAsyncResult</item>
        /// <item>System.AsyncCallback</item>
        /// </list>
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind().To&lt;Service&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind(params object[] tags);
        
        /// <summary>
        /// Begins the definition of the binding.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <typeparam name="T">The type of dependency to be bound. Common type markers such as <see cref="TT"/>, <see cref="TTList{T}"/> and others are also supported.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 3 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <typeparam name="T6">The type 6 of dependency to be bound.</typeparam> 
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5, T6>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <typeparam name="T6">The type 6 of dependency to be bound.</typeparam>
        /// <typeparam name="T7">The type 7 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5, T6, T7>(params object[] tags);
        
        /// <summary>
        /// Begins binding definition for multiple dependencies. See <see cref="Bind{T}"/> for examples.
        /// </summary>
        /// <typeparam name="T1">The type 1 of dependency to be bound.</typeparam>
        /// <typeparam name="T2">The type 2 of dependency to be bound.</typeparam>
        /// <typeparam name="T3">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T4">The type 3 of dependency to be bound.</typeparam>
        /// <typeparam name="T5">The type 5 of dependency to be bound.</typeparam>
        /// <typeparam name="T6">The type 6 of dependency to be bound.</typeparam>
        /// <typeparam name="T7">The type 7 of dependency to be bound.</typeparam>
        /// <typeparam name="T8">The type 8 of dependency to be bound.</typeparam>
        /// <param name="tags">The optional argument that specifies tags for a particular type of dependency binding.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IBinding Bind<T1, T2, T3, T4, T5, T6, T7, T8>(params object[] tags);

        /// <summary>
        /// Determines the <see cref="Lifetime"/> of a binding.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().As(Lifetime.Singleton).To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="lifetime">The <see cref="Lifetime"/> of a binding</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        IBinding As(Pure.DI.Lifetime lifetime);

        /// <summary>
        /// Defines the binding tags.
        /// <example>
        /// Sometimes it's important to take control of building a dependency graph. For example, when there are multiple implementations of the same contract. In this case, tags will help:
        /// <code>
        /// interface IDependency { }
        /// 
        ///
        /// class AbcDependency : IDependency { }
        /// 
        ///
        /// class XyzDependency : IDependency { }
        /// 
        ///
        /// class Dependency : IDependency { }
        /// 
        ///
        /// interface IService
        /// {
        ///     IDependency Dependency1 { get; }
        /// 
        ///
        ///     IDependency Dependency2 { get; }
        /// }
        ///
        /// 
        /// class Service : IService
        /// {
        ///     public Service(
        ///         [Tag("Abc")] IDependency dependency1,
        ///         [Tag("Xyz")] IDependency dependency2)
        ///     {
        ///         Dependency1 = dependency1;
        ///         Dependency2 = dependency2;
        ///     }
        ///
        ///     public IDependency Dependency1 { get; }
        ///
        /// 
        ///     public IDependency Dependency2 { get; }
        /// }
        ///
        /// 
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().Tags("Abc").To&lt;AbcDependency&gt;()
        ///     .Bind&lt;IDependency&gt;().Tags("Xyz").To&lt;XyzDependency&gt;()
        ///     .Bind&lt;IService&gt;().To&lt;Service&gt;().Root&lt;IService&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="tags">The binding tags.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="As"/>
        IBinding Tags(params object[] tags);

        /// <summary>
        /// Completes the binding chain by specifying the implementation.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;();
        /// </code>
        /// </example>
        /// </summary>
        /// <typeparam name="T">The implementation type. Also supports generic type markers such as <see cref="TT"/>, <see cref="TTList{T}"/>, and others.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T>();

        /// <summary>
        /// Completes the binding chain by specifying the implementation using a factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;()
        ///     To(_ =&gt;
        ///     {
        ///         var service = new Service("My Service");
        ///         service.Initialize();
        ///         return service;
        ///     })
        /// </code>
        /// <br/>
        /// another example:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&amp;lt;IService&amp;gt;()
        ///     To(ctx =&amp;gt;
        ///     {
        ///         ctx.Inject&lt;IDependency&gt;(out var dependency);
        ///         return new Service(dependency);
        ///     })
        /// </code>
        /// <br/>
        /// and another example:
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&amp;lt;IService&amp;gt;()
        ///     To(ctx =&amp;gt;
        ///     {
        ///         // Builds up an instance with all necessary dependencies
        ///         ctx.Inject&lt;Service&gt;(out var service);
        ///
        /// 
        ///         service.Initialize();
        ///         return service;
        ///     })
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="To{T1,T}()"/>
        /// <seealso cref="To{T1,T2,T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T>(global::System.Func<IContext, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a source code statement.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;int&gt;().To&lt;int&gt;("dependencyId")
        ///     .Bind&lt;Func&lt;int, IDependency&gt;&gt;()
        ///         .To&lt;Func&lt;int, IDependency&gt;&gt;(ctx =&gt;
        ///             dependencyId =&gt;
        ///             {
        ///                 ctx.Inject&lt;Dependency&gt;(out var dependency);
        ///                 return dependency;
        ///             });
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="sourceCodeStatement">Source code statement</param>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        IConfiguration To<T>(string sourceCodeStatement);

        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// <example>
        /// <code>
        /// DI.Setup(nameof(Composition))
        ///     .Bind&lt;IDependency&gt;().To((
        ///         Dependency dependency) =&gt;
        ///     {
        ///         dependency.Initialize();
        ///         return dependency;
        ///     });
        /// </code>
        /// A variant using <see cref="TagAttribute"/>:
        /// <code>
        /// DI.Setup(nameof(Composition))
        ///     .Bind&lt;IDependency&gt;().To((
        ///         [Tag(&quot;some tag&quot;)] Dependency dependency) =&gt;
        ///     {
        ///         dependency.Initialize();
        ///         return dependency;
        ///     });
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T>(global::System.Func<T1, T> factory);

        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// <example>
        /// <code>
        /// DI.Setup(nameof(Composition))
        ///     .Bind&lt;IDependency&gt;().To((
        ///         Dependency dependency,
        ///         DateTimeOffset time) =&gt;
        ///     {
        ///         dependency.Initialize(time);
        ///         return dependency;
        ///     });
        /// </code>
        /// A variant using <see cref="TagAttribute"/>:
        /// <code>
        /// DI.Setup(nameof(Composition))
        ///     .Bind(&quot;now datetime&quot;).To(_ =&gt; DateTimeOffset.Now)
        ///     .Bind&lt;IDependency&gt;().To((
        ///         Dependency dependency,
        ///         [Tag(&quot;now datetime&quot;)] DateTimeOffset time) =&gt;
        ///     {
        ///         dependency.Initialize(time);
        ///         return dependency;
        ///     });
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T>(global::System.Func<T1, T2, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T3">Type #3 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T3, T>(global::System.Func<T1, T2, T3, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T3">Type #3 of injected dependency.</typeparam>
        /// <typeparam name="T4">Type #4 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T3, T4, T>(global::System.Func<T1, T2, T3, T4, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T3">Type #3 of injected dependency.</typeparam>
        /// <typeparam name="T4">Type #4 of injected dependency.</typeparam>
        /// <typeparam name="T5">Type #5 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T3, T4, T5, T>(global::System.Func<T1, T2, T3, T4, T5, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T3">Type #3 of injected dependency.</typeparam>
        /// <typeparam name="T4">Type #4 of injected dependency.</typeparam>
        /// <typeparam name="T5">Type #5 of injected dependency.</typeparam>
        /// <typeparam name="T6">Type #6 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T3, T4, T5, T6, T>(global::System.Func<T1, T2, T3, T4, T5, T6, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T3">Type #3 of injected dependency.</typeparam>
        /// <typeparam name="T4">Type #4 of injected dependency.</typeparam>
        /// <typeparam name="T5">Type #5 of injected dependency.</typeparam>
        /// <typeparam name="T6">Type #6 of injected dependency.</typeparam>
        /// <typeparam name="T7">Type #7 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T3, T4, T5, T6, T7, T>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T> factory);
        
        /// <summary>
        /// Completes the binding chain by specifying the implementation using a simplified factory method. It allows you to manually create an instance, call the necessary methods, initialize properties, fields, etc. Each parameter of this factory method represents a dependency injection. Starting with C# 10, you can also put the <see cref="TagAttribute"/> in front of the parameter to specify the tag of the injected dependency.
        /// </summary>
        /// <param name="factory">An expression for manually creating and initializing an instance.</param>
        /// <typeparam name="T1">Type #1 of injected dependency.</typeparam>
        /// <typeparam name="T2">Type #2 of injected dependency.</typeparam>
        /// <typeparam name="T3">Type #3 of injected dependency.</typeparam>
        /// <typeparam name="T4">Type #4 of injected dependency.</typeparam>
        /// <typeparam name="T5">Type #5 of injected dependency.</typeparam>
        /// <typeparam name="T6">Type #6 of injected dependency.</typeparam>
        /// <typeparam name="T7">Type #7 of injected dependency.</typeparam>
        /// <typeparam name="T8">Type #7 of injected dependency.</typeparam>
        /// <typeparam name="T">The implementation type.</typeparam>
        /// <returns>Reference to the setup continuation chain.</returns>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="To{T}(System.Func{Pure.DI.IContext,T})"/>
        /// <seealso cref="To{T}()"/>
        /// <seealso cref="Tags"/>
        /// <seealso cref="As"/>
        IConfiguration To<T1, T2, T3, T4, T5, T6, T7, T8, T>(global::System.Func<T1, T2, T3, T4, T5, T6, T7, T8, T> factory);
    }

    /// <summary>
    /// Injection context. Cannot be used outside of the binding setup.
    /// </summary>
    internal interface IContext
    {
        /// <summary>
        /// The tag that was used to inject the current object in the object graph. Cannot be used outside of the binding setup. See also <see cref="IBinding.Tags"/>
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;Lazy&lt;TT&gt;&gt;()
        ///     .To(ctx =&gt;
        ///     {
        ///         ctx.Inject&lt;Func&lt;TT&gt;&gt;(ctx.Tag, out var func);
        ///         return new Lazy&lt;TT&gt;(func, false);
        ///     };
        /// </code>
        /// </example>
        /// </summary>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        /// <seealso cref="IBinding.Tags"/>
        object Tag { get; }

        /// <summary>
        /// The types of consumers for which the instance is created. Cannot be used outside of the binding setup. Guaranteed to contain at least one element.
        /// </summary>
        /// <seealso cref="IConfiguration.Bind{T}"/>
        Type[] ConsumerTypes { get; }

        /// <summary>
        /// Injects an instance of type <c>T</c>. Cannot be used outside of the binding setup.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;()
        ///     To(ctx =&gt;
        ///     {
        ///         ctx.Inject&lt;IDependency&gt;(out var dependency);
        ///         return new Service(dependency);
        ///     })
        /// </code>
        /// <br/>
        /// and another example:<br/>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;()
        ///     To(ctx =&gt;
        ///     {
        ///         // Builds up an instance with all necessary dependencies
        ///         ctx.Inject&lt;Service&gt;(out var service);
        ///
        /// 
        ///         service.Initialize();
        ///         return service;
        ///     })
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="value">Injectable instance.</param>.
        /// <typeparam name="T">Instance type.</typeparam>
        /// <seealso cref="IBinding.To{T}(System.Func{Pure.DI.IContext,T})"/>
        void Inject<T>(out T value);

        /// <summary>
        /// Injects an instance of type <c>T</c> marked with a tag. Cannot be used outside of the binding setup.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;()
        ///     To(ctx =&gt;
        ///     {
        ///         ctx.Inject&lt;IDependency&gt;("MyTag", out var dependency);
        ///         return new Service(dependency);
        ///     })
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="tag">The injection tag. See also <see cref="IBinding.Tags"/></param>.
        /// <param name="value">Injectable instance.</param>.
        /// <typeparam name="T">Instance type.</typeparam>
        /// <seealso cref="IBinding.To{T}(System.Func{Pure.DI.IContext,T})"/>
        void Inject<T>(object tag, out T value);

        /// <summary>
        /// Builds up of an existing object. In other words, injects the necessary dependencies via methods, properties, or fields into an existing object. Cannot be used outside of the binding setup.
        /// <example>
        /// <code>
        /// DI.Setup("Composition")
        ///     .Bind&lt;IService&gt;()
        ///     To(ctx =&gt;
        ///     {
        ///         var service = new Service();
        ///         // Initialize an instance with all necessary dependencies
        ///         ctx.BuildUp(service);
        ///
        /// 
        ///         return service;
        ///     })
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="value">An existing object for which the injection(s) is to be performed.</param>
        /// <typeparam name="T">Object type.</typeparam>
        void BuildUp<T>(T value);
    }
    
    /// <summary>
    /// An API for a Dependency Injection setup.
    /// </summary>
    /// <seealso cref="Setup"/>
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal static class DI
    {
        /// <summary>
        /// Begins the definitions of the Dependency Injection setup chain.
        /// <example>
        /// <code>
        /// interface IDependency;
        ///
        /// 
        /// class Dependency : IDependency;
        ///
        /// 
        /// interface IService;
        ///
        /// 
        /// class Service(IDependency dependency) : IService;
        ///
        /// 
        /// DI.Setup("Composition")
        ///   .Bind&lt;IDependency&gt;().To&lt;Dependency&gt;()
        ///   .Bind&lt;IService&gt;().To&lt;Service&gt;()
        ///   .Root&lt;IService&gt;("Root");
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="compositionTypeName">An optional argument specifying the partial class name to generate.</param>
        /// <param name="kind">An optional argument specifying the kind of setup. Please <see cref="Pure.DI.CompositionKind"/> for details. It defaults to <c>Public</c>.</param>
        /// <returns>Reference to the setup continuation chain.</returns>
        internal static IConfiguration Setup(string compositionTypeName = "", CompositionKind kind = CompositionKind.Public)
        {
            return Configuration.Shared;
        }

#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
        [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
        private sealed class Configuration : IConfiguration
        {
            public static readonly IConfiguration Shared = new Configuration();

            private Configuration() { }
            
            /// <inheritdoc />
            public IBinding Bind(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4>(params object[] tags)
            {
                return Binding.Shared;
            }
            
            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5, T6>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5, T6, T7>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5, T6, T7, T8>(params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IBinding RootBind<T>(string name = "", RootKinds kind = RootKinds.Default, params object[] tags)
            {
                return Binding.Shared;
            }

            /// <inheritdoc />
            public IConfiguration DependsOn(params string[] setupNames)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration GenericTypeArgumentAttribute<T>() where T : global::System.Attribute
            {
                return Configuration.Shared;
            }
            
            /// <inheritdoc />
            public IConfiguration TypeAttribute<T>(int typeArgumentPosition = 0) where T : global::System.Attribute
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration TagAttribute<T>(int tagArgumentPosition = 0) where T : global::System.Attribute
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration OrdinalAttribute<T>(int ordinalArgumentPosition = 0) where T : global::System.Attribute
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration DefaultLifetime(Pure.DI.Lifetime lifetime)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration DefaultLifetime<T>(Lifetime lifetime, params object[] tags)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration Arg<T>(string name, params object[] tags)
            {
                return Configuration.Shared;
            }
            
            /// <inheritdoc />
            public IConfiguration RootArg<T>(string name, params object[] tags)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration Root<T>(string name, object tag, RootKinds rootKind)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration Hint(Hint hint, string value)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration Accumulate<T, TAccumulator>(params Lifetime[] lifetimes)
                where TAccumulator: new()
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration GenericTypeArgument<T>()
            {
                return Configuration.Shared;
            }
        }

        private sealed class Binding : IBinding
        {
            public static readonly IBinding Shared = new Binding();

            private Binding() { }
            
            /// <inheritdoc />
            public IBinding Bind(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5, T6>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5, T6, T7>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Bind<T1, T2, T3, T4, T5, T6, T7, T8>(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding As(Pure.DI.Lifetime lifetime)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IBinding Tags(params object[] tags)
            {
                return Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T>()
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T>(global::System.Func<IContext, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T>(string sourceCodeStatement)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T>(global::System.Func<T1, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T>(global::System.Func<T1, T2, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T3, T>(global::System.Func<T1, T2, T3, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T3, T4, T>(Func<T1, T2, T3, T4, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T3, T4, T5, T>(Func<T1, T2, T3, T4, T5, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T3, T4, T5, T6, T>(Func<T1, T2, T3, T4, T5, T6, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T3, T4, T5, T6, T7, T>(Func<T1, T2, T3, T4, T5, T6, T7, T> factory)
            {
                return Configuration.Shared;
            }

            /// <inheritdoc />
            public IConfiguration To<T1, T2, T3, T4, T5, T6, T7, T8, T>(Func<T1, T2, T3, T4, T5, T6, T7, T8, T> factory)
            {
                return Configuration.Shared;
            }
        }
    }
    
    /// <summary>
    /// For internal use.
    /// </summary>
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    [global::System.Runtime.InteropServices.StructLayout(global::System.Runtime.InteropServices.LayoutKind.Sequential, Pack = 1)]
    internal struct Pair<TKey, TValue>
    {
        public readonly TKey Key;
        public readonly TValue Value;

        public Pair(TKey key, TValue value)
        {
            Key = key;
            Value = value;
        }

        public override string ToString()
        {
            return Key?.ToString() ?? "empty" + " = " + Value.ToString();
        }
    }
    
    /// <summary>
    /// For internal use. 
    /// </summary>
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal static class Buckets<TKey, TValue>
    {
        public static uint GetDivisor(uint count)
        {
            return count < 2 ? count : count << 1;
        }

        public static Pair<TKey, TValue>[] Create(
            uint divisor,
            out int bucketSize,
            Pair<TKey, TValue>[] pairs)
        {
            bucketSize = 0;
            int[] bucketSizes = new int[divisor];
            for (int i = 0; i < pairs.Length; i++)
            {
                int bucket = (int)(((uint)global::System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(pairs[i].Key)) % divisor);
                int size = bucketSizes[bucket] + 1;
                bucketSizes[bucket] = size;
                if (size > bucketSize)
                {
                    bucketSize = size;
                }
            }
            
            Pair<TKey, TValue>[] buckets = new Pair<TKey, TValue>[divisor * bucketSize];
            for (int i = 0; i < pairs.Length; i++)
            {
                int bucket = (int)(((uint)global::System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(pairs[i].Key)) % divisor);
                var index = bucketSizes[bucket];
                buckets[bucket * bucketSize + bucketSize - index] = pairs[i];
                bucketSizes[bucket] = index - 1;
            }
            
            return buckets;
        }
    }

    /// <summary>
    /// Abstract dependency resolver.
    /// </summary>
    /// <typeparam name="TComposite">The composition type.</typeparam>
    /// <typeparam name="T">The type of the composition root.</typeparam>
    internal interface IResolver<TComposite, out T>
    {
        /// <summary>
        /// Resolves the composition root.
        /// </summary>
        /// <param name="composite">The composition.</param>
        /// <returns>A composition root.</returns>
        T Resolve(TComposite composite);
        
        /// <summary>
        /// Resolves the composition root by type and tag.
        /// </summary>
        /// <param name="composite">The composition.</param>
        /// <param name="tag">The tag of a composition root.</param>
        /// <returns>A composition root.</returns>
        T ResolveByTag(TComposite composite, object tag);
    }
}
#pragma warning restore
#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\obj\GX\Pure.DI\Pure.DI.SourceGenerator\Pure.DI.Components.GenericTypeArguments.g.cs" label="Pure.DI.Components.GenericTypeArguments.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#if !PUREDI_API_SUPPRESSION || PUREDI_API_V2
#pragma warning disable
namespace Pure.DI
{    
    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT1 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS1 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE1 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable1: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable1: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable1<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable1<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable1<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator1<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection1<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList1<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet1<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer1<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer1<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary1<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable1<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver1<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection1<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList1<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList1<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet1<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue1<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack1<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT2 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS2 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE2 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable2: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable2: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable2<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable2<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable2<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator2<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection2<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList2<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet2<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer2<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer2<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary2<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable2<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver2<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection2<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList2<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList2<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet2<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue2<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack2<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT3 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS3 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE3 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable3: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable3: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable3<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable3<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable3<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator3<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection3<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList3<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet3<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer3<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer3<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary3<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable3<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver3<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection3<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList3<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList3<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet3<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue3<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack3<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT4 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS4 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE4 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable4: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable4: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable4<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable4<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable4<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator4<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection4<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList4<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet4<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer4<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer4<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary4<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable4<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver4<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection4<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList4<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList4<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet4<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue4<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack4<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT5 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS5 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE5 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable5: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable5: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable5<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable5<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable5<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator5<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection5<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList5<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet5<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer5<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer5<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary5<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable5<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver5<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection5<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList5<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList5<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet5<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue5<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack5<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT6 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS6 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE6 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable6: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable6: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable6<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable6<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable6<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator6<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection6<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList6<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet6<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer6<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer6<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary6<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable6<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver6<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection6<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList6<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList6<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet6<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue6<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack6<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT7 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS7 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE7 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable7: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable7: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable7<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable7<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable7<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator7<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection7<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList7<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet7<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer7<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer7<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary7<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable7<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver7<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection7<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList7<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList7<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet7<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue7<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack7<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT8 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS8 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE8 { }

#if !NET35 && !NET20

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IDisposable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDisposable8: global::System.IDisposable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable8: global::System.IComparable { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IComparable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparable8<in T>: global::System.IComparable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IEquatable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEquatable8<T>: global::System.IEquatable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerable8<out T>: global::System.Collections.Generic.IEnumerable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEnumerator}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEnumerator8<out T>: global::System.Collections.Generic.IEnumerator<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ICollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTCollection8<T>: global::System.Collections.Generic.ICollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTList8<T>: global::System.Collections.Generic.IList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.ISet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTSet8<T>: global::System.Collections.Generic.ISet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTComparer8<in T>: global::System.Collections.Generic.IComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IEqualityComparer}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTEqualityComparer8<in T>: global::System.Collections.Generic.IEqualityComparer<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IDictionary}TKey, TValue}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTDictionary8<TKey, TValue>: global::System.Collections.Generic.IDictionary<TKey, TValue> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObservable}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObservable8<out T>: global::System.IObservable<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.IObserver}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTObserver8<in T>: global::System.IObserver<T> { }
    
#endif

#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyCollection}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyCollection8<out T>: global::System.Collections.Generic.IReadOnlyCollection<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Generic.IReadOnlyList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTReadOnlyList8<out T>: global::System.Collections.Generic.IReadOnlyList<T> { }
    
#endif

#if NET || NETCOREAPP

    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableList}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableList8<T>: global::System.Collections.Immutable.IImmutableList<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableSet}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableSet8<T>: global::System.Collections.Immutable.IImmutableSet<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableQueue}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableQueue8<T>: global::System.Collections.Immutable.IImmutableQueue<T> { }
    
    /// <summary>
    /// Represents the generic type arguments marker for <see cref="global::System.Collections.Immutable.IImmutableStack}T}"/>.
    /// </summary>
    [GenericTypeArgument]
    internal interface TTImmutableStack8<T>: global::System.Collections.Immutable.IImmutableStack<T> { }
    
#endif

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT9 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS9 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE9 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT10 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS10 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE10 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT11 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS11 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE11 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT12 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS12 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE12 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT13 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS13 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE13 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT14 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS14 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE14 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT15 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS15 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE15 { }

    /// <summary>
    /// Represents the generic type arguments marker for a reference type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal abstract class TT16 { }

    /// <summary>
    /// Represents the generic type arguments marker for a value type.
    /// </summary>
    [GenericTypeArgument]
#if !NET20 && !NET35 && !NETSTANDARD1_0 && !NETSTANDARD1_1 && !NETSTANDARD1_2 && !NETSTANDARD1_3 && !NETSTANDARD1_4 && !NETSTANDARD1_5 && !NETSTANDARD1_6 && !NETCOREAPP1_0 && !NETCOREAPP1_1
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    internal struct TTS16 { }

    /// <summary>
    /// Represents the generic type arguments marker for a enum type.
    /// </summary>
    [GenericTypeArgument]
    internal enum TTE16 { }

}
#pragma warning restore
#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Pure.DI\src\InjectDemo\obj\GX\Pure.DI\Pure.DI.SourceGenerator\Pure.DI.Features.Default.g.cs" label="Pure.DI.Features.Default.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#if !PUREDI_API_SUPPRESSION || PUREDI_API_V2
#pragma warning disable

namespace Pure.DI
{
    internal static class Default
    {
        [global::System.Diagnostics.Conditional("A2768DE22DE3E430C9653990D516CC9B")]
        private static void Setup()
        {
            DI.Setup("", CompositionKind.Global)
                .GenericTypeArgumentAttribute<GenericTypeArgumentAttribute>()
                .TypeAttribute<TypeAttribute>()
                .TagAttribute<TagAttribute>()
                .OrdinalAttribute<OrdinalAttribute>()
                .Accumulate<global::System.IDisposable, Owned>(
                    Lifetime.Transient,
                    Lifetime.PerResolve,
                    Lifetime.PerBlock)
#if NETCOREAPP3_0_OR_GREATER || NETSTANDARD2_1_OR_GREATER
                .Accumulate<global::System.IAsyncDisposable, Owned>(
                    Lifetime.Transient,
                    Lifetime.PerResolve,
                    Lifetime.PerBlock)
#endif
                .Bind<IOwned>().To((Owned owned) => owned)
                .Bind<Owned<TT>>()
                    .As(Lifetime.PerBlock)
                    .To(ctx => {
                        // Creates the owner of an instance
                        ctx.Inject<IOwned>(out var owned);
                        ctx.Inject<TT>(ctx.Tag, out var value);
                        return new Owned<TT>(value, owned);
                    })
                .Bind<global::System.Func<TT>>()
                    .As(Lifetime.PerBlock)
                    .To(ctx => new global::System.Func<TT>(() =>
                    {
                        ctx.Inject<TT>(ctx.Tag, out var value);
                        return value;
                    }))
                .Bind<global::System.Collections.Generic.IComparer<TT>>()
                .Bind<global::System.Collections.Generic.Comparer<TT>>()
                    .To(_ => global::System.Collections.Generic.Comparer<TT>.Default)
                .Bind<global::System.Collections.Generic.IEqualityComparer<TT>>()
                .Bind<global::System.Collections.Generic.EqualityComparer<TT>>()
                    .To(_ => global::System.Collections.Generic.EqualityComparer<TT>.Default)
#if NETSTANDARD || NET || NETCOREAPP || NET40_OR_GREATER
                .Bind<global::System.Lazy<TT>>()
                    .To(ctx =>
                    {
                        // Injects an instance factory
                        ctx.Inject<global::System.Func<TT>>(ctx.Tag, out var factory);
                        // Creates an instance that supports lazy initialization
                        return new global::System.Lazy<TT>(factory, true);
                    })
                .Bind<global::System.Threading.CancellationToken>().To(_ => global::System.Threading.CancellationToken.None)
                .Bind<global::System.Threading.Tasks.TaskScheduler>()
                    .To(_ => global::System.Threading.Tasks.TaskScheduler.Default)
                .Bind<global::System.Threading.Tasks.TaskCreationOptions>()
                    .To(_ => global::System.Threading.Tasks.TaskCreationOptions.None)
                .Bind<global::System.Threading.Tasks.TaskContinuationOptions>()
                    .To(_ => global::System.Threading.Tasks.TaskContinuationOptions.None)
                .Bind<global::System.Threading.Tasks.TaskFactory>().As(Lifetime.PerBlock)
                    .To((global::System.Threading.CancellationToken cancellationToken, global::System.Threading.Tasks.TaskCreationOptions taskCreationOptions, global::System.Threading.Tasks.TaskContinuationOptions taskContinuationOptions, global::System.Threading.Tasks.TaskScheduler taskScheduler) =>
                    new global::System.Threading.Tasks.TaskFactory(cancellationToken, taskCreationOptions, taskContinuationOptions, taskScheduler))
                .Bind<global::System.Threading.Tasks.TaskFactory<TT>>().As(Lifetime.PerBlock)
                    .To((global::System.Threading.CancellationToken cancellationToken, global::System.Threading.Tasks.TaskCreationOptions taskCreationOptions, global::System.Threading.Tasks.TaskContinuationOptions taskContinuationOptions, global::System.Threading.Tasks.TaskScheduler taskScheduler) =>
                    new global::System.Threading.Tasks.TaskFactory<TT>(cancellationToken, taskCreationOptions, taskContinuationOptions, taskScheduler))
                .Bind<global::System.Threading.Tasks.Task<TT>>()
                    .To(ctx =>
                    {
                        // Injects an instance factory
                        ctx.Inject(ctx.Tag, out global::System.Func<TT> factory);
                        // Injects a task factory creating and scheduling task objects
                        ctx.Inject(out global::System.Threading.Tasks.TaskFactory<TT> taskFactory);
                        // Creates and starts a task using the instance factory
                        return taskFactory.StartNew(factory);
                    })
#endif                
#if NETSTANDARD2_1_OR_GREATER || NET || NETCOREAPP
                .Bind<global::System.Threading.Tasks.ValueTask<TT>>()
                    .To(ctx =>
                    {
                        ctx.Inject(ctx.Tag, out TT value);
                        // Initializes a new instance of the ValueTask class using the supplied instance
                        return new global::System.Threading.Tasks.ValueTask<TT>(value);
                    })
#endif                
#if NETSTANDARD || NET || NETCOREAPP
                .Bind<global::System.Lazy<TT, TT1>>()
                    .To(ctx =>
                    {
                        // Injects an instance factory
                        ctx.Inject<global::System.Func<TT>>(ctx.Tag, out var factory);
                        // Injects a metadata
                        ctx.Inject<TT1>(ctx.Tag, out var metadata);
                        return new global::System.Lazy<TT, TT1>(factory, metadata, true);
                    })
#endif
                // Collections
#if NETSTANDARD2_1_OR_GREATER || NETCOREAPP2_1_OR_GREATER
                .Bind<global::System.Memory<TT>>()
                    .To((TT[] arr) => new global::System.Memory<TT>(arr))
                .Bind<global::System.ReadOnlyMemory<TT>>()
                    .To((TT[] arr) => new global::System.ReadOnlyMemory<TT>(arr))
                .Bind<global::System.Buffers.MemoryPool<TT>>()
                    .To(_ => global::System.Buffers.MemoryPool<TT>.Shared)
                .Bind<global::System.Buffers.ArrayPool<TT>>()
                    .To(_ => global::System.Buffers.ArrayPool<TT>.Shared)
#endif
                .Bind<global::System.Collections.Generic.IList<TT>>()
                .Bind<global::System.Collections.Generic.ICollection<TT>>()
                .Bind<global::System.Collections.Generic.List<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Generic.List<TT>(arr))
                .Bind<global::System.Collections.ObjectModel.Collection<TT>>()
                    .To((TT[] arr) => new global::System.Collections.ObjectModel.Collection<TT>(arr))
#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER
                .Bind<global::System.Collections.Generic.IReadOnlyCollection<TT>>()
                .Bind<global::System.Collections.Generic.IReadOnlyList<TT>>()
#endif
                .Bind<global::System.Collections.ObjectModel.ReadOnlyCollection<TT>>()
                    .To((TT[] arr) => new global::System.Collections.ObjectModel.ReadOnlyCollection<TT>(arr))
#if NETSTANDARD1_1_OR_GREATER || NET || NETCOREAPP || NET40_OR_GREATER
                .Bind<global::System.Collections.Concurrent.IProducerConsumerCollection<TT>>()
                .Bind<global::System.Collections.Concurrent.ConcurrentBag<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Concurrent.ConcurrentBag<TT>(arr))
                .Bind<global::System.Collections.Concurrent.ConcurrentQueue<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Concurrent.ConcurrentQueue<TT>(arr))
                .Bind<global::System.Collections.Concurrent.ConcurrentStack<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Concurrent.ConcurrentStack<TT>(arr))
                .Bind<global::System.Collections.Concurrent.BlockingCollection<TT>>()
                    .To((global::System.Collections.Concurrent.ConcurrentBag<TT> concurrentBag) =>
                    new global::System.Collections.Concurrent.BlockingCollection<TT>(concurrentBag))
#endif
#if NETSTANDARD || NET || NETCOREAPP || NET40_OR_GREATER
                .Bind<global::System.Collections.Generic.ISet<TT>>()
#endif
#if NETSTANDARD || NET || NETCOREAPP || NET35_OR_GREATER
                .Bind<global::System.Collections.Generic.HashSet<TT>>()
                    .To((TT[] arr) =>new global::System.Collections.Generic.HashSet<TT>(arr))
#endif
#if NETSTANDARD || NET || NETCOREAPP || NET45_OR_GREATER
                .Bind<global::System.Collections.Generic.SortedSet<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Generic.SortedSet<TT>(arr))
#endif
#if NET9_0_OR_GREATER
                .Bind<global::System.Collections.ObjectModel.ReadOnlySet<TT>>()
                    .To((global::System.Collections.Generic.ISet<TT> val) => new global::System.Collections.ObjectModel.ReadOnlySet<TT>(val))
#endif
                .Bind<global::System.Collections.Generic.Queue<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Generic.Queue<TT>(arr))
                .Bind<global::System.Collections.Generic.Stack<TT>>()
                    .To((TT[] arr) => new global::System.Collections.Generic.Stack<TT>(arr))
#if NETCOREAPP || NET
#if NETCOREAPP3_0_OR_GREATER
                .Bind<global::System.Collections.Immutable.ImmutableArray<TT>>()
                    .To((TT[] arr) => global::System.Runtime.CompilerServices.Unsafe.As<TT[], global::System.Collections.Immutable.ImmutableArray<TT>>(ref arr))
                .Bind<global::System.Collections.Immutable.IImmutableList<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableList<TT>>()
                    .To((TT[] arr) => global::System.Runtime.CompilerServices.Unsafe.As<TT[], global::System.Collections.Immutable.ImmutableList<TT>>(ref arr))
                .Bind<global::System.Collections.Immutable.IImmutableSet<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableHashSet<TT>>()
                    .To((TT[] arr) => global::System.Runtime.CompilerServices.Unsafe.As<TT[], global::System.Collections.Immutable.ImmutableHashSet<TT>>(ref arr))
                .Bind<global::System.Collections.Immutable.ImmutableSortedSet<TT>>()
                    .To((TT[] arr) => global::System.Runtime.CompilerServices.Unsafe.As<TT[], global::System.Collections.Immutable.ImmutableSortedSet<TT>>(ref arr))
                .Bind<global::System.Collections.Immutable.IImmutableQueue<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableQueue<TT>>()
                    .To((TT[] arr) => global::System.Runtime.CompilerServices.Unsafe.As<TT[], global::System.Collections.Immutable.ImmutableQueue<TT>>(ref arr))
                .Bind<global::System.Collections.Immutable.IImmutableStack<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableStack<TT>>()
                    .To((TT[] arr) => global::System.Runtime.CompilerServices.Unsafe.As<TT[], global::System.Collections.Immutable.ImmutableStack<TT>>(ref arr))
#else                
                .Bind<global::System.Collections.Immutable.ImmutableArray<TT>>()
                    .To((TT[] arr) => global::System.Collections.Immutable.ImmutableArray.Create<TT>(arr))
                .Bind<global::System.Collections.Immutable.IImmutableList<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableList<TT>>()
                    .To((TT[] arr) => global::System.Collections.Immutable.ImmutableList.Create<TT>(arr))
                .Bind<global::System.Collections.Immutable.IImmutableSet<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableHashSet<TT>>()
                    .To((TT[] arr) => global::System.Collections.Immutable.ImmutableHashSet.Create<TT>(arr))
                .Bind<global::System.Collections.Immutable.ImmutableSortedSet<TT>>()
                    .To((TT[] arr) => global::System.Collections.Immutable.ImmutableSortedSet.Create<TT>(arr))
                .Bind<global::System.Collections.Immutable.IImmutableQueue<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableQueue<TT>>()
                    .To((TT[] arr) => global::System.Collections.Immutable.ImmutableQueue.Create<TT>(arr))
                .Bind<global::System.Collections.Immutable.IImmutableStack<TT>>()
                .Bind<global::System.Collections.Immutable.ImmutableStack<TT>>()
                    .To((TT[] arr) => global::System.Collections.Immutable.ImmutableStack.Create<TT>(arr))
#endif
#endif
#if NET6_0_OR_GREATER
                .Bind<global::System.Random>().To(_ =>
                {
                    // Provides a thread-safe Random instance that may be used concurrently from any thread
                    return global::System.Random.Shared;
                })
#endif
#if NETCOREAPP2_0 || NET || NETSTANDARD2_0_OR_GREATER
                .Bind<global::System.Text.Encoding>().To(_ =>
                {
                    // Gets an encoding for the operating system's current ANSI code page
                    return global::System.Text.Encoding.Default;
                })
#endif
                .Bind<global::System.Text.Decoder>().As(Lifetime.PerBlock).To((global::System.Text.Encoding encoding) =>
                {
                    // Gets a decoder that converts an encoded sequence of bytes into a sequence of characters
                    return encoding.GetDecoder();
                })
                .Bind<global::System.Text.Encoder>().As(Lifetime.PerBlock).To((global::System.Text.Encoding encoding) =>
                {
                    // Gets an encoder that converts a sequence of Unicode characters into an encoded sequence of bytes
                    return encoding.GetEncoder();
                })
;
        }
    }
}
#pragma warning restore
#endif

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Pure.DI ](/sources/Pure.DI.zip)

:::


### Share Pure.DI 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPure.DI&quote=Pure.DI" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPure.DI&text=Pure.DI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPure.DI" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPure.DI&title=Pure.DI" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPure.DI&title=Pure.DI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPure.DI" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Pure.DI

### In the same category (DependencyInjection) - 7 other generators


#### [AutoRegisterInject](/docs/AutoRegisterInject)


#### [DependencyModules.SourceGenerator](/docs/DependencyModules.SourceGenerator)


#### [depso](/docs/depso)


#### [FactoryGenerator](/docs/FactoryGenerator)


#### [Injectio](/docs/Injectio)


#### [jab](/docs/jab)


#### [ServiceScan.SourceGenerator](/docs/ServiceScan.SourceGenerator)

