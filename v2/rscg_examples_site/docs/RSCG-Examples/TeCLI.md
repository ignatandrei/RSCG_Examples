---
sidebar_position: 2380
title: 238 - TeCLI
description: Parse Command line arguments 
slug: /TeCLI
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveCommandLine.mdx';

# TeCLI  by Tyler Coles


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/TeCLI?label=TeCLI)](https://www.nuget.org/packages/TeCLI/)
[![GitHub last commit](https://img.shields.io/github/last-commit/tyevco/TeCLI?label=updated)](https://github.com/tyevco/TeCLI)
![GitHub Repo stars](https://img.shields.io/github/stars/tyevco/TeCLI?style=social)

## Details

### Info
:::info

Name: **TeCLI**

C# CLI source generator tool

Author: Tyler Coles

NuGet: 
*https://www.nuget.org/packages/TeCLI/*   


You can find more details at https://github.com/tyevco/TeCLI

Source: https://github.com/tyevco/TeCLI

:::

### Author
:::note
Tyler Coles 
![Alt text](https://github.com/tyevco.png)
:::

### Original Readme
:::note

# TeCLI

TeCLI is a source-generated CLI parsing library for .NET that simplifies command-line interface development. Using Roslyn source generators and custom attributes, TeCLI automatically generates type-safe parsing and dispatching logic at compile time.

## Features

- **Source Generation** - Zero-runtime reflection, all code generated at compile time
- **Attribute-Based API** - Simple, declarative command and option definitions
- **Type-Safe Parsing** - Automatic parsing of all primitive types with compile-time validation
- **Help Generation** - Automatic `--help` text generation for commands and actions
- **Roslyn Analyzers** - 12 analyzers providing real-time feedback and error detection
- **Dependency Injection** - Optional DI integration via extension package
- **Async Support** - First-class support for async actions with `Task` and `ValueTask`
- **Short/Long Options** - Support for both `-e` and `--environment` style flags
- **Container Parameters** - Group related options into complex types

## Installation

```bash
dotnet add package TeCLI
```

For dependency injection support:

```bash
dotnet add package TeCLI.Extensions.DependencyInjection
```

## Quick Start

### 1. Define a Command

```csharp
using TeCLI;

[Command("greet", Description = "Greets the user")]
public class GreetCommand
{
    [Primary(Description = "Say hello")]
    public void Hello([Argument(Description = "Name to greet")] string name)
    {
        Console.WriteLine($"Hello, {name}!");
    }

    [Action("goodbye", Description = "Say goodbye")]
    public void Goodbye([Argument] string name)
    {
        Console.WriteLine($"Goodbye, {name}!");
    }
}
```

### 2. Dispatch Commands

```csharp
public class Program
{
    public static async Task Main(string[] args)
    {
        await CommandDispatcher.DispatchAsync(args);
    }
}
```

### 3. Run Your CLI

```bash
# Run primary action
myapp greet John
# Output: Hello, John!

# Run named action
myapp greet goodbye John
# Output: Goodbye, John!

# Get help
myapp --help
myapp greet --help
```

## Attributes Reference

### Command Attributes

#### `[Command("name")]`
Marks a class as a CLI command.

- **Name** (required): Command name as it appears on the command line
- **Description** (optional): Description shown in help text

```csharp
[Command("deploy", Description = "Deploy the application")]
public class DeployCommand \{ }
```

### Action Attributes

#### `[Action("name")]`
Marks a method as a named action (subcommand).

- **Name** (required): Action name
- **Description** (optional): Description shown in help text

```csharp
[Action("start", Description = "Start the service")]
public void Start() \{ }
```

#### `[Primary]`
Marks a method as the default action when no action name is specified.

- Only one `[Primary]` action allowed per command
- Can be combined with `[Action]` for both default and named invocation

```csharp
[Primary(Description = "Run the default action")]
public void Execute() \{ }
```

### Parameter Attributes

#### `[Option("name")]`
Marks a parameter or property as a named option.

- **Name** (required): Long option name (used with `--`)
- **ShortName** (optional): Single-character short name (used with `-`)
- **Description** (optional): Description for help text

```csharp
[Option("environment", ShortName = 'e', Description = "Target environment")]
string environment

[Option("force", ShortName = 'f')] // Boolean switch
bool force
```

#### `[Argument]`
Marks a parameter or property as a positional argument.

- **Description** (optional): Description for help text
- Arguments are positional and required by default
- Use default values to make arguments optional

```csharp
[Argument(Description = "Input file path")]
string inputFile

[Argument(Description = "Output file path")]
string outputFile = "output.txt" // Optional with default
```

## Supported Types

All primitive .NET types are supported for options and arguments:

- **Boolean**: `bool` (switches when used as options)
- **Characters**: `char`
- **Integers**: `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`
- **Floating-point**: `float`, `double`, `decimal`
- **Strings**: `string`

## Help Text Generation

TeCLI automatically generates comprehensive help text for your CLI.

### Reserved Switches

The `--help` and `-h` switches are **reserved** and cannot be used as user-defined option names. They are available at both application and command levels.

### Application-Level Help

```bash
myapp --help
```

Shows all available commands with descriptions.

### Command-Level Help

```bash
myapp deploy --help
```

Shows:
- Command description
- Usage patterns for all actions
- Available actions with descriptions
- Options (including `--help`)

## Dependency Injection

The `TeCLI.Extensions.DependencyInjection` package provides integration with `Microsoft.Extensions.DependencyInjection`.

### Setup

```csharp
using Microsoft.Extensions.DependencyInjection;
using TeCLI.Extensions.DependencyInjection;

IServiceCollection services = new ServiceCollection();

// Register your services
services.AddSingleton<IMyService, MyService>();

// Add command dispatcher
services.AddCommandDispatcher();

// Build and dispatch
var serviceProvider = services.BuildServiceProvider();
var dispatcher = serviceProvider.GetRequiredService<CommandDispatcher>();
await dispatcher.DispatchAsync(args);
```

### Constructor Injection in Commands

```csharp
[Command("process")]
public class ProcessCommand
{
    private readonly IMyService _service;

    public ProcessCommand(IMyService service)
    {
        _service = service;
    }

    [Primary]
    public void Execute()
    {
        _service.DoWork();
    }
}
```

## Async Support

TeCLI fully supports asynchronous actions using `Task` and `ValueTask`:

```csharp
[Command("fetch")]
public class FetchCommand
{
    [Primary]
    public async Task FetchData(string url)
    {
        using var client = new HttpClient();
        var data = await client.GetStringAsync(url);
        Console.WriteLine(data);
    }

    [Action("multiple")]
    public async ValueTask FetchMultiple(string[] urls)
    {
        // Async implementation
    }
}
```

## Container Parameters

Group related options into complex types:

```csharp
public class DeploymentOptions
{
    [Option("environment", ShortName = 'e')]
    public string Environment \{ get; set; }

    [Option("region", ShortName = 'r')]
    public string Region \{ get; set; }

    [Option("verbose", ShortName = 'v')]
    public bool Verbose \{ get; set; }
}

[Command("deploy")]
public class DeployCommand
{
    [Primary]
    public void Execute(DeploymentOptions options)
    {
        Console.WriteLine($"Deploying to {options.Environment} in {options.Region}");
    }
}
```

Usage:
```bash
myapp deploy -e production -r us-west --verbose
```

## Compile-Time Analyzers

TeCLI includes 12 Roslyn analyzers that provide real-time feedback:

### Error-Level (8 analyzers)
- **CLI001**: Options/arguments must use primitive types
- **CLI002**: Option properties must have accessible setters
- **CLI003**: Only one `[Primary]` action allowed per command
- **CLI006**: Command/action/option names cannot be empty
- **CLI007**: Action names must be unique within a command
- **CLI008**: Option names must be unique within an action
- **CLI009**: Argument positions cannot conflict
- **CLI010**: Option short names must be unique within an action

### Warning-Level (4 analyzers)
- **CLI004**: Command names should contain only letters, numbers, and hyphens
- **CLI005**: Option names should contain only letters, numbers, and hyphens
- **CLI011**: Async methods must return `Task` or `ValueTask`
- **CLI012**: Avoid async void in action methods

### Diagnostic Suppressor
- **CLI900**: Suppresses CS8618 nullable warnings for properties with `[Option]`/`[Argument]` attributes (generator initializes them)

## Error Handling

TeCLI provides helpful error messages for common issues:

- Missing required parameters
- Invalid option values
- Unknown commands or actions
- Type conversion failures

All error messages include a suggestion to use `--help` for guidance.

## Examples

### Basic Command with Options

```csharp
[Command("build", Description = "Build the project")]
public class BuildCommand
{
    [Primary(Description = "Build the project")]
    public void Build(
        [Option("configuration", ShortName = 'c', Description = "Build configuration")]
        string configuration = "Debug",

        [Option("output", ShortName = 'o', Description = "Output directory")]
        string output = "./bin",

        [Option("verbose", ShortName = 'v', Description = "Verbose output")]
        bool verbose = false)
    {
        Console.WriteLine($"Building in {configuration} mode...");
        if (verbose)
        {
            Console.WriteLine($"Output: {output}");
        }
    }
}
```

Usage:
```bash
myapp build -c Release -o ./dist --verbose
myapp build --configuration Release --output ./dist -v
```

### Multiple Actions

```csharp
[Command("git")]
public class GitCommand
{
    [Action("commit", Description = "Commit changes")]
    public void Commit(
        [Option("message", ShortName = 'm')] string message,
        [Option("all", ShortName = 'a')] bool all = false)
    {
        Console.WriteLine($"Committing: {message}");
    }

    [Action("push", Description = "Push to remote")]
    public async Task Push(
        [Option("force", ShortName = 'f')] bool force = false)
    {
        await Task.Run(() => Console.WriteLine("Pushing..."));
    }
}
```

Usage:
```bash
myapp git commit -m "Initial commit" --all
myapp git push --force
```

## Framework Support

TeCLI supports .NET 6.0, 7.0, 8.0, 9.0, and 10.0.

**Core Library:** Targets netstandard2.0 for maximum compatibility with source generators.

**Test & Example Projects:** Support .NET 8.0, 9.0, and 10.0.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## Additional Resources

- **Code Coverage**: See [COVERAGE.md](https://github.com/tyevco/TeCLI/COVERAGE.md) for testing and coverage guidelines
- **Benchmarks**: See [TeCLI.Benchmarks/README.md](https://github.com/tyevco/TeCLI/TeCLI.Benchmarks/README.md) for performance benchmarks
- **Integration Tests**: See [TeCLI.Tests/README.md](https://github.com/tyevco/TeCLI/TeCLI.Tests/README.md) for test examples


:::

### About
:::note

Parse Command line arguments 


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **TeCLI**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
	<ItemGroup>
	  <PackageReference Include="Microsoft.Extensions.DependencyInjection.Abstractions" Version="2.1.1" />
	  <PackageReference Include="TeCLI" Version="0.2.5">
	  </PackageReference>
		<PackageReference Include="TeCLI.Extensions.DependencyInjection" Version="0.2.5">
		</PackageReference>

	</ItemGroup>
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\Program.cs" label="Program.cs" >

  This is the use of **TeCLI** in *Program.cs*

```csharp showLineNumbers 
using TeCLI;
using Microsoft.Extensions.DependencyInjection;

Console.WriteLine("Hello, World!");
// execute with makesum sum 10 20

//Do not know how to work those
// --help
// --msg Andrei
// echo --msg Andrei
// sum 10 20

IServiceCollection services = new ServiceCollection();
services.AddCommandDispatcher();

var sp = services.BuildServiceProvider();

var dispatcher = sp.GetRequiredService<CommandDispatcher>();
await dispatcher.DispatchAsync(args);

```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\CmdForSum.cs" label="CmdForSum.cs" >

  This is the use of **TeCLI** in *CmdForSum.cs*

```csharp showLineNumbers 
using TeCLI.Attributes;

namespace ConsoleDemo;

[Command("MakeSum", Description = "Makes sum")]
public  class CmdForSum
{
    [Action("sum")]
    public void MySum([Argument(Description = "x")] int x, [Argument(Description = "y")] int y)
    {
        Console.WriteLine($"Hello, {x+y}!");
    }
}

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX
<Tabs>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\obj\GX\TeCLI\TeCLI.Generators.CommandLineArgsGenerator\CommandDispatcher.Command.CmdForSum.cs" label="CommandDispatcher.Command.CmdForSum.cs" >
```csharp showLineNumbers 
using System;
using System.Linq;
using TeCLI;
using TeCLI.Attributes;
using global::ConsoleDemo;

namespace TeCLI
{
    public partial class CommandDispatcher
    {
        private async Task DispatchCmdForSumAsync(string[] args)
        {
            if (args.Length == 0)
            {
                throw new Exception();
            }
            else
            {
                string action = args[0].ToLower();
                string[] remainingArgs = args.Skip(1).ToArray();
                switch (action)
                {
                    case "sum":
                    {
                        ProcessCmdForSumMySum(remainingArgs);
                        break;
                    }
                    default:
                    {
                        Console.WriteLine($"Unknown action: {action}");
                        break;
                    }
                }
            }
        }

        private void ProcessCmdForSumMySum(string[] args)
        {
            if (args.Length == 0)
            {
                throw new Exception();
            }
            else
            {
                int p0 = default;
                {
                    if (args.Length < 1)
                    {
                        throw new ArgumentException("Required argument 'x' not provided.");
                    }
                    else
                    {
                        try
                        {
                            p0 = (int)Convert.ChangeType(args[0], typeof(int));
                        }
                        catch
                        {
                            throw new ArgumentException("Invalid syntax provided for argument 'x'.");
                        }
                    }
                }
                int p1 = default;
                {
                    if (args.Length < 2)
                    {
                        throw new ArgumentException("Required argument 'y' not provided.");
                    }
                    else
                    {
                        try
                        {
                            p1 = (int)Convert.ChangeType(args[1], typeof(int));
                        }
                        catch
                        {
                            throw new ArgumentException("Invalid syntax provided for argument 'y'.");
                        }
                    }
                }

                // Now invoke the method with the parsed parameters
                InvokeCommandAction<CmdForSum>(command => command.MySum(p0, p1));
            }
        }

    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\obj\GX\TeCLI\TeCLI.Generators.CommandLineArgsGenerator\CommandDispatcher.Command.CmdForSum.Documentation.cs" label="CommandDispatcher.Command.CmdForSum.Documentation.cs" >
```csharp showLineNumbers 
using System;

namespace TeCLI
{
    public partial class CommandDispatcher
    {
        public static void DisplayCommandCmdForSumHelp(string actionName = null)
        {
            Console.WriteLine("Please provide more details...");
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\obj\GX\TeCLI\TeCLI.Generators.CommandLineArgsGenerator\CommandDispatcher.cs" label="CommandDispatcher.cs" >
```csharp showLineNumbers 
using System;
using System.Linq;

namespace TeCLI
{
    public partial class CommandDispatcher
    {
        public async Task DispatchAsync(string[] args)
        {
            if (args.Length == 0)
            {
                DisplayApplicationHelp();
            }
            else
            {

                string command = args[0].ToLower();
                string[] remainingArgs = args.Skip(1).ToArray();

                switch (command)
                {
                    case "makesum":
                    {
                        await DispatchCmdForSumAsync(remainingArgs);
                        break;
                    }

                    default:
                    {
                        Console.WriteLine($"Unknown command: {args[0]}");
                        DisplayApplicationHelp();
                        break;
                    }
                }
            }
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\obj\GX\TeCLI\TeCLI.Generators.CommandLineArgsGenerator\CommandDispatcher.Documentation.cs" label="CommandDispatcher.Documentation.cs" >
```csharp showLineNumbers 
using System;

namespace TeCLI
{
    public partial class CommandDispatcher
    {
        public static void DisplayApplicationHelp()
        {
            Console.WriteLine("Please provide more details...");
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\obj\GX\TeCLI.Extensions.DependencyInjection\TeCLI.Extensions.DependencyInjection.Generators.DependencyInjectionInvokerGenerator\CommandDispatcher.Invoker.cs" label="CommandDispatcher.Invoker.cs" >
```csharp showLineNumbers 
using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace TeCLI
{
    public partial class CommandDispatcher
    {
        private IServiceProvider ServiceProvider \{ get; }

        public CommandDispatcher(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        async Task InvokeCommandActionAsync<TCommand>(Func<TCommand, Task> parameterizedAction)
        {
            var command = ServiceProvider.GetRequiredService<TCommand>();
            await parameterizedAction?.Invoke(command);
        }

        void InvokeCommandAction<TCommand>(Action<TCommand> parameterizedAction)
        {
            var command = ServiceProvider.GetRequiredService<TCommand>();
            parameterizedAction?.Invoke(command);
        }
    }
}

```
  </TabItem>


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\TeCLI\src\ConsoleDemo\obj\GX\TeCLI.Extensions.DependencyInjection\TeCLI.Extensions.DependencyInjection.Generators.DependencyInjectionInvokerGenerator\CommandDispatcher.Registrations.cs" label="CommandDispatcher.Registrations.cs" >
```csharp showLineNumbers 
using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace TeCLI
{
    public static class CommandDispatcherExtensions
    {
        public static IServiceCollection AddCommandDispatcher(this IServiceCollection services)
        {
            services.AddSingleton<CommandDispatcher>();
            services.AddSingleton<global::ConsoleDemo.CmdForSum>();
            return services;
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project TeCLI ](/sources/TeCLI.zip)

:::


### Share TeCLI 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTeCLI&quote=TeCLI" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTeCLI&text=TeCLI:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTeCLI" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTeCLI&title=TeCLI" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTeCLI&title=TeCLI&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FTeCLI" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/TeCLI

<SameCategory />

