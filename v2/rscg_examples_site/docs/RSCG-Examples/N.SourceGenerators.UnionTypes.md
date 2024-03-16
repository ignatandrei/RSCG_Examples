---
sidebar_position: 810
title: 81 - N.SourceGenerators.UnionTypes
description: Generating different union types
slug: /N.SourceGenerators.UnionTypes
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# N.SourceGenerators.UnionTypes  by Alexey Sosnin


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/N.SourceGenerators.UnionTypes?label=N.SourceGenerators.UnionTypes)](https://www.nuget.org/packages/N.SourceGenerators.UnionTypes/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Ne4to/N.SourceGenerators.UnionTypes?label=updated)](https://github.com/Ne4to/N.SourceGenerators.UnionTypes)
![GitHub Repo stars](https://img.shields.io/github/stars/Ne4to/N.SourceGenerators.UnionTypes?style=social)

## Details

### Info
:::info

Name: **N.SourceGenerators.UnionTypes**

Discriminated union type source generator

Author: Alexey Sosnin

NuGet: 
*https://www.nuget.org/packages/N.SourceGenerators.UnionTypes/*   


You can find more details at https://github.com/Ne4to/N.SourceGenerators.UnionTypes

Source : https://github.com/Ne4to/N.SourceGenerators.UnionTypes

:::

### Original Readme
:::note

# N.SourceGenerators.UnionTypes
Discriminated union type source generator

## Motivation
C# doesn't support discriminated unions yet. This source generator helps automate writing union types with set of helper methods.

## Getting Started
Add package reference to `N.SourceGenerators.UnionTypes`
```shell
dotnet add package N.SourceGenerators.UnionTypes
```
Create a partial class or struct that will be used as a union type
```csharp
public partial class FooResult
{
}
```
Add types you want to use in a discriminated union
```csharp
public record Success(int Value);
public record ValidationError(string Message);
public record NotFoundError;

public partial class FooResult
{
}
```
Add `N.SourceGenerators.UnionTypes.UnionTypeAttribute` to a union type.
```csharp
using N.SourceGenerators.UnionTypes;

public record Success(int Value);
public record ValidationError(string Message);
public record NotFoundError;

[UnionType(typeof(Success))]
[UnionType(typeof(ValidationError))]
[UnionType(typeof(NotFoundError))]
public partial class FooResult
{
}
```
Or you can use generic type.
```csharp
public partial class OperationDataResult<[GenericUnionType] TResult, [GenericUnionType] TError>
{
}

// extend generic type union with additional Int32 type
[UnionType(typeof(int))]
public partial class ExtendedOperationDataResult<[GenericUnionType] TResult, [GenericUnionType] TError>
{
}
```
Null values are not allowed by default. This behavior can be overriden by `AllowNull = true` parameter.
```csharp
[UnionType(typeof(int?), AllowNull = true)]
[UnionType(typeof(string), AllowNull = true)]
public partial class ResultNullable<[GenericUnionType(AllowNull = true)] T>
{
}
```

## Examples

All examples can be found in [examples project](https://github.com/Ne4to/N.SourceGenerators.UnionTypes/blob/main/examples/N.SourceGenerators.UnionTypes.Examples/Program.cs)

### Basic

Implicit conversion
```csharp
public FooResult ImplicitReturn()
{
    // you can return any union type variation without creating FooResult
    return new NotFoundError();
}
```
Explicit conversion
```csharp
public ValidationError ExplicitCast(FooResult result)
{
    return (ValidationError)result;
}
```
Checking value type
```csharp
public void ValueTypeProperty()
{
    FooResult foo = GetFoo();
    Type valueType = foo.ValueType; // returns typeof(NotFoundError)

    static FooResult GetFoo()
    {
        return new NotFoundError();
    }
}
```
TryGet method is used to check if union contains a specific type
```csharp
public void TryGetValue()
{
    FooResult foo = GetFoo();
    if (foo.TryGetNotFoundError(out var notFoundError))
    {
        // make something with notFoundError
    }

    static FooResult GetFoo()
    {
        return new NotFoundError();
    }
}
```
Alias for each variant is generated based on type name. Use alias parameter to override it.
```csharp
[UnionType(typeof(int))]
[UnionType(typeof(string))]
// default alias is 'ArrayOfTupleOfIntAndString' but it is overriden by alias parameter
[UnionType(typeof(Tuple<int,string>[]), alias: "Items")]
public partial class AliasResult
{
}
```

### Handle all variants

Match and MatchAsync methods are used to convert union type to another type. These methods force you to handle all possible variations.
```csharp
public IActionResult MatchMethod(FooResult result)
{
    return result.Match<IActionResult>(
        success => new OkResult(),
        validationError => new BadRequestResult(),
        notFoundError => new NotFoundResult()
    );
}

public async Task<IActionResult> MatchAsyncMethod(FooResult result, CancellationToken cancellationToken)
{
    return await result.MatchAsync<IActionResult>(
        static async (success, ct) =>
        {
            await SomeWork(success, ct);
            return new OkResult();
        }, static async (validationError, ct) =>
        {
            await SomeWork(validationError, ct);
            return new BadRequestResult();
        }, static async (notFoundError, ct) =>
        {
            await SomeWork(notFoundError, ct);
            return new NotFoundResult();
        }, cancellationToken);

    static Task SomeWork<T>(T value, CancellationToken ct)
    {
        return Task.Delay(100, ct);
    }
}
```
Switch and SwitchAsync methods are used to execute some work based on inner type
```csharp
 public void SwitchMethod(FooResult result)
{
    result.Switch(
        success => SomeWork(success),
        validationError => SomeWork(validationError),
        notFoundError => SomeWork(notFoundError)
    );

    static void SomeWork<T>(T value)
    {
        throw new NotImplementedException();
    }
}

public async Task SwitchAsyncMethod(FooResult result, CancellationToken cancellationToken)
{
    await result.SwitchAsync(
        static async (success, ct) =>
        {
            await SomeWork(success, ct);
        }, static async (validationError, ct) =>
        {
            await SomeWork(validationError, ct);
        }, static async (notFoundError, ct) =>
        {
            await SomeWork(notFoundError, ct);
        }, cancellationToken);

    static Task SomeWork<T>(T value, CancellationToken ct)
    {
        return Task.Delay(100, ct);
    }
}
```

### JSON serialization (EXPERIMENTAL)

To add JSON support
- add `JsonPolymorphicUnion` attribute to union type
- add `TypeDiscriminator` to each type variant

#### Limitations:
- .NET 7 or newer
- only complex type variants

#### Example
```csharp
[UnionType(typeof(JsonTestsFooJ), TypeDiscriminator = "Foo")]
[UnionType(typeof(JsonTestsBarJ), TypeDiscriminator = "Bar")]
[JsonPolymorphicUnion]
public partial class JsonTestsUnion
{
}
```

### Union to union converter

When one union type's variants is subset of another union type's variants use one of the following attributes to convert one type to another: `UnionConverterTo`, `UnionConverterFrom`, or `UnionConverter`.

```csharp
[UnionConverterFrom(typeof(DataAccessResult))] // use this attribute
public partial class BusinessLogicResult
{
}

[UnionConverterTo(typeof(BusinessLogicResult))] // OR this
public partial class DataAccessResult
{
}

[UnionConverter(typeof(DataAccessResult), typeof(BusinessLogicResult))] // OR this
public static partial class Converters
{
}

public class Repository
{
    public DataAccessResult UpdateItem()
    {
        return new NotFoundError();
    }
}

public class Service
{
    private readonly Repository _repository;

    public BusinessLogicResult Update()
    {
        var isValid = IsValid();
        if (!isValid)
        {
            return new ValidationError("the item is not valid");
        }

        var repositoryResult = _repository.UpdateItem();
        // implicit conversion DataAccessResult to BusinessLogicResult when `UnionConverterTo` or `UnionConverterFrom` attribute is used
        return repositoryResult;
        // OR extension method when UnionConverter attribute is used
        return repositoryResult.Convert();
    }

    private bool IsValid() => throw new NotImplementedException();
}
```

:::

### About
:::note

Generating different union types


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **N.SourceGenerators.UnionTypes**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="N.SourceGenerators.UnionTypes" Version="0.26.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\Program.cs" label="Program.cs" >

  This is the use of **N.SourceGenerators.UnionTypes** in *Program.cs*

```csharp showLineNumbers 
using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
Console.WriteLine(data.IsValidationError);
data = SaveToDatabase.Save(1);
Console.WriteLine(data.IsSuccess);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\ResultSave.cs" label="ResultSave.cs" >

  This is the use of **N.SourceGenerators.UnionTypes** in *ResultSave.cs*

```csharp showLineNumbers 
using N.SourceGenerators.UnionTypes;
namespace UnionTypesDemo;
public record Success(int Value);
public record ValidationError(string Message);

[UnionType(typeof(Success))]
[UnionType(typeof(ValidationError))]
public partial class ResultSave
{
}



```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\SaveToDatabase.cs" label="SaveToDatabase.cs" >

  This is the use of **N.SourceGenerators.UnionTypes** in *SaveToDatabase.cs*

```csharp showLineNumbers 
namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {
        if(i ==0)
        {
            return new ValidationError(" cannot save 0");
        }
        return new Success(i);
    }
}



```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\GenericUnionTypeAttribute.g.cs" label="GenericUnionTypeAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//   This code was generated by https://github.com/Ne4to/N.SourceGenerators.UnionTypes
//   Feel free to open an issue
// </auto-generated>
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace N.SourceGenerators.UnionTypes
{
    [AttributeUsage(AttributeTargets.GenericParameter, Inherited = false, AllowMultiple = false)]
    internal sealed class GenericUnionTypeAttribute : Attribute
    {
        public string? Alias { get; set; }
        public bool AllowNull { get; set; }
        public object? TypeDiscriminator { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\JsonPolymorphicUnionAttribute.g.cs" label="JsonPolymorphicUnionAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//   This code was generated by https://github.com/Ne4to/N.SourceGenerators.UnionTypes
//   Feel free to open an issue
// </auto-generated>
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace N.SourceGenerators.UnionTypes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false, AllowMultiple = false)]
    internal sealed class JsonPolymorphicUnionAttribute : Attribute
    {
        public string? TypeDiscriminatorPropertyName { get; set; }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\ResultSave.g.cs" label="ResultSave.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//   This code was generated by https://github.com/Ne4to/N.SourceGenerators.UnionTypes
//   Feel free to open an issue
// </auto-generated>
#pragma warning disable
#nullable enable
namespace UnionTypesDemo
{
    partial class ResultSave : System.IEquatable<ResultSave>
    {
        private readonly int _variantId;
        private const int SuccessId = 1;
        private readonly global::UnionTypesDemo.Success _success;
        public bool IsSuccess => _variantId == SuccessId;

        public global::UnionTypesDemo.Success AsSuccess
        {
            get
            {
                if (_variantId == SuccessId)
                    return _success;
                throw new System.InvalidOperationException($"Unable convert to Success. Inner value is {ValueAlias} not Success.");
            }
        }

        public ResultSave(global::UnionTypesDemo.Success success)
        {
            System.ArgumentNullException.ThrowIfNull(success);
            _variantId = SuccessId;
            _success = success;
        }

        public static implicit operator ResultSave(global::UnionTypesDemo.Success success) => new ResultSave(success);
        public static explicit operator global::UnionTypesDemo.Success(ResultSave value)
        {
            if (value._variantId == SuccessId)
                return value._success;
            throw new System.InvalidOperationException($"Unable convert to Success. Inner value is {value.ValueAlias} not Success.");
        }

        public bool TryGetSuccess([System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out global::UnionTypesDemo.Success value)
        {
            if (_variantId == SuccessId)
            {
                value = _success;
                return true;
            }
            else
            {
                value = default;
                return false;
            }
        }

        private const int ValidationErrorId = 2;
        private readonly global::UnionTypesDemo.ValidationError _validationError;
        public bool IsValidationError => _variantId == ValidationErrorId;

        public global::UnionTypesDemo.ValidationError AsValidationError
        {
            get
            {
                if (_variantId == ValidationErrorId)
                    return _validationError;
                throw new System.InvalidOperationException($"Unable convert to ValidationError. Inner value is {ValueAlias} not ValidationError.");
            }
        }

        public ResultSave(global::UnionTypesDemo.ValidationError validationError)
        {
            System.ArgumentNullException.ThrowIfNull(validationError);
            _variantId = ValidationErrorId;
            _validationError = validationError;
        }

        public static implicit operator ResultSave(global::UnionTypesDemo.ValidationError validationError) => new ResultSave(validationError);
        public static explicit operator global::UnionTypesDemo.ValidationError(ResultSave value)
        {
            if (value._variantId == ValidationErrorId)
                return value._validationError;
            throw new System.InvalidOperationException($"Unable convert to ValidationError. Inner value is {value.ValueAlias} not ValidationError.");
        }

        public bool TryGetValidationError([System.Diagnostics.CodeAnalysis.NotNullWhen(true)] out global::UnionTypesDemo.ValidationError value)
        {
            if (_variantId == ValidationErrorId)
            {
                value = _validationError;
                return true;
            }
            else
            {
                value = default;
                return false;
            }
        }

        public TOut Match<TOut>(global::System.Func<global::UnionTypesDemo.Success, TOut> matchSuccess, global::System.Func<global::UnionTypesDemo.ValidationError, TOut> matchValidationError)
        {
            if (_variantId == SuccessId)
                return matchSuccess(_success);
            if (_variantId == ValidationErrorId)
                return matchValidationError(_validationError);
            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public async global::System.Threading.Tasks.Task<TOut> MatchAsync<TOut>(global::System.Func<global::UnionTypesDemo.Success, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TOut>> matchSuccess, global::System.Func<global::UnionTypesDemo.ValidationError, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task<TOut>> matchValidationError, global::System.Threading.CancellationToken ct)
        {
            if (_variantId == SuccessId)
                return await matchSuccess(_success, ct).ConfigureAwait(false);
            if (_variantId == ValidationErrorId)
                return await matchValidationError(_validationError, ct).ConfigureAwait(false);
            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public void Switch(global::System.Action<global::UnionTypesDemo.Success> switchSuccess, global::System.Action<global::UnionTypesDemo.ValidationError> switchValidationError)
        {
            if (_variantId == SuccessId)
            {
                switchSuccess(_success);
                return;
            }

            if (_variantId == ValidationErrorId)
            {
                switchValidationError(_validationError);
                return;
            }

            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public async global::System.Threading.Tasks.Task SwitchAsync(global::System.Func<global::UnionTypesDemo.Success, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> switchSuccess, global::System.Func<global::UnionTypesDemo.ValidationError, global::System.Threading.CancellationToken, global::System.Threading.Tasks.Task> switchValidationError, global::System.Threading.CancellationToken ct)
        {
            if (_variantId == SuccessId)
            {
                await switchSuccess(_success, ct).ConfigureAwait(false);
                return;
            }

            if (_variantId == ValidationErrorId)
            {
                await switchValidationError(_validationError, ct).ConfigureAwait(false);
                return;
            }

            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public global::System.Type ValueType
        {
            get
            {
                if (_variantId == SuccessId)
                    return typeof(global::UnionTypesDemo.Success);
                if (_variantId == ValidationErrorId)
                    return typeof(global::UnionTypesDemo.ValidationError);
                throw new System.InvalidOperationException("Inner type is unknown");
            }
        }

        private string ValueAlias
        {
            get
            {
                if (_variantId == SuccessId)
                    return "Success";
                if (_variantId == ValidationErrorId)
                    return "ValidationError";
                throw new System.InvalidOperationException("Inner type is unknown");
            }
        }

        public override int GetHashCode()
        {
            if (_variantId == SuccessId)
                return _success.GetHashCode();
            if (_variantId == ValidationErrorId)
                return _validationError.GetHashCode();
            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public static bool operator ==(ResultSave? left, ResultSave? right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(ResultSave? left, ResultSave? right)
        {
            return !Equals(left, right);
        }

        public bool Equals(ResultSave? other)
        {
            if (ReferenceEquals(null, other))
            {
                return false;
            }

            if (ReferenceEquals(this, other))
            {
                return true;
            }

            if (ValueType != other.ValueType)
            {
                return false;
            }

            if (_variantId == SuccessId)
                return System.Collections.Generic.EqualityComparer<global::UnionTypesDemo.Success>.Default.Equals(_success, other._success);
            if (_variantId == ValidationErrorId)
                return System.Collections.Generic.EqualityComparer<global::UnionTypesDemo.ValidationError>.Default.Equals(_validationError, other._validationError);
            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public override string ToString()
        {
            if (_variantId == SuccessId)
                return _success.ToString();
            if (_variantId == ValidationErrorId)
                return _validationError.ToString();
            throw new System.InvalidOperationException("Inner type is unknown");
        }

        public override bool Equals(object? other)
        {
            if (ReferenceEquals(null, other))
            {
                return false;
            }

            if (ReferenceEquals(this, other))
            {
                return true;
            }

            if (other.GetType() != typeof(ResultSave))
            {
                return false;
            }

            return Equals((ResultSave)other);
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\UnionConverterAttribute.g.cs" label="UnionConverterAttribute.g.cs" >


```csharp showLineNumbers 
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace N.SourceGenerators.UnionTypes
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
    sealed class UnionConverterAttribute : Attribute
    {
        public Type FromType { get; }
        public Type ToType { get; }
        public string? MethodName { get; }

        public UnionConverterAttribute(Type fromType, Type toType, string? methodName = null)
        {
            FromType = fromType;
            ToType = toType;
            MethodName = methodName;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\UnionConverterFromAttribute.g.cs" label="UnionConverterFromAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//   This code was generated by https://github.com/Ne4to/N.SourceGenerators.UnionTypes
//   Feel free to open an issue
// </auto-generated>
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace N.SourceGenerators.UnionTypes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false, AllowMultiple = true)]
    sealed class UnionConverterFromAttribute : Attribute
    {
        public Type FromType { get; }

        public UnionConverterFromAttribute(Type fromType)
        {
            FromType = fromType;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\UnionConverterToAttribute.g.cs" label="UnionConverterToAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//   This code was generated by https://github.com/Ne4to/N.SourceGenerators.UnionTypes
//   Feel free to open an issue
// </auto-generated>
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace N.SourceGenerators.UnionTypes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false, AllowMultiple = true)]
    sealed class UnionConverterToAttribute : Attribute
    {
        public Type ToType { get; }

        public UnionConverterToAttribute(Type toType)
        {
            ToType = toType;
        }
    }
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\N.SourceGenerators.UnionTypes\src\UnionTypesDemo\obj\GX\N.SourceGenerators.UnionTypes\N.SourceGenerators.UnionTypes.UnionTypesGenerator\UnionTypeAttribute.g.cs" label="UnionTypeAttribute.g.cs" >


```csharp showLineNumbers 
// <auto-generated>
//   This code was generated by https://github.com/Ne4to/N.SourceGenerators.UnionTypes
//   Feel free to open an issue
// </auto-generated>
#nullable enable
using System;
using System.Runtime.CompilerServices;

namespace N.SourceGenerators.UnionTypes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false, AllowMultiple = true)]
    internal sealed class UnionTypeAttribute : Attribute
    {
        public Type Type { get; }
        public string? Alias { get; }
        public int Order { get; }
        public bool AllowNull { get; set; }
        public object? TypeDiscriminator { get; set; }

        public UnionTypeAttribute(Type type, string? alias = null, [CallerLineNumber] int order = 0)
        {
            Type = type;
            Alias = alias;
            Order = order;
        }
    }
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project N.SourceGenerators.UnionTypes ](/sources/N.SourceGenerators.UnionTypes.zip)

:::


### Share N.SourceGenerators.UnionTypes 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FN.SourceGenerators.UnionTypes&quote=N.SourceGenerators.UnionTypes" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FN.SourceGenerators.UnionTypes&text=N.SourceGenerators.UnionTypes:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FN.SourceGenerators.UnionTypes" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FN.SourceGenerators.UnionTypes&title=N.SourceGenerators.UnionTypes" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FN.SourceGenerators.UnionTypes&title=N.SourceGenerators.UnionTypes&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FN.SourceGenerators.UnionTypes" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/N.SourceGenerators.UnionTypes

### In the same category (FunctionalProgramming) - 9 other generators


#### [cachesourcegenerator](/docs/cachesourcegenerator)


#### [dunet](/docs/dunet)


#### [Funcky.DiscriminatedUnion](/docs/Funcky.DiscriminatedUnion)


#### [FunicularSwitch](/docs/FunicularSwitch)


#### [OneOf](/docs/OneOf)


#### [PartiallyApplied](/docs/PartiallyApplied)


#### [RSCG_Utils_Memo](/docs/RSCG_Utils_Memo)


#### [TypeUtilities](/docs/TypeUtilities)


#### [UnionsGenerator](/docs/UnionsGenerator)

