[![NuGet](https://img.shields.io/nuget/v/ConstructorGenerator.svg)](https://www.nuget.org/packages/ConstructorGenerator/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/k94ll13nn3/AutoConstructor/main/LICENSE)
![main_workflow](https://github.com/Swarley97/ConstructorGenerator/actions/workflows/main.yml/badge.svg)

# ConstructorGenerator

ConstructorGenerator is a C# source generator which generates constructors for you.

## Installation

Install the [ConstructorGenerator NuGet package](https://www.nuget.org/packages/ConstructorGenerator/).

### Package Manager Console

```powershell
Install-Package ConstructorGenerator
```

### .NET CLI

```bash
dotnet add package ConstructorGenerator
```

## Getting started

### Prerequisites

ConstructorGenerator requires C# 9.0 or later.

### Usage

Add the `[GenerateFullConstructor]` attribute to your class or struct and a constructor will be generated.

```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:
    
```csharp
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}
```
### Rules

Only for the following members a constructor parameter will be generated
- Read only fields with no initializer
- Get only Properties or init only properties with no initializer 
- Properties or fields with the `[ConstructorDependency]` attribute (this override the rules above)

**Examples**
```csharp
// ignored
private readonly IDependency _dependency = new Dependency();
```
```csharp
// not-ignored
private readonly IDependency _dependency;
```
```csharp
// not-ignored
[ConstructorDependency]
private readonly IDependency _dependency = new Dependency();
```

```csharp
// ignored
private readonly IDependency _dependency { get; } = new Dependency();
```
```csharp
// ignored
private readonly IDependency _dependency { get; set; }
```
```csharp
// not-ignored
private readonly IDependency _dependency { get; init; }
```
```csharp
// not-ignored
[ConstructorDependency]
private readonly IDependency _dependency { get; set; }
```

### Ignoring properties and fields

You can ignore properties and fields by adding the `[ExcludeConstructorDependency]` attribute to them.

```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    
    [ExcludeConstructorDependency]
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp
public MyClass(ILogger logger, IDependencyA dependency)
{
    _logger = logger;
    _dependency = dependency;
}
```

### Explicitly specifying properties and fields

You can explicitly specify the properties and fields which should be included in the generated constructor by adding the `[ConstructorDependency]` attribute to them.
This can be useful for the following cases: 
- If you do not want to use the `[GenerateFullConstructor]` attribute on the class or struct
- If you want to add additional constructor dependencies which are not included by default (see [Rules](#rules)) 
- If you want to specify it as optional parameter (see [Optional parameters](#optional-parameters))

```csharp
public partial class MyClass
{
    [ConstructorDependency]
    private readonly ILogger _logger = new NullLogger();
    
    [ConstructorDependency]
    private readonly IDependencyA _dependency;
    
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp
public MyClass(ILogger logger, IDependencyA dependency)
{
    _logger = logger;
    _dependency = dependency;
}
```

### Inheritance

ConstructorGenerator supports inheritance. You can put the `[GenerateFullConstructor]` attribute on a derived class.

```csharp

[GenerateFullConstructor]
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}

[GenerateFullConstructor]
public partial class MyDerivedClass : MyClass
{
    public IDependencyC DependencyC { get; }
}
```

The generated constructor will look like this:

```csharp
public MyDerivedClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB, IDependencyC dependencyC)
    : base(logger, dependency, dependencyB)
{
    DependencyC = dependencyC;
}
```

Or, if you just want to generate the base constructor call (for example because your derived class have no constructor dependencies), 
you can put the `[GenerateBaseConstructorCall]` attribute on the derived class.
    
```csharp

// constructor of MyClass
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}

[GenerateBaseConstructorCall]
public partial class MyDerivedClass : MyClass
{

}
```

The generated constructor will look like this:

```csharp
public MyDerivedClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
    : base(logger, dependency, dependencyB)
{
}
```

> **Note**: It doesn't matter whether the base class constructor is also generated by the ConstructorGenerator or manually defined in the code. In either case, the constructor call will be generated.

### Optional parameters

```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    [ConstructorDependency(IsOptional = true)]
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp
public MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB = null)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}
```

### Execute code in the generated constructor

To execute code in the constructor (like attaching events or something like this) you can implement the partial method `OnConstructing` which will be called after all fields and properties has been set.
```csharp
[GenerateFullConstructor]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    private readonly IDependencyB _dependencyB;
    
    partial void OnConstructing()
    {
        // do constructor stuff
        _logger.Log("Constructor called");
    }
}
```

### Constructor accessibility

ConstructorGenerator supports specifying the accessibility of the generated constructor. You can put the `[ConstructorAccessibility]` attribute on a class or struct and the constructor will be generated with the specified accessibility.

```csharp
[GenerateFullConstructor]
[ConstructorAccessibility(Accessibility.Internal)]
public partial class MyClass
{
    private readonly ILogger _logger;
    private readonly IDependencyA _dependency;
    private readonly IDependencyB _dependencyB;
}
```

The generated constructor will look like this:

```csharp

internal MyClass(ILogger logger, IDependencyA dependency, IDependencyB dependencyB)
{
    _logger = logger;
    _dependency = dependency;
    _dependencyB = dependencyB;
}
```

## License

ConstructorGenerator is licensed under the [MIT license](LICENSE).