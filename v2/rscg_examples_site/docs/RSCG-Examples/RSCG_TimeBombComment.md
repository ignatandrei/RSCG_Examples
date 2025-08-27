---
sidebar_position: 20
title: 02 - RSCG_TimeBombComment
description: This will generate an error from the comment after a certain date
slug: /RSCG_TimeBombComment
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementProject.mdx';

# RSCG_TimeBombComment  by Andrei Ignat


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_TimeBombComment?label=RSCG_TimeBombComment)](https://www.nuget.org/packages/RSCG_TimeBombComment/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_TimeBombComment?label=updated)](https://github.com/ignatandrei/RSCG_TimeBombComment)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_TimeBombComment?style=social)

## Details

### Info
:::info

Name: **RSCG_TimeBombComment**

This package make a time bomb from comment.

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_TimeBombComment/*   


You can find more details at http://msprogrammer.serviciipeweb.ro/category/roslyn/

Source: https://github.com/ignatandrei/RSCG_TimeBombComment

:::

### Original Readme
:::note

# RSCG_TimeBombComment aka Time Bomb comment for technical debt
Reference the nuget package 

```xml
    <PackageReference Include="RSCG_TimeBombComment" Version="2023.5.9.2110"  PrivateAssets="all" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
```


Then just add :

//TB: 2021-09-13 this is a comment transformed into an error

and you will see the error!

The general form is

//TB: yyyy-MM-dd whatever here

## Examples

    
```cs
//TB: 2020-09-13 this is a comment transformed into an error
```

will produce an error


## Usage for technical debt 

When you have a 

//TODO

comment in your code, you can transform it into an error time bomb by adding the following line in your project file

//TB: yyyy-MM-dd whatever here
and on the date will produce an error when compiling the project

## Usage for obsolete methods
Imagine you have a method that is obsolete and you want to remember that you have to remove it.
Just put the following line in your project file


```cs
[Obsolete("should be deleted on the date on the right", TB_20210915)]
static string Test1()
{
    return "asdasd";
}
```

Then RSCG will create a static const boolean TB_20210915 that will be true if the date is less than 2021-09-15

Also, when you want to test something in your code, but give error if compiled with release

```csharp
//Just for debug: if(args.length>0) throw new ArgumentException();
//JFD: test
```

will raise error if compiled with 

dotnet build -c release

## Other Roslyn Source Code Generators

You can find more [Roslyn Source Code Generators](https://github.com/ignatandrei/rscg_examples/) at https://github.com/ignatandrei/rscg_examples/


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)


:::

### About
:::note

This will generate an error from the comment after a certain date


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_TimeBombComment**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net7.0</TargetFramework>
	</PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
		<PackageReference Include="RSCG_TimeBombComment" Version="2023.5.9.2110" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_TimeBombComment\src\Console_TimeBombComment\TestClass.cs" label="TestClass.cs" >

  This is the use of **RSCG_TimeBombComment** in *TestClass.cs*

```csharp showLineNumbers 
namespace Console_TimeBombComment;
internal partial class TestClass
{
    [Obsolete("this will be obsolete",TB_20230508)]
    public int DataObsolete()
    {
        return 5;
    }

    public int CommentsWithErrors()
    {
        //JFD: test
        //TB: 2021-09-13 this is a comment transformed into an error
        //TB: and this is a warning
        //TB: 2050-12-30 and this should not appear yet
        return 5;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_TimeBombComment\src\Console_TimeBombComment\obj\GX\RSCG_TimeBombComment\RSCG_TimeBombComment.GenerateFromCommentsIncremental\Obsolete_1.cs" label="Obsolete_1.cs" >


```csharp showLineNumbers 

namespace Console_TimeBombComment {
    partial class TestClass { 
        const bool TB_20230508 = true;
    }
}

                
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RSCG_TimeBombComment ](/sources/RSCG_TimeBombComment.zip)

:::


### Share RSCG_TimeBombComment 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&quote=RSCG_TimeBombComment" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&text=RSCG_TimeBombComment:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&title=RSCG_TimeBombComment" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&title=RSCG_TimeBombComment&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_TimeBombComment

aaa
<SameCategory />

