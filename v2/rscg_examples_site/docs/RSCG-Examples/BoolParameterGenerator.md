---
sidebar_position: 2440
title: 244 - BoolParameterGenerator
description: Generate boolean enum types
slug: /BoolParameterGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveBool.mdx';

# BoolParameterGenerator  by Justin Buchanan


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/BoolParameterGenerator?label=BoolParameterGenerator)](https://www.nuget.org/packages/BoolParameterGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/9swampy/BoolEnumGenerator?label=updated)](https://github.com/9swampy/BoolEnumGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/9swampy/BoolEnumGenerator?style=social)

## Details

### Info
:::info

Name: **BoolParameterGenerator**

BoolParameterGenerator is a Roslyn analyzer and source generator that automatically creates replacement types for boolean parameters in C# code.
      This improves code readability and maintainability by replacing ambiguous bools with descriptive types.
      See the README for usage and examples.

Author: Justin Buchanan

NuGet: 
*https://www.nuget.org/packages/BoolParameterGenerator/*   


You can find more details at https://github.com/9swampy/BoolEnumGenerator

Source: https://github.com/9swampy/BoolEnumGenerator

:::

### Author
:::note
Justin Buchanan 
![Alt text](https://github.com/9swampy.png)
:::

### Original Readme
:::note

[![NuGet](https://img.shields.io/nuget/vpre/BoolParameterGenerator?label=NuGet)](https://www.nuget.org/packages/BoolParameterGenerator/)
[![Build Status](https://github.com/9swampy/BoolEnumGenerator/actions/workflows/nuget-publish.yml/badge.svg?branch=master)](https://github.com/9swampy/BoolEnumGenerator/actions/workflows/nuget-publish.yml)
# BoolParameterGenerator

**BoolParameterGenerator** is a Roslyn analyzer and source generator that automatically creates replacement types for boolean parameters in C# code. This improves readability and maintainability by replacing ambiguous `bool` parameters with strongly typed, descriptive alternatives.

## 🚫 Analyzer Rules Discouraging `bool` Parameters

Using raw `bool` parameters in method signatures is often discouraged because it reduces code readability and clarity. Calls like `SetFeature(true)` can be ambiguous without context, making the code harder to understand and maintain.

### Motivations for Avoiding `bool` Parameters

- **Improved readability:** Boolean parameters often obscure the intent of the method call.  
- **Explicit intent:** Descriptive enums or strong types clarify the purpose.  
- **Better API discoverability:** Strongly typed parameters enhance IntelliSense and documentation.  
- **Easier maintenance:** Clearer code reduces bugs and onboarding time.  
- **Extensibility:** Enums or wrappers allow for additional states beyond simple true/false.

### Popular Analyzers and Their Rules

- **SonarAnalyzer (SonarLint / SonarQube)**  
  Rule: [S1133 - Remove boolean parameters](https://rules.sonarsource.com/csharp/RSPEC-1133)  
  Flags methods with boolean parameters to encourage more meaningful alternatives.

- **Roslynator**  
  Rule: [RCS1155 - Avoid boolean parameters in methods](https://github.com/JosefPihrt/Roslynator/blob/master/docs/analyzers/RCS1155.md)  
  Suggests replacing boolean parameters with separate methods or enums for better readability.

- **StyleCop Analyzers**  
  While no specific rule bans boolean parameters, StyleCop encourages clear, descriptive API design that indirectly discourages ambiguous booleans.

### How BoolParameterGenerator Addresses These Issues

- Generates strongly typed, descriptive replacements for `bool` parameters.  
- Improves code clarity, intent, and discoverability.  
- Enables future extensibility beyond binary states.  
- Helps maintain cleaner and more maintainable APIs.

---

## ✨ Features

- Replaces `bool` parameters with source-generated binary types.
- Supports generation of:
  - Binary enums
  - Struct-backed bool wrappers
- Seamless integration with IntelliSense and analyzers.
- Minimal configuration required.

---

## 📦 Installation

Install the main analyzer package via NuGet:

```xml
<PackageReference Include="BoolParameterGenerator" Version="1.0.0" />
```

This will **transitively install** the required helper package `BoolParameterGenerator.Shared`.

✅ Works in:
- .NET SDK-style projects
- Class libraries
- Console apps
- Unit test projects

---

## 🚀 Usage

Annotate a `partial class` with one of the supported generator attributes:

```csharp
using PrimS.BoolParameterGenerator;

[GenerateBinaryEnum("TrueValue", "FalseValue")]
public partial class MyBinaryEnum \{ }

[GenerateBoolEnum("TrueValue", "FalseValue")]
public partial class MyBoolEnum \{ }
```

🔧 Requirements:
- The class **must** be `partial`.
- The attribute arguments define the **true/false** semantics of the generated type.

---

## 📚 Example Usage and Guidance

For detailed examples illustrating the benefits of BoolParameterGenerator, see the following:

- **Good Examples: Caller IntelliSense** — [CallerIntellisenseGoodExamples.cs](./BoolParameterGenerator.Github.Example/CallerIntellisenseGoodExamples.cs)  
- **Good Examples: Implementation Patterns** — [ImplementationGoodExamples.cs](./BoolParameterGenerator.Github.Example/ImplementationGoodExamples.cs)  
- **Bad Examples: Caller IntelliSense Pitfalls** — [CallerIntellisenseBadExamples.cs](./BoolParameterGenerator.Github.Example/CallerIntellisenseBadExamples.cs)  
- **Bad Examples: Implementation Pitfalls** — [ImplementationBadExamples.cs](./BoolParameterGenerator.Github.Example/ImplementationBadExamples.cs)  

These demonstrate why replacing raw `bool` parameters with strongly typed proxies enhances readability, API clarity, and maintainability.

## 🔍 Where to Find Generated Code

1. Open your project in **Visual Studio**.
2. Navigate to `Dependencies > Analyzers > BoolParameterGenerator`.
3. Expand the node to find the generated `.g.cs` files (e.g., `MyBinaryEnum.g.cs`).

⚠️ If only `Heartbeat.g.cs` appears:
- Ensure your partial class is declared correctly.
- Verify that attribute arguments are valid.
- Rebuild the project to trigger generation.

---

## 📦 About the Shared Package

Although the attributes (`GenerateBinaryEnum`, `GenerateBoolEnum`) are defined in a separate package `BoolParameterGenerator.Shared`, you do **not** need to reference it manually — it is installed transitively.

There isn't much to choose one type attribute over the other atm. Under the hood the implementation is quite different and we expect the BinaryEnum could prove advantageous; especially with respect to extending to a tri-state "boolean". This is a Work-In-Progres and we would be very happy to receive feedback on useCases that may deviate in interesting ways from our own expectations...

---

## 🧪 Confirmed Working Build/Contribution Setup

Check out the latest master branch then validate everything is wired correctly:
1. Open only the generator projects (`BoolParameterGenerator` and `BoolParameterGenerator.Shared`) and the test project (`BoolParameterGenerator.Pack.Tests`).
2. Clean the solution.
3. Rebuild `BoolParameterGenerator.Pack.Tests`.
4. If BoolParameterGenerator analyzer references appear unresolved, try opening the file — often Visual Studio will resolve them automatically when the file is activated.
5. Rebuild again if necessary
1. You'll hopefully see `BEG004` diagnostics.

---

## ⚠️ Namespace Caveat

If the triggering class and the generated class are in **different namespaces**, generation may fail silently. Ensure the partial class declaration and the generated file reside in the same namespace, or adjust your generator logic to support custom namespaces.

---

## 📄 License

MIT — essentially use however you like, just don't sue me if it doesn't work out!

---

## 🧵 See Also

- [BoolParameterGenerator GitHub Repo](https://github.com/9swampy/BoolEnumGenerator)
- [Source Generator Cookbook (Roslyn)](https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md)


:::

### About
:::note

Generate boolean enum types


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **BoolParameterGenerator**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="BoolParameterGenerator" Version="0.5.0" />
	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BoolParameterGenerator\src\BoolDemo\Program.cs" label="Program.cs" >

  This is the use of **BoolParameterGenerator** in *Program.cs*

```csharp showLineNumbers 
using BoolDemo;

Console.WriteLine(IsValid.TrueValue);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BoolParameterGenerator\src\BoolDemo\IsValid.cs" label="IsValid.cs" >

  This is the use of **BoolParameterGenerator** in *IsValid.cs*

```csharp showLineNumbers 

using PrimS.BoolParameterGenerator;

namespace BoolDemo;
[GenerateBinaryEnum("TrueValue", "FalseValue", GenerateAssertionExtensions =false)]
//[GenerateBoolEnum("TrueValue", "FalseValue", GenerateAssertionExtensions = false)]
public partial class IsValid
{
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BoolParameterGenerator\src\BoolDemo\obj\GX\BoolParameterGenerator\PrimS.BoolParameterGenerator.BinaryEnumGenerator\IsValid.g.cs" label="IsValid.g.cs" >
```csharp showLineNumbers 
namespace BoolDemo;

#nullable enable

using System;
using PrimS.BoolParameterGenerator;

public partial class IsValid : SmartEnumWrapper<IsValid, BinaryEnum>, IEquatable<BinaryEnum>, IComparable<BinaryEnum>, IEquatable<BinaryEnumWrapper<IsValid, BinaryEnum>>, IComparable<BinaryEnumWrapper<IsValid, BinaryEnum>>
{
  public static readonly IsValid FalseValue = new IsValid(nameof(FalseValue), BinaryEnum.False);
  public static readonly IsValid TrueValue = new IsValid(nameof(TrueValue), BinaryEnum.True);

  public bool BoolValue => ProxyValue == BinaryEnum.True;

  public static IsValid FromValue(BinaryEnum value) => value switch
  {
    BinaryEnum.False => FalseValue,
    BinaryEnum.True => TrueValue,
    _ => throw new ArgumentOutOfRangeException(nameof(value), value, "Unhandled value for IsValid")
  };

  public static IsValid FromValue(bool value) => value switch
  {
    false => FalseValue,
    true => TrueValue
  };

  private IsValid(string name, BinaryEnum value) : base(name, value)
  \{ }

  public static implicit operator bool(IsValid value)
  {
    return value.Value == BinaryEnum.True;
  }

  public static implicit operator IsValid(bool value) => value ? TrueValue : FalseValue;

  public static bool operator ==(IsValid left, IsValid right) => left.Value.Value == right.Value.Value;

  public static bool operator ==(IsValid left, bool right) => left.Value == (right ? BinaryEnum.True : BinaryEnum.False);

  public static bool operator ==(IsValid left, int right) => (int)left.Value.Value == right;

  public static bool operator ==(bool left, IsValid right) => (left ? 1 : 0) == (int)right.Value.Value;

  public static bool operator !=(IsValid left, IsValid right) => left.Value.Value != right.Value.Value;

  public static bool operator !=(IsValid left, bool right) => (int)left.Value.Value != (right ? 1 : 0);

  public static bool operator !=(IsValid left, int right) => (int)left.Value.Value != right;

  public static bool operator !=(bool left, IsValid right) => (left ? 1 : 0) != (int)right.Value.Value;

  public static implicit operator IsValid(BinaryEnum value) => IsValid.FromValue(value);

  public override bool Equals(object obj) => obj is IsValid other && this == other;

  public override int GetHashCode() => Value.GetHashCode();

  public bool Equals(BinaryEnum other) => Equals(FromValue(other));

  public int CompareTo(BinaryEnum other) => CompareTo(FromValue(other));

  public int CompareTo(BinaryEnumWrapper<IsValid, BinaryEnum>? other) => Value.CompareTo(other?.Value);

  public bool Equals(BinaryEnumWrapper<IsValid, BinaryEnum>? other) => Value.Equals(other?.Value);
}
```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\BoolParameterGenerator\src\BoolDemo\obj\GX\BoolParameterGenerator\PrimS.BoolParameterGenerator.BoolEnumGenerator\GeneratorHeartbeat.g.cs" label="GeneratorHeartbeat.g.cs" >
```csharp showLineNumbers 
// BoolEnumGenerator Generator ran successfully but found no GenerateBoolEnumAttribute to process.
```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project BoolParameterGenerator ](/sources/BoolParameterGenerator.zip)

:::


### Share BoolParameterGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBoolParameterGenerator&quote=BoolParameterGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBoolParameterGenerator&text=BoolParameterGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBoolParameterGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBoolParameterGenerator&title=BoolParameterGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBoolParameterGenerator&title=BoolParameterGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FBoolParameterGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/BoolParameterGenerator

<SameCategory />

