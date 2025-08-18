# Flaggen

A C# source generator that generates extension methods for flags enums.

## Usage

Install the package:

```shell
dotnet add package Flaggen
```

Suppose we have this enum:

```csharp
using System;

[Flags]
public enum LovelyColors {
    RoseGold = 1 << 0,
    SeaGreen = 1 << 1,
    SunshineYellow = 1 << 2,
    BrightRed = 1 << 3,
}
```

The source generator will notice the `[Flags]` attribute and generate extension methods
for this enum:

```csharp
// initalize with some value
var myColors = LovelyColors.RoseGold | LovelyColors.SeaGreen;

// manipulate the flags
myColors.Add(LovelyColors.BrightRed);
myColors.Remove(LovelyColors.RoseGold);
myColors.Toggle(LovelyColors.SeaGreen);

// check for flags
if (myColors.Has(LovelyColors.SunshineYellow))
    Console.WriteLine("So shiny!");

```

All the extension methods using bitwise operators (so no reflection!), which makes them pretty fast (I will not prove
this, but you get my trust-me-bro™️ guarantee).

## License

[MIT](LICENSE.md)
