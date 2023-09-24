# Protobuf Source Generator

A source generator that generates partial helper classes where member properties are attributed with ProtoMember attribute for serialization with [protobuf-net](https://github.com/protobuf-net/protobuf-net).

## Getting Started

Install nuget package:

```
dotnet add package LaDeak.ProtobufSourceGenerator
```

The source generator creates partial classes with *private* properties that are attributed with `[ProtoMember]` attributes. The properties *get* and *set* a corresponding property from the source type. This way developers are free to add and remove properties without explicitly attributing them.

> Note that adding, removing or reordering properties might cause breaking changes for the serialized data, as the tags assigned with `[ProtoMember]` attribute are given based on the source type's definition.

To generate a partial type for a custom type, mark the type with `[ProtoContract]` attribute and with `partial` modifier. For example, the following entity type can be made source generating:

```csharp
public class Entity
{
    public int Id { get; set; }
}
```

Add `[ProtoContract]` attribute and `partial` modifier on the type definition:


```csharp
[ProtoContract]
public partial class Entity
{
    public int Id { get; set; }
}
```

With this change a corresponding partial type is generated, that can be used for serialization with [protobuf-net](https://github.com/protobuf-net/protobuf-net):

```csharp
#nullable enable
namespace SampleApp;
public partial class Entity
{
    [ProtoBuf.ProtoMember(1)]
    private int ProtoId { get => Id; set => Id = value; }
}
```

The source generator generates serializable properties that are auto properties with getter and setters. 

## Non-Generating Properties

- `init` properties are excluded from source generation
- Non-auto properties are not generated
- Properties marked with `[ProtoIgnore]` and `[ProtoMemeber(x)]` attributes are not generated.
- Positional Records (not supported by protobuf-net)

In case a property needs to be serialized, but it has no corresponding generated property, it may be attributed with `[ProtoMemeber(x)]` on the original type. The source generator makes sure that tag *x* is not used on the generated partial type.

## Nested Types

Generating partial types for nested types is supported, however parent types must be marked with *partial* modifier.

## Analyzer

The source generator also comes with an analyzer helping source generation:

- issues an error if a custom type of a property is not participating in source generation
- issues an error if a source generated nested type's parent is not partial
- issues an info if a property is not part of source generation
- issues a warning when the base type is not attributed for serialization

## Advanced Usage

### Null Items in Collections

Serializing null values by protobuf-net is not allowed:

```csharp
new List<string>() { "one", null, "three" };
```

The generator will not remove null items, so in this case an exception shall be handled by the user code.

### Empty Collections

```csharp
public List<string> Value { get; set; }
```

Empty lists are not distinguished by the proto contract from a null lists. protobuf-net suggests to have an additional `bool` property indicating if the list was empty at serialization or not, and based on the value instantiate a collection at deserialization or not.

ProtoBufGenearator generates the helper property such as:

```csharp
[global::ProtoBuf.ProtoMember(1)]
private System.Collections.Generic.List<string> ProtoValue { get => Value; set => Value = value; }

[global::ProtoBuf.ProtoMember(2)]
[global::System.ComponentModel.DataAnnotations.Schema.NotMappedAttribute]
private bool ProtoIsEmptyValue
{
    get => ProtoValue?.Count == 0;
    set
    {
        if (value)
            ProtoValue = new();
    }
}
```

### Initialized to Enumerable Empty

```csharp
public IEnumerable<string> Values { get; set; } = Enumerable.Empty<string>();
```

Collections when initialized with enumerable empty cause an issue with deserialization as protobuf-net will attempt to add an item to the existing collection, which is not possible in the above case.

In this case the user may initialze with an empty list, or manually decorate the property with `[ProtoMember()]` (or `[ProtoIgnore]`) attribute that will exclude it from protobuf source generation.

### Custom Attributes on Properties

It is supported to decorate all properties in the generated partial class with custom attributes.

```csharp
[ProtoContract]
[GeneratorOptions(PropertyAttributeType = typeof(NotMappedAttribute))]
public partial class CustomAttributedEntity
{
    // ...
}
```

In the above example, with the type parameter of `GeneratorOptions` the generator is instructed to apply `NotMappedAttribute` attribute on all generated properties on a class.

For a more fine grained approach consider excluding the given property from the source generation. For such cases use `[ProtoMember()]` or `[ProtoIgnore]` attributes.

### Base Classes and Inheritance

Follow the instructions of protobuf-net library. Apply `[ProtoInclude(...)]` attribute on the type definition.

