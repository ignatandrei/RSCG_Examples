---
sidebar_position: 590
title: 59 - SourceGenerator.Helper.CopyCode
description: Transform Code to string
slug: /SourceGenerator.Helper.CopyCode
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# SourceGenerator.Helper.CopyCode  by Patrick Kranz


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/SourceGenerator.Helper.CopyCode?label=SourceGenerator.Helper.CopyCode)](https://www.nuget.org/packages/SourceGenerator.Helper.CopyCode/)
[![GitHub last commit](https://img.shields.io/github/last-commit/LokiMidgard/SourceGenerator.Helper.CopyCode?label=updated)](https://github.com/LokiMidgard/SourceGenerator.Helper.CopyCode)
![GitHub Repo stars](https://img.shields.io/github/stars/LokiMidgard/SourceGenerator.Helper.CopyCode?style=social)

## Details

### Info
:::info

Name: **SourceGenerator.Helper.CopyCode**

This Generator is intendede to generate text that a source generator can use to emit source to its generation. (See ReadMe)

Author: Patrick Kranz

NuGet: 
*https://www.nuget.org/packages/SourceGenerator.Helper.CopyCode/*   


You can find more details at https://github.com/LokiMidgard/SourceGenerator.Helper.CopyCode

Source : https://github.com/LokiMidgard/SourceGenerator.Helper.CopyCode

:::

### Original Readme
:::note

[![NuGet](https://img.shields.io/nuget/v/SourceGenerator.Helper.CopyCode.svg?style=flat-square)](https://www.nuget.org/packages/SourceGenerator.Helper.CopyCode/)
[![GitHub license](https://img.shields.io/github/license/LokiMidgard/SourceGenerator.Helper.CopyCode.svg?style=flat-square)](https://tldrlegal.com/license/mit-license#summary)

# SourceGenerator.Helper.CopyCode

This Generator is intendede to generate text that a source generator can use to emit source to its generation.

E.g. Instead of writing a String that contains the definiton of an Attribute (without syntax highlighting and checking).
You can generate the attribute normaly in Code and anotate it wit `[SourceGenerator.Helper.CopyCode.Copy]`.
Attributes defined on that Type will also be copied, if they are defined below the `[SourceGenerator.Helper.CopyCode.Copy]`-Attribute.

Assume you have the following attribute:

```c#

namespace SourceGenerator.Helper.CopyCode.Example;

[SourceGenerator.Helper.CopyCode.Copy]
[System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
internal sealed class MyGeneratorAttribute : Attribute {

}
```

then the generator will generate: 
```c#
// <auto-generated/>
#nullable enable
namespace SourceGenerator.Helper.CopyCode;
internal  static partial class Copy {
    public const string SourceGeneratorHelperCopyCodeExampleMyGeneratorAttribute = """
        // <auto-generated/>
        #nullable enable
        
        namespace SourceGenerator.Helper.CopyCode.Example;
        [System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
        internal sealed class MyGeneratorAttribute : Attribute
        {
        }
        """;
}
```

And your Generator can emit it:
```c#
[Generator(LanguageNames.CSharp)]
public class MyGenerator : IIncrementalGenerator {
    public void Initialize(IncrementalGeneratorInitializationContext context) {
        context.RegisterPostInitializationOutput(context => context.AddSource("attribute.g.cs", SourceGenerator.Helper.CopyCode.Copy.SourceGeneratorHelperCopyCodeExampleMyGeneratorAttribute ));
        // The rest of your generator�
    }
}
```

:::

### About
:::note

Transform Code to string


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SourceGenerator.Helper.CopyCode**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="SourceGenerator.Helper.CopyCode" Version="0.0.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SourceGenerator.Helper.CopyCode\src\Demo\Program.cs" label="Program.cs" >

  This is the use of **SourceGenerator.Helper.CopyCode** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(SourceGenerator.Helper.CopyCode.Copy.SourceGenerator_Helper_CopyCodeDemoNumberAttribute);
Console.WriteLine(SourceGenerator.Helper.CopyCode.Copy.SourceGenerator_Helper_CopyCodeDemoPerson);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SourceGenerator.Helper.CopyCode\src\Demo\Person.cs" label="Person.cs" >

  This is the use of **SourceGenerator.Helper.CopyCode** in *Person.cs*

```csharp showLineNumbers 

namespace SourceGenerator_Helper_CopyCodeDemo;
[SourceGenerator.Helper.CopyCode.Copy]
[System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
internal sealed class NumberAttribute : Attribute
{
    public int ID;
}

[SourceGenerator.Helper.CopyCode.Copy]
internal class Person
{
    public int Id { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SourceGenerator.Helper.CopyCode\src\Demo\obj\GX\SourceGenerator.Helper.CopyCode\SourceGenerator.Helper.CopyCode.CopyGenerator\CopyAttribute.g.cs" label="CopyAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

namespace SourceGenerator.Helper.CopyCode
{
	[global::System.CodeDom.Compiler.GeneratedCodeAttribute("SourceGenerator.Helper.CopyCode", "0.0.1.0")]
	[global::System.AttributeUsage(global::System.AttributeTargets.Enum | global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct | global::System.AttributeTargets.Interface, AllowMultiple = false)]
	internal sealed class CopyAttribute : global::System.Attribute
	{
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SourceGenerator.Helper.CopyCode\src\Demo\obj\GX\SourceGenerator.Helper.CopyCode\SourceGenerator.Helper.CopyCode.CopyGenerator\SourceGenerator_Helper_CopyCodeDemo.NumberAttribute.Copy.g.cs" label="SourceGenerator_Helper_CopyCodeDemo.NumberAttribute.Copy.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace SourceGenerator.Helper.CopyCode;
internal  static partial class Copy {
    public const string SourceGenerator_Helper_CopyCodeDemoNumberAttribute = """
        // <auto-generated/>
        #nullable enable
        
        namespace SourceGenerator_Helper_CopyCodeDemo;
        [System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
        internal sealed class NumberAttribute : Attribute
        {
            public int ID;
        }
        """;
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SourceGenerator.Helper.CopyCode\src\Demo\obj\GX\SourceGenerator.Helper.CopyCode\SourceGenerator.Helper.CopyCode.CopyGenerator\SourceGenerator_Helper_CopyCodeDemo.Person.Copy.g.cs" label="SourceGenerator_Helper_CopyCodeDemo.Person.Copy.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
namespace SourceGenerator.Helper.CopyCode;
internal  static partial class Copy {
    public const string SourceGenerator_Helper_CopyCodeDemoPerson = """
        // <auto-generated/>
        #nullable enable
        
        namespace SourceGenerator_Helper_CopyCodeDemo;
        internal class Person
        {
            public int Id { get; set; }
        }
        """;
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project SourceGenerator.Helper.CopyCode ](/sources/SourceGenerator.Helper.CopyCode.zip)

:::


### Share SourceGenerator.Helper.CopyCode 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSourceGenerator.Helper.CopyCode&quote=SourceGenerator.Helper.CopyCode" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSourceGenerator.Helper.CopyCode&text=SourceGenerator.Helper.CopyCode:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSourceGenerator.Helper.CopyCode" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSourceGenerator.Helper.CopyCode&title=SourceGenerator.Helper.CopyCode" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSourceGenerator.Helper.CopyCode&title=SourceGenerator.Helper.CopyCode&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSourceGenerator.Helper.CopyCode" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SourceGenerator.Helper.CopyCode

### In the same category (CodeToString) - 2 other generators


#### [CodeAnalysis](/docs/CodeAnalysis)


#### [RossLean.StringificationGenerator](/docs/RossLean.StringificationGenerator)

