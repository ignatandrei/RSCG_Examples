---
sidebar_position: 1030
title: 103 - HangfireRecurringJob
description: Generating recurring jobs for Hangfire from class attribute
slug: /HangfireRecurringJob
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# HangfireRecurringJob  by Ieuan Walker


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/IeuanWalker.Hangfire.RecurringJob?label=IeuanWalker.Hangfire.RecurringJob)](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob/)
[![GitHub last commit](https://img.shields.io/github/last-commit/IeuanWalker/Hangfire.RecurringJob?label=updated)](https://github.com/IeuanWalker/Hangfire.RecurringJob)
![GitHub Repo stars](https://img.shields.io/github/stars/IeuanWalker/Hangfire.RecurringJob?style=social)

## Details

### Info
:::info

Name: **HangfireRecurringJob**

This is a package that automatically generates the hangfire recurring jobs AddOrUpdate code, using source generators.

Author: Ieuan Walker

NuGet: 
*https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob/*   


You can find more details at https://github.com/IeuanWalker/Hangfire.RecurringJob

Source : https://github.com/IeuanWalker/Hangfire.RecurringJob

:::

### Original Readme
:::note

# Hangfire.RecurringJob [![Nuget](https://img.shields.io/nuget/v/IeuanWalker.Hangfire.RecurringJob)](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob) [![Nuget](https://img.shields.io/nuget/dt/IeuanWalker.Hangfire.RecurringJob)](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob) 

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/IeuanWalker/Hangfire.RecurringJob/actions/workflows/build.yml/badge.svg)](https://github.com/IeuanWalker/Hangfire.RecurringJob/actions/workflows/build.yml)

Automatically generates the recurring job registration code using source generators

## How to use it?
1. Install the [NuGet package](https://www.nuget.org/packages/IeuanWalker.Hangfire.RecurringJob) into your project.
```
Install-Package IeuanWalker.Hangfire.RecurringJob
```

2. Add the `RecurringJob` attribute to a class, and create an `Execute()` method.
```csharp
[RecurringJob]
public class RecurringJob1
{
	public Task Execute()
	{
		throw new NotImplementedException();
	}
}

[RecurringJob("* * * *")]
public class RecurringJob2
{
	public void Execute()
	{
		throw new NotImplementedException();
	}
}

[RecurringJob("* * * *", "Priority")]
public class RecurringJob3
{
	public void Execute()
	{
		throw new NotImplementedException();
	}
}

[RecurringJob]
[RecurringJob("*/5 * * * *", "GMT", "Priority", "DataRetention")]
public class RecurringJob4
{
	public void Execute()
	{
		throw new NotImplementedException();
	}
}
```
3. Register the recurring jobs
> Once a `RecurringJob` attribute has been added to a class in your project an extension method for `IApplicationBuilder` will automatically be created.
> The extension method name convention is AddRecurringJobsFrom + your assembly name.
```csharp
app.AddRecurringJobsFromExampleProject();
```

## Example
Here is an example of what it looks like in use - 
> Left is the example code, and right is the generated code

![image](https://github.com/IeuanWalker/Hangfire.RecurringJob.Generator/assets/6544051/cef12771-5178-46cf-9264-dbb54654efc6)




:::

### About
:::note

Generating recurring jobs for Hangfire from class attribute


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **HangfireRecurringJob**
```xml showLineNumbers {16}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Hangfire.AspNetCore" Version="1.8.9" />
    <PackageReference Include="Hangfire.Core" Version="1.8.9" />
    <PackageReference Include="Hangfire.InMemory" Version="0.7.0" />
    <!--<PackageReference Include="Hangfire.MemoryStorage" Version="1.8.0" />-->
    <PackageReference Include="Hangfire.SqlServer" Version="1.8.9" />
    <PackageReference Include="IeuanWalker.Hangfire.RecurringJob" Version="1.0.1" />
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.1" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HangfireRecurringJob\src\HangFireRec\MyNewJob.cs" label="MyNewJob.cs" >

  This is the use of **HangfireRecurringJob** in *MyNewJob.cs*

```csharp showLineNumbers 
using IeuanWalker.Hangfire.RecurringJob.Attributes;

namespace HangFireRec;
[RecurringJob("*/1 * * * *")]
public class MyNewJob
{
    public async Task Execute()
    {
       await Task.Delay(1000);
        Console.WriteLine("Hello from recurring job hangfire");
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HangfireRecurringJob\src\HangFireRec\Program.cs" label="Program.cs" >

  This is the use of **HangfireRecurringJob** in *Program.cs*

```csharp showLineNumbers 
using Hangfire;
//using Hangfire.MemoryStorage;
using HangFireRec;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHangfire(it =>
{
    it.UseInMemoryStorage();
    
});
builder.Services.AddHangfireServer(opt =>
{
    //config.UseMemoryStorage();
});
//GlobalConfiguration.Configuration.UseInMemoryStorage();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHangfireDashboard();
//app.UseHangfireServer();

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
BackgroundJob.Enqueue(() =>Console.WriteLine("Hello from hangfire"));
RecurringJob.AddOrUpdate(() => Console.WriteLine("Hello from hangfire"), Cron.Minutely());
app.AddRecurringJobsFromHangFireRec();
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\HangfireRecurringJob\src\HangFireRec\obj\GX\IeuanWalker.Hangfire.RecurringJob.Generator\IeuanWalker.Hangfire.RecurringJob.Generator.RecuringJobGenerator\RecurringJobRegistrationExtensions.g.cs" label="RecurringJobRegistrationExtensions.g.cs" >


```csharp showLineNumbers 
namespace HangFireRec;

// <auto-generated/>

using Hangfire;
using Microsoft.AspNetCore.Builder;

public static class RecurringJobRegistrationExtensions
{
	public static IApplicationBuilder AddRecurringJobsFromHangFireRec(this IApplicationBuilder app)
	{
		RecurringJob.AddOrUpdate<HangFireRec.MyNewJob>("MyNewJob", "default", x => x.Execute(), "*/1 * * * *", new RecurringJobOptions
		{
			TimeZone = TimeZoneInfo.FindSystemTimeZoneById("UTC")
		});

		return app;
	}
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project HangfireRecurringJob ](/sources/HangfireRecurringJob.zip)

:::


### Share HangfireRecurringJob 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHangfireRecurringJob&quote=HangfireRecurringJob" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHangfireRecurringJob&text=HangfireRecurringJob:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHangfireRecurringJob" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHangfireRecurringJob&title=HangfireRecurringJob" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHangfireRecurringJob&title=HangfireRecurringJob&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FHangfireRecurringJob" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/HangfireRecurringJob

### In the same category (Hangfire) - 0 other generators

