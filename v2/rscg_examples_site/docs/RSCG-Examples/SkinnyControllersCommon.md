---
sidebar_position: 60
title: 06 - SkinnyControllersCommon
description: Automatically add controllers actions for any class injected in constructor
slug: /SkinnyControllersCommon
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# SkinnyControllersCommon  by Ignat Andrei


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/SkinnyControllersCommon?label=SkinnyControllersCommon)](https://www.nuget.org/packages/SkinnyControllersCommon)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/SkinnyControllersGenerator?label=updated)](https://github.com/ignatandrei/SkinnyControllersGenerator/)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/SkinnyControllersGenerator?style=social)

## Details

### Info
:::info

Name: **SkinnyControllersCommon**

** C# 9.0 ONLY **

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/SkinnyControllersCommon*   


You can find more details at https://github.com/ignatandrei/SkinnyControllersGenerator/

Source : https://github.com/ignatandrei/SkinnyControllersGenerator/

:::

### Original Readme
:::note

# SkinnyControllersGenerator


SkinnyControllers generates controller action for each field of your controller 

How to install SkinnyControllers  in a .NET Core 5 WebAPI / MVC application
Step 1:

Install https://www.nuget.org/packages/SkinnyControllersGenerator/ 


Step 2:

Install https://www.nuget.org/packages/SkinnyControllersCommon/


Step 3:

Add a field to your action either via DI, either directly

    [ApiController]
    [Route("[controller]/[action]")]
    public partial class WeatherForecastController : ControllerBase
    {

        private readonly RepositoryWF repository;
        
        public WeatherForecastController(RepositoryWF repository)
        {
            this.repository = repository;            
            //or make
			//this.repository=new RepositoryWF();
        }

		

Step 4:

	Add partial declaration and decorate your controller with 

	[AutoActions(template = TemplateIndicator.AllPost,FieldsName =new[] { "*" }, ExcludeFields =new[]{"_logger"})]
    [ApiController]
    [Route("[controller]/[action]")]
    public partial class WeatherForecastController : ControllerBase

You can choose your template from 
1. All Post
2. Get - if not arguments, POST else
3. Rest action

You can add your template in 2 ways:
//if custom template , hte name must end in controller.txt
1. [AutoActions(template = TemplateIndicator.CustomTemplateFile, FieldsName = new[] { "*" } ,CustomTemplateFileName = "Controllers\\CustomTemplate1.controller.txt")]

2. For creating new generic templates, please PR to https://github.com/ignatandrei/SkinnyControllersGenerator

That's all!


Usual problems:

1.  error CS0260: Missing partial modifier on declaration of type 

Answer:

Did you put partial on the controller declaration ? 

public partial class 


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)


:::

### About
:::note

Automatically add controllers actions for any class injected in constructor


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SkinnyControllersCommon**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="SkinnyControllersCommon" Version="2023.5.14.2055" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.2.3" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\SkinnyControllersCommon\src\SkinnyControllersDemo\Program.cs" label="Program.cs" >

  This is the use of **SkinnyControllersCommon** in *Program.cs*

```csharp showLineNumbers 
using SkinnyControllersDemo.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<WeatherActions>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\SkinnyControllersCommon\src\SkinnyControllersDemo\Controllers\WeatherForecastController.cs" label="WeatherForecastController.cs" >

  This is the use of **SkinnyControllersCommon** in *WeatherForecastController.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Mvc;
using SkinnyControllersCommon;

namespace SkinnyControllersDemo.Controllers;
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
[ApiController]
[Route("[controller]/[action]")]
public partial class WeatherForecastController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly WeatherActions weather;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, WeatherActions weather)
    {
        _logger = logger;
        this.weather = weather;
    }

    

}
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\SkinnyControllersCommon\src\SkinnyControllersDemo\Controllers\WeatherActions.cs" label="WeatherActions.cs" >

  This is the use of **SkinnyControllersCommon** in *WeatherActions.cs*

```csharp showLineNumbers 
namespace SkinnyControllersDemo.Controllers
{
    public class WeatherActions
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
        public async Task<int> MultiplyBy2(int nr)
        {
            await Task.Delay(nr);
            return nr*2;
        }
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\SkinnyControllersCommon\src\SkinnyControllersDemo\obj\GX\SkinnyControllerGeneratorV2\SkinnyControllerGeneratorV2.AutoGenerateActions\WeatherForecastController.autogenerate.cs" label="WeatherForecastController.autogenerate.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     SkinnyControllersGenerator: 
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System.CodeDom.Compiler;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SkinnyControllersDemo.Controllers {
  [GeneratedCode("SkinnyControllersGenerator", "")]
  [CompilerGenerated]
  partial class WeatherForecastController{ 
    /*[HttpGet()]
    public int id(){
    System.Diagnostics.Debugger.Break();
    return 1;
    } */

      

        [HttpGet] 
        public System.Collections.Generic.IEnumerable<SkinnyControllersDemo.WeatherForecast> Get (){
            //System.Diagnostics.Debugger.Break();
            
                            return 
                        
            weather.Get();

        }
      

        [HttpPost] 
        public System.Threading.Tasks.Task<int> MultiplyBy2 (int nr){
            //System.Diagnostics.Debugger.Break();
            
                            return 
                        
            weather.MultiplyBy2(nr);

        }
      
    
  }
}              
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project SkinnyControllersCommon ](/sources/SkinnyControllersCommon.zip)

:::


### Share SkinnyControllersCommon 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSkinnyControllersCommon&quote=SkinnyControllersCommon" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSkinnyControllersCommon&text=SkinnyControllersCommon:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSkinnyControllersCommon" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSkinnyControllersCommon&title=SkinnyControllersCommon" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSkinnyControllersCommon&title=SkinnyControllersCommon&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSkinnyControllersCommon" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SkinnyControllersCommon

## In the same category (API)


### [Refit](/docs/Refit)


### [RSCG_WebAPIExports](/docs/RSCG_WebAPIExports)


### [SafeRouting](/docs/SafeRouting)

