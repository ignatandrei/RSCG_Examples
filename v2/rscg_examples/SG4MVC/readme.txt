[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/SG4MVC?label=SG4MVC%20on%20nuget)](https://www.nuget.org/packages/SG4MVC)

## SG4MVC
SG4MVC is a source generator for ASP.NET MVC Core apps that creates strongly typed helpers that eliminate the use of literal strings in many places.  

It is a re-implementation of [R4MVC](https://github.com/T4MVC/R4MVC) using source generators.

R4MVC runs as you build, and currently has only been tested on net6.0

## Get Started?

Just want to get started? Visit the [Get Started page](../../wiki/1.-Get-Started) for installation and configuration instructions.

## Benefits

Instead of

```HTML+Razor
@Html.ActionLink("Dinner Details", "Details", "Dinners", new { id = Model.DinnerID }, null)
```
SG4MVC lets you write
```HTML+Razor
@Html.ActionLink("Dinner Details", MVC.Dinners.Details(Model.DinnerID))
```

When you're using tag helpers, instead of
```HTML+Razor
<a asp-action="Details" asp-controller="Dinners" asp-route-id="@Model.DinnerID">Dinner Details</a>
```
you can write (after registering Sg4Mvc tag helpers in `_ViewImports.cshtml` with the directive: `@addTagHelper *, Sg4Mvc`)
```HTML+Razor
<a mvc-action="MVC.Dinners.Details(Model.DinnerID)">Dinner Details</a>
```

and that's just the beginning!

### Use the following links to get started

*   **Install** SG4MVC is distributed using using [NuGet](http://nuget.org). Visit the [Get Started page](../../wiki/1.-Get-Started)
*   **Discuss**: Discuss it on [GitHub](https://github.com/SG4MVC/SG4MVC/issues)
*   **Contribute**
*   **History &amp; release notes**: [change history](CHANGELOG.md)
