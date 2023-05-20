---
sidebar_position: 20
title: 02 - RSCG_TimeBombComment
description: This will generate an error from the comment after a certain date
slug: /RSCG_TimeBombComment
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_TimeBombComment  by Andrei Ignat

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/RSCG_TimeBombComment?label=RSCG_TimeBombComment)](https://www.nuget.org/packages/RSCG_TimeBombComment/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_TimeBombComment?label=updated)](https://github.com/ignatandrei/RSCG_TimeBombComment)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_TimeBombComment?style=social)

## Details

### Info
:::info

Name: **RSCG_TimeBombComment**

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_TimeBombComment/*   


You can find more details at http://msprogrammer.serviciipeweb.ro/category/roslyn/

Source : https://github.com/ignatandrei/RSCG_TimeBombComment
:::

### About
:::note

This will generate an error from the comment after a certain date


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_TimeBombComment**
```xml showLineNumbers 
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

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\RSCG_TimeBombComment\src\Console_TimeBombComment\TestClass.cs" label="TestClass.cs" >

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


<TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\RSCG_TimeBombComment\src\Console_TimeBombComment\obj\GX\RSCG_TimeBombComment\RSCG_TimeBombComment.GenerateFromCommentsIncremental\Obsolete_1.cs" label="Obsolete_1.cs" >


```csharp showLineNumbers 

namespace Console_TimeBombComment {
    partial class TestClass { 
        const bool TB_20230508 = true;
    }
}

                
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project RSCG_TimeBombComment ](/sources/RSCG_TimeBombComment.zip)

:::

### Download PDF

[Download PDF RSCG_TimeBombComment ](/pdfs/RSCG_TimeBombComment.pdf)

### Share RSCG_TimeBombComment 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&quote=RSCG_TimeBombComment" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&text=RSCG_TimeBombComment:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&title=RSCG_TimeBombComment" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment&title=RSCG_TimeBombComment&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_TimeBombComment" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_TimeBombComment
