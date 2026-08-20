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
<a href='@Url.Action(action: "Details",controller: "Orders", values: new { orderId = 123, source = "dashboard" } )'>
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
