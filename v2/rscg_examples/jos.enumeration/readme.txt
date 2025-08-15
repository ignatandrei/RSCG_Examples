# JOS.Enumeration
Enumeration implementation with source generation support.

## Installation
### JOS.Enumeration
Contains the `IEnumeration interface` and a `System.Text.Json` JsonConverter.
The `JOS.Enumeration.SourceGenerator` package contains the actual source generator.

**Don't forget to install that one as well.** 😃

```
dotnet add package JOS.Enumeration
dotnet add package JOS.Enumeration.SourceGenerator
```

### JOS.Enumeration.Database.Dapper
Contains a custom `TypeHandler` to use with Dapper.

`dotnet add package JOS.Enumeration.Database.Dapper`

### JOS.Enumeration.Database.EntityFrameworkCore
Contains ConfigureEnumeration extension method to allow usage with EntityFramework Core.

`dotnet add package JOS.Enumeration.Database.EntityFrameworkCore`

## Usage
* Create a new *partial* `record` or `class`
* Implement the `IEnumeration<T>` interface
* Add your Enumeration items
```csharp
public partial record Hamburger : IEnumeration<Hamburger>
{
    public static readonly Hamburger Cheeseburger = new (1, "Cheeseburger");
    public static readonly Hamburger BigMac = new(2, "Big Mac");
    public static readonly Hamburger BigTasty = new(3, "Big Tasty");
}
```
The source generator will implement the following interface:
```csharp
// Default implementation -> int as Value
public interface IEnumeration<T> : IEnumeration<int, T> where T : IEnumeration<T>
{
}

public interface IEnumeration<TValue, TType> where TValue : IConvertible
{
    TValue Value { get; }
    string Description { get; }
    static abstract IReadOnlySet<TType> GetAll();
    static abstract IEnumerable<TType> GetEnumerable();
    static abstract TType FromValue(TValue value);
    static abstract TType FromDescription(string description);
    static abstract TType FromDescription(ReadOnlySpan<char> description);
    static abstract Type ValueType { get; }
}
```
The following code will be generated:
```csharp
[System.Diagnostics.DebuggerDisplay("{Description}")]
[System.CodeDom.Compiler.GeneratedCode("JOS.Enumeration.SourceGenerator", "4.1.11-beta+afeaa87a52")]
[System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
public partial record Hamburger : IComparable<JOS.Enumerations.Hamburger>
{
    private static readonly IReadOnlySet<JOS.Enumerations.Hamburger> AllItems;
    static Hamburger()
    {
        AllItems = new HashSet<JOS.Enumerations.Hamburger>(3)
        {
            Cheeseburger,
            BigMac,
            BigTasty,
        }.ToFrozenSet();
    }

    private Hamburger(int value, string description)
    {
        Value = value;
        Description = description ?? throw new ArgumentNullException(nameof(description));
    }

    public int Value { get; }
    public string Description { get; }

    public static IReadOnlySet<JOS.Enumerations.Hamburger> GetAll()
    {
        return AllItems;
    }

    public static IEnumerable<JOS.Enumerations.Hamburger> GetEnumerable()
    {
        yield return Cheeseburger;
        yield return BigMac;
        yield return BigTasty;
    }

    public static JOS.Enumerations.Hamburger FromValue(int value)
    {
        return value switch
        {
            1 => Cheeseburger,
            2 => BigMac,
            3 => BigTasty,
            _ => throw new InvalidOperationException($"'{value}' is not a valid value in 'JOS.Enumerations.Hamburger'")};
    }

    public static JOS.Enumerations.Hamburger FromDescription(string description)
    {
        return description switch
        {
            "Cheeseburger" => Cheeseburger,
            "Big Mac" => BigMac,
            "Big Tasty" => BigTasty,
            _ => throw new InvalidOperationException($"'{description}' is not a valid description in 'JOS.Enumerations.Hamburger'")};
    }

    public static JOS.Enumerations.Hamburger FromDescription(ReadOnlySpan<char> description)
    {
        return description switch
        {
            "Cheeseburger" => Cheeseburger,
            "Big Mac" => BigMac,
            "Big Tasty" => BigTasty,
            _ => throw new InvalidOperationException($"'{description}' is not a valid description in 'JOS.Enumerations.Hamburger'")};
    }

    public static Type ValueType => typeof(int);

    public int CompareTo(JOS.Enumerations.Hamburger? other) => Value.CompareTo(other!.Value);
    public static implicit operator int (JOS.Enumerations.Hamburger item) => item.Value;
    public static implicit operator JOS.Enumerations.Hamburger(int value) => FromValue(value);
}
```
## Features
* Generic value
* Generated `IComparable<T>` method.
* Generated implicit operators (convert to/from int).
* Generated optimized `GetAll`, `FromValue` and `FromDescription` methods.
* System.Text.Json support
* Database support (Dapper and EF Core).

### Generic value

It's possible to use a generic value instead of the default `int` value by implementing the `IEnumeration<TValue, TEnumeration>` interface.

```csharp
public partial record Car : IEnumeration<string, Car>
{
    public static readonly Car FerrariSpider = new("ferrari-spider", "Ferrari Spider");
    public static readonly Car TeslaModelY = new("tesla-model-y", "Tesla Model Y");
}
```
`TValue` has a [*IConvertible*](https://learn.microsoft.com/en-us/dotnet/api/system.iconvertible?WT.mc_id=DT-MVP-5004074) constraint.

The following types has been tested and are guaranteed to work:
* int (default)
* bool
* decimal
* long
* string
* uint
* ulong

### JSON
The package comes with a `JsonConverterFactory`.
Example:
```csharp
var jsonSerializerOptions = new JsonSerializerOptions
{
    Converters = { new EnumerationJsonConverterFactory() }
};
```

It supports the following scenarios:
* Serializing to `TValue`
* Deserializing from `TValue`

If you want any other behaviour, just create your own converter and register it.

### Database
```csharp
public class MyEntity
{
    public MyEntity(Guid id, Hamburger hamburger)
    {
        Id = id;
        Hamburger = hamburger;
    }

    public Guid Id { get; }
    public Hamburger Hamburger { get; }
}
```
#### Dapper
* Register the TypeHandler: `SqlMapper.AddTypeHandler(new EnumerationTypeHandler<Hamburger>())`
* Query like this:
```csharp
var results = (await actConnection.QueryAsync<MyEntity>(
            "SELECT id, hamburger from my_entities WHERE id = @id", new {id = myEntity.Id})).ToList(); 
```

#### EF Core
* Configure your DB Context
```csharp
public DbSet<MyEntity> MyEntities { get; set; } = null!;

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(JosEnumerationDbContext).Assembly);
} 
```
```csharp
public class MyEntityEntityTypeConfiguration : IEntityTypeConfiguration<MyEntity>
{
    public void Configure(EntityTypeBuilder<MyEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Hamburger).ConfigureEnumeration().IsRequired();
    }
}
```
* Query:
```csharp
var result = await myDbContext.MyEntities.FirstAsync(x => x.Id == myEntity.Id); 
```
### Primitive Collections
Support for primitive collections in net8.0 can be configured like this:

#### EF Core
```csharp
public void Configure(EntityTypeBuilder<MyEntity> builder)
{
    builder.ConfigureEnumeration<MyEntity, string, Car>(x => x.Cars);
}
```

#### Dapper
```csharp
SqlMapper.AddTypeHandler(new EnumerationArrayTypeHandler<string, Car>());
```
