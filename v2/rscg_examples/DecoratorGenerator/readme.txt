# Decorator Generator

[![Nuget](https://img.shields.io/nuget/v/DecoratorGenerator)](https://www.nuget.org/packages/DecoratorGenerator)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/CodingFlow/decorator-generator/pull-request.yml)
[![Nuget](https://img.shields.io/nuget/dt/DecoratorGenerator)](https://www.nuget.org/packages/DecoratorGenerator)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/CodingFlow)](https://github.com/sponsors/CodingFlow)

Source generator for decorator pattern boilerplate code in C#.

When implementing the [decorator pattern in C#](https://en.wikipedia.org/wiki/Decorator_pattern#C#), it requires adding boilerplate code for every interface that needs to support decorators, namely the abstract class. Boilerplate is tedious to write and error-prone. This source generator solves this problem by automatically generating the abstract class. It only needs to be told which interfaces it should generate the abstract class for.

![decorator-pattern-uml](https://user-images.githubusercontent.com/3643313/220009438-a2ef1990-af1e-4b56-a5c9-b3f1aed2d80f.png)

# Getting Started

## Installation

Add the library via NuGet to the project(s) that you want to auto-generate abstract decorator classes for:

- Either via Project > Manage NuGet Packages... / Browse / search for decorator-generator / Install
- Or by running a command in the Package Manager Console

```c#
Install-Package DecoratorGenerator
```

## Usage

Add a `Decorate` attribute to the interface:

```c#
using DecoratorGenerator;

namespace SampleLibrary;

[Decorate]
public interface ICat
{
    string Meow();
}
```

Since this library is an [incremental source generator](https://github.com/dotnet/roslyn/blob/d8c21d64ca958840bdaa2898cb2324397dc57bbb/docs/features/incremental-generators.md), the abstract class should be generated after saving the changes to interface's file. The generated class will be named after the interface, but without the `I` prefix. In this case, since the interface is `ICat` the class will be `CatDecorator`. Then create your decorator class as usual:

```c#
namespace SampleLibrary;

public class BarkingCat : CatDecorator
{
    public BarkingCat(ICat cat) : base(cat)
    {

    }

    public override string Meow()
    {
        return $"woof woof - {base.Meow()}";
    }
}

```

Example usage of the decorator:

```c#
using SampleLibrary;

namespace SampleApp;

partial class Program
{

    static void Main(string[] args)
    {
        var cat = new BarkingCat(new Cat());
        var sound = cat.Meow();

        Console.WriteLine(sound);
    }

}
```

# Configuration

## List of Target Interfaces in a Config file

To generate decorator abstract classes for third party interfaces, Decorator Generator will look for a struct named `WrapperList` and generate classes of the types in the fields of the `WrapperList`:

```c#
using Amazon.DynamoDBv2.DataModel;

public struct WrapperList
{
    // name the field whatever you want, the name isn't used, only the type is used.
    IDynamoDBContext dynamoDBContext;
}
```

In this case, it will generate a class for `IDynamoDBContext` called `DynamoDBContextDecorator`. This feature will also work for your own interfaces if you prefer this approach instead of using the attribute.
