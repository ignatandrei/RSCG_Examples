# MatchGenerator

**Bring exhaustive pattern matching to C# enums and unions with zero boilerplate.**

[MatchGenerator](https://github.com/ycanardeau/MatchGenerator) is a Roslyn source generator that creates `Match` extension methods for your enums and discriminated-union-like types, enabling concise, expressive, and compile-time safe branching.

## Features

- Generate `Match` extension methods for enums and unions
- Exhaustive by design (no missing cases)
- Attribute-driven (opt-in per type)
- Supports generics (`Match<U>`)
- Respects effective accessibility
- Zero runtime cost (pure source generation)

## Getting Started

### 1. Install the package

```bash
dotnet add package Aigamo.MatchGenerator
```

### 2. Annotate your type

#### Enum example

```csharp
using Aigamo.MatchGenerator;

[GenerateMatch]
public enum Gender
{
	Male = 1,
	Female,
}
```

#### Union example

```csharp
using Aigamo.MatchGenerator;

[GenerateMatch]
abstract record MaritalStatus;

sealed record Single : MaritalStatus;
sealed record Married : MaritalStatus;
sealed record Divorced : MaritalStatus;
sealed record Widowed : MaritalStatus;
```

### 3. Use `Match`

#### Enum

```csharp
var message = gender.Match(
	onMale: () => "male",
	onFemale: () => "female"
);
```

#### Union

```csharp
var message = maritalStatus.Match(
	onSingle: x => "single",
	onMarried: x => "married",
	onDivorced: x => "divorced",
	onWidowed: x => "widowed"
);
```

## Why use MatchGenerator?

### Without MatchGenerator

#### Enum

```csharp
var message = gender switch
{
	Gender.Male => "male",
	Gender.Female => "female",
	_ => throw new UnreachableException(),
};
```

#### Union

```csharp
var message = maritalStatus switch
{
	Single x => "single",
	Married x => "married",
	Divorced x => "divorced",
	Widowed x => "widowed",
	_ => throw new UnreachableException(),
};
```

### With MatchGenerator

```csharp
var message = gender.Match(
	onMale: () => "male",
	onFemale: () => "female"
);
```

- More concise
- More readable
- No default case required
- Compile-time safety

## Exhaustiveness Guarantee

All cases must be handled.

If a new enum value or union type is added:

```csharp
public enum Gender
{
	Male = 1,
	Female,
	Other,
}
```

or

```csharp
sealed record Separated : MaritalStatus;
```

Existing `Match` calls will fail to compile until updated. This ensures no cases are missed.

## Generated Code (Example)

### Enum

```csharp
internal static class GenderMatchExtensions
{
	public static U Match<U>(
		this Gender value,
		Func<U> onFemale,
		Func<U> onMale
	)
	{
		return value switch
		{
			Gender.Female => onFemale(),
			Gender.Male => onMale(),
			_ => throw new UnreachableException(),
		};
	}
}
```

### Union

```csharp
internal static class MaritalStatusMatchExtensions
{
	public static U Match<U>(
		this MaritalStatus value,
		Func<Divorced, U> onDivorced,
		Func<Married, U> onMarried,
		Func<Single, U> onSingle,
		Func<Widowed, U> onWidowed
	)
	{
		return value switch
		{
			Divorced x => onDivorced(x),
			Married x => onMarried(x),
			Single x => onSingle(x),
			Widowed x => onWidowed(x),
			_ => throw new UnreachableException(),
		};
	}
}
```

## References

- [Introducing C# Source Generators - .NET Blog](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/)
- [roslyn/docs/features/source-generators.cookbook.md at main · dotnet/roslyn](https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md)
- [roslyn/docs/features/incremental-generators.cookbook.md at main · dotnet/roslyn](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md)
- [Domain Modeling Made Functional: Tackle Software Complexity with Domain-Driven Design and F# by Scott Wlaschin](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)
- [It Seems the C# Team Is Finally Considering Supporting Discriminated Unions - DEV Community](https://dev.to/canro91/it-seems-the-c-team-is-finally-considering-supporting-discriminated-unions-59k3)
- [salvois/DiscriminatedOnions: A stinky but tasty hack to emulate F#-like discriminated unions in C#](https://github.com/salvois/DiscriminatedOnions)
