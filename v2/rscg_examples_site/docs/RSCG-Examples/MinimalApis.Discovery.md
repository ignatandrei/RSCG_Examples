---
sidebar_position: 1360
title: 136 - MinimalApis.Discovery
description: Controller like API registering
slug: /MinimalApis.Discovery
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAPI.mdx';

# MinimalApis.Discovery  by Shawn Wildermuth


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/MinimalApis.Discovery?label=MinimalApis.Discovery)](https://www.nuget.org/packages/MinimalApis.Discovery/)
[![GitHub last commit](https://img.shields.io/github/last-commit/shawnwildermuth/MinimalApis?label=updated)](https://github.com/shawnwildermuth/MinimalApis)
![GitHub Repo stars](https://img.shields.io/github/stars/shawnwildermuth/MinimalApis?style=social)

## Details

### Info
:::info

Name: **MinimalApis.Discovery**

A utility library to allow for structuring Minimal APIs and registering them via source generator.

Author: Shawn Wildermuth

NuGet: 
*https://www.nuget.org/packages/MinimalApis.Discovery/*   


You can find more details at https://github.com/shawnwildermuth/MinimalApis

Source: https://github.com/shawnwildermuth/MinimalApis

:::

### Original Readme
:::note

# Minimal API Tools

This is the home of a set of tools that I've created for Minimal APIs. These include:

- [MinimalApis.Discovery](https://github.com/shawnwildermuth/MinimalApis/MinimalApis.Discovery.md) - A tool for organizing your Minimal APIs
- [MinimalApis.FluentValidation](https://github.com/shawnwildermuth/MinimalApis/MinimalApis.FluentValidation.md) - Endpoint filter for more easily tying Validators to specific Minimal API Endpoints.


:::

### About
:::note

Controller like API registering


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **MinimalApis.Discovery**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.4" />
    <PackageReference Include="MinimalApis.Discovery" Version="1.0.7" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApis.Discovery\src\APIDemo\PersonAPI.cs" label="PersonAPI.cs" >

  This is the use of **MinimalApis.Discovery** in *PersonAPI.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Http.HttpResults;
using MinimalApis.Discovery;
namespace APIDemo;

public class PersonAPI : IApi
{
    public void Register(IEndpointRouteBuilder builder)
    {
        var grp = builder.MapGroup("/api/Person");
        grp.MapGet("", GetFromId);
        grp.MapGet("{id:int}", GetFromId);
        //todo: add more routes
    }
    public static async Task<Person[]> GetAll()
    {       
        await Task.Delay(1000);
        return new[] { new Person { FirstName = "Ignat", LastName = "Andrei" } };
    }

    public static async Task<Results<Ok<Person>,NotFound<string>>> GetFromId(int id)
    {
        await Task.Delay(1000);
        if (id == 1)
        {
            return TypedResults.Ok<Person>(new Person { FirstName = "Ignat", LastName = "Andrei" });
        }
        return TypedResults.NotFound<string>("Person not found");
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApis.Discovery\src\APIDemo\Person.cs" label="Person.cs" >

  This is the use of **MinimalApis.Discovery** in *Person.cs*

```csharp showLineNumbers 
namespace APIDemo;

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApis.Discovery\src\APIDemo\Program.cs" label="Program.cs" >

  This is the use of **MinimalApis.Discovery** in *Program.cs*

```csharp showLineNumbers 
using MinimalApis.Discovery;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapApis();

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\MinimalApis.Discovery\src\APIDemo\obj\GX\MinimalApis.Discovery.Generator\MinimalApis.Discovery.Generator.MapApiGenerator\MinimalApiDiscovery.g.cs" label="MinimalApiDiscovery.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>
using System;
using Microsoft.AspNetCore.Builder;

namespace MinimalApis.Discovery
{
  public static class MinimalApisDiscoveryGeneratedExtensions
  {
    public static WebApplication MapApis(this WebApplication app)
    {
      // Call Register on all classes that implement IApi
      new global::APIDemo.PersonAPI().Register(app);
      return app;
    }
  }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project MinimalApis.Discovery ](/sources/MinimalApis.Discovery.zip)

:::


### Share MinimalApis.Discovery 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApis.Discovery&quote=MinimalApis.Discovery" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApis.Discovery&text=MinimalApis.Discovery:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApis.Discovery" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApis.Discovery&title=MinimalApis.Discovery" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApis.Discovery&title=MinimalApis.Discovery&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FMinimalApis.Discovery" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/MinimalApis.Discovery

aaa
<SameCategory />

