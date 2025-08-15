---
sidebar_position: 780
title: 78 - MinimalApiBuilder
description: Generate Minimal API from classes
slug: /MinimalApiBuilder
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# MinimalApiBuilder  by 


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MinimalApiBuilder?label=MinimalApiBuilder)](https://www.nuget.org/packages/MinimalApiBuilder/)
[![GitHub last commit](https://img.shields.io/github/last-commit/JensDll/MinimalApiBuilder?label=updated)](https://github.com/JensDll/MinimalApiBuilder)
![GitHub Repo stars](https://img.shields.io/github/stars/JensDll/MinimalApiBuilder?style=social)

## Details

### Info
:::info

Name: **MinimalApiBuilder**

Reflectionless, source-generated, thin abstraction layer over the ASP.NET Core Minimal APIs
      interface

Author: 

NuGet: 
*https://www.nuget.org/packages/MinimalApiBuilder/*   


You can find more details at https://github.com/JensDll/MinimalApiBuilder

Source: https://github.com/JensDll/MinimalApiBuilder

:::

### Original Readme
:::note

# MinimalApiBuilder

[![nuget](https://badgen.net/nuget/v/MinimalApiBuilder)](https://www.nuget.org/packages/MinimalApiBuilder)

Reflectionless, source-generated, thin abstraction layer over
the [ASP.NET Core Minimal APIs](https://learn.microsoft.com/en-gb/aspnet/core/fundamentals/minimal-apis/overview)
interface.

## How to Use

Based on the Vertical Slice Architecture with `Feature` folder.
There is one class for every API endpoint. A basic example looks like the following:

```csharp
using Microsoft.AspNetCore.Mvc;
using MinimalApiBuilder;

public partial class BasicEndpoint : MinimalApiBuilderEndpoint
{
    private static string Handle([FromServices] BasicEndpoint endpoint)
    {
        return "Hello, World!";
    }
}
```

The endpoint class must be `partial`, inherit from `MinimalApiBuilderEndpoint`,
and have a `Handle` or `HandleAsync` method with the containing type passed
from dependency injection.
The endpoint is mapped through the typical `IEndpointRouteBuilder` `Map<Verb>` extension methods:

```csharp
app.MapGet<BasicEndpoint>("/hello");
```

The above is functionally equivalent to:

```csharp
app.MapGet("/hello", static () => "Hello, World!");
```

This library depends on [`FluentValidation >= 11`](https://github.com/FluentValidation/FluentValidation). An endpoint can have a validated request object:

```csharp
public struct BasicRequest
{
    public required string Name { get; init; }
}

public partial class BasicRequestEndpoint : MinimalApiBuilderEndpoint
{
    private static string Handle([FromServices] BasicRequestEndpoint endpoint,
        [AsParameters] BasicRequest request)
    {
        return $"Hello, {request.Name}!";
    }
}

public class BasicRequestValidator : AbstractValidator<BasicRequest>
{
    public BasicRequestValidator()
    {
        RuleFor(static request => request.Name).MinimumLength(2);
    }
}
```

```csharp
app.MapGet<BasicRequestEndpoint>("/hello/{name}");
```

The incremental generator will generate code to validate the request object before the handler is called and return a `400 Bad Request` response if the validation fails.
In `Program.cs` the below

```csharp
builder.Services.AddMinimalApiBuilderEndpoints();
```

needs to be added to register the necessary types with dependency injection.


:::

### About
:::note

Generate Minimal API from classes


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MinimalApiBuilder**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="7.0.12" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
	  <PackageReference Include="MinimalApiBuilder" Version="1.3.3" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApiBuilder\src\DemoApi\Program.cs" label="Program.cs" >

  This is the use of **MinimalApiBuilder** in *Program.cs*

```csharp showLineNumbers 
using MinimalApiBuilder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//MinimalApiBuilder.DependencyInjection.AddMinimalApiBuilderEndpoints(builder.Services);
builder.Services.AddMinimalApiBuilderEndpoints();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapGet<BasicEndpoint>("/hello");
app.Run();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApiBuilder\src\DemoApi\BasicEndpoint.cs" label="BasicEndpoint.cs" >

  This is the use of **MinimalApiBuilder** in *BasicEndpoint.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Mvc;
using MinimalApiBuilder;

public partial class BasicEndpoint : MinimalApiBuilderEndpoint
{
    private static string Handle([FromServices] BasicEndpoint endpoint)
    {
        return "Hello, World!";
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApiBuilder\src\DemoApi\obj\GX\MinimalApiBuilder.Generator\MinimalApiBuilder.Generator.MinimalApiBuilderGenerator\DependencyInjection.g.cs" label="DependencyInjection.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This is a MinimalApiBuilder source generated file.
// </auto-generated>

#nullable enable

namespace MinimalApiBuilder
{
    public static class DependencyInjection
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]
        public static global::Microsoft.Extensions.DependencyInjection.IServiceCollection AddMinimalApiBuilderEndpoints(this global::Microsoft.Extensions.DependencyInjection.IServiceCollection services)
        {
            global::Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped<global::BasicEndpoint>(services);
            return services;
        }
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApiBuilder\src\DemoApi\obj\GX\MinimalApiBuilder.Generator\MinimalApiBuilder.Generator.MinimalApiBuilderGenerator\Endpoint.g.cs" label="Endpoint.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
// This is a MinimalApiBuilder source generated file.
// </auto-generated>

#nullable enable

public partial class BasicEndpoint : global::MinimalApiBuilder.IEndpoint
{
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]
    public static global::System.Delegate _auto_generated_Handler { get; } = Handle;
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]
    public static void _auto_generated_Configure(global::Microsoft.AspNetCore.Builder.RouteHandlerBuilder builder)
    {
    }
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("MinimalApiBuilder.Generator", "1.3.3.0")]
    public static void Configure(global::Microsoft.AspNetCore.Builder.RouteHandlerBuilder builder)
    {
    }
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project MinimalApiBuilder ](/sources/MinimalApiBuilder.zip)

:::


### Share MinimalApiBuilder 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&quote=MinimalApiBuilder" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&text=MinimalApiBuilder:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&title=MinimalApiBuilder" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder&title=MinimalApiBuilder&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApiBuilder" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MinimalApiBuilder

### In the same category (API) - 9 other generators


#### [immediate.apis](/docs/immediate.apis)


#### [Microsoft.Extensions.Configuration.Binder](/docs/Microsoft.Extensions.Configuration.Binder)


#### [MinimalApis.Discovery](/docs/MinimalApis.Discovery)


#### [MinimalHelpers.Routing.Analyzers](/docs/MinimalHelpers.Routing.Analyzers)


#### [RDG](/docs/RDG)


#### [Refit](/docs/Refit)


#### [RSCG_WebAPIExports](/docs/RSCG_WebAPIExports)


#### [SafeRouting](/docs/SafeRouting)


#### [SkinnyControllersCommon](/docs/SkinnyControllersCommon)

