---
sidebar_position: 360
title: 36 - ProxyGen
description: intercepting and duck typing
slug: /ProxyGen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ProxyGen  by Dénes Solti


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/ProxyGen.net?label=ProxyGen.net)](https://www.nuget.org/packages/ProxyGen.net/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Sholtee/ProxyGen?label=updated)](https://github.com/Sholtee/ProxyGen)
![GitHub Repo stars](https://img.shields.io/github/stars/Sholtee/ProxyGen?style=social)

## Details

### Info
:::info

Name: **ProxyGen**

.NET proxy generator powered by Roslyn

Author: Dénes Solti

NuGet: 
*https://www.nuget.org/packages/ProxyGen.net/*   


You can find more details at https://github.com/Sholtee/ProxyGen

Source : https://github.com/Sholtee/ProxyGen

:::

### Original Readme
:::note

# ProxyGen.NET [![Build status](https://ci.appveyor.com/api/projects/status/caw7qqtf5tbaa1fq/branch/master?svg=true)](https://ci.appveyor.com/project/Sholtee/proxygen/branch/master) ![AppVeyor tests](https://img.shields.io/appveyor/tests/sholtee/proxygen/master) [![Coverage Status](https://coveralls.io/repos/github/Sholtee/proxygen/badge.svg?branch=master)](https://coveralls.io/github/Sholtee/proxygen?branch=master) [![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/proxygen.net)](https://www.nuget.org/packages/proxygen.net) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/sholtee/proxygen/master)
> .NET proxy generator powered by [Roslyn](https://github.com/dotnet/roslyn )

**This documentation refers the version 8.X of the library**
## Purposes
This library currently supports generating [proxies](https://en.wikipedia.org/wiki/Proxy_pattern ) for interface interception and [duck typing](https://en.wikipedia.org/wiki/Duck_typing ).
### To hook into interface method calls:
1. Create the interceptor class (which is an [InterfaceInterceptor](https://sholtee.github.io/proxygen/doc/Solti.Utils.Proxy.InterfaceInterceptor-1.html ) descendant):
  ```csharp
  using Solti.Utils.Proxy;
  ...
  public class MyInterceptor: InterfaceInterceptor<IMyInterface>
  {
    public MyInterceptor(IMyInterface target) : base(target) {}

    public MyInterceptor(IMyInterface target, MyParam myParam) : base(target) {}  // overloaded constructor

    public override object? Invoke(InvocationContext context) // Invoking the generated proxy instance will trigger this method
    {
	  if (suppressOriginalMethod)
	  {
	    return something;
        // ref|out parameters can be assigned by setting the corresponding "context.Args[]" item 
	  }
	  
	  context.Args[0] = someNewVal; // "someNewVal" will be forwarded to the original method
	  
	  return base.Invoke(context); // Let the original method do its work
    }  
  }
  // OR
  public class MyInterceptorTargetingTheImplementation: InterfaceInterceptor<IMyInterface, MyInterfaceImplementation>
  {
      public MyInterceptor(MyInterfaceImplementation target) : base(target) {}

      public override object? Invoke(InvocationContext context)
      {
          MemberInfo
              ifaceMember  = context.InterfaceMember,  // Will point to the invoked IMyInterface member (e.g.: IMyInterface.Foo())
              targetMember = context.TargetMember; // Will point to the underlying MyInterfaceImplementation member (e.g. MyInterfaceImplementation.Foo())

          return base.Invoke(context);
      }
  }
  ```
2. Generate a proxy instance invoking the desired constructor:
  ```csharp
  using System;
  ...
  IMyInterface target = new MyClass();
  ...
  IMyInterface proxy;
  
  proxy = ProxyGenerator<IMyInterface, MyInterceptor>.Activate(Tuple.Create(target)); // or ActivateAsync()
  proxy = ProxyGenerator<IMyInterface, MyInterceptor>.Activate(Tuple.Create(target, new MyParam()));
  ```
3. Enjoy

Note that the *target* can access its most outer enclosing proxy. To achieve this it just has to implement the `IProxyAccess<IMyInterface>` interface:
```csharp
using Solti.Utils.Proxy;

public class MyClass : IMyInterface, IProxyAccess<IMyInterface>
{
    ...
    public IMyInterface Proxy { get; set; }
}
```

For further usage examples see [this](https://github.com/Sholtee/proxygen/blob/master/TEST/ProxyGen.Tests/Generators/ProxyGenerator.cs ) or [that](https://github.com/Sholtee/injector#decorating-services ).
### To create ducks:
1. Declare an interface that covers all the desired members of the target class:
  ```csharp
  public class TargetClass // does not implement IDuck
  {
    public void Foo(){...}
  }
  ...
  public interface IDuck 
  {
    void Foo();
  }
  ```
2. Generate the duck instance:
  ```csharp
  using Solti.Utils.Proxy.Generators;
  ...
  TargetClass target = ...;
  IDuck duck = DuckGenerator<IDuck, TargetClass>.Activate(Tuple.Create(target)); // or ActivateAsync()
  ```
3. Quack
  
Related tests can be seen [here](https://github.com/Sholtee/proxygen/blob/master/TEST/ProxyGen.Tests/Generators/DuckGenerator.cs ).
## Caching the generated assembly
By setting the `ProxyGen.AssemblyCacheDir` property in [YourApp.runtimeconfig.json](https://docs.microsoft.com/en-us/dotnet/core/run-time-config/ ) you can make the system cache the generated assembly, so next time your app starts and requests the proxy there won't be time consuming emitting operation.

You can do it easily by creating a template file named `runtimeconfig.template.json` in your project folder:
```json
{
  "configProperties": {
    "ProxyGen.AssemblyCacheDir": "GeneratedAssemblies"
  }
}
```
## Embedding the generated type
This library can be used as a [source generator](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/ ) so you can embed the generated proxy type into the assembly that uses it. This is simply done by the `Solti.Utils.Proxy.Attributes.EmbedGeneratedTypeAttribute`:
```csharp
[assembly: EmbedGeneratedType(typeof(ProxyGenerator<IMyInterface, MyInterceptor<IMyInterface>>))]
[assembly: EmbedGeneratedType(typeof(DuckGenerator<IMyInterface, MyClass>))]

```
The `xXxGenerator.GetGeneratedType()` method returns the embedded type if it is present in the assembly in which the `GetGeneratedType()` was called. Since all the time consumig operations already happened in compile time, requesting embedded types can singificantly improve the performance.

Note that:
- Open generics are not supported.
- [coveralls.io](https://www.nuget.org/packages/coveralls.io/ ) (and other coverage reporters) may crash if your project was augmented by a source generator. To work this issue around:
  - Ignore the generated sources in your coverage app (e.g.: in [OpenCover](https://www.nuget.org/packages/OpenCover/ ) use the `-filter:-[*]Proxies.GeneratedClass_*` switch)
  - Create an empty file for each generated class (e.g.: `YourProject\Solti.Utils.Proxy\Solti.Utils.Proxy.Internals.ProxyEmbedder\Proxies.GeneratedClass_XxX.cs`)
  - Exclude these files from your project:
  ```xml
  <ItemGroup>
    <Compile Remove="Solti.Utils.Proxy\**" />
    <EmbeddedResource Remove="Solti.Utils.Proxy\**" />
    <None Remove="Solti.Utils.Proxy\**" />
  </ItemGroup>
  ```  
## Inspecting the generated code
*ProxyGen* is able to dump the generated sources. Due to performance considerations it is disabled by default. To enable 
- In runtime:

  Set the `ProxyGen.SourceDump` property (in the same way you could see [above](#caching-the-generated-assembly)) to the desired directory (note that environment variables are supported):
  ```json
  {
    "configProperties": {
      "ProxyGen.SourceDump": "%TEMP%"
    }
  }
  ```
  
- In compile time (source generator):

  Extend your `.csproj` with the following:
  ```xml
  <PropertyGroup>
    <ProxyGen_SourceDump>$(OutputPath)Logs</ProxyGen_SourceDump>
  </PropertyGroup>
  ```

The output should look like [this](https://github.com/Sholtee/proxygen/blob/master/TEST/ProxyGen.Tests/ClsSrcUnit.txt ).
## Migrating from version 
- 2.X
  - Delete all the cached assemblies (if the `[Proxy|Duck]Generator.CacheDirectory` is set somewhere)
  - `InterfaceInterceptor.Invoke()` returns the result of the original method (instead of `CALL_TARGET`) so in the override you may never need to invoke the `method` parameter directly.
- 3.X
  - `[Proxy|Duck]Generator.GeneratedType[Async]` property has been removed. To get the generated proxy type call the `[Proxy|Duck]Generator.GetGeneratedType[Async]()` method.
  - `[Proxy|Duck]Generator.CacheDirectory` property has been removed. To set the cache directory tweak the [runtimeconfig.json](#caching-the-generated-assembly) file.
- 4.X
  - The layout of the `InterfaceInterceptor<>.Invoke()` has been changed. Invocation parameters can be grabbed from the `InvocationContext` passed to the `Invoke()` method.
  - The `ConcurrentInterfaceInterceptor<>` class has been dropped since the `InterfaceInterceptor<>` class was rewritten in a thread safe manner.
- 5.X
  - You don't need to manually activate the generated proxy type, instead you may use the built-in `Generator.Activate()` method.
- 6.X
  - The `InvocationContext.InvokeTarget` property has been removed but you should not be affected by it
  - As proxy embedder has been reimplemented using the [v2](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md ) Source Generator API, this feature now requires VS 2022
- 7.X
  - `InterfaceInterceptor<TInterface>.Member|Method` has been renamed to `InterfaceMember|InterfaceMethod`
## Resources
- [API Docs](https://sholtee.github.io/proxygen )
- [Benchmark Results](https://sholtee.github.io/proxygen/perf )
- [Version History](https://github.com/Sholtee/proxygen/blob/master/history.md )

## Supported frameworks
This project currently targets *.NET Standard* 2.0 and 2.1.

:::

### About
:::note

intercepting and duck typing


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ProxyGen**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
  <ItemGroup>
    <PackageReference Include="ProxyGen.NET" Version="8.2.1" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ProxyGen\src\ProxyGenDemo\Program.cs" label="Program.cs" >

  This is the use of **ProxyGen** in *Program.cs*

```csharp showLineNumbers 
Person person = new ();
person.FirstName= "Andrei";
person.LastName = "Ignat";
IPerson duck = DuckGenerator<IPerson, Person>.Activate(Tuple.Create(person));
Console.WriteLine(duck.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ProxyGen\src\ProxyGenDemo\Person.cs" label="Person.cs" >

  This is the use of **ProxyGen** in *Person.cs*

```csharp showLineNumbers 

namespace ProxyGenDemo;

public class Person 
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ProxyGen\src\ProxyGenDemo\IPerson.cs" label="IPerson.cs" >

  This is the use of **ProxyGen** in *IPerson.cs*

```csharp showLineNumbers 
namespace ProxyGenDemo;

public interface IPerson
{
    string? FirstName { get; set; }
    string? LastName { get; set; }

    string FullName();
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ProxyGen\src\ProxyGenDemo\globals.cs" label="globals.cs" >

  This is the use of **ProxyGen** in *globals.cs*

```csharp showLineNumbers 
global using ProxyGenDemo;
global using Solti.Utils.Proxy.Generators;
global using Solti.Utils.Proxy.Attributes;

//[assembly: EmbedGeneratedType(typeof(ProxyGenerator<IMyInterface, MyInterceptor<IMyInterface>>))]
[assembly: EmbedGeneratedType(typeof(DuckGenerator<IPerson, Person>))]
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ProxyGen\src\ProxyGenDemo\obj\GX\Solti.Utils.Proxy\Solti.Utils.Proxy.Internals.ProxyEmbedder\Duck_BB1E45629CF5010E4068E5BFBB7EF53B.cs" label="Duck_BB1E45629CF5010E4068E5BFBB7EF53B.cs" >


```csharp showLineNumbers 
#pragma warning disable
[global::System.CodeDom.Compiler.GeneratedCodeAttribute("ProxyGen.NET", "8.2.1.0"), global::System.Diagnostics.DebuggerNonUserCodeAttribute, global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
internal sealed class Duck_BB1E45629CF5010E4068E5BFBB7EF53B : global::Solti.Utils.Proxy.Internals.DuckBase<global::ProxyGenDemo.Person>, global::ProxyGenDemo.IPerson
{
    public Duck_BB1E45629CF5010E4068E5BFBB7EF53B(global::ProxyGenDemo.Person target) : base(target)
    {
    }

    [global::System.Runtime.CompilerServices.MethodImplAttribute(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
    global::System.String global::ProxyGenDemo.IPerson.FullName() => this.Target.FullName();
    global::System.String global::ProxyGenDemo.IPerson.FirstName {[global::System.Runtime.CompilerServices.MethodImplAttribute(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        get => this.Target.FirstName; [global::System.Runtime.CompilerServices.MethodImplAttribute(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        set => this.Target.FirstName = value; }

    global::System.String global::ProxyGenDemo.IPerson.LastName {[global::System.Runtime.CompilerServices.MethodImplAttribute(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        get => this.Target.LastName; [global::System.Runtime.CompilerServices.MethodImplAttribute(global::System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
        set => this.Target.LastName = value; }

    public static readonly global::System.Func<global::System.Object, global::System.Object> __Activator = tuple =>
    {
        switch (tuple)
        {
            case global::System.Tuple<global::ProxyGenDemo.Person> t0:
                return new global::Duck_BB1E45629CF5010E4068E5BFBB7EF53B(t0.Item1);
            default:
                throw new global::System.MissingMethodException("Constructor with the given layout cannot be found.");
        }
    };
    [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
    public static void Initialize() => global::Solti.Utils.Proxy.Internals.LoadedTypes.Register(typeof(global::Duck_BB1E45629CF5010E4068E5BFBB7EF53B));
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project ProxyGen ](/sources/ProxyGen.zip)

:::


### Share ProxyGen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProxyGen&quote=ProxyGen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProxyGen&text=ProxyGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProxyGen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProxyGen&title=ProxyGen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProxyGen&title=ProxyGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProxyGen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ProxyGen

## In the same category (EnhancementProject)


### [BuildInfo](/docs/BuildInfo)


### [Com](/docs/Com)


### [DeeDee](/docs/DeeDee)


### [Matryoshki](/docs/Matryoshki)


### [Mediator](/docs/Mediator)


### [RSCG_AMS](/docs/RSCG_AMS)


### [RSCG_FunctionsWithDI](/docs/RSCG_FunctionsWithDI)


### [RSCG_TimeBombComment](/docs/RSCG_TimeBombComment)


### [SourceGenerator.Helper.CopyCode](/docs/SourceGenerator.Helper.CopyCode)


### [ThisAssembly](/docs/ThisAssembly)

