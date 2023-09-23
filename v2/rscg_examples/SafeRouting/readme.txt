[//]: # (Generated file, do not edit manually. Source: README.source.md)
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
