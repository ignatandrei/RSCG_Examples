# Porticle.Enumly

A Roslyn source generator for compile-time enum-to-enum mapping. Mark a partial class
with `[EnumlyClass]` and partial methods with `[EnumlyMap]` and Porticle.Enumly fills
in the implementation — by member name, with prefix stripping, nullable enum support,
explicit value overrides and exhaustive coverage diagnostics.

## Build State

[![Build and Release](https://github.com/Machibuse/Porticle.Enumly/actions/workflows/release.yaml/badge.svg)](https://github.com/Machibuse/Porticle.Enumly/actions/workflows/release.yaml)

## NuGet

[![NuGet Latest Version](https://img.shields.io/nuget/v/Porticle.Enumly.svg)](https://www.nuget.org/packages/Porticle.Enumly/)
[![NuGet Downloads](https://img.shields.io/nuget/dt/Porticle.Enumly.svg)](https://www.nuget.org/packages/Porticle.Enumly/)

## Installation

```powershell
dotnet add package Porticle.Enumly
```

## Quick start

```csharp
using Porticle.Enumly;

[EnumlyClass]
public static partial class Mapper
{
    [EnumlyMap]
    public static partial Foo ToFoo(Bar value);

    [EnumlyMap]
    public static partial Bar ToBar(Foo value);
}

public enum Foo { Red, Green, Blue }
public enum Bar { Green, Red, Blue }
```

The generator produces a switch-based implementation that maps members by name. If a
source value has no matching target, you get a compile-time error (`EM0001`) — no
silent fallthroughs.

## Features

### By-name matching with prefix stripping

If every member of an enum shares a common prefix that ends at a Pascal-case boundary,
that prefix is ignored when matching against the other enum:

```csharp
public enum Foo { GoldRed, GoldRose, GoldRoyal }   // prefix: "Gold"
public enum Bar { BarRed, BarRose, BarRoyal }      // prefix: "Bar"

// Bar.BarRed   -> Foo.GoldRed
// Bar.BarRose  -> Foo.GoldRose
// Bar.BarRoyal -> Foo.GoldRoyal
```

The detection looks for the longest common prefix of all member names and trims it
back to the last position where every member's next character is uppercase. Source
and target are analyzed independently, so prefix stripping works even when only one
side has a prefix.

### Nullable enum mappings

All four direction combinations work:

```csharp
[EnumlyMap]
public static partial Foo  ToFoo(Bar value);    // T -> U

[EnumlyMap(NullSourceValue = Bar.None)]
public static partial Foo? ToFoo(Bar value);    // T -> U?  (Bar.None -> null)

[EnumlyMap(NullTargetValue = Foo.Unknown)]
public static partial Foo  ToFoo(Bar? value);   // T? -> U  (null -> Foo.Unknown)

[EnumlyMap]
public static partial Foo? ToFoo(Bar? value);   // T? -> U? (null -> null)
```

- `NullSourceValue` is a value of the **source** enum that should map to `null` on
  the target side. Only meaningful when the target is nullable.
- `NullTargetValue` is a value of the **target** enum that is produced when the
  source is `null`.
- `IgnoreNullSource = true` — when the source is `null`, throw
  `ArgumentNullException` at runtime instead of producing a target. Use this when
  you'd rather fail loudly than pick a target value for null.
- For `T? -> U?`, `null -> null` happens automatically. `NullSourceValue`,
  `NullTargetValue` and `IgnoreNullSource` can still be used to override that.

When the source is nullable and the target is non-nullable, exactly one of
`NullTargetValue` or `IgnoreNullSource` must be set (otherwise `EM0010`, error) —
null input must have a defined behavior. Setting both is a contradiction and
fails with `EM0011`.

```csharp
[EnumlyMap(IgnoreNullSource = true)]
public static partial Foo ToFoo(Bar? value);   // T? -> U  (null -> throw)
```

### Explicit value overrides

For special cases where by-name matching can't reach (because the names don't line
up even after prefix stripping), use `[EnumlyMapValue]`:

```csharp
[EnumlyMap]
[EnumlyMapValue(Bar.BarRoyalBlue, Foo.GoldRoyal)]
public static partial Foo ToFoo(Bar value);
```

Explicit mappings override by-name matching for the given source value. The
attribute can be applied multiple times per method. A source value covered by an
`[EnumlyMapValue]` is exempt from the coverage diagnostic.

### Ignoring unmapped values

By default the generator enforces coverage in **both directions**:

- every **source** value must have a target (otherwise `EM0001`, error)
- every **target** value must be reachable from some source (otherwise `EM0008`, warning)

When a value is intentionally outside the mapping, opt out per-value:

```csharp
[EnumlyMap]
[EnumlyMapValue(Bar.BarRoyalBlue, Foo.GoldRoyal)]
[EnumlyIgnoreSource(Bar.BarLegacy)]      // suppresses EM0001 for Bar.BarLegacy
[EnumlyIgnoreTarget(Foo.GoldReserved)]   // suppresses EM0008 for Foo.GoldReserved
public static partial Foo ToFoo(Bar value);
```

- `[EnumlyIgnoreSource(value)]` — marks a source value as intentionally unmapped.
  At runtime, calling the method with that value throws
  `ArgumentOutOfRangeException` with a message identifying the value as
  *excluded by `[EnumlyIgnoreSource]`* — distinguishable from a generic
  unsupported value.
- `[EnumlyIgnoreTarget(value)]` — marks a target value as intentionally
  unreachable. Purely a compile-time hint; no runtime effect.

Both attributes can be applied multiple times. The argument's enum type is
verified at compile time (otherwise `EM0009`, error).

## Diagnostics

| ID     | Severity | Meaning                                                                                                                                                                               |
|--------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EM0001 | Error    | Source enum value has no matching target member (after prefix-strip and explicit overrides). Suppressible per-value with `[EnumlyIgnoreSource]`.                                      |
| EM0002 | Error    | Method is not partial / has invalid signature (must take one enum and return an enum).                                                                                                |
| EM0003 | Error    | `NullSourceValue` is set but the return type is not nullable.                                                                                                                         |
| EM0004 | Error    | A specified null value is not a member of its enum.                                                                                                                                   |
| EM0005 | Error    | A specified null value has the wrong enum type.                                                                                                                                       |
| EM0006 | Error    | An `EnumlyMapValue` argument has the wrong enum type.                                                                                                                                 |
| EM0007 | Error    | The same source value is mapped explicitly more than once.                                                                                                                            |
| EM0008 | Warning  | Target enum value is not reachable from any source. Suppressible per-value with `[EnumlyIgnoreTarget]`, or globally via `.editorconfig` (`dotnet_diagnostic.EM0008.severity = none`). |
| EM0009 | Error    | An `EnumlyIgnoreSource` / `EnumlyIgnoreTarget` argument has the wrong enum type.                                                                                                      |
| EM0010 | Error    | Source is nullable and target is non-nullable, but neither `NullTargetValue` nor `IgnoreNullSource = true` is set — null input has no defined behavior.                              |
| EM0011 | Error    | `NullTargetValue` and `IgnoreNullSource` are both set — they describe conflicting behavior for null input.                                                                            |

`NullTargetValue` and `IgnoreNullSource` on a non-nullable source are allowed and ignored — no diagnostic.

## Example: full mapper class

```csharp
using Porticle.Enumly;

[EnumlyClass]
public static partial class Mapper
{
    [EnumlyMap]
    [EnumlyMapValue(Bar.BarRoyalBlue, Foo.GoldRoyal)]
    public static partial Foo ToFoo(Bar value);

    [EnumlyMap(NullSourceValue = Noo.GooNone)]
    [EnumlyMapValue(Noo.GooRoyal, Bar.BarRoyalBlue)]
    public static partial Bar? ToNullableBar(Noo value);

    [EnumlyMap(NullTargetValue = Noo.GooNone)]
    [EnumlyMapValue(Bar.BarRoyalBlue, Noo.GooRoyal)]
    public static partial Noo ToNoo(Bar? value);
}
```

The generator produces:

```csharp
public static partial Foo ToFoo(Bar value)
{
    return value switch
    {
        Bar.BarRed       => Foo.GoldRed,
        Bar.BarRose      => Foo.GoldRose,
        Bar.BarRoyalBlue => Foo.GoldRoyal,           // explicit override
        _ => throw new ArgumentOutOfRangeException(...)
    };
}
```

## License

MIT — see [LICENSE](LICENSE).
