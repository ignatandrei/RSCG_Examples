---
sidebar_position: 2000
title: 200 - Figgle
description: Generating ASCII art text for console applications
slug: /Figgle
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Figgle  by Drew Noakes


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Figgle.Generator?label=Figgle.Generator)](https://www.nuget.org/packages/Figgle.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/drewnoakes/figgle?label=updated)](https://github.com/drewnoakes/figgle)
![GitHub Repo stars](https://img.shields.io/github/stars/drewnoakes/figgle?style=social)

## Details

### Info
:::info

Name: **Figgle**

A source generator that produces ASCII banners at compile-time.

      This package is a great choice if the strings you want to render
      are static (i.e. string literals). If you want to render dynamic
      strings, use the Figgle package directly instead. You can use both
      at the same time.

Author: Drew Noakes

NuGet: 
*https://www.nuget.org/packages/Figgle.Generator/*   


You can find more details at https://github.com/drewnoakes/figgle

Source : https://github.com/drewnoakes/figgle

:::

### Original Readme
:::note

```
 _____ _         _     
|   __|_|___ ___| |___ 
|   __| | . | . | | -_|
|__|  |_|_  |_  |_|___|
        |___|___|      
```

[![Figgle Build Status](https://github.com/drewnoakes/figgle/actions/workflows/CI.yml/badge.svg)](https://github.com/drewnoakes/figgle/actions/)
[![Figgle NuGet download count](https://img.shields.io/nuget/dt/Figgle)](https://www.nuget.org/packages/Figgle/)

## ASCII banner generation for .NET

```c#
Console.WriteLine(
    FiggleFonts.Standard.Render("Hello, World!"));
```

Produces...

```
  _   _      _ _         __        __         _     _ _
 | | | | ___| | | ___    \ \      / /__  _ __| | __| | |
 | |_| |/ _ \ | |/ _ \    \ \ /\ / / _ \| '__| |/ _` | |
 |  _  |  __/ | | (_) |    \ V  V / (_) | |  | | (_| |_|
 |_| |_|\___|_|_|\___( )    \_/\_/ \___/|_|  |_|\__,_(_)
                     |/
```

Use Figgle's source generator to embed just the fonts you want into your assembly, or&mdash;if the text to render is known ahead of time&mdash;render that text during compilation, so you don't need to ship Figgle binaries with your app.

## Installation

Figgle ships as NuGet packages that target .NET Standard 2.0, so runs almost everywhere.

| Project | Badges | Description |
| :------ | :----- | :---------- |
| [Figgle][figgle] | [![v][figgle-v]][figgle-nuget] [![dl][figgle-dl]][figgle-nuget] | The core library. Supports parsing font files and rendering text. |
| [Figgle.Fonts][fonts] | [![v][fonts-v]][fonts-nuget] [![dl][fonts-dl]][fonts-nuget] | A collection of 250+ [FIGlet](http://www.figlet.org/) fonts, for use with Figgle. |
| [Figgle.Generator][generator] | [![v][gen-v]][gen-nuget] [![dl][gen-dl]][gen-nuget] | A source generator to embedding fonts and render static text at compile-time. |

[figgle]: https://github.com/drewnoakes/figgle/tree/master/src/Figgle
[fonts]: https://github.com/drewnoakes/figgle/tree/master/src/Figgle.Fonts
[generator]: https://github.com/drewnoakes/figgle/tree/master/src/Figgle.Generator

[figgle-v]: https://img.shields.io/nuget/v/Figgle
[figgle-dl]: https://img.shields.io/nuget/dt/Figgle
[figgle-nuget]: https://www.nuget.org/packages/Figgle/

[fonts-v]: https://img.shields.io/nuget/v/Figgle.Fonts
[fonts-dl]: https://img.shields.io/nuget/dt/Figgle.Fonts
[fonts-nuget]: https://www.nuget.org/packages/Figgle.Fonts/

[gen-v]: https://img.shields.io/nuget/v/Figgle.Generator
[gen-dl]: https://img.shields.io/nuget/dt/Figgle.Generator
[gen-nuget]: https://www.nuget.org/packages/Figgle.Generator/

## Sample apps

If you just want to see some code (it's not that complex) check out one of the following sample projects:

| Sample | Description |
| :----- | :---------- |
| [Basics](https://github.com/drewnoakes/figgle/samples/1-basics) | The easiest option, if you don't care about application size or memory use. |
| [Static text generation](https://github.com/drewnoakes/figgle/samples/2-static-text) | **For statically-known text**, have a source generator embed the rendered text directly into your assembly. Uses the `Figgle.Generator` package, and uses a single attribute to render the text at compile time. If all Figgle text is rendered this way, you don't have to ship any `Figgle` assembly with your app. |
| [Embed font from package](https://github.com/drewnoakes/figgle/samples/3-embed-font-from-package) | **For dynamic text, using a font from the `Figgle.Fonts` package** via an attribute. The font is embedded directly into your assembly. With this approach, you only need the lightweight `Figgle` package at runtime. |
| [Embed font from `.flf` file](https://github.com/drewnoakes/figgle/samples/4-embed-font-from-file) | **For dynamic text, using a `.flf` font file** via an attribute and `<AdditionalFiles>` project item in the `.csproj`. The font is embedded directly into your assembly. With this approach, you only need the lightweight `Figgle` package at runtime. |

## More output examples

Using `FiggleFonts.Graffiti`:

```
  ___ ___         .__  .__               __      __            .__       .___._.
 /   |   \   ____ |  | |  |   ____      /  \    /  \___________|  |    __| _/| |
/    ~    \_/ __ \|  | |  |  /  _ \     \   \/\/   /  _ \_  __ \  |   / __ | | |
\    Y    /\  ___/|  |_|  |_(  <_> )     \        (  <_> )  | \/  |__/ /_/ |  \|
 \___|_  /  \___  >____/____/\____/  /\   \__/\  / \____/|__|  |____/\____ |  __
       \/       \/                   )/        \/                         \/  \/
```

Using `FiggleFonts.ThreePoint`:

```
|_| _ || _    \    / _  _| _||
| |(/_||(_),   \/\/ (_)| |(_|.
```

Using `FiggleFonts.Ogre`:

```
            _ _          __    __           _     _   _ 
  /\  /\___| | | ___    / / /\ \ \___  _ __| | __| | / \
 / /_/ / _ \ | |/ _ \   \ \/  \/ / _ \| '__| |/ _` |/  /
/ __  /  __/ | | (_) |   \  /\  / (_) | |  | | (_| /\_/ 
\/ /_/ \___|_|_|\___( )   \/  \/ \___/|_|  |_|\__,_\/   
                    |/                                  
```

Using `FiggleFonts.Rectangles`:

```
                                            __ 
 _____     _ _          _ _ _         _   _|  |
|  |  |___| | |___     | | | |___ ___| |_| |  |
|     | -_| | | . |_   | | | | . |  _| | . |__|
|__|__|___|_|_|___| |  |_____|___|_| |_|___|__|
                  |_|                          
```

Using `FiggleFonts.Slant`:

```
    __  __     ____           _       __           __    ____
   / / / /__  / / /___       | |     / /___  _____/ /___/ / /
  / /_/ / _ \/ / / __ \      | | /| / / __ \/ ___/ / __  / / 
 / __  /  __/ / / /_/ /      | |/ |/ / /_/ / /  / / /_/ /_/  
/_/ /_/\___/_/_/\____( )     |__/|__/\____/_/  /_/\__,_(_)   
                     |/                                      
```


:::

### About
:::note

Generating ASCII art text for console applications


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Figgle**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Figgle.Generator" Version="0.6.4" PrivateAssets="all"  />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Figgle\src\FiggleDemo\Program.cs" label="Program.cs" >

  This is the use of **Figgle** in *Program.cs*

```csharp showLineNumbers 
Console.WriteLine(MyTexts.MyName);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Figgle\src\FiggleDemo\MyTexts.cs" label="MyTexts.cs" >

  This is the use of **Figgle** in *MyTexts.cs*

```csharp showLineNumbers 

[Figgle.GenerateFiggleText(memberName: "MyName", fontName: "standard", sourceText: "AndreiIgnat")]
internal static partial class MyTexts
{
}
/*
List of available fonts from https://github.com/drewnoakes/figgle/blob/master/src/Figgle.Fonts/Aliases.csv
1row,OneRow
3-d,ThreeD
3d_diagonal,ThreeDDiagonal
3x5,ThreeByFive
4max,FourMax
5lineoblique,FiveLineOblique
amc3line,Amc3Line
amc3liv1,Amc3Liv1
amcaaa01,AmcAaa01
amcneko,AmcNeko
amcrazo2,AmcRazor2
amcrazor,AmcRazor
amcslash,AmcSlash
amcslder,AmcSlder
amcthin,AmcThin
amctubes,AmcTubes
amcun1,AmcUn1
barbwire,BarbWire
bigchief,BigChief
bigfig,BigFig
broadway_kb,BroadwayKB
calgphy2,Caligraphy2
catwalk,CatWalk
cyberlarge,CyberLarge
cybermedium,CyberMedium
cybersmall,CyberSmall
dancingfont,DancingFont
defleppard,DefLeppard
dietcola,DietCola
dosrebel,DosRebel
dotmatrix,DotMatrix
doubleshorts,DoubleShorts
drpepper,DRPepper
dwhistled,DWhistled
eftichess,EftiChess
eftifont,EftiFont
eftipiti,EftiPiti
eftirobot,EftiRobot
eftitalic,EftiItalic
eftiwall,EftiWall
eftiwater,EftiWater
flowerpower,FlowerPower
fourtops,FourTops
funface,FunFace
funfaces,FunFaces
georgi16,Georgia16
Georgia11,Georgia11
graffiti,Graffiti
henry3d,Henry3d
horizontalleft,HorizontalLeft
horizontalright,HorizontalRight
impossible,Impossible
kontoslant,KontoSlant
larry3d,Larry3d
lildevil,LilDevil
lineblocks,LineBlocks
lockergnome,LockerGnome
maxfour,MaxFour
mshebrew210,Mshebrew210
nancyj,NancyJ
nancyj-fancy,NancyJFancy
nancyj-improved,NancyJImproved
nancyj-underlined,NancyJUnderlined
nscript,NScript
ntgreek,NTGreek
nvscript,NVScript
oldbanner,OldBanner
os2,OS2
ogre,Ogre
peaksslant,PeaksSlant
rectangles,Rectangles
rowancap,RowanCap
santaclara,SantaClara
sblood,SBlood
slant,Slant
slscript,ScriptSlant
serifcap,SerifCap
smallcaps,SmallCaps
smisome1,IsometricSmall
smkeyboard,KeyboardSmall
smpoison,PoisonSmall
smscript,ScriptSmall
smshadow,ShadowSmall
smslant,SlantSmall
smtengwar,TengwarSmall
standard,Standard
threepoint,ThreePoint
ticksslant,TicksSlant
tinker-toy,TinkerToy
twopoint,TwoPoint
usaflag,UsaFlag
wetletter,WetLetter

*/
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Figgle\src\FiggleDemo\obj\GX\Figgle.Generator\Figgle.Generator.EmbedFontSourceGenerator\EmbedFiggleFontAttribute.cs" label="EmbedFiggleFontAttribute.cs" >


```csharp showLineNumbers 
// Copyright Drew Noakes. Licensed under the Apache-2.0 license. See the LICENSE file for more details.

// <auto-generated>
//     This code was generated by Figgle.Generator.
//
//     https://github.com/drewnoakes/figgle
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>

using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;

namespace Figgle
{
    /// <summary>
    /// Instructs a source generator to embed a Figgle font in the assembly, making it available
    /// via a static property on class this attribute is applied to.
    /// </summary>
    /// <remarks>
    /// <para>
    /// This attribute is processed by a source generator in the <c>Figgle.Generator</c> package.
    /// </para>
    /// <para>
    /// This source generator will embed the specified Figgle font into your assembly, which is a
    /// more performant alternative to using the <c>Figgle.Fonts</c> package, which embeds all of
    /// the Figgle fonts.
    /// </para>
    /// <para>
    /// If the text you want Figgle to render is not statically known at compile time, you should
    /// use this generator and ship the <c>Figgle</c> package.
    /// </para>
    /// <para>
    /// If the text you want Figgle to render is statically known at compile time, you should use
    /// <see cref="GenerateFiggleTextAttribute" /> instead.
    /// </para>
    /// </remarks>
    [Conditional("INCLUDE_FIGGLE_GENERATOR_ATTRIBUTES")]
    [ExcludeFromCodeCoverage]
    [DebuggerNonUserCode]
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
    internal sealed class EmbedFiggleFontAttribute : Attribute
    {
        /// <summary>
        /// The name of the property to add, whose getter will return the embedded <see cref="FiggleFont" />.
        /// </summary>
        public string MemberName { get; }

        /// <summary>
        /// The name of the font to use when rendering the text.
        /// </summary>
        public string FontName { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="EmbedFiggleFontAttribute"/> class.
        /// </summary>
        /// <param name="memberName">The name of the property to add, whose getter returns the embedded <paramref name="FiggleFont" />.</param>
        /// <param name="fontName">The name of the font to use when rendering the text.</param>
        public EmbedFiggleFontAttribute(string memberName, string fontName)
        {
            MemberName = memberName;
            FontName = fontName;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Figgle\src\FiggleDemo\obj\GX\Figgle.Generator\Figgle.Generator.RenderTextSourceGenerator\GenerateFiggleTextAttribute.cs" label="GenerateFiggleTextAttribute.cs" >


```csharp showLineNumbers 
// Copyright Drew Noakes. Licensed under the Apache-2.0 license. See the LICENSE file for more details.

// <auto-generated>
//     This code was generated by Figgle.Generator.
//
//     https://github.com/drewnoakes/figgle
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>

using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;

namespace Figgle
{
    /// <summary>
    /// Instructs a source generator to render a statically known string with a Figgle font, and to
    /// make the value available via a static property of the class this attribute is applied to.
    /// </summary>
    /// <remarks>
    /// <para>
    /// This attribute is processed by a source generator in the <c>Figgle.Generator</c> package.
    /// </para>
    /// <para>
    /// This source generator will embed rendered text directly into your code at compile time.
    /// If the text you want Figgle to render is statically known at compile time, you should use
    /// this generator and avoid shipping any Figgle binaries.
    /// </para>
    /// <para>
    /// If the text you want Figgle to render is not statically known at compile time, you should
    /// use <see cref="EmbedFiggleFontAttribute" /> instead.
    /// </para>
    /// </remarks>
    [Conditional("INCLUDE_FIGGLE_GENERATOR_ATTRIBUTES")]
    [ExcludeFromCodeCoverage]
    [DebuggerNonUserCode]
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
    internal sealed class GenerateFiggleTextAttribute : Attribute
    {
        /// <summary>
        /// The name of the property to add, whose getter returns the rendered <see cref="SourceText" />.
        /// </summary>
        public string MemberName { get; }

        /// <summary>
        /// The name of the font to use when rendering the text.
        /// </summary>
        public string FontName { get; }

        /// <summary>
        /// The text to render using the specified font.
        /// </summary>
        public string SourceText { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="GenerateFiggleTextAttribute"/> class.
        /// </summary>
        /// <param name="memberName">The name of the property to add, whose getter will return the rendered <paramref name="sourceText" />.</param>
        /// <param name="fontName">The name of the font to use when rendering the text.</param>
        /// <param name="sourceText">The text to render using the specified font.</param>
        public GenerateFiggleTextAttribute(string memberName, string fontName, string sourceText)
        {
            MemberName = memberName;
            FontName = fontName;
            SourceText = sourceText;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Figgle\src\FiggleDemo\obj\GX\Figgle.Generator\Figgle.Generator.RenderTextSourceGenerator\MyTexts.g.cs" label="MyTexts.g.cs" >


```csharp showLineNumbers 
// Copyright Drew Noakes. Licensed under the Apache-2.0 license. See the LICENSE file for more details.

// <auto-generated>
//     This code was generated by Figgle.Generator.
//
//     https://github.com/drewnoakes/figgle
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>

partial class MyTexts
{
    public static string MyName { get; } = @"     _              _          _ ___                  _   
    / \   _ __   __| |_ __ ___(_)_ _|__ _ _ __   __ _| |_ 
   / _ \ | '_ \ / _` | '__/ _ \ || |/ _` | '_ \ / _` | __|
  / ___ \| | | | (_| | | |  __/ || | (_| | | | | (_| | |_ 
 /_/   \_\_| |_|\__,_|_|  \___|_|___\__, |_| |_|\__,_|\__|
                                    |___/                 
";
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Figgle ](/sources/Figgle.zip)

:::


### Share Figgle 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFiggle&quote=Figgle" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFiggle&text=Figgle:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFiggle" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFiggle&title=Figgle" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFiggle&title=Figgle&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FFiggle" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Figgle

### In the same category (Console) - 0 other generators

