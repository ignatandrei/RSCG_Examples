---
sidebar_position: 1410
title: 141 - ActorSrcGen
description: Generating source code for actors in C#.
slug: /ActorSrcGen
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# ActorSrcGen  by Andrew Matthews


<TOCInline toc={toc}  />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/ActorSrcGen?label=ActorSrcGen)](https://www.nuget.org/packages/ActorSrcGen/)
[![GitHub last commit](https://img.shields.io/github/last-commit/aabs/ActorSrcGen?label=updated)](https://github.com/aabs/ActorSrcGen)
![GitHub Repo stars](https://img.shields.io/github/stars/aabs/ActorSrcGen?style=social)

## Details

### Info
:::info

Name: **ActorSrcGen**

A C# Source Generator to adapt a simple class to allow it to use TPL Dataflow for robust high performance computation

Author: Andrew Matthews

NuGet: 
*https://www.nuget.org/packages/ActorSrcGen/*   


You can find more details at https://github.com/aabs/ActorSrcGen

Source: https://github.com/aabs/ActorSrcGen

:::

### Original Readme
:::note

# Welcome To ActorSrcGen 
 
ActorSrcGen is a C# Source Generator allowing the conversion of simple C#
classes into Dataflow compatible pipelines supporting the actor model.

ActorSrcGen is currently a solo effort to create a useful and powerful source
code generator to simplify the creation of high performance pipeline code
conforming to the actor model.  We welcome any feedback, suggestions, and
contributions from the community.

If you encounter any issues or have any questions, please don't hesitate to
submit an issue report.  This helps me understand any problems or limitations of
the project and allows me to address them promptly.

If you have an idea for a new feature or enhancement, I encourage you to submit
a feature request.  Your input will shape the future direction of ActorSrcGen
and help make it even better.

If you have any code changes or improvements you'd like to contribute, I welcome
pull requests (PRs).  Please follow the guidelines provided in our project's
contribution guidelines and README file.  I will review your changes and
provide feedback, helping you ensure a smooth integration process.


## How Do You Use It?

It's really easy to use ActorSrcGen to inject pipeline processing code into your project.

1. Install the Nuget Package into your project
    ```shell
    dotnet add package ActorSrcGen --version 1.0.2
    ```

1. Adorn your actor class with the Actor Attribute

    ```csharp
    [Actor]
    public class MyActor{ . . . }
    ```

2. Define the initial starting step of your pipeline, being sure to indicate what step comes next
   ```csharp
   [FirstStep("SomeName")]
   [NextStep(nameof(DecodeMsg))]
   [NextStep(nameof(LogMsg))]
   public string ReceiveMsgFromSomewhere(string x){ . . . }
   ```
 
3. Add a sequence of intermediate steps
   ```csharp
   [Step, NextStep(nameof(ProcessMsg))]
   public Request DecodeMsg(string x){ . . . }

   [Step]
   public void LogMsg(string x){ . . . }
   ```

4. Finish up with the last step
   ```csharp
   [LastStep]
   public void ProcessMsg(Request req){ . . . }
   ```

Behind the scenes, the source generator will generate the wiring for your actor,
so that all you then need to do is invoke the actor with a call to `Call` or
`Cast` depending on whether you want the invocation to be blocking or not.

```csharp
var a = new MyActor();
a.Call("hello world!");
```

Naturally there are various other details related to DataflowEx and TPL dataflow
that you can take advantage of, but the gist is to make the actor as simple as
that to write.  The generator will create the wiring.  You just need to
implement the steps of the pipeline itself.


## What It Does

The source generator in the provided code is a tool that automatically generates
additional code based on a simple C# class.  Its purpose is to simplify the
usage of TPL Dataflow, a library that helps with writing robust and performant
asynchronous and concurrent code in .NET.  In this specific case, the source
generator takes a regular C# class and extends it by generating the necessary
boilerplate code to use TPL Dataflow.  The generated code creates a pipeline of
dataflow components that support the actor model.

The generated code includes the following components

* **TransformManyBlock**: This block transforms input data and produces multiple
  output data items.
* **ActionBlock**: This block performs an action on the input data without producing
  any output.
* **DataflowLinkOptions**: This class specifies options for linking dataflow blocks
  together.
* **ExecutionDataflowBlockOptions**: This class specifies options for configuring
  the execution behavior of dataflow blocks.

The generated code also includes the necessary wiring to connect the methods of
the original class together using the TPL Dataflow components.  This allows the
methods to be executed in a coordinated and concurrent manner.

Overall, the source generator simplifies the process of using TPL Dataflow by
automatically generating the code that would otherwise need to be written
manually.  It saves developers from writing a lot of boilerplate code and allows
them to focus on the core logic of their application.

```csharp
[Actor]
public partial class MyActor
{
    public List<int> Results { get; set; } = [];
    public int Counter { get; set; }

    [FirstStep("blah")]
    [Receiver]
    [NextStep(nameof(DoTask2))]
    [NextStep(nameof(LogMessage))]
    public Task<string> DoTask1(int x)
    {
        Console.WriteLine("DoTask1");

        return Task.FromResult(x.ToString());
    }

    protected async partial Task<int> ReceiveDoTask1(CancellationToken ct)
    {
        await Task.Delay(1000, ct);

        return Counter++;
    }


    [Step]
    [NextStep(nameof(DoTask3))]
    public Task<string> DoTask2(string x)
    {
        Console.WriteLine("DoTask2");

        return Task.FromResult($"100{x}");
    }

    [LastStep]
    public async Task<int> DoTask3(string input)
    {
        await Console.Out.WriteLineAsync("DoTask3");
        var result = int.Parse(input);
        Results.Add(result);

        return result;
    }

    [LastStep]
    public void LogMessage(string x)
    {
        Console.WriteLine("Incoming Message: " + x);
    }
}
```

And the source generator will extend it, adding the boilerplate TPL Dataflow
code to wire the methods together in a clean way:

```csharp
// Generated on 2024-05-08
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
#pragma warning disable CS0108 // hides inherited member.

namespace ActorSrcGen.Abstractions.Playground;
using System.Threading.Tasks.Dataflow;
using Gridsum.DataflowEx;
public partial class MyActor : Dataflow<Int32, Int32>, IActor<Int32>
{
    public MyActor() : base(DataflowOptions.Default)
    {
        _LogMessage = new ActionBlock<String>(        (String x) => {
            try
            {
                LogMessage(x);
            }catch{}
        },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_LogMessage);
        _DoTask3 = new TransformManyBlock<String,Int32>(       async (String x) => {
           var result = new List<Int32>();
           try
           {
               var newValue = await DoTask3(x);
               result.Add(newValue);
           }catch{}
           return result;
       },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_DoTask3);
        _DoTask2 = new TransformManyBlock<String,String>(       async (String x) => {
           var result = new List<String>();
           try
           {
               var newValue = await DoTask2(x);
               result.Add(newValue);
           }catch{}
           return result;
       },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_DoTask2);
        _DoTask1 = new TransformManyBlock<Int32,String>(       async (Int32 x) => {
           var result = new List<String>();
           try
           {
               var newValue = await DoTask1(x);
               result.Add(newValue);
           }catch{}
           return result;
       },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_DoTask1);
        _DoTask1BC = new BroadcastBlock<String>(    (String x) => x,
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_DoTask1BC);
        _DoTask2.LinkTo(_DoTask3, new DataflowLinkOptions { PropagateCompletion = true });
        _DoTask1.LinkTo(_DoTask1BC, new DataflowLinkOptions { PropagateCompletion = true });
        _DoTask1BC.LinkTo(_LogMessage, new DataflowLinkOptions { PropagateCompletion = true });
        _DoTask1BC.LinkTo(_DoTask2, new DataflowLinkOptions { PropagateCompletion = true });
    }

    ActionBlock<String> _LogMessage;

    TransformManyBlock<String,Int32> _DoTask3;

    TransformManyBlock<String,String> _DoTask2;

    TransformManyBlock<Int32,String> _DoTask1;

    BroadcastBlock<String> _DoTask1BC;
    protected partial Task<Int32> ReceiveDoTask1(CancellationToken cancellationToken);
    public async Task ListenForReceiveDoTask1(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            Int32 incomingValue = await ReceiveDoTask1(cancellationToken);
            Call(incomingValue);
        }
    }
    public override ITargetBlock<Int32> InputBlock { get => _DoTask1; }
    public override ISourceBlock<Int32> OutputBlock { get => _DoTask3; }
    public bool Call(Int32 input)
        => InputBlock.Post(input);

    public async Task<bool> Cast(Int32 input)
        => await InputBlock.SendAsync(input);
    public async Task<Int32> AcceptAsync(CancellationToken cancellationToken)
    {
        try
        {
            var result = await _DoTask3.ReceiveAsync(cancellationToken);
            return result;
        }
        catch (OperationCanceledException operationCanceledException)
        {
            return Task.FromCanceled<int>(cancellationToken);        
        }
    }
}
```

Use of your class is a straightforward call to send a message to the actor:

```csharp
var actor = new MyActor();

try
{
    if (actor.Call(10))
        Console.WriteLine("Called Synchronously");

    var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

    var t = Task.Run(async () => await actor.ListenForReceiveDoTask1(cts.Token), cts.Token);

    while (!cts.Token.IsCancellationRequested)
    {
        var result = await actor.AcceptAsync(cts.Token);
        Console.WriteLine($"Result: {result}");
    }

    await actor.SignalAndWaitForCompletionAsync();
}
catch (OperationCanceledException operationCanceledException)
{
    Console.WriteLine("All Done!");
}

```

Which produces what you would expect:

```
Called Synchronously
DoTask1
Incoming Message: 10
DoTask2
DoTask3
Result: 10010
DoTask1
Incoming Message: 0
DoTask2
DoTask3
Result: 1000
DoTask1
DoTask2
Incoming Message: 1
DoTask3
Result: 1001
DoTask1
DoTask2
Incoming Message: 2
DoTask3
Result: 1002
DoTask1
DoTask2
DoTask3
Result: 1003
Incoming Message: 3
All Done!
```


## Why Bother?

You might be wondering what the architectural benefits of using a model like
this might be.

Writing robust and performant asynchronous and concurrent code in .NET is a
laborious process.  TPL Dataflow makes it easier - it "*provides dataflow
components to help increase the robustness of concurrency-enabled applications.
This dataflow model promotes actor-based programming by providing in-process
message passing for coarse-grained dataflow and pipelining tasks*" (see
[docs](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/dataflow-task-parallel-library)).

ActorSrcGen allows you to take advantage of that model without needing to write
a lot of the necessary boilerplate code.


### The Actor Model
The Actor Model is a programming paradigm that is based on the concept of
actors, which are autonomous units of computation.  It has several benefits in
programming:

1. **Concurrency**: Actors can be executed concurrently, allowing for efficient
   use of multiple CPU cores.  This can lead to significant performance
   improvements in systems that require concurrent execution.
1. **Fault tolerance**: Actors can be designed to be fault-tolerant, meaning
   that if an actor fails or crashes, it can be restarted without affecting the
   rest of the system.  This can improve the reliability and availability of the
   system.
1. **Encapsulation**: Actors encapsulate their state and behavior, making it
   easier to reason about and test the code.  This can lead to better code
   quality and maintainability.

### TPL Dataflow

The Task Parallel Library (TPL) Dataflow in .NET provides a powerful framework
for building high-throughput systems.  Here are some benefits of using TPL
Dataflow for high-throughput systems:

1. **Efficiency**: TPL Dataflow is designed to optimize the execution of tasks
   and dataflows.  It automatically manages the execution of tasks based on
   available resources, reducing unnecessary overhead and maximizing throughput.
1. **Scalability**: TPL Dataflow allows you to easily scale your system by
   adding or removing processing blocks.  You can dynamically adjust the number
   of processing blocks based on the workload, ensuring that your system can
   handle varying levels of throughput.
1. **Flexibility**: TPL Dataflow provides a variety of processing blocks, such
   as buffers, transform blocks, and action blocks, which can be combined and
   customized to fit your specific requirements.  This flexibility allows you to
   build complex dataflows that can handle different types of data and
   processing logic.



## Acknowledgements

The generated source builds atop
[DataflowEx](https://github.com/gridsum/DataflowEx) for a clean stateful
object-oriented wrapper around your pipeline.

With thanks to:

- Gridsum [DataflowEx](https://github.com/gridsum/DataflowEx)
- [Bnaya.SourceGenerator.Template](https://github.com/bnayae/Bnaya.SourceGenerator.Template) (see [article](https://blog.stackademic.com/source-code-generators-diy-f04229c59e1a))


:::

### About
:::note

Generating source code for actors in C#.


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **ActorSrcGen**
```xml showLineNumbers {11}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="ActorSrcGen" Version="1.1.2" />
    <PackageReference Include="ActorSrcGen.Abstractions" Version="1.1.2" />
    <PackageReference Include="Gridsum.DataflowEx" Version="2.0.0" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ActorSrcGen\src\ActorDemo\Program.cs" label="Program.cs" >

  This is the use of **ActorSrcGen** in *Program.cs*

```csharp showLineNumbers 
// See https://aka.ms/new-console-template for more information
using ActorDemo;
using Gridsum.DataflowEx;

Person person = new Person { Name = "Andrei Ignat" };

DayWorkflow dayAndreiIgnat = new ();
var input = dayAndreiIgnat.InputBlock;
//async
await dayAndreiIgnat.SendAsync(person);
//sync
while (dayAndreiIgnat.Call(person))
{
    await Task.Delay(100);
}

Console.WriteLine("Done");
Console.ReadLine();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ActorSrcGen\src\ActorDemo\DayWorkflow.cs" label="DayWorkflow.cs" >

  This is the use of **ActorSrcGen** in *DayWorkflow.cs*

```csharp showLineNumbers 
using ActorSrcGen;
using System.Diagnostics.Metrics;

namespace ActorDemo;
[Actor]
partial class DayWorkflow
{
    [FirstStep("StartDay")]
    //[Receiver]
    [NextStep(nameof(WashFace))]
    [NextStep(nameof(LogMessage))]
    public async Task<Person> StartDay(Person p)
    {
        await Task.Delay(1000 );
        return p;
    }

    

    [Step]
    [NextStep(nameof(LogMessage))]
    [NextStep(nameof(Eat))]
    public async Task<Person> WashFace(Person p)
    {
        await Task.Delay(1000);
        return p;
    }
    


    [Step]
    [NextStep(nameof(LogMessage))]
    [NextStep(nameof(Sleep))]
    public async Task<Person> Eat(Person p)
    {
        await Task.Delay(1000);
        return p;
    }
    

    [NextStep(nameof(LogMessage))]
    public async Task<int> Sleep(Person p)
    {
        await Task.Delay(1000);
        return p.Name.Length;
    }

    [LastStep]
    public void LogMessage(Person x)
    {
        Console.WriteLine("Incoming Message: " + x?.Name);
    }


}

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ActorSrcGen\src\ActorDemo\Person.cs" label="Person.cs" >

  This is the use of **ActorSrcGen** in *Person.cs*

```csharp showLineNumbers 

namespace ActorDemo;
public class Person
{
    public string Name { get; set; }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\ActorSrcGen\src\ActorDemo\obj\GX\ActorSrcGen\ActorSrcGen.Generator\DayWorkflow.generated.cs" label="DayWorkflow.generated.cs" >


```csharp showLineNumbers 
// Generated on 2025-07-24
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
#pragma warning disable CS0108 // hides inherited member.

using ActorSrcGen;
using System.Diagnostics.Metrics;
namespace ActorDemo;
using System.Threading.Tasks.Dataflow;
using Gridsum.DataflowEx;
public partial class DayWorkflow : Dataflow<Person>, IActor<Person>
{
    public DayWorkflow() : base(DataflowOptions.Default)
    {
        _LogMessage = new ActionBlock<Person>(        (Person x) => {
            try
            {
                LogMessage(x);
            }catch{}
        },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_LogMessage);
        _Eat = new TransformManyBlock<Person,Person>(       async (Person x) => {
           var result = new List<Person>();
           try
           {
               var newValue = await Eat(x);
               result.Add(newValue);
           }catch{}
           return result;
       },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_Eat);
        _EatBC = new BroadcastBlock<Person>(    (Person x) => x,
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_EatBC);
        _WashFace = new TransformManyBlock<Person,Person>(       async (Person x) => {
           var result = new List<Person>();
           try
           {
               var newValue = await WashFace(x);
               result.Add(newValue);
           }catch{}
           return result;
       },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_WashFace);
        _WashFaceBC = new BroadcastBlock<Person>(    (Person x) => x,
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_WashFaceBC);
        _StartDay = new TransformManyBlock<Person,Person>(       async (Person x) => {
           var result = new List<Person>();
           try
           {
               var newValue = await StartDay(x);
               result.Add(newValue);
           }catch{}
           return result;
       },
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_StartDay);
        _StartDayBC = new BroadcastBlock<Person>(    (Person x) => x,
            new ExecutionDataflowBlockOptions() {
                BoundedCapacity = 5,
                MaxDegreeOfParallelism = 8
        });
        RegisterChild(_StartDayBC);
        _Eat.LinkTo(_EatBC, new DataflowLinkOptions { PropagateCompletion = true });
        _EatBC.LinkTo(_LogMessage, new DataflowLinkOptions { PropagateCompletion = true });
        _WashFace.LinkTo(_WashFaceBC, new DataflowLinkOptions { PropagateCompletion = true });
        _WashFaceBC.LinkTo(_LogMessage, new DataflowLinkOptions { PropagateCompletion = true });
        _WashFaceBC.LinkTo(_Eat, new DataflowLinkOptions { PropagateCompletion = true });
        _StartDay.LinkTo(_StartDayBC, new DataflowLinkOptions { PropagateCompletion = true });
        _StartDayBC.LinkTo(_LogMessage, new DataflowLinkOptions { PropagateCompletion = true });
        _StartDayBC.LinkTo(_WashFace, new DataflowLinkOptions { PropagateCompletion = true });
    }

    ActionBlock<Person> _LogMessage;

    TransformManyBlock<Person,Person> _Eat;

    BroadcastBlock<Person> _EatBC;

    TransformManyBlock<Person,Person> _WashFace;

    BroadcastBlock<Person> _WashFaceBC;

    TransformManyBlock<Person,Person> _StartDay;

    BroadcastBlock<Person> _StartDayBC;
    public override ITargetBlock<Person> InputBlock { get => _StartDay; }
    public bool Call(Person input)
        => InputBlock.Post(input);

    public async Task<bool> Cast(Person input)
        => await InputBlock.SendAsync(input);
}

```

  </TabItem>


</Tabs>

## Useful

### Download Example (.NET  C# )

:::tip

[Download Example project ActorSrcGen ](/sources/ActorSrcGen.zip)

:::


### Share ActorSrcGen 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FActorSrcGen&quote=ActorSrcGen" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FActorSrcGen&text=ActorSrcGen:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FActorSrcGen" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FActorSrcGen&title=ActorSrcGen" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FActorSrcGen&title=ActorSrcGen&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FActorSrcGen" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/ActorSrcGen

### In the same category (Actor) - 0 other generators

