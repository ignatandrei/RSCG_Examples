---
sidebar_position: 1420
title: 142 - FactoryGenerator
description: generating DI code
slug: /FactoryGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# FactoryGenerator  by Westermo Network Technologies


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/FactoryGenerator?label=FactoryGenerator)](https://www.nuget.org/packages/FactoryGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/westermo/FactoryGenerator?label=updated)](https://github.com/westermo/FactoryGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/westermo/FactoryGenerator?style=social)

## Details

### Info
:::info

Name: **FactoryGenerator**

Package Description

Author: Westermo Network Technologies

NuGet: 
*https://www.nuget.org/packages/FactoryGenerator/*   


You can find more details at https://github.com/westermo/FactoryGenerator

Source : https://github.com/westermo/FactoryGenerator

:::

### Original Readme
:::note

# Jab Compile Time Dependency Injection

[![Nuget](https://img.shields.io/nuget/v/Jab)](https://www.nuget.org/packages/Jab)

Jab provides a [C# Source Generator](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/) based dependency injection container implementation.

- Fast startup (200x faster than Microsoft.Extensions.DependencyInjection). [Details](#Startup-Time).
- Fast resolution (7x faster than Microsoft.Extensions.DependencyInjection). [Details](#GetService).
- No runtime dependencies.
- AOT and linker friendly, all code is generated during project compilation.
- Clean stack traces:  ![stacktrace](https://raw.githubusercontent.com/pakrym/jab/main/doc/stacktrace.png)
- Readable generated code:  ![generated code](https://raw.githubusercontent.com/pakrym/jab/main/doc/generatedcode.png)
- Registration validation. Container configuration issues become compiler errors:  ![generated code](https://raw.githubusercontent.com/pakrym/jab/main/doc/errors.png)
- Incremental generation, .NET 5/6/7/8 SDK support, .NET Standard 2.0 support, [Unity support](https://github.com/westermo/FactoryGenerator/README.md#Unity-installation

## Example

Add Jab package reference:
```xml
<ItemGroup>
    <PackageReference Include="Jab" Version="0.10.2" PrivateAssets="all" />
</ItemGroup>
```

Define a service and implementation:

``` C#
internal interface IService
{
    void M();
}

internal class ServiceImplementation : IService
{
    public void M()
    {
    }
}
```

Define a composition root and register services:

```C#
[ServiceProvider]
[Transient(typeof(IService), typeof(ServiceImplementation))]
internal partial class MyServiceProvider { }
```

Use the service provider:

``` C#
MyServiceProvider c = new MyServiceProvider();
IService service = c.GetService<IService>();
```

## Features

- No runtime dependency, safe to use in libraries
- Transient, Singleton, Scoped service registration
- Named registrations
- Factory registration
- Instance registration
- `IEnumerable` resolution
- `IDisposable` and `IAsyncDisposable` support
- `IServiceProvider` support

The plan is to support the minimum feature set Microsoft.Extensions.DependencyInjection.Abstraction requires but *NOT* the `IServiceCollection`-based registration syntax as it is runtime based.

### Singleton services

Singleton services are created once per container lifetime in a thread-safe manner and cached.
To register a singleton service use the `SingletonAttribute`:

```C#
[ServiceProvider]
[Singleton(typeof(IService), typeof(ServiceImplementation))]
internal partial class MyServiceProvider { }
```

### Singleton Instances

If you want to use an existing object as a service define a property in the container declaration and use the `Instance` property of the `SingletonAttribute` to register the service:

```C#
[ServiceProvider]
[Singleton(typeof(IService), Instance = nameof(MyServiceInstance))]
internal partial class MyServiceProvider {
    public IService MyServiceInstance { get;set; }
}
```

Then initialize the property during the container creation:

```C#
MyServiceProvider c = new MyServiceProvider();
c.MyServiceInstance = new ServiceImplementation();

IService service = c.GetService<IService>();
```

### Named services

Use the `Name` property to assign a name to your service registrations and `[FromNamedServices("...")]` attribute to resolve a service using its name.

```C#
[ServiceProvider]
[Singleton(typeof(INotificationService), typeof(EmailNotificationService), Name="email")]
[Singleton(typeof(INotificationService), typeof(SmsNotificationService), Name="sms")]
[Singleton(typeof(Notifier))]
internal partial class MyServiceProvider {}

class Notifier
{
    public Notifier(
        [FromNamedServices("email")] INotificationService email,
        [FromNamedServices("sms")] INotificationService sms)
    {}
}
```

NOTE: Jab also recognizes the `[FromKeyedServices]` attribute from `Microsoft.Extensions.DependencyInjection`.

### Factories

Sometimes it's useful to provide a custom way to create a service instance without using the automatic construction selection.
To do this define a method in the container declaration and use the `Factory` property of the `SingletonAttribute` or `TransientAttribute` to register the service:

```C#
[ServiceProvider]
[Transient(typeof(IService), Factory = nameof(MyServiceFactory))]
internal partial class MyServiceProvider {
    public IService MyServiceFactory() => new ServiceImplementation();
}

MyServiceProvider c = new MyServiceProvider();
IService service = c.GetService<IService>();
```

When using with `TransientAttribute` the factory method would be invoked for every service resolution.
When used with `SingletonAttribute` it would only be invoked the first time the service is requested.

Similar to constructors, factories support parameter injection:

```
[ServiceProvider]
[Transient(typeof(IService), Factory = nameof(MyServiceFactory))]
[Transient(typeof(SomeOtherService))]
internal partial class MyServiceProvider {
    public IService MyServiceFactory(SomeOtherService other) => new ServiceImplementation(other);
}
```

### Scoped Services

Scoped services are created once per service provider scope. To create a scope use the `CreateScope()` method of the service provider.
Service are resolved from the scope using the `GetService<IService>()` call.

```C#
[ServiceProvider]
[Scoped(typeof(IService), typeof(ServiceImplementation))]
internal partial class MyServiceProvider { }

MyServiceProvider c = new MyServiceProvider();
using MyServiceProvider.Scope scope = c.CreateScope();
IService service = scope.GetService<IService>();
```

When the scope is disposed all `IDisposable` and `IAsyncDisposable` services that were resolved from it are disposed as well.

### Generic registration attributes 

You can use generic attributes to register services if your project targets `net7.0` or `net6.0` and has `LangVersion` set to preview.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>net7.0</TargetFrameworks>
  </PropertyGroup>

</Project>

```

Generic attributes allow declaration to be more compact by avoiding the `typeof` calls:

``` C#
[ServiceProvider]
[Scoped<IService, ServiceImplementation>]
[Import<IMyModule>]
internal partial class MyServiceProvider { }
```

### Modules

Often, a set of service registrations would represent a distinct set of functionality that can be included into arbitrary 
service provider. Modules are used to implement registration sharing. To define a module create an interface and mark it with `ServiceProviderModuleAttribute`. Service registrations can be listed in module the same way they are in the service provider.

```C#
[ServiceProviderModule]
[Singleton(typeof(IService), typeof(ServiceImplementation))]
public interface IMyModule
{
}
```

To use the module apply the `Import` attribute to the service provider type:

```C#
[ServiceProvider]
[Import(typeof(IMyModule))]
internal partial class MyServiceProvider
{
}

MyServiceProvider c = new MyServiceProvider();
IService service = c.GetService<IEnumerable<IService>>();
```

Modules can import other modules as well.

**NOTE**: module service and implementation types have to be accessible from the project where service provider is generated.

## Root services

By default, `IEnumerable<...>` service accessors are only generated when requested by other service constructors. If you would like to have a root `IEnumerable<..>` accessor generated use the `RootService` parameter of the `ServiceProvider` attribute. The generator also scans all the `GetService<...>` usages and tries to all collected type arguments as the root service.

``` C#
[ServiceProvider(RootServices = new [] {typeof(IEnumerable<IService>)})]
[Singleton(typeof(IService), typeof(ServiceImplementation))]
[Singleton(typeof(IService), typeof(ServiceImplementation))]
[Singleton(typeof(IService), typeof(ServiceImplementation))]
internal partial class MyServiceProvider
{
}

MyServiceProvider c = new MyServiceProvider();
IService service = c.GetService<IEnumerable<IService>>();
```

## Samples

### Console application

Sample Jab usage in console application can be found in [src/samples/ConsoleSample](https://github.com/westermo/FactoryGeneratorsrc/samples/ConsoleSample

## Performance

The performance benchmark project is available in [src/Jab.Performance/](https://github.com/westermo/FactoryGeneratorsrc/Jab.Performance/.

### Startup time

The startup time benchmark measures time between application startup and the first service being resolved.

```
| Method |        Mean |     Error |    StdDev |  Ratio | RatioSD |  Gen 0 |  Gen 1 | Gen 2 | Allocated |
|------- |------------:|----------:|----------:|-------:|--------:|-------:|-------:|------:|----------:|
|   MEDI | 2,437.88 ns | 14.565 ns | 12.163 ns | 220.91 |    2.72 | 0.6332 | 0.0114 |     - |    6632 B |
|    Jab |    11.03 ns |  0.158 ns |  0.123 ns |   1.00 |    0.00 | 0.0046 |      - |     - |      48 B |
```

### GetService

The `GetService` benchmark measures the `provider.GetService<IService>()` call.

```
| Method |      Mean |     Error |    StdDev | Ratio | RatioSD |  Gen 0 | Gen 1 | Gen 2 | Allocated |
|------- |----------:|----------:|----------:|------:|--------:|-------:|------:|------:|----------:|
|   MEDI | 39.340 ns | 0.2419 ns | 0.2263 ns |  7.01 |    0.09 | 0.0023 |     - |     - |      24 B |
|    Jab |  5.619 ns | 0.0770 ns | 0.0643 ns |  1.00 |    0.00 | 0.0023 |     - |     - |      24 B |
```

## Unity installation
1. Navigate to the Packages directory of your project.
2. Adjust the [project manifest file](https://docs.unity3d.com/Manual/upm-manifestPrj.html) manifest.json in a text editor.
3. Ensure `https://registry.npmjs.org/` is part of `scopedRegistries`.
4. Ensure `com.pakrym` is part of `scopes`.
5. Add `com.pakrym.jab` to the dependencies, stating the latest version.

A minimal example ends up looking like this:

```
{
  "scopedRegistries": [
    {
      "name": "npmjs",
      "url": "https://registry.npmjs.org/",
      "scopes": [
        "com.pakrym"
      ]
    }
  ],
  "dependencies": {
    "com.pakrym.jab": "0.10.2",
    ...
  }
}
```


## Debugging locally

Run `dotnet build /t:CreateLaunchSettings` in the `Jab.Tests` directory would update the `Jab\Properties\launchSettings.json` file to include `csc` invocation that allows F5 debugging of the generator targeting the `Jab.Tests` project.


:::

### About
:::note

generating DI code


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **FactoryGenerator**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="FactoryGenerator" Version="1.0.11" />
	  <PackageReference Include="FactoryGenerator.Attributes" Version="1.0.11" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\Program.cs" label="Program.cs" >

  This is the use of **FactoryGenerator** in *Program.cs*

```csharp showLineNumbers 
using InjectDemo;

InjectDemo.Generated.DependencyInjectionContainer sc = new();
var db = sc.Resolve<IDatabase>();
db.Open();


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\Database.cs" label="Database.cs" >

  This is the use of **FactoryGenerator** in *Database.cs*

```csharp showLineNumbers 
using FactoryGenerator.Attributes;

namespace InjectDemo;

[Inject, Scoped]
public partial class Database : IDatabase
{
    private readonly DatabaseCon con;

    public Database(DatabaseCon con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open {con.Connection}");
        this.con.Open();
    }

}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **FactoryGenerator** in *DatabaseCon.cs*

```csharp showLineNumbers 

using FactoryGenerator.Attributes;

namespace InjectDemo;

[Inject,Scoped, Self]
public partial class DatabaseCon: IDatabase
{
    public string? Connection { get; set; }
    public void Open()
    {
        Console.WriteLine("open" + Connection);
    }
}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\DependencyInjectionContainer.Constructor.g.cs" label="DependencyInjectionContainer.Constructor.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
public partial class DependencyInjectionContainer
{
    
    public DependencyInjectionContainer()
    {
        
        
        m_lookup = new(2)
        {
			{ typeof(InjectDemo.IDatabase),InjectDemo_IDatabase },
			{ typeof(InjectDemo.DatabaseCon),InjectDemo_DatabaseCon },




        };
    }

    
public ILifetimeScope BeginLifetimeScope()
{
    var scope = new LifetimeScope(this);
    resolvedInstances.Add(new WeakReference<IDisposable>(scope));
    return scope;
}

}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\DependencyInjectionContainer.Declarations.g.cs" label="DependencyInjectionContainer.Declarations.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
public partial class DependencyInjectionContainer
{
    
    internal InjectDemo.DatabaseCon InjectDemo_DatabaseCon()
    {
        if (m_InjectDemo_DatabaseCon != null)
            return m_InjectDemo_DatabaseCon;
    
        lock (m_lock)
        {
            if (m_InjectDemo_DatabaseCon != null)
                return m_InjectDemo_DatabaseCon;
            return m_InjectDemo_DatabaseCon = new InjectDemo.DatabaseCon();
        }
    } 
    internal InjectDemo.DatabaseCon? m_InjectDemo_DatabaseCon;
	
    internal InjectDemo.Database InjectDemo_Database()
    {
        if (m_InjectDemo_Database != null)
            return m_InjectDemo_Database;
    
        lock (m_lock)
        {
            if (m_InjectDemo_Database != null)
                return m_InjectDemo_Database;
            return m_InjectDemo_Database = new InjectDemo.Database(InjectDemo_DatabaseCon());
        }
    } 
    internal InjectDemo.Database? m_InjectDemo_Database;
	internal InjectDemo.IDatabase InjectDemo_IDatabase() => InjectDemo_Database();
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\DependencyInjectionContainer.EnumerableDeclarations.g.cs" label="DependencyInjectionContainer.EnumerableDeclarations.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
public partial class DependencyInjectionContainer
{
    
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\DependencyInjectionContainer.Lookup.g.cs" label="DependencyInjectionContainer.Lookup.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
[GeneratedCode("FactoryGenerator", "1.0.0")]
#nullable disable
public sealed partial class DependencyInjectionContainer : IContainer
{
    private object m_lock = new();
    private Dictionary<Type,Func<object>> m_lookup;
    private readonly List<WeakReference<IDisposable>> resolvedInstances = new();

    public T Resolve<T>()
    {
        return (T)Resolve(typeof(T));
    }

    public object Resolve(Type type)
    {
        var instance = m_lookup[type]();
        return instance;
    }

    public void Dispose()
    {
        foreach (var weakReference in resolvedInstances)
        {
            if(weakReference.TryGetTarget(out var disposable))
            {
                disposable.Dispose();
            }
        }
        resolvedInstances.Clear();
    }

    public bool TryResolve(Type type, out object resolved)
    {
        if(m_lookup.TryGetValue(type, out var factory))
        {
            resolved = factory();
            return true;
        }
        resolved = default;
        return false;
    }


    public bool TryResolve<T>(out T resolved)
    {
        if(m_lookup.TryGetValue(typeof(T), out var factory))
        {
            var value = factory();
            if(value is T t)
            {
                resolved = t;
                return true;
            }
        }
        resolved = default;
        return false;
    }
    public bool IsRegistered(Type type)
    {
        return m_lookup.ContainsKey(type);
    }
    public bool IsRegistered<T>() => IsRegistered(typeof(T));
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\LifetimeScope.Constructor.g.cs" label="LifetimeScope.Constructor.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
public partial class LifetimeScope
{
    
    public LifetimeScope(DependencyInjectionContainer fallback)
    {
        m_fallback = fallback;
        
        m_lookup = new(2)
        {
			{ typeof(InjectDemo.IDatabase),InjectDemo_IDatabase },
			{ typeof(InjectDemo.DatabaseCon),InjectDemo_DatabaseCon },




        };
    }

    

}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\LifetimeScope.Declarations.g.cs" label="LifetimeScope.Declarations.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
public partial class LifetimeScope
{
    
    internal InjectDemo.DatabaseCon InjectDemo_DatabaseCon()
    {
        if (m_InjectDemo_DatabaseCon != null)
            return m_InjectDemo_DatabaseCon;
    
        lock (m_lock)
        {
            if (m_InjectDemo_DatabaseCon != null)
                return m_InjectDemo_DatabaseCon;
            return m_InjectDemo_DatabaseCon = new InjectDemo.DatabaseCon();
        }
    } 
    internal InjectDemo.DatabaseCon? m_InjectDemo_DatabaseCon;
	
    internal InjectDemo.Database InjectDemo_Database()
    {
        if (m_InjectDemo_Database != null)
            return m_InjectDemo_Database;
    
        lock (m_lock)
        {
            if (m_InjectDemo_Database != null)
                return m_InjectDemo_Database;
            return m_InjectDemo_Database = new InjectDemo.Database(InjectDemo_DatabaseCon());
        }
    } 
    internal InjectDemo.Database? m_InjectDemo_Database;
	internal InjectDemo.IDatabase InjectDemo_IDatabase() => InjectDemo_Database();
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\LifetimeScope.EnumerableDeclarations.g.cs" label="LifetimeScope.EnumerableDeclarations.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
public partial class LifetimeScope
{
    
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\FactoryGenerator\src\InjectDemo\obj\GX\FactoryGenerator\FactoryGenerator.FactoryGenerator\LifetimeScope.Lookup.g.cs" label="LifetimeScope.Lookup.g.cs" >


```csharp showLineNumbers 

using System;
using System.Collections.Generic;
using FactoryGenerator;
using System.CodeDom.Compiler;
namespace InjectDemo.Generated;
#nullable enable
[GeneratedCode("FactoryGenerator", "1.0.0")]
#nullable disable
public sealed partial class LifetimeScope : IContainer
{
    public ILifetimeScope BeginLifetimeScope()
    {
        var scope = m_fallback.BeginLifetimeScope();
        resolvedInstances.Add(new WeakReference<IDisposable>(scope));
        return scope;
    }
    private object m_lock = new();
    private DependencyInjectionContainer m_fallback;
    private Dictionary<Type,Func<object>> m_lookup;
    private readonly List<WeakReference<IDisposable>> resolvedInstances = new();

   public T Resolve<T>()
    {
        return (T)Resolve(typeof(T));
    }

    public object Resolve(Type type)
    {
        var instance = m_lookup[type]();
        return instance;
    }

    public void Dispose()
    {
        foreach (var weakReference in resolvedInstances)
        {
            if(weakReference.TryGetTarget(out var disposable))
            {
                disposable.Dispose();
            }
        }
        resolvedInstances.Clear();
    }

    public bool TryResolve(Type type, out object resolved)
    {
        if(m_lookup.TryGetValue(type, out var factory))
        {
            resolved = factory();
            return true;
        }
        resolved = default;
        return false;
    }


    public bool TryResolve<T>(out T resolved)
    {
        if(m_lookup.TryGetValue(typeof(T), out var factory))
        {
            var value = factory();
            if(value is T t)
            {
                resolved = t;
                return true;
            }
        }
        resolved = default;
        return false;
    }
    public bool IsRegistered(Type type)
    {
        return m_lookup.ContainsKey(type);
    }
    public bool IsRegistered<T>() => IsRegistered(typeof(T));
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project FactoryGenerator ](/sources/FactoryGenerator.zip)

:::


### Share FactoryGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFactoryGenerator&quote=FactoryGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFactoryGenerator&text=FactoryGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFactoryGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFactoryGenerator&title=FactoryGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFactoryGenerator&title=FactoryGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFactoryGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/FactoryGenerator

### In the same category (DependencyInjection) - 3 other generators


#### [AutoRegisterInject](/docs/AutoRegisterInject)


#### [Injectio](/docs/Injectio)


#### [jab](/docs/jab)

