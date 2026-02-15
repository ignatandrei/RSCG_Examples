# DataAnnotationValuesExtractor

![Build
status](https://github.com/pekspro/DataAnnotationValuesExtractor/actions/workflows/build-and-test.yml/badge.svg)
[![NuGet](https://img.shields.io/nuget/v/Pekspro.DataAnnotationValuesExtractor.svg)](https://www.nuget.org/packages/Pekspro.DataAnnotationValuesExtractor/)

A C# source generator that automatically extracts values from data annotation
attributes and exposes them as strongly-typed constants. Access your
`StringLength`, `Range`, `Required` and `Display` attribute values as constants
in your classes.

## Why Use This?

When working with data annotations, you often need to reference validation
constraints. A good way to solve it is to create constants. But it takes time to
do and makes your data models harder to read. And it's harder when your models
are auto generated like when you are scaffolding with Entity Framework.

This source generator creates the constants automatically for you. If you have
this model:

```csharp
public partial class Product
{
    [Required]
    [StringLength(100)]
    public string? Name { get; set; }

    [Required]
    [Range(0.01, 999999.99)]
    public decimal Price { get; set; }
}
```

Constants will be generated that you can access like this:

```csharp
// Name length constraints
int maxNameLength = Product.Annotations.Name.MaximumLength; // 100
bool nameRequired = Product.Annotations.Name.IsRequired; // true

// Price constraints
double minPrice = Product.Annotations.Price.Minimum; // 0.01
double maxPrice = Product.Annotations.Price.Maximum; // 999999.99
```

## Usage Patterns

There are two ways to configure DataAnnotationValuesExtractor depending on your
needs:

### 1. Direct Approach

Apply `[DataAnnotationValues]` directly to each class you want to generate
constants for:

```csharp
[DataAnnotationValues(StringLength = true, Range = true, Required = true, Display = true)]
public partial class Product
{
    [Display(Name = "Product name")]
    [Required]
    [StringLength(100)]
    public string? Name { get; set; }

    [Display(Name = "Product price")]
    [Required]
    [Range(0.01, 999999.99)]
    public decimal Price { get; set; }

    public string? Sku { get; set; }
}
```

### 2. Centralized Approach

Create a dummy class and use the `DataAnnotationValuesToGenerate` attribute for
each class you want to generate constants for. You can use the
`DataAnnotationValuesConfiguration` attribute to configure what to be generated.

```csharp
using Pekspro.DataAnnotationValuesExtractor;

[DataAnnotationValuesConfiguration(StringLength = true, Range = true, Required = true, Display = true)]
[DataAnnotationValuesToGenerate(typeof(Customer))]
[DataAnnotationValuesToGenerate(typeof(Order))]
[DataAnnotationValuesToGenerate(typeof(Product))]
partial class ValidationConstants
{
}
```

Your model classes remain unchanged.

This approach is especially useful when working with auto-generated models, such
as those created by Entity Framework scaffolding. If you do, and you have all
your models in a folder, you can use this PowerShell script to generate the
attributes for all models in that folder:

```powershell
Get-ChildItem -Filter '*.cs' |
    Where-Object { -not ($_.BaseName -match '(?i)context') } |
    ForEach-Object { "[DataAnnotationValuesToGenerate(typeof($($_.BaseName)))]" } |
    Set-Clipboard
```

### Use the generated constants

No matter which approach your are using, you can access generated constants like
this:

```csharp
// Name
int maxNameLength = Product.Annotations.Name.MaximumLength; // 100
int minNameLength = Product.Annotations.Name.MinimumLength; // 0
bool nameRequired = Product.Annotations.Name.IsRequired; // true
string? nameDisplayName = Product.Annotations.Name.Display.Name; // Product name

// Price
double minPrice = Product.Annotations.Price.Minimum; // 0.01
double maxPrice = Product.Annotations.Price.Maximum; // 999999.99
bool priceRequired = Product.Annotations.Price.IsRequired;
string? priceDisplayName = Product.Annotations.Price.Display.Name; // Price name

// Sku
bool skuRequired = Product.Annotations.Sku.IsRequired; // false
```

## Installation

Add the package to your project:

```bash
dotnet add package Pekspro.DataAnnotationValuesExtractor
```

For optimal setup, configure the package reference in your `.csproj` to exclude
it from your output assembly:

```xml
<ItemGroup>
  <PackageReference Include="Pekspro.DataAnnotationValuesExtractor" Version="0.0.1" 
    PrivateAssets="all" ExcludeAssets="runtime" />
</ItemGroup>
```

**Why these attributes?**

- `PrivateAssets="all"` - Projects referencing yours won't inherit this package,
  they don't need it.
- `ExcludeAssets="runtime"` - The attributes DLL won't be copied to your build
  output, this is also not needed.

## Configuration Options

Both `[DataAnnotationValues]` and `[DataAnnotationValuesConfiguration]` support
the following properties to control which constants are generated:

| Property       | Default | Generated Constants                                              | Description                                     |
| -------------- | ------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| `StringLength` | `true`  | `MaximumLength`, `MinimumLength`                                 | Extract values from `[StringLength]` attribute. |
| `Range`        | `true`  | `Minimum`, `Maximum`, `MinimumIsExclusive`, `MaximumIsExclusive` | Extract values from `[Range]` attribute.        |
| `Required`     | `false` | `IsRequired`                                                     | Detect presence of `[Required]` attribute.      |
| `Display`     | `false` | `Name`, `Description`, `ShortName`                                | Extract values from `[Display]` attribute.      |

Do you miss some annotations? Create an issue and let me know.

## Viewing Generated Code

There are two ways to inspect the generated source code:

### Method 1: Go to Definition

Right-click on your class name and select **Go to Definition** (F12). Visual
Studio will show you the generated partial class.

### Method 2: Output to File

Add this to your `.csproj` file to save generated files to disk:

```xml
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
  <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\$(Configuration)\GeneratedFiles</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

Generated files will be saved to `obj\[Configuration]\GeneratedFiles\`
directory.

## Generated Code Example

Given this input:

```csharp
[DataAnnotationValues(StringLength = true, Range = true, Required = true, Display = true)]
public partial class Player
{
    [Display(Name = "Player name", ShortName ="Name", Description = "Name of player")]
    [Required]
    [StringLength(50)]
    public string? Name { get; set; }

    [StringLength(100, MinimumLength = 6)]
    public string? Email { get; set; }

    [Range(1, 100)]
    public int Score { get; set; }
}
```

The generator produces:

```csharp
public partial class Player
{
    /// <summary>
    /// Data annotation values.
    /// </summary>
    public static class Annotations
    {
        /// <summary>
        /// Data annotation values for Name.
        /// </summary>
        public static class Name
        {
            /// <summary>
            /// Maximum length for Name.
            /// </summary>
            public const int MaximumLength = 50;

            /// <summary>
            /// Minimum length for Name.
            /// </summary>
            public const int MinimumLength = 0;

            /// <summary>
            /// Indicates whether Name is required.
            /// </summary>
            public const bool IsRequired = true;

            /// <summary>
            /// Display attribute values for Name.
            /// </summary>
            public static class Display
            {
                /// <summary>
                /// Display name for Name.
                /// </summary>
                public const string? Name = "Player name";

                /// <summary>
                /// Short display name for Name.
                /// </summary>
                public const string? ShortName = "Name";

                /// <summary>
                /// Description for Name.
                /// </summary>
                public const string? Description = "Name of player";
            }
        }

        /// <summary>
        /// Data annotation values for Email.
        /// </summary>
        public static class Email
        {
            /// <summary>
            /// Maximum length for Email.
            /// </summary>
            public const int MaximumLength = 100;

            /// <summary>
            /// Minimum length for Email.
            /// </summary>
            public const int MinimumLength = 6;

            /// <summary>
            /// Indicates whether Email is required.
            /// </summary>
            public const bool IsRequired = false;
        }

        /// <summary>
        /// Data annotation values for Score.
        /// </summary>
        public static class Score
        {
            /// <summary>
            /// Minimum value for Score.
            /// </summary>
            public const int Minimum = 1;

            /// <summary>
            /// Maximum value for Score.
            /// </summary>
            public const int Maximum = 100;

            /// <summary>
            /// Indicates whether the minimum value for Score is exclusive.
            /// </summary>
            public const bool MinimumIsExclusive = false;

            /// <summary>
            /// Indicates whether the maximum value for Score is exclusive.
            /// </summary>
            public const bool MaximumIsExclusive = false;

            /// <summary>
            /// Indicates whether Score is required.
            /// </summary>
            public const bool IsRequired = false;
        }
    }
}
```

## Requirements

- **.NET SDK 7.0 or later** - Required for the source generator to run
- **Target Framework** - Can target .NET Core 3.1, .NET Standard 2.0, or any
  later framework
- **Partial Classes** - Generated code uses partial classes, so it must be in
  the same assembly as your models

> **Note:** You need .NET 7 SDK installed, but your project can target earlier
> frameworks.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on
[GitHub](https://github.com/pekspro/DataAnnotationValuesExtractor).

## Credits

This project is heavily inspired by the
[NetEscapades.EnumExtractors](https://github.com/andrewlock/NetEscapades.EnumExtractors)
project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
