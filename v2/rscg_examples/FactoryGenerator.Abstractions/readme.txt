# FactoryGenerator

.NET source generator that automatically
generates and registers [factories](https://github.com/ivmazurenko/factory-generator/blob/master/FactoryGenerator.Abstractions/IFactory.cs)


## Installation

Add the following packages to your project:

```bash
$ dotnet add package FactoryGenerator.Abstractions
$ dotnet add package FactoryGenerator.Microsoft.Extensions.DependencyInjection
```

## Usage

### Add the attribute to your class

Use one of the `GenerateIFactory` attributes to specify how your factory should be
generated:

```c#
[GenerateIFactory<int>]
public class Service(int value, Dependency dependency)
{
    // ...
}
```

This will generate an implementation of `IFactory<int, Service>`, allowing you to create instances of `Service` with an
`int` parameter while automatically resolving other dependencies from the DI container. FactoryGenerator
provides [multiple attribute variations](https://github.com/ivmazurenko/factory-generator/blob/master/FactoryGenerator.Abstractions/GenerateIFactoryAttribute.cs)
depending on the number of parameters your factory should accept.

### Register generated factories in the DI container

The `RegisterGeneratedFactories()` method automatically registers all factories created by the source
generator.

```c#

var serviceCollection = new ServiceCollection()
    .RegisterGeneratedFactories();

```

### Use the factory

```c#
using var serviceProvider = serviceCollection.BuildServiceProvider();

var factory = serviceProvider.GetRequiredService<IFactory<int, Service>>();

var service = factory.Create(1);
```

Full sample can be found [here](https://github.com/ivmazurenko/factory-generator/blob/master/Samples/Program.cs).