# Fluentify [![NuGet](https://img.shields.io/nuget/v/Fluentify?logo=nuget)](https://www.nuget.org/packages/Fluentify/) [![GitHub](https://img.shields.io/github/license/MooVC/Fluentify)](LICENSE.md)

Fluentify is a .NET Roslyn Source Generator designed to automate the creation of Fluent APIs. This tool enables engineers to rapidly develop rich, expressive, and maintainable APIs with ease. Utilizing Fluentify allows for cleaner code, easier maintenance, and more expressive interactions within your C# .NET applications.

If you are unfamiliar with Fluent Builder pattern, please review [Building Complex Objects in a Simple Way with C#](https://www.youtube.com/watch?v=kjxf3T4tRh4) by [Gui Ferreira](https://www.youtube.com/@gui.ferreira). Using its example, with Fluentify, we can transform how we configure movies from this:

```csharp
var movie = new Movie
{
    Actors =
    [
        new Actor
        {
            Birthday = 1940,
            FirstName = "Patrick",
            Surname = "Stewart",
        },
    ],
    Genre = Genre.SciFi,
    ReleasedOn = new DateOnly(1996, 12, 13),
    Title = "Star Trek: First Contact",
};
```

to this:

```csharp
var movie = new Movie()
   .OfGenre(Genre.SciFi)
   .WithTitle("Star Trek: First Contact")
   .ReleasedOn(new DateOnly(1996, 12, 13))
   .WithActors(actor => actor
       .WithFirstName("Patrick")
       .WithSurname("Stewart")
       .BornIn(1940));
```

This document will use the `Movie` example to describe how the features of Fluentify can be used to make the illustrated use of the Fluent Builder pattern possible. 

## Installation

To install Fluentify, use the following command in your package manager console:

```shell
install-package Fluentify
```

## Usage

Fluentify automatically creates extension methods for each property on types that have the `Fluentify` attribute, supporting both `class` and `record` types.

### Record Type Usage

```csharp
[Fluentify]
public record Actor(int Birthday, string FirstName, string Surname);

[Fluentify]
public record Movie(Actor[] Actors, Genre Genre, DateOnly ReleasedOn, string Title);
```

Marking the `record` type as `partial` will generate a default constructor, allowing for the `record` to be instantiated without first initializing the properties.

```csharp
[Fluentify]
public partial record Actor(int Birthday, string FirstName, string Surname);

// Allows for instantiation without property initialization
var actor = new Actor();
...
```

### Class Type Usage

```csharp
[Fluentify]
public class Actor
{
    public int Birthday { get; init; }
    public string FirstName { get; init; }
    public string Surname { get; init; }
}

[Fluentify]
public class Movie
{
    public Actor[] Actors { get; init; }
    public Genre Genre { get; init; }
    public DateOnly ReleasedOn { get; init; }
    public string Title { get; init; }
}
```

A `class` type is supported as long as the type has an accessible default constructor (implicit or explicit).

## Immutability

The generated extension methods preserve immutability, providing a new instance with the specified value applied to the associated property.

```csharp
var original = new Actor { Birthday = 1942 };
var @new = original.WithBirthday(1975);

Console.WriteLine(original.Birthday); // Displays 1942
Console.WriteLine(@new.Birthday);     // Displays 1975
```

## Auto Instantiation 

The value associated with a given property can be automatically instantiated, as long as that type associated with the property adheres to the `new()` constraint. A second extension method is generated for the property, accepting a `Func<T, T>` delegate as its parameter, which allows for the newly instantiated value to be configured before being applied.

```csharp
_ = movie.WithActors(actor => actor
    .WithBirthday(1940)
    .WithFirstName("Patrick")
    .WithSurname("Stewart"));
```

## Collection Parameterization 

Values can be appended to a list as long as the property type is `T[]`, `IEnumerable<T>`, `IReadOnlyCollection<T>`, `IReadOnlyList<T>`. Property types that derive from `ICollection<T>` and adhere to the `new()` constraint are also supported. Unlike with scalar properties, the generated extension method accepts a `params T[]`, allowing for one or more values to be specified in a single invocation.

```csharp
var original = new Movie { Actors = [picard] };
var @new = original.WithActors(worf);

Console.WriteLine(original.Actors.Length); // Displays 1
Console.WriteLine(@new.Actors.Length);     // Displays 2
```

## Custom Descriptors

The name of the generated extension method(s) can be customized via the `Descriptor` attribute.

### Record Type Usage

```csharp
[Fluentify]
public partial record Actor(
    [Descriptor("BornIn")] int Birthday,
    string FirstName,
    string Surname);

[Fluentify]
public partial record Movie(
    Actor[] Actors,
    [Descriptor("OfGenre")] Genre Genre,
    [Descriptor("ReleasedOn")] DateOnly ReleasedOn,
    string Title);
```

### Class Type Usage

```csharp
[Fluentify]
public class Actor
{
    [Descriptor("BornIn")]
    public int Birthday { get; init; }
    
    public string FirstName { get; init; }

    public string Surname { get; init; }
}

[Fluentify]
public class Movie
{
    public Actor[] Actors { get; init; }
    
    [Descriptor("OfGenre")] 
    public Genre Genre { get; init; }
    
    [Descriptor("ReleasedOn")]
    public DateOnly ReleasedOn { get; init; }
    
    public string Title { get; init; }
}
```

This allows for greater alignment with domain semantics:

```csharp
var movie = new Movie()
   .OfGenre(Genre.SciFi)
   .WithTitle("Star Trek: First Contact")
   .ReleasedOn(new DateOnly(1996, 12, 13))
   .WithActors(actor => actor
       .WithFirstName("Patrick")
       .WithSurname("Stewart")
       .BornIn(1940));
```

When no custom descriptor is specified, the extension method(s) will use the following pattern for all property types, except `bool`:

`With{PropertyName}`

For `bool`, the extension method will utilize the same name as the property.

## Property Exclusion

Specific properties can be excluded from generating Fluentify extension method(s) using the `Ignore` attribute:

### Record Type Usage

```csharp
[Fluentify]
public record Actor([Ignore] int Birthday, string FirstName, string Surname);
```

### Class Type Usage

```csharp
[Fluentify]
public class Actor
{
    [Ignore]
    public int Birthday { get; init; }
    public string FirstName { get; init; }
    public string Surname { get; init; }
}
```

This will result in an error if you try to use the ignored property in the chain:

```csharp
_ = actor
    .WithBirthday(1975) // IntelliSense Error: 'Actor' does not contain a definition for 'WithBirthday'
    .WithFirstName("Avery")
    .WithSurname("Brooks");
```

## Analyzers

Fluentify includes several analyzers to assist engineers with its usage. These are:

Rule ID                          | Category | Severity | Notes
:--------------------------------|:---------|:---------|:-------------------------------------------------------------------------
[FLTFY01](docs/rules/FLTFY01.md) | Design   | Warning  | Class must have an accessible parameterless constructor to use Fluentify
[FLTFY02](docs/rules/FLTFY02.md) | Usage    | Info     | Descriptor is disregarded from consideration by Fluentify
[FLTFY03](docs/rules/FLTFY03.md) | Usage    | Info     | Type does not utilize Fluentify
[FLTFY04](docs/rules/FLTFY04.md) | Naming   | Warning  | Descriptor must adhere to the naming conventions for Methods
[FLTFY05](docs/rules/FLTFY05.md) | Usage    | Info     | Type does not utilize Fluentify
[FLTFY06](docs/rules/FLTFY06.md) | Usage    | Info     | Property is already disregarded from consideration by Fluentify

## Building a Service

Combining Fluentify with additional, custom methods, can assist with the construction of complex types. For example:

```csharp
public class MyService
{
    public MyService(string connectionString, TimeSpan timeout)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(connectionString);
        ArgumentOutOfRangeException.ThrowIfLessThan(timeout.TotalSeconds, 1);

        ConnectionString = connectionString;
        Timeout = timeout;
    }

    public string ConnectionString { get; }

    public TimeSpan Timeout { get; }
}

[Fluentify]
public partial record MyServiceBuilder(
    [Descriptor("ConnectsTo")] string ConnectionString,
    [Descriptor("Waits")] int Timeout)
{
    public static MyServiceBuilder Default => new();
    
    public MyService Build()
    {
        return new MyService(ConnectionString, TimeSpan.FromSeconds(Timeout));
    }
}
```

In this example, a new instance of `MyService` can be created as follows:

```csharp
MyService service = MyServiceBuilder
    .Default
    .ConnectsTo("Some Connection String")
    .Waits(30)
    .Build();
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.