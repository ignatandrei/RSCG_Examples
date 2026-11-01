# BuilderGenerator [![NuGet Package](https://img.shields.io/nuget/v/IncrementalSourceGenerator.BuilderPattern.svg)](https://www.nuget.org/packages/IncrementalSourceGenerator.BuilderPattern)


## Introduction
The BuilderGenerator is a Roslyn powered incremental source generator.
Its purpose is to automate the generation of object builders for testing - using a fluent syntax.
It generates the repetitive part of creating builders, leaving only the more interesting, hand-curated parts for you to implement as partial classes.

An example usage for a domain entity can be seen in the following:

```csharp
var site = new SiteBuilder()
                .WithName("building1")
                .WithCreatedAt("2025-12-24")
                .WithRevision(2)
            .Build();
```

## Installation
Add NuGet package reference:
```bash
dotnet add package IncrementalSourceGenerator.BuilderPattern
```


## How to use in consuming project
Add a folder/namespace in which you plan to have your builders located (e.g. named *Builders*).
In the *Builders* folder, add a builder for the given entity.
This is just a public partial class decorated with a *Builder* attribute that describes for which entity the builder should be created:

```csharp
using Generator;
using Domain.Site;

namespace Generator.Tests.Data.Builders;

[Builder(typeof(Site))]
internal sealed partial class SiteBuilder { }
```
And now you have all the code necessary for using your builders.

## Under the hood
The generated source code comprises the repetitive, boring part of the process, including the backing field and ”With” methods that provide the fluent builder syntax.

Thus, for a domain object like the following:

```csharp
public class Site
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    public int Revision { get; set; }
    public IList<SiteRights> SiteRights { get; set; } = new List<SiteRights>();
}
```

The following source code is emitted:

```csharp

[System.CodeDom.Compiler.GeneratedCode("Generator", "v1")]
internal partial class SiteBuilder
{
    private Func<Generator.SampleTest.Site> _factory = () => new();   
    private readonly List<Action<Generator.SampleTest.Site>> _domainRules = new();
    private Func<DateTime>? _createdAt;
    private Func<long>? _id;
    private Func<string>? _name;
    private Func<int>? _revision;
    private Func<IList<SiteRights>>? _siteRights;

    public SiteBuilder WithCreatedAt(DateTime @createdAt)
    {
        return WithCreatedAt(() => @createdAt);
    }
    public SiteBuilder WithCreatedAt(Func<DateTime> @createdAt)
    {
        _createdAt = @createdAt;
        return this;
    }

    public SiteBuilder WithId(long @id)
    {
        return WithId(() => @id);
    }
    public SiteBuilder WithId(Func<long> @id)
    {
        _id = @id;
        return this;
    }

    public SiteBuilder WithName(string @name)
    {
        return WithName(() => @name);
    }
    public SiteBuilder WithName(Func<string> @name)
    {
        _name = @name;
        return this;
    }

    public SiteBuilder WithRevision(int @revision)
    {
        return WithRevision(() => @revision);
    }
    public SiteBuilder WithRevision(Func<int> @revision)
    {
        _revision = @revision;
        return this;
    }

    public SiteBuilder WithSiteRights(IList<SiteRights> @siteRights)
    {
        return WithSiteRights(() => @siteRights);
    }
    public SiteBuilder WithSiteRights(Func<IList<SiteRights>> @siteRights)
    {
        _siteRights = @siteRights;
        return this;
    }

    /// <summary> 
    /// Returns configured instance of Generator.Tests.Data.Site 
    /// </summary>
    public Generator.SampleTest.Site Build()
    {
        Generator.SampleTest.Site instance = _factory();

        if(_createdAt is not null)
            instance.CreatedAt = _createdAt.Invoke();

        if(_id is not null)
            instance.Id = _id.Invoke();

        if(_name is not null)
            instance.Name = _name.Invoke();

        if(_revision is not null)
            instance.Revision = _revision.Invoke();

        _siteRights?.Invoke()?
            .ToList()
            .ForEach(item => instance.SiteRights.Add(item));

        _domainRules.ForEach(action => action(instance));

        return instance;
    }
}
```

## Advised usage
The proceeding subsections will paint a picture of how the builders can be set up such that they serve as living documentation for the entity, communicating common usage patterns, invariants, and intent directly to developers working with the system.

### Static factory methods

A common and recommended pattern is to define a small hierarchy of static factory methods on each builder. These methods represent specific domain scenarios and serve as stable, intentional starting points for tests.

For example, a `SiteBuilder` might define the following factory methods:

#### Minimal
- Produces the smallest possible instance that satisfies all invariants and can be persisted.
- Serves as the foundation for all other factory methods.
- When a new required field is added to the domain model, updating this method is often sufficient to fix most tests.

#### Typical
- Represents a realistic, commonly used configuration of the entity.
- Builds on `Minimal` and fills in additional relationships or values.
- Intended to reflect how the entity is most often encountered in real scenarios.

#### Scenario-specific factories
- Additional factory methods (e.g. `AdminSite`) may be introduced when a particular configuration appears repeatedly across tests.
- These methods encode recurring test scenarios directly into the builder, reducing duplication and improving clarity.

By centralizing common configurations with such a pattern, ad hoc object creation in individual tests is avoided, and test code remains consistent and maintainable as the domain evolves.

An example for the `SiteBuilder` can be seen in the following:

```csharp
[Builder(typeof(Site))]
internal sealed partial class SiteBuilder
{
    public static SiteBuilder Minimal() => new SiteBuilder()
        .WithCreatedAt(DateTime.Now)
        .WithName("site1")
        .WithRevision(1);

    public static Site Typical() => Minimal()
        .WithSiteRights(new List<Entity3>() 
        {
        SiteRightsBuilder.Typical().Build() 
        });
}
```

### Domain Validation Rules

Builders may also define **domain validation rules** that are executed automatically during the `Build()` phase in the client code.

These rules can be stated in the builder’s constructor and express invariants that must hold for the constructed entity. If a rule is violated, the build process fails immediately with a clear error message.

An example of enforcement of such a constraint for the `SiteBuilder` is shown below:

```csharp
[Builder(typeof(Site))]
internal sealed partial class SiteBuilder
{
    private SiteBuilder()
    {
        _domainRules.AddDomainRule(
            predicate: e => e.Revision < 0, 
            errorMessage: "Negative revision is not permitted");
    }
}
```

### Guarantees against synthetic test data
By attaching validation rules directly to the builder, invalid test objects are rejected early, keeping test failures close to their cause and preventing subtle downstream errors. If a test explicitly requires invalid data, the object must be deliberately mutated after construction, making such scenarios intentional and visible.

Upon also persisting said builders in the database as the final step of the test arrangement phase, this approach provides strong guarantees against synthetic or invalid data, making it suitable for both unit and integration tests.


## Troubleshooting
Sometimes the code completion in Visual Studio gets confused and will wrongly either indicate With-methods as missing and not performing code completion correctly.  If you encounter this, try to clean your solution and perform a rebuild and further more restart your Visual Studio.


## Limitations
The generator supports anemic domain models and does not support DDD entities. 
The reason behind this is that the generated code is partially based on the public setters of the individual properties.


## Design Decisions

For architectural reasoning and trade-offs, see [Design Decisions](./DesignDecisions.md).