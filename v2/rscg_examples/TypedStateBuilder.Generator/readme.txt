# TypedStateBuilder

A Roslyn incremental source generator that makes **invalid builder usage impossible to compile**.

You define a normal builder class. The generator produces a fluent API where **invalid construction flows are not expressible through the generated API**.

[![NuGet](https://img.shields.io/nuget/v/TypedStateBuilder.Generator.svg?logo=nuget)](https://www.nuget.org/packages/TypedStateBuilder.Generator)

---

## Why

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

## What this solves

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

## Comparison

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

## Example

### Builder template

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

### Usage

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

## What you write vs what you get

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

## How it works

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

### Step semantics

Each step:

* can be called exactly once (in the typed API)
* transitions its state from `ValueUnset` to `ValueSet`
* is enforced by the type system — not runtime checks

The underlying builder remains mutable, but repeated assignments are not expressible through the generated API.

---

## Branching

### Mental model

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

### Example

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

### Branch semantics

#### Build requirement

If any step uses branching, **all build methods must specify an explicit branch target**:

```csharp
[Build("car")]
public Vehicle BuildCar()
```

Unbranched `[Build]` methods are not allowed in branched builders.

---

#### Step applicability

A step applies if:

* it is unbranched, or
* its branch matches the build target, or
* its branch is a parent of the build target

---

#### Step compatibility

Two steps are compatible if:

* either is unbranched, or
* one branch is the same as or a parent of the other

Sibling branches are incompatible.

---

#### Ancestor requirement

If a step belongs to a deeper branch, any declared ancestor steps must already be set before it is callable.

---

## Step overloads

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

## Optional values and defaults

```csharp
[StepForValue(nameof(DefaultAge))]
private int _age;
```

### Behavior

* step becomes optional
* if unset, default runs during build
* state remains `ValueUnset` until build

Defaults are applied before validation and build execution.

---

## Validation

```csharp
[ValidateValue(nameof(ValidateName))]
private string _name;
```

### Behavior

* runs automatically before build
* runs only for steps applicable to the selected build path
* exceptions are aggregated:

```csharp
throw new AggregateException(...)
```

### Execution details

* defaults are applied first
* validators run next
* async validators execute synchronously (`GetAwaiter().GetResult()`)

Note:

* async validators are supported but executed synchronously
* there is currently no async build pipeline

---

## Build methods

```csharp
[Build]
public User Build()
```

or:

```csharp
[Build("car")]
public Vehicle BuildCar()
```

### Behavior

A build method:

* is only callable when required steps are satisfied
* preserves parameters and generics
* runs defaults and validation before execution

---

## What gets generated

For each builder:

* typed wrapper (`TypedMyBuilder<...>`)
* step extension methods
* step overload extension methods
* build extension methods
* factory methods (`CreateMyBuilder(...)`)
* internal accessor layer (`UnsafeAccessor`)

---

## Constructors

Constructors are exposed via:

```csharp
TypedStateBuilders.CreateMyBuilder(...)
```

* parameters preserved
* defaults preserved
* initial state: all steps `ValueUnset`

---

## Dependency Injection

Constructor dependencies can be used in:

* build logic
* validation
* default providers
* step overload methods

---

## Performance

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

## Constraints and limitations

### Builder

* class only
* non-nested
* non-partial
* no inheritance
* public or internal

### Steps

* fields only
* must be mutable
* no static or readonly

### Branching

* path-based, prefix matching
* explicit build targets required when used

### Step overloads

* must be non-generic
* must return field type
* must not collide

### Validation

* only `void` or `Task` supported

---

## Summary

TypedStateBuilder generates a builder API where:

* required steps are enforced at compile time
* invalid construction paths cannot be expressed
* ordering remains flexible where valid
* branching enables multiple safe build paths

You define a builder. The generator makes its correct usage explicit.
