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
public class DeployCommand { }
```

### Action Attributes

#### `[Action("name")]`
Marks a method as a named action (subcommand).

- **Name** (required): Action name
- **Description** (optional): Description shown in help text

```csharp
[Action("start", Description = "Start the service")]
public void Start() { }
```

#### `[Primary]`
Marks a method as the default action when no action name is specified.

- Only one `[Primary]` action allowed per command
- Can be combined with `[Action]` for both default and named invocation

```csharp
[Primary(Description = "Run the default action")]
public void Execute() { }
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
    public string Environment { get; set; }

    [Option("region", ShortName = 'r')]
    public string Region { get; set; }

    [Option("verbose", ShortName = 'v')]
    public bool Verbose { get; set; }
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

- **Code Coverage**: See [COVERAGE.md](COVERAGE.md) for testing and coverage guidelines
- **Benchmarks**: See [TeCLI.Benchmarks/README.md](TeCLI.Benchmarks/README.md) for performance benchmarks
- **Integration Tests**: See [TeCLI.Tests/README.md](TeCLI.Tests/README.md) for test examples
