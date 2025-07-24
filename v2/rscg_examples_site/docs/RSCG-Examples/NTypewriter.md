---
sidebar_position: 1830
title: 183 - NTypewriter
description: Generating code with a template from classes in project
slug: /NTypewriter
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# NTypewriter  by NeVeSpl


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/NTypewriter.SourceGenerator?label=NTypewriter.SourceGenerator)](https://www.nuget.org/packages/NTypewriter.SourceGenerator)
[![GitHub last commit](https://img.shields.io/github/last-commit/NeVeSpl/NTypewriter?label=updated)](https://github.com/NeVeSpl/NTypewriter)
![GitHub Repo stars](https://img.shields.io/github/stars/NeVeSpl/NTypewriter?style=social)

## Details

### Info
:::info

Name: **NTypewriter**

Package Description

Author: NeVeSpl

NuGet: 
*https://www.nuget.org/packages/NTypewriter.SourceGenerator*   


You can find more details at https://github.com/NeVeSpl/NTypewriter

Source : https://github.com/NeVeSpl/NTypewriter

:::

### Original Readme
:::note

# NTypewriter

[![ci](https://github.com/NeVeSpl/NTypewriter/actions/workflows/CI.yml/badge.svg)](https://github.com/NeVeSpl/NTypewriter/actions/workflows/CI.yml)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/NeVeS.NTypewriterEditorForVisualStudio?color=%230429FF&label=NTypewriter%20editor)](https://marketplace.visualstudio.com/items?itemName=NeVeS.NTypewriterEditorForVisualStudio)
[![Nuget](https://img.shields.io/nuget/v/NTypewriter.SourceGenerator?color=%23004880&label=NTypewriter.SourceGenerator)](https://www.nuget.org/packages/NTypewriter.SourceGenerator)
[![Nuget](https://img.shields.io/nuget/v/NTypewriter?color=%23004880&label=NTypewriter%20nugets)](https://www.nuget.org/packages?q=NTypewriter)

![NTypewriter LivePreview](https://github.com/NeVeSpl/NTypewriter/Documentation/LivePreview.gif)

<h3 align="center">
Scriban templates + Roslyn C# code model => generated files
</h3>
<h4 align="center">
design/compile/run time == any time
</h4>

<ins>For those who do not know Typewriter</ins>:

NTypewriter is files generator from text templates populated with meta-data about your C# code. It is like a specialized and more convenient T4 design-time template.

With NTypewriter you can:
- auto-generate documentation for your C# code
- create a typed TypeScript API client for your ASP.net web API

NTypewriter comes in many flavours, that can be used according to your needs:
- [NTypewriter editor for Visual Studio](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#NTypewriter-editor-for-Visual-Studio) - extension for Visual Studio that adds support for editing *.nt templates, with syntax highlighting, code completion, live preview, design time rendering, [available on vs marketplace](https://marketplace.visualstudio.com/items?itemName=NeVeS.NTypewriterEditorForVisualStudio)   
- [NTypewriter.SourceGenerator](https://github.com/NeVeSpl/NTypewriter/Documentation/SourceGenerator.md#NTypewriterSourceGenerator) - nuget, Roslyn source generator that renders *.nt templates during compilation, since it is a compiler extension, it can be used with any IDE or CI/pipeline that supports source generators
- [NTypewriter.Online](https://nevespl.github.io/NTypewriter/) - blazor client side, online demo of NTypewriter capabilities
- NTypewriter - nuget, library that enables you to create run time solution which will be able to render *.nt templates, for example: [your own CLI](https://github.com/NeVeSpl/NTypewriter/Documentation/NTypewriter.md#Build-your-own-CLI)
- NTypewriter.CodeModel.Roslyn - nuget, library that exposes C# code model from an instance of `Microsoft.CodeAnalysis.Compilation`, useful if you would like to use a different template engine  

more about NTypewriter architecture and all extension points that can be used, you will find [here](https://github.com/NeVeSpl/NTypewriter/Documentation/Architecture.md#NTypewriter-architecture)


<ins>For those who know Typewriter</ins>:

NTypewriter is a younger and more immature brother of beloved [Typewriter](https://github.com/frhagn/Typewriter). They share the same ideas but with a completely different implementation. NTypwriter uses [Scriban](https://github.com/scriban/scriban) as a template engine, thus template files are completely not interchangeable. While code model API is about 95% compatible between them, there are some differences. NTypewriter code model is 100% pure, without any amenities that help generate TS files. All things that help  generate TypeScript from ASP.NET are located in built-in functions: [Action](https://github.com/NeVeSpl/NTypewriter/Documentation/BuiltInFunctions.md#actionfunctions), [Type](https://github.com/NeVeSpl/NTypewriter/Documentation/BuiltInFunctions.md#typefunctions).

Oh, did I forget to mention that NTypewriter also solves most of the awaited issues of the Typewriter that were promised for 2.0 version:
- support for attribute properties/values, statics, indexers, default parameters, nullable, records, constructors
- output multiple types to a single file
- include types in CodeModel from referenced assemblies/nugets
- save generated file only when file content has changed
- sharable custom functions between templates
- full control over whitespaces
- compile-time rendering, without any IDE needed
- built-in support for getting all types used in type declaration ([Type.AllReferencedTypes](https://github.com/NeVeSpl/NTypewriter/Documentation/BuiltInFunctions.md#allreferencedtypes))
- you can debug custom functions

 
### Index

* [Typewriter vs NTypewriter](#Typewriter-vs-NTypewriter)
* [Examples: *.nt templates](#Examples)
* Getting started
   * [NTypewriter editor for Visual Studio](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Getting-started)
       * [Install](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Install)
       * [CodeModel](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#CodeModel)
       * [Capture](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Capture)       
       * [Save](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Save)
       * [Run](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Run)
       * [When something goes wrong](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Error)
   * [NTypewriter.SourceGenerator](https://github.com/NeVeSpl/NTypewriter/Documentation/SourceGenerator.md)
   * [Build your own CLI](https://github.com/NeVeSpl/NTypewriter/Documentation/NTypewriter.md#Build-your-own-CLI)
* Documentation
   * [Template language](https://github.com/scriban/scriban/blob/master/doc/language.md)
   * [Code model](https://github.com/NeVeSpl/NTypewriter/Documentation/CodeModel.md)
   * [Built-in functions](https://github.com/NeVeSpl/NTypewriter/Documentation/BuiltInFunctions.md)   
   * [Name vs BareName vs FullName](https://github.com/NeVeSpl/NTypewriter/Documentation/NameVariants.md)
   * Custom Functions
       * [Nugets](https://github.com/NeVeSpl/NTypewriter/Documentation/CustomFunctions.md#Nugets)
       * [Custom functions](https://github.com/NeVeSpl/NTypewriter/Documentation/CustomFunctions.md#Custom-functions)  
       * [How to debug](https://github.com/NeVeSpl/NTypewriter/Documentation/CustomFunctions.md#How-to-debug)
   * Configuration
       * [Nugets](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#Nugets)
       * [Local vs Global configuration](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#local-vs-global-configuration)       
       * Options    
           * [AddGeneratedFilesToVSProject](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#AddGeneratedFilesToVSProject)
           * [NamespacesToBeSearched](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#NamespacesToBeSearched)
           * [ProjectsToBeSearched](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#ProjectsToBeSearched)  
           * [SearchInReferencedProjectsAndAssemblies](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#SearchInReferencedProjectsAndAssemblies)   
           * [RenderWhenTemplateIsSaved](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#renderwhentemplateissaved)
           * [RenderWhenProjectBuildIsDone](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#RenderWhenProjectBuildIsDone)
   * [Visual Studio Configuration](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Configuration)
       * [Live preview](https://github.com/NeVeSpl/NTypewriter/Documentation/EditorForVisualStudio.md#Live-preview)
        
* [Known issues](#Known-issues)


## Typewriter vs NTypewriter

&nbsp;| Typewriter | NTypewriter
----------|------------ | -------------
Template file extension | *.tst | *.nt
Syntax   | typewriter syntax | [scriban scripting language](https://github.com/scriban/scriban/blob/master/doc/language.md)
Lambda filters | present | yes
Can be used from CLI | no | yes 
Can be used in pipeline  | no | yes 
Full control over whitespaces | nope | [yup](https://github.com/scriban/scriban/blob/master/doc/language.md#14-whitespace-control)
Mapping | one input always produces one output file | you can generate as many files as you want
Live preview | no | yes
**Code model** | 
Unit of work | file | there is no concept of a file in NTypewriter, you work on compiled symbols
Access modifiers | code model contains only public types | code model contains all types 
Partial classes | treated as separate units | all parts of the class are treated as a whole unit
**Automation** | 
Auto-render template on save| yes (opt-out is possible)| [yes (opt-in is possible)](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#renderwhentemplateissaved)
Auto-render when C# file changes| yes (opt-out is possible)| no
Auto-render on build | no | [yes (opt-in is possible)](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#RenderWhenProjectBuildIsDone)
**Custom functions** | 
Placement|inside template file (.tst)| in separate file (*.nt.cs)|
Can be shared|separate for every template| shared between templates inside a project |
Can be debug|no| [yes](https://github.com/NeVeSpl/NTypewriter/Documentation/CustomFunctions.md#How-to-debug) |
Can be unit tested | no | yes
**VS Integration** |
Supported versions of Visual Studio | 2015, 2017, 2019 | 2019 ([min ver 16.11.x](https://github.com/NeVeSpl/NTypewriter/issues/55)), 2022
Add generated files to VS project | yes (opt-out is possible) | [yes (opt-out is possible)](https://github.com/NeVeSpl/NTypewriter/Documentation/Configuration.md#addgeneratedfilestovsproject)
Sync deleted or renamed C# types with generated files | there is a part of the code that should do that  but it does not work anymore | yes (only when the above option is enabled)



Typewriter template:
```
module App { $Classes(*Model)[
    export class $Name { $Properties[
        public $name: $Type;]
    }]
}
```
equivalent NTypewriter template will be: ([open in NTypewriter.Online](https://nevespl.github.io/NTypewriter?exampleId=type01))
```
{{- for class in data.Classes | Symbols.WhereNameEndsWith "Model"
        capture output -}}
module App {
    export class {{ class.Name }} {
            {{- for property in class.Properties | Symbols.ThatArePublic }}
        public {{ property.Name | String.ToCamelCase }}: {{ property.Type | Type.ToTypeScriptType }};
            {{- end }}
    }
}
    {{- end 
        filePath =  class.BareName | String.Append ".ts"
        Save output filePath
    end }}
```
 
yes, it is more verbose, but maintaining it over time will be much easier. Both templates generate exactly the same output:
```ts
module App {
    export class CustomerModel {
        public id: number;
        public name: string;
        public orders: OrderModel[];
    }
}
```

## Examples

All [Typewriter examples](https://frhagn.github.io/Typewriter/pages/examples.html) are  available as .nt templates on github and also on NTypewriter.Online website. 
> **Note**
 > nt. templates produce exactly the same output as .tst templates, even bad output formatting was preserved, to make them easier to compare. 

example | NTypewriter | Typewriter | Online
--------|------------|------------|------------
CreateYourFirstTemplate | [CreateYourFirstTemplate.nt](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/CreateYourFirstTemplate/nt/CreateYourFirstTemplate.nt) | [CreateYourFirstTemplate.tst](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/CreateYourFirstTemplate/tst/CreateYourFirstTemplate.tst) | [open](https://nevespl.github.io/NTypewriter?exampleId=type01)
Extensions | [Extensions.nt](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/Extensions/nt/Extensions.nt) | [Extensions.tst](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/Extensions/tst/Extensions.tst) | [open](https://nevespl.github.io/NTypewriter?exampleId=type05)
ModelInterfaces | [ModelInterfaces.nt](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/ModelInterfaces/nt/ModelInterfaces.nt) | [ModelInterfaces.tst](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/ModelInterfaces/tst/ModelInterfaces.tst) | [open](https://nevespl.github.io/NTypewriter?exampleId=type02)
KnockoutModels | [KnockoutModels.nt](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/KnockoutModels/nt/KnockoutModels.nt) | [KnockoutModels.tst](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/KnockoutModels/tst/KnockoutModels.tst) | [open](https://nevespl.github.io/NTypewriter?exampleId=type03)
AngularWebAPIService | [AngularWebAPIService.nt](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/AngularWebAPIService/nt/AngularWebAPIService.nt) | [AngularWebAPIService.tst](https://github.com/NeVeSpl/NTypewriter.Examples/blob/master/WebApplication/Examples/AngularWebAPIService/tst/AngularWebAPIService.tst) | [open](https://nevespl.github.io/NTypewriter?exampleId=type04)

## Known issues

NTypewriter does not have own a lexer/parser as Typewriter has, and uses Scriban instead to do heavy work. Scriban works very well with fully correct templates,  but with incomplete templates during editing not so much. It is the source of the most glitches in the Editor. Scriban language is also typeless, thus doing code completion is challenging.


:::

### About
:::note

Generating code with a template from classes in project


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **NTypewriter**
```xml showLineNumbers {19}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <None Remove="test.nt" />
  </ItemGroup>

  <ItemGroup>
    <AdditionalFiles Include="test.nt" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="NTypewriter.SourceGenerator" Version="0.5.9" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NTypewriter\src\DemoTemplateConsole\Program.cs" label="Program.cs" >

  This is the use of **NTypewriter** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NTypewriter\src\DemoTemplateConsole\Person.cs" label="Person.cs" >

  This is the use of **NTypewriter** in *Person.cs*

```csharp showLineNumbers 

namespace DemoTemplateConsole;
public class PersonModel
{
    public int Name { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NTypewriter\src\DemoTemplateConsole\obj\GX\NTypewriter.SourceGenerator\NTypewriter.SourceGenerator.NTypewriterSourceGenerator\diagnostics-initialization.g.cs" label="diagnostics-initialization.g.cs" >


```csharp showLineNumbers 
// NTypewriter.SourceGenerator                      0.5.9.0  C:\Users\ignat\AppData\Local\Temp\VBCSCompiler\AnalyzerAssemblyLoader\0e6b7591c3724d53addfcceb277c5688\7\NTypewriter.SourceGenerator.dll NTypewriter.SourceGenerator, Version=0.5.9.0, Culture=neutral, PublicKeyToken=null
// NTypewriter                                      0.5.9.0  C:\Users\ignat\AppData\Local\Temp\NTSG\NTypewriter.v0.5.9.0.dll NTypewriter, Version=0.5.9.0, Culture=neutral, PublicKeyToken=686471615d7a8f08
// NTypewriter.CodeModel                            0.5.9.0  C:\Users\ignat\AppData\Local\Temp\NTSG\NTypewriter.CodeModel.v0.5.9.0.dll NTypewriter.CodeModel, Version=0.5.9.0, Culture=neutral, PublicKeyToken=9bd097c4961606db
// NTypewriter.CodeModel.Functions                  0.5.9.0  C:\Users\ignat\AppData\Local\Temp\NTSG\NTypewriter.CodeModel.Functions.v0.5.9.0.dll NTypewriter.CodeModel.Functions, Version=0.5.9.0, Culture=neutral, PublicKeyToken=64a6b4cdbb438ab5
// NTypewriter.CodeModel.Roslyn                     0.5.9.0  C:\Users\ignat\AppData\Local\Temp\NTSG\NTypewriter.CodeModel.Roslyn.v0.5.9.0.dll NTypewriter.CodeModel.Roslyn, Version=0.5.9.0, Culture=neutral, PublicKeyToken=81d8e46ee60c9c4c
// NTypewriter.Editor.Config                        0.5.9.0  C:\Users\ignat\AppData\Local\Temp\NTSG\NTypewriter.Editor.Config.v0.5.9.0.dll NTypewriter.Editor.Config, Version=0.5.9.0, Culture=neutral, PublicKeyToken=b9f8710003231974
// NTypewriter.Runtime                              0.5.9.0  C:\Users\ignat\AppData\Local\Temp\NTSG\NTypewriter.Runtime.v0.5.9.0.dll NTypewriter.Runtime, Version=0.5.9.0, Culture=neutral, PublicKeyToken=4fac57df20922078
// Scriban.Signed                                   5.0.0.0  C:\Users\ignat\AppData\Local\Temp\NTSG\Scriban.Signed.v5.10.0.0.dll Scriban.Signed, Version=5.0.0.0, Culture=neutral, PublicKeyToken=5675fb69b15f2433
// System.Text.Json                                 9.0.0.0  C:\Program Files\dotnet\shared\Microsoft.NETCore.App\9.0.7\System.Text.Json.dll System.Text.Json, Version=9.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51
// System.Text.RegularExpressions                   9.0.0.0  C:\Program Files\dotnet\shared\Microsoft.NETCore.App\9.0.7\System.Text.RegularExpressions.dll System.Text.RegularExpressions, Version=9.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a
// Microsoft.CodeAnalysis                           4.14.0.0  C:\Program Files\dotnet\sdk\9.0.302\Roslyn\bincore\Microsoft.CodeAnalysis.dll Microsoft.CodeAnalysis, Version=4.14.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// Microsoft.CodeAnalysis.CSharp                    4.14.0.0  C:\Program Files\dotnet\sdk\9.0.302\Roslyn\bincore\Microsoft.CodeAnalysis.CSharp.dll Microsoft.CodeAnalysis.CSharp, Version=4.14.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// Microsoft.CodeAnalysis.Scripting                 4.0.0.0  C:\Users\ignat\AppData\Local\Temp\NTSG\Microsoft.CodeAnalysis.Scripting.v4.0.1.0.dll Microsoft.CodeAnalysis.Scripting, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// Microsoft.CodeAnalysis.CSharp.Scripting          4.0.0.0  C:\Users\ignat\AppData\Local\Temp\NTSG\Microsoft.CodeAnalysis.CSharp.Scripting.v4.0.1.0.dll Microsoft.CodeAnalysis.CSharp.Scripting, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// Microsoft.CodeAnalysis.Workspaces                4.0.0.0  C:\Users\ignat\AppData\Local\Temp\NTSG\Microsoft.CodeAnalysis.Workspaces.v4.0.1.0.dll Microsoft.CodeAnalysis.Workspaces, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35
// CurrentDomain: VBCSCompiler
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NTypewriter\src\DemoTemplateConsole\obj\GX\NTypewriter.SourceGenerator\NTypewriter.SourceGenerator.NTypewriterSourceGenerator\diagnostics-sg-last-run.g.cs" label="diagnostics-sg-last-run.g.cs" >


```csharp showLineNumbers 
    // NTypewriter.SourceGenerator v0.5.9.0
    // total runs     : 1, total renders : 1
    // touch file     : D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\NTypewriter\src\DemoTemplateConsole\bin\Debug\net9.0\.touch
    // log file       : D:\eu\GitHub\RSCG_Examples\v2\rscg_examples\NTypewriter\src\DemoTemplateConsole\bin\Debug\net9.0\DemoTemplateConsole.ntsg.log                    
    // last build     : 7/24/2025 7:40:57 AM
    // last *.nt edit : 7/21/2025 7:28:06 AM
    // last render    : 7/24/2025 7:40:57 AM
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project NTypewriter ](/sources/NTypewriter.zip)

:::


### Share NTypewriter 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNTypewriter&quote=NTypewriter" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNTypewriter&text=NTypewriter:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNTypewriter" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNTypewriter&title=NTypewriter" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNTypewriter&title=NTypewriter&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNTypewriter" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/NTypewriter

### In the same category (Templating) - 11 other generators


#### [Gobie](/docs/Gobie)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [JKToolKit.TemplatePropertyGenerator](/docs/JKToolKit.TemplatePropertyGenerator)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [RazorBlade](/docs/RazorBlade)


#### [RazorSlices](/docs/RazorSlices)


#### [RSCG_IFormattable](/docs/RSCG_IFormattable)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

