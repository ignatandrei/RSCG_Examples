---
sidebar_position: 1850
title: 185 - DependencyModules.SourceGenerator
description: Generating service dependencies from attributes. 
slug: /DependencyModules.SourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveDependencyInjection.mdx';

# DependencyModules.SourceGenerator  by Ian Johnson


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/DependencyModules.SourceGenerator?label=DependencyModules.SourceGenerator)](https://www.nuget.org/packages/DependencyModules.SourceGenerator/)[![Nuget](https://img.shields.io/nuget/dt/DependencyModules.Runtime?label=DependencyModules.Runtime)](https://www.nuget.org/packages/DependencyModules.Runtime/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ipjohnson/DependencyModules?label=updated)](https://github.com/ipjohnson/DependencyModules)
![GitHub Repo stars](https://img.shields.io/github/stars/ipjohnson/DependencyModules?style=social)

## Details

### Info
:::info

Name: **DependencyModules.SourceGenerator**

Package Description

Author: Ian Johnson

NuGet: 
*https://www.nuget.org/packages/DependencyModules.SourceGenerator/*   

*https://www.nuget.org/packages/DependencyModules.Runtime/*   


You can find more details at https://github.com/ipjohnson/DependencyModules

Source: https://github.com/ipjohnson/DependencyModules

:::

### Original Readme
:::note

# DependencyModules

DependencyModules is a C# source generator package that uses attributes to create
dependency injection registration modules. These modules can then be used to populate 
an IServiceCollection instance.

## Installation

```csharp
dotnet add package DependencyModules.Runtime
dotnet add package DependencyModules.SourceGenerator
```

## Service Attributes 

* `[DependencyModule]` - used to attribute class that will become dependency module (must be partial)
* `[SingletonService]` - registers service as `AddSingleton`
* `[ScopedService]` - registers service as `AdddScoped`
* `[TransientService]` - registers service as `AddTransient`

```csharp
// Registration example
[DependencyModule]
public partial class MyModule { }

// registers SomeClass implementation for ISomeService
[SingletonService]
public class SomeClass : ISomeService 
{
  public string SomeProp => "SomeString";
}

// registers OtherSerice implementation
[TransientService]
public class OtherService
{
  public OtherService(ISomeService service)
  { 
    SomeProp = service.SomeProp;
  }
  public string SomeProp { get; }
}
```
## Container Instantiation

`AddModule` - method adds modules to service collection

```csharp
var serviceCollection = new ServiceCollection();

serviceCollection.AddModule<MyModule>();

var provider = serviceCollection.BuildServiceProvider();

var service = provider.GetService<OtherService>();
```

## Module Re-use

DependencyModules creates an `Attribute` class that can be used to apply sub dependencies.

```csharp
// Modules can be re-used with the generated attributes
[DependencyModule]
[MyModule.Attribute]
public partial class AnotherModule { }
```

## Parameters

Sometimes you want to provide extra registration for your module. 
This can be achieved by adding a constructor to your module or optional properties. 
Note these parameters and properties will be correspondingly implemented in the module attribute.

```csharp
[DependencyModule]
public partial class SomeModule : IServiceCollectionConfiguration 
{
  private bool _someFlag;
  public SomeModule(bool someFlag = false)
  {
    _someFlag = someFlag;
  }
  
  public string OptionalString { get; set; } = "";
  
  public void ConfigureServices(IServiceCollection services) 
  {
    if (_someFlag) 
    {
      // custom registration
    } 
  }
}

[DependencyModule]
[SomeModule.Attribute(true, OptionalString = "otherString")]
public partial class SomeOtherModule 
{

}
```

## Managing duplicate registration

By default a module will only be loaded once, assuming attributes are used or the modules are specified in the same `AddModules` call. Seperate calls to `AddModule` will result in modules being loaded multiple times. If a module uses parameters it can be useful to load a module more than once. That can be accompilished by overriding the `Equals` and `GetHashcode` methods to allow for multiple loads.

Services will be registered using an `Add` method by default. This can be overriden using the `With` property on individual service or at the `DepedencyModule` level.

```csharp
[SingletonService(With = RegistrationType.Try)]
public class SomeService { }

[DependencyModule(With = RegistrationType.Try)]
public partial class SomeModule { }
```

## Realm

By default, all dependencies are registered in all modules within the same assembly. 
The realm allows the developer to scope down the registration within a given module.

```csharp
// register only dependencies specifically marked for this realm
[DependencyModule(OnlyRealm = true)]
public partial class AnotherModule { }

[SingletonService(ServiceType = typeof(ISomeInterface), 
  Realm = typeof(AnotherModule))]
public class SomeDep : ISomeInterface { }
```

## Keyed Registration

Registration attributes have a `Key` property that allows for specifying the key at registration time.

```csharp
[SingletonService(Key = "SomeKey")]
public class KeyService : IKeyService { }

// yields this registration line
services.AddKeyedSingleton(typeof(IKeyService), "SomeKey", typeof(KeyService));
```

## Unit testing & Mocking

DependencyModules provides an xUnit extension to make testing much easier. 
It handles the population and construction of a service provider using specified modules.

```csharp
> dotnet add package DependencyModules.xUnit
> dotnet add package DependencyModules.xUnit.NSubstitute

// applies module & nsubstitute support to all tests.
// test attributes can be applied at the assembly, class, and test method level
[assemlby: MyModule.Attribute]
[assembly: NSubstituteSupport]

public class OtherServiceTests 
{
  [ModuleTest]
  public void SomeTest(OtherService test, [Mock]ISomeService service)
  {
     service.SomeProp.Returns("some mock value");
     Assert.Equals("some mock value", test.SomeProp);
  }
  
  public void 
}

```
## Implementation

Behind the scenes the library generates registration code that can be used with any `IServiceCollection` compatible DI container.

Example generated code for [SutModule.cs](https://github.com/ipjohnson/DependencyModules/integ-tests/SutProject/SutModule.cs)
```csharp
    // SutModule.Dependencies.g.cs
    public partial class SutModule
    {
        private static int moduleField = DependencyRegistry<SutModule>.Add(ModuleDependencies);

        private static void ModuleDependencies(IServiceCollection services)
        {
            services.AddTransient(typeof(IDependencyOne), typeof(DependencyOne));
            services.AddSingleton(typeof(IGenericInterface<>), typeof(GenericClass<>));
            services.AddScoped(typeof(IScopedService), typeof(ScopedService));
            services.AddSingleton(typeof(ISingletonService), typeof(SingletonService));
            services.AddSingleton(typeof(IGenericInterface<string>), typeof(StringGeneric));
        }
    }

    // SutModule.Modules.g.cs
    public partial class SutModule : IDependencyModule
    {
        static SutModule()
        {
        }

        // this method loads all dependencies into IServiceCollection.
        public void PopulateServiceCollection(IServiceCollection services)
        {
            DependencyRegistry<SutModule>.LoadModules(services, this);
        }

        void IDependencyModule.InternalApplyServices(IServiceCollection services)
        {
            DependencyRegistry<SutModule>.ApplyServices(services);
        }

        public override bool Equals(object? obj)
        {
            return obj is SutModule;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(base.GetHashCode());
        }

        public class Attribute : System.Attribute, IDependencyModuleProvider
        {
            public IDependencyModule GetModule()
            {
                var newModule = new SutModule();
                return newModule;
            }
        }
    }
```


:::

### About
:::note

Generating service dependencies from attributes. 


Also,by the author, a more advanced example you will find in the DemoWithTest.zip inside the zip file


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DependencyModules.SourceGenerator**
```xml showLineNumbers {15}
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
	  <PackageReference Include="DependencyModules.Runtime" Version="1.0.0-RC9074" />
	  <PackageReference Include="DependencyModules.SourceGenerator" Version="1.0.0-RC9074" />
	 <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="9.0.2" />

	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\Program.cs" label="Program.cs" >

  This is the use of **DependencyModules.SourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using DependencyModules.Runtime;
using InjectDemo;
using Microsoft.Extensions.DependencyInjection;


var serviceCollection = new ServiceCollection();

serviceCollection.AddModule<MyModule>();

var provider = serviceCollection.BuildServiceProvider();

var service = provider.GetService<Database>();

if(service == null)
    throw new Exception("Service not found");
else
    service.Open();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\MyModule.cs" label="MyModule.cs" >

  This is the use of **DependencyModules.SourceGenerator** in *MyModule.cs*

```csharp showLineNumbers 
using DependencyModules.Runtime.Attributes;

[DependencyModule]
public partial class MyModule 
{ 

}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\IDatabase.cs" label="IDatabase.cs" >

  This is the use of **DependencyModules.SourceGenerator** in *IDatabase.cs*

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\Database.cs" label="Database.cs" >

  This is the use of **DependencyModules.SourceGenerator** in *Database.cs*

```csharp showLineNumbers 
using DependencyModules.Runtime.Attributes;

namespace InjectDemo;
[SingletonService(ServiceType = typeof(Database))]
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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\DatabaseCon.cs" label="DatabaseCon.cs" >

  This is the use of **DependencyModules.SourceGenerator** in *DatabaseCon.cs*

```csharp showLineNumbers 

using DependencyModules.Runtime.Attributes;

namespace InjectDemo;
[SingletonService]
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\obj\GX\DependencyModules.SourceGenerator\DependencyModules.SourceGenerator.SourceGenerator\MyModule.858.Dependencies.g.cs" label="MyModule.858.Dependencies.g.cs" >


```csharp showLineNumbers 
using DependencyModules.Runtime.Helpers;
using InjectDemo;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

public partial class MyModule
{
    private static int moduleField = DependencyRegistry<MyModule>.Add(ModuleDependencies);

    private static void ModuleDependencies(IServiceCollection services)
    {
        services.AddSingleton(typeof(Database), typeof(Database));
        services.AddSingleton(typeof(IDatabase), typeof(DatabaseCon));
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DependencyModules.SourceGenerator\src\InjectDemo\obj\GX\DependencyModules.SourceGenerator\DependencyModules.SourceGenerator.SourceGenerator\MyModule.858.Module.g.cs" label="MyModule.858.Module.g.cs" >


```csharp showLineNumbers 
using BaseAttribute = System.Attribute;
using DependencyModules.Runtime.Helpers;
using DependencyModules.Runtime.Interfaces;
using Microsoft.Extensions.DependencyInjection;

#nullable enable
public partial class MyModule : IDependencyModule
{

    static MyModule()
    {
    }

    public void PopulateServiceCollection(IServiceCollection services)
    {
        DependencyRegistry<MyModule>.LoadModules(services, this);
    }

    void IDependencyModule.InternalApplyServices(IServiceCollection services)
    {
        DependencyRegistry<MyModule>.ApplyServices(services);
    }

    public override bool Equals(object? obj)
    {
        return obj is MyModule;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(base.GetHashCode());
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Assembly | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true)]
    public partial class Attribute : BaseAttribute, IDependencyModuleProvider
    {

        public IDependencyModule GetModule()
        {
            var newModule = new MyModule();
            return newModule;
        }
    }
}
#nullable disable

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project DependencyModules.SourceGenerator ](/sources/DependencyModules.SourceGenerator.zip)

:::


### Share DependencyModules.SourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDependencyModules.SourceGenerator&quote=DependencyModules.SourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDependencyModules.SourceGenerator&text=DependencyModules.SourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDependencyModules.SourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDependencyModules.SourceGenerator&title=DependencyModules.SourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDependencyModules.SourceGenerator&title=DependencyModules.SourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDependencyModules.SourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DependencyModules.SourceGenerator

aaa
<SameCategory />

