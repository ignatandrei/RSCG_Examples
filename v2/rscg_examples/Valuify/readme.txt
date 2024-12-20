# Valuify [![NuGet](https://img.shields.io/nuget/v/Valuify?logo=nuget)](https://www.nuget.org/packages/Valuify/) [![GitHub](https://img.shields.io/github/license/MooVC/Valuify)](LICENSE.md)

Valuify is a .NET Roslyn Source Generator designed to enable record-like behavior for classes in projects using C# versions prior to 9.0. Valuify was created primarily to simplify the engineering associated with the creation of Roslyn Source Generators, with a focus on the caching capabilities associated with the `IIncrementalGenerator`. Valuify ensures that two distinct instances of a given type are considered equal based on their property values, allowing the generator to skip redundant code generation when input states remain unchanged, enhancing performance and reducing the overall footprint of code to be engineered and maintained.

While Valuify is primarily designed with Roslyn Source Generators in mind, it also benefits legacy codebases that lack access to the record type introduced in C# 9.0. When used alongside [Fluentify](https://github.com/MooVC/Fluentify), a complimentary Roslyn Source Generator that provides extension methods for creating projections, classes gain functionality equivalent to the `with` expression in records, preserving immutability while also providing for value-based equality.

## Installation

To install Valuify, use the following command in your package manager console:

```shell
install-package Valuify
```

## Usage

Valuify automatically creates the code required to support property based equality on `partial` classes that have the `Valuify` attribute.

```csharp
using Valuify;

[Valuify]
public partial class Property
{
    public string Name { get; set; }
    public string Type { get; set; }
}
```

Valuify will generate the following code for the above example:

### Equality Operator (==)

The Equality Operator provides the code neccessary to ensure that two instances are deemed equal based on their property values when checked using the == operator. When the type of a property is a scalar, the `global::System.Collections.Generic.EqualityComparer<T>.Default` instance is used t check for equality. When the type of a property implements `System.Collections.IEnumerable`, the `global::Valuify.Internal.SequenceEqualityComparer` is used, when ensures the instance associated with the property is checked for equality based on its contents, rather than its reference.

The following demonstrates the Equality Operator (==) code generated for `Property` type:

```csharp
partial class Property
{
    public static bool operator ==(Property left, Property right)
    {
        if (ReferenceEquals(left, right))
        {
            return true;
        }

        if (ReferenceEquals(left, null) || ReferenceEquals(right, null))
        {
            return false;
        }

        return global::System.Collections.Generic.EqualityComparer<string>.Default.Equals(left.Name, right.Name)
            && global::System.Collections.Generic.EqualityComparer<string>.Default.Equals(left.Type, right.Type);
    }
}
```

The Equality Operator (==) is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.Equality.g.cs`

The Equality Operator (==) will not be generated if the type explicitly defines an alternative implementation.

### Equals Method Override

The Equals Method Override provides the code neccessary to route calls directed towards the `object.Equals(object)` method to the `IEquatable<T>.Equals(T)` method.

The following demonstrates the Equals Method Override code generated for `Property` type:

```csharp
partial class Property
{
    public sealed override bool Equals(object other)
    {
        return Equals(other as Property);
    }
}
```

The Equals Method Override is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.Equals.g.cs`

The Equals Method Override will not be generated if the type explicitly defines an alternative implementation.

### Equatable Interface Annotation

The Equatable Interface Annotation provides the code neccessary to ensure the type declares that it implements `System.IEquatable<T>`.

The following demonstrates the Equatable Interface Annotation code generated for `Property` type:

```csharp
partial class Property
    : IEquatable<Property>
{
}
```

The Equatable Interface Annotation is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.IEquatable.g.cs`

The Equatable Interface Annotation will not be generated if the type already declares that it implements the interface, either explicitly on the type declaration or via its base type.

### Equatable Implementation

The Equatable Implementation provides the code neccessary to implement the `IEquatable<T>.Equals(T)` method, which serves to route calls to the Equality Operator (==) for the type.

The following demonstrates the Equatable Implementation code generated for `Property` type:

```csharp
partial class Property
{
    public bool Equals(Property other)
    {
        return this == other;
    }
}
```

The Equatable Implementation is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.IEquatable.Equals.g.cs`

The Equatable Implementation will not be generated if the type explicitly defines an alternative implementation.

### GetHashCode Method Override

The GetHashCode Method Override provides the code neccessary to override the base `object.GetHashCode()` method to generate a unique, or near-unique hash, based on the values for each property declared by the type. When the type of a property implements `System.Collections.IEnumerable`, the hash will account for the contents, rather than the collection reference. This is achieves using a custom implementation provided by `global::Valuify.Internal.HashCode.Combine(object[])`, which is akin to the [HashCode.Combine](https://learn.microsoft.com/en-us/dotnet/api/system.hashcode.combine?view=net-8.0) implementation, introduced in C# 8.0.

The following demonstrates the GetHashCode Method Override code generated for `Property` type:

```csharp
partial class Property
{
    public sealed override int GetHashCode()
    {
        return global::Valuify.Internal.HashCode.Combine(Name, Type);
    }
}
```

The GetHashCode Method Override is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.GetHashCode.g.cs`

The GetHashCode Method Override will not be generated if the type explicitly defines an alternative implementation.

### Inequality Operator (!=)

The Inequality Operator (!=) provides the code neccessary to ensure that two instances are deemed inequal based on differences in their property values when checked using the != operator. The implementation serves to route calls to the Equality Operator (==).

The following demonstrates the Inequality Operator (!=) code generated for `Property` type:

```csharp
partial class Property
{
    public static bool operator !=(Property left, Property right)
    {
        return !(left == right);
    }
}
```

The Inequality Operator (!=) is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.Inequality.g.cs`

The Inequality Operator (!=) will not be generated if the type explicitly defines an alternative implementation.

### ToString Method Override

The ToString Method Override provides the code neccessary to override the base `object.ToString()` method to generate a unique value based on the the values for each property declared by the type. The output is similar to that produced by the record type, introduced in C# 9.0.

The following demonstrates the ToString Method Override code generated for `Property` type:

```csharp
partial class Property
{
    public sealed override string ToString()
    {
        return string.Format("Property { Name = {0}, Type = {1} }", Name, Type);
    }
}
```

The ToString Method Override is generated with a hintname that adheres to the following pattern:

`{Fully Qualified Namespace}.{Type Name}.ToString.g.cs`

The ToString Method Override will not be generated if the type explicitly defines an alternative implementation.

## Analyzers

Valuify includes several analyzers to assist engineers with its usage. These are:

Rule ID                          | Category | Severity | Notes
:--------------------------------|:---------|:---------|:-------------------------------------------------------------------------
[VALFY01](docs/rules/VALFY01.md) | Usage    | Warning  | Type is not a class
[VALFY02](docs/rules/VALFY02.md) | Usage    | Warning  | Type is not marked as partial
[VALFY03](docs/rules/VALFY02.md) | Design   | Info     | Type does not declare any properties

## Contributing

Contributions are welcome - see the [CONTRIBUTING.md](/.github/CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
