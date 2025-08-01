---
sidebar_position: 1990
title: 199 - SuperFluid
description: Generate a state machine from a yaml file
slug: /SuperFluid
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# SuperFluid  by James Hughes


<TOCInline toc={toc}  />

## Nuget / site data
[![Nuget](https://img.shields.io/nuget/dt/SuperFluid?label=SuperFluid)](https://www.nuget.org/packages/SuperFluid/)
[![GitHub last commit](https://img.shields.io/github/last-commit/hughesjs/SuperFluid?label=updated)](https://github.com/hughesjs/SuperFluid)
![GitHub Repo stars](https://img.shields.io/github/stars/hughesjs/SuperFluid?style=social)

## Details

### Info
:::info

Name: **SuperFluid**

An incremental source generator for fluent APIs with grammar

Author: James Hughes

NuGet: 
*https://www.nuget.org/packages/SuperFluid/*   


You can find more details at https://github.com/hughesjs/SuperFluid

Source : https://github.com/hughesjs/SuperFluid

:::

### Original Readme
:::note

[![GitHub Workflow Status CI](https://img.shields.io/github/actions/workflow/status/hughesjs/SuperFluid/dotnet-ci.yml?label=BUILD%20CI&style=for-the-badge&branch=master)](https://github.com/hughesjs/SuperFluid/actions)
[![GitHub Workflow Status CD](https://img.shields.io/github/actions/workflow/status/hughesjs/SuperFluid/dotnet-cd.yml?label=BUILD%20CD&style=for-the-badge&branch=master)](https://github.com/hughesjs/SuperFluid/actions)
![GitHub top language](https://img.shields.io/github/languages/top/hughesjs/SuperFluid?style=for-the-badge)
[![GitHub](https://img.shields.io/github/license/hughesjs/SuperFluid?style=for-the-badge)](https://github.com/hughesjs/SuperFluid/LICENSE)
[![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/SuperFluid?style=for-the-badge)](https://nuget.org/packages/SuperFluid/)
[![Nuget](https://img.shields.io/nuget/dt/SuperFluid?style=for-the-badge)](https://nuget.org/packages/SuperFluid/)
![FTB](https://raw.githubusercontent.com/hughesjs/custom-badges/master/made-in/made-in-scotland.svg)

---

# SuperFluid

A C# library for generating fluent APIs with grammar.

# Introduction

It is often desirable to define an API that allows us to express our intentions as an easily readable method chain.

The most common example of this in C# would probably be LINQ:

```cs
var result = myCollection
    .Where(item => item.IsActive)
    .OrderBy(item => item.Name)
    .Select(item => new { item.Id, item.Name });
```

The simple case of this is actually quite simple to implement, you just have each of your methods return the type of the declaring object and `this`.

```cs
public class Car
{
    public Car Unlock()
    {
        // Do something
        return this;
    }
    
    public Car Enter()
    {
        // Do something
        return this;
    }
    
    public Car Start()
    {
        // Do something
        return this;
    }
}

// Which then lets us do
var car = new Car().Unlock().Enter().Start();
```

However, in this instance, there's nothing stopping us from starting the car before we've unlocked and entered it.

Clearly, in cases where we want to enforce a valid state, we have to define a grammar for our API.

Typically, we accomplish this by designing a state machine for our API and then working out the set of all unique combinations of transitions, and creating interfaces for each of these states.
We can then make the return type for each method be the interface that represents the set of transitions that it allows.

```csharp
public class Car: ICanEnter, ICanStart
{
    public ICanEnter Unlock()
    {
        // Do something
        return this;
    }
    
    public ICanStart Enter()
    {
        // Do something
        return this;
    }
    
    public void Start()
    {
        // Do something
        return this;
    }
}

// Which then lets us do
var car = new Car().Unlock().Enter().Start();

// But we can't do
var car = new Car().Unlock().Start(); // Haven't entered yet
var otherCar = new Car().Enter().Start(); // Haven't unlocked yet
```

[This write up explains how tricky this can be to do by hand.](https://mitesh1612.github.io/blog/2021/08/11/how-to-design-fluent-api)

This is where SuperFluid comes in. It lets us define the grammar for your API in a YAML file and then generates the interfaces for you.

All you then need to do is implement the interfaces and you're good to go.

# How to Use

## Installation

You can install SuperFluid from Nuget:

```
Install-Package SuperFluid
```

## Defining Your Grammar

> [!WARNING]
> Your grammar file needs to end with `.fluid.yml` to be picked up by SuperFluid.

Your grammar is defined in a YAML file following this data structure. 

```cs
record FluidApiDefinition
{
    public required string Name { get; init; }
    public required string Namespace { get; init; }
    public required FluidApiMethodDefinition InitialState { get; init; }
    public required List<FluidApiMethodDefinition> Methods { get; init; }
}

record FluidApiMethodDefinition
{
	public required string Name { get; init; }
	public string? ReturnType { get; init; }
	public List<string> CanTransitionTo { get; init; };
	public List<FluidApiArgumentDefinition> Arguments { get; init; };
	public List<FluidGenericArgumentDefinition> GenericArguments { get; init; };
}

record FluidApiArgumentDefinition
{
    public required string Type { get; init; }
    public required string Name { get; init; }
    public string? DefaultValue { get; init; }
}

record FluidGenericArgumentDefinition
{
    public required List<string> Constraints { get; init; }
    public required string Name { get; init; }
}
```

Essentially, you do the following:

- Define the initial state of your API, the namespaces you want your interfaces to be in, and what you want the main interface to be called.
- Define each of the methods that you want to be able to call on your API.
- Define the arguments that each method takes.
- Define the return type of each method.
- Define the states that each method can transition to.

Then Roslyn will generate the interfaces for you.

A simple example of this would be:

```yaml
Name: "ICarActor"
Namespace: "SuperFluid.Tests.Cars"
InitialState:
  Name: "Initialize"
  CanTransitionTo: 
    - "Unlock"
Methods:
  - Name: "Unlock"
    CanTransitionTo:
      - "Lock"
      - "Enter"
  - Name: "Lock"
    CanTransitionTo:
      - "Unlock"
  - Name: "Enter"
    CanTransitionTo:
      - "Start"
      - "Exit"
  - Name: "Exit"
    CanTransitionTo:
      - "Lock"
      - "Enter"
  - Name: "Start"
    Arguments:
      # These are deliberately out of order to test that the parser sticks the defaults to the end of the argument list
      - Name: "direction"
        Type: "string"
        DefaultValue: "\"Forward\"" # Note that we need the quotes here
      - Name: "speed"
        Type: "int"
      - Name: "hotwire"
        Type: "bool"
        DefaultValue: "false"

    # These constraints are pointless but are here to test the parser
    GenericArguments:
      - Name: "T"
        Constraints:
          - "class"
          - "INumber"
      - Name: "X"
        Constraints:
          - "notnull"
      
    CanTransitionTo:
      - "Stop"
      - "Build"
  - Name: "Stop"
    CanTransitionTo:
      - "Start"
      - "Exit"
  - Name: "Build"
    Arguments:
      - Name: "color"
        Type: "string"
    CanTransitionTo: []
    ReturnType: "string"
```

Unfortunately, Roslyn isn't great at giving you feedback for source generation errors. In Rider, you can find them under `Problems > Toolset, Environment` if it's actually run.

I plan to add an analyzer to the project that can give actual feedback to you but this might take a while.

## Registering Your Grammar File with SuperFluid

You need to add your grammar file(s) as `AdditionalFiles` in your csproj file.

```xml
    <ItemGroup>
      <AdditionalFiles Include="myGrammarFile.fluid.yml" />
    </ItemGroup>
```

You can have as many files as you want and they don't have to be in the root of your project.

## Implementing Your API

Actually implementing the API is pretty simple. You just implement the root interface that has been generated. In the above example, that would be `ICarActor`.

You then just implement the methods on that interface, and you're good to go.

One note, if you use your IDE's feature to generate your method stubs, you might end up with multiple declarations of each method for each explicit interface that has it as a component. In this case, just delete the explicit implementations and implement the method once using the standard `public type name(args)` syntax. This is simply an artefact of the fact that you can arrive at the same method through multiple transitions.

# Reference Project
 
Another one of my projects [PgfPlotsSdk](https://github.com/hughesjs/PgfPlotsSdk) uses SuperFluid to generate a complicated fluent API for working with LaTex PgfPlots.

The yaml file for this is [here](https://github.com/hughesjs/PgfPlotsSdk/blob/master/src/PgfPlotsSdk/SuperFluidDefinitions/PgfPlotsBuilder.fluid.yml).

The relevant class is [here](https://github.com/hughesjs/PgfPlotsSdk/blob/master/src/PgfPlotsSdk/Public/Builders/PgfPlotBuilder.cs).

:::

### About
:::note

Generate a state machine from a yaml file


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **SuperFluid**
```xml showLineNumbers {14}
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <TargetFramework>net8.0</TargetFramework>
        <OutputType>Exe</OutputType>
        <Nullable>enable</Nullable>
        <ImplicitUsings>enable</ImplicitUsings>
    </PropertyGroup>

    <ItemGroup>
        <AdditionalFiles Include="Calculator.fluid.yml" />
    </ItemGroup>

    <ItemGroup>
      <PackageReference Include="SuperFluid" Version="1.0.1" OutputItemType="Analyzer" ReferenceOutputAssembly="true" >
        <PrivateAssets>all</PrivateAssets>
        <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      </PackageReference>
    </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SuperFluid\src\StateMachineExample\Calculator.fluid.yml" label="Calculator.fluid.yml" >

  This is the use of **SuperFluid** in *Calculator.fluid.yml*

```csharp showLineNumbers 
Name: "ICalculator"
Namespace: "SimpleFluentExample"
InitialState:
  Name: "Create"
  CanTransitionTo: 
    - "Add"
    - "Subtract"
Methods:
  - Name: "Add"
    Arguments:
      - Name: "value"
        Type: "int"
    CanTransitionTo:
      - "Add"
      - "Subtract"
      - "Calculate"
  - Name: "Subtract"
    Arguments:
      - Name: "value"
        Type: "int"
    CanTransitionTo:
      - "Add"
      - "Subtract"
      - "Calculate"
  - Name: "Calculate"
    ReturnType: "int"
    CanTransitionTo: []

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SuperFluid\src\StateMachineExample\Program.cs" label="Program.cs" >

  This is the use of **SuperFluid** in *Program.cs*

```csharp showLineNumbers 
using SimpleFluentExample;

Console.WriteLine("Example Basic calculation state machine");
var result1 = CalculatorService.Create()
    .Add(10)
    .Subtract(3)
    .Add(5)
    .Calculate();

Console.WriteLine($"Result 1: {result1}"); // Output: 12
Console.WriteLine();

// Uncomment these lines to see compilation errors:
// CalculatorService.Create().Calculate();        // Can't calculate without operations  
// CalculatorService.Create().Add(5).Add(10);     // Missing Calculate() at the end

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SuperFluid\src\StateMachineExample\CalculatorService.cs" label="CalculatorService.cs" >

  This is the use of **SuperFluid** in *CalculatorService.cs*

```csharp showLineNumbers 
namespace SimpleFluentExample;

public class CalculatorService : ICalculator
{
    private int _currentValue = 0;

    // Static factory method as required by the generated interface
    public static ICanAddOrSubtract Create()
    {
        var calculator = new CalculatorService();
        Console.WriteLine("🧮 Calculator created");
        return calculator;
    }

    public ICanAddOrSubtractOrCalculate Add(int value)
    {
        _currentValue += value;
        Console.WriteLine($"➕ Added {value}, current value: {_currentValue}");
        return this;
    }

    public ICanAddOrSubtractOrCalculate Subtract(int value)
    {
        _currentValue -= value;
        Console.WriteLine($"➖ Subtracted {value}, current value: {_currentValue}");
        return this;
    }

    public int Calculate()
    {
        Console.WriteLine($"🎯 Final result: {_currentValue}");
        return _currentValue;
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SuperFluid\src\StateMachineExample\obj\GX\SuperFluid\SuperFluid.Internal.SourceGenerators.FluidApiSourceGenerator\ICalculator.fluid.g.cs" label="ICalculator.fluid.g.cs" >


```csharp showLineNumbers 
namespace SimpleFluentExample;

public interface ICalculator: ICanAddOrSubtractOrCalculate,ICanAddOrSubtract
{
	public static abstract ICanAddOrSubtract Create();
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SuperFluid\src\StateMachineExample\obj\GX\SuperFluid\SuperFluid.Internal.SourceGenerators.FluidApiSourceGenerator\ICanAddOrSubtract.fluid.g.cs" label="ICanAddOrSubtract.fluid.g.cs" >


```csharp showLineNumbers 
namespace SimpleFluentExample;

public interface ICanAddOrSubtract
{
	public ICanAddOrSubtractOrCalculate Add(int value);
	public ICanAddOrSubtractOrCalculate Subtract(int value);
}
```

  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\SuperFluid\src\StateMachineExample\obj\GX\SuperFluid\SuperFluid.Internal.SourceGenerators.FluidApiSourceGenerator\ICanAddOrSubtractOrCalculate.fluid.g.cs" label="ICanAddOrSubtractOrCalculate.fluid.g.cs" >


```csharp showLineNumbers 
namespace SimpleFluentExample;

public interface ICanAddOrSubtractOrCalculate
{
	public ICanAddOrSubtractOrCalculate Add(int value);
	public ICanAddOrSubtractOrCalculate Subtract(int value);
	public int Calculate();
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )

:::tip

[Download Example project SuperFluid ](/sources/SuperFluid.zip)

:::


### Share SuperFluid 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSuperFluid&quote=SuperFluid" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSuperFluid&text=SuperFluid:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSuperFluid" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSuperFluid&title=SuperFluid" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSuperFluid&title=SuperFluid&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FSuperFluid" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/SuperFluid

### In the same category (StateMachine) - 0 other generators

