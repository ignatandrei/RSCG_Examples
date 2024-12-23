---
sidebar_position: 370
title: 37 - AutoRegisterInject
description: Generating class DI registration from attributes
slug: /AutoRegisterInject
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# AutoRegisterInject  by Patrick Klaeren


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/AutoRegisterInject?label=AutoRegisterInject)](https://www.nuget.org/packages/AutoRegisterInject/)
[![GitHub last commit](https://img.shields.io/github/last-commit/patrickklaeren/AutoRegisterInject?label=updated)](https://github.com/patrickklaeren/AutoRegisterInject)
![GitHub Repo stars](https://img.shields.io/github/stars/patrickklaeren/AutoRegisterInject?style=social)

## Details

### Info
:::info

Name: **AutoRegisterInject**

C# Source Generator to automatically register dependencies in Microsoft Dependency Injection Service Collection

Author: Patrick Klaeren

NuGet: 
*https://www.nuget.org/packages/AutoRegisterInject/*   


You can find more details at https://github.com/patrickklaeren/AutoRegisterInject

Source : https://github.com/patrickklaeren/AutoRegisterInject

:::

### Original Readme
:::note

# AutoRegisterInject

AutoRegisterInject, also referred to as ARI, is a C# source generator that will automatically create Microsoft.Extensions.DependencyInjection registrations for types marked with attributes.

This is a compile time alternative to reflection/assembly scanning for your injections or manually adding to the `ServiceCollection` every time a new type needs to be registered.

For example:

```cs
namespace MyProject;

[RegisterScoped]
public class Foo { }
```

will automatically generate an extension method called `AutoRegister()` for `IServiceProvider`, that registers `Foo`, as scoped.

```cs
internal IServiceCollection AutoRegister(this IServiceCollection serviceCollection)
{
    serviceCollection.AddScoped<Foo>();
    return serviceCollection;
}
```

In larger projects, dependency injection registration becomes tedious and in team situations can lead to merge conflicts which can be easily avoided.

AutoRegisterInject moves the responsibility of service registration to the owning type rather than external service collection configuration, giving control and oversight of the type that is going to be registered with the container.

## Installation

Install the [Nuget](https://www.nuget.org/packages/AutoRegisterInject) package, and start decorating classes with ARI attributes.

Use `dotnet add package AutoRegisterInject` or add a package reference manually:

```xml
<PackageReference Include="AutoRegisterInject" />
```

## Usage

Classes should be decorated with one of four attributes:
- `[RegisterScoped]`
- `[RegisterSingleton]`
- `[RegisterTransient]`
- `[RegisterHostedService]`

Register a class:

```cs
[RegisterScoped]
class Foo;
```

and get the following output:

```cs
serviceCollection.AddScoped<Foo>();
```

Update the service collection by invoking:

```cs
var serviceCollection = new ServiceCollection();
serviceCollection.AutoRegister();
serviceCollection.BuildServiceProvider();
```

You can now inject `Foo` as a dependency and have this resolved as scoped.

Alternatively, you can register hosted services by:

```cs
[RegisterHostedService]
class Foo;
```

and get:

```cs
serviceCollection.AddHostedService<Foo>();
```

### Register as interface

Implement one or many interfaces on your target class:

```cs
[RegisterTransient]
class Bar : IBar;
```

and get the following output:

```cs
serviceCollection.AddTransient<IBar, Bar>();
```

**Important note:** AutoRegisterInject is opinionated and `Bar` will only be registered with its implemented interface. ARI will **not** register `Bar`. `Bar` will always need to be resolved from `IBar` in your code.

Implementing multiple interfaces will have the implementing type be registered for each distinct interface.

```cs
[RegisterTransient]
class Bar : IBar, IFoo, IBaz;
```

will output the following:

```cs
serviceCollection.AddTransient<IBar, Bar>();
serviceCollection.AddTransient<IFoo, Bar>();
serviceCollection.AddTransient<IBaz, Bar>();
```

**Important note:** AutoRegisterInject is opinionated and `Bar` will only be registered with its implemented interfaces. ARI will **not** register `Bar`. `Bar` will always need to be resolved from `IBar`, `IFoo` or `IBaz` in your code.

### Multiple assemblies

In addition to the `AutoRegister` extension method, every assembly that AutoRegisterInject is a part of, a `AutoRegisterFromAssemblyName` will be generated. This allows you to configure your service collection from one, main, executing assembly.

Given 3 assemblies, `MyProject.Main`, `MyProject.Services`, `MyProject.Data`, you can configure the `ServiceCollection` as such:

```cs
var serviceCollection = new ServiceCollection();
serviceCollection.AutoRegisterFromMyProjectMain();
serviceCollection.AutoRegisterFromMyProjectServices();
serviceCollection.AutoRegisterFromMyProjectData();
serviceCollection.BuildServiceProvider();
```

AutoRegisterInject will remove illegal characters from assembly names in order to generate legal C# method names. `,`, `.` and ` ` will be removed.

## License

AutoRegisterInject is MIT licensed. Do with it what you please under the terms of MIT.


:::

### About
:::note

Generating class DI registration from attributes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AutoRegisterInject**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoRegisterInject" Version="1.2.1" />
    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="7.0.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoRegisterInject\src\AutoRegisterInjectDemo\Program.cs" label="Program.cs" >

  This is the use of **AutoRegisterInject** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using AutoRegisterInjectDemo;
using Microsoft.Extensions.DependencyInjection;

Console.WriteLine("Hello, World!");
ServiceCollection sc = new();
sc.AutoRegisterFromAutoRegisterInjectDemo();
var b=sc.BuildServiceProvider();
var con = b.GetRequiredService<DatabaseCon>();
var db=b.GetRequiredService<IDatabase>();
db.Open();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoRegisterInject\src\AutoRegisterInjectDemo\Database.cs" label="Database.cs" >

  This is the use of **AutoRegisterInject** in *Database.cs*

```csharp showLineNumbers 
namespace AutoRegisterInjectDemo;

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoRegisterInject\src\AutoRegisterInjectDemo\IDatabase.cs" label="IDatabase.cs" >

  This is the use of **AutoRegisterInject** in *IDatabase.cs*

```csharp showLineNumbers 
namespace AutoRegisterInjectDemo
{
    internal interface IDatabase
    {
        void Open();
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoRegisterInject\src\AutoRegisterInjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **AutoRegisterInject** in *DatabaseCon.cs*

```csharp showLineNumbers 
namespace AutoRegisterInjectDemo;

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoRegisterInject\src\AutoRegisterInjectDemo\obj\GX\AutoRegisterInject\AutoRegisterInject.Generator\AutoRegisterInject.Attributes.g.cs" label="AutoRegisterInject.Attributes.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Automatically generated by AutoRegisterInject.
//     Changes made to this file may be lost and may cause undesirable behaviour.
// </auto-generated>
[System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class RegisterScopedAttribute : System.Attribute { }
[System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class RegisterSingletonAttribute : System.Attribute { }
[System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class RegisterTransientAttribute : System.Attribute { }
[System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
internal sealed class RegisterHostedServiceAttribute : System.Attribute { }
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AutoRegisterInject\src\AutoRegisterInjectDemo\obj\GX\AutoRegisterInject\AutoRegisterInject.Generator\AutoRegisterInject.ServiceCollectionExtension.g.cs" label="AutoRegisterInject.ServiceCollectionExtension.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     Automatically generated by AutoRegisterInject.
//     Changes made to this file may be lost and may cause undesirable behaviour.
// </auto-generated>
using Microsoft.Extensions.DependencyInjection;
public static class AutoRegisterInjectServiceCollectionExtension
{
    public static Microsoft.Extensions.DependencyInjection.IServiceCollection AutoRegisterFromAutoRegisterInjectDemo(this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection)
    {
        return AutoRegister(serviceCollection);
    }

    internal static Microsoft.Extensions.DependencyInjection.IServiceCollection AutoRegister(this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<AutoRegisterInjectDemo.IDatabase, AutoRegisterInjectDemo.Database>();
serviceCollection.AddSingleton<AutoRegisterInjectDemo.DatabaseCon>();
        return serviceCollection;
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project AutoRegisterInject ](/sources/AutoRegisterInject.zip)

:::


### Share AutoRegisterInject 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoRegisterInject&quote=AutoRegisterInject" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoRegisterInject&text=AutoRegisterInject:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoRegisterInject" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoRegisterInject&title=AutoRegisterInject" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoRegisterInject&title=AutoRegisterInject&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAutoRegisterInject" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AutoRegisterInject

### In the same category (DependencyInjection) - 6 other generators


#### [depso](/docs/depso)


#### [FactoryGenerator](/docs/FactoryGenerator)


#### [Injectio](/docs/Injectio)


#### [jab](/docs/jab)


#### [Pure.DI](/docs/Pure.DI)


#### [ServiceScan.SourceGenerator](/docs/ServiceScan.SourceGenerator)

