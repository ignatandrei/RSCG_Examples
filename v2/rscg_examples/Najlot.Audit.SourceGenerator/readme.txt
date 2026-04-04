# Audit

Najlot.Audit is a small .NET library for tracking object changes by taking a snapshot of an entity and comparing it later.

You register a provider for a given entity type, create a snapshot, mutate the entity, and then ask the snapshot for the list of changed properties.

The library supports two ways of defining providers:

1. Source-generated providers, which are the preferred option for most projects.
2. Manual providers, where you return property values by hand.

## What the library gives you

- Snapshot-based change tracking.
- Flat property paths such as `Age`, `Customer.Name`, or `Checklist[3].IsDone`.
- Automatic comparison of old and new values.
- Optional source generation for provider implementation and registration.
- Support for provider factories when providers need constructor dependencies.

## Installation

Install the runtime package:

```bash
dotnet add package Najlot.Audit
```

If you want to use the preferred source-generator workflow, add the generator package as well:

```bash
dotnet add package Najlot.Audit.SourceGenerator
```

If you reference projects directly instead of NuGet packages, reference the source generator as an analyzer:

```xml
<ItemGroup>
  <ProjectReference Include="..\Najlot.Audit\Najlot.Audit.csproj" />
  <ProjectReference Include="..\Najlot.Audit.SourceGenerator\Najlot.Audit.SourceGenerator.csproj"
					OutputItemType="Analyzer"
					ReferenceOutputAssembly="false" />
</ItemGroup>
```

The runtime library targets `netstandard2.0` and `net8.0`.

## Preferred way: source generator

For most consumers, this is the best option. You declare what should be audited and the generator creates the provider implementation for you.

### 1. Create an entity

```csharp
public sealed class User
{
	public Guid Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public int Age { get; set; }
	public string Password { get; set; } = string.Empty;
}
```

### 2. Create an audit provider

Mark the provider class with `AuditProvider` and declare a partial method that returns `IEnumerable<PropertyValue>`.

```csharp
using Najlot.Audit;
using Najlot.Audit.Attributes;

[AuditProvider]
public partial class UserAuditProvider
{
	[AuditIgnore(nameof(User.Password))]
	public static partial IEnumerable<PropertyValue> GetPropertyValues(User entity);
}
```

The generator will inspect the entity and emit the method body.

### 3. Register generated providers

The generator also emits an extension method that registers all public provider methods found in your assembly.

```csharp
using Najlot.Audit;

var audit = new Audit();
audit.RegisterMyAppAuditProviders();
```

The exact method name depends on your assembly name. For an assembly named `MyApp`, the generated method is `RegisterMyAppAuditProviders()`.

You can also register a generated provider explicitly:

```csharp
var audit = new Audit();
audit.RegisterProvider<UserAuditProvider>();
```

### 4. Create a snapshot and read changes

```csharp
var user = new User
{
	Id = Guid.NewGuid(),
	Name = "Alice",
	Age = 30,
	Password = "secret-1"
};

var snapshot = audit.CreateSnapshot(user);

user.Age = 31;
user.Password = "secret-2";

var changes = snapshot.GetChanges().ToList();

foreach (var change in changes)
{
	Console.WriteLine($"{change.Path}: {change.OldValue} -> {change.NewValue}");
}
```

Output:

```text
Age: 30 -> 31
```

`Password` is ignored because of `AuditIgnore`.

## Manual way: write providers by hand

If you need full control over paths, derived values, formatting, lookups, or unsupported shapes, write the provider yourself.

```csharp
using Najlot.Audit;
using Najlot.Audit.Attributes;

public sealed class Order
{
	public Guid Id { get; set; }
	public decimal Total { get; set; }
}

[AuditProvider]
public sealed class OrderAuditProvider
{
	public IEnumerable<PropertyValue> GetPropertyValues(Order entity)
	{
		yield return new PropertyValue(nameof(Order.Id), entity.Id);
		yield return new PropertyValue(nameof(Order.Total), entity.Total);
	}
}
```

Register it and use it the same way:

```csharp
var audit = new Audit();
audit.RegisterProvider<OrderAuditProvider>();

var order = new Order
{
	Id = Guid.NewGuid(),
	Total = 100m
};

var snapshot = audit.CreateSnapshot(order);
order.Total = 125m;

var changes = snapshot.GetChanges().ToList();
```

Manual providers are useful when:

- You want to emit custom paths.
- You need computed values.
- You want to combine entity state with external data.
- You do not want automatic traversal of nested objects.

## Ignoring properties

Ignore values from generated providers by declaring ignored paths on the provider method.

Ignore a path from the provider method:

```csharp
[AuditProvider]
public partial class UserAuditProvider
{
	[AuditIgnore(nameof(User.Password))]
	[AuditIgnore(nameof(User.LastLoginAt))]
	public static partial IEnumerable<PropertyValue> GetPropertyValues(User entity);
}
```

Apply `AuditIgnore` to the provider method. The generator only reads ignore paths declared on provider methods.

## Nested objects

Generated providers walk public readable properties. For nested objects, paths are flattened.

Example paths:

- `Customer.Name`
- `Address.City`
- `Metadata.CreatedBy`

If a nested type also has its own audit provider, the generator can delegate to that provider instead of expanding the type inline.

## Collections

Generated providers enumerate collection items instead of storing the collection object reference.

If you do not specify a key, the generator falls back to the item index and produces paths such as `Checklist[0].IsDone` or `Tags[1]`.

If items can be reordered, inserted, or removed and you want stable matching across snapshots, specify a stable key with `AuditCollectionKey`.

```csharp
using Najlot.Audit;
using Najlot.Audit.Attributes;

public sealed class ChecklistItem
{
	public int Id { get; set; }
	public string Text { get; set; } = string.Empty;
	public bool IsDone { get; set; }
}

public sealed class TaskItem
{
	public string Title { get; set; } = string.Empty;
	public List<ChecklistItem> Checklist { get; set; } = [];
}

[AuditProvider]
public partial class TaskItemAuditProvider
{
	[AuditCollectionKey(nameof(entity.Checklist), nameof(ChecklistItem.Id))]
	public partial IEnumerable<PropertyValue> GetPropertyValues(TaskItem entity);
}
```

This produces paths such as `Checklist[1].IsDone` and lets the audit logic track items by key instead of by list position.

## Providers with dependencies

If a provider has constructor dependencies, register a factory before registering the provider or before calling the generated registration extension.

```csharp
var audit = new Audit();

audit.RegisterFactory(type =>
{
	if (type == typeof(UserAuditProviderWithLookup))
	{
		return new UserAuditProviderWithLookup(new UserNameLookup());
	}

	return Activator.CreateInstance(type)!;
});

audit.RegisterMyAppAuditProviders();
```

You can force the factory to be used even when a public parameterless constructor exists:

```csharp
audit.RegisterFactory(type => Activator.CreateInstance(type)!, alwaysUseFactory: true);
```

## Core API

The main runtime API is intentionally small:

```csharp
public interface IAudit
{
	IAudit Register<T>(AuditProviderMethod<T> method);
	void RegisterProvider<T>();
	IAudit RegisterFactory(FactoryMethod factory, bool alwaysUseFactory = false);
	T Create<T>();
	AuditSnapshot<T> CreateSnapshot<T>(T source);
}
```

The changes returned by a snapshot are `PropertyChange` values with:

- `Path`
- `OldValue`
- `NewValue`

## When to choose which approach

Use the source generator when:

- Your entities are regular object graphs with public properties.
- You want minimal boilerplate.
- You want generated registration for all providers in the assembly.

Use manual providers when:

- You need custom logic for values or paths.
- You need data from services or lookups.
- You want complete control over the emitted property set.

## Notes and limitations

- A provider must be registered before you call `CreateSnapshot` for that entity type.
- `RegisterProvider<T>()` discovers supported provider methods through public instance and static methods.
- Generated auto-registration includes public provider methods only.
- Collection auditing works best when the chosen key is stable and unique inside the collection.

## Development

Run the test suite from the `src` folder:

```bash
dotnet test Najlot.Audit.slnx
```
