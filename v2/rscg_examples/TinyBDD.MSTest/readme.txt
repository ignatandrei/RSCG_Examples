# TinyBDD

[![CI](https://github.com/JerrettDavis/TinyBDD/actions/workflows/ci.yml/badge.svg)](https://github.com/JerrettDavis/TinyBDD/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/JerrettDavis/TinyBDD/branch/main/graph/badge.svg)](https://codecov.io/gh/JerrettDavis/TinyBDD)
[![CodeQL](https://github.com/JerrettDavis/TinyBDD/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/JerrettDavis/TinyBDD/security/code-scanning)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
![.NET Versions](https://img.shields.io/badge/.NET%208.0%20%7C%209.0-blue)

**NuGet Packages:**

| Package | Version | Downloads |
|--------|---------|-----------|
| **TinyBDD** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.svg)](https://www.nuget.org/packages/TinyBDD/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.svg)](https://www.nuget.org/packages/TinyBDD/) |
| **TinyBDD.MSTest** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.MSTest.svg)](https://www.nuget.org/packages/TinyBDD.MSTest/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.MSTest.svg)](https://www.nuget.org/packages/TinyBDD.MSTest/) |
| **TinyBDD.Xunit** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.Xunit.svg)](https://www.nuget.org/packages/TinyBDD.Xunit/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.Xunit.svg)](https://www.nuget.org/packages/TinyBDD.Xunit/) |
| **TinyBDD.Xunit.v3** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.Xunit.v3.svg)](https://www.nuget.org/packages/TinyBDD.Xunit.v3/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.Xunit.v3.svg)](https://www.nuget.org/packages/TinyBDD.Xunit.v3/) |
| **TinyBDD.NUnit** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.NUnit.svg)](https://www.nuget.org/packages/TinyBDD.NUnit/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.NUnit.svg)](https://www.nuget.org/packages/TinyBDD.NUnit/) |
| **TinyBDD.Extensions.DependencyInjection** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.Extensions.DependencyInjection.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.DependencyInjection/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.Extensions.DependencyInjection.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.DependencyInjection/) |
| **TinyBDD.Extensions.FileBased** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.Extensions.FileBased.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.FileBased/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.Extensions.FileBased.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.FileBased/) |
| **TinyBDD.Extensions.Hosting** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.Extensions.Hosting.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.Hosting/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.Extensions.Hosting.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.Hosting/) |
| **TinyBDD.Extensions.Reporting** | [![NuGet](https://img.shields.io/nuget/v/TinyBDD.Extensions.Reporting.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.Reporting/) | [![NuGet Downloads](https://img.shields.io/nuget/dt/TinyBDD.Extensions.Reporting.svg)](https://www.nuget.org/packages/TinyBDD.Extensions.Reporting/) |

---

**TinyBDD** is a minimal, fluent **Behavior-Driven Development** library for .NET.
It supports two complementary approaches:
- **Code-first**: Fluent `Given` / `When` / `Then` syntax directly in C#
- **File-based**: Gherkin `.feature` files and YAML scenarios with convention-based drivers

Both approaches are designed to:

- Be **framework-agnostic** (works with MSTest, xUnit, NUnit, etc.).
- Keep scenarios **clear and concise** with readable syntax.
- Support **async and sync** operations for maximum flexibility.
- Integrate with existing test runners' output for easy step visibility.


---

## Features

### Code-First Approach

- **Readable BDD syntax**:
  ```csharp
    await Given("a number", () => 5)
        .When("doubled", x => x * 2)
        .Then(">= 10", v => v >= 10)
        .And("<= 20", v => v <= 20)
        .But("!= 15", v => v != 15)
        .AssertPassed();
  ```
- **Sync & Async Support**:

    * `Func<T>` / `Func<T, bool>`
    * `Func<Task<T>>` / `Func<T, Task<bool>>`
    * Token-aware variants for advanced control.

- **`And` / `But` chaining** with correct step names in output:

  ```
  Given start [OK]
  When double [OK]
  Then >= 10 [OK]
  And <= 20 (async) [OK]
  But != 11 [OK]
  ```

### File-Based Approach

- **Gherkin .feature files**:
  ```gherkin
  Feature: Calculator Operations

  Scenario: Add two numbers
    Given a calculator
    When I add 5 and 3
    Then the result should be 8
  ```

- **Convention-based driver methods**:
  ```csharp
  [DriverMethod("I add {a} and {b}")]
  public Task Add(int a, int b)
  {
      _calculator.Add(a, b);
      return Task.CompletedTask;
  }
  ```

- **Scenario Outlines** with Examples tables for parameterized tests
- **YAML format** as alternative to Gherkin for tooling integration

### Framework Integration

- **Test framework adapters**:

    * **MSTest**: `TinyBddMsTestBase`, `MSTestBddReporter`, `MSTestTraitBridge`
    * **xUnit**:  `TinyBddXunitBase`, `XunitTraitBridge`, `XunitBddReporter`
    * **NUnit**: `TinyBddNUnitBase`, `NUnitTraitBridge`, `NUnitBddReporter`
    * Automatically logs steps and tags to the test output.

---

## Installation

Add TinyBDD via NuGet:

```powershell
dotnet add package TinyBDD
```

For MSTest:

```powershell
dotnet add package TinyBDD.MSTest
```

For NUnit:

```powershell
dotnet add package TinyBDD.NUnit
```

For xUnit:

```powershell
dotnet add package TinyBDD.Xunit
```

For xUnit v3:

```powershell
dotnet add package TinyBDD.Xunit.v3
```

For Extensions:

```powershell
# File-Based DSL (Gherkin and YAML)
dotnet add package TinyBDD.Extensions.FileBased

# Dependency Injection
dotnet add package TinyBDD.Extensions.DependencyInjection

# Hosting (includes DI)
dotnet add package TinyBDD.Extensions.Hosting

# JSON Reporting
dotnet add package TinyBDD.Extensions.Reporting
```

### ⚡ Performance Optimization (Automatic!)

TinyBDD includes a **Roslyn source generator** that **automatically optimizes ALL BDD tests at compile-time** starting in v1.1. No attributes needed, no configuration, no additional packages!

> **📌 Important:** Test classes **must be declared as `partial`** to enable source generation. This allows the generator to add optimized methods to your test class.

**Default behavior** - All BDD test methods are automatically optimized:

```csharp
public partial class MyTests  // ← Note: 'partial' keyword required
{
    // This is automatically optimized - no attribute needed!
    public async Task FastScenario()
    {
        await Given("start", () => 42)
             .When("double", x => x * 2)
             .Then("equals 84", x => x == 84);
    }
}
```

**Opt-out** - Use `[DisableOptimization]` if you need the full pipeline features:

```csharp
[DisableOptimization]  // Uses standard pipeline
public async Task ScenarioWithObservers()
{
    // Uses standard pipeline (observers, hooks, etc.)
    await Given("start", () => 1)
         .When("add", x => x + 1)
         .Then("equals 2", x => x == 2);
}
```

**Performance gains:**
- **16-40x faster execution** (~814ns → ~20-50ns per step)
- **9x less memory** (2,568 bytes → ~290 bytes per scenario)
- **Zero boxing** - All values are strongly typed at compile-time
- **No runtime overhead** - Transforms to direct procedural code
- **Compile-time transformation** - Happens automatically during build

**When to opt-out:**
- ⚠️ Using IStepObserver or IScenarioObserver (not yet supported in generated code)
- ⚠️ Using BeforeStep/AfterStep hooks
- ⚠️ Complex ScenarioOptions features
- 🐛 Debugging (to step through standard pipeline)

**Common warnings:**
- **TBDD010**: Test class is not `partial` → Add `partial` keyword to your class declaration
- **TBDD011**: Nested types not supported → Move tests to a top-level `partial` class
- **TBDD012**: Generic types not supported → Use non-generic `partial` class for tests

The generator transforms fluent chains into optimized procedural code while maintaining the same readable syntax. Generated code is placed in `obj/.../generated/` for inspection.

---

## Basic Usage

### MSTest Example

```csharp
using TinyBDD.MSTest;
using Microsoft.VisualStudio.TestTools.UnitTesting;

[Feature("Math")]
[TestClass]
public class MathTests : TinyBddMsTestBase
{
    [Scenario("Doubling numbers")]
    [TestMethod]
    public async Task DoublingScenario()
    {
        await Given("start with 5", () => 5)
             .When("doubled", x => x * 2)
             .Then("should be 10", v => v == 10)
             .AssertPassed();
    }
}
```

---

### NUnit Example

```csharp
using TinyBDD.NUnit;
using NUnit.Framework;

[Feature("Math")]
public class MathTests : TinyBddNUnitBase
{
    [Scenario("Doubling numbers")]
    [Test]
    public async Task DoublingScenario()
    {
        await Given("start with 5", () => 5)
             .When("doubled", x => x * 2)
             .Then("should be 10", v => v == 10)
             .AssertPassed();
    }
}
```

---

### xUnit Example

```csharp
using TinyBDD.Xunit;
using Xunit;

[Feature("Math")]
public class MathTests : TinyBddXunitBase
{
    [Scenario("Doubling numbers")]
    [Fact]
    public async Task DoublingScenario()
    {
        await Given("start with 5", () => 5) 
             .When("doubled", x => x * 2)
             .Then("should be 10", v => v == 10)
             .AssertPassed();
    }
}
```

---

## File-Based Usage

### Gherkin Feature File

Create `Features/Calculator.feature`:

```gherkin
Feature: Calculator Operations

@calculator @smoke
Scenario: Add two numbers
  Given a calculator
  When I add 5 and 3
  Then the result should be 8

Scenario Outline: Multiply numbers
  Given a calculator
  When I multiply <a> and <b>
  Then the result should be <expected>

Examples:
  | a | b | expected |
  | 2 | 3 | 6        |
  | 4 | 5 | 20       |
```

### Driver Implementation

```csharp
using TinyBDD.Extensions.FileBased.Core;

public class CalculatorDriver : IApplicationDriver
{
    private readonly Calculator _calculator = new();

    [DriverMethod("a calculator")]
    public Task Initialize()
    {
        _calculator.Clear();
        return Task.CompletedTask;
    }

    [DriverMethod("I add {a} and {b}")]
    public Task Add(int a, int b)
    {
        _calculator.Add(a, b);
        return Task.CompletedTask;
    }

    [DriverMethod("I multiply {a} and {b}")]
    public Task Multiply(int a, int b)
    {
        _calculator.Multiply(a, b);
        return Task.CompletedTask;
    }

    [DriverMethod("the result should be {expected}")]
    public Task<bool> VerifyResult(int expected)
    {
        return Task.FromResult(_calculator.GetResult() == expected);
    }

    public Task InitializeAsync(CancellationToken ct = default) => Task.CompletedTask;
    public Task CleanupAsync(CancellationToken ct = default) => Task.CompletedTask;
}
```

### Test Class

```csharp
using TinyBDD.Extensions.FileBased;

public class CalculatorTests : FileBasedTestBase<CalculatorDriver>
{
    [Fact]
    public async Task ExecuteCalculatorScenarios()
    {
        await ExecuteScenariosAsync(options =>
        {
            options.AddFeatureFiles("Features/**/*.feature")
                   .WithBaseDirectory(Directory.GetCurrentDirectory());
        });
    }
}
```

Output:

```
Feature: Calculator Operations
Scenario: Add two numbers
  Given a calculator [OK] 0 ms
  When I add 5 and 3 [OK] 0 ms
  Then the result should be 8 [OK] 1 ms

Scenario Outline: Multiply numbers (Example 1: a=2, b=3, expected=6)
  Given a calculator [OK] 0 ms
  When I multiply 2 and 3 [OK] 0 ms
  Then the result should be 6 [OK] 0 ms
```

---

## Step Types

| Step    | Purpose                                     | Example                        |
|---------|---------------------------------------------|--------------------------------|
| `Given` | Initial state / setup                       | `.Given("start", () => 5)`     |
| `When`  | Action / event                              | `.When("doubled", x => x * 2)` |
| `Then`  | Assertion                                   | `.Then(">= 10", v => v >= 10)` |
| `And`   | Additional assertion after `Then` or `When` | `.And("<= 20", v => v <= 20)`  |
| `But`   | Additional assertion phrased negatively     | `.But("!= 15", v => v != 15)`  |

All step types have **sync** and **async** overloads.

---

## Cleanup with Finally

`Finally` registers cleanup handlers that execute after all steps complete, even if steps throw exceptions. This is useful for resource cleanup like disposing objects:

```csharp
await Given("a database connection", () => new SqlConnection(connectionString))
    .Finally("close connection", conn => conn.Dispose())
    .When("query data", conn => conn.Query<User>("SELECT * FROM Users"))
    .Then("results returned", users => users.Any())
    .AssertPassed();

// Connection is automatically disposed after all steps complete
```

**Key Features:**
- Finally handlers execute in registration order after all other steps
- They execute even when steps throw exceptions
- Multiple Finally handlers can be registered at different points in the chain
- Each Finally handler receives the state value at the point where it was registered
- The chain passes through the upstream value unchanged (tap semantics)

```csharp
await Given("resource A", () => new ResourceA())
    .Finally("cleanup A", a => a.Dispose())
    .When("create resource B", a => new ResourceB(a))
    .Finally("cleanup B", b => b.Dispose())
    .Then("verify", b => b.IsValid)
    .AssertPassed();

// Execution order: Given → When → Then → Finally cleanup A → Finally cleanup B
```

---

## Tags

Tags can be added for reporting and filtering:

```csharp
ctx.AddTag("smoke");
ctx.AddTag("fast");
```

In xUnit, tags are logged to the test output:

```
[TinyBDD] Tag: smoke
[TinyBDD] Tag: fast
```

---

## Asserting Pass/Fail

TinyBDD tracks step results internally. At the end of the scenario, call one of the following methods:

```csharp
Scenario.AssertPassed();

Scenario.AssertFailed();

// or use the fluent syntax:
await Given("one", () => 1)
    .When("add one", x => x + 1)
    .Then("equals two", v => v == 2)
    .AssertPassed();

await Given("one", () => 1)
    .When("add one", x => x + 1)
    .Then("equals elevent", v => v == 11)
    .AssertFailed();
```

This ensures that all steps passed and throws if any failed.

---

## Philosophy

TinyBDD was created with a few guiding principles:

1. **Focus on readability, not ceremony**
   Steps should read like plain English and map directly to Gherkin-style thinking. Choose the approach that best fits your team:
   - **Code-first**: Write BDD tests directly in C# with fluent API
   - **File-based**: Use standard Gherkin `.feature` files or YAML for business-readable specifications

2. **Flexible specification approach**
   Both approaches produce the same readable output:
   - **Code-first**: Your C# code using the fluent API serves as the executable specification
   - **File-based**: Separate `.feature` or YAML files define scenarios, implemented through driver methods

   Your test runner output **is** the human-readable spec in both cases.

3. **Stay out of your way**
   TinyBDD is not an opinionated test framework; it's a syntax layer that integrates with MSTest, xUnit, or NUnit and
   leaves assertions, test discovery, and reporting to them. Choose code-first for flexibility and complex logic, or
   file-based when business analysts need to author test specifications.

---

## Gherkin-Style Output

When running a scenario, TinyBDD prints structured step output similar to Gherkin formatting.  
For example:

```csharp
await Given("start", () => 5)
    .When("double", x => x * 2)
    .Then(">= 10", v => v >= 10)
    .And("<= 20 (async)", v => Task.FromResult(v <= 20))
    .But("!= 11", v => v != 11)
    .AssertPassed();
```

Test output:

```
Feature: Math
Scenario: Doubling numbers
  Given start [OK] 0 ms
  When double [OK] 0 ms
  Then >= 10 [OK] 0 ms
  And <= 20 (async) [OK] 0 ms
  But != 11 [OK] 0 ms
```

If a step fails, you’ll see exactly which step failed, how long it took, and the exception message.

---

## Why Use TinyBDD?

TinyBDD offers flexibility that traditional BDD tools don't:

**Compared to SpecFlow / Cucumber:**
* **Choose your approach**: Start code-first, add `.feature` files later when business analysts join, or vice versa
* **No runtime overhead**: File-based DSL uses convention-based matching without reflection or runtime parsing
* **Lighter setup**: Works directly with standard test frameworks (xUnit, NUnit, MSTest)
* **Better IDE support**: Code-first approach gets full IntelliSense, refactoring, and debugging
* **Simpler integration**: No separate test runners, no complex step binding configurations

**Unique advantages:**
* Seamlessly switch between approaches as your team's needs evolve
* Both approaches produce identical readable Gherkin-style output
* Test framework agnostic - use the test runner you already know
* Performance-optimized with automatic source generation (code-first)
* Convention-based driver methods for file-based tests (no attribute soup)

---

## Minimal Example

For the smallest possible test:

```csharp
await Given("one", () => 1)
    .When("add one", x => x + 1)
    .Then("equals two", v => v == 2)
    .AssertPassed();
```

Output:

```
Given one [OK]
When add one [OK]
Then equals two [OK]
```

---

## Async Philosophy

In TinyBDD, sync and async steps are **equally first-class** citizens.

* If your step is synchronous, write it synchronously:

  ```csharp
  .When("double", x => x * 2)
  .Then("is 10", v => v == 10)
  ```

* If your step needs async work:

  ```csharp
  .When("fetch from DB", async x => await db.GetAsync(x))
  .Then("result exists", async v => Assert.NotNull(v))
  ```

You can even mix sync and async steps freely in the same scenario.

---

## Output Style

TinyBDD always prints the BDD keyword for the step type (`Given`, `When`, `Then`, `And`, `But`), the step title, the
result `[OK]` / `[FAIL]`, and the elapsed time in milliseconds.

For failed steps, TinyBDD stops the scenario immediately and prints the exception:

```
Then equals two [FAIL] 1 ms
Expected: 2
Actual:   3
```

---

## Recommended Usage

* One **scenario** per test method.
* Keep each step **single-purpose**—avoid hiding multiple unrelated actions in one step.
* Prefer creating functions, even local ones, to avoid unnecessary allocations, closure creation, garbage collection, and code cleanliness.
* Use **`Scenario.AssertPassed()`** or the fluent **`ThenChain.AssertPassed()`**  at the end of each test to ensure every step was explicitly checked.
* Use **tags** to group and filter tests.

----

## License

[MIT License](LICENSE)
