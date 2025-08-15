---
sidebar_position: 1970
title: 197 - BunnyTailServiceRegistration
description: Generating service registration code from attributes
slug: /BunnyTailServiceRegistration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# BunnyTailServiceRegistration  by Machi Pon


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/BunnyTail.ServiceRegistration?label=BunnyTail.ServiceRegistration)](https://www.nuget.org/packages/BunnyTail.ServiceRegistration/)
[![GitHub last commit](https://img.shields.io/github/last-commit/usausa/service-registration-generator?label=updated)](https://github.com/usausa/service-registration-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/usausa/service-registration-generator?style=social)

## Details

### Info
:::info

Name: **BunnyTailServiceRegistration**

Service registration source generator.

Author: Machi Pon

NuGet: 
*https://www.nuget.org/packages/BunnyTail.ServiceRegistration/*   


You can find more details at https://github.com/usausa/service-registration-generator

Source: https://github.com/usausa/service-registration-generator

:::

### Original Readme
:::note

# BunnyTail.ServiceRegistrationGenerator

| Package | Info |
|:-|:-|
| BunnyTail.ServiceRegistration | [![NuGet](https://img.shields.io/nuget/v/BunnyTail.ServiceRegistration.svg)](https://www.nuget.org/packages/BunnyTail.ServiceRegistration) |

## What is this?

Service registory method generator.

## Usage

```csharp
using BunnyTail.ServiceRegistration;

using Microsoft.Extensions.DependencyInjection;

internal static class Program
{
    public static void Main()
    {
        using var provider = new ServiceCollection()
            .AddServices()
            .BuildServiceProvider();

        var service = provider.GetRequiredService<TestService>();
    }
}

internal static partial class ServiceCollectionExtensions
{
    [ServiceRegistration(Lifetime.Singleton, "Service$")]
    public static partial IServiceCollection AddServices(this IServiceCollection services);
}

internal sealed class TestService
{
}
```


:::

### About
:::note

Generating service registration code from attributes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **BunnyTailServiceRegistration**
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
	 <PackageReference Include="BunnyTail.ServiceRegistration" Version="1.7.0" />
	 <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="9.0.2" />

	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BunnyTailServiceRegistration\src\InjectDemo\ServiceCollectionExtensions.cs" label="ServiceCollectionExtensions.cs" >

  This is the use of **BunnyTailServiceRegistration** in *ServiceCollectionExtensions.cs*

```csharp showLineNumbers 
using BunnyTail.ServiceRegistration;
using Microsoft.Extensions.DependencyInjection;

internal static partial class ServiceCollectionExtensions
{
    [ServiceRegistration(Lifetime.Scoped, "Database")]
    public static partial IServiceCollection AddDatabaseServices(this IServiceCollection services);
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BunnyTailServiceRegistration\src\InjectDemo\Program.cs" label="Program.cs" >

  This is the use of **BunnyTailServiceRegistration** in *Program.cs*

```csharp showLineNumbers 
using InjectDemo;
using Microsoft.Extensions.DependencyInjection;


var serviceCollection = new ServiceCollection();

serviceCollection.AddDatabaseServices();

var provider = serviceCollection.BuildServiceProvider();

var service = provider.GetService<Database>();

if(service == null)
    throw new Exception("Service not found");
else
    service.Open();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BunnyTailServiceRegistration\src\InjectDemo\IDatabase.cs" label="IDatabase.cs" >

  This is the use of **BunnyTailServiceRegistration** in *IDatabase.cs*

```csharp showLineNumbers 
namespace InjectDemo
{
    internal interface IDatabase
    {
        public void Open();
    }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BunnyTailServiceRegistration\src\InjectDemo\Database.cs" label="Database.cs" >

  This is the use of **BunnyTailServiceRegistration** in *Database.cs*

```csharp showLineNumbers 
namespace InjectDemo;
partial class Database 
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BunnyTailServiceRegistration\src\InjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **BunnyTailServiceRegistration** in *DatabaseCon.cs*

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BunnyTailServiceRegistration\src\InjectDemo\obj\GX\BunnyTail.ServiceRegistration.Generator\BunnyTail.ServiceRegistration.Generator.ServiceRegistrationGenerator\ServiceCollectionExtensions.g.cs" label="ServiceCollectionExtensions.g.cs" >


```csharp showLineNumbers 
// <auto-generated />
#nullable enable

using Microsoft.Extensions.DependencyInjection;

partial class ServiceCollectionExtensions
{
    public static partial global::Microsoft.Extensions.DependencyInjection.IServiceCollection AddDatabaseServices(this global::Microsoft.Extensions.DependencyInjection.IServiceCollection services)
    {
        services.AddScoped<global::InjectDemo.Database>();
        services.AddScoped<global::InjectDemo.IDatabase, global::InjectDemo.DatabaseCon>();
        return services;
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project BunnyTailServiceRegistration ](/sources/BunnyTailServiceRegistration.zip)

:::


### Share BunnyTailServiceRegistration 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBunnyTailServiceRegistration&quote=BunnyTailServiceRegistration" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBunnyTailServiceRegistration&text=BunnyTailServiceRegistration:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBunnyTailServiceRegistration" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBunnyTailServiceRegistration&title=BunnyTailServiceRegistration" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBunnyTailServiceRegistration&title=BunnyTailServiceRegistration&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBunnyTailServiceRegistration" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/BunnyTailServiceRegistration

### In the same category (DependencyInjection) - 8 other generators


#### [AutoRegisterInject](/docs/AutoRegisterInject)


#### [DependencyModules.SourceGenerator](/docs/DependencyModules.SourceGenerator)


#### [depso](/docs/depso)


#### [FactoryGenerator](/docs/FactoryGenerator)


#### [Injectio](/docs/Injectio)


#### [jab](/docs/jab)


#### [Pure.DI](/docs/Pure.DI)


#### [ServiceScan.SourceGenerator](/docs/ServiceScan.SourceGenerator)

