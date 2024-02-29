---
sidebar_position: 1100
title: 110 - jab
description: generating DI code
slug: /jab
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# jab  by Pavel Krymets


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/jab?label=jab)](https://www.nuget.org/packages/jab/)
[![GitHub last commit](https://img.shields.io/github/last-commit/pakrym/jab?label=updated)](https://github.com/pakrym/jab)
![GitHub Repo stars](https://img.shields.io/github/stars/pakrym/jab?style=social)

## Details

### Info
:::info

Name: **jab**

Package Description

Author: Pavel Krymets

NuGet: 
*https://www.nuget.org/packages/jab/*   


You can find more details at https://github.com/pakrym/jab

Source : https://github.com/pakrym/jab

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
- Incremental generation, .NET 5/6/7/8 SDK support, .NET Standard 2.0 support, [Unity support](https://github.com/pakrym/jab/README.md#Unity-installation

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

Sample Jab usage in console application can be found in [src/samples/ConsoleSample](https://github.com/pakrym/jabsrc/samples/ConsoleSample

## Performance

The performance benchmark project is available in [src/Jab.Performance/](https://github.com/pakrym/jabsrc/Jab.Performance/.

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

This is the CSharp Project that references **jab**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Jab" Version="0.10.2" PrivateAssets="all" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jab\src\InjectDemo\Program.cs" label="Program.cs" >

  This is the use of **jab** in *Program.cs*

```csharp showLineNumbers 
using InjectDemo;
using Jab;
MyServiceProvider sc = new();
//var con = sc.GetService<DatabaseCon>();
var db = sc.GetService<IDatabase>();
db.Open();


[ServiceProvider]
//[Transient(typeof(DatabaseCon), typeof(DatabaseCon))]
[Transient(typeof(IDatabase), typeof(DatabaseCon))]
internal partial class MyServiceProvider { }
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jab\src\InjectDemo\Database.cs" label="Database.cs" >

  This is the use of **jab** in *Database.cs*

```csharp showLineNumbers 
namespace InjectDemo;

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jab\src\InjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **jab** in *DatabaseCon.cs*

```csharp showLineNumbers 

namespace InjectDemo;

internal class DatabaseCon: IDatabase
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jab\src\InjectDemo\obj\GX\Jab\Jab.ContainerGenerator\Attributes.cs" label="Attributes.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#if !JAB_ATTRIBUTES_REFERENCED || JAB_ATTRIBUTES_PACKAGE

using System;
using System.Threading.Tasks;

#nullable enable

namespace Jab
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ServiceProviderAttribute: Attribute
    {
        public Type[]? RootServices { get; set; }
    }

    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ServiceProviderModuleAttribute: Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ImportAttribute: Attribute
    {
        public Type ModuleType { get; }

        public ImportAttribute(Type moduleType)
        {
            ModuleType = moduleType;
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class SingletonAttribute: Attribute
    {
        public Type ServiceType { get; }

        public string? Name { get; set; }

        public Type? ImplementationType { get; }

        public string? Instance { get; set; }

        public string? Factory { get; set; }

        public SingletonAttribute(Type serviceType)
        {
            ServiceType = serviceType;
        }

        public SingletonAttribute(Type serviceType, Type implementationType)
        {
            ServiceType = serviceType;
            ImplementationType = implementationType;
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class TransientAttribute : Attribute
    {
        public Type ServiceType { get; }
        public string? Name { get; set; }

        public Type? ImplementationType { get; }

        public string? Factory { get; set; }

        public TransientAttribute(Type serviceType)
        {
            ServiceType = serviceType;
        }

        public TransientAttribute(Type serviceType, Type implementationType)
        {
            ServiceType = serviceType;
            ImplementationType = implementationType;
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ScopedAttribute : Attribute
    {
        public Type ServiceType { get; }
        public string? Name { get; set; }

        public Type? ImplementationType { get; }

        public string? Factory { get; set; }

        public ScopedAttribute(Type serviceType)
        {
            ServiceType = serviceType;
        }

        public ScopedAttribute(Type serviceType, Type implementationType)
        {
            ServiceType = serviceType;
            ImplementationType = implementationType;
        }
    }


    [AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
        class FromNamedServicesAttribute : Attribute
    {
        public string? Name { get; set; }

        public FromNamedServicesAttribute(string name)
        {
            Name = name;
        }
    }

#if GENERIC_ATTRIBUTES
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ImportAttribute<TModule> : ImportAttribute
    {
        public ImportAttribute() : base(typeof(TModule))
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class TransientAttribute<TService> : TransientAttribute
    {
        public TransientAttribute() : base(typeof(TService))
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class TransientAttribute<TService, TImpl> : TransientAttribute where TImpl: TService
    {
        public TransientAttribute() : base(typeof(TService), typeof(TImpl))
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ScopedAttribute<TService> : ScopedAttribute
    {
        public ScopedAttribute() : base(typeof(TService))
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class ScopedAttribute<TService, TImpl> : ScopedAttribute where TImpl: TService
    {
        public ScopedAttribute() : base(typeof(TService), typeof(TImpl))
        {
        }
    }


    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class SingletonAttribute<TService> : SingletonAttribute
    {
        public SingletonAttribute() : base(typeof(TService))
        {
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    class SingletonAttribute<TService, TImpl> : SingletonAttribute where TImpl: TService
    {
        public SingletonAttribute() : base(typeof(TService), typeof(TImpl))
        {
        }
    }

#endif

#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    interface IServiceProvider<T>
    {
        T GetService();
    }

#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    interface INamedServiceProvider<T>
    {
        T GetService(string name);
    }

#if JAB_ATTRIBUTES_PACKAGE
    public
#else
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", null)]
    internal
#endif
    static class JabHelpers
    {
        public static InvalidOperationException CreateServiceNotFoundException<T>(string? name = null) =>
            CreateServiceNotFoundException(typeof(T), name);
        public static InvalidOperationException CreateServiceNotFoundException(Type type, string? name = null) =>
            new InvalidOperationException(
                name != null ?
                    $"Service with type {type} and name {name} not registered" :
                    $"Service with type {type} not registered");
    }
}

#endif

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jab\src\InjectDemo\obj\GX\Jab\Jab.ContainerGenerator\MyServiceProvider.Generated.cs" label="MyServiceProvider.Generated.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Jab;

using static Jab.JabHelpers;
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("Jab", "0.10.2.0")]
internal partial class MyServiceProvider : global::System.IDisposable,
   System.IAsyncDisposable,
   global::System.IServiceProvider,
   IServiceProvider<InjectDemo.DatabaseCon>,
   IServiceProvider<InjectDemo.IDatabase>,
   IServiceProvider<System.IServiceProvider>
{
    private Scope? _rootScope;
    
    InjectDemo.DatabaseCon IServiceProvider<InjectDemo.DatabaseCon>.GetService()
    {
        InjectDemo.DatabaseCon service = new InjectDemo.DatabaseCon();
        TryAddDisposable(service);
        return service;
    }
    
    InjectDemo.IDatabase IServiceProvider<InjectDemo.IDatabase>.GetService()
    {
        InjectDemo.DatabaseCon service = new InjectDemo.DatabaseCon();
        TryAddDisposable(service);
        return service;
    }
    
    System.IServiceProvider IServiceProvider<System.IServiceProvider>.GetService()
    {
        return this;
    }
    
    object? global::System.IServiceProvider.GetService(global::System.Type type){
        if (type == typeof(InjectDemo.DatabaseCon)) return this.GetService<InjectDemo.DatabaseCon>();
        if (type == typeof(InjectDemo.IDatabase)) return this.GetService<InjectDemo.IDatabase>();
        if (type == typeof(System.IServiceProvider)) return this.GetService<System.IServiceProvider>();
        return null;
    }
    
    private global::System.Collections.Generic.List<object>? _disposables;
    
    private void TryAddDisposable(object? value){
        if (value is global::System.IDisposable || value is System.IAsyncDisposable)
        lock (this){
            (_disposables ??= new global::System.Collections.Generic.List<object>()).Add(value);
        }
    }
    
    public void Dispose(){
        void TryDispose(object? value) => (value as IDisposable)?.Dispose();
        
        TryDispose(_rootScope);
        if (_disposables != null){
            foreach (var service in _disposables){
                TryDispose(service);
            }
        }
    }
    
    public async global::System.Threading.Tasks.ValueTask DisposeAsync(){
        global::System.Threading.Tasks.ValueTask TryDispose(object? value){
            if (value is System.IAsyncDisposable asyncDisposable){
                return asyncDisposable.DisposeAsync();
            }
            else if (value is global::System.IDisposable disposable){
                disposable.Dispose();
            }
            return default;
        }
        
        await TryDispose(_rootScope);
        if (_disposables != null){
            foreach (var service in _disposables){
                await TryDispose(service);
            }
        }
    }
    
    [DebuggerHidden]
    public T GetService<T>() => this is IServiceProvider<T> provider ? provider.GetService() : throw CreateServiceNotFoundException<T>();
    
    [DebuggerHidden]
    public T GetService<T>(string name) => this is INamedServiceProvider<T> provider ? provider.GetService(name) : throw CreateServiceNotFoundException<T>(name);
    
    public Scope CreateScope() => new Scope(this);
    
    public partial class Scope : global::System.IDisposable,
       System.IAsyncDisposable,
       global::System.IServiceProvider,
       IServiceProvider<InjectDemo.DatabaseCon>,
       IServiceProvider<InjectDemo.IDatabase>,
       IServiceProvider<System.IServiceProvider>    
    {
        
        private MyServiceProvider _root;
        
        public Scope(MyServiceProvider root){
            _root = root;
        }
        
        [DebuggerHidden]
        public T GetService<T>() => this is IServiceProvider<T> provider ? provider.GetService() : throw CreateServiceNotFoundException<T>();
        
        [DebuggerHidden]
        public T GetService<T>(string name) => this is INamedServiceProvider<T> provider ? provider.GetService(name) : throw CreateServiceNotFoundException<T>(name);
        
        InjectDemo.DatabaseCon IServiceProvider<InjectDemo.DatabaseCon>.GetService(){
            InjectDemo.DatabaseCon service = new InjectDemo.DatabaseCon();
            TryAddDisposable(service);
            return service;
        }
        
        InjectDemo.IDatabase IServiceProvider<InjectDemo.IDatabase>.GetService(){
            InjectDemo.DatabaseCon service = new InjectDemo.DatabaseCon();
            TryAddDisposable(service);
            return service;
        }
        
        System.IServiceProvider IServiceProvider<System.IServiceProvider>.GetService(){
            return this;
        }
        
        object? global::System.IServiceProvider.GetService(global::System.Type type){
            if (type == typeof(InjectDemo.DatabaseCon)) return this.GetService<InjectDemo.DatabaseCon>();
            if (type == typeof(InjectDemo.IDatabase)) return this.GetService<InjectDemo.IDatabase>();
            if (type == typeof(System.IServiceProvider)) return this.GetService<System.IServiceProvider>();
            return null;
        }
        
        private global::System.Collections.Generic.List<object>? _disposables;
        
        private void TryAddDisposable(object? value){
            if (value is global::System.IDisposable || value is System.IAsyncDisposable)
            lock (this){
                (_disposables ??= new global::System.Collections.Generic.List<object>()).Add(value);
            }
        }
        
        public void Dispose(){
            void TryDispose(object? value) => (value as IDisposable)?.Dispose();
            
            if (_disposables != null){
                foreach (var service in _disposables){
                    TryDispose(service);
                }
            }
        }
        
        public async global::System.Threading.Tasks.ValueTask DisposeAsync(){
            global::System.Threading.Tasks.ValueTask TryDispose(object? value){
                if (value is System.IAsyncDisposable asyncDisposable){
                    return asyncDisposable.DisposeAsync();
                }
                else if (value is global::System.IDisposable disposable){
                    disposable.Dispose();
                }
                return default;
            }
            
            if (_disposables != null){
                foreach (var service in _disposables){
                    await TryDispose(service);
                }
            }
        }
        
    }
    private Scope GetRootScope(){
        if (_rootScope == default)
        lock (this)
        if (_rootScope == default){
            _rootScope = CreateScope();
        }
        return _rootScope;
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project jab ](/sources/jab.zip)

:::


### Share jab 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjab&quote=jab" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjab&text=jab:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjab" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjab&title=jab" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjab&title=jab&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2Fjab" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/jab

### In the same category (DependencyInjection) - 2 other generators


#### [AutoRegisterInject](/docs/AutoRegisterInject)


#### [Injectio](/docs/Injectio)

