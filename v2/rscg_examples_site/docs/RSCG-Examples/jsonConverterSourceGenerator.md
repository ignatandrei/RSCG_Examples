---
sidebar_position: 820
title: 82 - jsonConverterSourceGenerator
description: Json Polymorphic generator
slug: /jsonConverterSourceGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# jsonConverterSourceGenerator  by Aviationexam


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/Aviationexam.GeneratedJsonConverters.SourceGenerator?label=Aviationexam.GeneratedJsonConverters.SourceGenerator)](https://www.nuget.org/packages/Aviationexam.GeneratedJsonConverters.SourceGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/aviationexam/json-converter-source-generator?label=updated)](https://github.com/aviationexam/json-converter-source-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/aviationexam/json-converter-source-generator?style=social)

## Details

### Info
:::info

Name: **jsonConverterSourceGenerator**

Package Description

Author: Aviationexam

NuGet: 
*https://www.nuget.org/packages/Aviationexam.GeneratedJsonConverters.SourceGenerator/*   


You can find more details at https://github.com/aviationexam/json-converter-source-generator

Source : https://github.com/aviationexam/json-converter-source-generator

:::

### Original Readme
:::note

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


:::

### About
:::note

Json Polymorphic generator


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **jsonConverterSourceGenerator**
```xml showLineNumbers {13}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
  </ItemGroup>
	<ItemGroup>
		<PackageReference Include="Aviationexam.GeneratedJsonConverters.SourceGenerator" Version="0.1.11" PrivateAssets="all" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\Program.cs" label="Program.cs" >

  This is the use of **jsonConverterSourceGenerator** in *Program.cs*

```csharp showLineNumbers 
//https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/polymorphism?pivots=dotnet-7-0
using JsonPolymorphicGeneratorDemo;
using System.Text.Json;

Person[] persons = new Person[2];
persons[0] = new Student() { Name="Student Ignat"};

persons[1] = new Teacher() { Name = "Teacher Ignat" };
//JsonSerializerOptions opt = new ()
//{
//    WriteIndented = true
//};
//var ser = JsonSerializer.Serialize(persons, opt);

var ser = JsonSerializer.Serialize(persons, ProjectJsonSerializerContext.Default.Options);

Console.WriteLine(ser);
var p = JsonSerializer.Deserialize<Person[]>(ser,ProjectJsonSerializerContext.Default.Options);
if(p != null)
foreach (var item in p)
{
    Console.WriteLine(item.Data());
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\Person.cs" label="Person.cs" >

  This is the use of **jsonConverterSourceGenerator** in *Person.cs*

```csharp showLineNumbers 
namespace JsonPolymorphicGeneratorDemo;

[Aviationexam.GeneratedJsonConverters.Attributes.JsonPolymorphic]
[Aviationexam.GeneratedJsonConverters.Attributes.JsonDerivedType(typeof(Student))]
[Aviationexam.GeneratedJsonConverters.Attributes.JsonDerivedType(typeof(Teacher))]
public abstract partial class Person
{
    
    public string? Name { get; set; }
    public abstract string Data();
}

public class Teacher : Person
{
    public override string Data()
    {
        return "Class Teacher:" + Name;
    }
}
public class Student : Person
{
    public override string Data()
    {
        return "Class Student:" + Name;
    }
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\ProjectJsonSerializerContext.cs" label="ProjectJsonSerializerContext.cs" >

  This is the use of **jsonConverterSourceGenerator** in *ProjectJsonSerializerContext.cs*

```csharp showLineNumbers 
//https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/polymorphism?pivots=dotnet-7-0
using JsonPolymorphicGeneratorDemo;
using System.Text.Json.Serialization;

[JsonSourceGenerationOptions(
    WriteIndented = true,
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    GenerationMode = JsonSourceGenerationMode.Default
)]
[JsonSerializable(typeof(Person[]))]
[JsonSerializable(typeof(Person))]
[JsonSerializable(typeof(Student))]
[JsonSerializable(typeof(Teacher))]
public partial class ProjectJsonSerializerContext : JsonSerializerContext
{
    static ProjectJsonSerializerContext()
    {
        foreach (var converter in GetPolymorphicConverters())
        {
            s_defaultOptions.Converters.Add(converter);
        }
    }
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.EnumJsonConverterIncrementalGenerator\Attributes.DisableEnumJsonConverterAttribute.g.cs" label="Attributes.DisableEnumJsonConverterAttribute.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once CheckNamespace
namespace Aviationexam.GeneratedJsonConverters.Attributes;

/// <summary>
/// When placed on an enum, indicates that generator should not report missing <see cref="EnumJsonConverterAttribute" />
/// </summary>
[System.AttributeUsage(System.AttributeTargets.Enum, AllowMultiple = false, Inherited = false)]
internal sealed class DisableEnumJsonConverterAttribute : System.Text.Json.Serialization.JsonAttribute
{
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.EnumJsonConverterIncrementalGenerator\EnumDeserializationStrategy.g.cs" label="EnumDeserializationStrategy.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once RedundantNullableDirective

#nullable enable

using Aviationexam.GeneratedJsonConverters.Attributes;
using System;

namespace Aviationexam.GeneratedJsonConverters;

[Flags]
[DisableEnumJsonConverter]
internal enum EnumDeserializationStrategy : byte
{
    ProjectDefault = 0,
    UseBackingType = 1 << 0,
    UseEnumName = 1 << 1,
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.EnumJsonConverterIncrementalGenerator\EnumJsonConverterAttribute.g.cs" label="EnumJsonConverterAttribute.g.cs" >


```csharp showLineNumbers 
#nullable enable

namespace Aviationexam.GeneratedJsonConverters.Attributes;

/// <summary>
/// When placed on an enum, indicates that the type should be serialized using generated enum convertor.
/// </summary>
[System.AttributeUsage(System.AttributeTargets.Enum, AllowMultiple = false, Inherited = false)]
internal sealed class EnumJsonConverterAttribute : System.Text.Json.Serialization.JsonAttribute
{
    /// <summary>
    /// Configure serialization strategy
    /// </summary>
    public EnumSerializationStrategy SerializationStrategy { get; set; } = EnumSerializationStrategy.ProjectDefault;

    /// <summary>
    /// Configure deserialization strategy
    /// </summary>
    public EnumDeserializationStrategy DeserializationStrategy { get; set; } = EnumDeserializationStrategy.ProjectDefault;
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.EnumJsonConverterIncrementalGenerator\EnumJsonConvertor.g.cs" label="EnumJsonConvertor.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once RedundantNullableDirective

#nullable enable

using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Aviationexam.GeneratedJsonConverters;

internal abstract class EnumJsonConvertor<T, TBackingType> : JsonConverter<T>
    where T : struct, Enum
    where TBackingType : struct
{
    protected abstract TypeCode BackingTypeTypeCode { get; }

    protected abstract EnumDeserializationStrategy DeserializationStrategy { get; }

    protected abstract EnumSerializationStrategy SerializationStrategy { get; }

    public abstract bool TryToEnum(ReadOnlySpan<byte> enumName, out T value);

    public abstract bool TryToEnum(TBackingType numericValue, out T value);

    public abstract TBackingType ToBackingType(T value);

    public abstract ReadOnlySpan<byte> ToFirstEnumName(T value);

    public override T Read(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options
    )
    {
        if (
            reader.TokenType is JsonTokenType.String
            && DeserializationStrategy.HasFlag(EnumDeserializationStrategy.UseEnumName)
        )
        {
            var enumName = reader.ValueSpan;

            if (TryToEnum(enumName, out var enumValue))
            {
                return enumValue;
            }

            var stringValue = Encoding.UTF8.GetString(enumName.ToArray());

            throw new JsonException($"Undefined mapping of '{stringValue}' to enum '{typeof(T).FullName}'");
        }

        if (reader.TokenType is JsonTokenType.Number)
        {
            var numericValue = ReadAsNumber(ref reader);

            if (numericValue.HasValue)
            {
                if (TryToEnum(numericValue.Value, out var enumValue))
                {
                    return enumValue;
                }

                throw new JsonException($"Undefined mapping of '{numericValue}' to enum '{{enumFullName}}'");
            }
        }

        var value = Encoding.UTF8.GetString(reader.ValueSpan.ToArray());

        throw new JsonException($"Unable to deserialize {value}('{reader.TokenType}') into {typeof(T).Name}");
    }

    public override T ReadAsPropertyName(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options
    )
    {
        if (
            reader.TokenType is JsonTokenType.PropertyName
            && DeserializationStrategy.HasFlag(EnumDeserializationStrategy.UseEnumName)
        )
        {
            var enumName = reader.ValueSpan;

            if (TryToEnum(enumName, out var enumValue))
            {
                return enumValue;
            }
        }

        var value = Encoding.UTF8.GetString(reader.ValueSpan.ToArray());

        if (
            reader.TokenType is JsonTokenType.PropertyName
            && DeserializationStrategy.HasFlag(EnumDeserializationStrategy.UseBackingType)
        )
        {
            var numericValue = ParseAsNumber(value);

            if (numericValue.HasValue)
            {
                if (TryToEnum(numericValue.Value, out var enumValue))
                {
                    return enumValue;
                }
            }
        }

        throw new JsonException($"Unable to deserialize {value}('{reader.TokenType}') into {typeof(T).Name}");
    }

    private TBackingType? ReadAsNumber(ref Utf8JsonReader reader) => BackingTypeTypeCode switch
    {
        TypeCode.SByte => reader.GetSByte() is var numericValue ? Unsafe.As<sbyte, TBackingType>(ref numericValue) : null,
        TypeCode.Byte => reader.GetByte() is var numericValue ? Unsafe.As<byte, TBackingType>(ref numericValue) : null,
        TypeCode.Int16 => reader.GetInt16() is var numericValue ? Unsafe.As<short, TBackingType>(ref numericValue) : null,
        TypeCode.UInt16 => reader.GetUInt16() is var numericValue ? Unsafe.As<ushort, TBackingType>(ref numericValue) : null,
        TypeCode.Int32 => reader.GetInt32() is var numericValue ? Unsafe.As<int, TBackingType>(ref numericValue) : null,
        TypeCode.UInt32 => reader.GetUInt32() is var numericValue ? Unsafe.As<uint, TBackingType>(ref numericValue) : null,
        TypeCode.Int64 => reader.GetInt64() is var numericValue ? Unsafe.As<long, TBackingType>(ref numericValue) : null,
        TypeCode.UInt64 => reader.GetUInt64() is var numericValue ? Unsafe.As<ulong, TBackingType>(ref numericValue) : null,
        _ => throw new ArgumentOutOfRangeException(nameof(BackingTypeTypeCode), BackingTypeTypeCode, $"Unexpected TypeCode {BackingTypeTypeCode}")
    };

    private TBackingType? ParseAsNumber(
        string value
    ) => BackingTypeTypeCode switch
    {
        TypeCode.SByte => sbyte.TryParse(value, out var numericValue) ? Unsafe.As<sbyte, TBackingType>(ref numericValue) : null,
        TypeCode.Byte => byte.TryParse(value, out var numericValue) ? Unsafe.As<byte, TBackingType>(ref numericValue) : null,
        TypeCode.Int16 => short.TryParse(value, out var numericValue) ? Unsafe.As<short, TBackingType>(ref numericValue) : null,
        TypeCode.UInt16 => ushort.TryParse(value, out var numericValue) ? Unsafe.As<ushort, TBackingType>(ref numericValue) : null,
        TypeCode.Int32 => int.TryParse(value, out var numericValue) ? Unsafe.As<int, TBackingType>(ref numericValue) : null,
        TypeCode.UInt32 => uint.TryParse(value, out var numericValue) ? Unsafe.As<uint, TBackingType>(ref numericValue) : null,
        TypeCode.Int64 => long.TryParse(value, out var numericValue) ? Unsafe.As<long, TBackingType>(ref numericValue) : null,
        TypeCode.UInt64 => ulong.TryParse(value, out var numericValue) ? Unsafe.As<ulong, TBackingType>(ref numericValue) : null,
        _ => throw new ArgumentOutOfRangeException(nameof(BackingTypeTypeCode), BackingTypeTypeCode, $"Unexpected TypeCode {BackingTypeTypeCode}")
    };

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        if (SerializationStrategy is EnumSerializationStrategy.BackingType)
        {
            WriteAsBackingType(writer, value, options);
        }
        else if (SerializationStrategy is EnumSerializationStrategy.FirstEnumName)
        {
            WriteAsFirstEnumName(writer, value, options);
        }
        else
        {
            throw new ArgumentOutOfRangeException(nameof(SerializationStrategy), SerializationStrategy, "Unknown serialization strategy");
        }
    }

    public override void WriteAsPropertyName(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        if (SerializationStrategy is EnumSerializationStrategy.BackingType)
        {
            WriteAsPropertyNameAsBackingType(writer, value, options);
        }
        else if (SerializationStrategy is EnumSerializationStrategy.FirstEnumName)
        {
            WriteAsPropertyNameAsFirstEnumName(writer, value, options);
        }
        else
        {
            throw new ArgumentOutOfRangeException(nameof(SerializationStrategy), SerializationStrategy, "Unknown serialization strategy");
        }
    }

    private void WriteAsBackingType(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var numericValue = ToBackingType(value);

        switch (BackingTypeTypeCode)
        {
            case TypeCode.SByte:
                writer.WriteNumberValue(Unsafe.As<TBackingType, sbyte>(ref numericValue));
                break;
            case TypeCode.Byte:
                writer.WriteNumberValue(Unsafe.As<TBackingType, byte>(ref numericValue));
                break;
            case TypeCode.Int16:
                writer.WriteNumberValue(Unsafe.As<TBackingType, short>(ref numericValue));
                break;
            case TypeCode.UInt16:
                writer.WriteNumberValue(Unsafe.As<TBackingType, ushort>(ref numericValue));
                break;
            case TypeCode.Int32:
                writer.WriteNumberValue(Unsafe.As<TBackingType, int>(ref numericValue));
                break;
            case TypeCode.UInt32:
                writer.WriteNumberValue(Unsafe.As<TBackingType, uint>(ref numericValue));
                break;
            case TypeCode.Int64:
                writer.WriteNumberValue(Unsafe.As<TBackingType, long>(ref numericValue));
                break;
            case TypeCode.UInt64:
                writer.WriteNumberValue(Unsafe.As<TBackingType, ulong>(ref numericValue));
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(BackingTypeTypeCode), BackingTypeTypeCode, $"Unexpected TypeCode {BackingTypeTypeCode}");
        }
    }

    private void WriteAsPropertyNameAsBackingType(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var numericValue = ToBackingType(value);

        writer.WritePropertyName($"{numericValue}");
    }

    private void WriteAsFirstEnumName(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var enumValue = ToFirstEnumName(value);

        writer.WriteStringValue(enumValue);
    }

    private void WriteAsPropertyNameAsFirstEnumName(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var enumValue = ToFirstEnumName(value);

        writer.WritePropertyName(enumValue);
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.EnumJsonConverterIncrementalGenerator\EnumSerializationStrategy.g.cs" label="EnumSerializationStrategy.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once RedundantNullableDirective

#nullable enable

using Aviationexam.GeneratedJsonConverters.Attributes;

namespace Aviationexam.GeneratedJsonConverters;

[DisableEnumJsonConverter]
internal enum EnumSerializationStrategy : byte
{
    ProjectDefault,
    BackingType,
    FirstEnumName,
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\DiscriminatorStruct.g.cs" label="DiscriminatorStruct.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once RedundantNullableDirective

#nullable enable

namespace Aviationexam.GeneratedJsonConverters;

internal readonly struct DiscriminatorStruct<T> : IDiscriminatorStruct
{
    public T Value { get; init; }

    public DiscriminatorStruct(T value)
    {
        Value = value;
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\IDiscriminatorStruct.g.cs" label="IDiscriminatorStruct.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once RedundantNullableDirective

#nullable enable

namespace Aviationexam.GeneratedJsonConverters;

internal interface IDiscriminatorStruct
{
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\JsonDerivedTypeAttribute.g.cs" label="JsonDerivedTypeAttribute.g.cs" >


```csharp showLineNumbers 
#nullable enable

namespace Aviationexam.GeneratedJsonConverters.Attributes;

/// <summary>
/// This is a copy of System.Text.Json.Serialization.JsonDerivedTypeAttribute.
/// It's purpose is to replace this attribute to silence System.Text.Json.Serialization.Metadata.PolymorphicTypeResolver{ThrowHelper.ThrowNotSupportedException_BaseConverterDoesNotSupportMetadata}
///
/// When placed on a type declaration, indicates that the specified subtype should be opted into polymorphic serialization.
/// </summary>
[System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Interface, AllowMultiple = true, Inherited = false)]
internal class JsonDerivedTypeAttribute : System.Text.Json.Serialization.JsonAttribute
{
    /// <summary>
    /// Initializes a new attribute with specified parameters.
    /// </summary>
    /// <param name="derivedType">A derived type that should be supported in polymorphic serialization of the declared based type.</param>
    public JsonDerivedTypeAttribute(System.Type derivedType)
    {
        DerivedType = derivedType;
    }

    /// <summary>
    /// Initializes a new attribute with specified parameters.
    /// </summary>
    /// <param name="derivedType">A derived type that should be supported in polymorphic serialization of the declared base type.</param>
    /// <param name="typeDiscriminator">The type discriminator identifier to be used for the serialization of the subtype.</param>
    public JsonDerivedTypeAttribute(System.Type derivedType, string typeDiscriminator)
    {
        DerivedType = derivedType;
        TypeDiscriminator = typeDiscriminator;
    }

    /// <summary>
    /// Initializes a new attribute with specified parameters.
    /// </summary>
    /// <param name="derivedType">A derived type that should be supported in polymorphic serialization of the declared base type.</param>
    /// <param name="typeDiscriminator">The type discriminator identifier to be used for the serialization of the subtype.</param>
    public JsonDerivedTypeAttribute(System.Type derivedType, int typeDiscriminator)
    {
        DerivedType = derivedType;
        TypeDiscriminator = typeDiscriminator;
    }

    /// <summary>
    /// A derived type that should be supported in polymorphic serialization of the declared base type.
    /// </summary>
    public System.Type DerivedType { get; }

    /// <summary>
    /// The type discriminator identifier to be used for the serialization of the subtype.
    /// </summary>
    public object? TypeDiscriminator { get; }
}

[System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Interface, AllowMultiple = true, Inherited = false)]
internal class JsonDerivedTypeAttribute<TDerivedType> : JsonDerivedTypeAttribute
{
    /// <summary>
    /// Initializes a new attribute with specified parameters.
    /// </summary>
    public JsonDerivedTypeAttribute() : base(typeof(TDerivedType))
    {
    }

    /// <summary>
    /// Initializes a new attribute with specified parameters.
    /// </summary>
    /// <param name="typeDiscriminator">The type discriminator identifier to be used for the serialization of the subtype.</param>
    public JsonDerivedTypeAttribute(string typeDiscriminator) : base(typeof(TDerivedType), typeDiscriminator)
    {
    }

    /// <summary>
    /// Initializes a new attribute with specified parameters.
    /// </summary>
    /// <param name="typeDiscriminator">The type discriminator identifier to be used for the serialization of the subtype.</param>
    public JsonDerivedTypeAttribute(int typeDiscriminator) : base(typeof(TDerivedType), typeDiscriminator)
    {
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\JsonPolymorphicAttribute.g.cs" label="JsonPolymorphicAttribute.g.cs" >


```csharp showLineNumbers 
#nullable enable

namespace Aviationexam.GeneratedJsonConverters.Attributes;

/// <summary>
/// This is a copy of System.Text.Json.Serialization.JsonPolymorphicAttribute.
/// It's purpose is to replace this attribute to silence System.Text.Json.Serialization.Metadata.PolymorphicTypeResolver{ThrowHelper.ThrowNotSupportedException_BaseConverterDoesNotSupportMetadata}
///
/// When placed on a type, indicates that the type should be serialized polymorphically.
/// </summary>
[System.AttributeUsage(System.AttributeTargets.Class | System.AttributeTargets.Interface, AllowMultiple = false, Inherited = false)]
internal sealed class JsonPolymorphicAttribute : System.Text.Json.Serialization.JsonAttribute
{
    /// <summary>
    /// Gets or sets a custom type discriminator property name for the polymorhic type.
    /// Uses the default '$type' property name if left unset.
    /// </summary>
    public string? TypeDiscriminatorPropertyName { get; set; }

    /// <summary>
    /// Gets or sets the behavior when serializing an undeclared derived runtime type.
    /// </summary>
    public System.Text.Json.Serialization.JsonUnknownDerivedTypeHandling UnknownDerivedTypeHandling { get; set; }

    /// <summary>
    /// When set to <see langword="true"/>, instructs the deserializer to ignore any
    /// unrecognized type discriminator id's and reverts to the contract of the base type.
    /// Otherwise, it will fail the deserialization.
    /// </summary>
    public bool IgnoreUnrecognizedTypeDiscriminators { get; set; }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\PersonJsonPolymorphicConverter.g.cs" label="PersonJsonPolymorphicConverter.g.cs" >


```csharp showLineNumbers 
#nullable enable

namespace PolymorphicGlobalNamespace;

internal class PersonJsonPolymorphicConverter : Aviationexam.GeneratedJsonConverters.PolymorphicJsonConvertor<global::JsonPolymorphicGeneratorDemo.Person>
{
    protected override System.ReadOnlySpan<byte> GetDiscriminatorPropertyName() => "$type"u8;

    protected override System.Type GetTypeForDiscriminator(
        Aviationexam.GeneratedJsonConverters.IDiscriminatorStruct discriminator
    ) => discriminator switch
    {
        Aviationexam.GeneratedJsonConverters.DiscriminatorStruct<string> { Value: "Student" } => typeof(JsonPolymorphicGeneratorDemo.Student),
        Aviationexam.GeneratedJsonConverters.DiscriminatorStruct<string> { Value: "Teacher" } => typeof(JsonPolymorphicGeneratorDemo.Teacher),

        _ => throw new System.ArgumentOutOfRangeException(nameof(discriminator), discriminator, null),
    };

    protected override Aviationexam.GeneratedJsonConverters.IDiscriminatorStruct GetDiscriminatorForType(
        System.Type type
    )
    {
        if (type == typeof(JsonPolymorphicGeneratorDemo.Student))
        {
            return new Aviationexam.GeneratedJsonConverters.DiscriminatorStruct<string>("Student");
        }
        if (type == typeof(JsonPolymorphicGeneratorDemo.Teacher))
        {
            return new Aviationexam.GeneratedJsonConverters.DiscriminatorStruct<string>("Teacher");
        }

        throw new System.ArgumentOutOfRangeException(nameof(type), type, null);
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\PolymorphicJsonConvertor.g.cs" label="PolymorphicJsonConvertor.g.cs" >


```csharp showLineNumbers 
// ReSharper disable once RedundantNullableDirective

#nullable enable

using System;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Aviationexam.GeneratedJsonConverters;

internal abstract class PolymorphicJsonConvertor<T> : JsonConverter<T> where T : class
{
    private readonly Type _polymorphicType = typeof(T);

    protected abstract ReadOnlySpan<byte> GetDiscriminatorPropertyName();

    protected abstract Type GetTypeForDiscriminator(IDiscriminatorStruct discriminator);

    protected abstract IDiscriminatorStruct GetDiscriminatorForType(Type type);

    public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var jsonDocument = JsonDocument.ParseValue(ref reader);

        var discriminatorPropertyName = GetDiscriminatorPropertyName();

        var discriminatorProperty = jsonDocument.RootElement
            .GetProperty(discriminatorPropertyName);

        IDiscriminatorStruct? typeDiscriminator = null;
        if (discriminatorProperty.ValueKind is JsonValueKind.String)
        {
            typeDiscriminator = new DiscriminatorStruct<string>(discriminatorProperty.GetString()!);
        }
        else if (discriminatorProperty.ValueKind is JsonValueKind.Number)
        {
            typeDiscriminator = new DiscriminatorStruct<int>(discriminatorProperty.GetInt32());
        }

        if (typeDiscriminator is null)
        {
            var discriminatorPropertyNameString = Encoding.UTF8.GetString(discriminatorPropertyName.ToArray());

            throw new JsonException($"Not found discriminator property '{discriminatorPropertyNameString}' for type {_polymorphicType}");
        }

        var type = GetTypeForDiscriminator(typeDiscriminator);

        return (T?) jsonDocument.Deserialize(type, options);
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        var instanceType = value.GetType();

        writer.WriteStartObject();

        var discriminatorPropertyName = GetDiscriminatorPropertyName();
        var discriminatorValue = GetDiscriminatorForType(instanceType);

        if (discriminatorValue is DiscriminatorStruct<string> discriminatorString)
        {
            writer.WriteString(discriminatorPropertyName, discriminatorString.Value);
        }
        else if (discriminatorValue is DiscriminatorStruct<int> discriminatorInt)
        {
            writer.WriteNumber(discriminatorPropertyName, discriminatorInt.Value);
        }

        var typeInfo = options.GetTypeInfo(instanceType);

        foreach (var p in typeInfo.Properties)
        {
            if (p.Get is null)
            {
                continue;
            }

            writer.WritePropertyName(p.Name);
            JsonSerializer.Serialize(writer, p.Get(value), p.PropertyType, options);
        }

        writer.WriteEndObject();
    }
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\Aviationexam.GeneratedJsonConverters.SourceGenerator\Aviationexam.GeneratedJsonConverters.SourceGenerator.JsonPolymorphicConverterIncrementalGenerator\ProjectJsonSerializerContext.g.cs" label="ProjectJsonSerializerContext.g.cs" >


```csharp showLineNumbers 
#nullable enable

public partial class ProjectJsonSerializerContext
{
    public static System.Collections.Generic.IReadOnlyCollection<System.Text.Json.Serialization.JsonConverter> GetPolymorphicConverters() => new System.Text.Json.Serialization.JsonConverter[]
    {
        new PolymorphicGlobalNamespace.PersonJsonPolymorphicConverter(),
    };

    public static void UsePolymorphicConverters(
        System.Collections.Generic.ICollection<System.Text.Json.Serialization.JsonConverter> optionsConverters
    )
    {
        foreach (var converter in GetPolymorphicConverters())
        {
            optionsConverters.Add(converter);
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.g.cs" label="ProjectJsonSerializerContext.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Text.Json.SourceGeneration", "7.0.9.1910")]
    public partial class ProjectJsonSerializerContext
    {
        
        private static global::System.Text.Json.JsonSerializerOptions s_defaultOptions { get; } = new global::System.Text.Json.JsonSerializerOptions()
        {
            DefaultIgnoreCondition = global::System.Text.Json.Serialization.JsonIgnoreCondition.Never,
            IgnoreReadOnlyFields = false,
            IgnoreReadOnlyProperties = false,
            IncludeFields = false,
            WriteIndented = true,
                    PropertyNamingPolicy = global::System.Text.Json.JsonNamingPolicy.CamelCase
        };
        
        private static global::ProjectJsonSerializerContext? s_defaultContext;
        
        /// <summary>
        /// The default <see cref="global::System.Text.Json.Serialization.JsonSerializerContext"/> associated with a default <see cref="global::System.Text.Json.JsonSerializerOptions"/> instance.
        /// </summary>
        public static global::ProjectJsonSerializerContext Default => s_defaultContext ??= new global::ProjectJsonSerializerContext(new global::System.Text.Json.JsonSerializerOptions(s_defaultOptions));
        
        /// <summary>
        /// The source-generated options associated with this context.
        /// </summary>
        protected override global::System.Text.Json.JsonSerializerOptions? GeneratedSerializerOptions { get; } = s_defaultOptions;
        
        /// <inheritdoc/>
        public ProjectJsonSerializerContext() : base(null)
        {
        }
        
        /// <inheritdoc/>
        public ProjectJsonSerializerContext(global::System.Text.Json.JsonSerializerOptions options) : base(options)
        {
        }
        
        private static global::System.Text.Json.Serialization.JsonConverter? GetRuntimeProvidedCustomConverter(global::System.Text.Json.JsonSerializerOptions options, global::System.Type type)
        {
            global::System.Collections.Generic.IList<global::System.Text.Json.Serialization.JsonConverter> converters = options.Converters;
        
            for (int i = 0; i < converters.Count; i++)
            {
                global::System.Text.Json.Serialization.JsonConverter? converter = converters[i];
        
                if (converter.CanConvert(type))
                {
                    if (converter is global::System.Text.Json.Serialization.JsonConverterFactory factory)
                    {
                        converter = factory.CreateConverter(type, options);
                        if (converter == null || converter is global::System.Text.Json.Serialization.JsonConverterFactory)
                        {
                            throw new global::System.InvalidOperationException(string.Format("The converter '{0}' cannot return null or a JsonConverterFactory instance.", factory.GetType()));
                        }
                    }
        
                    return converter;
                }
            }
        
            return null;
        }
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.GetJsonTypeInfo.g.cs" label="ProjectJsonSerializerContext.GetJsonTypeInfo.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext: global::System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver
    {
        /// <inheritdoc/>
        public override global::System.Text.Json.Serialization.Metadata.JsonTypeInfo GetTypeInfo(global::System.Type type)
        {
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Person[]))
            {
                return this.PersonArray;
            }
        
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Person))
            {
                return this.Person;
            }
        
            if (type == typeof(global::System.String))
            {
                return this.String;
            }
        
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Student))
            {
                return this.Student;
            }
        
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Teacher))
            {
                return this.Teacher;
            }
        
            return null!;
        }
        
        global::System.Text.Json.Serialization.Metadata.JsonTypeInfo? global::System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver.GetTypeInfo(global::System.Type type, global::System.Text.Json.JsonSerializerOptions options)
        {
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Person[]))
            {
                return Create_PersonArray(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Person))
            {
                return Create_Person(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::System.String))
            {
                return Create_String(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Student))
            {
                return Create_Student(options, makeReadOnly: false);
            }
        
            if (type == typeof(global::JsonPolymorphicGeneratorDemo.Teacher))
            {
                return Create_Teacher(options, makeReadOnly: false);
            }
        
            return null;
        }
        
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.Person.g.cs" label="ProjectJsonSerializerContext.Person.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person>? _Person;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person> Person
        {
            get => _Person ??= Create_Person(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person> Create_Person(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::JsonPolymorphicGeneratorDemo.Person))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::JsonPolymorphicGeneratorDemo.Person>(options, customConverter);
            }
            else
            {
                global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonPolymorphicGeneratorDemo.Person> objectInfo = new global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonPolymorphicGeneratorDemo.Person>()
                {
                    ObjectCreator = null,
                    ObjectWithParameterizedConstructorCreator = null,
                    PropertyMetadataInitializer = _ => PersonPropInit(options),
                    ConstructorParameterMetadataInitializer = null,
                    NumberHandling = default,
                    SerializeHandler = PersonSerializeHandler
                };
        
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateObjectInfo<global::JsonPolymorphicGeneratorDemo.Person>(options, objectInfo);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
        private static global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] PersonPropInit(global::System.Text.Json.JsonSerializerOptions options)
        {
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] properties = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[1];
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String> info0 = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String>()
            {
                IsProperty = true,
                IsPublic = true,
                IsVirtual = false,
                DeclaringType = typeof(global::JsonPolymorphicGeneratorDemo.Person),
                Converter = null,
                Getter = static (obj) => ((global::JsonPolymorphicGeneratorDemo.Person)obj).Name!,
                Setter = static (obj, value) => ((global::JsonPolymorphicGeneratorDemo.Person)obj).Name = value!,
                IgnoreCondition = null,
                HasJsonInclude = false,
                IsExtensionData = false,
                NumberHandling = default,
                PropertyName = "Name",
                JsonPropertyName = null
            };
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo propertyInfo0 = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreatePropertyInfo<global::System.String>(options, info0);
            properties[0] = propertyInfo0;
        
            return properties;
        }
        
        // Intentionally not a static method because we create a delegate to it. Invoking delegates to instance
        // methods is almost as fast as virtual calls. Static methods need to go through a shuffle thunk.
        private void PersonSerializeHandler(global::System.Text.Json.Utf8JsonWriter writer, global::JsonPolymorphicGeneratorDemo.Person? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
        
            writer.WriteStartObject();
            writer.WriteString(PropName_name, value.Name);
        
            writer.WriteEndObject();
        }
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.PersonArray.g.cs" label="ProjectJsonSerializerContext.PersonArray.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person[]>? _PersonArray;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person[]> PersonArray
        {
            get => _PersonArray ??= Create_PersonArray(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person[]> Create_PersonArray(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Person[]>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::JsonPolymorphicGeneratorDemo.Person[]))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::JsonPolymorphicGeneratorDemo.Person[]>(options, customConverter);
            }
            else
            {
                global::System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<global::JsonPolymorphicGeneratorDemo.Person[]> info = new global::System.Text.Json.Serialization.Metadata.JsonCollectionInfoValues<global::JsonPolymorphicGeneratorDemo.Person[]>()
                {
                    ObjectCreator = null,
                    NumberHandling = default,
                    SerializeHandler = PersonArraySerializeHandler
                };
        
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateArrayInfo<global::JsonPolymorphicGeneratorDemo.Person>(options, info);
        
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
        
        // Intentionally not a static method because we create a delegate to it. Invoking delegates to instance
        // methods is almost as fast as virtual calls. Static methods need to go through a shuffle thunk.
        private void PersonArraySerializeHandler(global::System.Text.Json.Utf8JsonWriter writer, global::JsonPolymorphicGeneratorDemo.Person[]? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
        
            writer.WriteStartArray();
        
            for (int i = 0; i < value.Length; i++)
            {
                PersonSerializeHandler(writer, value[i]!);
            }
        
            writer.WriteEndArray();
        }
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.PropertyNames.g.cs" label="ProjectJsonSerializerContext.PropertyNames.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext
    {
        
        private static readonly global::System.Text.Json.JsonEncodedText PropName_name = global::System.Text.Json.JsonEncodedText.Encode("name");
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.String.g.cs" label="ProjectJsonSerializerContext.String.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String>? _String;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String> String
        {
            get => _String ??= Create_String(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String> Create_String(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::System.String>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::System.String))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.String>(options, customConverter);
            }
            else
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::System.String>(options, global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.StringConverter);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.Student.g.cs" label="ProjectJsonSerializerContext.Student.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Student>? _Student;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Student> Student
        {
            get => _Student ??= Create_Student(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Student> Create_Student(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Student>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::JsonPolymorphicGeneratorDemo.Student))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::JsonPolymorphicGeneratorDemo.Student>(options, customConverter);
            }
            else
            {
                global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonPolymorphicGeneratorDemo.Student> objectInfo = new global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonPolymorphicGeneratorDemo.Student>()
                {
                    ObjectCreator = static () => new global::JsonPolymorphicGeneratorDemo.Student(),
                    ObjectWithParameterizedConstructorCreator = null,
                    PropertyMetadataInitializer = _ => StudentPropInit(options),
                    ConstructorParameterMetadataInitializer = null,
                    NumberHandling = default,
                    SerializeHandler = StudentSerializeHandler
                };
        
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateObjectInfo<global::JsonPolymorphicGeneratorDemo.Student>(options, objectInfo);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
        private static global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] StudentPropInit(global::System.Text.Json.JsonSerializerOptions options)
        {
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] properties = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[1];
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String> info0 = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String>()
            {
                IsProperty = true,
                IsPublic = true,
                IsVirtual = false,
                DeclaringType = typeof(global::JsonPolymorphicGeneratorDemo.Person),
                Converter = null,
                Getter = static (obj) => ((global::JsonPolymorphicGeneratorDemo.Person)obj).Name!,
                Setter = static (obj, value) => ((global::JsonPolymorphicGeneratorDemo.Person)obj).Name = value!,
                IgnoreCondition = null,
                HasJsonInclude = false,
                IsExtensionData = false,
                NumberHandling = default,
                PropertyName = "Name",
                JsonPropertyName = null
            };
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo propertyInfo0 = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreatePropertyInfo<global::System.String>(options, info0);
            properties[0] = propertyInfo0;
        
            return properties;
        }
        
        // Intentionally not a static method because we create a delegate to it. Invoking delegates to instance
        // methods is almost as fast as virtual calls. Static methods need to go through a shuffle thunk.
        private void StudentSerializeHandler(global::System.Text.Json.Utf8JsonWriter writer, global::JsonPolymorphicGeneratorDemo.Student? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
        
            writer.WriteStartObject();
            writer.WriteString(PropName_name, value.Name);
        
            writer.WriteEndObject();
        }
    }

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\jscsg\src\poly\obj\GX\System.Text.Json.SourceGeneration\System.Text.Json.SourceGeneration.JsonSourceGenerator\ProjectJsonSerializerContext.Teacher.g.cs" label="ProjectJsonSerializerContext.Teacher.g.cs" >


```csharp showLineNumbers 
// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618
    public partial class ProjectJsonSerializerContext
    {
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Teacher>? _Teacher;
        /// <summary>
        /// Defines the source generated JSON serialization contract metadata for a given type.
        /// </summary>
        public global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Teacher> Teacher
        {
            get => _Teacher ??= Create_Teacher(Options, makeReadOnly: true);
        }
        
        private global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Teacher> Create_Teacher(global::System.Text.Json.JsonSerializerOptions options, bool makeReadOnly)
        {
            global::System.Text.Json.Serialization.Metadata.JsonTypeInfo<global::JsonPolymorphicGeneratorDemo.Teacher>? jsonTypeInfo = null;
            global::System.Text.Json.Serialization.JsonConverter? customConverter;
            if (options.Converters.Count > 0 && (customConverter = GetRuntimeProvidedCustomConverter(options, typeof(global::JsonPolymorphicGeneratorDemo.Teacher))) != null)
            {
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateValueInfo<global::JsonPolymorphicGeneratorDemo.Teacher>(options, customConverter);
            }
            else
            {
                global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonPolymorphicGeneratorDemo.Teacher> objectInfo = new global::System.Text.Json.Serialization.Metadata.JsonObjectInfoValues<global::JsonPolymorphicGeneratorDemo.Teacher>()
                {
                    ObjectCreator = static () => new global::JsonPolymorphicGeneratorDemo.Teacher(),
                    ObjectWithParameterizedConstructorCreator = null,
                    PropertyMetadataInitializer = _ => TeacherPropInit(options),
                    ConstructorParameterMetadataInitializer = null,
                    NumberHandling = default,
                    SerializeHandler = TeacherSerializeHandler
                };
        
                jsonTypeInfo = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateObjectInfo<global::JsonPolymorphicGeneratorDemo.Teacher>(options, objectInfo);
            }
        
            if (makeReadOnly)
            {
                jsonTypeInfo.MakeReadOnly();
            }
        
            return jsonTypeInfo;
        }
        
        private static global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] TeacherPropInit(global::System.Text.Json.JsonSerializerOptions options)
        {
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[] properties = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo[1];
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String> info0 = new global::System.Text.Json.Serialization.Metadata.JsonPropertyInfoValues<global::System.String>()
            {
                IsProperty = true,
                IsPublic = true,
                IsVirtual = false,
                DeclaringType = typeof(global::JsonPolymorphicGeneratorDemo.Person),
                Converter = null,
                Getter = static (obj) => ((global::JsonPolymorphicGeneratorDemo.Person)obj).Name!,
                Setter = static (obj, value) => ((global::JsonPolymorphicGeneratorDemo.Person)obj).Name = value!,
                IgnoreCondition = null,
                HasJsonInclude = false,
                IsExtensionData = false,
                NumberHandling = default,
                PropertyName = "Name",
                JsonPropertyName = null
            };
        
            global::System.Text.Json.Serialization.Metadata.JsonPropertyInfo propertyInfo0 = global::System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreatePropertyInfo<global::System.String>(options, info0);
            properties[0] = propertyInfo0;
        
            return properties;
        }
        
        // Intentionally not a static method because we create a delegate to it. Invoking delegates to instance
        // methods is almost as fast as virtual calls. Static methods need to go through a shuffle thunk.
        private void TeacherSerializeHandler(global::System.Text.Json.Utf8JsonWriter writer, global::JsonPolymorphicGeneratorDemo.Teacher? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
        
            writer.WriteStartObject();
            writer.WriteString(PropName_name, value.Name);
        
            writer.WriteEndObject();
        }
    }

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project jsonConverterSourceGenerator ](/sources/jsonConverterSourceGenerator.zip)

:::


### Share jsonConverterSourceGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FjsonConverterSourceGenerator&quote=jsonConverterSourceGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FjsonConverterSourceGenerator&text=jsonConverterSourceGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FjsonConverterSourceGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FjsonConverterSourceGenerator&title=jsonConverterSourceGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FjsonConverterSourceGenerator&title=jsonConverterSourceGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FjsonConverterSourceGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/jsonConverterSourceGenerator

## In the same category (Serializer)


### [JsonPolymorphicGenerator](/docs/JsonPolymorphicGenerator)


### [ProtobufSourceGenerator](/docs/ProtobufSourceGenerator)


### [System.Text.Json](/docs/System.Text.Json)

