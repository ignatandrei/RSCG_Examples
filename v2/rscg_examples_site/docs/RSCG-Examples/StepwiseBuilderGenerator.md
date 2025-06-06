---
sidebar_position: 1880
title: 188 - StepwiseBuilderGenerator
description: Generating Builder- as steps 
slug: /StepwiseBuilderGenerator
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# StepwiseBuilderGenerator  by Georgiy Petrov


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/StepwiseBuilderGenerator?label=StepwiseBuilderGenerator)](https://www.nuget.org/packages/StepwiseBuilderGenerator/)
[![GitHub last commit](https://img.shields.io/github/last-commit/Georgiy-Petrov/StepwiseBuilderGenerator?label=updated)](https://github.com/Georgiy-Petrov/StepwiseBuilderGenerator)
![GitHub Repo stars](https://img.shields.io/github/stars/Georgiy-Petrov/StepwiseBuilderGenerator?style=social)

## Details

### Info
:::info

Name: **StepwiseBuilderGenerator**

This package provides a Source Generator that creates strongly-typed, stepwise “fluent” builders for your types. You simply annotate a class with [StepwiseBuilder] and specify the steps you need in the class’s parameterless constructor. The source generator then produces a partial class containing builder interfaces and step methods.

Author: Georgiy Petrov

NuGet: 
*https://www.nuget.org/packages/StepwiseBuilderGenerator/*   


You can find more details at https://github.com/Georgiy-Petrov/StepwiseBuilderGenerator

Source : https://github.com/Georgiy-Petrov/StepwiseBuilderGenerator

:::

### Original Readme
:::note

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

:::

### About
:::note

Generating Builder- as steps 


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **StepwiseBuilderGenerator**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
	  <Nullable>enable</Nullable>
  </PropertyGroup>

	  <PropertyGroup>
        <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
        <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
    </PropertyGroup>

	  <ItemGroup>
	    <PackageReference Include="StepwiseBuilderGenerator" Version="1.0.3" />
	  </ItemGroup>

	  
	 

</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StepwiseBuilderGenerator\src\Builder\Program.cs" label="Program.cs" >

  This is the use of **StepwiseBuilderGenerator** in *Program.cs*

```csharp showLineNumbers 
using Builder;

var pOld = new Person();
pOld.MiddleName = "G";
var pNew= pOld
    .SetFirstNameBld("Andrei")
    .SetLastNameBuilder("Ignat")
    .Age(55)
    .Build(it=>it)
    ;
  
//var build = new PersonBuilder()
//    .WithFirstName(pOld.FirstName)
//    //.WithMiddleName("") // it is not into the constructor
//    .WithLastName(pOld.LastName)
//    ;
    
//var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StepwiseBuilderGenerator\src\Builder\Person.cs" label="Person.cs" >

  This is the use of **StepwiseBuilderGenerator** in *Person.cs*

```csharp showLineNumbers 
using StepwiseBuilderGenerator;
using System;

namespace Builder;
[StepwiseBuilder]
public partial class Person
{
    public Person()
    {
        new GenerateStepwiseBuilder()
           .AddStep<string>("SetFirstNameBld", "FirstName")
           .AddStep<string>("SetLastNameBuilder", "LastName")
           .AddStep<int>("Age")  
           .CreateBuilderFor<Person>();
    }
    //public Person(string firstName, string lastName)
    //{
    //    FirstName = firstName;
    //    LastName = lastName;
    //}
    //public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    //public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\StepwiseBuilderGenerator\src\Builder\obj\GX\StepwiseBuilderGenerator\StepwiseBuilderGenerator.StepwiseBuilderGenerator\Person.g.cs" label="Person.g.cs" >


```csharp showLineNumbers 
using StepwiseBuilderGenerator;
using System;

namespace Builder;
public interface IPersonSetFirstNameBld 
{
    IPersonSetLastNameBuilder SetFirstNameBld(string value);
}
public interface IPersonSetLastNameBuilder 
{
    IPersonAge SetLastNameBuilder(string value);
}
public interface IPersonAge 
{
    IPersonBuild Age(int value);
}
public interface IPersonBuild 
{
    Person Build(Func<Person, Person> buildFunc);
}
public partial class Person : IPersonSetFirstNameBld,IPersonSetLastNameBuilder,IPersonAge,IPersonBuild 
{    public string FirstName;
    public string LastName;
    public int AgeValue;

    public IPersonSetLastNameBuilder SetFirstNameBld(string value)
    {
        FirstName = value;
        return this;
    }
    public IPersonAge SetLastNameBuilder(string value)
    {
        LastName = value;
        return this;
    }
    public IPersonBuild Age(int value)
    {
        AgeValue = value;
        return this;
    }
    public Person Build(Func<Person, Person> buildFunc)
    {
        return buildFunc(this);
    }

    public enum Steps
    {
        SetFirstNameBld,
        SetLastNameBuilder,
        Age,
    }
}
public static partial class StepwiseBuilders
{
    public static IPersonSetFirstNameBld Person() 
    {
         return new Person();
    }
}

```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project StepwiseBuilderGenerator ](/sources/StepwiseBuilderGenerator.zip)

:::


### Share StepwiseBuilderGenerator 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStepwiseBuilderGenerator&quote=StepwiseBuilderGenerator" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStepwiseBuilderGenerator&text=StepwiseBuilderGenerator:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStepwiseBuilderGenerator" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStepwiseBuilderGenerator&title=StepwiseBuilderGenerator" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStepwiseBuilderGenerator&title=StepwiseBuilderGenerator&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FStepwiseBuilderGenerator" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/StepwiseBuilderGenerator

### In the same category (Builder) - 4 other generators


#### [Architect.DomainModeling](/docs/Architect.DomainModeling)


#### [BuilderGenerator](/docs/BuilderGenerator)


#### [Fluentify](/docs/Fluentify)


#### [Hsu.Sg.FluentMember](/docs/Hsu.Sg.FluentMember)

