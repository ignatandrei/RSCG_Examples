[![Build Status](https://github.com/aviationexam/json-converter-source-generator/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/aviationexam/json-converter-source-generator/actions/workflows/build.yml)
[![NuGet](https://img.shields.io/nuget/v/Aviationexam.GeneratedJsonConverters.SourceGenerator.svg?style=flat-square&label=nuget)](https://www.nuget.org/packages/Aviationexam.GeneratedJsonConverters.SourceGenerator/)
[![MyGet](https://img.shields.io/myget/json-converter-source-generator/vpre/Aviationexam.GeneratedJsonConverters.SourceGenerator?label=MyGet)](https://www.myget.org/feed/json-converter-source-generator/package/nuget/Aviationexam.GeneratedJsonConverters.SourceGenerator)
[![feedz.io](https://img.shields.io/badge/endpoint.svg?url=https%3A%2F%2Ff.feedz.io%2Faviationexam%2Fjson-converter-source-generator%2Fshield%2FAviationexam.GeneratedJsonConverters.SourceGenerator%2Flatest&label=Aviationexam.GeneratedJsonConverters.SourceGenerator)](https://f.feedz.io/aviationexam/json-converter-source-generator/packages/Aviationexam.GeneratedJsonConverters.SourceGenerator/latest/download)

# Aviationexam.GeneratedJsonConverters.SourceGenerator

Motivation for this library are polymorphic contracts with discriminator property not present as first property.

i.e. this JSON
```json
{
    "baseProperty": 1,
    "$type": 2,
    "anotherLeafProperty": 2
}
```
is deserialized correctly into `AnotherLeafContract` using this library.

And string based enum serialization.

## Install
```xml
<ItemGroup>
    <PackageReference Include="Aviationexam.GeneratedJsonConverters.SourceGenerator" Version="0.1.0" PrivateAssets="all" />
</ItemGroup>
```

## How to use library

```xml
<PropertyGroup>
    <!-- DefaultJsonSerializerContext configuration is required to generate UseEnumConverters method -->
    <AVI_EJC_DefaultJsonSerializerContext_ClassAccessibility>public</AVI_EJC_DefaultJsonSerializerContext_ClassAccessibility>
    <AVI_EJC_DefaultJsonSerializerContext_Namespace>NamespaceOf.My.Json.Serializer.Context</AVI_EJC_DefaultJsonSerializerContext_Namespace>
    <AVI_EJC_DefaultJsonSerializerContext_ClassName>MyJsonSerializerContext</AVI_EJC_DefaultJsonSerializerContext_ClassName>

    <!-- Allowed options BackingType, FirstEnumName. Default value FirstEnumName -->
    <AVI_EJC_DefaultEnumSerializationStrategy>BackingType</AVI_EJC_DefaultEnumSerializationStrategy>

    <!-- Allowed options UseBackingType, UseEnumName, or UseBackingType|UseEnumName (DeserializationStrategy is Flags enum). Default value UseEnumName -->
    <AVI_EJC_DefaultEnumDeserializationStrategy>UseBackingType|UseEnumName</AVI_EJC_DefaultEnumDeserializationStrategy>
</PropertyGroup>
```

```cs
// file=contracts.cs
using Aviationexam.GeneratedJsonConverters.Attributes;

[JsonPolymorphic] // notice, that attributes are from `Aviationexam.GeneratedJsonConverters.Attributes` namespace, not `System.Text.Json.Serialization`
[JsonDerivedType(typeof(LeafContract), typeDiscriminator: nameof(LeafContract))]
[JsonDerivedType(typeof(AnotherLeafContract), typeDiscriminator: 2)]
[JsonDerivedType<GenericLeafContract>(typeDiscriminator: nameof(GenericLeafContract))]
public abstract class BaseContract
{
    public int BaseProperty { get; set; }
}
public sealed class LeafContract : BaseContract
{
    public int LeafProperty { get; set; }
}
public sealed class AnotherLeafContract : BaseContract
{
    public int AnotherLeafProperty { get; set; }
}
public sealed class GenericLeafContract : BaseContract
{
    public int Property { get; set; }
}

[EnumJsonConverter] // this use project defined configuration
public enum EMyEnum
{
    [EnumMember(Value = "C")]
    A,
    [EnumMember(Value = "D")]
    B,
}

[EnumJsonConverter(
    SerializationStrategy = EnumSerializationStrategy.FirstEnumName,
    DeserializationStrategy = EnumDeserializationStrategy.UseEnumName
)]
public enum EMyEnumWithExplicitConfiguration
{
    [EnumMember(Value = "C")]
    A,
    [EnumMember(Value = "D")]
    B,
}

[DisableEnumJsonConverter]
public enum EMyIgnoredEnum
{
    C,
    D,
}

// file=MyJsonSerializerContext.cs
using System.Text.Json.Serialization;

[JsonSerializable(typeof(BaseContract))] // this line is neccesary, generator searches for JsonSerializableAttribute with argument type decorated by JsonPolymorphicAttribute
[JsonSerializable(typeof(LeafContract))] // notice, it's necessary to specify leaf types
[JsonSerializable(typeof(AnotherLeafContract))]
[JsonSerializable(typeof(GenericLeafContract))]

[JsonSerializable(typeof(EMyEnum))] // only necessary for not referenced enums from other contracts
[JsonSerializable(typeof(EMyEnumWithExplicitConfiguration))]
public partial class MyJsonSerializerContext : JsonSerializerContext
{
    static MyJsonSerializerContext()
    {
        // register generated converters to options
        UsePolymorphicConverters(s_defaultOptions.Converters);
        UseEnumConverters(s_defaultOptions.Converters);
    }
}
```
