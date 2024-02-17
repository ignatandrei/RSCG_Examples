---
sidebar_position: 1040
title: 104 - NotNotAppSettings
description: Application Settings to strongly typed classes. Generate also from AppSettings development
slug: /NotNotAppSettings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# NotNotAppSettings  by jasonswearingen


<TOCInline toc={toc}  />

[![Nuget](https://img.shields.io/nuget/dt/NotNot.AppSettings?label=NotNot.AppSettings)](https://www.nuget.org/packages/NotNot.AppSettings/)
[![GitHub last commit](https://img.shields.io/github/last-commit/jasonswearingen/NotNot.AppSettings?label=updated)](https://github.com/jasonswearingen/NotNot.AppSettings/)
![GitHub Repo stars](https://img.shields.io/github/stars/jasonswearingen/NotNot.AppSettings?style=social)

## Details

### Info
:::info

Name: **NotNotAppSettings**

Auto-generate strongly typed C# settings objects from your AppSettings.json.

Author: jasonswearingen

NuGet: 
*https://www.nuget.org/packages/NotNot.AppSettings/*   


You can find more details at https://github.com/jasonswearingen/NotNot.AppSettings/

Source : https://github.com/jasonswearingen/NotNot.AppSettings/

:::

### Original Readme
:::note

# NotNot.AppSettings

Automatically create strongly typed C# settings objects from AppSettings.json. Uses Source Generators.

Includes a simple deserialization helper for when you are using Dependency Injection, or not.

## Getting Started

1) Add an `appsettings.json` file to your project *(make sure it's copied to the output)*.
2) **[Install this nuget package `NotNot.AppSettings`](https://www.nuget.org/packages/NotNot.AppSettings)**.
3) Build your project
4) Use the generated `AppSettings` class in your code. (See the example section below).

## How it works

During your project's build process, NotNot.AppSettings will parse the  `appsettings*.json` in your project's root folder.  These files are all merged into a single schema. Using source-generators it then creates a set of csharp classes that matches each node in the json hierarchy.

After building your project, an `AppSettings` class contains the strongly-typed definitions,
and an `AppSettingsBinder` helper/loader util will be found under the `{YourProjectRootNamespace}.AppSettingsGen` namespace.

## Example

`appsettings.json`

```json
{
  "Hello": {
	"World": "Hello back at you!"
  }
}
```

`Program.cs`

```csharp
using ExampleApp.AppSettingsGen;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ExampleApp;
public class Program
{ 
   public static async Task Main(string[] args)
   {
      {
         Console.WriteLine("NON-DI EXAMPLE");
                  
         var appSettings = ExampleApp.AppSettingsGen.AppSettingsBinder.LoadDirect();
         Console.WriteLine(appSettings.Hello.World);         
      }
      {
         Console.WriteLine("DI EXAMPLE");

         HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
         builder.Services.AddSingleton<IAppSettingsBinder, AppSettingsBinder>();
         var app = builder.Build();
         var appSettings = app.Services.GetRequiredService<IAppSettingsBinder>().AppSettings;
         Console.WriteLine(appSettings.Hello.World);
      }
   }
}
```
*See the **`./NotNot.AppSettings.Example`** folder in the repository for a fully buildable version of this example.*

## Troubleshooting / Tips

### How to extend the generated `AppSettings` class?

You can extend any/all of the generated code by creating a partial class in the same namespace.

### Some settings not being loaded (value is `NULL`). Or:  My `appSettings.Development.json` file is not loaded

Ensure the proper environment variable is set.   For example, The `appSettings.Development.json` file is only loaded when the `ASPNETCORE_ENVIRONMENT` 
or `DOTNET_ENVIORNMENT` environment variable is set to `Development`.

### Intellisense not working for `AppSettings` class

A strongly-typed `AppSettings` (and sub-classes) is recreated every time you build your project.
This may confuse your IDE and you might need to restart it to get intellisense working again.

### Why are some of my nodes typed as `object`?

Under some circumstances, the type of a node's value in `appsettings.json` would be ambiguous, so `object` is used:

- If the value is `null` or `undefined`
- If the value is a POJO/Array/primitive in one appsettings file, and a different one of those three in another.


### Tip: Backup generated code in your git repository

Add this to your `.csproj` to have the code output to `./Generated` and have it be ***ignored*** by your project.
This way you can check it into source control and have a backup of the generated code in case you need to stop using this package.
```xml
<!--output the source generator build files-->
<Target Name="DeleteFolder" BeforeTargets="PreBuildEvent">
	<RemoveDir Directories="$(CompilerGeneratedFilesOutputPath)" />
</Target>	
<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
<ItemGroup>
	<!--Exclude the output of source generators from the compilation-->
	<Compile Remove="$(CompilerGeneratedFilesOutputPath)/**" />
</ItemGroup>
```

## Contribute

- If you find value from this project, consider sponsoring.

## Acknowledgments

- This project was inspired by https://github.com/FrodeHus/AppSettingsSourceGenerator which unfortunately did not match my needs in fundamental ways.

## License: MPL-2.0

A summary from [TldrLegal](https://www.tldrlegal.com/license/mozilla-public-license-2-0-mpl-2):

>   MPL is a copyleft license that is easy to comply with. You must make the source code for any of your changes available under MPL, but you can combine the MPL software with proprietary code, as long as you keep the MPL code in separate files. Version 2.0 is, by default, compatible with LGPL and GPL version 2 or greater. You can distribute binaries under a proprietary license, as long as you make the source available under MPL.

**In brief**: You can basically use this project however you want, but all changes to it must be open sourced.

## Changes

- **`1.0.0`** : polish and readme tweaks.  **Put a fork in it, it's done!**
- **`0.12.0`** : change appsettings read logic to use "AdditionalFiles" workflow instead of File.IO
- **`0.10.0`** : Initial Release.


:::

### About
:::note

Application Settings to strongly typed classes. Generate also from AppSettings development


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **NotNotAppSettings**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.1" />
    <PackageReference Include="NotNot.AppSettings" Version="1.0.0" OutputItemType="Analyzer" ReferenceOutputAssembly="true" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
  </ItemGroup>

  <ItemGroup>
    <AdditionalFiles Update="appsettings.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </AdditionalFiles>
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NotNotAppSettings\src\TestAppSettings\Program.cs" label="Program.cs" >

  This is the use of **NotNotAppSettings** in *Program.cs*

```csharp showLineNumbers 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<TestAppSettings.AppSettingsGen.IAppSettingsBinder, TestAppSettings.AppSettingsGen.AppSettingsBinder>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

var appSettings = app.Services.GetRequiredService<TestAppSettings.AppSettingsGen.IAppSettingsBinder>().AppSettings;
Console.WriteLine(appSettings.AppName);

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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NotNotAppSettings\src\TestAppSettings\obj\GX\NotNot.AppSettings\NotNot.AppSettingsGen\TestAppSettings.AppSettingsGen.AppSettings.cs" label="TestAppSettings.AppSettingsGen.AppSettings.cs" >


```csharp showLineNumbers 

/** 
 * This file is generated by the NotNot.AppSettings nuget package.
 * Do not edit this file directly, instead edit the appsettings.json files and rebuild the project.
**/
using System;
using System.Runtime.CompilerServices;
namespace TestAppSettings.AppSettingsGen;

[CompilerGenerated]
public partial class AppSettings {
   public TestAppSettings.AppSettingsGen._AppSettings.Logging? Logging{get; set;}
   public string? AllowedHosts{get; set;}
   public string? AppName{get; set;}

}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NotNotAppSettings\src\TestAppSettings\obj\GX\NotNot.AppSettings\NotNot.AppSettingsGen\TestAppSettings.AppSettingsGen._AppSettings.Logging.cs" label="TestAppSettings.AppSettingsGen._AppSettings.Logging.cs" >


```csharp showLineNumbers 

/** 
 * This file is generated by the NotNot.AppSettings nuget package.
 * Do not edit this file directly, instead edit the appsettings.json files and rebuild the project.
**/
using System;
using System.Runtime.CompilerServices;
namespace TestAppSettings.AppSettingsGen._AppSettings;

[CompilerGenerated]
public partial class Logging {
   public TestAppSettings.AppSettingsGen._AppSettings._Logging.LogLevel? LogLevel{get; set;}

}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NotNotAppSettings\src\TestAppSettings\obj\GX\NotNot.AppSettings\NotNot.AppSettingsGen\TestAppSettings.AppSettingsGen._AppSettings._Logging.LogLevel.cs" label="TestAppSettings.AppSettingsGen._AppSettings._Logging.LogLevel.cs" >


```csharp showLineNumbers 

/** 
 * This file is generated by the NotNot.AppSettings nuget package.
 * Do not edit this file directly, instead edit the appsettings.json files and rebuild the project.
**/
using System;
using System.Runtime.CompilerServices;
namespace TestAppSettings.AppSettingsGen._AppSettings._Logging;

[CompilerGenerated]
public partial class LogLevel {
   public string? Default{get; set;}
   public string? Microsoft_AspNetCore{get; set;}

}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\NotNotAppSettings\src\TestAppSettings\obj\GX\NotNot.AppSettings\NotNot.AppSettingsGen\_BinderShims.cs" label="_BinderShims.cs" >


```csharp showLineNumbers 

/** 
 * This file is generated by the NotNot.AppSettings nuget package.
 * Do not edit this file directly, instead edit the appsettings.json files and rebuild the project.
**/

using Microsoft.Extensions.Configuration;
namespace TestAppSettings.AppSettingsGen;


/// <summary>
/// Strongly typed AppSettings.json, recreated every build. 
/// <para>You can use this directly, extend it (it's a partial class), 
/// or get a populated instance of it via the <see cref="AppSettingsBinder"/> DI service</para>
/// </summary>
public partial class AppSettings
{
}

/// <summary>
/// a DI service that contains a strongly-typed copy of your appsettings.json
/// <para><strong>DI Usage:</strong></para>
/// <para><c>builder.Services.AddSingleton&lt;IAppSettingsBinder, AppSettingsBinder&gt;();</c></para>
/// <para><c>var app = builder.Build();</c></para>
///  <para><c>var appSettings = app.Services.GetRequiredService&lt;IAppSettingsBinder&gt;().AppSettings;</c></para>
/// <para><strong>Non-DI Usage:</strong></para>
/// <para><c>var appSettings = AppSettingsBinder.LoadDirect();</c></para>
/// </summary>
public partial class AppSettingsBinder : IAppSettingsBinder
{
   public AppSettings AppSettings { get; protected set; }

   public AppSettingsBinder(IConfiguration _config)
   {
      AppSettings = new AppSettings();

      //automatically reads and binds to config file
      _config.Bind(AppSettings);
   }

   /// <summary>
   /// Manually construct an AppSettings from your appsettings.json files.
   /// <para>NOTE: This method is provided for non-DI users.  If you use DI, don't use this method.  Instead just register this class as a service.</para>
   /// </summary>
   /// <param name="appSettingsLocation">folder where to search for appsettings.json.  defaults to current app folder.</param>
   /// <param name="appSettingsFileNames">lets you override the files to load up.  defaults to 'appsettings.json' and 'appsettings.{DOTNET_ENVIRONMENT}.json'</param>
   /// <param name="throwIfFilesMissing">default is to silently ignore if any of the .json files are missing.</param>
   /// <returns>your strongly typed appsettings with values from your .json loaded in</returns>
   public static AppSettings LoadDirect(string? appSettingsLocation = null,IEnumerable<string>? appSettingsFileNames=null,bool throwIfFilesMissing=false )
   {      
      //pick what .json files to load
      if (appSettingsFileNames is null)
      {
         //figure out what env
         var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
         env ??= Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT");
         env ??= Environment.GetEnvironmentVariable("ENVIRONMENT");
         //env ??= "Development"; //default to "Development
         if (env is null)
         {
            appSettingsFileNames = new[] { "appsettings.json" };
         }
         else
         {
            appSettingsFileNames = new[] { "appsettings.json", $"appsettings.{env}.json" };
         }
      }

      //build a config from the specified files
      var builder = new ConfigurationBuilder();
      if (appSettingsLocation != null)
      {
         builder.SetBasePath(appSettingsLocation);
      }
      var optional = !throwIfFilesMissing;
      foreach (var fileName in appSettingsFileNames)
      {         
         builder.AddJsonFile(fileName, optional: optional, reloadOnChange: false); // Add appsettings.json
      }
      IConfigurationRoot configuration = builder.Build();

      //now finally get the appsettings we care about
      var binder = new AppSettingsBinder(configuration);
      return binder.AppSettings;
   }
}

/// <summary>
/// a DI service that contains a strongly-typed copy of your appsettings.json
/// <para><strong>DI Usage:</strong></para>
/// <para><c>builder.Services.AddSingleton&lt;IAppSettingsBinder, AppSettingsBinder&gt;();</c></para>
/// <para><c>var app = builder.Build();</c></para>
///  <para><c>var appSettings = app.Services.GetRequiredService&lt;IAppSettingsBinder&gt;().AppSettings;</c></para>
/// <para><strong>Non-DI Usage:</strong></para>
/// <para><c>var appSettings = AppSettingsBinder.LoadDirect();</c></para>
/// </summary>
public interface IAppSettingsBinder
{
   public AppSettings AppSettings { get; }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project NotNotAppSettings ](/sources/NotNotAppSettings.zip)

:::


### Share NotNotAppSettings 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNotNotAppSettings&quote=NotNotAppSettings" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNotNotAppSettings&text=NotNotAppSettings:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNotNotAppSettings" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNotNotAppSettings&title=NotNotAppSettings" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNotNotAppSettings&title=NotNotAppSettings&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNotNotAppSettings" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/NotNotAppSettings

## In the same category (FilesToCode)


### [Chorn.EmbeddedResourceAccessGenerator](/docs/Chorn.EmbeddedResourceAccessGenerator)


### [corecraft](/docs/corecraft)


### [EmbedResourceCSharp](/docs/EmbedResourceCSharp)


### [Podimo.ConstEmbed](/docs/Podimo.ConstEmbed)


### [ResXGenerator](/docs/ResXGenerator)


### [RSCG_Utils](/docs/RSCG_Utils)


### [ThisAssembly_Resources](/docs/ThisAssembly_Resources)


### [Weave](/docs/Weave)

