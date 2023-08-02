
# `enum class` Generator

## Summary

Type-safe source-generated alternative to C# `enum` inspired by Kotlin `enum class`

## What is it?

This library contains source generator that creates `class` for specified `enum`. 
These classes contain similar functionality as original enum, but behave as ordinal `class`

## Getting started

### Installation

1. Add reference to Nuget package

- .NET CLI

```bash
dotnet add package EnumClass --version 1.2.0
```

- Package Manager

```
Install-Package EnumClass -Version 1.2.0
```

- PackageReference

```
<PackageReference Include="EnumClass" Version="1.2.0" />
```

2. Specify _Analyzer_ property in `.csproj`

```
<PackageReference Include="EnumClass" Version="1.2.0" OutputItemType="Analyzer"/>
```


## Usage

### Example usage

Add `[EnumClass]` attribute to enum

That is all! 
Corresponding class will be generated in namespace as your enum, but prefixed with **EnumClass**

Example
```csharp
using EnumClass.Attributes;

namespace Domain
{
    [EnumClass]
    public enum PetKind
    {
        Cat,
        Dog
    }
    
    namespace EnumClass
    {
        public partial abstract class PetKind
        {
            public partial class CatEnumValue
            {
                public void SayMeow()
                {
                    System.Console.WriteLine("Meow!");
                }
            }
        }
    }
}
```
### ToString()

All `ToString()` are generated at compile time.
By default, they equal to name of corresponding member.
```csharp
Console.WriteLine(EnumClass.PetKind.Cat.ToString() == "Cat"); 
// Output: true
```

If you want to override default value - use `[EnumMemberInfo(StringValue = "")]` attribute
```csharp
namespace Domain;

[EnumClass]
public enum PetKind
{
    [EnumMemberInfo(StringValue = "Kitten")]
    Cat,
    Dog
}
// -------------

Console.WriteLine(EnumClass.PetKind.Cat.ToString());
// Output: Kitten
```

### Cast to enum

All classes have overriden cast operator to original enum value
```csharp
Console.WriteLine(((PetKind)EnumClass.PetKind.Cat) == PetKind.Cat); 
// Output: true
```

### Cast to `int`

All classes have overriden cast to `int`
```csharp
Console.WriteLine(((int)EnumClass.PetKind.Cat) == ((int)PetKind.Cat)); 
// Output: true
```

### `Equals()`

Generated classes implement `IEquatable<>` both for enum class and original enum.
Thus, has methods `Equals(EnumClass)` and `Equals(OrignalEnum)`

```csharp
Console.WriteLine(EnumClass.PetKind.Cat.Equals(EnumClass.PetKind.Cat)); // Calls Equals(EnumClass.PetKind)
Console.WriteLine(EnumClass.PetKind.Cat.Equals(EnumClass.PetKind.Dog)); // Calls Equals(EnumClass.PetKind)
Console.WriteLine(EnumClass.PetKind.Cat.Equals(PetKind.Cat)); // Calls Equals(PetKind)
Console.WriteLine(EnumClass.PetKind.Cat.Equals(PetKind.Dog)); // Calls Equals(PetKind)
// Output: true
//         false
//         true
//         false
```

P.S. and of course `Equals(object?)`

### `Switch` function

Instead of writing `switch` every time, a fimily
of switch function is generated. 
They accepts both `Action` and `Func` with enum class at first argument and optional additional arguments.

E.g. 
1. `Func<int>`
```csharp
var cat = EnumClass.PetKind.Cat;
var value = cat.Switch(1,
        (cat, i) => i + 1,
        (dog, i) => i * 100);
Console.WriteLine(value); 
// Output: 2
```

2. `Action`
```csharp
var dog = EnumClass.PetKind.Dog;
dog.Switch(
    cat => cat.SayMeow(),
    dog => Console.WriteLine("Oh, it is puppy!")); 
// Output: Oh, it is puppy!
```

### `TryParse`

There is static function `bool EnumClass.TryParse(string value, out EnumClass enumClass)` for parsing values from raw enums.
This function accepts strings with and without enum name: **PetKind.Cat** and **Cat** will be parsed into Cat value.

```csharp
if (EnumClass.PetKind.TryParse("Cat", out var cat)
{
    Console.WriteLine($"This is cat!! {cat}");
}
else
{
    Console.WriteLine("This is not cat");
}
```

### More

For more examples checkout _samples_ folder

## Features

### Incremental generator

It uses incremental generator instead of source generator.
This implies better performance in comparison


### Custom target namespace

By default generated class contained in the same namespace as original enum + ".EnumClass" suffix.
You can manually set target namespace in `Namespace` property of `[EnumClass]` attribute.

```csharp
using EnumClass.Attributes;

namespace Test;

[EnumClass(Namespace = "Domain")]
public enum SampleEnum
{
    First,
    Second
}
//------------------
using Domain;

Console.WriteLine(SampleEnum.First);
```

### Generate `enum class` for enum from another assembly

If you do not have access to enum source code directly, you can generate `enum class` for enum in external assembly.
For this use `[ExternalEnumClass]` attribute.

```csharp
// External assembly
namespace Logic;

public enum Word
{
    Single,
    Double,
    Triple
}
```

```csharp
// Our assembly
using EnumClass.Attributes;
using Logic;

[assembly: ExternalEnumClass(typeof(Word), Namespace = "Another")]
namespace Another;

public partial class Word
{
    public abstract int WordsCount { get; }
    
    public partial class SingleEnumValue
    {
        public override int WordsCount => 1;    
    }
    
    
    public partial class DoubleEnumValue
    {
        public override int WordsCount => 2;    
    }
    
    
    public partial class TripleEnumValue
    {
        public override int WordsCount => 3;    
    }
}
```

## Known limitations

### Same name of member and enum

In the current implementation, static enum class field names have the same names as members of the original enum.

E.g.
```csharp
[EnumClass]
public enum TokenType
{
    TokenType
}
```

will generate approximately the following code

```csharp
public class TokenType
{
    public static TokenTypeEnumValue TokenType = new();
}
```

### Half-baked

The project at an early stage of life. 
I'm sure there are lots of hidden bugs, so be cautious using it in production.
In production may be better for now to use [SmartEnum](https://github.com/ardalis/SmartEnum)

## Contributing

If you have an idea on how to improve the project or have found a bug, 
create an issue on [GitHub](https://github.com/ashenBlade/EnumClass/issues)

## Give a star

If you want to see the continuation of the project, give it a star!
