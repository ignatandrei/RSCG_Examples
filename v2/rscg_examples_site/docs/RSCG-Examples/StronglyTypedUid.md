---
sidebar_position: 1340
title: 134 - StronglyTypedUid
description: Transforming a record into a GUID
slug: /StronglyTypedUid
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# StronglyTypedUid  by Victor Sánchez


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/StronglyTypedUid?label=StronglyTypedUid)](https://www.nuget.org/packages/StronglyTypedUid/)
[![GitHub last commit](https://img.shields.io/github/last-commit/vicosanz/StronglyTypedUid?label=updated)](https://github.com/vicosanz/StronglyTypedUid)
![GitHub Repo stars](https://img.shields.io/github/stars/vicosanz/StronglyTypedUid?style=social)

## Details

### Info
:::info

Name: **StronglyTypedUid**

Implementation of Strongly Typed Ids.

Author: Victor Sánchez

NuGet: 
*https://www.nuget.org/packages/StronglyTypedUid/*   


You can find more details at https://github.com/vicosanz/StronglyTypedUid

Source: https://github.com/vicosanz/StronglyTypedUid

:::

### Original Readme
:::note

# StronglyTypedUid
C# Implementation of Strongly Typed Id made easy.

StronglyTypedUid [![NuGet Badge](https://buildstats.info/nuget/StronglyTypedUid)](https://www.nuget.org/packages/StronglyTypedUid/)

StronglyTypedUid.Generator [![NuGet Badge](https://buildstats.info/nuget/StronglyTypedUid.Generator)](https://www.nuget.org/packages/StronglyTypedUid.Generator/)

[![publish to nuget](https://github.com/vicosanz/StronglyTypedUid/actions/workflows/main.yml/badge.svg)](https://github.com/vicosanz/StronglyTypedUid/actions/workflows/main.yml)


## Buy me a coffee
If you want to reward my effort, :coffee: https://www.paypal.com/paypalme/vicosanzdev?locale.x=es_XC


All strongly typed ids are source generated, you must create a record struct in this ways:

Using attribute decorating a record struct (default Guid version)

```csharp
    [StronglyTypedUid] 
    public readonly partial record struct CustomerId { }
```

If you want change to Ulid

```csharp
    [StronglyTypedUid(asUlid:true)] 
    public readonly partial record struct CustomerId { }
```

Create additional converters to popular packages like efcore, dapper and newtonsoftjson

```csharp
    [StronglyTypedUid(asUlid:true, [EnumAdditionalConverters.EFCore, EnumAdditionalConverters.Dapper, EnumAdditionalConverters.NewtonsoftJson])]
    public readonly partial record struct CustomerId { }
```

The generator will create a partial record struct of the same name

```csharp
// Auto generated code
[TypeConverter(typeof(CustomerIdTypeConverter))]
[System.Text.Json.Serialization.JsonConverter(typeof(CustomerIdJsonConverter))]
public readonly partial record struct CustomerId(Guid Value) : IStronglyTypedGuid
{
    public static CustomerId Empty => new(Guid.Empty);

    public static CustomerId NewCustomerId() => new(Guid.NewGuid());

    public static implicit operator CustomerId(Guid value) => new(value);

    public static explicit operator Guid(CustomerId value) => value.Value;

    public bool IsEmpty => Value == Guid.Empty;

    public override string ToString() => Value.ToString();

    public static CustomerId Parse(string text) => new CustomerId(Guid.Parse(text));

    public static bool TryParse(string text, out CustomerId result)
    {
        try
        {
            if (Guid.TryParse(text, out Guid uid))
            {
                result = uid;
                return true;
            }
        }
        catch (Exception)
        {
        }
        result = default;
        return false;
    }
}
```

You can add additional logic to your strongly type id.

```csharp
    [StronglyTypedUid] 
    public readonly partial record struct CustomerId 
    { 
        public override string ToTaggedString() => $"CID-{Value}";

        public static bool TryParseTagged(string text, out CustomerId customer)
        {
		    try
		    {
                if (Guid.TryParse(text[4..], out Guid result))
                {
                    customer = result;
                    return true;
                }
            }
            catch (Exception)
		    {
		    }
            customer = default;
            return false;
        }
    }
```

The new type is decorated with a TypeConverter and a JsonConverter automatically

```csharp
[TypeConverter(typeof(CustomerIdTypeConverter))]
[System.Text.Json.Serialization.JsonConverter(typeof(CustomerIdJsonConverter))]
```

You can serialize and deserialize without problems


```csharp
public record Customer(CustomerId Id, string Name);


var newcustomer = new Customer(CustomerId.NewCustomerId(), "Jhon");

var serializeOptions = new JsonSerializerOptions
{
    WriteIndented = true
};
var json = JsonSerializer.Serialize(newcustomer, serializeOptions);

var newcustomer2 = JsonSerializer.Deserialize<Customer>(json);

```


:::

### About
:::note

Transforming a record into a GUID


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **StronglyTypedUid**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="StronglyTypedUid" Version="1.0.1" />
    <PackageReference Include="StronglyTypedUid.Common" Version="1.0.1" />
    <PackageReference Include="StronglyTypedUid.Generator" Version="1.0.1" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StronglyTypedUid\src\RecordToGuid\Program.cs" label="Program.cs" >

  This is the use of **StronglyTypedUid** in *Program.cs*

```csharp showLineNumbers 
using RecordToGuid;

PersonId personId = PersonId.Empty;
Console.WriteLine(personId);
personId = PersonId.NewPersonId();
Console.WriteLine(personId);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StronglyTypedUid\src\RecordToGuid\PersonId.cs" label="PersonId.cs" >

  This is the use of **StronglyTypedUid** in *PersonId.cs*

```csharp showLineNumbers 

using StronglyTypedUid;

namespace RecordToGuid;
[StronglyTypedUid]
public readonly partial record struct PersonId
{
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StronglyTypedUid\src\RecordToGuid\obj\GX\StronglyTypedUid.Generator\StronglyTypedUid.Generator.StronglyTypedUidGenerator\RecordToGuid.PersonId.g.cs" label="RecordToGuid.PersonId.g.cs" >


```csharp showLineNumbers 
using System;
using System.ComponentModel;
using System.Globalization;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Buffers;

using StronglyTypedUid;

#nullable enable

namespace RecordToGuid;

[TypeConverter(typeof(PersonIdTypeConverter))]
[System.Text.Json.Serialization.JsonConverter(typeof(PersonIdJsonConverter))]
public readonly partial record struct PersonId(Guid Value) : IStronglyTypedUid
{
    public static PersonId Empty => new(Guid.Empty);

    public static PersonId NewPersonId() => new(Guid.NewGuid());

    public static implicit operator PersonId(Guid value) => new(value);

    public static explicit operator Guid(PersonId value) => value.Value;

    public bool IsEmpty => Value == Guid.Empty;

    public override string ToString() => Value.ToString();

    public static PersonId Parse(string text) => new PersonId(Guid.Parse(text));

    public static bool TryParse(string text, out PersonId result)
    {
        try
        {
            if (Guid.TryParse(text, out Guid uid))
            {
                result = uid;
                return true;
            }
        }
        catch (Exception)
        {
        }
        result = default;
        return false;
    }
}

public class PersonIdTypeConverter : TypeConverter
{
    private static readonly Type StringType = typeof(string);
    private static readonly Type UidType = typeof(Guid);

    public override bool CanConvertFrom(ITypeDescriptorContext? context, Type sourceType) => 
        sourceType == StringType || sourceType == UidType || base.CanConvertFrom(context, sourceType);

    public override object? ConvertFrom(ITypeDescriptorContext? context,
        CultureInfo? culture, object value) => value switch
        {
            Guid g => new PersonId(g),
            string stringValue => PersonId.Parse(stringValue),
            _ => base.ConvertFrom(context, culture, value),
        };

    public override bool CanConvertTo(ITypeDescriptorContext? context, Type? destinationType) =>
        destinationType == StringType || destinationType == UidType || base.CanConvertTo(context, destinationType);

    public override object? ConvertTo(ITypeDescriptorContext? context, CultureInfo? culture, object? value, Type destinationType)
    {
        if (value is PersonId result)
        {
            if (destinationType == StringType)
            {
                return result.ToString();
            }
            if (destinationType == UidType)
            {
                return (Guid)result;
            }
        }
        return base.ConvertTo(context, culture, value, destinationType);
    }
}

public class PersonIdJsonConverter : JsonConverter<PersonId>
{
    public override PersonId Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        try
        {
            if (reader.TokenType != JsonTokenType.String) throw new JsonException("Expected string");
            return new PersonId(new Guid(reader.GetString()));
        }
        catch (IndexOutOfRangeException e)
        {
            throw new JsonException("PersonId invalid: length must be 36", e);
        }
        catch (OverflowException e)
        {
            throw new JsonException("PersonId invalid: invalid character", e);
        }
    }
    public override void Write(Utf8JsonWriter writer, PersonId value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}


```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project StronglyTypedUid ](/sources/StronglyTypedUid.zip)

:::


### Share StronglyTypedUid 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStronglyTypedUid&quote=StronglyTypedUid" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStronglyTypedUid&text=StronglyTypedUid:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStronglyTypedUid" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStronglyTypedUid&title=StronglyTypedUid" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStronglyTypedUid&title=StronglyTypedUid&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStronglyTypedUid" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/StronglyTypedUid

### In the same category (PrimitiveObsession) - 4 other generators


#### [DomainPrimitives](/docs/DomainPrimitives)


#### [Strongly](/docs/Strongly)


#### [UnitGenerator](/docs/UnitGenerator)


#### [Vogen](/docs/Vogen)

