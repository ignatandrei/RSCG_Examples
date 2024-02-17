# Source Depend

A source generator for C# that uses [Roslyn](https://github.com/dotnet/roslyn) (the C# compiler) to help you with dependency injection (DI). It saves you from writing the constructor because this will be written for you (during compile time). Just tag the member with a **\[Dependency\]** attribute.

[![NuGet version (sourcedepend)](https://img.shields.io/nuget/v/sourcedepend?color=blue)](https://www.nuget.org/packages/sourcedepend/)
[![License](https://img.shields.io/github/license/crwsolutions/sourcedepend.svg)](https://github.com/crwsolutions/sourcedepend/blob/master/LICENSE.txt)

### Version history

- v0.1\. First implementation.
- v0.2\. Complete rewrite from ISourceGenerator to IIncrementalGenerator, this should boost performance
    + keep sealed and accessibility intact.
- v0.3\. Complete Rewrite: reorganized the code.
    + Allow one level of inheritance. 

## How to use it

Install it and add the attribute to the fields or properties you want be set in your constructor, like so:

```csharp
public partial class ExampleService
{
    [Dependency]
    private readonly AnotherService anotherService;

    [Dependency]
    AnotherService Prop { get; }
}
```

### Alternative assignment

It is also possible that the generated assignment is to an alternative property:

```csharp
public partial class ExampleService
{
    [Dependency(nameof(BindingContext))]
    AnotherService ViewModel => BindingContext as AnotherService;
}
```

### Inheritance

And it is possible to inherit from a base implementation that also uses the **\[Dependency\]** attribute:

```csharp
internal partial class BaseExampleService
{
    [Dependency]
    private readonly IForBaseService _someBaseService;
}

internal partial class ExampleService : BaseExampleService
{

}
```
### Add construction work

Because your constructor is highjacked, there are the alternative methods PreConstruct/PostConstruct to do your construction work:

```csharp
public partial class ExampleService
{
    [Dependency]
    private readonly AnotherService anotherService;

    ///This method will be called before the generated assignments
    partial void PreConstruct()
    {
        Initialize()
    }

    ///This method will be called after the generated assignments
    partial void PostConstruct() => anotherService.ConstructValue = "Hello from post-construct!";
}
```

These samples give the following combined generated code:

```csharp
namespace ConsoleApp
{
    public partial class ExampleService
    {
        public ExampleService(ConsoleApp.IAnotherService anotherService, ConsoleApp.AnotherService prop, ConsoleApp.AnotherService viewModel, ConsoleApp.IForBaseService someBaseService) : base(someBaseService)
        {
            PreConstruct();

            this.anotherService = anotherService;
            Prop = prop;
            BindingContext = viewModel;

            PostConstruct();
        }

        partial void PreConstruct();
        partial void PostConstruct();
    }
}

namespace ConsoleApp
{
    /// <inheritdoc/>
    internal partial class BaseExampleService
    {
        public BaseExampleService(ConsoleApp.IForBaseService someBaseService)
        {
            PreConstruct();

            this._someBaseService = someBaseService;

            PostConstruct();
        }

        partial void PreConstruct();
        partial void PostConstruct();
    }
}
```

## Installing

The package is available [on NuGet](https://www.nuget.org/packages/sourcedepend).
To install from the command line:

```shell
dotnet add package sourcedepend
```

Or use the Package Manager in Visual Studio.

## Contributing

The main supported IDE for development is Visual Studio 2019.

Questions, comments, bug reports, and pull requests are all welcome.
Bug reports that include steps to reproduce (including code) are
preferred. Even better, make them in the form of pull requests.

## Maintainers/Core team

Contributors can be found at the [contributors](https://github.com/crwsolutions/sourcedepend/graphs/contributors) page on Github.

## License

This software is open source, licensed under the MIT License.
See [LICENSE](https://github.com/crwsolutions/sourcedepend/blob/master/LICENSE) for details.
Check out the terms of the license before you contribute, fork, copy or do anything
with the code. If you decide to contribute you agree to grant copyright of all your contribution to this project and agree to
mention clearly if do not agree to these terms. Your work will be licensed with the project at MIT, along the rest of the code.
