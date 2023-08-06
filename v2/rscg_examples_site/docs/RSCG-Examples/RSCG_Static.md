---
sidebar_position: 80
title: 08 - RSCG_Static
description: Generate interfaces and classes from static classes
slug: /RSCG_Static
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_Static  by Andrei Ignat


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/RSCG_Static?label=RSCG_Static)](https://www.nuget.org/packages/RSCG_Static/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_Static?label=updated)](https://github.com/ignatandrei/RSCG_Static)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_Static?style=social)

## Details

### Info
:::info

Name: **RSCG_Static**

This package make you an interface and  record from static properties / methods

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_Static/*   


You can find more details at https://github.com/ignatandrei/RSCG_Static

Source : https://github.com/ignatandrei/RSCG_Static

:::

### Original Readme
:::note

# RSCG_Static

Roslyn Source Code Generator - transform static classes into instances and interfaces 

More, there is a MakeNew static method created to can have DI.

Just put a function like this ( example for System.DateTime)
```csharp
        public Type GenerateInterfaceFromDate()=>typeof(DateTime);
```


and the properties of the classes will be generated into interfaces and you can write:

```csharp
//for DI, register
//ISystem_DateTime  with transient for new clsSystem_DateTime()
Console.WriteLine("Hello World!");
ISystem_DateTime dateStatic = recSystem_DateTime.MakeNew();//static
ISystem_DateTime dateVar = new clsSystem_DateTime(); //variable = real 

Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
await Task.Delay(10 * 1000);
Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
```


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)


:::

### About
:::note

Generate interfaces and classes from static classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_Static**
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
		<PackageReference Include="RSCG_Static" Version="2023.5.19.2037" />
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Static\src\RSCG_StaticDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_Static** in *Program.cs*

```csharp showLineNumbers 
using RSCG_StaticDemo;
//for DI, register
//ISystem_DateTime  with transient for new clsSystem_DateTime()
Console.WriteLine("Hello World!");
ISystem_DateTime dateStatic = recSystem_DateTime.MakeNew();//static
ISystem_DateTime dateVar = new clsSystem_DateTime(); //variable = real 

Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
await Task.Delay(10 * 1000);
Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Static\src\RSCG_StaticDemo\StaticToInterface.cs" label="StaticToInterface.cs" >

  This is the use of **RSCG_Static** in *StaticToInterface.cs*

```csharp showLineNumbers 
namespace RSCG_StaticDemo;

public partial class StaticToInterface
{
    public Type GenerateInterfaceFromDate() => typeof(DateTime);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\RSCG_Static\src\RSCG_StaticDemo\obj\GX\RSCG_Static\RSCG_Static.GenerateFromStaticIncremental\GenerateInterfaceFromDate.cs" label="GenerateInterfaceFromDate.cs" >


```csharp showLineNumbers 

#nullable enable
 namespace RSCG_StaticDemo {
      public interface ISystem_DateTime {
          public System.DateTime Now  {get;}
          public System.DateTime Today  {get;}
          public System.DateTime UtcNow  {get;}
      }// interface
//now the partial class
      public record recSystem_DateTime (System.DateTime Now,System.DateTime Today,System.DateTime UtcNow) : ISystem_DateTime
      { 
            public static recSystem_DateTime MakeNew() {
            return new recSystem_DateTime(System.DateTime.Now,System.DateTime.Today,System.DateTime.UtcNow);
            } //end makenew
      } //end record
      public class clsSystem_DateTime : ISystem_DateTime 
      { 
            public System.DateTime Now  {get { return System.DateTime.Now; } }
            public System.DateTime Today  {get { return System.DateTime.Today; } }
            public System.DateTime UtcNow  {get { return System.DateTime.UtcNow; } }
       } //end class
 } // namespace
#nullable disable
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RSCG_Static ](/sources/RSCG_Static.zip)

:::


### Share RSCG_Static 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&quote=RSCG_Static" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&text=RSCG_Static:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&title=RSCG_Static" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static&title=RSCG_Static&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_Static" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_Static
