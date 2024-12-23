---
sidebar_position: 1520
title: 152 - ServiceScan.SourceGenerator
description: Generating service collection / DI registration
slug: /ServiceScan.SourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ServiceScan.SourceGenerator  by Oleksandr Liakhevych


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/ServiceScan.SourceGenerator?label=ServiceScan.SourceGenerator)](https://www.nuget.org/packages/ServiceScan.SourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Dreamescaper/ServiceScan.SourceGenerator?label=updated)](https://github.com/Dreamescaper/ServiceScan.SourceGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Dreamescaper/ServiceScan.SourceGenerator?style=social)

## Details

### Info
:::info

Name: **ServiceScan.SourceGenerator**

Package Description

Author: Oleksandr Liakhevych

NuGet: 
*https://www.nuget.org/packages/ServiceScan.SourceGenerator/*   


You can find more details at https://github.com/Dreamescaper/ServiceScan.SourceGenerator

Source : https://github.com/Dreamescaper/ServiceScan.SourceGenerator

:::

### Original Readme
:::note

# ServiceScan.SourceGenerator
[![NuGet Version](https://img.shields.io/nuget/v/ServiceScan.SourceGenerator)](https://www.nuget.org/packages/ServiceScan.SourceGenerator/)

Source generator for services registrations inspired by [Scrutor](https://github.com/khellang/Scrutor/).
Code generation allows to have AOT-compatible code, without an additional hit on startup performance due to runtime assembly scanning.

## Installation 
Add the NuGet Package to your project:
```
dotnet add package ServiceScan.SourceGenerator
```

## Usage

`ServiceScan` generates a partial method implementation based on `GenerateServiceRegistrations` attribute. This attribute can be added to a partial method with `IServiceCollection` parameter. 
For example, based on the following partial method:
```csharp
public static partial class ServicesExtensions
{
    [GenerateServiceRegistrations(AssignableTo = typeof(IMyService), Lifetime = ServiceLifetime.Scoped)]
    public static partial IServiceCollection AddServices(this IServiceCollection services);
}
```

`ServiceScan` will generate the following implementation:
```csharp
public static partial class ServicesExtensions
{
    public static partial IServiceCollection AddServices(this IServiceCollection services)
    {
        return services
            .AddScoped<IMyService, ServiceImplementation1>()
            .AddScoped<IMyService, ServiceImplementation2>();
    }
}
```

The only thing left is to invoke this method on your `IServiceCollection` instance.

## Examples

### Register all [FluentValidation](https://github.com/FluentValidation/FluentValidation) validators
Unlike using `FluentValidation.DependencyInjectionExtensions` package, `ServiceScan` is AOT-compatible, and doesn't affect startup performance:
```csharp
[GenerateServiceRegistrations(AssignableTo = typeof(IValidator<>), Lifetime = ServiceLifetime.Singleton)]
public static partial IServiceCollection AddValidators(this IServiceCollection services);
```

### Add [MediatR](https://github.com/jbogard/MediatR) handlers
```csharp
public static IServiceCollection AddMediatR(this IServiceCollection services)
{
    return services
        .AddTransient<IMediator, Mediator>()
        .AddMediatRHandlers();
}

[GenerateServiceRegistrations(AssignableTo = typeof(IRequestHandler<>), Lifetime = ServiceLifetime.Transient)]
[GenerateServiceRegistrations(AssignableTo = typeof(IRequestHandler<,>), Lifetime = ServiceLifetime.Transient)]
private static partial IServiceCollection AddMediatRHandlers(this IServiceCollection services);
```
It adds MediatR handlers, which would work for simple cases, although you might need to add other types like PipelineBehaviors or NotificationHandlers.

### Add all repository types from your project based on name filter as their implemented interfaces:
```csharp
[GenerateServiceRegistrations(
    TypeNameFilter = "*Repository",
    AsImplemetedInterfaces = true,
    Lifetime = ServiceLifetime.Scoped)]
private static partial IServiceCollection AddRepositories(this IServiceCollection services);
```

## Parameters

`GenerateServiceRegistrations` attribute has the following properties:
| Property | Description |
| --- | --- |
| **FromAssemblyOf** |Set the assembly containing the given type as the source of types to register. If not specified, the assembly containing the method with this attribute will be used. |
| **AssignableTo** | Set the type that the registered types must be assignable to. Types will be registered with this type as the service type, unless `AsImplementedInterfaces` or `AsSelf` is set. |
| **Lifetime** | Set the lifetime of the registered services. `ServiceLifetime.Transient` is used if not specified. |
| **AsImplementedInterfaces** | If true, the registered types will be registered as implemented interfaces instead of their actual type. |
| **AsSelf** | If true, types will be registered with their actual type. It can be combined with `AsImplementedInterfaces`. In that case implemeted interfaces will be "forwarded" to an actual implementation type |
| **TypeNameFilter** | Set this value to filter the types to register by their full name. You can use '*' wildcards. You can also use ',' to separate multiple filters. |


:::

### About
:::note

Generating service collection / DI registration


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ServiceScan.SourceGenerator**
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
	  <PackageReference Include="ServiceScan.SourceGenerator" Version="1.1.2">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
		<PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="8.0.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ServiceScan.SourceGenerator\src\InjectDemo\Program.cs" label="Program.cs" >

  This is the use of **ServiceScan.SourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using InjectDemo;
using Microsoft.Extensions.DependencyInjection;
var sc=new ServiceCollection();
sc.AddMyServices();
var sp=sc.BuildServiceProvider();
var con = sp.GetService(typeof(Database)) as IDatabase;
ArgumentNullException.ThrowIfNull(con);
con.Open();



public static partial class MyServiceProvider
{
    [ServiceScan.SourceGenerator.GenerateServiceRegistrations(AssignableTo = typeof(Database),AsSelf =true, Lifetime = ServiceLifetime.Scoped)]

    [ServiceScan.SourceGenerator.GenerateServiceRegistrations(AssignableTo = typeof(IDatabase), Lifetime = ServiceLifetime.Scoped)]
    public static partial IServiceCollection AddMyServices(this IServiceCollection services)
    ;
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ServiceScan.SourceGenerator\src\InjectDemo\Database.cs" label="Database.cs" >

  This is the use of **ServiceScan.SourceGenerator** in *Database.cs*

```csharp showLineNumbers 
namespace InjectDemo;

partial class Database : IDatabase
{
    private readonly IDatabase con;

    public Database(IDatabase con)
    {
        this.con = con;
    }
    public void Open()
    {
        Console.WriteLine($"open from database");
        con.Open();
    }

}


```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ServiceScan.SourceGenerator\src\InjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **ServiceScan.SourceGenerator** in *DatabaseCon.cs*

```csharp showLineNumbers 

namespace InjectDemo;

public partial class DatabaseCon:IDatabase
{
    public string? Connection { get; set; }
    public void Open()
    {
        Console.WriteLine("open from database con" );
    }
}


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ServiceScan.SourceGenerator\src\InjectDemo\obj\GX\ServiceScan.SourceGenerator\ServiceScan.SourceGenerator.DependencyInjectionGenerator\GenerateServiceRegistrationsAttribute.Generated.cs" label="GenerateServiceRegistrationsAttribute.Generated.cs" >


```csharp showLineNumbers 
#nullable enable

using System;
using System.Diagnostics;
using Microsoft.Extensions.DependencyInjection;

namespace ServiceScan.SourceGenerator;

[Conditional("CODE_ANALYSIS")]
[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
internal class GenerateServiceRegistrationsAttribute : Attribute
{
    /// <summary>
    /// Set the assembly containing the given type as the source of types to register.
    /// If not specified, the assembly containing the method with this attribute will be used.
    /// </summary>
    public Type? FromAssemblyOf { get; set; }

    /// <summary>
    /// Set the type that the registered types must be assignable to.
    /// Types will be registered with this type as the service type,
    /// unless <see cref="AsImplementedInterfaces"/> or <see cref="AsSelf"/> is set.
    /// </summary>
    public Type? AssignableTo { get; set; }

    /// <summary>
    /// Set the lifetime of the registered services.
    /// <see cref="ServiceLifetime.Transient"/> is used if not specified.
    /// </summary>
    public ServiceLifetime Lifetime { get; set; }

    /// <summary>
    /// If set to true, types will be registered as implemented interfaces instead of their actual type.
    /// </summary>
    public bool AsImplementedInterfaces { get; set; }

    /// <summary>
    /// If set to true, types will be registered with their actual type.
    /// It can be combined with <see cref="AsImplementedInterfaces"/>, in that case implemeted interfaces will be
    /// "forwarded" to "self" implementation.
    /// </summary>
    public bool AsSelf { get; set; }

    /// <summary>
    /// Set this value to filter the types to register by their full name. 
    /// You can use '*' wildcards.
    /// You can also use ',' to separate multiple filters.
    /// </summary>
    /// <example>Namespace.With.Services.*</example>
    /// <example>*Service,*Factory</example>
    public string? TypeNameFilter { get; set; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ServiceScan.SourceGenerator\src\InjectDemo\obj\GX\ServiceScan.SourceGenerator\ServiceScan.SourceGenerator.DependencyInjectionGenerator\MyServiceProvider_AddMyServices.Generated.cs" label="MyServiceProvider_AddMyServices.Generated.cs" >


```csharp showLineNumbers 
using Microsoft.Extensions.DependencyInjection;



public static partial class MyServiceProvider
{
    public static partial IServiceCollection AddMyServices(this IServiceCollection services)
    {
        return services
            .AddScoped<InjectDemo.Database, InjectDemo.Database>()
            .AddScoped<InjectDemo.IDatabase, InjectDemo.Database>()
            .AddScoped<InjectDemo.IDatabase, InjectDemo.DatabaseCon>();
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project ServiceScan.SourceGenerator ](/sources/ServiceScan.SourceGenerator.zip)

:::


### Share ServiceScan.SourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&quote=ServiceScan.SourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&text=ServiceScan.SourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&title=ServiceScan.SourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator&title=ServiceScan.SourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FServiceScan.SourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ServiceScan.SourceGenerator

### In the same category (DependencyInjection) - 6 other generators


#### [AutoRegisterInject](/docs/AutoRegisterInject)


#### [depso](/docs/depso)


#### [FactoryGenerator](/docs/FactoryGenerator)


#### [Injectio](/docs/Injectio)


#### [jab](/docs/jab)


#### [Pure.DI](/docs/Pure.DI)

