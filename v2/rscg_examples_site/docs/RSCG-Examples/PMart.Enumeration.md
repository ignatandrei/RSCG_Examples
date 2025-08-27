---
sidebar_position: 1900
title: 190 - PMart.Enumeration
description: Constants as enumeration. With EFCore, Swagger and other implementations.
slug: /PMart.Enumeration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveEnum.mdx';

# PMart.Enumeration  by Martinho


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/PMart.Enumeration.Generator?label=PMart.Enumeration.Generator)](https://www.nuget.org/packages/PMart.Enumeration.Generator/)[![Nuget](https://img.shields.io/nuget/dt/PMart.Enumeration?label=PMart.Enumeration)](https://www.nuget.org/packages/PMart.Enumeration/)
[![GitHub last commit](https://img.shields.io/github/last-commit/p-martinho/Enumeration?label=updated)](https://github.com/p-martinho/Enumeration)
![GitHub Repo stars](https://img.shields.io/github/stars/p-martinho/Enumeration?style=social)

## Details

### Info
:::info

Name: **PMart.Enumeration**

Source code generator to easly create Enumeration classes.

Author: Martinho

NuGet: 
*https://www.nuget.org/packages/PMart.Enumeration.Generator/*   

*https://www.nuget.org/packages/PMart.Enumeration/*   


You can find more details at https://github.com/p-martinho/Enumeration

Source: https://github.com/p-martinho/Enumeration

:::

### Original Readme
:::note

[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.svg)](https://www.nuget.org/packages/PMart.Enumeration)
[![NuGet](https://img.shields.io/nuget/dt/PMart.Enumeration.svg)](https://www.nuget.org/packages/PMart.Enumeration)
[![Build status](https://dev.azure.com/p-martinho/Enumeration/_apis/build/status/Enumeration-CI-CD)](https://dev.azure.com/p-martinho/Enumeration/_build/latest?definitionId=1)

# PMart.Enumeration

This set of libraries provides base classes to implement __Enumeration classes__, based on `string` values.
It enables the strongly typed advantages, while using `string` enumerations.

It has, also, the possibility to create new enumerations at runtime (let's call it [Dynamic Enumerations](#dynamic-enumerations)).

## What are Enumeration Classes?

[Enumeration classes](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/enumeration-classes-over-enum-types) are alternatives to [enum type in C#](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum).
They enable features of an object-oriented language without the limitations of the `enum` type.

They are useful, for instance, for business related enumerations on Domain-Driven Design (DDD).

For more information about enumeration classes, check the links on the section [References](#references).

## NuGet Packages

[__PMart.Enumeration__](#usage): The Enumeration base classes.
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.svg)](https://www.nuget.org/packages/PMart.Enumeration)

[__PMart.Enumeration.EFCore__](#efcore-support): The __Entity Framework Core__ support for `PMart.Enumeration`.
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.EFCore.svg)](https://www.nuget.org/packages/PMart.Enumeration.EFCore)

[__PMart.Enumeration.JsonNet__](#newtonsoft-jsonnet-support): The __Newtonsoft Json.NET__ support for `PMart.Enumeration`.
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.JsonNet.svg)](https://www.nuget.org/packages/PMart.Enumeration.JsonNet)

[__PMart.Enumeration.SystemTextJson__](#systemtextjson-support): The __System.Text.Json__ support for `PMart.Enumeration`.
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.SystemTextJson.svg)](https://www.nuget.org/packages/PMart.Enumeration.SystemTextJson)

[__PMart.Enumeration.SwaggerGen__](#swagger-support): Support to generate __Swagger__ documentation when using `PMart.Enumeration`.
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.SwaggerGen.svg)](https://www.nuget.org/packages/PMart.Enumeration.SwaggerGen)

[__PMart.Enumeration.Mappers__](#mapping): Mappers and mapping extensions for Enumerations (includes mapper for __Mapperly__).
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.Mappers.svg)](https://www.nuget.org/packages/PMart.Enumeration.Mappers)

[__PMart.Enumeration.Generator__](#enumeration-generator): A source generator to generate Enumeration classes from a few lines of code.
[![NuGet](https://img.shields.io/nuget/v/PMart.Enumeration.Generator.svg)](https://www.nuget.org/packages/PMart.Enumeration.Generator)

# Installation

Install one or more of the available NuGet packages in your project.

Use your IDE or the command:
```bash
dotnet add package <package name>
```

# Usage

An `Enumeration` is a class that holds a value of type `string`. Each `Enumeration` class should have declared one or more static instances to set the available enumeration members.

- Create a new enumeration class by extending `Enumeration<T>`, where `T` is the class itself.
- Add a private constructor, as in the bellow example.
- Create a `public static readonly` instance of the class for each enumeration member.

> Or you can use the [Generator](#enumeration-generator) in `PMart.Enumeration.Generator` package to generate the code for you!

Here is a [sample](https://github.com/p-martinho/Enumeration/samples/Enumeration.Sample/Enumerations/CommunicationType.cs) for communication types:

```c#
using PMart.Enumeration;

namespace Enumeration.Sample.Enumerations;

/// <summary>
/// The communication type enumeration.
/// </summary>
public class CommunicationType : Enumeration<CommunicationType>
{
    public static readonly CommunicationType Email = new("Email");

    public static readonly CommunicationType Sms = new("SMS");
    
    public static readonly CommunicationType PushNotification = new("PushNotification");

    private CommunicationType(string value) : base(value)
    {
    }
}
```

Now, you can use it as an enumeration class, type safe, with all its advantages and [features](#features):

```c#
public bool IsToSendEmail(CommunicationType communicationType)
{
    return communicationType == CommunicationType.Email;
}
```

You can check some usage examples in the [samples](https://github.com/p-martinho/Enumeration/samples/Enumeration.Sample/Samples).

## Features

The Enumeration classes enables the several features described bellow.
For instance, you can add [behavior](#enumeration-with-behavior), and/or you can use [dynamic enumerations](#dynamic-enumerations) (created in runtime), etc.

### Value

It is the `string` value that the enumeration class holds:

```c#
CommunicationType.Email.Value; // returns "Email"
```

The `ToString()` method also returns the value:

```c#
CommunicationType.Email.ToString(); // returns "Email"
```

### GetMembers

Get all the enumerations from an enumeration class:

```c#
var allCommunicationTypes = CommunicationType.GetMembers(); // returns an IEnumerable<CommunicationType> with CommunicationType.Email, CommunicationType.Sms and CommunicationType.PushNotification
var communicationTypesCount = CommunicationType.GetMembers().Count(); // returns 3
```

The list of possible enumerations is a `Lazy` object behind the scene, and it is evaluated only if needed.

### GetValues

Get all the possible values of an enumeration class:

```c#
var allCommunicationTypeValues = CommunicationType.GetValues(); // returns an IEnumerable<string> with "Email", "SMS" and "PushNotification"
var communicationTypeValuesCount = CommunicationType.GetValues().Count(); // returns 3
```

### HasValue

Find out if there is any enumeration member with a specific value (__ignoring letters case__):

```c#
var hasValue = CommunicationType.HasValue("someUnknownValue"); // false
hasValue = CommunicationType.HasValue("Email"); // true
hasValue = CommunicationType.HasValue("EMAIL"); // true
```

### GetFromValueOrDefault

Get an enumeration instance from a `string` that matches the value of the enumeration (__ignoring letters case__), or `null` when there isn't any enumeration with that value:

```c#
// Parse the string to Enumeration:
var communicationType = CommunicationType.GetFromValueOrDefault("email"); // returns CommunicationType.Email

// Verify if exists an enumeration with the value (GetFromValueOrDefault returns null if there isn't any enumeration with the value).
var isValid = communicationType is not null; // true
```

__Note__: When there's instances with equivalent values (same value ignoring case), the `GetValueOrDefault` can return any of the instances (is nondeterministic). Therefore, enumeration members with equivalent values are not recommended.

```c#
// Let's imagine we have these two members:
// public static readonly CommunicationType Email = new("Email");
// public static readonly CommunicationType EmailWithDifferentCase = new("EMAIL"); // same value, different case (this is not recommended)

var emailType = CommunicationType.GetFromValueOrDefault("Email"); // this may return CommunicationType.Email or CommunicationType.EmailWithDifferentCase (they have equivalent values)
var isSame = ReferenceEquals(emailType, CommunicationType.Email); // sometimes is true, sometimes is false, is nondeterministic
var isEqual = emailType == EmailWithDifferentCase; // always true. Even if they are different instances, they are equal. Check the Equality section bellow.
```

### Equality

Two different instances of a type derived from `Enumeration` are equal if they are from the same enumeration type
and if the value of both is equivalent, __ignoring letters case__.

```c#
// Let's imagine we have these two members:
// public static readonly CommunicationType Email = new("Email");
// public static readonly CommunicationType EmailWithDifferentCase = new("EMAIL"); // same value, different case (this is not recommended)

var isSame = ReferenceEquals(CommunicationType.Email, CommunicationType.EmailWithDifferentCase); // false (they are different instances)
var isEqual = CommunicationType.Email == CommunicationType.EmailWithDifferentCase; // true (they are different instances, but they have the same value, ignoring case)
```

It is also possible to test the equality between a `string` and an `Enumeration`. It also __ignores the letters case__. The `string` must be on the left side of the equality operator:

```c#
var isStringEqualToEnumeration = "email" == CommunicationType.Email; // true
isStringEqualToEnumeration = "EMAIL" == CommunicationType.Email; // true
var isStringNotEqualToEnumeration = "email" != CommunicationType.Email; // false
isStringNotEqualToEnumeration = "EMAIL" != CommunicationType.Email; // false
```

### Switch

Since you have objects and not constant values (like in a `enum`), the `switch` statement can't be constructed the same way as for an `enum`, but you can, for example, use pattern matching [this way](https://github.com/p-martinho/Enumeration/samples/Enumeration.Sample/Samples/SendCommunicationSampleUsingEnumeration.cs):

```c#
private ISender? GetCommunicationSenderForCommunicationType(CommunicationType communicationType)
{
    // A switch statement for pattern matching
    return communicationType switch
    {
        _ when communicationType == CommunicationType.Email => _emailSender,
        _ when communicationType == CommunicationType.PushNotification => _pushNotificationSender,
        _ when communicationType == CommunicationType.Sms => _smsSender,
        _ => null
    };
}
```

### Enumeration with Behavior

We can add custom methods to the Enumeration class (it's an object, after all).

Here is a simple example, with a method `ParseMessage` and with a property `IsPhoneNumberRequired`:

```c#
using PMart.Enumeration;

namespace Enumeration.Sample.Enumerations;

/// <summary>
/// The communication type enumeration.
/// </summary>
public class CommunicationTypeWithBehaviour : Enumeration<CommunicationTypeWithBehaviour>
{
    public static readonly CommunicationTypeWithBehaviour Email = new("Email");

    public static readonly CommunicationTypeWithBehaviour Sms = new("SMS");

    public static readonly CommunicationTypeWithBehaviour PushNotification = new("PushNotification");

    /// <summary>
    /// Parses the message.
    /// </summary>
    /// <param name="message">The message content.</param>
    /// <returns>The parsed message.</returns>
    public string ParseMessage(string message)
    {
        return $"Message parsed by the communication type {this}: {message}";
    }

    /// <summary>
    /// Gets a value indicating if this communication type requires phone number.
    /// </summary>
    /// <returns><c>true</c> if this communication type requires phone number; <c>false</c> otherwise.</returns>
    public bool IsPhoneNumberRequired => this switch
    {
        _ when this == Sms => true,
        _ when this == PushNotification => true,
        _ => false
    };

    private CommunicationTypeWithBehaviour(string value) : base(value)
    {
    }
}
```

We can also use inheritance to add specific behavior or properties for each enumeration member in an Enumeration class.
Check this [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.Sample/Enumerations/CommunicationTypeWithBehaviour.cs), where the communication type has subclasses with a specific implementation of `ParseMessage()` and `IsPhoneNumberRequired`:

```c#
using PMart.Enumeration;

namespace Enumeration.Sample.Enumerations;

/// <summary>
/// The communication type enumeration.
/// </summary>
public abstract class CommunicationTypeWithSpecificBehaviour : Enumeration<CommunicationTypeWithSpecificBehaviour>
{
    public static readonly CommunicationTypeWithSpecificBehaviour Email = new EmailType();

    public static readonly CommunicationTypeWithSpecificBehaviour Sms = new SmsType();
    
    public static readonly CommunicationTypeWithSpecificBehaviour PushNotification = new PushNotificationType();

    /// <summary>
    /// Parses the message.
    /// </summary>
    /// <remarks>Each communication type, implements its own way of parsing the message.</remarks>
    /// <param name="message">The message content.</param>
    /// <returns>The parsed message.</returns>
    public abstract string ParseMessage(string message);

    /// <summary>
    /// Gets a value indicating if this communication type requires phone number.
    /// </summary>
    /// <returns><c>true</c> if this communication type requires phone number; <c>false</c> otherwise.</returns>
    public abstract bool IsPhoneNumberRequired { get; }
    
    private CommunicationTypeWithSpecificBehaviour(string value) : base(value)
    {
    }

    private sealed class EmailType : CommunicationTypeWithSpecificBehaviour
    {
        public EmailType() : base("Email")
        {
        }
        
        /// <inheritdoc />
        public override string ParseMessage(string message)
        {
            return $"<html>{message}</html>";
        }

        /// <inheritdoc />
        public override bool IsPhoneNumberRequired => false;
    }
    
    private sealed class SmsType : CommunicationTypeWithSpecificBehaviour
    {
        public SmsType() : base("Sms")
        {
        }
        
        /// <inheritdoc />
        public override string ParseMessage(string message)
        {
            return $"Message encoded for SMS: {message}";
        }
        
        /// <inheritdoc />
        public override bool IsPhoneNumberRequired => true;
    }
    
    private sealed class PushNotificationType : CommunicationTypeWithSpecificBehaviour
    {
        public PushNotificationType() : base("PushNotification")
        {
        }
        
        /// <inheritdoc />
        public override string ParseMessage(string message)
        {
            return $"Message encoded for push notification: {message}";
        }
        
        /// <inheritdoc />
        public override bool IsPhoneNumberRequired => true;
    }
}
```

## Dynamic Enumerations

Instead of extending `Enumeration` class, you can extend the `EnumerationDynamic` class.
The `EnumerationDynamic` class extends the `Enumeration` class, therefore, it has the same features.
With this type, you will have an extra method that adds the possibility to create new `EnumerationDynamic` instances at runtime, if there isn't any enumeration member with a specific value.

To create an `EnumerationDynamic` is the same as `Enumeration`, but it requires a `public` empty constructor, in addition to the `private` constructor.

> You can use the [Generator](#enumeration-generator) in `PMart.Enumeration.Generator` package, that generates the code for you, and therefore you don't need to worry about the constructors.

Continuing with the communication types, here is an [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.Sample/Enumerations/CommunicationTypeDynamic.cs) using `EnumerationDynamic`:

```c#
using PMart.Enumeration;

namespace Enumeration.Sample.Enumerations;

/// <summary>
/// The communication type enumeration.
/// </summary>
public class CommunicationTypeDynamic : EnumerationDynamic<CommunicationTypeDynamic>
{
    public static readonly CommunicationTypeDynamic Email = new("Email");

    public static readonly CommunicationTypeDynamic Sms = new("SMS");
    
    public static readonly CommunicationTypeDynamic PushNotification = new("PushNotification");

    public CommunicationTypeDynamic()
    {
    }
    
    private CommunicationTypeDynamic(string value) : base(value)
    {
    }
}
```

Now, you can use the method `GetFromValueOrNew(string? value)`, that returns an instance of the enumeration type, or `null` if the provided value is `null`.
If there is an enumeration with the provided value (__ignoring letters case__), it will return that instance, else it will create a new instance with the provided value and return it (or `null` if the provided value is `null`).

```c#
var a = CommunicationTypeDynamic.GetFromValueOrNew("Email"); // returns CommunicationTypeDynamic.Email
var b = CommunicationTypeDynamic.GetFromValueOrNew("EMAIL"); // returns CommunicationTypeDynamic.Email
var c = CommunicationTypeDynamic.GetFromValueOrNew("someUnknownType"); // returns new instance of CommunicationTypeDynamic, with value = "someUnknownType"
var d = CommunicationTypeDynamic.GetFromValueOrNew(null); // returns null

var aValue = a?.Value; // "Email"
var bValue = b?.Value; // "Email"
var cValue = c?.Value; // "someUnknownValue"
var dValue = d?.Value; // null
```

__Note:__ Instances created with equivalent values are equal (check section [Equality](#equality)), but different instances:

 ```c#
var a = CommunicationTypeDynamic.GetFromValueOrNew("someUnknownType"); // returns a new instance of CommunicationTypeDynamic, with value = "someUnknownType"
var b = CommunicationTypeDynamic.GetFromValueOrNew("someUnknownType"); // returns another new instance of CommunicationTypeDynamic, with value = "someUnknownType"
var c = CommunicationTypeDynamic.GetFromValueOrNew("SOMEuNKNOWtTYPE"); // returns another new instance of CommunicationTypeDynamic, with value = "SOMEuNKNOWtTYPE"

var isAEqualToB = a == b; // true
var isAEqualToC = a == c; // true
var isBEqualToC = b == c; // true
var isASameInstanceThanB = ReferenceEquals(a, b); // false
var isASameInstanceThanC = ReferenceEquals(a, c); // false
var isBSameInstanceThanC = ReferenceEquals(b, c); // false
```

__Note:__ when you create a new enumeration with `EnumerationDynamic`, that enumeration will not be added to the list of existent enumeration members:

 ```c#
var newCommunicationType = CommunicationTypeDynamic.GetFromValueOrNew("someUnknownType"); // returns a new instance of CommunicationTypeDynamic, with value = "someUnknownType"

var existsTheNewTypeOnCommunicationTypes = CommunicationTypeDynamic
    .GetMembers()
    .Any(ct => ct == newCommunicationType); // false
```

### Why Dynamic Enumerations?

The `EnumerationDynamic` class can be useful when you want to accept values that are not in the declared enumerations or when you want to have the possibility to create new enumerations at runtime.

For example, an API __A__ sends data to API __B__ that then redirects the data to API __C__.
All these APIs use enumeration classes, but API __B__ don't care about the value, it just sends it to API __C__. So, using `EnumerationDynamic` on API __B__ you don't need to deploy API __B__ every time you had a new value to the enumeration on API __A__.
Other way, using `Enumeration` instead of `EnumerationDynamic`, you would need to update API __B__ in order to recognize the new enumeration member and send it to the API __C__.

You can check the example [here](https://github.com/p-martinho/Enumeration/samples/Enumeration.Sample/Samples/SendCommunicationSampleUsingEnumerationDynamic.cs).

# EFCore Support

In EF Core, adding a property of type `Enumeration` or `EnumerationDynamic` to an entity requires setting the conversion to store the value of the enumeration on the database.
The NuGet package `PMart.Enumeration.EFCore` has the required converters, you just need to add them to your model configuration. Check this [sample](https://github.com/p-martinho/Enumeration/samples/Enumeration.EFCore.Sample/DbContext/SampleDbContext.cs):

For this entity:

 ```c#
public class CommunicationRecord
{
    public Guid Id { get; set; }
    
    public DateTime SentAt { get; set; }
    
    public string To { get; set; } = null!;

    public CommunicationType? Type { get; set; }

    public CommunicationTypeDynamic? TypeDynamic { get; set; }
}
```

You need to configure it on model creating this way on your `DbContext`:

 ```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<CommunicationRecord>(e =>
    {
        e.Property(p => p.Type)
            .HasConversion<EnumerationConverter<CommunicationType>>();

        e.Property(p => p.TypeDynamic)
            .HasConversion<EnumerationDynamicConverter<CommunicationTypeDynamic>>();
    });
}
```

An usage [sample](https://github.com/p-martinho/Enumeration/samples/Enumeration.EFCore.Sample/Samples/CommunicationUsingEFCoreSample.cs):

```c#
public async Task<IEnumerable<CommunicationRecord>> GetCommunicationRecordsByType(CommunicationType communicationType)
{
    var records = await _context.CommunicationRecords
        .Where(r => r.Type == communicationType)
        .ToListAsync();

    return records;
}
```

> __Note:__ In a query, the case sensitivity is determined by the database provider.
E.g., if you save the record using an `EnumerationDynamic` with value `"Email"`, and then query the database using another instance of `EnumerationDynamic` with value `"EMAIL"`, it is possible you get no results, depending on the database.
For example, __MS SQL Server__ is, by default, case-insensitive, so you would get the result.

# Newtonsoft Json.NET Support

Using [Newtonsoft Json.NET](https://www.newtonsoft.com), if you need to serialize/deserialize objects that contain properties of type `Enumeration`, without any converters, the enumeration property would act like a regular object.

For example, using this model:

```c#
public class CommunicationRecord
{
    public DateTime SentAt { get; set; }
    
    public string To { get; set; } = null!;
    
    public CommunicationType Type { get; set; } = null!;
}
```

The JSON without any custom JSON converters would be like:

```json
{
  "sentAt": "0001-01-01",
  "to": "someone@email.com",
  "communicationType": {
    "value": "Email"
  }
}
```

Probably, you would like a JSON where the `CommunicationType` works like an `enum` or a `string` value:

```json
{
  "sentAt": "0001-01-01",
  "to": "someone@email.com",
  "communicationType": "Email"
}
```

For that, you just need to use the custom converters available on the NuGet package `PMart.Enumeration.JsonNet`.

An example where the converter is added by attribute:

```c#
public class CommunicationRecord
{
    public DateTime SentAt { get; set; }
    
    public string To { get; set; } = null!;
    
    [JsonConverter(typeof(EnumerationConverter<CommunicationType>))]
    public CommunicationType Type { get; set; } = null!;
}
```

An example where the converter is added on the serializer converters:

```c#
public string SerializeCommunicationRecord(CommunicationRecord communicationRecord)
{
    var json = JsonConvert.SerializeObject(communicationRecord, new EnumerationConverter<CommunicationType>());

    return json;
}
```

For enumerations of type `EnumerationDynamic`, you can use the generic converter `EnumerationDynamicConverter<T>`.

When you have several enumeration types that you would like to register globally, instead of registering all the converters of type `EnumerationConverter<T>` (or `EnumerationDynamicConverter<T>`), one for each enumeration type, you can use the non-generic converter `EnumerationConverter`.
This converter evaluates if the object is derived from `Enumeration` or `EnumerationDynamic` and handles it accordingly. It might be a little less performant.

```c#
public string SerializeCommunicationRecord(CommunicationRecord communicationRecord)
{
    var json = JsonConvert.SerializeObject(communicationRecord, new EnumerationConverter());

    return json;
}
```

# System.Text.Json Support

Using `System.Text.Json`, if you need to serialize/deserialize objects that contain properties of type `Enumeration`, without any converters, the enumeration property would act like a regular object.

Again, for the same model example:

```c#
public class CommunicationRecord
{
    public DateTime SentAt { get; set; }
    
    public string To { get; set; } = null!;
    
    public CommunicationType Type { get; set; } = null!;
}
```

The JSON without any custom JSON converters would be like:

```json
{
  "sentAt": "0001-01-01",
  "to": "someone@email.com",
  "communicationType": {
    "value": "Email"
  }
}
```

Probably, you would like a JSON where the `CommunicationType` works like a `enum` or a `string` value:

```json
{
  "sentAt": "0001-01-01",
  "to": "someone@email.com",
  "communicationType": "Email"
}
```

For that, you just need to use the JSON converter `EnumerationConverterFactory` available on the NuGet package `PMart.Enumeration.SystemTextJson`.

An example where the converter is added by attribute:

```c#
public class CommunicationRecord
{
    public DateTime SentAt { get; set; }
    
    public string To { get; set; } = null!;
    
    [JsonConverter(typeof(EnumerationConverterFactory))]
    public CommunicationType Type { get; set; } = null!;
}
```

An example where the converter is added on the serializer options:

```c#
public string SerializeCommunicationRecord(CommunicationRecord communicationRecord)
{
    var serializerOptions = GetSerializerOptions();

    var json = JsonSerializer.Serialize(communicationRecord, serializerOptions);

    return json;
}

private JsonSerializerOptions GetSerializerOptions()
{
    return new JsonSerializerOptions
    {
        Converters = { new EnumerationConverterFactory() }
    };
}
```

# Swagger Support

If you would like to add an enumeration property to a model from an API and would like to document it on __Swagger__ like an `enum`, you should install the NuGet package `PMart.Enumeration.SwaggerGen` and add the schema filter `EnumerationSchemaFilter` to the __Swagger__ options on your `Program.cs` (or `Startup.cs`), like in this [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.SwaggerGen.Sample/Program.cs):

```c#
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo {Version = "v1", Title = "Sample API"});
    
    options.SchemaFilter<EnumerationSchemaFilter>();
});
```

Here's an example of the result:

![Swagger sample 1](https://github.com/p-martinho/Enumeration/samples/Enumeration.SwaggerGen.Sample/Samples/Swagger-sample-1.png)

![Swagger sample 2](https://github.com/p-martinho/Enumeration/samples/Enumeration.SwaggerGen.Sample/Samples/Swagger-sample-2.png)

# Mapping

## Map using built-in features

To map from a `Enumeration` or `EnumerationDynamic` to a `string`, it is very easy, as explained in the section [Features](#Value):

```c#
var stringValue = CommunicationType.Email.Value; // "Email"
// Or:
var stringValue = CommunicationType.Email.ToString(); // "Email"
```

To map from a `string` to a `Enumeration`, is also straightforward, as explained in the section [Features](#GetFromValueOrDefault):

```c#
var enumeration = CommunicationType.GetFromValueOrDefault("Email"); // returns CommunicationType.Email
```

To benefit from the `EnumerationDynamic` features and map from a `string` to a `EnumerationDynamic`, as explained in the section [Dynamic Enumerations](#dynamic-enumerations), just use:

```c#
var enumeration = CommunicationTypeDynamic.GetFromValueOrNew("someUnknownType"); // returns a new CommunicationTypeDynamic with value "someUnknownType"
```

To map between different types of `Enumeration` or `EnumerationDynamic`, you can do it like this for `Enumeration` types:

```c#
var enumeration = OtherCommunicationType.GetFromValueOrDefault(communicationType.Value);
```

Or like this for `EnumerationDynamic` types:

```c#
var enumeration = OtherCommunicationTypeDynamic.GetFromValueOrNew(communicationType.Value);
```

## Map using Extensions or Mappers

The NuGet package `PMart.Enumeration.Mappers` includes a set of [extensions](https://github.com/p-martinho/Enumeration/src/Enumeration.Mappers/Extensions/EnumerationExtensions.cs) and [mappers](https://github.com/p-martinho/Enumeration/src/Enumeration.Mappers) to help the mapping to/from `string` and between different types of `Enumeration` or `EnumerationDynamic`.
And they are prepared for `null` values.

Here is an [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.Mappers.Sample/Samples/MapCommunicationSample.cs) using the extensions and the mappers to map between `Enumeration` and `string`:

```c#
public string? MapCommunicationTypeToStringUsingExtensions(CommunicationType communicationType)
{
    return communicationType.MapToString();
}

public CommunicationType? MapStringToCommunicationTypeUsingExtensions(string communicationType)
{
    return communicationType.MapToEnumeration<CommunicationType>();
}

public string MapCommunicationTypeToStringUsingMapper(CommunicationType communicationType)
{
    return StringEnumerationMapper<CommunicationType>.MapToString(communicationType);
}

public CommunicationType MapStringToCommunicationTypeUsingMapper(string communicationType)
{
    return StringEnumerationMapper<CommunicationType>.MapToEnumeration(communicationType);
}
```

Here is an [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.Mappers.Sample/Samples/MapCommunicationDynamicSample.cs) using the extensions and the mappers to map between `EnumerationDynamic` and `string`:

```c#
public string? MapCommunicationTypeToStringUsingExtensions(CommunicationTypeDynamic communicationType)
{
    return communicationType.MapToString();
}

public CommunicationTypeDynamic? MapStringToCommunicationTypeUsingExtensions(string communicationType)
{
    return communicationType.MapToEnumerationDynamic<CommunicationTypeDynamic>();
}

public string MapCommunicationTypeToStringUsingMapper(CommunicationTypeDynamic communicationType)
{
    return StringEnumerationDynamicMapper<CommunicationTypeDynamic>.MapToString(communicationType);
}

public CommunicationTypeDynamic MapStringToCommunicationTypeUsingMapper(string communicationType)
{
    return StringEnumerationDynamicMapper<CommunicationTypeDynamic>.MapToEnumerationDynamic(communicationType);
}
```

To map between different types of `Enumeration`, you can follow this [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.Mappers.Sample/Samples/MapToOtherCommunicationSample.cs):

```c#
public OtherCommunicationType? MapToOtherTypeOfEnumeration(CommunicationType communicationType)
{
    return OtherCommunicationType.GetFromValueOrDefault(communicationType.Value);
}

public OtherCommunicationType? MapToOtherTypeOfEnumerationUsingExtensions(CommunicationType communicationType)
{
    // Usage: ...MapToEnumeration<the source type, the destination type>();
    return communicationType.MapToEnumeration<CommunicationType, OtherCommunicationType>();
}

public OtherCommunicationType MapToOtherTypeOfEnumerationTypeUsingMapper(CommunicationType communicationType)
{
    // Usage: EnumerationMapper<the source type, the destination type>.MapToEnumeration(...);
    return EnumerationMapper<CommunicationType, OtherCommunicationType>.MapToEnumeration(communicationType);
}
```

And finally, to map between different types of `Enumeration` where the destination is an `EnumerationDynamic`, you can follow this [example](https://github.com/p-martinho/Enumeration/samples/Enumeration.Mappers.Sample/Samples/MapToOtherCommunicationDynamicSample.cs):

```c#
public OtherCommunicationTypeDynamic? MapToOtherTypeOfEnumeration(CommunicationType communicationType)
{
    return OtherCommunicationTypeDynamic.GetFromValueOrNew(communicationType.Value);
}

public OtherCommunicationTypeDynamic? MapToOtherTypeOfEnumerationUsingExtensions(
    CommunicationType communicationType)
{
    // Usage: ...MapToEnumerationDynamic<the source type, the destination type>();
    return communicationType.MapToEnumerationDynamic<CommunicationType, OtherCommunicationTypeDynamic>();
}

public OtherCommunicationTypeDynamic MapToOtherTypeOfEnumerationTypeUsingMapper(CommunicationType communicationType)
{
    // Usage: EnumerationDynamicMapper<the source type, the destination type>.MapToEnumerationDynamic(...);
    return EnumerationDynamicMapper<CommunicationType, OtherCommunicationTypeDynamic>.MapToEnumerationDynamic(
        communicationType);
}
```

## Using Mapperly

The [Mapperly](https://github.com/riok/mapperly) is a source generator for generating object mappings. To map objects that have properties of type `Enumeration` or `EnumerationDynamic` with __Mapperly__, you need to implement the mapping in the object mapper.

The NuGet package `PMart.Enumeration.Mappers` provides a set of [mappers](https://github.com/p-martinho/Enumeration/src/Enumeration.Mappers) that can be used in __Mapperly__ mappers, without the need to implement the mapping manually.

In this example, we have a source object that is mapped to a destination object, which requires mapping from `Enumeration` to `string` (from `CommunicationType` to `string`) and between different types of `Enumeration` (from `CommunicationType` to `OtherCommunicationType`):

```c#
public class SourceObject
{
    public CommunicationType CommunicationType { get; set; } = null!;
    
    public CommunicationType OtherCommunicationType { get; set; } = null!;
}

public class DestinationObject
{
    public string CommunicationType { get; set; } = null!;
    
    public OtherCommunicationType OtherCommunicationType { get; set; } = null!;
}
```

For this example, we need to create a __Mapperly__ mapper, and we can use the [mappers](https://github.com/p-martinho/Enumeration/src/Enumeration.Mappers) as [external mappings](https://mapperly.riok.app/docs/configuration/user-implemented-methods/#use-external-mappings), using the attribute `[UseStaticMapper]`:

```c#
// ...
using Riok.Mapperly.Abstractions;

namespace Enumeration.Mappers.Sample.Samples.Mapperly.Mappers;

[Mapper]
[UseStaticMapper(typeof(StringEnumerationMapper<CommunicationType>))]
[UseStaticMapper(typeof(EnumerationMapper<CommunicationType, OtherCommunicationType>))]
internal partial class SampleMapper
{
    public partial DestinationObject SourceToDestination(SourceObject sourceModel);
}
```

For enumerations of type `EnumerationDynamic`, you can use the mappers [`StringEnumerationDynamicMapper`](https://github.com/p-martinho/Enumeration/src/Enumeration.Mappers/StringEnumerationDynamicMapper.cs) and [`EnumerationDynamicMapper`](https://github.com/p-martinho/Enumeration/src/Enumeration.Mappers/EnumerationDynamicMapper.cs).

You can check the sample [here](https://github.com/p-martinho/Enumeration/samples/Enumeration.Mappers.Sample/Samples/Mapperly).

# Enumeration Generator
Creating a new Enumeration class is a little bit verbose. For instance, you can't forget to extend `Enumeration<T>` and to create the `private` constructor (else, it wouldn't compile anyway).
Therefore, the package `PMart.Enumeration.Generator` was added to help on that. It is an [incremental generator](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md).

## Generator Installation

Add the package to your project:
```bash
dotnet add package PMart.Enumeration.Generator
```

> You need to keep the package `PMart.Enumeration` installed.

To any project referring that project don't get a reference to the `PMart.Enumeration.Generator`, you can add `PrivateAssets="all"` to the package reference.
And you can also add `ExcludeAssets="runtime"`, to avoid the `PMart.Enumeration.Generator.dll` file being copied to your build output (it is not required at runtime, it is a generator, so it works in compile time only):

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <!-- ... -->

  <PackageReference Include="PMart.Enumeration" Version="3.1.0" />
  <PackageReference Include="PMart.Enumeration.Generator" Version="3.1.0" PrivateAssets="all" ExcludeAssets="runtime" />
  
  <!-- ... -->

</Project>
```

## Generator Usage

To create a new Enumeration with the generator, it is easy:
- Create a `partial` class, for the Enumeration class.
- Add the `EnumerationAttribute` (namespace `PMart.Enumeration.Generator.Attributes`) on the class.
- Add fields of type `private static readonly string` named with the prefix `ValueFor` (this prefix is one of the ways of doing it, as you can check next), that hold the values that will be used to create the enumeration members (check the bellow examples).

> The non-fields or fields that are not `private static readonly string` are ignored.

For example, without the generator, the communication type enumeration was like this:

```c#
using PMart.Enumeration;

namespace Enumeration.Sample.Enumerations;

/// <summary>
/// The communication type enumeration.
/// </summary>
public class CommunicationType : Enumeration<CommunicationType>
{
    public static readonly CommunicationType Email = new("Email");

    public static readonly CommunicationType Sms = new("SMS");
    
    public static readonly CommunicationType PushNotification = new("PushNotification");

    private CommunicationType(string value) : base(value)
    {
    }
}
```

Using the generator and the prefix `ValueFor` (this prefix is one of the ways of doing it, as you can check next), it is just like this:

```c#
using PMart.Enumeration.Generator.Attributes;

namespace Enumeration.Generator.Sample.Enumerations;

/// <summary>
/// The communication type enumeration.
/// </summary>
[Enumeration]
public partial class CommunicationType
{
    private static readonly string ValueForEmail = "Email";

    private static readonly string ValueForSms = "SMS";
    
    private static readonly string ValueForPushNotification = "PushNotification";
}
```

And the __generated code__ will be something like this:

```c#
// <auto-generated />

namespace Enumeration.Generator.Sample.Enumerations
{
    public partial class CommunicationType : Enumeration<CommunicationType>
    {
        public static readonly CommunicationType Email = new CommunicationType(ValueForEmail!);

        public static readonly CommunicationType Sms = new CommunicationType(ValueForSms!);

        public static readonly CommunicationType PushNotification = new CommunicationType(ValueForPushNotification!);

        private CommunicationType(string value) : base(value)
        {
        }
    }
}
```

If you don't worry about instantiating the enumeration members and your only concern is about the inheritance from `Enumeration<T>` and constructors, you can use the generator to build just that parts:

```c#
[Enumeration]
public partial class CommunicationType
{    
    public static readonly CommunicationType Email = new("Email");

    public static readonly CommunicationType Sms = new("SMS");
    
    public static readonly CommunicationType PushNotification = new("PushNotification");
}
```

You can check other examples in the [samples](https://github.com/p-martinho/Enumeration/samples/Enumeration.Generator.Sample/Enumerations).

### The EnumerationMember Attribute

If you don't like the use of the prefix `ValueFor` to define the member names, you can use the `EnumerationMemberAttribute` to define the name of the enumeration member
(but remember, it is not possible two fields have the same name, it will return a compilation error if you try to do that):

```c#
[Enumeration]
public partial class CommunicationType
{
    [EnumerationMember("Email")]
    private static readonly string EmailCode = "Email";

    [EnumerationMember("Sms")]
    private static readonly string SmsCode = "SMS";
    
    [EnumerationMember("PushNotification")]
    private static readonly string PushNotificationCode = "PushNotification";
}
```

### The EnumerationIgnore Attribute

If, for some reason, you already have a field `private static readonly string` named `ValueFor...`, but you don't want it to be used to generate a new enumeration member, use the `EnumerationIgnoreAttribute`:

```c#
[Enumeration]
public partial class CommunicationType
{
    private static readonly string ValueForEmail = "Email";

    private static readonly string ValueForSms = "SMS";
    
    private static readonly string ValueForPushNotification = "PushNotification";
    
    [EnumerationIgnore]
    private static readonly string ValueForSomeFieldThatShouldBeIgnored = "SomeValue";
}
```

### Generate EnumerationDynamic

To generate an Enumeration class of type `EnumerationDynamic<T>`, enable the option `IsDynamic` of the `EnumerationAttribute`:

```c#
[Enumeration(IsDynamic = true)]
public partial class CommunicationTypeDynamic
{
    private static readonly string ValueForEmail = "Email";

    private static readonly string ValueForSms = "SMS";
    
    private static readonly string ValueForPushNotification = "PushNotification";
}
```

The generated code will be something like this:

```c#
// <auto-generated />

namespace Enumeration.Generator.Sample.Enumerations
{
    public partial class CommunicationTypeDynamic : EnumerationDynamic<CommunicationTypeDynamic>
    {
        public static readonly CommunicationTypeDynamic Email = new CommunicationTypeDynamic(ValueForEmail!);

        public static readonly CommunicationTypeDynamic Sms = new CommunicationTypeDynamic(ValueForSms!);

        public static readonly CommunicationTypeDynamic PushNotification = new CommunicationTypeDynamic(ValueForPushNotification!);

        public CommunicationTypeDynamic()
        {
        }

        private CommunicationTypeDynamic(string value) : base(value)
        {
        }
    }
}
```

## Generator Diagnostics

The generator tries to report errors when the user does common mistakes, namely about naming the enumeration members with names already in use.
In some cases, there are no compilation errors on the user code. Without the diagnostics from the generator, the user would not know why the generator doesn't work.

For instance, assigning the same name for the enumeration member and for the field, the Enumeration class will not be generated and an error is reported:

```c#
[Enumeration]
public partial class CommunicationType
{
    [EnumerationMember("Email")]
    private static readonly string Email = "Email";
                                   ^^^^^ // Error ENUM0002: The name 'Email' of the Enumeration member is the same as the field name
}
```

Or, defining an invalid name for the enumeration member:

```c#
[Enumeration]
public partial class CommunicationType
{
    // 123 is not a valid name for a class member in C#
    [EnumerationMember("123")]
    private static readonly string Email = "Email";
                                   ^^^^^ // Error ENUM0001: Invalid name for the Enumeration member in the EnumerationMemberAttribute
}
```

There are other diagnostics reported for different cases. All are of type `Error` with an ID like `ENUMXXXX` and with a descriptive message.

## Generator Limitations
- The .NET versions restrictions are:
  - .NET SDK: >= 8.0.100
  - MSBuild/Visual Studio: >= 17.8.
- It does not work for `abstract` classes. In the example provided in [Enumeration with behavior](#enumeration-with-behavior), we use an `abstract` class and subclasses. When using the generator, you can do the same without being `abstract`, check this [sample](https://github.com/p-martinho/Enumeration/samples/Enumeration.Generator.Sample/Enumerations/CommunicationTypeWithSpecificBehaviour.cs).
- It does not support nested classes (the usage of the `EnumerationAttribute` in a nested class does not have effect). But it supports nested namespaces.

# Disclaimer
While the enumeration class is a good alternative to `enum` type, it is more complex and also .NET doesn't handle it as it handles `enum` (e.g. JSON des/serialization, model binding, etc.), requiring custom code.
Please be aware that enumeration class may not fit your needs.

# References
- Enumeration Classes:
  - [Microsoft Docs: Using enumeration classes instead of enum types](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/enumeration-classes-over-enum-types)
  - [Jimmy Bogard: Enumeration Classes](https://lostechies.com/jimmybogard/2008/08/12/enumeration-classes)
  - [Ardalis: Enum Alternatives in C#](https://ardalis.com/enum-alternatives-in-c)
  - [Ardalis: SmartEnum](https://github.com/ardalis/SmartEnum)
  - [Ankit Vijay: Enumeration Classes – DDD and beyond](https://ankitvijay.net/2020/06/12/series-enumeration-classes-ddd-and-beyond)
  - [Ankit Vijay: Enumeration](https://github.com/ankitvijay/Enumeration)
  - [eShopOnContainers: Enumeration.cs](https://github.com/dotnet-architecture/eShopOnContainers/blob/dev/src/Services/Ordering/Ordering.Domain/SeedWork/Enumeration.cs)
- Incremental Generators:
  - [Roslyn Documentation: Incremental Generators](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md)
  - [Roslyn Documentation: Incremental Generators Cookbook](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.cookbook.md)
  - [Andrew Lock: Creating a source generator](https://andrewlock.net/series/creating-a-source-generator)
  - [Andrew Lock: NetEscapades.EnumGenerators](https://github.com/andrewlock/NetEscapades.EnumGenerators)

:::

### About
:::note

Constants as enumeration. With EFCore, Swagger and other implementations.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **PMart.Enumeration**
```xml showLineNumbers {12}
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<OutputType>Exe</OutputType>
		<TargetFramework>net9.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
	</PropertyGroup>
	<ItemGroup>

		<PackageReference Include="PMart.Enumeration" Version="3.1.0" />
		<PackageReference Include="PMart.Enumeration.Generator" Version="3.1.0" PrivateAssets="all" ExcludeAssets="runtime" />

	</ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PMart.Enumeration\src\DemoPMart\Program.cs" label="Program.cs" >

  This is the use of **PMart.Enumeration** in *Program.cs*

```csharp showLineNumbers 
using DemoPMart;

var personType= PersonType.GetFromValueOrDefault("test");
Console.WriteLine(personType?.Value??"null");
personType = PersonType.GetFromValueOrDefault("manager");
Console.WriteLine(personType!.Value);
Console.WriteLine(PersonType.Manager == personType);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PMart.Enumeration\src\DemoPMart\Person.cs" label="Person.cs" >

  This is the use of **PMart.Enumeration** in *Person.cs*

```csharp showLineNumbers 
using PMart.Enumeration.Generator.Attributes;

namespace DemoPMart;
[Enumeration]
public partial class PersonType
{
    private static readonly string ValueForEmployee = "Employee";
    private static readonly string ValueForManager = "Manager";


}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\PMart.Enumeration\src\DemoPMart\obj\GX\PMart.Enumeration.Generator\PMart.Enumeration.Generator.EnumerationGenerator\PersonType.g.cs" label="PersonType.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//     This code was generated by the PMart.Enumeration.Generator source generator.
// </auto-generated>

#nullable enable

namespace DemoPMart
{
    public partial class PersonType : global::PMart.Enumeration.Enumeration<global::DemoPMart.PersonType>
    {
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("PMart.Enumeration.Generator", "3.1.0.0")]
        public static readonly global::DemoPMart.PersonType Employee = new global::DemoPMart.PersonType(ValueForEmployee!);

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("PMart.Enumeration.Generator", "3.1.0.0")]
        public static readonly global::DemoPMart.PersonType Manager = new global::DemoPMart.PersonType(ValueForManager!);

        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("PMart.Enumeration.Generator", "3.1.0.0")]
        private PersonType(string value) : base(value)
        {
        }
    }
}
```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project PMart.Enumeration ](/sources/PMart.Enumeration.zip)

:::


### Share PMart.Enumeration 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPMart.Enumeration&quote=PMart.Enumeration" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPMart.Enumeration&text=PMart.Enumeration:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPMart.Enumeration" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPMart.Enumeration&title=PMart.Enumeration" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPMart.Enumeration&title=PMart.Enumeration&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FPMart.Enumeration" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/PMart.Enumeration

aaa
<SameCategory />

