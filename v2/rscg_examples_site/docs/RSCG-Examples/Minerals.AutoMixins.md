---
sidebar_position: 1400
title: 140 - Minerals.AutoMixins
description: Generate Mixin from another classes
slug: /Minerals.AutoMixins
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Minerals.AutoMixins  by Szymon Halucha


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Minerals.AutoMixins?label=Minerals.AutoMixins)](https://www.nuget.org/packages/Minerals.AutoMixins/)
[![GitHub last commit](https://img.shields.io/github/last-commit/SzymonHalucha/Minerals.AutoMixins?label=updated)](https://github.com/SzymonHalucha/Minerals.AutoMixins)
![GitHub Repo stars](https://img.shields.io/github/stars/SzymonHalucha/Minerals.AutoMixins?style=social)

## Details

### Info
:::info

Name: **Minerals.AutoMixins**

Package for automatic mixin design pattern generation using incremental generator

Author: Szymon Halucha

NuGet: 
*https://www.nuget.org/packages/Minerals.AutoMixins/*   


You can find more details at https://github.com/SzymonHalucha/Minerals.AutoMixins

Source : https://github.com/SzymonHalucha/Minerals.AutoMixins

:::

### Original Readme
:::note

# Minerals.AutoMixins

![GitHub License](https://img.shields.io/github/license/SzymonHalucha/Minerals.AutoMixins?style=for-the-badge)
![NuGet Version](https://img.shields.io/nuget/v/Minerals.AutoMixins?style=for-the-badge)
![NuGet Downloads](https://img.shields.io/nuget/dt/Minerals.AutoMixins?style=for-the-badge)

[Package on nuget.org](https://www.nuget.org/packages/Minerals.AutoMixins/)

This NuGet package provides a capability to automatically generate a [mix-in](https://en.wikipedia.org/wiki/Mixin) design pattern for C# classes by using only one attribute. This allows you to easily extend the functionality of existing classes.

## Funkcje

- **Easy mix-in definition:** Mix-in object are defined by using the ```[GenerateMixin]``` attribute.
- **Easy addition of mix-ins to a class:** To add a mix-in object to a class, use the ```[AddMixin(typeof(ExampleMixinClass))]``` attribute.
- **Optimized code generation:** The package uses an incremental source generator, so it doesn't significantly slow down the compilation process.
- **Compatibility with .NET Standard 2.0 and C# 7.3+:** Works on a wide range of platforms and development environments.

## Installation

Add the Minerals.AutoMixins nuget package to your C# project using the following methods:

### 1. Project file definition

```xml
<PackageReference Include="Minerals.AutoMixins" Version="0.2.1" />
```

### 2. dotnet command

```bat
dotnet add package Minerals.AutoMixins
```

## Why choose this package instead of the Default Interface Implementation?

Because the C# language option called "Default Interface Implementation", has limited runtime platform support. The Minerals.AutoMixins package is compatible with ```netstandard2.0``` and C# language version 7.3+.

## Usage

To define a mix-in object, add the ```[GenerateMixin]``` attribute to the selected class.

### Defining mix-in objects

```csharp
namespace Examples
{
    [Minerals.AutoMixins.GenerateMixin]
    public class ExampleMixin1
    {
        public float Property1 { get; set; } = 0.5f;

        private int _field1 = 0;

        private void Method1()
        {
            Console.WriteLine("Test1");
        }
    }

    [Minerals.AutoMixins.GenerateMixin]
    public class ExampleMixin2
    {
        public string PropertyText1 { get; set; } = "Test2";
    }
}
```

### Using mix-in objects

To use the selected mix-in object, add the ```[AddMixin(typeof(ExampleMixin1))]``` attribute to the selected class. The class implementing the **AddMixin** attribute must have the **partial** modifier to work properly.

```csharp
namespace Examples
{
    [Minerals.AutoMixins.AddMixin(typeof(ExampleMixin1))]
    public partial class ExampleClass
    {
        public int MyProperty { get; set; } = 3;
    }
}
```

The code above will generate an ```ExampleClass.g.cs``` file with a partial class ```ExampleClass```.

```csharp
namespace Examples
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public partial class ExampleClass
    {
        // MixinType: ExampleMixin1
        public float Property1 { get; set; } = 0.5f;
        private int _field1 = 0;
        private void Method1()
        {
            Console.WriteLine("Test1");
        }
    }
}
```

### Multiple mix-ins

This package allows you to add multiple mix-in objects to a single class through attribute arguments ```[AddMixin(typeof(ExampleMixin1), typeof(ExampleMixin2))]```.

```csharp
namespace Examples
{
    [Minerals.AutoMixins.AddMixin(typeof(ExampleMixin1), typeof(ExampleMixin2))]
    public partial class ExampleClass
    {
        public int MyProperty { get; set; } = 3;

        public void MyMethod()
        {

        }
    }
}
```

The code above will generate an ```ExampleClass.g.cs``` file with a partial class ```ExampleClass```.

```csharp
namespace Examples
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public partial class ExampleClass
    {
        // MixinType: ExampleMixin1
        public float Property1 { get; set; } = 0.5f;
        private int _field1 = 0;
        private void Method1()
        {
            Console.WriteLine("Test1");
        }
        // MixinType: ExampleMixin2
        public string PropertyText1 { get; set; } = "Test2";
        public string MethodText1()
        {
            return PropertyText1;
        }
    }
}
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [branches on this repository](https://github.com/SzymonHalucha/Minerals.AutoMixins/branches).

## Authors

- **Szymon Hałucha** - Maintainer

See also the list of [contributors](https://github.com/SzymonHalucha/Minerals.AutoMixins/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/SzymonHalucha/Minerals.AutoMixins/LICENSE) file for details.


:::

### About
:::note

Generate Mixin from another classes


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Minerals.AutoMixins**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Minerals.AutoMixins" Version="0.2.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoMixins\src\DemoMixin\Program.cs" label="Program.cs" >

  This is the use of **Minerals.AutoMixins** in *Program.cs*

```csharp showLineNumbers 
using DemoMixin;

Person person = new Person { Name = "Andrei Ignat" };
person.LogName();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoMixins\src\DemoMixin\Person.cs" label="Person.cs" >

  This is the use of **Minerals.AutoMixins** in *Person.cs*

```csharp showLineNumbers 

namespace DemoMixin;
[Minerals.AutoMixins.AddMixin(typeof(LogData))]
internal partial class Person
{
    public string Name { get; set; }
    public void LogName() => Log(Name);
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoMixins\src\DemoMixin\LogData.cs" label="LogData.cs" >

  This is the use of **Minerals.AutoMixins** in *LogData.cs*

```csharp showLineNumbers 

namespace DemoMixin;
[Minerals.AutoMixins.GenerateMixin]
internal class LogData
{
    public void Log(string data) => Console.WriteLine(data);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoMixins\src\DemoMixin\obj\GX\Minerals.AutoMixins\Minerals.AutoMixins.AddMixinGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This code was generated by a tool.
// Name: Minerals.AutoMixins
// Version: 0.2.1+6c5634e46b130effbe00bd9d3f94459f1dbb2e85
// </auto-generated>

namespace DemoMixin
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    internal partial class Person
    {
        // MixinType: LogData
        public void Log(string data) => Console.WriteLine(data);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoMixins\src\DemoMixin\obj\GX\Minerals.AutoMixins\Minerals.AutoMixins.Attributes.AddMixinAttributeGenerator\AddMixinAttribute.g.cs" label="AddMixinAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This code was generated by a tool.
// Name: Minerals.AutoMixins
// Version: 0.2.1+6c5634e46b130effbe00bd9d3f94459f1dbb2e85
// </auto-generated>
#pragma warning disable CS9113
namespace Minerals.AutoMixins
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct, AllowMultiple = false, Inherited = false)]
    public sealed class AddMixinAttribute : global::System.Attribute
    {
        public AddMixinAttribute(params global::System.Type[] mixins)
        {
        }
    }
}
#pragma warning restore CS9113
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Minerals.AutoMixins\src\DemoMixin\obj\GX\Minerals.AutoMixins\Minerals.AutoMixins.Attributes.GenerateMixinAttributeGenerator\GenerateMixinAttribute.g.cs" label="GenerateMixinAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This code was generated by a tool.
// Name: Minerals.AutoMixins
// Version: 0.2.1+6c5634e46b130effbe00bd9d3f94459f1dbb2e85
// </auto-generated>
namespace Minerals.AutoMixins
{
    [global::System.Diagnostics.DebuggerNonUserCode]
    [global::System.Runtime.CompilerServices.CompilerGenerated]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    [global::System.AttributeUsage(global::System.AttributeTargets.Class | global::System.AttributeTargets.Struct, AllowMultiple = false, Inherited = false)]
    public sealed class GenerateMixinAttribute : global::System.Attribute
    {
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Minerals.AutoMixins ](/sources/Minerals.AutoMixins.zip)

:::


### Share Minerals.AutoMixins 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoMixins&quote=Minerals.AutoMixins" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoMixins&text=Minerals.AutoMixins:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoMixins" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoMixins&title=Minerals.AutoMixins" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoMixins&title=Minerals.AutoMixins&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinerals.AutoMixins" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Minerals.AutoMixins

### In the same category (Templating) - 7 other generators


#### [Gobie](/docs/Gobie)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [RazorBlade](/docs/RazorBlade)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

