# Strongly

![Strongly logo](https://raw.githubusercontent.com/lucasteles/Strongly/master/logo.png)

![Build status](https://github.com/lucasteles/Strongly/actions/workflows/BuildAndPack.yml/badge.svg)
[![NuGet](https://img.shields.io/nuget/v/Strongly.svg)](https://www.nuget.org/packages/Strongly/)

Strongly makes creating strongly-typed values as easy as adding an attribute! No
more [accidentally passing arguments in the wrong order to methods](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-1/#an-example-of-the-problem) -
Strongly uses .NET 6's compile-time incremental source generators to
generate [the boilerplate](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#a-full-example-implementation)
required to use strongly-typed IDs.

Simply, [install the required package](#installing) add the `[Strongly]` attribute to a `struct` (in the `Strongly`
namespace):

```csharp
using Strongly;
 
[Strongly] // <- Add this attribute to auto-generate the rest of the type
public partial struct FooId { }
```

and the source generator magically generates the backing code when you save the file! Use _Go to Definition_ to see the
generated code:

<img src="https://raw.githubusercontent.com/andrewlock/Strongly/master/docs/strongly_typed_id.gif" alt="Generating a strongly-typed ID using the Strongly packages"/>

> Strongly requires requires [the .NET Core SDK v6.0.100 or greater](https://dotnet.microsoft.com/download/dotnet/6.0).

## Installing

To use the the [Strongly NuGet package](https://www.nuget.org/packages/Strongly), install
the [Strongly](https://www.nuget.org/packages/Strongly) package into your project. Depending on which converters you
implement, you may need one or more of the following additional packages

* [System.Text.Json](https://www.nuget.org/packages/System.Text.Json/) (optional, only required
  if [generating a System.Text `JsonConverter`](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#creating-a-custom-jsonconverter)).
  Note that in .NET Core apps, you will likely already reference this project via transitive dependencies.
* [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/) (optional, only required
  if [generating a Newtonsoft `JsonConverter`](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#creating-a-custom-jsonconverter)).
  Note that in some ASP.NET Core apps, you will likely already reference this project via transitive dependencies.
* [Dapper](https://www.nuget.org/packages/Dapper/) (optional, only required
  if [generating a type mapper](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-3/#interfacing-with-external-system-using-strongly-typed-ids))
* [EF Core](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore) (optional, only required
  if [generating an EF Core ValueConverter](https://andrewlock.net/strongly-typed-ids-in-ef-core-using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-4/))
* [Swagger Annotations](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Annotations) (optional, only required
  if [generating an Swagger Schema Filter](#openapiswagger-specification)

To install the packages, add the references to your _csproj_ file, for example by running

```bash
dotnet add package Strongly 
```

This adds a `<PackageReference>` to your project. You can additionally mark the package as `PrivateAssets="all"`
and `ExcludeAssets="runtime"`.

> Setting `PrivateAssets="all"` means any projects referencing this one will not also get a reference to the _Strongly_
> package. Setting `ExcludeAssets="runtime"` ensures the _Strongly.Attributes.dll_ file is not copied to your build
> output (it is not required at runtime).

```xml

<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
    </PropertyGroup>

    <!-- Add the package -->
    <PackageReference Include="Strongly" Version="1.0.0" PrivateAssets="all" ExcludeAssets="runtime"/>
    <!-- -->

</Project>
```

## Usage

To create a strongly-typed ID, create a `partial struct` with the desired name, and decorate it with the `[Strongly]`
attribute, in the `Strongly` namespace:

```csharp
using Strongly;

[Strongly] // Add this attribute to auto-generate the rest of the type
public partial struct FooId { }
```

This generates the "default" strongly-typed ID using a `Guid` backing field, a custom `TypeConverter`, and a
custom `JsonConverter` based on System.Text.Json.

### Customising the converters

You can customise which converters to generate by using flags. For example, to generate a `TypeConverter`,
a `Newtonsoft.Json`, and an EF Core `ValueConverter`, use

```csharp
using Strongly;

[Strongly(converters: StronglyConverter.TypeConverter | StronglyConverter.SystemTextJson | StronglyConverter.EfValueConverter)] 
public partial struct SystemTextJsonConverterId { }
```

### Using different types as a backing fields

The default strongly-typed ID uses a `Guid` backing field:

```csharp
using Strongly;

[Strongly]
public partial struct FooId { }

var id = new FooId(Guid.NewGuid());
```

You can choose a different type backing field, by passing a value of the `StronglyBackingType` enum in the constructor.

```csharp
using Strongly;

[Strongly(backingType: StronglyBackingType.String)]
public partial struct FooId { }

var id = new FooId("my-id-value");
```

Currently supported values are `Guid` (the default), `int`, `long`,`decimal`,`BigInteger`, `MassTransit.NewId`
and `string`.

## Changing the defaults globally

If you wish to change the converters, backing types, or implementations used by default for _all_ the `[Strongly]`
-decorated types in your project, you can use the assembly attribute `[StronglyDefaults]` to set all of these. For
example, the following sets the default converter to a whole project to `[SystemTextJson]`, and changes the default
backing-type to an `int`

```csharp
// Set the defaults for the project
[assembly:StronglyDefaults(
    backingType: StronglyType.Int,
    converters: StronglyConverter.SystemTextJson)]

[Strongly]
public partial struct OrderId { }

[Strongly]
public partial struct UserId { } 
```

This is equivalent to setting these values manually on all the IDs:

```csharp
[Strongly(
    backingType: StronglyType.Int,
    converters: StronglyConverter.SystemTextJson)]
public partial struct OrderId { }

[Strongly(
     backingType: StronglyType.Int,
    converters: StronglyConverter.SystemTextJson)]
public partial struct UserId { }
```

## EF Core - ValueConverter

When you create a `Strongly` type with EF Converter, the type will have a nested `ValueConverter` class you can use on
your entity model definition

```csharp
[Strongly(StronglyType.String, StronglyConverter.EfValueConverter)]
public partial struct PhoneNumber
{
}

public class MyDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        var customer = builder.Entity<Customer>();
        customer.Property(x => x.Phone).HasConversion<PhoneNumber.EfValueConverter>();
    }
}

```

If you have lots of strongly type values you can use the package bellow to automatically set
the `Strongly ValueConverter` on all your entities [![NuGet](https://img.shields.io/nuget/v/Strongly.EFCore.svg)](https://www.nuget.org/packages/Strongly.EFCore/)


```bash
dotnet add package Strongly.EFCore
```

After installation you need to set it on yor `DbContextOptionsBuilder`

```csharp
services
    .AddDbContext<AppDbContext>(options => options
        .UseStronglyTypeConverters()
        /* ... */
        )
```

## OpenApi/Swagger Specification

If you wish to use an ID in your Swagger models and want to have schema and model sample reflecting the value
backing-field
type you will need:

- Install [Swagger Annotations](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Annotations) `>=5.0.0`
- Enable annotation in swagger gen with `services.AddSwaggerGen(c => c.EnableAnnotations());`
- Use the converter flag `StronglyConverter.SwaggerSchemaFilter` on the ID decorator. eg:
    ```csharp
    [Strongly(
        backingType: StronglyType.Int,
        converters: StronglyConverter.SwaggerSchemaFilter | StronglyConverter.SystemTextJson)]
    public partial struct UserId { }
    ```

## Embedding the attributes in your project

By default, the `[Strongly]` attributes referenced in your application are contained in an external dll. It is also
possible to embed the attributes directly in your project, so they appear in the dll when your project is built. If you
wish to do this, you must do two things:

1. Define the MSBuild constant `STRONGLY_TYPED_EMBED_ATTRIBUTES`. This ensures the attributes are embedded in your
   project
2. Add `compile` to the list of excluded assets in your `<PackageReference>` element. This ensures the attributes in
   your project are referenced, instead of the _Strongly.Attributes.dll_ library.

Your project file should look something like this:

```xml

<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <!--  Define the MSBuild constant    -->
        <DefineConstants>STRONGLY_TYPED_EMBED_ATTRIBUTES</DefineConstants>
    </PropertyGroup>

    <!-- Add the package -->
    <PackageReference Include="Strongly" Version="1.0.0"
                      PrivateAssets="all"
                      ExcludeAssets="compile;runtime"/>
    <!--                               ☝ Add compile to the list of excluded assets. -->

</Project>
```

## Preserving usages of the `[Strongly]` attribute

The `[Strongly]` and `[StronglyDefaults]` attributes are decorated with the `[Conditional]`
attribute, [so their usage will not appear in the build output of your project](https://andrewlock.net/conditional-compilation-for-ignoring-method-calls-with-the-conditionalattribute/#applying-the-conditional-attribute-to-classes).
If you use reflection at runtime on one of your IDs, you will not find `[Strongly]` in the list of custom attributes.

If you wish to preserve these attributes in the build output, you can define the `STRONGLY_TYPED_USAGES` MSBuild
variable. Note that this means your project will have a runtime-dependency on _Strongly.Attributes.dll_ so you need to
ensure this is included in your build output.

```xml

<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <!--  Define the MSBuild constant to preserve usages   -->
        <DefineConstants>STRONGLY_TYPED_USAGES</DefineConstants>
    </PropertyGroup>

    <!-- Add the package -->
    <PackageReference Include="Strongly" Version="1.0.0" PrivateAssets="all"/>
    <!--              ☝ You must not exclude the runtime assets in this case -->

</Project>
```

## Why do I need this library?

Andrew
have [written a blog-post series](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-1/)
on strongly-typed IDs that explains the issues and rational behind this library. For a detailed view, I suggest starting
there, but I provide a brief introduction here.

This library is designed to tackle a specific instance of [_primitive
obsession_](https://lostechies.com/jimmybogard/2007/12/03/dealing-with-primitive-obsession/), whereby we use primitive
objects (`Guid`/`string`/`int`/`long`/`decimal` etc) to represent the IDs or values of
domain objects. The problem is that these
types are all
interchangeable - an order ID can be assigned to a product ID despite the fact that is likely nonsensical from the
domain point of
view. [See here for a more concrete example](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-1/#an-example-of-the-problem).

By using strongly-typed values, we give each of then its own `Type` which _wraps_ the underlying primitive value. This
ensures
you can only use the value where it makes sense: `ProductId`s can only be assigned to products, or you can only search
for
products using a `ProductId`, not an `OrderId`.

Unfortunately, taking this approach
requires [a lot of boilerplate and ceremony](https://andrewlock.net/using-strongly-typed-entity-ids-to-avoid-primitive-obsession-part-2/#a-full-example-implementation)
to make working with it manageable. This library abstracts all that away from you, by generating the boilerplate at
build-time by using a Roslyn-powered code generator.

## What code is generated?

The exact code generated depends on the arguments you provide to the `Strongly` attribute. The code is generated to the
_obj_ folder of the project, so you can use _Go to Definition_ on your Id to see the _exact_ code generated in each
case.

## Requirements

The Strongly NuGet package is a .NET Standard 2.0 package.

You must be using the .NET 6+ SDK (though you can compile for other target frameworks like .NET Core 2.1 and .NET
Framework 4.8)

The `struct`s you decorate with the `Strongly` attribute must be marked `partial`.

## Credits

[Credits]: #credits

This project born as a fork of [StronglyTypedId](https://github.com/andrewlock/StronglyTypedId) 
