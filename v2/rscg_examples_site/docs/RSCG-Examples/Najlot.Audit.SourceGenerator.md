---
sidebar_position: 2640
title: 264 - Najlot.Audit.SourceGenerator
description: Generating audit code for classes with properties.
slug: /Najlot.Audit.SourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveAudit.mdx';

# Najlot.Audit.SourceGenerator  by Najlot


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Najlot.Audit.SourceGenerator?label=Najlot.Audit.SourceGenerator)](https://www.nuget.org/packages/Najlot.Audit.SourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/najlot/Audit?label=updated)](https://github.com/najlot/Audit)
![GitHub Repo stars](https://img.shields.io/github/stars/najlot/Audit?style=social)

## Details

### Info
:::info

Name: **Najlot.Audit.SourceGenerator**

Source generator for Najlot.Audit that provides property audit code generation.

Author: Najlot

NuGet: 
*https://www.nuget.org/packages/Najlot.Audit.SourceGenerator/*   


You can find more details at https://github.com/najlot/Audit

Source: https://github.com/najlot/Audit

:::

### Author
:::note
Najlot 
![Alt text](https://github.com/najlot.png)
:::

## Original Readme
:::note

### Audit

Najlot.Audit is a small .NET library for tracking object changes by taking a snapshot of an entity and comparing it later.

You register a provider for a given entity type, create a snapshot, mutate the entity, and then ask the snapshot for the list of changed properties.

The library supports two ways of defining providers:

1. Source-generated providers, which are the preferred option for most projects.
2. Manual providers, where you return property values by hand.

###### What the library gives you

- Snapshot-based change tracking.
- Flat property paths such as `Age`, `Customer.Name`, or `Checklist[3].IsDone`.
- Automatic comparison of old and new values.
- Optional source generation for provider implementation and registration.
- Support for provider factories when providers need constructor dependencies.

###### Installation

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

###### Preferred way: source generator

For most consumers, this is the best option. You declare what should be audited and the generator creates the provider implementation for you.

######### 1. Create an entity

```csharp
public sealed class User
{
	public Guid Id \{ get; set; }
	public string Name \{ get; set; \} = string.Empty;
	public int Age \{ get; set; }
	public string Password \{ get; set; \} = string.Empty;
}
```

######### 2. Create an audit provider

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

######### 3. Register generated providers

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

######### 4. Create a snapshot and read changes

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

###### Manual way: write providers by hand

If you need full control over paths, derived values, formatting, lookups, or unsupported shapes, write the provider yourself.

```csharp
using Najlot.Audit;
using Najlot.Audit.Attributes;

public sealed class Order
{
	public Guid Id \{ get; set; }
	public decimal Total \{ get; set; }
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

###### Ignoring properties

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

###### Nested objects

Generated providers walk public readable properties. For nested objects, paths are flattened.

Example paths:

- `Customer.Name`
- `Address.City`
- `Metadata.CreatedBy`

If a nested type also has its own audit provider, the generator can delegate to that provider instead of expanding the type inline.

###### Collections

Generated providers enumerate collection items instead of storing the collection object reference.

If you do not specify a key, the generator falls back to the item index and produces paths such as `Checklist[0].IsDone` or `Tags[1]`.

If items can be reordered, inserted, or removed and you want stable matching across snapshots, specify a stable key with `AuditCollectionKey`.

```csharp
using Najlot.Audit;
using Najlot.Audit.Attributes;

public sealed class ChecklistItem
{
	public int Id \{ get; set; }
	public string Text \{ get; set; \} = string.Empty;
	public bool IsDone \{ get; set; }
}

public sealed class TaskItem
{
	public string Title \{ get; set; \} = string.Empty;
	public List<ChecklistItem> Checklist \{ get; set; \} = [];
}

[AuditProvider]
public partial class TaskItemAuditProvider
{
	[AuditCollectionKey(nameof(entity.Checklist), nameof(ChecklistItem.Id))]
	public partial IEnumerable<PropertyValue> GetPropertyValues(TaskItem entity);
}
```

This produces paths such as `Checklist[1].IsDone` and lets the audit logic track items by key instead of by list position.

###### Providers with dependencies

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

###### Core API

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

###### When to choose which approach

Use the source generator when:

- Your entities are regular object graphs with public properties.
- You want minimal boilerplate.
- You want generated registration for all providers in the assembly.

Use manual providers when:

- You need custom logic for values or paths.
- You need data from services or lookups.
- You want complete control over the emitted property set.

###### Notes and limitations

- A provider must be registered before you call `CreateSnapshot` for that entity type.
- `RegisterProvider<T>()` discovers supported provider methods through public instance and static methods.
- Generated auto-registration includes public provider methods only.
- Collection auditing works best when the chosen key is stable and unique inside the collection.

###### Development

Run the test suite from the `src` folder:

```bash
dotnet test Najlot.Audit.slnx
```


:::

### About
:::note

Generating audit code for classes with properties.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Najlot.Audit.SourceGenerator**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Najlot.Audit" Version="0.0.1" />
    <PackageReference Include="Najlot.Audit.SourceGenerator" Version="0.0.1" />
  </ItemGroup>

	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Audit.SourceGenerator\src\AuditDemo\Program.cs" label="Program.cs" >

  This is the use of **Najlot.Audit.SourceGenerator** in *Program.cs*

```csharp showLineNumbers 
using AuditDemo;
using Najlot.Audit;

Person p = new() \{ Id = 1, FirstName = "John", LastName = "Doe" };

var audit = new Audit();
audit.RegisterProvider<PersonAuditProvider>();
var snapshot = audit.CreateSnapshot(p);

p.LastName = "Ignat";
p.FirstName = "Andrei";
var changes= snapshot.GetChanges().ToArray();
foreach (var change in changes)
{
    Console.WriteLine($"Property: {change.Path}, Old Value: {change.OldValue}, New Value: {change.NewValue}");
}
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Audit.SourceGenerator\src\AuditDemo\Person.cs" label="Person.cs" >

  This is the use of **Najlot.Audit.SourceGenerator** in *Person.cs*

```csharp showLineNumbers 
using Najlot.Audit;
using Najlot.Audit.Attributes;

namespace AuditDemo;

[AuditProvider]
public partial class Person
{
    public string FirstName \{ get; set; }= string.Empty;
    public string LastName \{ get; set; }= string.Empty;
    public string FullName() => $"{FirstName} {LastName}";

    public int Id \{ get; set; }
}


[AuditProvider]
public partial class PersonAuditProvider
{
    [AuditIgnore(nameof(Person.Id))]
    public static partial IEnumerable<PropertyValue> GetPropertyValues(Person entity);
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Audit.SourceGenerator\src\AuditDemo\obj\GX\Najlot.Audit.SourceGenerator\Najlot.Audit.SourceGenerator.AuditProviderGenerator\globalAuditDemoPersonAuditProvider_AuditProvider.g.cs" label="globalAuditDemoPersonAuditProvider_AuditProvider.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
namespace AuditDemo
{
    public partial class PersonAuditProvider
    {
        public static partial global::System.Collections.Generic.IEnumerable<global::Najlot.Audit.PropertyValue> GetPropertyValues(global::AuditDemo.Person entity)
        {
            yield return new global::Najlot.Audit.PropertyValue("FirstName", entity.FirstName);
            yield return new global::Najlot.Audit.PropertyValue("LastName", entity.LastName);
        }

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Najlot.Audit.SourceGenerator\src\AuditDemo\obj\GX\Najlot.Audit.SourceGenerator\Najlot.Audit.SourceGenerator.AuditRegistrationGenerator\AuditRegistrationExtensions_AuditDemo.g.cs" label="AuditRegistrationExtensions_AuditDemo.g.cs" >
```csharp showLineNumbers 
// <auto-generated/>
#nullable enable
using Najlot.Audit;

namespace AuditDemo
{
    public static class AuditRegistrationExtensions_AuditDemo
    {
        public static global::Najlot.Audit.IAudit RegisterAuditDemoAuditProviders(this global::Najlot.Audit.IAudit audit)
        {
            audit.Register<global::AuditDemo.Person>(global::AuditDemo.PersonAuditProvider.GetPropertyValues);
            return audit;
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Najlot.Audit.SourceGenerator ](/sources/Najlot.Audit.SourceGenerator.zip)

:::


### Share Najlot.Audit.SourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Audit.SourceGenerator&quote=Najlot.Audit.SourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Audit.SourceGenerator&text=Najlot.Audit.SourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Audit.SourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Audit.SourceGenerator&title=Najlot.Audit.SourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Audit.SourceGenerator&title=Najlot.Audit.SourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNajlot.Audit.SourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Najlot.Audit.SourceGenerator

<SameCategory />

