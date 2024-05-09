# Minerals.AutoMixins

![GitHub License](https://img.shields.io/github/license/SzymonHalucha/Minerals.AutoMixins?style=for-the-badge)
![NuGet Version](https://img.shields.io/nuget/v/Minerals.AutoMixins?style=for-the-badge)
![NuGet Downloads](https://img.shields.io/nuget/dt/Minerals.AutoMixins?style=for-the-badge)

[Package on nuget.org](https://www.nuget.org/packages/Minerals.AutoMixins/)

This NuGet package provides a capability to automatically generate a [mix-in](https://en.wikipedia.org/wiki/Mixin) design pattern for C# classes by using only one attribute. This allows you to easily extend the functionality of existing classes.

## Funkcje

- **Easy mix-in definition:** Mix-in object are defined by using the ```[GenerateMixin]``` attribute.
- **Easy addition of mix-ins to a class:** To add a mix-in object to a class, use the ```[AddMixin(typeof(ExampleMixinClass))]``` attribute.
- **Optimized code generation:** The package uses an incremental source generator, so it doesn't significantly slow down the compilation process.
- **Compatibility with .NET Standard 2.0 and C# 7.3+:** Works on a wide range of platforms and development environments.

## Installation

Add the Minerals.AutoMixins nuget package to your C# project using the following methods:

### 1. Project file definition

```xml
<PackageReference Include="Minerals.AutoMixins" Version="0.2.1" />
```

### 2. dotnet command

```bat
dotnet add package Minerals.AutoMixins
```

## Why choose this package instead of the Default Interface Implementation?

Because the C# language option called "Default Interface Implementation", has limited runtime platform support. The Minerals.AutoMixins package is compatible with ```netstandard2.0``` and C# language version 7.3+.

## Usage

To define a mix-in object, add the ```[GenerateMixin]``` attribute to the selected class.

### Defining mix-in objects

```csharp
namespace Examples
{
    [Minerals.AutoMixins.GenerateMixin]
    public class ExampleMixin1
    {
        public float Property1 { get; set; } = 0.5f;

        private int _field1 = 0;

        private void Method1()
        {
            Console.WriteLine("Test1");
        }
    }

    [Minerals.AutoMixins.GenerateMixin]
    public class ExampleMixin2
    {
        public string PropertyText1 { get; set; } = "Test2";
    }
}
```

### Using mix-in objects

To use the selected mix-in object, add the ```[AddMixin(typeof(ExampleMixin1))]``` attribute to the selected class. The class implementing the **AddMixin** attribute must have the **partial** modifier to work properly.

```csharp
namespace Examples
{
    [Minerals.AutoMixins.AddMixin(typeof(ExampleMixin1))]
    public partial class ExampleClass
    {
        public int MyProperty { get; set; } = 3;
    }
}
```

The code above will generate an ```ExampleClass.g.cs``` file with a partial class ```ExampleClass```.

```csharp
namespace Examples
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public partial class ExampleClass
    {
        // MixinType: ExampleMixin1
        public float Property1 { get; set; } = 0.5f;
        private int _field1 = 0;
        private void Method1()
        {
            Console.WriteLine("Test1");
        }
    }
}
```

### Multiple mix-ins

This package allows you to add multiple mix-in objects to a single class through attribute arguments ```[AddMixin(typeof(ExampleMixin1), typeof(ExampleMixin2))]```.

```csharp
namespace Examples
{
    [Minerals.AutoMixins.AddMixin(typeof(ExampleMixin1), typeof(ExampleMixin2))]
    public partial class ExampleClass
    {
        public int MyProperty { get; set; } = 3;

        public void MyMethod()
        {

        }
    }
}
```

The code above will generate an ```ExampleClass.g.cs``` file with a partial class ```ExampleClass```.

```csharp
namespace Examples
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public partial class ExampleClass
    {
        // MixinType: ExampleMixin1
        public float Property1 { get; set; } = 0.5f;
        private int _field1 = 0;
        private void Method1()
        {
            Console.WriteLine("Test1");
        }
        // MixinType: ExampleMixin2
        public string PropertyText1 { get; set; } = "Test2";
        public string MethodText1()
        {
            return PropertyText1;
        }
    }
}
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [branches on this repository](https://github.com/SzymonHalucha/Minerals.AutoMixins/branches).

## Authors

- **Szymon Hałucha** - Maintainer

See also the list of [contributors](https://github.com/SzymonHalucha/Minerals.AutoMixins/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
