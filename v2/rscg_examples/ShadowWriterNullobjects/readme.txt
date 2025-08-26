# ShadowWriter

[![NuGet](https://img.shields.io/nuget/v/ShadowWriter.svg)](https://www.nuget.org/packages/ShadowWriter)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/StefanStolz/ShadowWriter/build.yml?branch=main)](https://github.com/StefanStolz/ShadowWriter/actions)

**ShadowWriter** is a Roslyn Source Generator designed to simplify and automate aspects of .NET development.  
It currently supports the following features:

## ✨ Features

Samples can be found in the [Source-Code](https://github.com/StefanStolz/ShadowWriter/tree/main/src/ShadowWriter.Sample) or in the [Wiki](https://github.com/StefanStolz/ShadowWriter/wiki).

### 1. Generate Null Objects
The NullObject feature in ShadowWriter provides a simple way to automatically generate null object implementations for interfaces and classes. This pattern is useful for providing default "do nothing" implementations that can help avoid null reference exceptions and simplify code.

#### Usage
To create a null object implementation, simply add the `[NullObject]` attribute to your class:

```csharp
[NullObject]
public partial class ImplementingMyInterface : IMyInterface
{
}
```

### 2. Inject Project Information
Embeds values from the project file (`*.csproj`) directly into your source code.  
This is useful for build metadata, version numbers, or project-specific configuration.

#### Available Properties
The generated `TheProject` class provides the following static properties:

| Property | Description | Example |
|----------|-------------|---------|
| `FullPath` | The complete path to the project file | `/path/to/YourProject.csproj` |
| `ProjectDirectory` | The directory containing the project file | `/path/to/` |
| `Name` | The name of the project | `YourProject` |
| `OutDir` | The output directory for compiled artifacts | `/path/to/artifacts/bin/YourProject/debug/` |
| `Version` | The current version of the project | `1.0.0` |
| `RootNamespace` | The root namespace of the project | `YourProject` |

#### Example Usage

```csharp
// Access project information anywhere in your code 
Console.WriteLine($"Project Name: {TheProject.Name}"); 
Console.WriteLine($"Project Version: {TheProject.Version}"); 
Console.WriteLine($"Project Output Directory: {TheProject.OutDir}");
```


### 3. Experimental: Typed Access to EmbeddedResources
Generates strongly typed wrappers for `EmbeddedResources`, allowing safe and convenient access to resources at runtime.

> ⚠️ Feature #3 is experimental and may change significantly in future versions.

Details can be found in the [Wiki](https://github.com/StefanStolz/ShadowWriter/wiki/ProjectFiles).

### 4. Generate Builders for Records

The **Builder** feature in ShadowWriter automatically generates builder classes for your `record` types. This significantly reduces boilerplate when constructing complex objects, especially with optional and nullable parameters or when you want to use a fluent API pattern for object creation.

#### Usage

To enable builder generation, simply annotate your partial `record` with the `[Builder]` attribute:

```csharp 
[Builder] 
public partial record WithBuilder(int Number);
```

The generator will create a corresponding builder class (e.g., `WithBuilder.Builder`) with mutable Properties for each Parameter.

#### Examples

A variety of record types are supported:

```csharp 
// Record with a single value type 
[Builder] 
public partial record WithBuilder(int Number);
```

The generated builder enables you to create instances using a clear, chainable API. For example:

```csharp
var builder = new WithBuilder.Builder();
builder.Number = 1;
var item = builder.Build();
```

## 📦 Installation

You can install ShadowWriter via NuGet:

```sh
dotnet package add ShadowWriter
```

## ⚙️ Usage
ShadowWriter runs automatically during compilation.
No manual setup is needed. Documentation and configuration options will be expanded in future versions.

## 📄 License
This project is licensed under the MIT License.
