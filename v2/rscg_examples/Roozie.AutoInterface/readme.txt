# Roozie.AutoInterface

[![NuGet Version](https://img.shields.io/nuget/vpre/Roozie.AutoInterface)](https://www.nuget.org/packages/Roozie.AutoInterface)
[![NuGet](https://img.shields.io/nuget/dt/Roozie.AutoInterface.svg)](https://www.nuget.org/packages/Roozie.AutoInterface)

# What is it?

Roozie.AutoInterface is a C# source generator that generates an interface for a class. The generated interface contains
the XML-doc comments, public properties, and public methods.

# Why?

Interfaces are great for keeping your code loosely coupled and unit testable. But, they add some maintenance overhead.
This source generator will keep your interfaces up to date.

# How to use it?

1. Add the NuGet package to your project.

   `dotnet add package Roozie.AutoInterface --prerelease`

2. Create a class where you want to generate an interface.

```csharp
public class MyClass
{
    public string MyProperty { get; set; }

    public void MyMethod()
    {
        // Do something
    }
}
```

3. Add the `[AutoInterface]` attribute to the class.
4. An interface will be generated in the same namespace as the class.

You can now use the generated interface in your code.
If the class is `partial`, the interface will be automatically implemented.

Check out the tests ([1](/Roozie.AutoInterface.Tests), [2](/Roozie.AutoInterface.Tests.Integration)) for examples.

## Configuration

You can configure the generator in the `[AutoInterface]` attribute. The following options are available:

| Option             | Default Value    | Description                                                                                                                                                      |
|--------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name               | "I" + Class name | Set the interface to whatever name you want.                                                                                                                     |
| IncludeMethods     | `true`           | Set to `false`, the generator will automatically include methods in the interface. You can mark a method as included by adding the `[AddToInterface]` attribute. |
| IncludeProperties  | `true`           | Same as IncludeMethods                                                                                                                                           |
| ImplementOnPartial | `true`           | When true, the interface will be automatically implemented if the class is marked as partial.                                                                    |

# Contributing

Please open an issue if you find a bug or have a feature request. If you'd like to contribute, please open a pull
request.

# Kudos

Andrew Lock's [Source Generator series](https://andrewlock.net/series/creating-a-source-generator/) is an excellent
resource for learning all aspects of source generators.
