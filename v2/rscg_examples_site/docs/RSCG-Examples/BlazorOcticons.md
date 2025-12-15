---
sidebar_position: 2470
title: 247 - BlazorOcticons
description: Generates Blazor components for GitHub Octicons SVG icons or from svg.
slug: /BlazorOcticons
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBlazor.mdx';

# BlazorOcticons  by Evgeniy K.


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/BlazorOcticons?label=BlazorOcticons)](https://www.nuget.org/packages/BlazorOcticons/)
[![GitHub last commit](https://img.shields.io/github/last-commit/BlazorOcticons/BlazorOcticons?label=updated)](https://github.com/BlazorOcticons/BlazorOcticons)
![GitHub Repo stars](https://img.shields.io/github/stars/BlazorOcticons/BlazorOcticons?style=social)

## Details

### Info
:::info

Name: **BlazorOcticons**

Package Description

Author: Evgeniy K.

NuGet: 
*https://www.nuget.org/packages/BlazorOcticons/*   


You can find more details at https://github.com/BlazorOcticons/BlazorOcticons

Source: https://github.com/BlazorOcticons/BlazorOcticons

:::

### Author
:::note
Evgeniy K. 
![Alt text](https://github.com/BlazorOcticons.png)
:::

### Original Readme
:::note

[![Backup Status](https://cloudback.it/badge/BlazorOcticons/BlazorOcticons)](https://cloudback.it)
[![.NET](https://github.com/BlazorOcticons/BlazorOcticons/actions/workflows/dotnet.yml/badge.svg)](https://github.com/BlazorOcticons/BlazorOcticons/actions/workflows/dotnet.yml)
[![GitHub](https://img.shields.io/github/license/BlazorOcticons/BlazorOcticons)](https://github.com/BlazorOcticons/BlazorOcticons/blob/main/LICENSE)
[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/BlazorOcticons?logo=nuget)](https://www.nuget.org/packages/BlazorOcticons)

![image](https://github.com/BlazorOcticons/BlazorOcticons/assets/6689884/30a985b1-0938-4ba7-b0c1-9ced889636d0)

# BlazorOcticons

**BlazorOcticons** is an easy-to-use GitHub Octicons built as customizable `.razor` components.

| NuGet Package           | Description |
|-------------------------|-------------|
| BlazorOcticons          | Main package which contains only `.razor` components |
| BlazorOcticonsGenerator | Helper package which contains Source Generators for Octicons |

## Installation

1. Install the BlazorOcticons NuGet package:

``` 
dotnet add package BlazorOcticons
```

2. In the `_Imports.razor` file add `@using BlazorOcticons.Octicons`:

``` razor

@using System.Net.Http
@using System.Net.Http.Json
...
@using Microsoft.AspNetCore.Components
@using Microsoft.JSInterop
@using BlazorOcticons.Octicons

```

3. That's it! Now you can use the components in your project.

## Usage

Inside your code, use any of GitHub Octicons as `.razor` components:

``` razor
<div class="p-3">
  ...
  <MarkGithub16 Color="#702AF7" Size="48"/>
  ...
</div>
```

## Contribute

All contributions are welcome! Feel free to raise any issues (bugs or feature requests), submit pull requests, etc.


:::

### About
:::note

Generates Blazor components for GitHub Octicons SVG icons or from svg.


Easily integrate GitHub Octicons into your Blazor applications.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **BlazorOcticons**
```xml showLineNumbers {17}
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
  </PropertyGroup>

  <ItemGroup>
    <AdditionalFiles Include="andrei-16.svg" />
  </ItemGroup>
	


	<ItemGroup>
    <PackageReference Include="BlazorOcticons" Version="1.3.0" />
    <PackageReference Include="BlazorOcticonsGenerator" Version="1.3.0">
    </PackageReference>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="10.0.1" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="10.0.1" PrivateAssets="all" />
  </ItemGroup>
	<!-- Use only local test icons -->
	<ItemGroup>
		<AdditionalFiles Remove="$(BlazorOcticonsIconsPath)**\*.svg" />
	</ItemGroup>
	<ItemGroup>
	  <Folder Include="Octicons\" />
	</ItemGroup>


	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>
	



```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BlazorOcticons\src\BlazorDemo\Program.cs" label="Program.cs" >

  This is the use of **BlazorOcticons** in *Program.cs*

```csharp showLineNumbers 
using BlazorDemo;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient \{ BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BlazorOcticons\src\BlazorDemo\andrei-16.svg" label="andrei-16.svg" >

  This is the use of **BlazorOcticons** in *andrei-16.svg*

```csharp showLineNumbers 
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M9.923 5.302c.063.063.122.129.178.198H14A.75.75 0 0 1 14 7h-3.3l.578 5.163.362 2.997a.75.75 0 0 1-1.49.18L9.868 13H6.132l-.282 2.34a.75.75 0 0 1-1.49-.18l.362-2.997L5.3 7H2a.75.75 0 0 1 0-1.5h3.9a2.54 2.54 0 0 1 .176-.198 3 3 0 1 1 3.847 0ZM9.2 7.073h-.001a1.206 1.206 0 0 0-2.398 0L6.305 11.5h3.39ZM9.5 3a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 3Z"/></svg>
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BlazorOcticons\src\BlazorDemo\Octicons\Andrei16.razor" label="Andrei16.razor" >

  This is the use of **BlazorOcticons** in *Andrei16.razor*

```csharp showLineNumbers 
<svg xmlns="http://www.w3.org/2000/svg" width="@Size" height="@Size" viewBox="0 0 16 16"><path fill="@Color" d="M9.923 5.302c.063.063.122.129.178.198H14A.75.75 0 0 1 14 7h-3.3l.578 5.163.362 2.997a.75.75 0 0 1-1.49.18L9.868 13H6.132l-.282 2.34a.75.75 0 0 1-1.49-.18l.362-2.997L5.3 7H2a.75.75 0 0 1 0-1.5h3.9a2.54 2.54 0 0 1 .176-.198 3 3 0 1 1 3.847 0ZM9.2 7.073h-.001a1.206 1.206 0 0 0-2.398 0L6.305 11.5h3.39ZM9.5 3a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 3Z"/></svg>

@code
{
  [Parameter]
  public string Color \{ get; set; \} = "#000";

  [Parameter]
  public int Size \{ get; set; \} = 16;
}
```
  </TabItem>

</Tabs>

### Generated Files
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project BlazorOcticons ](/sources/BlazorOcticons.zip)

:::


### Share BlazorOcticons 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazorOcticons&quote=BlazorOcticons" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazorOcticons&text=BlazorOcticons:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazorOcticons" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazorOcticons&title=BlazorOcticons" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazorOcticons&title=BlazorOcticons&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBlazorOcticons" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/BlazorOcticons

<SameCategory />

