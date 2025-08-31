---
sidebar_position: 2210
title: 221 - RxSourceGenerator
description: Generates RX Extensions for events
slug: /RxSourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveRX.mdx';

# RxSourceGenerator  by Ivan Zalutskii


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RxSourceGenerator?label=RxSourceGenerator)](https://www.nuget.org/packages/RxSourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Zalutskii/Reactive-Extensions-event-generator?label=updated)](https://github.com/Zalutskii/Reactive-Extensions-event-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/Zalutskii/Reactive-Extensions-event-generator?style=social)

## Details

### Info
:::info

Name: **RxSourceGenerator**

This package generates extension methods in the style of Reactive Extensions.

Author: Ivan Zalutskii

NuGet: 
*https://www.nuget.org/packages/RxSourceGenerator/*   


You can find more details at https://github.com/Zalutskii/Reactive-Extensions-event-generator

Source: https://github.com/Zalutskii/Reactive-Extensions-event-generator

:::

### Author
:::note
Ivan Zalutskii 
![Alt text](https://github.com/Zalutskii.png)
:::

### Original Readme
:::note

# RxSourceGenerator
[![License](https://img.shields.io/badge/License-MIT-gree.svg)](https://github.com/Zalutskii/Reactive-Extations-Rx-event-generator/blob/master/LICENSE)
[![NuGet](https://img.shields.io/badge/NuGet-blue.svg)](https://www.nuget.org/packages/RxSourceGenerator)

# What is this?
	
This source code generator generates Reactive Extensions methods for class events.
For example, there is some class with an event:

```C#
public partial class Example
{
    public event Action<int, string, bool> ActionEvent;
}
```
If you enter the code:

```C#
Example example = new  Example();
example.RxActionEvent()
```
The generator will create a file with extension methods:
```C#
using System;
using System.Reactive.Linq;
namespace RxMethodGenerator{
    public static class RxGeneratedMethods{
        public static IObservable<(System.Int32 Item1Int32, System.String Item2String, System.Boolean Item3Boolean)> RxActionEvent(this TestConsoleApp.Example obj)
        {
            if (obj == null) throw new ArgumentNullException(nameof(obj));
            return Observable.FromEvent<System.Action<System.Int32, System.String, System.Boolean>, (System.Int32 Item1Int32, System.String Item2String, System.Boolean Item3Boolean)>(
            conversion => (obj0, obj1, obj2) => conversion((obj0, obj1, obj2)),
            h => obj.ActionEvent += h,
            h => obj.ActionEvent -= h);
        }
    }
}
```
# What does it look like in Visual Studio?
<img src="./Media/VSView.gif" />



:::

### About
:::note

Generates RX Extensions for events


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RxSourceGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="RxSourceGenerator" Version="2.0.1" />
    <PackageReference Include="System.Reactive" Version="6.0.2" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RxSourceGenerator\src\RxDemo\Program.cs" label="Program.cs" >

  This is the use of **RxSourceGenerator** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using RxDemo;
using RxMethodGenerator;

Console.WriteLine("Hello, World!");
Person p=new Person();
//p.ActionEvent+= (a,b,c)=>
//{
//    Console.WriteLine($"Into Event:{a},{b},{c}");
//};
p.RxActionEvent().Subscribe(t=>
{
    Console.WriteLine($"into rx {t.Item1Int32},{t.Item2String},{t.Item3Boolean}");
});

p.DoAction(1,"2",true);
Console.ReadLine();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RxSourceGenerator\src\RxDemo\Person.cs" label="Person.cs" >

  This is the use of **RxSourceGenerator** in *Person.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RxDemo;
public partial class Person
{
    public event Action<int, string, bool>? ActionEvent;
    public void DoAction(int a, string b, bool c)
    {
        if(ActionEvent != null)
            ActionEvent.Invoke(a, b, c);
    }

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RxSourceGenerator\src\RxDemo\obj\GX\RxSourceGenerator\RxSourceGenerator.RxIncrementalGenerator\RxExtensionsForglobal__RxDemo_Person.g.cs" label="RxExtensionsForglobal__RxDemo_Person.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
using System;
using System.Reactive;
using System.Reactive.Linq;

namespace RxMethodGenerator
{
    public static partial class RxGeneratedMethods
    {
        public static IObservable<(int Item1Int32, string Item2String, bool Item3Boolean)> RxActionEvent(this global::RxDemo.Person obj)
        {
            if (obj == null) throw new ArgumentNullException(nameof(obj));
            return Observable.FromEvent<global::System.Action<int, string, bool>, (int Item1Int32, string Item2String, bool Item3Boolean)>(
                conversion => (arg0, arg1, arg2) => conversion((arg0, arg1, arg2)),
                h => obj.ActionEvent += h,
                h => obj.ActionEvent -= h);
        }

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RxSourceGenerator\src\RxDemo\obj\GX\RxSourceGenerator\RxSourceGenerator.RxIncrementalGenerator\RxGeneratedMethods.g.cs" label="RxGeneratedMethods.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
namespace RxMethodGenerator
{
    public static partial class RxGeneratedMethods \{ }
}
```
  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RxSourceGenerator ](/sources/RxSourceGenerator.zip)

:::


### Share RxSourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRxSourceGenerator&quote=RxSourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRxSourceGenerator&text=RxSourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRxSourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRxSourceGenerator&title=RxSourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRxSourceGenerator&title=RxSourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRxSourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RxSourceGenerator

aaa
<SameCategory />

