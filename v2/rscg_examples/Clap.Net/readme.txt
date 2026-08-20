# Clap.Net

**A modern, type-safe command-line argument parser for .NET using source generation.**

Clap.Net brings the power and elegance of Rust's [clap](https://github.com/clap-rs/clap) library to the .NET ecosystem. Define your CLI with attributes and properties, and let the source generator handle the rest—no reflection, no runtime overhead, just clean, fast, generated code.

## Why Clap.Net?

**Zero Runtime Overhead**
Source generators produce parsing code at compile time. No reflection, no performance penalties—just pure, optimized C# code.

**Type Safety First**
Your command-line interface is defined using strongly-typed classes and properties. Catch errors at compile time, not runtime.

**Batteries Included**
Automatic help generation, version handling, environment variable fallback, subcommands, and rich argument types—all out of the box.

**Developer Friendly**
Leverage C# language features like `required` properties, nullable types, and pattern matching. Your CLI definition is just normal C# code with a few attributes.

## Quick Start

### Installation

```bash
dotnet add package Clap.Net
```

### Basic Example

Define a command with a simple attribute:

```csharp
using Clap.Net;

[Command(Name = "greet", About = "A friendly greeter", Version = "1.0.0")]
public partial class GreetCommand
{
    [Arg(Short = 'n', Long = "name", Help = "The name to greet")]
    public string Name { get; init; } = "World";

    [Arg(Short = 'v', Long = "verbose")]
    public bool Verbose { get; init; }

    public required string Message { get; init; }
}
```

Parse and use it:

```csharp
var cmd = GreetCommand.Parse(args);
Console.WriteLine($"{cmd.Message}, {cmd.Name}!");
if (cmd.Verbose)
    Console.WriteLine("Verbose mode enabled.");
```

```bash
$ dotnet run -- "Hello" --name "Alice" -v
Hello, Alice!
Verbose mode enabled.

$ dotnet run -- --help
# Displays auto-generated help text
```

## Complete Example with Subcommands

Clap.Net makes complex CLIs easy to build and maintain:

```csharp
using Clap.Net;

namespace Clap.Examples;

[Command(Name = "image-converter", About = "Convert and manage images")]
public partial class ImageConverter
{
    [Arg(Help = "The path of the image to convert")]
    public required string Path { get; init; }

    [Arg(Help = "The destination path (default: <file-name>.[new-ext])", Last = true)]
    public string? DestinationPath { get; init; }

    [Arg(Short = 'e', Long = "extension", Help = "Target image format")]
    public string? Extension { get; init; }

    [Arg(Short = 'v', Long = "verbose", Help = "Enable verbose output")]
    public bool Verbose { get; set; }

    [Command]
    public ImageConverterCommands? Command { get; init; }
}

[SubCommand]
public partial class ImageConverterCommands
{
    [Command(About = "Show conversion history")]
    public partial class History : ImageConverterCommands;

    [Command(About = "Publish converted images")]
    public partial class Publish : ImageConverterCommands
    {
        [Arg(Help = "The URL to publish the image to")]
        public required string[] UploadUrl { get; init; }
    }
}
```

**Using the parser:**

```csharp
var app = ImageConverter.Parse(args);

switch (app.Command)
{
    case ImageConverterCommands.History:
        Console.WriteLine("Showing conversion history...");
        break;

    case ImageConverterCommands.Publish publish:
        Console.WriteLine($"Publishing to {string.Join(", ", publish.UploadUrl)}");
        break;

    default:
        Console.WriteLine($"Converting {app.Path} to {app.Extension ?? "default format"}");
        break;
}
```

**Command-line usage:**

```bash
# Basic conversion
$ dotnet run -- -v "~/Downloads/tree.png" "~/Downloads/tree.jpg"

# With subcommand
$ dotnet run -- "~/Downloads/tree.png" -e "jpg" publish "https://yourdomain.com/upload"

# Get help for subcommands
$ dotnet run -- publish --help
```

## Argument Validation

Clap.Net supports the full `System.ComponentModel.DataAnnotations` validation framework, allowing you to validate argument values at parse time with clear error messages.

### Built-in Validators

Use standard .NET validation attributes to enforce constraints:

```csharp
using System.ComponentModel.DataAnnotations;

[Command(Name = "server", About = "Start a web server")]
public partial class ServerCommand
{
    [Arg(Long = "port")]
    [Range(1, 65535, ErrorMessage = "Port must be between 1 and 65535")]
    public required int Port { get; init; }

    [Arg(Long = "host")]
    [RegularExpression(@"^[a-zA-Z0-9.-]+$", ErrorMessage = "Invalid hostname")]
    public string Host { get; init; } = "localhost";

    [Arg(Long = "email")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public required string Email { get; init; }

    [Arg(Long = "username")]
    [StringLength(20, MinimumLength = 5)]
    [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Only letters, numbers, and underscores allowed")]
    public required string Username { get; init; }
}
```

**Available validators:**
- `[Range(min, max)]` - Numeric range validation
- `[StringLength(max, MinimumLength = min)]` - String length constraints
- `[RegularExpression("pattern")]` - Regex pattern matching
- `[EmailAddress]`, `[Phone]`, `[Url]`, `[CreditCard]` - Format validators
- Multiple validators can be combined on a single property

### Custom Validators

Create your own validators by inheriting from `ValidationAttribute`:

```csharp
public class PortRangeAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        if (value is int port)
            return port >= 1 && port <= 65535;
        return false;
    }
}

[Command]
public partial class MyApp
{
    [Arg(Long = "port")]
    [PortRange(ErrorMessage = "Invalid port number")]
    public required int Port { get; init; }
}
```

### Handling Validation Errors

Validation failures return a `ParseError` with detailed messages:

```csharp
var result = ServerCommand.TryParse(args);

if (result.IsT3) // ParseError
{
    Console.Error.WriteLine(result.AsT3.Message);
    // Output: "Validation failed for 'Port': Port must be between 1 and 65535"
    return 1;
}

var cmd = result.AsT0;
// Use validated command...
```

## Multi-Value Arguments

Clap.Net provides flexible ways to accept multiple values for a single argument, with different behaviors depending on how you define your properties.

### Array Arguments (Per-Flag Values)

For **named arguments** with array types (`string[]`, `int[]`, etc.), each flag invocation captures **one value**. To collect multiple values, repeat the flag:

```csharp
[Command]
public partial class BenchmarkCommand
{
    [Arg(Short = 't', Long = "test", Help = "Tests to run")]
    public string[]? Tests { get; init; }

    // Positional array consumes all remaining positional values
    public string[] Extensions { get; init; } = ["js", "ts"];
}
```

**Usage:**
```bash
# Single value - Tests gets ["unit"], Extensions gets ["py", "go"]
$ app -t unit py go

# Multiple values - repeat the flag for each value
$ app -t unit -t integration py go
# Tests gets ["unit", "integration"], Extensions gets ["py", "go"]

# Without -t, all values go to positional
$ app py go js
# Tests is null/empty, Extensions gets ["py", "go", "js"]
```

**Key behavior:**
- Named array arguments: **One value per flag invocation**
- Positional array arguments: **Greedy - consumes all remaining positional values**
- This prevents named arrays from "stealing" values intended for positional arguments

### Action.Append (Alternative Pattern)

For collection types with `Action.Append`, the behavior is similar but uses `IEnumerable<T>`:

```csharp
[Command]
public partial class TagCommand
{
    [Arg(Short = 't', Long = "tag", Action = ArgAction.Append)]
    public IEnumerable<string> Tags { get; init; } = [];
}
```

**Usage:**
```bash
$ app -t "v1.0" -t "release" -t "stable"
# Tags gets ["v1.0", "release", "stable"]
```

### When to Use Each

| Pattern | Type | Behavior | Use Case |
|---------|------|----------|----------|
| **Array** | `string[]` | One value per flag | Named args that need to work with positional args |
| **Action.Append** | `IEnumerable<T>` | One value per flag | Named args only, more explicit about appending |
| **Positional Array** | `string[]` | Greedy (all remaining) | Variadic trailing arguments (like `files...`) |

### Examples

**File processor with filters and files:**
```csharp
[Command]
public partial class ProcessFiles
{
    [Arg(Short = 'e', Long = "exclude")]
    public string[] ExcludePatterns { get; init; } = [];

    public string[] Files { get; init; } = [];  // Positional
}

// Usage:
$ app -e "*.tmp" -e "*.log" file1.txt file2.txt file3.txt
// ExcludePatterns: ["*.tmp", "*.log"]
// Files: ["file1.txt", "file2.txt", "file3.txt"]
```

**Test runner with specific tests and extensions:**
```csharp
[Command]
public partial class TestRunner
{
    [Arg(Short = 't')]
    public string[]? Tests { get; init; }

    public string[] Extensions { get; init; } = ["js", "ts", "py"];
}

// Usage:
$ app -t unit -t integration go rb
// Tests: ["unit", "integration"]
// Extensions: ["go", "rb"]
```

## Key Features

**Strongly-Typed Parsing**
Define your CLI interface using classes, properties, and attributes. Get compile-time safety and IntelliSense support.

**Powerful Subcommands**
Create complex command hierarchies using nested classes. Each subcommand can have its own arguments and options.

**Rich Argument Types**
Support for strings, numbers, bools, enums, arrays, and any type with `TryParse`. Custom parsing logic is straightforward.

**Automatic Help Generation**
Help text is generated from your attributes and XML documentation comments. Use `--help` on any command or subcommand.

**Environment Variable Fallback**
Options can fallback to environment variables when not provided on the command line.

**Negatable Flags**
Boolean flags can be negated with `--no-*` syntax for flexible configuration.

## Debugging Generated Code

If you're troubleshooting source generation issues or want to inspect the generated parser code, add this to your `.csproj`:

```xml
<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>bin/Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

Generated files will be written to `bin/Generated/`, allowing you to step through the parser logic and understand how arguments are processed.

## Feature Roadmap

Clap.Net aims for near feature-parity with clap-rs. Here's what's implemented and what's coming:

### Implemented

- **Commands**
  - Root command definition with Name, About, and Version
  - Subcommands with nested class hierarchies
  - Automatic help text for all commands

- **Arguments & Options**
  - Short (`-v`) and long (`--verbose`) flags
  - Positional arguments with order-based mapping
  - Required vs optional arguments
  - Environment variable fallback
  - Default values via C# property initializers
  - Multiple values (arrays and collections)
  - TryParse support for custom types
  - Custom parser functions via `ValueParser` attribute
  - Argument actions (Set, Append, Count)
  - Full `ValidationAttribute` support (Range, StringLength, RegularExpression, EmailAddress, custom validators)

- **Flags**
  - Boolean flags (presence/absence)
  - Negatable flags (`--no-debug`)

- **Help & Version**
  - Automatic `--help` generation
  - Automatic `--version` handling
  - Custom help text from XML docs

### Coming Soon

- Argument value suggestions and completion
- More flexible argument ordering
- Improved error messages

## Contributing

Clap.Net is actively developed and there's plenty of work to do! Pull requests are welcome for:

- Bug fixes and performance improvements
- New features from the roadmap
- Documentation and examples
- Test coverage

Check out the [CLAUDE.md](./CLAUDE.md) file for architectural guidance and development patterns.

## License

MIT License - see [LICENSE](./LICENSE) for details
