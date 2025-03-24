# Stepwise Builder Generator

This repository provides a **Source Generator** that creates strongly-typed, stepwise “fluent” builders for your types.
You simply annotate a class with `[StepwiseBuilder]` and specify the steps you need in the class’s parameterless
constructor. The source generator then produces a partial class containing builder interfaces and step methods.

## Why Use Stepwise Builders?

- **Compile-time safety**: Each required step is enforced in sequence.
- **Reduced boilerplate**: No need to handwrite repetitive builder chains.
- **Readable & maintainable**: Clean, fluent APIs that guide users step-by-step.

## How It Works

1. **Annotate a class with `[StepwiseBuilder]`.**
2. **Inside the parameterless constructor**, create a chain of methods using `GenerateStepwiseBuilder()`:
    - **`AddStep<TArgument>(stepName, fieldName = null)`**: adds a step to capture a value of type `TArgument`.
    - **`BranchFrom("BaseBuilderName", "BaseBuilderStep")`** (optional): indicates an alternate path is offered from the
      step **before** `BaseBuilderStep` in `BaseBuilderName`.
    - **`CreateBuilderFor<TResult>()`**: defines the final target type being built.

When you compile, the generator inspects these calls and automatically produces:

- **A partial builder class** that implements interfaces representing each step.
- **A chain of interfaces** (e.g., `IYourClassFirstStep`, `IYourClassSecondStep`, …) to enforce the order of steps.
- **An optional extension method** if you used `BranchFrom(...)`, allowing you to jump to a new step at the point *
  *before** a specified step in another builder’s chain.

---

## Quick Start Example

### 1. Create a Class & Decorate with `[StepwiseBuilder]`

```csharp
using StepwiseBuilderGenerator;

[StepwiseBuilder]
public partial class MyClass
{
    public MyClass() // Parameterless constructor
    {
        GenerateStepwiseBuilder()
            .AddStep<int>("FirstStep", "MyIntField")
            .AddStep<string>("SecondStep")  // defaults to "SecondStepValue"
            .AddStep<bool>("ThirdStep")     // further step
            .CreateBuilderFor<MyTargetType>();
    }
}
```

When you build your project, the generator produces `MyClass.g.cs` in the same namespace, containing:

1. **`IMyClassFirstStep`** with `.FirstStep(int value)`.
2. **`IMyClassSecondStep`** with `.SecondStep(string value)`.
3. **`IMyClassThirdStep`** with `.ThirdStep(bool value)`.
4. **`IMyClassBuild`** with `.Build(Func<MyClass, MyTargetType> buildFunc)`.
5. A **partial `MyClass`** that implements all the above interfaces, storing step values in fields
   like `public int MyIntField;`, `public string SecondStepValue;`, etc.

### 2. Using the Generated Builder

```csharp
var builder = new MyClass();

MyTargetType result = builder
    .FirstStep(42)
    .SecondStep("Hello")
    .ThirdStep(true)
    .Build(instance =>
    {
        return new MyTargetType
        {
            SomeIntProperty = instance.MyIntField,
            SomeStringProperty = instance.SecondStepValue,
            SomeBoolProperty = instance.ThirdStepValue
        };
    });
```

The **stepwise** nature ensures you can’t skip or reorder steps; they must be called in the generated sequence.

### 3. Branching from Another Builder

Suppose we want an alternative path that branches **before** `SecondStep`. Here’s our original chain in `MyClass`:

```
FirstStep -> SecondStep -> ThirdStep -> Build
```

By writing:

```csharp
[StepwiseBuilder]
public partial class MyOtherClass
{
    public MyOtherClass()
    {
        GenerateStepwiseBuilder()
            .BranchFrom("MyClass", "SecondStep")  // offer a path from BEFORE 'SecondStep'
            .AddStep<bool>("AlternateStep")
            .CreateBuilderFor<AnotherType>();
    }
}
```

We get:

- A **partial `MyOtherClass`** with steps for `.AlternateStep(...)`.
- An **extension method** so that **right after** `FirstStep(...)` in `MyClass`, you can **choose** either to
  go `.SecondStep(...) -> ThirdStep(...) -> Build` **or** `.AlternateStep(...) -> Build`.
- Because it’s a **separate path**, once you choose `.AlternateStep(...)`, you **cannot** call `.ThirdStep(...)`.

---

## FAQ

### 1. What if I have generics in my class?

The generator handles generic type parameters by including them in the generated partial class and interfaces.

### 2. What if I have a **branch** in a **generic** class?

If you have a branch (`BranchFrom(...)`), the **branching class** should have a **matching generic signature** (names,
constraints, etc.) so the extension methods can properly link the two builders.

### 3. Can I add custom logic to steps?

Yes. Because the generated class is `partial`, you can add your own partial methods or fields. Steps themselves are
automatically generated as chainable methods.

### 4. What happens if I omit a step’s `fieldName` parameter?

The generator will default to naming that field as `"{StepName}Value"`. For example, if your step
is `.AddStep<int>("Foo")`, the field becomes `public int FooValue;`.

### 5. Should I always write the build logic in `.Build(...)`?

Not necessarily. It’s often beneficial to **keep the `.Build(...)` method minimal** and place common or advanced build
logic in **extension methods**. For instance, suppose your generated interface is `IMyClassBuild`; you can do:

```csharp
public static class MyClassBuilderExtensions
{
    // This extension method extends the build interface directly
    public static MyTargetType BuildMyTarget(this IMyClassBuild builder)
    {
        // Here, we call the underlying Build method, passing in your creation logic.
        // You have direct access via the 'myClass' parameter in the delegate.
        return builder.Build(myClass => 
        {
            return new MyTargetType
            {
                SomeIntProperty    = myClass.MyIntField,
                SomeStringProperty = myClass.SecondStepValue,
                SomeBoolProperty   = myClass.ThirdStepValue
            };
        });
    }
}
```

Then in user code, you simply do:

```csharp
var result = new MyClass()
    .FirstStep(42)
    .SecondStep("Hello")
    .ThirdStep(true)
    .BuildMyTarget();
```

This keeps your builder usage consistent while consolidating object-creation details elsewhere.

---

## Steps Enum

Each generated builder class includes **`enum Steps`** listing all steps (excluding the final `Build`) in the order they
were declared. You might use this for logging, debugging, or reflection-based logic if desired.

---

## Factory Methods in StepwiseBuilders

For each generated base builder, the generator also provides a **static factory method** within the `StepwiseBuilders` partial class. These methods allow you to conveniently initialize a builder without directly instantiating the generated partial class.

---