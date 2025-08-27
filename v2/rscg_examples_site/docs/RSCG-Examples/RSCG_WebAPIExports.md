---
sidebar_position: 530
title: 53 - RSCG_WebAPIExports
description: Generating Excel from WebAPI json array
slug: /RSCG_WebAPIExports
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAPI.mdx';

# RSCG_WebAPIExports  by Andrei Ignat


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/RSCG_WebAPIExports?label=RSCG_WebAPIExports)](https://www.nuget.org/packages/RSCG_WebAPIExports/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_WebAPIExports?label=updated)](https://github.com/ignatandrei/RSCG_WebAPIExports/)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_WebAPIExports?style=social)

## Details

### Info
:::info

Name: **RSCG_WebAPIExports**

Add Excel export to your WebAPI

Author: Andrei Ignat

NuGet: 
*https://www.nuget.org/packages/RSCG_WebAPIExports/*   


You can find more details at https://github.com/ignatandrei/RSCG_WebAPIExports/

Source: https://github.com/ignatandrei/RSCG_WebAPIExports/

:::

### Original Readme
:::note

[![RSCG_WebAPIExports](https://img.shields.io/nuget/v/RSCG_WebAPIExports?label=RSCG_WebAPIExports)](https://www.nuget.org/packages/RSCG_WebAPIExports/)

# RSCG_WebAPIExports

Add exports to file to WebAPI ( for the moment, just Excel / xlsx)



## How to use in WebAPI project


Add reference to the package in the .csproj
```xml
<PackageReference Include="RSCG_WebAPIExports" Version="2023.8.16.1255" OutputItemType="Analyzer" ReferenceOutputAssembly="true"  />
<!--
<PackageReference Include="RSCG_WebAPIExports" Version="2023.8.16.1255" OutputItemType="Analyzer" ReferenceOutputAssembly="true"  />
<PackageReference Include="ArrayToExcel" Version="2.2.2" />
-->
```

Then in the WebAPI add
```csharp
using WebApiExportToFile;
//code
// Add services to the container.
//WebApiExportToFile.AddExport(builder.Services);
builder.Services.AddExport();
var app = builder.Build();
app.UseExport();

```

Add to any url : .xlsx ( e.g. for /WeatherForecast put /WeatherForecast.xlsx ) and the excel will be 

downloaded


:::

### About
:::note

Generating Excel from WebAPI json array


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_WebAPIExports**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="7.0.10" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
	<PackageReference Include="RSCG_WebAPIExports" Version="2023.8.16.1255" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
	<PackageReference Include="ArrayToExcel" Version="2.2.2" />

  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_WebAPIExports\src\RSCG_WebAPIExportsDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_WebAPIExports** in *Program.cs*

```csharp showLineNumbers 
using RSCG_WebAPIExportsDemo;
using WebApiExportToFile;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExport();
var app = builder.Build();
app.UseExport();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(ct =>
    {
        ct.DocumentTitle = "try /WeatherForecast.xlsx";
        ct.HeadContent = "try /WeatherForecast.xlsx";
    });
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_WebAPIExports\src\RSCG_WebAPIExportsDemo\Controllers\WeatherForecastController.cs" label="WeatherForecastController.cs" >

  This is the use of **RSCG_WebAPIExports** in *WeatherForecastController.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Mvc;

namespace RSCG_WebAPIExportsDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_WebAPIExports\src\RSCG_WebAPIExportsDemo\obj\GX\RSCG_APIExport\RSCG_APIExport.GenerateExportForWebAPI\Extensions.g.cs" label="Extensions.g.cs" >


```csharp showLineNumbers 
using Microsoft.AspNetCore.Rewrite;
namespace WebApiExportToFile;
#nullable enable
public static partial class Extensions
{
    static partial  void AddReturnTypesFromGenerator();
    public static IServiceCollection AddExport(this IServiceCollection services, params Type[]? typesReturnedByActions)
    {
        AddReturnTypesFromGenerator();
        //MiddlewareExportToFile.AddReturnType(typeof(Person[]));
        //MiddlewareExportToFile.AddReturnType(typeof(WeatherForecast[]));
        MiddlewareExportToFile.AddReturnTypes(typesReturnedByActions);

        return services.AddSingleton<MiddlewareExportToFile>();
    }
    public static IApplicationBuilder UseExport(this IApplicationBuilder app)
    {
        app.UseMiddleware<MiddlewareExportToFile>();
        var options = new RewriteOptions().Add(MiddlewareExportToFile.RewriteExtNeeded);
        app.UseRewriter(options);
        return app;
    }
}

#nullable disable
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_WebAPIExports\src\RSCG_WebAPIExportsDemo\obj\GX\RSCG_APIExport\RSCG_APIExport.GenerateExportForWebAPI\middlewareExport.methods.g.cs" label="middlewareExport.methods.g.cs" >


```csharp showLineNumbers 
namespace WebApiExportToFile;

public static partial class Extensions
{
   static partial  void AddReturnTypesFromGenerator(){
       MiddlewareExportToFile.AddReturnType(typeof(RSCG_WebAPIExportsDemo.WeatherForecast[])); 
   }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RSCG_WebAPIExports\src\RSCG_WebAPIExportsDemo\obj\GX\RSCG_APIExport\RSCG_APIExport.GenerateExportForWebAPI\MiddlewareExportToFile.g.cs" label="MiddlewareExportToFile.g.cs" >


```csharp showLineNumbers 
using System.IO;
using System.Text;
using System;
using Microsoft.AspNetCore.Rewrite;
using System.Text.Json;
using ArrayToExcel;
using System.Text.Json.Serialization.Metadata;
using System.Runtime.CompilerServices;
#nullable enable
namespace WebApiExportToFile;
public class MiddlewareExportToFile : IMiddleware
{
    private static List<Type> types = new(); 
    static readonly string[] Extensions = new string[1] { ".xlsx" };
    static string key = "Export";
    public static void AddReturnTypes(params Type[]? typesReturnedByActions)
    {
        if (typesReturnedByActions?.Length > 0)
        {
            foreach (var type in typesReturnedByActions)
            {
                AddReturnType(type);
            }
        }
    }
    public static void AddReturnType(Type type)
    {
        types.Add(type);
    }
    public static void RewriteExtNeeded(RewriteContext context)
    {
        var request = context.HttpContext.Request;
        if (!(context.HttpContext.Items.ContainsKey(key) && context.HttpContext.Items[key]?.ToString() == "1"))
        {
            return;
        }
        var ext = Path.GetExtension(request.Path.Value);
        if (string.IsNullOrWhiteSpace(ext)) return;
        request.Path = request.Path.Value!.Substring(0, request.Path.Value.Length - ext.Length);

    }
    public bool ShouldIntercept(HttpContext context)
    {
        string path = context.Request.Path;
        var ext = Path.GetExtension(path);
        if (string.IsNullOrWhiteSpace(ext)) return false;
        if (!Extensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) return false;
        return true;
    }
    //https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/migrate-from-newtonsoft
    static void AddMissingMemberHandling(JsonTypeInfo typeInfo)
    {
        if (typeInfo.Kind == JsonTypeInfoKind.Object &&
            typeInfo.Properties.All(prop => !prop.IsExtensionData) &&
            typeInfo.OnDeserialized is null)
        {
            // Dynamically attach dictionaries to deserialized objects.
            var cwt = new ConditionalWeakTable<object, Dictionary<string, object>>();

            JsonPropertyInfo propertyInfo =
                typeInfo.CreateJsonPropertyInfo(typeof(Dictionary<string, object>), "__extensionDataAttribute");
            propertyInfo.Get = obj => cwt.TryGetValue(obj, out Dictionary<string, object>? value) ? value : null;
            propertyInfo.Set = (obj, value) => cwt.Add(obj, (Dictionary<string, object>)value!);
            propertyInfo.IsExtensionData = true;
            typeInfo.Properties.Add(propertyInfo);
            typeInfo.OnDeserialized = obj =>
            {
                if (cwt.TryGetValue(obj, out Dictionary<string, object>? dict))
                {
                    cwt.Remove(obj);
                    throw new JsonException($"JSON properties {String.Join(", ", dict.Keys)} " +
                        $"could not bind to any members of type {typeInfo.Type}");
                }
            };
        }
    }
    public object[]? StrongDeserialize(string responseContent)
    {
        if(types.Count() == 0) throw new Exception("please add some types");
        foreach( var type in types)
        {
            try
            {
                var data = JsonSerializer.Deserialize(responseContent, type, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    TypeInfoResolver = new DefaultJsonTypeInfoResolver
                    {
                        Modifiers = { AddMissingMemberHandling }
                    }
                }) as object[];
                return data;
            }
            catch(JsonException)
            {
                //do nothing 
                
            }
            
        }
        throw new Exception("no type can deserialize " +responseContent);

    }
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (!ShouldIntercept(context))
        {
            await next(context);
            return;
        }
        var ext=Path.GetExtension(context.Request.Path.Value);
        var nameFile = context.Request.Path.Value?.Replace("/", "_");
        context.Items["Export"] = "1";
        var originalResponseBody = context.Response.Body;
        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;
        context.Response.Headers.Add("Content-Disposition", $"attachment; filename={nameFile}");
        await next(context);
        memoryStream.Seek(0, SeekOrigin.Begin);
        var responseContent = await new StreamReader(memoryStream).ReadToEndAsync();
        context.Response.Body = originalResponseBody;

        var data = StrongDeserialize(responseContent);
        ArgumentNullException.ThrowIfNull(data);
        using var excelStream = data.ToExcelStream();
        await excelStream.CopyToAsync(context.Response.Body);

        // No need to call the next middleware since the generated content has been sent
        return;
    }
    
}    

#nullable disable
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project RSCG_WebAPIExports ](/sources/RSCG_WebAPIExports.zip)

:::


### Share RSCG_WebAPIExports 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_WebAPIExports&quote=RSCG_WebAPIExports" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_WebAPIExports&text=RSCG_WebAPIExports:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_WebAPIExports" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_WebAPIExports&title=RSCG_WebAPIExports" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_WebAPIExports&title=RSCG_WebAPIExports&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_WebAPIExports" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_WebAPIExports

aaa
<SameCategory />

