# Minerals.AutoInterfaces

![GitHub License](https://img.shields.io/github/license/SzymonHalucha/Minerals.AutoInterfaces?style=for-the-badge&link=https%3A%2F%2Fgithub.com%2FSzymonHalucha%2FMinerals.AutoInterfaces%2F)
![NuGet Version](https://img.shields.io/nuget/v/Minerals.AutoInterfaces?style=for-the-badge&link=https%3A%2F%2Fwww.nuget.org%2Fpackages%2FMinerals.AutoInterfaces%2F)
![NuGet Downloads](https://img.shields.io/nuget/dt/Minerals.AutoInterfaces?style=for-the-badge&link=https%3A%2F%2Fwww.nuget.org%2Fpackages%2FMinerals.AutoInterfaces%2F)

This NuGet package provides a functionality to automatically generate interfaces for C# classes with a single attribute. This simplifies the creation of interfaces for classes with clearly defined public members, without having to manually write interface code.

## Features

- **Automatic interface generation:** Saves time and reduces the risk of errors when creating interfaces for classes.
- **Support for generic methods and constraints:** Allows for generating interfaces for complex classes with generic methods.
- **Support for custom getters and setters:** Generates interfaces for properties with custom getter and setter implementations.
- **Customizable interface name:** Allows you to name the interface according to naming conventions or user preferences.
- **Compatible with .NET Standard 2.0 and C# 7.3+:** Works on a wide range of platforms and development environments.

## Installation

Add the Minerals.AutoInterfaces nuget package to your C# project using the following methods:

### 1. Project file definition

```xml
<PackageReference Include="Minerals.AutoInterfaces" Version="0.1.*" />
```

### 2. dotnet command

```bat
dotnet add package Minerals.AutoInterfaces
```

## Usage

To use the package, add the ```[GenerateInterface]``` attribute to the selected class.

```csharp
namespace Examples
{
    [Minerals.AutoInterfaces.GenerateInterface]
    public class ExampleClass
    {
        public int Property1 { get; set; } = 1;
        public int Property2 { get; private set; } = 2;
        public int Property3
        {
            get { return _field1; }
            set { _field1 = value; }
        }

        private int _field1 = 0;

        public int Method1(int arg0, int arg1)
        {
            return arg0 + arg1;
        }

        public void Method2<T>(T arg0) where T : class, new()
        {
            return $"{arg0}";
        }

        protected void Method3() { }
    }
}
```

The code above will generate the ```IExampleClass.g.cs``` file with the ```IExampleClass``` interface.

```csharp
namespace Examples
{
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    public interface IExampleClass
    {
        int Property1 { get; set; }
        int Property2 { get; }
        int Property3 { get; set; }
        int Method1(int arg0, int arg1);
        string Method2<T>(T arg0) where T : class, new();
    }
}
```

### Package supports custom interface names

```csharp
namespace Examples
{
    [Minerals.AutoInterfaces.GenerateInterface("ExampleInterface")]
    public class ExampleClass
    {
        public int Property1 { get; protected set; } = 1;
    }
}
```

The code above will generate the ```ExampleInterface.g.cs``` file with the ```ExampleInterface``` interface.

```csharp
namespace Examples
{
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    public interface ExampleInterface
    {
        int Property1 { get; }
    }
}
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [branches on this repository](https://github.com/SzymonHalucha/Minerals.AutoInterfaces/branches).

## Authors

- **Szymon Hałucha** - Maintainer

See also the list of [contributors](https://github.com/SzymonHalucha/Minerals.AutoInterfaces/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
