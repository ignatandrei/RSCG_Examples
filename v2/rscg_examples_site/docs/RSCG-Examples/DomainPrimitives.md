---
sidebar_position: 970
title: 97 - DomainPrimitives
description: One of the most complete and mature libraries for DomainPrimitives in  .NET
slug: /DomainPrimitives
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# DomainPrimitives  by Alta Software - Teimuraz Nikolaishvili


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/AltaSoft.DomainPrimitives.Generator?label=AltaSoft.DomainPrimitives.Generator)](https://www.nuget.org/packages/AltaSoft.DomainPrimitives.Generator)[![Nuget](https://img.shields.io/nuget/dt/AltaSoft.DomainPrimitives.Abstractions?label=AltaSoft.DomainPrimitives.Abstractions)](https://www.nuget.org/packages/AltaSoft.DomainPrimitives.Abstractions)
[![GitHub last commit](https://img.shields.io/github/last-commit/altasoft/DomainPrimitives?label=updated)](https://github.com/altasoft/DomainPrimitives)
![GitHub Repo stars](https://img.shields.io/github/stars/altasoft/DomainPrimitives?style=social)

## Details

### Info
:::info

Name: **DomainPrimitives**

Domain Primitives source generator for C#.

Author: Alta Software - Teimuraz Nikolaishvili

NuGet: 
*https://www.nuget.org/packages/AltaSoft.DomainPrimitives.Generator*   

*https://www.nuget.org/packages/AltaSoft.DomainPrimitives.Abstractions*   


You can find more details at https://github.com/altasoft/DomainPrimitives

Source : https://github.com/altasoft/DomainPrimitives

:::

### Original Readme
:::note

# DomainPrimitives for C#  

[![Version](https://img.shields.io/static/v1?label=Version&message=1.0.3&color=0c3c60&style=for-the-badge)](https://www.nuget.org/profiles/AltaSoft)
[![Dot NET 7+](https://img.shields.io/static/v1?label=DOTNET&message=7%2B&color=0c3c60&style=for-the-badge)](https://dotnet.microsoft.com)

# Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Generator Features](#generator-features)
- [Supported Underlying types](#supported-underlying-types)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Creating your Domain type](#creating-your-domain-type)
- [Json Conversion](#json-conversion)
- [Contributions](#contributions)
- [Contact](#contact)
- [License](#license)

## Introduction

Welcome to **AltaSoft.DomainPrimitives** - a C# toolkit purposefully designed to accelerate the development of domain-specific primitives within your applications. This streamlined solution empowers developers to efficiently encapsulate fundamental domain logic. Through this toolkit, you'll significantly reduce code complexity while improving the maintainability of your project.
## Key Features
* **Simplified Primitive Creation** - Utilize source generators to swiftly create domain-specific primitives with ease and precision.
* **Versatile Underlying Type Support** - Embrace a wide array of underlying types, catering to diverse application requirements.
* **Enhanced Code Quality** - Create clean, maintainable, and thoroughly testable code through encapsulation and robust design principles.


With `AltaSoft.DomainPrimitives`, experience an accelerated development process while upholding code quality standards. This toolkit empowers developers to focus on the core business logic without compromising on precision or efficiency.
 
## Generator Features 

The **AltaSoft.DomainPrimitives.Generator** offers a diverse set of features:

* **Implicit Operators:** Streamlines type conversion to/from the underlying primitive type. [Example](#implicit-usage-of-domaintype)
* **Specialized Constructor Generation:**  Automatically validates and constructs instances of this domain type. This constructor, tailored for the domain primitive, utilizes the underlying type as a parameter, ensuring the value's correctness within the domain.
* **JsonConverters:** Handles JSON serialization and deserialization for the underlying type. [Example](#json-conversion)
* **TypeConverters:** Assists in type conversion to/from it's underlying type. [Please refer to generated type converter below](#type-converter)
* **Swagger Custom Type Mappings:** Facilitates easy integration with Swagger by treating the primitive type as it's underlying type. [Please refer to generated swagger helper below](#swagger-mappers)
* **Interface Implementations:** All DomainPritmitives Implement `IConvertible`, `IComparable`, `IComparable<T>`, `IEquatable<T>`, `IEqualityComparer<T>`, `IParsable` interfaces.
* **NumberType Operations:** Automatically generates basic arithmetic and comparison operators, by implementing Static abstract interfaces. [More details regarding numeric types](#number-types-attribute)
* **IParsable Implementation:** Automatically generates parsing for non-string types.

## Supported Underlying types 
1. `string`
2. `Guid`
3. `byte`
4. `sbyte`
5. `short`
6. `ushort`
7. `int`
8. `uint`
9. `long`
10. `ulong`
11. `decimal`
12. `double`
13. `float`
14. `bool`
15. `char`
16. `string`
17. `TimeSpan`
18. `Guid`
19. `DateTime`
20. `DateTimeOffset`
21. `DateOnly`
22. `TimeOnly`


## Getting Started

### Prerequisites
*	.NET 7 or higher
*	NuGet Package Manager

### Installation

To use **AltaSoft.DomainPrimitives**, install two NuGet packages:

1. `AltaSoft.DomainPrimitives.Abstractions`
2. `AltaSoft.DomainPrimitives.Generator`

In your project file add references as follows:

```xml
<ItemGroup>
  <PackageReference Include="AltaSoft.DomainPrimitives.Abstractions" Version="1.0.3" />
  <PackageReference Include="AltaSoft.DomainPrimitives.Generator" Version="1.0.3" OutputItemType="Analyzer" ReferenceOutputAssembly="false" PrivateAssets="all" ExcludeAssets="runtime" />
</ItemGroup>
```


## **Creating your Domain type**
For optimal performance, we recommend using `readonly struct` - especially for wrapping value types

```csharp
public readonly partial record struct PositiveInteger : IDomainValue<int>
{
	public static void Validate(int value)
	{
		if (value <= 0)
			throw new InvalidDomainValueException("Number must be positive");
	}
	public static int Default => 1;
}
```

This will automatically generate by default 4 classes
## **PositiveInteger.Generated**
 ```csharp
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using System;
using System.Numerics;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using AltaSoft.DomainPrimitives.Converters;
using System.ComponentModel;

namespace AltaSoft.DomainPrimitives;

[JsonConverter(typeof(PositiveIntegerJsonConverter))]
[TypeConverter(typeof(PositiveIntegerTypeConverter))]
[DebuggerDisplay("{_valueOrDefault}")]
public readonly partial record struct PositiveInteger :
		IAdditionOperators<PositiveInteger, PositiveInteger, PositiveInteger>,
		ISubtractionOperators<PositiveInteger, PositiveInteger, PositiveInteger>,
		IMultiplyOperators<PositiveInteger, PositiveInteger, PositiveInteger>,
		IDivisionOperators<PositiveInteger, PositiveInteger, PositiveInteger>,
		IModulusOperators<PositiveInteger, PositiveInteger, PositiveInteger>,
		IComparisonOperators<PositiveInteger, PositiveInteger, bool>,
		IComparable,
		IComparable<PositiveInteger>,
		IParsable<PositiveInteger>,
		IConvertible
{
	private int _valueOrDefault => _isInitialized ? _value : Default;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly int _value;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly bool _isInitialized;
	
	/// <summary>
	/// Initializes a new instance of the PositiveInteger class by validating the provided value using <see cref="Validate"/>.
	/// </summary>
	/// <param name="value">The value to be validated..</param>
	public PositiveInteger(int value)
	{
			Validate(value);
			_value = value;
			_isInitialized = true;
	}
	
	[Obsolete("Domain primitive cannot be created using empty Ctor", true)]
	public PositiveInteger() : this(Default)
	{
	}
	
	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int"/> to <see cref = "PositiveInteger"/></summary>
	/// </summary>
	public static implicit operator PositiveInteger(int value) => new(value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int"/> to <see cref = "PositiveInteger"/></summary>
	/// </summary>
	[return: NotNullIfNotNull(nameof(value))]
	public static implicit operator PositiveInteger?(int? value) => value is null ? null : new(value.Value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "PositiveInteger"/> to <see cref = "int"/></summary>
	/// </summary>
	public static implicit operator int(PositiveInteger value) => (int)value._valueOrDefault;

	/// <inheritdoc/>
	public static PositiveInteger operator +(PositiveInteger left, PositiveInteger right) => new(left._valueOrDefault + right._valueOrDefault);

	/// <inheritdoc/>
	public static PositiveInteger operator -(PositiveInteger left, PositiveInteger right) => new(left._valueOrDefault - right._valueOrDefault);

	/// <inheritdoc/>
	public static PositiveInteger operator *(PositiveInteger left, PositiveInteger right) => new(left._valueOrDefault * right._valueOrDefault);

	/// <inheritdoc/>
	public static PositiveInteger operator /(PositiveInteger left, PositiveInteger right) => new(left._valueOrDefault / right._valueOrDefault);

	/// <inheritdoc/>
	public static PositiveInteger operator %(PositiveInteger left, PositiveInteger right) => new(left._valueOrDefault % right._valueOrDefault);

	/// <inheritdoc/>
	public int CompareTo(object? value)
	{
		if (value is null)
			return 1;

		if (value is PositiveInteger c)
			return CompareTo(c);

		throw new ArgumentException("Object is not a PositiveInteger", nameof(value));
	}

	/// <inheritdoc/>
	public int CompareTo(PositiveInteger other) => _valueOrDefault.CompareTo(other._valueOrDefault);

	/// <inheritdoc/>
	public static bool operator <(PositiveInteger left, PositiveInteger right) => left._valueOrDefault < right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator <=(PositiveInteger left, PositiveInteger right) => left._valueOrDefault <= right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >(PositiveInteger left, PositiveInteger right) => left._valueOrDefault > right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >=(PositiveInteger left, PositiveInteger right) => left._valueOrDefault >= right._valueOrDefault;


	/// <inheritdoc/>
	public static PositiveInteger Parse(string s, IFormatProvider? provider) => int.Parse(s, provider);

	/// <inheritdoc/>
	public static bool TryParse(string? s, IFormatProvider? provider, out PositiveInteger result)
	{
		if (int.TryParse(s, provider, out var value))
		{
			result = new PositiveInteger(value);
			return true;
		}
		result = default;
		return false;
	}

	/// <inheritdoc/>
	public override string ToString() => _valueOrDefault.ToString();

	/// <inheritdoc/>
	TypeCode IConvertible.GetTypeCode() => ((IConvertible)_valueOrDefault).GetTypeCode();

	/// <inheritdoc/>
	bool IConvertible.ToBoolean(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToBoolean(provider);

	/// <inheritdoc/>
	byte IConvertible.ToByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToByte(provider);

	/// <inheritdoc/>
	char IConvertible.ToChar(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToChar(provider);

	/// <inheritdoc/>
	DateTime IConvertible.ToDateTime(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDateTime(provider);

	/// <inheritdoc/>
	decimal IConvertible.ToDecimal(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDecimal(provider);

	/// <inheritdoc/>
	double IConvertible.ToDouble(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDouble(provider);

	/// <inheritdoc/>
	short IConvertible.ToInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt16(provider);

	/// <inheritdoc/>
	int IConvertible.ToInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt32(provider);

	/// <inheritdoc/>
	long IConvertible.ToInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt64(provider);

	/// <inheritdoc/>
	sbyte IConvertible.ToSByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSByte(provider);

	/// <inheritdoc/>
	float IConvertible.ToSingle(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSingle(provider);

	/// <inheritdoc/>
	string IConvertible.ToString(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToString(provider);

	/// <inheritdoc/>
	object IConvertible.ToType(Type conversionType, IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToType(conversionType, provider);

	/// <inheritdoc/>
	ushort IConvertible.ToUInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt16(provider);

	/// <inheritdoc/>
	uint IConvertible.ToUInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt32(provider);

	/// <inheritdoc/>
	ulong IConvertible.ToUInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt64(provider);
}
 ```

##  **JsonConverter**
```csharp
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using AltaSoft.DomainPrimitives;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Text.Json.Serialization.Metadata;
using AltaSoft.DomainPrimitives.Abstractions;

namespace AltaSoft.DomainPrimitives.Converters;

/// <summary>
/// JsonConverter for <see cref = "PositiveInteger"/>
/// </summary>
public sealed class PositiveIntegerJsonConverter : JsonConverter<PositiveInteger>
{
	/// <inheritdoc/>
	public override PositiveInteger Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.Read(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void Write(Utf8JsonWriter writer, PositiveInteger value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.Write(writer, (int)value, options);
	}

	/// <inheritdoc/>
	public override PositiveInteger ReadAsPropertyName(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.ReadAsPropertyName(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void WriteAsPropertyName(Utf8JsonWriter writer, PositiveInteger value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.WriteAsPropertyName(writer, (int)value, options);
	}
}

```
## **Type Converter**
```csharp
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using AltaSoft.DomainPrimitives;
using System;
using System.ComponentModel;
using System.Globalization;
using AltaSoft.DomainPrimitives.Abstractions;

namespace AltaSoft.DomainPrimitives.Converters;

/// <summary>
/// TypeConverter for <see cref = "PositiveInteger"/>
/// </summary>
public sealed class PositiveIntegerTypeConverter : Int32Converter
{
	/// <inheritdoc/>
	public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
	{
		var result = base.ConvertFrom(context, culture, value);
		if (result is null)
			return null;
		try
		{
			return new PositiveInteger((int)result);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new FormatException("Cannot parse PositiveInteger", ex);
		}
	}
}
```
## **Swagger Mappers**

A single file for all domainPrimitives containing all type mappings is generated. 

```csharp
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using AltaSoft.DomainPrimitives;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Models;

namespace AltaSoft.DomainPrimitives.Converters.Extensions;

/// <summary>
/// Helper class providing methods to configure Swagger mappings for DomainPrimitive types of AltaSoft.DomainPrimitives
/// </summary>
public static class SwaggerTypeHelper
{
	/// <summary>
	/// Adds Swagger mappings for specific custom types to ensure proper OpenAPI documentation generation.
	/// </summary>
	/// <param name="options">The SwaggerGenOptions instance to which mappings are added..</param>
	/// <remarks>
	/// The method adds Swagger mappings for the following types:
	/// <see cref="PositiveInteger"/>
	/// </remarks>
	public static void AddSwaggerMappings(this SwaggerGenOptions options)
	{
		options.MapType<PositiveInteger>(() => new OpenApiSchema { Type = "integer", Format = "Int32" });
		options.MapType<PositiveInteger?>(() => new OpenApiSchema { Type = "integer", Format = "Int32" });
	}
}
```
## Specialized ToString method 
By Default IDomainValue uses its underlying type's ToString method however this can be overriden by implementing a method specified below

```csharp 
static virtual string ToString(T value) => value.ToString() ?? string.Empty;
```

## Managing Generated Operators for numeric types

Mathematical operators for particular numeric types can be customized using the `SupportedOperationsAttribute`. If left unspecified, all operators are generated by default (as shown below). Once this attribute is applied, manual specification of the operators becomes mandatory. Note that for `byte`, `sbyte`, `short`, and `ushort` types, mathematical operators will not be generated by default.

### Default numeric types Generated Operators 
1. `byte, sbyte` => `None`
2. `short, ushort` => `None`
3. `int, uint` => `+ - / * %`
3. `long, ulong` => `+ - / * %`
3. `double` => `+ - / * %`
3. `decimal` => `+ - / * %`

### using `SupportedOperationsAttribute`

```csharp
[SupportedOperations(Addition = false,Division = false,Modulus = false,Multiplication = true,Subtraction = true)]
public readonly partial record struct PositiveInteger : IDomainValue<int>
{
	public static void Validate(int value)
	{
		if (value <= 0)
			throw new InvalidDomainValueException("Number must be positive");
	}
	public static int Default => 1;
}
```
### For further customization of the operators, consider implementing specific interfaces. This action will override the generated operators for the respective domain type:

```csharp
public readonly partial record struct PositiveInteger :
	IDomainValue<int>,
	IAdditionOperators<PositiveInteger, PositiveInteger, PositiveInteger>
{
	public static void Validate(int value)
	{
		if (value <= 0)
			throw new InvalidDomainValueException("Number must be positive");
	}
	public static int Default => 1;
	//custom + operator
	public static PositiveInteger operator +(PositiveInteger left, PositiveInteger right)
	{
		return (left._value + right._value + 1);
	}
}
```

## Managing Serialization Format for date-related types

Certain date-related types like `DateTime`, `DateOnly`, `TimeOnly`, `DateTimeOffset`, and `TimeSpan` can modify their serialization/deserialization format using the `SerializationFormatAttribute`. 
For instance, consider the `GDay` type, which represents an XML gDay value. It implements the `IDomainValue<DateOnly>` interface and utilizes the `SerializationFormatAttribute` to specify a serialization format.
```csharp

/// <summary>
/// Represents an XML gDay value object, providing operations for parsing and handling gDay values.
/// </summary>
[SerializationFormat("dd")]
public readonly partial record struct GDay : IDomainValue<DateOnly>
{
	/// <inheritdoc/>
	public static void Validate(DateOnly value)
	{ }

	/// <inheritdoc/>
	public static DateOnly Default => default;

	/// <inheritdoc/>
	// Customized string representation of DateOnly
	public static string ToString(DateOnly value) => value.ToString("dd");
}
```

# Disable Generation of Converters 

To disable the generation of Converters or Swagger Mappers in csproj file follow the below described steps.However,please note that if Swagger is **enabled** then you'll need to add reference to the  **Swashbuckle.AspNetCore.SwaggerGen**

```xml
  <PropertyGroup>
    <DomainPrimitiveGenerator_GenerateJsonConverters>false</DomainPrimitiveGenerator_GenerateJsonConverters>
    <DomainPrimitiveGenerator_GenerateTypeConverters>false</DomainPrimitiveGenerator_GenerateTypeConverters>
    <DomainPrimitiveGenerator_GenerateSwaggerConverters>false</DomainPrimitiveGenerator_GenerateSwaggerConverters>
  </PropertyGroup>

  <ItemGroup>
    <CompilerVisibleProperty Include="DomainPrimitiveGenerator_GenerateJsonConverters" />
    <CompilerVisibleProperty Include="DomainPrimitiveGenerator_GenerateTypeConverters" />
    <CompilerVisibleProperty Include="DomainPrimitiveGenerator_GenerateSwaggerConverters" />
  </ItemGroup>
```


# Additional Features 

1. **Handling Domain Value Exception**
	* To ensure correct error handling, it's recommended to throw `InvalidDomainValueException` or (descendants of `InvalidDomainValueException`) provided in `AltaSoft.DomainPrimitives.Abstractions`. This exception, when thrown from `JsonConverter` or `TypeConverter`, will  be converted to `BadRequest`. Using any other exception in the `Validate` method will prompt a compiler warning.

2. **Chaining Primitive Types**

	* Chaining of primitive types is possible. For instance, considering the `PositiveInteger` and `BetweenOneAnd100` DomainPrimitives:

    ```csharp
    public readonly partial record struct PositiveInteger : IDomainValue<int>
		{
			public static void Validate(int value)
			{
				if (value <= 0)
					throw new InvalidDomainValueException("Number must be positive");
			}
			public static int Default => 1;
		}

    public readonly partial record struct BetweenOneAnd100 : IDomainValue<PositiveInteger>
    {
		public static void Validate(PositiveInteger value)
		{
				if (value < 100)
					throw new InvalidDomainValueException("Value must be less than 100");
		}
		public static PositiveInteger Default => 1; // using implicit operators this is possible.
    }
    ```
	Defined type `BetweenOneAnd100`  automatically inherits restrictions from PositiveInteger. Operators restricted in PositiveInteger are also inherited. Further restrictions on operators can be added using the `SupportedOperationsAttribute`:	
	```csharp
	[SupportedOperations(Addition=false)]
	public readonly partial record struct BetweenOneAnd100 : IDomainValue<PositiveInteger>
		{
			public static void Validate(PositiveInteger value)
			{
					if (value < 100)
						throw new InvalidDomainValueException("Value must be less than 100");
			}
			public static PositiveInteger Default => 1; // using implicit operators this is possible.
		}
	```


3. **Default Value Guarantee with IDomainValue of T**

	* `IDomainValue<T>` incorporates a static abstract property Default to ensure the correct domain state if a value is uninitialized. For example:
	```csharp
	public class TestObject
	{
		public PositiveInteger CustomerId { get; set; }
	}

	public class Program
	{
		var test = new TestObject();
		Console.Write(test); // If no Default was defined, CustomerId would default to 0, providing invalid value in the Domain. Providing a Default value ensures initialization according to validation rules by initializing in this example to 1 .
	}
	```
These additional features offer enhanced control over exceptions, chaining of primitive types, inheritance of restrictions and operators, and a mechanism to ensure correct default values within the domain.

# Restrictions 

1. **Implementation of IDomainValue Interface**
	* DomainPrimitives are mandated to implement the `IDomainValue<T>` interface to ensure adherence to domain-specific constraints and behaviors.

2. **Constructor Limitation**
	 * No constructors should be explicitly defined within DomainPrimitives. Doing so will result in a compiler error.

3. **Prohibition of Public Properties or Fields**
	* DomainPrimitive types should not contain any explicitly defined public properties or fields. The backing field will be automatically generated.
		* If any property or field is explicitly named `_value`, `_valueOrDefault`, or `_isInitialized`, a compiler error will be triggered.

# Examples 

## Implicit Usage of DomainType

```csharp
public readonly partial record struct PositiveAmount : IDomainValue<decimal>
{
	public static void Validate(decimal value)
	{
		if (value <= 0m)
			throw new InvalidDomainValueException("Must be a a positive number");
	}

	public static decimal Default => 1m;
}

public static class Example
{
	public static void ImplicitConversion()
	{
		var amount = new PositiveAmount(100m);
		PositiveAmount amount2 = 100m; // implicitly converted to PositiveAmount

		//implicilty casted to decimal
		decimal amountInDecimal = amount + amount2;        
	}
}

```
# Json Conversion 

```csharp 
[SupportedOperations] // no mathematical operators should be generated
public readonly partial record struct CustomerId : IDomainValue<int>
{
	public static void Validate(int value)
	{
		if (value <= 0)
			throw new InvalidDomainValueException("Value must be a positive number");
	}

	public static int Default => 1;
}

public sealed class Transaction
{
	public CustomerId FromId { get; set; }
	public CustomerId? ToId { get; set; }
	public PositiveAmount Amount { get; set; }
	public PositiveAmount? Fees { get; set; }
}

public static void JsonSerializationAndDeserialization()
{
	var amount = new Transaction()
        {
            Amount = 100.523m,
            Fees = null,
            FromId = 1,
            ToId = null
        };

    var jsonValue = JsonSerializer.Serialize(amount); //this will produce the same result as changing customerId to int and PositiveAmount to decimal
    var newValue = JsonSerializer.Deserialize<Transaction>(jsonValue)
}
```
`Serialized Json`
```json
{
    "FromId": 1,
    "ToId": null,
    "Amount": 100.523,
    "Fees": null
}
```

# Contributions 
Contributions to AltaSoft.DomainPrimitives are welcome! Whether you have suggestions or wish to contribute code, feel free to submit a pull request or open an issue.

# Contact
For support, questions, or additional information, please visit GitHub Issues.

# License
This project is licensed under [MIT](https://github.com/altasoft/DomainPrimitives/LICENSE.TXT). See the LICENSE file for details.




:::

### About
:::note

One of the most complete and mature libraries for DomainPrimitives in  .NET


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **DomainPrimitives**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net8.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="AltaSoft.DomainPrimitives.Abstractions" Version="1.0.3" />
		<PackageReference Include="AltaSoft.DomainPrimitives.Generator" Version="1.0.3" OutputItemType="Analyzer" ReferenceOutputAssembly="false" PrivateAssets="all" ExcludeAssets="runtime" />
	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>

	<PropertyGroup>
		<!--<DomainPrimitiveGenerator_GenerateJsonConverters>false</DomainPrimitiveGenerator_GenerateJsonConverters>-->
		<!--<DomainPrimitiveGenerator_GenerateTypeConverters>false</DomainPrimitiveGenerator_GenerateTypeConverters>-->
		<DomainPrimitiveGenerator_GenerateSwaggerConverters>false</DomainPrimitiveGenerator_GenerateSwaggerConverters>
	</PropertyGroup>
	<ItemGroup>
		<!--<CompilerVisibleProperty Include="DomainPrimitiveGenerator_GenerateTypeConverters" />-->
		<!--<CompilerVisibleProperty Include="DomainPrimitiveGenerator_GenerateJsonConverters" />-->
		<CompilerVisibleProperty Include="DomainPrimitiveGenerator_GenerateSwaggerConverters" />
	</ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\Program.cs" label="Program.cs" >

  This is the use of **DomainPrimitives** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using DomainPrimitives;

var year = new YearDate(1970);
var month = new MonthDate(4);
var day = new DayDate(16);
year += 1;
var p=new Person(year,month,day);

Console.WriteLine(p.DOB);
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\DOB.cs" label="DOB.cs" >

  This is the use of **DomainPrimitives** in *DOB.cs*

```csharp showLineNumbers 
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives;

public readonly partial record struct YearDate : IDomainValue<int>
{
    public static void Validate(int value)
    {
        if (value <= 0)
            throw new InvalidDomainValueException("year must be positive");
    }
    public static int Default => 1;
}
public readonly partial record struct MonthDate : IDomainValue<int>
{
    public static void Validate(int value)
    {
        if (value <= 0)
            throw new InvalidDomainValueException("year must be positive");
    }
    public static int Default => 1;
}

public readonly partial record struct DayDate : IDomainValue<int>
{
    public static void Validate(int value)
    {
        if (value <= 0)
            throw new InvalidDomainValueException("year must be positive");
    }
    public static int Default => 1;
}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\TaskAfterDelay.cs" label="TaskAfterDelay.cs" >

  This is the use of **DomainPrimitives** in *TaskAfterDelay.cs*

```csharp showLineNumbers 
namespace DomainPrimitives;
internal class Person
{
    public Person(YearDate year,MonthDate month,DayDate day)
    {
        DOB = new DateOnly(year,month,day);
    }
    public DateOnly DOB { get; private set; }

    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\DayDate.g.cs" label="DayDate.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using System;
using System.Numerics;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using DomainPrimitives.Converters;
using System.ComponentModel;

namespace DomainPrimitives;

[JsonConverter(typeof(DayDateJsonConverter))]
[TypeConverter(typeof(DayDateTypeConverter))]
[DebuggerDisplay("{_valueOrDefault}")]
public readonly partial record struct DayDate :
		IAdditionOperators<DayDate, DayDate, DayDate>,
		ISubtractionOperators<DayDate, DayDate, DayDate>,
		IMultiplyOperators<DayDate, DayDate, DayDate>,
		IDivisionOperators<DayDate, DayDate, DayDate>,
		IModulusOperators<DayDate, DayDate, DayDate>,
		IComparisonOperators<DayDate, DayDate, bool>,
		IComparable,
		IComparable<DayDate>,
		IParsable<DayDate>,
		IConvertible
{
	private int _valueOrDefault => _isInitialized ? _value : Default;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly int _value;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly bool _isInitialized;
	
	/// <summary>
	/// Initializes a new instance of the <see cref="DayDate"/> class by validating the specified <see cref="int"/> value using <see cref="Validate"/> static method.
	/// </summary>
	/// <param name="value">The value to be validated..</param>
	public DayDate(int value)
	{
			Validate(value);
			_value = value;
			_isInitialized = true;
	}
	
	[Obsolete("Domain primitive cannot be created using empty Ctor", true)]
	public DayDate() : this(Default)
	{
	}
	
	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int"/> to <see cref = "DayDate"/></summary>
	/// </summary>
	public static implicit operator DayDate(int value) => new(value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int?"/> to <see cref = "DayDate?"/></summary>
	/// </summary>
	[return: NotNullIfNotNull(nameof(value))]
	public static implicit operator DayDate?(int? value) => value is null ? null : new(value.Value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "DayDate"/> to <see cref = "int"/></summary>
	/// </summary>
	public static implicit operator int(DayDate value) => (int)value._valueOrDefault;

	/// <inheritdoc/>
	public static DayDate operator +(DayDate left, DayDate right) => new(left._valueOrDefault + right._valueOrDefault);

	/// <inheritdoc/>
	public static DayDate operator -(DayDate left, DayDate right) => new(left._valueOrDefault - right._valueOrDefault);

	/// <inheritdoc/>
	public static DayDate operator *(DayDate left, DayDate right) => new(left._valueOrDefault * right._valueOrDefault);

	/// <inheritdoc/>
	public static DayDate operator /(DayDate left, DayDate right) => new(left._valueOrDefault / right._valueOrDefault);

	/// <inheritdoc/>
	public static DayDate operator %(DayDate left, DayDate right) => new(left._valueOrDefault % right._valueOrDefault);

	/// <inheritdoc/>
	public int CompareTo(object? value)
	{
		if (value is null)
			return 1;

		if (value is DayDate c)
			return CompareTo(c);

		throw new ArgumentException("Object is not a DayDate", nameof(value));
	}

	/// <inheritdoc/>
	public int CompareTo(DayDate other) => _valueOrDefault.CompareTo(other._valueOrDefault);

	/// <inheritdoc/>
	public static bool operator <(DayDate left, DayDate right) => left._valueOrDefault < right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator <=(DayDate left, DayDate right) => left._valueOrDefault <= right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >(DayDate left, DayDate right) => left._valueOrDefault > right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >=(DayDate left, DayDate right) => left._valueOrDefault >= right._valueOrDefault;


	/// <inheritdoc/>
	public static DayDate Parse(string s, IFormatProvider? provider) => int.Parse(s, provider);

	/// <inheritdoc/>
	public static bool TryParse(string? s, IFormatProvider? provider, out DayDate result)
	{
		if (int.TryParse(s, provider, out var value))
		{
			result = new DayDate(value);
			return true;
		}
		result = default;
		return false;
	}


	/// <inheritdoc/>
	public override string ToString() => _valueOrDefault.ToString();

	/// <inheritdoc/>
	TypeCode IConvertible.GetTypeCode() => ((IConvertible)_valueOrDefault).GetTypeCode();

	/// <inheritdoc/>
	bool IConvertible.ToBoolean(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToBoolean(provider);

	/// <inheritdoc/>
	byte IConvertible.ToByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToByte(provider);

	/// <inheritdoc/>
	char IConvertible.ToChar(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToChar(provider);

	/// <inheritdoc/>
	DateTime IConvertible.ToDateTime(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDateTime(provider);

	/// <inheritdoc/>
	decimal IConvertible.ToDecimal(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDecimal(provider);

	/// <inheritdoc/>
	double IConvertible.ToDouble(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDouble(provider);

	/// <inheritdoc/>
	short IConvertible.ToInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt16(provider);

	/// <inheritdoc/>
	int IConvertible.ToInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt32(provider);

	/// <inheritdoc/>
	long IConvertible.ToInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt64(provider);

	/// <inheritdoc/>
	sbyte IConvertible.ToSByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSByte(provider);

	/// <inheritdoc/>
	float IConvertible.ToSingle(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSingle(provider);

	/// <inheritdoc/>
	string IConvertible.ToString(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToString(provider);

	/// <inheritdoc/>
	object IConvertible.ToType(Type conversionType, IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToType(conversionType, provider);

	/// <inheritdoc/>
	ushort IConvertible.ToUInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt16(provider);

	/// <inheritdoc/>
	uint IConvertible.ToUInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt32(provider);

	/// <inheritdoc/>
	ulong IConvertible.ToUInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt64(provider);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\DayDateJsonConverter.g.cs" label="DayDateJsonConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Text.Json.Serialization.Metadata;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// JsonConverter for <see cref = "DayDate"/>
/// </summary>
public sealed class DayDateJsonConverter : JsonConverter<DayDate>
{
	/// <inheritdoc/>
	public override DayDate Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.Read(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void Write(Utf8JsonWriter writer, DayDate value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.Write(writer, (int)value, options);
	}

	/// <inheritdoc/>
	public override DayDate ReadAsPropertyName(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.ReadAsPropertyName(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void WriteAsPropertyName(Utf8JsonWriter writer, DayDate value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.WriteAsPropertyName(writer, (int)value, options);
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\DayDateTypeConverter.g.cs" label="DayDateTypeConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.ComponentModel;
using System.Globalization;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// TypeConverter for <see cref = "DayDate"/>
/// </summary>
public sealed class DayDateTypeConverter : Int32Converter
{
	/// <inheritdoc/>
	public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
	{
		var result = base.ConvertFrom(context, culture, value);
		if (result is null)
			return null;
		try
		{
			return new DayDate((int)result);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new FormatException("Cannot parse DayDate", ex);
		}
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\MinutesInteger.g.cs" label="MinutesInteger.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using System;
using System.Numerics;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using DomainPrimitives.Converters;
using System.ComponentModel;

namespace DomainPrimitives;

[JsonConverter(typeof(MinutesIntegerJsonConverter))]
[TypeConverter(typeof(MinutesIntegerTypeConverter))]
[DebuggerDisplay("{_valueOrDefault}")]
public readonly partial record struct MinutesInteger :
		IAdditionOperators<MinutesInteger, MinutesInteger, MinutesInteger>,
		ISubtractionOperators<MinutesInteger, MinutesInteger, MinutesInteger>,
		IMultiplyOperators<MinutesInteger, MinutesInteger, MinutesInteger>,
		IDivisionOperators<MinutesInteger, MinutesInteger, MinutesInteger>,
		IModulusOperators<MinutesInteger, MinutesInteger, MinutesInteger>,
		IComparisonOperators<MinutesInteger, MinutesInteger, bool>,
		IComparable,
		IComparable<MinutesInteger>,
		IParsable<MinutesInteger>,
		IConvertible
{
	private int _valueOrDefault => _isInitialized ? _value : Default;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly int _value;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly bool _isInitialized;
	
	/// <summary>
	/// Initializes a new instance of the <see cref="MinutesInteger"/> class by validating the specified <see cref="int"/> value using <see cref="Validate"/> static method.
	/// </summary>
	/// <param name="value">The value to be validated..</param>
	public MinutesInteger(int value)
	{
			Validate(value);
			_value = value;
			_isInitialized = true;
	}
	
	[Obsolete("Domain primitive cannot be created using empty Ctor", true)]
	public MinutesInteger() : this(Default)
	{
	}
	
	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int"/> to <see cref = "MinutesInteger"/></summary>
	/// </summary>
	public static implicit operator MinutesInteger(int value) => new(value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int?"/> to <see cref = "MinutesInteger?"/></summary>
	/// </summary>
	[return: NotNullIfNotNull(nameof(value))]
	public static implicit operator MinutesInteger?(int? value) => value is null ? null : new(value.Value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "MinutesInteger"/> to <see cref = "int"/></summary>
	/// </summary>
	public static implicit operator int(MinutesInteger value) => (int)value._valueOrDefault;

	/// <inheritdoc/>
	public static MinutesInteger operator +(MinutesInteger left, MinutesInteger right) => new(left._valueOrDefault + right._valueOrDefault);

	/// <inheritdoc/>
	public static MinutesInteger operator -(MinutesInteger left, MinutesInteger right) => new(left._valueOrDefault - right._valueOrDefault);

	/// <inheritdoc/>
	public static MinutesInteger operator *(MinutesInteger left, MinutesInteger right) => new(left._valueOrDefault * right._valueOrDefault);

	/// <inheritdoc/>
	public static MinutesInteger operator /(MinutesInteger left, MinutesInteger right) => new(left._valueOrDefault / right._valueOrDefault);

	/// <inheritdoc/>
	public static MinutesInteger operator %(MinutesInteger left, MinutesInteger right) => new(left._valueOrDefault % right._valueOrDefault);

	/// <inheritdoc/>
	public int CompareTo(object? value)
	{
		if (value is null)
			return 1;

		if (value is MinutesInteger c)
			return CompareTo(c);

		throw new ArgumentException("Object is not a MinutesInteger", nameof(value));
	}

	/// <inheritdoc/>
	public int CompareTo(MinutesInteger other) => _valueOrDefault.CompareTo(other._valueOrDefault);

	/// <inheritdoc/>
	public static bool operator <(MinutesInteger left, MinutesInteger right) => left._valueOrDefault < right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator <=(MinutesInteger left, MinutesInteger right) => left._valueOrDefault <= right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >(MinutesInteger left, MinutesInteger right) => left._valueOrDefault > right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >=(MinutesInteger left, MinutesInteger right) => left._valueOrDefault >= right._valueOrDefault;


	/// <inheritdoc/>
	public static MinutesInteger Parse(string s, IFormatProvider? provider) => int.Parse(s, provider);

	/// <inheritdoc/>
	public static bool TryParse(string? s, IFormatProvider? provider, out MinutesInteger result)
	{
		if (int.TryParse(s, provider, out var value))
		{
			result = new MinutesInteger(value);
			return true;
		}
		result = default;
		return false;
	}


	/// <inheritdoc/>
	public override string ToString() => _valueOrDefault.ToString();

	/// <inheritdoc/>
	TypeCode IConvertible.GetTypeCode() => ((IConvertible)_valueOrDefault).GetTypeCode();

	/// <inheritdoc/>
	bool IConvertible.ToBoolean(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToBoolean(provider);

	/// <inheritdoc/>
	byte IConvertible.ToByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToByte(provider);

	/// <inheritdoc/>
	char IConvertible.ToChar(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToChar(provider);

	/// <inheritdoc/>
	DateTime IConvertible.ToDateTime(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDateTime(provider);

	/// <inheritdoc/>
	decimal IConvertible.ToDecimal(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDecimal(provider);

	/// <inheritdoc/>
	double IConvertible.ToDouble(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDouble(provider);

	/// <inheritdoc/>
	short IConvertible.ToInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt16(provider);

	/// <inheritdoc/>
	int IConvertible.ToInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt32(provider);

	/// <inheritdoc/>
	long IConvertible.ToInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt64(provider);

	/// <inheritdoc/>
	sbyte IConvertible.ToSByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSByte(provider);

	/// <inheritdoc/>
	float IConvertible.ToSingle(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSingle(provider);

	/// <inheritdoc/>
	string IConvertible.ToString(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToString(provider);

	/// <inheritdoc/>
	object IConvertible.ToType(Type conversionType, IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToType(conversionType, provider);

	/// <inheritdoc/>
	ushort IConvertible.ToUInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt16(provider);

	/// <inheritdoc/>
	uint IConvertible.ToUInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt32(provider);

	/// <inheritdoc/>
	ulong IConvertible.ToUInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt64(provider);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\MinutesIntegerJsonConverter.g.cs" label="MinutesIntegerJsonConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Text.Json.Serialization.Metadata;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// JsonConverter for <see cref = "MinutesInteger"/>
/// </summary>
public sealed class MinutesIntegerJsonConverter : JsonConverter<MinutesInteger>
{
	/// <inheritdoc/>
	public override MinutesInteger Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.Read(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void Write(Utf8JsonWriter writer, MinutesInteger value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.Write(writer, (int)value, options);
	}

	/// <inheritdoc/>
	public override MinutesInteger ReadAsPropertyName(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.ReadAsPropertyName(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void WriteAsPropertyName(Utf8JsonWriter writer, MinutesInteger value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.WriteAsPropertyName(writer, (int)value, options);
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\MinutesIntegerTypeConverter.g.cs" label="MinutesIntegerTypeConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.ComponentModel;
using System.Globalization;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// TypeConverter for <see cref = "MinutesInteger"/>
/// </summary>
public sealed class MinutesIntegerTypeConverter : Int32Converter
{
	/// <inheritdoc/>
	public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
	{
		var result = base.ConvertFrom(context, culture, value);
		if (result is null)
			return null;
		try
		{
			return new MinutesInteger((int)result);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new FormatException("Cannot parse MinutesInteger", ex);
		}
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\MonthDate.g.cs" label="MonthDate.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using System;
using System.Numerics;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using DomainPrimitives.Converters;
using System.ComponentModel;

namespace DomainPrimitives;

[JsonConverter(typeof(MonthDateJsonConverter))]
[TypeConverter(typeof(MonthDateTypeConverter))]
[DebuggerDisplay("{_valueOrDefault}")]
public readonly partial record struct MonthDate :
		IAdditionOperators<MonthDate, MonthDate, MonthDate>,
		ISubtractionOperators<MonthDate, MonthDate, MonthDate>,
		IMultiplyOperators<MonthDate, MonthDate, MonthDate>,
		IDivisionOperators<MonthDate, MonthDate, MonthDate>,
		IModulusOperators<MonthDate, MonthDate, MonthDate>,
		IComparisonOperators<MonthDate, MonthDate, bool>,
		IComparable,
		IComparable<MonthDate>,
		IParsable<MonthDate>,
		IConvertible
{
	private int _valueOrDefault => _isInitialized ? _value : Default;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly int _value;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly bool _isInitialized;
	
	/// <summary>
	/// Initializes a new instance of the <see cref="MonthDate"/> class by validating the specified <see cref="int"/> value using <see cref="Validate"/> static method.
	/// </summary>
	/// <param name="value">The value to be validated..</param>
	public MonthDate(int value)
	{
			Validate(value);
			_value = value;
			_isInitialized = true;
	}
	
	[Obsolete("Domain primitive cannot be created using empty Ctor", true)]
	public MonthDate() : this(Default)
	{
	}
	
	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int"/> to <see cref = "MonthDate"/></summary>
	/// </summary>
	public static implicit operator MonthDate(int value) => new(value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int?"/> to <see cref = "MonthDate?"/></summary>
	/// </summary>
	[return: NotNullIfNotNull(nameof(value))]
	public static implicit operator MonthDate?(int? value) => value is null ? null : new(value.Value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "MonthDate"/> to <see cref = "int"/></summary>
	/// </summary>
	public static implicit operator int(MonthDate value) => (int)value._valueOrDefault;

	/// <inheritdoc/>
	public static MonthDate operator +(MonthDate left, MonthDate right) => new(left._valueOrDefault + right._valueOrDefault);

	/// <inheritdoc/>
	public static MonthDate operator -(MonthDate left, MonthDate right) => new(left._valueOrDefault - right._valueOrDefault);

	/// <inheritdoc/>
	public static MonthDate operator *(MonthDate left, MonthDate right) => new(left._valueOrDefault * right._valueOrDefault);

	/// <inheritdoc/>
	public static MonthDate operator /(MonthDate left, MonthDate right) => new(left._valueOrDefault / right._valueOrDefault);

	/// <inheritdoc/>
	public static MonthDate operator %(MonthDate left, MonthDate right) => new(left._valueOrDefault % right._valueOrDefault);

	/// <inheritdoc/>
	public int CompareTo(object? value)
	{
		if (value is null)
			return 1;

		if (value is MonthDate c)
			return CompareTo(c);

		throw new ArgumentException("Object is not a MonthDate", nameof(value));
	}

	/// <inheritdoc/>
	public int CompareTo(MonthDate other) => _valueOrDefault.CompareTo(other._valueOrDefault);

	/// <inheritdoc/>
	public static bool operator <(MonthDate left, MonthDate right) => left._valueOrDefault < right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator <=(MonthDate left, MonthDate right) => left._valueOrDefault <= right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >(MonthDate left, MonthDate right) => left._valueOrDefault > right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >=(MonthDate left, MonthDate right) => left._valueOrDefault >= right._valueOrDefault;


	/// <inheritdoc/>
	public static MonthDate Parse(string s, IFormatProvider? provider) => int.Parse(s, provider);

	/// <inheritdoc/>
	public static bool TryParse(string? s, IFormatProvider? provider, out MonthDate result)
	{
		if (int.TryParse(s, provider, out var value))
		{
			result = new MonthDate(value);
			return true;
		}
		result = default;
		return false;
	}


	/// <inheritdoc/>
	public override string ToString() => _valueOrDefault.ToString();

	/// <inheritdoc/>
	TypeCode IConvertible.GetTypeCode() => ((IConvertible)_valueOrDefault).GetTypeCode();

	/// <inheritdoc/>
	bool IConvertible.ToBoolean(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToBoolean(provider);

	/// <inheritdoc/>
	byte IConvertible.ToByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToByte(provider);

	/// <inheritdoc/>
	char IConvertible.ToChar(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToChar(provider);

	/// <inheritdoc/>
	DateTime IConvertible.ToDateTime(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDateTime(provider);

	/// <inheritdoc/>
	decimal IConvertible.ToDecimal(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDecimal(provider);

	/// <inheritdoc/>
	double IConvertible.ToDouble(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDouble(provider);

	/// <inheritdoc/>
	short IConvertible.ToInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt16(provider);

	/// <inheritdoc/>
	int IConvertible.ToInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt32(provider);

	/// <inheritdoc/>
	long IConvertible.ToInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt64(provider);

	/// <inheritdoc/>
	sbyte IConvertible.ToSByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSByte(provider);

	/// <inheritdoc/>
	float IConvertible.ToSingle(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSingle(provider);

	/// <inheritdoc/>
	string IConvertible.ToString(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToString(provider);

	/// <inheritdoc/>
	object IConvertible.ToType(Type conversionType, IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToType(conversionType, provider);

	/// <inheritdoc/>
	ushort IConvertible.ToUInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt16(provider);

	/// <inheritdoc/>
	uint IConvertible.ToUInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt32(provider);

	/// <inheritdoc/>
	ulong IConvertible.ToUInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt64(provider);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\MonthDateJsonConverter.g.cs" label="MonthDateJsonConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Text.Json.Serialization.Metadata;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// JsonConverter for <see cref = "MonthDate"/>
/// </summary>
public sealed class MonthDateJsonConverter : JsonConverter<MonthDate>
{
	/// <inheritdoc/>
	public override MonthDate Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.Read(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void Write(Utf8JsonWriter writer, MonthDate value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.Write(writer, (int)value, options);
	}

	/// <inheritdoc/>
	public override MonthDate ReadAsPropertyName(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.ReadAsPropertyName(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void WriteAsPropertyName(Utf8JsonWriter writer, MonthDate value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.WriteAsPropertyName(writer, (int)value, options);
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\MonthDateTypeConverter.g.cs" label="MonthDateTypeConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.ComponentModel;
using System.Globalization;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// TypeConverter for <see cref = "MonthDate"/>
/// </summary>
public sealed class MonthDateTypeConverter : Int32Converter
{
	/// <inheritdoc/>
	public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
	{
		var result = base.ConvertFrom(context, culture, value);
		if (result is null)
			return null;
		try
		{
			return new MonthDate((int)result);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new FormatException("Cannot parse MonthDate", ex);
		}
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\YearDate.g.cs" label="YearDate.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using System;
using System.Numerics;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using DomainPrimitives.Converters;
using System.ComponentModel;

namespace DomainPrimitives;

[JsonConverter(typeof(YearDateJsonConverter))]
[TypeConverter(typeof(YearDateTypeConverter))]
[DebuggerDisplay("{_valueOrDefault}")]
public readonly partial record struct YearDate :
		IAdditionOperators<YearDate, YearDate, YearDate>,
		ISubtractionOperators<YearDate, YearDate, YearDate>,
		IMultiplyOperators<YearDate, YearDate, YearDate>,
		IDivisionOperators<YearDate, YearDate, YearDate>,
		IModulusOperators<YearDate, YearDate, YearDate>,
		IComparisonOperators<YearDate, YearDate, bool>,
		IComparable,
		IComparable<YearDate>,
		IParsable<YearDate>,
		IConvertible
{
	private int _valueOrDefault => _isInitialized ? _value : Default;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly int _value;
	[DebuggerBrowsable(DebuggerBrowsableState.Never)]
	private readonly bool _isInitialized;
	
	/// <summary>
	/// Initializes a new instance of the <see cref="YearDate"/> class by validating the specified <see cref="int"/> value using <see cref="Validate"/> static method.
	/// </summary>
	/// <param name="value">The value to be validated..</param>
	public YearDate(int value)
	{
			Validate(value);
			_value = value;
			_isInitialized = true;
	}
	
	[Obsolete("Domain primitive cannot be created using empty Ctor", true)]
	public YearDate() : this(Default)
	{
	}
	
	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int"/> to <see cref = "YearDate"/></summary>
	/// </summary>
	public static implicit operator YearDate(int value) => new(value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "int?"/> to <see cref = "YearDate?"/></summary>
	/// </summary>
	[return: NotNullIfNotNull(nameof(value))]
	public static implicit operator YearDate?(int? value) => value is null ? null : new(value.Value);

	/// <summary>
	/// <summary>Implicit conversion from <see cref = "YearDate"/> to <see cref = "int"/></summary>
	/// </summary>
	public static implicit operator int(YearDate value) => (int)value._valueOrDefault;

	/// <inheritdoc/>
	public static YearDate operator +(YearDate left, YearDate right) => new(left._valueOrDefault + right._valueOrDefault);

	/// <inheritdoc/>
	public static YearDate operator -(YearDate left, YearDate right) => new(left._valueOrDefault - right._valueOrDefault);

	/// <inheritdoc/>
	public static YearDate operator *(YearDate left, YearDate right) => new(left._valueOrDefault * right._valueOrDefault);

	/// <inheritdoc/>
	public static YearDate operator /(YearDate left, YearDate right) => new(left._valueOrDefault / right._valueOrDefault);

	/// <inheritdoc/>
	public static YearDate operator %(YearDate left, YearDate right) => new(left._valueOrDefault % right._valueOrDefault);

	/// <inheritdoc/>
	public int CompareTo(object? value)
	{
		if (value is null)
			return 1;

		if (value is YearDate c)
			return CompareTo(c);

		throw new ArgumentException("Object is not a YearDate", nameof(value));
	}

	/// <inheritdoc/>
	public int CompareTo(YearDate other) => _valueOrDefault.CompareTo(other._valueOrDefault);

	/// <inheritdoc/>
	public static bool operator <(YearDate left, YearDate right) => left._valueOrDefault < right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator <=(YearDate left, YearDate right) => left._valueOrDefault <= right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >(YearDate left, YearDate right) => left._valueOrDefault > right._valueOrDefault;

	/// <inheritdoc/>
	public static bool operator >=(YearDate left, YearDate right) => left._valueOrDefault >= right._valueOrDefault;


	/// <inheritdoc/>
	public static YearDate Parse(string s, IFormatProvider? provider) => int.Parse(s, provider);

	/// <inheritdoc/>
	public static bool TryParse(string? s, IFormatProvider? provider, out YearDate result)
	{
		if (int.TryParse(s, provider, out var value))
		{
			result = new YearDate(value);
			return true;
		}
		result = default;
		return false;
	}


	/// <inheritdoc/>
	public override string ToString() => _valueOrDefault.ToString();

	/// <inheritdoc/>
	TypeCode IConvertible.GetTypeCode() => ((IConvertible)_valueOrDefault).GetTypeCode();

	/// <inheritdoc/>
	bool IConvertible.ToBoolean(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToBoolean(provider);

	/// <inheritdoc/>
	byte IConvertible.ToByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToByte(provider);

	/// <inheritdoc/>
	char IConvertible.ToChar(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToChar(provider);

	/// <inheritdoc/>
	DateTime IConvertible.ToDateTime(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDateTime(provider);

	/// <inheritdoc/>
	decimal IConvertible.ToDecimal(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDecimal(provider);

	/// <inheritdoc/>
	double IConvertible.ToDouble(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToDouble(provider);

	/// <inheritdoc/>
	short IConvertible.ToInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt16(provider);

	/// <inheritdoc/>
	int IConvertible.ToInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt32(provider);

	/// <inheritdoc/>
	long IConvertible.ToInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToInt64(provider);

	/// <inheritdoc/>
	sbyte IConvertible.ToSByte(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSByte(provider);

	/// <inheritdoc/>
	float IConvertible.ToSingle(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToSingle(provider);

	/// <inheritdoc/>
	string IConvertible.ToString(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToString(provider);

	/// <inheritdoc/>
	object IConvertible.ToType(Type conversionType, IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToType(conversionType, provider);

	/// <inheritdoc/>
	ushort IConvertible.ToUInt16(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt16(provider);

	/// <inheritdoc/>
	uint IConvertible.ToUInt32(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt32(provider);

	/// <inheritdoc/>
	ulong IConvertible.ToUInt64(IFormatProvider? provider) => ((IConvertible)_valueOrDefault).ToUInt64(provider);
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\YearDateJsonConverter.g.cs" label="YearDateJsonConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Globalization;
using System.Text.Json.Serialization.Metadata;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// JsonConverter for <see cref = "YearDate"/>
/// </summary>
public sealed class YearDateJsonConverter : JsonConverter<YearDate>
{
	/// <inheritdoc/>
	public override YearDate Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.Read(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void Write(Utf8JsonWriter writer, YearDate value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.Write(writer, (int)value, options);
	}

	/// <inheritdoc/>
	public override YearDate ReadAsPropertyName(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		try
		{
			return JsonInternalConverters.Int32Converter.ReadAsPropertyName(ref reader, typeToConvert, options);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new JsonException(ex.Message);
		}
	}

	/// <inheritdoc/>
	public override void WriteAsPropertyName(Utf8JsonWriter writer, YearDate value, JsonSerializerOptions options)
	{
		JsonInternalConverters.Int32Converter.WriteAsPropertyName(writer, (int)value, options);
	}
}

```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\DomainPrimitives\src\DomainPrimitives\obj\GX\AltaSoft.DomainPrimitives.Generator\AltaSoft.DomainPrimitives.Generator.DomainPrimitiveGenerator\YearDateTypeConverter.g.cs" label="YearDateTypeConverter.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a AltaSoft.DomainPrimitives.Generator v1.0.0
//     Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

using DomainPrimitives;
using System;
using System.ComponentModel;
using System.Globalization;
using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives.Converters;

/// <summary>
/// TypeConverter for <see cref = "YearDate"/>
/// </summary>
public sealed class YearDateTypeConverter : Int32Converter
{
	/// <inheritdoc/>
	public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
	{
		var result = base.ConvertFrom(context, culture, value);
		if (result is null)
			return null;
		try
		{
			return new YearDate((int)result);
		}
		catch (InvalidDomainValueException ex)
		{
			throw new FormatException("Cannot parse YearDate", ex);
		}
	}
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project DomainPrimitives ](/sources/DomainPrimitives.zip)

:::


### Share DomainPrimitives 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDomainPrimitives&quote=DomainPrimitives" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDomainPrimitives&text=DomainPrimitives:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDomainPrimitives" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDomainPrimitives&title=DomainPrimitives" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDomainPrimitives&title=DomainPrimitives&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FDomainPrimitives" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/DomainPrimitives

## In the same category (PrimitiveObsession)


### [Strongly](/docs/Strongly)


### [UnitGenerator](/docs/UnitGenerator)


### [Vogen](/docs/Vogen)

