---
sidebar_position: 2860
title: 286 - SatorImaging.TDoubles
description: Generating test stubs with mocking for interfaces
slug: /SatorImaging.TDoubles
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveTests.mdx';

# SatorImaging.TDoubles  by Sator Imaging


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/SatorImaging.TDoubles?label=SatorImaging.TDoubles)](https://www.nuget.org/packages/SatorImaging.TDoubles/)
[![GitHub last commit](https://img.shields.io/github/last-commit/sator-imaging/TDoubles?label=updated)](https://github.com/sator-imaging/TDoubles)
![GitHub Repo stars](https://img.shields.io/github/stars/sator-imaging/TDoubles?style=social)

## Details

### Info
:::info

Name: **SatorImaging.TDoubles**

Incremental source generator for creating mock wrapper classes.

Author: Sator Imaging

NuGet: 
*https://www.nuget.org/packages/SatorImaging.TDoubles/*   


You can find more details at https://github.com/sator-imaging/TDoubles

Source: https://github.com/sator-imaging/TDoubles

:::

### Author
:::note
Sator Imaging 
![Alt text](https://github.com/sator-imaging.png)
:::

## Original Readme
:::note

[![nuget](https://img.shields.io/nuget/vpre/SatorImaging.TDoubles)](https://www.nuget.org/packages/SatorImaging.TDoubles)
[![test](https://github.com/sator-imaging/TDoubles/actions/workflows/test.yml/badge.svg)](https://github.com/sator-imaging/TDoubles/actions/workflows/test.yml)
&nbsp;
[![DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/sator-imaging/TDoubles)

[🇺🇸 English](./README.md)
&nbsp; ❘ &nbsp;
[🇯🇵 日本語版](./README.ja.md)
&nbsp; ❘ &nbsp;
[🇨🇳 简体中文版](./README.zh-CN.md)





![Hero](https://raw.githubusercontent.com/sator-imaging/TDoubles/main/GitHub-SocialPreview.png)

`TDoubles` is a powerful C# source generator that revolutionizes unit testing by creating mock wrapper classes at compile-time. Instead of relying on complex runtime reflection or proxy generation like traditional mocking frameworks, this generator produces clean, readable C# code during compilation that wraps your target types with customizable behavior.



## ✨ Comparison with Traditional Mocking Frameworks

| Feature | TDoubles | Traditional Frameworks (Moq, NSubstitute) |
|---------|---------------------------|-------------------------------------------|
| **Performance** | Zero runtime overhead, compile-time generation | Runtime reflection and proxy creation |
| **Type Safety** | Full compile-time checking and IntelliSense | Runtime configuration, limited IntelliSense |
| **Generic Support** | Full support including constraints | Limited generic type support |
| **Setup Complexity** | Single attribute, minimal configuration | Complex fluent APIs and setup expressions |
| **Debugging** | Generated code is readable and debuggable | Proxy objects can be difficult to debug |





# ⚡ Quick Start

Apply the `[Mock]` attribute to a partial class, and the generator handles the rest.

```cs
using TDoubles;

public interface IDataService
{
    string GetData(int id);
    void SaveData(string data);
}

[Mock(typeof(IDataService))]   // 👈
partial class DataServiceMock
{
    // Implementation will be generated automatically
}
```


Here shows how to use the mock in your code.

```cs
// Create the mock
var mockService = new DataServiceMock();

// Override behavior for testing
mockService.MockOverrides.GetData = (id) => $"MockData_{id}";
//          ~~~~~~~~~~~~~

string mockData = mockService.GetData(123); // Returns "MockData_123"
```


You can delegate to real implementation and override partial behaviour of the mock.

```cs
var mock = new DataServiceMock(new ConcreteDataService());

// Use default behavior (delegates to real service)
var realData = mock.GetData(123);

// Override partial behaviour for testing
mock.MockOverrides.SaveData = (data) => Console.WriteLine($"Saved: {data}");
mock.SaveData(realData);
```


Implements fake behaviors for debugging purposes in conjunction with latest update to the real implementation.

```cs
[Mock(typeof(IFoo), nameof(IFoo.Save), nameof(IFoo.Load))]
partial class FooFake
{
    public void Save() => File.WriteAllText("...", JsonUtility.ToJson(this, true));
    public void Load() => JsonUtility.FromJsonOverwrite(File.ReadAllText("..."), this);
}

// Delegates to latest ConcreteFoo implementation except for Save and Load
var fake = new FooFake(new ConcreteFoo());
```




## Generic Type Support

`TDoubles` provides support for generic type mocking on both unbound and closed constructed generics.

```cs
[Mock(typeof(IList<int>))]
partial class ListIntMock {}

// Proper type constraint for TKey is automatically generated and
// type parameter naming mismatch is also resolved
[Mock(typeof(IDictioanry<,>))]
partial class DictionaryMock<T, U> {}
```


## Efficient Callback Support

There are efficient extension points to implement custom callback for each mock member call.

> [!TIP]
> As C# specification, `partial void` method call is completely removed from built assembly when method body is not implemented in your mock class declaration.
>
> https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/partial-member

```cs
[Mock(typeof(IList<>))]
partial class ListSpy<T>  // 🕵 < Investigate suspects!
{
    readonly Dictionary<string, int> _callCountByName = new();

    // Without allocating object?[] instance
    partial void OnWillMockCall(string memberName)
    {
        if (!_callCountByName.TryGetValue(memberName, out var current))
        {
            current = 0;
        }
        _callCountByName[memberName] = current + 1;
    }

    // Another overload can take arguments passed to mock member
    // * Array.Empty<object>() is used for parameterless members
    partial void OnWillMockCall(string memberName, object?[] args)
    {
        // How to determine method overload
        if (memberName == "Add")
        {
            if (args[0] is T)
            {
                Console.WriteLine("Add(T item) is invoked.");
            }
            else
            {
                Console.WriteLine("Add(object item) is invoked.");
            }
        }
    }
}
```


## `Mock` Attribute Options

There are options to select generated mock members.

```cs
// Include internal types, interfaces and members to mock generation
[Mock(typeof(Foo), IncludeInternals = true)]
partial class FooMock \{ }

// Exclude specified members from mock generation (no error if member is not found)
[Mock(typeof(Foo), "ToString", "Foo", "Bar", IncludeInternals = false)]
partial class FooMockWithoutToStringOverride
{
    // You can re-implement excluded 'ToString' as you desired
    public override string ToString() => base.ToString() ?? "<NULL>";
}
```





# Introduction

The generator works by analyzing types marked with the `[Mock]` attribute and generating corresponding mock classes that delegate to the original implementation while providing override capabilities through a simple, strongly-typed API. This approach eliminates the performance overhead of reflection-based mocking while maintaining full type safety and IntelliSense support.


## Key Benefits

- **Zero Runtime Overhead**: Mock classes are generated at compile-time, eliminating reflection costs and improving test execution performance
- **Full Type Safety**: Generated mocks provide complete IntelliSense support, compile-time checking, and refactoring safety
- **Minimal Setup**: Simply add the NuGet package, apply the `[Mock]` attribute to a partial class, and the generator handles the rest
- **Universal Compatibility**: Supports all major C# type constructs including interfaces, classes, records, record structs, regular structs, and static classes
- **Advanced Generic Support**: Handles complex generic scenarios including type constraints, nested generics, and generic method overloads
- **Internal Member Access**: Optional `IncludeInternals` configuration allows mocking of internal members for comprehensive testing
- **Clean Generated Code**: Produces human-readable, debuggable mock implementations that integrate seamlessly with your codebase


## Use Cases

TDoubles generator excels in scenarios where you need:

- **High-Performance Testing**: When test execution speed is critical and reflection overhead is unacceptable
- **Legacy Code Testing**: Mocking existing classes and structs that weren't designed with interfaces
- **Static Method Testing**: Converting static methods to testable instance methods through mock wrappers
- **Record and Struct Mocking**: Testing value types and immutable records that traditional frameworks struggle with
- **Complex Generic Testing**: Mocking generic types with multiple type parameters and constraints
- **Internal API Testing**: Testing internal members without making them public


## How It Works

1. **Mark Target Types**: Apply the `[Mock(typeof(TargetType))]` attribute to a partial class
2. **Compile-Time Generation**: The source generator analyzes your target type and creates a mock implementation
3. **Delegate with Overrides**: Generated mocks delegate to the original instance while providing `MockOverrides` for custom behavior
4. **Test with Confidence**: Use the generated mock in your tests with full type safety and performance

### Delegation Logic

Here is pseudo code of delegation. Actual code is more complicated as need to support `ref` and `out` parameter modifiers.

```cs
public string GetData(int id)
{
    // Returns 'default' if value type or nullable reference type otherwise throws
    return MockOverrides.GetData?.Invoke(id)
        ?? _target?.GetData(id)
        ?? throw new TDoublesException(...);
}
```

### Generated Mock Structure

When you create a mock class, the generator adds several members:

```csharp
[Mock(typeof(IUserService))]
partial class UserServiceMock
{
    // Generated by source generator:

    // Constructor that takes the target instance
    public UserServiceMock(IUserService? target = default) \{ }

    // Access to the underlying target
    public IUserService? MockTarget \{ get; }

    // Unified callback
    partial void OnWillMockCall(string memberName);
    partial void OnWillMockCall(string memberName, object?[] args);

    // Override configuration object
    public sealed partial class MockOverrideContainer \{ }
    public MockOverrideContainer MockOverrides \{ get; }

    // All interface/class members are implemented
    public string GetUserName(int userId) \{ /* generated implementation */ }
    public Task<bool> DeleteUser(int userId) \{ /* generated implementation */ }
    // ... etc
}
```





# Installation

## NuGet Package Installation

### Package Manager Console

```powershell
Install-Package SatorImaging.TDoubles
```

### .NET CLI

```bash
dotnet add package SatorImaging.TDoubles
```

### PackageReference (Manual)

Add the following to your project file (`.csproj`):

```xml
<PackageReference Include="SatorImaging.TDoubles" Version="1.0.0" />
```


## System Requirements

- **.NET Framework**: .NET Standard 2.0 or higher
- **C# Language Version**: C# 7.3 or later
- **Compatible Runtimes**:
    - .NET Framework 4.6.1+
    - .NET Core 2.0+
    - .NET 5.0+
    - Unity 2022.3.12f1 or later


## Setup and Configuration

### Basic Setup

1. Install the NuGet package using one of the methods above
2. Rebuild your project to enable the source generator
3. Create partial classes with the `[Mock]` attribute to generate mocks

### Project Configuration

No additional project configuration is required. The source generator automatically activates when the package is installed and will generate mock classes during compilation.

### Verification

To verify the installation was successful:

1. Add a simple mock class to your project:
   ```csharp
   using TDoubles;
   
   public interface ITestService
   {
       string GetMessage();
   }
   
   [Mock(typeof(ITestService))]
   partial class TestServiceMock
   {
       // Mock implementation will be generated here
   }
   ```
2. Build your project
3. Check that no compilation errors occur and the mock class is generated


### IDE Support
- **Visual Studio**: Full IntelliSense support for generated mock classes
- **Visual Studio Code**: Works with C# extension
- **JetBrains Rider**: Full support with code completion
- **Command Line**: Works with `dotnet build` and `msbuild`





# Basic Usage

This section provides step-by-step examples to get you started with `TDoubles`. All examples are complete and ready to use in your projects.


## Prerequisites

Before using the TDoubles generator, ensure your mock classes meet these requirements:

1. **Partial Class**: Mock classes must be declared as `partial`
2. **Mock Attribute**: Apply `[Mock(typeof(TargetType))]` to the partial class
3. **Namespace**: Include `using TDoubles;`
4. **Visibility**: Use any visibility modifier (public, internal, etc.) - generated members will inherit the same visibility


## Simple Interface Mocking

The most common scenario is mocking interfaces for dependency injection testing.

### Example: User Service Interface

```csharp
using TDoubles;
using System;
using System.Threading.Tasks;

// Define your interface
public interface IUserService
{
    string GetUserName(int userId);
    Task<bool> DeleteUser(int userId);
    bool IsUserActive(int userId);
}

// Create a partial mock class
[Mock(typeof(IUserService))]
partial class UserServiceMock
{
    // The source generator will create the complete implementation here
}

// Example usage in tests
class Program
{
    static void Main()
    {
        // Create a concrete implementation for delegation
        var realService = new ConcreteUserService();
        
        // Create the mock with the real service as the underlying target
        var mockService = new UserServiceMock(realService);
        
        Console.WriteLine("=== Default Behavior (Delegates to Real Service) ===");
        Console.WriteLine($"User Name: {mockService.GetUserName(123)}");
        Console.WriteLine($"Is Active: {mockService.IsUserActive(123)}");
        
        Console.WriteLine("\n=== Custom Behavior with Overrides ===");
        
        // Override specific methods for testing
        mockService.MockOverrides.GetUserName = (userId) => $"MockUser_{userId}";
        mockService.MockOverrides.IsUserActive = (userId) => userId > 100;
        
        Console.WriteLine($"User Name (Overridden): {mockService.GetUserName(123)}");
        Console.WriteLine($"Is Active (Overridden): {mockService.IsUserActive(50)}");
        Console.WriteLine($"Is Active (Overridden): {mockService.IsUserActive(150)}");
        
        // Access the underlying real service if needed
        Console.WriteLine($"Real Service: {mockService.MockTarget.GetUserName(123)}");
    }
}

// Concrete implementation for demonstration
public class ConcreteUserService : IUserService
{
    public string GetUserName(int userId) => $"RealUser_{userId}";
    public async Task<bool> DeleteUser(int userId) => await Task.FromResult(true);
    public bool IsUserActive(int userId) => true;
}
```


## Class Mocking with Inheritance

Mock concrete classes to test inheritance scenarios and virtual method overrides.

### Example: Service Class with Virtual Methods

```csharp
using TDoubles;
using System;

// Base service class with virtual methods
public class DatabaseService
{
    public virtual string GetConnectionString() => "Server=localhost;Database=prod;";
    public virtual void SaveData(string data) => Console.WriteLine($"Saving to database: {data}");
    public virtual int GetRecordCount() => 1000;
    
    // Non-virtual method (will be wrapped but not overridable)
    public string GetServiceName() => "DatabaseService";
}

// Create mock for the class
[Mock(typeof(DatabaseService))]
partial class DatabaseServiceMock
{
    // Generated implementation will wrap all public methods
}

// Example usage
class Program
{
    static void Main()
    {
        // Create real service instance
        var realService = new DatabaseService();
        
        // Create mock wrapper
        var mockService = new DatabaseServiceMock(realService);
        
        Console.WriteLine("=== Default Behavior ===");
        Console.WriteLine($"Connection: {mockService.GetConnectionString()}");
        Console.WriteLine($"Service Name: {mockService.GetServiceName()}");
        Console.WriteLine($"Record Count: {mockService.GetRecordCount()}");
        mockService.SaveData("test data");
        
        Console.WriteLine("\n=== Testing Scenario Overrides ===");
        
        // Override for testing scenarios
        mockService.MockOverrides.GetConnectionString = () => "Server=testserver;Database=test;";
        mockService.MockOverrides.GetRecordCount = () => 0; // Simulate empty database
        mockService.MockOverrides.SaveData = (data) => Console.WriteLine($"TEST MODE: Would save '{data}'");
        
        Console.WriteLine($"Test Connection: {mockService.GetConnectionString()}");
        Console.WriteLine($"Test Record Count: {mockService.GetRecordCount()}");
        mockService.SaveData("test data");
        
        // Non-virtual methods still work but delegate to original
        Console.WriteLine($"Service Name (always delegates): {mockService.GetServiceName()}");
    }
}
```


## Inheritance and Interface Implementation

Mock classes that both inherit from base classes and implement interfaces.

### Example: Complex Service Hierarchy

```csharp
using TDoubles;
using System;

// Interface definition
public interface INotificationService
{
    void SendNotification(string message);
    bool IsServiceAvailable();
}

// Base class with virtual methods
public class BaseService
{
    public virtual string GetServiceType() => "Base";
    public virtual void Initialize() => Console.WriteLine("Base initialization");
}

// Concrete class that inherits and implements interface
public class EmailService : BaseService, INotificationService
{
    public override string GetServiceType() => "Email";
    public override void Initialize() => Console.WriteLine("Email service initialized");
    
    public void SendNotification(string message) => Console.WriteLine($"Email: {message}");
    public bool IsServiceAvailable() => true;
}

// Mock the concrete class
[Mock(typeof(EmailService))]
partial class EmailServiceMock
{
    // Mocks both inherited methods and interface implementations
}

// Usage example
class Program
{
    static void Main()
    {
        var realService = new EmailService();
        var mockService = new EmailServiceMock(realService);
        
        Console.WriteLine("=== Testing Inherited Methods ===");
        Console.WriteLine($"Service Type: {mockService.GetServiceType()}");
        mockService.Initialize();
        
        Console.WriteLine("\n=== Testing Interface Methods ===");
        mockService.SendNotification("Hello World");
        Console.WriteLine($"Available: {mockService.IsServiceAvailable()}");
        
        Console.WriteLine("\n=== Testing with Overrides ===");
        
        // Override inherited method
        mockService.MockOverrides.GetServiceType = () => "MockEmail";
        mockService.MockOverrides.Initialize = () => Console.WriteLine("Mock initialization");
        
        // Override interface methods
        mockService.MockOverrides.SendNotification = (msg) => Console.WriteLine($"MOCK EMAIL: {msg}");
        mockService.MockOverrides.IsServiceAvailable = () => false;
        
        Console.WriteLine($"Service Type: {mockService.GetServiceType()}");
        mockService.Initialize();
        mockService.SendNotification("Test Message");
        Console.WriteLine($"Available: {mockService.IsServiceAvailable()}");
    }
}
```





# Advanced Usage

For advanced scenarios including generic types, static classes, records, structs, and internal member access, see the [Advanced Usage Guide](docs/advanced-usage.md).





# Testing Examples

For comprehensive testing examples with MSTest, NUnit, and performance comparisons, see the [Testing Examples Guide](docs/testing-examples.md).










# Technical Note

## `record` and `record struct`

- Always implements `IEquatable<MOCK_TARGET_RECORD>` and `MockOverrides.MockTargetRecord_Equals`
    - Note that it is *NOT* `IEquatable<GENERATED_MOCK>`
- `bool Equals(object?)` cannot be overridden





# Known Limitations and Unsupported Scenarios

## Type Parameters of Generic Method

When method uses method-level type parameter instead of type-level parameter, `MockOverrides` will use `object` instead of method-level type parameter.

```cs
// Generated mock has type-level parameter T
partial class Mock<T>
{
    // Generated mock method that has T and TMethod type parameter
    public TMethod GenericMethod<T, TMethod>(T input) \{ ... }

    // <TMethod> can be added to this class but it must also be exposed as type-level parameter...
    public sealed partial class MockOverrideContainer
    {
        // type-level parameter T is used but TMethod is shadowed to object
        public Func<T, object> GenericMethod \{ get; set; }
        //             ~~~~~~ Not TMethod
    }
}
```

> [!NOTE]
> Generated mock method returns `TMethod` as mock target does. Internally, mock method will cast `object` result from override to `TMethod` when returning value.


## Type System Limitations

**Unsupported Types:**
- Enums (use wrapper classes instead)
- Delegates and function pointers
- Primitive types (`int`, `string`, etc.)
- Static classes with only static constructors
- Abstract classes with pure virtual methods requiring implementation
- `object`, `ValueType`, `Enum` and other special types such as `Span<T>`


## Type Constraint Limitations

**Unsupported Constraints:**
- `where T : default`
- `where T : allows ref struct`


## Return Type Limitations

**Unsupported Type:**
- `ref` return type


## Attribute Limitations

Attributes on type, method, property or etc are not preserved in generated mock.


## Method and Property Limitations

**Unsupported Members:**
- `ref` and `out` parameters in some complex scenarios (?)
- ~~Methods with `__arglist` (variable arguments)~~
- ~~Explicit interface implementations with name conflicts~~
- ~~Properties with complex getter/setter accessibility combinations~~

**Partial Support:**

```csharp
public interface IService
{
    // ✅ Fully supported
    string GetData(int id);
    Task<bool> ProcessAsync(string data);
    
    // ⚠️ Limited support - may not override correctly
    ref int GetReference();
    void ProcessData(__arglist);
}
```


## Generic Method Limitations

Some valid type constraint is not transformed correctly. We have no plan to support this edge case of type constraint.

> Note: `override` method cannot have type constraint except for `class` and `struct`.

```cs
// Abstract method declaration that returns (M, N?) with where M : N? constraint
public abstract (M t, N? u) TypeArgMappingNullable_Abstract<M, N>() where M : N?;

// Expected (valid) return type is (M, N)
public override (M t, N u) TypeArgMappingNullable_Abstract<M, N>() \{ }

// But got (M, N?)
public override (M t, N? u) TypeArgMappingNullable_Abstract<M, N>() \{ }
```



## Inheritance and Interface Limitations

**Multiple Interface Implementation:**
- ~~Supported, but explicit interface implementations may have naming conflicts~~
- Diamond inheritance patterns may cause method resolution issues

**Virtual Method Overriding:**
- ~~Only `virtual` and `abstract` methods can be overridden in class mocks~~
- `sealed` methods cannot be overridden (will delegate to original)


## Platform and Framework Limitations

**Framework Support:**
- Requires .NET Standard 2.0 or higher
- Source generators require C# 7.3 or later
- Some advanced C# 11+ features may not be fully supported

**IDE Integration:**
- IntelliSense may be delayed for newly generated mocks
- Some IDEs may require rebuild to recognize generated code
- Debugging generated code may show optimized/synthetic code





# Contributing

We welcome and appreciate contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or providing feedback, your contributions help make TDoubles better for everyone.

See [CONTRIBUTING.md](CONTRIBUTING.md)





# Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.





# Support and Community

## Getting Help

If you encounter issues not covered in this troubleshooting guide:

1. **Check the GitHub Issues:** Search existing issues for similar problems
2. **Create a Minimal Reproduction:** Provide the smallest possible code example that demonstrates the issue
3. **Include Build Output:** Share relevant compiler errors and warnings
4. **Specify Environment:** Include .NET version, IDE, and operating system details

**Support Channels:**
- [GitHub Discussions](https://github.com/sator-imaging/TDoubles/discussions) - Questions and community support
- [GitHub Issues](https://github.com/sator-imaging/TDoubles/issues) - Bug reports and feature requests


## Reporting Security Issues

If you discover a security vulnerability, please report it privately by emailing the maintainers rather than creating a public issue. This allows us to address the issue before it becomes widely known.





# Project Information

## TODO: Help Wanted

- Missing Tests
    - `static` class mocking
    - `sealed` overridden methods
    - `async` tests
    - `event` getter and setter tests
    - `readonly struct` tests
    - `readonly record struct` tests
    - `Tuple` and `ValueTuple` tests
    - Property and indexer accessibility tests (e.g., `{ get; private set; }` or etc)
- Missing Features
    - `ref` return
    - Attribute preservation
    - Add proper `<inheritdoc cref="..." />` for mock members
    - Support for `default` and `allows ref struct` type constraint
        - The `default` constraint is valid on override and explicit interface implementation methods only
        - Roslyn update is required while keeping Unity engine support
    - Emit diagnostic error on type parameters
- Optimization
    - Use `ImmutableArray<T>` or `ImmutableList<T>` as possible
    - Eliminate inefficient `StringBuilder` use
- Refactor
    - Eliminate FP programming techniques
        - Transform data model to domain model to encapsulate information and behaviour
        - Centralize blueprint-to-C# conversion in domain model to make it consistent, robust and maintainable
        - Eliminate duplicate functions, control flows and etc scattered in codebase
- Optional
    - ~~New `Mock` attribute option to generate `MockCallCounts` that records the call count of each mock member~~
        - Declare `volatile int` fields
        - Increment count by `Interlocked.Increment(ref ...)` method at the beginning of generated mock class member.


## Author and Maintainer

**Sator Imaging**
- GitHub: [@sator-imaging](https://github.com/sator-imaging)
- Project Repository: [sator-imaging/TDoubles](https://github.com/sator-imaging/TDoubles)


## Acknowledgments

We thank all contributors who have helped improve this project through code contributions, bug reports, feature suggestions, and community support.


## License

This project is licensed under the **MIT License**.

### Third-Party Licenses

This project uses the following third-party packages:
- **Microsoft.CodeAnalysis.CSharp** (MIT License)
- **Microsoft.CodeAnalysis.Analyzers** (MIT License)





---

**&copy; 2025 Sator Imaging. All rights reserved.**

For support, questions, or contributions, please visit our [GitHub repository](https://github.com/sator-imaging/TDoubles).


:::

### About
:::note

Generating test stubs with mocking for interfaces


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SatorImaging.TDoubles**
```xml showLineNumbers {17}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.5.0" />
    <PackageReference Include="MSTest.TestAdapter" Version="2.2.10" />
    <PackageReference Include="MSTest.TestFramework" Version="2.2.10" />
    <PackageReference Include="coverlet.collector" Version="3.2.0" />
    <PackageReference Include="SatorImaging.TDoubles" Version="1.0.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Mock\MockData.csproj" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SatorImaging.TDoubles\src\Mock\IMyClock.cs" label="IMyClock.cs" >

  This is the use of **SatorImaging.TDoubles** in *IMyClock.cs*

```csharp showLineNumbers 
namespace MockData;

public interface IMyClock
{
    public DateTime GetNow();
    public DateTime GetUtcNow();
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SatorImaging.TDoubles\src\TestClock\TestClock.cs" label="TestClock.cs" >

  This is the use of **SatorImaging.TDoubles** in *TestClock.cs*

```csharp showLineNumbers 


namespace TestClock;

[TDoubles.Mock(typeof(IMyClock))]
public partial class QuickStartRepoStub \{ }


[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var expectations = new QuickStartRepoStub();
        expectations.MockOverrides.GetNow =()=>(DateTime.Now.AddYears(-1));
        
        IMyClock mock = expectations;
        var data= mock.GetNow();
        Assert.AreEqual(DateTime.Now.Year -1, data.Year);
        
    }
}



```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SatorImaging.TDoubles\src\TestClock\obj\GX\SatorImaging.TDoubles\TDoubles.TDoublesSourceGenerator\TestClock.QuickStartRepoStub.g.cs" label="TestClock.QuickStartRepoStub.g.cs" >
```csharp showLineNumbers 
#nullable enable

namespace TestClock
{
    partial class QuickStartRepoStub
        : global::MockData.IMyClock
    {
        public QuickStartRepoStub(global::MockData.IMyClock? target = default)
        {
            _target = target;
            MockOverrides = new MockOverrideContainer();
        }

        /// <summary>
        /// Gets the underlying target instance being mocked.
        /// </summary>
        public global::MockData.IMyClock? MockTarget => _target;

        private readonly global::MockData.IMyClock? _target;

        /// <summary>
        /// Gets the container for method and property overrides.
        /// </summary>
        public MockOverrideContainer MockOverrides \{ get; }

        public global::System.DateTime GetNow()
        {
            OnWillMockCall("GetNow"); OnWillMockCall("GetNow", global::System.Array.Empty<object>());

            global::System.DateTime __STMG_2025_08_25__ = default!;
            if (MockOverrides.GetNow != null) {
                __STMG_2025_08_25__ = (global::System.DateTime)MockOverrides.GetNow.Invoke();
            }

            return (global::System.DateTime)((MockOverrides.GetNow != null ? __STMG_2025_08_25__ : (_target != null ? ((global::MockData.IMyClock?)_target)!.GetNow() : default)));
        }

        public global::System.DateTime GetUtcNow()
        {
            OnWillMockCall("GetUtcNow"); OnWillMockCall("GetUtcNow", global::System.Array.Empty<object>());

            global::System.DateTime __STMG_2025_08_25__ = default!;
            if (MockOverrides.GetUtcNow != null) {
                __STMG_2025_08_25__ = (global::System.DateTime)MockOverrides.GetUtcNow.Invoke();
            }

            return (global::System.DateTime)((MockOverrides.GetUtcNow != null ? __STMG_2025_08_25__ : (_target != null ? ((global::MockData.IMyClock?)_target)!.GetUtcNow() : default)));
        }

        public override bool Equals(object? obj)
        {
            OnWillMockCall("Equals"); OnWillMockCall("Equals", new object?[] \{ obj });

            bool __STMG_2025_08_25__ = default!;
            if (MockOverrides.Equals != null) {
                __STMG_2025_08_25__ = (bool)MockOverrides.Equals.Invoke(obj);
            }

            return (bool)((MockOverrides.Equals != null ? __STMG_2025_08_25__ : (_target != null ? ((object?)_target)!.Equals(obj) : default)));
        }

        public override int GetHashCode()
        {
            OnWillMockCall("GetHashCode"); OnWillMockCall("GetHashCode", global::System.Array.Empty<object>());

            int __STMG_2025_08_25__ = default!;
            if (MockOverrides.GetHashCode != null) {
                __STMG_2025_08_25__ = (int)MockOverrides.GetHashCode.Invoke();
            }

            return (int)((MockOverrides.GetHashCode != null ? __STMG_2025_08_25__ : (_target != null ? ((object?)_target)!.GetHashCode() : default)));
        }

        public override string? ToString()
        {
            OnWillMockCall("ToString"); OnWillMockCall("ToString", global::System.Array.Empty<object>());

            string? __STMG_2025_08_25__ = default!;
            if (MockOverrides.ToString != null) {
                __STMG_2025_08_25__ = (string?)MockOverrides.ToString.Invoke();
            }

            return (string?)((MockOverrides.ToString != null ? __STMG_2025_08_25__ : (_target != null ? ((object?)_target)!.ToString() : default)));
        }

        /// <summary>
        /// Container for method and property overrides.
        /// </summary>
        public sealed partial class MockOverrideContainer
        {
            /// <summary>
            /// Override for global::MockData.IMyClock.GetNow method:<br/><c>+ DateTime GetNow()</c>
            /// </summary>
            public global::System.Func<global::System.DateTime>? GetNow \{ get; set; }

            /// <summary>
            /// Override for global::MockData.IMyClock.GetUtcNow method:<br/><c>+ DateTime GetUtcNow()</c>
            /// </summary>
            public global::System.Func<global::System.DateTime>? GetUtcNow \{ get; set; }

            /// <summary>
            /// Override for object.Equals method:<br/><c>+ bool Equals(object? obj)</c>
            /// </summary>
            public new global::System.Func<object?, bool>? Equals \{ get; set; }

            /// <summary>
            /// Override for object.GetHashCode method:<br/><c>+ int GetHashCode()</c>
            /// </summary>
            public new global::System.Func<int>? GetHashCode \{ get; set; }

            /// <summary>
            /// Override for object.ToString method:<br/><c>+ string? ToString()</c>
            /// </summary>
            public new global::System.Func<string?>? ToString \{ get; set; }

        }

        /// <summary>
        /// The unified callback invoked before each mock call.
        /// </summary>
        /// <param name="memberName">The short name of original member without generic type parameters.</param>
        partial void OnWillMockCall(string memberName);

        /// <summary>
        /// The unified callback invoked before each mock call.
        /// </summary>
        /// <param name="memberName">The short name of original member without generic type parameters.</param>
        partial void OnWillMockCall(string memberName, object?[] args);
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SatorImaging.TDoubles\src\TestClock\obj\GX\SatorImaging.TDoubles\TDoubles.TDoublesSourceGenerator\_ TDoubles _ MockAttribute.g.cs" label="_ TDoubles _ MockAttribute.g.cs" >
```csharp showLineNumbers 
using System;

namespace TDoubles
{
    /// <summary>
    /// Attribute used to mark partial classes for mock generation.
    /// The source generator will create a mock implementation that delegates to the target type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = false)]
    internal sealed class MockAttribute : Attribute
    {
        /// <summary>
        /// Gets the target type to be mocked.
        /// </summary>
        public Type TargetType \{ get; }
        
        /// <summary>
        /// Gets or sets whether to include internal members in the mock.
        /// Default is false (public members only).
        /// </summary>
        public bool IncludeInternals \{ get; set; \} = false;

        /// <summary>
        /// Gets or sets the short names of members to exclude from the generated mock.
        /// </summary>
        public string[] ExcludeMemberShortNames \{ get; set; \} = Array.Empty<string>();
        
        /// <summary>
        /// Initializes a new instance of the MockAttribute with the specified target type.
        /// </summary>
        /// <param name="targetType">The type to be mocked. Cannot be null.</param>
        /// <param name="excludeMemberShortNames">Optional: Short names of members to exclude from the generated mock.</param>
        /// <exception cref="ArgumentNullException">Thrown when targetType is null.</exception>
        public MockAttribute(Type targetType, params string[] excludeMemberShortNames)
        {
            TargetType = targetType ?? throw new ArgumentNullException(nameof(targetType));
            ExcludeMemberShortNames = excludeMemberShortNames ?? Array.Empty<string>();
        }
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SatorImaging.TDoubles\src\TestClock\obj\GX\SatorImaging.TDoubles\TDoubles.TDoublesSourceGenerator\_ TDoubles _ TDoublesException.g.cs" label="_ TDoubles _ TDoublesException.g.cs" >
```csharp showLineNumbers 
using System;

namespace TDoubles
{
    /// <summary>
    /// Exception thrown when a mock member has no override and returns a non-nullable reference type.
    /// This exception provides clear information about which member lacks a mock implementation.
    /// </summary>
    internal class TDoublesException : Exception
    {
        /// <summary>
        /// Gets the name of the member that lacks a mock implementation.
        /// </summary>
        public string MemberName \{ get; }
        
        /// <summary>
        /// Gets the name of the type that contains the member.
        /// </summary>
        public string TypeName \{ get; }
        
        /// <summary>
        /// Initializes a new instance of the TDoublesException with the specified member and type names.
        /// </summary>
        /// <param name="memberName">The name of the member that lacks a mock implementation. Cannot be null.</param>
        /// <param name="typeName">The name of the type that contains the member. Cannot be null.</param>
        public TDoublesException(string memberName, string typeName) 
            : base($"No mock override provided for member '{memberName}' in type '{typeName}' that returns a non-nullable reference type.")
        {
            MemberName = memberName ?? throw new ArgumentNullException(nameof(memberName));
            TypeName = typeName ?? throw new ArgumentNullException(nameof(typeName));
        }
        
        /// <summary>
        /// Initializes a new instance of the TDoublesException with the specified member name, type name, and custom message.
        /// </summary>
        /// <param name="memberName">The name of the member that lacks a mock implementation. Cannot be null.</param>
        /// <param name="typeName">The name of the type that contains the member. Cannot be null.</param>
        /// <param name="message">The custom error message.</param>
        public TDoublesException(string memberName, string typeName, string message) 
            : base(message)
        {
            MemberName = memberName ?? throw new ArgumentNullException(nameof(memberName));
            TypeName = typeName ?? throw new ArgumentNullException(nameof(typeName));
        }
    }
}
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project SatorImaging.TDoubles ](/sources/SatorImaging.TDoubles.zip)

:::


### Share SatorImaging.TDoubles 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSatorImaging.TDoubles&quote=SatorImaging.TDoubles" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSatorImaging.TDoubles&text=SatorImaging.TDoubles:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSatorImaging.TDoubles" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSatorImaging.TDoubles&title=SatorImaging.TDoubles" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSatorImaging.TDoubles&title=SatorImaging.TDoubles&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSatorImaging.TDoubles" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SatorImaging.TDoubles

<SameCategory />

