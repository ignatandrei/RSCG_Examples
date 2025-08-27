---
sidebar_position: 1230
title: 123 - CodeAnalysis
description: Code to string literal. Unfortunately, it carries also some other CodeAnalysis generated files, which are not so useful.
slug: /CodeAnalysis
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveCodeToString.mdx';

# CodeAnalysis  by Feast


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Feast.CodeAnalysis.Literal?label=Feast.CodeAnalysis.Literal)](https://www.nuget.org/packages/Feast.CodeAnalysis.Literal/)
[![GitHub last commit](https://img.shields.io/github/last-commit/feast107/CodeAnalysis?label=updated)](https://github.com/feast107/CodeAnalysis)
![GitHub Repo stars](https://img.shields.io/github/stars/feast107/CodeAnalysis?style=social)

## Details

### Info
:::info

Name: **CodeAnalysis**

Auto generate extensions for Microsoft.CodeAnalysis

Author: Feast

NuGet: 
*https://www.nuget.org/packages/Feast.CodeAnalysis.Literal/*   


You can find more details at https://github.com/feast107/CodeAnalysis

Source: https://github.com/feast107/CodeAnalysis

:::

### Original Readme
:::note

# CodeAnalysis
自动生成提供给 `SourceGenerator` 的扩展

## Requires

+ [PolySharp](https://github.com/Sergio0694/PolySharp)

## Supports

+ `[Literal]`
    
    Auto generate full qualified string literal for target class
    
    if you have a class like
    ```csharp
    [Literal("Your.Program.Class")]
    public class Test
    {
        public IEnumerable<string> Name { get; set; }
    }
    ```
    Then it will generate a class like

    ```csharp
    namespace Your.Program{
        public class Class{
            public static string Text = """
    public class Test
    {
        public global::System.Collection.Generic.IEnumerable<string> Name { get; set; }
    }
    """;
        }
    }
    ```

+ `Feast.CompileTime`
    ```csharp
    class Assembly : System.Reflection.Assembly;
    class Module : System.Reflection.Module;
    class Type : System.Type;
    class MemberInfo : System.Reflection.MemberInfo;
    class MethodInfo : System.Reflection.MethodInfo;
    class EventInfo : System.Reflection.EventInfo;
    class FieldInfo : System.Reflection.FieldInfo;
    class PropertyInfo : System.Reflection.PropertyInfo;
    class ParameterInfo : System.Reflection.ParameterInfo;
    class ConstructorInfo : System.Reflection.ConstructorInfo;
    ```

## Comment

我们需要 `源代码生成器`

因为我们需要生成更多的代码

我们需要 `源代码生成器` 的 `源代码生成器`

因为 `源代码生成器` 现在还不够强大

我们需要 `源代码生成器` 的 `源代码生成器` 的 `源代码生成器`

因为 `源代码生成器` 的 `源代码生成器` 现在还不能自举

由此可见

道生一，一生二，二生三，三生万物

总结

玩源生玩的。

:::

### About
:::note

Code to string literal. Unfortunately, it carries also some other CodeAnalysis generated files, which are not so useful.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **CodeAnalysis**
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
	  <PackageReference Include="Feast.CodeAnalysis.Literal" Version="0.1.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\Program.cs" label="Program.cs" >

  This is the use of **CodeAnalysis** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(Namespace_Andrei.Class_Ignat.Text);
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.LiteralGenerator\Feast.CodeAnalysis.Generators.LiteralGenerator.LiteralGenerator\LiteralAttribute.g.cs" label="LiteralAttribute.g.cs" >


```csharp showLineNumbers 
#nullable enable
using System;
namespace System
{
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct | global::System.AttributeTargets.Interface | global::System.AttributeTargets.Enum | global::System.AttributeTargets.Delegate)]
    public class LiteralAttribute : Attribute
    {
        public string? FieldName { get; set; }
    
        public LiteralAttribute(string belongToFullyQualifiedClassName){ }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\CodeAnalysis\src\DemoLit\obj\GX\Feast.CodeAnalysis.LiteralGenerator\Feast.CodeAnalysis.Generators.LiteralGenerator.LiteralGenerator\Namespace_Andrei.Class_Ignat.g.cs" label="Namespace_Andrei.Class_Ignat.g.cs" >


```csharp showLineNumbers 
// <auto-generated/> By Feast.CodeAnalysis
#pragma warning disable
#nullable enable
namespace Namespace_Andrei
{
    partial class Class_Ignat
    {
        internal static string Text = """
namespace DemoLit
{
    internal class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
""".Replace("\"^\"\"", "\"\"\"");
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project CodeAnalysis ](/sources/CodeAnalysis.zip)

:::


### Share CodeAnalysis 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&quote=CodeAnalysis" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&text=CodeAnalysis:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&title=CodeAnalysis" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis&title=CodeAnalysis&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FCodeAnalysis" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/CodeAnalysis

aaa
<SameCategory />

