---
sidebar_position: 200
title: 20 - NetEscapades.EnumGenerators
description: Running fast tostring and other  features for enum
slug: /NetEscapades.EnumGenerators
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# NetEscapades.EnumGenerators  by Andrew Lock


<TOCInline toc={toc} />

[![Nuget](https://img.shields.io/nuget/dt/NetEscapades.EnumGenerators?label=NetEscapades.EnumGenerators)](https://www.nuget.org/packages/NetEscapades.EnumGenerators/)
[![GitHub last commit](https://img.shields.io/github/last-commit/andrewlock/NetEscapades.EnumGenerators?label=updated)](https://github.com/andrewlock/NetEscapades.EnumGenerators)
![GitHub Repo stars](https://img.shields.io/github/stars/andrewlock/NetEscapades.EnumGenerators?style=social)

## Details

### Info
:::info

Name: **NetEscapades.EnumGenerators**

A source generator for creating helper extension methods on enums using a [EnumExtensions] attribute

Author: Andrew Lock

NuGet: 
*https://www.nuget.org/packages/NetEscapades.EnumGenerators/*   


You can find more details at https://andrewlock.net/netescapades-enumgenerators-a-source-generator-for-enum-performance/

Source : https://github.com/andrewlock/NetEscapades.EnumGenerators

:::

### Original Readme
:::note

# NetEscapades.EnumGenerators

![Build status](https://github.com/andrewlock/NetEscapades.EnumGenerators/actions/workflows/BuildAndPack.yml/badge.svg)
[![NuGet](https://img.shields.io/nuget/v/NetEscapades.EnumGenerators.svg)](https://www.nuget.org/packages/NetEscapades.EnumGenerators/)

A Source Generator package that generates extension methods for enums, to allow fast "reflection".

> This source generator requires the .NET 7 SDK. You can target earlier frameworks like .NET Core 3.1 etc, but the _SDK_ must be at least 7.0.100

Add the package to your application using

```bash
dotnet add package NetEscapades.EnumGenerators
```


This adds a `<PackageReference>` to your project. You can additionally mark the package as `PrivateAssets="all"` and `ExcludeAssets="runtime"`.

> Setting `PrivateAssets="all"` means any projects referencing this one won't get a reference to the _NetEscapades.EnumGenerators_ package. Setting `ExcludeAssets="runtime"` ensures the _NetEscapades.EnumGenerators.Attributes.dll_ file is not copied to your build output (it is not required at runtime).

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <!-- Add the package -->
  <PackageReference Include="NetEscapades.EnumGenerators" Version="1.0.0-beta04" 
    PrivateAssets="all" ExcludeAssets="runtime" />
  <!-- -->

</Project>
```

Adding the package will automatically add a marker attribute, `[EnumExtensions]`, to your project.

To use the generator, add the `[EnumExtensions]` attribute to an enum. For example:

```csharp
[EnumExtensions]
public enum MyEnum
{
    First,

    [Display(Name = "2nd")]
    Second,
}
```

This will generate a class called `MyEnumExtensions` (by default), which contains a number of helper methods. For example:

```csharp
public static partial class MyEnumExtensions
{
    public const int Length = 2;

    public static string ToStringFast(this MyEnum value)
        => value switch
        {
            MyEnum.First => nameof(MyEnum.First),
            MyEnum.Second => "2nd",
            _ => value.ToString(),
        };

   public static bool IsDefined(MyEnum value)
        => value switch
        {
            MyEnum.First => true,
            MyEnum.Second => true,
            _ => false,
        };

    public static bool IsDefined(string name)
        => name switch
        {
            nameof(MyEnum.First) => true,
            nameof(MyEnum.Second) => true,
            _ => false,
        };

    public static bool TryParse(
        [System.Diagnostics.CodeAnalysis.NotNullWhen(true)] string? name, 
        bool ignoreCase, 
        out MyEnum value)
        => ignoreCase ? TryParseIgnoreCase(name, out value) : TryParse(name, out value);

    private static bool TryParseIgnoreCase(
        [System.Diagnostics.CodeAnalysis.NotNullWhen(true)] string? name, 
        out MyEnum value)
    {
        switch (name)
        {
            case { } s when s.Equals(nameof(MyEnum.First), System.StringComparison.OrdinalIgnoreCase):
                value = MyEnum.First;
                return true;
            case { } s when s.Equals(nameof(MyEnum.Second), System.StringComparison.OrdinalIgnoreCase):
                value = MyEnum.Second;
                return true;
            case { } s when int.TryParse(name, out var val):
                value = (MyEnum)val;
                return true;
            default:
                value = default;
                return false;
        }
    }

    public static bool TryParse(
        [System.Diagnostics.CodeAnalysis.NotNullWhen(true)] string? name, 
        out MyEnum value)
    {
        switch (name)
        {
            case nameof(MyEnum.First):
                value = MyEnum.First;
                return true;
            case nameof(MyEnum.Second):
                value = MyEnum.Second;
                return true;
            case { } s when int.TryParse(name, out var val):
                value = (MyEnum)val;
                return true;
            default:
                value = default;
                return false;
        }
    }

    public static MyEnum[] GetValues()
    {
        return new[]
        {
            MyEnum.First,
            MyEnum.Second,
        };
    }

    public static string[] GetNames()
    {
        return new[]
        {
            nameof(MyEnum.First),
            nameof(MyEnum.Second),
        };
    }
}
```

If you create a "Flags" `enum` by decorating it with the `[Flags]` attribute, an additional method is created, which provides a bitwise alternative to the `Enum.HasFlag(flag)` method:

```csharp
public static bool HasFlagFast(this MyEnum value, MyEnum flag)
    => flag == 0 ? true : (value & flag) == flag;
```

Note that if you provide a `[Display]` or `[Description]` attribute, the value you provide for this attribute can be used by methods like `ToStringFast()` and `TryParse()` by passing the argument `allowMatchingMetadataAttribute: true`. Adding both attributes to an enum member is not supported, though conventionally the "first" attribute will be used.

You can override the name of the extension class by setting `ExtensionClassName` in the attribute and/or the namespace of the class by setting `ExtensionClassNamespace`. By default, the class will be public if the enum is public, otherwise it will be internal.

## Embedding the attributes in your project

By default, the `[EnumExtensions]` attributes referenced in your application are contained in an external dll. It is also possible to embed the attributes directly in your project, so they appear in the dll when your project is built. If you wish to do this, you must do two things:

1. Define the MSBuild constant `NETESCAPADES_ENUMGENERATORS_EMBED_ATTRIBUTES`. This ensures the attributes are embedded in your project
2. Add `compile` to the list of excluded assets in your `<PackageReference>` element. This ensures the attributes in your project are referenced, instead of the _NetEscapades.EnumGenerators.Attributes.dll_ library.

Your project file should look something like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <!--  Define the MSBuild constant    -->
    <DefineConstants>$(DefineConstants);NETESCAPADES_ENUMGENERATORS_EMBED_ATTRIBUTES</DefineConstants>
  </PropertyGroup>

  <!-- Add the package -->
  <PackageReference Include="NetEscapades.EnumGenerators" Version="1.0.0-beta04" 
                    PrivateAssets="all"
                    ExcludeAssets="compile;runtime" />
<!--                               ☝ Add compile to the list of excluded assets. -->

</Project>
```

## Preserving usages of the `[EnumExtensions]` attribute

The `[EnumExtensions]` attribute is decorated with the `[Conditional]` attribute, [so their usage will not appear in the build output of your project](https://andrewlock.net/conditional-compilation-for-ignoring-method-calls-with-the-conditionalattribute/#applying-the-conditional-attribute-to-classes). If you use reflection at runtime on one of your `enum`s, you will not find `[EnumExtensions]` in the list of custom attributes.

If you wish to preserve these attributes in the build output, you can define the `NETESCAPADES_ENUMGENERATORS_USAGES` MSBuild variable. Note that this means your project will have a runtime-dependency on _NetEscapades.EnumGenerators.Attributes.dll_ so you need to ensure this is included in your build output.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <!--  Define the MSBuild constant to preserve usages   -->
    <DefineConstants>$(DefineConstants);NETESCAPADES_ENUMGENERATORS_USAGES</DefineConstants>
  </PropertyGroup>

  <!-- Add the package -->
  <PackageReference Include="NetEscapades.EnumGenerators" Version="1.0.0-beta05" PrivateAssets="all" />
  <!--              ☝ You must not exclude the runtime assets in this case -->

</Project>
```

## Error CS0436 and [InternalsVisibleTo]

> In the latest version of _NetEscapades.EnumGenerators_, you should not experience error CS0436 by default.

In previous versions of the _NetEscapades.EnumGenerators_ generator, the `[EnumExtensions]` attributes were added to your compilation as `internal` attributes by default. If you added the source generator package to multiple projects, and used the `[InternalsVisibleTo]` attribute, you could experience errors when you build:

```bash
warning CS0436: The type 'EnumExtensionsAttribute' in 'NetEscapades.EnumGenerators\NetEscapades.EnumGenerators\EnumExtensionsAttribute.cs' conflicts with the imported type 'EnumExtensionsAttribute' in 'MyProject, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'.
```

In the latest version of _StronglyTypedId_, the attributes are not embedded by default, so you should not experience this problem. If you see this error, compare your installation to the examples in the installation guide.


:::

### About
:::note

Running fast tostring and other  features for enum


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **NetEscapades.EnumGenerators**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="NetEscapades.EnumGenerators" Version="1.0.0-beta08" 
					  OutputItemType="Analyzer" ReferenceOutputAssembly="false"
					  PrivateAssets="all" ExcludeAssets="comile;runtime"
					  />
  </ItemGroup>
 <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>
  
</Project>

```

</TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NetEscapades.EnumGenerators\src\TestEnumEscapades\Program.cs" label="Program.cs" >

  This is the use of **NetEscapades.EnumGenerators** in *Program.cs*

```csharp showLineNumbers 

var value = InstallType.ShowGUI;
Console.WriteLine($"the enum string is {value.ToStringFast()}");
Console.WriteLine($"{InstallType.None.ToStringFast()}");


var flags = AddToCoffee.Milk | AddToCoffee.Sugar;

Console.WriteLine(flags.ToStringFast());
Console.WriteLine($"HasFlag(Milk), {flags.HasFlagFast(AddToCoffee.Milk)}");
Console.WriteLine($"HasFlag(Biscuit), {flags.HasFlagFast(AddToCoffee.Biscuit)}");
//check also
//InstallTypeExtensions.GetNames
//AddToCoffeeExtensions.GetNames
```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NetEscapades.EnumGenerators\src\TestEnumEscapades\InstallType.cs" label="InstallType.cs" >

  This is the use of **NetEscapades.EnumGenerators** in *InstallType.cs*

```csharp showLineNumbers 
using NetEscapades.EnumGenerators;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

[EnumExtensions]
internal enum InstallType
{
    [Display(Name = $"Please use one of the flags of {nameof(InstallType)}")]
    None= 0,
    
    ShowGUI,
    ShowNoGui,
}

```
  </TabItem>

  <TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NetEscapades.EnumGenerators\src\TestEnumEscapades\AddToCoffee.cs" label="AddToCoffee.cs" >

  This is the use of **NetEscapades.EnumGenerators** in *AddToCoffee.cs*

```csharp showLineNumbers 
using NetEscapades.EnumGenerators;

[EnumExtensions]
[Flags]
internal enum AddToCoffee
{
    None= 0,
    Milk=1,
    Sugar=2,
    Biscuit=4
}
```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NetEscapades.EnumGenerators\src\TestEnumEscapades\obj\GX\NetEscapades.EnumGenerators\NetEscapades.EnumGenerators.EnumGenerator\AddToCoffeeExtensions_EnumExtensions.g.cs" label="AddToCoffeeExtensions_EnumExtensions.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the NetEscapades.EnumGenerators source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable
#if NETCOREAPP && !NETCOREAPP2_0 && !NETCOREAPP1_1 && !NETCOREAPP1_0
using System;
#endif

    /// <summary>
    /// Extension methods for <see cref="global::AddToCoffee" />
    /// </summary>
    internal static partial class AddToCoffeeExtensions
    {
        /// <summary>
        /// The number of members in the enum.
        /// This is a non-distinct count of defined names.
        /// </summary>
        public const int Length = 4;

        /// <summary>
        /// Returns the string representation of the <see cref="global::AddToCoffee"/> value.
        /// If the attribute is decorated with a <c>[Display]</c> attribute, then
        /// uses the provided value. Otherwise uses the name of the member, equivalent to
        /// calling <c>ToString()</c> on <paramref name="value"/>.
        /// </summary>
        /// <param name="value">The value to retrieve the string value for</param>
        /// <returns>The string representation of the value</returns>
        public static string ToStringFast(this global::AddToCoffee value)
            => value switch
            {
                global::AddToCoffee.None => nameof(global::AddToCoffee.None),
                global::AddToCoffee.Milk => nameof(global::AddToCoffee.Milk),
                global::AddToCoffee.Sugar => nameof(global::AddToCoffee.Sugar),
                global::AddToCoffee.Biscuit => nameof(global::AddToCoffee.Biscuit),
                _ => value.ToString(),
            };

        /// <summary>
        /// Determines whether one or more bit fields are set in the current instance.
        /// Equivalent to calling <see cref="global::System.Enum.HasFlag" /> on <paramref name="value"/>.
        /// </summary>
        /// <param name="value">The value of the instance to investigate</param>
        /// <param name="flag">The flag to check for</param>
        /// <returns><c>true</c> if the fields set in the flag are also set in the current instance; otherwise <c>false</c>.</returns>
        /// <remarks>If the underlying value of <paramref name="flag"/> is zero, the method returns true.
        /// This is consistent with the behaviour of <see cref="global::System.Enum.HasFlag" /></remarks>
        public static bool HasFlagFast(this global::AddToCoffee value, global::AddToCoffee flag)
            => flag == 0 ? true : (value & flag) == flag;

        /// <summary>
        /// Returns a boolean telling whether the given enum value exists in the enumeration.
        /// </summary>
        /// <param name="value">The value to check if it's defined</param>
        /// <returns><c>true</c> if the value exists in the enumeration, <c>false</c> otherwise</returns>
       public static bool IsDefined(global::AddToCoffee value)
            => value switch
            {
                global::AddToCoffee.None => true,
                global::AddToCoffee.Milk => true,
                global::AddToCoffee.Sugar => true,
                global::AddToCoffee.Biscuit => true,
                _ => false,
            };

        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration.
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, <c>false</c> otherwise</returns>
        public static bool IsDefined(string name) => IsDefined(name, allowMatchingMetadataAttribute: false);

        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration,
        /// or if a member decorated with a <c>[Display]</c> attribute
        /// with the required name exists.
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value of metadata attributes,otherwise ignores them</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, or a member is decorated
        /// with a <c>[Display]</c> attribute with the name, <c>false</c> otherwise</returns>
        public static bool IsDefined(string name, bool allowMatchingMetadataAttribute)
        {
            return name switch
            {
                nameof(global::AddToCoffee.None) => true,
                nameof(global::AddToCoffee.Milk) => true,
                nameof(global::AddToCoffee.Sugar) => true,
                nameof(global::AddToCoffee.Biscuit) => true,
                _ => false,
            };
        }

#if NETCOREAPP && !NETCOREAPP2_0 && !NETCOREAPP1_1 && !NETCOREAPP1_0
        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, <c>false</c> otherwise</returns>
        public static bool IsDefined(in ReadOnlySpan<char> name) => IsDefined(name, allowMatchingMetadataAttribute: false);

        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration,
        /// or optionally if a member decorated with a <c>[Display]</c> attribute
        /// with the required name exists.
        /// Slower then the <see cref="IsDefined(string, bool)" /> overload, but doesn't allocate memory./>
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value of metadata attributes,otherwise ignores them</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, or a member is decorated
        /// with a <c>[Display]</c> attribute with the name, <c>false</c> otherwise</returns>
        public static bool IsDefined(in ReadOnlySpan<char> name, bool allowMatchingMetadataAttribute)
        {
            return name switch
            {
                ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.None).AsSpan(), global::System.StringComparison.Ordinal) => true,
                ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Milk).AsSpan(), global::System.StringComparison.Ordinal) => true,
                ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Sugar).AsSpan(), global::System.StringComparison.Ordinal) => true,
                ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Biscuit).AsSpan(), global::System.StringComparison.Ordinal) => true,
                _ => false,
            };
        }
#endif

        /// <summary>
        /// Converts the string representation of the name or numeric value of
        /// an <see cref="global::AddToCoffee" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::AddToCoffee" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::AddToCoffee" />. This parameter is passed uninitialized.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            string? name, 
            out global::AddToCoffee value)
            => TryParse(name, out value, false, false);

        /// <summary>
        /// Converts the string representation of the name or numeric value of
        /// an <see cref="global::AddToCoffee" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The string representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::AddToCoffee" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::AddToCoffee" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            string? name, 
            out global::AddToCoffee value,
            bool ignoreCase) 
            => TryParse(name, out value, ignoreCase, false);

        /// <summary>
        /// Converts the string representation of the name or numeric value of
        /// an <see cref="global::AddToCoffee" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The string representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::AddToCoffee" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::AddToCoffee" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value included in metadata attributes such as
        /// <c>[Display]</c> attribute when parsing, otherwise only considers the member names.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            string? name, 
            out global::AddToCoffee value, 
            bool ignoreCase, 
            bool allowMatchingMetadataAttribute)
        {
            if (ignoreCase)
            {
                switch (name)
                {
                    case string s when s.Equals(nameof(global::AddToCoffee.None), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::AddToCoffee.None;
                        return true;
                    case string s when s.Equals(nameof(global::AddToCoffee.Milk), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::AddToCoffee.Milk;
                        return true;
                    case string s when s.Equals(nameof(global::AddToCoffee.Sugar), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::AddToCoffee.Sugar;
                        return true;
                    case string s when s.Equals(nameof(global::AddToCoffee.Biscuit), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::AddToCoffee.Biscuit;
                        return true;
                    case string s when int.TryParse(name, out var val):
                        value = (global::AddToCoffee)val;
                        return true;
                    default:
                        value = default;
                        return false;
                }
            }
            else
            {
                switch (name)
                {
                    case nameof(global::AddToCoffee.None):
                        value = global::AddToCoffee.None;
                        return true;
                    case nameof(global::AddToCoffee.Milk):
                        value = global::AddToCoffee.Milk;
                        return true;
                    case nameof(global::AddToCoffee.Sugar):
                        value = global::AddToCoffee.Sugar;
                        return true;
                    case nameof(global::AddToCoffee.Biscuit):
                        value = global::AddToCoffee.Biscuit;
                        return true;
                    case string s when int.TryParse(name, out var val):
                        value = (global::AddToCoffee)val;
                        return true;
                    default:
                        value = default;
                        return false;
                }
            }
        }

#if NETCOREAPP && !NETCOREAPP2_0 && !NETCOREAPP1_1 && !NETCOREAPP1_0
        /// <summary>
        /// Converts the span representation of the name or numeric value of
        /// an <see cref="global::AddToCoffee" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The span representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::AddToCoffee" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::AddToCoffee" />. This parameter is passed uninitialized.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            in ReadOnlySpan<char> name, 
            out global::AddToCoffee value)
            => TryParse(name, out value, false, false);

        /// <summary>
        /// Converts the span representation of the name or numeric value of
        /// an <see cref="global::AddToCoffee" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The span representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::AddToCoffee" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::AddToCoffee" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            in ReadOnlySpan<char> name, 
            out global::AddToCoffee value,
            bool ignoreCase) 
            => TryParse(name, out value, ignoreCase, false);

        /// <summary>
        /// Converts the span representation of the name or numeric value of
        /// an <see cref="global::AddToCoffee" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The span representation of the enumeration name or underlying value to convert</param>
        /// <param name="result">When this method returns, contains an object of type 
        /// <see cref="global::AddToCoffee" /> whose
        /// value is represented by <paramref name="result"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::AddToCoffee" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value included in metadata attributes such as
        /// <c>[Display]</c> attribute when parsing, otherwise only considers the member names.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            in ReadOnlySpan<char> name, 
            out global::AddToCoffee result, 
            bool ignoreCase,             
            bool allowMatchingMetadataAttribute)
        {
            if (ignoreCase)
            {
                switch (name)
                {
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.None).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::AddToCoffee.None;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Milk).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::AddToCoffee.Milk;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Sugar).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::AddToCoffee.Sugar;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Biscuit).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::AddToCoffee.Biscuit;
                        return true;
                    case ReadOnlySpan<char> current when int.TryParse(name, out var numericResult):
                        result = (global::AddToCoffee)numericResult;
                        return true;
                    default:
                        result = default;
                        return false;
                }
            }
            else
            {
                switch (name)
                {
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.None).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::AddToCoffee.None;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Milk).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::AddToCoffee.Milk;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Sugar).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::AddToCoffee.Sugar;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::AddToCoffee.Biscuit).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::AddToCoffee.Biscuit;
                        return true;
                    case ReadOnlySpan<char> current when int.TryParse(name, out var numericResult):
                        result = (global::AddToCoffee)numericResult;
                        return true;
                    default:
                        result = default;
                        return false;
                }
            }
        }
#endif

        /// <summary>
        /// Retrieves an array of the values of the members defined in
        /// <see cref="global::AddToCoffee" />.
        /// Note that this returns a new array with every invocation, so
        /// should be cached if appropriate.
        /// </summary>
        /// <returns>An array of the values defined in <see cref="global::AddToCoffee" /></returns>
        public static global::AddToCoffee[] GetValues()
        {
            return new[]
            {
                global::AddToCoffee.None,
                global::AddToCoffee.Milk,
                global::AddToCoffee.Sugar,
                global::AddToCoffee.Biscuit,
            };
        }

        /// <summary>
        /// Retrieves an array of the names of the members defined in
        /// <see cref="global::AddToCoffee" />.
        /// Note that this returns a new array with every invocation, so
        /// should be cached if appropriate.
        /// </summary>
        /// <returns>An array of the names of the members defined in <see cref="global::AddToCoffee" /></returns>
        public static string[] GetNames()
        {
            return new[]
            {
                nameof(global::AddToCoffee.None),
                nameof(global::AddToCoffee.Milk),
                nameof(global::AddToCoffee.Sugar),
                nameof(global::AddToCoffee.Biscuit),
            };
        }
    }
```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NetEscapades.EnumGenerators\src\TestEnumEscapades\obj\GX\NetEscapades.EnumGenerators\NetEscapades.EnumGenerators.EnumGenerator\EnumExtensionsAttribute.g.cs" label="EnumExtensionsAttribute.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the NetEscapades.EnumGenerators source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable

#if NETESCAPADES_ENUMGENERATORS_EMBED_ATTRIBUTES
namespace NetEscapades.EnumGenerators
{
    /// <summary>
    /// Add to enums to indicate that extension methods should be generated for the type
    /// </summary>
    [global::System.AttributeUsage(global::System.AttributeTargets.Enum)]
    [global::System.Diagnostics.Conditional("NETESCAPADES_ENUMGENERATORS_USAGES")]
#if NET5_0_OR_GREATER
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage(Justification = "Generated by the NetEscapades.EnumGenerators source generator.")]
#else
    [global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
#endif
    public class EnumExtensionsAttribute : global::System.Attribute
    {
        /// <summary>
        /// The namespace to generate the extension class.
        /// If not provided the namespace of the enum will be used
        /// </summary>
        public string? ExtensionClassNamespace { get; set; }

        /// <summary>
        /// The name to use for the extension class.
        /// If not provided, the enum name with "Extensions" will be used.
        /// For example for an Enum called StatusCodes, the default name
        /// will be StatusCodesExtensions
        /// </summary>
        public string? ExtensionClassName { get; set; }
    }
}
#endif

```

  </TabItem>


<TabItem value="C:\gth\RSCG_Examples\v2\rscg_examples\NetEscapades.EnumGenerators\src\TestEnumEscapades\obj\GX\NetEscapades.EnumGenerators\NetEscapades.EnumGenerators.EnumGenerator\InstallTypeExtensions_EnumExtensions.g.cs" label="InstallTypeExtensions_EnumExtensions.g.cs" >


```csharp showLineNumbers 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the NetEscapades.EnumGenerators source generator
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

#nullable enable
#if NETCOREAPP && !NETCOREAPP2_0 && !NETCOREAPP1_1 && !NETCOREAPP1_0
using System;
#endif

    /// <summary>
    /// Extension methods for <see cref="global::InstallType" />
    /// </summary>
    internal static partial class InstallTypeExtensions
    {
        /// <summary>
        /// The number of members in the enum.
        /// This is a non-distinct count of defined names.
        /// </summary>
        public const int Length = 3;

        /// <summary>
        /// Returns the string representation of the <see cref="global::InstallType"/> value.
        /// If the attribute is decorated with a <c>[Display]</c> attribute, then
        /// uses the provided value. Otherwise uses the name of the member, equivalent to
        /// calling <c>ToString()</c> on <paramref name="value"/>.
        /// </summary>
        /// <param name="value">The value to retrieve the string value for</param>
        /// <returns>The string representation of the value</returns>
        public static string ToStringFast(this global::InstallType value)
            => value switch
            {
                global::InstallType.None => "Please use one of the flags of InstallType",
                global::InstallType.ShowGUI => nameof(global::InstallType.ShowGUI),
                global::InstallType.ShowNoGui => nameof(global::InstallType.ShowNoGui),
                _ => value.ToString(),
            };

        /// <summary>
        /// Returns a boolean telling whether the given enum value exists in the enumeration.
        /// </summary>
        /// <param name="value">The value to check if it's defined</param>
        /// <returns><c>true</c> if the value exists in the enumeration, <c>false</c> otherwise</returns>
       public static bool IsDefined(global::InstallType value)
            => value switch
            {
                global::InstallType.None => true,
                global::InstallType.ShowGUI => true,
                global::InstallType.ShowNoGui => true,
                _ => false,
            };

        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration.
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, <c>false</c> otherwise</returns>
        public static bool IsDefined(string name) => IsDefined(name, allowMatchingMetadataAttribute: false);

        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration,
        /// or if a member decorated with a <c>[Display]</c> attribute
        /// with the required name exists.
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value of metadata attributes,otherwise ignores them</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, or a member is decorated
        /// with a <c>[Display]</c> attribute with the name, <c>false</c> otherwise</returns>
        public static bool IsDefined(string name, bool allowMatchingMetadataAttribute)
        {
            var isDefinedInDisplayAttribute = false;
            if (allowMatchingMetadataAttribute)
            {
                isDefinedInDisplayAttribute = name switch
                {
                    "Please use one of the flags of InstallType" => true,
                    _ => false,
                };
            }

            if (isDefinedInDisplayAttribute)
            {
                return true;
            }

            
            return name switch
            {
                nameof(global::InstallType.None) => true,
                nameof(global::InstallType.ShowGUI) => true,
                nameof(global::InstallType.ShowNoGui) => true,
                _ => false,
            };
        }

#if NETCOREAPP && !NETCOREAPP2_0 && !NETCOREAPP1_1 && !NETCOREAPP1_0
        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, <c>false</c> otherwise</returns>
        public static bool IsDefined(in ReadOnlySpan<char> name) => IsDefined(name, allowMatchingMetadataAttribute: false);

        /// <summary>
        /// Returns a boolean telling whether an enum with the given name exists in the enumeration,
        /// or optionally if a member decorated with a <c>[Display]</c> attribute
        /// with the required name exists.
        /// Slower then the <see cref="IsDefined(string, bool)" /> overload, but doesn't allocate memory./>
        /// </summary>
        /// <param name="name">The name to check if it's defined</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value of metadata attributes,otherwise ignores them</param>
        /// <returns><c>true</c> if a member with the name exists in the enumeration, or a member is decorated
        /// with a <c>[Display]</c> attribute with the name, <c>false</c> otherwise</returns>
        public static bool IsDefined(in ReadOnlySpan<char> name, bool allowMatchingMetadataAttribute)
        {
            var isDefinedInDisplayAttribute = false;
            if (allowMatchingMetadataAttribute)
            {
                isDefinedInDisplayAttribute = name switch
                {
                    ReadOnlySpan<char> current when current.Equals("Please use one of the flags of InstallType".AsSpan(), global::System.StringComparison.Ordinal) => true,
                    _ => false,
                };
            }

            if (isDefinedInDisplayAttribute)
            {
                return true;
            }

            return name switch
            {
                ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.None).AsSpan(), global::System.StringComparison.Ordinal) => true,
                ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.ShowGUI).AsSpan(), global::System.StringComparison.Ordinal) => true,
                ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.ShowNoGui).AsSpan(), global::System.StringComparison.Ordinal) => true,
                _ => false,
            };
        }
#endif

        /// <summary>
        /// Converts the string representation of the name or numeric value of
        /// an <see cref="global::InstallType" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The case-sensitive string representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::InstallType" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::InstallType" />. This parameter is passed uninitialized.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            string? name, 
            out global::InstallType value)
            => TryParse(name, out value, false, false);

        /// <summary>
        /// Converts the string representation of the name or numeric value of
        /// an <see cref="global::InstallType" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The string representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::InstallType" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::InstallType" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            string? name, 
            out global::InstallType value,
            bool ignoreCase) 
            => TryParse(name, out value, ignoreCase, false);

        /// <summary>
        /// Converts the string representation of the name or numeric value of
        /// an <see cref="global::InstallType" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The string representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::InstallType" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::InstallType" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value included in metadata attributes such as
        /// <c>[Display]</c> attribute when parsing, otherwise only considers the member names.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            string? name, 
            out global::InstallType value, 
            bool ignoreCase, 
            bool allowMatchingMetadataAttribute)
        {
            if (allowMatchingMetadataAttribute)
            {
                if (ignoreCase)
                {
                    switch (name)
                    {
                        case string s when s.Equals("Please use one of the flags of InstallType", global::System.StringComparison.OrdinalIgnoreCase):
                            value = global::InstallType.None;
                            return true;
                        default:
                            break;
                    };
                }
                else
                {
                    switch (name)
                    {
                        case "Please use one of the flags of InstallType":
                            value = global::InstallType.None;
                            return true;
                        default:
                            break;
                    };
                }
            }

            if (ignoreCase)
            {
                switch (name)
                {
                    case string s when s.Equals(nameof(global::InstallType.None), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::InstallType.None;
                        return true;
                    case string s when s.Equals(nameof(global::InstallType.ShowGUI), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::InstallType.ShowGUI;
                        return true;
                    case string s when s.Equals(nameof(global::InstallType.ShowNoGui), global::System.StringComparison.OrdinalIgnoreCase):
                        value = global::InstallType.ShowNoGui;
                        return true;
                    case string s when int.TryParse(name, out var val):
                        value = (global::InstallType)val;
                        return true;
                    default:
                        value = default;
                        return false;
                }
            }
            else
            {
                switch (name)
                {
                    case nameof(global::InstallType.None):
                        value = global::InstallType.None;
                        return true;
                    case nameof(global::InstallType.ShowGUI):
                        value = global::InstallType.ShowGUI;
                        return true;
                    case nameof(global::InstallType.ShowNoGui):
                        value = global::InstallType.ShowNoGui;
                        return true;
                    case string s when int.TryParse(name, out var val):
                        value = (global::InstallType)val;
                        return true;
                    default:
                        value = default;
                        return false;
                }
            }
        }

#if NETCOREAPP && !NETCOREAPP2_0 && !NETCOREAPP1_1 && !NETCOREAPP1_0
        /// <summary>
        /// Converts the span representation of the name or numeric value of
        /// an <see cref="global::InstallType" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The span representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::InstallType" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::InstallType" />. This parameter is passed uninitialized.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            in ReadOnlySpan<char> name, 
            out global::InstallType value)
            => TryParse(name, out value, false, false);

        /// <summary>
        /// Converts the span representation of the name or numeric value of
        /// an <see cref="global::InstallType" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The span representation of the enumeration name or underlying value to convert</param>
        /// <param name="value">When this method returns, contains an object of type 
        /// <see cref="global::InstallType" /> whose
        /// value is represented by <paramref name="value"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::InstallType" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            in ReadOnlySpan<char> name, 
            out global::InstallType value,
            bool ignoreCase) 
            => TryParse(name, out value, ignoreCase, false);

        /// <summary>
        /// Converts the span representation of the name or numeric value of
        /// an <see cref="global::InstallType" /> to the equivalent instance.
        /// The return value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="name">The span representation of the enumeration name or underlying value to convert</param>
        /// <param name="result">When this method returns, contains an object of type 
        /// <see cref="global::InstallType" /> whose
        /// value is represented by <paramref name="result"/> if the parse operation succeeds.
        /// If the parse operation fails, contains the default value of the underlying type
        /// of <see cref="global::InstallType" />. This parameter is passed uninitialized.</param>
        /// <param name="ignoreCase"><c>true</c> to read value in case insensitive mode; <c>false</c> to read value in case sensitive mode.</param>
        /// <param name="allowMatchingMetadataAttribute">If <c>true</c>, considers the value included in metadata attributes such as
        /// <c>[Display]</c> attribute when parsing, otherwise only considers the member names.</param>
        /// <returns><c>true</c> if the value parameter was converted successfully; otherwise, <c>false</c>.</returns>
        public static bool TryParse(
#if NETCOREAPP3_0_OR_GREATER
            [global::System.Diagnostics.CodeAnalysis.NotNullWhen(true)]
#endif
            in ReadOnlySpan<char> name, 
            out global::InstallType result, 
            bool ignoreCase,             
            bool allowMatchingMetadataAttribute)
        {
            if (allowMatchingMetadataAttribute)
            {
                if (ignoreCase)
                {
                    switch (name)
                    {
                        case ReadOnlySpan<char> current when current.Equals("Please use one of the flags of InstallType".AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                            result = global::InstallType.None;
                            return true;
                        default:
                            break;
                    };
                }
                else
                {
                    switch (name)
                    {
                        case ReadOnlySpan<char> current when current.Equals("Please use one of the flags of InstallType".AsSpan(), global::System.StringComparison.Ordinal):
                            result = global::InstallType.None;
                            return true;
                        default:
                            break;
                    };
                }
            }

            if (ignoreCase)
            {
                switch (name)
                {
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.None).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::InstallType.None;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.ShowGUI).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::InstallType.ShowGUI;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.ShowNoGui).AsSpan(), global::System.StringComparison.OrdinalIgnoreCase):
                        result = global::InstallType.ShowNoGui;
                        return true;
                    case ReadOnlySpan<char> current when int.TryParse(name, out var numericResult):
                        result = (global::InstallType)numericResult;
                        return true;
                    default:
                        result = default;
                        return false;
                }
            }
            else
            {
                switch (name)
                {
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.None).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::InstallType.None;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.ShowGUI).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::InstallType.ShowGUI;
                        return true;
                    case ReadOnlySpan<char> current when current.Equals(nameof(global::InstallType.ShowNoGui).AsSpan(), global::System.StringComparison.Ordinal):
                        result = global::InstallType.ShowNoGui;
                        return true;
                    case ReadOnlySpan<char> current when int.TryParse(name, out var numericResult):
                        result = (global::InstallType)numericResult;
                        return true;
                    default:
                        result = default;
                        return false;
                }
            }
        }
#endif

        /// <summary>
        /// Retrieves an array of the values of the members defined in
        /// <see cref="global::InstallType" />.
        /// Note that this returns a new array with every invocation, so
        /// should be cached if appropriate.
        /// </summary>
        /// <returns>An array of the values defined in <see cref="global::InstallType" /></returns>
        public static global::InstallType[] GetValues()
        {
            return new[]
            {
                global::InstallType.None,
                global::InstallType.ShowGUI,
                global::InstallType.ShowNoGui,
            };
        }

        /// <summary>
        /// Retrieves an array of the names of the members defined in
        /// <see cref="global::InstallType" />.
        /// Note that this returns a new array with every invocation, so
        /// should be cached if appropriate.
        /// </summary>
        /// <returns>An array of the names of the members defined in <see cref="global::InstallType" /></returns>
        public static string[] GetNames()
        {
            return new[]
            {
                nameof(global::InstallType.None),
                nameof(global::InstallType.ShowGUI),
                nameof(global::InstallType.ShowNoGui),
            };
        }
    }
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project NetEscapades.EnumGenerators ](/sources/NetEscapades.EnumGenerators.zip)

:::


### Share NetEscapades.EnumGenerators 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetEscapades.EnumGenerators&quote=NetEscapades.EnumGenerators" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetEscapades.EnumGenerators&text=NetEscapades.EnumGenerators:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetEscapades.EnumGenerators" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetEscapades.EnumGenerators&title=NetEscapades.EnumGenerators" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetEscapades.EnumGenerators&title=NetEscapades.EnumGenerators&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FNetEscapades.EnumGenerators" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/NetEscapades.EnumGenerators

## In the same category (EnhancementClass)


### [ApparatusAOT](/docs/ApparatusAOT)


### [BenutomoAutomaticDisposeImplSourceGenerator](/docs/BenutomoAutomaticDisposeImplSourceGenerator)


### [EnumClass](/docs/EnumClass)


### [FastGenericNew](/docs/FastGenericNew)


### [GeneratorEquals](/docs/GeneratorEquals)


### [Immutype](/docs/Immutype)


### [Lombok.NET](/docs/Lombok.NET)


### [M31.FluentAPI](/docs/M31.FluentAPI)


### [MemoryPack](/docs/MemoryPack)


### [Microsoft.Extensions.Logging](/docs/Microsoft.Extensions.Logging)


### [Microsoft.Interop.JavaScript.JSImportGenerator](/docs/Microsoft.Interop.JavaScript.JSImportGenerator)


### [MorrisMoxy](/docs/MorrisMoxy)


### [Roozie.AutoInterface](/docs/Roozie.AutoInterface)


### [RSCG_Static](/docs/RSCG_Static)


### [SyncMethodGenerator](/docs/SyncMethodGenerator)


### [System.Runtime.InteropServices](/docs/System.Runtime.InteropServices)


### [System.Text.RegularExpressions](/docs/System.Text.RegularExpressions)

