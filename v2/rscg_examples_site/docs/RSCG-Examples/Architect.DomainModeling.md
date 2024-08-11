---
sidebar_position: 1240
title: 124 - Architect.DomainModeling
description: Domain Modelling -DDD, Entity and more. Here I will show just the builder
slug: /Architect.DomainModeling
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# Architect.DomainModeling  by Timo van Zijll Langhout


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/Architect.DomainModeling?label=Architect.DomainModeling)](https://www.nuget.org/packages/Architect.DomainModeling/)
[![GitHub last commit](https://img.shields.io/github/last-commit/TheArchitectDev/Architect.DomainModeling?label=updated)](https://github.com/TheArchitectDev/Architect.DomainModeling)
![GitHub Repo stars](https://img.shields.io/github/stars/TheArchitectDev/Architect.DomainModeling?style=social)

## Details

### Info
:::info

Name: **Architect.DomainModeling**

For Domain-Driven Design (DDD), this package provides tools for implementing domain models, such as base types and source generators.

Author: Timo van Zijll Langhout

NuGet: 
*https://www.nuget.org/packages/Architect.DomainModeling/*   


You can find more details at https://github.com/TheArchitectDev/Architect.DomainModeling

Source : https://github.com/TheArchitectDev/Architect.DomainModeling

:::

### Original Readme
:::note

# Architect.DomainModeling

A complete Domain-Driven Design (DDD) toolset for implementing domain models, including base types and source generators.

- Base types, including: `ValueObject`, `WrapperValueObject`, `Entity`, `IIdentity`, `IApplicationService`, `IDomainService`.
- Source generators, for types including: `ValueObject`, `WrapperValueObject`, `DummyBuilder`, `IIdentity`.
- Structural implementations for hash codes and equality on collections (also used automatically by source-generated value objects containing collections).
- (De)serialization support, such as for JSON.
- Optional generated mapping code for Entity Framework.

## Source Generators

This package uses source generators (introduced in .NET 5). Source generators write additional C# code as part of the compilation process.

Among other advantages, source generators enable IntelliSense on generated code. They are primarily used here to generate boilerplate code, such as overrides of `ToString()`, `GetHashCode()`, and `Equals()`, as well as operator overloads.

## Domain Object Types

### ValueObject

A value object is an an immutable data model representing one or more values. Such an object is identified and compared by its values. Value objects cannot be mutated, but new ones with different values can be created. Built-in examples from .NET itself are `string` and `DateTime`.

Consider the following type:

```cs
public class Color : ValueObject
{
	public ushort Red { get; private init; }
	public ushort Green { get; private init; }
	public ushort Blue { get; private init; }

	public Color(ushort red, ushort green, ushort blue)
	{
		this.Red = red;
		this.Green = green;
		this.Blue = blue;
	}
}
```

This is the non-boilerplate portion of the value object, i.e. everything that we would like to define by hand. However, the type is missing the following:

- A `ToString()` override.
- A `GetHashCode()` override.
- An `Equals()` override.
- The `IEquatable<Color>` interface implementation.
- Operator overloads for `==` and `!=` based on `Equals()`, since a value object only ever cares about its contents, never its reference identity.
- Potentially the `IComparable<Color>` interface implementation.
- Correctly configured nullable reference types (`?` vs. no `?`) on all mentioned boilerplate code.
- Unit tests on any _hand-written_ boilerplate code.

Change the type as follows to have source generators tackle all of the above and more:

```cs
[ValueObject]
public partial class Color
{
	// Snip
}
```

Note that the `ValueObject` base class is now optional, as the generated partial class implements it.

The `IComparable<Color>` interface can optionally be added, if the type is considered to have a natural order. In such case, the type's properties are compared in the order in which they are defined. When adding the interface, make sure that the properties are defined in the intended order for comparison.

Alterantively, if we inherit from `ValueObject` but omit the `[ValueObject]` attribute, we get partial benefits:

- Overriding `ToString()` is made mandatory before the type will build.
- `GetHashCode()` and `Equals()` are overridden to throw a `NotSupportedException`. Value objects should use structural equality, and an exception is better than unintentional reference equality (i.e. bugs).
- Operators `==` and `!=` are implemented to delegate to `Equals()`, to avoid unintentional reference equality.

### WrapperValueObject

A wrapper value object is a value object that represents and wraps a single value. For example, a domain model may define a `Description` value object, a string with certain restrictions on its length and permitted characters.

The wrapper value object is just another value object. Its existence is merely a technical detail to make it easier to implement value objects that represent a single value.

Consider the following type:

```cs
public class Description : WrapperValueObject<string>
{
	protected override StringComparison StringComparison => StringComparison.Ordinal;

	public string Value { get; private init; }

	public Description(string value)
	{
		this.Value = value ?? throw new ArgumentNullException(nameof(value));

		if (this.Value.Length == 0) throw new ArgumentException($"A {nameof(Description)} must not be empty.");
		if (this.Value.Length > MaxLength) throw new ArgumentException($"A {nameof(Description)} must not be over {MaxLength} characters long.");
		if (ContainsNonPrintableCharacters(this.Value, flagNewLinesAndTabs: false)) throw new ArgumentException($"A {nameof(Description)} must contain only printable characters.");
	}
}
```

Besides all the things that the value object in the previous section was missing, this type is missing the following:

- An implementation of the `ContainsNonPrintableCharacters()` method.
- An explicit conversion from `string` (explicit since not every string is a `Description`).
- An implicit conversion to `string` (implicit since every `Description` is a valid `string`).
- If the underlying type had been a value type (e.g. `int`), conversions from and to its nullable counterpart (e.g. `int?`).
- Ideally, JSON converters that convert instances to and from `"MyDescription"` rather than `{"Value":"MyDescription"}`.

Change the type as follows to have source generators tackle all of the above and more:

```cs
[WrapperValueObject<string>]
public partial class Description
{
	// Snip
}
```

Again, the `WrapperValueObject<string>` base class has become optional, as the generated partial class implements it.

To also have comparison methods generated, the `IComparable<Description>` interface can optionally be added, if the type is considered to have a natural order.

### Entity

An entity is a data model that is defined by its identity and a thread of continuity. It may be mutated during its life cycle. Entities are often stored in a database.

For entities themselves, the package offers base types, with no source generation required. However, it is often desirable to have a custom type for an entity's ID. For example, `PaymentId` tends to be a more expressive type than `ulong`. Unfortunately, such custom ID types tend to consist of boilerplate code that gets in the way, is a hassle to write, and is easy to make mistakes in.

Consider the following type:

```cs
[Entity]
public class Payment : Entity<PaymentId>
{
	public string Currency { get; }
	public decimal Amount { get; }

	public Payment(string currency, decimal amount)
		: base(new PaymentId())
	{
		this.Currency = currency ?? throw new ArgumentNullException(nameof(currency));
		this.Amount = amount;
	}
}
```

The entity needs a `PaymentId` type. This type could be a full-fledged `WrapperValueObject<ulong>` or `WrapperValueObject<string>`, with `IComparable<PaymentId>`.
In fact, it might also be desirable for such a type to be a struct.

Change the type as follows to get a source-generated ID type for the entity:

```cs
[Entity]
public class Payment : Entity<PaymentId, string>
{
	// Snip
}
```

The `Entity<TId, TIdPrimitive>` base class is what triggers source generation of the `TId`, if no such type exists.
The `TIdPrimitive` type parameter specifies the underlying primitive to use.
Using this base class to have the ID type generated is equivalent to [manually declaring one](#identity).

When entities share a custom base class, such as in a scenario with a `Banana` and a `Strawberry` entity each inheriting from `Fruit`, then it is possible to have `Fruit` inherit from `Entity<FruitId, TPrimitive>`, causing `FruitId` to be generated.
The `[Entity]` attribute, however, should only be applied to the concrete types, `Banana` and `Strawberry`'.

Furthermore, the above example entity could be modified to create a new, unique ID on construction:

```cs
public Payment(string currency, decimal amount)
	: base(new PaymentId(Guid.NewGuid().ToString("N")))
{
	// Snip
}
```

For a more database-friendly alternative to UUIDs, see [Distributed IDs](https://github.com/TheArchitectDev/Architect.Identities#distributed-ids).

### Identity

Identity types are a special case of value objects. Unlike other value objects, they are perfectly suitable to be implemented as structs:

- The enforced default constructor is unproblematic, because there is hardly such a thing as an invalid ID value. Although ID 0 or -1 might not _exist_, the same might be true for ID 999999, which would still be valid as a value.
- The possibility of an ID variable containing `null` is often undesirable. Structs avoid this complication. (Where we _want_ nullability, a nullable struct can be used, e.g. `PaymentId?`.
- If the underlying type is `string`, the generator ensures that its `Value` property returns the empty string instead of `null`. This way, even `string`-wrapping identities know only one "empty" value and avoid representing `null`.

Since an application is expected to work with many ID instances, using structs for them is a nice optimization that reduces heap allocations.

Source-generated identities implement both `IEquatable<T>` and `IComparable<T>` automatically. They are declared as follows:

```cs
[Identity<ulong>]
public readonly partial struct PaymentId : IIdentity<ulong>
{
}
```

For even terser syntax, we can omit the interface and the `readonly` keyword (since they are generated), and even use a `record struct` to omit the curly braces:

```cs
[Identity<string>]
public partial record struct ExternalId;
```

Note that an [entity](#entity) has the option of having its own ID type generated implicitly, with practically no code at all.

### Domain Event

There are many ways of working with domain events, and this package does not advocate any particular one. As such, no interfaces, base types, or source generators are included that directly implement domain events.

To mark domain event types as such, regardless of how they are implemented, the `[DomainEvent]` attribute can be used:

```cs
[DomainEvent]
public class OrderCreatedEvent : // Snip
```

Besides providing consistency, such a marker attribute can enable miscellaneous concerns. For example, if the package's Entity Framework mappings are used, domain events can be included.

### DummyBuilder

Domain objects have parameterized constructors, so that they can guarantee a valid state. For many value objects, such constructors are unlikely to ever change: `new PaymentId(1)`, `new Description("Example")`, `new Color(1, 1, 1)`.

However, entities have constructors that tend to change. The same applies for value objects that exist simply to group clusters of an entity's properties, e.g. `PaymentConfiguration`. When one of these constructors changes, such as when the `Payment` entity gets a new property (one that should be passed to the constructor), then all the callers need to change accordingly.

Usually, production code has just a handful of callers of an entity's constructor. However, _test code_ can easily have dozens of callers of that constructor.

The simple act of adding one property would require dozens of additional changes instead of a handful, only because of the existence of test code. The changes are "dumb" changes, as the test methods do not care about the new property, which never existed when they were written.

The Builder pattern fixes this problem:

```cs
public class PaymentDummyBuilder
{
	// Have a default value for each property, along with a fluent method to change it

	private string Currency { get; set; } = "EUR";
	public PaymentDummyBuilder WithCurrency(string value) => this.With(b => b.Currency = value);

	private decimal Amount { get; set; } = 1.00m;
	public PaymentDummyBuilder WithAmount(decimal value) => this.With(b => b.Amount = value);
	
	private PaymentDummyBuilder With(Action<PaymentDummyBuilder> assignment)
	{
		assignment(this);
		return this;
	}

	// Have a Build() method to invoke the most usual constructor with the configured values

	public override Payment Build()
	{
		var result = new Payment(
			currency: this.Currency,
			amount: this.Amount);
		return result;
	}
}
```

Test methods avoid constructor invocations, e.g. `new Payment("EUR", 1.00m)`, and instead use the following:

```cs
new PaymentBuilder().Build(); // Completely default instance
new PaymentBuilder().WithCurrency("USD").Build(); // Partially modified instance for a specific test
```

For example, to test that the constructor throws the appropriate exception when given a null currency:

```cs
Assert.Throws<ArgumentNullException>(() => new PaymentBuilder().WithCurrency(null!).Build());
```

This way, whenever a constructor is changed, the only test code that breaks is the dummy builder. Instead of dozens of additional changes, we need only make a handful.

As the builder is repaired to account for the changed constructor, all tests work again. If a new constructor parameter was added, existing tests tend to work perfectly fine as long as the builder provides a sensible default value for the parameter.

Unfortunately, the dummy builders tend to consist of boilerplate code and can be tedious to write and maintain.

Change the type as follows to get source generation for it:

```cs
[DummyBuilder<Payment>]
public partial class PaymentDummyBuilder
{
	// Anything defined manually will cause the source generator to outcomment its conflicting code, i.e. manual code always takes precedence

	// The source generator is fairly good at instantiating default values, but not everything it generates is sensible to the domain model
	// Since the source generator cannot guess what an example currency value might look like, we define that property and its initializer manually
	// Everything else we let the source generator provide

	private string Currency { get; set; } = "EUR";
}
```

The generated `Build()` method opts for _the most visible, simplest parameterized constructor_, since it tends to represent the most "regular" way of constructing the domain object. Specifically, it picks by { greatest visibility, parameterized over default, fewest parameters }. The builder's properties and fluent methods are based on that same constructor. We can deviate by manually implementing the `Build()` method and manually adding properties and fluent methods. To remove generated fluent methods, we can obscure them by manually implementing them as private, protected, or internal.

Dummy builders generally live in a test project, or in a library project consumed solely by test projects.

## Constructor Validation

DDD promotes the validation of domain rules and invariants in the constructors of the domain objects. This pattern is fully supported:

```cs
public const ushort MaxLength = 255;

public Description(string value)
{
	this.Value = value ?? throw new ArgumentNullException(nameof(value));

	if (this.Value.Length == 0) throw new ArgumentException($"A {nameof(Description)} must not be empty.");
	if (this.Value.Length > MaxLength) throw new ArgumentException($"A {nameof(Description)} must not be over {MaxLength} characters long.");
	if (ContainsNonPrintableCharacters(this.Value, flagNewLinesAndTabs: false)) throw new ArgumentException($"A {nameof(Description)} must contain only printable characters.");
}
```

Any type that inherits from `ValueObject` also gains access to a set of (highly optimized) validation helpers, such as `ContainsNonPrintableCharacters()` and `ContainsNonAlphanumericCharacters()`.

### Construct Once

From the domain model's perspective, any instance is constructed only once. The domain model does not care if it is serialized to JSON or persisted in a database before being reconstituted in main memory. The object is considered to have lived on.

As such, constructors in the domain model should not be re-run when objects are reconstituted. The source generators provide this property:

- Each generated `IIdentity<T>` and `WrapperValueObject<TValue>` comes with a JSON converter for both System.Text.Json and Newtonsoft.Json, each of which deserialize without the use of (parameterized) constructors.
- Each generated `ValueObject` will have an empty default constructor for deserialization purposes, with a `[JsonConstructor`] attribute for both System.Text.Json and Newtonsoft.Json. Declare its properties with `private init` and add a `[JsonInclude]` and `[JsonPropertyName("StableName")]` attribute to allow them to be rehydrated.
- If the generated [Entity Framework mappings](#entity-framework-conventions) are used, all domain objects are reconstituted without the use of (parameterized) constructors.
- Third party extensions can use the methods on `DomainObjectSerializer` to (de)serialize according to the same conventions.

## Serialization

First and foremost, serialization of domain objects for _public_ purposes should be avoided.
To expose data outside of the bounded context, create separate contracts and adapters to convert back and forth.
It is advisable to write such adapters manually, so that a compiler error occurs when changes to either end would break the adaptation.

Serialization inside the bounded context is useful, such as for persistence, be it in the form of JSON documents or in relational database tables.

### Identity and WrapperValueObject Serialization

The generated JSON converters and Entity Framework mappings (optional) end up calling the generated `Serialize` and `Deserialize` methods, which are fully customizable.
Deserialization uses the default constructor and the value property's initializer (`{ get; private init }`).
Fallbacks are in place in case a value property was manually declared with no initializer.

### ValueObject Serialization

Generated value object types have a private, empty default constructor intended solely for deserialization. System.Text.Json, Newtonsoft.Json, and Entity Framework each prefer this constructor.

Value object properties should be declared as `{ get; private init; }`. If no initializer is provided, the included analyzer emits a warning, since properties may not be deserializable.

If a value object is ever serialized to JSON, its properties should have the `[JsonInclude]` attribute.
Since renaming a property would break any existing JSON blobs, it is advisable to hardcode a property name for use in JSON through the `[JsonPropertyName("StableName")]`.
Avoid `nameof()`, so that JSON serialization is unaffected by future renames.

For Entity Framework, when storing a complex value object directly into an entity's table, prefer the `ComplexProperty()` feature (either with or without `ToJson()`).
Property renames for individual columns are handled by migrations. Property renames inside JSON blobs are covered by earlier paragraphs.

At the time of writing, Entity Framework's `ComplexProperty()` does [not yet](https://github.com/dotnet/efcore/issues/31252) combine with `ToJson()`, necessitating manual JSON serialization.

### Entity and Domain Event Serialization

If an entity or domain event is ever serialized to JSON, it is up to the developer to provide an empty default constructor, since there is no other need to generate source for these types.
The `[Obsolete]` attribute and `private` accessibility can be used to prevent a constructor's unintended use.

If the generated [Entity Framework mappings](#entity-framework-conventions) are used, entities and/or domain objects can be reconstituted entirely without the use of constructors, thus avoiding the need to declare empty default constructors.

## Entity Framework Conventions

Conventions to provide Entity Framework mappings are generated on-demand, only if any override of `ConfigureConventions(ModelConfigurationBuilder)` is declared.
There are no hard dependencies on Entity Framework, nor is there source code overhead in its absence.
It is up to the developer which conventions, if any, to use.

```cs
internal sealed class MyDbContext : DbContext
{
	// Snip

	protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
	{
		// Recommended to keep EF from throwing if it sees no usable constructor, if we are keeping it from using constructors anyway
		configurationBuilder.Conventions.Remove<ConstructorBindingConvention>();

		configurationBuilder.ConfigureDomainModelConventions(domainModel =>
		{
			domainModel.ConfigureIdentityConventions();
			domainModel.ConfigureWrapperValueObjectConventions();
			domainModel.ConfigureEntityConventions();
			domainModel.ConfigureDomainEventConventions();
		});
	}
}
```

`ConfigureDomainModelConventions()` itself does not have any effect other than to invoke its action, which allows the specific mapping kinds to be chosen.
The inner calls, such as to `ConfigureIdentityConventions()`, configure the various conventions.

Thanks to the provided conventions, no manual boilerplate mappings are needed, like conversions to primitives.
The developer need only write meaningful mappings, such as the maximum length of a string property.

Since only conventions are registered, regular mappings can override any part of the provided behavior.

The conventions map each domain object type explicitly and are trimmer-safe.

## Third-Party Mappings

If there are other concerns than Entity Framework that need to map each domain object, they can benefit from the same underlying mechanism.
For example, JSON mappings for additional JSON libraries could made.

A concrete configurator can be created implementing `IEntityConfigurator`, `IDomainEventConfigurator`, `IIdentityConfigurator`, or `IWrapperValueObjectConfigurator`.
For example, to log each concrete entity type:

```cs
public sealed clas LoggingEntityConfigurator : Architect.DomainModeling.Configuration.IEntityConfigurator
{
	// Note: The attributes on the type parameter may look complex, but are provided by the IDE when implementing the interface
	public void ConfigureEntity<[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)] TEntity>(
		in Architect.DomainModeling.Configuration.IEntityConfigurator.Args args)
		where TEntity : IEntity
	{
		Console.WriteLine($"Registered entity {typeof(TEntity).Name}.");
	}
}
```

The `ConfigureEntity()` method can then be invoked once for each annotated entity type as follows:

```cs
var entityConfigurator = new LoggingEntityConfigurator();

MyDomainLayerAssemblyName.EntityDomainModelConfigurator.ConfigureEntities(entityConfigurator);

// If we have multiple assemblies containing entities
MyOtherDomainLayerAssemblyName.EntityDomainModelConfigurator.ConfigureEntities(entityConfigurator);
```

The static `EntityDomainModelConfigurator` (and corresponding types for the other kinds of domain object) is generated once for each assembly that contains such domain objects.
Its `ConfigureEntities(IEntityConfigurator)` method calls back into the given configurator, once for each annotated entity type in the assembly.

## Structural Equality

Value objects (including identities and wrappers) should have structural equality, i.e. their equality should depend on their contents.
For example, `new Color(1, 1, 1) == new Color(1, 1, 1)` should evaluate to `true`.
The source generators provide this for all `Equals()` overloads and for `GetHashCode()`.
Where applicable, `CompareTo()` is treated the same way.

The provided structural equality is non-recursive: a value object's properties are expected to each be of a type that itself provides structural equality, such as a primitive, a `ValueObject`, a `WrapperValueObject<TValue>`, or an `IIdentity<T>`.

The generators also provide structural equality for members that are of collection types, by comparing the elements.
Even nested collections are account for, as long as the nesting is direct, e.g. `int[][]`, `Dictionary<int, List<string>>`, or `int[][][]`.
For `CompareTo()`, a structural implementation for collections is not supported, and the generators will skip `CompareTo()` if any property lacks the `IComparable<TSelf>` interface.

The logic for structurally comparing collection types is made publicly available through the `EnumerableComparer`, `DictionaryComparer`, and `LookupComparer` types.

The collection equality checks inspect and compare the collections as efficiently as possible.
Optimized paths are in place for common collection types.
Sets, being generally order-agnostic, are special-cased: they dictate their own comparers; a set is never equal to a non-set (unless both are null or both are empty); two sets are equal if each considers the other to contain all of its elements.
Dictionary and lookup equality is similar to set equality when it comes to their keys.

For the sake of completeness, the collection comparers also provide overloads for the non-generic `IEnumerable`.
These should be avoided.
Working with non-generic enumerables tends to be inefficient due to virtual calls and boxing.
These overloads work hard to return identical results to the generic overloads, at additional costs to efficiency.

## Testing

### Generated Files

While "Go To Definition" works for inspecting source-generated code, sometimes you may want to have the generated code in files.
To have source generators write a copy to a file for each generated piece of code, add the following to the project file containing your source-generated types and find the files in the `obj` directory:

```xml
<PropertyGroup>
	<EmitCompilerGeneratedFiles>True</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)/GeneratedFiles</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

### Debugging

Source generators can be debugged by enabling the following (outcommented) line in the `DomainModeling.Generator` project. To start debugging, rebuild and choose the current Visual Studio instance in the dialog that appears.

```cs
if (!System.Diagnostics.Debugger.IsAttached) System.Diagnostics.Debugger.Launch();
```


:::

### About
:::note

Domain Modelling -DDD, Entity and more. Here I will show just the builder


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Architect.DomainModeling**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
	  <Nullable>enable</Nullable>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="Architect.DomainModeling" Version="3.0.2" />
	  </ItemGroup>

	 

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Architect.DomainModeling\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **Architect.DomainModeling** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person("Andrei", "Ignat");
pOld.MiddleName = "G";
var build = new PersonBuilder()
    .WithFirstName(pOld.FirstName)
    //.WithMiddleName("") // it is not into the constructor
    .WithLastName(pOld.LastName)
    ;
    
var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Architect.DomainModeling\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **Architect.DomainModeling** in *Person.cs*

```csharp showLineNumbers 
namespace Builder;
public class Person
{
    
    public Person(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Architect.DomainModeling\src\Builder\PersonBuilder.cs" label="PersonBuilder.cs" >

  This is the use of **Architect.DomainModeling** in *PersonBuilder.cs*

```csharp showLineNumbers 
using Architect.DomainModeling;

namespace Builder;

[DummyBuilder<Person>]
public partial class PersonBuilder
{
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Architect.DomainModeling\src\Builder\obj\GX\Architect.DomainModeling.Generator\Architect.DomainModeling.Generator.DummyBuilderGenerator\PersonBuilder.g.cs" label="PersonBuilder.g.cs" >


```csharp showLineNumbers 
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;

#nullable disable

namespace Builder
{
	/// <summary>
	/// <para>
	/// Implements the Builder pattern to construct <see cref="Builder.Person"/> objects for testing purposes.
	/// </para>
	/// <para>
	/// Where production code relies on the type's constructor, test code can rely on this builder.
	/// That way, if the constructor changes, only the builder needs to be adjusted, rather than lots of test methods.
	/// </para>
	/// </summary>
	/* Generated */ public partial class PersonBuilder
	{
		private string FirstName { get; set; } = "FirstName";
		public PersonBuilder WithFirstName(string value) => this.With(b => b.FirstName = value);

		private string LastName { get; set; } = "LastName";
		public PersonBuilder WithLastName(string value) => this.With(b => b.LastName = value);

		private PersonBuilder With(Action<PersonBuilder> assignment)
		{
			assignment(this);
			return this;
		}

		public Builder.Person Build()
		{
			var result = new Builder.Person(
				firstName: this.FirstName,
				lastName: this.LastName);
			return result;
		}
	}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project Architect.DomainModeling ](/sources/Architect.DomainModeling.zip)

:::


### Share Architect.DomainModeling 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArchitect.DomainModeling&quote=Architect.DomainModeling" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArchitect.DomainModeling&text=Architect.DomainModeling:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArchitect.DomainModeling" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArchitect.DomainModeling&title=Architect.DomainModeling" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArchitect.DomainModeling&title=Architect.DomainModeling&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FArchitect.DomainModeling" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Architect.DomainModeling

### In the same category (Builder) - 2 other generators


#### [BuilderGenerator](/docs/BuilderGenerator)


#### [Fluentify](/docs/Fluentify)

