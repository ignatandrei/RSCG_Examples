---
sidebar_position: 470
title: 47 - Injectio
description: Attributes to DI helper
slug: /Injectio
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Injectio  by LoreSoft


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Injectio?label=Injectio)](https://www.nuget.org/packages/Injectio/)
[![GitHub last commit](https://img.shields.io/github/last-commit/loresoft/Injectio?label=updated)](https://github.com/loresoft/Injectio)
![GitHub Repo stars](https://img.shields.io/github/stars/loresoft/Injectio?style=social)

## Details

### Info
:::info

Name: **Injectio**

Source generator that automatically registers discovered services in dependency injection

Author: LoreSoft

NuGet: 
*https://www.nuget.org/packages/Injectio/*   


You can find more details at https://github.com/loresoft/Injectio

Source : https://github.com/loresoft/Injectio

:::

### Original Readme
:::note

# Injectio

Source generator that helps register attribute marked services in the dependency injection ServiceCollection

[![Source generator](https://raw.githubusercontent.com/loresoft/Injectio/main/media/Injectio.Genertors.png)](https://github.com/loresoft/Injectio)

## Features

- Transient, Singleton, Scoped service registration
- Factory registration
- Module method registration
- Duplicate Strategy - Skip,Replace,Append
- Registration Strategy - Self, Implemented Interfaces, Self With Interfaces

### Usage

#### Add package

Add the nuget package project to your projects.

`dotnet add package Injectio`

Prevent dependances from including Injectio

```xml
<PackageReference Include="Injectio" PrivateAssets="all" />
```

### Registration Attributes

Place registration attribute on class.  The class will be discovered and registered.

- `[RegisterSingleton]` Marks the class as a singleton service
- `[RegisterScoped]` Marks the class as a scoped service
- `[RegisterTransient]` Marks the class as a transient service
- `[RegisterServices]` Marks the method to be called to register services

#### Attribute Properties

| Property           | Description                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------|
| ImplementationType | The type that implements the service.  If not set, the class the attribute is on will be used.      |
| ServiceType        | The type of the service. If not set, the Registration property used to determine what is registered.|
| Factory            | Name of a factory method to create new instances of the service implementation.                     |
| Duplicate          | How the generator handles duplicate registrations. See Duplicate Strategy                           |
| Registration       | How the generator determines what to register. See Registration Strategy                            |

#### Duplicate Strategy

| Value   | Description                                          |
|---------|------------------------------------------------------|
| Skip    | Skips registrations for services that already exists |
| Replace | Replaces existing service registrations              |
| Append  | Appends a new registration for existing services     |

#### Registration Strategy

| Value                 | Description                                                                           |
|-----------------------|---------------------------------------------------------------------------------------|
| Self                  | Registers each matching concrete type as itself                                       |
| ImplementedInterfaces | Registers each matching concrete type as all of its implemented interfaces            |
| SelfWithInterfaces    | Registers each matching concrete type as all of its implemented interfaces and itself |

#### Singleton services

```c#
[RegisterSingleton]
public class SingletonService : IService { }
```

Explicit service type

```c#
[RegisterSingleton(ServiceType = typeof(IService))]
public class SingletonService : IService { }
```

Support resolving multiple services with `IEnumerable<T>`

```c#
[RegisterSingleton(Duplicate = DuplicateStrategy.Append)]
public class SingletonService : IService { }
```


#### Scoped Services

```c#
[RegisterScoped]
public class ScopedService : IService { }
```

#### Transient Services

```c#
[RegisterTransient]
public class TransientService : IService { }
```

#### Factories

```c#
[RegisterTransient(Factory = nameof(ServiceFactory))]
public class FactoryService : IFactoryService
{
    private readonly IService _service;

    public FactoryService(IService service)
    { 
        _service = service;
    }

    public static IFactoryService ServiceFactory(IServiceProvider serviceProvider)
    {
        return new FactoryService(serviceProvider.GetService<IService>());
    }
}
```

#### Generic Attributes

You can use generic attributes to register services if your project targets net7.0.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFrameworks>net7.0</TargetFrameworks>
  </PropertyGroup>
</Project>
```

Generic attributes allow declaration to be more compact by avoiding the typeof calls

```c#
[RegisterSingleton<IService>]
public class ServiceImplementation : IService { }
```

#### Open Generic

```c#
[RegisterSingleton(ImplementationType = typeof(OpenGeneric<>), ServiceType = typeof(IOpenGeneric<>))]
public class OpenGeneric<T> : IOpenGeneric<T> { }
```

#### Register Method

When the service registration is complex, use the `RegisterServices` attribute on a method that has a parameter of `IServiceCollection` or `ServiceCollection`

```c#
public class RegistrationModule
{
    [RegisterServices]
    public static void Register(IServiceCollection services)
    {
        services.TryAddTransient<IModuleService, ModuleService>();
    }
}
```

#### Add to container

The source generator creates an extension method with all the discovered services registered.  Call the generated extension method to add the services to the container.  The extension method will be called `Add[AssemblyName]`.  The assembly name will have the dots removed.

```c#
var services = new ServiceCollection();
services.AddInjectioTestsConsole();
```

Override the extension method name by using the `InjectioName` MSBuild property.

```xml
<PropertyGroup>
  <InjectioName>Library</InjectioName>
</PropertyGroup>
```

```c#
var services = new ServiceCollection();
services.AddLibrary();
```

#### Registration Tags

Control what is registered when calling the generated extension method using Tags

Tag the service

```c#
public interface IServiceTag
{
}

[RegisterSingleton(Tags = "Client,FrontEnd")]
public class ServiceTag : IServiceTag
{
}
```

Specify tags when adding to service collection.  Note, if no tags specified, all services are registered

```c#
var services = new ServiceCollection();
services.AddInjectioTestsLibrary("Client");
```


:::

### About
:::note

Attributes to DI helper


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Injectio**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Injectio" Version="2.6.1" />
		<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Injectio\src\InjectioDemo\Program.cs" label="Program.cs" >

  This is the use of **Injectio** in *Program.cs*

```csharp showLineNumbers 
using InjectioDemo;
using Microsoft.Extensions.DependencyInjection;

Console.WriteLine("Hello, World!");
ServiceCollection sc = new();
sc.AddInjectioDemo();
var b = sc.BuildServiceProvider();
var con = b.GetRequiredService<DatabaseCon>();
var db = b.GetRequiredService<IDatabase>();
db.Open();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Injectio\src\InjectioDemo\Database.cs" label="Database.cs" >

  This is the use of **Injectio** in *Database.cs*

```csharp showLineNumbers 
using Injectio.Attributes;

namespace InjectioDemo;

[RegisterScoped]
internal class Database : IDatabase
{
    private readonly DatabaseCon con;

    public Database(DatabaseCon con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open {con.Connection}");
    }

}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Injectio\src\InjectioDemo\IDatabase.cs" label="IDatabase.cs" >

  This is the use of **Injectio** in *IDatabase.cs*

```csharp showLineNumbers 
namespace InjectioDemo
{
    internal interface IDatabase
    {
        public void Open();
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Injectio\src\InjectioDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **Injectio** in *DatabaseCon.cs*

```csharp showLineNumbers 
using Injectio.Attributes;

namespace InjectioDemo;

[RegisterSingleton]
internal class DatabaseCon
{
    public string? Connection { get; set; }
}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Injectio\src\InjectioDemo\obj\GX\Injectio.Generators\Injectio.Generators.ServiceRegistrationGenerator\Injectio.g.cs" label="Injectio.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// Extension methods for discovered service registrations
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("Injectio.Generators", "2.6.1.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    [global::System.Diagnostics.DebuggerStepThroughAttribute]
    public static class DiscoveredServicesExtensions
    {
        /// <summary>
        /// Adds discovered services from InjectioDemo to the specified service collection
        /// </summary>
        /// <param name="serviceCollection">The service collection.</param>
        /// <param name="tags">The service registration tags to include.</param>
        /// <returns>The service collection</returns>
        public static global::Microsoft.Extensions.DependencyInjection.IServiceCollection AddInjectioDemo(this global::Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, params string[]? tags)
        {
            var tagSet = new global::System.Collections.Generic.HashSet<string>(tags ?? global::System.Linq.Enumerable.Empty<string>());

            global::Microsoft.Extensions.DependencyInjection.Extensions.ServiceCollectionDescriptorExtensions.TryAdd(
                serviceCollection,
                global::Microsoft.Extensions.DependencyInjection.ServiceDescriptor.Describe(
                    typeof(global::InjectioDemo.IDatabase),
                    typeof(global::InjectioDemo.Database), 
                    global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Scoped
                )
            );

            global::Microsoft.Extensions.DependencyInjection.Extensions.ServiceCollectionDescriptorExtensions.TryAdd(
                serviceCollection,
                global::Microsoft.Extensions.DependencyInjection.ServiceDescriptor.Describe(
                    typeof(global::InjectioDemo.Database),
                    typeof(global::InjectioDemo.Database), 
                    global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Scoped
                )
            );

            global::Microsoft.Extensions.DependencyInjection.Extensions.ServiceCollectionDescriptorExtensions.TryAdd(
                serviceCollection,
                global::Microsoft.Extensions.DependencyInjection.ServiceDescriptor.Describe(
                    typeof(global::InjectioDemo.DatabaseCon),
                    typeof(global::InjectioDemo.DatabaseCon), 
                    global::Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton
                )
            );

            return serviceCollection;
        }
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Injectio ](/sources/Injectio.zip)

:::


### Share Injectio 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInjectio&quote=Injectio" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInjectio&text=Injectio:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInjectio" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInjectio&title=Injectio" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInjectio&title=Injectio&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FInjectio" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Injectio

### In the same category (DependencyInjection) - 3 other generators


#### [AutoRegisterInject](/docs/AutoRegisterInject)


#### [FactoryGenerator](/docs/FactoryGenerator)


#### [jab](/docs/jab)

