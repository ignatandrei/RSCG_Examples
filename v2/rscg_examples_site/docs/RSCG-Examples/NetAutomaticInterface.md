---
sidebar_position: 1070
title: 107 - NetAutomaticInterface
description: GEnerating interface from class
slug: /NetAutomaticInterface
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# NetAutomaticInterface  by codecentric AG


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/AutomaticInterface?label=AutomaticInterface)](https://www.nuget.org/packages/AutomaticInterface/)
[![GitHub last commit](https://img.shields.io/github/last-commit/codecentric/net_automatic_interface?label=updated)](https://github.com/codecentric/net_automatic_interface)
![GitHub Repo stars](https://img.shields.io/github/stars/codecentric/net_automatic_interface?style=social)

## Details

### Info
:::info

Name: **NetAutomaticInterface**

Source Generator to create an Interface from a class definition

Author: codecentric AG

NuGet: 
*https://www.nuget.org/packages/AutomaticInterface/*   


You can find more details at https://github.com/codecentric/net_automatic_interface

Source: https://github.com/codecentric/net_automatic_interface

:::

### Original Readme
:::note

# Automatic Interface

A C# Source Generator to automatically create Interface from classes.

## What does it do?

Not all .NET Interfaces are created equal. Some Interfaces are lovingly handcrafted, e.g. the public interface of your .NET package which is used by your customers. Other interfaces are far from lovingly crafted, they are birthed because you need an interface for testing or for the DI container. They are often implemented only once or twice: The class itself and a mock for testing. They are noise at best and often create lots of friction. Adding a new method / field? You have to edit the interface, too!. Change parameters? Edit the interface. Add documentation? Hopefully you add it to the interface, too!

This Source Generator aims to eliminate this cost by generating an interface from the class, without you needing to do anything.
This interface will be generated on each subsequent build, eliminating the the friction.

## Example

```c#
using AutomaticInterfaceAttribute;
using System;

namespace AutomaticInterfaceExample
{
    /// <summary>
    /// Class Documentation will be copied
    /// </summary>
    [GenerateAutomaticInterface]  // you need to create an Attribute with exactly this name in your solution. You cannot reference Code from the Analyzer.
    class DemoClass: IDemoClass // You Interface will get the Name I+classname, here IDemoclass. 
    // Generics, including constraints are allowed, too. E.g. MyClass<T> where T: class
    {

        /// <summary>
        /// Property Documentation will be copied
        /// </summary>
        public string Hello { get; set; }  // included, get and set are copied to the interface when public

        public string OnlyGet { get; } // included, get and set are copied to the interface when public

        /// <summary>
        /// Method Documentation will be copied
        /// </summary>
        public string AMethod(string x, string y) // included
        {
            return BMethod(x,y);
        }

        private string BMethod(string x, string y) // ignored because not public
        {
            return x + y;
        }
		
        public string CMethod<T, T1, T2, T3, T4>(string? x, string y) // included
            where T : class
            where T1 : struct
            where T3 : DemoClass
            where T4 : IDemoClass
        {
            return "Ok";
        }

        public static string StaticProperty => "abc"; // static property, ignored

        public static string StaticMethod()  // static method, ignored
        {
            return "static" + DateTime.Now;
        }

        /// <summary>
        /// event Documentation will be copied
        /// </summary>

        public event EventHandler ShapeChanged;  // included

        private event EventHandler ShapeChanged2; // ignored because not public

        private readonly int[] arr = new int[100];

        public int this[int index] // currently ignored
        {
            get => arr[index];
            set => arr[index] = value;
        }
    }
}
```

This will create this interface:

```C#
#nullable enable
using System.CodeDom.Compiler;
using AutomaticInterfaceAttribute;
using System;

/// <summary>
/// Result of the generator
/// </summary>
namespace AutomaticInterfaceExample
{
    /// <summary>
    /// Bla bla
    /// </summary>
    [GeneratedCode("AutomaticInterface", "")]
    public partial interface IDemoClass
    {
        /// <summary>
        /// Property Documentation will be copied
        /// </summary>
        string Hello { get; set; }

        string OnlyGet { get; }

        /// <summary>
        /// Method Documentation will be copied
        /// </summary>
        string AMethod(string x, string y);

        string CMethod<T, T1, T2, T3, T4>(string? x, string y) where T : class where T1 : struct where T3 : DemoClass where T4 : IDemoClass;

        /// <summary>
        /// event Documentation will be copied
        /// </summary>
        event System.EventHandler ShapeChanged;

    }
}
#nullable restore
```

## How to use it?

1. Install the nuget: `dotnet add package AutomaticInterface`
2. Create an Attribute with the Name `[GenerateAutomaticInterface]`. You can just copy the minimal code from this Repo (see the `AutomaticInterfaceAttribute` project). It's the easiest way to get that attribute because you cannot reference any code from the analyzer package.
3. Let your class implement the interface, e.g. `SomeClass: ISomeClass`
4. Build Solution, the Interface should now be available.

Any errors? Ping me at: christiian.sauer@codecentric.de

## Troubleshooting

### How can I see the Source code?

Newer Visual Studio Versions (2019+) can see the source code directly:

![alt text](https://github.com/codecentric/net_automatic_interface/sg_example.png "Example")

Alternatively, the Source Generator generates a log file - look out for a "logs" folder somewhere in bin/debug/... OR your temp folder /logs. The exact location is also reported on Diagnosticlevel Info.

### I have an error

Please create an issue and a minimally reproducible test for the problem. 

PRs are welcome!
Please make sure that you run [CSharpier](https://csharpier.com/) on the code for formatting.

## Contributors

- Thanks to [dnf](https://dominikjeske.github.io/) for creating some great extensions. I use them partially in this Generator. Unfortunately due to problems referencing packages I cannot depend on his packages directly.
- skarllot for PRs
- Frederik91 for PRs
- definitelyokay for PRs

## Run tests

Should be simply a build and run Tests

## Changelog

### 2.1.1

- Fix bug where multiple automatic interfaces caused issues
- Better support for nullable like Task<string?>, previously only top level generic where considered

### 2.0.0

- Major rework to Incremental Source generator
- Fixed some outstanding bugs
- Removed logging, b/c not really used
- Increased coverage

### 1.6.1

 - Minor bug fixes

### 1.5.0

 - Add support nullable context

### 1.4.0

 - Add support for overloaded methods.
 - Add support for optional parameters in method `void test(string x = null)` should now work.


:::

### About
:::note

GEnerating interface from class


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **NetAutomaticInterface**
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
	  <PackageReference Include="AutomaticInterface" Version="2.1.0" OutputItemType="Analyzer" >
	    <PrivateAssets>all</PrivateAssets>
	    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
	  </PackageReference>
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NetAutomaticInterface\src\Class2Interface\Program.cs" label="Program.cs" >

  This is the use of **NetAutomaticInterface** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using Class2Interface;

Console.WriteLine("Hello, World!");
IPerson person=new Person();
person.FirstName="Andrei";
person.LastName="Ignat";
Console.WriteLine(person.FullName());
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NetAutomaticInterface\src\Class2Interface\Data.cs" label="Data.cs" >

  This is the use of **NetAutomaticInterface** in *Data.cs*

```csharp showLineNumbers 
[AttributeUsage(AttributeTargets.Class)]
public class GenerateAutomaticInterfaceAttribute : Attribute
{
    public GenerateAutomaticInterfaceAttribute(string namespaceName = "") { }
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NetAutomaticInterface\src\Class2Interface\Person.cs" label="Person.cs" >

  This is the use of **NetAutomaticInterface** in *Person.cs*

```csharp showLineNumbers 
namespace Class2Interface;
[GenerateAutomaticInterface("Class2Interface")]
internal class Person:IPerson
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Name
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
    public string FullName()=>$"{FirstName} {LastName}";
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NetAutomaticInterface\src\Class2Interface\obj\GX\AutomaticInterface\AutomaticInterface.AutomaticInterfaceGenerator\Class2Interface.IPerson.cs" label="Class2Interface.IPerson.cs" >


```csharp showLineNumbers 
//--------------------------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//--------------------------------------------------------------------------------------------------

using System.CodeDom.Compiler;

namespace Class2Interface
{
    [GeneratedCode("AutomaticInterface", "")]
    public partial interface IPerson
    {
        /// <inheritdoc />
        int ID { get; set; }
        
        /// <inheritdoc />
        string FirstName { get; set; }
        
        /// <inheritdoc />
        string LastName { get; set; }
        
        /// <inheritdoc />
        string Name { get; }
        
        /// <inheritdoc />
        string FullName();
        
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project NetAutomaticInterface ](/sources/NetAutomaticInterface.zip)

:::


### Share NetAutomaticInterface 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetAutomaticInterface&quote=NetAutomaticInterface" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetAutomaticInterface&text=NetAutomaticInterface:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetAutomaticInterface" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetAutomaticInterface&title=NetAutomaticInterface" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetAutomaticInterface&title=NetAutomaticInterface&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetAutomaticInterface" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/NetAutomaticInterface

### In the same category (Interface) - 11 other generators


#### [Biwen.AutoClassGen](/docs/Biwen.AutoClassGen)


#### [CopyCat](/docs/CopyCat)


#### [Farskeptic.AutoCompose](/docs/Farskeptic.AutoCompose)


#### [MakeInterface.Generator](/docs/MakeInterface.Generator)


#### [Matryoshki](/docs/Matryoshki)


#### [Minerals.AutoInterfaces](/docs/Minerals.AutoInterfaces)


#### [ProxyGen](/docs/ProxyGen)


#### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


#### [RSCG_CompositeProvider](/docs/RSCG_CompositeProvider)


#### [rscg_Interface_to_null_object](/docs/rscg_Interface_to_null_object)


#### [RSCG_Static](/docs/RSCG_Static)

