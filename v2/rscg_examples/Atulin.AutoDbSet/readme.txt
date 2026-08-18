[![NuGet Version](https://img.shields.io/nuget/v/Atulin.AutoDbSet?style=for-the-badge)](https://www.nuget.org/packages/Atulin.AutoDbSet/)
![NuGet Downloads](https://img.shields.io/nuget/dt/Atulin.AutoDbSet?style=for-the-badge)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Atulin/AutoDbSet/publish.yml?style=for-the-badge)
[![GitHub License](https://img.shields.io/github/license/Atulin/AutoDbSet?style=for-the-badge)](./LICENSE)

# AutoDbSet

Automagically add `DbSet<T>`s to your `DbContext`

## Usage

Place `[AutoDbSet]` attribute on the database models you want to register...

```cs
using AutoDbSetGenerators;

namespace AutoDbSet.Demo;

[AutoDbSet]
public class Person
{
    public required string Name { get; set; }
    public required DateOnly Birthday { get; set; }
    public required float Height { get; set; }
}
```

Place `[AutoDbContext]` attribute on your `DbContext` and make it `partial`...

```cs
using AutoDbSetGenerators;
using Microsoft.EntityFrameworkCore;

namespace AutoDbSet.Demo;

[AutoDbContext]
public partial class MyCoolDbContext : DbContext
{
}
```

And watch the magic happen!

```cs
namespace AutoDbSet.Demo;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "2.0.0.0")]
public partial class MyCoolDbContext
{
    public required Microsoft.EntityFrameworkCore.DbSet<AutoDbSet.Demo.Person> Persons { get; init; }
}
```

## DbSet naming

By default `AutoDbSet` will try to naively pluralize the names ([here's how](./AutoDbSet/NameHelpers.cs)). It does not,
therefore, work with verbs that have irregular plural form, nor does it work with non-English languages.

You can, however, give the sets your own, custom name:

```cs
[AutoDbSetGenerators.AutoDbSet(Name = "People")]
public class Person
{
    public required string Name { get; set; }
    public required DateOnly Birthday { get; set; }
    public required float Height { get; set; }
}
```

will generate

```cs
namespace AutoDbSet.Demo;

[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute]
[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
[global::System.CodeDom.Compiler.GeneratedCode("AutoDbSet", "1.0.0.0")]
public partial class MyCoolDbContext
{
    public required Microsoft.EntityFrameworkCore.DbSet<AutoDbSet.Demo.Person> People { get; init; }
}
```

## Multiple `DbContext`s support

You can relate a given class to a given `DbContext` using the `DbContext` property of the
`[AutoDbSet]` attribute:

```cs
[AutoDbSetGenerators.AutoDbSet(DbContext = typeof(MyCoolerDbContext))]
public class CoolerPerson
{
    public required string Name { get; set; }
    public required DateOnly Birthday { get; set; }
    public required float Height { get; set; }
    public bool IsCool { get; } = true;
}
```

Classes without an explicit `DbContext` will be registered to the single `DbContext` that
was not specified in any other `[AutoDbSet]` attribute.

> [!IMPORTANT]
> There can only be a single default `DbContext`

## ExpressiveSharp support

AutoDbSet supports [ExpressiveSharp](https://github.com/EFNext/ExpressiveSharp) out of the box,
and generates `ExpressiveDbSet<T>`s instead of `DbSet<T>`s if it's available.