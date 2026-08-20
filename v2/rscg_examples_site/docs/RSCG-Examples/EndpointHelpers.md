---
sidebar_position: 2810
title: 281 - EndpointHelpers
description: Generating endpoint helpers for ASP.NET Core MVC
slug: /EndpointHelpers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveMVC.mdx';

# EndpointHelpers  by Gustavo Mauricio de Barros


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/EndpointHelpers?label=EndpointHelpers)](https://www.nuget.org/packages/EndpointHelpers/)
[![GitHub last commit](https://img.shields.io/github/last-commit/gumbarros/EndpointHelpers?label=updated)](https://github.com/gumbarros/EndpointHelpers)
![GitHub Repo stars](https://img.shields.io/github/stars/gumbarros/EndpointHelpers?style=social)

## Details

### Info
:::info

Name: **EndpointHelpers**

Source generators that add strongly-typed UrlHelper and LinkGenerator APIs for ASP.NET Core MVC controllers.

Author: Gustavo Mauricio de Barros

NuGet: 
*https://www.nuget.org/packages/EndpointHelpers/*   


You can find more details at https://github.com/gumbarros/EndpointHelpers

Source: https://github.com/gumbarros/EndpointHelpers

:::

### Author
:::note
Gustavo Mauricio de Barros 
![Alt text](https://github.com/gumbarros.png)
:::

## Original Readme
:::note

# EndpointHelpers

EndpointHelpers is a Roslyn source generator that creates strongly-typed helpers for ASP.NET Core MVC controllers. It generates:

- `IUrlHelper` helpers with action methods per controller.
- `LinkGenerator` helpers with `Get{Action}Path` methods, including `HttpContext` overloads.
- Redirect helpers for controller actions, so `RedirectToAction("Index")` becomes `RedirectToIndex()`.
- View helpers on controllers, so `return View("Index")` becomes `return IndexView()`.
- Extension properties on `IUrlHelper` and `LinkGenerator` to access the helpers.
- Attribute types are used to control generation.

This package ships only a source generator and generated code. There is no runtime dependency.

## Example

### Without the generator

```razorhtmldialect
<a href='@Url.Action(action: "Details",controller: "Orders", values: new \{ orderId = 123, source = "dashboard" \} )'>
    View order
</a>
```

### With the generator enabled
```razorhtmldialect
<a href='@Url.Orders.Details(123, "dashboard")'>
    View order
</a>
```

## Install

Add the NuGet package:

```xml
<ItemGroup>
  <PackageReference Include="EndpointHelpers" Version="2.0.2"/>
</ItemGroup>
```

or

```bash
dotnet add package EndpointHelpers
```

## Requirements

The generated code uses C# 14 extension members (`extension(...)` blocks), so consumers must compile with a C# 14 toolchain (the .NET 10 SDK or later).

Optional (for better IntelliSense in JetBrains IDEs):

```xml
<ItemGroup>
  <PackageReference Include="JetBrains.Annotations" Version="2025.2.4" />
</ItemGroup>
```

When `JetBrains.Annotations` is installed, generated MVC helper methods include ASP MVC annotations, and IntelliSense/navigation for views and model parameters works correctly when using R# or Rider.

## Quick Start

Enable generation at the assembly level:

```csharp
using EndpointHelpers;

[assembly: GenerateUrlHelper]
[assembly: GenerateLinkGenerator]
```

Or apply to a specific controller:

```csharp
using EndpointHelpers;

[GenerateUrlHelper]
[GenerateLinkGenerator]
[GenerateRedirectToAction]
[GenerateViewHelpers]
public partial class HomeController : Controller
{
    public IActionResult Index() => View();
    public IActionResult Privacy() => View();
}
```

Or only to a specific action:

```csharp
using EndpointHelpers;

public partial class HomeController : Controller
{
    [GenerateUrlHelper]
    [GenerateRedirectToAction]
    public IActionResult Index() => View();
    public IActionResult Privacy() => View();
}
```

Redirect example:

```csharp
public partial class OrdersController : Controller
{
    public IActionResult Index() => View();
    
    [GenerateRedirectToAction]
    public IActionResult Details(int orderId, string? source) => View();

    public IActionResult Save()
    {
        return RedirectToDetails(orderId: 123, source: "created");
    }
}
```

## Attributes and Scope

Generation can be enabled at different scopes:

- Assembly: `[assembly: GenerateUrlHelper]`, `[assembly: GenerateLinkGenerator]`.
- Controller: `[GenerateUrlHelper]`, `[GenerateLinkGenerator]`, `[GenerateRedirectToAction]` on the controller class.
- Action: `[GenerateUrlHelper]`, `[GenerateLinkGenerator]`, `[GenerateRedirectToAction]` on a specific action method.
- View helpers: `[GenerateViewHelpers]` on the controller class (controller-only, not per-action or assembly).
- `GenerateRedirectToAction` does not support assembly-level attributes and requires controllers declared `partial`.
- `GenerateViewHelpers` does not support assembly-level attributes and requires controllers declared `partial`.

You can exclude methods using:

- `[UrlHelperIgnore]`
- `[LinkGeneratorIgnore]`
- `[RedirectToActionIgnore]`
- `[NonAction]` (standard ASP.NET Core MVC attribute)

## Behavior

- Controllers are discovered by name: non-abstract classes ending with `Controller`.
- Only public, ordinary methods are included.
- UrlHelper and LinkGenerator helpers are placed in the `EndpointHelpers` namespace.
- Redirect helpers are generated as `partial` members in the controller namespace.
- Extension properties use the controller name without the `Controller` suffix.
- Controllers with `[Area("...")]` are grouped by area, so generated access becomes `Url.<Area>.<Controller>` and `Links.<Area>.<Controller>`.
- Only route-value-compatible parameters are included: simple types (`int`, `string`, `Guid`, `DateTime`, enums, nullables, ...) or parameters marked `[FromRoute]`/`[FromQuery]`/`[FromHeader]`/`[FromForm]`. Body-bound parameters (complex types or `[FromBody]`) are excluded, and `CancellationToken`/`[FromServices]` parameters are always ignored.

### Controller and action discovery
```csharp
[GenerateUrlHelper]
[GenerateLinkGenerator]
[GenerateRedirectToAction]
public partial class OrdersController : Controller
{
    public IActionResult Index() => View();
    
    public IActionResult Details(int orderId, string? source) => View();
}
```



### Optional Optimization

Caching controller helpers avoid repeated allocations. This is a micro-optimization and usually not necessary in most scenarios. It can make sense in hot views where you call the same helper many times (for example, in a loop), but the savings are typically negligible compared to database access, rendering, or network costs. If you don’t measure a problem, skip this.

```razorhtmldialect
@{
    var ordersUrlHelper = Url.Orders;
}

@for (var i = 0; i < Model.Orders.Count; i++)
{
    var order = Model.Orders[i];
    <a class="btn btn-sm btn-outline-secondary" href="@ordersUrlHelper.Details(order.Id)">Details</a>
}
```

#### Generated surface

```csharp
// UrlHelperGenerator

Url.Orders.Index();
Url.Orders.Details(orderId: 123, source: "dashboard");
Url.Admin.Users.Index();

// LinkGeneratorGenerator

LinkGenerator.Orders.GetIndexPath();
LinkGenerator.Orders.GetDetailsPath(123, "dashboard");
LinkGenerator.Admin.Users.GetIndexPath();

// RedirectToActionGenerator

RedirectToIndex();
RedirectToDetails(orderId: 123, source: "dashboard");
RedirectToUsers();
```

## Example Project

See [`example/EndpointHelpers.Sample`](https://github.com/gumbarros/EndpointHelpers/tree/master/example/EndpointHelpers.Sample) for a minimal MVC app using all generators.

## License

GNU General Public License


:::

### About
:::note

Generating endpoint helpers for ASP.NET Core MVC


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **EndpointHelpers**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="EndpointHelpers" Version="2.0.2" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\Program.cs" label="Program.cs" >

  This is the use of **EndpointHelpers** in *Program.cs*

```csharp showLineNumbers 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\Controllers\HomeController.cs" label="HomeController.cs" >

  This is the use of **EndpointHelpers** in *HomeController.cs*

```csharp showLineNumbers 
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TestMVC.Models;
using EndpointHelpers;

namespace TestMVC.Controllers;

[GenerateUrlHelper]
[GenerateLinkGenerator]
[GenerateRedirectToAction]
[GenerateViewHelpers]
public partial class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel \{ RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\Views\Home\Privacy.cshtml" label="Privacy.cshtml" >

  This is the use of **EndpointHelpers** in *Privacy.cshtml*

```csharp showLineNumbers 
@using EndpointHelpers;

@{
    ViewData["Title"] = "Privacy Policy";

}
<h1>@ViewData["Title"]</h1>

<p>Use this page to detail your site's privacy policy.</p>


<a href="@Url.Home.Index()"> This is the index referenced directly</a>

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\obj\GX\EndpointHelpers\EndpointHelpers.LinkGeneratorGenerator\LinkGeneratorExtensions.g.cs" label="LinkGeneratorExtensions.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace EndpointHelpers;

public sealed class HomeControllerLinkGenerator(LinkGenerator linkGenerator)
{
    public string GetIndexPath()
    {
        return linkGenerator.GetPathByAction(
            action: "Index",
            controller: "Home",
            values: null)!;
    }

    public string GetIndexPath(HttpContext httpContext)
    {
        return linkGenerator.GetPathByAction(
            httpContext,
            action: "Index",
            controller: "Home",
            values: null)!;
    }

    public string GetPrivacyPath()
    {
        return linkGenerator.GetPathByAction(
            action: "Privacy",
            controller: "Home",
            values: null)!;
    }

    public string GetPrivacyPath(HttpContext httpContext)
    {
        return linkGenerator.GetPathByAction(
            httpContext,
            action: "Privacy",
            controller: "Home",
            values: null)!;
    }

    public string GetErrorPath()
    {
        return linkGenerator.GetPathByAction(
            action: "Error",
            controller: "Home",
            values: null)!;
    }

    public string GetErrorPath(HttpContext httpContext)
    {
        return linkGenerator.GetPathByAction(
            httpContext,
            action: "Error",
            controller: "Home",
            values: null)!;
    }

}

public static class LinkGeneratorExtensions
{
    extension(LinkGenerator linkGenerator)
    {
        public HomeControllerLinkGenerator Home => new HomeControllerLinkGenerator(linkGenerator);

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\obj\GX\EndpointHelpers\EndpointHelpers.RedirectToActionGenerator\RedirectToActionControllers.g.cs" label="RedirectToActionControllers.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace TestMVC.Controllers
{
    public partial class HomeController
    {
        protected RedirectToActionResult RedirectToIndex()
        {
            return RedirectToAction("Index", "Home")!;
        }

        protected RedirectToActionResult RedirectToPrivacy()
        {
            return RedirectToAction("Privacy", "Home")!;
        }

        protected RedirectToActionResult RedirectToError()
        {
            return RedirectToAction("Error", "Home")!;
        }

    }

}


```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\obj\GX\EndpointHelpers\EndpointHelpers.UrlHelperGenerator\Attributes.g.cs" label="Attributes.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>

namespace EndpointHelpers;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(
    global::System.AttributeTargets.Method |
    global::System.AttributeTargets.Class |
    global::System.AttributeTargets.Assembly)]
internal sealed class GenerateUrlHelperAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(global::System.AttributeTargets.Method)]
internal sealed class UrlHelperIgnoreAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(
    global::System.AttributeTargets.Method |
    global::System.AttributeTargets.Class |
    global::System.AttributeTargets.Assembly)]
internal sealed class GenerateLinkGeneratorAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(global::System.AttributeTargets.Method)]
internal sealed class LinkGeneratorIgnoreAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(
    global::System.AttributeTargets.Method |
    global::System.AttributeTargets.Class |
    global::System.AttributeTargets.Assembly)]
internal sealed class GenerateRedirectToActionAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(global::System.AttributeTargets.Method)]
internal sealed class RedirectToActionIgnoreAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(global::System.AttributeTargets.Class)]
internal sealed class GenerateViewHelpersAttribute : global::System.Attribute;

[global::Microsoft.CodeAnalysis.EmbeddedAttribute]
[global::System.AttributeUsage(global::System.AttributeTargets.Method)]
internal sealed class ViewHelpersIgnoreAttribute : global::System.Attribute;
 
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\obj\GX\EndpointHelpers\EndpointHelpers.UrlHelperGenerator\Microsoft.CodeAnalysis.EmbeddedAttribute.cs" label="Microsoft.CodeAnalysis.EmbeddedAttribute.cs" >
```csharp showLineNumbers 
// <auto-generated/>
namespace Microsoft.CodeAnalysis
{
    internal sealed partial class EmbeddedAttribute : global::System.Attribute
    {
    }
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\obj\GX\EndpointHelpers\EndpointHelpers.UrlHelperGenerator\UrlHelperExtensions.g.cs" label="UrlHelperExtensions.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
using Microsoft.AspNetCore.Mvc;

namespace EndpointHelpers;

public sealed class HomeControllerUrlHelper(IUrlHelper url)
{
    public string Index()
    {
        return url.Action("Index", "Home")!;
    }

    public string Privacy()
    {
        return url.Action("Privacy", "Home")!;
    }

    public string Error()
    {
        return url.Action("Error", "Home")!;
    }

}

public static class UrlHelperExtensions
{
    extension(IUrlHelper url)
    {
        public HomeControllerUrlHelper Home => new HomeControllerUrlHelper(url);

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\EndpointHelpers\src\TestMVC\obj\GX\EndpointHelpers\EndpointHelpers.ViewGenerator\ViewHelpers.g.cs" label="ViewHelpers.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable

using Microsoft.AspNetCore.Mvc;

namespace TestMVC.Controllers
{
    public partial class HomeController
    {
        protected ViewResult IndexView()
        {
            return new ViewResult
            {
                ViewName = "Index",
                ViewData = ViewData,
                TempData = TempData
            };
        }

        protected ViewResult IndexView(object? model)
        {
            ViewData.Model = model;
            return new ViewResult
            {
                ViewName = "Index",
                ViewData = ViewData,
                TempData = TempData
            };
        }

        protected ViewResult PrivacyView()
        {
            return new ViewResult
            {
                ViewName = "Privacy",
                ViewData = ViewData,
                TempData = TempData
            };
        }

        protected ViewResult PrivacyView(object? model)
        {
            ViewData.Model = model;
            return new ViewResult
            {
                ViewName = "Privacy",
                ViewData = ViewData,
                TempData = TempData
            };
        }

    }

}


```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project EndpointHelpers ](/sources/EndpointHelpers.zip)

:::


### Share EndpointHelpers 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEndpointHelpers&quote=EndpointHelpers" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEndpointHelpers&text=EndpointHelpers:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEndpointHelpers" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEndpointHelpers&title=EndpointHelpers" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEndpointHelpers&title=EndpointHelpers&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FEndpointHelpers" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/EndpointHelpers

<SameCategory />

