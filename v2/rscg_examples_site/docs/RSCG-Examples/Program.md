---
sidebar_position: 2370
title: 237 - Program
description: Generating Program.cs class for testing purposes
slug: /Program
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnhancementClass.mdx';

# Program  by Microsoft


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Microsoft.AspNetCore.OpenApi?label=Microsoft.AspNetCore.OpenApi)](https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi)
[![GitHub last commit](https://img.shields.io/github/last-commit/dotnet/aspnetcore?label=updated)](https://github.com/dotnet/aspnetcore/)
![GitHub Repo stars](https://img.shields.io/github/stars/dotnet/aspnetcore?style=social)

## Details

### Info
:::info

Name: **Program**

Provides APIs for annotating route handler endpoints in ASP.NET Core with OpenAPI annotations.

This package was built from the source code at https://github.com/dotnet/aspnetcore/tree/e77cb01b5529c137130757859f09f892dbdd2436

Author: Microsoft

NuGet: 
*https://www.nuget.org/packages/Microsoft.AspNetCore.OpenApi*   


You can find more details at https://github.com/dotnet/aspnetcore/blob/70d851104f739fb906aabcd6a07c0935ce2549c9/src/Framework/AspNetCoreAnalyzers/src/SourceGenerators/PublicTopLevelProgramGenerator.cs#L11

Source: https://github.com/dotnet/aspnetcore/

:::

### Author
:::note
Microsoft 
![Alt text](https://github.com/dotnet.png)
:::

### Original Readme
:::note

ASP.NET Core
============

[![.NET Foundation](https://img.shields.io/badge/.NET%20Foundation-blueviolet.svg)](https://www.dotnetfoundation.org/)
[![MIT License](https://img.shields.io/github/license/dotnet/aspnetcore?color=%230b0&style=flat-square)](https://github.com/dotnet/aspnetcore/blob/main/LICENSE.txt) [![Help Wanted](https://img.shields.io/github/issues/dotnet/aspnetcore/help%20wanted?color=%232EA043&label=help%20wanted&style=flat-square)](https://github.com/dotnet/aspnetcore/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) [![Good First Issues](https://img.shields.io/github/issues/dotnet/aspnetcore/good%20first%20issue?color=%23512BD4&label=good%20first%20issue&style=flat-square)](https://github.com/dotnet/aspnetcore/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
[![Discord](https://img.shields.io/discord/732297728826277939?style=flat-square&label=Discord&logo=discord&logoColor=white&color=7289DA)](https://aka.ms/dotnet-discord)

ASP.NET Core is an open-source and cross-platform framework for building modern cloud-based internet-connected applications, such as web apps, IoT apps, and mobile backends. ASP.NET Core apps run on [.NET](https://dot.net), a free, cross-platform, and open-source application runtime. It was architected to provide an optimized development framework for apps that are deployed to the cloud or run on-premises. It consists of modular components with minimal overhead, so you retain flexibility while constructing your solutions. You can develop and run your ASP.NET Core apps cross-platform on Windows, Mac, and Linux. [Learn more about ASP.NET Core](https://learn.microsoft.com/aspnet/core/).

## Get started

Follow the [Getting Started](https://learn.microsoft.com/aspnet/core/getting-started) instructions.

Also check out the [.NET Homepage](https://www.microsoft.com/net) for released versions of .NET, getting started guides, and learning resources.

See the [Triage Process](https://github.com/dotnet/aspnetcore/blob/main/docs/TriageProcess.md) document for more information on how we handle incoming issues.

## How to engage, contribute, and give feedback

Some of the best ways to contribute are to try things out, file issues, join in design conversations,
and make pull-requests.

* [Download our latest daily builds](./docs/DailyBuilds.md)
* Follow along with the development of ASP.NET Core:
    * [Community Standup](https://live.asp.net): The community standup is held every week and streamed live on YouTube. You can view past standups in the linked playlist.
    * [Roadmap](https://aka.ms/aspnet/roadmap): The schedule and milestone themes for ASP.NET Core.
* [Build ASP.NET Core source code](./docs/BuildFromSource.md)
* Check out the [contributing](CONTRIBUTING.md) page to see the best places to log issues and start discussions.

## Reporting security issues and bugs

Security issues and bugs should be reported privately to the Microsoft Security Response Center (MSRC) via the [MSRC Researcher Portal](https://msrc.microsoft.com/report/vulnerability/new). You should receive a response within 24 hours. Further information can be found in the [MSRC Report an Issue FAQ](https://www.microsoft.com/msrc/faqs-report-an-issue). You can also find these instructions in this repo's [Security doc](SECURITY.md).

Also see info about related [Microsoft .NET Bounty Program](https://www.microsoft.com/msrc/bounty-dot-net-core).

## Related projects

These are some other repos for related projects:

* [Documentation](https://github.com/aspnet/Docs) - documentation sources for https://learn.microsoft.com/aspnet/core/
* [Entity Framework Core](https://github.com/dotnet/efcore) - data access technology
* [Runtime](https://github.com/dotnet/runtime) - cross-platform runtime for cloud, mobile, desktop, and IoT apps
* [Razor](https://github.com/dotnet/razor) - the Razor compiler and tooling for working with Razor syntax (.cshtml, .razor)

## Code of conduct

See [CODE-OF-CONDUCT](./CODE-OF-CONDUCT.md)

## Nightly builds

This table includes links to download the latest builds of the ASP.NET Core Shared Framework. Also included are links to download the Windows Hosting Bundle, which includes the ASP.NET Core Shared Framework, the .NET Runtime Shared Framework, and the IIS plugin (ASP.NET Core Module). You can download the latest .NET Runtime builds [here](https://github.com/dotnet/runtime/blob/main/docs/project/dogfooding.md#nightly-builds-table), and the latest .NET SDK builds [here](https://github.com/dotnet/installer#table). **If you're unsure what you need, then install the SDK; it has everything except the IIS plugin.**

| Platform | Shared Framework (Installer) | Shared Framework (Binaries) | Hosting Bundle (Installer) |
| :--------- | :----------: | :----------: | :----------: |
| **Windows x64** | [Installer](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-win-x64.exe) | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-win-x64.zip) | [Installer](https://aka.ms/dotnet/10.0/daily/dotnet-hosting-win.exe) |
| **Windows x86** | [Installer](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-win-x86.exe) | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-win-x86.zip) | [Installer](https://aka.ms/dotnet/10.0/daily/dotnet-hosting-win.exe) |
| **Windows arm64** | [Installer](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-win-arm64.exe) | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-win-arm64.zip) | [Installer](https://aka.ms/dotnet/10.0/daily/dotnet-hosting-win.exe) |
| **macOS x64** | **N/A** | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-osx-x64.tar.gz) | **N/A** |
| **macOS arm64** | **N/A** | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-osx-arm64.tar.gz) | **N/A** |
| **Linux x64** | [Deb Installer](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-x64.deb) - [RPM Installer](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-x64.rpm) | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-linux-x64.tar.gz) | **N/A** |
| **Linux arm** | **N/A** | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-linux-arm.tar.gz) | **N/A** |
| **Linux arm64** | [RPM Installer](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-aarch64.rpm) | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-linux-arm64.tar.gz) | **N/A** |
| **Linux-musl-x64** | **N/A** | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-linux-musl-x64.tar.gz) | **N/A** |
| **Linux-musl-arm** | **N/A** | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-linux-musl-arm.tar.gz) | **N/A** |
| **Linux-musl-arm64** | **N/A** | [Binaries](https://aka.ms/dotnet/10.0/daily/aspnetcore-runtime-linux-musl-arm64.tar.gz) | **N/A** |


:::

### About
:::note

Generating Program.cs class for testing purposes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Program**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
    <PublishAot>true</PublishAot>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Program\src\TestProgram\Program.cs" label="Program.cs" >

  This is the use of **Program** in *Program.cs*

```csharp showLineNumbers 
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

Todo[] sampleTodos =
[
    new(1, "Walk the dog"),
    new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
    new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
    new(4, "Clean the bathroom"),
    new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
];

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos)
        .WithName("GetTodos");

todosApi.MapGet("/{id}", Results<Ok<Todo>, NotFound> (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is \{ \} todo
        ? TypedResults.Ok(todo)
        : TypedResults.NotFound())
    .WithName("GetTodoById");

app.Run();

public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);

[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Program\src\TestProgram\obj\GX\Microsoft.AspNetCore.App.SourceGenerators\Microsoft.AspNetCore.SourceGenerators.PublicProgramSourceGenerator\PublicTopLevelProgram.Generated.g.cs" label="PublicTopLevelProgram.Generated.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
/// <summary>
/// Auto-generated public partial Program class for top-level statement apps.
/// </summary>
public partial class Program \{ }
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Program ](/sources/Program.zip)

:::


### Share Program 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProgram&quote=Program" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProgram&text=Program:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProgram" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProgram&title=Program" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProgram&title=Program&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FProgram" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Program

<SameCategory />

