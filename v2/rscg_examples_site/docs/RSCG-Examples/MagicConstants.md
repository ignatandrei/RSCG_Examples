---
sidebar_position: 2900
title: 290 - MagicConstants
description: Generates constants from files to return contents. It has extension for routes and more for ASP.NET projects.
slug: /MagicConstants
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveFilesToCode.mdx';

# MagicConstants  by Liesel Thuriot


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MagicConstants?label=MagicConstants)](https://www.nuget.org/packages/MagicConstants/)
[![GitHub last commit](https://img.shields.io/github/last-commit/LieselThuriot/MagicConstants?label=updated)](https://github.com/LieselThuriot/MagicConstants)
![GitHub Repo stars](https://img.shields.io/github/stars/LieselThuriot/MagicConstants?style=social)

## Details

### Info
:::info

Name: **MagicConstants**

Package Description

Author: Liesel Thuriot

NuGet: 
*https://www.nuget.org/packages/MagicConstants/*   


You can find more details at https://github.com/LieselThuriot/MagicConstants

Source: https://github.com/LieselThuriot/MagicConstants

:::

### Author
:::note
Liesel Thuriot 
![Alt text](https://github.com/LieselThuriot.png)
:::

## Original Readme
:::note

### Magic Constants

Magic Constants is a dotnet source generator that generates C# constants from files in your project.
It can also minify files and set cache control headers for routes.

This is especially useful for web projects where you want to reference files in your code without hardcoding the paths nor having to manage the string constants.

Global settings in your project:

```xml
<PropertyGroup>
  <MagicConstantsVisibility>public</MagicConstantsVisibility>
  <MagicConstantsRoutes>true</MagicConstantsRoutes>
  <MagicConstantsFunctions>false</MagicConstantsFunctions>
  <MagicConstantsRoutesCacheControl>public, max-age=604800</MagicConstantsRoutesCacheControl>
  <MagicConstantsMinify>true</MagicConstantsMinify>
  <MagicConstantsRemovePrefix>wwwroot/</MagicConstantsRemovePrefix>
  <MagicConstantsIncludeContextMetadata>true</MagicConstantsIncludeContextMetadata>
</PropertyGroup>
```

Specific settings
( Note: if not specified, global settings will be used instead )

```xml
<ItemGroup>
  <AdditionalFiles Include="**\*.html" MagicClass="Pages" MagicRemoveRouteExtension="true" MagicCacheControl="public, max-age=86400" MagicMinify="true" MagicRemovePrefix="wwwroot/" />
  <AdditionalFiles Include="**\*.css" MagicClass="Assets" MagicMinify="true" />
  <AdditionalFiles Include="**\*.js" MagicClass="Assets" MagicMinify="true" />
  <AdditionalFiles Include="**\*.svg" MagicClass="Images" />
  <AdditionalFiles Include="**\*.png" MagicClass="Images" />
  <AdditionalFiles Include="**\*.ico" MagicClass="Images" />
</ItemGroup>
```

When `MagicConstantsRoutes` is enabled, it will generate an ASP.NET Core route for every file. All you have to do, is call the mapping method:

```csharp
app.MapViews();
```

When `MagicConstantsFunctions` is enabled, it will generate Azure Functions with HTTP triggers for every file. Each function will serve the file content with the appropriate content type and cache control headers.

> **Note for Azure Functions:** If you're using Azure Functions, you may need to disable the built-in source generators to avoid conflicts. Add the following properties to your `.csproj` file to fall back on reflection:
> ```xml
> <PropertyGroup>
>   <FunctionsEnableExecutorSourceGen>false</FunctionsEnableExecutorSourceGen>
>   <FunctionsEnableWorkerIndexing>false</FunctionsEnableWorkerIndexing>
> </PropertyGroup>
> ```
> Without these settings, the generated functions will not load properly.

###### Context Metadata

When routes or functions are generated, Magic Constants can optionally add metadata to the `HttpContext.Items` dictionary:

- `MagicRoute` - The route path being served
- `MagicMimeType` - The MIME type of the content

This metadata can be useful for logging, telemetry, or custom middleware. You can disable this behavior to reduce overhead:

```xml
<PropertyGroup>
  <MagicConstantsIncludeContextMetadata>false</MagicConstantsIncludeContextMetadata>
</PropertyGroup>
```

**Default:** `true` (enabled)

###### Variable Replacement

Magic Constants also allows you to replace variables inside your .htm, .html, .css and .js files.
You can use the following syntax:
```html
<a href="index.html?noCache={MAGIC_TIME}">
<a href="index.html?noCache={MAGIC_HASH}">
{MAGIC_FILE test.html}
```

- MAGIC_TIME will use the Unix Timestamp in seconds during build, 
- MAGIC_HASH will try and make a unique but consistent hash out of the timestamp.
- MAGIC_FILE is a simplistic template inliner.

This will end up as:
```html
<a href="index.html?noCache=1746028631">
<a href="index.html?noCache=LHf1JfsN">
<div>This is the content of test.html</div>
```

:::

### About
:::note

Generates constants from files to return contents. It has extension for routes and more for ASP.NET projects.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MagicConstants**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	
	<ItemGroup>
	</ItemGroup>

	<PropertyGroup>
		<MagicConstantsVisibility>internal</MagicConstantsVisibility>
		<MagicConstantsRoutes>false</MagicConstantsRoutes>
		<MagicConstantsFunctions>false</MagicConstantsFunctions>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="MagicConstants" Version="1.0.0-preview-22" />
		<AdditionalFiles Include="MyFolderToShow/**/*.json" MagicClass="Assets" />
	</ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MagicConstants\src\FolderToCode\Program.cs" label="Program.cs" >

  This is the use of **MagicConstants** in *Program.cs*

```csharp showLineNumbers 
using FolderToCode;

Console.WriteLine(Assets.MyFolderToShow_en_a_json);
Console.WriteLine(Assets.MyFolderToShow_ro_a_json);

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MagicConstants\src\FolderToCode\obj\GX\MagicConstants\MagicConstants.Generator\Assets.MyFolderToShow_en_a_json.g.cs" label="Assets.MyFolderToShow_en_a_json.g.cs" >
```csharp showLineNumbers 
namespace FolderToCode
{
    public static partial class Assets
    {
        
internal const string MyFolderToShow_en_a_json = @"";

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MagicConstants\src\FolderToCode\obj\GX\MagicConstants\MagicConstants.Generator\Assets.MyFolderToShow_ro_a_json.g.cs" label="Assets.MyFolderToShow_ro_a_json.g.cs" >
```csharp showLineNumbers 
namespace FolderToCode
{
    public static partial class Assets
    {
        
internal const string MyFolderToShow_ro_a_json = @"";

    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project MagicConstants ](/sources/MagicConstants.zip)

:::


### Share MagicConstants 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMagicConstants&quote=MagicConstants" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMagicConstants&text=MagicConstants:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMagicConstants" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMagicConstants&title=MagicConstants" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMagicConstants&title=MagicConstants&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMagicConstants" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MagicConstants

<SameCategory />

