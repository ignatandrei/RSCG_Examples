---
sidebar_position: 2080
title: 208 - AsyncIt
description: Generate async from sync or sync from async
slug: /AsyncIt
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAsync.mdx';

# AsyncIt  by Oleg Shilo


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/AsyncIt?label=AsyncIt)](https://www.nuget.org/packages/AsyncIt/)
[![GitHub last commit](https://img.shields.io/github/last-commit/oleg-shilo/AsyncIt?label=updated)](https://github.com/oleg-shilo/AsyncIt)
![GitHub Repo stars](https://img.shields.io/github/stars/oleg-shilo/AsyncIt?style=social)

## Details

### Info
:::info

Name: **AsyncIt**

AsyncIt is a C# source generator (CodeAnalyzer) for automatic generation of async/sync versions of the type API.

Author: Oleg Shilo

NuGet: 
*https://www.nuget.org/packages/AsyncIt/*   


You can find more details at https://github.com/oleg-shilo/AsyncIt/

Source: https://github.com/oleg-shilo/AsyncIt

:::

### Original Readme
:::note

# AsyncIt

AsyncIt is a NuGet package library that allows the automatic generation of additional synchronous and asynchronous APIs for existing user codebase and external packages.

It aims to extend user-defined CLR types by automating the otherwise manual process of defining repetitive and straightforward routines. Thus, the development, maintenance and consumption of the released API are simplified due to the balanced (close to ideal) ratio of the synchronous and asynchronous API endpoints:

&nbsp;&nbsp;&nbsp;_**Every functionality point has both Async and Sync API endpoints available.**_

This content is an extract from the project's main [Wiki page](https://github.com/oleg-shilo/AsyncIt/wiki). It is highly recommended that you read it, as it explains the deep reasons behind this project and details the more concrete usage scenarios.

## Overview

AsyncIt is a source generator that is integrated into the .NET build process as a special tool type - the so-called "Analyzer". It is invoked by the compiler during the assembly build and allows the injection of missing API endpoints based on the present assembly API. Thus, if the assembly being built has the `GetStatus` but not the `GetStatusAsync` method, then AsyncIt will generate the missing method with a straightforward implementation. It can also generate the synchronous API if it is not present in the original codebase:

- The API defines synchronous methods only:

  _Original code_

  ```C#
  public partial class DeviceLib
  {
      public static string GetStatus() {. . .}
  }
  ```

  _Code that is fed to the C# compiler_

  ```C#
  public partial class DeviceLib
  {
      public static string GetStatus() {. . .}
  }

  public partial class DeviceLib // AsyncIt generated
  {
      public static Task<string> GetStatusAsync() 
          => TaskRun(() => GetStatus());
  }
  ```

AsyncIt does not do anything fancy. Like the `await` keyword, it cannot magically convert a synchronous routine into an asynchronous one and vice versa. Instead, it simply emits the code that the developer would type manually if he/she decides to use the API in a concurrency way that the API author did not anticipate. 

AsyncIt can also be used to balance API of the external assemblies (e.g. .NET base classes, nuget packages)

This is where AsyncIt is placed in the overall .NET concurrency model architecture: 

![image](https://github.com/oleg-shilo/AsyncIt/assets/16729806/dec186b7-706b-4aee-817b-9e7472c46fc9)

## Usage

In order to integrate AsyncIt with your .NET project, add AsyncIt Nuget package. 

```ps
dotnet add package AsyncIt
```

That's it. Now, you can mark any type for which you want to generate async/sync methods with the `[Async]` attribute (see the details below), and the new source code will be generated and included in the build. 

You can always inspect the generated code in the Visual Studio solution explorer:   

![image](https://github.com/oleg-shilo/AsyncIt/assets/16729806/fabed4b6-3eec-4421-a293-ed10fad4a950)


###  Extending user-defined types

In this scenario, a user type containing sync/async methods is extended by additional source file(s) implementing additional API methods.
The type can be extended either with an additional partial class definition or by the extension methods class.

A typical usage can be illustrated by the code below.

_Async scenario:_
 
```C#
[Async]
public partial class BankService
{
    public partial class OrderService
    {
        public Order GetOrder(int id) // and GetOrderAsync will be created by AsyncIt
        {...}
    }
}

...

async Task OnButtonClick(object sender, EventArgs args)
{
    Order order = await service.GetOrderAsync(this.OrderId);
    orderLabel.Text = order.Name;
}
```

_Sync scenario:_

```c#
[Async(Interface = Interface.Sync)]
partial class AccountService
{
    public async Task<Account> GetAccountAsync(int id) // and GetAccount will be created by AsyncIt
    {...}
}

...

static void Main()
{
   var account = new AccountService().GetAccount(333);
   
   File.WriteAllText($"account_{account.Id}.txt", account.Balance.ToString());
}
```

###  Extending external types

In this scenario, an external type (from a referenced assembly) containing sync/async methods is extended by additional source file(s) implementing additional API methods.
The type can be extended by the extension methods class.

A typical usage can be illustrated by the code below for generating on-fly synchronous methods for type `HttpClient`  .

_Async scenario:_
 
```C#
// For all synchronous methods of DirectoryInfo will be created an async equivalent by AsyncIt
[assembly: AsyncExternal(typeof(DirectoryInfo), Interface.Async)] 

...

async Task OnButtonClick(object sender, EventArgs args)
{
    var info = new DirectoryInfo(workingDir);
    
    string[] folders = await info.GetDirectoriesAsync("*", SearchOption.AllDirectories);

    foreach(var path in folders)
      foldersListBox.Add(path);
}
```

_Sync scenario:_

```c#
// For all asynchronous methods of HttpClient will be created a sync equivalent by AsyncIt
[assembly: AsyncExternal(typeof(HttpClient), Interface.Sync)];

...

static void Main() 
    => File.WriteAllText(
           "temperature.txt", 
           new HttpClient().GetString("https://www.weather.com/au/melbourne/temperature"));
```


:::

### About
:::note

Generate async from sync or sync from async


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **AsyncIt**
```xml showLineNumbers {16}
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
	  <PackageReference Include="AsyncIt" Version="1.0.0-pre4">
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AsyncIt\src\ASyncDemo\Program.cs" label="Program.cs" >

  This is the use of **AsyncIt** in *Program.cs*

```csharp showLineNumbers 

using AsyncDemo;

var p=new Person();
var result=await p.RunAsync();
Console.WriteLine(result);
result=p.Run();
Console.WriteLine(result);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AsyncIt\src\ASyncDemo\Person.cs" label="Person.cs" >

  This is the use of **AsyncIt** in *Person.cs*

```csharp showLineNumbers 
using System.ComponentModel;
namespace AsyncDemo;

[AsyncIt.Async(Interface = AsyncIt.Interface.Sync)]
internal partial class Person
{   
    public async Task<bool> RunAsync()
    {
        await Task.Delay(1000);
        return true;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AsyncIt\src\ASyncDemo\obj\GX\AsyncIt\AsyncIt.AsyncExtensionsGenerator\AsyncAttribute.g.cs" label="AsyncAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using System;
using System.Reflection;

namespace AsyncIt
{

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class AsyncAttribute : Attribute
    {
        public AsyncAttribute()
        {
        }

        public AsyncAttribute(Algorithm algorithm, Interface @interface)
        {
            Algorithm = algorithm;
            Interface = @interface;
        }
        public AsyncAttribute(Interface @interface, Algorithm algorithm)
        {
            Algorithm = algorithm;
            Interface = @interface;
        }
        public AsyncAttribute(Algorithm algorithm)
        {
            Algorithm = algorithm;
        }

        public AsyncAttribute(Interface @interface)
        {
            Interface = @interface;
        }
        public Algorithm Algorithm { get; set; }
        public Interface Interface { get; set; }
        internal string TypeGenericArgs;
        internal string NamePattern;
    }

    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public sealed class AsyncExternalAttribute : Attribute
    {
        public AsyncExternalAttribute()
        {
        }
        public AsyncExternalAttribute(Type type)
        {
            Type = type;
        }

        public AsyncExternalAttribute(Type type, Interface @interface)
        {
            Type = type;
            Interface = @interface;
        }
        public AsyncExternalAttribute(Type type, Interface @interface, string methods)
        {
            Type = type;
            Interface = @interface;
            Methods = methods;
        }

        public Interface Interface { get; set; }
        public Type Type { get; set; }
        public string Methods { get; set; } = "*";
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class IgnoreAttribute : Attribute
    {
    }

    public enum Interface
    {
        Async,
        Sync,
        Full,
    }

    public enum Algorithm
    {
        PartialType,
        ExtensionMethods
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\AsyncIt\src\ASyncDemo\obj\GX\AsyncIt\AsyncIt.AsyncExtensionsGenerator\Person.AsyncDemo.Person.g.cs" label="Person.AsyncDemo.Person.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
using System.ComponentModel;

namespace AsyncDemo
{
    internal partial class Person
    {
        /// <summary>
        /// The synchronous version of <see cref="Person.RunAsync()"/>.
        /// </summary>
        public bool Run()
            => RunAsync().Result;
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project AsyncIt ](/sources/AsyncIt.zip)

:::


### Share AsyncIt 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAsyncIt&quote=AsyncIt" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAsyncIt&text=AsyncIt:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAsyncIt" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAsyncIt&title=AsyncIt" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAsyncIt&title=AsyncIt&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FAsyncIt" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/AsyncIt

aaa
<SameCategory />

