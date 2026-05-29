---
sidebar_position: 2710
title: 271 - TypedStateBuilder.Generator
description: Generate strongly typed state builders for C# applications, improving code readability and maintainability.
slug: /TypedStateBuilder.Generator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBuilder.mdx';

# TypedStateBuilder.Generator  by Georgiy Petrov


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/TypedStateBuilder.Generator?label=TypedStateBuilder.Generator)](https://www.nuget.org/packages/TypedStateBuilder.Generator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Georgiy-Petrov/TypedStateBuilder.Generator?label=updated)](https://github.com/Georgiy-Petrov/TypedStateBuilder.Generator)
![GitHub Repo stars](https://img.shields.io/github/stars/Georgiy-Petrov/TypedStateBuilder.Generator?style=social)

## Details

### Info
:::info

Name: **TypedStateBuilder.Generator**

A Roslyn source generator that produces **compile-time safe builders** using the *type-state pattern*.

Author: Georgiy Petrov

NuGet: 
*https://www.nuget.org/packages/TypedStateBuilder.Generator/*   


You can find more details at https://github.com/Georgiy-Petrov/TypedStateBuilder.Generator

Source: https://github.com/Georgiy-Petrov/TypedStateBuilder.Generator

:::

### Author
:::note
Georgiy Petrov 
![Alt text](https://github.com/Georgiy-Petrov.png)
:::

## Original Readme
:::note

### TypedStateBuilder

A Roslyn incremental source generator that makes **invalid builder usage impossible to compile**.

You define a normal builder class. The generator produces a fluent API where **invalid construction flows are not expressible through the generated API**.

[![NuGet](https://img.shields.io/nuget/v/TypedStateBuilder.Generator.svg?logo=nuget)](https://www.nuget.org/packages/TypedStateBuilder.Generator)

---

###### Why

Traditional builders rely on:

* runtime validation
* defensive checks
* developer discipline

This allows invalid usage such as:

* missing required values
* conflicting assignments
* calling `Build()` too early

These issues are only detected at runtime.

TypedStateBuilder moves **structural correctness into the type system**, so incorrect usage cannot be expressed in the first place.

Unlike interface-based step builders, this approach:

* requires **no manual interfaces**
* avoids **state explosion**
* keeps your builder **simple and idiomatic**

You write the builder once. The generator handles the rest.

---

###### What this solves

TypedStateBuilder enforces correct builder usage while keeping the flexibility of a fluent API:

* `Build()` is only available when required values are set
* required steps can be executed in any order (unless constrained by branching)
* each step can be applied only once (in the typed API)
* optional values can be defaulted automatically
* validation is centralized and automatically executed for applicable steps
* one logical step can expose multiple input shapes via overloads
* multiple branch-specific build paths can coexist safely

Result: **invalid builder usage becomes unrepresentable code**, instead of something you have to guard against at runtime.

> Structural correctness is enforced at compile time.
> Value correctness is still enforced at runtime via validation.

---

###### Comparison

| Feature                 | Simple Builder | Interface Step Builder | TypedStateBuilder |
| ----------------------- | -------------- | ---------------------- | ----------------- |
| Compile-time safety     | ❌              | ✅                      | ✅                 |
| Required steps enforced | ❌              | ✅                      | ✅                 |
| Prevent duplicate steps | ❌              | ✅                      | ✅                 |
| Flexible ordering       | ✅              | ❌                      | ✅                 |
| Boilerplate             | Low            | High                   | Low               |
| Default values          | Manual         | Manual                 | Built-in          |
| Validation              | Manual         | Manual                 | Built-in          |
| Step overloads          | Manual         | Manual                 | Built-in          |
| Branch-specific builds  | Manual         | Manual                 | Built-in          |

---

###### Example

######### Builder template

```csharp
[TypedStateBuilder]
public class UserBuilder
{
    private readonly IEmailService _emailService;

    public UserBuilder(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [StepForValue]
    [ValidateValue(nameof(ValidateEmail))]
    private string _email;

    [StepForValue]
    [StepOverload(nameof(FullNameToName))]
    private string _name;

    [StepForValue(nameof(DefaultAge))]
    private int _age;

    private int DefaultAge() => 18;

    private string FullNameToName(string firstName, string lastName)
        => $"{firstName} {lastName}";

    private async Task ValidateEmail(string email)
    {
        if (!await _emailService.IsValidAsync(email))
            throw new InvalidOperationException("Invalid email");
    }

    [Build]
    public User Build()
        => new User(_name, _email, _age);
}
```

######### Usage

```csharp
var user = TypedStateBuilders
    .CreateUserBuilder(emailService)
    .SetName("Alice", "Walker")
    .SetEmail("alice@example.com")
    .Build();
```

The direct step method still exists:

```csharp
.SetName("Alice Walker")
```

Invalid usage is caught at compile time:

```csharp
var invalid = TypedStateBuilders
    .CreateUserBuilder(emailService)
    .SetName("Alice")
    .Build(); // ❌ email not set
```

---

###### What you write vs what you get

You only write:

* a normal class
* fields marked with `[StepForValue]`
* optional:

  * defaults (`[StepForValue(nameof(...))]`)
  * validators (`[ValidateValue]`)
  * overloads (`[StepOverload]`)
  * branches (`[StepBranch]`)
* one or more `[Build]` methods

The generator produces:

* a typed wrapper (`TypedMyBuilder<...>`)
* fluent step methods (`SetX(...)`)
* compile-time enforcement of required steps
* build methods that are only available when valid

No interfaces, no manual state tracking, no boilerplate.

---

###### How it works

Each step is encoded as a **type-state transition**:

```text
ValueUnset → ValueSet
```

The generated wrapper carries one state per step:

```csharp
TypedBuilder<ValueUnset, ValueUnset, ValueUnset>
    → SetName  → TypedBuilder<ValueSet, ValueUnset, ValueUnset>
    → SetEmail → TypedBuilder<ValueSet, ValueSet, ValueUnset>
```

A build method becomes available only when all required states for that build path are `ValueSet`.

######### Step semantics

Each step:

* can be called exactly once (in the typed API)
* transitions its state from `ValueUnset` to `ValueSet`
* is enforced by the type system — not runtime checks

The underlying builder remains mutable, but repeated assignments are not expressible through the generated API.

---

###### Branching

######### Mental model

Think of branches like paths:

```
car/
car/electric/
bike/
```

* `car` applies to `car/electric`
* `bike` is completely separate
* deeper paths build on their parents

This keeps related steps together while preventing invalid combinations.

---

######### Example

```csharp
[TypedStateBuilder]
public class VehicleBuilder
{
    [StepForValue]
    private string _name;

    [StepForValue]
    [StepBranch("car")]
    private int _doorCount;

    [StepForValue(nameof(DefaultBatteryKWh))]
    [StepBranch("car/electric")]
    private int _batteryKWh;

    [StepForValue]
    [StepBranch("bike")]
    private bool _hasBell;

    private int DefaultBatteryKWh() => 75;

    [Build("car")]
    public Vehicle BuildCar()
        => Vehicle.Car(_name, _doorCount);

    [Build("car/electric")]
    public Vehicle BuildElectricCar()
        => Vehicle.ElectricCar(_name, _doorCount, _batteryKWh);

    [Build("bike")]
    public Vehicle BuildBike()
        => Vehicle.Bike(_name, _hasBell);
}
```

---

######### Branch semantics

########## Build requirement

If any step uses branching, **all build methods must specify an explicit branch target**:

```csharp
[Build("car")]
public Vehicle BuildCar()
```

Unbranched `[Build]` methods are not allowed in branched builders.

---

########## Step applicability

A step applies if:

* it is unbranched, or
* its branch matches the build target, or
* its branch is a parent of the build target

---

########## Step compatibility

Two steps are compatible if:

* either is unbranched, or
* one branch is the same as or a parent of the other

Sibling branches are incompatible.

---

########## Ancestor requirement

If a step belongs to a deeper branch, any declared ancestor steps must already be set before it is callable.

---

###### Step overloads

```csharp
[StepForValue]
[StepOverload(nameof(CreateName))]
private string _name;

private string CreateName(string first, string last)
    => $"{first} {last}";
```

Generated API:

```csharp
builder.SetName("Alice Walker");
builder.SetName("Alice", "Walker");
```

---

###### Optional values and defaults

```csharp
[StepForValue(nameof(DefaultAge))]
private int _age;
```

######### Behavior

* step becomes optional
* if unset, default runs during build
* state remains `ValueUnset` until build

Defaults are applied before validation and build execution.

---

###### Validation

```csharp
[ValidateValue(nameof(ValidateName))]
private string _name;
```

######### Behavior

* runs automatically before build
* runs only for steps applicable to the selected build path
* exceptions are aggregated:

```csharp
throw new AggregateException(...)
```

######### Execution details

* defaults are applied first
* validators run next
* async validators execute synchronously (`GetAwaiter().GetResult()`)

Note:

* async validators are supported but executed synchronously
* there is currently no async build pipeline

---

###### Build methods

```csharp
[Build]
public User Build()
```

or:

```csharp
[Build("car")]
public Vehicle BuildCar()
```

######### Behavior

A build method:

* is only callable when required steps are satisfied
* preserves parameters and generics
* runs defaults and validation before execution

---

###### What gets generated

For each builder:

* typed wrapper (`TypedMyBuilder<...>`)
* step extension methods
* step overload extension methods
* build extension methods
* factory methods (`CreateMyBuilder(...)`)
* internal accessor layer (`UnsafeAccessor`)

---

###### Constructors

Constructors are exposed via:

```csharp
TypedStateBuilders.CreateMyBuilder(...)
```

* parameters preserved
* defaults preserved
* initial state: all steps `ValueUnset`

---

###### Dependency Injection

Constructor dependencies can be used in:

* build logic
* validation
* default providers
* step overload methods

---

###### Performance

* incremental generator (fast IDE experience)
* no reflection
* no runtime state tracking objects
* direct field/method access via generated accessors
* minimal runtime overhead
* wrapper allocation per step
* shared underlying builder instance

Notes:

* async validation blocks
* allocations mainly occur on validation failure

---

###### Constraints and limitations

######### Builder

* class only
* non-nested
* non-partial
* no inheritance
* public or internal

######### Steps

* fields only
* must be mutable
* no static or readonly

######### Branching

* path-based, prefix matching
* explicit build targets required when used

######### Step overloads

* must be non-generic
* must return field type
* must not collide

######### Validation

* only `void` or `Task` supported

---

###### Summary

TypedStateBuilder generates a builder API where:

* required steps are enforced at compile time
* invalid construction paths cannot be expressed
* ordering remains flexible where valid
* branching enables multiple safe build paths

You define a builder. The generator makes its correct usage explicit.


:::

### About
:::note

Generate strongly typed state builders for C# applications, improving code readability and maintainability.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TypedStateBuilder.Generator**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
	  <Nullable>enable</Nullable>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="TypedStateBuilder.Generator" Version="1.2.0" PrivateAssets="all" OutputItemType="Analyzer"  />
	  </ItemGroup>

	  
	 

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedStateBuilder.Generator\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **TypedStateBuilder.Generator** in *Program.cs*

```csharp showLineNumbers 
using Builder;
using TypedStateBuilder;
Console.WriteLine("create person builder");

var p = TypedStateBuilders
    .CreatePersonBuilder()
    .SetFirstName("Andrei")
    .SetLastName("Ignat")
    .Build()
    ;
;

Console.WriteLine(p.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedStateBuilder.Generator\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **TypedStateBuilder.Generator** in *Person.cs*

```csharp showLineNumbers 
using TypedStateBuilder;
namespace Builder;

[TypedStateBuilder]
public class PersonBuilder
{
    
    [StepForValue]
    [ValidateValue(nameof(ValidateName))] 
    private string lastName = string.Empty;

    [StepForValue]
    [ValidateValue(nameof(ValidateName))]
    private string firstName = string.Empty;

    public void ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name) || name.Length <= 1)
        {
            throw new ArgumentException("Name must be at least 2 characters long.", nameof(name));
        }
    }

    
    [Build]
    public Person Build()
     => new Person(firstName, lastName);
}

public record Person(string firstName, string lastName)
{
    public string FullName() => $"{firstName} {lastName}";
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedStateBuilder.Generator\src\Builder\obj\GX\TypedStateBuilder.Generator\TypedStateBuilder.Generator.TypedStateBuilderIncrementalGenerator\global__Builder_PersonBuilder_7DB9C28B.TypedStateBuilder.g.cs" label="global__Builder_PersonBuilder_7DB9C28B.TypedStateBuilder.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Builder
{

file static class PersonBuilder_Accessors
{
    [UnsafeAccessor(UnsafeAccessorKind.Constructor)]
    internal static extern global::Builder.PersonBuilder Create();

    [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "lastName")]
    internal static extern ref string SetLastNameField(global::Builder.PersonBuilder builder);

    [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "firstName")]
    internal static extern ref string SetFirstNameField(global::Builder.PersonBuilder builder);

    [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "ValidateName")]
    internal static extern void Validate_SetLastName_ValidateName_0(global::Builder.PersonBuilder owner, string value);

    [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "ValidateName")]
    internal static extern void Validate_SetFirstName_ValidateName_0(global::Builder.PersonBuilder owner, string value);

    [UnsafeAccessor(UnsafeAccessorKind.Method)]
    internal static extern global::Builder.Person Build(global::Builder.PersonBuilder builder);

}

public sealed class TypedPersonBuilder<TLastNameState, TFirstNameState>
    where TLastNameState : global::TypedStateBuilder.IValueState
    where TFirstNameState : global::TypedStateBuilder.IValueState
{
    private global::Builder.PersonBuilder Inner \{ get; }

    internal TypedPersonBuilder(global::Builder.PersonBuilder inner)
    {
        Inner = inner;
    }

    internal static TypedPersonBuilder<global::TypedStateBuilder.ValueSet, TFirstNameState> SetLastNameCore<TFirstNameState>(TypedPersonBuilder<global::TypedStateBuilder.ValueUnset, TFirstNameState> builder, string value)
    where TFirstNameState : global::TypedStateBuilder.IValueState
    {
        PersonBuilder_Accessors.SetLastNameField(builder.Inner) = value;
        return new TypedPersonBuilder<global::TypedStateBuilder.ValueSet, TFirstNameState>(builder.Inner);
    }

    internal static TypedPersonBuilder<TLastNameState, global::TypedStateBuilder.ValueSet> SetFirstNameCore<TLastNameState>(TypedPersonBuilder<TLastNameState, global::TypedStateBuilder.ValueUnset> builder, string value)
    where TLastNameState : global::TypedStateBuilder.IValueState
    {
        PersonBuilder_Accessors.SetFirstNameField(builder.Inner) = value;
        return new TypedPersonBuilder<TLastNameState, global::TypedStateBuilder.ValueSet>(builder.Inner);
    }

    internal static global::Builder.Person BuildCore(TypedPersonBuilder<global::TypedStateBuilder.ValueSet, global::TypedStateBuilder.ValueSet> builder)
    {
        List<Exception>? exceptions = null;

        try
        {
            PersonBuilder_Accessors.Validate_SetLastName_ValidateName_0(builder.Inner, PersonBuilder_Accessors.SetLastNameField(builder.Inner));
        }
        catch (Exception ex)
        {
            (exceptions ??= new List<Exception>()).Add(ex);
        }

        try
        {
            PersonBuilder_Accessors.Validate_SetFirstName_ValidateName_0(builder.Inner, PersonBuilder_Accessors.SetFirstNameField(builder.Inner));
        }
        catch (Exception ex)
        {
            (exceptions ??= new List<Exception>()).Add(ex);
        }

        if (exceptions is not null)
        {
            throw new AggregateException(exceptions);
        }

        return PersonBuilder_Accessors.Build(builder.Inner);
    }

}

public static partial class TypedPersonBuilderExtensions
{
    /// <summary>
    /// Sets the lastName.
    /// </summary>
    /// <param name="builder">The builder.</param>
    /// <param name="value">The value for <c>lastName</c>.</param>
    /// <returns>
    /// The updated builder.
    /// </returns>
    public static TypedPersonBuilder<global::TypedStateBuilder.ValueSet, TFirstNameState> SetLastName<TFirstNameState>(this TypedPersonBuilder<global::TypedStateBuilder.ValueUnset, TFirstNameState> builder, string value)
    where TFirstNameState : global::TypedStateBuilder.IValueState
        => TypedPersonBuilder<global::TypedStateBuilder.ValueUnset, TFirstNameState>.SetLastNameCore<TFirstNameState>(builder, value);

    /// <summary>
    /// Sets the firstName.
    /// </summary>
    /// <param name="builder">The builder.</param>
    /// <param name="value">The value for <c>firstName</c>.</param>
    /// <returns>
    /// The updated builder.
    /// </returns>
    public static TypedPersonBuilder<TLastNameState, global::TypedStateBuilder.ValueSet> SetFirstName<TLastNameState>(this TypedPersonBuilder<TLastNameState, global::TypedStateBuilder.ValueUnset> builder, string value)
    where TLastNameState : global::TypedStateBuilder.IValueState
        => TypedPersonBuilder<TLastNameState, global::TypedStateBuilder.ValueUnset>.SetFirstNameCore<TLastNameState>(builder, value);

    /// <summary>
    /// Builds the result.
    /// </summary>
    /// <param name="builder">The builder.</param>
    /// <returns>
    /// The built result.
    /// </returns>
    /// <exception cref="System.AggregateException">Thrown if validation fails.</exception>
    public static global::Builder.Person Build(this TypedPersonBuilder<global::TypedStateBuilder.ValueSet, global::TypedStateBuilder.ValueSet> builder)
        => TypedPersonBuilder<global::TypedStateBuilder.ValueSet, global::TypedStateBuilder.ValueSet>.BuildCore(builder);

}

}

namespace TypedStateBuilder
{

public static partial class TypedStateBuilders
{
    /// <summary>
    /// Creates a new <see cref="Builder.TypedPersonBuilder"/>.
    /// </summary>
    /// <returns>
    /// A new builder instance.
    /// </returns>
    public static global::Builder.TypedPersonBuilder<global::TypedStateBuilder.ValueUnset, global::TypedStateBuilder.ValueUnset> CreatePersonBuilder()
    {
        var inner = global::Builder.PersonBuilder_Accessors.Create();
        return new global::Builder.TypedPersonBuilder<global::TypedStateBuilder.ValueUnset, global::TypedStateBuilder.ValueUnset>(inner);
    }

}
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TypedStateBuilder.Generator\src\Builder\obj\GX\TypedStateBuilder.Generator\TypedStateBuilder.Generator.TypedStateBuilderIncrementalGenerator\TypedStateBuilder.Attributes.g.cs" label="TypedStateBuilder.Attributes.g.cs" >
```csharp showLineNumbers 
// <auto-generated />
#nullable enable
using System;

namespace TypedStateBuilder;

/// <summary>
/// Represents a builder step state.
/// </summary>
public interface IValueState \{ }

/// <summary>
/// Indicates that a builder step has been set.
/// </summary>
public sealed class ValueSet : IValueState \{ }

/// <summary>
/// Indicates that a builder step has not been set.
/// </summary>
public sealed class ValueUnset : IValueState \{ }

/// <summary>
/// Marks a method as a build method.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
public sealed class BuildAttribute : Attribute
{
    /// <summary>
    /// Marks a method as a build method.
    /// </summary>
    public BuildAttribute()
    {
    }

    /// <summary>
    /// Marks a method as a build method for a specific branch.
    /// </summary>
    /// <param name="targetBranch">The branch path.</param>
    public BuildAttribute(string targetBranch)
    {
    }
}

/// <summary>
/// Marks a field as a builder step.
/// </summary>
[AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = false)]
public class StepForValueAttribute : Attribute
{
    /// <summary>
    /// Marks a required builder step.
    /// </summary>
    public StepForValueAttribute()
    {
    }

    /// <summary>
    /// Marks an optional builder step with a default value provider.
    /// </summary>
    /// <param name="providerMemberName">The provider member name.</param>
    public StepForValueAttribute(string providerMemberName)
    {
    }
}

/// <summary>
/// Assigns a step to a branch.
/// </summary>
[AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = false)]
public sealed class StepBranchAttribute : Attribute
{
    /// <summary>
    /// Assigns a step to a branch.
    /// </summary>
    /// <param name="branchPath">The branch path.</param>
    public StepBranchAttribute(string branchPath)
    {
    }
}

/// <summary>
/// Adds another way to set a builder step.
/// </summary>
[AttributeUsage(AttributeTargets.Field, AllowMultiple = true, Inherited = false)]
public sealed class StepOverloadAttribute : Attribute
{
    /// <summary>
    /// Adds another way to set a builder step.
    /// </summary>
    /// <param name="overloadMemberName">The overload member name.</param>
    public StepOverloadAttribute(string overloadMemberName)
    {
    }
}

/// <summary>
/// Adds validation for a builder step.
/// </summary>
[AttributeUsage(AttributeTargets.Field, AllowMultiple = true, Inherited = false)]
public sealed class ValidateValueAttribute : Attribute
{
    /// <summary>
    /// Adds validation for a builder step.
    /// </summary>
    /// <param name="validatorMemberName">The validator member name.</param>
    public ValidateValueAttribute(string validatorMemberName)
    {
    }
}

/// <summary>
/// Enables typed builder generation for a builder class.
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
public sealed class TypedStateBuilderAttribute : Attribute
{
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project TypedStateBuilder.Generator ](/sources/TypedStateBuilder.Generator.zip)

:::


### Share TypedStateBuilder.Generator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedStateBuilder.Generator&quote=TypedStateBuilder.Generator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedStateBuilder.Generator&text=TypedStateBuilder.Generator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedStateBuilder.Generator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedStateBuilder.Generator&title=TypedStateBuilder.Generator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedStateBuilder.Generator&title=TypedStateBuilder.Generator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTypedStateBuilder.Generator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TypedStateBuilder.Generator

<SameCategory />

