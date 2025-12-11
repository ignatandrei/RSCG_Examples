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
public partial class MyBinaryEnum { }

[GenerateBoolEnum("TrueValue", "FalseValue")]
public partial class MyBoolEnum { }
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
