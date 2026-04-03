---
sidebar_position: 2620
title: 262 - SvgIconGenerator
description: Generating classes from SVG icons to be used in C# projects.
slug: /SvgIconGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFilesToCode.mdx';

# SvgIconGenerator  by Matt Schneeberger


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/SvgIconGenerator?label=SvgIconGenerator)](https://www.nuget.org/packages/SvgIconGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/helluvamatt/SvgIconGenerator?label=updated)](https://github.com/helluvamatt/SvgIconGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/helluvamatt/SvgIconGenerator?style=social)

## Details

### Info
:::info

Name: **SvgIconGenerator**

SVG icon source generator

Author: Matt Schneeberger

NuGet: 
*https://www.nuget.org/packages/SvgIconGenerator/*   


You can find more details at https://github.com/helluvamatt/SvgIconGenerator

Source: https://github.com/helluvamatt/SvgIconGenerator

:::

### Author
:::note
Matt Schneeberger 
![Alt text](https://github.com/helluvamatt.png)
:::

## Original Readme
:::note

### SVG Icon Generator

A C# source generator that automatically creates strongly-typed icon properties from SVG files.

###### Installation

Install the NuGet package in your project:

```bash
dotnet add package SvgIconGenerator
```

###### Usage

######### 1. Organize Your SVG Files

Place your SVG icon files in a folder within your project (e.g., `Icons/`):

```
YourProject/
├── Icons/
│   ├── user-circle.svg
│   ├── home.svg
│   └── settings.svg
└── Program.cs
```

######### 2. Add SVG Files as AdditionalFiles

In your `.csproj` file, add the SVG files as `AdditionalFiles`:

```xml
<ItemGroup>
  <AdditionalFiles Include="Icons/*.svg" />
</ItemGroup>
```

**Important**: Adding files as `AdditionalFiles` ensures that changes to SVG files trigger regeneration during incremental compilation.

######### 3. Create an Icon Class

Create a `static partial` class and decorate it with the `[GenerateIcons]` attribute:

```csharp
[GenerateIcons]
internal static partial class MyIcons;
```

You can optionally specify a glob pattern to filter which SVG files to include:

```csharp
// Include all SVG files from AdditionalFiles
[GenerateIcons]
internal static partial class AllIcons;

// Filter by glob pattern
[GenerateIcons("Icons/*.svg")]
internal static partial class MyIcons;
```

######### 4. Access Generated Icons

The source generator will create properties for each SVG file. Property names are automatically converted from kebab-case to PascalCase:

```csharp
// user-circle.svg becomes UserCircle
IconDto icon = MyIcons.UserCircle;

Console.WriteLine($"Icon name: {icon.Name}");
Console.WriteLine($"ViewBox: {icon.DefaultAttributes["viewBox"]}");
Console.WriteLine($"SVG content: {icon.InnerContent}");
```

######### 5. Render Icons

The `IconDto` contains everything needed to render the icon:

```csharp
public static string RenderIcon(IconDto icon, Dictionary<string, string>? customAttributes = null)
{
    // Merge default attributes with custom overrides
    var attributes = new Dictionary<string, string>(icon.DefaultAttributes);
    if (customAttributes != null)
    {
        foreach (var kvp in customAttributes)
        {
            attributes[kvp.Key] = kvp.Value;
        }
    }

    // Build attribute string
    var attrString = string.Join(" ", attributes.Select(kvp => $"{kvp.Key}=\"{kvp.Value}\""));

    // Return complete SVG
    return $"<svg {attrString}>{icon.InnerContent}</svg>";
}

// Use it
string svg = RenderIcon(MyIcons.UserCircle, new Dictionary<string, string>
{
    ["class"] = "icon",
    ["width"] = "24",
    ["height"] = "24"
});
```

###### Using with Popular Icon Libraries

You can use this generator with popular icon libraries installed via NPM, such as Bootstrap Icons, Lucide, Heroicons, or Feather Icons.

######### Example: Lucide Icons

1. Install Lucide icons via NPM:

```bash
npm install lucide-static
```

2. Add the icons as `AdditionalFiles` in your `.csproj`:

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/lucide-static/icons/*.svg" />
</ItemGroup>
```

3. Create the icon class with optional glob pattern filter:

```csharp
[GenerateIcons("node_modules/lucide-static/icons/*.svg")]
internal static partial class LucideIcons;
```

4. Access any Lucide icon:

```csharp
IconDto icon = LucideIcons.UserCircle;
IconDto icon2 = LucideIcons.ShoppingCart;
IconDto icon3 = LucideIcons.AlertTriangle;
```

######### Example: Bootstrap Icons

```bash
npm install bootstrap-icons
```

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/bootstrap-icons/icons/*.svg" />
</ItemGroup>
```

```csharp
[GenerateIcons("node_modules/bootstrap-icons/icons/*.svg")]
internal static partial class BootstrapIcons;
```

######### Example: Heroicons

```bash
npm install heroicons
```

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/heroicons/24/outline/*.svg" />
  <AdditionalFiles Include="node_modules/heroicons/24/solid/*.svg" />
</ItemGroup>
```

```csharp
// Outline style icons
[GenerateIcons("node_modules/heroicons/24/outline/*.svg")]
internal static partial class HeroiconsOutline;

// Solid style icons
[GenerateIcons("node_modules/heroicons/24/solid/*.svg")]
internal static partial class HeroiconsSolid;
```

######### Multiple Icon Sets

You can create multiple icon classes in the same project to organize different icon sets:

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/lucide-static/icons/*.svg" />
  <AdditionalFiles Include="Icons/custom/*.svg" />
  <AdditionalFiles Include="Icons/logos/*.svg" />
</ItemGroup>
```

```csharp
[GenerateIcons("node_modules/lucide-static/icons/*.svg")]
internal static partial class LucideIcons;

[GenerateIcons("Icons/custom/*.svg")]
internal static partial class CustomIcons;

[GenerateIcons("Icons/logos/*.svg")]
internal static partial class LogoIcons;
```

###### How It Works

1. The source generator reads SVG files from `AdditionalFiles` in your project
2. Files are optionally filtered by glob pattern (if specified in the attribute)
3. For each SVG file, it:
    - Extracts the root element's attributes (excluding `xmlns` and `class`)
    - Captures the inner SVG content
    - Converts the filename to PascalCase for the property name
4. Generates a partial class with `IconDto` properties for each icon
5. **Incremental compilation**: Changes to SVG files automatically trigger regeneration

###### IconDto Structure

The generated `IconDto` record contains:

- **Name** (`string`): The original kebab-case filename without extension
- **DefaultAttributes** (`IReadOnlyDictionary<string, string>`): SVG root attributes like `viewBox`, `fill`, `stroke`, etc.
- **InnerContent** (`string`): The inner HTML content (paths, circles, etc.)

###### Example SVG Input

Given an SVG file `Icons/user-circle.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="10" r="3"/>
  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
</svg>
```

The generator creates:

```csharp
/// <summary>
/// Icon: user-circle
/// </summary>
public static readonly IconDto UserCircle = new IconDto(
    "user-circle",
    new global::System.Collections.Generic.Dictionary<string, string> {
        \{ "width", "24" },
        \{ "height", "24" },
        \{ "viewBox", "0 0 24 24" },
        \{ "fill", "none" },
        \{ "stroke", "currentColor" },
        \{ "stroke-width", "2" },
    },
    "<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/><path d=\"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662\"/>");
```

###### Requirements

- .NET Standard 2.0 or higher
- C# 9.0 or higher (for record types)

###### License

See the repository for license information.


:::

### About
:::note

Generating classes from SVG icons to be used in C# projects.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SvgIconGenerator**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="SvgIconGenerator" Version="0.0.4">
    </PackageReference>
  </ItemGroup>
	<ItemGroup>
		<AdditionalFiles Include="Icons/*.svg" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SvgIconGenerator\src\DemoSvg\Program.cs" label="Program.cs" >

  This is the use of **SvgIconGenerator** in *Program.cs*

```csharp showLineNumbers 
using DemoSvg;

Console.WriteLine(MyIcons.Circle.Name);

Console.WriteLine(MyIcons.Rect.InnerContent);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SvgIconGenerator\src\DemoSvg\Icons.cs" label="Icons.cs" >

  This is the use of **SvgIconGenerator** in *Icons.cs*

```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Text;
using SvgIconGenerator;
namespace DemoSvg;

[GenerateIcons()]
internal static partial class MyIcons;


```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SvgIconGenerator\src\DemoSvg\obj\GX\SvgIconGenerator\SvgIconGenerator.IconGenerator\GenerateIconsAttribute.g.cs" label="GenerateIconsAttribute.g.cs" >
```csharp showLineNumbers 
namespace SvgIconGenerator
{
    /// <summary>
    /// Marks a static partial class for icon generation.
    /// The source generator will scan AdditionalFiles for SVG files matching the specified glob pattern
    /// and generate static readonly IconDto properties for each icon found.
    /// </summary>
    /// <remarks>
    /// SVG files must be added to the project as AdditionalFiles in the .csproj file:
    /// <code>
    /// &lt;ItemGroup&gt;
    ///   &lt;AdditionalFiles Include="icons/**/*.svg" /&gt;
    /// &lt;/ItemGroup&gt;
    /// </code>
    /// </remarks>
    [global::System.AttributeUsage(global::System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    internal sealed class GenerateIconsAttribute : global::System.Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GenerateIconsAttribute"/> class.
        /// </summary>
        public GenerateIconsAttribute()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="GenerateIconsAttribute"/> class.
        /// </summary>
        /// <param name="globPattern">
        /// Optional glob pattern to filter SVG files from AdditionalFiles.
        /// If not specified, all SVG files in AdditionalFiles will be included.
        /// Supports * (wildcard) and ** (recursive) patterns.
        /// Example: <code>"node_modules/lucide-static/icons/*.svg"</code>
        /// </param>
        public GenerateIconsAttribute(string globPattern)
        {
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SvgIconGenerator\src\DemoSvg\obj\GX\SvgIconGenerator\SvgIconGenerator.IconGenerator\IconDto.g.cs" label="IconDto.g.cs" >
```csharp showLineNumbers 
namespace SvgIconGenerator
{
    /// <summary>
    /// Represents an icon with its SVG metadata and content.
    /// This type is generated by the IconGenerator source generator.
    /// </summary>
    /// <param name="Name">The kebab-case name of the icon (e.g., "circle-user-round").</param>
    /// <param name="DefaultAttributes">The default attributes from the SVG root element (excluding xmlns). Common attributes include: width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin.</param>
    /// <param name="InnerContent">The inner HTML content of the SVG element (paths, circles, lines, etc.).</param>
    public sealed record IconDto(string Name, global::System.Collections.Generic.IReadOnlyDictionary<string, string> DefaultAttributes, string InnerContent);
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SvgIconGenerator\src\DemoSvg\obj\GX\SvgIconGenerator\SvgIconGenerator.IconGenerator\MyIcons.g.cs" label="MyIcons.g.cs" >
```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DemoSvg
{
    partial class MyIcons
    {
        /// <summary>
        /// Icon: Circle
        /// </summary>
        public static readonly global::SvgIconGenerator.IconDto Circle = new global::SvgIconGenerator.IconDto(
            "Circle",
            new global::System.Collections.Generic.Dictionary<string, string> {
                \{ "height", "100" },
                \{ "width", "100" },
            },
            "<circle r=\"45\" cx=\"50\" cy=\"50\" fill=\"red\" />");

        /// <summary>
        /// Icon: Rect
        /// </summary>
        public static readonly global::SvgIconGenerator.IconDto Rect = new global::SvgIconGenerator.IconDto(
            "Rect",
            new global::System.Collections.Generic.Dictionary<string, string> {
                \{ "width", "300" },
                \{ "height", "130" },
            },
            "<rect width=\"200\" height=\"100\" x=\"10\" y=\"10\" rx=\"20\" ry=\"20\" fill=\"blue\" />");

    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project SvgIconGenerator ](/sources/SvgIconGenerator.zip)

:::


### Share SvgIconGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSvgIconGenerator&quote=SvgIconGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSvgIconGenerator&text=SvgIconGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSvgIconGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSvgIconGenerator&title=SvgIconGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSvgIconGenerator&title=SvgIconGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSvgIconGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SvgIconGenerator

<SameCategory />

