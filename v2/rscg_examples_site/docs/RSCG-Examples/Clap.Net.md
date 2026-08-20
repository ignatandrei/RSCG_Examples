---
sidebar_position: 2820
title: 282 - Clap.Net
description: Command line arguments parsing
slug: /Clap.Net
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';
import SameCategory from '../Categories/_PrimitiveCommandLine.mdx';

# Clap.Net  by Simon Curtis


<TOCInline toc={toc}  minHeadingLevel={2}  maxHeadingLevel={2} />

## NuGet / site data
[![Nuget](https://img.shields.io/nuget/dt/Clap.Net?label=Clap.Net)](https://www.nuget.org/packages/Clap.Net/)
[![GitHub last commit](https://img.shields.io/github/last-commit/simon-curtis/Clap.Net?label=updated)](https://github.com/simon-curtis/Clap.Net)
![GitHub Repo stars](https://img.shields.io/github/stars/simon-curtis/Clap.Net?style=social)

## Details

### Info
:::info

Name: **Clap.Net**

Package Description

Author: Simon Curtis

NuGet: 
*https://www.nuget.org/packages/Clap.Net/*   


You can find more details at https://github.com/simon-curtis/Clap.Net

Source: https://github.com/simon-curtis/Clap.Net

:::

### Author
:::note
Simon Curtis 
![Alt text](https://github.com/simon-curtis.png)
:::

## Original Readme
:::note

### Clap.Net

**A modern, type-safe command-line argument parser for .NET using source generation.**

Clap.Net brings the power and elegance of Rust's [clap](https://github.com/clap-rs/clap) library to the .NET ecosystem. Define your CLI with attributes and properties, and let the source generator handle the rest—no reflection, no runtime overhead, just clean, fast, generated code.

###### Why Clap.Net?

**Zero Runtime Overhead**
Source generators produce parsing code at compile time. No reflection, no performance penalties—just pure, optimized C# code.

**Type Safety First**
Your command-line interface is defined using strongly-typed classes and properties. Catch errors at compile time, not runtime.

**Batteries Included**
Automatic help generation, version handling, environment variable fallback, subcommands, and rich argument types—all out of the box.

**Developer Friendly**
Leverage C# language features like `required` properties, nullable types, and pattern matching. Your CLI definition is just normal C# code with a few attributes.

###### Quick Start

######### Installation

```bash
dotnet add package Clap.Net
```

######### Basic Example

Define a command with a simple attribute:

```csharp
using Clap.Net;

[Command(Name = "greet", About = "A friendly greeter", Version = "1.0.0")]
public partial class GreetCommand
{
    [Arg(Short = 'n', Long = "name", Help = "The name to greet")]
    public string Name \{ get; init; \} = "World";

    [Arg(Short = 'v', Long = "verbose")]
    public bool Verbose \{ get; init; }

    public required string Message \{ get; init; }
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
### Displays auto-generated help text
```

###### Complete Example with Subcommands

Clap.Net makes complex CLIs easy to build and maintain:

```csharp
using Clap.Net;

namespace Clap.Examples;

[Command(Name = "image-converter", About = "Convert and manage images")]
public partial class ImageConverter
{
    [Arg(Help = "The path of the image to convert")]
    public required string Path \{ get; init; }

    [Arg(Help = "The destination path (default: <file-name>.[new-ext])", Last = true)]
    public string? DestinationPath \{ get; init; }

    [Arg(Short = 'e', Long = "extension", Help = "Target image format")]
    public string? Extension \{ get; init; }

    [Arg(Short = 'v', Long = "verbose", Help = "Enable verbose output")]
    public bool Verbose \{ get; set; }

    [Command]
    public ImageConverterCommands? Command \{ get; init; }
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
        public required string[] UploadUrl \{ get; init; }
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
### Basic conversion
$ dotnet run -- -v "~/Downloads/tree.png" "~/Downloads/tree.jpg"

### With subcommand
$ dotnet run -- "~/Downloads/tree.png" -e "jpg" publish "https://yourdomain.com/upload"

### Get help for subcommands
$ dotnet run -- publish --help
```

###### Argument Validation

Clap.Net supports the full `System.ComponentModel.DataAnnotations` validation framework, allowing you to validate argument values at parse time with clear error messages.

######### Built-in Validators

Use standard .NET validation attributes to enforce constraints:

```csharp
using System.ComponentModel.DataAnnotations;

[Command(Name = "server", About = "Start a web server")]
public partial class ServerCommand
{
    [Arg(Long = "port")]
    [Range(1, 65535, ErrorMessage = "Port must be between 1 and 65535")]
    public required int Port \{ get; init; }

    [Arg(Long = "host")]
    [RegularExpression(@"^[a-zA-Z0-9.-]+$", ErrorMessage = "Invalid hostname")]
    public string Host \{ get; init; \} = "localhost";

    [Arg(Long = "email")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public required string Email \{ get; init; }

    [Arg(Long = "username")]
    [StringLength(20, MinimumLength = 5)]
    [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Only letters, numbers, and underscores allowed")]
    public required string Username \{ get; init; }
}
```

**Available validators:**
- `[Range(min, max)]` - Numeric range validation
- `[StringLength(max, MinimumLength = min)]` - String length constraints
- `[RegularExpression("pattern")]` - Regex pattern matching
- `[EmailAddress]`, `[Phone]`, `[Url]`, `[CreditCard]` - Format validators
- Multiple validators can be combined on a single property

######### Custom Validators

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
    public required int Port \{ get; init; }
}
```

######### Handling Validation Errors

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

###### Multi-Value Arguments

Clap.Net provides flexible ways to accept multiple values for a single argument, with different behaviors depending on how you define your properties.

######### Array Arguments (Per-Flag Values)

For **named arguments** with array types (`string[]`, `int[]`, etc.), each flag invocation captures **one value**. To collect multiple values, repeat the flag:

```csharp
[Command]
public partial class BenchmarkCommand
{
    [Arg(Short = 't', Long = "test", Help = "Tests to run")]
    public string[]? Tests \{ get; init; }

    // Positional array consumes all remaining positional values
    public string[] Extensions \{ get; init; \} = ["js", "ts"];
}
```

**Usage:**
```bash
### Single value - Tests gets ["unit"], Extensions gets ["py", "go"]
$ app -t unit py go

### Multiple values - repeat the flag for each value
$ app -t unit -t integration py go
### Tests gets ["unit", "integration"], Extensions gets ["py", "go"]

### Without -t, all values go to positional
$ app py go js
### Tests is null/empty, Extensions gets ["py", "go", "js"]
```

**Key behavior:**
- Named array arguments: **One value per flag invocation**
- Positional array arguments: **Greedy - consumes all remaining positional values**
- This prevents named arrays from "stealing" values intended for positional arguments

######### Action.Append (Alternative Pattern)

For collection types with `Action.Append`, the behavior is similar but uses `IEnumerable<T>`:

```csharp
[Command]
public partial class TagCommand
{
    [Arg(Short = 't', Long = "tag", Action = ArgAction.Append)]
    public IEnumerable<string> Tags \{ get; init; \} = [];
}
```

**Usage:**
```bash
$ app -t "v1.0" -t "release" -t "stable"
### Tags gets ["v1.0", "release", "stable"]
```

######### When to Use Each

| Pattern | Type | Behavior | Use Case |
|---------|------|----------|----------|
| **Array** | `string[]` | One value per flag | Named args that need to work with positional args |
| **Action.Append** | `IEnumerable<T>` | One value per flag | Named args only, more explicit about appending |
| **Positional Array** | `string[]` | Greedy (all remaining) | Variadic trailing arguments (like `files...`) |

######### Examples

**File processor with filters and files:**
```csharp
[Command]
public partial class ProcessFiles
{
    [Arg(Short = 'e', Long = "exclude")]
    public string[] ExcludePatterns \{ get; init; \} = [];

    public string[] Files \{ get; init; \} = [];  // Positional
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
    public string[]? Tests \{ get; init; }

    public string[] Extensions \{ get; init; \} = ["js", "ts", "py"];
}

// Usage:
$ app -t unit -t integration go rb
// Tests: ["unit", "integration"]
// Extensions: ["go", "rb"]
```

###### Key Features

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

###### Debugging Generated Code

If you're troubleshooting source generation issues or want to inspect the generated parser code, add this to your `.csproj`:

```xml
<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
    <CompilerGeneratedFilesOutputPath>bin/Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>
```

Generated files will be written to `bin/Generated/`, allowing you to step through the parser logic and understand how arguments are processed.

###### Feature Roadmap

Clap.Net aims for near feature-parity with clap-rs. Here's what's implemented and what's coming:

######### Implemented

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

######### Coming Soon

- Argument value suggestions and completion
- More flexible argument ordering
- Improved error messages

###### Contributing

Clap.Net is actively developed and there's plenty of work to do! Pull requests are welcome for:

- Bug fixes and performance improvements
- New features from the roadmap
- Documentation and examples
- Test coverage

Check out the [CLAUDE.md](https://github.com/simon-curtis/Clap.Net/CLAUDE.md) file for architectural guidance and development patterns.

###### License

MIT License - see [LICENSE](https://github.com/simon-curtis/Clap.Net/LICENSE) for details


:::

### About
:::note

Command line arguments parsing


:::

## How to use

### Example (source csproj, source files)

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **Clap.Net**
```xml showLineNumbers {14}
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
	  <PackageReference Include="Clap.Net" Version="0.2.39" />
	</ItemGroup>
	
</Project>

```

</TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Clap.Net\src\ConsoleDemo\Program.cs" label="Program.cs" >

  This is the use of **Clap.Net** in *Program.cs*

```csharp showLineNumbers 
using ConsoleDemo;


// --help
// -f 10 -s 20
var cmd = CmdForSum.Parse(args);
cmd.MySum();
```
  </TabItem>

  <TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Clap.Net\src\ConsoleDemo\CmdForSum.cs" label="CmdForSum.cs" >

  This is the use of **Clap.Net** in *CmdForSum.cs*

```csharp showLineNumbers 

using Clap.Net;

namespace ConsoleDemo;

[Command(Name = "MakeSum")]
public  partial class CmdForSum
{
    [Arg(Short = 'f', Long = "firstarg", Help = "first  argument")]
    public int  x \{ get; set; \} = 0;

    [Arg(Short = 's', Long = "secondarg", Help = "second  argument")]
    public int  y \{ get; set; \} = 0;

    public void MySum()
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


<TabItem value="D:\gth\RSCG_Examples\v2\rscg_examples\Clap.Net\src\ConsoleDemo\obj\GX\Clap.Net\Clap.Net.ClapGenerator\CmdForSum.ParseMethod.g.cs" label="CmdForSum.ParseMethod.g.cs" >
```csharp showLineNumbers 
/*
* CAUTION! This code has been generated by the Clap.Net source generator and should not be edited.
* 
* Name: MakeSum
* About:
* Long About:
*/

#nullable enable

namespace ConsoleDemo;

public partial class CmdForSum
{
    private const string HelpMessage = 
        """
        Usage: {{EXECUTABLE_NAME}} [OPTIONS]
        
        Options:
          -f, --firstarg   first  argument
          -s, --secondarg  second  argument
          -h, --help       Shows this help message
        
        """;
    
    public class CmdForSumParseResult
    {
        private enum ResultType \{ Success, Help, Version, Error }
    
        private readonly ResultType _type;
        private readonly ConsoleDemo.CmdForSum? _command;
        private readonly Clap.Net.Models.ShowHelp? _help;
        private readonly Clap.Net.Models.ShowVersion? _version;
        private readonly Clap.Net.Models.ParseError? _error;
    
        private CmdForSumParseResult(ConsoleDemo.CmdForSum command)
        {
            _type = ResultType.Success;
            _command = command;
        }
    
        private CmdForSumParseResult(Clap.Net.Models.ShowHelp help)
        {
            _type = ResultType.Help;
            _help = help;
        }
    
        private CmdForSumParseResult(Clap.Net.Models.ShowVersion version)
        {
            _type = ResultType.Version;
            _version = version;
        }
    
        private CmdForSumParseResult(Clap.Net.Models.ParseError error)
        {
            _type = ResultType.Error;
            _error = error;
        }
    
        public bool IsSuccess => _type == ResultType.Success;
        public bool IsHelp => _type == ResultType.Help;
        public bool IsVersion => _type == ResultType.Version;
        public bool IsError => _type == ResultType.Error;
    
        public ConsoleDemo.CmdForSum Command => _command ?? throw new System.InvalidOperationException("Result is not Success");
        public Clap.Net.Models.ShowHelp Help => _help ?? throw new System.InvalidOperationException("Result is not Help");
        public Clap.Net.Models.ShowVersion Version => _version ?? throw new System.InvalidOperationException("Result is not Version");
        public Clap.Net.Models.ParseError Error => _error ?? throw new System.InvalidOperationException("Result is not Error");
    
        public TNewParseResult ChangeType<TNewParseResult>() where TNewParseResult : class
        {
            object? value = _type switch
            {
                ResultType.Success => _command,
                ResultType.Help => _help,
                ResultType.Version => _version,
                ResultType.Error => _error,
                _ => throw new System.InvalidOperationException("Unknown result type")
            };
    
            if (value is TNewParseResult result)
                return result;
    
            throw new System.InvalidCastException(
                $"Cannot cast {value?.GetType().FullName ?? "null"} to {typeof(TNewParseResult).FullName}");
        }
    
        public static implicit operator CmdForSumParseResult(ConsoleDemo.CmdForSum value) => new(value);
        public static implicit operator CmdForSumParseResult(Clap.Net.Models.ShowHelp value) => new(value);
        public static implicit operator CmdForSumParseResult(Clap.Net.Models.ShowVersion value) => new(value);
        public static implicit operator CmdForSumParseResult(Clap.Net.Models.ParseError value) => new(value);
    }
    
    public static ConsoleDemo.CmdForSum Parse(System.ReadOnlySpan<string> args)
    {
        // Protect against DoS attacks with excessive argument counts
        const int MaxTotalArguments = 50000;
        if (args.Length > MaxTotalArguments)
        {
            throw new System.ArgumentException(
                $"Total argument count ({args.Length}) exceeds maximum of {MaxTotalArguments}");
        }
    
        var tokens = Clap.Net.ArgsLexer.Lex(args);
        return Parse(tokens);
    }
    
    public static ConsoleDemo.CmdForSum Parse(System.ReadOnlySpan<Clap.Net.IToken> tokens)
    {
        var parseResult = TryParse(tokens);
    
        if (parseResult.IsSuccess)
            return parseResult.Command;
    
        if (parseResult.IsVersion)
        {
            System.Console.WriteLine(parseResult.Version.Version);
            System.Environment.Exit(0);
        }
    
        if (parseResult.IsError)
        {
            DisplayError(parseResult.Error.Message, parseResult.Error.HelpMessage);
            System.Environment.Exit(0);
        }
    
        PrintHelpMessage(parseResult.Help.HelpMessage);
        System.Environment.Exit(0);
    
        // Unreachable: all control paths above call Environment.Exit(0)
        return default!;
    }
    
    public static CmdForSumParseResult TryParse(System.ReadOnlySpan<string> args)
    {
        var tokens = Clap.Net.ArgsLexer.Lex(args);
        return TryParse(tokens);
    }
    
    public static CmdForSumParseResult TryParse(System.ReadOnlySpan<Clap.Net.IToken> tokens)
    {
        if (tokens.Length > 0 && tokens[0] is Clap.Net.ShortFlag('h') or Clap.Net.LongFlag("help"))
        {
            return new Clap.Net.Models.ShowHelp(GetFormattedHelpMessage());
        }
        
        if (tokens.Length > 0 && tokens[0] is Clap.Net.ShortFlag('v') or Clap.Net.LongFlag("version"))
        {
            return new Clap.Net.Models.ShowVersion("1.0.0.0");
        }
        
        // Argument 'x' is a named argument
        Clap.Net.Models.FieldValue<System.Int32> @__clapgen_x = (System.Int32)0;
        // Argument 'y' is a named argument
        Clap.Net.Models.FieldValue<System.Int32> @__clapgen_y = (System.Int32)0;
        
        var index = 0;
        while (index < tokens.Length)
        {
            switch (tokens[index])
            {
                // Handling CompoundFlag
                case Clap.Net.CompoundFlag(var chars):
                {
                    foreach (var c in chars)
                    {
                        switch (c)
                        {
                            case 'f':
                            {
                                @__clapgen_x = @__clapgen_x.Value + 1;
                                break;
                            }
                            case 's':
                            {
                                @__clapgen_y = @__clapgen_y.Value + 1;
                                break;
                            }
                            default:
                            {
                                return new Clap.Net.Models.ParseError($"Unexpected flag supplied in compound flags '{c}'", GetFormattedHelpMessage());
                            }
                        }
                    }
                    index++;
                    break;
                }
                // Setting named argument 'ConsoleDemo.CmdForSum.x'
                // action 'Set'
                case Clap.Net.ShortFlag('f') or Clap.Net.LongFlag("firstarg"):
                {
                    index++;
                    if (index >= tokens.Length || tokens[index] is not Clap.Net.ValueLiteral(var value))
                        return new Clap.Net.Models.ParseError("Expected value to follow named arg 'x'", GetFormattedHelpMessage());
                    
                    @__clapgen_x = TryParseOrThrow<int>(value, int.TryParse, "integer");
                    index++;
                    break;
                }
                
                // Setting named argument 'ConsoleDemo.CmdForSum.y'
                // action 'Set'
                case Clap.Net.ShortFlag('s') or Clap.Net.LongFlag("secondarg"):
                {
                    index++;
                    if (index >= tokens.Length || tokens[index] is not Clap.Net.ValueLiteral(var value))
                        return new Clap.Net.Models.ParseError("Expected value to follow named arg 'y'", GetFormattedHelpMessage());
                    
                    @__clapgen_y = TryParseOrThrow<int>(value, int.TryParse, "integer");
                    index++;
                    break;
                }
                
                case var arg:
                {
                    return new Clap.Net.Models.ParseError($"Unknown argument '{Clap.Net.TokenExtensions.Format(arg)}'", GetFormattedHelpMessage());
                }
            }
        }
        
        // No required fields
        
        return new ConsoleDemo.CmdForSum
        {
            x = @__clapgen_x.Value,
            y = @__clapgen_y.Value,
        };
    }
    
    public static void DisplayError(string message, string helpMessage)
    {
        var previousColour = System.Console.ForegroundColor;
        System.Console.ForegroundColor = System.ConsoleColor.Red;
        System.Console.WriteLine(message);
        System.Console.ForegroundColor = previousColour;
        System.Console.WriteLine(helpMessage);
    }
    
    public static void PrintHelpMessage(string helpMessage)
    {
        System.Console.WriteLine(helpMessage);
    }
    
    private static string GetFormattedHelpMessage()
    {
        var executableName = System.IO.Path.GetFileNameWithoutExtension(System.Environment.GetCommandLineArgs()[0]);
        if (System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Windows))
            executableName += ".exe";
        return HelpMessage.Replace("{{EXECUTABLE_NAME}}", executableName);
    }
    
    private delegate bool TryParseDelegate<T>(string input, out T result);
    
    private static T TryParseOrThrow<T>(string input, TryParseDelegate<T> tryParse, string typeName)
    {
        if (tryParse(input, out var result))
            return result;
    
        throw new System.FormatException($"Failed to parse '{input}' as {typeName}");
    }
    
    private static T TryParseWithCustomParser<T>(string input, System.Func<string, T> parser)
    {
        try
        {
            return parser(input);
        }
        catch (System.Exception ex)
        {
            throw new System.FormatException($"Custom parser failed to parse '{input}': {ex.Message}", ex);
        }
    }
    
    private static object TryConvertOrThrow(string input, System.Type targetType, string typeName)
    {
        try
        {
            return System.Convert.ChangeType(input, targetType);
        }
        catch (System.Exception ex)
        {
            throw new System.FormatException($"Failed to convert '{input}' to {typeName}: {ex.Message}", ex);
        }
    }
}

```
  </TabItem>


</Tabs>
## Useful

### Download Example (.NET  C#)

:::tip

[Download Example project Clap.Net ](/sources/Clap.Net.zip)

:::


### Share Clap.Net 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FClap.Net&quote=Clap.Net" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FClap.Net&text=Clap.Net:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FClap.Net" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FClap.Net&title=Clap.Net" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FClap.Net&title=Clap.Net&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FClap.Net" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/Clap.Net

<SameCategory />

