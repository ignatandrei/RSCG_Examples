# EntityLengths.Generator

[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://taraskovalenko.github.io/)
[![build](https://github.com/TarasKovalenko/EntityLengths.Generator/actions/workflows/dotnet.yml/badge.svg)](https://github.com/TarasKovalenko/EntityLengths.Generator/actions)
[![EntityLengths.Generator NuGet current](https://img.shields.io/nuget/v/EntityLengths.Generator?label=EntityLengths.Generator)](https://www.nuget.org/packages/EntityLengths.Generator/)

## Goals
This library is a C# source generator designed to automatically generate string length constants from Entity Framework configurations and data annotations. 
By analyzing your model configurations, it eliminates the need for manual constant maintenance and reduces the risk of hardcoded length values across your application.

## Terms of use

By using this project or its source code, for any purpose and in any shape or form, you grant your **implicit agreement** to all of the following statements:

- You unequivocally condemn Russia and its military aggression against Ukraine
- You recognize that Russia is an occupant that unlawfully invaded a sovereign state
- You agree that [Russia is a terrorist state](https://www.europarl.europa.eu/doceo/document/RC-9-2022-0482_EN.html)
- You fully support Ukraine's territorial integrity, including its claims over [temporarily occupied territories](https://en.wikipedia.org/wiki/Russian-occupied_territories_of_Ukraine)
- You reject false narratives perpetuated by Russian state propaganda

To learn more about the war and how you can help, [click here](https://war.ukraine.ua/). Glory to Ukraine! 🇺🇦

## Benefits

- **Automatic Constant Generation**: Automatically create string length constants based on your existing model configurations
- **Reduced Redundancy**: Eliminate manual maintenance of string length constants
- **Compile-Time Safety**: Generate constants at compile-time, ensuring type safety and preventing runtime errors
- **Flexible Configuration**: Supports multiple ways of defining string lengths across different .NET and Entity Framework patterns

## Features

- Extracts string length configurations from:
    - EF Core Fluent API configurations (`HasMaxLength`)
    - Data Annotations
      - `[MaxLength]`
      - `[StringLength]`
    - Column type definitions 
      - `[Column(TypeName = "varchar(200)")]`
      - `[Column(TypeName = "nvarchar(200)")]`
      - `[Column(TypeName = "char(200)")]`
    - DbContext configurations (`OnModelCreating`)

## Installation

Install the library via NuGet Package Manager:

```bash
dotnet add package EntityLengths.Generator
```

## Usage

The generator supports a few ways to define string lengths:

```csharp
// Using MaxLength attribute
public class User
{
    [MaxLength(50)]
    public string Name { get; set; }
}

// Using StringLength attribute
public class User
{
    [StringLength(50)]
    public string Surname { get; set; }
}

// Using Column attribute
public class User
{
    [Column(TypeName = "varchar(200)")]
    public string Url { get; set; }
}

// Using Fluent API
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(p => p.Name)
            .HasMaxLength(50);
    }
}

// DbContext configuration
public class User
{
    public required string Surname { get; set; }
}

public class UserDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(b => b.Surname).HasMaxLength(150).IsRequired();
    }
}
```

Generated output:

```csharp
public static partial class EntityLengths 
{
    public static partial class User
    {
        public const int NameLength = 50;
        public const int SurnameLength = 50;
        public const int UrlLength = 200;
        public const int SurnameLength = 200;
    }
}
```

## Configuration
There are ways to configure EntityLengths.Generator. Configuration values are needed during compile-time since this is a source generator:

- Assembly level attribute for configuration: `EntityLengthsGeneratorAttribute`

```csharp
[assembly: EntityLengthsGenerator(
    GenerateDocumentation = true,
    GeneratedClassName = "Constants",
    LengthSuffix = "Length",
    IncludeNamespaces = ["EntityLengths.Generator.Sample.Entities"],
    ExcludeNamespaces = ["EntityLengths.Generator.Sample.Entities.Exclude"],
    ScanNestedNamespaces = true,
    ScanEntitySuffix = "User",
    Namespace = "EntityLengths.Generator.Sample"
)]
```

- `GenerateDocumentation` - Generates XML documentation for the generated class. Default is `false`.
- `GeneratedClassName` - The name of the generated class. Default is `EntityLengths`.
- `LengthSuffix` - The suffix for the generated length constants. Default is `Length`.
- `IncludeNamespaces` - The namespaces to include in the generation process. Default is `null`.
- `ExcludeNamespaces` - The namespaces to exclude from the generation process. Default is `null`.
- `ScanNestedNamespaces` - Scans nested namespaces for entities. Default is `true`.
- `ScanEntitySuffix` - The suffix for the entity classes to scan. Default is `null`.
- `Namespace` - The namespace for the generated class. Default is `null`.

Generated output:

```csharp
// <auto-generated/>
namespace EntityLengths.Generator.Sample;

/// <summary>
/// Contains generated string length constants for entity properties
/// </summary>
public static partial class Constants 
{
    /// <summary>
    /// Length constants for ColumnTypeDefinitionUser
    /// </summary>
    public static partial class ColumnTypeDefinitionUser
    {
        /// <summary>
        /// Maximum length for Name
        /// </summary>
        public const int NameLength = 200;
        /// <summary>
        /// Maximum length for Name1
        /// </summary>
        public const int Name1Length = 300;
        /// <summary>
        /// Maximum length for Name2
        /// </summary>
        public const int Name2Length = 400;
    }
    
    /// <summary>
    /// Length constants for DataAnnotationUser
    /// </summary>
    public static partial class DataAnnotationUser
    {
        /// <summary>
        /// Maximum length for Name
        /// </summary>
        public const int NameLength = 50;
        /// <summary>
        /// Maximum length for Surname
        /// </summary>
        public const int SurnameLength = 150;
    }
    
    /// <summary>
    /// Length constants for DbContextUser
    /// </summary>
    public static partial class DbContextUser
    {
        /// <summary>
        /// Maximum length for Name
        /// </summary>
        public const int NameLength = 50;
    }
    
    /// <summary>
    /// Length constants for FluentUser
    /// </summary>
    public static partial class FluentUser
    {
        /// <summary>
        /// Maximum length for Name
        /// </summary>
        public const int NameLength = 50;
    }
}
```
