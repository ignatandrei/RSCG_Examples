---
sidebar_position: 600
title: 60 - SafeRouting
description: Safe Routing for MVC
slug: /SafeRouting
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# SafeRouting  by David Wake


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/SafeRouting?label=SafeRouting)](https://www.nuget.org/packages/SafeRouting/)
[![GitHub last commit](https://img.shields.io/github/last-commit/daviddotcs/safe-routing?label=updated)](https://github.com/daviddotcs/safe-routing)
![GitHub Repo stars](https://img.shields.io/github/stars/daviddotcs/safe-routing?style=social)

## Details

### Info
:::info

Name: **SafeRouting**

Generates strongly-typed route information for ASP.NET Core razor pages and MVC controllers.

Author: David Wake

NuGet: 
*https://www.nuget.org/packages/SafeRouting/*   


You can find more details at https://github.com/daviddotcs/safe-routing

Source : https://github.com/daviddotcs/safe-routing

:::

### Original Readme
:::note

# Safe Routing Source Generator for ASP.NET Core

[![SafeRouting NuGet Package](https://img.shields.io/nuget/v/SafeRouting.svg?style=for-the-badge&logo=nuget)](https://www.nuget.org/packages/SafeRouting)
[![GitHub Release](https://img.shields.io/github/v/release/daviddotcs/safe-routing?label=GitHub&logo=github&style=for-the-badge)](https://github.com/daviddotcs/safe-routing/releases/latest)

Safe Routing is a [source generator](https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) which analyses a project's razor pages and MVC controllers, producing strongly-typed representations of those routes as you type. This enables you to link between pages with compile time safety instead of using the standard _"stringly typed"_ approach.

## Table of Contents

- [Usage Example](#usage-example)
- [Installation](#installation)
    - [Tag Helpers](#tag-helpers)
    - [Extension Methods](#extension-methods)
- [Getting Started](#getting-started)
    - [Binding Source Attributes](#binding-source-attributes)
    - [Bundled Attributes](#bundled-attributes)
    - [Areas](#areas)
    - [Controller Methods with the Same Name](#controller-methods-with-the-same-name)
    - [Using Razor Class Libraries](#using-razor-class-libraries)
- [Configuration](#configuration)
    - [Available Configuration Options](#available-configuration-options)
- [Limitations](#limitations)
- [Working with the Source Code](#working-with-the-source-code)
    - [Projects](#projects)
    - [Building the NuGet Package](#building-the-nuget-package)

## Usage Example

Consider the following contrived example of a controller class.

```csharp
public sealed class ProductController : Controller
{
  [FromRoute]
  public int? Limit { get; set; }

  [Route("/Product/Search/{name}/{Limit?}")]
  public IActionResult Search(string name) => Ok();
}
```

Redirecting to the `Search` action could be rewritten as follows:

**BEFORE:**

```csharp
return RedirectToAction("Search", "Product", new { Name = "chair", Limit = 10 });
```

**AFTER:**

```csharp
return Routes.Controllers.Product.Search("chair", 10).Redirect(this);
```

The controller name, action name, names of action method parameters, and names of bound properties on the controller are no longer referenced with strings, and are instead referenced with C# classes, methods, parameters, and properties that offer compile time safety.

Similarly, consider the following razor page model class:

```csharp
public sealed class EditModel : PageModel
{
  [FromRoute]
  public int Id { get; set; }

  public void OnGet()
  {
    // ...
  }

  public void OnPost()
  {
    // ...
  }
}
```

The generated code enables you to access the URL for the `OnGet` handler with the following code:

```csharp
string? editUrl = Routes.Pages.Edit.Get(123).Url(Url);
```

## Installation

<!-- See https://github.com/dotnet/roslyn/blob/main/docs/wiki/NuGet-packages.md and https://learn.microsoft.com/en-au/dotnet/core/porting/versioning-sdk-msbuild-vs#lifecycle to determine SDK/VS versions based on Microsoft.CodeAnalysis.CSharp version used by SafeRouting.Generator -->

To install, simply add the [SafeRouting](https://www.nuget.org/packages/SafeRouting) package to your ASP.NET Core project. You must have .NET SDK 6.0.1xx or greater installed which is included in Visual Studio 17.0 or greater.

### Tag Helpers

To enable the included tag helpers, add the following line to `_ViewImports.cshtml` files where required.

```cshtml
@addTagHelper SafeRouting.TagHelpers.*, SafeRouting.Common
```

This enables `for-route` attributes to be added to `<a>`, `<img>`, and `<form>` elements, for example:

```cshtml
@{
  var controllerRoute = Routes.Controllers.Product.Search("chair", 10);
  var pageRoute = Routes.Pages.Edit.Post(Model.Id);
}

<!-- Adds the URL in the href attribute -->
<a for-route="controllerRoute">Search for chairs</a>

<!-- Adds the URL in the src attribute -->
<img for-route="controllerRoute" alt="" />

<!-- Adds the URL in the action attribute -->
<form for-route="pageRoute" method="post"></form>
```

### Extension Methods

The `Redirect` extension methods return `RedirectToActionResult` or `RedirectToPageResult` values as appropriate for the particular route, and accept the active controller or page model as a parameter. The `Url` extension methods return a string with a URL for the route, accepting an `IUrlHelper` instance as a parameter.

For projects using C# 8 or 9, add `using SafeRouting.Extensions;` to your source code to access the extension methods `Redirect()` and `Url()`. Projects using C# 10 or above will automatically have access to these extension methods via a generated `global using static` directive.

## Getting Started

The following code snippet demonstrates accessing, modifying, and retrieving generated route information for the `ProductController` class defined above.

```csharp
// For C# 9 and below include this using directive to enable the Redirect() and Url() extension methods:
//using SafeRouting.Extensions;

// Get route information for the Search method on ProductController with a name value of "chair" and limit unset
// Route: /Product/Search/chair
var route = Routes.Controllers.Product.Search("chair", limit: null);

// Assign a value for the Limit property (defined on the controller class)
// Route: /Product/Search/chair/5
route[route.Properties.Limit] = 5;

// Set the value of a parameter
// Route: /Product/Search/book/5
route[route.Parameters.Name] = "book";

// Set a value using the Set method
// Route: /Product/Search/book/10
route.Set(route.Properties.Limit, 10);

// Remove a route value
// Route: /Product/Search/book
route.Remove(route.Properties.Limit);

// Access the URL for the route using an IUrlHelper
// Value: "/Product/Search/book"
string? routeUrl = route.Url(Url);

// Get route information for the OnGet method on the /Edit page
var pageRoute = Routes.Pages.Edit.Get(123);

// "/Edit?Id=123"
var path = pageRoute.Path(linkGenerator);

// "https://example.org/Edit?Id=123"
var uri = pageRoute.Url(linkGenerator, "https", new HostString("example.org"));

// Redirect from within a controller action method or a page handler method
return route.Redirect(this);
```

### Binding Source Attributes

The generated methods will closely resemble your original controller action methods and page handler methods, but will only include parameters which can be bound via the URL. Consider the following action method:

```csharp
public IActionResult Index(
  string standard,
  [FromBody] string fromBody,
  [FromForm] string fromForm,
  [FromHeader] string fromHeader,
  [FromQuery] string fromQuery,
  [FromRoute] string fromRoute,
  [FromServices] string fromServices)
{
  // ...
}
```

The generated route helper method omits the parameters with the attributes `[FromBody]`, `[FromForm]`, `[FromHeader]`, and `[FromServices]` because they are not bound to any part of the URL. The generated helper method instead looks like this:

```csharp
public static IndexRouteInfo Index(string standard, string fromQuery, string fromRoute)
{
  // ...
}
```

Properties on the controller or page model class which are annotated with `[FromRoute]`, `[FromQuery]`, or `[BindProperty(SupportsGet = true)]` attributes, and properties within a class annotated with `[BindProperties(SupportsGet = true)]` are automatically included in the signatures of all generated methods for that class. This ensures that all route values necessary for constructing a URL are provided when calling the methods. E.g; consider the following razor page model:

```csharp
public sealed class EditModel : PageModel
{
  [FromRoute]
  public int ProductId { get; set; }

  public void OnGet()
  {
    // ...
  }

  public void OnPost(string name)
  {
    // ...
  }
}
```

The route-bound `ProductId` property is added to each of the generated methods, resulting in the following method signatures:

```csharp
Support.Pages_Edit.GetRouteValues Get(int productId);
Support.Pages_Edit.PostRouteValues Post(string name, int productId);
```

### Bundled Attributes

A couple of included attributes allow you to customise how the source generator interprets your code. `[ExcludeFromRouteGenerator]` can be applied to a class, property, method, or parameter to have it be ignored by the analyser. `[RouteGeneratorName]` allows you to rename any symbol (class, property, method, or parameter) in the generated code, which can help you avoid naming conflicts.

### Areas

By default, the generated helper classes for controller and page routes will be added to the namespaces `Routes.Controllers` and `Routes.Pages`, respectively. Controllers adorned with the `[Area]` attribute, and pages within an `/Areas/{area-name}/Pages/` directory structure have their helper classes added to `Routes.Areas.AreaName.Controllers` and `Routes.Areas.AreaName.Pages` respectively (replacing _AreaName_ with the name of the area).

### Controller Methods with the Same Name

There are a couple of situations to be mindful of involving controllers with multiple methods of the same name. Firstly, consider the following controller:

```csharp
public class ProductController : Controller
{
  public IActionResult Edit(int productId)
  {
    // ...
  }

  [HttpPost]
  public IActionResult Edit(int productId, [FromForm] string name)
  {
    // ...
  }
}
```

Because of the way that the generated methods only include parameters which can be bound via the URL, the the above methods would both result in generated methods with the same signature. Because of this, the above code results in a compile error. To work around this, you could either rename one of the methods, or apply the `[RouteGeneratorName]` attribute to one of the methods to rename the generated method into something unique.

The other situation to be aware of is when you have multiple overloads with different resulting signatures, the generated route values classes returned by the generated methods will be named with sequential numbers to ensure uniqueness. For example, if the above class was written without the `[FromForm]` attribute, the generated methods would be written with the following signatures:

```csharp
Support.Controllers_Product.EditRouteValues Edit(int productId);
Support.Controllers_Product.Edit2RouteValues Edit(int productId, string name);
```

It is recommended that you don't directly reference the names of the classes returned by those methods, and instead use the `var` keyword if you need to capture the result into a variable. I.e.;

```csharp
var route = Routes.Controllers.Product.Edit(1, "Blanket");
```

### Using Razor Class Libraries

Route information is only generated for source code within each project which references the SafeRouting package. In order to reference routes within another library, that library must reference SafeRouting and be configured to use the public access modifier for classes (which is the default).

## Configuration

This source generator can be configured via a [Global AnalyzerConfig](https://docs.microsoft.com/en-gb/dotnet/fundamentals/code-analysis/configuration-files#global-analyzerconfig) file.

Example `.globalconfig` file:

```editorconfig
is_global = true

safe_routing.generated_access_modifier = internal
safe_routing.generated_namespace = Example.Namespace.Routes
```

### Available Configuration Options

| Option | Description |
|--------|-------------|
| `safe_routing.generated_access_modifier` | The access modifier used for all generated classes. Can be _public_ or _internal_. Defaults to _public_. |
| `safe_routing.generated_namespace` | The namespace under which all generated route classes are created. Defaults to _Routes_. |
| `safe_routing.generated_parameter_case` | The case used for parameters in generated methods. Can be _standard_ (camel case) or _pascal_. Defaults to _standard_. |

## Limitations

* The including project must use C# 8 or later.
* Pages must have a `PageModel` inheriting class within a `.cshtml.cs` file in either a `Pages` or `Areas/{area name}/Pages` directory at any depth to be discovered. They may also only be declared as partial classes as long as the declaration within the `.cshtml.cs` file explicitly inherits from `PageModel`.
* Multiple classes which inherit from `PageModel` cannot be declared in the same `.cshtml.cs` file.
* Custom attributes which affect routing are unsupported and will be ignored by the source generator.
* Nullable annotations on parameter and property types are respected, but attributes affecting nullability are not copied across to the generated code.
* Generic classes, nested classes, and non-public classes which inherit from `PageModel` are ignored by the source generator.
* For .NET 7 and beyond, it is recommended to either continue using the `[FromServices]` attribute (or optionally `[FromKeyedServices]` in .NET 8+) for parameters which are implicitly injected, or to replace it with `[ExcludeFromRouteGenerator]`. Otherwise injected parameters will be included in the method signatures of the generated route methods.
* Only parameters and properties of [simple types](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-6.0#simple-types) are currently supported.

## Working with the Source Code

### Projects

* `SafeRouting.Common`: A class library which is included in the NuGet package to define types, tag helpers, and extension methods.
* `SafeRouting.Generator`: The source generator itself.
* `SafeRouting.Tests.Integration`: Integration tests to ensure the source generator works within a standard project.
* `SafeRouting.Tests.Unit`: A series of snapshot tests to verify that the source generator is producing the expected output for given source code inputs. Each test which produces a diagnostic or generates source code will have matching `*.verified.*` files in the _Snapshots_ directory containing that expected output.

### Building the NuGet Package

* Ensure you have the latest .NET SDK installed via https://dotnet.microsoft.com/en-us/download/dotnet.
* Install [dotnet-script](https://github.com/filipw/dotnet-script).

```
dotnet tool install -g dotnet-script
```

* Within the `src` directory, run the build script with the new build number as an argument, e.g.; 1.2.3.

```
dotnet script build.csx -- 1.2.3
```

* Review the output to ensure that the build succeeded and all tests passed.


:::

### About
:::note

Safe Routing for MVC


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SafeRouting**
```xml showLineNumbers {10}
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="SafeRouting" Version="1.4.0" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml" label="_ViewImports.cshtml" >

  This is the use of **SafeRouting** in *_ViewImports.cshtml*

```csharp showLineNumbers 
@using SafeRoutingDemo
@using SafeRoutingDemo.Models
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper SafeRouting.TagHelpers.*, SafeRouting.Common

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml" label="_Layout.cshtml" >

  This is the use of **SafeRouting** in *_Layout.cshtml*

```csharp showLineNumbers 
@{
    var privacy = Routes.Controllers.Home.Privacy();

}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - SafeRoutingDemo</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/SafeRoutingDemo.styles.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">SafeRoutingDemo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
                            <a for-route="privacy">!New Privacy!</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2023 - SafeRoutingDemo - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>
    </footer>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Home_Index_cshtml.g.cs" label="Views_Home_Index_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Index.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "2999aea4fd9585148590d2af132f38ffc044fe9b3869b38d4a2bbf6259d065ea"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Home/Index.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"text-center\">\r\n    <h1 class=\"display-4\">Welcome</h1>\r\n    <p>Learn about <a href=\"https://docs.microsoft.com/aspnet/core\">building Web apps with ASP.NET Core</a>.</p>\r\n</div>\r\n");
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Home_Privacy_cshtml.g.cs" label="Views_Home_Privacy_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Privacy.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "0e00a4445b214863ea51c8985fae1970b43e932712216fa047faf3062bb23445"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Home_Privacy), @"mvc.1.0.view", @"/Views/Home/Privacy.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Home/Privacy.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Home_Privacy : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Privacy.cshtml"
  
    ViewData["Title"] = "Privacy Policy";

#line default
#line hidden
#nullable disable
            WriteLiteral("<h1>");
#nullable restore
#line (4,6)-(4,23) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Privacy.cshtml"
Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</h1>\r\n\r\n<p>Use this page to detail your site\'s privacy policy.</p>\r\n");
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Shared_Error_cshtml.g.cs" label="Views_Shared_Error_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "5dbf98b6b9394ad78206edce40cab1d7a238aa69cfefa41bab0ebc6aa22488aa"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Shared_Error), @"mvc.1.0.view", @"/Views/Shared/Error.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Shared/Error.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Shared_Error : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<ErrorViewModel>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
  
    ViewData["Title"] = "Error";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<h1 class=\"text-danger\">Error.</h1>\r\n<h2 class=\"text-danger\">An error occurred while processing your request.</h2>\r\n\r\n");
#nullable restore
#line 9 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
 if (Model.ShowRequestId)
{

#line default
#line hidden
#nullable disable
            WriteLiteral("    <p>\r\n        <strong>Request ID:</strong> <code>");
#nullable restore
#line (12,45)-(12,60) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
Write(Model.RequestId);

#line default
#line hidden
#nullable disable
            WriteLiteral("</code>\r\n    </p>\r\n");
#nullable restore
#line 14 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
}

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<h3>Development Mode</h3>
<p>
    Swapping to <strong>Development</strong> environment will display more detailed information about the error that occurred.
</p>
<p>
    <strong>The Development environment shouldn't be enabled for deployed applications.</strong>
    It can result in displaying sensitive information from exceptions to end users.
    For local debugging, enable the <strong>Development</strong> environment by setting the <strong>ASPNETCORE_ENVIRONMENT</strong> environment variable to <strong>Development</strong>
    and restarting the app.
</p>
");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<ErrorViewModel> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Shared__Layout_cshtml.g.cs" label="Views_Shared__Layout_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Shared__Layout), @"mvc.1.0.view", @"/Views/Shared/_Layout.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Shared/_Layout.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Shared__Layout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/bootstrap/dist/css/bootstrap.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", "~/css/site.css", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", "~/SafeRoutingDemo.styles.css", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("navbar-brand"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-area", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-controller", "Home", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Index", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("nav-link text-dark"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_9 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Privacy", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_10 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/jquery/dist/jquery.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_11 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_12 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", "~/js/site.js", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        private global::SafeRouting.TagHelpers.RouteValuesTagHelper __SafeRouting_TagHelpers_RouteValuesTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
  
    var privacy = Routes.Controllers.Home.Privacy();


#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html lang=\"en\">\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed58594", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>");
#nullable restore
#line (10,13)-(10,30) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - SafeRoutingDemo</title>\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed59295", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed510497", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.Href = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
#nullable restore
#line 12 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion = true;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed512566", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.Href = (string)__tagHelperAttribute_3.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
#nullable restore
#line 13 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion = true;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed515339", async() => {
                WriteLiteral("\r\n    <header b-jhf4u2mpiu>\r\n        <nav b-jhf4u2mpiu class=\"navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3\">\r\n            <div b-jhf4u2mpiu class=\"container-fluid\">\r\n                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed515864", async() => {
                    WriteLiteral("SafeRoutingDemo");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_7.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                <button b-jhf4u2mpiu class=""navbar-toggler"" type=""button"" data-bs-toggle=""collapse"" data-bs-target="".navbar-collapse"" aria-controls=""navbarSupportedContent""
                        aria-expanded=""false"" aria-label=""Toggle navigation"">
                    <span b-jhf4u2mpiu class=""navbar-toggler-icon""></span>
                </button>
                <div b-jhf4u2mpiu class=""navbar-collapse collapse d-sm-inline-flex justify-content-between"">
                    <ul b-jhf4u2mpiu class=""navbar-nav flex-grow-1"">
                        <li b-jhf4u2mpiu class=""nav-item"">
                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed518271", async() => {
                    WriteLiteral("Home");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_7.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                        </li>\r\n                        <li b-jhf4u2mpiu class=\"nav-item\">\r\n                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed520147", async() => {
                    WriteLiteral("Privacy");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_9.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_9);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed521929", async() => {
                    WriteLiteral("!New Privacy!");
                }
                );
                __SafeRouting_TagHelpers_RouteValuesTagHelper = CreateTagHelper<global::SafeRouting.TagHelpers.RouteValuesTagHelper>();
                __tagHelperExecutionContext.Add(__SafeRouting_TagHelpers_RouteValuesTagHelper);
#nullable restore
#line 31 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__SafeRouting_TagHelpers_RouteValuesTagHelper.ForRoute = privacy;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("for-route", __SafeRouting_TagHelpers_RouteValuesTagHelper.ForRoute, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </nav>\r\n    </header>\r\n    <div b-jhf4u2mpiu class=\"container\">\r\n        <main b-jhf4u2mpiu role=\"main\" class=\"pb-3\">\r\n            ");
#nullable restore
#line (40,14)-(40,26) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
Write(RenderBody());

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n        </main>\r\n    </div>\r\n\r\n    <footer b-jhf4u2mpiu class=\"border-top footer text-muted\">\r\n        <div b-jhf4u2mpiu class=\"container\">\r\n            &copy; 2023 - SafeRoutingDemo - ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed524130", async() => {
                    WriteLiteral("Privacy");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_9.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_9);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n        </div>\r\n    </footer>\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed525836", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_10);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed526961", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_11);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed528086", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.Src = (string)__tagHelperAttribute_12.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_12);
#nullable restore
#line 51 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.AppendVersion = true;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
#nullable restore
#line (52,6)-(52,58) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
Write(await RenderSectionAsync("Scripts", required: false));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>\r\n");
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Shared__ValidationScriptsPartial_cshtml.g.cs" label="Views_Shared__ValidationScriptsPartial_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_ValidationScriptsPartial.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "9ef82fee87759dfecf2638af263085e669aa14a40c723d556d790d65a525ba11"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Shared__ValidationScriptsPartial), @"mvc.1.0.view", @"/Views/Shared/_ValidationScriptsPartial.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Shared/_ValidationScriptsPartial.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Shared__ValidationScriptsPartial : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/jquery-validation/dist/jquery.validate.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9ef82fee87759dfecf2638af263085e669aa14a40c723d556d790d65a525ba114069", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9ef82fee87759dfecf2638af263085e669aa14a40c723d556d790d65a525ba115132", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views__ViewImports_cshtml.g.cs" label="Views__ViewImports_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "b33e7bd52eada9ce3928211612ba84bf831cb9aab96479c704f9264424ab4158"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views__ViewImports), @"mvc.1.0.view", @"/Views/_ViewImports.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/_ViewImports.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views__ViewImports : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.CodeAnalysis.Razor.Compiler.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views__ViewStart_cshtml.g.cs" label="Views__ViewStart_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewStart.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "47e02b4da20d198892b7b1b00b12944068797c438ef2e82d20ff70b4d56bad39"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views__ViewStart), @"mvc.1.0.view", @"/Views/_ViewStart.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/_ViewStart.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views__ViewStart : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewStart.cshtml"
  
    Layout = "_Layout";

#line default
#line hidden
#nullable disable
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Home_Index_cshtml.g.cs" label="Views_Home_Index_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Index.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "2999aea4fd9585148590d2af132f38ffc044fe9b3869b38d4a2bbf6259d065ea"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Home/Index.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"text-center\">\r\n    <h1 class=\"display-4\">Welcome</h1>\r\n    <p>Learn about <a href=\"https://docs.microsoft.com/aspnet/core\">building Web apps with ASP.NET Core</a>.</p>\r\n</div>\r\n");
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Home_Privacy_cshtml.g.cs" label="Views_Home_Privacy_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Privacy.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "0e00a4445b214863ea51c8985fae1970b43e932712216fa047faf3062bb23445"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Home_Privacy), @"mvc.1.0.view", @"/Views/Home/Privacy.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Home/Privacy.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Home_Privacy : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Privacy.cshtml"
  
    ViewData["Title"] = "Privacy Policy";

#line default
#line hidden
#nullable disable
            WriteLiteral("<h1>");
#nullable restore
#line (4,6)-(4,23) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Home\Privacy.cshtml"
Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</h1>\r\n\r\n<p>Use this page to detail your site\'s privacy policy.</p>\r\n");
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Shared_Error_cshtml.g.cs" label="Views_Shared_Error_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "5dbf98b6b9394ad78206edce40cab1d7a238aa69cfefa41bab0ebc6aa22488aa"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Shared_Error), @"mvc.1.0.view", @"/Views/Shared/Error.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Shared/Error.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Shared_Error : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<ErrorViewModel>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
  
    ViewData["Title"] = "Error";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<h1 class=\"text-danger\">Error.</h1>\r\n<h2 class=\"text-danger\">An error occurred while processing your request.</h2>\r\n\r\n");
#nullable restore
#line 9 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
 if (Model.ShowRequestId)
{

#line default
#line hidden
#nullable disable
            WriteLiteral("    <p>\r\n        <strong>Request ID:</strong> <code>");
#nullable restore
#line (12,45)-(12,60) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
Write(Model.RequestId);

#line default
#line hidden
#nullable disable
            WriteLiteral("</code>\r\n    </p>\r\n");
#nullable restore
#line 14 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\Error.cshtml"
}

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<h3>Development Mode</h3>
<p>
    Swapping to <strong>Development</strong> environment will display more detailed information about the error that occurred.
</p>
<p>
    <strong>The Development environment shouldn't be enabled for deployed applications.</strong>
    It can result in displaying sensitive information from exceptions to end users.
    For local debugging, enable the <strong>Development</strong> environment by setting the <strong>ASPNETCORE_ENVIRONMENT</strong> environment variable to <strong>Development</strong>
    and restarting the app.
</p>
");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<ErrorViewModel> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Shared__Layout_cshtml.g.cs" label="Views_Shared__Layout_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Shared__Layout), @"mvc.1.0.view", @"/Views/Shared/_Layout.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Shared/_Layout.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Shared__Layout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/bootstrap/dist/css/bootstrap.min.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", "~/css/site.css", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", "~/SafeRoutingDemo.styles.css", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("navbar-brand"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-area", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-controller", "Home", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Index", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("nav-link text-dark"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_9 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Privacy", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_10 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/jquery/dist/jquery.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_11 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_12 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", "~/js/site.js", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        private global::SafeRouting.TagHelpers.RouteValuesTagHelper __SafeRouting_TagHelpers_RouteValuesTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
  
    var privacy = Routes.Controllers.Home.Privacy();


#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html lang=\"en\">\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed58594", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>");
#nullable restore
#line (10,13)-(10,30) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - SafeRoutingDemo</title>\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed59295", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed510497", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.Href = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
#nullable restore
#line 12 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion = true;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed512566", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.LinkTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.Href = (string)__tagHelperAttribute_3.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
#nullable restore
#line 13 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion = true;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_LinkTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed515339", async() => {
                WriteLiteral("\r\n    <header b-jhf4u2mpiu>\r\n        <nav b-jhf4u2mpiu class=\"navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3\">\r\n            <div b-jhf4u2mpiu class=\"container-fluid\">\r\n                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed515864", async() => {
                    WriteLiteral("SafeRoutingDemo");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_7.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                <button b-jhf4u2mpiu class=""navbar-toggler"" type=""button"" data-bs-toggle=""collapse"" data-bs-target="".navbar-collapse"" aria-controls=""navbarSupportedContent""
                        aria-expanded=""false"" aria-label=""Toggle navigation"">
                    <span b-jhf4u2mpiu class=""navbar-toggler-icon""></span>
                </button>
                <div b-jhf4u2mpiu class=""navbar-collapse collapse d-sm-inline-flex justify-content-between"">
                    <ul b-jhf4u2mpiu class=""navbar-nav flex-grow-1"">
                        <li b-jhf4u2mpiu class=""nav-item"">
                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed518271", async() => {
                    WriteLiteral("Home");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_7.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                        </li>\r\n                        <li b-jhf4u2mpiu class=\"nav-item\">\r\n                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed520147", async() => {
                    WriteLiteral("Privacy");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_9.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_9);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed521929", async() => {
                    WriteLiteral("!New Privacy!");
                }
                );
                __SafeRouting_TagHelpers_RouteValuesTagHelper = CreateTagHelper<global::SafeRouting.TagHelpers.RouteValuesTagHelper>();
                __tagHelperExecutionContext.Add(__SafeRouting_TagHelpers_RouteValuesTagHelper);
#nullable restore
#line 31 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__SafeRouting_TagHelpers_RouteValuesTagHelper.ForRoute = privacy;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("for-route", __SafeRouting_TagHelpers_RouteValuesTagHelper.ForRoute, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </nav>\r\n    </header>\r\n    <div b-jhf4u2mpiu class=\"container\">\r\n        <main b-jhf4u2mpiu role=\"main\" class=\"pb-3\">\r\n            ");
#nullable restore
#line (40,14)-(40,26) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
Write(RenderBody());

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n        </main>\r\n    </div>\r\n\r\n    <footer b-jhf4u2mpiu class=\"border-top footer text-muted\">\r\n        <div b-jhf4u2mpiu class=\"container\">\r\n            &copy; 2023 - SafeRoutingDemo - ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed524130", async() => {
                    WriteLiteral("Privacy");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Area = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Controller = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_9.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_9);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n        </div>\r\n    </footer>\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed525836", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_10);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed526961", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_11);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "72c7981441e7dd8348577278ecfae982d81850efd7ef5a304555b32696efeed528086", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.Src = (string)__tagHelperAttribute_12.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_12);
#nullable restore
#line 51 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.AppendVersion = true;

#line default
#line hidden
#nullable disable
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    ");
#nullable restore
#line (52,6)-(52,58) 6 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_Layout.cshtml"
Write(await RenderSectionAsync("Scripts", required: false));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>\r\n");
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views_Shared__ValidationScriptsPartial_cshtml.g.cs" label="Views_Shared__ValidationScriptsPartial_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\Shared\_ValidationScriptsPartial.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "9ef82fee87759dfecf2638af263085e669aa14a40c723d556d790d65a525ba11"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views_Shared__ValidationScriptsPartial), @"mvc.1.0.view", @"/Views/Shared/_ValidationScriptsPartial.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/Shared/_ValidationScriptsPartial.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views_Shared__ValidationScriptsPartial : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/jquery-validation/dist/jquery.validate.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9ef82fee87759dfecf2638af263085e669aa14a40c723d556d790d65a525ba114069", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9ef82fee87759dfecf2638af263085e669aa14a40c723d556d790d65a525ba115132", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views__ViewImports_cshtml.g.cs" label="Views__ViewImports_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "b33e7bd52eada9ce3928211612ba84bf831cb9aab96479c704f9264424ab4158"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views__ViewImports), @"mvc.1.0.view", @"/Views/_ViewImports.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/_ViewImports.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views__ViewImports : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\Microsoft.NET.Sdk.Razor.SourceGenerators\Microsoft.NET.Sdk.Razor.SourceGenerators.RazorSourceGenerator\Views__ViewStart_cshtml.g.cs" label="Views__ViewStart_cshtml.g.cs" >


```csharp showLineNumbers 
#pragma checksum "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewStart.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "47e02b4da20d198892b7b1b00b12944068797c438ef2e82d20ff70b4d56bad39"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCoreGeneratedDocument.Views__ViewStart), @"mvc.1.0.view", @"/Views/_ViewStart.cshtml")]
namespace AspNetCoreGeneratedDocument
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Mvc;
    using global::Microsoft.AspNetCore.Mvc.Rendering;
    using global::Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewImports.cshtml"
using SafeRoutingDemo.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("Identifier", "/Views/_ViewStart.cshtml")]
    [global::System.Runtime.CompilerServices.CreateNewOnMetadataUpdateAttribute]
    #nullable restore
    internal sealed class Views__ViewStart : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\Views\_ViewStart.cshtml"
  
    Layout = "_Layout";

#line default
#line hidden
#nullable disable
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\SafeRouting.Generator\SafeRouting.Generator.RouteGenerator\ControllerRoutes.g.cs" label="ControllerRoutes.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#pragma warning disable
#nullable enable

namespace Routes
{
  namespace Controllers
  {
    /// <summary>
    /// Generates route values for <see cref="global::SafeRoutingDemo.Controllers.HomeController"/>.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("SafeRouting.Generator", "1.4.0.0")]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public static class Home
    {
      /// <summary>
      /// Generates route values for <see cref="global::SafeRoutingDemo.Controllers.HomeController.Index()"/>.
      /// </summary>
      public static Support.Controllers_Home.IndexRouteValues Index()
      {
        return new Support.Controllers_Home.IndexRouteValues(new global::Microsoft.AspNetCore.Routing.RouteValueDictionary()
        {
          ["area"] = ""
        });
      }

      /// <summary>
      /// Generates route values for <see cref="global::SafeRoutingDemo.Controllers.HomeController.Privacy()"/>.
      /// </summary>
      public static Support.Controllers_Home.PrivacyRouteValues Privacy()
      {
        return new Support.Controllers_Home.PrivacyRouteValues(new global::Microsoft.AspNetCore.Routing.RouteValueDictionary()
        {
          ["area"] = ""
        });
      }

      /// <summary>
      /// Generates route values for <see cref="global::SafeRoutingDemo.Controllers.HomeController.Error()"/>.
      /// </summary>
      public static Support.Controllers_Home.ErrorRouteValues Error()
      {
        return new Support.Controllers_Home.ErrorRouteValues(new global::Microsoft.AspNetCore.Routing.RouteValueDictionary()
        {
          ["area"] = ""
        });
      }
    }
  }

  namespace Support.Controllers_Home
  {
    /// <summary>
    /// Represents route values for routes to <see cref="global::SafeRoutingDemo.Controllers.HomeController.Index()"/>.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("SafeRouting.Generator", "1.4.0.0")]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public sealed class IndexRouteValues : global::SafeRouting.IControllerRouteValues
    {
      /// <summary>
      /// Initialises a new instance of the <see cref="IndexRouteValues"/> class.
      /// </summary>
      /// <param name="routeValues">The initial values for the route.</param>
      public IndexRouteValues(global::Microsoft.AspNetCore.Routing.RouteValueDictionary routeValues)
      {
        RouteValues = routeValues;
      }

      /// <summary>
      /// The name of the controller for the route.
      /// </summary>
      public string ControllerName => "Home";
      /// <summary>
      /// The name of the action for the route.
      /// </summary>
      public string ActionName => "Index";
      /// <summary>
      /// Values for the route.
      /// </summary>
      public global::Microsoft.AspNetCore.Routing.RouteValueDictionary RouteValues { get; }
    }

    /// <summary>
    /// Represents route values for routes to <see cref="global::SafeRoutingDemo.Controllers.HomeController.Privacy()"/>.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("SafeRouting.Generator", "1.4.0.0")]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public sealed class PrivacyRouteValues : global::SafeRouting.IControllerRouteValues
    {
      /// <summary>
      /// Initialises a new instance of the <see cref="PrivacyRouteValues"/> class.
      /// </summary>
      /// <param name="routeValues">The initial values for the route.</param>
      public PrivacyRouteValues(global::Microsoft.AspNetCore.Routing.RouteValueDictionary routeValues)
      {
        RouteValues = routeValues;
      }

      /// <summary>
      /// The name of the controller for the route.
      /// </summary>
      public string ControllerName => "Home";
      /// <summary>
      /// The name of the action for the route.
      /// </summary>
      public string ActionName => "Privacy";
      /// <summary>
      /// Values for the route.
      /// </summary>
      public global::Microsoft.AspNetCore.Routing.RouteValueDictionary RouteValues { get; }
    }

    /// <summary>
    /// Represents route values for routes to <see cref="global::SafeRoutingDemo.Controllers.HomeController.Error()"/>.
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCode("SafeRouting.Generator", "1.4.0.0")]
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
    public sealed class ErrorRouteValues : global::SafeRouting.IControllerRouteValues
    {
      /// <summary>
      /// Initialises a new instance of the <see cref="ErrorRouteValues"/> class.
      /// </summary>
      /// <param name="routeValues">The initial values for the route.</param>
      public ErrorRouteValues(global::Microsoft.AspNetCore.Routing.RouteValueDictionary routeValues)
      {
        RouteValues = routeValues;
      }

      /// <summary>
      /// The name of the controller for the route.
      /// </summary>
      public string ControllerName => "Home";
      /// <summary>
      /// The name of the action for the route.
      /// </summary>
      public string ActionName => "Error";
      /// <summary>
      /// Values for the route.
      /// </summary>
      public global::Microsoft.AspNetCore.Routing.RouteValueDictionary RouteValues { get; }
    }
  }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SafeRouting\src\SafeRoutingDemo\obj\GX\SafeRouting.Generator\SafeRouting.Generator.RouteGenerator\globalusings.g.cs" label="globalusings.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

global using static SafeRouting.Extensions.RouteValueExtensions;
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project SafeRouting ](/sources/SafeRouting.zip)

:::


### Share SafeRouting 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSafeRouting&quote=SafeRouting" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSafeRouting&text=SafeRouting:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSafeRouting" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSafeRouting&title=SafeRouting" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSafeRouting&title=SafeRouting&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSafeRouting" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SafeRouting

### In the same category (API) - 7 other generators


#### [Microsoft.Extensions.Configuration.Binder](/docs/Microsoft.Extensions.Configuration.Binder)


#### [MinimalApiBuilder](/docs/MinimalApiBuilder)


#### [MinimalApis.Discovery](/docs/MinimalApis.Discovery)


#### [RDG](/docs/RDG)


#### [Refit](/docs/Refit)


#### [RSCG_WebAPIExports](/docs/RSCG_WebAPIExports)


#### [SkinnyControllersCommon](/docs/SkinnyControllersCommon)

