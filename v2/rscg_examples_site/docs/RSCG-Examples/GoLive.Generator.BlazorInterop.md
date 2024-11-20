---
sidebar_position: 1720
title: 172 - GoLive.Generator.BlazorInterop
description: Generating interop from C# to javascript for Blazor
slug: /GoLive.Generator.BlazorInterop
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# GoLive.Generator.BlazorInterop  by surgicalcoder


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/GoLive.Generator.BlazorInterop?label=GoLive.Generator.BlazorInterop)](https://www.nuget.org/packages/GoLive.Generator.BlazorInterop/)
[![GitHub last commit](https://img.shields.io/github/last-commit/surgicalcoder/BlazorInteropGenerator?label=updated)](https://github.com/surgicalcoder/BlazorInteropGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/surgicalcoder/BlazorInteropGenerator?style=social)

## Details

### Info
:::info

Name: **GoLive.Generator.BlazorInterop**

Generates strongly typed methods that interop into Javascript.

Author: surgicalcoder

NuGet: 
*https://www.nuget.org/packages/GoLive.Generator.BlazorInterop/*   


You can find more details at https://github.com/surgicalcoder/BlazorInteropGenerator

Source : https://github.com/surgicalcoder/BlazorInteropGenerator

:::

### Original Readme
:::note

# BlazorInteropGenerator
Generates Blazor -> Javascript strongly typed interop methods, by parsing the Javascript it self and generating extension methods for IJSRuntime.

## Usage

Firstly, add the project from Nuget - [GoLive.Generator.BlazorInterop](https://www.nuget.org/packages/GoLive.Generator.BlazorInterop/), then add an AdditionalFile in your .csproj named "BlazorInterop.json", like so:

```
<ItemGroup>
     <AdditionalFiles Include="BlazorInterop.json" />
</ItemGroup>
```

Once that's done, add the settings file and change as required:


```
{
  "Files": [
    {
      "Output": "JSInterop.cs",
      "Source": "wwwroot\\blazorinterop.js",
      "Namespace": "GoLive.Generator.BlazorInterop.Playground.Client",
      "ObjectToInterop": "window.blazorInterop",
      "Init": ["window={}"]
    }
  ],
  "InvokeVoidString": "await JSRuntime.InvokeVoidAsync(\"{0}\", {1});",
  "InvokeString": "return await JSRuntime.InvokeAsync of T (\"{0}\",{1});"
}

```

### Description of Each Option
- Files: An array of file objects specifying details of the files involved in the interop process.
  - Output: The name of the output C# file to be generated.
  - Source: The path to the source JavaScript file used for the interop.
  - Namespace: The namespace used in the generated C# file.
  - ObjectToInterop: The JavaScript object used for the interop. 
  - Init: An array of initialization scripts executed before the interop. In this example above, we are interop'ing to window.blazorInterop, and window doesn't exist, so we have to create it.
- InvokeVoidString: A template string for invoking a JavaScript function that does not return a value using JSRuntime.InvokeVoidAsync. Placeholders {0} and {1} are replaced with the function name and arguments, respectively.
- InvokeString: A template string for invoking a JavaScript function that returns a value using JSRuntime.InvokeAsync of T . Placeholders {0} and {1} are replaced with the function name and arguments, respectively.

:::

### About
:::note

Generating interop from C# to javascript for Blazor


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **GoLive.Generator.BlazorInterop**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="GoLive.Generator.BlazorInterop" Version="2.0.7">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="9.0.0-rc.2.24474.3" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="9.0.0-rc.2.24474.3" PrivateAssets="all" />
  </ItemGroup>
	
	<ItemGroup>
		<AdditionalFiles Include="BlazorInterop.json" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>


</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GoLive.Generator.BlazorInterop\src\MyTestBlazoe\BlazorInterop.json" label="BlazorInterop.json" >

  This is the use of **GoLive.Generator.BlazorInterop** in *BlazorInterop.json*

```csharp showLineNumbers 
{
  "Files": [
    {
      "Output_DeleteThis_ToHave_InYourProject": "JSInterop.cs",
      "ClassName": "JSInterop",
      "Source": "wwwroot\\blazorinterop.js",
      "Namespace": "GoLive.Generator.BlazorInterop.Playground.Client",
      "ObjectToInterop": "window.blazorInterop",
      "Init": ["window={}"]
    }
  ],
  "InvokeVoidString": "await JSRuntime.InvokeVoidAsync(\"{0}\", {1});",
  "InvokeString": "return await JSRuntime.InvokeAsync<T>(\"{0}\",{1});"
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GoLive.Generator.BlazorInterop\src\MyTestBlazoe\wwwroot\blazorinterop.js" label="blazorinterop.js" >

  This is the use of **GoLive.Generator.BlazorInterop** in *blazorinterop.js*

```csharp showLineNumbers 
window.blazorInterop = {
    showModal: function (dialogId) {
        window.alert('see after this the page title'+dialogId);
        return true;
    },
    setPageTitle: function(title) {
        document.title = title;
    },    
};
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GoLive.Generator.BlazorInterop\src\MyTestBlazoe\Pages\Home.razor" label="Home.razor" >

  This is the use of **GoLive.Generator.BlazorInterop** in *Home.razor*

```csharp showLineNumbers 
@page "/"

@inject IJSRuntime JS

<PageTitle>Home</PageTitle>

<h1>Hello, world!</h1>

Welcome to your new app.

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private async Task IncrementCount()
    {
        currentCount++;
        var res= await JS.showModalAsync<bool>(currentCount);
        await JS.setPageTitleVoidAsync($" after {currentCount}  the result is " + res);
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GoLive.Generator.BlazorInterop\src\MyTestBlazoe\wwwroot\index.html" label="index.html" >

  This is the use of **GoLive.Generator.BlazorInterop** in *index.html*

```csharp showLineNumbers 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyTestBlazoe</title>
    <base href="/" />
    <link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/app.css" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link href="MyTestBlazoe.styles.css" rel="stylesheet" />
    <script src="blazorinterop.js" ></script>
</head>

<body>
    <div id="app">
        <svg class="loading-progress">
            <circle r="40%" cx="50%" cy="50%" />
            <circle r="40%" cx="50%" cy="50%" />
        </svg>
        <div class="loading-progress-text"></div>
    </div>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="." class="reload">Reload</a>
        <span class="dismiss">🗙</span>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
</body>

</html>

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\GoLive.Generator.BlazorInterop\src\MyTestBlazoe\obj\GX\GoLive.Generator.BlazorInterop\GoLive.Generator.BlazorInterop.JSInteropGenerator\Generated.JSInterop.cs" label="Generated.JSInterop.cs" >


```csharp showLineNumbers 
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace GoLive.Generator.BlazorInterop.Playground.Client
{
    public static class JSInterop
    {
        public static string _window_blazorInterop_showModal => "window.blazorInterop.showModal";

        public static async Task showModalVoidAsync(this IJSRuntime JSRuntime, object @dialogId)
        {
            await JSRuntime.InvokeVoidAsync("window.blazorInterop.showModal", @dialogId);
        }

        public static async Task<T> showModalAsync<T>(this IJSRuntime JSRuntime, object @dialogId)
        {
            return await JSRuntime.InvokeAsync<T>("window.blazorInterop.showModal", @dialogId);
        }

        public static string _window_blazorInterop_setPageTitle => "window.blazorInterop.setPageTitle";

        public static async Task setPageTitleVoidAsync(this IJSRuntime JSRuntime, object @title)
        {
            await JSRuntime.InvokeVoidAsync("window.blazorInterop.setPageTitle", @title);
        }

        public static async Task<T> setPageTitleAsync<T>(this IJSRuntime JSRuntime, object @title)
        {
            return await JSRuntime.InvokeAsync<T>("window.blazorInterop.setPageTitle", @title);
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project GoLive.Generator.BlazorInterop ](/sources/GoLive.Generator.BlazorInterop.zip)

:::


### Share GoLive.Generator.BlazorInterop 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGoLive.Generator.BlazorInterop&quote=GoLive.Generator.BlazorInterop" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGoLive.Generator.BlazorInterop&text=GoLive.Generator.BlazorInterop:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGoLive.Generator.BlazorInterop" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGoLive.Generator.BlazorInterop&title=GoLive.Generator.BlazorInterop" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGoLive.Generator.BlazorInterop&title=GoLive.Generator.BlazorInterop&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FGoLive.Generator.BlazorInterop" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/GoLive.Generator.BlazorInterop

### In the same category (Blazor) - 1 other generators


#### [Blazorators](/docs/Blazorators)

