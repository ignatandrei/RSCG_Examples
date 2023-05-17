---
sidebar_position: 170
title: RSCG - ApparatusAOT
description: This will generate code for investigating at runtime the properties of an object
slug: /ApparatusAOT
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ApparatusAOT  by Stanislav Silin

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/Apparatus.AOT.Reflection?label=Apparatus.AOT.Reflection)](https://www.nuget.org/packages/Apparatus.AOT.Reflection/)
[![GitHub last commit](https://img.shields.io/github/last-commit/byme8/Apparatus.AOT.Reflection?label=updated)](https://github.com/byme8/Apparatus.AOT.Reflection)
![GitHub Repo stars](https://img.shields.io/github/stars/byme8/Apparatus.AOT.Reflection?style=social)

## Details

### Info
:::info

Name: **ApparatusAOT**

Author: Stanislav Silin

NuGet: 
*https://www.nuget.org/packages/Apparatus.AOT.Reflection/*   


You can find more details at https://github.com/byme8/Apparatus.AOT.Reflection

Source : https://github.com/byme8/Apparatus.AOT.Reflection
:::

### About
:::note

This will generate code for investigating at runtime the properties of an object


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ApparatusAOT**
```xml
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Apparatus.AOT.Reflection" Version="0.2.0" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="" label="Program.cs" >

  This is the use of **ApparatusAOT** in *Program.cs*

```csharp
using Apparatus.AOT.Reflection;
using ApparatusDemo;
using System;

Person p1 = new();
p1.FirstName = "Andrei1";
p1.LastName = "Ignat1";

Person p2 = new ();
p2.FirstName = "Andrei2";
p2.LastName = "Ignat2";

var prop =p1.GetProperties().Values;
foreach (var item in prop)
{
    Console.WriteLine($"{item.Name} Attr: {item.Attributes.Length} value {item.Name}");
    if (item.TryGetValue(p1, out var val))
    {
        Console.WriteLine("value : " + val);
    }

}
foreach (var item in prop)
{
    Console.WriteLine($"{item.Name} Attr: {item.Attributes.Length} value {item.Name}");
    if (item.TryGetValue(p2, out var val))
    {
        Console.WriteLine("value : " + val);
    }

}

```
  </TabItem>

  <TabItem value="" label="Person.cs" >

  This is the use of **ApparatusAOT** in *Person.cs*

```csharp
using System.ComponentModel.DataAnnotations;
namespace ApparatusDemo;
class Person
{
    [Required]
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="" label="ApparatusDemo_PersonExtensions.cs" >


```csharp

using System;
using System.Linq;

namespace Apparatus.AOT.Reflection
{
    public static class ApparatusDemo_PersonExtensions
    {
        [global::System.Runtime.CompilerServices.ModuleInitializer]
        public static void Bootstrap()
        {
            MetadataStore<global::ApparatusDemo.Person>.Data = _lazy;
        }

        private static global::System.Lazy<global::System.Collections.Generic.IReadOnlyDictionary<string, IPropertyInfo>> _lazy = new global::System.Lazy<global::System.Collections.Generic.IReadOnlyDictionary<string, IPropertyInfo>>(new global::System.Collections.Generic.Dictionary<string, IPropertyInfo>
        {
            { "FirstName", new global::Apparatus.AOT.Reflection.PropertyInfo<global::ApparatusDemo.Person,string>(
                        "FirstName", 
                        new global::System.Attribute[] 
                        {
                            new global::System.ComponentModel.DataAnnotations.RequiredAttribute(),
                        }, 
                        instance => instance.FirstName, (instance, value) => instance.FirstName = value)
                },
            { "LastName", new global::Apparatus.AOT.Reflection.PropertyInfo<global::ApparatusDemo.Person,string>(
                        "LastName", 
                        new global::System.Attribute[] 
                        {
                            
                        }, 
                        instance => instance.LastName, (instance, value) => instance.LastName = value)
                },
        }); 


        internal static global::System.Collections.Generic.IReadOnlyDictionary<string, IPropertyInfo> GetProperties(this global::ApparatusDemo.Person value)
        {
            return _lazy.Value;
        }   
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example
:::tip

[Download Example ApparatusAOT ](/sources/ApparatusAOT.zip)

:::

### Download PDF

[Download PDF ApparatusAOT ](/pdfs/ApparatusAOT.pdf)

### Share ApparatusAOT 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FApparatusAOT&quote=ApparatusAOT" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FApparatusAOT&text=ApparatusAOT:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FApparatusAOT" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FApparatusAOT&title=ApparatusAOT" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FApparatusAOT&title=ApparatusAOT&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FApparatusAOT" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ApparatusAOT
