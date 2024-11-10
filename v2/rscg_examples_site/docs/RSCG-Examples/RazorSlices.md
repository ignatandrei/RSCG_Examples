---
sidebar_position: 1640
title: 164 - RazorSlices
description: Generating html from razor templates. Attention, generates IHttpResult, not html string.
slug: /RazorSlices
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RazorSlices  by Damiam Edwards


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/RazorSlices?label=RazorSlices)](https://www.nuget.org/packages/RazorSlices/)
[![GitHub last commit](https://img.shields.io/github/last-commit/DamianEdwards/RazorSlices?label=updated)](https://github.com/DamianEdwards/RazorSlices)
![GitHub Repo stars](https://img.shields.io/github/stars/DamianEdwards/RazorSlices?style=social)

## Details

### Info
:::info

Name: **RazorSlices**

Package Description

Author: Damiam Edwards

NuGet: 
*https://www.nuget.org/packages/RazorSlices/*   


You can find more details at https://github.com/DamianEdwards/RazorSlices

Source : https://github.com/DamianEdwards/RazorSlices

:::

### Original Readme
:::note

# Razor Slices

[![CI (main)](https://github.com/DamianEdwards/RazorSlices/actions/workflows/ci.yml/badge.svg)](https://github.com/DamianEdwards/RazorSlices/actions/workflows/ci.yml)
[![Nuget](https://img.shields.io/nuget/v/RazorSlices)](https://www.nuget.org/packages/RazorSlices/)

*Lightweight* Razor-based templates for ASP.NET Core without MVC, Razor Pages, or Blazor, optimized for high-performance, unbuffered rendering with low allocations. Compatible with trimming and native AOT. Great for returning dynamically rendered HTML from Minimal APIs, middleware, etc. Supports .NET 8+

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Features](#features)

## Getting Started

1. [Install the NuGet package](#installation) into your ASP.NET Core project (.NET 8+):

    ``` shell
    > dotnet add package RazorSlices
    ```

1. Create a directory in your project called *Slices* and add a *_ViewImports.cshtml* file to it with the following content:

    ``` cshtml
    @inherits RazorSliceHttpResult

    @using System.Globalization;
    @using Microsoft.AspNetCore.Razor;
    @using Microsoft.AspNetCore.Http.HttpResults;
    
    @tagHelperPrefix __disable_tagHelpers__:
    @removeTagHelper *, Microsoft.AspNetCore.Mvc.Razor
    ```

1. In the same directory, add a *Hello.cshtml* file with the following content:

    ``` cshtml
    @inherits RazorSliceHttpResult<DateTime>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hello from Razor Slices!</title>
    </head>
    <body>
        <p>
            Hello from Razor Slices! The time is @Model
        </p>
    </body>
    </html>
    ```

    Each *.cshtml* file will have a proxy type generated for it by the Razor Slices source generator that you can use as the generic argument to the various APIs in Razor Slices for rendering slices.

1. Add a minimal API to return the slice in your *Program.cs*:

    ``` c#
    app.MapGet("/hello", () => Results.Extensions.RazorSlice<MyApp.Slices.Hello, DateTime>(DateTime.Now));
    ```

## Installation

### NuGet Releases

[![Nuget](https://img.shields.io/nuget/v/RazorSlices)](https://www.nuget.org/packages/RazorSlices/)

This package is currently available from [nuget.org](https://www.nuget.org/packages/RazorSlices/):

``` console
> dotnet add package RazorSlices
```

### CI Builds

If you wish to use builds from this repo's `main` branch you can install them from [this repo's package feed](https://github.com/DamianEdwards/RazorSlices/pkgs/nuget/RazorSlices).

1. [Create a personal access token](https://github.com/settings/tokens/new) for your GitHub account with the `read:packages` scope with your desired expiration length:

    [<img width="583" alt="image" src="https://user-images.githubusercontent.com/249088/160220117-7e79822e-a18a-445c-89ff-b3d9ca84892f.png" />](https://github.com/settings/tokens/new)

1. At the command line, navigate to your user profile directory and run the following command to add the package feed to your NuGet configuration, replacing the `<GITHUB_USER_NAME>` and `<PERSONAL_ACCESS_TOKEN>` placeholders with the relevant values:

    ``` shell
    ~> dotnet nuget add source -n GitHub -u <GITHUB_USER_NAME> -p <PERSONAL_ACCESS_TOKEN> https://nuget.pkg.github.com/DamianEdwards/index.json
    ```

1. You should now be able to add a reference to the package specifying a version from the [repository packages feed](https://github.com/DamianEdwards/RazorSlices/pkgs/nuget/RazorSlices)

1. See [these instructions](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-nuget-registry) for further details about working with GitHub package feeds.

## Features

The library is still new and features are being actively added.

### Currently supported

- ASP.NET Core 8.0 and above
- Strongly-typed models (via `@inherits RazorSlice<MyModel>` or `@inherits RazorSliceHttpResult<MyModel>`)
- Razor constructs:
  - [Implicit expressions](https://learn.microsoft.com/aspnet/core/mvc/views/razor#implicit-razor-expressions), e.g. `@someVariable`
  - [Explicit expressions](https://learn.microsoft.com/aspnet/core/mvc/views/razor#implicit-razor-expressions), e.g. `@(someBool ? thisThing : thatThing)`
  - [Control structures](https://learn.microsoft.com/aspnet/core/mvc/views/razor#control-structures), e.g. `@if()`, `@switch()`, etc.
  - [Looping](https://learn.microsoft.com/aspnet/core/mvc/views/razor#looping-for-foreach-while-and-do-while), e.g. `@for`, `@foreach`, `@while`, `@do`
  - [Code blocks](https://learn.microsoft.com/aspnet/core/mvc/views/razor#razor-code-blocks), e.g. `@{ var someThing = someOtherThing; }`
  - [Conditional attribute rendering](https://learn.microsoft.com/aspnet/core/mvc/views/razor#conditional-attribute-rendering)
  - Functions, e.g.

    ```cshtml
    @functions {
        private readonly string _someString = "A very important string";
        private int DoAThing() => 123;
    }
    ```
  
  - [Templated Razor delegates](https://learn.microsoft.com/aspnet/core/mvc/views/razor#templated-razor-delegates), e.g.

    ```cshtml
    @inherits RazorSlice<Todo>

    <h1>@Title(Model)</h1>

    @functions {
        private IHtmlContent Title(Todo todo)
        {
            <text>Todo @todo.Id: @todo.Title</text>
            return HtmlString.Empty;
        }
    }
    ```

- DI-activated properties via `@inject`
- Rendering slices from slices (aka partials) via `@(await RenderPartialAsync<MyPartial>())`
- Using slices as layouts for other slices, including layouts with strongly-typed models:
  - For the layout slice, inherit from `RazorLayoutSlice` or `RazorLayoutSlice<TModel>` and use `@await RenderBodyAsync()` in the layout to render the body

      ```cshtml
      @inherits RazorLayoutSlice<LayoutModel>

      <!DOCTYPE html>
      <html lang="en">
      <head>
          <title>@Model.Title</title>
          @await RenderSectionAsync("head")
      </head>
      <body>
        @await RenderBodyAsync()

        <footer>
            @await RenderSectionAsync("footer")
        </footer>
      </body>
      </html>
      ```

  - For the slice using the layout, implement `IUsesLayout<TLayout>` or `IUsesLayout<TLayout, TModel>` to declare which layout to use. If using a layout with a model, ensure you implement the `LayoutModel` property in your `@functions` block, e.g

      ```cshtml
      @inherits RazorSlice<SomeModel>
      @implements IUsesLayout<LayoutSlice, LayoutModel>

      <div>
          @* Content here *@
      </div>

      @functions {
          public LayoutModel LayoutModel => new() { Title = "My Layout" };
      }
      ```

  - Layouts can render sections via `@await RenderSectionAsync("SectionName")` and slices can render content into sections by overriding `ExecuteSectionAsync`, e.g.:

      ```cshtml
      protected override Task ExecuteSectionAsync(string name)
      {
          if (name == "lorem-header")
          {
              <p class="text-info">This page renders a custom <code>IHtmlContent</code> type that contains lorem ipsum content.</p>
          }

          return Task.CompletedTask;
      }
      ```

    **Note: The `@section` directive is not supported as it's incompatible with the rendering approach of Razor Slices**

- Asynchronous rendering, i.e. the template can contain `await` statements, e.g. `@await WriteTheThing()`
- Writing UTF8 `byte[]` values directly to the output
- Rendering directly to `PipeWriter`, `Stream`, `TextWriter`, `StringBuilder`, and `string` outputs, including optimizations for not boxing struct values, zero-allocation rendering of primitives like numbers, etc. (rather than just calling `ToString()` on everything)
- Return a slice instance directly as an `IResult` in minimal APIs via `@inherits RazorSliceHttpResult` and `Results.Extensions.RazorSlice("/Slices/Hello.cshtml")`
- Full support for trimming and native AOT when used in conjunction with ASP.NET Core Minimal APIs

### Interested in supporting but not sure yet

- Extensions to help support using HTMX with Razor Slices 
- Getting small updates to the Razor compiler itself to get some usability and performance improvements, e.g.:
  - Don't mark the template's `ExecuteAsync` method as an `async` method unless the template contains `await` statements to save on the async state machine overhead
  - Support compiling static template elements to UTF8 string literals (`ReadOnlySpan<byte>`) instead of string literals to save on the UTF16 to UTF8 conversion during rendering
  - Support disabling the default registered `@addtaghelper` and `@model` directives which rely on MVC

### No intention to support

- Tag Helpers and View Components (they're tied to MVC and are intrinsically "heavy")
- `@model` directive (the Razor compiler does not support its use in conjunction with custom base-types via `@inherits`)
- `@attribute [Authorize]` (wrong layer of abstraction for minimal APIs, etc.)
- `@section` directive (the Razor compiler emits code that is incompatible with the rendering approach of Razor Slices)


:::

### About
:::note

Generating html from razor templates. Attention, generates IHttpResult, not html string.


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RazorSlices**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.10" />
    <PackageReference Include="RazorSlices" Version="0.8.1" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorSlices\src\RazorDemoSlices\Program.cs" label="Program.cs" >

  This is the use of **RazorSlices** in *Program.cs*

```csharp showLineNumbers 
using RazorDemoSlices;

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

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};
app.MapGet("/hello", (string firstName,string lastName) 
    => Results.Extensions.RazorSlice<RazorDemoSlices.Slices.PersonHTML, Person>(
        new Person { FirstName = firstName, LastName = lastName }
    ));

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

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorSlices\src\RazorDemoSlices\Slices\PersonHTML.cshtml" label="PersonHTML.cshtml" >

  This is the use of **RazorSlices** in *PersonHTML.cshtml*

```csharp showLineNumbers 
@inherits RazorSliceHttpResult<RazorDemoSlices.Person>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Hello from Razor Slices!</title>
</head>
<body>
    <p>
        My name is @Model.FirstName @Model.LastName
    </p>
</body>
</html>
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorSlices\src\RazorDemoSlices\Person.cs" label="Person.cs" >

  This is the use of **RazorSlices** in *Person.cs*

```csharp showLineNumbers 
namespace RazorDemoSlices;

public class Person
{
    public string FirstName { get; set; }=string.Empty;
    public string LastName { get; set; }= string.Empty;
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorSlices\src\RazorDemoSlices\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Slices_PersonHTML_cshtml.g.cs" label="Slices_PersonHTML_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\PersonHTML.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "6b3710e80836b438a5d8935ea469d238fc095e46298456ca847e09519393bb5e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Slices_PersonHTML), @"mvc.1.0.view", @"/Slices/PersonHTML.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line (3,2)-(4,1) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml"
using System.Globalization;

#nullable disable
#nullable restore
#line (4,2)-(5,1) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml"
using Microsoft.AspNetCore.Razor;

#nullable disable
#nullable restore
#line (5,2)-(6,1) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml"
using Microsoft.AspNetCore.Http.HttpResults;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Slices/PersonHTML.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Slices_PersonHTML : RazorSliceHttpResult<RazorDemoSlices.Person>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <title>Hello from Razor Slices!</title>\r\n</head>\r\n<body>\r\n    <p>\r\n        My name is ");
            Write(
#nullable restore
#line (10,21)-(10,36) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\PersonHTML.cshtml"
Model.FirstName

#line default
#line hidden
#nullable disable
            );
            WriteLiteral(" ");
            Write(
#nullable restore
#line (10,38)-(10,52) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\PersonHTML.cshtml"
Model.LastName

#line default
#line hidden
#nullable disable
            );
            WriteLiteral("\r\n    </p>\r\n</body>\r\n</html>");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorSlices\src\RazorDemoSlices\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Slices__ViewImports_cshtml.g.cs" label="Slices__ViewImports_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "95493514af34e5705fffb1e5c7121f0e7abde13ee7a1cff8fbafa2085da18fff"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Slices__ViewImports), @"mvc.1.0.view", @"/Slices/_ViewImports.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line default
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line (3,2)-(4,1) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml"
using System.Globalization;

#nullable disable
#nullable restore
#line (4,2)-(5,1) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml"
using Microsoft.AspNetCore.Razor;

#nullable disable
#nullable restore
#line (5,2)-(6,1) "D:\gth\RSCG_Examples\v2\rscg_examples\EmbeddedResourcePropertyGenerator\src\RazorDemoSlices\RazorDemoSlices\Slices\_ViewImports.cshtml"
using Microsoft.AspNetCore.Http.HttpResults;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Slices/_ViewImports.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Slices__ViewImports : RazorSliceHttpResult
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            WriteLiteral("\r\n");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\RazorSlices\src\RazorDemoSlices\obj\GX\RazorSlices.SourceGenerator\RazorSlices.SourceGenerator.RazorSliceProxyGenerator\RazorDemoSlices.RazorSliceProxies.g.cs" label="RazorDemoSlices.RazorSliceProxies.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

using global::System.Diagnostics.CodeAnalysis;
using global::RazorSlices;

#nullable enable

namespace RazorDemoSlices
{
    /// <summary>
    /// All calls to create Razor Slices instances via the generated <see cref="global::RazorSlices.IRazorSliceProxy"/> classes
    /// go through this factory to ensure that the generated types' Create methods are always invoked via the static abstract
    /// methods defined in the <see cref="global::RazorSlices.IRazorSliceProxy"/> interface. This ensures that the interface
    /// implementation is never trimmed from the generated types.
    /// </summary>
    /// <remarks>
    /// Workaround for https://github.com/dotnet/runtime/issues/102796
    /// </remarks>
    [global::System.ComponentModel.EditorBrowsable(global::System.ComponentModel.EditorBrowsableState.Never)] // Hide from IntelliSense.
    internal static class RazorSlicesGenericFactory
    {
        public static RazorSlice CreateSlice<TProxy>() where TProxy : IRazorSliceProxy => TProxy.CreateSlice();

        public static RazorSlice<TModel> CreateSlice<TProxy, TModel>(TModel model) where TProxy : IRazorSliceProxy => TProxy.CreateSlice(model);
    }
}
namespace RazorDemoSlices.Slices
{
    /// <summary>
    /// Static proxy for the Razor Slice defined in <c>Slices\PersonHTML.cshtml</c>.
    /// </summary>
    public sealed class PersonHTML : global::RazorSlices.IRazorSliceProxy
    {
        [global::System.Diagnostics.CodeAnalysis.DynamicDependency(global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All, TypeName, "RazorDemoSlices")]
        private const string TypeName = "AspNetCoreGeneratedDocument.Slices_PersonHTML, RazorDemoSlices";
        [global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMembers(global::System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All)]
        private static readonly global::System.Type _sliceType = global::System.Type.GetType(TypeName)
            ?? throw new global::System.InvalidOperationException($"Razor view type '{TypeName}' was not found. This is likely a bug in the RazorSlices source generator.");
        private static readonly global::RazorSlices.SliceDefinition _sliceDefinition = new(_sliceType);

        /// <summary>
        /// Creates a new instance of the Razor Slice defined in <c>Slices\PersonHTML.cshtml</c> .
        /// </summary>
        public static global::RazorSlices.RazorSlice Create()
            => global::RazorDemoSlices.RazorSlicesGenericFactory.CreateSlice<global::RazorDemoSlices.Slices.PersonHTML>();

        /// <summary>
        /// Creates a new instance of the Razor Slice defined in <c>Slices\PersonHTML.cshtml</c> with the given model.
        /// </summary>
        public static global::RazorSlices.RazorSlice<TModel> Create<TModel>(TModel model)
            => global::RazorDemoSlices.RazorSlicesGenericFactory.CreateSlice<global::RazorDemoSlices.Slices.PersonHTML, TModel>(model);

        // Explicit interface implementation
        static global::RazorSlices.RazorSlice global::RazorSlices.IRazorSliceProxy.CreateSlice() => _sliceDefinition.CreateSlice();

        // Explicit interface implementation
        static global::RazorSlices.RazorSlice<TModel> global::RazorSlices.IRazorSliceProxy.CreateSlice<TModel>(TModel model) => _sliceDefinition.CreateSlice(model);
    }
}


```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project RazorSlices ](/sources/RazorSlices.zip)

:::


### Share RazorSlices 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorSlices&quote=RazorSlices" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorSlices&text=RazorSlices:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorSlices" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorSlices&title=RazorSlices" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorSlices&title=RazorSlices&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRazorSlices" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RazorSlices

### In the same category (Templating) - 10 other generators


#### [Gobie](/docs/Gobie)


#### [InterceptorTemplate](/docs/InterceptorTemplate)


#### [JKToolKit.TemplatePropertyGenerator](/docs/JKToolKit.TemplatePropertyGenerator)


#### [Microsoft.NET.Sdk.Razor.SourceGenerators](/docs/Microsoft.NET.Sdk.Razor.SourceGenerators)


#### [Minerals.AutoMixins](/docs/Minerals.AutoMixins)


#### [MorrisMoxy](/docs/MorrisMoxy)


#### [RazorBlade](/docs/RazorBlade)


#### [RSCG_IFormattable](/docs/RSCG_IFormattable)


#### [RSCG_Templating](/docs/RSCG_Templating)


#### [spreadcheetah](/docs/spreadcheetah)

