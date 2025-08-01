[![GitHub Workflow Status CI](https://img.shields.io/github/actions/workflow/status/hughesjs/SuperFluid/dotnet-ci.yml?label=BUILD%20CI&style=for-the-badge&branch=master)](https://github.com/hughesjs/SuperFluid/actions)
[![GitHub Workflow Status CD](https://img.shields.io/github/actions/workflow/status/hughesjs/SuperFluid/dotnet-cd.yml?label=BUILD%20CD&style=for-the-badge&branch=master)](https://github.com/hughesjs/SuperFluid/actions)
![GitHub top language](https://img.shields.io/github/languages/top/hughesjs/SuperFluid?style=for-the-badge)
[![GitHub](https://img.shields.io/github/license/hughesjs/SuperFluid?style=for-the-badge)](LICENSE)
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