# Equatable.Generator

Source generator for `Equals` and `GetHashCode` with attribute based control of equality implementation

[![Build Project](https://github.com/loresoft/Equatable.Generator/actions/workflows/dotnet.yml/badge.svg)](https://github.com/loresoft/Equatable.Generator/actions/workflows/dotnet.yml)

[![Coverage Status](https://coveralls.io/repos/github/loresoft/Equatable.Generator/badge.svg?branch=main)](https://coveralls.io/github/loresoft/Equatable.Generator?branch=main)

[![Equatable.Generator](https://img.shields.io/nuget/v/Equatable.Generator.svg)](https://www.nuget.org/packages/Equatable.Generator/)

## Features

- Override `Equals` and `GetHashCode`
- Implement `IEquatable<T>`
- Support `class`, `record` and `struct` types
- Support `EqualityComparer` per property via attribute
- Attribute based control of equality implementation. 
- Attribute comparers supported: String, Sequence, Dictionary, HashSet, Reference, and Custom
- No runtime dependencies.  Library is compile time dependence only.  

### Usage

#### Add package

Add the nuget package to your projects.

`dotnet add package Equatable.Generator`

Prevent including Equatable.Generator as a dependency

```xml
<PackageReference Include="Equatable.Generator" PrivateAssets="all" />
```

### Requirements

This library requires:

- Target framework .NET Standard 2.0 or greater
- Project C# `LangVersion` 8.0 or higher

### Equatable Attributes

Place `[Equatable]` attribute on a `class`, `record` or `struct`.  The source generator will create a partial with overrides for `Equals` and `GetHashCode` for all public properties.

- `[Equatable]` Marks the class to generate overrides for `Equals` and `GetHashCode`

 The default comparer used in the implementation of `Equals` and `GetHashCode` is `EqualityComparer<T>.Default`.  Customize the comparer used with the following attributes.

- `[IgnoreEquality]` Ignore property in `Equals` and `GetHashCode` implementations
- `[StringEquality]` Use specified `StringComparer` when comparing strings
- `[SequenceEquality]` Use `Enumerable.SequenceEqual` to determine whether enumerables are equal
- `[DictionaryEquality]` Use to determine if dictionaries are equal
- `[HashSetEquality]` Use `ISet<T>.SetEquals` to determine whether enumerables are equal
- `[ReferenceEquality]` Use `Object.ReferenceEquals` to determines whether instances are the same instance
- `[EqualityComparer]` Use the specified `EqualityComparer`

### Example Usage

Example of using the attributes to customize the source generation of `Equals` and `GetHashCode`

``` c#
[Equatable]
public partial class UserImport
{
    [StringEquality(StringComparison.OrdinalIgnoreCase)]
    public string EmailAddress { get; set; } = null!;

    public string? DisplayName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTimeOffset? LockoutEnd { get; set; }

    public DateTimeOffset? LastLogin { get; set; }

    [IgnoreEquality]
    public string FullName => $"{FirstName} {LastName}";

    [HashSetEquality]
    public HashSet<string>? Roles { get; set; }

    [DictionaryEquality]
    public Dictionary<string, int>? Permissions { get; set; }

    [SequenceEquality]
    public List<DateTimeOffset>? History { get; set; }
}
```
